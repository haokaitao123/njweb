<!--调动确认-->
<template>
  <div class="wrap">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
    <router-link to="/moveSureList" tag="div">
      <probationTime></probationTime>
    </router-link>

  </div>

</template>

<script>
  import headTitle from '../../.././components/headTitle.vue'
  import probationTime from '../ProbationPeriod/probationTime.vue'
    export default {
        name: "moveSure",
      data(){
          return{
            flagImg:true,
            title:'调动确认'
          }
      },
      components:{
        headTitle,
        probationTime
      }
    }
</script>

<style scoped>

</style>
