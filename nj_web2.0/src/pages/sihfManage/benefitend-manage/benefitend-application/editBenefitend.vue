<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" ref="form" :label-width="100">
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeBussource')">
            <Select v-model="form.sibeBussource" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeBussourceDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Actiontype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeBusdesc')">
            <Input v-model="form.sibeBusdesc" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeBusdescDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeEmpgid')">
            <Input v-model="form.sibeEmpgid" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeEmpgidDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeEmpworkno')">
            <Input v-model="form.sibeEmpworkno" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeEmpworknoDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeCname')">
            <Input v-model="form.sibeCname" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeCnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeEmptype')">
            <Select v-model="form.sibeEmptype" disabled  :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeEmptypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Emptype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeLastname')">
            <Input  v-model="form.sibeLastname" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeLastnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeFirstname')">
            <Input  v-model="form.sibeFirstname" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeFirstnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeIdtype')">
            <Select v-model="form.sibeIdtype" disabled  :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeIdtypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Idtype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeIdno')" prop="sibeIdno" >
            <Input  v-model="form.sibeIdno" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeIdnoDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeCompany')" prop="sibeCompany" >
            <Input  v-model="form.sibeCompanyDis" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeCompanyDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeDept')" prop="sibeDept">
            <Input  v-model="form.sibeDeptDis" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeDeptDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeLastemployday')" prop="sibeLastemployday">
            <Input v-model="form.sibeLastemployday" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeLastemploydayDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23"></i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeBenefitlocation')" prop="sibeBenefitlocation">
            <Input  v-model="form.sibeBenefitlocationDis" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeBenefitlocationDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeBenefitpolicy')" prop="sibeBenefitpolicy">
            <Input v-model="form.sibeBenefitpolicyDis" disabled icon="search" :readonly="true" :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeBenefitpolicyDis')"/>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeBenefittype')" prop="sibeBenefittype">
            <Select v-model="form.sibeBenefittype" disabled  :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeBenefittypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Benefitacctype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeConfirmrecord')" prop="sibeConfirmrecord">
            <Input v-model="form.sibeConfirmrecord" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeConfirmrecordDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeComment')" prop="sibeComment">
            <Input v-model="form.sibeComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeCommentDis')"></Input>
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
        Emptype: [],
        Idtype: [],
        Benefitacctype: [],
        openPolicy: false,
        form: {},
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
    },
    methods: {
      getdata(params) {
        const t = this
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form = res.data.content[0]
            t.$emit('getLastemployday', t.form.sibeLastemployday)
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
          typeCode: 'actiontype,emptype,idtype,benefitacctype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Actiontype = res.data.content[0].value[0].paramList
            t.Emptype = res.data.content[0].value[1].paramList
            t.Idtype = res.data.content[0].value[2].paramList
            t.Benefitacctype = res.data.content[0].value[3].paramList
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
        data._mt = 'sihfBenefitend.addOrUpd'
        data.funId = '1'
        data.logType = t.logType
        data.id = t.id
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

