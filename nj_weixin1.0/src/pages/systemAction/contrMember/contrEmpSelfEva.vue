<!--一条为一行-->
<template>
  <div class="personalText">
    <div class="solution">
      <p>合同期工作业绩:</p>
      <textarea v-model="empFlowContract.empconWorkperformace" readonly
                cols="30" rows="10" placeholder="请填写" class="ipt"></textarea>
    </div>
    <div class="solution">
      <p>合同期工作技能:</p>
      <textarea v-model="empFlowContract.empconWorkskills" readonly
                cols="30" rows="10" placeholder="请填写" class="ipt"></textarea>
    </div>
    <div class="solution">
      <p>合同期团队协作:</p>
      <textarea v-model="empFlowContract.empconTeamwork" readonly
        cols="30" rows="10" placeholder="请填写" class="ipt"></textarea>
    </div>
    <div class="solution">
      <p>合同期组织纪律:</p>
      <textarea v-model="empFlowContract.empconOrgdiscipline" readonly
        cols="30" rows="10" placeholder="请填写" class="ipt"></textarea>
    </div>
    <div class="solution">
      <p>其他评价:</p>
      <textarea v-model="empFlowContract.empconOtherview" readonly
                cols="30" rows="10" placeholder="请填写" class="ipt"></textarea>
    </div>
    <span style="float:right;color: #c0c0c0;font-size: 3px;margin-bottom: 5px">提交时间: {{empFlowContract.updateTime}}</span>
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
  textarea{
    width: 100%;
    height: 200px;
    margin-right: 10px;
    border-bottom: 20px solid #F2F2F2;
  }
  .submit{
    width: 100%;
    height: 86px;
    line-height: 86px;
    text-align: center;
    font-size: 36px;
    background: #FFFFFF;
    button{
      background: #3399FF;
      width: 100%;
      outline: none;
      color: #FFFFFF;
      border:0;
    }
  }
  .personalText{
    wdth:100%;
    padding: 40px  0 0 30px;
    background: white;
    font-size: 30px;
    margin-bottom: 20px;
    .ipt{
      outline: none;
      border:0;
    }
  }
  .solution{
    border-bottom: 20px solid #F2F2F2;
  }
</style>
