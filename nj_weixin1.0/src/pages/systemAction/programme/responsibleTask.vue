<!--负责任务-->
<template>
  <div class="wrap">
    <div class="middle">
      <div class="dateItems">
        <p>日程列表</p>
        <p>{{curveYear}}年{{curveDate}}月{{curveDayA}}日</p>
      </div>
      <img src="../../../.././static/date/wd_14.png" class="ImageRl" alt="" v-show="flag" @click="goDate">
    </div>
    <div class="middle_type">
      <div @click="OrderList(0)" :class="{OrderColor: orderNum == 0}">负责任务</div>
      <div @click="OrderList(1)" :class="{OrderColor: orderNum == 1}">参与任务</div>
    </div>
    <div class="footerAll" v-loading="isLoading">
      <div class="footer" v-for="(item,index) in dataList" @click="goDateTask(item.id)">
        <div class="dateTime">
          <!--<span>{{item.createTime.substring(5,7)}}</span>-->
          <!--<span>今天</span>-->
          <div>{{item.remindStatimeHour}}</div>

        </div>
        <div class="dateList">
          <div>{{item.remindTitle}}</div>
          <!--<div>地点:{{item.remindPlace}}</div>-->
          <div class="dataListOne">
            <div></div>
            <div>{{item.remindStatimeHour}}-{{item.remindStoptimeHour}}</div>
          </div>
        </div>
      </div>
      <NoInfo v-show="NoInfoShow"></NoInfo>
    </div>

    <div class="goNext" @click="goDetails"></div>
  </div>
</template>
<script>
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  import { Toast } from 'mint-ui';
  import NoInfo from '../../../components/NoInfo.vue'
  export default {
    name: 'responsibleTask',
    data() {
      return {
        title:'负责任务',
        flag:true,
        NoInfoShow:false,
        endTime:'',
        startTime:'',
        curveDate:'',//当前月份
        dataList:'',
        curveDay:'',
        dateId:'',
        orderNum: 0,
        isLoading:true
      }
    },
    created(){
        this.curveDate = new Date().getMonth() + 1,
        this.curveDay = new Date().getDate()
        this.curveDayA = new Date().getDate()
      if (this.curveDay < 10) {
        this.curveDay = '0' + this.curveDay
      }
      if (this.curveDate < 10) {
        this.curveDate = '0' + this.curveDate
      }
      this.curveYear = new Date().getFullYear()
    },
    mounted(){
      /*  获取当前第一天  */
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      let  day = new Date(year,month,0);
      this.endTime = year + '-' + month + '-' + day.getDate();

      /* 获取当前最后一天 */
      function getCurrentMonthFirst(){
        var date=new Date();
        date.setDate(1);
        return date;
      }
      let date = getCurrentMonthFirst();
      this.startTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

      this.getData(0)
    },
    methods:{
      OrderList(num) {
        this.isLoading = true
        this.orderNum = num
        this.getData(num)
      },
      goDateTask(id){
        let Id = id
        if (this.orderNum == 0) {
          this.$router.push({
            path:'/dateTaskManage',
            query:{id:Id}
          })
        } else {
          this.$router.push({
            path:'/TakedateTaskManage',
            query:{id:Id}
          })
        }

      },
      getData(num){
        const t = this;
        t.dataList = []
        const data = {
          _mt:'weiXinRemind.getPage',
          funId:'1',
          logType:'负责任务',
          companyId:pubsource.companyId,
          remindPlat:'wx',
          remindMasterSlave:num,
          remindMemid:localStorage.getItem('bus_empid'),
//          remindStatime:this.startTime,
          remindStatime:this.curveYear + '-' + this.curveDate + '-' + this.curveDay + ' ' + "00:00:00",
          remindStoptime:this.curveYear + '-' + this.curveDate + '-' + this.curveDay + ' ' +"23:59:59"
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then(res => {
          if (isSuccess(res, t)) {
            this.dataList = JSON.parse(res.data.content[0].value)
            this.isLoading = false
            if (this.dataList == '') {
              this.NoInfoShow = true
            } else {
              this.NoInfoShow = false
            }
            console.log(this.dataList + '负责任务')
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      goIndex() {
        this.$router.push({
          path:'/mains/mainActions'
        })
      },
      goDate(){
        if (this.orderNum == 0) {
          this.$router.push({
            path:'/dateManage'
          })
        } else {
          this.$router.push({
            path:'/TakeDateManage'
          })
        }

      },
      goDetails() {
        this.$store.state.warnType = ''
        this.$store.state.warnNum = ''
        this.$store.state.warnTitle = ''
        this.$store.state.InviteName = ''
        this.$store.state.InviteCount = ''
        this.$store.commit('dateList/setInvitTime', false)
        this.$store.commit('dateList/setpeoRows', 60)
        this.$router.push({
          path:'/dateDetails'
        })
      }
    },
    components:{
      NoInfo,
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .wrap{
    width:100%;
    height:100%;
    background: #FFFFFF;
    position: relative;
    .top{
      width:100%;
      .title{
        width:100%;
        height:88px;
        background-color: #3399FF;
        font-size: 36px;
        color: #fff;
        text-align: center;
        line-height: 88px;
        position: relative;
      }
      .Image{
        position: absolute;
        left:38px;
        top:25px;
        width:14px;
        height:24px;
      }
    }
    .middle{
      width:100%;
      background-image: url("../../../.././static/date/bj.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      height:160px;
      position: absolute;
      .dateItems{
        display: flex;
        padding: 60px 28px 0 32px;
        box-sizing: border-box;
        justify-content: space-between;
        font-size: 30px;
        color: #FFFFFF;
      }
      .ImageRl{
        position: absolute;
        right:38px;
        top:10px;
        width:60px;
        height:60px;
      }
    }
    .middle_type{
      width:100%;
      height:100px;
      position: absolute;
      top:155px;
      left:0px;
      display: flex;
      line-height: 100px;
      font-size: 30px;
      color: #999999;
      background: white;
      .OrderColor {
        color: #FF9833;
      }
      div{
        flex: 1;
        text-align: center;
      }
    }
    .footerAll{
      width:100%;
      height:calc(100% - 126px * 2);
      overflow: scroll;
      position: absolute;
      top:250px;
      left:0px;
      .footer{
        width:100%;
        padding: 26px 30px 0 30px;
        display: flex;
        .dateTime{
          width: 70px;
          display: flex;
          align-items: center;
          line-height: 50px;
          justify-content: center;
          font-size: 34px;
          div{
            width:100%;
            height:70px;
            background:#3399FF;
            border-radius: 50%;
            border:2px solid #3399FF;
            font-size: 26px;
            color: white;
            text-align: center;
            line-height: 70px;
          }
          span:nth-of-type(1){
            color: #3399FF;
            font-size: 36px;
            font-family: MicrosoftYaHei;
          }
          span:nth-of-type(2){
            color: #3399FF;
            font-size: 24px;
            font-family: MicrosoftYaHei;
          }
        }
        .dateList{
          flex: 1;
          padding-top: 10px;
          padding-bottom: 10px;
          padding-left: 26px;
          box-sizing: border-box;
          margin-left: 24px;
          background: #F3F3F3;
          font-size: 30px;
          border-left: 2px solid red;
          .dataListOne{
            display: flex;
            align-items: center;
            /*div:nth-of-type(1){*/
              /*width:10px;*/
              /*height:10px;*/
              /*border-radius: 50%;*/
              /*background:#3399FF ;*/
              /*margin-right: 30px;*/
            /*}*/
          }
        }
      }
    }
    .goNext{
      position: absolute;
      background-image: url("../../../.././static/date/加拷贝@2x.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width:150px;
      height:150px;
      right: 60px;
      bottom: 135px;
      z-index: 100;
    }
  }

</style>
