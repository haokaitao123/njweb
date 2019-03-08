<!--每一个任务详情-->
<template>
  <div class="wrap">
    <!--<div class="top">-->
      <!--<div class="title">{{title}}</div>-->
      <!--<img src="../../../.././static/action/jt_01.png" class="Image" alt="" v-show="flag" @click="goNext">-->
      <!--&lt;!&ndash;<span class="ImageRl" @click="complete">完成</span>&ndash;&gt;-->
    <!--</div>-->
    <div class="middle">
      <div class="dateItems">
        <p>{{dataList.remindTitle}}</p>
      </div>
    </div>
    <div class="dateTime">
      <div class="date">
        <p>{{dataTime.dataStartTime}}</p>
        <p>{{dataList.remindStatimeHour}}</p>
      </div>
      <div class="date">
        <p>{{dataTime.dataEndTime}}</p>
        <p>{{dataList.remindStoptimeHour}}</p>
      </div>
      <div class="dateTimeImg"></div>
    </div>
    <div class="alert">
      <div>
        <img src="../../../.././static/date/cy_05.png" alt="">
        <span>地点</span>
      </div>
      <div>
        <span>{{dataList.remindPlace}}</span>
        <img src="../../../.././static/action/05.png" alt="">
      </div>
    </div>
    <div class="alert">
      <div>
        <img src="../../../.././static/date/cy_03.png" alt="">
        <span>邀请参与人员</span>
      </div>
      <div>
        <span>{{dataList.remindMemidDis}}</span>
        <img src="../../../.././static/action/05.png" alt="">
      </div>
    </div>
    <div class="alert">
      <div>
        <img src="../../../.././static/date/cy_04.png" alt="">
        <span>提醒{{dataList.remindAdvanceNum}}{{dataList.remindAdvance == "hourtype" ? '小时' :"分钟"}}</span>
      </div>
      <div>
        <span></span>
        <img src="../../../.././static/action/05.png" alt="">
      </div>
    </div>

    <div class="alert">
      <div>
          <div>附件</div>
          <div><a href="javascript:;" @click="downloadDocs(fileKey, fileName)">{{ fileName }}</a></div>
      </div>
    </div>

    <div class="goNext" @click="dateRemove"></div>
  </div>
</template>
<script>
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  export default {
    name: 'dateTaskManage',
    data() {
      return {
        title:'日程详情',
        flag:true,
        dateId:'',
        dataList:'',
        dataTime:{
          dataStartTime:'',
          dataEndTime:''
        },
        fileName:'',
        fileKey: ''
      }
    },
    created(){
      this.dateId = getUrlKey('id')
      this.getData()
    },
    methods:{
      getData(){
        const t = this;
        const data = {
          _mt:'weiXinRemind.getById',
          funId:'1',
          companyId:pubsource.companyId,
          logType:'日程详情',
          id:t.dateId
        }
        getDataLevelUserLogin(data).then(res =>{
          if (isSuccess(res,t)){
            this.dataList = JSON.parse(res.data.content[0].value)[0]
            console.log(this.dataList)
            this.fileName = Object.keys(JSON.parse(this.dataList.remindFile))[0]
            this.fileKey = Object.values(JSON.parse(this.dataList.remindFile))[0]
            this.dataTime.dataStartTime = this.dataList.remindStatime.substring(0,10)
            this.dataTime.dataEndTime = this.dataList.remindStoptime.substring(0,10)
          }
        }).catch(err =>{
          console.log(err)
        })
      },
      goNext(){
        this.$router.push({
          path:'/responsibleTask'
        })
      },
      dateRemove(){
        this.$router.push({
          path:'/dateDetails',
          query:{id:this.dateId,dateRemove:true}
        })
        this.$store.commit('dateList/setInvitTime', false)
      },
      /**
       * 下载文件
       * @param url filekey
       * @param filename
       */
      downloadDocs(url,filename) {
        const t = this
        let data = {
          _mt: 'userMgmt.getfiletoken',
          isprivate: true,
          logType: '下载',
          filekey: url,
          expiresecs: 180,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(filename);
            let link = document.createElement('a');
            link.href = doclink;
            link.download = "downloadfiletemp";
            link.click();
          }
        }).catch(() => {
          Message.alert('网络错误', '错误', {
            type: 'error',
            okLabel: '确定'
          }).then(() => {
          });
        })
      },
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .wrap{
    background: #F3F3F3;
    width:100%;
    height: 100%;
    position: relative;
  }
  .aaa{
    height:100px;
  }
  .middle{
    width:100%;
    background-image: url("../../../.././static/date/bj.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height:158px;
    .dateItems{
      display: flex;
      padding: 32px 28px 0 32px;
      box-sizing: border-box;
      justify-content: space-between;
      font-size: 30px;
      color: #FFFFFF;
    }
  }
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
      top:30px;
      width:14px;
      height:24px;
    }
    .ImageRl{
      position: absolute;
      right:38px;
      top:20px;
      color: #ffffff;
      font-size: 36px;
    }
  }
  .dateTime{
    padding:20px 60px;
    box-sizing: border-box;
    width:100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    background: white;
    border-bottom:2px solid #f3f3f3;
    align-items: center;
    height:132px;
    .date{
      p:nth-of-type(2){
        font-size: 36px;
      }
    }
    .dateTimeImg{
      position: absolute;
      top: 40px;
      left:45%;
      background-image: url("../../../.././static/date/right.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width:50px;
      height: 60px;
    }
  }
  .day{
    padding: 30px 30px;
    box-sizing: border-box;
    width:100%;
    display: flex;
    justify-content: space-between;
    background: white;
    align-items: center;
    margin-bottom: 30px;
    div:nth-of-type(1){
      img{
        width:45px;
        height:45px;
        vertical-align: top;
      }
      span{
        font-size: 30px;
      }
    }
  }
  .alert{
    padding: 30px 30px;
    box-sizing: border-box;
    width:100%;
    display: flex;
    justify-content: space-between;
    background: white;
    align-items: center;
    margin-bottom: 30px;
    div:nth-of-type(1){
      font-size: 30px;
      img{
        width:45px;
        height:45px;
        vertical-align: top;
      }
    }
    div:nth-of-type(2){
      img{
        width:20px;
        height:30px;
        vertical-align: text-bottom;
      }
      span{
        font-size: 26px;
        color: lightgray;
      }
      input{
        width:40px;
        opacity: 0;
      }
      .Image{
        position: absolute;
        top:0;
        left:0;
        width:45px;
        height:50px;
      }
    }
  }
  .goNext{
    position: absolute;
    background-image: url("../../../.././static/date/笔拷贝@2x.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width:150px;
    height:150px;
    right: 20px;
    top: 220px;
  }
</style>
