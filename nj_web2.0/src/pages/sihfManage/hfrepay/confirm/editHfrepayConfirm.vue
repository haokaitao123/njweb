<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="140">
        <i-col span="11">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpCompany')">
              <Input  icon="search" disabled :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpCompanyPrompt')"
                     v-model="form.sihfrpCompanyDis"/>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpDept')">
              <Input icon="search" disabled :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpDeptPrompt')"
                     v-model="form.sihfrpDeptDis"/>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpEmpworkno')">
              <Input icon="search" disabled  :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpEmpworknoPrompt')"
                     v-model="form.sihfrpEmpworkno"/>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpEmptype')">
            <Input v-model="form.sihfrpEmptypeDis" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpEmpgid')">
            <Input v-model="form.sihfrpEmpgid" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpCname')">
            <Input v-model="form.sihfrpCname" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpLastname')">
            <Input v-model="form.sihfrpLastname" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpFirstname')">
            <Input v-model="form.sihfrpFirstname" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpIdtype')">
            <Input v-model="form.sihfrpIdtypeDis" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpIdno')">
            <Input v-model="form.sihfrpIdno" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpBenefitlocation')" prop="sihfrpBenefitlocation">
              <Input icon="search" disabled  :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpBenefitlocationPrompt')"
                     v-model="form.sihfrpBenefitlocationDis"/>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpBenefitpolicy')"  prop="sihfrpBenefitpolicy">
              <Input icon="search" disabled  :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpBenefitpolicyPrompt')"
                     v-model="form.sihfrpBenefitpolicyDis"/>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpBenefittype')"  prop="sihfrpBenefittype">
            <Select v-model="form.sihfrpBenefittype" disabled
                    :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpBenefittype')" :transfer="true">
              <Option :value="item.paramCode" v-for="(item,index) in benefitacctype" :key="index">
                {{item.paramInfoName}}
              </Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1" >
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpBaseamt')" prop="sihfrpBaseamt">
            <Input v-model="form.sihfrpBaseamt" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="23" ></i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpSmonth')"  prop="sihfrpSmonth">
            <Input :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpSmonth')" disabled  v-model="form.sihfrpSmonth" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpEmonth')"  prop="sihfrpEmonth">
            <Input :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpEmonth')" disabled  v-model="form.sihfrpEmonth" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpPaymonth')"  prop="sihfrpPaymonth">
            <Input :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpPaymonth')" disabled  v-model="form.sihfrpPaymonth" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpStatus')">
            <Input v-model="form.sihfrpStatusDis" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpReason')" prop="sihfrpReason">
            <Input v-model="form.sihfrpReason" :autosize="{minRows: 2,maxRows: 5}" disabled type="textarea"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpApplicant')" >
            <Input v-model="form.sihfrpApplicantDis" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpApplytime')">
            <Input v-model="form.sihfrpApplytime" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpIsconfirm')" prop="sihfrpIsconfirm" >
            <RadioGroup v-model="form.sihfrpIsconfirm" >
              <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
        <i-col span="23" v-show="form.sihfrpIsconfirm === '0'? true:false">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpNocmreason')" prop="sihfrpNocmreason">
            <Input v-model="form.sihfrpNocmreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpNocmreasonPrompt')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpComment')">
            <Input v-model="form.sihfrpComment" :autosize="{minRows: 2,maxRows: 5}"  disabled type="textarea"></Input>
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
  import valid from '../../../../lib/pub_valid'

  export default {
    data() {
      const sirpBaseamtcheck = (rule, value, caaaaa) => {
        if (valid.val_number105(value)) {
          return caaaaa()
        }
        return caaaaa(new Error(rule.message))
      }
      return {
        form: {
          _mt: 'sihfHfrepay.addOrUpd',
          sihfrpCompany: '',
          sihfrpDept: '',
          sihfrpEmpworkno: '',
          sihfrpEmpgid: '',
          sihfrpCname: '',
          sihfrpLastname: '',
          sihfrpFirstname: '',
          sihfrpIdtype: '',
          sihfrpIdno: '',
          sihfrpEmptype: '',
          sihfrpBenefitlocation: '',
          sihfrpBenefitpolicy: '',
          sihfrpBenefittype: '',
          sihfrpSmonth: '',
          sihfrpEmonth: '',
          sihfrpPaymonth: '',
          sihfrpBaseamt: '',
          sihfrpReason: '',
          sihfrpStatus: '',
          sihfrpComment: '',
          sihfrpCompanyDis: '',
          sihfrpDeptDis: '',
          sihfrpIdtypeDis: '',
          sihfrpEmptypeDis: '',
          sihfrpBenefitlocationDis: '',
          sihfrpBenefitpolicyDis: '',
          sihfrpStatusDis: '',
          sihfrpApplytime: '',
          sihfrpApplicantDis: '',
          sihfrpApplicant: '',
          sihfrpIsconfirm: '0',
          sihfrpNocmreason: '',
        },
        benefitacctype: [],
        yesno: [],
        ruleValidate: {
          sihfrpIsconfirm: [
            { required: true, message: this.$t('lang_hfrepay.sihfHfrepay.sihfrpBenefitlocationWarning'), trigger: 'change' },
          ],
          sihfrpNocmreason: [
            { required: true, message: this.$t('lang_hfrepay.sihfHfrepay.sihfrpBenefitlocationWarning'), trigger: 'change' },
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
          _mt: 'sihfHfrepay.getById',
          id: t.$store.state.hfrepayConfirm.mainId,
          logType: '根据id查询',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.form.sihfrpCompany = res.data.content[0].sihfrpCompany
            this.form.sihfrpDept = res.data.content[0].sihfrpDept
            this.form.sihfrpEmpworkno = res.data.content[0].sihfrpEmpworkno
            this.form.sihfrpEmpgid = res.data.content[0].sihfrpEmpgid
            this.form.sihfrpCname = res.data.content[0].sihfrpCname
            this.form.sihfrpLastname = res.data.content[0].sihfrpLastname
            this.form.sihfrpFirstname = res.data.content[0].sihfrpFirstname
            this.form.sihfrpIdtype = res.data.content[0].sihfrpIdtype
            this.form.sihfrpIdno = res.data.content[0].sihfrpIdno
            this.form.sihfrpEmptype = res.data.content[0].sihfrpEmptype
            this.form.sihfrpBenefitlocation = res.data.content[0].sihfrpBenefitlocation
            this.form.sihfrpBenefitpolicy = res.data.content[0].sihfrpBenefitpolicy
            this.form.sihfrpBenefittype = res.data.content[0].sihfrpBenefittype
            this.form.sihfrpSmonth = res.data.content[0].sihfrpSmonth
            this.form.sihfrpEmonth = res.data.content[0].sihfrpEmonth
            this.form.sihfrpPaymonth = res.data.content[0].sihfrpPaymonth
            this.form.sihfrpBaseamt = res.data.content[0].sihfrpBaseamt
            this.form.sihfrpReason = res.data.content[0].sihfrpReason
            this.form.sihfrpStatus = res.data.content[0].sihfrpStatus
            this.form.sihfrpComment = res.data.content[0].sihfrpComment
            this.form.sihfrpCompanyDis = res.data.content[0].sihfrpCompanyDis
            this.form.sihfrpDeptDis = res.data.content[0].sihfrpDeptDis
            this.form.sihfrpIdtypeDis = res.data.content[0].sihfrpIdtypeDis
            this.form.sihfrpEmptypeDis = res.data.content[0].sihfrpEmptypeDis
            this.form.sihfrpBenefitlocationDis = res.data.content[0].sihfrpBenefitlocationDis
            this.form.sihfrpBenefitpolicyDis = res.data.content[0].sihfrpBenefitpolicyDis
            this.form.sihfrpStatusDis = res.data.content[0].sihfrpStatusDis
            this.form.sihfrpApplytime = res.data.content[0].sihfrpApplytime
            this.form.sihfrpApplicantDis = res.data.content[0].sihfrpApplicantDis
            this.form.sihfrpApplicant = res.data.content[0].sihfrpApplicant
            if (res.data.content[0].sihfrpIsconfirm) {
              this.form.sihfrpIsconfirm = res.data.content[0].sihfrpIsconfirm
            } else {
              this.form.sihfrpIsconfirm = '0'
            }
            this.form.sihfrpNocmreason = res.data.content[0].sihfrpNocmreason
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
        if (t.$store.state.hfrepayConfirm.mainId) {
          data.id = t.$store.state.hfrepayConfirm.mainId
        }
        data.logType = t.logType
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        if (this.form.sihfrpIsconfirm === '1') {
          delete this.ruleValidate.sihfrpNocmreason
        } else {
          this.ruleValidate.sihfrpNocmreason = [
            { required: true, message: this.$t('lang_hfrepay.sihfHfrepay.sihfrpNocmreasonPrompt'), trigger: 'blur' },
          ]
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$store.commit('hfrepayConfirm/setMainId', res.data.content[0].id)
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
        this.form.sihfrpCompany = ''
        this.form.sihfrpDept = ''
        this.form.sihfrpEmpworkno = ''
        this.form.sihfrpEmpgid = ''
        this.form.sihfrpCname = ''
        this.form.sihfrpLastname = ''
        this.form.sihfrpFirstname = ''
        this.form.sihfrpIdtype = ''
        this.form.sihfrpIdno = ''
        this.form.sihfrpEmptype = ''
        this.form.sihfrpBenefitlocation = ''
        this.form.sihfrpBenefitpolicy = ''
        this.form.sihfrpBenefittype = ''
        this.form.sihfrpSmonth = ''
        this.form.sihfrpEmonth = ''
        this.form.sihfrpPaymonth = ''
        this.form.sihfrpBaseamt = ''
        this.form.sihfrpReason = ''
        this.form.sihfrpStatus = ''
        this.form.sihfrpComment = ''
        this.form.sihfrpCompanyDis = ''
        this.form.sihfrpDeptDis = ''
        this.form.sihfrpIdtypeDis = ''
        this.form.sihfrpEmptypeDis = ''
        this.form.sihfrpBenefitlocationDis = ''
        this.form.sihfrpBenefitpolicyDis = ''
        this.form.sihfrpStatusDis = ''
        this.form.sihfrpApplytime = ''
        this.form.sihfrpApplicantDis = ''
        this.form.sihfrpApplicant = ''
        this.form.sihfrpIsconfirm = '0'
        this.form.sihfrpNocmreason = ''
        this.$store.commit('hfrepayConfirm/setMainId', '')
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
