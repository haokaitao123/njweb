<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>{{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form :model="form" label-position="right" :rules="ruleValidate"  :label-width="100" ref="form">
          <i-col span="11">
            <FormItem :label="$t('lang_flow.mail.flsmlOrder')" prop="flsmlOrder">
                <Input v-model="form.flsmlOrder" :placeholder="$t('lang_flow.mail.p_flsmlOrder')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_flow.mail.flsmlObject')" prop="flsmlObject">
              <Input v-model="form.flsmlObject" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.mail.p_flsmlObject')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23" >
            <FormItem :label="$t('lang_flow.mail.flsmlContent')" prop="flsmlContent" >
              <div id="editor"></div>
              <div id="txt" v-model="form.flsmlContent" v-show="emailMes"></div>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_flow.mail.flsmlSendstyle')" prop="flsmlSendstyle">
              <Select  v-model="form.flsmlSendstyle" :placeholder="$t('lang_flow.mail.p_flsmlSendstyle')">
                <Option :value="item.paramCode" v-for="(item,index) in sendType" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_flow.mail.flsmlSendconditionDis')" prop="flsmlSendconditionDis">
              <span @dblclick="clearCondition">
                <Input v-model="form.flsmlSendconditionDis" type="textarea" readonly="readonly" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.mail.p_flsmlSendconditionDis')" style="width: 85%;margin-right: 10px;"></Input>
              </span>
              <Button type="primary" @click="generConditionNow(NaN,'条件设置')">{{$t('lang_flow.flowcommon.plat_condition')}}</Button>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_flow.mail.flsmlIsencrypt')" prop="flsmlIsencrypt">
              <RadioGroup  v-model="form.flsmlIsencrypt">
                <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="11"  offset="1">
            <FormItem :label="$t('lang_flow.mail.flsmlIsvalid')" prop="flsmlIsvalid">
              <RadioGroup  v-model="form.flsmlIsvalid">
                <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="23" v-show="form.flsmlIsvalid ==='0'? true:false">
            <FormItem :placeholder="$t('lang_flow.mail.flsmlInvreason')" prop="flsmlInvreason">
              <Input v-model="form.flsmlInvreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.mail.p_flsmlInvreason')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_flow.mail.comment')" prop="comment">
              <Input v-model="form.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.mail.p_comment')"></Input>
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
  import E from 'wangeditor'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import genrCondition from './genrCondition'
//  import platSffieldPop from '../../../components/searchTable/platSffieldPop'
//  import baseLangPop from '../../../components/searchTable/baseLangPop'

  let editor = new E('#editor')
  export default {
    data() {
      return {
        emailMes: false,
        openCondition: false,
        sendType: [],
        yesno: [],
        flsmlReciever: '',
        flsmlCC: '',
        flsmlSendstyleDis: '',
        flsmlIsencryptDis: '',
        flsmlIsvalidDis: '',
        transmitName: '',
        transmitValue: '',
        form: {
          _mt: 'platFlsMail.addOrUpd',
          id: '',
          flsmlOrder: '',
          flsmlObject: '',
          flsmlContent: '',
          flsmlSendstyle: '',
          flsmlSendcondition: '',
          flsmlSendconditionDis: '',
          flsmlIsencrypt: '0',
          flsmlIsvalid: '1',
          flsmlInvreason: '',
          comment: '',
          funId: '1',
          logType: '',
        },
        ruleValidate: {
          flsmlOrder: [
            { required: true, message: this.$t('lang_flow.mail.rule_flsmlOrder'), trigger: 'blur' },
          ],
          flsmlObject: [
            { required: true, message: this.$t('lang_flow.mail.rule_flsmlObject'), trigger: 'blur' },
          ],
          flsmlContent: [
            { required: true, message: this.$t('lang_flow.mail.rule_flsmlContent'), trigger: 'blur' },
          ],
          flsmlSendstyle: [
            { required: true, message: this.$t('lang_flow.mail.rule_flsmlSendstyle'), trigger: 'blur' },
          ],
          flsmlInvreason: [
            { required: true, message: this.$t('lang_flow.mail.rule_flsmlInvreason'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {
    	genrCondition,
    },
    props: {
      logType: String,
    },
    mounted() {
      this.getSelect()
      editor.customConfig.onchange = function (html) {
        document.getElementById('txt').innerHTML = html
      }
      editor.customConfig.zIndex = 100
      editor.create()
    },
    methods: {
      getFormData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platFlsMail.getById',
          id: id,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.flsmlOrder = res.data.content[0].flsmlOrder
            t.form.flsmlObject = res.data.content[0].flsmlObject
            t.form.flsmlContent = res.data.content[0].flsmlContent
            editor.txt.clear()
            editor.txt.append(t.form.flsmlContent)
            t.form.flsmlSendcondition = res.data.content[0].flsmlSendcondition
            t.form.flsmlSendconditionDis = res.data.content[0].flsmlSendconditionDis
            t.form.flsmlSendstyle = res.data.content[0].flsmlSendstyle
            t.flsmlSendstyleDis = res.data.content[0].flsmlSendstyleDis
            t.form.flsmlIsencrypt = res.data.content[0].flsmlIsencrypt
            t.flsmlIsencryptDis = res.data.content[0].flsmlIsencryptDis
            t.form.flsmlIsvalid = res.data.content[0].flsmlIsvalid
            t.flsmlIsvalidDis = res.data.content[0].flsmlIsvalidDis
            t.form.flsmlInvreason = res.data.content[0].flsmlInvreason
            t.form.comment = res.data.content[0].comment
            t.flsmlReciever = res.data.content[0].flsmlReciever
            t.flsmlCC = res.data.content[0].flsmlCC
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
        t.form.flsmlContent = document.getElementById('txt').innerHTML
        const data = deepCopy(t.form)
        data.flsmlStep = t.$store.state.flowStepData.mainId
        if (!t.$store.state.flowStepData.childId3) {
          data.logType = '新增'
        } else {
          data.logType = '修改'
          data.id = t.$store.state.flowStepData.childId3
        }
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
        if (t.form.flsmlIsvalid === '1') {
          delete t.ruleValidate.flsmlInvreason
        } else {
          t.ruleValidate.flsmlInvreason = [
            { required: true, message: this.$t('lang_flow.mail.rule_flsmlInvreason'), trigger: 'blur' },
          ]
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.flowStepData.childId3) {
                  t.$store.commit('flowStepData/addNewArrayChildTable3', res.data.content[0])
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
        t.form.flsmlOrder = ''
        t.form.flsmlObject = ''
        t.form.flsmlContent = ''
        t.form.flsmlSendcondition = ''
        t.form.flsmlSendconditionDis = ''
        t.form.flsmlIsencrypt = ''
        t.flsmlIsencryptDis = ''
        t.form.flsmlSendstyle = ''
        t.flsmlSendstyleDis = ''
        t.form.flsmlIsvalid = ''
        t.flsmlIsvalidDis = ''
        t.flsmlCC = ''
        t.$refs.form.resetFields()
      },
      close() {
        editor.txt.clear()
        this.clear()
        this.$emit('hideMsg')
      },
      generConditionNow(id) {
      	const t = this
      	if (t.form.flsmlSendconditionDis && t.form.flsmlSendcondition) {
      		t.transmitName = t.form.flsmlSendconditionDis
	      	t.transmitValue = t.form.flsmlSendcondition
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
      	t.form.flsmlSendcondition = value
        t.form.flsmlSendconditionDis = name
      },
      clearCondition() {
        const t = this
        t.form.flsmlSendcondition = ''
        t.form.flsmlSendconditionDis = ''
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
