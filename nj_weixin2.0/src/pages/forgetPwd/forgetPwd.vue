<!--登录-->
<template>
    <div class="forget">
        <div class="forget_main">
            <div class="input_box">
                <input type="text"
                       placeholder="手机号"
                       v-model.trim="phone"
                       class="input_item">
                <div class="verCode_box input_item">
                    <input type="text"
                           class="identityCode"
                           placeholder="请输入短信验证码"
                           v-model.trim="verCode">
                    <div class="getCode"
                         v-show="showBtn">
                        <span @click="getVercode">获取验证码</span>
                    </div>
                    <div class="anewTime getCode"
                         v-show="!showBtn">
                        <span>
                            {{timer}}s
                        </span>
                    </div>
                </div>
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
import { getDataLevelNone } from '@/axios/axios'
import { isSuccess } from '../../lib/util'
export default {
    name: 'login',
    data () {
        return {
            phone: '',
            verCode: '',
            newPwd: '',
            confirmPwd: '',
            timer: 60,
            showBtn: true,
            deliveryId: ''
        }
    },
    methods: {
        //  确定
        settingPwd () {
            const t = this
            if (this.phone === "") {
                this.$vux.toast.text('请输入手机号', 'top');
                return;
            }
            if (!(/^1[34578]\d{9}$/.test(this.phone))) {
                this.$vux.toast.text('手机号输入错误', 'top');
                return;
            }
            if (this.newPwd === "") {
                this.$vux.toast.text('请输入密码', 'top');
                return;
            }
            if (this.newPwd !== this.confirmPwd) {
                this.$vux.toast.text('确认密码错误', 'top');
                return;
            }

            getDataLevelNone({
                _mt: 'wxLogin.gzhgetbackpwd',
                loginCode: t.phone,
                verifyCode: t.verCode,
                verifyid: t.deliveryId,
                newpwdfis: md5(t.newPwd),
                newpwdsec: md5(t.confirmPwd),
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
                    console.log(res.data.content[0], "res")
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
        //获取验证码
        getVercode () {
            const t = this;
            if (t.phone == "") {
                t.$vux.toast.text('请输入手机号', 'top');
                return;
            }
            if (!(/^1[34578]\d{9}$/.test(t.phone))) {
                t.$vux.toast.text('手机号输入错误', 'top');
                return;
            }
            getDataLevelNone({
                _mt: 'userVericode.wxgetvericode',
                telphone: t.phone,
                flag: "2"
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let data = res.data.content[0];
                    console.log(data, "data")
                    t.showBtn = false;
                    t.startTimer();
                    t.$notify({
                    	message: '发送成功',
                    	duration: 1500,
                    	background: '#1989fa'
                    });
                    t.deliveryId = data.deliveryId;
                }
            }).catch((err) => {
				t.$notify({
					message: res.data.stat.stateList[0].desc,
					duration: 1500,
					background: '#f44'
				});
            }).finally(() => {
                t.$store.commit('hideLoading');
            });
        },
		//倒计时		
        startTimer () {
            let time = setInterval(() => {
                this.timer--;
                if (this.timer == 0) {
                    clearInterval(time);
                    this.showBtn = true;
                    this.timer = 60;
                }
            }, 1000)
        },
    },
    


}
</script>
<style  lang="less" scoped>
.forget {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url(../../../static/main/login_bg.png) no-repeat 100% 100%;
    background-size: contain;
	background-color: #fff;
    .forget_main {
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
