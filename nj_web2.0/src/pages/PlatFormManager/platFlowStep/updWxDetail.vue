<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          {{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form :model="form" label-position="right" :rules="ruleValidate"  :label-width="100" ref="form">
          <i-col span="11">
            <FormItem :label="$t('lang_flow.weixin.flwxOrder')" prop="flwxOrder">
                <Input v-model="form.flwxOrder" :placeholder="$t('lang_flow.weixin.p_flwxOrder')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_flow.weixin.flwxType')" prop="flwxType">
              <Select  v-model="form.flwxType">
                <Option :value="item.paramCode" v-for="(item,index) in wxmsgtype" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_flow.weixin.flwxTitle')" v-if="form.flwxType === '02textcard'" prop="flwxTitle">
              <Input v-model="form.flwxTitle" :placeholder="$t('lang_flow.weixin.p_flwxTitle')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_flow.weixin.flwxContent')" prop="flwxContent">
              <Input v-model="form.flwxContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.weixin.p_flwxContent')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_flow.weixin.flwxLink')" v-if="form.flwxType === '02textcard'" prop="flwxLink">
              <Input v-model="form.flwxLink" :placeholder="$t('lang_flow.weixin.p_flwxLink')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_flow.weixin.flwxSendstyle')"  prop="flwxSendstyle">
              <Select  v-model="form.flwxSendstyle">
                <Option :value="item.paramCode" v-for="(item,index) in sendType" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_flow.weixin.flwxSendconditionDis')" prop="flwxSendconditionDis">
              <span @dblclick="clearCondition">
                 <Input v-model="form.flwxSendconditionDis" type="textarea" readonly="readonly" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.weixin.p_flwxSendconditionDis')" style="width: 85%;margin-right: 10px;"></Input>
            	</span>
              <Button type="primary" @click="generConditionNow(NaN,'条件设置')">{{$t('lang_flow.flowcommon.plat_condition')}}</Button>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_flow.weixin.flwxIsvalid')" prop="flwxIsvalid">
              <RadioGroup  v-model="form.flwxIsvalid">
                <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="23" v-show="form.flwxIsvalid ==='0'?true:false">
            <FormItem :label="$t('lang_flow.weixin.flwxInvreason')" prop="flwxInvreason">
              <Input v-model="form.flwxInvreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.weixin.p_flwxInvreason')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_flow.weixin.comment')" prop="comment">
              <Input v-model="form.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.weixin.p_comment')"></Input>
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
        wxmsgtype: [],
        openCondition: false,
        flwxSendstyleDis: '',
        flwxIsvalidDis: '',
        transmitName: '',
        transmitValue: '',
        form: {
          _mt: 'platFlswx.addOrUpd',
          id: '',
          flwxOrder: '',
          flwxContent: '',
          flwxSendstyle: '',
          flwxSendcondition: '',
          flwxSendconditionDis: '',
          flwxType: '',
          flwxTitle: '',
          flwxLink: '',
          flwxIsvalid: '1',
          flwxInvreason: '',
          comment: '',
          funId: '1',
          logType: '',
        },
        ruleValidate: {
          flwxOrder: [
            { required: true, message: this.$t('lang_flow.weixin.rule_flwxOrder'), trigger: 'blur' },
          ],
          flwxContent: [
            { required: true, message: this.$t('lang_flow.weixin.rule_flwxContent'), trigger: 'blur' },
          ],
          flwxSendstyle: [
            { required: true, message: this.$t('lang_flow.weixin.rule_flwxSendstyle'), trigger: 'blur' },
          ],
          flwxInvreason: [
            { required: true, message: this.$t('lang_flow.weixin.rule_flwxInvreason'), trigger: 'blur' },
          ],
          flwxType: [
            { required: true, message: this.$t('lang_flow.weixin.rule_flwxType'), trigger: 'change' },
          ],
          flwxTitle: [
            { required: true, message: this.$t('lang_flow.weixin.rule_flwxTitle'), trigger: 'blur' },
          ],
          flwxLink: [
            { required: true, message: this.$t('lang_flow.weixin.rule_flwxLink'), trigger: 'blur' },
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
          _mt: 'platFlswx.getById',
          id: id,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.flwxOrder = res.data.content[0].flwxOrder
            t.form.flwxContent = res.data.content[0].flwxContent
            t.form.flwxType = res.data.content[0].flwxType
            t.form.flwxTitle = res.data.content[0].flwxTitle
            t.form.flwxLink = res.data.content[0].flwxLink
            t.form.flwxSendcondition = res.data.content[0].flwxSendcondition
            t.form.flwxSendconditionDis = res.data.content[0].flwxSendconditionDis
            t.form.flwxSendstyle = res.data.content[0].flwxSendstyle
            t.flwxSendstyleDis = res.data.content[0].flwxSendstyleDis
            t.form.flwxIsvalid = res.data.content[0].flwxIsvalid
            t.flwxIsvalidDisDis = res.data.content[0].flwxIsvalidDisDis
            t.form.flwxInvreason = res.data.content[0].flwxInvreason
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
          typeCode: 'yesno,sendtype,wxmsgtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.yesno = res.data.content[0].value[0].paramList
            t.sendType = res.data.content[0].value[1].paramList
            t.wxmsgtype = res.data.content[0].value[2].paramList
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
        data.flwxStep = t.$store.state.flowStepData.mainId
        if (!t.id) {
          data.logType = '新增'
        } else {
          data.logType = '修改'
          data.id = t.id
        }
        if (data.flwxType !== '02textcard') {
          data.flwxTitle = ''
          data.flwxLink = ''
        }
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
        if (t.form.flwxIsvalid === '1') {
          delete t.ruleValidate.flwxInvreason
        } else {
          t.ruleValidate.flwxInvreason = [
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
        t.form.flwxOrder = ''
        t.form.flwxContent = ''
        t.form.flwxType = ''
        t.form.flwxTitle = ''
        t.form.flwxLink = ''
        t.form.flwxSendcondition = ''
        t.form.flwxSendconditionDis = ''
        t.form.flwxSendstyle = ''
        t.flwxSendstyleDis = ''
        t.form.flwxIsvalid = ''
        t.flwxIsvalidDis = ''
        t.form.flwxInvreason = ''
        t.form.comment = ''
        t.$refs.form.resetFields()
      },
      close() {
        this.clear()
        this.$emit('hideMsg')
      },
      generConditionNow(id) {
      	const t = this
      	if (t.form.flwxSendconditionDis && t.form.flwxSendcondition) {
      		t.transmitName = t.form.flwxSendconditionDis
	      	t.transmitValue = t.form.flwxSendcondition
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
      	t.form.flwxSendcondition = value
        t.form.flwxSendconditionDis = name
      },
      clearCondition() {
        const t = this
        t.form.flwxSendcondition = ''
        t.form.flwxSendconditionDis = ''
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
