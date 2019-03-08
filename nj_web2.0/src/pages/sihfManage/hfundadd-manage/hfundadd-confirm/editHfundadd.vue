<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate"  ref="form" :label-width="120">
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaBussource')">
            <Select v-model="form.sihfaBussource" disabled :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaBussourceDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Actiontype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaBusdesc')">
            <Input v-model="form.sihfaBusdesc" disabled :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaBusdescDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaEmpgid')">
            <Input v-model="form.sihfaEmpgid" disabled :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaEmpgidDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaCname')">
            <Input v-model="form.sihfaCname" disabled :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaCnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaEmpworkno')">
            <Input v-model="form.sihfaEmpworkno" disabled :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaEmpworknoDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaEmptype')">
            <Select v-model="form.sihfaEmptype" disabled  :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaEmptypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Emptype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaLastname')">
            <Input  v-model="form.sihfaLastname" disabled :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaLastnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaFirstname')">
            <Input  v-model="form.sihfaFirstname" disabled :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaFirstnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaIdtype')">
            <Select v-model="form.sihfaIdtype" disabled  :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaIdtypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Idtype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaIdno')" prop="sihfaIdno" >
            <Input  v-model="form.sihfaIdno" disabled :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaIdnoDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaCompany')" prop="sihfaCompany" >
            <Input  v-model="form.sihfaCompanyDis" disabled :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaCompanyDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaDept')" prop="sihfaDept">
            <Input  v-model="form.sihfaDeptDis" disabled :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaDeptDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaEntrydate')" prop="sihfaEntrydate">
            <Input v-model="form.sihfaEntrydate" disabled :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaEntrydateDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23"></i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaHfundlocation')" prop="sihfaHfundlocation">
            <Input v-model="form.sihfaHfundlocationDis" disabled :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaHfundlocationDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaHfundpolicy')" prop="sihfaHfundpolicy">
             <span>
               <Input v-model="form.sihfaHfundpolicyDis"  icon="search" disabled :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaHfundpolicyDis')"/>
             </span>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaHfundttype')" prop="sihfaHfundttype">
            <Select v-model="form.sihfaHfundttype" disabled  :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaHfundttypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Benefitacctype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaStatus')" prop="sihfaStatus">
            <Input  v-model="form.sihfaStatusDis" disabled :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaStatusDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaApplicant')" prop="sihfaApplicant">
            <Input v-model="form.sihfaApplicantDis" disabled :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaApplicantDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaApplytime')" prop="sihfaApplytime">
            <Input v-model="form.sihfaApplytime" disabled :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaApplytimeDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaIsconfirm')" prop="sihfaIsconfirm" >
            <RadioGroup v-model="form.sihfaIsconfirm"  >
              <Radio :label="item.paramCode" v-for="(item,index) in YesOrNoType" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
        <i-col span="23" v-show="form.sihfaIsconfirm === '0'? true:false">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaNocmreason')" prop="sihfaNocmreason">
            <Input v-model="form.sihfaNocmreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaNocmreasonDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_sihfPolicy.hfundadd.sihfaComment')" prop="sihfaComment">
            <Input v-model="form.sihfaComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sihfPolicy.hfundadd.sihfaCommentDis')"></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
    <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    <transition name="fade">
      <searcSihfPolicy v-show="openPolicy" :title="title" @closeUp="closePolicy" @changeinput="inputPolicy" ref="searcSihfPolicy"></searcSihfPolicy>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'
  import searcSihfPolicy from '../../../../components/searchTable/searcSihfPolicy'

  export default {
    data() {
      return {
        title: '',
        Actiontype: [],
        Emptype: [],
        Idtype: [],
        Benefitacctype: [],
        YesOrNoType: [],
        openPolicy: false,
        form: {},
        ruleValidate: {
          sihfaIsconfirm: [
            { required: true, message: this.$t('lang_sihfPolicy.hfundadd.sihfaIsconfirmDis'), trigger: 'blur' },
          ],
          sihfaNocmreason: [
            { required: true, message: this.$t('lang_sihfPolicy.hfundadd.sihfaNocmreasonDis'), trigger: 'blur' },
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
      searcSihfPolicy,
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
            t.$emit('getEntryDate', t.form.sihfaEntrydate)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      pickPolicy() {
        const t = this
        t.title = this.$t('lang_sihfPolicy.hfundadd.sihfaHfundpolicy')
        t.$refs.searcSihfPolicy.getData('02hfund', t.form.sihfaHfundlocation)
        t.openPolicy = true
      },
      inputPolicy(name, id) {
        const t = this
        t.form.sihfaHfundpolicyDis = name
        t.form.sihfaHfundpolicy = id
      },
      clearPolicy() {
        const t = this
        t.form.sihfaHfundpolicyDis = ''
        t.form.sihfaHfundpolicy = ''
      },
      closePolicy() {
        const t = this
        t.openPolicy = false
        t.$refs.searcSihfPolicy.sihfpcyCn = ''
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'actiontype,emptype,idtype,benefitacctype,yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Actiontype = res.data.content[0].value[0].paramList
            t.Emptype = res.data.content[0].value[1].paramList
            t.Idtype = res.data.content[0].value[2].paramList
            t.Benefitacctype = res.data.content[0].value[3].paramList
            t.YesOrNoType = res.data.content[0].value[4].paramList
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
        data._mt = 'sihfHfundadd.addOrUpd'
        data.funId = '1'
        data.logType = t.logType
        data.id = t.id
        if (this.form.sihfaIsconfirm === '1') {
          delete this.ruleValidate.sihfaNocmreason
        } else {
          this.ruleValidate.sihfaNocmreason = [
            { required: true, message: this.$t('lang_sihfPolicy.hfundadd.sihfaNocmreasonDis'), trigger: 'blur' },
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
                  t.$emit('getParams', t.form.sihfaEntrydate, t.form.sihfaHfundpolicy)
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

