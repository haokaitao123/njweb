<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="mouse"></Icon>
                    &nbsp;{{$t('lang_organization.orgpost.title')}}
                </p>
                <Row>
                    <Col span="18"
                         style="width: 100% !important">
                    <Row>
                        <Input :placeholder="$t('lang_organization.orgpost.postFCOrENameInp')"
                               style="width: 200px"
                               v-model="postFname" />
                        <Select v-model="postDfpslevel"
                                style="width: 200px"
                                placeholder="请选择职位级别">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selectDfpslevel"
                                    :key="index"
                                    @click="getPageByType(item.paramCode)">{{item.paramInfoCn}}</Option>
                        </Select>
                        <btnList @buttonExport="expData"
                                 @buttonImport="importExcel"
                                 @buttonAdd="openUp(NaN,$t('button.add'))"
                                 @buttonDel="deletemsg"
                                 @buttonValid="modifystatus('02valid')"
                                 @buttonDraft="modifystatus('01draft')"
                                 @buttonInvalid="modifystatus('03invalid')"
                                 @moditySelect="modityChange"
                                 @buttonSearch="search"
                                 :btnData="btnData"
                                 :FlowNode="FlowNode"></btnList>
                    </Row>
                    <!--布置分页列表 变量通用 无需变更-->
                    <row class="table-form"
                         ref="table-form">
                        <Table @on-select="selectedtable"
                               @on-select-cancel="selectedtable"
                               @on-select-all="selectedtable"
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
                              :current="page"
                              size="small"
                              show-elevator
                              show-sizer
                              placement="top"
                              @on-page-size-change="sizeChange"
                              @on-change="pageChange"
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
import update from "./orgpostInfoView";
// 默认引用 无需变更
import { isSuccess } from "../../../lib/util";
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin
} from "../../../axios/axios";
import expwindow from "../../../components/fileOperations/expSms";
import expdow from "../../../components/fileOperations/expdow";
import importExcel from "../../../components/importModel/importParam";
import btnList from "../../../components/btnAuth/btnAuth";
export default {
    data () {
        return {
            // 导入的mt名称
            imp_mt: "orgPost.importData",
            // 导出字段设置, code字段名 name列名
            expDataTital: [
                { code: "postCode", name: "岗位编码" },
                { code: "postFname", name: "岗位名称" },
                { code: "postDfpslevelName", name: "岗位级别" },
                { code: "postStansalary", name: "岗位标准薪资" },
                { code: "postTrialsalary", name: "试用期薪资" },
                { code: "postCostsharingDis", name: "分摊成本" },
                { code: "seniorityWageDis", name: "工龄工资" },
                { code: "postStationDis", name: "是否驻厂" },
                { code: "postValiddate", name: "生效日期" },
                { code: "postInvdate", name: "失效日期" },
                { code: "postReason", name: "失效原因" },
                { code: "note", name: "备注" }
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
            value: "",
            logType: "",
            openUpdate: false,
            updateId: NaN,
            tableselected: [],
            //页面初始化默认状态
            state: '02valid',
            selectDfpslevel: [],
            postDfpslevel: "",
            postDfpslevelData: [], //
            columns: [
                {
                    type: "selection",
                    width: 54,
                    fixed: "left",
                    align: "center"
                },
                {
                    title: this.$t("lang_organization.orgpost.postCode"),
                    key: "postCode",
                    width: 180,
                    fixed: "left",
                    sortable: "custom"
                },
                {
                    title: "岗位名称",
                    width: 180,
                    key: "postFname"
                },

                {
                    title: "职位级别",
                    key: "postDfpslevelName",
                    sortable: "custom",
                    width: 180
                },
                {
                    title: "岗位标准薪资",
                    width: 180,
                    key: "postStansalary",
                    sortable: "custom"
                },
                {
                    title: this.$t("lang_organization.orgpost.postTrialsalary"),
                    width: 180,
                    key: "postTrialsalary",
                    sortable: "custom"
                },

                {
                    title: "分摊成本",
                    width: 180,
                    key: "postCostsharing",
                    render: (h, params) => {
                        return h(
                            "div",
                            params.row.postCostsharing == 1 ? "分摊" : "不分摊"
                        );
                    }
                },
                {
                    title: this.$t("lang_organization.orgpost.seniorityWage"),
                    width: 180,
                    key: "seniorityWage",
                    render: (h, params) => {
                        return h("div", params.row.seniorityWage == 1 ? "有" : "无");
                    }
                },
                {
                    title: this.$t("lang_organization.orgpost.postStation"),
                    width: 180,
                    key: "postStation",
                    render: (h, params) => {
                        return h("div", params.row.postStation == 1 ? "是" : "否");
                    }
                },

                {
                    title: this.$t("lang_organization.orgpost.postValiddate"),
                    key: "postValiddate",
                    sortable: "custom",
                    width: 180
                },
                {
                    title: this.$t("lang_organization.orgpost.postInvdate "),
                    key: "postInvdate",
                    sortable: "custom",
                    width: 180
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
            order: "desc",
            rows: 10,
            page: 1,
            funId: "1000",
            postCode: "",
            postFname: "",
            treeid: "",
            params: {
                _mt: "orgPost.getPage",
                sort: "id",
                order: "asc",
                rows: 10,
                page: 1,
                funId: "1",
                logType: "岗位信息查询",
                data: "{}"
            },
            state: this.modity,
            loading: "",
        };
    },
    computed: {
        btnData () {
            return this.$store.state.btnOperate.btnData
        },
        FlowNode () {
            return this.$store.state.btnOperate.isFlowNode
        },
        pageShow () {
            return this.$store.state.btnOperate.pageShow;
        },
        tableButton () {
            return this.$store.state.btnOperate.tableButton;
        },
        tableOperate () {
            return this.$store.state.btnOperate.tableOperate;
        },
        modity () {
            return this.$store.state.btnOperate.modity;
        }
    },
    components: {
        // 初始化子页面
        btnList,
        update,
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
        if (this.pageShow != "") {
            this.columns.push(this.tableBtn);
            this.$store.commit("btnOperate/setTableOperate", "true");
        }
    },
    watch: {
        pageShow (val) {
            if (val == "" && this.tableOperate == "true") {
                this.columns.pop();
                this.$store.commit("btnOperate/setTableOperate", "false");
            } else if (this.tableOperate == "false") {
                this.columns.push(this.tableBtn);
                this.$store.commit("btnOperate/setTableOperate", "true");
            }
        }
    },
    //初始化自动调用方法
    mounted () {
        this.getData();
        this.getSelect();
        this.postDfpslevelSelect();
    },
    methods: {
        //状态
        modityChange (res) {
            this.getData();
        },
        getData (id) {
            const t = this;
            this.loading = true;
            this.page = 1;
            const data = {
                _mt: "orgPost.getPage",
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: "岗位查询",
                postCode: t.postCode,
                funId: "1000",
                postFname: t.postFname,
                state: t.modity,
                postDfpslevel: t.postDfpslevel,
                postUnit: id || ""
            };
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
                    t.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage")
                    });
                }).finally(() => {
                    this.loading = false
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
            t.getData(this.treeid);
        },
        pageChange (page) {
            const t = this;
            t.page = page;
            t.getData(this.treeid);
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
                t.$Modal.warning({
                    title: this.$t("reminder.remind"),
                    content: this.$t("reminder.leastone")
                });
            } else {
                t.$Modal.confirm({
                    title: this.$t("reminder.remind"),
                    content: this.$t("reminder.confirmdelete"),
                    onOk: () => {
                        getDataLevelUserLogin({
                            _mt: "orgPost.delByIds",
                            funId: "1",
                            logType: this.$t("button.del"),
                            delIds: t.tableselected.toString()
                        })
                            .then(res => {
                                if (isSuccess(res, t)) {
                                    t.tableselected = [];
                                    // t.getTree()
                                    t.getData();
                                }
                            })
                            .catch(() => {
                                t.$Modal.error({
                                    title: this.$t("reminder.err"),
                                    content: this.$t("reminder.errormessage")
                                });
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
        closeUp () {
            const t = this;
            t.openUpdate = false;
            t.$refs.update.formValidate.postCode = "XXXXXX";
            t.$refs.update.formValidate.postFname = "";
            t.$refs.update.formValidate.seniorityWage = "1";
            t.$refs.update.formValidate.postDfpslevel = "";
            t.$refs.update.formValidate.postStansalary = null;
            t.$refs.update.formValidate.postTrialsalary = null;
            t.$refs.update.formValidate.postCostsharing = "1";
            t.$refs.update.formValidate.postStation = "";
            t.$refs.update.formValidate.postValiddate = "";
            t.$refs.update.formValidate.postInvdate = "";
            t.$refs.update.formValidate.postReason = "";
            t.$refs.update.formValidate.note = "";
        },
        search () {
            this.page = 1;
            this.getData();
        },
        modifystatus (state) {
            const t = this;
            let logType = "";
            let tipContent = "";
            if (state === "02valid") {
                logType = "生效";
                tipContent = "您确定继续操作吗？"
            } else if (state === "03invalid") {
                logType = "失效";
                tipContent = "您确定继续操作吗？"
            }
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t("reminder.remind"),
                    content: this.$t("reminder.leastone")
                });
                return;
            }
            t.$Modal.confirm({
                title: this.$t("reminder.remind"),
                content: tipContent,
                onOk: () => {
                    getDataLevelUserLogin({
                        _mt: "orgPost.setStateById",
                        logType: logType,
                        state: state,
                        ids: t.tableselected.toString()
                    })
                        .then(res => {
                            if (isSuccess(res, t)) {
                                t.getData();
                                this.$Message.success('操作成功');
                            }
                        })
                        .catch(() => {
                            this.$Message.error('操作失败');
                        });
                },
                onCancel: () => { }
            });

        }, //修改状态
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
                postCode: t.postCode,
                postFname: t.postFname,
                postDfpslevel: t.postDfpslevel,
                state: t.modity
            };
            // 设置导出mt参数
            this.$refs.expwindow.getData(this.expDataTital, "orgPost.export", data);
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
        },
        postDfpslevelSelect () {
            const t = this;
            t.postDfpslevelData = [];
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                logType: t.logType,
                typeCode: "postlevel"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.postDfpslevelData = res.data.content[0].value[0].paramList;
                        let obj = {
                            paramCode: "",
                            paramInfoCn: "全部"
                        };
                        t.postDfpslevelData.unshift(obj);
                    }
                })
                .catch(() => {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage")
                    });
                });
        }, // 组织类别下拉列表数据
        getSelect () {
            const t = this;
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: "postlevel"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.selectDfpslevel = res.data.content[0].value[0].paramList;
                        let obj = {
                            paramCode: "",
                            paramInfoCn: "全部"
                        };
                        t.selectDfpslevel.unshift(obj);
                    }
                })
                .catch(() => {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage")
                    });
                });
        },
        getPageByType (paramCode) {
            this.status = paramCode;
            this.unitTypeId = paramCode;
            this.getData();
        } //根据类型获取列表
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
