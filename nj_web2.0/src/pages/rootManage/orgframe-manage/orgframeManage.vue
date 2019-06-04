<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="mouse"></Icon>&nbsp;组织信息管理
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
                    <Col span="21"
                         style="width: 73.3333% !important">
                    <Row>
                        <Input placeholder="请输入组织名称"
                               style="width: 200px"
                               v-model="unitFname" />
                        <Select v-model="unitType"
                                style="width: 200px"
                                placeholder="请选择组织类别"
                                clearable>
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in unitTypeData"
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
                                 @buttonUnitChart="pickData()"
                                 @moditySelect="modityChange"
                                 @buttonSearch="search"
                                 :btnData="btnData"
                                 :FlowNode="FlowNode"></btnList>
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
                              :current="page"
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
            <orgframeChart v-show="openChart"
                           @closeChart="closeChart"
                           ref="orgframeChart"></orgframeChart>
        </transition>
        <transition name="fade">
            <searchOrgframe v-show="openPick"
                            :searchCloumns="searchCloumns"
                            :params="params"
                            @closeUp="closeFrame"
                            @changeinput="changeinput"
                            ref="searchOrgframe"></searchOrgframe>
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
import btnList from "../../../components/btnAuth/btnAuth.js";
import orgframeChart from "./orgframeChart";
import update from "./orgframeInfoView";
import searchOrgframe from "../../../components/searchTable/searchOrgframe";
import { isSuccess } from "../../../lib/util";
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin
} from "../../../axios/axios";
import expwindow from "../../../components/fileOperations/expSms";
import expdow from "../../../components/fileOperations/expdow";
import importExcel from "../../../components/importModel/importParam";
export default {
    components: {
        update,
        orgframeChart,
        searchOrgframe,
        btnList,
        expwindow,
        expdow,
        importExcel
    },
    data () {
        return {
            tableOperate: false, //加上这个变量
            // 导入的mt名称
            imp_mt: "orgUnits.importData",
            // 导出字段设置, code字段名 name列名
            expDataTital: [
                { code: "unitCode", name: "组织编码" },
                { code: "unitFname", name: "组织架构全称" },
                { code: "unitTypeName", name: "组织类型" },
                { code: "unitPname", name: "上级部门" },
                { code: "unitPartfunctName", name: "部门职能" },
                { code: "unitIndustryName", name: "行业" },
                { code: "empnhName", name: "负责人" },
                { code: "unitCenterName", name: "成本中心" },
                { code: "unitCityName", name: "雇佣地点" },
                { code: "unitValdate", name: "生效日期" },
                { code: "unitInvdate", name: "失效日期" },
                { code: "unitInvres", name: "失效原因" },
                { code: "partEstablish", name: "部门编制" },
                { code: "unitManger", name: "经理编制" },
                { code: "unitDirec", name: "主管编制" },
                { code: "unitStaff", name: "员工编制" },
                { code: "unitPtstaff", name: "驻厂员工编制" },
                { code: "unitSysaligName", name: "系统转正" },
                { code: "note", name: "备注" }
            ],
            // 导入导出默认参数 无需变更
            openImport: false,
            openExpDow: false,
            openExp: false,
            filekey: "",
            filename: "",
            //左边树的默认参数
            openChart: false,
            loading: true,
            dataTree: [],
            treeheight: document.body.offsetHeight - 200,
            //子页面所需参数，无需变更
            tableheight: document.body.offsetHeight - 280,
            value: "",
            logType: "",
            openUpdate: false,
            updateId: NaN,
            tableselected: [],
            dropdownMenuList: [], //状态下拉选择框数据
            unitTypeData: [], //组织类型下拉选择框数据
            statusDis: "",
            unitTypeId: NaN,
            status: "",
            unitPid: "",
            columns: [
                {
                    type: "selection",
                    width: 54,
                    fixed: "left",
                    align: "center"
                },
                {
                    title: "组织编码",
                    key: "unitCode",
                    width: 140,
                    fixed: "left",
                    sortable: "custom"
                },
                {
                    title: "组织架构名称",
                    width: 180,
                    key: "unitFname"
                },
                {
                    title: "组织类型",
                    width: 140,
                    key: "unitTypeName",
                    sortable: "custom"
                },
                {
                    title: "上级部门",
                    width: 180,
                    key: "unitPname",
                    sortable: "custom"
                },
                {
                    title: "部门职能",
                    key: "unitPartfunctName",
                    width: 140
                },
                {
                    title: "行业",
                    key: "unitIndustryName",
                    width: 140
                },
                {
                    title: "负责人",
                    key: "empnhName",
                    width: 140
                },
                {
                    title: "成本中心",
                    key: "unitCenterName",
                    width: 140
                },
                {
                    title: "雇佣地点",
                    key: "unitCityName",
                    width: 140
                },
                {
                    title: "生效日期",
                    key: "unitValdate",
                    sortable: "custom",
                    width: 140
                },
                {
                    title: "失效日期",
                    key: "unitInvdate",
                    sortable: "custom",
                    width: 140
                },
                {
                    title: "部门编制",
                    key: "partEstablish",
                    width: 140
                },
                {
                    title: "经理编制",
                    key: "unitManger",
                    width: 140
                },
                {
                    title: "主管编制",
                    key: "unitDirec",
                    width: 140
                },
                {
                    title: "员工编制",
                    key: "unitStaff",
                    width: 140
                },
                {
                  title: "驻厂员工编制",
                  key: "unitPtstaff",
                  width: 140
                },
                {
                    title: "系统转正",
                    key: "unitSysalig",
                    width: 140,
                    render: (h, params) => {
                        return h("div", params.row.unitSysalig == 1 ? "是" : "否");
                    }
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
            funId: "1000",
            unitCode: "",
            compFnameCnDis: "",
            treeid: "",
            empnhName: "",
            unitFname: "",
            unitType: "",
            openPick: false,
            unitPid: "",
            params: {
                _mt: "orgUnits.getByOrgFramePageList",
                sort: "id",
                order: "asc",
                rows: 10,
                page: 1,
                funId: "1",
                logType: "组织架构查询",
                data: "{}",
                unitPid: 0
            },
            modify: "false",
            searchCloumns: [
                {
                    title: this.$t("lang_organization.orgframe.unitCode"),
                    key: "unitCode",
                    sortable: "custom"
                },
                {
                    title: this.$t("lang_organization.orgframe.compCOrEName"),
                    key: "unitFname"
                },
                {
                    title: this.$t("lang_organization.orgframe.unitTypeName"),
                    key: "unitTypeName"
                }
            ],
            state: this.modity,
            loading: ""
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
    created () {
        if (this.pageShow !== "") {
            this.columns.push(this.tableBtn);
            this.tableOperate = true;
        }
    },
    mounted () {
        this.getData();
        this.getTree();
        // this.getSelect();
        this.unitTypeSelect();
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
        modityChange (res) {
            this.tableselected = [];
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
                unitCode: t.unitCode,
                unitFname: t.unitFname,
                unitType: t.unitType,
                state: t.modity,
                unitPid: t.treeid
            };
            // 设置导出mt参数
            this.$refs.expwindow.getData(this.expDataTital, "orgUnits.export", data);
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
        pickData () {
            const t = this;
            t.$refs.searchOrgframe.getData(this.params);
            t.openPick = true;
        }, //点击组织架构图
        changeinput (name, id, costname, costid) {
            const t = this;
            t.openPick = false;
            t.$refs.orgframeChart.getData(id);
            t.openChart = true;
        }, //输入框
        closeFrame () {
            const t = this;
            t.openPick = false;
        }, //关闭Frame
        closeChart () {
            this.openChart = false;
        }, //关闭组织架构图
        getData (id, page) {
            const t = this;
            if (typeof page == "undefined") {
                this.page = 1;
            }
            const data = {
                _mt: "orgUnits.getByOrgFramePageList",
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: "组织架构查询",
                unitFname: t.unitFname,
                unitType: t.unitType,
                unitPid: id,
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
                        this.loading = false;
                        t.data = res.data.content[0].rows;
                        t.total = res.data.content[0].records;
                    }
                })
                .catch(() => {
                    this.loading = false;
                    // t.$Modal.error({
                    //     title: this.$t("reminder.err"),
                    //     content: this.$t("reminder.errormessage")
                    // });
                    this.$Message.error(this.$t("reminder.errormessage"));
                })
                .finally(() => {
                    this.$store.commit('btnOperate/setSearchLoading', false)
                });
        }, //获取列表数据
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
        addNewArray (res) {
            const t = this;
            t.data.unshift(res);
            t.getTree();
        },
        updateArray (res) {
            const t = this;
            t.data.splice(t.index, 1, res);
            t.getTree();
        },
        sortable (column) {
            this.sort = column.key;
            this.order = column.order;
            if (this.order !== "normal") {
                this.getData(this.treeid);
            } else {
                this.order = "desc";
            }
        }, //排序
        sizeChange (size) {
            const t = this;
            t.rows = size;
            t.getData(this.treeid);
        }, //分页
        pageChange (page) {
            const t = this;
            t.page = page;
            t.getData(this.treeid, t.page);
        }, //分页
        selectedtable (selection) {
            const newArr = [];
            console.log(selection, "selection");
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id);
            }
            console.log(newArr, "newArr");
            this.tableselected = newArr;
        }, //列表中选中的item
        deletemsg () {
            const t = this;
            if (t.tableselected.length === 0) {
                // t.$Modal.warning({
                //   title: this.$t("reminder.remind"),
                //   content: this.$t("reminder.leastone")
                // });
                this.$Message.warning('请至少选择一条数据');
            } else {
                t.$Modal.confirm({
                    title: this.$t("reminder.remind"),
                    content: this.$t("reminder.confirmdelete"),
                    onOk: () => {
                        getDataLevelUserLogin({
                            _mt: "orgUnits.delByIds",
                            funId: "1",
                            logType: this.$t("button.del"),
                            delIds: t.tableselected.toString()
                        })
                            .then(res => {
                                if (isSuccess(res, t)) {
                                    t.tableselected = [];
                                    t.getData();
                                    t.getTree();
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
        openUp (id, logType, index) {
            const t = this;
            t.updateId = parseInt(id, 10);
            t.logType = logType;
            t.openUpdate = true;
            t.index = index;
            // t.$refs.update.getSelect();
            t.$refs.update.formValidate.unitSysalig = "1";
            t.$refs.update.formValidate.unitOprecord = "";
            t.$refs.update.disabled = false;
            t.$refs.update.getSelect("orgunittype");
            t.$refs.update.getSelect("unitIndustry");
            t.$refs.update.getSelect("unitPartfunct");

            if (logType === this.$t("button.upd") || logType === "查看") {
                t.$refs.update.getData(id);
            }
            if (logType === "查看") {
                t.$refs.update.formValidate.unitSysalig = "1";
                t.$refs.update.disabled = true;
            }
        }, //打开窗口
        closeUp () {
            const t = this;
            t.openUpdate = false;
            t.$refs.update.formValidate.unitCode = "XXXXXX";
            t.$refs.update.formValidate.unitType = "";
            t.$refs.update.formValidate.unitFname = "";
            t.$refs.update.formValidate.empId = "";
            t.$refs.update.formValidate.unitPid = "";
            t.$refs.update.formValidate.unitPartfunct = "";
            t.$refs.update.formValidate.unitIndustry = "";
            t.$refs.update.formValidate.unitCenter = "";
            t.$refs.update.formValidate.unitCity = "";
            t.$refs.update.formValidate.unitValdate = "";
            t.$refs.update.formValidate.unitInvdate = "";
            t.$refs.update.formValidate.unitInvres = "";
            t.$refs.update.formValidate.partEstablish = "";
            t.$refs.update.formValidate.unitManger = "";
            t.$refs.update.formValidate.unitDirec = "";
            t.$refs.update.formValidate.unitStaff = "";
            t.$refs.update.formValidate.unitPtstaff = "";
            t.$refs.update.formValidate.unitSysalig = "";
            t.$refs.update.formValidate.unitOprecord = "";
            t.$refs.update.formValidate.note = "";
            t.$refs.update.unitCenterName = "";
            t.$refs.update.unitCityName = "";
            t.$refs.update.unitPname = "";
            t.$refs.update.empnhName = "";
        }, //关闭窗口
        selected (key, name) {
            this.select = name;
            this.cityTypeName = key;
            this.getData();
        }, //下拉选中
        search () {
            this.$store.commit('btnOperate/setSearchLoading', true);
            this.treeid = "";
            this.tableselected = [];
            this.page = 1;
            this.getData();
        }, //查询
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
        }, //渲染树状图
        getSelect () {
            const t = this;
            t.dropdownMenuList = [];
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                logType: t.logType,
                typeCode: "pubuserstatus"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        // t.dropdownMenuList = res.data.content[0].value[0].paramList
                    }
                })
                .catch(() => {
                    //this.$Modal.error({
                    // title: this.$t("reminder.err"),
                    // content: this.$t("reminder.errormessage")

                    // });
                    this.$Message.error("reminder.errormessage");
                });
        }, //获取下拉列表
        modifystatus (state) {
            const t = this;
            let logType = "";
            let tipContent = "";
            if (state === "02valid") {
                logType = "生效";
                tipContent = "您确定继续操作吗？";
            } else if (state === "03invalid") {
                logType = "失效";
                tipContent = "您确定继续操作吗？";
            }
            if (t.tableselected.length === 0) {
                // t.$Modal.warning({
                //   title: this.$t("reminder.remind"),
                //   content: this.$t("reminder.leastone")
                // });
                this.$Message.warning('请至少选择一条数据');
                return;
            }
            t.$Modal.confirm({
                title: this.$t("reminder.remind"),
                content: tipContent,
                onOk: () => {
                    getDataLevelUserLogin({
                        _mt: "orgUnits.setStateById",
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
        }, //修改状态
        unitTypeSelect () {
            const t = this;
            t.unitTypeData = [];
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                logType: t.logType,
                typeCode: "orgunittype"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.unitTypeData = res.data.content[0].value[0].paramList;
                        // let obj = {
                        //     paramCode: "",
                        //     paramInfoCn: "请选择"
                        // };
                        // t.unitTypeData.unshift(obj);
                    }
                })
                .catch(() => {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage")
                    });
                });
        }, // 组织类别下拉列表数据
        getPageByType (paramCode) {
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
    border: 1px #efefef solid;
    overflow: auto;
    position: relative;
}
</style>
