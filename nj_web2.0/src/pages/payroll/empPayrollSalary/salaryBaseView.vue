<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" :label-width="100">
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.salaryBase.companyDis')">
            <Input v-model="form.companyDis" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.salaryBase.deptDis')">
            <Input v-model="form.deptDis" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.salaryBase.gidDis')">
            <Input v-model="form.gidDis" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.salaryBase.worknoDis')">
            <Input v-model="form.worknoDis" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.salaryBase.cnameDis')">
            <Input v-model="form.cnameDis" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.salaryBase.postDis')">
            <Input v-model="form.postDis" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.salaryBase.empTypeDis')">
            <Input v-model="form.empTypeDis" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.salaryBase.costCenterDis')">
            <Input v-model="form.costCenterDis" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.salaryBase.empsalbsPostlevelDis')">
            <Input v-model="form.empsalbsPostlevelDis" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.salaryBase.empsalbsSalarylevelDis')">
            <Input v-model="form.empsalbsSalarylevelDis" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.salaryBase.empsalbsTravellevelDis')">
            <Input v-model="form.empsalbsTravellevelDis" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.salaryBase.empsalbsAdminlevelDis')">
            <Input v-model="form.empsalbsAdminlevelDis" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.salaryBase.empsalbsSalarysetDis')">
            <Input v-model="form.empsalbsSalarysetDis" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.salaryBase.empsalbsTaxlocationDis')">
            <Input v-model="form.empsalbsTaxlocationDis" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.salaryBase.empsalbsSalarycurrencyDis')">
            <Input v-model="form.empsalbsSalarycurrencyDis" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.salaryBase.empsalbsSdate')">
            <Input v-model="form.empsalbsSdate" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.salaryBase.empsalbsEdate')">
            <Input v-model="form.empsalbsEdate" disabled ></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
        <FormItem :label="$t('lang_payroll.salaryBase.empsalbsComment')" prop="empsalbsComment">
          <Input v-model="form.empsalbsComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" disabled></Input>
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
        form: { },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    methods: {
      getdata(params) {
        const t = this
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.form = res.data.content[0]
            t.$emit('getid', res.data.content[0].empsalbsEmpid)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      clear() {
        this.form = { }
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
