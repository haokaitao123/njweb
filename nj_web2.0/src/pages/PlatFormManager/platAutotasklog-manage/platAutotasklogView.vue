<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
          <Col span="11" >
          <FormItem :label="$t('lang_platform.autotasklog.atlogAtskidName')" prop="atlogAtskidName">
            <Input readonly v-model="formValidate.atlogAtskidName" ></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_platform.autotasklog.atlogRuntime')" prop="atlogRuntime">
            <Input readonly v-model="formValidate.atlogRuntime" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" >
          <FormItem :label="$t('lang_platform.autotasklog.atlogStatusName')" prop="atlogStatusName">
            <Input readonly v-model="formValidate.atlogStatusName" ></Input>
          </FormItem>
          </Col>
          <Col span="23" >
          <FormItem :label="$t('lang_platform.autotasklog.atlogError')" prop="atlogError">
            <Input readonly v-model="formValidate.atlogError" type="textarea" :autosize="{minRows: 2,maxRows: 5}"  ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_platform.autotasklog.comment')" prop="atlogComment">
            <Input readonly v-model="formValidate.atlogComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
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
          atlogAtskidName: '',
          atlogRuntime: '',
          atlogStatusName: '',
          atlogError: '',
          atlogComment: '',
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
          _mt: 'platAutotasklog.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.atlogAtskidName = res.data.content[0].atlogAtskidName
            t.formValidate.atlogRuntime = res.data.content[0].atlogRuntime
            t.formValidate.atlogStatusName = res.data.content[0].atlogStatusName
            t.formValidate.atlogError = res.data.content[0].atlogError
            t.formValidate.atlogComment = res.data.content[0].atlogComment
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
