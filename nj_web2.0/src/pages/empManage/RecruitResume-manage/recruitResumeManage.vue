<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="mouse"></Icon>
                    &nbsp;招聘简历管理
                </p>
                <Row>
                    <Col span="18"
                         style="width: 100% !important">
                    <Row>
                        <Input placeholder="请输入姓名"
                               style="width: 200px"
                               v-model="resuName" />
                        <Input placeholder="请输入证件号码"
                               style="width: 200px"
                               v-model="resuIdno" />
                        <btnList @buttonExport="expData"
                                 @buttonSearch="search"
                                 :btnData="btnData"
                                 :FlowNode="FlowNode"></btnList>
                    </Row>
                    <!--布置分页列表 变量通用 无需变更-->
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
                    @newdata="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <!--<transition name="fade">-->
        <!--<update-->
        <!--v-show="openUpdate"-->
        <!--:id="updateId"-->
        <!--:logType="logType"-->
        <!--:index="index"-->
        <!--@closeUp="closeUp"-->
        <!--@getData="addNewArray"-->
        <!--@update="updateArray"-->
        <!--ref="update"-->
        <!--&gt;</update>-->
        <!--</transition>-->
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
import update from "./recruitResumeBase";
// 默认引用 无需变更
import { isSuccess } from "../../../lib/util";
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin
} from "../../../axios/axios";
import expwindow from "../../../components/fileOperations/expSms";
import expdow from "../../../components/fileOperations/expdow";
import btnList from "../../../components/btnAuth/btnAuth";
export default {
    data () {

        return {
            // 导出字段设置, code字段名 name列名
            expDataTital: [
                { code: "resuApplypost", name: "应聘岗位" },
                { code: "resuIdentityDis", name: "身份" },
                { code: "resuFilldate", name: "面试日期" },
                { code: "resuName", name: "姓名" },
                { code: "resuIdno", name: "证件号码" },
                { code: "resuMobile", name: "手机号" },
                { code: "resuGenderDis", name: "性别" },
                { code: "resuBirtday", name: "出生日期" },
                { code: "resuBirtplace", name: "籍贯" },
                { code: "resuNatalityDis", name: "民族" },
                { code: "resuPoliticalDis", name: "政治面貌" },
                { code: "resuHealthstaDis", name: "健康状况" },
                { code: "resuMaritlstaDis", name: "婚育状况" },
                { code: "resuHeight", name: "身高(cm)" },
                { code: "resuWeight", name: "体重(kg)" },
                { code: "resuEducatDis", name: "学历" },
                { code: "resuSchool", name: "毕业院校" },
                { code: "resuProfes", name: "专业" },
                { code: "resuLiving", name: "现居住地" },
                { code: "resuFamadds", name: "家庭地址" },
                { code: "resuEmernm", name: "紧急联系人姓名" },
                { code: "resuEmphone", name: "紧急联系人电话" },
                { code: "resuWithmeDis", name: "与本人关系" },
                { code: "resuSalary", name: "期望薪资" },
                { code: "resuProstatusDis", name: "职业状态" },
                { code: "resuAvaitime", name: "可到岗时间" },
                { code: "resuIsrelativesDis", name: "是否有亲朋在本公司任职" },
                { code: "resuRelatname", name: "本公司任职亲朋姓名" },
                { code: "resuRelatdept", name: "本公司任职亲朋所在部门" },
                { code: "resuIscriminalDis", name: "是否有犯罪记录" },
                { code: "resuIstattooDis", name: "是否有纹身" },
                { code: "resuApplytypeDis", name: "通过何种方式应聘" },
                { code: "resuIntrname", name: "介绍人姓名" },
                { code: "resuIscomDis", name: "是否服从调配" },
                { code: "resuSelfeval", name: "自我评价" },
                { code: "resuEnrorageDis", name: "招生范围" },
                { code: "resuIsgraduDis", name: "是否毕业" },
                { code: "resuFinalapptm", name: "最后应聘时间" },
                { code: "note", name: "备注" },
            ],
            // 导入导出默认参数 无需变更
            openExpDow: false,
            openExp: false,
            filekey: "",
            filename: "",
            // 子页面所需参数 无需变更
            tableheight: document.body.offsetHeight - 280,
            value: "",
            logType: "",
            openUpdate: false,
            updateId: NaN,
            tableselected: [],
            columns: [
                {
                    type: "selection",
                    width: 54,
                    fixed: "left",
                    align: "center"
                },
                {
                    title: '应聘岗位',
                    key: "resuApplypost",
                    width: 180,
                    sortable: "custom"
                },
                {
                    title: "身份",
                    width: 180,
                    sortable: "custom",
                    key: "resuIdentityDis"
                },

                {
                    title: "姓名",
                    key: "resuName",
                    sortable: "custom",
                    width: 180
                },
                {
                    title: "性别",
                    width: 180,
                    key: "resuGenderDis",
                    sortable: "custom"
                },
                {
                    title: "手机号",
                    width: 180,
                    key: "resuMobile",
                    sortable: "custom"
                },
                {
                    title: "证件号码",
                    width: 180,
                    key: "resuIdno",
                    sortable: "custom"
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
                                            this.pageShow.indexOf(v.btnName) !== -1
                                                ? "inline"
                                                : "none"
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
            resuIdno: "",
            resuName: "",
            loading: "",
            tableOperate: false
        };
    },
    computed: {
        btnData () {
            return this.$store.state.btnOperate.btnData;
        },
        FlowNode () {
            return this.$store.state.btnOperate.isFlowNode;
        },
        pageShow () {
            return this.$store.state.btnOperate.pageShow;
        },
        tableButton () {
            return this.$store.state.btnOperate.tableButton;
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
    },
    //按钮权限控制
    pickData () {
        const t = this;
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
                this.tableOperate = true
            }
        }
    },
    //初始化自动调用方法
    mounted () {
        this.getData();
        this.getSelect();
    },
    methods: {
        //状态
        modityChange (res) {
            this.getData();
        },
        getData (id, page) {
            const t = this;
            this.loading = true;
            if (page === undefined) {
                this.page = 1;
            }
            const data = {
                _mt: "recruitResume.getPage",
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: "简历库查询",
                resuName: t.resuName,
                resuIdno: t.resuIdno,
            };
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
                })
                .finally(() => {
                    this.loading = false;
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
                            _mt: "recruitResume.delByIds",
                            logType: this.$t("button.del"),
                            delIds: t.tableselected.toString()
                        })
                            .then(res => {
                                if (isSuccess(res, t)) {
                                    t.tableselected = [];
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
            if (logType === "查看") {
                t.$refs.update.disabled = true;
            }
            if (t.logType === this.$t('button.upd') || logType === "查看") {
                // 调用子页面方法 传递参数 无需变更
                t.$refs.update.getOption(id, logType)
            }
        },
        closeUp () {
            const t = this;
            t.openUpdate = false;
        },
        search () {
            this.page = 1;
            this.getData();
        },
        // 导入导出默认方法
        expData () {
            const t = this;
            // 填装查询条件
            const data = {
                resuName: t.resuName,
                resuIdno: t.resuIdno
            };
            // 设置导出mt参数
            this.$refs.expwindow.getData(this.expDataTital, "recruitResume.export", data);
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
        getSelect () {
            const t = this;
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
    overflow: auto;
    border: 1px #efefef solid;
}
</style>
