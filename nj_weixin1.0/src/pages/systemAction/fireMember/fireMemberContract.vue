\<!--一条为一行-->
<template>
  <div>
    <div class="message">
      <div>
        <span>合同类别</span>
        <span>{{empFlowDimission.empdimContracttypeDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>合同期限</span>
        <span>{{empFlowDimission.empdimContractperiodDis}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>合同开始日</span>
        <span>{{empFlowDimission.empdimContractsdate}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>合同到期日</span>
        <span>{{empFlowDimission.empdimContractedate}}</span>
      </div>
    </div>
    <div class="message">
      <div>
        <span>保密协议</span>
        <span>{{empFlowDimission.empdimConfidentialDis}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess} from '@/lib/util'
  export default {
    name: "fireMemberContract",
    data() {
      return {
      }
    },
    mounted() {
    },
    props: {
      empFlowDimission: Object,
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
