<!--使用期时间-->
<template>
  <div class="EmployeeInformation">
    <ul v-for="item in dataList" >
      <li class="Li">
        员工工号：{{item.empkiWorkno}}
        <span class="dateTime">{{item.empkiStatusDis}}</span>
      </li>
      <li>
        唯一标识：{{item.empGid}}
      </li>
      <li>
        中文名：{{item.empCname}}
      </li>
      <li>
        部   门：{{item.empcompDeptDis}}
      </li>
      <li>
        入职日期：{{item.empcompEntrydate}}
      </li>
      <li>
        出生日期：{{item.empBirthdate}}
      </li>
      <div v-show="dataList.length === 1?false:true" style="height: 30px;"></div>
      <div class="emplyImage">
        <img v-if="dataList[0].hasOwnProperty('empphotoupload')" :src="httpImg + item.empphotoupload.split(',')[1]" alt="">
        <img v-else="dataList[0].hasOwnProperty('empphotoupload')" src=" ../../../../static/main/header.png" alt="">
      </div>
    </ul>
    <noInfo class="NoInfo" v-show="noInfo"></noInfo>
  </div>
</template>
<script>
  import noInfo from '../../.././components/NoInfo.vue'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  export default {
    name: "memberResume",
    data() {
      return {
        httpImg:'',
      }
    },
    props:{
      dataList: Array,
      noInfo: Boolean,
    },
    components: {
      noInfo,
    },
    created() {
      this.httpImg = pubsource.pub_pubf_downlink
    },
    methods: {
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .EmployeeInformation {
    width: 100%;
    background: white;
    position: relative;
    margin-bottom: 20px;
    box-sizing: border-box;
    height: calc(100% - 200px);
    overflow: scroll;
    .emplyImage{
      position: absolute;
      top:50px;
      left: 60px;
      width:200px;
      height:200px;
      img{
        width:100%;
        height:100%;
        border-radius: 50%;
      }
    }
    ul{
      padding: 40px 54px 0px 30px;
      border-bottom: 20px solid #F2F2F2;
    }
    ul > li {
      list-style: none;
      font-size: 28px;
      color: #666666;
      margin-bottom: 20px;
      text-align: left;
      padding-left: 340px;
    }
    .Li{
      position: relative;
    }
    .dateTime{
      position: absolute;
      bottom:-300px;
      left:80px;
      color: #84DC76;
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
