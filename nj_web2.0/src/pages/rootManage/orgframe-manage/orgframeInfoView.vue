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
                <Row style="max-height: 420px;overflow-y: auto;">
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
                                       :readonly="disabled"
                                       placeholder="请输入组织名称"></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="上级部门"
                                      prop="unitPid">
                                <span @dblclick="clearPid">
                                    <Input v-model="unitPname"
                                           icon="search"
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
                                    <Input v-model="unitCenterName"
                                           icon="search"
                                           :readonly=true
                                           placeholder="选择成本中心"
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
                                       :readonly="disabled"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入失效原因..."></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="部门编制"
                                      prop="partEstablish">
                                <InputNumber v-model="formValidate.partEstablish"
                                             :readonly="disabled"
                                             size="default"
                                             style="width: 290px"
                                             placeholder="请输入部门编制"></InputNumber>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="经理编制"
                                      prop="unitManger">
                                <InputNumber v-model="formValidate.unitManger"
                                             :readonly="disabled"
                                             size="default"
                                             style="width: 290px"
                                             placeholder="请输入经理编制"></InputNumber>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="主管编制"
                                      prop="unitDirec">
                                <InputNumber v-model="formValidate.unitDirec"
                                             :readonly="disabled"
                                             size="default"
                                             style="width: 290px"
                                             placeholder="请输入主管编制"></InputNumber>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="员工编制"
                                      prop="unitStaff">
                                <InputNumber v-model="formValidate.unitStaff"
                                             :readonly="disabled"
                                             size="default"
                                             style="width: 290px"
                                             placeholder="请输入员工编制"></InputNumber>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="系统转正"
                                      prop="unitSysalig">
                                <RadioGroup v-model="formValidate.unitSysalig">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectUnitSysalig"
                                           key="index"
                                           :disabled="disabled">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </i-col>
                        <i-col span="22">
                            <FormItem label="操作记录"
                                      prop="unitOprecord">
                                <Input v-model="formValidate.unitOprecord"
                                       :disabled=true
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入操作记录..."></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="22">
                            <FormItem label="备注"
                                      prop="note">
                                <Input v-model="formValidate.note"
                                       :readonly="disabled"
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
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchCity from '../../../components/searchTable/searchCity'
import searchOrgframe from '../../../components/searchTable/searchOrgframe'
import searchOrgcostcenter from '../../../components/searchTable/searchOrgcostcenter'

export default {

    data () {
        const validatePartEstablish = (rule, value, callback) => {
            if (value === "" || !value) {
                callback(new Error("请输入部门编制"));
            } else {
                let num = this.formValidate.unitManger + this.formValidate.unitDirec + this.formValidate.unitStaff
                if (value < num) {
                    callback(new Error("部门已超编,请重新检查部门编制数量"));
                }
                callback();
            }
        };
        return {
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
                unitCode: 'xxxxxx',            //组织编码
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
                partEstablish: null,       //部门编制
                unitManger: null,          //经理编制
                unitDirec: null,           //主管编制
                unitStaff: null,           //员工编制
                state: '',               //状态
                unitSysalig: '1',
                unitOprecord: this.logType,        //操作记录
                note: '',                //备注
                funId: '1',
                logType: '',
            },
            openPick: false,
            openPick2: false,
            openPick3: false,
            unitPname: '',
            unitCenterName: '',
            unitCityName: '',
            params: {
                _mt: 'baseCity.getPage',
                sort: 'id',
                order: 'desc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: '搜索',
                data: '{"cityIsvalid" : "1"}',
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
                rows: 10,
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
                rows: 10,
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
                unitType: [
                    { required: true, message: "请选择组织类型", trigger: 'change' },
                ],
                unitFname: [
                    { required: true, message: "请输入组织名称", trigger: 'blur' },
                ],
                unitPid: [
                    { required: true, message: "请选择上级部门", trigger: 'change' },
                ],
                unitPartfunct: [
                    { required: true, message: "请选择部门职能", trigger: 'change' },
                ],
                unitIndustry: [
                    { required: true, message: "请选择行业", trigger: 'change' },
                ],
                unitValdate: [
                    { type: 'date', message: "请选择生效日期", trigger: 'change' },
                ],
                partEstablish: [
                    { required: true, validator: validatePartEstablish, trigger: 'blur' }
                ],
                unitManger: [
                    { required: true, type: 'number', message: "请输入经理编制", trigger: 'blur' },
                ],
                unitDirec: [
                    { required: true, type: 'number', message: "请输入主管编制", trigger: 'blur' },
                ],
                unitStaff: [
                    { required: true, type: 'number', message: "请输入员工编制", trigger: 'blur' },
                ],
                unitSysalig: [
                    { required: true, message: "请选择系统转正", trigger: 'change' },
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
    },
    updated () {

    },
    mounted () {
        this.getSelect("orgunittype");
        this.getSelect("unitIndustry");
        this.getSelect("unitPartfunct");
    },
    methods: {
        getData (id) {
            const t = this
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
                    t.formValidate.unitType = res.data.content[0].unitType
                    t.formValidate.unitPid = res.data.content[0].unitPid
                    t.formValidate.unitPartfunct = res.data.content[0].unitPartfunct
                    t.formValidate.unitIndustry = res.data.content[0].unitIndustry == "0" ? "" : res.data.content[0].unitIndustry
                    t.formValidate.unitCenter = res.data.content[0].unitCenter
                    t.formValidate.unitCity = res.data.content[0].unitCity
                    t.formValidate.unitValdate = res.data.content[0].unitValdate
                    t.formValidate.unitInvdate = res.data.content[0].unitInvdate
                    t.formValidate.unitInvres = res.data.content[0].unitInvres
                    t.formValidate.partEstablish = parseInt(res.data.content[0].partEstablish)
                    t.formValidate.unitManger = parseInt(res.data.content[0].unitManger)
                    t.formValidate.unitDirec = parseInt(res.data.content[0].unitDirec)
                    t.formValidate.unitStaff = parseInt(res.data.content[0].unitStaff)
                    t.formValidate.unitSysalig = res.data.content[0].unitSysalig
                    t.formValidate.unitOprecord = res.data.content[0].unitOprecord
                    t.formValidate.note = res.data.content[0].note
                    t.unitCenterName = res.data.content[0].unitCenterName
                    t.unitCityName = res.data.content[0].unitCityName
                    t.unitPname = res.data.content[0].unitPname
                    if (id === res.data.content[0].companyId) {
                        t.forbidden = 'readonly'
                        t.distype = true
                    } else {
                        t.forbidden = null
                        t.distype = false
                    }
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
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
        handleSubmit () {
            const t = this
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
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                t.$refs.formValidate.resetFields()
                                t.$emit('getData', res.data.content[0])
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$emit('update', res.data.content[0])
                            }
                        }
                    }).catch(() => {
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
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
        changeinput2 (name, id, centerName, center, type) {
            const t = this
            // t.formValidate.unitType = type
            console.log(name, "name");
            t.unitPname = name
            t.formValidate.unitPid = id
            t.formValidate.unitCenter = center
            t.unitCenterName = centerName
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
                t.$refs.searchCity.getData(this.params, '02city\',\'03county')
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
        handleReset () {
            this.$refs.formValidate.resetFields()
            this.$emit('closeUp')
        },
    },
    watch: {
    },
}
</script>
<style lang="scss" scoped>
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
</style>
