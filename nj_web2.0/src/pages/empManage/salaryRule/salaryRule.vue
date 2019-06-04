<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <!-- 标题 -->
                <p slot="title">
                    <Icon type="mouse"></Icon>&nbsp;工资填充规则
                </p>
                <Row>
                    <Col span="5"
                         class="colTree">
                    <div class="divtree"
                         :style="{height:treeheight + 'px'}">
                        <Tree v-if="dataTree != ''"
                              :data="dataTree"
                              @on-select-change="selectChange"
                              :render="renderContent"></Tree>
                        <Spin v-if="loading"
                              size="large"
                              :style="{height:treeheight + 'px'}"></Spin>
                    </div>
                    </Col>
                    <Col span="18"
                         style="width: 73.3333% !important">
                    <!-- 操作按钮和查询输入框 -->
                    <!-- 查询输入框   placeholder这是输入框默认显示值   v-model里写的输入框绑定的值-->
                    <Row>
                        <Input v-model="salCapBigDis"
                               placeholder="请输入比例最大值"
                               style="width: 200px"></Input>
                        <Input v-model="salCapSmallDis"
                               placeholder="请输入比例最小值"
                               style="width: 200px"></Input>
                        <!-- 查询按钮 @click后绑定的是一个点击事件 -->
                        <btnList @buttonExport="expData"
                                 @buttonImport="importExcel"
                                 @buttonAdd="openUp(NaN,$t('button.add'))"
                                 @buttonDel="deletemsg"
                                 @buttonSearch="search"
                                 :btnData="btnData"
                                 :FlowNode="FlowNode"></btnList>
                    </Row>
                    <!-- table 列表 @on-select @on-select-cancel @on-select-all 后面跟的事件 selectedtable 做的是列表checkbox取消、选中、全选事件 -->
                    <!-- @on-sort-change 后面跟的事件  sortable => 做的是列表排序 :current="page" page是当前页面页码 :height="tableheight" tableheight是当前列表高度 :columns="columns" 配置table列 :data="data" data 就是table列表数据-->
                    <Row class="table-form"
                         ref="table-form">
                        <Table :loading="loading"
                               @on-selection-change="selectedtable"
                               @on-sort-change="sortable"
                               :current="page"
                               :height="tableheight"
                               size="small"
                               border
                               ref="selection"
                               :columns="columns"
                               :data="data"></Table>
                    </Row>
                    <!-- :total="total" total=>总页数  @on-page-size-change="sizeChange" 切换每页条数时的回调，返回切换后的每页条数 @on-change="pageChange" 页码改变的回调，返回改变后的页码  :page-size-opts 每页条数切换的配置-->
                    <Row style="display: flex">
                        <Page :total="total"
                              size="small"
                              :current="page"
                              show-elevator
                              show-sizer
                              placement="top"
                              @on-page-size-change="sizeChange"
                              @on-change="pageChange"
                              :page-size=rows
                              :page-size-opts="[10, 20, 50, 100]"></Page>
                        <!-- 列表刷新按钮  -->
                        <Button type="ghost"
                                size="small"
                                shape="circle"
                                icon="refresh"
                                style="margin-left: 20px;display: inline-block;"
                                @click="search()"></Button>
                    </Row>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <!-- transition 弹窗显示 淡入淡出效果 -->
        <transition name="fade">
            <!--  修改新增的弹出框 v-show="openUpdate"绑定了一个判断弹窗是否显示隐藏的数据 :id="updateId" 这是向这个组件传入的当前列的id值 :logType="logType"操作类型 :index="index"点击当前列的index  @closeUp="closeUp" 关闭新增或修改弹窗事件 @getData="addNewArray" 新增成功后的事件  @update="updateArray" 修改成功后的事件-->
            <update v-show="openUpdate"
                    :id="updateId"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <!--导入导出子页面 若没有导入导出可以去掉-->
        <transition>
            <expwindow v-show="openExp"
                       :id="tableselected"
                       @setFileKey="setFileKey"
                       :logType="logType"
                       :index="index"
                       @closeExp="closeExp"
                       ref="expwindow"></expwindow>
        </transition>
        <transition>
            <expdow v-show="openExpDow"
                    :filekey="filekey"
                    :filename="filename"
                    @closeExpDowMain="closeExpDowMain"
                    ref="expdow"></expdow>
        </transition>
        <transition name="fade">
            <importExcel v-show="openImport"
                         :impid="updateId"
                         :imp_mt="imp_mt"
                         @getData="getData"
                         @closeImport="closeImport"
                         ref="importExcel"></importExcel>
        </transition>
    </div>
</template>
<script>
import update from "./addSalaryRule"; //引入新增修改页面弹出框 之后在export default 里的components加入这个组件 页面才可以使用
import { isSuccess } from "../../../lib/util.js"; //调用请求判断成功的公共方法
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin
} from "../../../axios/axios.js"; //调用请求接口封装的公共方法
//导入导出页面 无需变更
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import importExcel from '../../../components/importModel/importParam'
import btnList from "../../../components/btnAuth/btnAuth";
export default {
    //页面初始化的所有变量值
    data () {
        return {
            loading: "",
            tableOperate: false,
            // 导入的mt名称
            imp_mt: 'empSalRule.importData',
            // 导出字段设置, code字段名 name列名
            expDataTital: [
                { code: "unitFname", name: "部门名称" },
                { code: "salCap", name: "工资上限金额" },
                { code: "salFloor", name: "工资下限金额" },
                { code: "salMinimum", name: "最低应交金额" },
                { code: "salRatio", name: "比例(%)" },
                { code: "note", name: "备注" }
            ],
            // 导入导出默认参数 无需变更
            openImport: false,
            openExpDow: false,
            openExp: false,
            filekey: '',
            filename: '',
            treeid: "",
            dataTree: [],
            treeheight: document.body.offsetHeight - 200,
            tableheight: document.body.offsetHeight - 280, //table高度
            logType: "", //操作类型
            openUpdate: false, //新增修改弹出框默认false 隐藏
            updateId: NaN, //修改id
            tableselected: [], //列表选中的id
            columns: [
                //表格列的配置描述
                {
                    type: "selection", //列类型，选择selection类型 就是checkbox
                    width: 54, //列宽
                    align: "center", //对齐方式，可选值为 left 左对齐、right 右对齐和 center 居中对齐
                    fixed: "left"
                },
                {
                    title: "部门名称",
                    key: "unitFname",
                    sortable: "custom",
                    width: 220
                },
                {
                    title: "工资上限金额",
                    key: "salCap",
                    sortable: "custom",
                    width: 220
                },
                {
                    title: "工资下限金额",
                    key: "salFloor",
                    sortable: "custom", //对应列是否可以排序，如果设置为 custom，则代表排序，需要监听 Table 的 on-sort-change 事件
                    width: 220
                },
                {
                    title: "最低应交金额",
                    key: "salMinimum",
                    sortable: "custom",
                    width: 220
                },
                {
                    title: "比例(%)",
                    key: "salRatio",
                    width: 220
                },
            ],
            tableBtn: {
                title: "操作",
                key: "action",
                width: 100,
                fixed: "right",
                align: "center",
                render: (h, params) => {
                    let child = [];
                    for (let v of this.tableButton) {
                        child.push(
                            h(
                                "Button",
                                {
                                    props: {
                                        type: v.type,
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px",
                                        display:
                                            this.pageShow.indexOf(v.btnName) != -1 ? "inline" : "none"
                                    },
                                    on: {
                                        click: () => {
                                            this.openUp(params.row.id, v.name, params.index);
                                        }
                                    }
                                },
                                v.name
                            )
                        );
                    }
                    return h("div", [child]);
                }
            },
            data: [], //table初始化数据
            total: 0, //table总页数
            index: 0, //表格数据中的选中的index
            sort: "id", //排序字段
            order: "desc", //排序类型
            rows: 20, //每页显示条数
            page: 1, //当前页码
            funId: "1000", //功能ID
            salCapBigDis: "", //绑定页面输入框的工资上限金额
            salCapSmallDis: "",
        };
    },
    //外部调用的组件注册到这里
    components: {
        // expdow,//导出的组件
        update, //新增修改的组件
        //importExcel //导入的组件
        expwindow,
        expdow,
        importExcel,
        btnList,
    },
    //所有加载完成后  生命周期 页面方法可以在这里调用
    mounted () {
        this.getData();
        this.getTree();
    },
    computed: {
        pageShow () {
            return this.$store.state.btnOperate.pageShow;
        },
        tableButton () {
            return this.$store.state.btnOperate.tableButton;
        },
        // modity() { //  初始默认下拉选择状态（页面没有下拉状态选择，则无需添加）
        //             	       return this.$store.state.btnOperate.modity
        //         	},
        btnData () {
            return this.$store.state.btnOperate.btnData;
        },
        FlowNode () {
            return this.$store.state.btnOperate.isFlowNode;
        }
    },
    watch: {
        pageShow (val) {
            if (val === "" && this.tableOperate === true) {
                this.columns.pop();
                this.tableOperate = false;
            } else if (this.tableOperate === false) {
                this.columns.push(this.tableBtn);
                this.tableOperate = true;
            }
        }
    },
    created () {
        if (this.pageShow !== "") {
            this.columns.push(this.tableBtn);
            this.tableOperate = true;
        }
    },
    // 页面所有方法
    methods: {
        //获取当前列表数据
        getData (id, page) {
            const t = this;
            if (typeof page == "undefined") {
                this.page = 1;
            }
            t.loading = true; //请求之前重置状态
            //请求列表数据的参数
            const data = {
                _mt: "empSalRule.getPage", //接口路径
                rows: t.rows, //每页显示条数
                page: t.page, //当前页
                sort: t.sort, //排序字段
                order: t.order, //排序类型
                logType: "查询", //日志描述
                salCapBigDis: t.salCapBigDis, //最大上限比例
                salCapSmallDis: t.salCapSmallDis,//最小上限比例
                deptId: id,
            };
            //删除请求列表数据的参数为空的参数
            for (const dat in data) {
                if (data[dat] === "") {
                    delete data[dat];
                }
            }
            //请求数据接口
            getDataLevelUserLoginNew(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.data = res.data.content[0].rows; //列表数据
                        t.total = res.data.content[0].records; //列表总页数
                        t.loading = false; //在成功之后改状态
                    }
                })
                .catch(() => {
                    t.loading = false; //在失败之后改状态
                    //请求失败
                    // t.$Modal.error({
                    //   title: "错误",
                    //   content: "网络错误"
                    // });
                    this.$Message.error(this.$t("reminder.errormessage"));
                })
                .finally(() => {
                    this.loading = false;
                    this.$store.commit('btnOperate/setSearchLoading', false)
                });
        },
        // 导入导出默认方法 无需更改
        closeImport () {
            const t = this
            t.openImport = false
        },
        // 导入导出默认方法 无需更改
        importExcel () {
            const t = this
            t.openImport = true
            t.$refs.importExcel.getDowModelFile()
        },
        // 导入导出默认方法
        expData () {
            const t = this
            // 填装查询条件
            const data = {
                salCapBigDis: t.salCapBigDis,
                salCapSmallDis: t.salCapSmallDis,
            }
            // 设置导出mt参数
            this.$refs.expwindow.getData(this.expDataTital, 'empSalRule.export', data)
            this.openExp = true
        },
        // 导入导出默认方法 无需更改
        closeExp () {
            const t = this
            t.openExp = false
        },
        // 导入导出默认方法 无需更改
        closeExpDowMain () {
            const t = this
            t.openExpDow = false
        },
        // 导入导出默认方法 无需更改
        setFileKey (filekey, filename, openExpDow) {
            const t = this
            t.filekey = filekey
            t.filename = filename
            t.openExpDow = openExpDow
            t.$refs.expdow.getPriToken(t.filekey)
        },
        //新增成功添加列表事件
        addNewArray (res) {
            const t = this;
            t.data.unshift(res);
        },
        //修改成功添加列表事件
        updateArray (res) {
            const t = this;
            t.data.splice(t.index, 1, res);
        },
        //排序事件
        sortable (column) {
            this.sort = column.key;
            this.order = column.order;
            if (this.order !== "normal") {
                this.getData(this.treeid);
            } else {
                this.order = "desc";
            }
        },
        //修改每页条数事件
        sizeChange (size) {
            const t = this;
            t.rows = size;
            t.getData(this.treeid);
        },
        //修改当前页码事件
        pageChange (page) {
            const t = this;
            t.page = page;
            t.getData(this.treeid, t.page);
        },
        //列表checkbox选中事件
        selectedtable (selection) {
            const newArr = [];
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id);
            }
            this.tableselected = newArr;
        },
        //删除选中的当前列
        deletemsg () {
            const t = this;
            //如果没有选中
            if (t.tableselected.length === 0) {
                // t.$Modal.warning({
                //   title: "提示",
                //   content: "请至少选择一条数据"
                // });
                this.$Message.warning('请至少选择一条数据');
            } else {
                t.$Modal.confirm({
                    title: "提示",
                    content: "请确定删除数据",
                    onOk: () => {
                        //点击确定删除调取删除接口
                        getDataLevelUserLogin({
                            _mt: "empSalRule.delByIds",
                            funId: "1",
                            logType: "删除",
                            ids: t.tableselected.toString()
                        })
                            .then(res => {
                                if (isSuccess(res, t)) {
                                    t.tableselected = []; //清空选中项
                                    t.getData(); //重新渲染列表
                                    t.getTree();
                                    this.$Message.success(this.$t("reminder.deletesuccess"));
                                }
                            })
                            .catch(() => {
                                // t.$Modal.error({
                                //   title: "错误",
                                //   content: "网络错误"
                                // });
                                this.$Message.error(this.$t("reminder.errormessage"))
                            });
                    },
                    //点击取消删除
                    onCancel: () => { }
                });
            }
        },
        //打开新增修改弹窗
        openUp (id, logType, index) {
            const t = this;
            //  新增 修改 变量
            t.updateId = parseInt(id, 10);
            t.logType = logType;
            t.index = index;
            t.openUpdate = true; //弹窗显示改为 true
            if (logType === "修改") {
                //如果操作类型是修改，弹窗回显数据
                t.$refs.update.getData(id); //调用子组件update里的getData方法 传了一个id值
            }
        },
        //关闭新增修改弹窗
        closeUp () {
            const t = this;
            t.openUpdate = false;
            t.$refs.update.formValidate.deptId = "";
            t.$refs.update.unitFname = "";
            t.$refs.update.formValidate.salCap = "";
            t.$refs.update.formValidate.salFloor = "";
            t.$refs.update.formValidate.salMinimum = "";
            t.$refs.update.formValidate.salRatio = "";
            t.$refs.update.formValidate.note = "";
        }, //关闭窗口

        //查询
        search () {
            this.$store.commit('btnOperate/setSearchLoading', true);
            this.treeid = "";
            this.tableselected = [];
            this.page = 1;
            this.getData();
        },
        //获取列表数据
        getTree () {
            const t = this;
            const data = {
                _mt: "orgUnits.getTree",
                rows: "100",
                page: "1",
                sort: "unitCode",
                order: "asc",
                logType: this.$t("button.ser"),
                id: "0",
            };
            for (const dat in data) {
                if (data[dat] === "") {
                    delete data[dat];
                }
            }
            getDataLevelUserLoginNew(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.loading = false;
                        setTimeout(() => {
                            t.dataTree = t.toTree(res.data.content[0].value);
                        }, 500);
                    }
                })
                .catch(() => {
                    // t.$Modal.error({
                    //     title: this.$t("reminder.err"),
                    //     content: this.$t("reminder.errormessage")
                    // });
                    this.$Message.error(this.$t("reminder.errormessage"));
                });
        },
        /* 树点击事件 */
        selectChange (e) {
            this.treeid = e.id;
            this.page = 1;
            this.getData(e.id);
        },
        /* 把后台数据转化为tree的格式 */
        toTree (data) {
            data.forEach(item => {
                item.expand = false;
                item.checked = item.authRoleFunDis === "1";
                item.title = item.unitFname;
                delete item.children;
            });
            const map = {};
            data.forEach(item => {
                map[item.id] = item;
            });
            const val = [];
            data.forEach(item => {
                const parent = map[item.unitPid];
                if (item.unitPid === "0") {
                    item.expand = true;
                }
                if (parent) {
                    (parent.children || (parent.children = [])).push(item);
                } else {
                    val.push(item);
                }
            });
            return val;
        },
        //渲染树状图
        renderContent (h, { root, node, data }) {
            return h(
                "span",
                {
                    style: {
                        display: "inline-block",
                        width: "100%"
                    }
                },
                [
                    h(
                        "Button",
                        {
                            props: {
                                type: "text",
                                size: "small"
                            },
                            on: {
                                click: () => {
                                    this.selectChange(data);
                                }
                            }
                        },
                        [
                            h("Icon", {
                                props: {
                                    type:
                                        data.unitType === "01company"
                                            ? "social-buffer"
                                            : "ios-people",
                                    size: "15",
                                    color: data.unitType === "01company" ? "#3399ff" : "#ff9900"
                                },
                                style: {
                                    marginRight: "8px"
                                }
                            }),
                            h("span", data.title)
                        ]
                    )
                ]
            );
        },
    }
};
</script>

<style lang="scss" scoped>
// 页面样式
.table-form {
    margin: 10px 0;
}
.margin-right-10 {
    margin-right: 10px;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.colTree {
    /*min-height: 600px;*/
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
}
.divtree {
    padding-left: 10px;
    /*height: 750px;*/
    border: 1px #efefef solid;
    overflow: auto;
    position: relative;
}
</style>
