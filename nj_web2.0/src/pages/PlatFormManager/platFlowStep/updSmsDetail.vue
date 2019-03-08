<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form :model="form" label-position="right" :rules="ruleValidate"  :label-width="100" ref="form">
          <i-col span="11">
            <FormItem :label="$t('lang_flow.SMS.flsmsOrder')" prop="flsmsOrder">
                <Input v-model="form.flsmsOrder" :placeholder="$t('lang_flow.SMS.p_flsmsOrder')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_flow.SMS.flsmsContent')"  prop="flsmsContent">
              <Input v-model="form.flsmsContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.SMS.p_flsmsContent')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_flow.SMS.flsmsSendstyle')"  prop="flsmsSendstyle">
              <Select  v-model="form.flsmsSendstyle" :placeholder="$t('lang_flow.SMS.p_flsmlSendstyle')">
                <Option :value="item.paramCode" v-for="(item,index) in sendType" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_flow.SMS.flsmsSendconditionDis')" prop="flsmsSendconditionDis">
              <span @dblclick="clearCondition">
                 <Input v-model="form.flsmsSendconditionDis" type="textarea" readonly="readonly" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.SMS.p_flsmlSendconditionDis')" style="width: 85%;margin-right: 10px;"></Input>
            	</span>
              <Button type="primary" @click="generConditionNow(NaN,'条件设置')">{{$t('lang_flow.flowcommon.plat_condition')}}</Button>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_flow.SMS.flsmsIsvalid')" prop="flsmsIsvalid">
              <RadioGroup  v-model="form.flsmsIsvalid">
                <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="23" v-show="form.flsmsIsvalid ==='0'?true:false">
            <FormItem :label="$t('lang_flow.SMS.flsmsInvreason')" prop="flsmsInvreason">
              <Input v-model="form.flsmsInvreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.SMS.p_flsmlInvreason')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_flow.SMS.comment')" prop="comment">
              <Input v-model="form.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.SMS.p_comment')"></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
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

  export default {
    data() {
      return {
        sendType: [],
        yesno: [],
        openCondition: false,
        flsmsSendstyleDis: '',
        flsmsIsvalidDis: '',
        transmitName: '',
        transmitValue: '',
        form: {
          _mt: 'platFlsSMS.addOrUpd',
          id: '',
          flsmsOrder: '',
          flsmsContent: '',
          flsmsSendstyle: '',
          flsmsSendcondition: '',
          flsmsSendconditionDis: '',
          flsmsIsvalid: '1',
          flsmsInvreason: '',
          comment: '',
          funId: '1',
          logType: '',
        },
        ruleValidate: {
          flsmsOrder: [
            { required: true, message: this.$t('lang_flow.SMS.rule_flsmsOrder'), trigger: 'blur' },
          ],
          flsmsContent: [
            { required: true, message: this.$t('lang_flow.SMS.rule_flsmsContent'), trigger: 'blur' },
          ],
          flsmsSendstyle: [
            { required: true, message: this.$t('lang_flow.SMS.rule_flsmsSendstyle'), trigger: 'blur' },
          ],
          flsmsInvreason: [
            { required: true, message: this.$t('lang_flow.SMS.rule_flsmsInvreason'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {
    	genrCondition,
    },
    mounted() {
      this.getSelect()
    },
    props: {
      logType: String,
    },
    methods: {
      getFormData(id) {
        const t = this
        t.id = id
        if (t.id === '') return
        getDataLevelUserLogin({
          _mt: 'platFlsSMS.getById',
          id: id,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.flsmsOrder = res.data.content[0].flsmsOrder
            t.form.flsmsContent = res.data.content[0].flsmsContent
            t.form.flsmsSendcondition = res.data.content[0].flsmsSendcondition
            t.form.flsmsSendconditionDis = res.data.content[0].flsmsSendconditionDis
            t.form.flsmsSendstyle = res.data.content[0].flsmsSendstyle
            t.flsmsSendstyleDis = res.data.content[0].flsmsSendstyleDis
            t.form.flsmsIsvalid = res.data.content[0].flsmsIsvalid
            t.flsmsIsvalidDisDis = res.data.content[0].flsmsIsvalidDisDis
            t.form.flsmsInvreason = res.data.content[0].flsmsInvreason
            t.form.comment = res.data.content[0].comment
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno,sendtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.yesno = res.data.content[0].value[0].paramList
            t.sendType = res.data.content[0].value[1].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const data = deepCopy(t.form)
        data.flsmsStep = t.$store.state.flowStepData.mainId
        if (!t.id) {
          data.logType = '新增'
        } else {
          data.logType = '修改'
          data.id = t.id
        }
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
        if (t.form.flsmsIsvalid === '1') {
          delete t.ruleValidate.flsmsInvreason
        } else {
          t.ruleValidate.flsmsInvreason = [
            { required: true, message: '请输入失效原因', trigger: 'blur' },
          ]
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.flowStepData.childId6) {
                  t.$store.commit('flowStepData/addNewArrayChildTable6', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$store.commit('flowStepData/updateArrayChildTable6', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                }
                t.clear()
                t.close()
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
      clear() {
        const t = this
        t.form.id = ''
        t.id = ''
        t.form.flsmsOrder = ''
        t.form.flsmsContent = ''
        t.form.flsmsSendcondition = ''
        t.form.flsmsSendconditionDis = ''
        t.form.flsmsSendstyle = ''
        t.flsmsSendstyleDis = ''
        t.form.flsmsIsvalid = ''
        t.flsmsIsvalidDis = ''
        t.form.flsmsInvreason = ''
        t.form.comment = ''
        t.$refs.form.resetFields()
      },
      close() {
        this.clear()
        this.$emit('hideMsg')
      },
      generConditionNow(id) {
      	const t = this
      	if (t.form.flsmsSendconditionDis && t.form.flsmsSendcondition) {
      		t.transmitName = t.form.flsmsSendconditionDis
	      	t.transmitValue = t.form.flsmsSendcondition
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
      	t.form.flsmsSendcondition = value
        t.form.flsmsSendconditionDis = name
      },
      clearCondition() {
        const t = this
        t.form.flsmsSendcondition = ''
        t.form.flsmsSendconditionDis = ''
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .box{
    height: 550px;
    overflow:hidden;
  .content{
    left: 20px;
    right: 20px;
    overflow-y: auto;
    position: absolute;
    height: 400px;
  }
  }
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
