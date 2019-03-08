<!--一条为一行-->
<template>
  <div>
    <div class="EmployeeInformation">
      <data value="" v-for="item in dataList">
        <div style="border-bottom-style: solid; border-bottom-width: 1px; border-bottom-color: #c0c0c0; margin-bottom: 30px">
        <ul >
          <li>
            公 司:{{item.empctHirecompanyDis}}
          </li>
          <li>
            部 门:{{item.empctDeptDis}}
          </li>
          <li>
            合同类别：{{item.empctContracttypeDis}}
          </li>
          <li>
            合同期限：{{item.empctContractperiodDis}}
          </li>
          <li>
            合同开始日：{{item.empctContractsdate}}
          </li>
          <li>
            合同到期日：{{item.empctContractedate}}
          </li>
        </ul>
        </div>
      </data>
    </div>
    </div>
</template>

<script>
  export default {
    name: "contrstaffInfo",
    props:{
      dataList:Array,
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
  .EmployeeInformation {
    width: 100%;
    padding: 40px 54px 48px 30px;
    background: white;
    position: relative;
    margin-bottom: 20px;
    ul > li {
      list-style: none;
      font-size: 28px;
      color: #666666;
      margin-bottom: 20px;
    }
    .dateColor {
      color: #FF850E;
      margin-bottom: 0;
    }
    .state1 {
      position: absolute;
      top: 50px;
      right: 30px;
      color: #F44336;
      font-size: 28px;
    }
    .state2 {
      position: absolute;
      top: 50px;
      right: 30px;
      color: #4cb050;
      font-size: 28px;
    }
  }
</style>
