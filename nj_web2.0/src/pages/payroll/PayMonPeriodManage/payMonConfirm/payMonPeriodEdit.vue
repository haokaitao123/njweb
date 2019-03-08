<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 11px;"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="option-main">
        <Row style="max-height: 420px;overflow-y: auto;">
          <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="155">
            <i-col span="11">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpCompany')">
                <Input v-model="form.plsimnpCompanyDis" disabled :placeholder="$t('lang_payroll.payMonPeriod.plsimnpCompanyDis')"/>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpmnpDept')" prop="plsimnpmnpDept">
                <Input v-model="form.plsimnpDeptDis" disabled :placeholder="$t('lang_payroll.payMonPeriod.plsimnpmnpDeptDis')"></Input>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpEmpgid')">
                <Input v-model="form.plsimnpEmpgid" disabled :placeholder="$t('lang_payroll.payMonPeriod.plsimnpEmpgid')"></Input>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpEmpworkno')">
                <Input v-model="form.plsimnpEmpworkno" disabled :placeholder="$t('lang_payroll.payMonPeriod.plsimnpEmpworknoDis')"></Input>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpCname')">
                <Input v-model="form.plsimnpCname" disabled :placeholder="$t('lang_payroll.payMonPeriod.plsimnpCnameDis')"></Input>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpPeriod')" prop="plsimnpPeriod">
                <Input v-model="form.plsimnpPeriodDis" disabled  :placeholder="$t('lang_payroll.payMonPeriod.plsimnpPeriodDis')" />
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpSalaryset')" prop="plsimnpSalaryset">
                <Select v-model="form.plsimnpSalaryset" disabled :placeholder="$t('lang_payroll.payMonPeriod.plsimnpSalarysetDis')">
                  <Option :value="item.id" v-for="(item,index) in Salaryset" :key="index" >{{item.payss}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpSalarycurrency')" prop="plsimnpSalarycurrency">
                <Select v-model="form.plsimnpSalarycurrency" disabled :placeholder="$t('lang_payroll.payMonPeriod.plsimnpSalarycurrencyDis')" >
                  <Option :value="item.id" v-for="(item,index) in Salarycurrency" :key="index" >{{item.currCurrency}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11" v-for="(item,index) in ItemArray[key]" :key="index" :offset="index % 2 === 1 ? 1:0">
              <FormItem :label="item.label">
                <Input v-model="item.value" disabled  :placeholder="$t('lang_payroll.payMonPeriod.plsimnpSalaryItem')"></Input>
              </FormItem>
            </i-col>
            <i-col span="23"></i-col>
            <i-col span="11">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpApplicant')">
                <Input v-model="form.plsimnpApplicantDis" disabled :placeholder="$t('lang_payroll.payMonPeriod.plsimnpApplicantDis')"></Input>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpApplytime')">
                <Input v-model="form.plsimnpApplytime" disabled :placeholder="$t('lang_payroll.payMonPeriod.plsimnpApplytimeDis')"></Input>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpIsconfirm')" prop="plsimnpIsconfirm" >
                <Select v-model="form.plsimnpIsconfirm"  >
                  <Option :value="item.paramCode" v-for="(item,index) in YesOrNoType" :key="index">{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="23" v-show="form.plsimnpIsconfirm === '0'? true:false">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpNocmreason')" prop="plsimnpNocmreason">
                <Input v-model="form.plsimnpNocmreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payMonPeriod.plsimnpNocmreasonDis')"></Input>
              </FormItem>
            </i-col>
            <i-col span="23">
              <FormItem :label="$t('lang_payroll.payMonPeriod.plsimnpComment')" prop="plsimnpComment">
                <Input v-model="form.plsimnpComment" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payMonPeriod.plsimnpCommentDis')"></Input>
              </FormItem>
            </i-col>
          </Form>
        </Row>
        <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
      </div>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  export default {
    data() {
      return {
        Salarycurrency: [],
        YesOrNoType: [],
        openCompany: false,
        form: {},
        ruleValidate: {
          plsimnpIsconfirm: [
            { required: true, message: this.$t('lang_payroll.payMonPeriod.plsimnpIsconfirmDis'), trigger: 'blur' },
          ],
          plsimnpNocmreason: [
            { required: true, message: this.$t('lang_payroll.payMonPeriod.plsimnpNocmreasonDis'), trigger: 'blur' },
          ],
        },
        key: '',
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
      Salaryset: Array,
      ItemArray: Object,
    },
    updated() {

    },
    components: {
    },
    mounted() {
      this.getSelect()
      this.getSelectSalarycurrency()
    },
    methods: {
      getData(id) {
        const t = this
        t.key = id
        getDataLevelUserLogin({
          _mt: 'paySalitemMonthnoperiod.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form = res.data.content[0]
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
        data._mt = 'paySalitemMonthnoperiod.addOrUpd'
        data.logType = t.logType
        data.funId = '1'
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        if (this.form.plsimnpIsconfirm === '1') {
          delete this.ruleValidate.plsimnpNocmreason
        } else {
          this.ruleValidate.plsimnpNocmreason = [
            { required: true, message: this.$t('lang_payroll.payMonPeriod.plsimnpNocmreasonDis'), trigger: 'blur' },
          ]
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.form.resetFields()
                  t.$emit('getData')
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('getData')
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
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.YesOrNoType = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelectSalarycurrency() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseCurrency.getSelectValue',
          data: '{}',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Salarycurrency = res.data.content[0].value
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
          })
        })
      },
      // 选择公司
      handleReset() {
        this.$refs.form.resetFields()
        this.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd";
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
