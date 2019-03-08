<!--负责任务-->
<template>
  <div class="wrap">
    <div class="top">
      <div class="title">{{title}}</div>
      <span class="ImageRl">{{cmwdTitle}}</span>
    </div>
    <div class="middle" v-loading="isLoading" data-mu-loading-overlay-color="white">
      <div class="orderDetails">
        <div class="orderDetailsImg">
          <img  src="../../../../../static/order/W.png" alt="">
        </div>
        <div class="orderDetailsList">
          <div >问题描述：{{cmwdDesc}}</div>
          <div class="orderDetailsListImg">
            <img src="../../../../../static/date/cy_01.png" alt="">
            <span>
              {{cmwdTime}}
            </span>
          </div>
        </div>
      </div>
      <div class="orderDetails" v-for="item in OrdertDetails">
        <div class="orderDetailsImg">
          <img v-if="item.cmwdrdFeedbacktype === '0' || item.cmwdrdFeedbacktype === '1' " src="../../../../../static/order/allotperson.png" alt="">
          <img v-if="item.cmwdrdFeedbacktype === '2' " src="../../../../../static/order/W.png" alt="">
        </div>
        <div class="orderDetailsList">
          <div>{{item.cmwdrdDesc}}</div>
          <div class="orderDetailsListImg">
            <img src="../../../../../static/date/cy_01.png" alt="">
            <span>
              {{item.createTime}}
            </span>
          </div>
        </div>
      </div>
      <div class="evaluateOrder" v-if="cmwdStatusDis == '05tobeevaluated'">
        <div v-for="(item,ind) in num" :key="ind"
             :class="{'on':ind <= cur}"
             @mouseover='enter(ind)'
             @mouseleave="out()"
             @click="ok(ind)">
        </div>
        <div class="stayStar"></div>
      </div>
    </div>
    <!--继续留言 关闭工单-->
    <div class="closeOrder" v-if=" cmwdStatusDis == '0201open-distribute' || cmwdStatusDis == '03tobefeedback' || cmwdStatusDis == '04tobeconfirmed' || cmwdStatusDis == '0202open'">
      <div>
        <button class="btn1" @click="goOrderMessage">继续留言</button>
      </div>
      <div>
        <button class="btn2" @click="closeOrder">关闭工单</button>
      </div>
    </div>
  </div>
</template>
<script>
  import vue_stars from 'vue-stars'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey, deepCopy} from '@/lib/util'
  export default {
    name: 'OrderList',
    data() {
      return {
        title: '工单',
        num:5,
        cur:-1,
        flag:false,
        cmwdrdWdid: '',
        cmwdStatusDis: '',
        OrdertDetails: '',
        cmwdTime: '',
        cmwdDesc: '',
        isLoading: true,
        cmwdTitle: ''
      }
    },
    created() {
      this.cmwdrdWdid = getUrlKey('name')
      this.cmwdStatusDis = getUrlKey('cmdstatus')
      this.cmwdTime = getUrlKey('creatT')
      this.cmwdDesc = getUrlKey('creatDesc')
      this.cmwdTitle = getUrlKey('creatTitle')
      this.getData(getUrlKey('name'))
    },
    mounted() {
      this.forbidWxBackBtn()
    },
    methods:{
      getData(id) {
        const t = this;
        const data = {
          _mt:'weiXinWorkorder.getOrderRecord',
          companyId:pubsource.companyId,
          userId: localStorage.getItem('bus_userid'),
          cmwdrdWdid: id, // doing done
          logType:'工单详情',
          sort: 'id',
          order: 'asc',
        }
        getDataLevelUserLogin(data).then(res => {
          if (res.data.content[0].hasOwnProperty('value')) {
            console.log(JSON.parse(res.data.content[0].value))
            this.OrdertDetails = JSON.parse(res.data.content[0].value)
            this.isLoading = false
          } else {
            this.isLoading = false
//            this.allOrderList = []
          }
        }).catch(err => {
          console.log(err)
        })
      },
      enter(ind){
        if(!this.flag){
          this.cur=ind;
        }
      },
      out(){
        if(!this.flag){
          this.cur=-1;
        }
      },
      ok(ind){
        this.flag=true;
        this.cur=ind;
        setTimeout(() =>{
          this.$router.push({
            path: '/evaluate',
            query:{
              curNum:this.cur,
              id: this.cmwdrdWdid
            }
          })
        },100)

      },
      closeOrder() {
          const t = this
          const data = {
            _mt:'weiXinWorkorder.addOrUpdOrderrecord',
            cmwdrdFeedback: localStorage.getItem('bus_userid'),
            orderStatus :'05tobeevaluated',
            cmwdrdWdid : this.cmwdrdWdid,
            cmwdrdFeedbacktype: '2',
            userId : localStorage.getItem('bus_userid'),
            companyId:pubsource.companyId,
            cmwdrdDesc:'用户手机关闭工单'
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
      goOrderMessage() {
        this.$router.push({
          path:'/OrderMessage',
          query: {
            id: this.cmwdrdWdid
          },
        })
      },
      forbidWxBackBtn() {
        var bool = false;
        setTimeout(function () {
          bool = true;
        }, 1500);
        window.addEventListener("popstate", function (e) {
          if (bool) {
            this.$router.push({
              path:'/myOrderList'
            })
          }
        }, false);
      },
    },
    components:{
      vue_stars,
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import '../../../css/myOrder';
  .wrap .top .ImageRl{
    font-size: 26px;
    top: 25px
  }
  .closeOrder{
    position: absolute;
    bottom: 66px;
    left:0;
    display: flex;
    width:100%;
    div{
      flex: 1;
      text-align: center;
      button{
        width:270px;
        height: 65px;
      }
      .btn1{
        border:1px solid #3399FF;
        color:#3399FF;
        background: white;
        font-size: 36px;
        outline: none;
      }
      .btn2{
        color:white;
        background: #3399FF;
        font-size: 36px;
        outline: none;
        border:1px solid #3399FF;
      }
    }
  }
  .middle{
    height: calc(100% - 90px);
    overflow-y: scroll;
    padding: 36px 80px 0 44px;
    background: #F3F3F3;
    width:100%;
    position: relative;
    .orderDetails{
      display: flex;
      width:612px;
      margin-bottom: 20px;
      .orderDetailsImg{
        width:54px;
        height:54px;
        margin-right: 20px;
        img{
          width:100%;
          height:100%;
        }
      }
      .orderDetailsList{
        width:500px;
        div:nth-of-type(1) {
          word-wrap: break-word;
          word-break: normal;
          font-size: 32px;
        }
        .orderDetailsListImg{
          img{
            width:30px;
            height:30px;
            vertical-align: text-bottom;
          }
          span{
            font-size: 30px;
            color: #999999;
          }
        }
      }
    }
    .evaluateOrder{
      position: absolute;
      bottom: 0px;
      left:0;
      display: flex;
      width:100%;
      background: white;
      padding-left: 160px;
      height: 100px;
      line-height: 100px;
      padding-top: 10px;
      .stayStar{
        position: absolute;
        left:20px;
        top:10px;
        width: 80px;
        height: 76px;
        background: url('../../../../../static/order/dpj.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .evaluateOrder div{
    width: 76px;
    height: 76px;
    background: url('../../../../../static/order/xx1.png') no-repeat;
    background-size: 100% 100%;
    margin-right: 36px;
  }
  .evaluateOrder .on{
    width: 76px;
    height: 76px;
    background: url('../../../../../static/order/xx2.png') no-repeat;
    background-size: 100% 100%;
  }
</style>
