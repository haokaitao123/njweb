<template>
    <div class="mine">
        <div class="mineWrap">
            <div class="header">
                <div class="header_img">
                    <img src="../../../static/main/man.png"
                         alt="">
                </div>
                <div class="personalInfo">
                    <div class="userName">
                        <h3>{{userInfo.empnhName}}</h3>
                        <b v-if="userInfo.state==='04empstate'">离职</b>
                        <b v-if="userInfo.state==='02empstate'">在职</b>
                    </div>
                    <div class="number info_item">
                        <label>工<span>工号</span>号:
                        </label>
                        <span>{{userInfo.numberCode}}</span>
                    </div>
                    <div class="dept info_item">
                        <label>部<span>工号</span>门:</label>
                        <span>{{userInfo.unitFname}}</span>
                    </div>
                    <div class="number info_item">
                        <label>职<span>工号</span>位:</label>
                        <span>{{userInfo.postFname}}</span>
                    </div>
                    <div class="entryDate info_item">
                        <label>入职日期：</label>
                        <span>{{userInfo.empnhSday}}</span>
                    </div>
                    <div class="birthDate info_item">
                        <label>出生日期：</label>
                        <span>{{userInfo.empnhBirthdate}}</span>
                    </div>
                </div>
            </div>
            <h3>在职信息</h3>
            <div class="companyMessage">
                <div class="company_item">
                    <div class="item">
                        <label>上级领导：</label>
                        <span>{{userInfo.empnhPmpDis}}</span>
                    </div>
                    <div class="item">
                        <label>工作地点：</label>
                        <span>{{userInfo.empnhWklocatDis}}</span>
                    </div>
                    <div class="item">
                        <label>银行账号：</label>
                        <span>{{empnhSalaccount}}</span>
                    </div>
                </div>
            </div>
            <h3>个人信息</h3>
            <div class="companyMessage">
                <div class="company_item">
                    <div class="item">
                        <label>证件号码：</label>
                        <span>{{empnhIdno}}</span>
                    </div>
                    <div class="item">
                        <label>手<span>部门</span>机：</label>
                        <span>{{empnhMobile}}</span>
                    </div>

                </div>
            </div>
            <x-button type="primary"
                      class="x_button"
                      @click.native="loginOut"
                      action-type="button">退出登录</x-button>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            userInfo: JSON.parse(window.localStorage.getItem('empData')),
            empnhMobile: "",
            empnhIdno: "",
            empnhSalaccount: ""
        }
    },
    beforeCreate () {
        let isLogin = window.localStorage.getItem('token');
        let empId = window.localStorage.getItem('empId');
        if (!isLogin || !empId) {
            this.$router.push({
                name: 'login'
            })
        }
    },
    mounted () {
        this.encrpt()
        console.log(this.userInfo, "userInfo")
    },
    methods: {
        encrpt () {
            let data = JSON.parse(window.localStorage.getItem('empData'));
            let tele = "" + data.empnhMobile;
            this.empnhMobile = tele.substr(0, 3) + "****" + tele.substr(7);
            this.empnhIdno = data.empnhIdno.replace(/(\d{5})\d{6}(\d{6})/, "$1******$2");
            this.empnhSalaccount = data.empnhSalaccount.replace(/\s/g, '').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2")
        },
        loginOut () {
            this.$dialog.confirm({
                title: '',
                message: '是否确认退出？'
            }).then(() => {
                window.localStorage.clear();
                this.$router.push({ name: 'login' })
            }).catch(() => {
                // on cancel
            });

        }
    }
}
</script>
<style lang="less" scoped>
.mine {
    height: calc(~"100% - 110px");
    background: #f6f6f6;
    .mineWrap {
        height: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        padding: 30px;
        box-sizing: border-box;
        .header {
            // height: 195px;
            background: #fff;
            display: flex;
            padding: 42px 23px;
            align-items: center;
            .header_img {
                height: 116px;
                width: 116px;
                border-radius: 50%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .personalInfo {
                display: flex;
                flex-direction: column;
                margin-left: 34px;
                justify-content: space-between;
                flex: 1;
                .userName {
                    display: flex;
                    align-items: baseline;
                    margin-bottom: 10px;
                    h3 {
                        font-size: 28px;
                        color: #666666;
                    }
                    b {
                        display: block;
                        font-size: 20px;
                        color: #339afe;
                        margin-left: 50px;
                    }
                }
                .info_item {
                    margin-bottom: 10px;
                    font-size: 28px;
                    display: flex;
                    color: #666666;
                    label {
                        display: flex;
                        width: 29%;
                        span {
                            opacity: 0;
                        }
                    }
                }
            }
        }
        > h3 {
            font-size: 32px;
            font-weight: normal;
            margin: 22px 0 18px;
        }
        .companyMessage {
            background: #fff;
            padding: 27px;
            .company_item {
                .item {
                    margin-bottom: 25px;
                    font-size: 28px;
                    color: #666666;
                    label {
                        display: inline-flex;
                        span {
                            opacity: 0;
                        }
                    }
                    > span {
                        display: inline-block;
                    }
                }
            }
        }
        .x_button {
            font-size: 34px;
            height: 84px;
            margin-top: 72px;
        }
    }
}
</style>
