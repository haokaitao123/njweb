<!--一条为一行-->
<template>
  <div>
    <!--<div class="EmployeeInformation">-->
      <div class="message">
        <div>
          <span>审批人</span>
          <span>{{appName}}</span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>审批时间</span>
          <span>{{date_value}}</span>
        </div>
      </div>
      <div class="message1">
        <div>
          <span>审批结论</span>
          <span>
            <mt-radio
              v-model="value"
              :options=this.options
              @change="selectOption"
            >
          </mt-radio>
          </span>
          <!--<span>{{dataList.empdimContractedate}}</span>-->
        </div>
      </div>
      <div class="message">
        <div>
          <span>审批意见</span>
          <span>
            <textarea v-model="opinion" name="" placeholder="请输入您的意见" id="" cols="25" rows="5"></textarea>
          </span>
        </div>
        <span class="hint" v-if="values == '02noneapproved'">*</span>
        <span class="hintMessage" v-if="hintMessage">请输入您的意见</span>
      </div>
    <div class="message2">
      <div @click="SubmitApporal">提交</div>
    </div>
    </div>
    <!--</div>-->
</template>

<script>
  import {getDataLevelUserLogin, getDataLevelUserLoginNew2} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  export default {
    name: "SubmitInfo",
    data() {
      return{
        options:[
          {
            label: '审批通过',
            value: '01approved'
          },
          {
            label: '审批否决',
            value: '02noneapproved'
          }
        ],
        value: '01approved',
        appName: '',
        date_value: '',
        aprdBillid: '',
        aprdStepid: '',
        opinion: '',
        hintMessage: false,
      }
    },
    props:{
      dataList:Object,
    },
    computed :{
      values () {
        return this.value
      }
    },
    mounted() {
      this.aprdBillid = getUrlKey('aprdBillid')
      this.aprdStepid = getUrlKey('aprdStepid')
      this.appName = localStorage.getItem('bus_empCname')
      let date = new Date()
      this.date_value= date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    },
    methods:{
      approalMes() {
        if (this.opinion.length < 0) {
          this.hintMessage = true
        } else {
          this.hintMessage = false
        }
      },
      selectOption(value) {
        if (value == '01approved') {
          this.hintMessage = false
        } else {
          this.hintMessage = false
        }
      },
        SubmitApporal() {
          const t = this
          let data = {
            _mt: "weiXinTodo.aprvSubmit",
            logType: "提交审批",
            aprdBillid:this.aprdBillid,
            aprdStepid:this.aprdStepid,
            aprdApprover:localStorage.getItem('bus_empid'),
            aprdApproverDis:localStorage.getItem('bus_empCname'),
            aprdAprvtime:this.date_value,
            aprdAprvresult:this.value,
            aprdAprvopinion:this.opinion,
            roleType:'3user',
          }
          if (this.value == '02noneapproved') {
            if (this.opinion == '') {
              this.hintMessage = true
              return
            }
          }
          for (const dat in data) {
            if (data[dat] === '') {
              delete data[dat]
            }
          }
          getDataLevelUserLoginNew2(data).then((res) => {
            if (isSuccess(res, t)) {
              console.log(res.data.content[0])
              if(res.data.content[0].value == 'SUCESS') {
                this.$router.push({
                  path:'/backlogMatter'
                })
              }
            }
          }).catch((res) =>{
            console.error(res.data.stat.stateList[0].desc)
          })
        }
      }
  }
</script>

<style scoped type="text/less" lang="less">
  .message{
    width: 100%;
    position: relative;
    .hint{
      position: absolute;
      top:50px;
      left: 0;
      color: red;
      font-size: 30px;
    }
    .hintMessage{
      position: absolute;
      top:90px;
      left: 30px;
      color: red;
      font-size: 30px;
    }
    div{
      display: flex;
      justify-content: space-between;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;
      padding: 45px 35px  26px 32px;
    }
    textarea{
      border: 0;
      outline: none;
      text-align: right;
    }
  }
  .message1{
    width: 100%;
    div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;
      padding: 20px 20px  26px 32px;
    }
  }
  .message2{
    width: 100%;
    div{
      background: #3399FF;
      font-size: 36px;
      color: white;
      width: 600px;
      height: 80px;
      line-height: 80px;
      margin: auto;
      text-align: center;
      border-radius: 10px;
    }
  }
</style>
