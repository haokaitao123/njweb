<!--使用期时间-->
<template>
  <div class="EmployeeInformation">
    <data value="" v-for="item in dataList">
    <ul >
      <li>
        调动日期:{{item.empintContractworktime}}
      </li>
      <li>
        新部门:{{item.empintNewdeptDis}}
      </li>
      <li>
        新岗位：{{item.empintNewpostDis}}
      </li>
    </ul>
    <div class="state1" v-if="item.empintStpe3State !== 'undefined' && (item.empintStpe3State === 'p_flowst_1' || item.empintStpe3State === 'p_flowst_2')">待提交</div>
    <div class="state2" v-else="">已提交</div>
    </data>
  </div>
</template>

<script>
    export default {
        name: "internaltransferTime",
        props:{
          dataList:Array,
        }
    }
</script>

<style scoped type="text/less" lang="less">
  .EmployeeInformation {
    width: 100%;
    padding: 40px 54px 48px 30px;
    background: white;
    position: relative;
    border-bottom: 1px solid #f0f0f0;
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
