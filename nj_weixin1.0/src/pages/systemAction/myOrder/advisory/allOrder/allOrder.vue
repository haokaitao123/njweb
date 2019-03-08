<!--咨询全部工单-->
<template>
  <div class="orderAll">
    <div class="orderOne" v-for="item,index in allOrderList" @click="goOrderDetails(item.id, item.cmwdStatus, item.createTime,item.cmwdDesc, item.cmwdStatusDis)">
      <div>
        {{item.cmwdDesc}}
      </div>
      <div>
        <span style="color: #3399FF;">{{item.cmwdStatusDis}}</span>
        <span>提交时间：{{item.createTime}}</span>
      </div>
      <div class="state state1" v-if="item.cmwdPriority == '01common'">
        一般
      </div>
      <div class="state state2" v-else="item.cmwdPriority == '02Important'">
        重要
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'allOrder',
    data() {
      return {

      }
    },
    props:{
      allOrderList: Array,
    },
    methods:{
      goOrderDetails(id, status,time,desc,title) {
        this.$router.push({
          path:'/orderDetails',
          query: {
            name: id,
            cmdstatus: status,
            creatT:time,
            creatDesc:desc,
            creatTitle:title,
          }
        })
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import '../../../../css/myOrder';
  .orderAll{
    height: calc(100% - 240px);

  }
  .colorA{
    color: #31AF37;
  }
</style>
