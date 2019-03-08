<template>
  <div class="wrap">
    <!--<headTitle :title="title" :flag="flagImg"></headTitle>-->
    <div class="login">
        <div>
          <img src="../.././static/action/dl_01.png" alt="">
        </div>
        <div style="position: relative">
          <p>人力资源共享服务平台</p>
          <p>员工端自动登录</p>
          <div v-loading="flag" data-mu-loading-overlay-color="rgba(255, 255, 255, .6)" class="loading"></div>
        </div>
      <div>

      </div>

    </div>
    <!--<a :href="wxurl">Wei xin Login</a>-->
  </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull} from '@/lib/util'
  import headTitle from '.././components/headTitle.vue'
  import { Toast } from 'mint-ui';
  export default {
    name: 'wxLoginRedirectUrl',
    data() {
      return {
        usercode: '',
        rtnstate: '',
        wxMobile: '',
        wxurl: '',
        title:'自动登录',
        flagImg: false,
        loading: false,
        flag:true,
      }
    },
    created() {
      window.localStorage.clear();
      this.wxurl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + pubsource.corpId + '&redirect_uri='
        + encodeURI('http://demo.hrocloud.com:6600/wxloginredirect')
        + '&response_type=code&scope=snsapi_base&agentid=' + pubsource.appSecret + '&state=tsweixin#wechat_redirect'
      //      console.info('wxurl: ' + this.wxurl)

//      let storage = window.localStorage;
//      this.wx_mobile = storage.getItem("wx_mobile");
//      if (!strIsnull(this.wx_mobile)) {
////        alert("mobile login.")
//        this.wxLogin()
//      } else {
        this.wx_mobile= this.$route.query.mobile
//        this.wxLogin()
        if (strIsnull(this.wx_mobile)) {
          this.wx_mobile = ""
        }
        this.usercode = this.$route.query.code
        this.rtnstate = this.$route.query.state
        //      alert(this.usercode)
        //      alert(this.rtnstate)
        if (!strIsnull(this.usercode) && !strIsnull(this.rtnstate)) {
//          alert("Code login.")
          this.wxLogin()
        }
//      }
    },
    methods: {
      wxLogin() {
        const t = this
        let params = {
          _mt: "wxLogin.login",
          companyId: pubsource.companyId,
          userCode: t.usercode,
          state: t.rtnstate,
          wxMobile: t.wx_mobile,
        }
        getDataLevelNone(params).then((res) => {
          if (isSuccess(res, t)) {
            this.flag = false
            let rtndata = res.data.content[0]
//            console.info(rtndata)
//            alert(rtndata.wx_userId)
            let storage = window.localStorage;
            storage.setItem("wx_userId", rtndata.wx_userId);  //微信userId
            storage.setItem("wx_mobile", rtndata.wx_mobile);  //手机号
            storage.setItem("wx_avatar", rtndata.wx_avatar);  //微信头像url
            storage.setItem("bus_userid", rtndata.bus_userid);  //业务用户ID
            storage.setItem("bus_empid", rtndata.bus_empid);  //业务员工ID
            storage.setItem("bus_empGid", rtndata.bus_empGid);  //业务员工GID
            storage.setItem("bus_empWorkno", rtndata.bus_empWorkno);  //业务员工工号
            storage.setItem("bus_empCname", rtndata.bus_empCname);  //员工中文名
            storage.setItem("bus_empBirthday", rtndata.bus_empBirthday);  //生日
            storage.setItem("bus_empGender", rtndata.bus_empGender);  //性别
            storage.setItem("bus_empGenderDis", rtndata.bus_empGenderDis);  //性别显示
            storage.setItem("bus_empStatus", rtndata.bus_empStatus);  //业务员工状态
            storage.setItem("bus_empStatusDis", rtndata.bus_empStatusDis);  //业务员工状态显示
            storage.setItem("token", rtndata.token);
            storage.setItem("webToken", rtndata.webToken);
            storage.setItem("sysdeviceId", rtndata.sysdeviceId);//系统设备id
            storage.setItem("wx_email", rtndata.bus_empCompmail);//系统设备id
            t.$router.replace('/mains/Online');
            t.getData()
          }
        }).catch((res) => {
          console.error(res.data.stat.stateList[0].desc)
          Toast({
            message: res.data.stat.stateList[0].desc,
            position: 'middle',
            duration: 2000
          });
        })
      },
      getData() {
        const t = this;
        getDataLevelUserLogin({
          _mt: 'weiXinEmpInfo.getEmpInfoByIds',
          ids: localStorage.getItem('bus_empid'),
          companyId: pubsource.companyId
        }).then(res => {
//          console.log(JSON.parse(res.data.content[0].value))
          this.InfoMsg = JSON.parse(res.data.content[0].value)[0]
          this.$store.commit('InfoList',this.InfoMsg)
        }).catch(err =>{
          console.log(err)
        })
      },
    },
    components:{
      headTitle,
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/less" lang="less">
    .login{
      width:404px;
      margin: 0 auto;
      margin-top: 80px;
      div:nth-of-type(1){
        width:100%;
        img{
          width:100%;
        }
      }
      div:nth-of-type(2){
        p:nth-of-type(1){
          font-size: 36px;
          color: #3399FF;
        }
        p:nth-of-type(2){
          font-size: 30px;
          color: #969696;
          text-align: center;
        }
      }
      .loading{
        width: 100%;
        position: absolute;
        height: 200px;
      }
    }
</style>
