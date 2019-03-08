<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="100">
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdjust.plajCompany')">
            <span>
               <Input v-model="form.plajCompanyDis" icon="search" disabled :placeholder="$t('lang_payroll.payAdjust.plajCompanyDis')"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajDept')" prop="plajDept">
            <span>
               <Input v-model="form.plajDeptDis" icon="search" disabled  :placeholder="$t('lang_payroll.payAdjust.plajDeptDis')"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdjust.plajEmpworkno')">
            <span>
               <Input v-model="form.plajEmpworkno" disabled icon="search" :placeholder="$t('lang_payroll.payAdjust.plajEmpworknoDis')" />
            </span>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajEmpgid')">
            <Input v-model="form.plajEmpgid" disabled :placeholder="$t('lang_payroll.payAdjust.plajEmpgidDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdjust.plajCname')">
            <Input v-model="form.plajCname" disabled :placeholder="$t('lang_payroll.payAdjust.plajCnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajPost')" prop="plajPost" >
            <Input  v-model="form.plajPostDis" disabled :placeholder="$t('lang_payroll.payAdjust.plajPostDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_payroll.payAdjust.plajEmptype')">
            <Select v-model="form.plajEmptype" disabled  :placeholder="$t('lang_payroll.payAdjust.plajEmptypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Emptype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajCostcenter')" prop="plajCostcenter">
            <Input  v-model="form.plajCostcenterDis" disabled :placeholder="$t('lang_payroll.payAdjust.plajCostcenterDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdjust.plajTaxlocation')" prop="plajTaxlocation">
            <Select v-model="form.plajTaxlocation" disabled  :placeholder="$t('lang_payroll.payAdjust.plajTaxlocationDis')" >
              <Option :value="item.id" v-for="(item,index) in Taxlocation" :key="index">{{item.cityName}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="23"></i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdjust.plajPostlevelOld')" prop="plajPostlevelOld" >
            <Select v-model="form.plajPostlevelOld" disabled  :placeholder="$t('lang_payroll.payAdjust.plajPostlevelOldDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Postlevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajPostlevelNew')" prop="plajPostlevelNew" >
            <Select v-model="form.plajPostlevelNew" disabled :placeholder="$t('lang_payroll.payAdjust.plajPostlevelNewDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Postlevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdjust.plajSalarylevelOld')" prop="plajSalarylevelOld">
            <Select v-model="form.plajSalarylevelOld" disabled  :placeholder="$t('lang_payroll.payAdjust.plajSalarylevelOldDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Salarylevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11"  offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajSalarylevelNew')" prop="plajSalarylevelNew">
            <Select v-model="form.plajSalarylevelNew" disabled  :placeholder="$t('lang_payroll.payAdjust.plajSalarylevelNewDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Salarylevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_payroll.payAdjust.plajTravellevelOld')" prop="plajTravellevelOld" >
            <Select v-model="form.plajTravellevelOld" disabled  :placeholder="$t('lang_payroll.payAdjust.plajTravellevelOldDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Travellevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajTravellevelNew')" prop="plajTravellevelNew" >
            <Select v-model="form.plajTravellevelNew" disabled  :placeholder="$t('lang_payroll.payAdjust.plajTravellevelNewDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Travellevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11"  >
          <FormItem :label="$t('lang_payroll.payAdjust.plajAdminlevelOld')" prop="plajAdminlevelOld">
            <Select v-model="form.plajAdminlevelOld" disabled  :placeholder="$t('lang_payroll.payAdjust.plajAdminlevelOldDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Adminlevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajAdminlevelNew')" prop="plajAdminlevelNew">
            <Select v-model="form.plajAdminlevelNew" disabled  :placeholder="$t('lang_payroll.payAdjust.plajAdminlevelNewDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Adminlevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="23"></i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_payroll.payAdjust.plajSalaryset')" prop="plajSalaryset">
            <Select v-model="form.plajSalaryset" disabled :placeholder="$t('lang_payroll.payAdjust.plajSalarysetDis')">
              <Option :value="item.id" v-for="(item,index) in Salaryset" :key="index" >{{item.payss}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11"offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajSalarycurrency')" prop="plajSalarycurrency">
            <Select v-model="form.plajSalarycurrency" disabled :placeholder="$t('lang_payroll.payAdjust.plajSalarycurrencyDis')" >
              <Option :value="item.id" v-for="(item,index) in Salarycurrency" :key="index" >{{item.currCurrency}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdjust.plajReadon')" prop="plajReadon">
            <Select v-model="form.plajReadon"  :placeholder="$t('lang_payroll.payAdjust.plajReadonDis')" >
              <Option :value="item.paramCode" disabled v-for="(item,index) in SalajReason" :key="index" >{{item.paramInfoName}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajAdjustdate')" prop="plajAdjustdate">
            <DatePicker type="date" disabled :placeholder="$t('lang_payroll.payAdjust.plajAdjustdateDis')" :editable="false" v-model="form.plajAdjustdate" ></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdjust.plajStatus')" prop="plajStatus">
            <Input v-model="form.plajStatusDis" disabled :placeholder="$t('lang_payroll.payAdjust.plajStatusDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23"></i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdjust.plajApplicant')" prop="plajApplicant">
            <Input v-model="form.plajApplicantDis" disabled :placeholder="$t('lang_payroll.payAdjust.plajApplicantDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11"  offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajApplytime')" prop="plajApplytime">
            <Input v-model="form.plajApplytime" disabled :placeholder="$t('lang_payroll.payAdjust.plajApplytimeDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_payroll.payAdjust.plajIsconfirm')" prop="plajIsconfirm" >
            <RadioGroup v-model="form.plajIsconfirm"  >
              <Radio :label="item.paramCode" v-for="(item,index) in YesOrNoType" :key="item.paramCode">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
        <i-col span="23" v-show="form.plajIsconfirm === '0'? true:false">
          <FormItem :label="$t('lang_payroll.payAdjust.plajNocmreason')" prop="plajNocmreason">
            <Input v-model="form.plajNocmreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payAdjust.plajNocmreasonDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_payroll.payAdjust.plajComment')" prop="plajComment">
            <Input v-model="form.plajComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payAdjust.plajCommentDis')"></Input>
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
        Emptype: [],
        Taxlocation: [],
        Salaryset: [],
        Salarycurrency: [],
        Postlevel: [],
        Salarylevel: [],
        Travellevel: [],
        Adminlevel: [],
        SalajReason: [],
        YesOrNoType: [],
        form: {},
        ruleValidate: {
          plajIsconfirm: [
            { required: true, message: this.$t('lang_payroll.payAdjust.plajIsconfirmDis'), trigger: 'blur' },
          ],
          plajNocmreason: [
            { required: true, message: this.$t('lang_payroll.payAdjust.plajNocmreasonDis'), trigger: 'blur' },
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
      this.getSelectTaxlocation()
      this.getSelectSalarycurrency()
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
          typeCode: 'emptype,postlevel,salarylevel,travellevel,adminlevel,salajreason,yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Emptype = res.data.content[0].value[0].paramList
            t.Postlevel = res.data.content[0].value[1].paramList
            t.Salarylevel = res.data.content[0].value[2].paramList
            t.Travellevel = res.data.content[0].value[3].paramList
            t.Adminlevel = res.data.content[0].value[4].paramList
            t.SalajReason = res.data.content[0].value[5].paramList
            t.YesOrNoType = res.data.content[0].value[6].paramList
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
            t.Salaryset = res.data.content[0].value
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
          })
        })
      },
      getSelectTaxlocation() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseCity.getSelectValue',
          data: '{"cityIsvalid" : "1"}',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Taxlocation = res.data.content[0].value
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
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
      save() {
        const t = this
        const data = deepCopy(t.form)
        data._mt = 'payAdjust.addOrUpd'
        data.funId = '1'
        data.logType = t.logType
        data.id = t.id
        if (data.plajAdjustdate !== '') {
          data.plajAdjustdate = new Date(data.plajAdjustdate).format('yyyy-MM-dd')
        }
        if (this.form.plajIsconfirm === '1') {
          delete this.ruleValidate.plajNocmreason
        } else {
          this.ruleValidate.plajNocmreason = [
            { required: true, message: this.$t('lang_payroll.payAdjust.plajNocmreasonDis'), trigger: 'blur' },
          ]
        }
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

