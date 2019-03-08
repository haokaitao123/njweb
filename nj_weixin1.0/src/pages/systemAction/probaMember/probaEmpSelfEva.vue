<!--一条为一行-->
<template>
  <div class="personalText">
    <div>
      <p>试用期自我评价</p>
      <textarea readonly v-model="empFlowProbation.empprobSelfeva" cols="30" rows="10" class="ipt"></textarea>
    </div>
    <span style="float:right;color: #c0c0c0;font-size: 3px;">提交时间: {{empFlowProbation.updateTime}}</span>
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
  textarea{
    width: 100%;
    height: 200px;
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
    div{
      border-bottom: 20px solid #F2F2F2;
    }
  }
</style>
