<template>
    <div class="table">
        <Row>
            <i-Col span="24">
                <card>
                    <p slot="title">
                        <Icon type="mouse"> </Icon>
                        &nbsp;最低押金规则
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
                        <Row>
                            <div class="table">
                                <span @dblclick="cleardepPost('1')">
                                    <Input v-model="depMoney"
                                           placeholder="请输入最低押金"
                                           @on-enter="enterEvent"
                                           style="width: 200px"></Input>
                                </span>
                                <!-- 页面中调用公共按钮组件标签<btnList> -->
                                <!-- 调用公共按钮组件方法 -->
                                <!-- @buttonAdd（配置的按钮对应方法名称） = "btnEvent"（是你当前页面对应点击事件） -->
                                <btnList :btnData="btnData"
                                         :FlowNode="FlowNode"
                                         @buttonSearch="search()"
                                         @buttonAdd="openUp(NaN,'新增')"
                                         @buttonDel="deletemsg"></btnList>

                            </div>
                        </Row>
                        <Row class="table-form"
                             ref="table-form">
                            <Table :loading="loading"
                                   @on-selection-change="selectedtable"
                                   @on-sort-change="sortable"
                                   :height="tableheight"
                                   size="small"
                                   border
                                   ref="selection"
                                   :columns="columns"
                                   :data="data"></Table>
                        </Row>
                        <Row style="display: flex">
                            <Page :total="total"
                            :showTotal="showTotal"
                                  size="small"
                                  show-elevator
                                  show-sizer
                                  placement="top"
                                  :current="page"
                                  @on-page-size-change="sizeChange"
                                  @on-change="pageChange"
                                  :page-size=rows
                                  :page-size-opts="[10, 20, 50, 100]"></Page>
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
            </i-Col>
        </Row>
        <transition name="fade">
            <update v-show="openUpdate"
                    :id="updateId"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <transition name="fade">
            <searchdepPost v-show="opendepPost"
                           :searchPostClo="searchCloumns"
                           :params="psparams"
                           @inputPost="inputdepPost"
                           @closePost="close"
                           @changeinput="changedepPost"
                           ref="searchdepPost"></searchdepPost>
        </transition>
    </div>
</template>
<script>
// 引用子页面
import update from './addNewempDeomin'
// 默认引用 无需变更
import { isSuccess } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import importExcel from '../../../components/importModel/importParam'
import btnList from '../../../components/btnAuth/btnAuth'
import searchdepPost from '../../../components/searchTable/searchPost'

export default {
    created () {
        if (this.pageShow !== "") {
            this.columns.push(this.tableBtn);
            this.tableOperate = true
        }
    },
    computed: {
        pageShow () {
            return this.$store.state.btnOperate.pageShow
        },
        tableButton () {
            return this.$store.state.btnOperate.tableButton
        },
        modity () { //  初始默认下拉选择状态（页面没有下拉状态选择，则无需添加）
            return this.$store.state.btnOperate.modity
        },
        btnData () {
            return this.$store.state.btnOperate.btnData
        },
        FlowNode () {
            return this.$store.state.btnOperate.isFlowNode
        },
    },
    data () {
        return {
            tableOperate: false,
            opendepPost: false,
            loading: "",
            // 导入的mt名称
            imp_mt: 'empDeposmin.importData',
            // 导出字段设置, code字段名 name列名
            expDataTital: [{ code: "unitFname", name: "部门名称" }, { code: 'depMoney', name: '最低押金' },
            { code: 'depSdate', name: '押金补充时间' }, { code: 'depEdate', name: '补充结束时间' },
            { code: 'depPenalty', name: '低于最低扣款' }, { code: 'note', name: '备注' }],
            // 导入导出默认参数 无需变更
            openImport: false,
            openExpDow: false,
            openExp: false,
            filekey: '',
            filename: '',
            treeid: "",
            dataTree: [],
            // 子页面所需参数 无需变更
            tableheight: document.body.offsetHeight - 280,
            treeheight: document.body.offsetHeight - 200,
            logType: '',
            openUpdate: false,
            updateId: NaN,
            // 主页面已勾选数据list
            tableselected: [],
            // 分页列表显示字段
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                    fixed: 'left'
                },
                // {
                //   title: '岗位',
                //   key: 'depPostDis',
                //   sortable: 'custom',
                //   width: 220,
                // },
                {
                    title: "部门名称",
                    key: "unitFname",
                    sortable: "custom",
                    width: 220
                },
                {
                    title: '最低押金',
                    key: 'depMoney',
                    sortable: 'custom',
                    width: 220,
                },
                {
                    title: '押金补充时间',
                    key: 'depSdate',
                    sortable: 'custom',
                    width: 220,
                },
                {
                    title: '补充结束时间',
                    key: 'depEdate',
                    sortable: 'custom',
                    width: 220,
                },
                {
                    title: '低于最低扣款',
                    key: 'depPenalty',
                    sortable: 'custom',
                    width: 220,
                },
            ],
            tableBtn: {
                title: '操作',
                key: 'action',
                width: 100,
                fixed: 'right',
                align: 'center',
                render: (h, params) => {
                    let child = [];
                    for (let v of this.tableButton) {
                        child.push(h('Button', {
                            props: {
                                type: v.type,
                                size: 'small',
                            },
                            style: {
                                marginRight: '5px',
                                display: this.pageShow.indexOf(v.btnName) != -1 ? 'inline' : 'none',
                            },
                            on: {
                                click: () => {
                                    this.openUp(params.row.id, v.name, params.index);
                                },
                            },
                        }, v.name))
                    };
                    return h('div', [
                        child,
                    ])
                },
            },
            // 页面参数 无需更改
            data: [],
            total: 0,
            showTotal: true,
            index: 0,
            sort: 'id', // 默认排序字段
            order: 'desc', // 默认排序方式
            rows: 20,
            page: 1,
            // 查询条件变量
            depMoney: '',
            searchCloumns: [
                {
                    title: "岗位编码",
                    key: "postCode",
                    sortable: "custom",
                    sortable: 'custom',
                },
                {
                    title: "岗位名称",
                    key: "postFname",
                    sortable: 'custom',
                }
            ],
            psparams: {
                _mt: 'orgPost.getPage',
                rows: 20,
                page: '1',
                sort: 'id',
                order: 'desc',
                logType: '岗位',
            },
        }
    },
    components: {
        // 初始化子页面
        update,
        btnList,   //将这个组件引用到当前文件， btnList是起的公共按钮组件名字
        searchdepPost
    },
    mounted () {
        // 页面打开自动调用查询方法 无需更改
        this.getData();
        this.getTree();
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
    methods: {
      //enter事件
      enterEvent(e){
        if(e.target.value != ''){
          this.search()
        }
      },
        // 查询方法
        getData (id, page) {
            const t = this
            this.$store.commit('btnOperate/setSearchLoading', true)
            // 是否重置页码 无需更改
            if (typeof page == "undefined") {
                this.page = 1;
            }
            // 分页查询mt
            const data = {
                _mt: 'empDeposmin.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: '查看',
                // 添加查询变量
                depMoney: t.depMoney,
                deptId: id,
                state: ''
            }
            // 删除空字段 无需更改
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.loading = true; //请求之前重置状态
            // 发送请求 返回分页list与总行数  无需更改
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Message.error(this.$t('reminder.errormessage'))
            }).finally(() => {
                t.loading = false;
                t.$store.commit('btnOperate/setSearchLoading', false);
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
                bankCode: t.bankCode,
                bankCname: t.bankCname,
                bankSwiftcode: t.bankSwiftcode,
            }
            // 设置导出mt参数
            this.$refs.expwindow.getData(this.expDataTital, 'empDeposmin.export', data)
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
        // 子页面新增数据后添加到本页面分页第一行  无需更改
        addNewArray (res) {
            const t = this
            t.data.unshift(res)
        },
        // 子页面修改数据后 本页面修改对应行数的数据 无需更改
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
        },
        // 点击列表表头 调用排序方法 无需更改
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getData(this.treeid);
            } else {
                this.order = 'desc'
            }
        },
        // 变更列表显示行数方法 无需更改
        sizeChange (size) {
            const t = this
            t.rows = size
            t.getData(this.treeid);
        },
        // 翻页方法 无需更改
        pageChange (page) {
            const t = this
            t.page = page
            t.getData(this.treeid, t.page);
        },
        search () {
            this.$store.commit('btnOperate/setSearchLoading', true);
            this.treeid = "";
            this.tableselected = [];
            this.page = 1;
            this.getData();
        },
        // 勾选数据方法 无需更改
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
        cleardepPost () {
            const t = this
            t.depPostDis = ''
            t.depPost = ''
        },
        pickdepPost () {
            const t = this
            t.$refs.searchdepPost.getData(this.psparams)
            t.opendepPost = true
        },
        closedepPost () {
            const t = this
            t.opendepPost = false
        },
        close () {
            const t = this
            t.opendepPost = false
        },
        changedepPost (row) {
            const t = this
            //        赋值到显示字段与实际值字段
            t.depPost = row.id
            t.depPostDis = row.name
        },
        inputdepPost (name, id, postName, postId) {
            const t = this
            t.depPost = id
            t.depPostDis = name
            t.opendepPost = false;
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
        // 删除方法 无需更改
        deletemsg () {
            const t = this
            if (t.tableselected.length === 0) {
                this.$Message.warning(this.$t('reminder.leastone'))
            } else {
                t.$Modal.confirm({
                    title: '提示',
                    content: '请确定删除数据',
                    onOk: () => {
                        getDataLevelUserLogin({
                            // 设置删除mt参数 其余无需更改
                            _mt: 'empDeposmin.delByIds',
                            logType: '删除',
                            ids: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.$Message.success(this.$t('reminder.deletesuccess'))
                                t.tableselected = []
                                t.getData();
                                t.getTree();
                            }
                        }).catch(() => {
                            t.$Message.error(this.$t('reminder.errormessage'))
                        })
                    },
                    onCancel: () => { },
                })
            }
        },
        // 打开子页面 传递本页面ID 无需更改
        openUp (id, logType, index) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            //        t.$refs.update.getSelect()
            if (logType === '修改') {
                t.$refs.update.getData(id)
            }
        },
        // 关闭子页面 无需更改
        closeUp () {
            const t = this
            t.$refs.update.formValidate.deptId = "";
            t.$refs.update.unitFname = "";
            t.openUpdate = false;
        },
    },
}
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
    /*height: 750px;*/
    border: 1px #efefef solid;
    overflow: auto;
    position: relative;
}
</style>
