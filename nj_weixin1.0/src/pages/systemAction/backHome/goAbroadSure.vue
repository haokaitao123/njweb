<!---->
<template>
  <div class="EmployeeInformation">
    <div class="EmployeeInformationOne" value="" v-for="item in dataList" @click="goDetails(item)">
      <ul >
        <li>
          出国标题:{{item.returnTitle}}
        </li>
        <li>
          目的地：{{item.returnDestinationDis}}
        </li>
        <li>
          开始时间：{{item.returnDatesta}}
        </li>
        <li>
          结束时间：{{item.returnDatestop}} {{'    (' + '共' +  item.returnDaynum + '天)'}}
        </li>
        <li>
          姓名：{{item.returnName}}
        </li>
      </ul>
      <div class="state1" v-if="item.stepState !== 'undefined' && (item.stepState === 'p_flowst_1' || item.stepState === 'p_flowst_2')">待提交</div>
      <div class="state2" v-else="">已提交</div>
    </div>
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
              path:'/backHome',
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
    background: #f6f6f6;
    margin-bottom: 20px;
    overflow-y: scroll;
    .EmployeeInformationOne{
      position: relative;
      background: white;
    }
    ul{
      padding: 40px 54px 48px 30px;
      margin-bottom: 20px;
    }
    ul > li {
      list-style: none;
      font-size: 28px;
      color: #666666;
      margin-bottom: 10px;
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
