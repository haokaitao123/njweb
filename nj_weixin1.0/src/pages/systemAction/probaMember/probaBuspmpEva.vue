<!--一条为一行-->
<template>
  <div class="personalText">
    <div class="solution">
      <p>试用评估结论:</p>
      <textarea :readonly="empFlowProbation.empprobStpe3State === 'p_flowst_3'" v-model="empFlowProbation.empprobEvalresult"
                cols="30" rows="10" placeholder="请填写" class="ipt"></textarea>
    </div>
    <div class="solution">
      <p>试用评估备注:</p>
      <textarea :readonly="empFlowProbation.empprobStpe3State === 'p_flowst_3'" v-model="empFlowProbation.empprobEvalcomment"
                cols="30" rows="10" placeholder="请填写" class="ipt"></textarea>
    </div>
    <div class="alert">
      <div>
        <p>试用期评估表</p>
      </div>
      <div style="position: relative">
        <span v-if="file.fileKey!==''">
          <a href="javascript:;" @click="downloadDocs(file.fileKey, file.fileName)">{{ file.fileName }}</a></span>
        <input type="file" name="file" id="fileinputModel" @change="fileModelChange" accept=".xls,.xlsx">
        <label v-show="empFlowProbation.empprobStpe3State !== 'p_flowst_3'" style="color: #3399FF" for="fileinputModel">上传</label>
        <img v-show="empFlowProbation.empprobStpe3State !== 'p_flowst_3'" src="../../../.././static/date/wd_11.png" alt="" class="Image">
      </div>
      <span v-show="textShow" style="float:right;color: #c0c0c0;font-size: 3px;">提交时间: {{empFlowProbation.updateTime}}</span>
    </div>
    <div class="submit" v-show="empFlowProbation.empprobStpe3State !== 'p_flowst_3'">
      <button @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
  import {getDataLevelUserLogin, getDataLevelUserLoginNew, uploadFile} from '@/axios/axios'
  import {isSuccess, deepCopy} from '@/lib/util'
  import Message from 'muse-ui-message'
  import { Toast } from 'mint-ui';
  export default {
    name: "probaMemberBase",
    data() {
      return {
        textShow: false,
      }
    },
    props: {
      empFlowProbation: Object,
      file: Object
    },
    mounted() {

    },
    methods: {
      submit() {
        const t = this
        const data = deepCopy(this.empFlowProbation)
        data._mt = 'weixinProbaMember.submitProbaMember'
        data.dataId = this.empFlowProbation.id
        data.companyId = pubsource.companyId
        data.userId = localStorage.getItem('bus_userid'),
          getDataLevelUserLoginNew(data).then(res => {
            if (isSuccess(res, t)) {
              Message.alert('提交成功', '成功', {
                type: 'success',
                okLabel: '确定'
              }).then(() => {
                this.$router.push({
                  path:'/probaMemberList'
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
      // 上传文件
      fileModelChange() {
        const t = this
        let filename = document.getElementById('fileinputModel').files[0].name
        let fileType = filename.slice(filename.lastIndexOf('.') + 1).toLowerCase()
        if (fileType !== 'xls' && fileType !== 'xlsx') {
          Toast({
            message: '文件必须是xls或xlsx格式！',
            position: 'middle',
            duration: 2000
          });
          return
        }
        const formData = new FormData()
        formData.append('upfile', document.getElementById('fileinputModel').files[0])
        uploadFile(formData).then(res => {
          for (const key in res.data) {
            t.file.fileKey = res.data[key]
            t.file.fileName = key
          }
          t.empFlowProbation.empprobUpload01 = t.file.fileName + ':' + t.file.fileKey; // 文件信息保存到数据库
        }).catch(() => {
          Message.alert('网络错误', '错误', {
            type: 'error',
            okLabel: '确定'
          }).then(() => {
          });
        })
      },
      /**
       * 下载文件
       * @param url filekey
       * @param filename
       */
      downloadDocs(url,filename) {
        alert(11)
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

<style scoped type="text/less" lang="less">
  .solution{
    border-bottom: 20px solid #F2F2F2;
  }
  textarea{
    width: 100%;
    height: 200px;
    margin-right: 10px;
    border-bottom: 20px solid #F2F2F2;
  }
  .personalText{
    wdth:100%;
    padding: 0.333333rem;
    background: white;
    font-size: 30px;
    margin-bottom: 0.2rem;
    .ipt{
      outline: none;
      border:0;
    }
  }
  .submit{
    width: 100%;
    height: 86px;
    line-height: 86px;
    text-align: center;
    font-size: 36px;
    background: #FFFFFF;
    margin-top: 260px;
    button{
      background: #3399FF;
      width: 100%;
      outline: none;
      color: #FFFFFF;
      border:0;
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
    border-bottom: 20px solid #F2F2F2;
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
        right: 58px;
        width:45px;
        height:50px;
      }
    }
  }
</style>
