<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="mouse"></Icon>&nbsp;入职员工报表
                </p>
                <Row>
                    <Col span="18"
                         style="width: 100% !important">
                    <Row>
                        <DatePicker
                        type="date"
                        placeholder="请选择入职日期区间"
                        :editable="false"
                        v-model="empnhEntrydate"
                        style="width: 200px"
                        ></DatePicker>

                        <DatePicker
                        type="date"
                        placeholder="请选择入职日期区间"
                        :editable="false"
                        v-model="empDate"
                        style="width: 200px"
                        ></DatePicker>
                        <btnList @buttonExport="expData"
                                 @buttonImport="importExcel"
                                 @buttonAdd="openUp(NaN,$t('button.add'))"
                                 @buttonDel="deletemsg"
                                 @buttonSearch="search"
                                 @buttonConfirm="modifystatus('02ok')"
                                 @moditySelect="modityChange"
                                 :btnData="btnData"
                                 :FlowNode="FlowNode"></btnList>
                    </Row>
                    <!--布置分页列表 变量通用 无需变更-->
                    <row class="table-form"
                         ref="table-form">
                        <Table @on-selection-change="selectedtable"
                               @on-sort-change="sortable"
                               :current="page"
                               :height="tableheight"
                               size="small"
                               border
                               ref="selection"
                               :columns="columns"
                               :data="data"></Table>
                    </row>
                    <Row style="display: flex">
                        <Page :total="total"
                              showTotal
                              :current="page"
                              size="small"
                              show-elevator
                              show-sizer
                              placement="top"
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
            </Col>
        </Row>
        <!--布置子页面 v-show控制是否显示 :**是传递到子页面的值  @**是传递到子页面的方法 无需变更-->
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
// 默认引用 无需变更
import { isSuccess } from "../../lib/util";
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin
} from "../../axios/axios";
import expwindow from "../../components/fileOperations/expSms";
import expdow from "../../components/fileOperations/expdow";
import importExcel from "../../components/importModel/importParam";
import btnList from "../../components/btnAuth/btnAuth";
export default {
    data () {
        return {
            tableOperate: false,
            // 导入的mt名称
            imp_mt: "protocolManage.importData",
            // 导出字段设置, code字段名 name列名
            expDataTital: [
                { code: "deptOneName", name: "一级部门及分公司" },
                { code: "deptTwoName", name: "二级部门" },
                { code: "deptThreeName", name: "项目" },
                { code: "empnhName", name: "姓名" },
                { code: "postFname", name: "岗位" },
                { code: "postTypeDis", name: "职级" },
                { code: "empnhPmpDis", name: "直接领导" },
                { code: "empnhWklocatDis", name: "工作属地" },
                { code: "empnhGenderDis", name: "性别" },
                { code: "empnhEntrydate", name: "入职日期" },
                { code: "empnhEntrydate", name: "办理日期" },
                { code: "recruitName", name: "招聘人" },
                { code: "empnhCompmail", name: "邮箱号" },
            ],
            // 导入导出默认参数 无需变更
            openImport: false,
            openExpDow: false,
            openExp: false,
            filekey: "",
            filename: "",
            // 子页面所需参数 无需变更
            tableheight: document.body.offsetHeight - 280,
            logType: "",
            openUpdate: false,
            updateId: NaN,
            loading: false,
            dataTree: [],
            //treeheight: document.body.offsetHeight - 200,
            //tableheight: document.body.offsetHeight - 280,
            logType: "",
            openUpdate: false,
            updateId: NaN,
            tableselected: [],
            //页面初始化默认状态
            state: "",
            columns: [
                {
                    type: "selection",
                    width: 54,
                    fixed: "left",
                    align: "center"
                },
                {
                    title: "一级部门及分公司",
                    key: "deptOneName",
                    width: 220
                },
                {
                    title: "二级部门",
                    key: "deptTwoName",
                    width: 220
                },
                {
                    title: "项目",
                    key: "deptThreeName",
                    //对应列是否可以排序，如果设置为 custom，则代表排序，需要监听 Table 的 on-sort-change 事件
                    width: 220
                },
                // {
                //   title: "渠道",
                //   key: "trialPostNum",
                //   width: 220
                // },
                {
                    title: "姓名",
                    key: "empnhName",
                    width: 220,
                    fixed: 'left'
                },
                {
                    title: "岗位",
                    key: "postFname",
                    width: 220
                },
                {
                    title: "职级",
                    key: "postTypeDis",
                    width: 220
                },
                {
                    title: "直接领导",
                    key: "empnhPmpDis",
                    width: 220
                },
                {
                    title: "工作属地",
                    key: "empnhWklocatDis",
                    width: 220
                },
                {
                    title: "性别",
                    key: "empnhGenderDis",
                    width: 220
                },
                {
                    title: "入职日期",
                    key: "empnhEntrydate",
                    width: 220
                },
                {
                    title: "办理日期",
                    key: "empnhEntrydate",
                    width: 220
                },
                {
                    title: "招聘人",
                    key: "recruitName",
                    width: 220
                },
                {
                    title: "邮箱号",
                    key: "empnhCompmail",
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
            data: [],
            total: 0,
            index: 0,
            sort: "id",
            order: "asc",
            rows: 20,
            page: 1,
            funId: "1000",
            state: "",
            loading: "",
            empDate: "",
            empnhEntrydate:""
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
            //  初始默认下拉选择状态（页面没有下拉状态选择，则无需添加）
            return this.$store.state.btnOperate.modity;
        },
        btnData () {
            return this.$store.state.btnOperate.btnData;
        },
        FlowNode () {
            return this.$store.state.btnOperate.isFlowNode;
        }
    },
    components: {
        // 初始化子页面
        btnList,
        expwindow,
        expdow,
        importExcel
    },
    //按钮权限控制
    pickData () {
        const t = this;
        t.$refs.searchOrgframe.getData(this.params);
        t.openPick = true;
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
                this.tableOperate = true;
            }
        }
    },
    //初始化自动调用方法
    mounted () {
    },
    methods: {
        //状态
        modityChange (res) {
            this.tableselected = [];
            this.getData();
        },
        getData (page) {
            const t = this;
            this.loading = true;
            if (page == undefined) {
                this.page = 1;
            }
            const data = {
                _mt: "empEmpnh.getReportPage",
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: "招聘统计查询",
                funId: "1000",
                empDate: t.empDate,
                empnhEntrydate:t.empnhEntrydate,
                state: "01empstate"
            };
            if (data.empDate !== undefined && data.empDate !== '') {
                data.empDate = new Date(data.empDate).format('yyyy-MM-dd')
            } else {
                data.empDate = ''
            }
            if (data.empnhEntrydate !== undefined && data.empnhEntrydate !== '') {
                data.empnhEntrydate = new Date(data.empnhEntrydate).format('yyyy-MM-dd')
            } else {
                data.empnhEntrydate = ''
            }
            for (const dat in data) {
                if (data[dat] === "") {
                    delete data[dat];
                }
            }
            getDataLevelUserLoginNew(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.data = res.data.content[0].rows;
                        t.total = res.data.content[0].records;
                    }
                })
                .catch(() => {
                    // t.$Modal.error({
                    //   title: this.$t("reminder.err"),
                    //   content: this.$t("reminder.errormessage")
                    // });
                    this.$Message.error(this.$t("reminder.errormessage"));
                })
                .finally(() => {
                    this.loading = false;
                    this.$store.commit('btnOperate/setSearchLoading', false)
                });
        },

        // 点击列表表头 调用排序方法 无需更改
        sortable (column) {
            this.sort = column.key;
            this.order = column.order;
            if (this.order !== "normal") {
                this.getData();
            } else {
                this.order = "desc";
            }
        },
        sizeChange (size) {
            const t = this;
            t.rows = size;
            t.getData();
        },
        pageChange (page) {
            const t = this;
            t.page = page;
            t.getData(t.page);
        },
        selectedtable (selection) {
            const newArr = [];
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id);
            }
            this.tableselected = newArr;
        },
        deletemsg () {
            const t = this;
            if (t.tableselected.length === 0) {
                // t.$Modal.warning({
                //   title: this.$t("reminder.remind"),
                //   content: this.$t("reminder.leastone")
                // });
                this.$Message.warning("请至少选择一条数据");
            } else {
                t.$Modal.confirm({
                    title: this.$t("reminder.remind"),
                    content: this.$t("reminder.confirmdelete"),
                    onOk: () => {
                        getDataLevelUserLogin({
                            _mt: "protocolManage.delByIds",
                            funId: "1",
                            logType: this.$t("button.del"),
                            ids: t.tableselected.toString()
                        })
                            .then(res => {
                                if (isSuccess(res, t)) {
                                    t.tableselected = [];
                                    // t.getTree()
                                    t.getData();
                                    this.$Message.success(this.$t("reminder.deletesuccess"));
                                }
                            })
                            .catch(() => {
                                // t.$Modal.error({
                                //   title: this.$t("reminder.err"),
                                //   content: this.$t("reminder.errormessage")
                                // });
                                this.$Message.error(this.$t("reminder.errormessage"));
                            });
                    },
                    onCancel: () => { }
                });
            }
        },
        openUp (id, logType, index) {
            const t = this;
            t.updateId = parseInt(id, 10);
            t.logType = logType;
            t.openUpdate = true;
            t.index = index;
            // t.$refs.update.getSelect()
            t.$refs.update.disabled = false;
            if (logType === this.$t("button.upd") || logType === "查看") {
                t.$refs.update.getData(id);
            }
            if (logType === "查看") {
                t.$refs.update.disabled = true;
            }
        },
        search () {
            this.page = 1;
            this.getData();
            this.$store.commit('btnOperate/setSearchLoading', true);
            this.tableselected = [];
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
                state: "01empstate",
                empDate: t.empDate,
                empnhEntrydate: t.empnhEntrydate,
            };
            if (data.empDate !== undefined && data.empDate !== '') {
                data.empDate = new Date(data.empDate).format('yyyy-MM--dd')
            } else {
                data.empDate = ''
            }
            if (data.empnhEntrydate !== undefined && data.empnhEntrydate !== '') {
                data.empnhEntrydate = new Date(data.empnhEntrydate).format('yyyy-MM--dd')
            } else {
                data.empnhEntrydate = ''
            }
            // 设置导出mt参数
            this.$refs.expwindow.getData(
                this.expDataTital,
                "empEmpnh.exporReport",
                data
            );
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
        // 子页面新增数据后添加到本页面分页第一行  无需更改
        addNewArray (res) {
            const t = this;
            t.data.unshift(res);
        },
        // 子页面修改数据后 本页面修改对应行数的数据 无需更改
        updateArray (res) {
            const t = this;
            t.data.splice(t.index, 1, res);
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
    /*height: 750px;*/
    overflow: auto;
    border: 1px #efefef solid;
}
</style>
