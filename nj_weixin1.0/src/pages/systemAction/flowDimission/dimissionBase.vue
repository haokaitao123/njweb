<!--一条为一行-->
<template>
  <div>
    <div class="message">
      <div>
        <span>员工工号</span>
        <span>{{empFlowDimission.empdimWorkno}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>中文名</span>
        <span>{{empFlowDimission.empdimCname}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>公司</span>
        <span>{{empFlowDimission.empdimCompanyDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>部门</span>
        <span>{{empFlowDimission.empdimDeptDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>岗位</span>
        <span>{{empFlowDimission.empdimPostDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>雇佣地点</span>
        <span>{{empFlowDimission.empdimHirelocationDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>工作地点</span>
        <span>{{empFlowDimission.empdimWorklocationDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>职位级别</span>
        <span>{{empFlowDimission.empdimPostlevelDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>薪资级别</span>
        <span>{{empFlowDimission.empdimSalarylevelDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>差旅级别</span>
        <span>{{empFlowDimission.empdimTravellevelDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>行政级别</span>
        <span>{{empFlowDimission.empdimAdminlevelDis}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess} from '@/lib/util'
  export default {
    name: "dimissionBase",
    data() {
      return {
      }
    },
    props: {
      empFlowDimission: Object
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
