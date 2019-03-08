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
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_communication.cmutImmsgLog.imsgSender')" prop="imsgSenderDis">
            <Input readonly v-model="formValidate.imsgSenderDis" ></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_communication.cmutImmsgLog.imsgReceiver')" prop="imsgReceiverDis">
            <Input readonly v-model="formValidate.imsgReceiverDis"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" >
          <FormItem :label="$t('lang_communication.cmutImmsgLog.imsgGroup')" prop="imsgGroupDis">
            <Input readonly v-model="formValidate.imsgGroupDis" ></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_communication.cmutImmsgLog.imsgSendtime')" prop="imsgSendtime">
            <Input readonly v-model="formValidate.imsgSendtime" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_communication.cmutImmsgLog.imsgMessagetype')" prop="imsgMessagetypeDis">
            <Input readonly v-model="formValidate.imsgMessagetypeDis"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_communication.cmutImmsgLog.imsgContype')" prop="imsgContypeDis">
            <Input readonly v-model="formValidate.imsgContypeDis" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_communication.cmutImmsgLog.imsgContent')" prop="imsgContent">
            <Input readonly v-model="formValidate.imsgContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_communication.cmutImmsgLog.imsgIsread')" prop="imsgIsreadDis">
            <Input readonly v-model="formValidate.imsgIsreadDis"></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        formValidate: {
          imsgSenderDis: '',
          imsgSendtime: '',
          imsgReceiverDis: '',
          imsgGroupDis: '',
          imsgMessagetypeDis: '',
          imsgContent: '',
          imsgContypeDis: '',
          imsgIsreadDis: '',
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
          _mt: 'cmutImmsg.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.imsgSenderDis = res.data.content[0].imsgSenderDis
            t.formValidate.imsgSendtime = res.data.content[0].imsgSendtime
            t.formValidate.imsgReceiverDis = res.data.content[0].imsgReceiverDis
            t.formValidate.imsgGroupDis = res.data.content[0].imsgGroupDis
            t.formValidate.imsgMessagetypeDis = res.data.content[0].imsgMessagetypeDis
            t.formValidate.imsgContent = res.data.content[0].imsgContent
            t.formValidate.imsgContypeDis = res.data.content[0].imsgContypeDis
            t.formValidate.imsgIsreadDis = res.data.content[0].imsgIsreadDis
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
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
