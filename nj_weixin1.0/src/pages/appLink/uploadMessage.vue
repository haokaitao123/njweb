<!--一条为一行-->
<template>
  <div class="wrap">
    <div class="alert">
      <div>
        <span>离职证明/退工单/三方协议 扫描件</span>
      </div>
      <div style="position: relative">
        <span v-if="Files[0].fileKey!==''"></span>
        <input type="file" @change="UpLoadFile($event, 0)">
        <span style="color: #3399FF">上传</span>
        <img src="../../.././static/date/wd_11.png" alt="" class="Image">
      </div>
      <div class="alertNone"><a href="javascript:;" @click="downloadDocs(Files[0].fileKey, Files[0].fileName)">{{ Files[0].fileName }}</a></div>
    </div>
    <div class="alert">
      <div>
        <span>个人简历</span>
      </div>
      <div style="position: relative">
        <span v-if="Files[1].fileKey!==''"></span>
        <input type="file" @change="UpLoadFile($event, 1)">
        <span style="color: #3399FF">上传</span>
        <img src="../../.././static/date/wd_11.png" alt="" class="Image">
      </div>
      <div class="alertNone">
        <a href="javascript:;" @click="downloadDocs(Files[1].fileKey, Files[1].fileName)">{{ Files[1].fileName }}</a>
      </div>
    </div>
    <div class="alert">
      <div>
        <span>身份证扫描件</span>
      </div>
      <div style="position: relative">
        <span v-if="Files[2].fileKey!==''"></span>
        <input type="file" @change="UpLoadFile($event, 2)">
        <span style="color: #3399FF">上传</span>
        <img src="../../.././static/date/wd_11.png" alt="" class="Image">
      </div>
      <div class="alertNone">
        <a href="javascript:;" @click="downloadDocs(Files[2].fileKey, Files[2].fileName)">{{ Files[2].fileName }}</a>
      </div>
    </div>
    <div class="alert">
      <div>
        <span>学历学位证明</span>
      </div>
      <div style="position: relative">
        <span v-if="Files[3].fileKey!==''"></span>
        <input type="file" @change="UpLoadFile($event, 3)">
        <span style="color: #3399FF">上传</span>
        <img src="../../.././static/date/wd_11.png" alt="" class="Image">
      </div>
      <div class="alertNone">
        <a href="javascript:;" @click="downloadDocs(Files[3].fileKey, Files[3].fileName)">{{ Files[3].fileName }}</a>
      </div>
    </div>
    <div class="alert">
      <div>
        <span>户口本扫描件</span>
      </div>
      <div style="position: relative">
        <span v-if="Files[4].fileKey!==''">
          </span>
        <input type="file" @change="UpLoadFile($event, 4)">
        <span style="color: #3399FF">上传</span>
        <img src="../../.././static/date/wd_11.png" alt="" class="Image">
      </div>
      <div class="alertNone">
        <a href="javascript:;" @click="downloadDocs(Files[4].fileKey, Files[4].fileName)">{{ Files[4].fileName }}</a>
      </div>
    </div>
    <div class="alert">
      <div>
        <span>个人照片</span>
      </div>
      <div style="position: relative">
        <span v-if="Files[5].fileKey!==''"></span>
        <input type="file" @change="UpLoadFile($event, 5)">
        <span style="color: #3399FF">上传</span>
        <img src="../../.././static/date/wd_11.png" alt="" class="Image">
      </div>
      <div class="alertNone">
        <a href="javascript:;" @click="downloadDocs(Files[5].fileKey, Files[5].fileName)">{{ Files[5].fileName }}</a>
      </div>
    </div>
    <div class="alert">
      <div>
        <span>其他入职所需材料</span>
      </div>
      <div style="position: relative">
        <span v-if="Files[6].fileKey!==''"></span>
        <input type="file" @change="UpLoadFile($event, 6)">
        <span style="color: #3399FF">上传</span>
        <img src="../../.././static/date/wd_11.png" alt="" class="Image">
      </div>
      <div class="alertNone">
        <a href="javascript:;" @click="downloadDocs(Files[6].fileKey, Files[6].fileName)">{{ Files[6].fileName }}</a>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>我已知晓并确认</span>
        <span class="messRadio">
          <mt-radio
            v-model="value"
            :options=this.options
            @change="orderRadio"
          >
          </mt-radio>
          <!--<mu-text-field v-model="empnhOnlineconfirmName" @focus="empnhOnlineconfirms()"></mu-text-field>-->
          <!--<mu-select v-model="empFlowNewhire.empnhOnlineconfirm" full-width>-->
            <!--<mu-option v-for="option,index in YesOrNo" :key="option.id" :label="option.paramInfoCn" :value="option.paramCode"></mu-option>-->
          <!--</mu-select>-->
        </span>
      </div>
    </div>
    <div class="message" v-show="empFlowNewhire.curStepstate !== 'p_flowst_3'">
      <div class="messOne messTwo">
        <!--@click="saveData"-->
        <span @click="saveData">保存</span>
        <span @click="submitData">提交</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin, uploadFile, getDataLevelNoneNew} from '@/axios/axios'
  import {isSuccess, deepCopy} from '@/lib/util'
  import Message from 'muse-ui-message'
  import MaskIng from './maskIng/masking.vue'
  import Bus from '../../lib/bus'
  import {pointMessage} from './pointMessage'
  import { Toast } from 'mint-ui'
  export default {
    name: "uploadMessage",
    data() {
      return {
        empnhOnlineconfirmName:"",
        options:[
          {
            label: '是',
            value: '1'
          },
          {
            label: '否',
            value: '0'
          }
        ],
        value:'0'
      }
    },
    components:{
      MaskIng,
      Message,
    },
    props: {
      empFlowNewhire: Object,
      YesOrNo: Array,
      Files: Array
    },
    mounted() {

    },
    methods:{
      nationality(){
        Bus.$emit('show')
      },
      UpLoadFile(event, value){
        const t = this
        var file = event.target.files;
        const formData = new FormData()
        formData.append('upfile',file[0])
        console.log(formData)
        uploadFile(formData).then(res => {
           console.log(this.file)
          if(res.statusText == 'OK'){
            let fileKey = ''
            let fileName = ''
            for (const key in res.data) {
              fileKey = res.data[key]
              fileName = key
            }
            // 用于展示，下载
            this.Files[value].fileName = fileName
            this.Files[value].fileKey = fileKey
            // 将文件相关信息传递给后台
            value = value + 1;
            this.empFlowNewhire['empnhUpload0' +  value] = fileName + ':' + fileKey;
            Toast({
              message: '上传成功',
              position: 'middle',
              duration: 500
            });
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      /**
       * 下载文件
       * @param url filekey
       * @param filename
       */
      downloadDocs(url,filename) {
        const t = this
        let data = {
          _mt: 'userMgmt.wxGetPrivateFileTokenNone',
          isprivate: true,
          filekey: url,
          expiresecs: 180,
        }

        getDataLevelNone(data).then((res) => {
          if (isSuccess(res, t)) {
            let storage = window.localStorage;
            let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(filename) +'&_tk='+ encodeURIComponent(storage.token);
            console.log(doclink)
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

      saveData() {
        const t = this
        if (t.empFlowNewhire.empnhBirthdate) {
          t.empFlowNewhire.empnhBirthdate = new Date(t.empFlowNewhire.empnhBirthdate).format('yyyy-MM-dd')
        }
        if (t.empFlowNewhire.empnhTechdate) {
          t.empFlowNewhire.empnhTechdate = new Date(t.empFlowNewhire.empnhTechdate).format('yyyy-MM-dd')
        }
        if (t.empFlowNewhire.empnhGreencardsdate) {
          t.empFlowNewhire.empnhGreencardsdate = new Date(t.empFlowNewhire.empnhGreencardsdate).format('yyyy-MM-dd')
        }
        if (t.empFlowNewhire.empnhGreencardedate) {
          t.empFlowNewhire.empnhGreencardedate = new Date(t.empFlowNewhire.empnhGreencardedate).format('yyyy-MM-dd')
        }
        if (t.empFlowNewhire.empnhEdusdate) {
          t.empFlowNewhire.empnhEdusdate = new Date(t.empFlowNewhire.empnhEdusdate).format('yyyy-MM-dd')
        }
        if (t.empFlowNewhire.empnhEduedate) {
          t.empFlowNewhire.empnhEduedate = new Date(t.empFlowNewhire.empnhEduedate).format('yyyy-MM-dd')
        }

        const data = deepCopy(this.empFlowNewhire)
        data._mt = 'weixinEmpFlowNewhire.saveStep2'
        console.log(this.empFlowNewhire)
        data.companyId = pubsource.companyId
        if(pointMessage(t.empFlowNewhire)) {
          delete data.empnhIsexpensecardsDis
          for (const dat in data) {
            if (data[dat] === '') {
              delete data[dat]
            }
          }
          getDataLevelNoneNew(data).then(res => {
            if (isSuccess(res, t)) {
              Toast({
                message: '保存成功',
                position: 'middle',
                duration: 500
              });
            }
          }).catch((err) => {
            Toast({
              message: '保存失败',
              position: 'middle',
              duration: 500
            });
          })
        } else {
          Toast({
            message: '必填项没有填完',
            position: 'middle',
            duration: 500
          });
        }

      },
      // 提交方法
      submitData() {
        const t = this
//        const obj = deepCopy(this.empFlowNewhire)
        const data = deepCopy(this.empFlowNewhire)
        data._mt = 'weixinEmpFlowNewhire.submitStep2'
        data.companyId = pubsource.companyId
        if(pointMessage(t.empFlowNewhire)) {
          delete data.empnhIsexpensecardsDis
          for (const dat in data) {
            if (data[dat] === '') {
              delete data[dat]
            }
          }
          getDataLevelNoneNew(data).then(res => {
            if (isSuccess(res, t)) {
              Toast({
                message: '提交成功',
                position: 'middle',
                duration: 500
              });
              window.location.reload()
            }
          }).catch((err) => {
            Toast({
              message: '提交失败',
              position: 'middle',
              duration: 500
            });
          })
        } else {
          Toast({
            message: '必填项没有填完',
            position: 'middle',
            duration: 500
          });
        }
      },
      empnhOnlineconfirms() {
        Bus.$emit('getSelectValue',this.YesOrNo,19)
        Bus.$emit('show')
      },
      orderRadio(value) {
        if (value === '1') {
          this.empnhOnlineconfirmName = '是'
          this.empFlowNewhire.empnhOnlineconfirmDis = '是'
        } else {
          this.empnhOnlineconfirmName = '否'
          this.empFlowNewhire.empnhOnlineconfirmDis = '否'
        }
        this.empFlowNewhire.empnhOnlineconfirm = value

      }
    },
    mounted() {
      Bus.$on('rtnValue19',(value1,value2)=>{
        this.empnhOnlineconfirmName = value2
        this.empFlowNewhire.empnhOnlineconfirm = value1
        this.empFlowNewhire.empnhOnlineconfirmDis = value2
      })
    },
    created() {
      this.empnhOnlineconfirmName = this.empFlowNewhire.empnhOnlineconfirmDis
    }

  }
</script>

<style scoped type="text/less" lang="less">
  @import '../../pages/css/appLink';
  .messageAll {
    height: 100%;
    overflow: scroll;
  }

  .message {
    /*border-bottom: 1px solid #E3E3E3;*/
    width: 100%;
    .messOne {
      display: flex;
      justify-content: space-between;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;
      padding: 20px 35px 26px 32px;
      align-items: center;
      .messRadio{
        .mint-radiolist{
          display: flex;
        }
      }
      .mu-input{
        width:3.713333rem;
        font-size: 30px;
      }
    }
    .messTwo{
      display: flex;
      justify-content: space-around;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;
      align-items: center;
      span{
        flex: 1;
        text-align: center;
        height: 70px;
        line-height: 70px;
        font-size: 32px;
      }
      span:nth-of-type(1){
        border:2px solid #3399FF;
        border-radius: 10px;
        margin-right: 10px;
      }
      span:nth-of-type(2){
        background:#3399FF;
        border-radius: 10px;
        color: white;
      }
    }
  }
</style>
