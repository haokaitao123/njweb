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
            <FormItem :label="$t('lang_sihfPolicy.benefitaddInsurance.sibainsInsurance')" prop="sibainsInsurance">
              <Select v-model="form.sibainsInsurance" disabled :placeholder="$t('lang_sihfPolicy.benefitaddInsurance.sibainsInsuranceDis')" >
                <Option :value="item.id" v-for="(item,index) in selectPcyinsIns" :key="index">{{item.sscName}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfPolicy.benefitaddInsurance.sibainsBaseamt')" prop="sibainsBaseamt">
              <Input v-model="form.sibainsBaseamt" disabled :placeholder="$t('lang_sihfPolicy.benefitaddInsurance.sibainsBaseamtDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
           <FormItem :label="$t('lang_sihfPolicy.benefitaddInsurance.sibainsCompratio')" prop="sibainsCompratio">
            <Input v-model="form.sibainsCompratio" disabled :placeholder="$t('lang_sihfPolicy.benefitaddInsurance.sibainsCompratioDis')"></Input>
           </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfPolicy.benefitaddInsurance.sibainsCompamt')" prop="sibainsCompamt">
              <Input v-model="form.sibainsCompamt" disabled :placeholder="$t('lang_sihfPolicy.benefitaddInsurance.sibainsCompamtDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfPolicy.benefitaddInsurance.sibainsPersratio')" prop="sibainsPersratio">
              <Input v-model="form.sibainsPersratio" disabled :placeholder="$t('lang_sihfPolicy.benefitaddInsurance.sibainsPersratioDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1" >
            <FormItem :label="$t('lang_sihfPolicy.benefitaddInsurance.sibainsPersamt')" prop="sibainsPersamt">
              <Input v-model="form.sibainsPersamt" disabled :placeholder="$t('lang_sihfPolicy.benefitaddInsurance.sibainsPersamtDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfPolicy.benefitaddInsurance.sibaEntrydate')" prop="sibaEntrydate">
              <Input v-model="sibaEntrydate" disabled :placeholder="$t('lang_sihfPolicy.benefitaddInsurance.sibaEntrydateDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfPolicy.benefitaddInsurance.sibainsApplymonth')" prop="sibainsApplymonth">
              <Input v-model="form.sibainsApplymonth" disabled :placeholder="$t('lang_sihfPolicy.benefitaddInsurance.sibainsApplymonthDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_sihfPolicy.benefitaddInsurance.sibainsComment')" prop="sibainsComment">
              <Input v-model="form.sibainsComment" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sihfPolicy.benefitaddInsurance.sibainsCommentDis')"></Input>
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
      sibaEntrydate: String,
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
          _mt: 'sihfBenefitaddInsurance.getById',
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
        params._mt = 'sihfBenefitaddInsurance.addOrUpd'
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
        t.sibaEntrydate = ''
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
