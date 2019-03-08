<!---->
<template>
  <div class="EmployeeInformation">
    <data value="" v-for="item in dataList" @click="goDetails(item)">
      <ul >
        <li>
          出国标题:{{item.passTitle}}
        </li>
        <li>
          目的地:{{item.passDestination}}
        </li>
        <li>
          开始时间：{{item.passDatesta}}
        </li>
        <li>
          结束时间：{{item.passDatestop}}
        </li>
        <!--class="dateColor"-->
        <li>
          姓名：{{item.passName}}
        </li>
        <li>
          本次签证办理领区：{{item.passNowareaDis}}
        </li>
      </ul>
      <div class="state1" v-if="item.thisStepstate !== 'undefined' && (item.thisStepstate === 'p_flowst_1' || item.thisStepstate === 'p_flowst_2')">待提交</div>
      <div class="state2" v-else="">已提交</div>
    </data>
  </div>
</template>

<script>
  export default {
    name: "goAbroadSure",
    props:{
      dataList:Array,
    },
    methods:{
      goDetails(item) {
        this.$router.push({
          path:'/goAbroadPreDet',
          query:{
            params:JSON.stringify(item)
          }
        })
      }
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
