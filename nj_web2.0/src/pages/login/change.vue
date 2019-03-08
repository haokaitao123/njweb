<template>
  <div class="login-con" @keydown.enter="login">
    <Card :bordered="false">
      <p slot="title">
        <Icon type="log-in"></Icon>
        &nbsp;重置密码
      </p>
      <div class="form-con">
        <Form ref="loginForm" :model="form" :rules="rules">
          <FormItem prop="userName">
            <Input v-model="form.userName" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
            </Input>
          </FormItem>
          <FormItem prop="noteCode">
            <Row>
              <Col span="13">
              <Input v-model="form.noteCode" placeholder="请输入验证码"  @on-blur="captchaCheck()" >
              <span slot="prepend">
                  <Icon :size="14" type="ios-checkmark"></Icon>
                </span>
              </Input>
              </Col>
              <Col span="9" offset="2">
              <div class="noteCode" @click="getNoteCode">
                <img :src="noteCodeUrl" />
              </div>
              </Col>
            </Row>
          </FormItem>
          <FormItem prop="phoneCode">
            <Row>
              <Col span="13">
              <Input v-model="form.phoneCode" placeholder="请输入手机验证码">
                <span slot="prepend">
                  <Icon :size="14" type="android-call"></Icon>
                </span>
              </Input>
              </Col>
              <Col span="9" offset="2">
              <Button type="primary" long :disabled="time>0" @click="getPhoneCode">{{time>0?time+'s':'获取验证码'}}</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem prop="password" style="margin-bottom: 20px">
            <Input type="password" v-model="form.password" placeholder="请输入新密码">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
            </Input>
          </FormItem>
          <!--<FormItem prop="password2">-->
            <!--<Input type="password" v-model="form.password2" placeholder="请确认新密码">-->
            <!--<span slot="prepend">-->
                <!--<Icon :size="14" type="locked"></Icon>-->
              <!--</span>-->
            <!--</Input>-->
          <!--</FormItem>-->

          <FormItem class="no-margin" style="margin-bottom: 10px">
            <Button @click="changepassword" type="primary" long>找回密码</Button>
          </FormItem>
          <FormItem class="no-margin">
            <Row>
              <Col span="12">
              <router-link to="register">注册账号</router-link>
              </Col>
              <Col span="12" class="align-right">
              <router-link to="login">返回登录</router-link>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>
<script>
  import { getNoteCode, getDataLevelNone } from '../../axios/axios'
  import { setCookie, isSuccess } from '../../lib/util'

  export default {
    data() {
      return {
        time: 0,
        noteCodeUrl: '',
        noteCodeKey: '',
        deliveryId: '',
        form: {
          userName: '',
          password: '',
          password2: '',
          noteCode: '',
          phoneCode: '',
        },

        rules: {
          userName: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { type: 'string', min: 6, message: '必须包含数字和字母,密码长度不能小于6', trigger: 'blur' },
          ],
          noteCode: [
            { required: true, message: '验证码不能为空', trigger: 'blur' },
          ],
          phoneCode: [
            { required: true, message: '验证码不能为空', trigger: 'blur' },
          ],
        },
      }
    },
    computed: {

    },
    mounted() {
      this.getNoteCode()
    },
    methods: {
      getNoteCode() {
        const t = this
        getNoteCode().then((res) => {
          t.noteCodeUrl = res.data.content[0].imgUrl
          t.noteCodeKey = res.data.content[0].key
        }).catch(() => {

        })
      },
      getPhoneCode() {
        const t = this
        let userName
        let noteCode
        this.$refs.loginForm.validateField('userName', (valid) => {
          userName = valid === ''
        })
        this.$refs.loginForm.validateField('noteCode', (valid) => {
          noteCode = valid === ''
        })
        if (userName === true && noteCode === true) {
          this.timer(60, t)
          getDataLevelNone({
            _mt: 'userVericode.getvericode',
            captchaCode: t.form.noteCode,
            captid: t.noteCodeKey,
            channelId: t.form.userName,
            flag: '2',
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.deliveryId = res.data.content[0].deliveryId
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: '验证码已发送',
              })
            }
//            t.getNoteCode()
          }).catch(() => {
//            t.getNoteCode()
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        }
      },
      changepassword() {
        const t = this
        this.$refs.loginForm.validate(() => {
          let regx = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/
          if (regx.test(t.form.password)) {
            getDataLevelNone({
              _mt: 'userMgmt.getbackpwd',
              loginCode: t.form.userName,
              verifyCode: t.form.phoneCode,
              verifyid: t.deliveryId,
              captchaCode: t.form.noteCode,
              captid: t.noteCodeKey,
              newpwd1: md5(t.form.password),
            }).then((res) => {
              if (isSuccess(res, t)) {
                t.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: this.$t('reminder.updsuccess'),
                })
                this.$router.push('login')
                t.getNoteCode()
              }
            }).catch(() => {
              t.getNoteCode()
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          } else {
            t.$Modal.warning({
              title: this.$t('reminder.remind'),
              content: '密码必须包含数字和字母',
            })
          }
        })
      },
      captchaCheck() {
        const t = this
        getDataLevelNone({
          _mt: 'userMgmt.checkChangeCaptcha',
          captchaCode: t.form.noteCode,
          captid: t.noteCodeKey,
        }).then((res) => {
          if (isSuccess(res, t)) {
            if ("success" !== res.data.content[0].value) {
              this.form.noteCode = ''
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
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

  .login-con{
    position: absolute;
    right: 160px;
    top: 48%;
    transform: translateY(-60%);
    width: 300px;
    height: 355px;
    overflow: hidden;
    border-radius: 5px;
  .login-tip{
    font-size: 10px;
    text-align: center;
    color: #c3c3c3;
  }
  }

  .noteCode{
    width: 100%;
    height: 32px;
  }
  .noteCode :hover{
    cursor: pointer;
  }
</style>
