<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row>
        <Form :model="form" label-position="right" :label-width="100">
          <i-col span="11">
            <FormItem :label="$t('lang_payroll.salaryBase.empsaltmTypeDis')">
              <Input v-model="form.empsaltmTypeDis" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_payroll.salaryBase.empsaltmItemDis')">
              <Input v-model="form.empsaltmItemDis" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_payroll.salaryBase.empsaltmCurrencyDis')">
              <Input v-model="form.empsaltmCurrencyDis" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_payroll.salaryBase.empsaltmAmount')">
              <Input v-model="form.empsaltmAmount" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_payroll.salaryBase.empsaltmSdate')">
              <Input v-model="form.empsaltmSdate" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_payroll.salaryBase.empsaltmEdate')">
              <Input v-model="form.empsaltmEdate" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_payroll.salaryBase.empsaltmComment')" prop="empsaltmComment">
              <Input v-model="form.empsaltmComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" disabled></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        form: { },
        rowId: '',
      }
    },
    props: {
      id: Number,
      logType: String,
    },
    methods: {
      setRowId(id) {
        const t = this
        t.rowId = id
        t.getdata(id)
      },
      getdata(rowId) {
        const t = this
        const params = {
          _mt: 'empPayrollSalaryItem.getById',
          id: rowId,
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form = res.data.content[0]
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
        t.form = { }
      },
      close() {
        this.$emit('hideMsg')
        this.clear()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
