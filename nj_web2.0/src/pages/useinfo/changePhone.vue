<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;更换手机号
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="form" class="form" :model="form" :rules="rules">
        <FormItem prop="mobileno">
          <Input v-model="form.mobileno" readonly placeholder="请输入用户名">
          <span slot="prepend">
          <Icon :size="16" type="ios-telephone"></Icon>
        </span>
          </Input>
        </FormItem>
        <FormItem prop="newMobileNo">
          <Input v-model="form.newMobileNo" placeholder="请输入新手机号">
          <span slot="prepend">
          <Icon :size="16" type="android-call"></Icon>
        </span>
          </Input>
        </FormItem>
        <FormItem prop="captchaCode">
          <Row>
            <Col span="13">
            <Input v-model="form.captchaCode" placeholder="请输入验证码">
            <span slot="prepend">
                  <Icon :size="14" type="ios-checkmark"></Icon>
                </span>
            </Input>
            </Col>
            <Col span="9" offset="2">
            <div class="captchaCode" @click="getNoteCode">
              <img :src="noteCodeUrl" />
            </div>
            </Col>
          </Row>
        </FormItem>
        <FormItem prop="verifyCode">
          <Row>
            <Col span="13">
            <Input v-model="form.verifyCode" placeholder="请输入手机验证码">
            <span slot="prepend">
            <Icon :size="14"  type="checkmark-circled"></Icon>
          </span>
            </Input>
            </Col>
            <Col span="9" offset="2">
            <Button type="primary" long :disabled="time>0" @click="getPhoneCode">{{time>0?time+'s':'获取验证码'}}</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="form.password" placeholder="请输入密码">
          <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
          </Input>
        </FormItem>
        <FormItem class="no-margin">
          <Row type="flex" justify="end">
            <Button type="ghost" style="margin-right: 10px;" @click="close">取消</Button>
            <Button @click="save" type="primary" >{{$t('button.sav')}}</Button>
          </Row>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  import { getNoteCode, getDataLevelNone, getDataLevelUserLogin2 } from '../../axios/axios'
  import { isSuccess, deepCopy } from '../../lib/util'

export default {
  data() {
    return {
      time: 0,
      noteCodeUrl: '',
      noteCodeKey: '',
      form: {
        mobileno: '',
        newMobileNo: '',
        password: '',
        captchaCode: '',
        captid: '',
        verifyCode: '',
        verifyid: '',
      },
      rules: {
        newMobileNo: [
          { required: true, message: '新手机不能为空', trigger: 'blur' },
        ],
        mobileno: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
        captchaCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
        ],
        verifyCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
        ],
      },
    }
  },
  props: {
    mobileNo: '',
  },
  methods: {
    init(id) {
      this.form.mobileno = id
      this.getNoteCode()
    },
    getNoteCode() {
      const t = this
      getNoteCode().then((res) => {
        t.noteCodeUrl = res.data.content[0].imgUrl
        t.form.captid = res.data.content[0].key
      }).catch(() => {

      })
    },
    save() {
      const t = this
      const data = deepCopy(t.form)
      data.password = md5(data.password)
      data['_mt'] = 'userMgmt.changemobile'
      t.$refs.form.validate((valid) => {
        if (valid) {
          getDataLevelUserLogin2(data).then((res) => {
            if (isSuccess(res, t)) {
              this.$Modal.success({
                title: this.$t('reminder.suc'),
                content: '保存成功',
              })
              t.close()
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
    close() {
      this.$emit('closePhone')
      this.clear()
    },
    clear() {
      this.form = {
          mobileno: '',
          newMobileNo: '',
          password: '',
          captchaCode: '',
          captid: '',
          verifyCode: '',
          verifyid: '',
      }
      this.$refs.form.resetFields()
    },
    getPhoneCode() {
      const t = this
      let mobileno
      let captchaCode
      this.$refs.form.validateField('newMobileNo', (valid) => {
        mobileno = valid === ''
      })
      this.$refs.form.validateField('captchaCode', (valid) => {
        captchaCode = valid === ''
      })
      if (mobileno === true && captchaCode === true) {
        this.timer(5, t)
        getDataLevelNone({
          _mt: 'userVericode.getvericode',
          captchaCode: t.form.captchaCode,
          captid: t.form.captid,
          channelId: t.form.newMobileNo,
          flag: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.verifyid = res.data.content[0].deliveryId
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '验证码已发送',
            })
          }
          t.getNoteCode()
        }).catch(() => {
          t.getNoteCode()
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      }
    },
    timer(wait, t) {
      if (wait === 0) {
        t.time = wait
      } else {
        t.time = wait
        wait--
        setTimeout(() => {
          t.timer(wait, t)
        }, 1000)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
  @import "../../sass/updateAndAdd.scss";
  .cover .box{
    width: 300px;
  }
.form{
  .captchaCode{
    width: 100%;
    height: 32px;
  }
  .captchaCode :hover{
    cursor: pointer;
  }
}
</style>
