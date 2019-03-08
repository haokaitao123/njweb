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
            <Input v-model="form.sirpReason" :autosize="{minRows: 2,maxRows: 5}" disabled type="textarea"></Input>
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
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpConfirmer')" >
            <Input v-model="form.sirpConfirmerDis" disabled></Input>
            <!--<InputNumber :max="1000" :min="0" :step="1" style="width: 100%" v-model="form.sirpBaseamt"></InputNumber>-->
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpConfirmtime')">
            <Input v-model="form.sirpConfirmtime" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpConfirmrecord')">
            <Input v-model="form.sirpConfirmrecord" :autosize="{minRows: 2,maxRows: 5}" disabled type="textarea"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" v-show="form.sirpStatus === '30success' || form.sirpStatus === '40fail'? true : false">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpSbperson')" >
            <Input v-model="form.sirpSbpersonDis" disabled></Input>
            <!--<InputNumber :max="1000" :min="0" :step="1" style="width: 100%" v-model="form.sirpBaseamt"></InputNumber>-->
          </FormItem>
        </i-col>
        <i-col span="11" v-show="form.sirpStatus === '30success' || form.sirpStatus === '40fail'? true : false" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpSbtime')">
            <Input v-model="form.sirpSbtime" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="23" v-show="form.sirpStatus === '40fail'? true : false">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpSberror')">
            <Input v-model="form.sirpSberror" :autosize="{minRows: 2,maxRows: 5}" disabled type="textarea"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpComment')">
            <Input v-model="form.sirpComment" :autosize="{minRows: 2,maxRows: 5}" disabled type="textarea"></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'
  import valid from '../../../../lib/pub_valid'

  export default {
    data() {
      return {
        form: {
          _mt: 'sihfRepay.addOrUpd',
          sirpConfirmrecord: '',
          sirpApplicant: '',
          sirpApplicantDis: '',
          sirpApplytime: '',
          sirpConfirmer: '',
          sirpConfirmerDis: '',
          sirpSbperson: '',
          sirpSbpersonDis: '',
          sirpSbtime: '',
          sirpSberror: '',
          sirpConfirmtime: '',
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
          sirpStatus: '',
          sirpCompanyDis: '',
          sirpDeptDis: '',
          sirpIdtypeDis: '',
          sirpEmptypeDis: '',
          sirpBenefitlocationDis: '',
          sirpBenefitpolicyDis: '',
          sirpStatusDis: '',
        },
        benefitacctype: [],
        yesno: [],
        showPhone: true,
        openPick: false,
        openPickEmp: false,
        openPickCity: false,
        openPickOrgframe: false,
        openPickPolicy: false,
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
    },
    components: {
    },
    methods: {
      getdata() {
        const t = this
        const params = {
          _mt: 'sihfRepay.getById',
          id: t.$store.state.repayResult.mainId,
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
            this.form.sirpApplicant = res.data.content[0].sirpApplicant
            this.form.sirpApplicantDis = res.data.content[0].sirpApplicantDis
            this.form.sirpApplytime = res.data.content[0].sirpApplytime
            this.form.sirpConfirmer = res.data.content[0].sirpConfirmer
            this.form.sirpConfirmerDis = res.data.content[0].sirpConfirmerDis
            this.form.sirpSbperson = res.data.content[0].sirpSbperson
            this.form.sirpSbpersonDis = res.data.content[0].sirpSbpersonDis
            this.form.sirpSbtime = res.data.content[0].sirpSbtime
            this.form.sirpSberror = res.data.content[0].sirpSberror
            this.form.sirpConfirmtime = res.data.content[0].sirpConfirmtime
            this.form.sirpConfirmrecord = res.data.content[0].sirpConfirmrecord
            this.form.sirpStatus = res.data.content[0].sirpStatus
            this.form.sirpStatusDis = res.data.content[0].sirpStatusDis
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
        if (t.$store.state.repayResult.mainId) {
          data.id = t.$store.state.repayResult.mainId
        }
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
                t.$store.commit('repayResult/setMainId', res.data.content[0].id)
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
        this.form.sirpConfirmrecord = ''
        this.form.sirpApplicant = ''
        this.form.sirpApplicantDis = ''
        this.form.sirpApplytime = ''
        this.form.sirpConfirmer = ''
        this.form.sirpConfirmerDis = ''
        this.form.sirpSbperson = ''
        this.form.sirpSbpersonDis = ''
        this.form.sirpSbtime = ''
        this.form.sirpSberror = ''
        this.form.sirpConfirmtime = ''
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
        this.form.sirpStatusDis = ''
        this.$store.commit('repayResult/setMainId', '')
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
