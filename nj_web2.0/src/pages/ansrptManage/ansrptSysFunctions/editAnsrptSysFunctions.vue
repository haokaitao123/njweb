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
          <Col span="11">
          <FormItem label="功能节点名称" prop="log_funname">
            <Input v-model="formValidate.log_funname" ></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem label="用户名称" prop="log_username">
            <Input v-model="formValidate.log_username" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem label="类型编码" prop="log_opttime">
            <Input v-model="formValidate.log_opttime" ></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem label="操作类型" prop="log_opttype">
            <Input v-model="formValidate.log_opttype" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem label="来源IP" prop="log_ip">
            <Input v-model="formValidate.log_ip" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem label="操作内容" prop="log_content">
            <Input v-model="formValidate.log_content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注..."></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset" style="margin-left: 8px">取消</Button>
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
          pmtypeCode: [
            { required: true, message: '请填写参数类型编码', trigger: 'blur' },
          ],
          pmtypeName: [
            { required: true, message: '请填写参数类型名称', trigger: 'blur' },
          ],
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
