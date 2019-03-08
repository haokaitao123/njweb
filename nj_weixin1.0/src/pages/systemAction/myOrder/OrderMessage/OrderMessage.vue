<!--工单留言-->
<template>
  <div class="wrap">
    <!--<div class="top">-->
      <!--<div class="title">{{title}}</div>-->
      <!--<span class="ImageRl" @click="submitOrder">提交</span>-->
    <!--</div>-->
    <div class="problemDescribe">
      <div>问题描述</div>
      <div>
        <textarea name="" v-model="problem" class="public"  id="" cols="40" rows="5"></textarea>
      </div>
    </div>
    <div class="optional">
      选填项
    </div>
    <div class="problemDescribe">
      <div>图片</div>
      <div class="problemDescribeImg">
        <input type="file">
        <img src="../../../../../static/order/k.png" alt="">
      </div>
      <div>
        <!--<img v-for="item in impUrl" :src="item" style="width: 50px;height: 50px;">-->
      </div>
      <div>机密信息</div>
      <div>
        <textarea name="" v-model="message" class="public"  cols="40" rows="5"></textarea>
      </div>
    </div>
    <div class="problemDescribeS">
      <div @click="submitOrder">提交</div>
    </div>
  </div>
</template>
<script>
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey, deepCopy} from '@/lib/util'
  export default {
    name: 'OrderMessage',
    data() {
      return {
        title: '继续留言',
        problem: '',
        message: '',
      }
    },
    methods:{
      submitOrder() {
        const t = this
        const data = {
          _mt:'weiXinWorkorder.addOrUpdOrderrecord',
          cmwdrdFeedback: localStorage.getItem('bus_userid'),
          orderStatus :'0202open',
          cmwdrdDesc : this.problem,
          cmwdrdWdid : getUrlKey('id'),
          cmwdrdConfidentialinfo : this.message,
          cmwdrdFeedbacktype: '2',
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
//              query:{
//                name:JSON.parse(res.data.content[0].value).cmwdrdWdid,
//                cmdstatus: JSON.parse(res.data.content[0].value).orderStatus
//              }
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import '../../../css/myOrder';
  .wrap{
    background: white;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .problemDescribe{
    padding: 0 40px;
    width:100%;
    .public{
      color: #333333;
      font-size: 32px;
    }
    .problemDescribeImg{
      width:120px;
      height:120px;
      position: relative;
      input{
        border:0;
        width:120px;
        height:90px;
        opacity: 0;
        z-index: 10;
        position: absolute;
        top:0;
        left:0;
      }
      img{
        position: absolute;
        top:0;
        left:0;
        width:120px;
        height:120px;
      }
    }
    div:nth-of-type(1){
      padding: 20px 0;
      font-size: 32px;
      color: #999999;
    }
    div:nth-of-type(4){
      padding: 20px 0;
      font-size: 32px;
      color: #999999;
    }
    textarea{
      width:100%;
      border:1px solid #E3E3E3;
      outline: none;
    }
  }
  .problemDescribeS{
    padding: 0 40px;
    width:100%;
    margin-top: 40px;
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
  .optional{
    height: 82px;
    font-size: 32px;
    background: #f6f6f6;
    line-height: 82px;
    padding-left: 40px;
  }
</style>
