<template>
  <div class="option-main">
    <Row style="max-height: 450px;overflow-y: auto;">
      <Form :model="form" label-position="right" ref="form" :label-width="140">
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempCompany')">
            <Input v-model="form.sihfccempCompanyDis"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempDept')">
            <Input v-model="form.sihfccempDeptDis"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempEmpworkno')">
            <Input v-model="form.sihfccempEmpworkno"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempEmpgid')">
            <Input v-model="form.sihfccempEmpgid"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempCname')">
            <Input v-model="form.sihfccempCname"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempIdtype')">
            <Input v-model="form.sihfccempIdtypeDis"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempIdno')">
            <Input v-model="form.sihfccempIdno"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempHflocation')">
            <Input v-model="form.sihfccempHflocationDis"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempHfpolicy')">
            <Input v-model="form.sihfccempHfpolicyDis"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempHftype')">
            <Input v-model="form.sihfccempHftypeDis"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempPersamt')">
            <Input v-model="form.sihfccempPersamt"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempCompamt')">
            <Input v-model="form.sihfccempCompamt"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempPersrpamt')">
            <Input v-model="form.sihfccempPersrpamt"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempComprpamt')">
            <Input v-model="form.sihfccempComprpamt"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempPersajamt')">
            <Input v-model="form.sihfccempPersajamt"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempCompajamt')">
            <Input v-model="form.sihfccempCompajamt"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempPersttamt')">
            <Input v-model="form.sihfccempPersttamt"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempCompttamt')">
            <Input v-model="form.sihfccempCompttamt"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"></Input>
          </FormItem>
        </i-col>

        <i-col span="23">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfccempComment')">
            <Input v-model="form.sihfccempComment"
                   :disabled="this.$store.state.hfcalcJsBase.dataType === 'check' ? true:false"
                   type="textarea"></Input>
          </FormItem>
        </i-col>

      </Form>
    </Row>
    <Button class="btn" v-show="opensav" type="primary" @click="save">{{$t('button.sav')}}</Button>
    <transition name="fade">
      <searchFyperiod v-show="openPickPeriod" @closeUp="closePeriod" @changeinput="changeinputPeriod"
                      ref="searchFyperiod"></searchFyperiod>
    </transition>
    <transition name="fade">
      <searchCityPub v-show="openPickCity" @closeUp="closeCity" @changeinput="changeinputCity"
                     ref="searchCityPub"></searchCityPub>
    </transition>
  </div>
</template>
<script>
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'
  import {isSuccess, deepCopy} from '../../../lib/util'
  import searchFyperiod from '../../../components/searchTable/searchFyperiod'
  import searchCityPub from '../../../components/searchTable/searchCityPub'
  import valid from '../../../lib/pub_valid'

  export default {
    data() {
      return {
        form: {
          _mt: 'sihfHfcalc.addOrUpdChild',
          sihfccempCompany: '',
          sihfccempCompanyDis: '',
          sihfccempDeptDis: '',
          sihfccempDept: '',
          sihfccempEmpworkno: '',
          sihfccempEmpgid: '',
          sihfccempCname: '',
          sihfccempIdtype: '',
          sihfccempIdtypeDis: '',
          sihfccempIdno: '',
          sihfccempHflocation: '',
          sihfccempHflocationDis: '',
          sihfccempHfpolicy: '',
          sihfccempHfpolicyDis: '',
          sihfccempHftype: '',
          sihfccempHftypeDis: '',
          sihfccempPersamt: '',
          sihfccempCompamt: '',
          sihfccempPersrpamt: '',
          sihfccempComprpamt: '',
          sihfccempPersajamt: '',
          sihfccempCompajamt: '',
          sihfccempPersttamt: '',
          sihfccempCompttamt: '',
          sihfccempComment: '',
        },
        benefitacctype: [],
        openPickPeriod: false,
        openPickCity: false,
        opensav: true,
      }
    },
    props: {
      logType: String,
      index: Number,
    },
    mounted() {
    },
    components: {
      searchFyperiod,
      searchCityPub,
    },
    methods: {
      getdata() {
        let ti = this.$store.state.hfcalcJsBase.dataType
        console.log(ti)
        const t = this
        const params = {
          _mt: 'sihfHfcalc.getByIdChild',
          id: t.$store.state.hfcalcJsBase.childId1,
          logType: '根据id查询',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.form.sihfccempCompany = res.data.content[0].sihfccempCompany
            this.form.sihfccempCompanyDis = res.data.content[0].sihfccempCompanyDis
            this.form.sihfccempDept = res.data.content[0].sihfccempDept
            this.form.sihfccempDeptDis = res.data.content[0].sihfccempDeptDis
            this.form.sihfccempEmpworkno = res.data.content[0].sihfccempEmpworkno
            this.form.sihfccempEmpgid = res.data.content[0].sihfccempEmpgid
            this.form.sihfccempCname = res.data.content[0].sihfccempCname
            this.form.sihfccempIdtype = res.data.content[0].sihfccempIdtype
            this.form.sihfccempIdtypeDis = res.data.content[0].sihfccempIdtypeDis
            this.form.sihfccempIdno = res.data.content[0].sihfccempIdno
            this.form.sihfccempHflocation = res.data.content[0].sihfccempHflocation
            this.form.sihfccempHflocationDis = res.data.content[0].sihfccempHflocationDis
            this.form.sihfccempHfpolicy = res.data.content[0].sihfccempHfpolicy
            this.form.sihfccempHfpolicyDis = res.data.content[0].sihfccempHfpolicyDis
            this.form.sihfccempHftype = res.data.content[0].sihfccempHftype
            this.form.sihfccempHftypeDis = res.data.content[0].sihfccempHftypeDis
            this.form.sihfccempCompamt = res.data.content[0].sihfccempCompamt
            this.form.sihfccempPersrpamt = res.data.content[0].sihfccempPersrpamt
            this.form.sihfccempComprpamt = res.data.content[0].sihfccempComprpamt
            this.form.sihfccempPersajamt = res.data.content[0].sihfccempPersajamt
            this.form.sihfccempCompajamt = res.data.content[0].sihfccempCompajamt
            this.form.sihfccempPersttamt = res.data.content[0].sihfccempPersttamt
            this.form.sihfccempCompttamt = res.data.content[0].sihfccempCompttamt
            this.form.sihfccempComment = res.data.content[0].sihfccempComment
            this.form.sihfccempPersamt = res.data.content[0].sihfccempPersamt
//            this.$store.commit('calcJsBase/setInsuranceId', res.data.content[0].sihfrpBenefitpolicy)
//            this.$store.commit('calcJsBase/setMonthCount', res.data.content[0].sihfmonCount)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
        if (t.$store.state.hfcalcJsBase.status !== '02accounting') {
          t.opensav = false
        }
      },
      save() {
        const t = this
        const data = deepCopy(t.form)
        if (t.$store.state.hfcalcJsBase.mainId) {
          data.id = t.$store.state.hfcalcJsBase.mainId
        }
        data.logType = t.logType
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$store.commit('hfcalcJsBase/setMainId', res.data.content[0].id)
                t.$store.commit('hfcalcJsBase/setInsuranceId', res.data.content[0].sihfrpBenefitpolicy)
//                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$emit('newdata', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
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
      clear() {
        this.form.sihfccempCompany = ''
        this.form.sihfccempCompanyDis = ''
        this.form.sihfccempDept = ''
        this.form.sihfccempDeptDis = ''
        this.form.sihfccempEmpworkno = ''
        this.form.sihfccempEmpgid = ''
        this.form.sihfccempCname = ''
        this.form.sihfccempIdtype = ''
        this.form.sihfccempIdtypeDis = ''
        this.form.sihfccempIdno = ''
        this.form.sihfccempHflocation = ''
        this.form.sihfccempHflocationDis = ''
        this.form.sihfccempHfpolicy = ''
        this.form.sihfccempHfpolicyDis = ''
        this.form.sihfccempHftype = ''
        this.form.sihfccempHftypeDis = ''
        this.form.sihfccempPersamt = ''
        this.form.sihfccempCompamt = ''
        this.form.sihfccempPersrpamt = ''
        this.form.sihfccempComprpamt = ''
        this.form.sihfccempPersajamt = ''
        this.form.sihfccempCompajamt = ''
        this.form.sihfccempPersttamt = ''
        this.form.sihfccempCompttamt = ''
        this.form.sihfccempComment = ''
//        this.$store.commit('hfcalcJsBase/setMainId', '')
        this.$refs.form.resetFields()
      },
      //弹出框期间----start
      pickDataPeriod() {
        this.$refs.searchFyperiod.getData()
        this.openPickPeriod = true
      },
      changeinputPeriod(row) {
        const t = this
        t.form.sicalcPeriodDis = row.fypdPeriod
        t.form.sicalcPeriod = row.id
      },
      clearPeriod() {
        const t = this
        t.form.sicalcPeriodDis = ''
        t.form.sicalcPeriod = ''
      },
      closePeriod() {
        const t = this
        t.openPickPeriod = false
      },
      //弹出框期间----end
      //弹出框城市----start
      pickDataBfarea() {
        this.$refs.searchCityPub.getData()
        this.openPickCity = true
      },
      changeinputCity(row) {
        const t = this
        t.form.sicalcBfareaDis = row.cityName
        t.form.sicalcBfarea = row.id
      },
      clearBfarea() {
        const t = this
        t.form.sicalcBfarea = ''
        t.form.sicalcBfareaDis = ''
      },
      closeCity() {
        const t = this
        t.openPickCity = false
      },
      //弹出框城市----end
    },
  }
</script>
<style lang="scss" scoped>
  .option-main {
    position: relative;
    /*height: 500px;*/
    .btn {
      position: absolute;
      bottom: 30px;
      right: 30px;
    }
  }
</style>
