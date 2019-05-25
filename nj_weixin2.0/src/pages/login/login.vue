<!--登录-->
<template>
    <div class="login">
        <div class="login_main">
            <div class="input_box">
                <input type="text"
                       placeholder="用户名"
                       v-model.trim="userName"
                       class="input_item">
                <input type="password"
                       placeholder="密码"
                       v-model.trim="passWord"
                       class="input_item">
            </div>
            <span class="forget_pwd"
                  @click="forgetPwd">忘记密码</span>
            <x-button type="primary"
                      class="x_button"
                      @click.native="login"
                      action-type="button">立即登录</x-button>
        </div>
    </div>
</template>
<script>
import { getDataLevelNone, getDataLevelUserLogin } from '../../axios/axios'
import { isSuccess, setCookie } from '../../lib/util.js'
export default {
    name: 'login',
    data () {
        return {
            userName: '',
            passWord: '',
        }
    },
    // beforeCreate () {
    //     let isLogin = window.localStorage.getItem('token');
    //     let empId = window.localStorage.getItem('empId');
    //     if (isLogin && empId) {
    //         this.$router.push({
    //             name: 'function'
    //         })
    //     }
    // },
    methods: {
        login () {
            const t = this
            if (this.userName === "") {
                this.$vux.toast.text('请输入账号', 'top');
                return;
            }
            if (this.passWord === "") {
                this.$vux.toast.text('请输入密码', 'top');
                return;
            }
            getDataLevelNone({
                _mt: 'wxLogin.wxlogins',
                loginName: t.userName,
                loginPwd: md5(t.passWord)
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let storage = window.localStorage;
                    storage.setItem("webToken", res.data.content[0].webToken);
                    storage.setItem("token", res.data.content[0].token);
                    storage.setItem("uid", res.data.content[0].uid);
                    setCookie('wtk', res.data.content[0].webToken);
                    setCookie('useId', res.data.content[0].uid);
                    setCookie('token', res.data.content[0].token);
                    this.getEmpId();
                }
            }).catch((res) => {
                t.$notify({
                    message: res.data.stat.stateList[0].desc,
                    duration: 1500,
                    background: '#f44'
                });
            }).finally(() => {
                t.$store.commit('hideLoading');
            });
        },
        getEmpId () {
            let userId = window.localStorage.getItem('uid');
            const t = this
            getDataLevelUserLogin({
                _mt: 'wxEmpConrenewal.getEmpIdByUserId',
                userId: userId,
                companyId: pubsource.companyId
            }).then((res) => {
                if (isSuccess(res, t)) {
                    console.log(JSON.parse(res.data.content[0].value), "123");
                    let empId = JSON.parse(res.data.content[0].value).id;
                    let empData = res.data.content[0].value;
                    window.localStorage.setItem("empId", empId);
                    window.localStorage.setItem("empData", empData);
                    this.$router.push({
                        name: "function"
                    })
                }
            }).catch(() => {
                t.$notify({
                    message: '网络错误',
                    duration: 1500,
                    background: '#f44'
                });
            }).finally(() => {
                t.$store.commit('hideLoading');
            });
        },
        forgetPwd () {
            this.$router.push({
                name: "forgetPwd"
            })
        }
    },

}
</script>
<style  lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url(../../../static/main/login_bg.png) no-repeat 100% 100%;
    background-size: contain;
    background-color: #fff;
    .login_main {
        padding: 125px 100px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        .input_box {
            margin-bottom: 60px;
            .input_item {
                width: 100%;
                height: 100px;
                font-size: 32px;
                outline: none;
                border: none;
                position: relative;
                border-bottom: 0.04rem solid #efefef;
            }
        }
        .forget_pwd {
            display: inline-block;
            font-size: 28px;
            margin-bottom: 68px;
            color: #666666;
        }
        .x_button {
            width: 300px;
            font-size: 36px;
            height: 84px;
        }
    }
}
input::-webkit-input-placeholder {
    color: #333333;
}
input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #333333;
}
input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #333333;
}
input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #333333;
}
</style>
