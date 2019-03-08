<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="120">
        <i-col span="11">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpCompany')">
              <Input  icon="search" :readonly="true"
                     :placeholder="$t('lang_repayApply.sihfRepay.sirpCompanyPrompt')"
                     v-model="form.sirpCompanyDis" disabled/>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpDept')">
              <Input  icon="search"
                     :placeholder="$t('lang_repayApply.sihfRepay.sirpDeptPrompt')"
                     v-model="form.sirpDeptDis" disabled/>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpEmpworkno')">
            <Input icon="search" :readonly="true"
                   :placeholder="$t('lang_repayApply.sihfRepay.sirpEmpworkno')"
                   v-model="form.sirpEmpworkno" disabled/>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpEmptype')">
            <Input v-model="form.sirpEmptypeDis" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpEmpgid')">
            <Input v-model="form.sirpEmpgid" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1" >
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpCname')">
            <Input v-model="form.sirpCname" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpLastname')">
            <Input v-model="form.sirpLastname" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpFirstname')">
            <Input v-model="form.sirpFirstname" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpIdtype')">
            <Input v-model="form.sirpIdtypeDis" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1" >
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpIdno')">
            <Input v-model="form.sirpIdno" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpBenefitlocation')" >
              <Input icon="search"
                     :placeholder="$t('lang_repayApply.sihfRepay.sirpBenefitlocation')"
                     v-model="form.sirpBenefitlocationDis" disabled/>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpBenefitpolicy')"  >
              <Input icon="search"
                     :placeholder="$t('lang_repayApply.sihfRepay.sirpBenefitpolicy')"
                     v-model="form.sirpBenefitpolicyDis" disabled/>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpBenefittype')"  >
            <Select v-model="form.sirpBenefittype"
                    :placeholder="$t('lang_repayApply.sihfRepay.sirpBenefittype')" :transfer="true" disabled>
              <Option :value="item.paramCode" v-for="(item,index) in benefitacctype" :key="index">
                {{item.paramInfoName}}
              </Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpBaseamt')" >
            <Input v-model="form.sirpBaseamt" disabled></Input>
            <!--<InputNumber :max="1000" :min="0" :step="1" style="width: 100%" v-model="form.sirpBaseamt"></InputNumber>-->
          </FormItem>
        </i-col>
        <i-col span="23" ></i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpSmonth')"  >
            <Input  :placeholder="$t('lang_repayApply.sihfRepay.sirpSmonth')"
                   v-model="form.sirpSmonth" disabled/>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpEmonth')" >
            <Input :placeholder="$t('lang_repayApply.sihfRepay.sirpEmonth')"
                   v-model="form.sirpEmonth" disabled/>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpPaymonth')"  >
            <Input :placeholder="$t('lang_repayApply.sihfRepay.sirpPaymonth')"
                   v-model="form.sirpPaymonth" disabled/>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpStatus')">
            <Input v-model="form.sirpStatusDis" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpReason')">
            <Input v-model="form.sirpReason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpApplicant')" >
            <Input v-model="form.sirpApplicantDis" disabled></Input>
            <!--<InputNumber :max="1000" :min="0" :step="1" style="width: 100%" v-model="form.sirpBaseamt"></InputNumber>-->
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpApplytime')">
            <Input v-model="form.sirpApplytime" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpIsconfirmDis')" prop="sirpIsconfirm" >
            <RadioGroup v-model="form.sirpIsconfirm"  >
              <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
        <i-col span="23" v-show="form.sirpIsconfirm === '0'? true:false">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpNocmreason')" prop="sirpNocmreason">
            <Input v-model="form.sirpNocmreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   :placeholder="$t('lang_repayApply.sihfRepay.psirpNocmreason')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpComment')">
            <Input v-model="form.sirpComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" disabled></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
    <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'
  import searchCompany from '../../../../components/searchTable/searchOrgCom'
  import searchPubEmp from '../../../../components/searchTable/searchPubEmpOther'
  import searchCityPub from '../../../../components/searchTable/searchCityPub'
  import searcSihfPolicy from '../../../../components/searchTable/searcSihfPolicy'
  import searchUnitPub from '../../../../components/searchTable/searchUnitPub'
  import valid from '../../../../lib/pub_valid'

  export default {
    data() {
      return {
        form: {
          _mt: 'sihfRepay.addOrUpd',
          sirpIsconfirm: '0',
          sirpNocmreason: '',
          sirpCompany: '',
          sirpEmpworkno: '',
          sirpEmpgid: '',
          sirpCname: '',
          sirpLastname: '',
          sirpFirstname: '',
          sirpIdtype: '',
          sirpIdno: '',
          sirpEmptype: '',
          sirpBenefitlocation: '',
          sirpBenefitpolicy: '',
          sirpBenefittype: '',
          sirpSmonth: '',
          sirpEmonth: '',
          sirpPaymonth: '',
          sirpBaseamt: '',
          sirpReason: '',
          sirpComment: '',
          sirpStatus: '10confirm',
          sirpCompanyDis: '',
          sirpDeptDis: '',
          sirpIdtypeDis: '',
          sirpEmptypeDis: '',
          sirpBenefitlocationDis: '',
          sirpBenefitpolicyDis: '',
          sirpStatusDis: this.$t('lang_repayApply.sihfRepay.sirpStatusDis'),
          sirpApplicant: '',
          sirpApplicantDis: '',
          sirpApplytime: '',
        },
        benefitacctype: [],
        radioYesOrNo: [],
        yesno: [],
        ruleValidate: {
          sirpIsconfirm: [
            { required: true, message: this.$t('lang_repayApply.sihfRepay.sirpBenefitlocationWarning'), trigger: 'change' },
          ],
          sirpNocmreason: [
            { required: true, message: this.$t('lang_repayApply.sihfRepay.sirpBenefitlocationWarning'), trigger: 'change' },
          ],
        },
      }
    },
    props: {
      logType: String,
      index: Number,
    },
    mounted() {
      this.getSelect()
    },
    components: {
    },
    methods: {
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.radioYesOrNo = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getdata() {
        const t = this
        const params = {
          _mt: 'sihfRepay.getById',
          id: t.$store.state.repayConfirm.mainId,
          logType: '根据id查询',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.form.sirpCompany = res.data.content[0].sirpCompany
            this.form.sirpEmpworkno = res.data.content[0].sirpEmpworkno
            this.form.sirpEmpgid = res.data.content[0].sirpEmpgid
            this.form.sirpCname = res.data.content[0].sirpCname
            this.form.sirpLastname = res.data.content[0].sirpLastname
            this.form.sirpFirstname = res.data.content[0].sirpFirstname
            this.form.sirpIdtype = res.data.content[0].sirpIdtype
            this.form.sirpIdno = res.data.content[0].sirpIdno
            this.form.sirpEmptype = res.data.content[0].sirpEmptype
            this.form.sirpBenefitlocation = res.data.content[0].sirpBenefitlocation
            this.form.sirpBenefitpolicy = res.data.content[0].sirpBenefitpolicy
            this.form.sirpBenefittype = res.data.content[0].sirpBenefittype
            this.form.sirpSmonth = res.data.content[0].sirpSmonth
            this.form.sirpEmonth = res.data.content[0].sirpEmonth
            this.form.sirpPaymonth = res.data.content[0].sirpPaymonth
            this.form.sirpBaseamt = res.data.content[0].sirpBaseamt
            this.form.sirpReason = res.data.content[0].sirpReason
            this.form.sirpComment = res.data.content[0].sirpComment
            this.form.sirpCompanyDis = res.data.content[0].sirpCompanyDis
            this.form.sirpDeptDis = res.data.content[0].sirpDeptDis
            this.form.sirpBenefitlocationDis = res.data.content[0].sirpBenefitlocationDis
            this.form.sirpBenefitpolicyDis = res.data.content[0].sirpBenefitpolicyDis
            this.form.sirpEmptypeDis = res.data.content[0].sirpEmptypeDis
            this.form.sirpIdtypeDis = res.data.content[0].sirpIdtypeDis
            this.form.sirpIsconfirm = res.data.content[0].sirpIsconfirm
            this.form.sirpNocmreason = res.data.content[0].sirpNocmreason
            this.form.sirpApplicant = res.data.content[0].sirpApplicant
            this.form.sirpApplicantDis = res.data.content[0].sirpApplicantDis
            this.form.sirpApplytime = res.data.content[0].sirpApplytime
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const data = deepCopy(t.form)
        if (t.$store.state.repayConfirm.mainId) {
          data.id = t.$store.state.repayConfirm.mainId
        }
//        if (data.sirpSmonth !== '') {
//          data.sirpSmonth = data.sirpSmonth.format('yyyy-MM')
//        }
//        if (data.sirpEmonth !== '') {
//          data.sirpEmonth = data.sirpEmonth.format('yyyy-MM')
//        }
//        if (data.sirpPaymonth !== '') {
//          data.sirpPaymonth = data.sirpPaymonth.format('yyyy-MM')
//        }
        data.logType = t.logType
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        if (this.form.sirpIsconfirm === '1') {
          delete this.ruleValidate.sirpNocmreason
        } else {
          this.ruleValidate.sirpNocmreason = [
            { required: true, message: this.$t('lang_repayApply.sihfRepay.sirpBenefitlocationWarning'), trigger: 'blur' },
          ]
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$store.commit('repayConfirm/setMainId', res.data.content[0].id)
//                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
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
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      clear() {
        this.form.sirpIsconfirm = '0'
        this.form.sirpCompany = ''
        this.form.sirpEmpworkno = ''
        this.form.sirpEmpgid = ''
        this.form.sirpCname = ''
        this.form.sirpLastname = ''
        this.form.sirpFirstname = ''
        this.form.sirpIdtype = ''
        this.form.sirpIdno = ''
        this.form.sirpEmptype = ''
        this.form.sirpBenefitlocation = ''
        this.form.sirpBenefitpolicy = ''
        this.form.sirpBenefittype = ''
        this.form.sirpSmonth = ''
        this.form.sirpEmonth = ''
        this.form.sirpPaymonth = ''
        this.form.sirpBaseamt = ''
        this.form.sirpReason = ''
        this.form.sirpComment = ''
        this.form.sirpEmptypeDis = ''
        this.form.sirpBenefitlocationDis = ''
        this.form.sirpBenefitpolicyDis = ''
        this.form.sirpStatusDis = this.$t('button.edi')
        this.form.sirpApplicant = ''
        this.form.sirpApplicantDis = ''
        this.form.sirpApplytime = ''
        this.$store.commit('repayConfirm/setMainId', '')
        this.$refs.form.resetFields()
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'benefitacctype,yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.benefitacctype = res.data.content[0].value[0].paramList
            t.yesno = res.data.content[0].value[1].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .option-main {
    position: relative;
    height: 500px;
    .btn {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>
