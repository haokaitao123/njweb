<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="110">
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdd.pladBussource')">
            <Select v-model="form.pladBussource" disabled :placeholder="$t('lang_payroll.payAdd.pladBussourceDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Actiontype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdd.pladBusdesc')">
            <Input v-model="form.pladBusdesc" disabled :placeholder="$t('lang_payroll.payAdd.pladBusdescDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdd.pladEmpgid')">
            <Input v-model="form.pladEmpgid" disabled :placeholder="$t('lang_payroll.payAdd.pladEmpgidDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdd.pladEmpworkno')">
            <Input v-model="form.pladEmpworkno" disabled :placeholder="$t('lang_payroll.payAdd.pladEmpworknoDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdd.pladCname')">
            <Input v-model="form.pladCname" disabled :placeholder="$t('lang_payroll.payAdd.pladCnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdd.pladEmptype')">
            <Select v-model="form.pladEmptype" disabled  :placeholder="$t('lang_payroll.payAdd.pladEmptypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Emptype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdd.pladLastname')">
            <Input  v-model="form.pladLastname" disabled :placeholder="$t('lang_payroll.payAdd.pladLastnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdd.pladFirstname')">
            <Input  v-model="form.pladFirstname" disabled :placeholder="$t('lang_payroll.payAdd.pladFirstnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdd.pladIdtype')">
            <Select v-model="form.pladIdtype" disabled  :placeholder="$t('lang_payroll.payAdd.pladIdtypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Idtype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdd.pladIdno')" prop="pladIdno" >
            <Input  v-model="form.pladIdno" disabled :placeholder="$t('lang_payroll.payAdd.pladIdnoDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdd.pladCompany')" prop="pladCompany">
            <Input  v-model="form.pladCompanyDis" disabled :placeholder="$t('lang_payroll.payAdd.pladCompanyDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdd.pladDept')" prop="pladDept">
            <Input  v-model="form.pladDeptDis" disabled :placeholder="$t('lang_payroll.payAdd.pladDeptDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdd.pladPost')" prop="pladPost" >
            <Input  v-model="form.pladPostDis" disabled :placeholder="$t('lang_payroll.payAdd.pladPostDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdd.pladCostcenter')" prop="pladCostcenter">
            <Input  v-model="form.pladCostcenterDis" disabled :placeholder="$t('lang_payroll.payAdd.pladCostcenterDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdd.pladPostlevel')" prop="pladPostlevel" >
            <Input  v-model="form.pladPostlevelDis" disabled :placeholder="$t('lang_payroll.payAdd.pladPostlevelDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdd.pladSalarylevel')" prop="pladSalarylevel">
            <Input  v-model="form.pladSalarylevelDis" disabled :placeholder="$t('lang_payroll.payAdd.pladSalarylevelDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdd.pladTravellevel')" prop="pladTravellevel" >
            <Input  v-model="form.pladTravellevelDis" disabled :placeholder="$t('lang_payroll.payAdd.pladTravellevelDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdd.pladAdminlevel')" prop="pladAdminlevel">
            <Input  v-model="form.pladAdminlevelDis" disabled :placeholder="$t('lang_payroll.payAdd.pladAdminlevelDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdd.pladTaxlocation')" prop="pladTaxlocation">
            <Input  v-model="form.pladTaxlocationDis" disabled :placeholder="$t('lang_payroll.payAdd.pladTaxlocationDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdd.pladSalarycurrency')" prop="pladSalarycurrency">
            <Input  v-model="form.pladSalarycurrencyDis" disabled :placeholder="$t('lang_payroll.payAdd.pladSalarycurrencyDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdd.pladEntrydate')" prop="pladEntrydate">
            <Input v-model="form.pladEntrydate" disabled :placeholder="$t('lang_payroll.payAdd.pladEntrydateDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdd.pladSalaryset')" prop="pladSalaryset">
            <Select v-model="form.pladSalaryset"  >
              <Option :value="item.id" v-for="(item,index) in selectSalset" :key="index" >{{item.payss}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_payroll.payAdd.pladConfirmrecord')" prop="pladConfirmrecord">
            <Input v-model="form.pladConfirmrecord" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payAdd.pladConfirmrecordDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_payroll.payAdd.pladComment')" prop="pladComment">
            <Input v-model="form.pladComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payAdd.pladCommentDis')"></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
    <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  export default {
    data() {
      return {
        title: '',
        Actiontype: [],
        selectSalset: [],
        Emptype: [],
        Idtype: [],
        form: {},
        ruleValidate: {
          pladSalaryset: [
            { required: true, message: this.$t('lang_payroll.payAdd.pladSalarysetDis'), trigger: 'change' },
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
    },
    mounted() {
      this.getSelect()
      this.getSelectSalSet()
    },
    methods: {
      getdata(params) {
        const t = this
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form = res.data.content[0]
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'actiontype,emptype,idtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Actiontype = res.data.content[0].value[0].paramList
            t.Emptype = res.data.content[0].value[1].paramList
            t.Idtype = res.data.content[0].value[2].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelectSalSet() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'paySalSet.getSelectValue',
          data: '{}',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectSalset = (res.data.content[0].value)
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const data = deepCopy(t.form)
        data._mt = 'payAdd.addOrUpd'
        data.funId = '1'
        data.logType = t.logType
        data.id = t.id
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
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
        const t = this
       t.form = {}
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

