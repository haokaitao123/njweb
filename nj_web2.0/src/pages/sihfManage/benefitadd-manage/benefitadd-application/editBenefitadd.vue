<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="120">
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaBussource')">
            <Select v-model="form.sibaBussource" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaBussourceDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Actiontype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaBusdesc')">
            <Input v-model="form.sibaBusdesc" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaBusdescDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaEmpgid')">
            <Input v-model="form.sibaEmpgid" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaEmpgidDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaCname')">
            <Input v-model="form.sibaCname" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaCnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaEmpworkno')">
            <Input v-model="form.sibaEmpworkno" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaEmpworknoDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaEmptype')">
            <Select v-model="form.sibaEmptype" disabled  :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaEmptypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Emptype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaLastname')">
            <Input  v-model="form.sibaLastname" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaLastnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaFirstname')">
            <Input  v-model="form.sibaFirstname" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaFirstnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaIdtype')">
            <Select v-model="form.sibaIdtype" disabled  :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaIdtypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Idtype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaIdno')" prop="sibaIdno" >
            <Input  v-model="form.sibaIdno" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaIdnoDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaCompany')" prop="sibaCompany" >
            <Input  v-model="form.sibaCompanyDis" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaCompanyDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaDept')" prop="sibaDept">
            <Input  v-model="form.sibaDeptDis" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaDeptDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaEntrydate')" prop="sibaEntrydate">
            <Input v-model="form.sibaEntrydate" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaEntrydateDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23"></i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaBenefitlocation')" prop="sibaBenefitlocation">
            <Input  v-model="form.sibaBenefitlocationDis" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaBenefitlocationDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaBenefitpolicy')" prop="sibaBenefitpolicy">
             <span @dblclick="clearPolicy">
               <Input v-model="form.sibaBenefitpolicyDis" icon="search" :readonly="true"  :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaBenefitpolicyDis')"  @on-click="pickPolicy"/>
             </span>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaBenefittype')" prop="sibaBenefittype">
            <Select v-model="form.sibaBenefittype"   :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaBenefittypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Benefitacctype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaConfirmrecord')" prop="sibaConfirmrecord">
            <Input v-model="form.sibaConfirmrecord" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaConfirmrecordDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaComment')" prop="sibaComment">
            <Input v-model="form.sibaComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaCommentDis')"></Input>
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
        openPolicy: false,
        form: {},
        ruleValidate: {
          sibaBenefitpolicy: [
            { required: true, message: this.$t('lang_sihfPolicy.sihfBenefitadd.sibaBenefitpolicyDis'), trigger: 'change' },
          ],
          sibaBenefittype: [
            { required: true, message: this.$t('lang_sihfPolicy.sihfBenefitadd.sibaBenefittypeDis'), trigger: 'change' },
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
            t.$emit('getParams', t.form.sibaEntrydate, t.form.sibaBenefitpolicy)
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
        t.title = this.$t('lang_sihfPolicy.sihfBenefitadd.sibaBenefitpolicy')
        t.$refs.searcSihfPolicy.getData('01social', t.form.sibaBenefitlocation)
        t.openPolicy = true
      },
      inputPolicy(name, id) {
        const t = this
        t.form.sibaBenefitpolicyDis = name
        t.form.sibaBenefitpolicy = id
      },
      clearPolicy() {
        const t = this
        t.form.sibaBenefitpolicyDis = ''
        t.form.sibaBenefitpolicy = ''
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
        data._mt = 'sihfBenefitadd.addOrUpd'
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
                  t.$emit('getParams', t.form.sibaEntrydate, t.form.sibaBenefitpolicy)
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

