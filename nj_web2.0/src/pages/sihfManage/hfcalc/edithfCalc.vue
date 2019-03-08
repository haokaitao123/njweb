<template>
  <div class="option-main">
    <Row style="max-height: 450px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="120">
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfcalcPeriod')" prop="sihfcalcPeriod">
            <span @dblclick="clearPeriod">
              <Input @on-click="pickDataPeriod" icon="search" :readonly="true"
                     :placeholder="$t('lang_sihfCalc.sihfHfcalc.sihfcalcPeriod')"  :disabled="this.$store.state.hfcalcJsBase.dataType === 'sel' ? true:false"
                     v-model="form.sihfcalcPeriodDis"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfcalcBfarea')"  prop="sihfcalcBfarea">
            <span @dblclick="clearBfarea">
              <Input @on-click="pickDataBfarea" icon="search" :readonly="true"
                     :placeholder="$t('lang_sihfCalc.sihfHfcalc.sihfcalcBfarea')":disabled="this.$store.state.hfcalcJsBase.dataType === 'sel' ? true:false"
                     v-model="form.sihfcalcBfareaDis"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfcalcRound')"  prop="sihfcalcRound">
          <Select v-model="form.sihfcalcRound"  :placeholder="$t('lang_sihfCalc.sihfHfcalc.sihfcalcRound')" :disabled="this.$store.state.hfcalcJsBase.dataType === 'sel' ? true:false":transfer="true">
            <Option :value="item.paramCode" v-for="(item,index) in persttamtList" :key="index">{{item.paramInfoCn}}</Option>
          </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfcalcPersttamt')">
            <Input v-model="form.sihfcalcPersttamt" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfcalcCompttamt')">
            <Input v-model="form.sihfcalcCompttamt" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfcalcTtamt')">
            <Input v-model="form.sihfcalcTtamt" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfcalcComment')">
            <Input v-model="form.sihfcalcComment" type="textarea":disabled="this.$store.state.hfcalcJsBase.dataType === 'sel' ? true:false"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_sihfCalc.sihfHfcalc.sihfcalcOptrecord')" >
            <Input v-model="form.sihfcalcOptrecord" type="textarea":disabled="this.$store.state.hfcalcJsBase.dataType === 'sel' ? true:false"></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
    <Button  v-show="opensav" class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    <transition name="fade">
      <searchFyperiod v-show="openPickPeriod" @closeUp="closePeriod" @changeinput="changeinputPeriod"
                      ref="searchFyperiod"></searchFyperiod>
    </transition>
    <transition name="fade">
      <searchArea v-show="openPickCity" @closeUp="closeCity" @changeinput="changeinputCity"
                     ref="searchArea"></searchArea>
    </transition>
  </div>
</template>
<script>
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'
  import {isSuccess, deepCopy} from '../../../lib/util'
  import searchFyperiod from '../../../components/searchTable/searchFyperiod'
  import searchArea from '../../../components/searchTable/searchArea'
  import valid from '../../../lib/pub_valid'

  export default {
    data() {
      return {
        form: {
          _mt: 'sihfHfcalc.addOrUpd',
          sihfcalcPeriod: '',
          sihfcalcBfarea: '',
          sihfcalcRound: '',
          sihfcalcPersttamt: '',
          sihfcalcCompttamt: '',
          sihfcalcTtamt: '',
          sihfcalcOptrecord: '',
          sihfcalcComment: '',
          sihfcalcPeriodDis: '',
          sihfcalcBfareaDis: '',
          sihfcalcStatus: '02accounting',
        },
        benefitacctype: [],
        persttamtList: '',
        openPickPeriod: false,
        openPickCity: false,
        opensav: true,
        ruleValidate: {
          sihfcalcPeriod: [
            { required: true, message: this.$t('lang_sihfCalc.sihfCalc.sicalcPeriod'), trigger: 'change' },
          ],
          sihfcalcBfarea: [
            { required: true, message: this.$t('lang_sihfCalc.sihfCalc.sicalcBfarea'), trigger: 'change' },
          ],
          sihfcalcRound: [
            { required: true, message: this.$t('lang_sihfCalc.sihfCalc.sicalcRound'), trigger: 'change' },
          ],
        },
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
      searchArea,
    },
    methods: {
      getdata() {
        const t = this
        const params = {
          _mt: 'sihfHfcalc.getById',
          id: t.$store.state.hfcalcJsBase.mainId,
          logType: '根据id查询',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.form.sihfcalcPeriod = res.data.content[0].sihfcalcPeriod
            this.form.sihfcalcBfarea = res.data.content[0].sihfcalcBfarea
            this.form.sihfcalcRound = res.data.content[0].sihfcalcRound
            this.form.sihfcalcPersttamt = res.data.content[0].sihfcalcPersttamt
            this.form.sihfcalcCompttamt = res.data.content[0].sihfcalcCompttamt
            this.form.sihfcalcTtamt = res.data.content[0].sihfcalcTtamt
            this.form.sihfcalcOptrecord = res.data.content[0].sihfcalcOptrecord
            this.form.sihfcalcComment = res.data.content[0].sihfcalcComment
            this.form.sihfcalcPeriodDis = res.data.content[0].sihfcalcPeriodDis
            this.form.sihfcalcBfareaDis = res.data.content[0].sihfcalcBfareaDis
            this.form.sihfcalcStatus = res.data.content[0].sihfcalcStatus
            t.$store.commit('hfcalcJsBase/setMainId', res.data.content[0].id)
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
                if (t.$store.state.hfcalcJsBase.mainId === undefined || t.$store.state.hfcalcJsBase.mainId === '') {
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
                t.$store.commit('hfcalcJsBase/setMainId', res.data.content[0].id)
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
        this.form.sihfcalcPeriod = ''
        this.form.sihfcalcBfarea = ''
        this.form.sihfcalcRound = ''
        this.form.sihfcalcPersttamt = ''
        this.form.sihfcalcCompttamt = ''
        this.form.sihfcalcTtamt = ''
        this.form.sihfcalcOptrecord = ''
        this.form.sihfcalcComment = ''
        this.form.sihfcalcPeriodDis = ''
        this.form.sihfcalcStatus = '02accounting'
        this.form.sihfcalcBfareaDis = ''
        this.$store.commit('hfcalcJsBase/setMainId', '')
        this.$refs.form.resetFields()
      },
      //弹出框期间----start
      pickDataPeriod() {
        this.$refs.searchFyperiod.getData()
        this.openPickPeriod = true
      },
      changeinputPeriod(row) {
        const t = this
        t.form.sihfcalcPeriodDis = row.fypdPeriod
        t.form.sihfcalcPeriod = row.id
      },
      clearPeriod() {
        const t = this
        t.form.sihfcalcPeriodDis = ''
        t.form.sihfcalcPeriod = ''
      },
      closePeriod() {
        const t = this
        t.openPickPeriod = false
      },
      //弹出框期间----end
      //弹出框城市----start
      pickDataBfarea() {
        this.$refs.searchArea.getData()
        this.openPickCity = true
      },
      changeinputCity(row) {
        const t = this
        t.form.sihfcalcBfareaDis = row.bfareaCname
        t.form.sihfcalcBfarea = row.id
      },
      clearBfarea() {
        const t = this
        t.form.sihfcalcBfarea = ''
        t.form.sihfcalcBfareaDis = ''
      },
      closeCity() {
        const t = this
        t.openPickCity = false
      },
      //弹出框城市----end
      getSelect() {
        const t = this
        if (t.$store.state.hfcalcJsBase.dataType === 'add') {
          t.opensav = true
        } else {
          t.opensav = false
        }
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'calcround',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.persttamtList = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .option-main {
    position: relative;
    /*height: 550px;*/
    .btn {
      position: absolute;
      bottom: -17px;
      right: 20px;
    }
  }
</style>
