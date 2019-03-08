<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_approval.mailList.title')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form :model="form" label-position="right" :rules="ruleValidate"  :label-width="100" ref="form">
          <i-col span="11">
            <FormItem :label="$t('lang_approval.mailList.aprvmlOrder')" prop="aprvmlOrder">
                <Input v-model="form.aprvmlOrder" :placeholder="$t('lang_approval.mailList.aprvmlOrderDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_approval.mailList.aprvmlObject')" prop="aprvmlObject">
              <Input v-model="form.aprvmlObject" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_approval.mailList.aprvmlObjectDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23" >
            <FormItem :label="$t('lang_approval.mailList.aprvmlContent')" prop="aprvmlContent">
              <div id="ed"></div>
              <div id="txt" v-model="form.aprvmlContent" v-show="emailMes"></div>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_approval.mailList.aprvmlSendstyle')" prop="aprvmlSendstyle">
              <Select  v-model="form.aprvmlSendstyle">
                <Option :value="item.paramCode" v-for="(item,index) in sendType" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="23"></i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_approval.mailList.aprvmlIsencrypt')" prop="aprvmlIsencrypt">
              <RadioGroup  v-model="form.aprvmlIsencrypt">
                <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="11"  offset="1">
            <FormItem :label="$t('lang_approval.mailList.aprvmlIsvalid')" prop="aprvmlIsvalid">
              <RadioGroup  v-model="form.aprvmlIsvalid">
                <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="23" v-show="form.aprvmlIsvalid === '0'? true:false">
            <FormItem :label="$t('lang_approval.mailList.aprvmlInvreason')" prop="aprvmlInvreason">
              <Input v-model="form.aprvmlInvreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_approval.mailList.aprvmlInvreasonDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_approval.mailList.aprvmlComment')" prop="aprvmlComment">
              <Input v-model="form.aprvmlComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_approval.mailList.aprvmlCommentDis')"></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    </div>
  </div>
</template>
<script>
  import E from 'wangeditor'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  let editor = new E('#ed')
  export default {
    data() {
      return {
        emailMes: false,
        sendType: [],
        yesno: [],
        form: {
          _mt: 'platAprvmail.addOrUpd',
          aprvmlOrder: '',
          aprvmlObject: '',
          aprvmlContent: '',
          aprvmlSendstyle: '',
          aprvmlIsencrypt: '0',
          aprvmlIsvalid: '1',
          aprvmlInvreason: '',
          aprvmlComment: '',
          funId: '1',
          logType: '',
        },
        ruleValidate: {
          aprvmlOrder: [
            { required: true, message: this.$t('lang_approval.mailList.aprvmlOrderDis'), trigger: 'blur' },
          ],
          aprvmlObject: [
            { required: true, message: this.$t('lang_approval.mailList.aprvmlObjectDis'), trigger: 'blur' },
          ],
          aprvmlContent: [
            { required: true, message: this.$t('lang_approval.mailList.aprvmlContentDis'), trigger: 'blur' },
          ],
          aprvmlSendstyle: [
            { required: true, message: this.$t('lang_approval.mailList.aprvmlSendstyleDis'), trigger: 'blur' },
          ],
          aprvmlInvreason: [
            { required: true, message: this.$t('lang_approval.mailList.aprvmlInvreasonDis'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {
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
          _mt: 'platAprvmail.getById',
          id: id,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.aprvmlOrder = res.data.content[0].aprvmlOrder
            t.form.aprvmlObject = res.data.content[0].aprvmlObject
            t.form.aprvmlContent = res.data.content[0].aprvmlContent
            editor.txt.clear()
            editor.txt.append(t.form.aprvmlContent)
            t.form.aprvmlSendstyle = res.data.content[0].aprvmlSendstyle
            t.form.aprvmlIsencrypt = res.data.content[0].aprvmlIsencrypt
            t.form.aprvmlIsvalid = res.data.content[0].aprvmlIsvalid
            t.form.aprvmlInvreason = res.data.content[0].aprvmlInvreason
            t.form.aprvmlComment = res.data.content[0].aprvmlComment
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
          typeCode: 'yesno,approvesendmode',
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
        t.form.aprvmlContent = document.getElementById('txt').innerHTML
        const data = deepCopy(t.form)
        data.aprvmlAprvid = t.$store.state.platApproval.mainId
        if (!t.$store.state.platApproval.childId2) {
          data.logType = this.$t('button.add')
        } else {
          data.logType = this.$t('button.upd')
          data.id = t.$store.state.platApproval.childId2
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        // 调整校验
        if (t.form.aprvmlIsvalid === '1') {
          delete t.ruleValidate.aprvmlInvreason
        } else {
          t.ruleValidate.aprvmlInvreason = [
            { required: true, message: this.$t('lang_approval.mailList.aprvmlInvreasonDis'), trigger: 'blur' },
          ]
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.platApproval.childId2) {
                  t.$store.commit('platApproval/addNewArrayChildTable2', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$store.commit('platApproval/updateArrayChildTable2', res.data.content[0])
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
        t.form.aprvmlOrder = ''
        t.form.aprvmlObject = ''
        editor.txt.clear()
        t.form.aprvmlContent = ''
        t.form.aprvmlSendstyle = ''
        t.form.aprvmlIsencrypt = ''
        t.form.aprvmlIsvalid = ''
        t.form.aprvmlInvreason = ''
        t.form.aprvmlComment = ''
        t.$refs.form.resetFields()
      },
      close() {
        this.clear()
        this.$emit('hideMsg')
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
