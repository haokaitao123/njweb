<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 11px;"></Icon>
                    &nbsp;{{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <div class="option-main">
                <Row style="max-height: 460px;overflow-y: auto;" ref="scrollBox">
                    <Form ref="form"
                          :model="form"
                          :rules="ruleValidate"
                          :label-width="120">
                        <i-col span="11">
                            <FormItem label="合同编号"
                                      prop="numberCode">
                                <Input v-model="form.numberCode"
                                       :disabled="true" />
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem label="员工姓名"
                                      prop="empId">
                                <!--绑定双击清除方法-->
                                <span @dblclick="disabled?'':dbclean()">
                                    <!--v-model绑定显示字段-->
                                    <Input v-model="empName"
                                           icon="search"
                                           :readonly="true"
                                           :disabled="disabled || aa"
                                           placeholder="请选择员工"
                                           @on-click=" pickEmpData()" />
                                </span>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="部门"
                                      prop="deptId">
                                <Input v-model="deptIdDis"
                                       disabled="disabled"
                                       placeholder="请输入部门名称" />
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem label="岗位"
                                      prop="postId">
                                <Input v-model="postIdDis"
                                       disabled="disabled"
                                       placeholder="请输入岗位名称" />
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="员工类型"
                                      prop="empType">
                                <Select v-model="form.empType"
                                        :clearable="!disabled"
                                        :disabled="disabled"
                                        placeholder="请选择员工类型">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEmptype"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem label="合同类型"
                                      prop="contType">
                                <Select v-model="form.contType"
                                        :clearable="!disabled"
                                        :disabled="disabled"
                                        placeholder="请选择合同类型">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectContrpertype"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="合同期限"
                                      prop="contPeriod">
                                <Select v-model="form.contPeriod"
                                        :clearable="!disabled"
                                        :disabled="disabled"
                                        placeholder="选择合同期限"
                                        @on-change="contPeriodSelect">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectContperiod"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem label="合同开始日"
                                      prop="contSdate">
                                <DatePicker type="date"
                                            placeholder="选择合同开始日"
                                            :editable="false"
                                            :disabled="disabled"
                                            :readonly="disabled"
                                            v-model="form.contSdate"
                                            format="yyyy-MM-dd"
                                            @on-change="contSdateChange"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="合同到期日"
                                      prop="contEdate">
                                <DatePicker type="date"
                                            placeholder="选择合同到期日"
                                            disabled="disabled"
                                            readonly="readonly"
                                            :editable="false"
                                            :value="contEdateValue"
                                            v-model="form.contEdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem label="合同工作时间"
                                      prop="contWorktime">
                                <Select v-model="form.contWorktime"
                                        :clearable="!disabled"
                                        :disabled="disabled"
                                        placeholder="选择合同工作时间">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectWorktimetype"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="试用期限"
                                      prop="contProbat">
                                <Select v-model="form.contProbat"
                                        :clearable="!disabled"
                                        :disabled="disabled"
                                        placeholder="选择试用期限"
                                        @on-change="contProbatSelect">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectProbperiod"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem label="试用期到期日"
                                      prop="contProbatdt">
                                <DatePicker type="date"
                                            placeholder="选择试用期到期日"
                                            :editable="false"
                                            disabled="disabled"
                                            readonly="readonly"
                                            v-model="form.contProbatdt"
                                            format="yyyy-MM-dd"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="签订时间"
                                      prop="contSigndate">
                                <DatePicker type="date"
                                            placeholder="选择签订时间"
                                            :disabled="disabled"
                                            :readonly="disabled"
                                            :editable="false"
                                            v-model="form.contSigndate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem label="生效日期"
                                      prop="contValiddate">
                                <DatePicker type="date"
                                            placeholder="选择生效日期"
                                            :editable="false"
                                            :disabled="disabled"
                                            :readonly="disabled"
                                            v-model="form.contValiddate"
                                            format="yyyy-MM-dd"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="失效日期"
                                      prop="contInvdate">
                                <DatePicker type="date"
                                            placeholder="选择失效日期"
                                            :disabled="disabled"
                                            :readonly="disabled"
                                            :editable="false"
                                            v-model="form.contInvdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem label="保密协议"
                                      prop="contBmxy">
                                <RadioGroup v-model="form.contBmxy">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectAttendy"
                                           :key="index"
                                           :disabled="disabled">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="竞业限制协议"
                                      prop="contJzxy">
                                <RadioGroup v-model="form.contJzxy">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectAttendy"
                                           :key="index"
                                           :disabled="disabled">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </i-col>
                        <i-col span="22">
                            <FormItem label="附件上传"
                                      prop="fileKey">
                                <Row>
                                    <i-col span="4"
                                           v-show="!disabled">
                                        <Upload :before-upload="handleUpload"
                                                action=" ">
                                            <Button type="ghost"
                                                    icon="ios-cloud-upload-outline"
                                                    :disabled="disabled">浏览</Button>
                                        </Upload>
                                    </i-col>
                                    <i-col span="19">
                                        <span v-if="file !==''">
                                            <i-col span="22"
                                                   @dblclick.native="disabled?'':clearFile()">
                                                <Input v-model="file.name"
                                                       readonly="readonly">
                                                <span slot="prepend">
                                                    <Icon type="folder"
                                                          size="16"></Icon>
                                                </span>
                                                </Input>
                                            </i-col>
                                            <i-col span="2">
                                                <Button type="text"
                                                        @click="uploadLocalFile"
                                                        v-if="loadingStatus">上传</Button>
                                                <Button type="text"
                                                        @click="downloadFile"
                                                        v-if="!loadingStatus">下载</Button>
                                            </i-col>
                                        </span>
                                    </i-col>
                                </Row>
                            </FormItem>
                        </i-col>
                        <i-col span="23">
                            <FormItem label="备注"
                                      prop="note">
                                <Input v-model="form.note"
                                       :disabled="disabled"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入备注..." />
                            </FormItem>
                        </i-col>
                    </Form>
                </Row>

            </div>
            <Button type="ghost"
                    @click="handleReset"
                    class="btn1">{{$t('button.cal')}}</Button>
            <Button type="primary"
                    @click="handleSubmit"
                    class="btn"
                    v-show="!disabled">{{$t('button.sav')}}</Button>
        </div>
        <!--弹出选择页面布局 无需变更-->

        <!--直接上級-->
        <transition name="fade">
            <searchEmpMaster v-show="openEmpMaster"
                             @closeEmp="closeEmp"
                             @inputEmp="inputEmp"
                             ref="searchEmpMaster"></searchEmpMaster>
        </transition>
    </div>
</template>
<script>
import {
    getDataLevelUserLoginSenior,
    getDataLevelUserLogin,
    uploadFile
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";
import searchEmpMaster from "../../../components/searchTable/searchEmpnhMaster";

export default {
    data () {
        const compareTime = (rule, value, callback) => {
            if (value === "" || !value) {
                callback(new Error("请选择生效日期"));
            } else {
                //开始时间不能大于结束时间   this.formValidate.unitValdate和this.formValidate.unitInvdate  这两个值是根据你当前页面 日期时间绑定的变量
                let startTimeNum = new Date(this.form.contValiddate).getTime();
                let endTimeNum = new Date(this.form.contInvdate).getTime();
                if (startTimeNum > endTimeNum) {
                    callback(new Error("生效日期不能大于失效日期"));
                }
                callback();
            }
        };

        return {
            aa: false,
            type: "",
            distype: false,
            disabled: false,
            forbidden: null,
            popup: "",
            value: "",
            selectEmptype: [],
            selectContrpertype: [],
            selectContperiod: [],
            selectWorktimetype: [],
            selectProbperiod: [],
            selectAttendy: [],
            form: {
                _mt: "empContractinfo.addOrUpd",
                numberCode: "XXXXXX",
                empId: "",
                deptId: "",
                postId: "",
                empType: "",
                contType: "",
                contPeriod: "",
                contSdate: "",
                contEdate: "",
                contWorktime: "",
                contSigndate: "",
                contProbat: "",
                contProbatdt: "",
                contValiddate: "",
                contInvdate: "",
                contBmxy: "0",
                contJzxy: "0",
                fileKey: "", // 上传附件
                note: "", //备注
                funId: "1",
                logType: ""
            },

            file: "",
            filekey: "",
            openDeptPick: false,
            openPost: false,
            openEmpMaster: false,
            empName: "",
            deptIdDis: "",
            postIdDis: "",
            ruleValidate: {
                empId: [
                    { required: true, message: "请选择员工姓名", trigger: "change" }
                ],

                empType: [
                    { required: true, message: "请选择员工类型", trigger: "blur" }
                ],
                contType: [
                    { required: true, message: "请选择合同类型", trigger: "blur" }
                ],
                contPeriod: [
                    { required: true, message: "请选择合同期限", trigger: "blur" }
                ],
                contSdate: [
                    {
                        required: true,
                        type: "date",
                        message: "请选择合同开始日",
                        trigger: "blur"
                    }
                ],
                contEdate: [
                    {
                        required: true,
                        type: "date",
                        message: "请选择合同到期日",
                        trigger: "blur"
                    }
                ],

                contWorktime: [
                    { required: true, message: "请选择合同工作时间", trigger: "blur" }
                ],
                contProbat: [
                    { required: true, message: "请选择试用期限", trigger: "blur" }
                ],
                contProbatdt: [
                    {
                        required: true,
                        type: "date",
                        message: "请选择试用期到期日",
                        trigger: "blur"
                    }
                ],
                contSigndate: [
                    {
                        required: true,
                        type: "date",
                        message: "请选择签订时间",
                        trigger: "blur"
                    }
                ],
                contValiddate: [
                    {
                        required: true,
                        type: "date",
                        validator: compareTime,
                        trigger: "change"
                    }
                ]
            },
            contEdateValue: ""
        };
    },
    props: {
        id: Number,
        logType: String,
        index: Number
    },
    components: {
        // searchDept,
        // searchPost,
        searchEmpMaster
    },
    methods: {
        //上级清除员工选择
        dbclean () {
            const t = this;
            t.form.empName = "";
            t.form.empId = "";
            t.form.deptIdDis = "";
            t.form.deptId = "";
            t.form.postIdDis = "";
            t.form.postId = "";
        },
        getData (id) {
            const t = this;
            getDataLevelUserLogin({
                _mt: "empContractinfo.getById",
                id: id,
                funId: "1",
                logType: "根据id获取数据"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.form.numberCode = res.data.content[0].numberCode;
                        t.form.deptId = res.data.content[0].deptId;
                        t.form.postId = res.data.content[0].postId;
                        t.form.empId = res.data.content[0].empId;
                        t.form.empType = res.data.content[0].empType;
                        t.form.contType = res.data.content[0].contType;
                        t.form.contPeriod = res.data.content[0].contPeriod;
                        t.form.contSdate = res.data.content[0].contSdate;
                        t.form.contEdate = res.data.content[0].contEdate;
                        t.form.contWorktime = res.data.content[0].contWorktime;
                        t.form.contSigndate = res.data.content[0].contSigndate;
                        t.form.contProbat = res.data.content[0].contProbat;
                        t.form.contProbatdt = res.data.content[0].contProbatdt;
                        t.form.contValiddate = res.data.content[0].contValiddate;
                        t.form.contInvdate = res.data.content[0].contInvdate;
                        t.form.contBmxy = res.data.content[0].contBmxy;
                        t.form.contJzxy = res.data.content[0].contJzxy;
                        t.form.state = res.data.content[0].state;
                        t.form.note = res.data.content[0].note;
                        t.empName = res.data.content[0].empName;
                        t.postIdDis = res.data.content[0].postIdDis;
                        t.deptIdDis = res.data.content[0].deptIdDis;
                        t.empTypeDis = res.data.content[0].empTypeDis;
                        t.contTypeDis = res.data.content[0].contTypeDis;
                        t.contPeriodDis = res.data.content[0].contPeriodDis;
                        t.contWorktimeDis = res.data.content[0].contWorktimeDis;
                        t.contProbatDis = res.data.content[0].contProbatDis;
                        if (res.data.content[0].fileKey) {
                            t.file = { name: res.data.content[0].fileKey.split(":")[0] };
                            t.filekey = res.data.content[0].fileKey.split(":")[1];
                        }
                    }
                })
                .catch(() => {

                    this.$Message.error(this.$t("reminder.errormessage"));
                });
        },
        getSelect () {
            //获取下拉列表数据
            const t = this;
            //emptype员工类型
            //contrpertype,合同类别
            //contperiod,合同期限
            //noticedays,到期通知天数
            //confidential,保密协议
            //worktimetype,合同工作时间
            //probperiod,试用期限
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: 'emptype,contrpertype,contperiod,worktimetype,probperiod,haveyn'
            })
                .then(res => {
                    if (isSuccess(res, t)) {

                        t.selectEmptype = res.data.content[0].value[0].paramList;

                        t.selectContrpertype = res.data.content[0].value[1].paramList;

                        t.selectContperiod = res.data.content[0].value[2].paramList;

                        t.selectWorktimetype = res.data.content[0].value[3].paramList;

                        t.selectProbperiod = res.data.content[0].value[4].paramList;

                        t.selectAttendy = res.data.content[0].value[5].paramList;
                    }
                })
                .catch(() => {

                    this.$Message.error(this.$t("reminder.errormessage"));
                });
        },
        handleSubmit () {
            const t = this;
            console.log(t.form, "form");
            const data = deepCopy(t.form);
            data.logType = t.logType;
            if (t.type === "02dept" && data.unitType === "01company") {
                t.$Modal.success({
                    title: this.$t("reminder.err"),
                    content: this.$t("lang_organization.orgframe.reminderErr")
                });
                return;
            }
            if (t.logType === this.$t("button.upd")) {
                data.id = t.id;
            }
            if (data.contValiddate !== undefined) {
                data.contValiddate = new Date(data.contValiddate).format("yyyy-MM-dd");
            }
            if (data.contSdate !== undefined) {
                data.contSdate = new Date(data.contSdate).format("yyyy-MM-dd");
            }
            if (data.contEdate !== undefined) {
                data.contEdate = new Date(data.contEdate).format("yyyy-MM-dd");
            }
            if (data.contSigndate !== undefined) {
                data.contSigndate = new Date(data.contSigndate).format("yyyy-MM-dd");
            }
            if (data.contProbatdt !== undefined) {
                data.contProbatdt = new Date(data.contProbatdt).format("yyyy-MM-dd");
            }
            if (data.contInvdate !== undefined) {
                data.contInvdate =
                    data.contInvdate === ""
                        ? ""
                        : new Date(data.contInvdate).format("yyyy-MM-dd");
            }
            this.$refs.form.validate(valid => {
                if (valid) {
                    getDataLevelUserLoginSenior(data)
                        .then(res => {
                            if (isSuccess(res, t)) {
                                t.$emit("closeUp");
                                if (t.logType === this.$t("button.add")) {

                                    this.$Message.success(this.$t("reminder.addsuccess"));
                                    t.$refs.form.resetFields();
                                    t.$emit("getData", res.data.content[0]);
                                } else {

                                    this.$Message.success(this.$t("reminder.updsuccess"));
                                    t.$emit("update", res.data.content[0]);
                                }
                            }
                        })
                        .catch(() => {
                            this.$Message.error(this.$t("reminder.errormessage"));
                        });
                }
            });
        },

        /*选择员工*/
        pickEmpData () {
            const t = this;
            t.$refs.searchEmpMaster.getData();
            t.openEmpMaster = true;
        },
        closeEmp () {
            const t = this;
            t.openEmpMaster = false;
        },
        inputEmp (row) {
            const t = this;
            t.empName = row.empnhName;
            t.form.empId = row.id;
            t.deptIdDis = row.deptIdDis;
            t.form.deptId = row.deptId;
            t.postIdDis = row.postIdDis;
            t.form.postId = row.postId;
        },
        handleReset () {
            const t = this;
            t.$refs.form.resetFields();
            t.$emit("closeUp");
        },
        //附件上传
        handleUpload (file) {
            this.file = file;
            this.loadingStatus = true;
            return false;
        },
        //上传
        uploadLocalFile () {
            const t = this;
            const formData = new FormData();
            formData.append("upfile", t.file);
            console.log(formData);
            uploadFile(formData)
                .then(res => {
                    for (const key in res.data) {
                        t.file = { name: key };
                        t.filekey = res.data[key];
                        t.form.fileKey = key + ":" + res.data[key];
                    }
                    this.$Message.success(this.$t("reminder.uploadsuccess"));
                    this.loadingStatus = false;
                }).catch(() => {
                    this.$Message.error(this.$t("reminder.errormessage"));
                })

        },
        //下载
        downloadFile () {
            const t = this;
            let data = {
                _mt: "userMgmt.getfiletoken",
                isprivate: true,
                logType: "导出",
                filekey: t.filekey,
                expiresecs: 180
            };
            getDataLevelUserLogin(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        localStorage.pageOpenedListAll = JSON.stringify(
                            JSON.parse(localStorage.pageOpenedList)
                        );
                        if (this.isIE()) {
                            window.location.href =
                                pubsource.pub_prvf_downlink +
                                res.data.content[0].value +
                                "&fname=" +
                                encodeURI(t.filekey);
                        } else {
                            let doclink =
                                pubsource.pub_prvf_downlink +
                                res.data.content[0].value +
                                "&fname=" +
                                encodeURI(t.filekey);
                            let link = document.createElement("a");
                            link.href = doclink;
                            link.download = "downloadfiletemp";
                            link.setAttribute("download", "downloadfiletemp");
                            document.body.appendChild(link);
                            link.click();
                        }
                        this.$store.state.app.pageOpenedList = JSON.parse(
                            localStorage.pageOpenedListAll
                        );
                        localStorage.pageOpenedList = JSON.stringify(
                            JSON.parse(localStorage.pageOpenedListAll)
                        );
                    }
                })
                .catch(() => {
                    this.$Message.error("网络错误");
                });
        },
        //清除附件
        clearFile (ckdis) {
            this.$Modal.confirm({
                title: this.$t("reminder.remind"),
                content: "是否清除已上传的附件",
                onOk: () => {
                    this.file = "";
                    this.filekey = "";
                    this.form.fileKey = "";
                    this.loadingStatus = false;
                },
                onCancel: () => { }
            });
        },
        //合同期限选中事件
        dateAdd (type, number, date) {
            switch (type) {
                case "y": {
                    date.setFullYear(date.getFullYear() + number);
                    return date;
                    break;
                }
                case "q": {
                    date.setMonth(date.getMonth() + number * 3);
                    return date;
                    break;
                }
                case "m": {
                    date.setMonth(date.getMonth() + number);
                    return date;
                    break;
                }
                case "w": {
                    date.setDate(date.getDate() + number * 7);
                    return date;
                    break;
                }
                case "d": {
                    date.setDate(date.getDate() + number);
                    return date;
                    break;
                }
                default: {
                    date.setDate(date.getDate() + number);
                    return date;
                    break;
                }
            }
        },
        //计算日期
        calculateDate (selectValue, sDate, eDate) {
            let value = this.form[selectValue];
            let num = parseInt(value);
            let type = "";
            if (selectValue == "contProbat") {
                type = 'm';
            } else {
                if (value.indexOf('year') != -1) {
                    type = 'y';
                } else if (value.indexOf('month') != -1) {
                    type = 'm';
                } else if (value.indexOf('day') != -1) {
                    type = 'd';
                }
            }
            if (value === "99year") {
                this.form[eDate] = "9999-12-31"
            } else {
                let now = new Date(this.form[sDate]);
                this.form[eDate] = this.dateAdd(type, num, now);
            }
        },
        //合同期限下拉选择事件
        contPeriodSelect (value) {
            if (this.form.contSdate !== "") {
                this.calculateDate("contPeriod", "contSdate", "contEdate")
            }
        },
        //合同开始日选择日期事件
        contSdateChange (date) {
            if (this.form.contPeriod !== "") {
                this.calculateDate("contPeriod", "contSdate", "contEdate")
            }
            if (this.form.contProbat !== "") {
                this.calculateDate("contProbat", "contSdate", "contProbatdt")
            }
        },
        //试用期限下拉选择事件
        contProbatSelect (value) {
            if (this.form.contSdate !== "") {
                this.calculateDate("contProbat", "contSdate", "contProbatdt")
            }
        },
    }
};
</script>
<style lang="scss" scoped>
.cover {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box {
        position: relative;
        width: 900px;
        background-color: #fff;
        padding: 60px 0px 30px 20px;
        border-radius: 11px;
        .form {
            max-height: 800px;
            overflow-y: auto;
        }
        .title {
            display: flex;
            position: absolute;
            height: 40px;
            width: 100%;
            line-height: 40px;
            justify-content: space-between;
            align-items: center;
            padding-left: 20px;
            top: 0;
            border-bottom: 1px solid #efefef;
            left: 0;
            .title-text {
                font-weight: bold;
                font-size: 14px;
            }
        }
    }
}
.option-main {
    position: relative;
    height: 500px;
}
.btn {
    position: absolute;
    bottom: 20px;
    right: 50px;
}
.btn1 {
    position: absolute;
    bottom: 20px;
    right: 120px;
}
</style>
