
<template>
  <div class="EmployeeInformation">
    <ul >
      <li>
        中文名 :{{dataList.empintCname}}
      </li>
      <li>
        公   司:{{dataList.empintHirecompanyDis}}
      </li>
      <li>
        调动日期：{{dataList.empintContractworktime}}
      </li>
      <li>
        新部门：{{dataList.empintNewdeptDis}}
      </li>
      <li>
        新岗位：{{dataList.empintNewpostDis}}
      </li>
    </ul>
    <!--<div class="state1" v-if="item.empconstep2status !== 'undefined' && (item.empconstep2status === 'p_flowst_1' || item.empconstep2status === 'p_flowst_2')">待提交</div>-->
    <!--<div class="state2" v-else="">已提交</div>-->
  </div>
</template>

<script>
    export default {
        name: "ApprovalView",
        props:{
          dataList:Object,
        }
    }
</script>

<style scoped type="text/less" lang="less">
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
