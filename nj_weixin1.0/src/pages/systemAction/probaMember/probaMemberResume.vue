<!--一条为一行-->
<template>
  <div>
    <div class="EmployeeInformation">
      <ul v-for="item in dataList" @click="detail(item.id)">
        <li class="Li">
          员   工：{{item.empprobCname}}
          <span v-show="item.empprobStpe3State === 'p_flowst_3'" class="dateTime1">已提交</span>
          <span v-show="item.empprobStpe3State !== 'p_flowst_3'" class="dateTime2">待提交</span>
        </li>
        <li>
          公   司：{{item.empprobHirecompanyDis}}
        </li>
        <li>
          部   门：{{item.empprobDeptDis}}
        </li>
        <li>
          岗   位：{{item.empprobPostDis}}
        </li>
        <li class="dateTime3">
          试用期到期日：{{item.empprobProbationdate}}
        </li>
        <li v-show="dataList.length === 1?false:true">
          <p style="height: 10px"></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin, getDataLevelUserLoginNew} from '../../.././axios/axios'
  import {isSuccess, strIsnull} from '@/lib/util'

  export default {
    name: "probaMemberResume",
    data() {
      return {
      }
    },
    props: {
      dataList: Array
    },
    components: {
    },
    methods: {
      detail(id) {
        this.$router.push({
          path:'/probaMemberDetails',
          query:{ id: id}
        })
      }
    },
  }
</script>

<style scoped type="text/less" lang="less">
  @import '../../css/common_inform';
  .EmployeeInformation {
    width: 100%;
    background: white;
    position: relative;
    margin-bottom: 20px;
    box-sizing: border-box;
    height: calc(100% - 88px);
    overflow: scroll;
    ul{
      padding: 40px 54px 0px 30px;
      border-bottom: 20px solid #F2F2F2;
    }
    ul > li {
      list-style: none;
      font-size: 28px;
      color: #666666;
      margin-bottom: 20px;
      .Imgae{
        width:40px;
        float: right;
      }
    }
    .Li{
      position: relative;;
    }
    .dateTime1{
      position: absolute;
      top:0;
      right:0;
      color: #84DC76;
    }
    .dateTime2{
      position: absolute;
      top:0;
      right:0;
      color: #ff0000;
    }
    .dateTime3{
      color: #e69138;
    }
    .dateColor {
      color: #FF850E;
      margin-bottom: 0;
    }
    .state {
      position: absolute;
      top: 50px;
      right: 30px;
      color: #F44336;
      font-size: 28px;
    }
  }
</style>
