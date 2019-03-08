<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          {{$t('lang_sihfCalc.sihfHfcalc.institle')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row>
        <Form :model="form" ref="form" label-position="right" :label-width="140">
          <i-col span="11" >
            <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccinsInsurance')" prop="sihfccinsInsurance">
              <Input  v-model="form.sihfccinsInsuranceDis"  :disabled="this.$store.state.hfcalcJsBase.dataType === 'detail' ? true:false" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11"offset="1">
            <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccinsCalctype')">
              <Input   v-model="form.sihfccinsCalctypeDis"  :disabled="this.$store.state.hfcalcJsBase.dataType === 'detail' ? true:false"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccinsBaseamt')"prop="sihfccinsBaseamt" >
              <Input v-model="form.sihfccinsBaseamt"  :disabled="this.$store.state.hfcalcJsBase.dataType === 'detail' ? true:false"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccinsCompratio')" >
              <Input v-model="form.sihfccinsCompratio"  :disabled="this.$store.state.hfcalcJsBase.dataType === 'detail' ? true:false" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccinsCompamt')" >
              <Input v-model="form.sihfccinsCompamt" :disabled="this.$store.state.hfcalcJsBase.dataType === 'detail' ? true:false" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccinsPersratio')" prop="sihfccinsPersratio" >
              <Input v-model="form.sihfccinsPersratio" :disabled="this.$store.state.hfcalcJsBase.dataType === 'detail' ? true:false" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccinsPersamt')" >
              <Input v-model="form.sihfccinsPersamt" :disabled="this.$store.state.hfcalcJsBase.dataType === 'detail' ? true:false" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccinsRpmonth')" >
              <Input v-model="form.sihfccinsRpmonth" disabled ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccinsAjmonth')" >
              <Input v-model="form.sihfccinsAjmonth"  disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccinsComment')" prop="comment">
              <Input v-model="form.sihfccinsComment" type="textarea":disabled="this.$store.state.hfcalcJsBase.dataType === 'detail' ? true:false"
                     :placeholder="$t('lang_sihfCalc.sihfHfcalc.sihfccinsComment')"></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <!--<Button class="btn" v-show="opensav" type="primary" @click="save">{{$t('button.sav')}}</Button>-->
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        openManger: false,
        logType: '',
        checkTemp: true,
        checkTemp2: true,
        rolecontType: [],
        plcyinsurance: [],
        form: {
          _mt: 'sihfHfcalc.addOrUpdGrand',
          sihfccinsCalcempid: '',
          sihfccinsInsuranceDis: '',
          sihfccinsInsurance: '',
          sihfccinsCalctype: '',
          sihfccinsCalctypeDis: '',
          sihfccinsBaseamt: '',
          sihfccinsCompratio: '',
          sihfccinsCompamt: '',
          sihfccinsPersratio: '',
          sihfccinsPersamt: '',
          sihfccinsRpmonth: '',
          sihfccinsAjmonth: '',
          sihfccinsComment: '',
        },
        rowId: '',
        opensav: true,
      }
    },
    props: {
    },
    components: {
    },
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
          _mt: 'sihfHfcalc.getByIdGrand',
          id: rowId,
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form.sihfccinsCalcempid = res.data.content[0].sihfccinsCalcempid
            t.form.sihfccinsInsurance = res.data.content[0].sihfccinsInsurance
            t.form.sihfccinsInsuranceDis = res.data.content[0].sihfccinsInsuranceDis
            t.form.sihfccinsCalctype = res.data.content[0].sihfccinsCalctype
            t.form.sihfccinsCalctypeDis = res.data.content[0].sihfccinsCalctypeDis
            t.form.sihfccinsBaseamt = res.data.content[0].sihfccinsBaseamt
            t.form.sihfccinsCompratio = res.data.content[0].sihfccinsCompratio
            t.form.sihfccinsCompamt = res.data.content[0].sihfccinsCompamt
            t.form.sihfccinsPersratio = res.data.content[0].sihfccinsPersratio
            t.form.sihfccinsPersamt = res.data.content[0].sihfccinsPersamt
            t.form.sihfccinsRpmonth = res.data.content[0].sihfccinsRpmonth
            t.form.sihfccinsAjmonth = res.data.content[0].sihfccinsAjmonth
            t.form.sihfccinsComment = res.data.content[0].sihfccinsComment
            this.$store.commit('repayHfrepay/setChildId1', res.data.content[0].id)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
        if (t.$store.state.hfcalcJsBase.dataType === 'add') {
          t.opensav = true
        } else {
          t.opensav = false
        }
      },
      clear() {
        const t = this
        t.form.sihfccinsCalcempid = ''
        t.form.sihfccinsInsurance = ''
        t.form.sihfccinsInsuranceDis = ''
        t.form.sihfccinsCalctype = ''
        t.form.sihfccinsCalctypeDis = ''
        t.form.sihfccinsBaseamt = ''
        t.form.sihfccinsCompratio = ''
        t.form.sihfccinsCompamt = ''
        t.form.sihfccinsPersratio = ''
        t.form.sihfccinsPersamt = ''
        t.form.sihfccinsRpmonth = ''
        t.form.sihfccinsAjmonth = ''
        t.form.sihfccinsComment = ''
//        this.$store.commit('repayHfrepay/setChildId1', '')
        this.$refs.form.resetFields()
      },
      save() {
        const t = this
        if (t.$store.state.repayHfrepay.childId1 !== '') {
          t.form["id"] = t.rowId
        }
        const data = deepCopy(t.form)
        data.logType = '修改'
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.$store.commit('hfcalcJsBase/setChildId1', res.data.content[0].id)
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
