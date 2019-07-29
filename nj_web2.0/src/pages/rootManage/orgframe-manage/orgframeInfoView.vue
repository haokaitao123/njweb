<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <div class="option-main">
                <Spin size="large"
                      fix
                      v-if="spinShow"></Spin>
                <Row style="max-height: 420px;overflow-y: auto;"
                     ref="scrollBox">
                    <Form ref="formValidate"
                          :model="formValidate"
                          :rules="ruleValidate"
                          :label-width="100">
                        <i-col span="11">
                            <FormItem label="组织编码"
                                      prop="unitCode">
                                <Input v-model="formValidate.unitCode"
                                       :disabled=true
                                       placeholder="请输入组织编码"></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="组织类型"
                                      prop="unitType">
                                <Select v-model="formValidate.unitType"
                                        :clearable="!disabled"
                                        :disabled="distype||disabled"
                                        placeholder="选择类型">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectUnitType"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="组织名称"
                                      prop="unitFname">
                                <Input v-model="formValidate.unitFname"
                                       :disabled="disabled"
                                       placeholder="请输入组织名称"></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="上级部门"
                                      prop="unitPid">
                                <span @dblclick="clearPid">
                                    <Input v-model="unitPname"
                                           icon="search"
                                           :disabled="disabled"
                                           :readonly=true
                                           placeholder="请选择上级部门"
                                           @on-click="pickData2" />
                                </span>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="部门职能"
                                      prop="unitPartfunct">
                                <Select v-model="formValidate.unitPartfunct"
                                        :clearable="!disabled"
                                        :disabled="disabled"
                                        placeholder="选择部门职能">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectFunction"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="行业"
                                      prop="unitIndustry">
                                <Select v-model="formValidate.unitIndustry"
                                        :clearable="!disabled"
                                        :disabled="disabled"
                                        placeholder="选择行业">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectIndustry"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="成本中心"
                                      prop="unitCenter">
                                <span @dblclick="clearCostcenter">
                                    <Input v-model="unitCenterName"
                                           icon="search"
                                           :disabled="disabled"
                                           :readonly=true
                                           placeholder="选择成本中心"
                                           @on-click="pickData3" />
                                </span>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="雇佣地点"
                                      prop="unitCity">
                                <span @dblclick="clearDfhire">
                                    <Input v-model="unitCityName"
                                           icon="search"
                                           :disabled="disabled"
                                           :readonly=true
                                           placeholder="选择雇佣地点"
                                           @on-click="pickData" />
                                </span>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="生效日期"
                                      prop="unitValdate">
                                <DatePicker type="date"
                                            placeholder="选择生效日期"
                                            :editable="false"
                                            :disabled="disabled"
                                            :readonly="disabled"
                                            v-model="formValidate.unitValdate"
                                            format="yyyy-MM-dd"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="失效日期"
                                      prop="unitInvdate">
                                <DatePicker type="date"
                                            placeholder="选择失效日期"
                                            :disabled="disabled"
                                            :readonly="disabled"
                                            :editable="false"
                                            v-model="formValidate.unitInvdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="22">
                            <FormItem label="失效原因"
                                      prop="unitInvres">
                                <Input v-model="formValidate.unitInvres"
                                       :disabled="disabled"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入失效原因..."></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="部门编制"
                                      prop="partEstablish">
                                <Input v-model="formValidate.partEstablish"
                                       :disabled="disabled"
                                       size="default"
                                       style="width: 290px"
                                       placeholder="请输入部门编制"></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="经理编制"
                                      prop="unitManger">
                                <Input v-model="formValidate.unitManger"
                                       :disabled="disabled"
                                       size="default"
                                       style="width: 290px"
                                       @on-change="calculatePartEstablish()"
                                       placeholder="请输入经理编制"></Input>
                                <!--@on-blur="cop()"-->
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="主管编制"
                                      prop="unitDirec">
                                <Input v-model="formValidate.unitDirec"
                                       :disabled="disabled"
                                       size="default"
                                       style="width: 290px"
                                       @on-change="calculatePartEstablish()"
                                       placeholder="请输入主管编制"></Input>
                            </FormItem>
                            <!--@on-blur="cop1()"-->
                        </i-col>
                        <i-col span="11">
                            <FormItem label="员工编制"
                                      prop="unitStaff">
                                <Input v-model="formValidate.unitStaff"
                                       :disabled="disabled"
                                       size="default"
                                       style="width: 290px"
                                       @on-change="calculatePartEstablish()"
                                       placeholder="请输入员工编制"></Input>
                            </FormItem>
                            <!--@on-blur="cop2()"-->
                        </i-col>
                        <i-col span="11">
                            <FormItem label="驻厂员工编制"
                                      prop="unitPtstaff">
                                <Input v-model="formValidate.unitPtstaff"
                                       :disabled="disabled"
                                       size="default"
                                       style="width: 290px"
                                       @on-change="calculatePartEstablish()"
                                       placeholder="请输入驻厂员工编制"></Input>
                            </FormItem>
                            <!--@on-blur="cop3()"-->
                        </i-col>
                        <i-col span="11">
                            <FormItem label="系统转正"
                                      prop="unitSysalig">
                                <RadioGroup v-model="formValidate.unitSysalig">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectUnitSysalig"
                                           :key="index"
                                           :disabled="disabled">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="负责人"
                                      prop="empId">
                                <!--绑定双击清除方法-->
                                <span @dblclick="disabled?'':dbclean()">
                                    <!--v-model绑定显示字段-->
                                    <Input v-model="empnhName"
                                           icon="search"
                                           :readonly=true
                                           :disabled="disabled "
                                           placeholder="请选择负责人"
                                           @on-click=" disabled ? '' :pickEmpData()" />
                                </span>
                            </FormItem>
                        </i-col>
                        <i-col span="22">
                            <FormItem label="备注"
                                      prop="note">
                                <Input v-model="formValidate.note"
                                       :disabled="disabled"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入备注..."></Input>
                            </FormItem>
                        </i-col>
                    </Form>
                </Row>
            </div>
            <Button type="ghost"
                    @click="handleReset"
                    class="btn1">取消</Button>
            <Button type="primary"
                    @click="handleSubmit"
                    v-show="!disabled"
                    class="btn">保存</Button>
        </div>
        <transition name="fade">
            <searchCity v-show="openPick"
                        :searchCloumns="searchCloumns"
                        :params="params"
                        @closeUp="close"
                        @changeinput="changeinput"
                        ref="searchCity"></searchCity>
        </transition>
        <transition name="fade">
            <searchOrgframe v-show="openPick2"
                            :searchCloumns="searchCloumns2"
                            :params="params2"
                            @closeUp="close2"
                            @changeinput="changeinput2"
                            ref="searchOrgframe"></searchOrgframe>
        </transition>
        <transition name="fade">
            <searchOrgcostcenter v-show="openPick3"
                                 :searchCloumns="searchCloumns3"
                                 :params="params3"
                                 @closeUp="close3"
                                 @changeinput="changeinput3"
                                 ref="searchOrgcostcenter"></searchOrgcostcenter>
        </transition>
        <!--直接上級-->
        <transition name="fade">
            <searchEmpMaster v-show="openEmpMaster"
                             @closeModal="closeEmp"
                             @inputModal="inputEmp"
                             ref="searchEmpMaster"></searchEmpMaster>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchEmpMaster from "../../../components/searchTable/searchEmpnhMaster";
import searchCity from '../../../components/searchTable/searchCity'
import searchOrgframe from '../../../components/searchTable/searchOrgframe'
import searchOrgcostcenter from '../../../components/searchTable/searchOrgcostcenter'
import valid from '../../../lib/pub_valid'
export default {
    data () {
        const numberCheck = (rule, value, numberValCheck) => {
            if (value !== '' && value !== undefined) {
                if (valid.val_number103(value)) {
                    return numberValCheck()
                }
                return numberValCheck(new Error(rule.message))
            }
            numberValCheck()
        };
        const validatePartEstablish = (rule, value, callback) => {
            if (value === "" || !value) {
                callback(new Error("请输入部门编制"));
            } else {
                if (valid.val_number103(value) == false) {
                    return callback(new Error('请输入正确的数字格式'));
                } else {
                    let num = Number(this.formValidate.unitManger) + Number(this.formValidate.unitDirec) + Number(this.formValidate.unitStaff) + Number(this.formValidate.unitPtstaff)
                    value = Number(value)
                    if (value < num) {
                        callback(new Error("部门已超编,请重新检查部门编制数量"));
                    }
                }
                callback();
            }
        };
        const compareTime = (rule, value, callback) => {
            if (value === "" || !value) {
                callback(new Error("请选择生效日期"));
            } else {
                //开始时间不能大于结束时间   this.formValidate.unitValdate和this.formValidate.unitInvdate  这两个值是根据你当前页面 日期时间绑定的变量
                let startTimeNum = (new Date(this.formValidate.unitValdate)).getTime();
                let endTimeNum = (new Date(this.formValidate.unitInvdate)).getTime();
                if (startTimeNum > endTimeNum) {
                    callback(new Error('生效日期不能大于失效日期'))
                }
                callback()
            }
        };
        return {
            spinShow: false,
            type: '',
            distype: false,
            disabled: false,
            forbidden: null,
            popup: '',
            value: '',
            selectUnitType: [],
            selectFunction: [],
            selectIndustry: [],
            selectUnitSysalig: [
                {
                    'paramCode': '1',
                    'paramInfoCn': '是'
                },
                {
                    'paramCode': '0',
                    'paramInfoCn': '否'
                },
            ],
            formValidate: {
                _mt: 'orgUnits.addOrModifyOrgUnits', //新增接口url
                unitCode: 'XXXXXX',            //组织编码
                empId: '',            //负责人
                unitType: '',            //组织类型
                unitFname: '',           //组织名称
                unitPid: '',             //上级部门
                unitPartfunct: '',       //部门职能
                unitIndustry: '',        //行业
                unitCenter: '',          //默认成本中心
                unitCity: '',            //默认雇佣地点
                unitValdate: '',         //生效日期
                unitInvdate: '',         //失效日期
                unitInvres: '',          //失效原因
                partEstablish: "",       //部门编制
                unitManger: "",          //经理编制
                unitDirec: "",           //主管编制
                unitStaff: "",           //员工编制
                unitPtstaff: "",         //驻厂员工编制
                state: '',               //状态
                unitSysalig: '1',
                unitOprecord: '',        //操作记录
                note: '',                //备注
                funId: '1',
                logType: '',
            },
            openEmpMaster: false,
            openPick: false,
            openPick2: false,
            openPick3: false,
            unitPname: '',
            unitCenterName: '',
            unitCityName: '',
            empnhName: '',
            params: {
                _mt: 'baseCity.getPage',
                sort: 'id',
                order: 'desc',
                rows: 20,
                page: 1,
                funId: '1',
                logType: '搜索',
                data: {
                    "cityIsvalid": "1",
                    "cityType": "02city"
                },
            },
            searchCloumns: [
                {
                    title: "城市名称",
                    key: 'cityName',
                    sortable: 'custom',
                    width: 380,
                },
                {
                    title: "城市类型",
                    key: 'cityTypeName',
                    sortable: 'custom',
                    width: 379,
                },
            ],
            params2: {
                _mt: 'orgUnits.getByOrgFramePageList',
                sort: 'id',
                order: 'desc',
                rows: 20,
                page: 1,
                funId: '1',
                logType: '组织架构查询',
                data: '{}',
                unitPid: 0,
            },
            searchCloumns2: [
                {
                    title: "组织编码",
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: "组织名称",
                    key: 'unitFname',
                },
                {
                    title: "组织类型",
                    key: 'unitTypeName',
                },
            ],
            params3: {
                _mt: 'orgCostcenter.getPage',
                sort: 'id',
                order: 'desc',
                rows: 20,
                page: 1,
                funId: '1',
                logType: '成本中心查询',
                data: '{}',
            },
            searchCloumns3: [
                {
                    title: "成本中心编码",
                    key: 'costCode',
                    sortable: 'custom',
                },
                {
                    title: "成本中心名称",
                    key: 'costName',
                },
            ],
            ruleValidate: {
                unitCode: [
                    { required: true, message: "请输入组织编码", trigger: 'blur' },
                ],
                // empId: [
                //     { required: true, message: "请选择负责人", trigger: 'blur' },
                // ],
                unitType: [
                    { required: true, message: "请选择组织类型", trigger: 'blur' },
                ],
                unitFname: [
                    { required: true, message: "请输入组织名称", trigger: 'blur' },
                ],
                unitPid: [
                    { required: true, message: "请选择上级部门", trigger: 'change' },
                ],
                unitPartfunct: [
                    { required: true, message: "请选择部门职能", trigger: 'blur' },
                ],
                unitIndustry: [
                    { required: true, message: "请选择行业", trigger: 'blur' },
                ],
                unitValdate: [
                    { required: true, type: 'date', validator: compareTime, message: "请选择生效日期", trigger: 'change' },
                ],
                partEstablish: [
                    { required: true, validator: validatePartEstablish, trigger: 'blur' },
                ],
                unitManger: [
                    { required: true, validator: numberCheck, message: "请输入正确的格式", trigger: 'blur' },
                    { required: true, message: "请输入经理编制", trigger: 'blur' },
                ],
                unitDirec: [
                    { required: true, validator: numberCheck, message: "请输入正确的格式", trigger: 'blur' },
                    { required: true, message: "请输入主管编制", trigger: 'blur' },
                ],
                unitStaff: [
                    { required: true, validator: numberCheck, message: "请输入正确的格式", trigger: 'blur' },
                    { required: true, message: "请输入员工编制", trigger: 'blur' },
                ],
                unitPtstaff: [
                    { required: true, validator: numberCheck, message: "请输入正确的格式", trigger: 'blur' },
                    { required: true, message: "请输入驻厂员工编制", trigger: 'blur' },
                ],
                unitSysalig: [
                    { required: true, message: "请选择系统转正", trigger: 'change' },
                ],
                empId: [
                  { required: true, message: "请选择负责人", trigger: 'change' },
                ],
            },
        }
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    components: {
        searchCity,
        searchOrgframe,
        searchOrgcostcenter,
        searchEmpMaster
    },
    updated () {

    },
    mounted () {
        this.getSelect("orgunittype");
        this.getSelect("unitIndustry");
        this.getSelect("unitPartfunct");

    },
    methods: {
        //上级清除员工选择
        dbclean () {
            const t = this;
            t.empnhName = "";
            t.formValidate.empId = "";
        },
        getData (id) {
            const t = this
            t.spinShow = true
            getDataLevelUserLogin({
                _mt: 'orgUnits.selectById',
                id: id,
                funId: '1',
                logType: 'Id查询',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    console.log(res.data.content[0])
                    t.formValidate.unitCode = res.data.content[0].unitCode
                    t.formValidate.unitFname = res.data.content[0].unitFname
                    t.formValidate.empId = res.data.content[0].empId
                    t.formValidate.unitType = res.data.content[0].unitType
                    t.formValidate.unitPid = res.data.content[0].unitPid
                    t.formValidate.unitPartfunct = res.data.content[0].unitPartfunct
                    t.formValidate.unitIndustry = res.data.content[0].unitIndustry == "0" ? "" : res.data.content[0].unitIndustry
                    t.formValidate.unitCenter = res.data.content[0].unitCenter
                    t.formValidate.unitCity = res.data.content[0].unitCity
                    t.formValidate.unitValdate = res.data.content[0].unitValdate
                    t.formValidate.unitInvdate = res.data.content[0].unitInvdate
                    t.formValidate.unitInvres = res.data.content[0].unitInvres
                    t.formValidate.partEstablish = res.data.content[0].partEstablish
                    t.formValidate.unitManger = res.data.content[0].unitManger
                    t.formValidate.unitDirec = res.data.content[0].unitDirec
                    t.formValidate.unitStaff = res.data.content[0].unitStaff
                    t.formValidate.unitPtstaff = res.data.content[0].unitPtstaff
                    t.formValidate.unitSysalig = res.data.content[0].unitSysalig
                    t.formValidate.unitOprecord = res.data.content[0].unitOprecord
                    t.formValidate.note = res.data.content[0].note
                    t.unitCenterName = res.data.content[0].unitCenterName
                    t.unitCityName = res.data.content[0].unitCityName
                    t.unitPname = res.data.content[0].unitPname
                    t.empnhName = res.data.content[0].empnhName
                    t.formValidate.state = res.data.content[0].state
                    if (id === res.data.content[0].companyId) {
                        //  t.forbidden = 'disabled'
                        t.distype = true
                    } else {
                        t.forbidden = null
                        t.distype = false
                    }
                }
            }).catch(() => {
                this.$Message.error(this.$t("reminder.errormessage"));
            })
                .finally(() => {
                    t.spinShow = false
                });
        },
        getSelect (type) { //获取下拉列表数据
            const t = this
            //orgunittype    组织类型
            //unitIndustry   行业
            //unitPartfunct  部门职能
            getDataLevelUserLogin({
                _mt: 'baseParmInfo.getSelectValue',
                typeCode: type,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (type == "orgunittype") {
                        t.selectUnitType = res.data.content[0].value[0].paramList
                    }
                    if (type == "unitIndustry") {
                        t.selectIndustry = res.data.content[0].value[0].paramList

                    }
                    if (type == "unitPartfunct") {
                        t.selectFunction = res.data.content[0].value[0].paramList
                    }

                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        //        cop() {
        //        let peo=this.formValidate.unitManger;
        //          if(Number(peo)!=0){
        //            this.formValidate.partEstablish=Number(peo);
        //          }
        //        },
        //        cop1() {
        //        let peo1=this.formValidate.unitDirec;
        //          if(Number(peo1)!=0){
        //            this.formValidate.partEstablish=Number(this.formValidate.partEstablish)+Number(peo1);
        //          }
        //        },
        //        cop2() {
        //          let peo2=this.formValidate.unitStaff;
        //          if(Number(peo2)!=0){
        //            this.formValidate.partEstablish=Number(this.formValidate.partEstablish)+Number(peo2);
        //          }
        //        },
        //        cop3() {
        //          let peo3=this.formValidate.unitManger;
        //          if(Number(peo3)!=0){
        //            this.formValidate.partEstablish=Number(this.formValidate.partEstablish)+Number(peo3);
        //          }
        //        },
        handleSubmit () {
            const t = this
            console.log(t.formValidate._mt, "empnhNation1234");
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            if (t.type === '02dept' && data.unitType === '01company') {
                t.$Modal.success({
                    title: this.$t('reminder.err'),
                    content: this.$t('lang_organization.orgframe.reminderErr'),
                })
                return
            }
            if (t.logType === this.$t('button.upd')) {
                data.id = t.id
            }
            if (data.unitValdate !== undefined) {
                data.unitValdate = new Date(data.unitValdate).format('yyyy-MM-dd')
            }
            if (data.unitInvdate !== undefined) {
                data.unitInvdate = data.unitInvdate === '' ? '' : new Date(data.unitInvdate).format('yyyy-MM-dd')
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginSenior(data).then((res) => {
                        if (isSuccess(res, t)) {
                            t.$emit('closeUp')
                            if (t.logType === this.$t('button.add')) {
                                // t.$Modal.success({
                                //     title: this.$t('reminder.suc'),
                                //     content: this.$t('reminder.addsuccess'),
                                // })
                                this.$Message.success(this.$t("reminder.addsuccess"));
                                t.$refs.formValidate.resetFields()
                                t.$emit('getData', res.data.content[0])
                            } else {
                                // t.$Modal.success({
                                //     title: this.$t('reminder.suc'),
                                //     content: this.$t('reminder.updsuccess'),
                                // })
                                t.$refs.formValidate.resetFields()
                                this.$Message.success(this.$t("reminder.updsuccess"));
                                t.$emit('update', res.data.content[0])
                            }
                        }
                    }).catch(() => {
                        // this.$Modal.error({
                        //     title: this.$t('reminder.err'),
                        //     content: this.$t('reminder.errormessage'),
                        // })
                        this.$Message.error(this.$t("reminder.errormessage"));
                    })
                } else {
                    this.$nextTick(function () {
                        let tt = document.querySelectorAll('.ivu-form-item-error');
                        // if(tt[0].parentNode.offsetTop<this.$refs.scrollBox.$el.scrollTop){
                        this.$refs.scrollBox.$el.scrollTop = tt[0].parentNode.offsetTop
                        // }
                    })
                }
            })
        },
        close () {
            const t = this
            t.openPick = false
        },
        close2 () {
            const t = this
            t.openPick2 = false
        },
        close3 () {
            const t = this
            t.openPick3 = false
        },
        changeinput (name, id) {
            const t = this
            t.unitCityName = name
            t.formValidate.unitCity = id
        },
        changeinput2 (name, id, type) {
            const t = this
            t.unitPname = name
            t.formValidate.unitPid = id
            t.type = type
        },
        changeinput3 (name, id) {
            const t = this
            t.unitCenterName = name
            t.formValidate.unitCenter = id
        },
        pickData () {
            const t = this
            if (!this.disabled) {
                t.popup = '0'
                //t.$refs.searchCity.getData(this.params, '02city')
                t.$refs.searchCity.getData(this.params)
                t.openPick = true
            }
        },
        pickData2 () {
            if (this.forbidden === null && !this.disabled) {
                const t = this
                t.$refs.searchOrgframe.getData(this.params2)
                t.openPick2 = true
            }
        },
        pickData3 () {
            if (!this.disabled) {
                const t = this
                t.$refs.searchOrgcostcenter.getData(this.params3)
                t.openPick3 = true
            }
        },
        clearPid () {
            if (!this.disabled) {
                const t = this
                t.unitPname = ''
                t.formValidate.unitPid = ''
            }
        },
        clearDfhire () {
            if (!this.disabled) {
                const t = this
                t.unitCityName = ''
                t.formValidate.unitCity = ''
            }
        },
        clearCostcenter () {
            if (!this.disabled) {
                const t = this
                t.unitCenterName = ''
                t.formValidate.unitCenter = ''
            }
        },
        /*选择员工*/
        pickEmpData () {
            if (this.forbidden === null && !this.disabled) {
                const t = this;
                t.$refs.searchEmpMaster.getData();
                t.openEmpMaster = true;
            }
        },
        closeEmp () {
            const t = this;
            t.openEmpMaster = false;
        },
        inputEmp (row) {
            const t = this;
            t.empnhName = row.empnhName;
            t.formValidate.empId = row.id;
        },
        handleReset () {
            this.$refs.scrollBox.$el.scrollTop = "0";
            this.$refs.formValidate.resetFields();
            //document.getElementById("scrollBox").scrollTop = "0";
            this.$emit('closeUp')
        },
        calculatePartEstablish () {
            if (valid.val_number99(this.formValidate.unitManger) && valid.val_number99(this.formValidate.unitDirec) && valid.val_number99(this.formValidate.unitStaff) && valid.val_number99(this.formValidate.unitPtstaff)) {
                let str = Number(this.formValidate.unitManger) + Number(this.formValidate.unitDirec) + Number(this.formValidate.unitStaff) + Number(this.formValidate.unitPtstaff)
                this.formValidate.partEstablish = str.toString()
            }
        }
    },
}
</script>
<style lang="scss">
@import "../../../sass/updateAndAdd";
.option-main {
    position: relative;
    height: 500px;
}
.btn {
    position: absolute;
    bottom: 20px;
    right: 60px;
}
.btn1 {
    position: absolute;
    bottom: 20px;
    right: 124px;
}
.ivu-input-number-disabled .ivu-input-number-input {
    color: #000;
}
</style>
