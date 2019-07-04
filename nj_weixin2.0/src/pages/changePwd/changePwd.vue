<!--登录-->
<template>
    <div class="changePwd">
        <div class="changePwd_main">
            <div class="input_box">
                <input type="password"
                       placeholder="请输入原密码"
                       v-model.trim="oldPwd"
                       class="input_item">
                <input type="password"
                       placeholder="设置新密码"
                       v-model.trim="newPwd"
                       class="input_item">
                <input type="password"
                       placeholder="确认新密码"
                       v-model.trim="confirmPwd"
                       class="input_item">
            </div>
            <x-button type="primary"
                      class="x_button"
                      @click.native="settingPwd"
                      action-type="button">确定</x-button>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLogin } from '@/axios/axios'
import { isSuccess } from '../../lib/util'
export default {
    name: 'changePwd',
    data () {
        return {
            oldPwd: '',
            newPwd: '',
            confirmPwd: '',
        }
    },
    beforeCreate () {
        if (this.$route.query.type === '1') {
            this.$dialog.alert({
                message: '第一次登陆，请修改初始密码'
            });
        } else if (this.$route.query.type === '2') {
            this.$dialog.alert({
                message: '密码已失效，请重新设置密码'
            });
        }
    },
    methods: {
        //  确定
        settingPwd () {
            const t = this
            let regx = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/
            if (this.oldPwd === "") {
                this.$vux.toast.text('请输入原密码', 'top');
                return;
            }
            if (this.newPwd === "") {
                this.$vux.toast.text('请输入新密码', 'top');
                return;
            }
            if (!regx.test(this.newPwd)) {
                this.$vux.toast.text('必须包含数字和字母,密码长度不能小于6', 'top');
                return;
            }
            if (this.newPwd !== this.confirmPwd) {
                this.$vux.toast.text('确认密码错误', 'top');
                return;
            }
            getDataLevelUserLogin({
                _mt: 'wxLogin.changepass',
                password: md5(t.oldPwd),
                newpwd1: md5(t.newPwd),
                newpwd2: md5(t.confirmPwd),
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].value == true) {
                        t.$notify({
                            message: '修改成功',
                            duration: 1500,
                            background: '#1989fa'
                        });
                        this.$router.push({
                            path: "/login"
                        })
                    }
                    console.log(res.data.content[0].value, "res")
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
    },
}
</script>
<style  lang="less" scoped>
.changePwd {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url(../../../static/main/login_bg.png) no-repeat 100% 100%;
    background-size: contain;
    background-color: #fff;
    .changePwd_main {
        padding: 60px 100px 0;
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
                border-bottom: 0.04rem solid #efefef;
            }
            .verCode_box {
                display: flex;
                .identityCode {
                    outline: none;
                    border: none;
                    height: 100px;
                    font-size: 32px;
                    flex: 1;
                }
                .getCode {
                    width: 175px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #666666;
                    font-size: 28px;
                }
            }
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
