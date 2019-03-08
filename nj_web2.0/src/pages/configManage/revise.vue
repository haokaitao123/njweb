<template>
  <!-- 修改	页面 -->
  <div class="cover">
    <div class="box" style="min-width: 900px;">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;修改
        </div>
        <Button type="text" @click="closeRes">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div>
        <Tabs type="card" :value="tabnum" @on-click="chose" style="max-height:434px; ">
          <!-- 调查信息 -->
          <TabPane :label="$t('lang_role.suvadmin.information')" name="1"></TabPane>
          <!-- 调查问题 -->
          <TabPane :label="$t('lang_role.suvadmin.classification')" name="2"
                   :disabled="researchMes.platSuvStyle==='p_suvstyle_01' || researchMes.platSuvStyle==='p_suvstyle_03'">
          </TabPane>
          <!-- 调查问题 -->
          <TabPane :label="$t('lang_role.suvadmin.label')" name="3"></TabPane>
          <!-- 调查答案信息 -->
          <TabPane :label="$t('lang_role.suvadmin.label2')" name="4"></TabPane>
          <!-- 调查表变量 -->
          <TabPane :label="$t('lang_role.suvadmin.label3')" name="5"></TabPane>
        </Tabs>
        <stepTwo style="height:434px; overflow-y: scroll;" ref="stepTwo" v-show="showpage1" :logType="logType" :id="id"
                 :index="index" :researchMes="researchMes" @getStyle="getStyle"></stepTwo>
        <stepClass style="height:434px;" ref="stepClass" v-if="showpage2" :suvid="mesId"
                   :styleCode="platSuvStyle"></stepClass>
        <stepQue style="height:434px;" ref="stepQue" v-if="showpage3" :suvid="mesId" :ansType="ansType"
                 :styleCode="platSuvStyle"></stepQue>
        <stepAns style="height:434px;" ref="stepAns" v-if="showpage4" :suvid="mesId"
                 :styleCode="platSuvStyle"></stepAns>
        <stepVary style="height:434px;" ref="stepVary" v-if="showpage5" :suvid="mesId"
                  :styleCode="platSuvStyle"></stepVary>
      </div>
      <Row style="margin-top:20px;">
        <Col span="23">
        <Row type="flex" justify="end">
          <Button type="primary" class="margin20" v-if="showpage1" @click="reSave">{{$t('button.sav')}}</Button>
          <Button type="ghost" @click="closeRes">取消</Button>
        </Row>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import stepTwo from './stepTwo'
  import stepClass from './stepThreeClass'
  import stepQue from './stepThreeQue'
  import stepAns from './stepThreeAns'
  import stepVary from './stepThreeVary'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLogin2} from '../../axios/axios'
  import {isSuccess, deepCopy} from '../../lib/util'

  export default {
    data() {
      return {
        showpage1: true,
        showpage2: false,
        showpage3: false,
        showpage4: false,
        showpage5: false,
        tabnum: '1',
        mesId: '',             //  调查信息id
        platSuvStyle: '',
      }
    },
    props: {
      logType: String,
      id: Number,
      index: Number,
      researchMes: Object,
      ansType: Array,
    },
    components: {
      stepTwo,
      stepQue,
      stepAns,
      stepVary,
      stepClass,
    },
    mounted() {
      this.mesId = this.researchMes.id
      this.getMes()
    },
    methods: {
      getMes() {
        if (this.showpage1 === true) {
          // this.$refs.stepTwo.newGay()
        }
      },
      chose(value) {
        const t = this
        value = Number(value)
        switch (value) {
          case 1:
            t.showpage1 = true
            t.showpage2 = false
            t.showpage3 = false
            t.showpage4 = false
            t.showpage5 = false
            break
          case 2:
            t.showpage2 = true
            t.showpage1 = false
            t.showpage3 = false
            t.showpage4 = false
            t.showpage5 = false
            break
          case 3:
            t.showpage3 = true
            t.showpage1 = false
            t.showpage2 = false
            t.showpage4 = false
            t.showpage5 = false
            break
          case 4:
            t.showpage4 = true
            t.showpage1 = false
            t.showpage2 = false
            t.showpage3 = false
            t.showpage5 = false
            break
          case 5:
            t.showpage5 = true
            t.showpage1 = false
            t.showpage2 = false
            t.showpage3 = false
            t.showpage4 = false
            break
        }
        this.showpage = value
      },
      closeRes() {
        this.$emit('closeRes')
      },
      // 保存方法
      reSave() {
        const t = this
        t.$refs.stepTwo.form.platSuvContent = document.getElementById('txtCon').innerHTML           //  正文
        t.$refs.stepTwo.form.platSuvOptdesc = document.getElementById('txtDes').innerHTML           //  选项说明
        t.$refs.stepTwo.form.platSuvBottom = document.getElementById('txtEnd').innerHTML     //  末尾
        t.$refs.stepTwo.form.platSuvSuggestitle = document.getElementById('txtSuggest').innerHTML   //  建议标题
        t.$refs.stepTwo.$refs.form.validate((valid) => {
          if (valid) {
            t.$refs.stepTwo.form.platSuvGentime = t.$refs.stepTwo.form.platSuvGentime.format('yyyy-MM-dd')
            const data = deepCopy(t.$refs.stepTwo.form)
            // console.log(data)
            for (const dat in data) {
              if (data[dat] === '') {
                delete data[dat]
              }
            }
            data.logType = t.logType
            if (t.logType === this.$t('button.upd')) {
              data.id = t.id
            }
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: this.$t('reminder.updsuccess'),
                })
                t.$emit('update', res.data.content[0])
                t.closeRes()
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
      getStyle(obj) {
        this.platSuvStyle = obj
      }
    },
  }
</script>

<style lang="scss" scoped="">
  @import "../../sass/updateAndAdd";

  .content {
    padding: 30px 10px 20px 10px;
  }

  .margin20 {
    margin-right: 5px;
  }

  .ivu-tabs-content .ivu-tabs-content-animated {
    display: none !important;
  }
</style>
