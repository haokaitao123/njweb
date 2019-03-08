<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_ansrptEmpSihf.ansrptEmpSihf.basechititle')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row>
        <Form :model="form" ref="form" label-position="right" :label-width="140">
          <i-col span="11" >
            <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccinsInsurance')" prop="siccinsInsurance">
              <Input  v-model="form.siccinsInsurance"   :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
            </FormItem>
          </i-col>
          <i-col span="11"offset="1">
            <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccinsCalctype')">
              <Input   v-model="form.siccinsCalctypeDis" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccinsBaseamt')"prop="sirpinsCompratio" >
              <Input v-model="form.siccinsBaseamt" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccinsCompratio')" >
              <Input v-model="form.siccinsCompratio" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"  ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccinsCompamt')" >
              <Input v-model="form.siccinsCompamt" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccinsPersratio')" prop="sirpinsPersratio" >
              <Input v-model="form.siccinsPersratio" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccinsPersamt')" >
              <Input v-model="form.siccinsPersamt" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccinsRpmonth')" >
              <Input v-model="form.siccinsRpmonth" disabled ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccinsAjmonth')" >
              <Input v-model="form.siccinsAjmonth" disabled ></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccinsComment')" prop="comment">
              <Input v-model="form.sihfrpinsComment" type="textarea"
                     :placeholder="$t('lang_authorization.platRole.commentDis')" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <Button class="btn" v-show="opensav" type="primary" @click="save">{{$t('button.sav')}}</Button>
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
        logType: this.$t('lang_authorization.platRole.searchColumn.title'),
        checkTemp: true,
        checkTemp2: true,
        rolecontType: [],
        plcyinsurance: [],
        form: {
          _mt: 'sihfCalc.addOrUpdGrand',
          siccinsInsurance: '',
          siccinsCalcempid: '',
          siccinsCalctype: '',
          siccinsCalctypeDis: '',
          siccinsBaseamt: '',
          siccinsCompratio: '',
          siccinsCompamt: '',
          siccinsPersratio: '',
          siccinsPersamt: '',
          siccinsRpmonth: '',
          siccinsAjmonth: '',
          siccinsComment: '',
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
          _mt: 'sihfCalc.getByIdGrand',
          id: rowId,
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form.siccinsInsurance = res.data.content[0].siccinsInsurance
            t.form.siccinsCalcempid = res.data.content[0].siccinsCalcempid
            t.form.siccinsCalctype = res.data.content[0].siccinsCalctype
            t.form.siccinsCalctypeDis = res.data.content[0].siccinsCalctypeDis
            t.form.siccinsBaseamt = res.data.content[0].siccinsBaseamt
            t.form.siccinsCompratio = res.data.content[0].siccinsCompratio
            t.form.siccinsCompamt = res.data.content[0].siccinsCompamt
            t.form.siccinsPersratio = res.data.content[0].siccinsPersratio
            t.form.siccinsPersamt = res.data.content[0].siccinsPersamt
            t.form.siccinsRpmonth = res.data.content[0].siccinsRpmonth
            t.form.siccinsAjmonth = res.data.content[0].siccinsAjmonth
            t.form.siccinsComment = res.data.content[0].siccinsComment
            this.$store.commit('repayHfrepay/setChildId1', res.data.content[0].id)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
        if (t.$store.state.calcJsBase.dataType === 'add') {
          t.opensav = true
        } else {
          t.opensav = false
        }
      },
      clear() {
        const t = this
        t.form.siccinsInsurance = ''
        t.form.siccinsCalcempid = ''
        t.form.siccinsCalctype = ''
        t.form.siccinsCalctypeDis = ''
        t.form.siccinsBaseamt = ''
        t.form.siccinsCompratio = ''
        t.form.siccinsCompamt = ''
        t.form.siccinsPersratio = ''
        t.form.siccinsPersamt = ''
        t.form.siccinsRpmonth = ''
        t.form.siccinsAjmonth = ''
        t.form.siccinsComment = ''
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
