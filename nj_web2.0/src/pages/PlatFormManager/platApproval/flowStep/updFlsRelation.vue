<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_payroll.platAplInfo.flsRelation')}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="option-main">
        <Row>
          <Form ref="formValidate" :model="formValidate" label-position="right" :label-width="100">
            <i-col span="23">
              <FormItem :label="$t('lang_payroll.platAplInfo.apstrelConditiontitle')">
                <Input v-model="formValidate.apstrelConditiontitle" :placeholder="$t('lang_payroll.platAplInfo.apstrelConditiontitleIns')"></Input>
              </FormItem>
            </i-col>
            <i-col span="23">
              <FormItem :label="$t('lang_payroll.platAplInfo.apstrelConditiondis')">
                <Input v-model="formValidate.apstrelConditiondis" readonly="readonly" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.platAplInfo.apstrelConditiondisIns')" style="width: 85%;margin-right: 10px;"></Input>
              	<Button type="primary" @click="generConditionNow(NaN,$t('lang_payroll.platAplInfo.condion'))">{{$t('lang_payroll.platAplInfo.condion')}}</Button>
              </FormItem>
            </i-col>
            <i-col span="23">
              <FormItem :label="$t('lang_payroll.platAplInfo.apstrelCommment')">
                <Input v-model="formValidate.apstrelCommment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.platAplInfo.apstrelCommmentIns')"></Input>
              </FormItem>
            </i-col>
          </Form>
        </Row>
        <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
      </div>
    </div>
    <transition name="fade">
      <genrCondition v-show="openCondition"  @inputCondition="inputCondition"  @closeCondition="closeCondition"  ref="genrCondition"></genrCondition>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'
  import genrCondition from '../flowStep/genrCondition'
  import Bus from '../../../.././lib/bus'

  export default {
    data() {
      return {
        id: '', // 线的id
        transmitName: '',
        transmitValue: '',
        openCondition: false,
        formValidate: {
          _mt: 'platAprvsteprelation.addOrUpd',
          funId: '1',
          apstrelConditiontitle: '',
          apstrelCondition: '',
          apstrelConditiondis: '',
          apstrelCommment: '',
        },
      }
    },
    components: {
      genrCondition,
    },
    mounted() {
      Bus.$on('setAprvLineId', () => {
        this.getdata()
      })
    },
    methods: {
      /*
      * 修改时初始数据
      * */
      getdata() {
        const t = this
        const data = {
          _mt: 'platAprvsteprelation.getById',
          id: t.id,      //  步骤id
          funId: '1',
          logType: this.$t('button.ser'),
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            this.formValidate.apstrelConditiontitle = res.data.content[0].apstrelConditiontitle
            this.formValidate.apstrelCondition = res.data.content[0].apstrelCondition
            this.formValidate.apstrelConditiondis = res.data.content[0].apstrelConditiondis
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
      * 新增或者修改
      * */
      save() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = '修改'
        data.id = t.id
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (!t.id) {
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('reminder.addsuccess'),
              })
            } else {
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('reminder.updsuccess'),
              })
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      setLineId(id) {
        this.id = id
        this.getdata()
      },
      handleReset() {
        this.$emit('closeUp')
      },
      clear() {
      	this.formValidate.apstrelConditiontitle = ''
        this.formValidate.apstrelCondition = ''
        this.formValidate.apstrelConditiondis = ''
        this.flstepFlowDis = ''
        this.flstepName = ''
        this.flstepIsapprove = ''
        this.flstepApproveDis = ''
        this.formValidate.apstrelCommment = ''
        this.$refs.formValidate.resetFields()
      },
      generConditionNow(id) {
      	const t = this
      	if (t.formValidate.apstrelConditiondis && t.formValidate.apstrelCondition) {
      		t.transmitName = t.formValidate.apstrelConditiondis
	      	t.transmitValue = t.formValidate.apstrelCondition
	      	t.$refs.genrCondition.getData(t.transmitName, t.transmitValue)
      	}
      	t.openCondition = true
      },
      closeCondition() {
      	const t = this
      	t.openCondition = false
      },
      inputCondition(name, value) {
      	const t = this
      	t.formValidate.apstrelCondition = value
        t.formValidate.apstrelConditiondis = name
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd.scss";
  .option-main{
    position: relative;
    height: 500px;
    .btn{
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>
