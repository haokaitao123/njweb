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
        <Form :model="form" ref="form" label-position="right" :rules="ruleValidate" :label-width="140">
          <i-col span="11">
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsInsurance')" prop="sihfrpinsInsurance">
              <Input v-model="form.sihfrpinsInsuranceDis" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsBaseamt')" prop="sihfrpinsBaseamt">
              <Input v-model="form.sihfrpinsBaseamt" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <!--prop="sirpinsCompratio"-->
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsCompratio')" prop="sihfrpinsCompratio">
              <Input v-model="form.sihfrpinsCompratio" @on-change="checkCompratio"
                     :disabled="this.sihfpcyinsCrtype === '01fixed' ? true:false"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsCompamt')">
              <Input v-model="form.sihfrpinsCompamt" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsCompsum')">
              <Input v-model="form.sihfrpinsCompsum" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <!--prop="sirpinsPersratio"-->
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsPersratio')" prop="sihfrpinsPersratio">
              <Input v-model="form.sihfrpinsPersratio" @on-change="checkPersratio"
                     :disabled="this.sihfpcyinsPrtype === '01fixed' ? true:false"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsPersamt')">
              <Input v-model="form.sihfrpinsPersamt" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsPerssum')">
              <Input v-model="form.sihfrpinsPerssum" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsComment')" prop="comment">
              <Input v-model="form.sihfrpinsComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                     :placeholder="$t('lang_authorization.platRole.commentDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <row type="flex" justify="end">
              <FormItem>
                <Button type="ghost" @click="close" style="margin-left: 8px">{{$t('button.cal')}}</Button>
                <Button type="primary" @click="save">{{$t('button.sav')}}</Button>
              </FormItem>
            </row>
          </i-col>
        </Form>
      </Row>
      <!--<Button type="ghost" @click="close" style="margin-left: 8px">{{$t('button.cal')}}</Button>-->
      <!--<Button type="primary" @click="save">{{$t('button.sav')}}</Button>-->
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
        openManger: false,
        checkTemp: true,
        checkTemp2: true,
        sihfpcyinsCrtype: '',
        sihfpcyinsPrtype: '',
        rolecontType: [],
        plcyinsurance: [],
        form: {
          _mt: 'sihfHfrepay.addOrUpdChild',
          sihfrpinsInsurance: '',
          sihfrpinsBaseamt: '',
          sihfrpinsCompratio: '',
          sihfrpinsCompamt: '',
          sihfrpinsCompsum: '',
          sihfrpinsPersratio: '',
          sihfrpinsPersamt: '',
          sihfrpinsPerssum: '',
          sihfrpinsComment: '',
          sihfrpinsInsuranceDis: '',
          sihfrpinsRpid: '',
        },
        rowId: '',
        ruleValidate: {
          sihfrpinsInsurance: [
            {
              required: true,
              message: this.$t('lang_repayApply.sihfRepayInsurance.sirpinsInsurance'),
              trigger: 'change',
            },
          ],
          sihfrpinsBaseamt: [
            {
              required: true,
              message: this.$t('lang_repayApply.sihfRepayInsurance.sihfrpinsBaseamtChe'),
              trigger: 'change',
            },
          ],
          sihfrpinsCompratio: [
            {
              required: true,
              validator: checkCompratio2,
              message: this.$t('lang_repayApply.sihfRepayInsurance.sirpinsInsuranceWarning'),
              trigger: 'blur',
            },
            { required: true, message: this.$t('lang_repayApply.sihfRepayInsurance.sirpinsInsuranceCp'), trigger: 'change' },
          ],
          sihfrpinsPersratio: [
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
      logType: String,
    },
    components: {},
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
          _mt: 'sihfHfrepay.getByIdChild',
          id: rowId,
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form.sihfrpinsInsurance = res.data.content[0].sihfrpinsInsurance
            t.form.sihfrpinsBaseamt = res.data.content[0].sihfrpinsBaseamt
            t.form.sihfrpinsCompratio = res.data.content[0].sihfrpinsCompratio
            t.form.sihfrpinsCompamt = res.data.content[0].sihfrpinsCompamt
            t.form.sihfrpinsCompsum = res.data.content[0].sihfrpinsCompsum
            t.form.sihfrpinsPersratio = res.data.content[0].sihfrpinsPersratio
            t.form.sihfrpinsPersamt = res.data.content[0].sihfrpinsPersamt
            t.form.sihfrpinsPerssum = res.data.content[0].sihfrpinsPerssum
            t.form.sihfrpinsComment = res.data.content[0].sihfrpinsComment
            t.form.sihfrpinsInsuranceDis = res.data.content[0].sihfrpinsInsuranceDis
            t.form.sihfrpinsRpid = res.data.content[0].sihfrpinsRpid
            this.$store.commit('repayHfrepay/setChildId1', res.data.content[0].id)
            t.getPlcyinsurance(res.data.content[0].sihfpcyinsIns)
            t.checkTemp2 = true
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getPlcyinsurance(insType) {
        // 获取公积金险种信息
        const t = this
        const params = {
          _mt: 'sihfPlcyinsurance.selectBypolicy',
          sihfpcyinsPolicyid: t.$store.state.repayHfrepay.insuranceId,
          sihfpcyinsIns: insType,
          logType: '根据险种id查询社保险种信息',
        }
        getDataLevelUserLoginNew(params).then((res) => {
          if (isSuccess(res, t)) {
            t.plcyinsurance = res.data.content[0]
            this.sihfpcyinsCrtype = res.data.content[0].sihfpcyinsCrtype
            this.sihfpcyinsPrtype = res.data.content[0].sihfpcyinsPrtype
            console.log(t.plcyinsurance)

            this.checkBaseamt()
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
        t.form.sihfrpinsInsurance = ''
        t.form.sihfrpinsBaseamt = ''
        t.form.sihfrpinsCompratio = ''
        t.form.sihfrpinsCompamt = ''
        t.form.sihfrpinsCompsum = ''
        t.form.sihfrpinsPersratio = ''
        t.form.sihfrpinsPersamt = ''
        t.form.sihfrpinsPerssum = ''
        t.form.sihfrpinsComment = ''
        t.form.sihfrpinsInsuranceDis = ''
        t.form.sihfrpinsRpid = ''
        this.$store.commit('repayHfrepay/setChildId1', '')
        this.$refs.form.resetFields()
      },
      save() {
        const t = this
        if (t.$store.state.repayHfrepay.childId1 !== '') {
          t.form['id'] = t.rowId
        }
        const data = deepCopy(t.form)
        data.logType = '修改'
        console.log(data, 'data1')
        console.log(t.form, 'form')
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        console.log(data, 'data2')
        t.$refs.form.validate((valid) => {
          console.log(valid)
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$store.commit('repayApply/setChildId1', res.data.content[0].id)
                t.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: this.$t('reminder.updsuccess'),
                })
                t.close()
//            this.$emit('getdata', res.data.content[0])
//            t.$emit('updata', res.data.content[0])
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
        const temp = t.form.sihfrpinsCompratio * 1
        if (t.form.sihfrpinsCompratio !== '') {
          if (temp > max || temp < min) {
            t.checkTemp = false

            t.form.sihfrpinsCompamt = ''
          } else {
            t.checkTemp = true

            const max = t.form.sihfrpinsBaseamt * 1 * t.form.sihfrpinsCompratio / 100
            t.form.sihfrpinsCompamt = max

            console.log(t.$store.state.repayHfrepay.monthCount)
            t.form.sihfrpinsCompsum = t.$store.state.repayHfrepay.monthCount * max
          }
        }
      },
      checkPersratio() {
        const t = this
        // 上限
        const max = t.plcyinsurance.sihfpcyinsPrul * 1
        // 下限
        const min = t.plcyinsurance.sihfpcyinsPrll * 1
        const temp = t.form.sihfrpinsPersratio * 1
        if (t.form.sihfrpinsPersratio !== '') {
          if (temp > max || temp < min) {
            t.checkTemp2 = false
            t.form.sihfrpinsPersamt = ''
          } else {
            t.checkTemp2 = true
            const max = t.form.sihfrpinsBaseamt * 1 * t.form.sihfrpinsPersratio / 100
            t.form.sihfrpinsPersamt = max

            t.form.sihfrpinsPerssum = t.$store.state.repayHfrepay.monthCount * max
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
        const temp = t.form.sihfrpinsBaseamt * 1
        if (t.form.sihfrpinsBaseamt !== '') {
          if (temp > max || temp < min) {
            t.form.sihfrpinsBaseamt = ''
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
