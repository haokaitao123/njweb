<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;步骤关系设置
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="option-main">
        <Row>
          <Form ref="formValidate" :model="formValidate" label-position="right" :label-width="100">
            <i-col span="23">
              <FormItem label="条件标题">
                <Input v-model="formValidate.flsrelConditiontitle" placeholder="请输入条件标题..."></Input>
              </FormItem>
            </i-col>
            <i-col span="23">
              <FormItem label="条件">
                <Input v-model="formValidate.flsrelConditionDis" readonly="readonly" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请设置生成条件..." style="width: 85%;margin-right: 10px;"></Input>
              	<Button type="primary" @click="generConditionNow(NaN,'条件设置')">条件设置</Button>
              </FormItem>
            </i-col>
            <i-col span="23">
              <FormItem label="备注">
                <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注..."></Input>
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
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import genrCondition from './genrCondition'
  import Bus from '../../.././lib/bus'
  export default {
    data() {
      return {
        id: '', // 线的id
        transmitName: '',
        transmitValue: '',
        openCondition: false,
        formValidate: {
          _mt: 'platFlsRelation.addOrUpd',
          funId: '1',
          flsrelConditiontitle: '',
          flsrelCondition: '',
          flsrelConditionDis: '',
          comment: '',
        },
      }
    },
    components: {
      genrCondition,
    },
    mounted() {
      Bus.$on('setLineId', () => {
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
          _mt: 'platFlsRelation.getById',
          id: t.id,      //  步骤id
          funId: '1',
          logType: this.$t('button.ser'),
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            this.formValidate.flsrelConditiontitle = res.data.content[0].flsrelConditiontitle
            this.formValidate.flsrelCondition = res.data.content[0].flsrelCondition
            this.formValidate.flsrelConditionDis = res.data.content[0].flsrelConditionDis
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
      },
      handleReset() {
        this.$emit('closeUp')
      },
      clear() {
      	this.formValidate.flsrelConditiontitle = ''
        this.formValidate.flstepCode = ''
        this.formValidate.flstepDisorder = ''
        this.formValidate.flsrelCondition = ''
        this.formValidate.flsrelConditionDis = ''
        this.flstepFlowDis = ''
        this.flstepCnName = ''
        this.flstepEnName = ''
        this.flstepIsapprove = ''
        this.flstepApproveDis = ''
        this.formValidate.comment = ''
        this.$refs.formValidate.resetFields()
      },
      generConditionNow(id) {
      	const t = this
      	if (t.formValidate.flsrelConditionDis && t.formValidate.flsrelCondition) {
      		t.transmitName = t.formValidate.flsrelConditionDis
	      	t.transmitValue = t.formValidate.flsrelCondition
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
      	t.formValidate.flsrelCondition = value
        t.formValidate.flsrelConditionDis = name
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
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
