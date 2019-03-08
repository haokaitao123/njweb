<!--一条为一行-->
<template>
  <div>
    <div class="message">
      <div>
        <span>中文名</span>
        <span>{{empFlowProbation.empprobCname}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>手机号码</span>
        <span>{{empFlowProbation.empprobMobile}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>雇佣公司</span>
        <span>{{empFlowProbation.empprobHirecompanyDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>部门</span>
        <span>{{empFlowProbation.empprobDeptDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>岗位</span>
        <span>{{empFlowProbation.empprobPostDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>职位级别</span>
        <span>{{empFlowProbation.empprobPostlevelDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>薪资级别</span>
        <span>{{empFlowProbation.empprobSalarylevelDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>差旅级别</span>
        <span>{{empFlowProbation.empprobTravellevelDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>行政级别</span>
        <span>{{empFlowProbation.empprobAdminlevelDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>合同类别</span>
        <span>{{empFlowProbation.empprobContracttypeDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>合同期限</span>
        <span>{{empFlowProbation.empprobContractperiodDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>合同开始日</span>
        <span>{{empFlowProbation.empprobContractsdate}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>合同到期日</span>
        <span>{{empFlowProbation.empprobContractedate}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>试用期限</span>
        <span>{{empFlowProbation.empprobProbationDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>试用期到期日</span>
        <span>{{empFlowProbation.empprobProbationdate}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess} from '@/lib/util'
  export default {
    name: "probaMemberBase",
    data() {
      return {
      }
    },
    props: {
      empFlowProbation: Object
    },
    mounted() {

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
