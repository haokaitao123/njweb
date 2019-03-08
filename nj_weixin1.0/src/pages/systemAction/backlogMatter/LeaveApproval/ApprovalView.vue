
<template>
  <div class="EmployeeInformation">
    <ul >
      <li>
        中文名 :{{dataList.empdimCname}}
      </li>
      <li>
        公   司:{{dataList.empdimCompanyDis}}
      </li>
      <li>
        部   门：{{dataList.empdimDeptDis}}
      </li>
      <li>
        离职类型：{{dataList.empdimDimtypeDis}}
      </li>
      <li>
        申请日期：{{dataList.empdimApplydate}}
      </li>
      <li class="dateColor">
        最后雇佣日期：{{dataList.empdimLaskemployday}}
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
