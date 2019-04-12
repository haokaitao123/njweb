<template>
    <div class="option-main">
        <Row style="max-height: 420px;overflow-y: auto;"
             id="scrollBox">
            <Form ref="formValidate"
                  :model="formValidate"
                  :rules="ruleValidate"
                  :label-width="100">
                <i-col span="11">
                    <FormItem label="应聘岗位"
                              prop="resuApplypost">
                        <Input v-model="formValidate.resuApplypost"
                               placeholder="请输入应聘岗位"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="身份"
                              prop="resuIdentity">
                        <Select v-model="formValidate.resuIdentity"
                                placeholder="请选择身份"
                                :disabled="disabled">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selectIdentitytype"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="面试日期"
                              prop="resuFilldate">
                        <DatePicker type="date"
                                    placeholder="请输入面试日期"
                                    :disabled="disabled"
                                    :readonly="disabled"
                                    :editable="false"
                                    v-model="formValidate.resuFilldate"
                                    style="width: 100%"></DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="姓名"
                              prop="resuName">
                        <Input v-model="formValidate.resuName"
                               placeholder="请输入姓名"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="证件号码"
                              prop="resuIdno">
                        <Input v-model="formValidate.resuIdno"
                               placeholder="请输入证件号码"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="手机号"
                              prop="resuMobile">
                        <Input v-model="formValidate.resuMobile"
                               placeholder="请输入手机号"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="性别"
                              prop="resuGender">
                        <Select v-model="formValidate.resuGender"
                                placeholder="请选择性别"
                                :disabled="disabled">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selectgender"
                                    :key="index">{{item.paramInfoCn}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="出生日期"
                              prop="resuBirtday">
                        <DatePicker type="date"
                                    placeholder="请输入出生日期"
                                    :disabled="disabled"
                                    :readonly="disabled"
                                    :editable="false"
                                    v-model="formValidate.resuBirtday"
                                    style="width: 100%"></DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="籍贯"
                              prop="resuBirtplace">
                        <Input v-model="formValidate.resuBirtplace"
                               placeholder="请输入籍贯"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="民族"
                              prop="resuNatality">
                        <Select v-model="formValidate.resuNatality"
                                placeholder="请选择民族"
                                :disabled="disabled">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selectnationtype"
                                    :key="index">
                                {{item.paramInfoCn}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="政治面貌"
                              prop="resuPolitical">
                        <Select v-model="formValidate.resuPolitical"
                                placeholder="请选择政治面貌"
                                :disabled="disabled">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selectpolitical"
                                    :key="index">
                                {{item.paramInfoCn}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="健康状况"
                              prop="resuHealthsta">
                        <Select v-model="formValidate.resuHealthsta"
                                placeholder="请选择健康状况"
                                :disabled="disabled">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selecthealthcondition"
                                    :key="index">
                                {{item.paramInfoCn}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="婚育状况"
                              prop="resuMaritlsta">
                        <Select v-model="formValidate.resuMaritlsta"
                                placeholder="请选择婚育状况"
                                :disabled="disabled">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selectmarrystatus"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="身高(cm)"
                              prop="resuHeight">
                        <Input v-model="formValidate.resuHeight"
                               placeholder="请输入身高(cm)"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="体重(kg)"
                              prop="resuWeight">
                        <Input v-model="formValidate.resuWeight"
                               placeholder="请输入体重(kg)"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="学历"
                              prop="resuEducat">
                        <Select v-model="formValidate.resuEducat"
                                placeholder="请选择学历"
                                :disabled="disabled">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selecteducation"
                                    :key="index">
                                {{item.paramInfoCn}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="毕业院校"
                              prop="resuSchool">
                        <Input v-model="formValidate.resuSchool"
                               placeholder="请输入毕业院校"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="专业"
                              prop="resuProfes">
                        <Input v-model="formValidate.resuProfes"
                               placeholder="请输入专业"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="现居住地"
                              prop="resuLiving">
                        <Input v-model="formValidate.resuLiving"
                               placeholder="请输入现居住地"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="家庭地址"
                              prop="resuFamadds">
                        <Input v-model="formValidate.resuFamadds"
                               placeholder="请输入家庭地址"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="紧急联系人姓名"
                              prop="resuEmernm">
                        <Input v-model="formValidate.resuEmernm"
                               placeholder="请输入紧急联系人姓名"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="紧急联系人电话"
                              prop="resuEmphone">
                        <Input v-model="formValidate.resuEmphone"
                               placeholder="请输入紧急联系人电话"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="与本人关系"
                              prop="resuWithme">
                        <Select v-model="formValidate.resuWithme"
                                placeholder="请选择与本人关系"
                                :disabled="disabled">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selectrelationship"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="期望薪资"
                              prop="resuSalary">
                        <Input v-model="formValidate.resuSalary"
                               placeholder="请输入期望薪资"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="职业状态"
                              prop="resuProstatus">
                        <Select v-model="formValidate.resuProstatus"
                                placeholder="请选择职业状态"
                                :disabled="disabled">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selectempstatus"
                                    :key="index">
                                {{item.paramInfoCn}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="可到岗时间"
                              prop="resuAvaitime">
                        <DatePicker type="date"
                                    placeholder="请输入可到岗时间"
                                    :disabled="disabled"
                                    :readonly="disabled"
                                    :editable="false"
                                    v-model="formValidate.resuAvaitime"
                                    style="width: 100%"></DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="11"
                       style="height:57px">
                    <FormItem label="是否有亲朋在本公司任职"
                              prop="resuIsrelatives">
                        <RadioGroup v-model="formValidate.resuIsrelatives">
                            <Radio :label="item.paramCode"
                                   v-for="(item,index) in selectyesno"
                                   :key="index"
                                   :disabled="disabled">
                                {{item.paramInfoCn}}
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                </i-col>
                <i-col span="11"
                       v-show="formValidate.resuIsrelatives === '1'">
                    <FormItem label="本公司任职亲朋姓名"
                              prop="resuRelatname">
                        <Input v-model="formValidate.resuRelatname"
                               placeholder="请输入本公司任职亲朋姓名"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11"
                       v-show="formValidate.resuIsrelatives === '1'">
                    <FormItem label="本公司任职亲朋所在部门"
                              prop="resuRelatdept">
                        <Input v-model="formValidate.resuRelatdept"
                               placeholder="请输入本公司任职亲朋所在部门"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="是否有犯罪记录"
                              prop="resuIscriminal">
                        <RadioGroup v-model="formValidate.resuIscriminal">
                            <Radio :label="item.paramCode"
                                   v-for="(item,index) in selectyesno"
                                   :key="index"
                                   :disabled="disabled">
                                {{item.paramInfoCn}}
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                </i-col>

                <i-col span="11">
                    <FormItem label="是否有纹身"
                              prop="resuIstattoo">
                        <RadioGroup v-model="formValidate.resuIstattoo">
                            <Radio :label="item.paramCode"
                                   v-for="(item,index) in selectyesno"
                                   :key="index"
                                   :disabled="disabled">
                                {{item.paramInfoCn}}
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="通过何种方式应聘"
                              prop="resuApplytype">
                        <Select v-model="formValidate.resuApplytype"
                                placeholder="请选择通过何种方式应聘"
                                :disabled="disabled">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selectapplysource"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="11"
                       v-show="formValidate.resuApplytype === '03introducer'">
                    <FormItem label="介绍人姓名"
                              prop="resuIntrname">
                        <Input v-model="formValidate.resuIntrname"
                               placeholder="请输入介绍人姓名"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="是否服从调配"
                              prop="resuIscom">
                        <RadioGroup v-model="formValidate.resuIscom">
                            <Radio :label="item.paramCode"
                                   v-for="(item,index) in selectyesno"
                                   :key="index"
                                   :disabled="disabled">
                                {{item.paramInfoCn}}
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                </i-col>
                <i-col span="22">
                    <FormItem label="自我评价"
                              prop="resuSelfeval">
                        <Input v-model="formValidate.resuSelfeval"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="请输入自我评价"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="招生范围"
                              prop="resuEnrorage">
                        <Select v-model="formValidate.resuEnrorage"
                                placeholder="请选择招生范围"
                                :disabled="disabled">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selectenrollrange"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="是否毕业"
                              prop="resuIsgradu">
                        <Select v-model="formValidate.resuIsgradu"
                                placeholder="请选择是否毕业"
                                :disabled="disabled">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selectgraduation"
                                    :key="index">
                                {{item.paramInfoCn}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem label="最后应聘时间"
                              prop="resuFinalapptm">
                        <DatePicker type="date"
                                    placeholder="请输入最后应聘时间"
                                    :disabled="disabled"
                                    :readonly="disabled"
                                    :editable="false"
                                    v-model="formValidate.resuFinalapptm"
                                    style="width: 100%"></DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="22">
                    <FormItem :label="$t('lang_organization.orgpost.note')"
                              prop="note">
                        <Input v-model="formValidate.note"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               :placeholder="$t('lang_organization.orgpost.noteInp')"
                               :disabled="disabled" />
                    </FormItem>
                </i-col>
            </Form>
        </Row>
        <Button type="primary"
                @click="handleSubmit"
                class="btn"
                v-show="!disabled">{{$t('button.sav')}}
        </Button>
    </div>
</template>
<script>
import {
    getDataLevelUserLoginSenior,
    getDataLevelUserLogin
} from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";

export default {
    data () {
        return {
            disabled: false,
            selectIdentitytype: [],
            selectgender: [],
            selectnationtype: [],
            selectpolitical: [],
            selecthealthcondition: [],
            selectmarrystatus: [],
            selecteducation: [],
            selectrelationship: [],
            selectempstatus: [],
            selectyesno: [],
            selectapplysource: [],
            selectenrollrange: [],
            selectgraduation: [],
            formValidate: {
                _mt: "recruitResume.addOrUpd",
                resuApplypost: '',
                resuIdentity: '',
                resuFilldate: '',
                resuName: '',
                resuIdno: '',
                resuMobile: '',
                resuGender: '',
                resuBirtday: '',
                resuBirtplace: '',
                resuNatality: '',
                resuPolitical: '',
                resuHealthsta: '',
                resuMaritlsta: '',
                resuHeight: '',
                resuWeight: '',
                resuEducat: '',
                resuSchool: '',
                resuProfes: '',
                resuLiving: '',
                resuFamadds: '',
                resuEmernm: '',
                resuEmphone: '',
                resuWithme: '',
                resuSalary: '',
                resuProstatus: '',
                resuAvaitime: '',
                resuIsrelatives: '',
                resuRelatname: '',
                resuRelatdept: '',
                resuIscriminal: '',
                resuIstattoo: '',
                resuApplytype: '',
                resuIntrname: '',
                resuIscom: '',
                resuSelfeval: '',
                resuEnrorage: '',
                resuIsgradu: '',
                resuFinalapptm: '',
                note: '',
                logType: ""
            },
            //设置必填规则
            ruleValidate: {}
        };
    },
    //    子页面默认参数 无需变更
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    components: {},
    updated () {
    },
    mounted () {
        this.getSelect();
    },
    methods: {
        getData (id) {
            const t = this;
            this.page = 1;
            getDataLevelUserLogin({
                _mt: "recruitResume.getById",
                id: id,
                funId: "1",
                logType: "Id查询"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.formValidate.resuApplypost = res.data.content[0].resuApplypost;
                        t.formValidate.resuIdentity = res.data.content[0].resuIdentity;
                        t.formValidate.resuFilldate = res.data.content[0].resuFilldate;
                        t.formValidate.resuName = res.data.content[0].resuName;
                        t.formValidate.resuIdno = res.data.content[0].resuIdno;
                        t.formValidate.resuMobile = res.data.content[0].resuMobile;
                        t.formValidate.resuGender = res.data.content[0].resuGender;
                        t.formValidate.resuBirtday = res.data.content[0].resuBirtday;
                        t.formValidate.resuBirtplace = res.data.content[0].resuBirtplace;
                        t.formValidate.resuNatality = res.data.content[0].resuNatality;
                        t.formValidate.resuPolitical = res.data.content[0].resuPolitical;
                        t.formValidate.resuHealthsta = res.data.content[0].resuHealthsta;
                        t.formValidate.resuMaritlsta = res.data.content[0].resuMaritlsta;
                        t.formValidate.resuHeight = res.data.content[0].resuHeight;
                        t.formValidate.resuWeight = res.data.content[0].resuWeight;
                        t.formValidate.resuEducat = res.data.content[0].resuEducat;
                        t.formValidate.resuSchool = res.data.content[0].resuSchool;
                        t.formValidate.resuProfes = res.data.content[0].resuProfes;
                        t.formValidate.resuLiving = res.data.content[0].resuLiving;
                        t.formValidate.resuFamadds = res.data.content[0].resuFamadds;
                        t.formValidate.resuEmernm = res.data.content[0].resuEmernm;
                        t.formValidate.resuEmphone = res.data.content[0].resuEmphone;
                        t.formValidate.resuWithme = res.data.content[0].resuWithme;
                        t.formValidate.resuSalary = res.data.content[0].resuSalary;
                        t.formValidate.resuProstatus = res.data.content[0].resuProstatus;
                        t.formValidate.resuAvaitime = res.data.content[0].resuAvaitime;
                        t.formValidate.resuIsrelatives = res.data.content[0].resuIsrelatives;
                        t.formValidate.resuRelatname = res.data.content[0].resuRelatname;
                        t.formValidate.resuRelatdept = res.data.content[0].resuRelatdept;
                        t.formValidate.resuIscriminal = res.data.content[0].resuIscriminal;
                        t.formValidate.resuIstattoo = res.data.content[0].resuIstattoo;
                        t.formValidate.resuApplytype = res.data.content[0].resuApplytype;
                        t.formValidate.resuIntrname = res.data.content[0].resuIntrname;
                        t.formValidate.resuIscom = res.data.content[0].resuIscom;
                        t.formValidate.resuSelfeval = res.data.content[0].resuSelfeval;
                        t.formValidate.resuEnrorage = res.data.content[0].resuEnrorage;
                        t.formValidate.resuIsgradu = res.data.content[0].resuIsgradu;
                        t.formValidate.resuFinalapptm = res.data.content[0].resuFinalapptm;
                        t.formValidate.note = res.data.content[0].note;
                    }
                })
                .catch(() => {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage")
                    });
                });
        },
        getSelect () {
            const t = this;
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: "Identitytype,gender,nationtype,political,healthcondition,marrystatus,education,relationship,empstatus,yesno,applysource,enrollrange,graduation"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.selectIdentitytype = res.data.content[0].value[0].paramList;
                        t.selectgender = res.data.content[0].value[1].paramList;
                        t.selectnationtype = res.data.content[0].value[2].paramList;
                        t.selectpolitical = res.data.content[0].value[3].paramList;
                        t.selecthealthcondition = res.data.content[0].value[4].paramList;
                        t.selectmarrystatus = res.data.content[0].value[5].paramList;
                        t.selecteducation = res.data.content[0].value[6].paramList;
                        t.selectrelationship = res.data.content[0].value[7].paramList;
                        t.selectempstatus = res.data.content[0].value[8].paramList;
                        t.selectyesno = res.data.content[0].value[9].paramList;
                        t.selectapplysource = res.data.content[0].value[10].paramList;
                        t.selectenrollrange = res.data.content[0].value[11].paramList;
                        t.selectgraduation = res.data.content[0].value[12].paramList;
                    }
                })
                .catch(() => {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage")
                    });
                });
        },
        handleSubmit () {
            const t = this;
            const data = deepCopy(t.formValidate);
            data.logType = t.logType;

            if (t.logType === this.$t("button.upd")) {
                data.id = t.id;
            }
            this.$refs.formValidate.validate(valid => {
                if (valid) {
                    getDataLevelUserLoginSenior(data)
                        .then(res => {
                            if (isSuccess(res, t)) {
                                t.$emit("closeUp");
                                if (t.logType === this.$t("button.add")) {
                                    t.$Modal.success({
                                        title: this.$t("reminder.suc"),
                                        content: this.$t("reminder.addsuccess")
                                    });
                                    t.$emit('update', res.data.content[0])
                                } else {
                                    t.$Modal.success({
                                        title: this.$t("reminder.suc"),
                                        content: this.$t("reminder.updsuccess")
                                    });
                                    t.$emit('newdata', res.data.content[0])
                                    t.clear()
                                }
                            }
                        })
                        .catch(() => {
                            this.$Modal.error({
                                title: this.$t("reminder.err"),
                                content: this.$t("reminder.errormessage")
                            });
                        });
                }
            });
        },
        clear () {
            const t = this;
            t.formValidate.resuApplypost = '';
            t.formValidate.resuIdentity = '';
            t.formValidate.resuFilldate = '';
            t.formValidate.resuName = '';
            t.formValidate.resuIdno = '';
            t.formValidate.resuMobile = '';
            t.formValidate.resuGender = '';
            t.formValidate.resuBirtday = '';
            t.formValidate.resuBirtplace = '';
            t.formValidate.resuNatality = '';
            t.formValidate.resuPolitical = '';
            t.formValidate.resuHealthsta = '';
            t.formValidate.resuMaritlsta = '';
            t.formValidate.resuHeight = '';
            t.formValidate.resuWeight = '';
            t.formValidate.resuEducat = '';
            t.formValidate.resuSchool = '';
            t.formValidate.resuProfes = '';
            t.formValidate.resuLiving = '';
            t.formValidate.resuFamadds = '';
            t.formValidate.resuEmernm = '';
            t.formValidate.resuEmphone = '';
            t.formValidate.resuWithme = '';
            t.formValidate.resuSalary = '';
            t.formValidate.resuProstatus = '';
            t.formValidate.resuAvaitime = '';
            t.formValidate.resuIsrelatives = '';
            t.formValidate.resuRelatname = '';
            t.formValidate.resuRelatdept = '';
            t.formValidate.resuIscriminal = '';
            t.formValidate.resuIstattoo = '';
            t.formValidate.resuApplytype = '';
            t.formValidate.resuIntrname = '';
            t.formValidate.resuIscom = '';
            t.formValidate.resuSelfeval = '';
            t.formValidate.resuEnrorage = '';
            t.formValidate.resuIsgradu = '';
            t.formValidate.resuFinalapptm = '';
            t.formValidate.note = '';
            t.formValidate.logType = '';

            //        t.$refs.formValidate.resetFields(); //清空校验
        },
    },
    watch: {}
};
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";

.option-main {
    position: relative;
    height: 500px;
    .btn {
        position: absolute;
        bottom: 20px;
        right: 40px;
    }
    .btn1 {
        position: absolute;
        bottom: 20px;
        right: 100px;
    }
}
</style>
