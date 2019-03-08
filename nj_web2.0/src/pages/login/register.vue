<template>
  <div class="login-con" @keydown.enter="login">
    <Card :bordered="false">
      <p slot="title">
        <Icon type="log-in"></Icon>
        &nbsp;注册账号
      </p>
      <div class="form-con">
        <Form ref="loginForm" :model="form" :rules="rules">
          <FormItem prop="userName" style="margin-top: 5px">
            <!--<span class="register">*</span>-->
            <Input v-model="form.userName" placeholder="请输入手机号" class="input">
            <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
            </Input>
          </FormItem>
          <FormItem prop="realName" >
            <!--<span class="register">*</span>-->
            <Input v-model="form.realName" placeholder="请输入真实姓名" class="input">
            <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
            </Input>
          </FormItem>
          <!--<FormItem >-->
          <!--<Input v-model="form.email" placeholder="请输入邮箱">-->
          <!--<span slot="prepend">-->
          <!--<Icon :size="16" type="email"></Icon>-->
          <!--</span>-->
          <!--</Input>-->
          <!--</FormItem>-->
          <FormItem prop="noteCode">
            <Row>
              <Col span="13">
              <!--<span class="register">*</span>-->
              <Input v-model="form.noteCode" placeholder="请输入验证码" @on-blur="captchaCheck()" class="input">
              <span slot="prepend">
                  <Icon :size="14" type="ios-checkmark"></Icon>
                </span>
              </Input>
              </Col>
              <Col span="9" offset="2">
              <div class="noteCode" @click="getNoteCode">
                <img :src="noteCodeUrl"/>
              </div>
              </Col>
            </Row>
          </FormItem>
          <FormItem prop="phoneCode">
            <Row>
              <Col span="13">
              <!--<span class="register">*</span>-->
              <Input v-model="form.phoneCode" placeholder="请输入手机验证码" class="input">
              <span slot="prepend">
                  <Icon :size="14" type="android-call"></Icon>
                </span>
              </Input>
              </Col>
              <Col span="9" offset="2">
              <Button type="primary" long :disabled="time>0" @click="getPhoneCode">{{time > 0 ? time + 's' : '获取验证码'}}
              </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem prop="password">
            <!--<span class="register">*</span>-->
            <Input type="password" v-model="form.password" placeholder="请输入密码" class="input">
            <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
            </Input>
          </FormItem>
          <!--<FormItem prop="password2">-->
          <!--<span class="register">*</span>-->
          <!--<Input type="password" v-model="form.password2" placeholder="请确认密码" class="input">-->
          <!--<span slot="prepend">-->
          <!--<Icon :size="14" type="locked"></Icon>-->
          <!--</span>-->
          <!--</Input>-->
          <!--</FormItem>-->
          <FormItem prop="check" style="margin-bottom: 5px">
            <!--<span class="register">*</span>-->
            <Checkbox v-model="form.check" class="input">同意<a href="#">用户协议</a></Checkbox>
            <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
            </Input>
          </FormItem>
          <FormItem class="no-margin" style="margin-bottom: 10px">
            <Button @click="register" type="primary" long>注册</Button>
          </FormItem>
          <FormItem class="no-margin" style="margin-bottom: 10px">
            <Row>
              <Col span="12">
              <router-link to="login">立即登录</router-link>
              </Col>
              <Col span="12" class="align-right">
              <router-link to="change">忘记密码</router-link>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>
<script>
  import {getNoteCode, getDataLevelNone} from '../../axios/axios'
  import {setCookie, isSuccess} from '../../lib/util'

  export default {
    data() {
      const valid = (rule, value, callback) => {
        if (value === false) {
          callback(new Error('必须同意'))
        } else {
          callback()
        }
      }
      return {
        time: 0,
        noteCodeUrl: '',
        noteCodeKey: '',
        deliveryId: '',
        form: {
          email: '',
          realName: '',
          userName: '',
          password: '',
          password2: '',
          noteCode: '',
          phoneCode: '',
          check: true,
        },

        rules: {
          userName: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
          ],
          realName: [
            { required: true, message: '真实姓名不能为空', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { type: 'string', min: 6, message: '必须包含数字和字母,密码长度不能小于6', trigger: 'blur' },
          ],
          password2: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ],
          noteCode: [
            { required: true, message: '验证码输入有误', trigger: 'change' },
          ],
          phoneCode: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
          ],
          check: [
            { validator: valid, trigger: 'change' },
          ],
        },

      }
    },
    computed: {},
    mounted() {
      this.getNoteCode()
    },
    methods: {
      getNoteCode() {
        const t = this
        this.form.noteCode = ''
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
            flag: '1',
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.deliveryId = res.data.content[0].deliveryId
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: '验证码已发送',
              })
              // t.getNoteCode()
            }
          }).catch(() => {
            // t.getNoteCode()
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        }
      },
      register() {
        const t = this
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            let regx = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/
            if (regx.test(t.form.password)) {
              getDataLevelNone({
                _mt: 'userMgmt.register',
                mobileNo: t.form.userName,
                // email: t.form.email,
                verifyCode: t.form.phoneCode,
                verifyid: t.deliveryId,
                captchaCode: t.form.noteCode,
                captid: t.noteCodeKey,
                name: t.form.realName,
                termAgreed: t.form.check === true ? 1 : 0,
                newpwd1: md5(t.form.password),
//                newpwd2: md5(t.form.password2),
              })
                .then((res) => {
                  if (isSuccess(res, t)) {
                    t.$Modal.success({
                      title: this.$t('reminder.suc'),
                      content: '注册成功',
                    })
                    setCookie('_tk', res.data.content[0].token)
                    setCookie('wtk', res.data.content[0].webToken)
                    setCookie('useId', t.form.userName)
                    t.$router.push('/loginmain/login')
                  }
                  t.getNoteCode()
                })
                .catch(() => {
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

  .login-con {
    position: absolute;
    right: 160px;
    top: 58%;
    transform: translateY(-60%);
    width: 300px;
    height:460px;
    overflow: hidden;
    border-radius: 5px;
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }

  .noteCode {
    width: 100%;
    height: 32px;
  }

  .noteCode :hover {
    cursor: pointer;
  }

  .input {
    position: relative;
  }

  .register {
    position: absolute;
    top: 2px;
    left: -10px;
    color: #ed3f14;
    font-size: 12px
  }
</style>
