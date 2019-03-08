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
        <Form :model="form" ref="form" :rules="ruleValidate" label-position="right" :label-width="140">
          <i-col span="11">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsInsurance')" prop="sirpinsInsurance">
              <Input v-model="form.sirpinsInsuranceDis" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsBaseamt')" prop="sirpinsBaseamt">
              <Input v-model="form.sirpinsBaseamt" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsCompratio')" prop="sirpinsCompratio">
              <Input v-model="form.sirpinsCompratio" @on-change="checkCompratio" :disabled="this.sihfpcyinsCrtype === '01fixed' ? true:false"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsCompamt')">
              <Input v-model="form.sirpinsCompamt" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsCompsum')">
              <Input v-model="form.sirpinsCompsum" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsPersratio')" prop="sirpinsPersratio">
              <Input v-model="form.sirpinsPersratio" @on-change="checkPersratio" :disabled="this.sihfpcyinsPrtype === '01fixed' ? true:false"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsPersamt')">
              <Input v-model="form.sirpinsPersamt" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsPerssum')">
              <Input v-model="form.sirpinsPerssum" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsComment')" prop="comment">
              <Input v-model="form.sirpinsComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                     :placeholder="$t('lang_authorization.platRole.commentDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <row type="flex" justify="end">
              <FormItem label="" prop="comment">
                <Button type="ghost" @click="close" style="margin-left: 8px">{{$t('button.cal')}}</Button>
                <Button type="primary" @click="save">{{$t('button.sav')}}</Button>
              </FormItem>
            </row>
          </i-col>
        </Form>
      </Row>
    </div>
  </div>
</template>
<script>
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../../axios/axios'
  import {isSuccess, deepCopy} from '../../../../lib/util'

  export default {
    data() {
      const checkCompratio2 = (rule, value, checkCompr) => {
        if (this.checkTemp) {
          return checkCompr()
        }
        return checkCompr(new Error(rule.message))
      }
      const checkPersratio2 = (rule, value, checkPer) => {
        if (this.checkTemp2) {
          return checkPer()
        }
        return checkPer(new Error(rule.message))
      }
      return {
        platRolechildEmpidDis: '',
        openManger: false,
        checkTemp: true,
        sihfpcyinsCrtype: '',
        sihfpcyinsPrtype: '',
        checkTemp2: true,
//        logType: this.$t('lang_authorization.platRole.searchColumn.title'),
        rolecontType: [],
        plcyinsurance: [],
        form: {
          _mt: 'sihfRepay.addOrUpdChild',
          sirpinsInsurance: '',
          sirpinsBaseamt: '',
          sirpinsCompratio: '',
          sirpinsCompamt: '',
          sirpinsCompsum: '',
          sirpinsPersratio: '',
          sirpinsPersamt: '',
          sirpinsPerssum: '',
          sirpinsComment: '',
          sirpinsInsuranceDis: '',
          sirpinsRpid: '',
        },
        rowId: '',
        ruleValidate: {
          sirpinsInsurance: [
            {
              required: true,
              message: this.$t('lang_repayApply.sihfRepayInsurance.sirpinsInsurance'),
              trigger: 'change',
            },
          ],
          sirpinsBaseamt: [
            {
              required: true,
              message: this.$t('lang_repayApply.sihfRepayInsurance.sihfrpinsBaseamtChe'),
              trigger: 'change',
            },
          ],
          sirpinsCompratio: [
            {
              required: true,
              validator: checkCompratio2,
              message: this.$t('lang_repayApply.sihfRepayInsurance.sirpinsInsuranceWarning'),
              trigger: 'blur',
            },
            { required: true, message: this.$t('lang_repayApply.sihfRepayInsurance.sirpinsInsurancePp'), trigger: 'change' },
          ],
          sirpinsPersratio: [
            {
              required: true,
              validator: checkPersratio2,
              message: this.$t('lang_repayApply.sihfRepayInsurance.sirpinsInsuranceWarning'),
              trigger: 'blur',
            },
            { required: true, message: this.$t('lang_repayApply.sihfRepayInsurance.sirpinsInsurancePp'), trigger: 'change' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
    },
    components: {},
    mounted() {
    },
    methods: {
      setRowId(id) {
        const t = this
        if (id !== '') {
          t.rowId = id
          t.getdata(id)
        }
      },
      getdata(rowId) {
        const t = this
        const params = {
          _mt: 'sihfRepay.getByIdChild',
          id: rowId,
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form.sirpinsInsurance = res.data.content[0].sirpinsInsurance
            t.form.sirpinsBaseamt = res.data.content[0].sirpinsBaseamt
            t.form.sirpinsCompratio = res.data.content[0].sirpinsCompratio
            t.form.sirpinsCompamt = res.data.content[0].sirpinsCompamt
            t.form.sirpinsCompsum = res.data.content[0].sirpinsCompsum
            t.form.sirpinsPersratio = res.data.content[0].sirpinsPersratio
            t.form.sirpinsPersamt = res.data.content[0].sirpinsPersamt
            t.form.sirpinsPerssum = res.data.content[0].sirpinsPerssum
            t.form.sirpinsComment = res.data.content[0].sirpinsComment
            t.form.sirpinsInsuranceDis = res.data.content[0].sirpinsInsuranceDis
            t.getPlcyinsurance(res.data.content[0].sirpinsInsurance)
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
        t.form.empinsInsurance = ''
        t.form.empinsBaseamt = ''
        t.form.empinsCompratio = ''
        t.form.empinsCompamt = ''
        t.form.empinsPersratio = ''
        t.form.empinsPersamt = ''
        t.form.empinsSdate = ''
        t.form.empinsEdate = ''
        t.form.empinsComment = ''
        t.form.sirpinsRpid = ''
        t.checkTemp = true
        t.checkTemp2 = true
        this.$refs.form.resetFields()
      },
      getPlcyinsurance(insType) {
        // 获取社保险种信息
        const t = this
        const params = {
          _mt: 'sihfPlcyinsurance.selectBypolicy',
          sihfpcyinsPolicyid: t.$store.state.repayApply.insuranceId,
          sihfpcyinsIns: insType,
          logType: '根据险种id查询社保险种信息',
        }
        getDataLevelUserLoginNew(params).then((res) => {
          if (isSuccess(res, t)) {
            t.plcyinsurance = res.data.content[0]
            this.sihfpcyinsCrtype = res.data.content[0].sihfpcyinsCrtype
            this.sihfpcyinsPrtype = res.data.content[0].sihfpcyinsPrtype

            this.checkBaseamt()
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
        const data = deepCopy(t.form)
        if (t.$store.state.repayApply.mainId) {
          data.sirpinsRpid = t.$store.state.repayApply.mainId
          data.id = t.rowId
        }
        data.logType = '修改'
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$store.commit('repayApply/setChildId1', res.data.content[0].id)
                t.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: this.$t('reminder.updsuccess'),
                })
                t.close()
              }
            }).catch(() => {
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      close() {
        this.$emit('hideMsg')
        this.clear()
      },
      checkCompratio() {
        const t = this
        // 上限
        const max = t.plcyinsurance.sihfpcyinsCrul * 1
        // 下限
        const min = t.plcyinsurance.sihfpcyinsCrll * 1
        const temp = t.form.sirpinsCompratio * 1
        if (t.form.sirpinsCompratio !== '') {
          if (temp > max || temp < min) {
            t.checkTemp = false
            t.form.sirpinsCompamt = ''
            t.form.sirpinsCompsum = ''
          } else {
            t.checkTemp = true
            const max = t.form.sirpinsBaseamt * 1 * t.form.sirpinsCompratio / 100
            t.form.sirpinsCompamt = max
            t.form.sirpinsCompsum = max * t.$store.state.repayApply.monthCount
          }
        }
      },
      checkPersratio() {
        const t = this
        // 上限
        const max = t.plcyinsurance.sihfpcyinsPrul * 1
        // 下限
        const min = t.plcyinsurance.sihfpcyinsPrll * 1
        const temp = t.form.sirpinsPersratio * 1
        if (t.form.sirpinsPersratio !== '') {
          if (temp > max || temp < min) {
            t.checkTemp2 = false
          } else {
            t.checkTemp2 = true
            const max = t.form.sirpinsBaseamt * 1 * t.form.sirpinsPersratio / 100
            t.form.sirpinsPersamt = max
            t.form.sirpinsPerssum = max * t.$store.state.repayApply.monthCount
          }
        }
      },
      // 检查基数是否符合要求
      checkBaseamt() {
        const t = this
        // 上限
        const max = t.plcyinsurance.sihfpcyinsCbul * 1
        // 下限
        const min = t.plcyinsurance.sihfpcyinsCbll * 1
        const temp = t.form.sirpBaseamt * 1
        if (t.form.sirpBaseamt !== '') {
          if (temp > max || temp < min) {
            t.form.sirpBaseamt = ''
          }
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd.scss";

  .btn {
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
