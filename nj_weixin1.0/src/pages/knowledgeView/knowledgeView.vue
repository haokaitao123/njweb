<!--app-->
<template>
  <div class="appLink">
    <div class="middle" v-show="cmutKldTitle === '' ? true : false"></div>
    <div class="middle" v-show="cmutKldTitle === '' ? false : true">
      <div>
        <div class="cmutKldTitle">{{cmutKldTitle}}</div>
        <div>
          <span>发布时间:{{cmutKldPublish}}</span><br/>
          <span>发布公司:{{cmutKldPubcompDis}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>发布人:{{publishAuthor}}</span>
        </div>
      </div>
      <div v-html="cmutKldContent" class="middleTitle" style="padding-top: 10px">
        {{cmutKldContent}}
      </div>
      <div class="attach" >附件：
        <a href="javascript:;" @click="downloadAttach">{{fileName}}</a>
      </div>
    </div>
  </div>
</template>
<script>
  import Bus from '../../lib/bus'
  import { getDataLevelUserLogin} from '../.././axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  import { Toast } from 'mint-ui';

  export default {
    name: 'knowledgeView',
    data() {
      return {
        flagImg:false,
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
    components:{
    },
    mounted(){
      this.knowid = getUrlKey('knowid')
      this.getData()
    },
    methods:{
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
              Toast({
                message: '抱歉,知识库已经删除!',
                position: 'middle',
                duration: 2000
              });
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
            window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
          }
        }).catch(() => {
          t.$Modal.error({
            title: '错误',
            content: '网络错误',
          })
        })
      },
    },
  }
</script>
<style scoped lang="less" type="text/less">
  @import '../css/common_inform';
  .appLink{
    width:100%;
    height:100%;
    position: relative;
    .middle{
      width:100%;
      background: white;
      /*margin: 10px 5px 0px 30px;*/
      font-size: 30px;
      padding: 20px;
      height: 90%;
      overflow-y: scroll;
      box-sizing: border-box;
      .cmutKldTitle{
        font-size: 34px;
        font-weight: bold;
        text-align: center;
      }
    }
  }
</style>
