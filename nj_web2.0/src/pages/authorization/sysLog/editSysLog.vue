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
      <Form ref="formValidate" :model="formValidate"  :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_role.adminlog.log_funname')"prop="log_funname">
            <Input v-model="formValidate.log_funname" disabled></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_role.adminlog.log_username')" prop="log_username">
            <Input v-model="formValidate.log_username"disabled ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_role.adminlog.plog_opttime')"prop="log_opttime">
            <Input v-model="formValidate.log_opttime" disabled></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_role.adminlog.log_content')"prop="log_opttype">
            <Input v-model="formValidate.log_opttype" disabled></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_role.adminlog.log_ip')" prop="log_ip">
            <Input v-model="formValidate.log_ip"disabled ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_role.adminlog.log_content')"prop="log_content">
            <Input v-model="formValidate.log_content" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注..."></Input>
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
  import { getDataLevelUserLogin } from '../../../axios/axios'

  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        formValidate: {
          log_funname: '',
          log_username: '',
          log_opttime: '',
          log_opttype: '',
          log_content: '',
          log_ip: '',
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
          _mt: 'authSysLog.getById',
          id: id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.log_funname = res.data.content[0].log_funname
            t.formValidate.log_username = res.data.content[0].log_username
            t.formValidate.log_opttime = res.data.content[0].log_opttime
            t.formValidate.log_opttype = res.data.content[0].log_opttype
            t.formValidate.log_content = res.data.content[0].log_content
            t.formValidate.log_ip = res.data.content[0].log_ip
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
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
