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
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
          <Col span="11" >
          <FormItem :label="$t('lang_baseManage.smsrecord.smsTime')" prop="smsTime">
            <Input readonly v-model="formValidate.smsTime" ></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_baseManage.smsrecord.smsPhones')" prop="smsPhones">
            <Input readonly v-model="formValidate.smsPhones" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_baseManage.smsrecord.smsContent')" prop="smsContent">
            <Input readonly v-model="formValidate.smsContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_baseManage.smsrecord.smsStatus')" prop="smsStatus">
            <Input readonly v-model="formValidate.smsStatus" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_baseManage.smsrecord.smsError')" prop="smsError">
            <Input readonly v-model="formValidate.smsError" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_baseManage.smsrecord.smsDatasource')" prop="smsDatasource">
            <Input readonly v-model="formValidate.smsDatasource" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_baseManage.smsrecord.comment')" prop="comment">
            <Input readonly v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
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
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        formValidate: {
          smsTime: '',
          smsPhones: '',
          smsContent: '',
          smsStatus: '',
          smsError: '',
          smsDatasource: '',
          comment: '',
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
          _mt: 'baseSmsrecord.getSmsInfoById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.smsTime = res.data.content[0].smsTime
            t.formValidate.smsPhones = res.data.content[0].smsPhones
            t.formValidate.smsContent = res.data.content[0].smsContent
            t.formValidate.smsStatus = res.data.content[0].smsStatus
            t.formValidate.smsError = res.data.content[0].smsError
            t.formValidate.smsDatasource = res.data.content[0].smsDatasource
            t.formValidate.comment = res.data.content[0].comment
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
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.formValidate.resetFields()
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
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
      handleReset() {
        this.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
