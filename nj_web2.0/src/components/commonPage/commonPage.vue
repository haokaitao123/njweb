<template>
    <div class="table">
        <row class="table-form"
             ref="table-form">
            <Table @on-selection-change="selectedtable"
                   @on-sort-change="sortable"
                   :height="table_height"
                   size="small"
                   border
                   ref="selection"
                   :columns="columns"
                   :data="data"
                   :loading="mockLoading"></Table>
        </row>
        <Row style="display: flex">
            <Page :total="total"
                  show-total
                  size="small"
                  :current="page"
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
import { isSuccess } from "@/lib/util";
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin
} from "@/axios/axios";
import expwindow from "@/components/fileOperations/expSms";
import expdow from "@/components/fileOperations/expdow";
import importExcel from "@/components/importModel/importParam";
export default {
    components: {
        expwindow,
        expdow,
        importExcel
    },
    data () {
        return {
            tableOperate: false, //加上这个变量
            // 导入导出默认参数 无需变更
            openImport: false,
            openExpDow: false,
            openExp: false,
            filekey: "",
            filename: "",
            //子页面所需参数，无需变更
            // tableheight: document.body.offsetHeight - 280,
            logType: "",
            updateId: NaN,
            tableselected: [],
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
                                            let data = {
                                                id: params.row.id,
                                                name: v.name,
                                                index: params.index
                                            }
                                            this.$emit('tableBtn', data)
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
            sort: this.sortType,
            order: this.orderType,
            rows: 20,
            page: 1,
            state: this.modity,
            loading: "",
            mockLoading: false
        };
    },
    props: {
        // 导出字段设置, code字段名 name列名
        expDataTital: {
            type: Array,
            default: function () {
                return []
            }
        },
        // 导入的mt名称
        imp_mt: {
            type: String,
        },
        // 列表mt 名称
        page_mt: {
            type: String,
        },
        // 删除mt 名称
        dele_mt: {
            type: String,
        },
        //状态mt 名称
        state_mt: {
            type: String,
        },
        //导出的mt名称
        exp_mt: {
            type: String,
        },
        //是否为子表
        childTable: {
            type: Boolean,
            default: false
        },
        //表格高度
        table_height: {
            type: Number,
        },
        //模拟数据
        mockData: {
            type: Array,
        },
        //排序方式
        sortType: {
            type: String,
            default: "id"
        },
        //排序方式
        orderType: {
            type: String,
            default: "desc"
        },
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
        columns () {
            if (!this.childTable) {
                return this.$store.state.commonPage.columns;

            } else {
                return this.$store.state.commonPage.childColumns;
            }
        },
        filterParams () {
            if (!this.childTable) {
                return this.$store.state.commonPage.params;

            } else {
                return this.$store.state.commonPage.childParams;
            }

        },
    },
    mounted () {
        if (!this.childTable) {
            this.getData();
        }
        // this.getData();
    },
    watch: {
        pageShow (val) {
            if (val === "" && this.tableOperate === true) {
                this.columns.pop();
                this.tableOperate = false;
            } else if (this.tableOperate === false && !this.childTable) {
                this.columns.push(this.tableBtn);
                this.tableOperate = true;
            }
        },
        columns (val) {
            if (this.pageShow !== "" && this.tableOperate === false && !this.childTable) {
                this.columns.push(this.tableBtn);
                this.tableOperate = true;
            }
        },
        sortType: function (val) {
            this.sort = val
        },
        orderType: function (val) {
            this.order = val
        }
    },
    methods: {
        //状态修改
        modityChange (res) {
            this.tableselected = [];
            this.getData();
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
                state: t.modity,
            };
            for (let k in this.filterParams) {
                data[k] = this.filterParams[k]
            }
            for (const dat in data) {
                if (data[dat] === "") {
                    delete data[dat];
                }
            }
            // 设置导出mt参数
            this.$refs.expwindow.getData(this.expDataTital, this.exp_mt, data);
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
        //获取列表数据
        getData (page, params) {
            const t = this;
            if (typeof page == "undefined") {
                this.page = 1;
            };
            let data = {
                _mt: t.page_mt,
                rows: t.rows,
                page: t.page,
                roleType: localStorage.roleType,//角色类型
                sort: t.sort,
                order: t.order,
                logType: '查询',
                state: t.modity,

            };
            for (let k in this.filterParams) {
                data[k] = this.filterParams[k]
            }
            for (const dat in data) {
                if (data[dat] === "") {
                    delete data[dat];
                }
            }
            this.loading = true;
            getDataLevelUserLoginNew(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        this.loading = false;
                        t.data = res.data.content[0].rows;
                        t.total = res.data.content[0].records;
                    }
                })
                .catch(() => {
                    this.loading = false;
                    this.$Message.error(this.$t("reminder.errormessage"));
                })
                .finally(() => {
                    this.$store.commit('btnOperate/setSearchLoading', false);
                    this.loading = false;
                });
        },
        //排序
        sortable (column) {
            this.sort = column.key;
            this.order = column.order;
            if (this.order !== "normal") {
                this.getData();
            } else {
                this.order = "desc";
            }
        },
        //改变列表Rows
        sizeChange (size) {
            const t = this;
            t.rows = size;
            t.getData();
        },
        //改变页码
        pageChange (page) {
            const t = this;
            t.page = page;
            t.getData(t.page);
        },
        //列表中选中对应列
        selectedtable (selection) {
            const newArr = [];
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id);
            }
            this.tableselected = newArr;
        },
        //删除数据
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
                            _mt: t.dele_mt,
                            logType: this.$t("button.del"),
                            ids: t.tableselected.toString()
                        })
                            .then(res => {
                                if (isSuccess(res, t)) {
                                    t.tableselected = [];
                                    t.getData();

                                    this.$Message.success(this.$t("reminder.deletesuccess"));
                                }
                            })
                            .catch(() => {
                                this.$Message.error(this.$t("reminder.errormessage"));
                            });
                    },
                    onCancel: () => { }
                });
            }
        },
        //查询
        search (data) {
            this.$store.commit('btnOperate/setSearchLoading', true);
            // this.$store.commit('btnOperate/setSearchLoading', false);
            this.tableselected = [];
            this.page = 1;
            this.getData(this.page, data);
        },
        //修改状态 
        modifystatus (state, tipName) {
            const t = this;
            let logType = tipName;
            let tipContent = "您确定继续操作吗？";
            if (t.tableselected.length === 0) {
                this.$Message.warning('请至少选择一条数据');
                return;
            }
            t.$Modal.confirm({
                title: this.$t("reminder.remind"),
                content: tipContent,
                onOk: () => {
                    getDataLevelUserLogin({
                        _mt: t.state_mt,
                        logType: logType,
                        state: state,
                        ids: t.tableselected.toString()
                    })
                        .then(res => {
                            if (isSuccess(res, t)) {
                                t.getData();
                                t.tableselected = [];
                                this.$Message.success(this.$t("reminder.operatsuccess"));
                            }
                        })
                        .catch(() => {
                            t.tableselected = [];
                            this.$Message.error(this.$t("reminder.errormessage"));
                        });
                },
                onCancel: () => { }
            });
        },
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
    border: 1px #efefef solid;
    overflow: auto;
    position: relative;
}
</style>
