<template>
    <div class="content-main">
        <row>
            <Select v-model="contType"
                    style="width:200px">
                <Option :value="item.paramCode"
                        v-for="(item,index) in selectEdConType"
                        :key="index">{{item.paramInfoCn}}</Option>
            </Select>
            <Button type="primary"
                    icon="search"
                    :loading="searchLoading"
                    @click="search()">查询</Button>
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
                        ref="contentMsg"></contentMsg>
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
                { code: "contSdate", name: "合同开始日" },
                { code: "contEdate", name: "合同到期日" },
                { code: "contBmxyDis", name: "保密协议" },
                { code: "contJzxyDis", name: "竞业限制协议" },
                { code: "contWorktime", name: "合同工作时间" },
                { code: "contSigndate", name: "签署日期" },
                { code: "contProbatDis", name: "试用期限" },
                { code: "contProbatdt", name: "试用到期时间" },
            ],
            // 导入导出默认参数 无需变更
            openImport: false,
            openExpDow: false,
            openExp: false,
            filekey: "",
            filename: "",
            total: NaN,
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
                    sortable: "custom",
                    align: "center",
                },
                {
                    title: "合同期限",
                    key: "contPeriodDis",
                    width: 150,
                    align: "center",
                    sortable: "custom"
                },
                {
                    title: "合同开始日",
                    key: "contSdate",
                    width: 150,
                    align: "center",
                    sortable: "custom"
                },
                {
                    title: "合同结束日",
                    key: "contEdate",
                    width: 150,
                    align: "center",
                    sortable: "custom"
                },
                {
                    title: "签署日期",
                    key: "contSigndate",
                    width: 150,
                    align: "center",
                    sortable: "custom"
                },
                {
                    title: "试用期限",
                    key: "contProbatDis",
                    width: 150,
                    align: "center",
                    sortable: "custom"
                },
                {
                    title: "试用到期时间",
                    key: "contProbatdt",
                    width: 150,
                    align: "center",
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
                                        type: "primary",
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
                                '查看'
                            )
                        ]);
                    }
                }
            ],
            data: [],
            docsName: "",
            params: {
                _mt: "empContractinfo.getEmpPage",
                funId: "1",
                rows: 10,
                page: 1,
                sort: "id",
                order: "asc",
                logType: "查看",
                pkId: ""
            },
            index: 0,
            tableselected: [],
            loading: '',
            contType: '',
            selectEdConType: [],
            contType: '',
            searchLoading: false
        };
    },
    computed: {
        mainId () {
            return this.$store.state.empMaster.mainId;
        },
        logType () {
            return this.$store.state.empMaster.logType;
        }
    },
    components: {
        contentMsg,
        expwindow,
        expdow,
    },
    mounted () {
        this.getSelect();
    },
    methods: {
        search (operate) {
            this.params.pkId = this.mainId + "";
            this.params.page = 1;
            if (!operate) {
                this.searchLoading = true;
            }
            this.getData();
            this.tableselected = [];
        },
        getSelect () {
            const t = this;
            // 合同类别：contrpertype
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: "contrpertype"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.selectEdConType = res.data.content[0].value[0].paramList;
                    }
                })
                .catch(() => {
                    this.$Message.error('网络错误');
                });
        },
        getData () {
            const t = this;
            const data = deepCopy(t.params);
            data.contType = t.contType;
            for (const dat in data) {
                if (data[dat] === "") {
                    delete data[dat];
                }
            }
            this.loading = true;
            getDataLevelUserLoginNew(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.total = res.data.content[0].records;
                        t.data = res.data.content[0].rows;
                    }
                })
                .catch(() => {
                    this.$Message.error('网络错误');
                })
                .finally(() => {
                    this.loading = false;
                    this.searchLoading = false;
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
            this.$store.commit('empMaster/setChildLogType', logType);
            t.index = index;
            t.$refs.contentMsg.setRowId(id);
        },
        clear () {
            const t = this;
            t.contType = "";
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
                pkId: this.mainId,
                contType: this.contType
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
        overflow: hidden;
    }
}
</style>
