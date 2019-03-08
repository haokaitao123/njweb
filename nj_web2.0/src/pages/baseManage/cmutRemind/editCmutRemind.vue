<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="option-main">
        <Row style="max-height: 420px;overflow-y: auto;">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
              <i-col span="11" >
                <FormItem label="发送时间" prop="msgTime"  >
                  <Input readonly v-model="formValidate.msgTime" ></Input>
                </FormItem>
              </i-col>
              <i-col span="11" offset="1">
                <FormItem label="业务类型" prop="msgBustype">
                  <Input readonly v-model="formValidate.msgBustype" ></Input>
                </FormItem>
              </i-col>
              <i-col span="11" >
                <FormItem label="单据" prop="msgDataid" >
                  <Input readonly v-model="formValidate.msgDataid" ></Input>
                </FormItem>
              </i-col>
              <i-col span="11" offset="1"  >
                <FormItem label="接收人" prop="msgSendee" >
                  <Input readonly v-model="formValidate.msgSendee" ></Input>
                </FormItem>
              </i-col>
              <i-col span="23">
                <FormItem label="消息标题" prop="msgTitle"  >
                  <Input v-model="formValidate.msgTitle" ></Input>
                </FormItem>
              </i-col>
              <i-col span="11">
                <FormItem label="是否阅读" prop="msgReadflag" >
                  <RadioGroup v-model="formValidate.msgReadflag" placeholder="选择是否有效">
                    <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" key="index">{{item.paramInfoName}}</Radio>
                  </RadioGroup>
                </FormItem>
              </i-col>
              <i-col span="11" offset="1">
                <FormItem label="是否极光推送" prop="msgJpush" >
                  <RadioGroup v-model="formValidate.msgJpush" placeholder="选择是否极光推送">
                    <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" key="index">{{item.paramInfoName}}</Radio>
                  </RadioGroup>
                </FormItem>
              </i-col>
            <i-col span="23">
              <FormItem label="消息数据来源" prop="msgDatasource" >
                <Input readonly v-model="formValidate.msgDatasource" ></Input>
              </FormItem>
            </i-col>
              <i-col span="11" >
                <FormItem label="推送平台" prop="msgJpushplatform" >
                  <Input readonly v-model="formValidate.msgJpushplatform" ></Input>
                </FormItem>
              </i-col>
              <i-col span="11" offset="1">
                <FormItem label="推送类型" prop="msgJpushtype" >
                  <Input readonly v-model="formValidate.msgJpushtype" ></Input>
                </FormItem>
              </i-col>
              <i-col span="11">
                <FormItem label="推送状态" prop="msgJpushstatus">
                  <Input readonly v-model="formValidate.msgJpushstatus" ></Input>
                </FormItem>
              </i-col>
              <i-col span="23">
                <FormItem label="推送错误信息" prop="msgJpusherror">
                  <Input readonly v-model="formValidate.msgJpusherror" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
                </FormItem>
              </i-col>
              <i-col span="23">
                <FormItem label="备注" prop="msgComment">
                  <Input readonly v-model="formValidate.msgComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
                </FormItem>
              </i-col>
          </Form>
        </Row>
        <Button type="ghost" @click="handleReset" class="btn">取消</Button>
      </div>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        radioYesOrNo: [],
        formValidate: {
          msgBustype: '',
          msgDataid: '',
          msgSendee: '',
          msgTitle: '',
          msgContent: '',
          msgDatasource: '',
          msgJpushplatform: '',
          msgJpushtype: '',
          msgJpusherror: '',
          msgJpushstatus: '',
          msgComment: '',
          msgJpush: '1',
          msgReadflag: '1',
        },
        ruleValidate: {
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    updated() {

    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseMsgrecord.getById',
          id: id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.msgTime = res.data.content[0].msgTime
            t.formValidate.msgBustype = res.data.content[0].msgBustype
            t.formValidate.msgDataid = res.data.content[0].msgDataid
            t.formValidate.msgSendee = res.data.content[0].msgSendee
            t.formValidate.msgTitle = res.data.content[0].msgTitle
            t.formValidate.msgContent = res.data.content[0].msgContent
            t.formValidate.msgDatasource = res.data.content[0].msgDatasource
            t.formValidate.msgJpush = res.data.content[0].msgJpush
            t.formValidate.msgJpushplatform = res.data.content[0].msgJpushplatform
            t.formValidate.msgJpushtype = res.data.content[0].msgJpushtype
            t.formValidate.msgJpushstatus = res.data.content[0].msgJpushstatus
            t.formValidate.msgJpusherror = res.data.content[0].msgJpusherror
            t.formValidate.msgComment = res.data.content[0].msgComment
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset() {
        this.$emit('closeUp')
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.radioYesOrNo = res.data.content[0].value[0].paramList
          }
        }).catch((res) => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: res,
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
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
