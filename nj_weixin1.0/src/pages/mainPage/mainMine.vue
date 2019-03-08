<template>
  <!--我的-->
  <div class="mineWrap">
    <!--<header-title :title="title"></header-title>-->
    <div class="mineDetail">
      <div class="mineDeatil_l">
        <!---->
        <img v-if="$store.state.InfoList.hasOwnProperty('empphotouploadbigicon')" :src="httpImg + $store.state.InfoList.empphotouploadbigicon.split(',')[1]" alt="" class="avatar">
        <img v-else="$store.state.InfoList.hasOwnProperty('empphotouploadbigicon')" src="../../../static/main/header.png" alt="" class="avatar">
      </div>
      <div class="mineDeatil_r">
        <div class="occupation"><span>{{$store.state.InfoList.empCname}}</span> <span>{{$store.state.InfoList.empGenderDis}}</span> <span>|</span> <span>{{$store.state.InfoList.empcompPostDis}}</span>
        </div>
        <div class="company">
          <span>{{$store.state.InfoList.empcompHirecompanyDis}}</span>
          <span>{{$store.state.InfoList.empcompDeptDis}}</span></div>
        <div class="age">
          <span>司龄:</span>
          <span>{{$store.state.InfoList.ageOfCompany}}</span></div>
      </div>
    </div>
    <div class="mineItem">
      <div class="itemLine" @click="goTopersonInfo">
        <div class="item_l">
          <img src="../../../static/main/wd_01.png" alt="" class="item_icon">
          <span class="item_name">我的档案</span>
        </div>
        <img src="../../../static/action/05.png" alt="" class="item_arrow">
      </div>
      <div class="itemLine" @click="goToSalary">
        <div class="item_l">
          <img src="../../../static/main/wd_02.png" alt="" class="item_icon"> <span class="item_name">薪资查询</span>
        </div>
        <img src="../../../static/action/05.png" alt="" class="item_arrow"></div>
      <div class="itemLine" @click="goToSocialSecurity">
        <div class="item_l">
          <img src="../../../static/main/wd_03.png" alt="" class="item_icon"> <span class="item_name">社保查询</span>
        </div>
        <img src="../../../static/action/05.png" alt="" class="item_arrow"></div>
      <div class="itemLine" @click="goToprovidentFund">
        <div class="item_l">
          <img src="../../../static/main/wd_04.png" alt="" class="item_icon"><span class="item_name">公积金查询</span>
        </div>
        <img src="../../../static/action/05.png" alt="" class="item_arrow">
      </div>
      <div class="itemLine" @click="goSetPassword">
        <div class="item_l">
          <img src="../../../static/main/wd_05.png" alt="" class="item_icon"> <span class="item_name">设置薪资密码</span>
        </div>
        <img src="../../../static/action/05.png" alt="" class="item_arrow"></div>
      <div class="itemLine" @click="goApprovalSet">
        <div class="item_l">
          <img src="../../../static/action/ptsz.png" alt="" class="item_icon"> <span class="item_name">平台设置</span>
        </div>
        <img src="../../../static/action/05.png" alt="" class="item_arrow"></div>
      <div class="itemLine" @click="goToService">
        <div class="item_l">
          <img src="../../../static/main/wd_07.png" alt="" class="item_icon"> <span class="item_name">关于我们</span>
        </div>
        <img src="../../../static/action/05.png" alt="" class="item_arrow"></div>

      <!--<div class="itemLine" @click="goToAbout">-->
        <!--<div class="item_l">-->
          <!--<img src="../../../static/main/wd_07.png" alt="" class="item_icon"> <span class="item_name">关于</span>-->
        <!--</div>-->
        <!--<img src="../../../static/action/05.png" alt="" class="item_arrow"></div>-->
      <div class="itemLine">
        <div class="item_l">
          <img src="../../../static/main/wd_08.png" alt="" class="item_icon"> <span class="item_name">版本更新</span>
        </div>
        <span class="item_version">当前最新版本5.24.2</span></div>
    </div>
  </div>
</template>
<script>
  import headerTitle from '../../components/headTitle.vue';
  import Bus from '@/lib/bus'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  export default {
    name: 'mainMine', data() {
      return {
        title: '我的',
        name:localStorage.getItem('bus_empCname'),
        sex:localStorage.getItem('bus_empGenderDis'),
        InfoMsg:'',
        httpImg:'',
      }
    },
    components: {
      headerTitle
    },
    mounted() {
//      Bus.$on('getData', ()=>{
//        this.getData()
//      })
    },
    created() {
      this.httpImg = pubsource.pub_pubf_downlink
    },
    methods: {
      getData(){
        const t = this;

      },
      goToAbout() {
        this.$router.push({
          path:"/mains/about"
        })
      },
      goToService () {
        this.$router.push({
          path: "/mains/customerService"
        })
      },
      goApprovalSet () {
        this.$router.push({
          path: "/approvalSet"
        })
      },
      goTopersonInfo(){
      	this.$router.push({
          path: "/personInfoDetails"
        })
      },
      goToSalary(){
        this.$router.push({
          path: "/mains/salary"
        })
      },
      goToSocialSecurity(){
      	this.$router.push({
          path: "/mains/socialSecurity"
        })
      },
      goToprovidentFund(){
      	this.$router.push({
          path: "/mains/providentFund"
        })
      },
      goSetPassword(){
        console.log(this.getData())
        let data = {
          _mt:'wxSalaryPwd.getUserPwd',
          companyId:pubsource.companyId,
//          wxUserId:localStorage.getItem('wx_userId'),
          wxUserId:'1000',
          userId:localStorage.getItem('bus_userid'),
          busEmpid:localStorage.getItem('bus_empid'),
          md5pwd:'',
          oldPwd:''
        }
        getDataLevelUserLogin(data).then(res =>{
          if (isSuccess(res,this)){
//              console.log(res.data.content[0].value)
//              alert(this.type)
            if(res.data.content[0].value === 1) {  /// == 1 新增
              this.$router.push({
                path: "/newPassword",
                query:{
                  type:res.data.content[0].value
                }
              })
            } else if(res.data.content[0].value === 2) {  /// == 2 修改
              this.$router.push({
                path: "/setPassword",
                query:{
                  type:res.data.content[0].value
                }
              })
            }
          }
        }).catch(err =>{
          console.log(err)
        })
      }
    }
  } </script>
<style type="text/less" lang="less" scoped> .mineWrap {
  width: 100%;
  height: calc(100% - 110px);
  overflow: scroll;
  background-color: #F6F6F6;
  .mineDetail {
    width: 100%;
    height: 269px;
    background-image: url(../../../static/main/bg_01.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .mineDeatil_l {
      margin-left: 30px;
      margin-right: 21px;
      .avatar {
        width: 130px;
        height: 130px;
        border-radius: 50%;
      }
    }
    .mineDeatil_r {
      color: white;

      .occupation {
        font-size: 34px;
        span:nth-of-type(1) {
          margin-right: 35px;
        }
        span:nth-of-type(3) {
          margin-left: 27px;
          margin-right: 28px;
        }
      }
      .company {
        font-size: 28px;
        span:first-child {
          margin-right: 31px;
        }
      }
      .age{
        font-size: 28px;
      }
    }
  }
  .mineItem {
    .itemLine {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      padding: 0 31px;
      box-sizing: border-box;
      .item_l {
        .item_icon {
          width: 34px;
          height: 32px;
          margin-right: 27px;
          vertical-align: text-bottom;
        }
        .item_name {
          font-size: 30px;
        }
      }
      .item_arrow {
        width: 14px;
        height: 24px;
      }
      .item_version {
        font-size: 24px;
        color: #999999;
      }
    }
    .itemLine:first-child {
      margin-bottom: 20px;
    }
    .itemLine:nth-of-type(5) {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .itemLine:nth-of-type(6) {
      margin-bottom: 20px;
    }
    .itemLine:nth-of-type(2), .itemLine:nth-of-type(3), .itemLine:nth-of-type(7) {
      border-bottom: 1px solid rgb(246, 246, 246);
    }
  }
}
</style>
