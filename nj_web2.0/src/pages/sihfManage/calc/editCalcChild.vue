<template>
  <div class="option-main">
    <Row style="max-height: 450px;overflow-y: auto;">
      <Form :model="form" label-position="right"  ref="form" :label-width="140">
        <i-col span="11" >
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempCompany')">
            <Input v-model="form.siccempCompanyDis" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempDept')">
            <Input v-model="form.siccempDeptDis" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempEmpworkno')">
            <Input v-model="form.siccempEmpworkno" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempEmpgid')">
            <Input v-model="form.siccempEmpgid" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11"  >
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempCname')">
            <Input v-model="form.siccempCname" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempIdtype')" >
            <Input v-model="form.siccempIdtypeDis":disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempIdno')">
            <Input v-model="form.siccempIdno" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempBflocation')" >
            <Input v-model="form.siccempBflocationDis" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempBfpolicy')">
            <Input v-model="form.siccempBfpolicyDis":disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempBftype')" >
            <Input v-model="form.siccempBftypeDis" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempPersamt')">
            <Input v-model="form.siccempPersamt" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempCompamt')" >
            <Input v-model="form.siccempCompamt" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempPersrpamt')">
            <Input v-model="form.siccempPersrpamt" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempComprpamt')" >
            <Input v-model="form.siccempComprpamt":disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempPersajamt')">
            <Input v-model="form.siccempPersajamt" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempCompajamt')" >
            <Input v-model="form.siccempCompajamt" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempPersttamt')">
            <Input v-model="form.siccempPersttamt" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempCompttamt')" >
            <Input v-model="form.siccempCompttamt" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
          </FormItem>
        </i-col>

        <i-col span="23" >
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.siccempComment')" >
            <Input v-model="form.siccempComment" type="textarea" :disabled="this.$store.state.calcJsBase.dataType === 'detail' ? true:false"></Input>
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
          _mt: 'sihfCalc.addOrUpdChild',
          siccempCompany: '',
          siccempCompanyDis: '',
          siccempDept: '',
          siccempDeptDis: '',
          siccempEmpworkno: '',
          siccempEmpgid: '',
          siccempCname: '',
          siccempIdtype: '',
          siccempIdtypeDis: '',
          siccempIdno: '',
          siccempBflocation: '',
          siccempBflocationDis: '',
          siccempBfpolicy: '',
          siccempBfpolicyDis: '',
          siccempBftype: '',
          siccempBftypeDis: '',
          siccempPersamt: '',
          siccempCompamt: '',
          siccempPersrpamt: '',
          siccempComprpamt: '',
          siccempPersajamt: '',
          siccempCompajamt: '',
          siccempPersttamt: '',
          siccempCompttamt: '',
          siccempComment: '',
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
        const t = this
        const params = {
          _mt: 'sihfCalc.getByIdChild',
          id: t.$store.state.calcJsBase.childId1,
          logType: '根据id查询',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.form.siccempCompany = res.data.content[0].siccempCompany
            this.form.siccempCompanyDis = res.data.content[0].siccempCompanyDis
            this.form.siccempDept = res.data.content[0].siccempDept
            this.form.siccempDeptDis = res.data.content[0].siccempDeptDis
            this.form.siccempEmpworkno = res.data.content[0].siccempEmpworkno
            this.form.siccempEmpgid = res.data.content[0].siccempEmpgid
            this.form.siccempCname = res.data.content[0].siccempCname
            this.form.siccempIdtype = res.data.content[0].siccempIdtype
            this.form.siccempIdtypeDis = res.data.content[0].siccempIdtypeDis
            this.form.siccempIdno = res.data.content[0].siccempIdno
            this.form.siccempBflocation = res.data.content[0].siccempBflocation
            this.form.siccempBflocationDis = res.data.content[0].siccempBflocationDis
            this.form.siccempBfpolicy = res.data.content[0].siccempBfpolicy
            this.form.siccempBfpolicyDis = res.data.content[0].siccempBfpolicyDis
            this.form.siccempBftype = res.data.content[0].siccempBftype
            this.form.siccempBftypeDis = res.data.content[0].siccempBftypeDis
            this.form.siccempPersamt = res.data.content[0].siccempPersamt
            this.form.siccempCompamt = res.data.content[0].siccempCompamt
            this.form.siccempPersrpamt = res.data.content[0].siccempPersrpamt
            this.form.siccempComprpamt = res.data.content[0].siccempComprpamt
            this.form.siccempPersajamt = res.data.content[0].siccempPersajamt
            this.form.siccempCompajamt = res.data.content[0].siccempCompajamt
            this.form.siccempPersttamt = res.data.content[0].siccempPersttamt
            this.form.siccempCompttamt = res.data.content[0].siccempCompttamt
            this.form.siccempComment = res.data.content[0].siccempComment
//            this.$store.commit('calcJsBase/setInsuranceId', res.data.content[0].sihfrpBenefitpolicy)
//            this.$store.commit('calcJsBase/setMonthCount', res.data.content[0].sihfmonCount)
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
      save() {
        const t = this
        const data = deepCopy(t.form)
        if (t.$store.state.calcJsBase.mainId) {
          data.id = t.$store.state.calcJsBase.mainId
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
                t.$store.commit('calcJsBase/setMainId', res.data.content[0].id)
                t.$store.commit('calcJsBase/setInsuranceId', res.data.content[0].sihfrpBenefitpolicy)
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
        this.form.siccempComment = ''
        this.form.siccempCompttamt = ''
        this.form.siccempPersttamt = ''
        this.form.siccempCompajamt = ''
        this.form.siccempPersajamt = ''
        this.form.siccempComprpamt = ''
        this.form.siccempPersrpamt = ''
        this.form.siccempCompamt = ''
        this.form.siccempPersamt = ''
        this.form.siccempBftype = ''
        this.form.siccempBfpolicy = ''
        this.form.siccempBflocation = ''
        this.form.siccempIdno = ''
        this.form.siccempIdtype = ''
        this.form.siccempIdtypeDis = ''
        this.form.siccempCname = ''
        this.form.siccempEmpgid = ''
        this.form.siccempEmpworkno = ''
        this.form.siccempDept = ''
        this.form.siccempDeptDis = ''
        this.form.siccempCompany = ''
        this.form.siccempCompanyDis = ''
        this.form.siccempBftypeDis = ''
//        this.$store.commit('calcJsBase/setMainId', '')
        this.$refs.form.resetFields()
      },
      // 弹出框期间----start
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
      // 弹出框期间----end
      // 弹出框城市----start
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
      // 弹出框城市----end
    },
  }
</script>
<style lang="scss" scoped>
  .option-main {
    position: relative;
    height: 500px;
    .btn {
      position: absolute;
      bottom: 30px;
      right: 30px;
    }
  }
</style>
