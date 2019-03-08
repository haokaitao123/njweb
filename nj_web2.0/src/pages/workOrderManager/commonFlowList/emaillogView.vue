<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;邮件信息
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div :style="{height: divheight + 'px',overflow: 'auto'}">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
          <Col span="11" >
          <FormItem :label="$t('lang_homePage.mailMsg.mailTime')" prop="mailTime">
            <Input readonly v-model="formValidate.mailTime" ></Input>
          </FormItem>
          </Col>
          <Col span="23">
          <FormItem :label="$t('lang_homePage.mailMsg.mailObject')" prop="mailObject">
            <Input readonly v-model="formValidate.mailObject"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"  ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23" >
          <FormItem :label="$t('lang_homePage.mailMsg.mailTo')" prop="mailTo">
            <Input readonly v-model="formValidate.mailTo"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"  ></Input>
          </FormItem>
          </Col>
          <Col span="23">
          <FormItem :label="$t('lang_homePage.mailMsg.mailCc')" prop="mailCc">
            <Input readonly v-model="formValidate.mailCc"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"  ></Input>
          </FormItem>
          </Col>
        </Row>
        <!--<Row>-->
          <!--<Col span="23">-->
          <!--<FormItem label="邮件内容" prop="mailContent">-->
            <!--<Input readonly v-model="formValidate.mailContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>-->
          <!--</FormItem>-->
          <!--</Col>-->
        <!--</Row>-->
        <Row style="position:relative;z-index: 0;">
          <Col span="23" >
          <FormItem :label="$t('lang_homePage.mailMsg.mailContent')" prop="mailContent">
            <div :id="'editor'+ty" style="z-index: 0;"></div>
            <div id="txt" v-model="formValidate.mailContent" v-show="false"></div>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <!--<Col span="23">-->
          <!--<FormItem label="附件" prop="mailAffixName">-->
            <!--<Input readonly v-model="formValidate.mailAffixName" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>-->
          <!--</FormItem>-->
          <!--</Col>-->
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_homePage.mailMsg.mailStatus')" prop="mailStatus">
            <Input readonly v-model="formValidate.mailStatus" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_homePage.mailMsg.mailError')" prop="mailError">
            <Input readonly v-model="formValidate.mailError" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
          </FormItem>
          </Col>
        </Row>
        <!-- <Row>
          <Col span="23">
          <FormItem :label="$t('lang_homePage.mailMsg.mailDatasource')" prop="mailDatasource">
            <Input readonly v-model="formValidate.mailDatasource" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
          </FormItem>
          </Col>
        </Row> -->
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_homePage.mailMsg.comment')" prop="comment">
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
  </div>
</template>
<script>
  import E from 'wangeditor'
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  let editor

  export default {
    data() {
      return {
        divheight: document.body.offsetHeight - 280,
        formValidate: {
          mailTime: '',
          mailObject: '',
          mailContent: '',
          mailStatus: '',
          mailTo: '',
          mailCc: '',
          mailAffixName: '',
          mailError: '',
          mailDatasource: '',
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
      ty: Number,
    },
    updated() {

    },
    mounted() {
    	editor = new E('#editor'+this.ty)
      editor.customConfig.onchange = function (html) {
        document.getElementById('txt').innerHTML = html
      }
      editor.create()
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseEmaillog.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.mailTime = res.data.content[0].mailTime
            t.formValidate.mailObject = res.data.content[0].mailObject
            t.formValidate.mailContent = res.data.content[0].mailContent
            t.formValidate.mailStatus = res.data.content[0].mailStatus
            t.formValidate.mailError = res.data.content[0].mailError
            t.formValidate.mailDatasource = res.data.content[0].mailDatasource
            t.formValidate.comment = res.data.content[0].comment
            t.formValidate.mailTo = res.data.content[0].mailTo
            t.formValidate.mailCc = res.data.content[0].mailCc
            t.formValidate.mailAffixName = res.data.content[0].mailAffixName
            editor.txt.append(t.formValidate.mailContent)
            document.getElementById('txt').innerHTML = t.formValidate.mailContent
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
                    title: this.$t('button.add'),
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
      	editor.txt.clear()
        this.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
