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
        <Form :model="form" label-position="right"  ref="form" :label-width="120">
          <i-col span="11">
            <FormItem :label="$t('lang_sihfPolicy.benefitendInsurance.sibeinsInsurance')">
              <Select v-model="form.sibeinsInsurance" disabled :placeholder="$t('lang_sihfPolicy.benefitendInsurance.sibeinsInsuranceDis')" >
                <Option :value="item.id" v-for="(item,index) in selectPcyinsIns" :key="index">{{item.sscName}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfPolicy.benefitendInsurance.sibeinsBaseamt')" prop="sibeinsBaseamt">
              <Input v-model="form.sibeinsBaseamt" disabled :placeholder="$t('lang_sihfPolicy.benefitendInsurance.sibeinsBaseamtDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfPolicy.benefitendInsurance.sibeinsCompratio')" prop="sibeinsCompratio">
              <Input v-model="form.sibeinsCompratio" disabled :placeholder="$t('lang_sihfPolicy.benefitendInsurance.sibeinsCompratioDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfPolicy.benefitendInsurance.sibeinsCompamt')" prop="sibeinsCompamt">
              <Input v-model="form.sibeinsCompamt" disabled :placeholder="$t('lang_sihfPolicy.benefitendInsurance.sibeinsCompamtDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfPolicy.benefitendInsurance.sibeinsPersratio')" prop="sibeinsPersratio">
              <Input v-model="form.sibeinsPersratio" disabled :placeholder="$t('lang_sihfPolicy.benefitendInsurance.sibeinsPersratioDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1" >
            <FormItem :label="$t('lang_sihfPolicy.benefitendInsurance.sibeinsPersamt')" prop="sibeinsPersamt">
              <Input v-model="form.sibeinsPersamt" disabled :placeholder="$t('lang_sihfPolicy.benefitendInsurance.sibeinsPersamtDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfPolicy.sihfBenefitend.sibeLastemployday')">
              <Input v-model="sibeLastemployday" disabled :placeholder="$t('lang_sihfPolicy.sihfBenefitend.sibeLastemploydayDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfPolicy.benefitendInsurance.sibeinsApplymonth')" prop="sibeinsApplymonth">
              <Input v-model="form.sibeinsApplymonth" disabled :placeholder="$t('lang_sihfPolicy.benefitendInsurance.sibeinsApplymonthDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" v-show="sibeStatus === '30success'? true:false">
            <FormItem :label="$t('lang_sihfPolicy.benefitendInsurance.sibeinsSuccmonth')" prop="sibeinsSuccmonth">
              <Input v-model="form.sibeinsSuccmonth" disabled :placeholder="$t('lang_sihfPolicy.benefitendInsurance.sibeinsSuccmonthDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_sihfPolicy.benefitendInsurance.sibeinsComment')" prop="sibeinsComment">
              <Input v-model="form.sibeinsComment" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sihfPolicy.benefitendInsurance.sibeinsCommentDis')"></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  export default {
    data() {
      return {
        openPick: false,
        form: {},
        rowId: '',
      }
    },
    props: {
      id: Number,
      logType: String,
      sibeLastemployday: String,
      sibeStatus: String,
      selectPcyinsIns: Array,
    },
    components: {
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
          _mt: 'sihfBenefitendInsurance.getById',
          id: rowId,
          funId: '1',
          logType: '根据id查询险种明细信息',
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
      save() {
        const t = this
        const params = deepCopy(t.form)
        params._mt = 'sihfBenefitendInsurance.addOrUpd'
        params.funId = '1'
        params.logType = '修改'
        params.id = t.rowId
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(params).then((res) => {
              if (isSuccess(res, t)) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('getData', res.data.content[0])
                  t.close()
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
      cancel() {
        this.close()
      },
      clear() {
        const t = this
        t.form = {}
        t.$refs.form.resetFields()
      },
      close() {
        this.rowId = ''
        this.$emit('hideMsg')
        this.clear()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd";
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
