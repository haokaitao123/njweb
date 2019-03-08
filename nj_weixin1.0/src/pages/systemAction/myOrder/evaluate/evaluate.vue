<!--工单评价-->
<template>
<div class="wrap">
  <!--<div class="top">-->
    <!--<div class="title">{{title}}</div>-->
    <!--&lt;!&ndash;<span class="ImageRl" @click="submitEval">提交</span>&ndash;&gt;-->
  <!--</div>-->
  <div class="middle">
     <div class="evalText">
        <div class="evalTitle">您对本次服务的评价</div>
       <div class="stars">
         <div v-for="(item,ind) in num" :key="ind"
              :class="{'on':ind <= cur}"
              @mouseover='enter(ind)'
              @mouseleave="out()"
              @click="ok(ind)">
         </div>
       </div>
       <div class="evalTextList">
         <div v-if="cur >= 0">服务态度一般</div>
         <div v-if="cur >= 1">技术能力一般</div>
         <div v-if="cur >= 2">问题解决速度一般</div>
         <div v-if="cur >= 3">产品功能一般</div>
         <div v-if="cur >= 4">产品稳定性一般</div>
       </div>
     </div>
      <div class="middle_m"></div>
      <div class="middle_f">
        <div class="evalTitle">您的问题是否解决？</div>
        <div class="yesNo">
          <div>
            <img :src="YesImg" alt="" @click="YesComplete">
            <span>已解决</span>
          </div>
          <div>
            <img :src="NoImg" alt="" @click="NoComplete">
            <span>未解决</span>
          </div>
        </div>
      </div>
    <div class="middle_t">
      <div class="evalTitle">告诉我们想要反馈的问题</div>
      <div class="yesNo">
        <textarea name="" v-model="problem" class="public" id="" cols="30" rows="10"></textarea>
      </div>
    </div>
    <div class="middle_s">
      <div @click="submitEval">提交</div>
    </div>
  </div>
</div>
</template>
<script>
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey, deepCopy} from '@/lib/util'
  export default {
    name: 'evaluate',
    data() {
      return {
        title: '用户评价',
        num:5,
        cur:-1,
        flag:false,
        YesImg:'../../../../../static/order/z1.png',
        NoImg: '../../../../../static/order/p1.png',
        aa: true,
        bb: true,
        problem: ''
      }
    },
    created() {
      this.cur = getUrlKey('curNum')
    },
    methods:{
      enter(ind){
        if(!this.flag){
          this.cur=ind;
        }
      },
      submitEval() {
        let cnwd = ''
        if (!this.aa) {
          cnwd = '1'
        }
        if (!this.bb) {
          cnwd = '0'
        }
        const t = this
        const data = {
          _mt:'weiXinWorkorder.addOrUpd',
          cmwdStatus :'06closed',
          cmwdEvaluatedesc: this.problem,
          id : getUrlKey('id'),
          cmwdIssolved: cnwd,
          cmwdEvaluate: this.cur,
          userId : localStorage.getItem('bus_userid'),
          companyId:pubsource.companyId
        }

        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then(res => {
          console.log(res)
          if (res.data.content[0].hasOwnProperty('value')) {
            this.$router.push({
              path: '/myOrderList',
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      out(){
        if(!this.flag){
          this.cur=-1;
        }
      },
      ok(ind){
        this.flag=true;
        this.cur=ind;
      },
      YesComplete() {
        if (this.aa) {
          this.YesImg = '../../../../../static/order/s.png'
          this.NoImg = '../../../../../static/order/p1.png'
          this.bb = true
        } else {
          this.YesImg = '../../../../../static/order/z1.png'
          this.NoImg = '../../../../../static/order/sx.png'
        }
        this.aa = !this.aa
      },
      NoComplete() {
        if (this.bb) {
          this.NoImg = '../../../../../static/order/sx.png'
          this.YesImg = '../../../../../static/order/z1.png'
          this.aa = true
        } else {
          this.NoImg = '../../../../../static/order/p1.png'
          this.YesImg = '../../../../../static/order/s.png'
        }
        this.bb = !this.bb
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import '../../../css/myOrder';
  .middle{
    height: calc(100% - 90px);
    overflow-y: scroll;
    background: white;
    width:100%;
    position: relative;
    .evalText{
      padding: 36px 80px 0 44px;
      .evalTitle{
        font-size: 32px;
        color: #999999;
        margin-bottom: 56px;
      }
      .stars{
        display: flex;
        padding-left: 90px;
      }
      .stars div{
        width: 56px;
        height: 59px;
        background: url('../../../../../static/order/xx1.png') no-repeat;
        background-size: 100% 100%;
        margin-right: 36px;
      }
      .stars .on{
        width: 56px;
        height: 59px;
        background: url('../../../../../static/order/xx2.png') no-repeat;
        background-size: 100% 100%;
      }
      .evalTextList{
        display: flex;
        flex-wrap: wrap;
        margin-top: 40px;
        div{
          width:192px;
          height:60px;
          margin-right: 25px;
          background: #F2F2F2;
          line-height: 60px;
          text-align: center;
          margin-bottom: 28px;
          font-size: 24px;
          color: #333333;
        }
        div:nth-of-type(3){
          margin-right: 0px;
        }
      }
    }
    .middle_m{
      height: 40px;
      background: #F3F3F3;
    }
    .middle_f{
      width:100%;
      padding: 36px 80px 50px 44px;
      border-bottom: 1px solid #E0E0E0;
      .evalTitle{
        font-size: 32px;
        color: #999999;
        margin-bottom: 90px;
      }
      .yesNo{
        width:470px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        div{
          img{
            width:54px;
            height:54px;
          }
          span{
            font-size: 32px;
            color: #999999;
          }
        }
      }
    }
    .middle_t{
      width:100%;
      padding: 36px 80px 50px 44px;
      border-bottom: 1px solid #E0E0E0;
      .evalTitle{
        font-size: 32px;
        color: #999999;
        margin-bottom: 26px;
      }
      textarea{
        width:100%;
        border:1px solid #E3E3E3;
        outline: none;
        height: 250px;
      }
      .public{
        color: #333333;
        font-size: 32px;
      }
    }
    .middle_s{
      width:100%;
      padding: 36px 80px 50px 44px;
      div{
        width:600px;
        height: 60px;
        line-height: 60px;
        font-size: 32px;
        text-align: center;
        background: #3399FF;
        color: white;
        border-radius: 10px;
        margin: auto;
      }
    }
  }

</style>
