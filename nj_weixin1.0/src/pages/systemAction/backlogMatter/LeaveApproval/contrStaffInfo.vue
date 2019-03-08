<!--一条为一行-->
<template>
  <div>
    <!--<div class="EmployeeInformation">-->
      <div class="message">
        <div>
          <span>合同类别</span>
          <span>{{dataList.empdimContracttypeDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>合同期限</span>
          <span>{{dataList.empdimContractperiodDis}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>合同开始日</span>
          <span>{{dataList.empdimContractsdate}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>合同到期日</span>
          <span>{{dataList.empdimContractedate}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>保密协议</span>
          <span>{{dataList.empdimConfidentialDis}}</span>
        </div>
      </div>
    </div>
    <!--</div>-->
</template>

<script>
  export default {
    name: "contrstaffInfo",
    props:{
      dataList:Object,
    },

  }
</script>

<style scoped type="text/less" lang="less">
  .message{
    border-bottom: 3px solid #E3E3E3;
    width: 100%;
    div{
      display: flex;
      justify-content: space-between;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;
      padding: 45px 35px  26px 32px;
    }

  }
</style>
