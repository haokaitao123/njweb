<template>
  <div class="wrapOne">
    <!--<header-title :title="title" :flag="flag"></header-title>-->
    <div class="content">
      <!--<div class="user">-->
        <!--<img v-if="$store.state.InfoList.hasOwnProperty('empphotoupload')" :src="httpImg + $store.state.InfoList.empphotoupload.split(',')[1]" alt="" class="avatar">-->
        <!--<img v-else="$store.state.InfoList.hasOwnProperty('empphotoupload')" src="../../../../static/main/header.png" alt="" class="avatar">-->
        <!--<div class="userInfo">-->
          <!--<p>{{name}}，您好</p>-->
          <!--<p>欢迎来到服务中心，很高兴为您服务</p>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="itemAll">-->
        <!--<div class="item">-->
          <!--<img src="../../../../static/main/kf_01.png" alt="">-->
          <!--<span>在线客服</span>-->
        <!--</div>-->
        <!--<div class="item" @click="goMyOrderList">-->
          <!--<img src="../../../../static/main/kf_02.png" alt="">-->
          <!--<span>咨询工单</span>-->
        <!--</div>-->
      <!--</div>-->
      <div class="contentAll">
        <p class="title">人力资源共享服务平台员工端</p>
        <div class="content">
          <p>职工可以通过电脑或手机登录员工自助系统。在员工自助系统中，职工可以享受以下服务：</p>
          <ul>
            <li>1.查看个人的基本信息、薪酬及社保缴费信息。</li>
            <li>2.查询国家、集团公司、地方及公司内部有关人力资源方面的政策及热点问答。</li>
            <li>3.能进行在线提问咨询与本人切身利益相关的政策事宜，由人力资源专家提供解答服务。 </li>
            <li>4.能提供在线申请收入证明和身份证明的办理业务，方便职工办事。</li>
          </ul>
        </div>
      </div>
      <div class="mineItem">
        <div class="itemLine" @click="goService">
          <div class="item_l">
            <img src="../../../../static/main/kf_03.png" alt="" class="item_icon">
            <span class="item_name">电话客服</span>
          </div>
          <div class="item_r">
            <span>400-815-2266</span>
            <img src="../../../../static/action/05.png" alt="" class="item_arrow">
          </div>
        </div>
        <div class="itemLine">
          <div class="item_l">
            <img src="../../../../static/main/kf_04.png" alt="" class="item_icon">
            <span class="item_name">QQ</span>
          </div>
          <div class="item_r">
            <span>1234657</span>
            <img src="../../../../static/action/05.png" alt="" class="item_arrow">
          </div>
        </div>
        <div class="code">
          <div class="codeImg"></div>
          <p>微信扫描二维码</p>
        </div>

      </div>
    </div>
    <maskIng v-show="phoneNum" @noNeed="removeNeed"></maskIng>
  </div>
</template>

<script>
  import headerTitle from '../../../components/headTitle.vue';
  import maskIng from './masking.vue'
  export default {
    name: "customerService",
    data() {
      return {
        title: '我的客服',
        flag: true,
        phoneNum:false,
        name: localStorage.getItem('bus_empCname'),
        httpImg:'',
      }
    },
    components: {
      headerTitle,
      maskIng
    },
    created() {
      this.httpImg = pubsource.pub_pubf_downlink
    },
    methods: {
      goService(){
        this.phoneNum = true
      },
      removeNeed(value){
        this.phoneNum = value
      },
      goMyOrderList() {
        this.$router.push({
          path: '/myOrderList'
        })
      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .wrapOne {
    height:100%;
    .content {
      height:calc(100% - 100px);
      overflow: scroll;
      .contentAll{
        .title{
          color: #333333;
          font-size: 36px;
          text-align: center;
          padding-top: 40px;
          padding-bottom: 40px;
          box-sizing: border-box;
        }
        background-color: #FFFFFF;
        .content {
          padding: 0 32px;
          box-sizing: border-box;
          font-size: 30px;
          p{
            margin-bottom: 40px;
          }
          ul>li {
            margin-bottom: 35px;
          }
        }
      }
      .user {
        height: 120px;
        display: flex;
        align-items: center;
        margin-bottom: 18px;
        background-color: #FFFFFF;
        img {
          width: 98px;
          height: 98px;
          border-radius: 50%;
          margin: 0 32px;
        }
        .userInfo {
          p:first-child {
            font-size: 30px;
            color: #666666;
          }
          p:last-child {
            font-size: 24px;
            color: #999999;
          }
        }
      }
      .itemAll {
        color: #666666;
        font-size: 30px;
        background-color: #FFFFFF;
        .item {
          width: 100%;
          height: 100px;
          line-height: 100px;
          margin-left: 38px;
          img {
            width: 32px;
            height: 34px;
            margin-right: 12px;
            vertical-align: text-bottom;
          }
        }
        .item:first-child {
          border-bottom: 1px solid rgb(250, 250, 250);
        }
        .item:nth-of-type(2) {
          margin-bottom: 20px;
        }
      }
      .mineItem {
        background-color: white;
        .itemLine {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: white;
          padding: 0 31px;
          box-sizing: border-box;
          border-bottom: 1px solid rgb(246, 246, 246);
          .item_l {
            .item_icon {
              width: 34px;
              height: 32px;
              margin-right: 27px;
              vertical-align: text-bottom;
            }
            .item_name {
              font-size: 30px;
            }
          }
          .item_r {
            span {
              font-size: 30px;
              color: #666666;
              margin-right: 24px;
            }
            .item_arrow {
              width: 14px;
              height: 24px;
            }
          }
        }
        .code {
          text-align: center;
          width: 100%;
          padding-top: 42px;
          padding-bottom: 55px;
          .codeImg {
            width: 166px;
            height: 166px;
            background-color: pink;
            margin: 0 auto;
            margin-bottom: 16px;
            background-image: url("../../../../static/star/ewm.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
</style>
