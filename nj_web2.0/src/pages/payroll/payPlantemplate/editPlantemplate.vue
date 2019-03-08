<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="130">
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payPlantemplate.pltpYear')" prop="pltpYear">
            <Select v-model="form.pltpYear">
              <Option :value="item.fyYear" v-for="(item,index) in PltpYearType" :key="index">{{item.fyYear}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payPlantemplate.pltpSalset')" prop="pltpSalset">
            <Select v-model="form.pltpSalset">
              <Option :value="item.id" v-for="(item,index) in SalsetType" :key="index">{{item.payssCN}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payPlantemplate.pltpTaskshort')" prop="pltpTaskshort">
            <Input v-model="form.pltpTaskshort" :placeholder="$t('lang_payroll.payPlantemplate.pltpTaskshortDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_payroll.payPlantemplate.pltpTaskname')" prop="pltpTaskname">
            <Input v-model="form.pltpTaskname" :placeholder="$t('lang_payroll.payPlantemplate.pltpTasknameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_payroll.payPlantemplate.pltpTaskdesc')" prop="pltpTaskdesc">
            <Input v-model="form.pltpTaskdesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payPlantemplate.pltpTaskdesc')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_payroll.payPlantemplate.pltperson')" prop="pltpersonDis">
            <Input  v-model="pltpersonDis" readonly type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payPlantemplate.pltpersonDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payPlantemplate.pltpIskey')" prop="pltpIskey">
            <RadioGroup v-model="form.pltpIskey">
              <Radio :label="item.paramCode" v-for="(item,index) in YesOrNoType" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_payroll.payPlantemplate.pltpTasktype')" prop="pltpTasktype">
            <Select v-model="form.pltpTasktype" @on-change="taskTypeChange">
              <Option :value="item.paramCode" v-for="(item,index) in Tasktype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" v-show="form.pltpTasktype === '04specialday'? false : true">
          <FormItem :label="$t('lang_payroll.payPlantemplate.pltpTaskday')" prop="pltpTaskday">
            <Select v-model="form.pltpTaskday"  >
              <Option :value="item.value" v-for="item in form.pltpTasktype === '03basedfp'? TaskdayType02 : TaskdayType" :key="index">{{item.value}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11"  v-show="form.pltpTasktype === '04specialday'? true : false">
          <FormItem :label="$t('lang_payroll.payPlantemplate.pltpSpecdate')" prop="pltpSpecdate" >
            <DatePicker type="date" :placeholder="$t('lang_payroll.payPlantemplate.pltpSpecdateDis')" :editable="false" v-model="form.pltpSpecdate" ></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payPlantemplate.pltpNonworkrule')" prop="pltpNonworkrule">
            <Select v-model="form.pltpNonworkrule"  placement="top">
              <Option :value="item.paramCode" v-for="(item,index) in WorkruleType" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_payroll.payPlantemplate.pltpTime')" prop="pltpTime">
            <TimePicker format="HH:mm"  v-model="form.pltpTime" :placeholder="$t('lang_payroll.payPlantemplate.pltpTimeDis')" ></TimePicker>
          </FormItem>
        </i-col>
        </i-col>
      </Form>
    </Row>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        form: {
          _mt: 'payPlantemplate.addOrUpd',
          funId: '1',
          pltpYear: '',
          pltpSalset: '',
          pltpTaskshort: '',
          pltpTaskname: '',
          pltpTaskdesc: '',
          pltpIskey: '1',
          pltpTasktype: '01fixday',
          pltpTaskday: '',
          pltpSpecdate: '',
          pltpNonworkrule: '0',
          pltpTime: '',
        },
        pltpersonDis: '',
        YesOrNoType: [],
        Tasktype: [],
        WorkruleType: [],
        SalsetType: [],
        PltpYearType: [],
        TaskdayType: [
          { value: '01', label: '01' }, { value: '02', label: '02' }, { value: '03', label: '03' }, { value: '04', label: '04' }, { value: '05', label: '05' },
          { value: '06', label: '06' }, { value: '07', label: '07' }, { value: '08', label: '08' }, { value: '09', label: '09' }, { value: '10', label: '10' },
          { value: '11', label: '11' }, { value: '12', label: '12' }, { value: '13', label: '13' }, { value: '14', label: '14' }, { value: '15', label: '15' },
          { value: '16', label: '16' }, { value: '17', label: '17' }, { value: '18', label: '18' }, { value: '19', label: '19' }, { value: '20', label: '20' },
          { value: '21', label: '21' }, { value: '22', label: '22' }, { value: '23', label: '23' }, { value: '24', label: '24' }, { value: '25', label: '25' },
          { value: '26', label: '26' }, { value: '27', label: '27' }, { value: '28', label: '28' }, { value: '29', label: '29' }, { value: '30', label: '30' },
          { value: '31', label: '31' },
        ],
        TaskdayType02: [
          { value: '-10' }, { value: '-9' }, { value: '-8' }, { value: '-7' }, { value: '-6' }, { value: '-5' }, { value: '-4' },
          { value: '-3' }, { value: '-2' }, { value: '-1' }, { value: '0' }, { value: '1' }, { value: '2' }, { value: '3' },
          { value: '4' }, { value: '5' }, { value: '6' }, { value: '7' }, { value: '8' }, { value: '9' }, { value: '10' },
        ],
        ruleValidate: {
          pltpYear: [
            { required: true, message: this.$t('lang_payroll.payPlantemplate.pltpYearDis'), trigger: 'blur' },
          ],
          pltpSalset: [
            { required: true, message: this.$t('lang_payroll.payPlantemplate.pltpSalsetDis'), trigger: 'blur' },
          ],
          pltpTaskshort: [
            { required: true, message: this.$t('lang_payroll.payPlantemplate.pltpTaskshortDis'), trigger: 'blur' },
          ],
          pltpTaskname: [
            { required: true, message: this.$t('lang_payroll.payPlantemplate.pltpTasknameDis'), trigger: 'blur' },
          ],
          pltpIskey: [
            { required: true, message: this.$t('lang_payroll.payPlantemplate.pltpIskeyDis'), trigger: 'blur' },
          ],
          pltpTasktype: [
            { required: true, message: this.$t('lang_payroll.payPlantemplate.pltpTasktypeDis'), trigger: 'blur' },
          ],
          pltpTaskday: [
            { required: true, message: this.$t('lang_payroll.payPlantemplate.pltpTaskdayDis'), trigger: 'blur' },
          ],
          pltpNonworkrule: [
            { required: true, message: this.$t('lang_payroll.payPlantemplate.pltpNonworkruleDis'), trigger: 'blur' },
          ],
          pltpTime: [
            { required: true, message: this.$t('lang_payroll.payPlantemplate.pltpTimeDis'), trigger: 'blur' },
          ],
          pltpSpecdate: [
            { required: true, type: 'date', message: this.$t('lang_payroll.payPlantemplate.pltpSpecdateDis'), trigger: 'change' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    mounted() {
      this.getSelect()
      this.getSelect02()
      this.getSelect03()
    },
    methods: {
      getdata(params) {
        const t = this
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.form.pltpYear = res.data.content[0].pltpYear
            this.form.pltpSalset = res.data.content[0].pltpSalset
            this.form.pltpTaskshort = res.data.content[0].pltpTaskshort
            this.form.pltpTaskname = res.data.content[0].pltpTaskname
            this.form.pltpTaskdesc = res.data.content[0].pltpTaskdesc
            this.pltpersonDis = res.data.content[0].pltpersonDis
            this.form.pltpIskey = res.data.content[0].pltpIskey
            this.form.pltpTasktype = res.data.content[0].pltpTasktype
            this.form.pltpTaskday = res.data.content[0].pltpTaskday
            if (this.form.pltpTasktype !== '03basedfp') {
              if (this.form.pltpTaskday.length === 1) {
                this.form.pltpTaskday = '0' + this.form.pltpTaskday
              }
            }
            if (this.form.pltpTaskday === '00') {
              this.form.pltpTaskday = ''
            }
            this.form.pltpSpecdate = res.data.content[0].pltpSpecdate
            this.form.pltpNonworkrule = res.data.content[0].pltpNonworkrule
            this.form.pltpTime = res.data.content[0].pltpTime
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      taskTypeChange(value) {
        const t = this
        if (value === '03basedfp') {
            t.form.pltpTaskday = '0'
        }
        if (value === '01fixday' || value === '02firstpayroll') {
            if (t.form.pltpTaskday.length !== 2) {
              t.form.pltpTaskday = ''
            }
        }
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno,saltasktype,nonworkdayrule',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.YesOrNoType = res.data.content[0].value[0].paramList
            t.Tasktype = res.data.content[0].value[1].paramList
            t.WorkruleType = res.data.content[0].value[2].paramList
            t.$emit('setSelectValue', t.YesOrNoType, t.Tasktype)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelect02() {
        const t = this
        getDataLevelUserLoginNew({
          _mt: 'paySalSet.getSelectValue',
          funId: '1',
          data: '',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.SalsetType = res.data.content[0].value
            t.$emit('setSelectValue02', t.SalsetType)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelect03() {
        const t = this
        getDataLevelUserLoginNew({
          _mt: 'platFiscalyear.getSelectValue',
          funId: '1',
          data: '',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.PltpYearType = res.data.content[0].value
            t.$emit('setSelectValue03', t.PltpYearType)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const data = deepCopy(t.form)
        data.logType = t.logType
        data.id = t.id
        if (data.pltpSpecdate !== '') {
          data.pltpSpecdate = new Date(data.pltpSpecdate).format('yyyy-MM-dd')
        }
        if (this.form.pltpTasktype === '04specialday') {
          delete this.ruleValidate.pltpTaskday
          this.ruleValidate.pltpSpecdate = [
            { required: true, type: 'date', message: this.$t('lang_payroll.payPlantemplate.pltpSpecdateDis'), trigger: 'change' },
          ]
        } else {
          delete this.ruleValidate.pltpSpecdate
          this.ruleValidate.pltpTaskday = [
            { required: true, message: this.$t('lang_payroll.payPlantemplate.pltpTaskdayDis'), trigger: 'blur' },
          ]
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('getid', res.data.content[0].id)
                if (!t.id) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$emit('newdata', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      clear() {
        this.form.pltpYear = ''
        this.form.pltpSalset = ''
        this.form.pltpTaskshort = ''
        this.form.pltpTaskname = ''
        this.form.pltpTaskdesc = ''
        this.pltpersonDis = ''
        this.form.pltpIskey = ''
        this.form.pltpTasktype = ''
        this.form.pltpTaskday = ''
        this.form.pltpSpecdate = ''
        this.form.pltpNonworkrule = ''
        this.form.pltpTime = ''
        this.$refs.form.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
.option-main{
  position: relative;
  height: 500px;
  .btn{
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>

