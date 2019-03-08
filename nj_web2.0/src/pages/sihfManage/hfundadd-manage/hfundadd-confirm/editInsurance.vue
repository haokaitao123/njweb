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
            <FormItem :label="$t('lang_sihfPolicy.hfundaddInsurance.sihfainsInsurance')" prop="sihfainsInsurance">
              <Select v-model="form.sihfainsInsurance" disabled :placeholder="$t('lang_sihfPolicy.hfundaddInsurance.sihfainsInsuranceDis')" >
                <Option :value="item.id" v-for="(item,index) in selectPcyinsIns" :key="index">{{item.sscName}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfPolicy.hfundaddInsurance.sihfainsBaseamt')" prop="sihfainsBaseamt">
              <Input v-model="form.sihfainsBaseamt" disabled :placeholder="$t('lang_sihfPolicy.hfundaddInsurance.sihfainsBaseamtDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
           <FormItem :label="$t('lang_sihfPolicy.hfundaddInsurance.sihfainsCompratio')" prop="sihfainsCompratio">
            <Input v-model="form.sihfainsCompratio" disabled :placeholder="$t('lang_sihfPolicy.hfundaddInsurance.sihfainsCompratioDis')"></Input>
           </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfPolicy.hfundaddInsurance.sihfainsCompamt')" prop="sihfainsCompamt">
              <Input v-model="form.sihfainsCompamt" disabled :placeholder="$t('lang_sihfPolicy.hfundaddInsurance.sihfainsCompamtDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfPolicy.hfundaddInsurance.sihfainsPersratio')" prop="sihfainsPersratio">
              <Input v-model="form.sihfainsPersratio" disabled :placeholder="$t('lang_sihfPolicy.hfundaddInsurance.sihfainsPersratioDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1" >
            <FormItem :label="$t('lang_sihfPolicy.hfundaddInsurance.sihfainsPersamt')" prop="sihfainsPersamt">
              <Input v-model="form.sihfainsPersamt" disabled :placeholder="$t('lang_sihfPolicy.hfundaddInsurance.sihfainsPersamtDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfPolicy.hfundaddInsurance.sihfaEntrydate')">
              <Input v-model="sihfaEntrydate" disabled :placeholder="$t('lang_sihfPolicy.hfundaddInsurance.sihfaEntrydateDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfPolicy.hfundaddInsurance.sihfainsApplymonth')" prop="sihfainsApplymonth">
              <Input v-model="form.sihfainsApplymonth" disabled :placeholder="$t('lang_sihfPolicy.hfundaddInsurance.sihfainsApplymonthDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_sihfPolicy.hfundaddInsurance.sihfainsComment')" prop="sihfainsComment">
              <Input v-model="form.sihfainsComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sihfPolicy.hfundaddInsurance.sihfainsCommentDis')"></Input>
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
      sihfaEntrydate: String,
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
          _mt: 'sihfHfundaddInsurance.getById',
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
        params._mt = 'sihfHfundaddInsurance.addOrUpd'
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
        t.sihfaEntrydate = ''
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
