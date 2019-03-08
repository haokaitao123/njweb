<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" ref="form" :label-width="120">
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeBussource')">
            <Select v-model="form.sihfeBussource" disabled :placeholder="$t('lang_sihfPolicy.hfundend.sihfeBussourceDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Actiontype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeBusdesc')">
            <Input v-model="form.sihfeBusdesc" disabled :placeholder="$t('lang_sihfPolicy.hfundend.sihfeBusdescDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeEmpgid')">
            <Input v-model="form.sihfeEmpgid" disabled :placeholder="$t('lang_sihfPolicy.hfundend.sihfeEmpgidDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeCname')">
            <Input v-model="form.sihfeCname" disabled :placeholder="$t('lang_sihfPolicy.hfundend.sihfeCnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeEmpworkno')">
            <Input v-model="form.sihfeEmpworkno" disabled :placeholder="$t('lang_sihfPolicy.hfundend.sihfeEmpworknoDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeEmptype')">
            <Select v-model="form.sihfeEmptype" disabled  :placeholder="$t('lang_sihfPolicy.hfundend.sihfeEmptypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Emptype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeLastname')">
            <Input  v-model="form.sihfeLastname" disabled :placeholder="$t('lang_sihfPolicy.hfundend.sihfeLastnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeFirstname')">
            <Input  v-model="form.sihfeFirstname" disabled :placeholder="$t('lang_sihfPolicy.hfundend.sihfeFirstnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeIdtype')">
            <Select v-model="form.sihfeIdtype" disabled  :placeholder="$t('lang_sihfPolicy.hfundend.sihfeIdtypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Idtype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeIdno')" prop="sihfeIdno" >
            <Input  v-model="form.sihfeIdno" disabled :placeholder="$t('lang_sihfPolicy.hfundend.sihfeIdnoDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeCompany')" prop="sihfeCompany" >
            <Input  v-model="form.sihfeCompanyDis" disabled :placeholder="$t('lang_sihfPolicy.hfundend.sihfeCompanyDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeDept')" prop="sihfeDept">
            <Input  v-model="form.sihfeDeptDis" disabled :placeholder="$t('lang_sihfPolicy.hfundend.sihfeDeptDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeLastemployday')" prop="sihfeLastemployday">
            <Input v-model="form.sihfeLastemployday" disabled :placeholder="$t('lang_sihfPolicy.hfundend.sihfeLastemploydayDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23"></i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeHfundlocation')" prop="sihfeHfundlocation">
            <Input  v-model="form.sihfeHfundlocationDis" disabled :placeholder="$t('lang_sihfPolicy.hfundend.sihfeHfundlocationDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeHfundpolicy')" prop="sihfeHfundpolicy">
            <Input v-model="form.sihfeHfundpolicyDis" disabled icon="search" :readonly="true" :placeholder="$t('lang_sihfPolicy.hfundend.sihfeHfundpolicyDis')"/>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeHfundtype')" prop="sihfeHfundtype">
            <Select v-model="form.sihfeHfundtype" disabled  :placeholder="$t('lang_sihfPolicy.hfundend.sihfeHfundtypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Benefitacctype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeConfirmrecord')" prop="sihfeConfirmrecord">
            <Input v-model="form.sihfeConfirmrecord" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sihfPolicy.hfundend.sihfeConfirmrecordDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_sihfPolicy.hfundend.sihfeComment')" prop="sihfeComment">
            <Input v-model="form.sihfeComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sihfPolicy.hfundend.sihfeCommentDis')"></Input>
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
            t.$emit('getLastemployday', t.form.sihfeLastemployday)
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
        data._mt = 'sihfHfundend.addOrUpd'
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

