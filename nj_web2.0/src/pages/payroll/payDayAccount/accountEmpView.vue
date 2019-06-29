<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="option-main">
        <Row style="max-height: 400px;overflow-y: auto;">
          <Form ref="form" :model="form" :label-width="135">
            <i-col span="10">
              <FormItem :label="$t('lang_payroll.payAccEmp.pacemCompany')" prop="pacemCompany">
                <Input v-model="form.pacemCompanyDis" disabled :placeholder="$t('lang_payroll.payAccEmp.pacemCompanyDis')"/>
              </FormItem>
            </i-col>
            <i-col span="10" offset="1">
              <FormItem :label="$t('lang_payroll.payAccEmp.pacemDept')" prop="pacemDept">
                <Input v-model="form.pacemDeptDis" disabled :placeholder="$t('lang_payroll.payAccEmp.pacemDeptDis')"/>
              </FormItem>
            </i-col>
            <i-col span="10">
              <FormItem :label="$t('lang_payroll.payAccEmp.pacemEmpworkno')" prop="pacemEmpworkno">
                <Input v-model="form.pacemEmpworkno" disabled :placeholder="$t('lang_payroll.payAccEmp.pacemEmpworknoDis')"/>
              </FormItem>
            </i-col>
            <i-col span="10" offset="1">
              <FormItem :label="$t('lang_payroll.payAccEmp.pacemEmpgid')" prop="pacemEmpgid">
                <Input v-model="form.pacemEmpgid" disabled :placeholder="$t('lang_payroll.payAccEmp.pacemEmpgidDis')"/>
              </FormItem>
            </i-col>
            <i-col span="10">
              <FormItem :label="$t('lang_payroll.payAccEmp.pacemCname')" prop="pacemCname">
                <Input v-model="form.pacemCname" disabled :placeholder="$t('lang_payroll.payAccEmp.pacemCnameDis')"/>
              </FormItem>
            </i-col>
            <i-col span="15"></i-col>
            <i-col span="10">
              <FormItem :label="$t('lang_payroll.payAccEmp.pacemIdtype')" prop="pacemIdtype">
                <Input v-model="form.pacemIdtypeDis" disabled :placeholder="$t('lang_payroll.payAccEmp.pacemIdtypeDis')"/>
              </FormItem>
            </i-col>
            <i-col span="10" offset="1">
              <FormItem :label="$t('lang_payroll.payAccEmp.pacemIdno')" prop="pacemIdno">
                <Input v-model="form.pacemIdno" disabled :placeholder="$t('lang_payroll.payAccEmp.pacemIdnoDis')"/>
              </FormItem>
            </i-col>
            <i-col span="10">
              <FormItem :label="$t('lang_payroll.payAccEmp.pacemBank')" prop="pacemBank">
                <Input v-model="form.pacemBankDis" disabled :placeholder="$t('lang_payroll.payAccEmp.pacemBankDis')"/>
              </FormItem>
            </i-col>
            <i-col span="10" offset="1">
              <FormItem :label="$t('lang_payroll.payAccEmp.pacemAccount')" prop="pacemAccount">
                <Input v-model="form.pacemAccount" disabled :placeholder="$t('lang_payroll.payAccEmp.pacemAccountDis')"/>
              </FormItem>
            </i-col>
            <i-col span="10">
              <FormItem :label="$t('lang_payroll.payAccEmp.pacemMse')" prop="pacemMse">
                <Input v-model="form.pacemMse" disabled :placeholder="$t('lang_payroll.payAccEmp.pacemMseDis')"/>
              </FormItem>
            </i-col>
            <i-col span="10" offset="1">
              <FormItem :label="$t('lang_payroll.payAccEmp.pacemJsgz')" prop="pacemJsgz">
                <Input v-model="form.pacemJsgz" disabled :placeholder="$t('lang_payroll.payAccEmp.pacemJsgzDis')"/>
              </FormItem>
            </i-col>
            <i-col span="10">
              <FormItem :label="$t('lang_payroll.payAccEmp.pacemYfgz')" prop="pacemYfgz">
                <Input v-model="form.pacemYfgz" disabled :placeholder="$t('lang_payroll.payAccEmp.pacemYfgzDis')"/>
              </FormItem>
            </i-col>
            <i-col span="10" offset="1">
              <FormItem :label="$t('lang_payroll.payAccEmp.pacemSfgz')" prop="pacemSfgz">
                <Input v-model="form.pacemSfgz" disabled :placeholder="$t('lang_payroll.payAccEmp.pacemSfgzDis')"/>
              </FormItem>
            </i-col>
            <i-col span="21">
              <FormItem :label="$t('lang_payroll.payAccEmp.pacemComment')" prop="pacemComment">
                <Input v-model="form.pacemComment" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payAccEmp.pacemCommentDis')"></Input>
              </FormItem>
            </i-col>
          </Form>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        form: {},
      }
    },
    components: {
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    mounted() {
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'payAccountEmp.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form = res.data.content[0]
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset() {
        const t = this
        t.form = {}
        t.$refs.form.resetFields()
        t.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  .option-main{
    position: relative;
    height: 450px;
    .btn{
      position: absolute;
      bottom: 20px;
      right: 105px;
    }
    .btn1{
      position: absolute;
      bottom: 20px;
      right: 170px;
    }
  }
</style>
