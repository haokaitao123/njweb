<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="option-main">
        <Row style="max-height: 420px;overflow-y: auto;">
          <Form ref="form" :model="form" :rules="ruleValidate" :label-width="110">
            <i-col span="10">
              <FormItem :label="$t('薪资期间')" prop="paccPeriod">

                <Input v-model="form.paccPeriod" :disabled="logType === $t('button.view')?true:false"  :placeholder="$t('请输入薪资期间')"></Input>
              </FormItem>
            </i-col>
            <i-col span="10">
              <FormItem :label="$t('账套名称')" prop="paccComment">
                <Input v-model="form.paccComment" :disabled="logType === $t('button.view')?true:false"  :placeholder="$t('请输入薪资账套名称')"></Input>
              </FormItem>
            </i-col>
            <i-col span="10">
              <FormItem :label="$t('账套类型')" prop="paccOptrecord">
                <Input v-model="form.paccOptrecord" :disabled="logType === $t('button.view')?true:false"  :placeholder="$t('请输入薪资账套类型')"></Input>
              </FormItem>
            </i-col>
            <i-col span="10">
              <FormItem :label="$t('账套状态')" prop="stateDis">
                <Input v-model="form.stateDis" :disabled="logType === $t('button.view')?true:false"  :placeholder="$t('薪资账套状态')"></Input>
              </FormItem>
            </i-col>
            <i-col span="21" v-show="id ? true : false">
              <FormItem :label="$t('lang_payroll.payAccount.paccOptrecord')" prop="paccOptrecord">
                <Input v-model="form.paccType" :disabled="logType === $t('button.view')?true:false" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payAccount.paccOptrecordDis')"></Input>
              </FormItem>
            </i-col>
            <i-col span="21">
              <FormItem :label="$t('lang_payroll.payAccount.paccComment')" prop="paccComment">
                <Input v-model="form.paccType" :disabled="logType === $t('button.view')?true:false" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payAccount.paccCommentDis')"></Input>
              </FormItem>
            </i-col>
          </Form>
         </Row>
        <Button class="btn1" v-show="logType === $t('button.add')?true:false" type="ghost" @click="handleReset">{{$t('button.cal')}}</Button>
        <Button class="btn"  v-show="logType === $t('button.add')?true:false" type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
      </div>
    </div>
    <transition name="fade">
      <searchFyperiod v-show="openFyperiod"  @closeUp="closeFyperiod" @changeinput="inputFyperiod" ref="searchFyperiod"></searchFyperiod>
    </transition>
  </div>
</template>
<script>
  import searchFyperiod from '../../../components/searchTable/searchFyperiod'
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        openFyperiod: false,
        form: {
          paccStatus: '02accounting',  // 新增,状态默认核算中
        },
        paccPeriodDis: '',
        ruleValidate: {
          paccPeriod: [
            { required: true, message: this.$t('lang_payroll.payAccount.paccPeriodDis'), trigger: 'blur' },
          ],
          paccSalaryset: [
            { required: true, message: this.$t('lang_payroll.payAccount.paccSalarysetDis'), trigger: 'blur' },
          ],
          paccRound: [
            { required: true, message: this.$t('lang_payroll.payAccount.paccRoundDis'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {
      searchFyperiod,
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
      RoundType: Array,
      Salaryset: Array,
      Calstatus: Array,
      currencyObj: Object, // 薪资账套和本位币的对应关系
    },
    mounted() {
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'payAccount.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form = res.data.content[0]
            t.paccPeriodDis = res.data.content[0].paccPeriodDis
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.form)
        data._mt = 'payAccount.addOrUpd'
        data.logType = t.logType
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                t.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: this.$t('reminder.addsuccess'),
                })
                t.$refs.form.resetFields()
                t.$emit('getData', res.data.content[0])
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
      // 新增的时候根据薪资账套，获取本位币
      changeCurrency(index) {
        const t = this
        if (index) {
          t.form.paccLocalcurrency = t.currencyObj[index].payssLocalcurrency
          t.form.paccLocalcurrencyDis = t.currencyObj[index].payssLocalcurrencyDis
        }
      },
      // 选择期间
      pickFyperiod() {
        const t = this
        t.$refs.searchFyperiod.getData()
        t.openFyperiod = true
      },
      inputFyperiod(row) {
        const t = this
        t.paccPeriodDis = row.fypdPeriod
        t.form.paccPeriod = row.id
        t.form.paccPeriodname = row.fypdPeriod
      },
      clearFyperiod() {
        const t = this
        t.paccPeriodDis = ''
        t.form.paccPeriod = ''
        t.form.paccPeriodname = ''
      },
      closeFyperiod() {
        const t = this
        t.openFyperiod = false
        t.$refs.searchFyperiod.fypdYear = ''
      },
      handleReset() {
        const t = this
        t.form = {
          paccStatus: '02accounting',  // 新增,状态默认核算中
        }
        t.paccPeriodDis = ''
        t.$refs.form.resetFields()
        t.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .cover{
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box{
      position:relative;
      width: 900px;
      background-color: #fff;
      padding: 60px 0px 30px 20px;
      border-radius: 10px;
      .form{
        max-height: 800px;
        overflow-y: auto;
      }
      .title{
        display: flex;
        position: absolute;
        height: 40px;
        width: 100%;
        line-height: 40px;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        top: 0;
        border-bottom: 1px solid #efefef;
        left: 0;
        .title-text{
          font-weight: bold;
          font-size: 14px;
        }
      }
    }
  }
  .option-main{
    position: relative;
    height: 380px;
    .btn{
      position: absolute;
      bottom: 20px;
      right: 105px;
    }
    .btn1{
      position: absolute;
      bottom: 20px;
      right: 170px;
    }
  }
</style>
