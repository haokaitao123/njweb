<!--护照信息-->
<template>
  <div>
    <div class="alert">
      <div>
        <span>出国总结资料上传</span>
      </div>
      <div style="position: relative" v-if="noSubmit">
        <span v-if="Files.fileKey!==''"></span>
        <input type="file" @change="UpLoadFile($event)">
        <span style="color: #3399FF">上传</span>
        <img src="../../../../static/date/wd_11.png" alt="" class="Image">
      </div>
      <div class="alertNone">
        <a href="javascript:;" @click="downloadDocs(Files.fileKey, Files.fileName)">{{ Files.fileName }}</a>
      </div>
    </div>
    <div class="message2" v-if="noSubmit">
      <div @click="submit">
        提交
      </div>
    </div>
    </div>
</template>

<script>
  import Message from 'muse-ui-message'
  import {isSuccess, strIsnull, getUrlKey, deepCopy} from '@/lib/util'
  import {getDataLevelNone, getDataLevelNoneNew, getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile} from '../../../axios/axios'
  export default {
    name: "SubprotectionMsg",
    props:{
      visaReturn:Object,
    },
    mounted() {
      if (this.visaReturn.returnDocsup) {
        this.Files.fileKey = this.visaReturn.returnDocsup.split(':')[1]
        this.Files.fileName = this.visaReturn.returnDocsup.split(':')[0]
      }
    },
    computed: {
      noSubmit() {
        if (this.visaReturn.stepState !== 'undefined' && (this.visaReturn.stepState === 'p_flowst_1' ||
            this.visaReturn.stepState === 'p_flowst_2')) {
          return true
        } else {
          return false
        }
      }
    },
    data() {
      return{
        Files: {
          fileKey: '',
          fileName: '',
        },
      }
    },
    methods:{
      submit() {
        const t = this
        const data = deepCopy(this.visaReturn)
        data._mt = 'weixinVisaReturn.submitVisaReturnStep'
        data.companyId = pubsource.companyId
        data.userId = localStorage.getItem('bus_userid')
        data.stepCode = 'flow_visareturn_1001'
          if (data.returnDocsup === '') {
            layer.msg("请把必填项补充完整")
            return
          }
          getDataLevelUserLoginNew(data).then(res => {
            if (isSuccess(res, t)) {
              Message.alert('提交成功', '成功', {
                type: 'success',
                okLabel: '确定'
              }).then(() => {
                this.$router.push({
                  path:'/backHomeInformationList'
                })
              });
            }
          }).catch((err) => {
            Message.alert('网络错误', '错误', {
              type: 'error',
              okLabel: '确定'
            }).then(() => {
            });
          })
      },
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
            this.visaReturn['returnDocsup'] = fileName + ':' + fileKey
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
      backHome() {
        this.$refs.picker.open();
      },
      handleConfirm (data) {
        let date = moment(data).format('YYYY-MM-DD')
      },
    }
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
