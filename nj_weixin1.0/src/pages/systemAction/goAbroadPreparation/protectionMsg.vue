<!--护照信息-->
<template>
  <div class="messageAll">
    <!--<data value="" v-for="item in dataList">-->
      <div class="message">
        <div>
          <span>确认资料已经准备齐全</span>
          <span class="point">*</span>
          <span id="checkBox" @click="checkBox">
            <img class="image" src="../../../../static/action/checkBox.png" alt="" v-if="checkbox">
          </span>
        </div>
      </div>
      <div class="message">
        <div>
          <span>提交日期</span>
          <span class="point">*</span>
          <span @click="submitTime">
            <span class="time">{{passComfrtime}}</span>
            <img class='img' src="../../../../static/action/05.png" alt="">
          </span>
        </div>
      </div>
      <div class="message2" v-if="dataList.thisStepstate !== 'undefined' && (dataList.thisStepstate === 'p_flowst_1' || dataList.thisStepstate === 'p_flowst_2')">
        <div @click="submit">
          提交
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
      <!--</data>-->
    </div>
</template>

<script>
  import moment from 'moment'// 格式化时间
  import {getDataLevelUserLoginNew,getDataLevelNone} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey,deepCopy} from '@/lib/util'
  export default {
    name: "protectionMsg",
    props:{
      dataList:Object,
    },
    data() {
      return{
          checkbox: false,
          radio: 1,
          switch: true,
          startDate: new Date(),
          passComfrtime: moment(new Date()).format('YYYY-MM-DD'),
          passComfrdocs: '1'
      }
    },
    methods:{
      submit() {
        if (!this.checkbox) {
          layer.msg("请把必填项补充完整");
          return
        }
        const data = {
          _mt : 'wxVisaPassport.submitStep',
          companyId : '1000',
          userId : localStorage.getItem('bus_userid'),
          thisStep : '2-1',
          passComfrdocs : this.passComfrdocs,
          passComfrtime : this.passComfrtime,
          id:this.dataList.id
        }
        getDataLevelUserLoginNew(data).then((res)=>{
          console.log(res.data.content[0].value)
          if (res.data.content[0].value === '1') {
            this.$router.push({
              path:'/goAbroadPreLis'
            })
          }
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
      },
      submitTime() {
        this.$refs.picker.open();
      },
      handleConfirm (data) {
        let date = moment(data).format('YYYY-MM-DD')
        this.passComfrtime = date
      },
      checkBox() {
        if (this.switch) {
          this.checkbox = true
        } else {
          this.checkbox = false
        }
        this.switch = !this.switch
      }
    },
    mounted() {
      this.passComfrtime = this.dataList.passComfrtime
      if (this.dataList.passComfrdocs === '1') {
        this.checkbox = true
      }
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
  .messageAll{
    margin-bottom: 10px;
  }
  .message{
    border-bottom: 3px solid #E3E3E3;
    width: 100%;
    position: relative;
    .point{
      position: absolute;
      top:50px;
      left:0;
      color: red;
    }
    div{
      display: flex;
      justify-content: space-between;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;
      padding: 45px 35px  26px 32px;
      .time{
        margin-right: 10px;
      }
      #checkBox{
        display: inline-block;
        width:40px;
        height:40px;
        border:1px solid #999999;
        .image{
          width:100%;
          height:100%;
        }
      }
      span:nth-of-type(3){
        display: flex;
        align-items: center;
        .img{
          width:20px;
          height:30px;
        }
        .ipt{
          border:0;
          outline: none;
          width:170px;
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
</style>
