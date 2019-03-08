<!--合同续签自评-->
<template>
  <div class="wrap">
    <!--<headTitle :title="title" :flag="flagImg"></headTitle>-->
    <router-link tag="div" to="/flowContractList">
      <probationTime></probationTime>
    </router-link>
  </div>
</template>
<script>
  import headTitle from '../../.././components/headTitle.vue'
  import probationTime from '../ProbationPeriod/probationTime.vue'
  export default {
     name:'flowContract',
      data(){
        return{
          title:'合同续签自评',
          flagImg:true
        }
      },
      components:{
        headTitle,
        probationTime
      }
  }
</script>
<style scoped lang="less" type="text/less">
    .wrap{
      height:100%;
      background-color: #F6F6F6;
    }
</style>
