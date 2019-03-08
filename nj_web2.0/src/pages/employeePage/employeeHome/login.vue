<template>
  <div class="cover" @keydown.enter="login">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="log-in" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;欢迎登录
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
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
          <FormItem prop="noteCode">
            <Row>
              <Col span="13">
              <Input v-model="form.noteCode" placeholder="请输入验证码">
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
          <FormItem class="no-margin">
            <Button @click="login" type="primary" long>登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  import { getNoteCode, getDataLevelNone } from '../../../axios/axios'
  import { setCookie, isSuccess, getCookie } from '../../../lib/util'

  export default {
    data() {
      return {
        noteCodeUrl: '',
        noteCodeKey: '',
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
            { required: true, message: '验证码不能为空', trigger: 'blur' },
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
              if (isSuccess(res, t)) {
                setCookie('wtk', res.data.content[0].webToken)
                setCookie('useId', res.data.content[0].uid)
                setCookie('useName', t.form.userName)
                t.$store.commit('setName', res.data.content[0].username)
                t.$store.commit('setRoleType', '6essmss')
                t.$router.push('/employeeHomeNew')
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
      close() {
        this.$emit('close')
      },
    },
  }
</script>

<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";

  .cover .box{
    width: 300px;
    padding-top: 20px;
  }
  .form-con{
    margin-top: 20px;
  }
  .login-tip{
    font-size: 10px;
    text-align: center;
    color: #c3c3c3;
  }
  .noteCode{
    width: 100%;
    height: 32px;
  }
  .noteCode :hover{
    cursor: pointer;
  }

</style>
