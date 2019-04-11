<template>
    <div class="content-main">
        <row>
            <Input v-model="docsName"
                   style="width: 160px;"
                   placeholder="请输入合同编号"></Input>
            <Button type="primary"
                    icon="search"
                    @click="search">查询</Button>
            <Button type="primary"
                    icon="primary"
                    @click="expData">导出</Button>
        </row>
        <row class="table-form"
             ref="table-form">
            <Table @on-selection-change="selectedtable"
                   @on-sort-change="sortable"
                   :height="410"
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
                  :current="params.page"
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
        <!--mainid为主表id-->
        <transition>
            <contentMsg v-show="showMsg"
                        @hideMsg="hideMsg"
                        :mainId="mainId"
                        :logType="logTypeE"
                        ref="contentMsg"></contentMsg>
        </transition>
        <!--导入导出子页面 若没有导入导出可以去掉-->
        <transition>
            <expwindow v-show="openExp"
                       :id="tableselected"
                       @setFileKey="setFileKey"
                       :logType="logTypeE"
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
    </div>
</template>
<script>
import contentMsg from "./addEmpContractInfo";
import expwindow from "../../../../components/fileOperations/expSms";
import expdow from "../../../../components/fileOperations/expdow";
import {
    getDataLevelUserLogin,
    getDataLevelUserLoginNew
} from "../../../../axios/axios";
import { isSuccess, deepCopy } from "../../../../lib/util";

export default {
    data () {
        return {
            // 导入的mt名称
            imp_mt: "empContractInfo.importData",
            // 导出字段设置, code字段名 name列名
            expDataTital: [
                { code: "contTypeDis", name: "合同类别" },
                { code: "contPeriodDis", name: "合同期限" },
                { code: "conSdate", name: "合同开始日" },
                { code: "conEdate", name: "合同到期日" },
                { code: "contPeriodDis", name: "合同期限" },
                { code: "conSdate", name: "合同开始日" },
                { code: "conEdate", name: "合同结束日" },
                { code: "contSigndate", name: "签署日期" },
                { code: "contProbatDis", name: "试用期限" },
                { code: "contProbatdt", name: "试用到期时间" }
            ],
            // 导入导出默认参数 无需变更
            openImport: false,
            openExpDow: false,
            openExp: false,
            filekey: "",
            filename: "",
            total: NaN,
            logTypeE: this.logType,
            showMsg: false,
            rows: 10,
            page: 1,
            columns: [
                {
                    type: "selection",
                    width: 60,
                    align: "center"
                },
                {
                    title: "合同类别",
                    key: "contTypeDis",
                    width: 150,
                    sortable: "custom"
                },
                {
                    title: "合同期限",
                    key: "contPeriodDis",
                    width: 150,
                    sortable: "custom"
                },
                {
                    title: "合同开始日",
                    key: "contSdate",
                    width: 150,
                    sortable: "custom"
                },
                {
                    title: "合同结束日",
                    key: "contEdate",
                    width: 150,
                    sortable: "custom"
                },
                {
                    title: "签署日期",
                    key: "contSigndate",
                    width: 150,
                    sortable: "custom"
                },
                {
                    title: "试用期限",
                    key: "contProbatDis",
                    width: 150,
                    sortable: "custom"
                },
                {
                    title: "试用到期时间",
                    key: "contProbatdt",
                    width: 150,
                    sortable: "custom"
                },

                {
                    title: "操作",
                    key: "action",
                    fixed: "right",
                    align: "center",
                    width: 64,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "success",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.showMsgBtn(
                                                params.row.id,
                                                '查看',
                                                params.index
                                            );
                                        }
                                    }
                                },
                                "查看"
                            )
                        ]);
                    }
                }
            ],
            data: [],
            docsName: "",
            params: {
                _mt: "empContractinfo.getPage",
                funId: "1",
                rows: 10,
                page: 1,
                sort: "id",
                order: "asc",
                logType: "",
                pkId: ""
            },
            index: 0,
            tableselected: [],
            loading: ''
        };
    },
    //    主表id
    props: {
        mainId: Number,
        logType: String
    },
    components: {
        contentMsg,
        expwindow,
        expdow,
    },
    mounted () { },
    methods: {
        search () {
            this.params.pkId = this.mainId + "";
            // this.
            this.getData();
        },
        getData () {
            const t = this;
            const data = deepCopy(t.params);
            data.docsName = t.docsName;
            for (const dat in data) {
                if (data[dat] === "") {
                    delete data[dat];
                }
            }
            getDataLevelUserLoginNew(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.total = res.data.content[0].records;
                        t.data = res.data.content[0].rows;
                    }
                })
                .catch(() => {
                    this.$Message.error('网络错误');
                });
        },
        pageChange (page) {
            const t = this;
            t.params.page = page;
            t.getData();
        },
        sortable (column) {
            this.params.sort = column.key;
            this.params.order = column.order;
            if (this.params.order !== "normal") {
                this.getData();
            } else {
                this.params.order = "desc";
            }
        },
        selectedtable (selection) {
            const newArr = [];
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id);
            }
            this.tableselected = newArr;
        },
        sizeChange (size) {
            const t = this;
            t.params.rows = size;
            t.getData();
        },
        //打开子表详细信息页面 无需变更
        showMsgBtn (id, logType, index) {
            const t = this;
            t.showMsg = true;
            t.logTypeE = logType;
            t.index = index;
            if (t.logTypeE === this.$t("button.upd")) {
                t.$refs.contentMsg.setRowId(id);
            }
        },

        clear () {
            const t = this;
            t.docsName = "";
            t.page = 1;
            t.rows = 10;
        },
        hideMsg () {
            this.showMsg = false;
        },
        // 导入导出默认方法
        expData () {
            const t = this;
            // 填装查询条件
            const data = {
                bankCode: t.bankCode,
                bankCname: t.bankCname,
                bankSwiftcode: t.bankSwiftcode
            };
            // 设置导出mt参数
            this.$refs.expwindow.getData(
                this.expDataTital,
                "empContractInfo.export",
                data
            );
            this.openExp = true;
        },
        // 导入导出默认方法 无需更改
        closeExp () {
            const t = this;
            t.$refs.expwindow.checkAll = false;
            t.$refs.expwindow.indeterminate = false;
            t.$refs.expwindow.expDisFields = [];
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
        }
    }
};
</script>
<style lang="scss" scoped>
.content-main {
    height: 500px;
    .table-form {
        margin: 10px 0;
    }
}
</style>
