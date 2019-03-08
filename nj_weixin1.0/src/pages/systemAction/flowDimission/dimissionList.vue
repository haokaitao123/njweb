<!--一条为一行-->
<template>
  <div class="wrap" style="overflow: hidden;position: relative">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
    <!--<div v-show="isBtn" class="leave" @click="selSubor">离职发起</div>-->
    <dimissionResume v-show="!initPage" :dataList="dataList" :isList="isList"></dimissionResume>
    <div v-show="initPage" class="NoInfo">
      <div class="noImg">
        <div class="msg">
          <button @click="selSubor">发起离职</button>
        </div>
      </div>
      <!--<div class="msg"></div>-->
    </div>
  </div>
</template>

<script>
  import headTitle from '../../.././components/headTitle.vue'
  import dimissionResume from './dimissionResume.vue'
  import {getDataLevelNone, getDataLevelUserLogin, getDataLevelUserLoginNew} from '../../.././axios/axios'
  import {isSuccess, strIsnull} from '@/lib/util'

  export default {
    name: "dimissionList",
    data() {
      return {
        title: '主动离职发起',
        flagImg: true,
        initPage: false,
        isBtn: false,
        sort: 'id',
        order: 'desc',
        dataList: [],
        isList: true,
      }
    },
    props: {
    },
    components: {
      headTitle,
      dimissionResume,
    },
    created(){
      const loading = this.$loading({
        overlayColor:'white'
      });
      setTimeout(() => {
        loading.close();
      }, 2000)
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData(){
        const t = this
        t.dataList = []
        const data = {
          _mt:'wxEmpFlowDimission.getEmpFlowDimission',
          companyId: pubsource.companyId,
          busEmpid:localStorage.getItem('bus_empid'),
          busEmpGid:localStorage.getItem('bus_empGid'),
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLogin(data).then(res => {
          if (res.data.content[0].value != undefined && res.data.content[0].value != '') {
            t.dataList.push(JSON.parse(res.data.content[0].value))
            this.isBtn = true // 有数据将离职发起页面放到上面
          } else {
            this.initPage = true // 没有数据显示离职发起界面
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      /*下属发起离职*/
      selSubor() {
        this.$router.push({
          path:'/dimissionDetails',
          query:{ id: localStorage.getItem('bus_empid'), isBase:true}
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
    ul > li {
      list-style: none;
      font-size: 28px;
      color: #666666;
      margin-bottom: 20px;
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
  .NoInfo{
    width:100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    background-color: white;
    z-index: 100;
    .noImg{
      background-image: url("../../../../static/main/fireInit.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width:600px;
      height:400px;
      position: absolute;
      top:250px;
      left:10%;
    }
    .msg{
      width:100%;
      text-align: center;
      color: white;
      position: absolute;
      bottom: -100PX;
      button{
        width:600px;
        height:80px;
        background: #3399FF;
        border:0;
        color: white;
        outline: none;
        font-size: 34px;
        border-radius: 10px;
      }
    }
  }
</style>
