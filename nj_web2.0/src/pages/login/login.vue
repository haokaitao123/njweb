<template>
  <div class="login-con" @keydown.enter="login">
    <Card :bordered="false">
      <p slot="title">
        <Icon type="log-in"></Icon>
        &nbsp;欢迎登录
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
          <FormItem prop="password">
            <Input type="password" v-model="form.password" placeholder="请输入密码">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
            </Input>
          </FormItem>
          <FormItem prop="noteCode" style="margin-bottom: 20px">
            <Row>
              <Col span="13">
              <Input style="position: relative" v-model="form.noteCode" placeholder="请输入验证码" @on-focus="captchaCheckfocus()" @on-blur="captchaCheck()">
                <span slot="prepend">
                  <Icon :size="14" type="ios-checkmark"></Icon>
                </span>
              </Input>
              <span v-show="noteCodeFlag" style="position: absolute;top: 28px;left: 0;color:#ed3f14;">验证码输入有误</span>
              </Col>
              <Col span="9" offset="2">
              <div class="noteCode" @click="getNoteCode">
                <img :src="noteCodeUrl" />
              </div>
              </Col>
            </Row>
          </FormItem>
          <FormItem class="no-margin" style="margin-bottom: 10px">
            <Button @click="login" type="primary" long>登录</Button>
          </FormItem>
          <FormItem class="no-margin">
            <Row>
              <Col span="12">
                <router-link to="register">注册账号</router-link>
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
  import { getNoteCode, getDataLevelNone } from '../../axios/axios'
  import { setCookie, isSuccess, getCookie } from '../../lib/util'

  export default {
    data() {
      return {
        noteCodeUrl: '',
        noteCodeKey: '',
        noteCodeFlag: false,
        form: {
          userName: '',
          password: '',
          noteCode: '',
        },
        rules: {
          userName: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ],
          noteCode: [
            { required: true, message: '验证码输入有误', trigger: 'blur' },
          ],
        },
      }
    },
    mounted() {
      this.getNoteCode()
      this.form.userName = getCookie('useName')
    },
    methods: {
      getNoteCode() {
        this.form.noteCode = ''
        const t = this
        getNoteCode().then((res) => {
          t.noteCodeUrl = res.data.content[0].imgUrl
          t.noteCodeKey = res.data.content[0].key
        }).catch(() => {

        })
      },
      login() {
        const t = this
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            getDataLevelNone({
              _mt: 'userMgmt.login',
              loginCode: t.form.userName,
              password: md5(t.form.password),
              captchaCode: t.form.noteCode,
              captid: t.noteCodeKey,
            }).then((res) => {
              t.form.noteCode = ''
              if (isSuccess(res, t)) {
                setCookie('wtk', res.data.content[0].webToken)
                setCookie('useId', res.data.content[0].uid)
                setCookie('useName', t.form.userName)
                t.$store.commit('setName', res.data.content[0].username)
                t.$store.commit('setUserId', res.data.content[0].uid)
                t.$store.commit('setFunId', '0')
                if (res.data.content[0].hasOwnProperty('userFinalCompny')) {
                  t.$store.commit('setCompanyId', res.data.content[0].userFinalCompny)
                }else {
                  t.$store.commit('setCompanyId', '1000')
                }
                if (res.data.content[0].hasOwnProperty("userFinalroletype")) {
                  t.$store.commit('setRoleType', res.data.content[0].userFinalroletype)
                } else {
                  t.$store.commit('setRoleType', '0root')
                }
                t.$router.push('/home')
              }
              t.getNoteCode()
            }).catch(() => {
              t.getNoteCode()
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
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
              this.noteCodeFlag = true
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      captchaCheckfocus() {
        this.noteCodeFlag = false
      },
    },
  }
</script>

<style lang="scss" scoped>

  .login-con{
    position: absolute;
    right: 160px;
    top: 44%;
    transform: translateY(-60%);
    width: 300px;
    height: 300px;
    border-radius: 5px;
    overflow: hidden;
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
