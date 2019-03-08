<template>
  <div class="main">
    <div class="header">
      <div class="logo">
          <img src="../../../../static/img/ry.png" width="130">
      </div>
      <div class="navicon-con">
        {{ $t('title') }}
      </div>
    </div>
    <div class="middle" v-show="cmutKldTitle === '' ? true : false"></div>
    <div class="middle" v-show="cmutKldTitle === '' ? false : true">
      <div>
        <b style="font-size: 20px" class="title">
          <p>{{cmutKldTitle}}</p>
        </b>
        <span>发布时间：{{cmutKldPublish}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>发布公司：{{cmutKldPubcompDis}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>发布人：{{publishAuthor}}</span>
      </div>
      <div v-html="cmutKldContent" class="middleTitle" style="font-size: 15px;font-weight: bold;padding-top: 10px">
        {{cmutKldContent}}
      </div>
      <div class="attach" style="padding-top: 10px">附件：
        <a href="javascript:;" @click="downloadAttach">{{fileName}}</a>
      </div>
    </div>
    <div class="footer">
      POWEREDBY HROCLOUD.COM
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLogin2, getDataLevelUserLogin,getDataLevelUserLoginNew  } from '../../../axios/axios'
  import { setCookie, isSuccess, deepCopy, getUrlKey} from '../../../lib/util'
  import Bus from '../../../lib/bus'

  export default {
    data() {
      return {
        cmutKldPubcompDis: '', // 发布公司
        publishAuthor: '', // 发布人
        cmutKldPublish: '',
        cmutKldAttach: '',
        cmutKldContent: '',
        cmutKldTitle: '',
        fileName: '',
        filekey: '',
        knowid: '',
      }
    },
    mounted() {
      this.knowid = getUrlKey('knowid')
      this.getData()
    },
    methods: {
      getData() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'cmutKnowledge.getBySecrtId',
          id: t.knowid,
          funId: '1',
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            if (!res.data.content[0].cmutKldTitle) {
              this.$Modal.warning({
                title: this.$t('reminder.remind'),
                content: '抱歉,知识库已经删除!',
              })
            } else {
              t.cmutKldPubcompDis = res.data.content[0].cmutKldPubcompDis
              t.publishAuthor = res.data.content[0].publishAuthor
              t.cmutKldPublish = res.data.content[0].cmutKldPublish
              t.cmutKldAttach = res.data.content[0].cmutKldAttach
              t.cmutKldContent = res.data.content[0].cmutKldContent
              t.cmutKldTitle = res.data.content[0].cmutKldTitle
              if (res.data.content[0].cmutKldAttach) {
                t.fileName = res.data.content[0].cmutKldAttach.split(':')[0]
                t.filekey = res.data.content[0].cmutKldAttach.split(':')[1]
              }
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      downloadAttach() {
        const t = this
        let data = {
          _mt: 'userMgmt.getfiletoken',
          isprivate: true,
          logType: '导出',
          filekey: t.filekey,
          expiresecs: 180,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
            if (this.isIE()) {
              window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
            } else {
              let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
              let link = document.createElement('a')
              link.href = doclink
              link.download = 'downloadfiletemp'
              link.click()
            }
            this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
            localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style>
  .mainPop .ivu-poptip-inner .ivu-poptip-body{
    padding: 0;
  }
</style>
<style lang="scss" scoped>
  .main{
    height: 100%;
    background: #f0f0f0;
  }

.header{
  width: 100%;
  /*height: 10%;*/
  position: relative;
  background-color: #0089DD;
  .logo{
    padding: 5px 0;
    font-size: 32px;
    width: 200px;
    height: 47px;
    text-align: center;
    color: #fff;
    font-weight: bold;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .logo:hover{
    cursor: pointer;
    transition: all .3s;
    background-color: rgba(255,255,255,.1);
  }
  .navicon-con{
    font-size: 14px;
    color: #fff;
    line-height: 47px;
    height: 47px;
    padding-left: 200px;
    font-weight: 900;
  }
  .header-avator-con{
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    line-height: 100%;
    .user-dropdown-menu-con{
      height: 100%;

    }
  }
  .main-user-name{
    color: #fff;
  }
}
.middle{
  width: 90%;
  background: white;
  margin: auto;
  padding: 20px;
  height: 80%;
  overflow-y: scroll;
  .title{
    text-align: center;
  }
}
  .middleTitle{
    div{
      font-size: 20px;
      color:red;
    }
  }
  .footer{
    width:100%;
    height: 10%;
    background: #f0f0f0;
    font-size: 14px;
    text-align: center;
    line-height: 63.5px;
    font-weight: bold;
  }
.section{
  height: 100%;
  display: flex;
  .left{
    background-color: #495060;
    height: 100%;
    font-size:12px;
    transition: width .3s;
  }
  .right{
    position: absolute;
    top: 47px;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #F0F0F0;
    // z-index: 1;
    transition: left .3s;
    .pagetab{
      height: 40px;
      border-bottom: #ddd 1px solid;
    }
    .single-page{
      margin: 10px;
    }
  }
}
  .button-item{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 47px;
    padding: 0 10px;
    min-width: 50px;
    color: #fff;
  }
  .button-item:hover{
    cursor: pointer;
    transition: all .3s;
    background-color: rgba(255,255,255,.1);
  }
  .ivu-poptip-body{
    padding: 0;
  }
</style>
