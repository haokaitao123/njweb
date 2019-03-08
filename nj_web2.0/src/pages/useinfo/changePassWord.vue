<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;修改密码
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="form" class="form" :model="form" :rules="rules">
        <FormItem prop="password">
          <Input type="password" v-model="form.password" placeholder="请输入密码">
          <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
          </Input>
        </FormItem>
        <FormItem prop="newpwd1">
          <Input type="password" v-model="form.newpwd1" placeholder="请输入新密码">
          <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
          </Input>
        </FormItem>
        <FormItem prop="newpwd2">
          <Input type="password" v-model="form.newpwd2" placeholder="请确认新密码">
          <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
          </Input>
        </FormItem>
        <FormItem class="no-margin">
          <Row type="flex" justify="end">
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
        form: {
          password: '',
          newpwd1: '',
          newpwd2: '',
        },
        rules: {
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ],
          newpwd1: [
            { required: true, message: '新密码不能为空', trigger: 'blur' },
            { type: 'string', min: 6, message: '必须包含数字和字母,密码长度不能小于6', trigger: 'blur' },
          ],
          newpwd2: [
            { required: true, message: '新密码不能为空', trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      mobileNo: '',
    },
    methods: {
      save() {
        let regx = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/
        const t = this
        if (regx.test(t.form.newpwd1)) {
          const data = deepCopy(t.form)
          data.password = md5(data.password)
          data.newpwd1 = md5(data.newpwd1)
          data.newpwd2 = md5(data.newpwd2)
          data['_mt'] = 'userMgmt.changepass'
          t.$refs.form.validate((valid) => {
            if (valid) {
              getDataLevelUserLogin2(data).then((res) => {
                if (isSuccess(res, t)) {
                  this.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: '保存成功',
                  })
                  t.loginOut()
                }
              }).catch(() => {
                this.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            }
          })
        } else {
          this.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '密码必须包含数字和字母',
          })
        }
      },
      close() {
        this.$emit('closePassWord')
        this.clear()
      },
      loginOut() {
        const t = this
        getDataLevelUserLogin2({ _mt: 'userMgmt.logout' }).then((res) => {
          if (isSuccess(res, t)) {
            t.$router.push('loginmain/login')
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      clear() {
        this.form = {
          password: '',
          newpwd1: '',
          newpwd2: '',
        }
        this.$refs.form.resetFields()
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
