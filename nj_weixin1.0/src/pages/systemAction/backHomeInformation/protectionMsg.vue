<!--护照信息-->
<template>
  <div>
    <div class="message1">
      <div>
        <span>是否已回国</span>
        <span class="messRadio">
          <mt-radio
          v-model="visaReturn.returnIsback"
          :options=this.options
        >
        </mt-radio>
        </span>
      </div>
    </div>
    <div class="message" v-show="visaReturn.returnIsback == 1">
      <div >
        <span>回国日期</span>
        <span>{{returnTime}} </span>
      </div>
    </div>
    <div class="alert" v-show="visaReturn.returnIsback == 1">
      <div>
        <span>入境证明上传</span>
      </div>
      <div class="alertNone">
        <a href="javascript:;" @click="downloadDocs(Files.fileKey, Files.fileName)">{{ Files.fileName }}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Message from 'muse-ui-message'
  import {isSuccess, strIsnull, getUrlKey, deepCopy} from '@/lib/util'
  import {getDataLevelNone, getDataLevelNoneNew, getDataLevelUserLogin, getDataLevelUserLoginNew, uploadFile} from '../../../axios/axios'
  export default {
    name: "protectionMsg",
    props:{
      visaReturn:Object,
    },
    data() {
      return{
        returnTime: '',
        YesOrNo: [],
        options:[],
        Files: {
          fileKey: '',
          fileName: '',
        },
      }
    },
    mounted() {
      this.getSelectValue()
      if (this.visaReturn.returnTime) {
        this.returnTime = this.visaReturn.returnTime
      } else {
        this.returnTime = new Date().format('yyyy-MM-dd')
      }
      if (this.visaReturn.returnProveup) {
          this.Files.fileKey = this.visaReturn.returnProveup.split(':')[1]
          this.Files.fileName = this.visaReturn.returnProveup.split(':')[0]
      }
    },
    methods:{
      UpLoadFile(event){
        const t = this
        var file = event.target.files;
        const formData = new FormData()
        formData.append('upfile',file[0])
        uploadFile(formData).then(res => {
          if(res.statusText == 'OK'){
            let fileKey = ''
            let fileName = ''
            for (const key in res.data) {
              fileKey = res.data[key]
              fileName = key
            }
            // 用于展示，下载
            this.Files.fileName = fileName
            this.Files.fileKey = fileKey
            this.visaReturn['returnProveup'] = fileName + ':' + fileKey
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      downloadDocs(url,filename) {
        const t = this
        let data = {
          _mt: 'userMgmt.getfiletoken',
          isprivate: true,
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
        }).catch((err) => {
          console.log(err)
        })
      },
      getSelectValue(){
        const t = this
        const data = {
          _mt:'weixinEmpFlowNewhire.getSelectValue',
          companyId: '1000',
          typeCode:'yesno'
        }
        getDataLevelNone(data).then(res => {
          if (isSuccess(res, t)) {
            t.YesOrNo = JSON.parse(res.data.content[0].value)[0].paramList
            for (let i = 0; i < t.YesOrNo.length; i++) {
              let obj = {}
              obj.label = t.YesOrNo[i].paramInfoCn
              obj.value = t.YesOrNo[i].paramCode
              obj.disabled = true
              t.options.push(obj)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
    },
  }
</script>

<style scoped type="text/less" lang="less">
  @import '../../css/appLink';
  .messRadio{
    .mint-radiolist{
      display: flex;
      width:360px;
    }
  }
  .message{
    border-bottom: 3px solid #E3E3E3;
    width: 100%;
    div{
      display: flex;
      justify-content: space-between;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;
      padding: 45px 35px  26px 32px;
      span:nth-of-type(2){
        display: flex;
        align-items: center;
        img{
          width:20px;
          height:30px;
          margin-left: 10px;
        }
      }
    }
  }
  .message1{
    border-bottom: 3px solid #E3E3E3;
    width: 100%;
    padding: 45px 35px  26px 32px;
    div{
      display: flex;
      justify-content: space-between;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;

    }
  }
  .message2{
    padding-left: 30px;
    width:100%;
    margin-top: 20px;
    box-sizing: border-box;
    display: flex;
    font-size: 34px;
    div{
      flex: 1;
      height:80px;
      line-height: 80px;
      text-align: center;
    }
    div:nth-of-type(1) {
      background: #3399FF;
      color: white;
      border-radius: 10px;
      margin-right: 20px;
    }
  }
</style>
