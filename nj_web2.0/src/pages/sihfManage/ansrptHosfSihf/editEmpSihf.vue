<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right"  ref="form" :label-width="120">
        <i-col span="11">
          <FormItem :label="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntEmpid')" >
            <Input v-model="form.empbntEmpid" disabled :placeholder="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntEmpid')" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntHirecompany')" >
            <Input v-model="form.empbntHirecompany" disabled :placeholder="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntHirecompany')" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_ansrptEmpSihf.ansrptHosfSihf.empbntBenefitlocation')" >
            <Input v-model="form.empbntBenefitlocation"disabled :placeholder="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntBenefitlocation')" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1" >
          <FormItem :label="$t('lang_ansrptEmpSihf.ansrptHosfSihf.empbntBenefitpolicy')" >
            <Input v-model="form.empbntBenefitpolicy" disabled
                   :placeholder="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntBenefitpolicy')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_ansrptEmpSihf.ansrptHosfSihf.empbntBenefittype')"  >
            <Input v-model="form.empbntBenefittype" disabled
                   :placeholder="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntBenefittype')"></Input>

          </FormItem>
        </i-col>
        <i-col span="11" offset="1" >
          <FormItem :label="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntSdate')">
            <Input v-model="form.empbntSdate" disabled :placeholder="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntSdate')" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntEdate')">
            <Input v-model="form.empbntEdate" disabled :placeholder="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntEdate')" ></Input>
          </FormItem>
        </i-col>
        <i-col span="23" >
          <FormItem :label="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntComment')">
            <Input v-model="form.empbntComment" disabled type="textarea" :placeholder="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntComment')" ></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        form: {
          _mt: 'platRolecontact.addOrUpd',
          empbntEmpid: '',
          empbntHirecompany: '',
          empbntBenefitlocation: '',
          empbntBenefitpolicy: '',
          empbntBenefittype: '',
          empbntSdate: '',
          empbntEdate: '',
          empbntComment: '',
        },
        radioYesOrNo: [],
        tifymode: [],
        showPhone: true,
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    mounted() {
    },
    methods: {
      getdata() {
        const t = this
        const params = {
          _mt: 'ansrptEmpSihfHfund.getById',
          id: t.$store.state.ansrptHosfSihf.mainId,
          logType: '根据id查询',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.form.empbntEmpid = res.data.content[0].empCname
            this.form.empbntHirecompany = res.data.content[0].emphfdHirecompanyDis
            this.form.empbntBenefitlocation = res.data.content[0].emphfdHfundlocatioDis
            this.form.empbntBenefitpolicy = res.data.content[0].emphfdHfundpolicyDis
            this.form.empbntBenefittype = res.data.content[0].emphfdHfundtypeDis
            this.form.empbntSdate = res.data.content[0].emphfdSdate
            this.form.empbntEdate = res.data.content[0].emphfdEdate
            this.form.empbntComment = res.data.content[0].emphfdComment
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      clear() {
        this.form.empbntEmpid = ''
        this.form.empbntHirecompany = ''
        this.form.empbntBenefitlocation = ''
        this.form.empbntBenefitpolicy = ''
        this.form.empbntBenefittype = ''
        this.form.empbntSdate = ''
        this.form.empbntEdate = ''
        this.form.empbntComment = ''
        this.$store.commit('ansrptEmpSihf/setMainId', '')
//        this.$refs.form.resetFields()
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
