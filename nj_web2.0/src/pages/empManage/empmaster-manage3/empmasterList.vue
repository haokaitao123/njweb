<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="mouse"></Icon>&nbsp;员工入职管理
                </p>
                <Row>
                    <Col span="6"
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
                    <Col span="18">
                    <Row>
                        <Input placeholder="请输入员工姓名"
                               style="width: 160px"
                               v-model="empnhName" />
                        <Input placeholder="请输入员工证件号"
                               style="width: 160px"
                               v-model="empnhIdno" />
                        <span @dblclick="clearPost()">
                            <Input v-model="postName"
                                   style="width: 200px"
                                   icon="search"
                                   :readonly="true"
                                   placeholder="请选择岗位名称"
                                   @on-click="pickData" />
                        </span>
                        <btnList :btnData="btnData"
                                 :FlowNode="FlowNode"
                                 @buttonExport="expData"
                                 @buttonSearch="search"
                                 @buttonImport="importExcel"
                                 @buttonAdd="openUp('',$t('button.add'))"
                                 @moditySelect="modityChange"
                                 @buttonEmp="changeState('入职')"
                                 @buttonDel="deletemsg"
                                 @buttonSubmit="changeState('提交')"
                                 @buttonTrans="buttonTrans"></btnList>
                    </Row>
                    <row class="table-form"
                         ref="table-form">
                        <Table @on-selection-change="selectedtable"
                               @on-sort-change="sortable"
                               :height="tableheight"
                               size="small"
                               border
                               ref="selection"
                               :columns="columns"
                               :data="data"
                               :loading="loading"></Table>
                    </row>
                    <Row style="display: flex">
                        <Page :total="total"
                              size="small"
                              show-elevator
                              show-sizer
                              placement="top"
                              :current="page"
                              @on-page-size-change="sizeChange"
                              @on-change="pageChange"
                              :page-size-opts="[10, 20, 50, 100]"></Page>
                        <Button type="ghost"
                                size="small"
                                shape="circle"
                                icon="refresh"
                                style="margin-left: 20px;display: inline-block;"
                                @click="search"></Button>
                    </Row>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <!--布置主子表页面 visaare变量为特殊参数 一般不传  其他无需变更-->
        <transition name="fade">
            <update v-show="openUpdate"
                    :index="index"
                    :modity="modity"
                    @closeUp="closeUp"
                    @newdata="addNewArray"
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
        <transition name="fade">
            <searchTable v-show="openPick"
                         :searchPostClo="searchCloumns"
                         :params="params"
                         @inputPost="inputPost"
                         @closePost="closeTable"
                         @changeinput="changeinput"
                         ref="searchTable"></searchTable>
        </transition>
        <transition name="fade">
            <transaction v-show="openTransaction"
                         :id="tableselected"
                         :logType="logType"
                         @closeTransaction="closeTransaction"
                         ref="transactionWindow"></transaction>
        </transition>
    </div>
</template>
<script>
// 引入主子表页面
import update from "./empmasterBase";
import expwindow from "../../../components/fileOperations/expSms";
import expdow from "../../../components/fileOperations/expdow";
import importExcel from "../../../components/importModel/importParam";
import btnList from "../../../components/btnAuth/btnAuth";
import searchTable from '../../../components/searchTable/searchPost';
import transaction from './transaction';
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";

export default {
    data () {
        return {
            // 导入的mt名称
            imp_mt: "empEmpnh.importData",
            // 导出字段设置, code字段名 name列名
            expDataTital: [
                { code: "numberCode", name: "唯一编号" },
                { code: "empnhName", name: "雇员姓名" },
                { code: "empnhPtname", name: "曾用名" },
                { code: "unitFname", name: "部门名称" },
                { code: "postFname", name: "岗位名称" },
                { code: "empnhPmpDis", name: "直接上级" },
                { code: "empnhCostcentDis", name: "成本中心" },
                { code: "empnhIdtypeDis", name: "证件类型" },
                { code: "empnhIdno", name: "证件号码" },
                { code: "empnhSday", name: "生效日期" },
                { code: "empnhEday", name: "证件到期日" },
                { code: "empnhGenderDis", name: "性别" },
                { code: "empnhBirthdate", name: "出生日期" },
                { code: "empnhMobile", name: "手机号码" },
                { code: "empnhResiaddr", name: "居住地址" },
                { code: "empnhRegaddr", name: "户籍地址" },
                { code: "empnhRegtypeDis", name: "户籍性质" },
                { code: "empnhWklocatDis", name: "工作地点" },
                { code: "empnhNationDis", name: "民族" },
                { code: "empnhMarriageDis", name: "婚姻状况" },
                { code: "empnhPoliticalDis", name: "政治面貌" },
                { code: "empnhFirstwkdate", name: "参加工作时间" },
                { code: "empnhEntrydate", name: "入职日期" },
                { code: "empnhIrmentdate", name: "转正日期" },
                { code: "empnhTechtilDis", name: "职称" },
                { code: "empnhTechspec", name: "职称专业" },
                { code: "empnhAttendynDis", name: "是否考勤" },
                { code: "empnhSalaccount", name: "银行账号" },
                { code: "empnhSalbankDis", name: "开户银行" },
                { code: "empnhSalaccname", name: "户名" },
                { code: "note", name: "备注" },

            ],
            // 导入导出默认参数 无需变更
            openImport: false,
            openExpDow: false,
            openExp: false,
            openTransaction: false,
            filekey: "",
            filename: "",
            // 子页面参数
            treeheight: document.body.offsetHeight - 200,
            tableheight: document.body.offsetHeight - 280,
            tableselected: [],
            loading: true,
            logType: "",
            openUpdate: false,
            // 主表id 无需变更
            updateId: NaN,
            empnhName: "",
            empnhIdno: "",
            dataTree: [],
            hua: "",
            postId: "",
            postName: "",
            columns: [
                {
                    type: "selection",
                    width: 54,
                    fixed: "left",
                    align: "center"
                },
                {
                    title: "员工姓名",
                    key: "empnhName",
                    fixed: "left",
                    width: 140,
                    align: "center"
                },
                {
                    title: "证件号码",
                    key: "empnhIdno",
                    width: 180,
                    align: "center",
                    sortable: 'custom',
                },


                {
                    title: "部门名称",
                    key: "unitFname",
                    width: 140,
                    align: "center"
                },
                {
                    title: "岗位名称",
                    key: "postFname",
                    width: 140,
                    align: "center"
                },
                {
                    title: "唯一编号",
                    key: "numberCode",
                    width: 130,
                    align: "center"
                },
                {
                    title: "直接上级",
                    key: "empnhPmpDis",
                    width: 140,
                    align: "center"
                },
                {
                    title: "证件类型",
                    key: "empnhIdtypeDis",
                    width: 140,
                    align: "center"
                },

                {
                    title: "生效日期",
                    key: "empnhSday",
                    width: 140,
                    align: "center",
                    sortable: 'custom',
                },
                {
                    title: "证件到期日",
                    key: "empnhEday",
                    width: 140,
                    align: "center",
                    sortable: 'custom',
                },
                {
                    title: "性别",
                    key: "empnhGenderDis",
                    width: 100,
                    align: "center"
                },
                {
                    title: "出生日期",
                    key: "empnhBirthdate",
                    width: 140,
                    align: "center",
                    sortable: "custom"
                },
                {
                    title: "手机号码",
                    key: "empnhMobile",
                    width: 140,
                    align: "center",
                    sortable: "custom"
                },
                {
                    title: "户籍性质",
                    key: "empnhRegtypeDis",
                    width: 140,
                    align: "center"
                },
                {
                    title: "工作地点",
                    key: "empnhWklocatDis",
                    width: 140,
                    align: "center"
                },
                {
                    title: "入职日期",
                    key: "empnhEntrydate",
                    width: 140,
                    align: "center",
                    sortable: "custom"
                },
                {
                    title: "转正日期",
                    key: "empnhIrmentdate",
                    width: 140,
                    align: "center",
                    sortable: "custom"
                },
                {
                    title: "开户银行",
                    key: "empnhSalbankDis",
                    width: 160,
                    align: "center"
                },
                {
                    title: "户名",
                    key: "empnhSalaccname",
                    width: 140,
                    align: "center"
                },
                {
                    title: "参加工作时间",
                    key: "empnhFirstwkdate",
                    width: 140,
                    align: "center",
                    sortable: "custom"
                },
                {
                    title: "是否考勤",
                    key: "empnhAttendynDis",
                    width: 140,
                    align: "center",
                    sortable: "custom",
                }
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
            data: [],
            total: 0,
            index: 0,
            sort: "id",
            order: "desc",
            rows: 10,
            page: 1,
            openPick: false,
            searchCloumns: [
                {
                    title: this.$t('lang_employee.searchColumn.postCode'),
                    key: 'postCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_employee.searchColumn.postFnameCnDis'),
                    key: 'postFname',
                    sortable: 'custom',
                }
            ],
            params: {
                _mt: 'orgPost.getPage',
                rows: '10',
                page: '1',
                sort: 'id',
                order: 'desc',
                logType: '岗位',
                state: '02valid',
            },
            state: this.modity,
            tableOperate: false,

        };
    },
    computed: {
        pageShow () {
            return this.$store.state.btnOperate.pageShow;
        },
        tableButton () {
            return this.$store.state.btnOperate.tableButton;
        },
        modity () {
            return this.$store.state.btnOperate.modity;
        },
        btnData () {
            return this.$store.state.btnOperate.btnData
        },
        FlowNode () {
            return this.$store.state.btnOperate.isFlowNode
        }
    },
    created () {
        if (this.pageShow !== "") {
            this.columns.push(this.tableBtn);
            this.tableOperate = true
        }
    },
    watch: {
        pageShow (val) {
            if (val === "" && this.tableOperate === true) {
                this.columns.pop();
                this.tableOperate = false;
            } else if (this.tableOperate === false) {
                this.columns.push(this.tableBtn);
                this.tableOperate = true
            }
        }
    },
    components: {
        update,
        btnList,
        expwindow,
        expdow,
        importExcel,
        searchTable,
        transaction
    },
    mounted () {
        this.getData();
        this.getTree();
    },
    methods: {
        // 查询
        search () {
            this.page = 1;
            this.treeid = "";
            this.$store.commit('btnOperate/setSearchLoading', true)
            this.getData();
        },
        // 获取主表数据
        getData (id, page) {
            const t = this;
            if (typeof page == "undefined") {
                this.page = 1;
            }
            const data = {
                _mt: "empEmpnh.getPage",
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: "员工主数据查询",
                empnhName: t.empnhName,
                empnhIdno: t.empnhIdno,
                deptId: id,
                postId: t.postId,
                state: t.modity
            };
            for (const dat in data) {
                if (data[dat] === "") {
                    delete data[dat];
                }
            }
            this.loading = true;
            getDataLevelUserLoginNew(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.data = res.data.content[0].rows;
                        t.total = res.data.content[0].records;
                    }
                })
                .catch(() => {
                    this.$Message.error(this.$t("reminder.errormessage"));
                })
                .finally(() => {
                    this.loading = false;
                    this.$store.commit('btnOperate/setSearchLoading', false);
                });
        },
        // 删除
        deletemsg () {
            const t = this;
            if (t.tableselected.length === 0) {
                this.$Message.warning('请至少选择一条数据');
            } else {
                t.$Modal.confirm({
                    title: this.$t("reminder.remind"),
                    content: this.$t("reminder.confirmdelete"),
                    onOk: () => {
                        getDataLevelUserLogin({
                            _mt: "empEmpnh.delByIds",
                            funId: "1",
                            logType: "删除",
                            ids: t.tableselected.toString()
                        })
                            .then(res => {
                                if (isSuccess(res, t)) {
                                    this.$Message.success('删除成功');
                                    t.tableselected = [];
                                    t.getData(this.treeid)
                                }
                            })
                            .catch(() => {
                                this.$Message.error('删除失败');
                            });
                    },
                    onCancel: () => { }
                });
            }
        },
        //新增
        openUp (id, logType, index) {
            const t = this;
            t.updateId = parseInt(id, 10);
            t.logType = logType;
            t.openUpdate = true;
            t.index = index;
            t.$store.commit('empMaster/setMainId', id);
            console.log(logType, "logType")
            t.$store.commit('empMaster/setLogType', logType);
            if (logType != '新增') {
                t.$refs.update.getOption(id, logType);
            }
        },
        // 改变流程状态
        changeState (name) {
            const t = this;
            if (t.tableselected.length === 0) {
                this.$Message.warning('请至少选择一条数据');
            } else {
                t.$Modal.confirm({
                    title: this.$t("reminder.remind"),
                    content: "您确定继续操作吗？",
                    onOk: () => {
                        getDataLevelUserLogin({
                            _mt: "empEmpnh.updStateByIds",
                            logType: name,
                            ids: t.tableselected.toString(),
                            state: t.modity,
                        })
                            .then(res => {
                                if (isSuccess(res, t)) {
                                    this.$Message.success('操作成功');
                                    t.tableselected = [];
                                    t.getData(this.treeid)
                                }
                            })
                            .catch(() => {
                                this.$Message.error('操作失败');
                            });
                    },
                    onCancel: () => { }
                });
            }
        },
        // 条数变化
        sizeChange (size) {
            const t = this;
            t.rows = size;
            t.getData(this.treeid)
        },
        // 页码变化
        pageChange (page) {
            const t = this;
            t.page = page;
            t.getData(this.treeid, t.page);
        },
        // 排序
        sortable (column) {
            this.sort = column.key;
            this.order = column.order;
            if (this.order !== "normal") {
                this.getData(this.treeid);
            } else {
                this.order = "desc";
            }
        },
        // 删除、入职多选按钮
        selectedtable (selection) {
            const newArr = [];
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id);
            }
            this.tableselected = newArr;
        },
        // 打开主子表页面  无需变更
        // openUp (id, logType, index) {
        //     const t = this;
        //     t.updateId = parseInt(id, 10);
        //     t.logType = logType;
        //     t.openUpdate = true;
        //     t.index = index;
        //     // if (t.logType === "修改")) {
        //     //   // 调用子页面方法 传递参数 无需变更
        //     //   t.$refs.update.getOption(id, logType);
        //     // }
        //     t.$refs.update.getOption(id, t.logType);

        // },
        // 关闭页面
        closeUp () {
            const t = this;
            t.openUpdate = false;
        },
        // 状态变化
        modityChange (res) {
            const t = this;
            t.tableselected = [];
            this.getData();
            this.getTree();
        },
        // 导入导出默认方法 无需更改
        closeImport () {
            const t = this;
            t.openImport = false;
        },

        // 导入导出默认方法 无需更改
        importExcel () {
            const t = this;
            t.openImport = true;
            t.$refs.importExcel.getDowModelFile();
        },
        // 导入导出默认方法
        expData () {
            const t = this;
            // 填装查询条件
            const data = {
                empnhName: t.empnhName,
                empnhIdno: t.empnhIdno,
                postId: t.postId,
                state: t.modity,
                deptId: t.treeid
            };
            // 设置导出mt参数
            this.$refs.expwindow.getData(this.expDataTital, "empEmpnh.export", data);
            this.openExp = true;
        },
        // 导入导出默认方法 无需更改
        closeExp () {
            const t = this;
            t.openExp = false;
        },
        // 导入导出默认方法 无需更改
        closeExpDowMain () {
            const t = this;
            t.openExpDow = false;
        },
        // 导入导出默认方法 无需更改
        setFileKey (filekey, filename, openExpDow) {
            const t = this;
            t.filekey = filekey;
            t.filename = filename;
            t.openExpDow = openExpDow;
            t.$refs.expdow.getPriToken(t.filekey);
        },
        //获取树
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
                state: t.modity
            };
            for (const dat in data) {
                if (data[dat] === "") {
                    delete data[dat];
                }
            }
            getDataLevelUserLoginNew(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        setTimeout(() => {
                            t.dataTree = t.toTree(res.data.content[0].value);
                        }, 500);
                    }
                })
                .catch(() => {
                    this.$Message.error('网络错误');
                })
                .finally(() => {
                    t.loading = false;
                })
        },
        /* 树点击事件 */
        selectChange (e) {
            // debugger;
            this.treeid = e.id;
            // this.treeType = e.unitType;
            this.page = 1;

            this.getData(e.id);
        },
        /* 把后台数据转化为tree的格式 */
        toTree (data) {
            data.forEach(item => {
                item.expand = false;
                item.checked = item.authRoleFunDis === "1";
                item.title = item.unitCode + " " + item.unitFname;
                delete item.children;
            });
            const map = {};
            data.forEach(item => {
                map[item.id] = item;
            });
            const val = [];
            data.forEach(item => {
                const parent = map[item.unitPid];
                if (parent) {
                    (parent.children || (parent.children = [])).push(item);
                } else {
                    val.push(item);
                }
            });
            return val;
        },
        // 渲染树状图
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
        // 子页面新增数据后添加到本页面分页第一行  无需更改
        addNewArray (res) {
            const t = this;
            t.data.unshift(res);
        },
        // 子页面修改数据后 本页面修改对应行数的数据 无需更改
        updateArray (res) {
            const t = this;
            t.data.splice(t.index, 1, res);
        },
        //清除岗位选择框数据
        clearPost () {
            const t = this;
            t.postName = ""
            t.postId = ""
        },
        //打开岗位选择弹出框
        pickData () {
            const t = this
            t.$refs.searchTable.getData(t.params)
            t.openPick = true
        },
        //
        inputPost (name, id, postName, postId) {
            const t = this
            t.postId = id
            t.postName = name
        },
        //关闭岗位弹出框
        closeTable () {
            const t = this
            t.openPick = false
        },
        //选择岗位
        changeinput (name, id) {
            const t = this
            t.postName = name
            t.postId = id
        },
        //异动
        buttonTrans () {
            if (this.tableselected.length === 0) {
                this.$Message.warning('请至少选择一条数据');
            } else {
                this.openTransaction = true;
            }
        },
        closeTransaction () {
            this.openTransaction = false;
        }
    }
};
</script>
<style lang="scss" scoped>
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
    box-sizing: border-box;
    /*height: 750px;*/
    overflow: auto;
    border: 1px #efefef solid;
}
</style>
