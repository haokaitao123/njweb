<!--工单list-->
<template>
  <div class="wrap">
    <div class="top">
      <div class="title">{{title}}</div>
      <img src="../../../../../static/order/xx.png" class="Image" alt="" @click="goSubmitOrder">
    </div>
    <!--<div class="middle">-->
    <!--<div @click="OrderList(1)" :class="{OrderColor: orderNum == 1}">咨询工单</div>-->
    <!--<div @click="OrderList(2)" :class="{OrderColor: orderNum == 2}">业务工单</div>-->
    <!--</div>-->
    <div class="footer">
      <mu-container center class="container">
        <mu-tabs :value.sync="active" color="#FD9DBD" :inverse='true'
                 style="display: flex;overflow-x: scroll;height: 100%" class="tabs">
          <mu-tab style="font-size: 16px;flex: 1" @click="orderAll">全部</mu-tab>
          <mu-tab style="font-size: 16px;flex: 1" @click="orderUnder">进行中</mu-tab>
          <mu-tab style="font-size: 16px;flex: 1" @click="orderComplete">已完成</mu-tab>
          <!--<mu-tab style="font-size: 15px">在线确认</mu-tab>-->
        </mu-tabs>
      </mu-container>
      <div class="teamDetails" style="position: relative">
        <div class="teamDetail"  v-loading="isLoading">
        <div class="demo-text" v-if="active === 0">
          <allOrder  :allOrderList="allOrderList"></allOrder>
        </div>
        <div class="demo-text" v-if="active === 1">
          <underway :allOrderList="allOrderList"></underway>
        </div>
        <div class="demo-text" v-if="active === 2">
          <complete :allOrderList="allOrderList"></complete>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
  import allOrder from '../advisory/allOrder/allOrder.vue'
  import complete from '../advisory/complete/complete.vue'
  import underway from '../advisory/underway/underway.vue'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey, deepCopy} from '@/lib/util'

  export default {
    name: 'myOrderList',
    data() {
      return {
        title: '我的工单',
        active: 0,
        orderNum: 1,
        allOrderList: [],
        isLoading: true,
      }
    },
    components: {
      allOrder,
      complete,
      underway,
    },
    created() {
      this.getData('all')
    },
    methods: {
//      OrderList(num) {
//        this.orderNum = num
//      },
      goSubmitOrder() {
        this.$router.push({
          path: '/OrderList'
        })
      },
      getData(states) {
        const t = this;
        const data = {
          _mt: 'weiXinWorkorder.getList',
          companyId: pubsource.companyId,
          userId: localStorage.getItem('bus_userid'),
          woBusiProp: '01consultation',
          woStatus: states, // doing done
          logType: '工单列表',
          rows: '10',
          page: '1',
          sort: 'id',
          order: 'desc',
        }
        getDataLevelUserLogin(data).then(res => {
          if (res.data.content[0].hasOwnProperty('value')) {
            console.log(JSON.parse(res.data.content[0].value))
            this.allOrderList = JSON.parse(res.data.content[0].value).rows
            this.isLoading = false
          } else {
            this.allOrderList = []
          }
        }).catch(err => {
          console.log(err)
        })
      },
      orderAll() {
        this.isLoading = true
        this.allOrderList = []
        this.getData('all')
      },
      orderUnder() {
        this.isLoading = true
        this.allOrderList = []
        this.getData('doing')
      },
      orderComplete() {
        this.isLoading = true
        this.allOrderList = []
        this.getData('done')
      },
    },
  }
</script>
<style scoped lang="less" type="text/less">
  @import '../../../css/myOrder';

  .middle {
    height: 120px;
    line-height: 120px;
    display: flex;
    font-size: 32px;
    color: #999999;
    background: white;
    margin-bottom: 10px;
    width: 100%;
    .OrderColor {
      color: #FF9833;
    }
    div {
      flex: 1;
      text-align: center;
    }
  }

  .footer {
    width: 100%;
    height: calc(100% - 195px);
    .container {
      height: 90px;
    }
    .teamDetails{
      height: 100%;
      overflow-y: scroll;
    }
    .teamDetail {
      height: 100%;
    }
  }
</style>
