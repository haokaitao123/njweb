<!--一条为一行-->
<template>
  <div>
    <div class="message">
      <div>
        <span>员工工号</span>
        <span>{{empFlowContract.empconWorkno}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>唯一标识号</span>
        <span>{{empFlowContract.empconGid}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>中文名</span>
        <span>{{empFlowContract.empconCname}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>入职日期</span>
        <span>{{empFlowContract.empconEntrydate}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>公司</span>
        <span>{{empFlowContract.empconHirecompanyDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>部门</span>
        <span>{{empFlowContract.empconDeptDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>岗位</span>
        <span>{{empFlowContract.empconPostDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>业务上级经理</span>
        <span>{{empFlowContract.empconBuspmpDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>原合同到期日</span>
        <span>{{empFlowContract.empconOrgcontredate}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess} from '@/lib/util'
  export default {
    name: "contrMemberBase",
    data() {
      return {
      }
    },
    props: {
      empFlowContract: Object
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
