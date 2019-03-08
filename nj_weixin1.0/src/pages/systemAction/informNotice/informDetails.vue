<!--通知公告-->
<template>
  <div class="wrap">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
    <div class="readList">
      <div class="readListOne">
        <div v-html="msgContentList">{{msgContentList}}</div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
  import headTitle from '../../.././components/headTitle.vue'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  export default {
    name: 'informDetails',
    data() {
      return {
        flagImg:true,
        title:'通知公告详情',
        msgContentList:'',
        id:'',
      }
    },
    created() {
      const t = this
      this.id = getUrlKey('id')
      const data = {
        _mt: 'weiXinMsgrecord.read',
        //baseMsgrecord.addBaseNoticeread
        logType: '读取消息',
        id: this.id,
      }
      getDataLevelUserLogin(data).then((res) => {
        if (isSuccess(res, t)) {
          this.msgContentList = JSON.parse(res.data.content[0].value).cmutNoticeContent;
          console.log(this.msgContentList)
        }
      }).catch((err) =>{
        console.log(err)
      })
    },
    methods:{
      goIndex() {
        this.$router.go(-1)
      }
    },
    components:{
      headTitle
    }
  }
</script>
<style lang="less" type="text/less" scoped>
  @import '../../css/common_inform';
  .readListOne{
    font-size: 28px;
  }
</style>
