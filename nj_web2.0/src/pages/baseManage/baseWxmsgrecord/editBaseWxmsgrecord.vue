<template>
  <div class="cover">
    <div class="box">
      <div  class="Box1">
        <!--:style="{height:tableheight + 'px'}"-->
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" style="overflow-y: scroll" :model="formValidate" :label-width="135">
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgTime')" prop="wxmsgTime">
            <Input v-model="formValidate.wxmsgTime" disabled></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgBustype')" prop="wxmsgBustype">
            <Input v-model="formValidate.wxmsgBustype"disabled ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgMsgtypeDis')" prop="wxmsgMsgtypeDis">
            <Input v-model="formValidate.wxmsgMsgtypeDis" disabled></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgDataid')" prop="wxmsgDataid">
            <Input v-model="formValidate.wxmsgDataid" disabled></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgSendee')" prop="wxmsgSendee">
            <Input v-model="formValidate.wxmsgSendee"disabled ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgTitle')" prop="wxmsgTitle">
            <Input v-model="formValidate.wxmsgTitle"disabled ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row style="position:relative;z-index: 0;">
          <Col span="23">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgContent')" prop="wxmsgContent">
            <Input v-model="formValidate.wxmsgContent" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgUrl')" prop="wxmsgUrl">
            <Input v-model="formValidate.wxmsgUrl"disabled ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgDatasource')" prop="wxmsgDatasource">
            <Input v-model="formValidate.wxmsgDatasource"disabled ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.comment')" prop="wxmsgComment">
            <Input v-model="formValidate.wxmsgComment" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
    </div>
  </div>
</template>
<script>
  import E from 'wangeditor'
  import { getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  let editor = new E('#editor')
  export default {
    data() {
      return {
        formValidate: { },
        tableheight: document.body.offsetHeight - 280,
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    updated() {

    },
    mounted() {
      editor.customConfig.onchange = function (html) {
        document.getElementById('txt').innerHTML = html
      }
      editor.create()
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseWxmsgrecord.getById',
          id: id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate = res.data.content[0]
//            editor.txt.append(t.formValidate.wxmsgContent)
//            document.getElementById('txt').innerHTML = t.formValidate.wxmsgContent
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset() {
        editor.txt.clear()
        this.$emit('closeUp')
      },
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  .Box1{
    overflow-y: scroll;
  }
</style>
