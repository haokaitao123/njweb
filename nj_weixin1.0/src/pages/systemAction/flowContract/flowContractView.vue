
<template>
  <div class="EmployeeInformation">
    <data value="" v-for="item in dataList">
    <ul >
      <li>
        公 司:{{item.empconHirecompanyDis}}
      </li>
      <li>
        部 门:{{item.empconDeptDis}}
      </li>
      <li>
        岗 位：{{item.empconPostDis}}
      </li>
      <li class="dateColor">
        原合同到期日：{{item.empconOrgcontredate}}
      </li>
    </ul>
    <div class="state1" v-if="item.empconstep2status !== 'undefined' && (item.empconstep2status === 'p_flowst_1' || item.empconstep2status === 'p_flowst_2')">待提交</div>
    <div class="state2" v-else="">已提交</div>
    </data>
  </div>
</template>

<script>
    export default {
        name: "probationTime",
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
