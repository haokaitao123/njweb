<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="110">
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payEnd.pledBussource')">
            <Select v-model="form.pledBussource" disabled :placeholder="$t('lang_payroll.payEnd.pledBussourceDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Actiontype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payEnd.pledBusdesc')">
            <Input v-model="form.pledBusdesc" disabled :placeholder="$t('lang_payroll.payEnd.pledBusdescDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payEnd.pledEmpgid')">
            <Input v-model="form.pledEmpgid" disabled :placeholder="$t('lang_payroll.payEnd.pledEmpgidDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payEnd.pledEmpworkno')">
            <Input v-model="form.pledEmpworkno" disabled :placeholder="$t('lang_payroll.payEnd.pledEmpworknoDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payEnd.pledCname')">
            <Input v-model="form.pledCname" disabled :placeholder="$t('lang_payroll.payEnd.pledCnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payEnd.pledEmptype')">
            <Select v-model="form.pledEmptype" disabled  :placeholder="$t('lang_payroll.payEnd.pledEmptypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Emptype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payEnd.pledLastname')">
            <Input  v-model="form.pledLastname" disabled :placeholder="$t('lang_payroll.payEnd.pledLastnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payEnd.pledFirstname')">
            <Input  v-model="form.pledFirstname" disabled :placeholder="$t('lang_payroll.payEnd.pledFirstnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payEnd.pledIdtype')">
            <Select v-model="form.pledIdtype" disabled  :placeholder="$t('lang_payroll.payEnd.pledIdtypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Idtype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payEnd.pledIdno')" prop="pledIdno" >
            <Input  v-model="form.pledIdno" disabled :placeholder="$t('lang_payroll.payEnd.pledIdnoDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payEnd.pledCompany')" prop="pledCompany">
            <Input  v-model="form.pledCompanyDis" disabled :placeholder="$t('lang_payroll.payEnd.pledCompanyDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payEnd.pledDept')" prop="pledDept">
            <Input  v-model="form.pledDeptDis" disabled :placeholder="$t('lang_payroll.payEnd.pledDeptDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payEnd.pledPost')" prop="pledPost" >
            <Input  v-model="form.pledPostDis" disabled :placeholder="$t('lang_payroll.payEnd.pledPostDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payEnd.pledCostcenter')" prop="pledCostcenter">
            <Input  v-model="form.pledCostcenterDis" disabled :placeholder="$t('lang_payroll.payEnd.pledCostcenterDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payEnd.pledPostlevel')" prop="pledPostlevel" >
            <Input  v-model="form.pledPostlevelDis" disabled :placeholder="$t('lang_payroll.payEnd.pledPostlevelDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payEnd.pledSalarylevel')" prop="pledSalarylevel">
            <Input  v-model="form.pledSalarylevelDis" disabled :placeholder="$t('lang_payroll.payEnd.pledSalarylevelDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payEnd.pledTravellevel')" prop="pledTravellevel" >
            <Input  v-model="form.pledTravellevelDis" disabled :placeholder="$t('lang_payroll.payEnd.pledTravellevelDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payEnd.pledAdminlevel')" prop="pledAdminlevel">
            <Input  v-model="form.pledAdminlevelDis" disabled :placeholder="$t('lang_payroll.payEnd.pledAdminlevelDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payEnd.pledTaxlocation')" prop="pledTaxlocation">
            <Input  v-model="form.pledTaxlocationDis" disabled :placeholder="$t('lang_payroll.payEnd.pledTaxlocationDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payEnd.pledSalarycurrency')" prop="pledSalarycurrency">
            <Input  v-model="form.pledSalarycurrencyDis" disabled :placeholder="$t('lang_payroll.payEnd.pledSalarycurrencyDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payEnd.pledDimdate')" prop="pledDimdate">
            <Input v-model="form.pledDimdate" disabled :placeholder="$t('lang_payroll.payEnd.pledDimdateDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payEnd.pledDimtype')">
            <Select v-model="form.pledDimtype" disabled  :placeholder="$t('lang_payroll.payEnd.pledDimtypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Dimtype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payEnd.pledSalaryset')" prop="pledSalaryset">
            <Select v-model="form.pledSalaryset" disabled >
              <Option :value="item.id" v-for="(item,index) in selectSalset" :key="index" >{{item.payss}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payEnd.pledStatus')" prop="pledStatus">
            <Input  v-model="form.pledStatusDis" disabled :placeholder="$t('lang_payroll.payEnd.pledStatusDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payEnd.pledApplicant')" prop="pledApplicant">
            <Input v-model="form.pledApplicantDis" disabled :placeholder="$t('lang_payroll.payEnd.pledApplicantDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11"  offset="1">
          <FormItem :label="$t('lang_payroll.payEnd.pledApplytime')" prop="pledApplytime">
            <Input v-model="form.pledApplytime" disabled :placeholder="$t('lang_payroll.payEnd.pledApplytimeDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_payroll.payEnd.pledIsconfirm')" prop="pledIsconfirm" >
            <RadioGroup v-model="form.pledIsconfirm"  >
              <Radio :label="item.paramCode" v-for="(item,index) in YesOrNoType" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
        <i-col span="23" v-show="form.pledIsconfirm === '0'? true:false">
          <FormItem :label="$t('lang_payroll.payEnd.pledNocmreason')" prop="pledNocmreason">
            <Input v-model="form.pledNocmreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payEnd.pledNocmreasonDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_payroll.payEnd.pledComment')" prop="pledComment">
            <Input v-model="form.pledComment" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payEnd.pledCommentDis')"></Input>
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
        Dimtype: [],
        Emptype: [],
        Idtype: [],
        selectSalset: [],
        YesOrNoType: [],
        form: {},
        ruleValidate: {
          pledIsconfirm: [
            { required: true, message: this.$t('lang_payroll.payEnd.pledIsconfirmDis'), trigger: 'blur' },
          ],
          pledNocmreason: [
            { required: true, message: this.$t('lang_payroll.payEnd.pledNocmreasonDis'), trigger: 'blur' },
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
          typeCode: 'actiontype,separatereason,idtype,yesno,emptype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Actiontype = res.data.content[0].value[0].paramList
            t.Dimtype = res.data.content[0].value[1].paramList
            t.Idtype = res.data.content[0].value[2].paramList
            t.YesOrNoType = res.data.content[0].value[3].paramList
            t.Emptype = res.data.content[0].value[3].paramList
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
        data._mt = 'payEnd.addOrUpd'
        data.funId = '1'
        data.logType = t.logType
        data.id = t.id
        if (this.form.pledIsconfirm === '1') {
          delete this.ruleValidate.pledNocmreason
        } else {
          this.ruleValidate.pledNocmreason = [
            { required: true, message: this.$t('lang_payroll.payEnd.pledNocmreasonDis'), trigger: 'blur' },
          ]
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                  t.$Modal.success({
                    itle: this.$t('reminder.suc'),
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

