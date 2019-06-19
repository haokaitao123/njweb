<template>
    <div class="function">
        <div class="functionWrap">
            <div class="functionList">
                <div class="functionItem"
                     @click="goTo('empInfo')">
                    <div class="functionItem_img">
                        <img src="../../../static/main/function1.png"
                             alt="">
                    </div>
                    <span class="functionItem_Name">员工信息填写</span>
                </div>
                <div class="functionItem"
                     @click="goTo('employInfoChange')">
                    <div class="functionItem_img">
                        <img src="../../../static/main/function2.png"
                             alt="">
                    </div>
                    <span class="functionItem_Name">员工信息变更</span>
                </div>
                <div class="functionItem"
                     @click="goTo('interview')">
                    <div class="functionItem_img">
                        <img src="../../../static/main/function3.png"
                             alt="">
                    </div>
                    <span class="functionItem_Name">面试预约</span>
                </div>
                <div class="functionItem"
                     @click="goTo('informNotice')">
                    <div class="functionItem_img">
                        <img src="../../../static/main/function4.png"
                             alt="">
                    </div>
                    <span class="functionItem_Name">公司公告</span>
                </div>
                <div class="functionItem"
                     @click="goTo('dimission')">
                    <div class="functionItem_img">
                        <img src="../../../static/main/function5.png"
                             alt="">
                    </div>
                    <span class="functionItem_Name">员工离职申请</span>
                </div>
                <div class="functionItem"
                     @click="goTo('empContractRenewal')">
                    <div class="functionItem_img">
                        <img src="../../../static/main/function6.png"
                             alt="">
                    </div>
                    <span class="functionItem_Name">合同续签确认</span>
                </div>
                <div class="functionItem"
                     @click="goTo('attenVacation')">
                    <div class="functionItem_img">
                        <img src="../../../static/main/function7.png"
                             alt="">
                    </div>
                    <span class="functionItem_Name">员工请假申请</span>
                </div>
                <div class="functionItem"
                     @click="goTo('attenShift')">
                    <div class="functionItem_img">
                        <img src="../../../static/main/function8.png"
                             alt="">
                    </div>
                    <span class="functionItem_Name">员工调班申请</span>
                </div>
                <div class="functionItem"
                     @click="goTo('attenGooutproc')">
                    <div class="functionItem_img">
                        <img src="../../../static/main/function9.png"
                             alt="">
                    </div>
                    <span class="functionItem_Name">员工外出申请</span>
                </div>
                <div class="functionItem"
                     @click="goTo('attenCkappeal')">
                    <div class="functionItem_img">
                        <img src="../../../static/main/function10.png"
                             alt="">
                    </div>
                    <span class="functionItem_Name">员工考勤申诉</span>
                </div>
                <div class="functionItem"
                     @click="goTo('attenMonthrevi')">
                    <div class="functionItem_img">
                        <img src="../../../static/main/function11.png"
                             alt="">
                    </div>
                    <span class="functionItem_Name">月考勤确认</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {

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
    methods: {
        goTo (redirect) {
            this.$router.push({
                name: redirect
            })
        }
    },
}
</script>
<style lang="less" scoped>
.function {
    height: 100%;
    background: #fff;
    .functionWrap {
        height: calc(~"100% - 110px");
        -webkit-overflow-scrolling: touch;
        overflow: scroll;
        .functionList {
            padding: 64px 27px 0;
            display: flex;
            flex-wrap: wrap;
            .functionItem {
                width: 25%;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 74px;
                justify-content: flex-start;
                .functionItem_img {
                    width: 114px;
                    height: 114px;
                    margin-bottom: 37px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .functionItem_Name {
                    font-size: 28px;
                    color: #333333;
                }
            }
        }
    }
}
</style>
