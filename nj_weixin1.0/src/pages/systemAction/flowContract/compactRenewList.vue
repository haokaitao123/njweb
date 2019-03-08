<!--合同续签自评-->
<template>
  <div class="wrap">
    <!--<headTitle :title="title" :flag="flagImg"></headTitle>-->
    <probationTime></probationTime>
    <mu-container style="width: 100%">
      <mu-tabs :value.sync="active" color="#FD9DBD" :inverse='true' style="display: flex;overflow-x: scroll" center :full-width="true" class="tabs">
        <mu-tab style="flex: 1;font-size: 15px">合同信息</mu-tab>
        <mu-tab style="flex: 1;font-size: 15px">合同历史</mu-tab>
        <mu-tab style="flex: 1;font-size: 15px">员工自评</mu-tab>
        <mu-tab style="flex: 1;font-size: 15px">经理评估</mu-tab>
      </mu-tabs>
      <div class="demo-text" v-if="active === 0">
        <staffInfo></staffInfo>
      </div>
      <div class="demo-text" v-if="active === 1">
        <!--提交-->
        <div class="submit">
          <button>提交</button>
        </div>
      </div>
      <div class="demo-text" v-if="active === 2">
        <div class="textList">
          <p>合同期工作业绩：</p>
          <p>虽然只有短短的三个月，但学到了很多，感悟了很多，以及对自身一些不足的地方得到了改进与提升。</p>
        </div>
        <div class="textList">
          <p>合同期工作业绩：</p>
          <p>虽然只有短短的三个月，但学到了很多，感悟了很多，以及对自身一些不足的地方得到了改进与提升。</p>
        </div>
        <div class="textList">
          <p>合同期工作业绩：</p>
          <p>虽然只有短短的三个月，但学到了很多，感悟了很多，以及对自身一些不足的地方得到了改进与提升。</p>
        </div>
        <div class="submitTime">
          提交时间：2015.08.05 10:00
        </div>
      </div>
      <div class="demo-text" v-if="active === 3">

      </div>
    </mu-container>
  </div>
</template>
<script>
  import headTitle from '../../.././components/headTitle.vue'
  import probationTime from '../ProbationPeriod/probationTime.vue'
  import staffInfo from '../ProbationPeriod/staffInfo.vue'
  export default {
    name:'compactRenewList',
    data(){
      return{
        title:'合同续签自评',
        flagImg:true,
        active:0
      }
    },
    components:{
      headTitle,
      probationTime,
      staffInfo
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .wrap{
    height:100%;
    width: 100%;
    .tabs{
      width:975px;
      overflow: scroll;
    }
    background-color: #F6F6F6;
    .textList{
      padding: 38px 0 0 26px;
      box-sizing: border-box;
      background-color: #ffffff;
      width:100%;
      font-size: 30px;
      margin-bottom: 10px;
      p:nth-of-type(1){
        color: #666666;
        margin-bottom: 25px;
      }
      p:nth-of-type(2){
        color: #333333;
      }
    }
    .submitTime{
      width:100%;
      text-align: right;
      font-size: 24px;
      color: #999999;
      margin-top: 22px;
    }
  }
</style>
