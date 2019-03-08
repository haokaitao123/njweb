<template>
  <div class="option-main">
    <Row style="max-height: 450px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="120">
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.sicalcPeriod')" prop="sicalcPeriod">
            <span @dblclick="clearPeriod">
              <Input @on-click="pickDataPeriod" icon="search" :readonly="true"
                     :placeholder="$t('lang_sihfCalc.sihfCalc.sicalcPeriod')"
                     v-model="form.sicalcPeriodDis"
                     :disabled="this.$store.state.calcJsBase.dataType === 'change' ? true:false"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.sicalcBfarea')" prop="sicalcBfarea">
            <span @dblclick="clearBfarea">
              <Input @on-click="pickDataBfarea" icon="search" :readonly="true"
                     :disabled="this.$store.state.calcJsBase.dataType === 'change' ? true:false"
                     :placeholder="$t('lang_sihfCalc.sihfCalc.sicalcBfarea')"
                     v-model="form.sicalcBfareaDis"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.sicalcRound')" prop="sicalcRound">
            <Select v-model="form.sicalcRound" :placeholder="$t('lang_sihfCalc.sihfCalc.sicalcRound')"
                    :disabled="this.$store.state.calcJsBase.dataType === 'change' ? true:false" :transfer="true">
              <Option :value="item.paramCode" v-for="(item,index) in persttamtList" :key="index">
                {{item.paramInfoName}}
              </Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.sicalcPersttamt')">
            <Input v-model="form.sicalcPersttamt" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.sicalcCompttamt')">
            <Input v-model="form.sicalcCompttamt" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.sicalcTtamt')">
            <Input v-model="form.sicalcTtamt" disabled></Input>
          </FormItem>
        </i-col>
        <!--<i-col span="11" >-->
        <!--<FormItem :label="$t('lang_sihfCalc.sihfCalc.sicalcStatus')">-->
        <!--<Input v-model="form.sicalcStatus" ></Input>-->
        <!--</FormItem>-->
        <!--</i-col>-->
        <i-col span="23">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.sicalcOptrecord')">
            <Input v-model="form.sicalcOptrecord" disabled type="textarea"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_sihfCalc.sihfCalc.sicalcComment')">
            <Input v-model="form.sicalcComment" type="textarea":disabled="this.$store.state.calcJsBase.dataType === 'change' ? true:false" ></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
    <Button v-show="opensav" class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
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
          _mt: 'sihfCalc.addOrUpd',
          sicalcPeriod: '',
          sicalcBfarea: '',
          sicalcRound: '',
          sicalcPersttamt: '',
          sicalcCompttamt: '',
          sicalcTtamt: '',
          sicalcOptrecord: '',
          sicalcComment: '',
          sicalcPeriodDis: '',
          sicalcBfareaDis: '',
          sicalcStatus: '02accounting',
        },
        benefitacctype: [],
        persttamtList: '',
        openPickPeriod: false,
        openPickCity: false,
        opensav: true,
        ruleValidate: {
          sicalcPeriod: [
            {required: true, message: this.$t('lang_sihfCalc.sihfCalc.sicalcPeriod'), trigger: 'change'},
          ],
          sicalcBfarea: [
            {required: true, message: this.$t('lang_sihfCalc.sihfCalc.sicalcBfarea'), trigger: 'change'},
          ],
          sicalcRound: [
            {required: true, message: this.$t('lang_sihfCalc.sihfCalc.sicalcRound'), trigger: 'change'},
          ],
        },
      }
    },
    props: {
      logType: String,
      index: Number,
    },
    mounted() {
      this.getSelect()
    },
    components: {
      searchFyperiod,
      searchArea,
    },
    methods: {
      getdata() {
        console.log(this.$store.state.calcJsBase.dataType)
        const t = this
        const params = {
          _mt: 'sihfCalc.getById',
          id: t.$store.state.calcJsBase.mainId,
          logType: '根据id查询',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.form.sicalcPeriod = res.data.content[0].sicalcPeriod
            this.form.sicalcBfarea = res.data.content[0].sicalcBfarea
            this.form.sicalcRound = res.data.content[0].sicalcRound
            this.form.sicalcPersttamt = res.data.content[0].sicalcPersttamt
            this.form.sicalcCompttamt = res.data.content[0].sicalcCompttamt
            this.form.sicalcTtamt = res.data.content[0].sicalcTtamt
            this.form.sicalcOptrecord = res.data.content[0].sicalcOptrecord
            this.form.sicalcComment = res.data.content[0].sicalcComment
            this.form.sicalcPeriodDis = res.data.content[0].sicalcPeriodDis
            this.form.sicalcBfareaDis = res.data.content[0].sicalcBfareaDis
            this.form.sicalcStatus = res.data.content[0].sicalcStatus
            t.$store.commit('calcJsBase/setMainId', res.data.content[0].id)
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
                if (t.$store.state.calcJsBase.mainId === undefined || t.$store.state.calcJsBase.mainId === '') {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$emit('newdata', res.data.content[0])
                  this.clear()
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
                t.$store.commit('calcJsBase/setMainId', res.data.content[0].id)
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
        this.form.sicalcPeriod = ''
        this.form.sicalcBfarea = ''
        this.form.sicalcRound = ''
        this.form.sicalcPersttamt = ''
        this.form.sicalcCompttamt = ''
        this.form.sicalcTtamt = ''
        this.form.sicalcOptrecord = ''
        this.form.sicalcComment = ''
        this.form.sicalcPeriodDis = ''
        this.form.sicalcBfareaDis = ''
        this.$store.commit('calcJsBase/setMainId', '')
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
        this.$refs.searchArea.getData()
        this.openPickCity = true
      },
      getSelect() {
        const t = this
        if (t.$store.state.calcJsBase.dataType === 'add') {
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
      changeinputCity(row) {
        const t = this
        t.form.sicalcBfareaDis = row.bfareaCname
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
    /*height: 550px;*/
    .btn {
      position: absolute;
      bottom: -15px;
      right: 20px;
    }
  }
</style>
