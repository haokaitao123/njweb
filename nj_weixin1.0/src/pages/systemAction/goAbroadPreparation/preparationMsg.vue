<!--资料清单-->
<template>
  <div>
    <data value="" v-for="item in dataList.visaDocsList">
      <div class="message">
        <div>
          <span>资料名称</span>
          <span>{{item.docsName}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>详细要求</span>
          <span>{{item.docsText}}</span>
        </div>
      </div>
      <div class="message1">
        <div>
          <span>参考附件</span>
          <span><a href="javascript:;" @click="downloadDocs(item.docsAttr.split(':')[1],item.docsAttr.split(':')[0])">{{item.docsAttr.split(':')[0]}}</a></span>
        </div>
      </div>
      </data>
    </div>
</template>

<script>
  import {getDataLevelNone,getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull,getUrlKey} from '@/lib/util'
  export default {
    name: "goAbroadMsg",
    methods:{
      downloadDocs(url,filename) {
        const t = this
        let data = {
          _mt: 'userMgmt.getfiletoken',
          isprivate: true,
          filekey: url,
          expiresecs: 180,
        }
        console.log(data)
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(filename);
            let link = document.createElement('a');
            link.href = doclink;
            link.download = "downloadfiletemp";
            link.click();
          }
        }).catch((err) => {
          console.log(err)
        })
      },
    },
    props:{
      dataList:Object,
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .message{
    width: 100%;
    div{
      display: flex;
      justify-content: space-between;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;
      padding: 45px 35px  26px 32px;
    }

  }
  .message1{
    width: 100%;
    div{
      justify-content: space-between;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;
      padding: 45px 35px  26px 32px;
    }
  }
</style>
