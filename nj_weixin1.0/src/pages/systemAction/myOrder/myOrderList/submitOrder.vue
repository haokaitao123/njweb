<!--提交工单-->
<template>
  <div class="wrap" v-loading="isLoading">
    <!--<div class="top">-->
      <!--<div class="title">{{title}}</div>-->
      <!--&lt;!&ndash;<span class="ImageRl" >完成</span>&ndash;&gt;-->
    <!--</div>-->
    <div class="middle">
      <div class="option">
        <div>
          优先级
        </div>
        <div class="optionRadio">
            <mt-radio
              v-model="value"
              :options=this.options
              @change="orderRadio"
            >
          </mt-radio>
        </div>
      </div>
      <div class="option">
        <div>
          选择工单类型
        </div>
        <div>
          <span>{{orderType}}</span>
          <span @click="selectOrderType">
            <img src="../../../../../static/date/right.png" alt="">
          </span>
        </div>
      </div>
      <div class="problemDescribe">
        <div>问题描述</div>
        <div>
          <textarea name="" class="public" v-model="cmwdDesc" @blur="problemDesc()" id="" cols="40" rows="5"></textarea>
      </div>
      </div>
      <div class="option">
        <div>
          期望反馈时间
        </div>
        <div>
          <span>{{this.$store.state.myOrderListState.orderListFrom.cmwdExpfeedbacktime}}</span>
          <span>
            <img src="../../../../../static/date/right.png" alt="" @click="backDate">
          </span>
        </div>
      </div>
      <div class="option">
        <div>
          手机
        </div>
        <div>
          <span>
            <input type="text" v-model="phoneNum" @blur="phoneNumber()"  class="emailIpt" placeholder="请填写手机">
          </span>
          <span>
            <img src="../../../../../static/date/right.png" alt="">
          </span>
        </div>
      </div>
      <div class="option">
        <div>
          邮箱
        </div>
        <div>
          <span>
            <input type="text" v-model="email" @blur="cmdEmail()" class="emailIpt" placeholder="请填写邮箱">
          </span>
          <span>
            <img src="../../../../../static/date/right.png" alt="">
          </span>
        </div>
      </div>
      <div class="option" style="position: relative">
        <div>
          接收短信时段
        </div>
        <div>
          <span>
            {{this.$store.state.myOrderListState.note}}
          </span>
          <span>
            <img src="../../../../../static/date/right.png" alt="" @click="selectDate">
          </span>
          <div class="selectDate" v-if="selectDateShow">
            <ul>
              <li v-for="item in dateList" @click="selectDataClose(item.paramInfoName,item.paramCode)">{{item.paramInfoName}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="optional">
        选填项
      </div>
      <div class="problemDescribe">
        <div>图片</div>
        <div class="problemDescribeImg">
          <input type="file" @change="UpLoadFile($event)">
          <img src="../../../../../static/order/k.png" alt="">
        </div>
        <div v-show="impUrl !== []">
          <img v-for="item in impUrl" :src="item" style="width: 50px;height: 50px;">
        </div>
        <div>机密信息</div>
        <div>
          <textarea name="" class="public" v-model="secretMessage" @blur="cmdsecret()" cols="30" rows="5"></textarea>
        </div>
      </div>
      <div class="option1">
        <div @click="OrderComplete">提交</div>
      </div>
    </div>
    <mt-datetime-picker
      type="date"
      ref="picker"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm"
      :startDate="startDate"
    >
    </mt-datetime-picker>
    <dateMonth v-if="this.$store.state.myOrderListState.dateMonthreveal"></dateMonth>
  </div>
</template>
<script>
  import dateMonth from './dateMonth.vue'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey, deepCopy} from '@/lib/util'
  import { Toast } from 'mint-ui';
  import { DatetimePicker } from 'mint-ui'
  import moment from 'moment'// 格式化时间
  export default {
    name: 'submitOrder',
    data() {
      return {
        impUrl: this.$store.state.myOrderListState.impUrl,
        file: '',
        title: '提交工单',
        value: this.$store.state.myOrderListState.orderListFrom.cmwdPriority,
        options:[
          {
            label: '一般',
            value: '01common'
          },
          {
            label: '重要',
            value: '02Important'
          }
        ],
        selectDateShow: false,
        isLoading: false,
        dateList:[],
        orderType: '',
        startDate: new Date(),
        cmwdDesc: this.$store.state.myOrderListState.orderListFrom.cmwdDesc,
        phoneNum: this.$store.state.myOrderListState.orderListFrom.cmwdMobile,
        email: this.$store.state.myOrderListState.orderListFrom.cmwdMail,
        secretMessage: this.$store.state.myOrderListState.orderListFrom.cmwdConfidentialinfo,
      }
    },
    created() {
      this.getSelect()
      this.orderType = getUrlKey('name')
      this.$store.state.myOrderListState.orderListFrom.cmwdType = getUrlKey('id')
    },
    methods:{

      // 下拉  radio
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'workorderpriority,workordersmstime',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.cmwdPriorityYesOrNo = res.data.content[0].value[0].paramList
            t.dateList = res.data.content[0].value[1].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: '错误',
            content: '网络错误',
          })
        })
      },
      selectDate() {
        this.selectDateShow = true
      },
      selectDataClose(name,code) {
        this.$store.state.myOrderListState.orderListFrom.cmwdSmsprom = code
        this.$store.state.myOrderListState.note = name
        this.selectDateShow = false
      },
      backDate() {
        this.$refs.picker.open();
//        this.$store.commit('myOrderListState/setDateMonthreveal',true)
      },
      handleConfirm (data) {
        let date = moment(data).format('YYYY-MM-DD')
        this.$store.commit('myOrderListState/setSelectDateTime',date)
//        alert(date)
      },
      orderRadio(value) {
        this.$store.state.myOrderListState.orderListFrom.cmwdPriority = value
      },
      // 选择工单类型
      selectOrderType() {
         this.$router.push({
           path:'/OrderList'
         })
      },
      problemDesc() {
        this.$store.state.myOrderListState.orderListFrom.cmwdDesc = this.cmwdDesc
      },
      phoneNumber() {
        this.$store.state.myOrderListState.orderListFrom.cmwdMobile = this.phoneNum
      },
      cmdEmail() {
        this.$store.state.myOrderListState.orderListFrom.cmwdMail = this.email
      },
      cmdsecret() {
        this.$store.state.myOrderListState.orderListFrom.cmwdConfidentialinfo = this.secretMessage
      },
      UpLoadFile(event){
        const t = this
        var file = event.target.files;
//        console.log(file[0])
        const formData = new FormData()
        formData.append('upfile',file[0])
        uploadFile(formData).then(res => {
          // console.log(this.file)
          if(res.statusText == 'OK'){
//            this.file = JSON.stringify(res.data) // 拿到的对象转为字符串
            let fileKey = ''
            let fileName = ''
            for (const key in res.data) {
              fileKey = res.data[key]
              fileName = key
            }
            console.log(fileKey)
            console.log(fileName)
            this.file = fileName + ':' + fileKey
            console.log(this.file)
            this.downloadDocs(fileKey,fileName)
            // 用于展示，下载
//            this.Files[value].fileName = fileName
//            this.Files[value].fileKey = fileKey
            Toast({
              message: '上传成功',
              position: 'middle',
              duration: 2000
            });
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
          logType: '下载',
          filekey: url,
          expiresecs: 180,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(filename);
//            console.log(doclink)
//            let link = document.createElement('a');
//            link.href = doclink;
//            link.download = "downloadfiletemp";
//            link.click();/
//            window.location.href = doclink;
//            window.open(doclink,'_top');
            this.$store.state.myOrderListState.impUrl.push(doclink)
          }
        }).catch(() => {
          t.$Modal.error({
            title: '错误',
            content: '获取文件失败！',
          })
        })
      },
      OrderComplete() {
        const t = this
        if (this.$store.state.myOrderListState.orderListFrom.cmwdDesc == '') {
          layer.msg("请输入问题描述!");
          return
        }
        if (this.$store.state.myOrderListState.orderListFrom.cmwdExpfeedbacktime == '') {
          layer.msg("请输入期望反馈时间!");
          return
        }
        if (this.$store.state.myOrderListState.note == '') {
          layer.msg("请输入接受短信时段!");
          return
        }
        const data = deepCopy(this.$store.state.myOrderListState.orderListFrom)
        data._mt = 'weiXinWorkorder.addOrUpd'
        data.companyId = pubsource.companyId
        data.userId = localStorage.getItem('bus_userid')
        data.cmwdAuthor = localStorage.getItem('bus_userid')
        data.cmwdAttach = this.file
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.isLoading = true
        getDataLevelUserLoginNew(data).then(res => {
          if (res.data.content[0].value) {
              console.log(res.data.content[0].value)
            Object.keys(this.$store.state.myOrderListState.orderListFrom).forEach(key => this.$store.state.myOrderListState.orderListFrom[key]= '');
            t.isLoading = false
            this.$store.state.myOrderListState.note = ''
            this.$store.state.myOrderListState.orderListFrom.cmwdMail = localStorage.getItem('wx_email')
            this.$store.state.myOrderListState.orderListFrom.cmwdMobile = localStorage.getItem('wx_mobile')
            this.$store.state.myOrderListState.orderListFrom.cmwdPriority = '01common'
            this.$store.state.myOrderListState.orderListFrom.cmwdStatus = '01waiting'
            this.$store.state.myOrderListState.orderListFrom.cmwdProperty = '01manual'
            this.$store.state.myOrderListState.orderListFrom.cmwdWotypeprop = '01consultation'
            this.$router.push({
              path: '/myOrderList'
            })

          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    components:{
      dateMonth
    }
  }
</script>
<style>
  .mint-cell-wrapper{
    font-size: 32px;
  }
</style>
<style scoped lang="less" type="text/less">
  @import '../../../css/myOrder';
  .middle{
    width:100%;
    background: white;
    height: 100%;
    overflow-y: scroll;
    position: relative;
    .mint-radio-label{
      font-size: 32px;
    }
    .option{
      width:100%;
      height:90px;
      line-height: 90px;
      display: flex;
      justify-content: space-between;
      padding: 0 40px;
      box-sizing: border-box;
      font-size: 32px;
      border-bottom: 1px solid #E3E3E3;
      .emailIpt{
        height: 88px;
        width:330px;
        border: 0;
        outline: none;
        text-align: right;
      }
      .optionRadio{
        padding-top: 20px;
      }
      .selectDate{
        background: white;
        width:300px;
        height: 300px;
        position: absolute;
        top:10px;
        right: 60px;
      }
      .mint-radiolist{
        display: flex;
      }
      img{
        width:20px;
        height: 20px;
      }
      div:nth-of-type(1){
        color: #999999;
      }
      div:nth-of-type(2){
        color: #333333;
      }
    }
    .option1{
      width:100%;
      height:90px;
      line-height: 90px;
      padding: 0 40px;
      box-sizing: border-box;
      font-size: 32px;
      border-bottom: 1px solid #E3E3E3;
      margin-top: 20px;
      div{
        width:600px;
        height: 90px;
        line-height: 90px;
        font-size: 34px;
        text-align: center;
        background: #3399FF;
        color: white;
        border-radius: 10px;
        margin: auto;
      }
    }
    .problemDescribe{
      padding: 0 40px;
      width:100%;
      .public{
        color: #333333;
        font-size: 32px;
      }
      .problemDescribeImg{
        width:120px;
        height:120px;
        position: relative;
        input{
          border:0;
          width:120px;
          height:90px;
          opacity: 0;
          z-index: 10;
          position: absolute;
          top:0;
          left:0;
        }
        img{
          position: absolute;
          top:0;
          left:0;
          width:120px;
          height:120px;
        }
      }
      div:nth-of-type(1){
        padding: 20px 0;
        font-size: 32px;
        color: #999999;
      }
      div:nth-of-type(4){
        padding: 20px 0;
        font-size: 32px;
        color: #999999;
      }
      textarea{
        width:100%;
        border:1px solid #E3E3E3;
        outline: none;
      }
    }
    .optional{
      height: 82px;
      font-size: 32px;
      background: #f6f6f6;
      line-height: 82px;
      padding-left: 40px;
    }
  }
</style>
