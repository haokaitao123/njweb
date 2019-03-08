<!--任务详情-->
<template>
  <div class="wrap">
      <!--<div class="top">-->
        <!--<div class="title"></div>-->
        <!--&lt;!&ndash;<img src="../../../.././static/action/jt_01.png" class="Image" alt="" v-show="flag" @click="goIndex">&ndash;&gt;-->
        <!--<span class="ImageRemove" @click="removeDateAll" v-if="this.dateRemove">删除</span>-->
        <!--&lt;!&ndash;<span class="ImageRl" @click="complete">完成</span>&ndash;&gt;-->
      <!--</div>-->
      <div class="wrapAll">
      <div class="theme">
        <div class="subject">
            <div></div>
            <div>
              <input type="text" v-model="subject" @blur="textTitle()" ref="inputT" placeholder="主题">
            </div>
        </div>
        <div class="place">
          <div><img src="../../../.././static/date/cy_05.png" alt=""></div>
          <div>
            <input type="text" v-model="place" @blur="placeTitle()" ref="inputP" placeholder="地点">
          </div>
        </div>
      </div>
      <div class="dateTime">
        <div class="date">
          <p @click="selectDateStart">{{$store.state.selectDateTimeStart}}</p>
          <p v-if="!docked" @click="dateTimeShowStart">{{start_Hours}}</p>
        </div>
        <div class="date">
          <p @click="selectDateEnd">{{$store.state.selectDateTimeEnd}}</p>
          <p @click="dateTimeShowEnd" v-if="!docked">{{end_Hours}}</p>
        </div>
        <div class="dateTimeImg"></div>
      </div>
      <div class="day">
        <div>
          <img src="../../../.././static/date/wd_09.png" alt="">
          <span>全天</span>
        </div>
        <div>
          <mu-switch style="margin-left: 16px" v-model="docked"></mu-switch>
        </div>
      </div>
      <div class="alert" @click="dateWarn">
        <div>
          <img src="../../../.././static/date/cy_04.png" alt="">
          <span>提醒</span>
        </div>
        <div>
          <span>{{this.$store.state.warnTitle}}</span>
          <img src="../../../.././static/action/05.png" alt="">
        </div>
      </div>
      <div class="alertPeople" @click="Invite">
        <div style="display: flex;justify-content: space-between;width: 100%;">
          <div>
            <img src="../../../.././static/date/cy_03.png" alt="">
            <span>邀请参与人员</span>
          </div>
          <div>
            <img src="../../../.././static/action/05.png" alt="">
          </div>
        </div>
        <div>
          <span v-for="items in $store.state.InviteName">{{items}}</span>
        </div>
      </div>
      <div class="alert"  v-if="!fileName">
        <div>
          <span>附件</span>
        </div>
        <div style="position: relative">
          <input type="file" @change="UpLoadFile($event)">
          <span style="color: #3399FF">上传</span>
          <img src="../../../.././static/date/wd_11.png" alt="" class="Image">
        </div>
      </div>
        <div class="alert alert1"  v-if="fileName">
        <div>
          <span>附件</span>
        </div>
        <div style="position: relative">
          <input type="file" @change="UpLoadFile($event)">
          <span style="color: #3399FF">上传</span>
          <img src="../../../.././static/date/wd_11.png" alt="" class="Image">
        </div>
      </div>
        <div class="alert" v-if="fileName">
          <a href="javascript:;" @click="downloadDocs(fileKey, fileName)">{{ fileName }}</a>
        </div>
      <div class="option">
        <div class="yesNo">
          是否重复
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
      <div class="alert" @click="repeat" v-show="repeatShow">
          <div>
            <span>重复</span>
          </div>
          <div v-if="this.date_List != ''">
             <span v-if="this.date_List.remindRepeattype == 'repeateveryday'">
               <span v-if="this.date_List.remindRepeatcount != ''">每{{this.date_List.remindRepeatnum}}天重复,重复次数{{this.date_List.remindRepeatcount}}</span>
               <span v-if="this.date_List.remindRepeatstop != ''">每{{this.date_List.remindRepeatnum}}天重复,重复日期{{this.date_List.remindRepeatstop}}</span>
             </span>
             <span v-if="this.date_List.remindRepeattype == 'repeatmonthly'">
               <span v-if="this.date_List.remindRepeatcount != ''">每{{this.date_List.remindRepeatnum}}月重复,重复次数{{this.date_List.remindRepeatcount}}</span>
               <span v-if="this.date_List.remindRepeatstop != ''">每{{this.date_List.remindRepeatnum}}月重复,重复日期{{this.date_List.remindRepeatstop}}</span>
             </span>
             <span v-if="this.date_List.remindRepeattype == 'repeatweekly'">
                <span v-if="this.date_List.remindRepeatcount != ''">每{{this.date_List.remindRepeatnum}}周重复,重复次数{{this.date_List.remindRepeatcount}}</span>
                <span v-if="this.date_List.remindRepeatstop != ''">每{{this.date_List.remindRepeatnum}}周重复,重复日期{{this.date_List.remindRepeatstop}}</span>
             </span>
          </div>
        </div>
      <div class="account">
        <div>
          <!--<img src="../../../.././static/date/cy_01.png" alt="">-->
          <span>描述</span>
        </div>
        <div>
          <textarea name="" id="" cols="50" rows="3" v-model="describe"></textarea>
        </div>
      </div>
        <div class="account1">
          <div @click="complete">
              完成
          </div>
          <div @click="removeDateAll" v-if="this.dateRemove">
            删除
          </div>
        </div>
        <!--<div class="goNext" @click="complete">完成</div>-->
      <!--<div class="dateLast">-->
        <!--<div @click="repeat" v-show="repeatShow">-->
          <!--<span><img src="../../../.././static/date/wd_12.png" alt=""></span>-->
          <!--<span>重复</span>-->
        <!--</div>-->
        <!--&lt;!&ndash;<div>&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;<span><img src="../../../.././static/date/wd_13.png" alt=""></span>&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;<span>描述</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</div>-->
      <dateTime v-show="dateShow"></dateTime>
      <Repect-count v-show="countShow"></Repect-count>
      <date-month v-show="this.$store.state.dateMonthShow"></date-month>

        <!--删除任务-->
      <div class="removeDate" v-if="RemoveDate">
        <div class="removeDateOne">
          <div @click="removeOne">删除当前任务</div>
          <div @click="removeAll">删除所有任务</div>
          <p class="IconRem" @click="removeIcon">
            x
          </p>
        </div>

      </div>
    </div>
    <warn v-if="this.$store.state.dateList.warnTime"></warn>
    <invitePeople v-if="this.$store.state.dateList.invitTime"></invitePeople>
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
    <mt-datetime-picker
      ref="pickerTime"
      type="time"
      @confirm="handleConfirmTime"
    >
    </mt-datetime-picker>
  </div>
</template>
<script>
  import dateTime from './masking/dateTime'
  import RepectCount from './masking/repeatCount.vue'
  import dateMonth from './masking/dateMonth'
  import Bus from '@/lib/bus'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  import { Toast } from 'mint-ui';
  import warn from './warn.vue'
  import invitePeople from './invitePeople.vue'
  import { DatetimePicker } from 'mint-ui'
  import moment from 'moment'// 格式化时间
//  import 'mint-ui/lib/style.css'
  export default {
    name: 'dateDetails',
    data() {
      return {
        title:'创建日程',
        flag:true,
        docked:false,
        dateShow:false,
        countShow:false,
        startDate: new Date(),
        subject:'',
        place:'',
        start_Hours:'',
        end_Hours:'',
        inviteName:'',
        warnTimeList:'',
//        warnTitle:this.$store.state.warnTitle,
        file:'',
        fileName:'',
        fileKey:'',
        describe:'',
        date_List:{},
        dateRemove:false, ///修改字段
        dateId:'',///修改字段
        num:0,///修改字段
        id:'',///修改字段
        remindParchitype:'',///修改字段
        createBy:'',///修改字段
        createTime:'',///修改字段
        RemoveDate: false,
        repeatShow:false,
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
        value: '0',
        warnList:[
          {
            title:'提前五分钟',
            type:'minutetype',
            num:5
          },
          {
            title:'提前十五分钟',
            type:'minutetype',
            num:15
          },
          {
            title:'提前三十分钟',
            type:'minutetype',
            num:30
          },
          {
            title:'提前1小时',
            type:'hourtype',
            num:1
          },
          {
            title:'提前2小时',
            type:'hourtype',
            num:2
          },
          {
            title:'提前3小时',
            type:'hourtype',
            num:3
          },
          {
            title:'提前1天',
            type:'daytype',
            num:1
          },
          {
            title:'提前2天',
            type:'daytype',
            num:2
          }
        ],
        dataList:'',
        remindTypeAddDel:'0root',
      }
    },
    created(){
      function dateTime() {
        var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var myDates = new Date(Date.parse(new Date().toLocaleDateString()));

        var myDate = new Date();
        if((myDate.getMonth() + 1) < 10){
          if (myDate.getDate() < 10) {
            return myDate.getFullYear() + '-' +  '0' +(myDate.getMonth() + 1) + '-' + '0' + myDate.getDate() + weekDay[myDates.getDay()];
          } else {
            return myDate.getFullYear() + '-' +  '0' +(myDate.getMonth() + 1) + '-' +  myDate.getDate() + weekDay[myDates.getDay()];
          }
        } else {
          if (myDate.getDate() < 10) {
            return myDate.getFullYear() + '-' +(myDate.getMonth() + 1) + '-' + '0' + myDate.getDate() + weekDay[myDates.getDay()];
          } else {
            return myDate.getFullYear() + '-' +  (myDate.getMonth() + 1) + '-' + myDate.getDate() + weekDay[myDates.getDay()];
          }
        }
      }

      localStorage.setItem('dateTime',dateTime())
      this.$store.state.selectDateTimeEnd = dateTime()
      this.$store.state.selectDateTimeStart = dateTime()
      let date = new Date();
      if(date.getMinutes() < 10){
        this.start_Hours= date.getHours() + ':' +  "0" + date.getMinutes()
        this.end_Hours = date.getHours() + ':' + "0" +date.getMinutes()
      } else {
        this.start_Hours= date.getHours() + ':' +  date.getMinutes()
        this.end_Hours = date.getHours() + ':' + date.getMinutes()
      }

      this.subject = localStorage.getItem('input1')
      this.place = localStorage.getItem('input2')

      this.dateId = getUrlKey('id');

      if (getUrlKey('dateRemove')) {
        this.dateRemove = getUrlKey('dateRemove')
        localStorage.setItem('dateRemove',this.dateRemove)
      }
      //如果为修改 则进行请求
      if(this.dateRemove){
        this.getData()
      }
    },
    methods:{

      complete(){
        console.log(this.file, '附件')
        const t = this
        if(this.dateRemove){
          this.num = 3
          this.id = this.dateId
        } else {
          this.num = 0
        }
//        alert(t.$store.state.InviteCount)
        const data = {
          _mt:'weiXinRemind.addOrUpd',
          logType:'新增日程',
          funId:'1',
//          remindType:'0root',
          remindType: this.remindTypeAddDel,
          remindPlat:'wx',
          id:this.id,
          remindParchitype:this.remindParchitype,
          remindMasterSlave:this.num,
          createBy:this.createBy,
          createTime:this.createTime,
          companyId:pubsource.companyId,
          remindTitle:t.subject,
          remindPlace:t.place,
          remindStatime:t.$store.state.selectDateTimeStart.substring(0,10) + " " + t.start_Hours + ':00',
          remindStoptime:t.$store.state.selectDateTimeEnd.substring(0,10) + " " + t.end_Hours + ':00',
          remindStatimeHour:t.start_Hours,
          remindStoptimeHour:t.end_Hours,
          remindAdvance:t.$store.state.warnType,
          remindAdvanceNum:t.$store.state.warnNum,
          remindFile:t.file,
          remindFiledesc:t.describe,
          remindRepeatcount:this.date_List.remindRepeatcount,
          remindRepeatnum:this.date_List.remindRepeatnum,
          remindRepeatstop:this.date_List.remindRepeatstop,
          remindRepeatstoptype:this.date_List.remindRepeatstoptype,
          remindRepeattype:this.date_List.remindRepeattype,
//          remindRepeatweek:this.date_List.remindRepeatweek.join(','),
          remindIsrep: this.value
        }
        console.log(this.date_List)
        console.log(data, 'data')
        //remindMemid:t.$store.state.InviteCount.join(','),
        /* 解决如果不选择参与人员就不能提交 */
        if(t.$store.state.InviteCount === '') {
          data.remindMemid = t.$store.state.InviteCount
        } else {
          data.remindMemid = t.$store.state.InviteCount.join(',')
        }
        /* 解决如果不选择重复几周就不能提交 */
        if (this.date_List.remindRepeatweek === undefined) {
          data.remindRepeatweek = this.date_List.remindRepeatweek
        } else {
          data.remindRepeatweek = this.date_List.remindRepeatweek.join(',')
        }
        if (this.dateRemove) {
          data.remindMasterSlave = '3'
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then(res => {
//          console.log(res)
          if(isSuccess(res,t)){
            localStorage.removeItem('input1')
            localStorage.removeItem('input2')
            t.$router.push({
              path:'/responsibleTask'
            })
            t.$store.state.selectDateTimeStart = ''
            t.$store.state.selectDateTimeEnd = ''
            this.$store.state.InviteName = []
            this.$store.state.InviteCount = []
          }
          this.$store.commit('dateList/setpeoRows', 60)
          localStorage.removeItem('dateRemove')
        }).catch((err) => {
          console.log(err)
        })
      },
      getData(){
        const t = this;
        const data = {
          _mt:'weiXinRemind.getById',
          funId:'1',
          companyId:pubsource.companyId,
          logType:'日程详情查询个人信息',
          id:t.dateId
        }
        getDataLevelUserLogin(data).then(res =>{
          if (isSuccess(res,t)){
//            this.$store.commit('dateList/setDataList',JSON.parse(res.data.content[0].value)[0])
            this.dataList = JSON.parse(res.data.content[0].value)[0]
            console.log(this.dataList, '351351351')
            this.subject = this.dataList.remindTitle
            if (this.dataList.hasOwnProperty('remindFile')) {
              this.file = this.dataList.remindFile
              this.fileName = Object.keys(JSON.parse(this.dataList.remindFile))[0]
              console.log(Object.keys(JSON.parse(this.dataList.remindFile)))
              this.fileKey = Object.values(JSON.parse(this.dataList.remindFile))[0]
            }
            console.log(typeof this.dataList.remindFile)
            console.log(this.file, '附件')
            this.place = this.dataList.remindPlace
            t.$store.state.selectDateTimeStart = this.dataList.remindStatime.substring(0,10)
            t.$store.state.selectDateTimeEnd = this.dataList.remindStoptime.substring(0,10)
            this.start_Hours = this.dataList.remindStatimeHour
            this.end_Hours = this.dataList.remindStoptimeHour
            this.remindParchitype = this.dataList.remindParchitype
            this.createBy = this.dataList.createBy
            this.createTime = this.dataList.createTime
            this.remindTypeAddDel = this.dataList.remindType
            t.value = this.dataList.remindIsrep
            if (t.value === '1') {
              this.repeatShow = true
            } else {
              this.repeatShow = false
            }
            t.describe = this.dataList.remindFiledesc
//            console.log(dataList.remindMemidDis)
//            console.log(dataList.remindIsrep)
//            console.log(t.$store.state.InviteName)
            if (this.dataList.hasOwnProperty('remindMemidDis')) {
              t.$store.state.InviteName = this.dataList.remindMemidDis.split(',')
              t.$store.state.InviteCount = this.dataList.remindMemid.split(',')
            }
            if (this.dataList.hasOwnProperty('remindAdvance')) {
              t.$store.state.warnType = this.dataList.remindAdvance
              t.$store.state.warnNum = this.dataList.remindAdvanceNum
            }

            console.log(t.$store.state.InviteCount)
              switch (this.dataList.remindAdvance){
                case "hourtype":
                  t.warnTitle = '提前' + this.dataList.remindAdvanceNum + '小时';
                  break;
                case 'minutetype':
                  t.warnTitle = '提前' + this.dataList.remindAdvanceNum + '分钟';
                  break;
                case 'daytype':
                  t.warnTitle = '提前' +  this.dataList.remindAdvanceNum + '天';
                  break;
              }
              if (this.dataList.remindRepeatstop == undefined) {
                this.dataList.remindRepeatstop = ''
              }
              if (this.dataList.remindRepeatcount == undefined) {
                this.dataList.remindRepeatcount = ''
              }
              if (this.dataList.remindRepeatnum == undefined) {
                this.dataList = {}
                return
              }
            this.date_List.remindRepeatnum = this.dataList.remindRepeatnum
            this.date_List.remindRepeatstop = this.dataList.remindRepeatstop.substring(0,10)
            this.date_List.remindRepeatstoptype = this.dataList.remindRepeatstoptype
            this.date_List.remindRepeattype = this.dataList.remindRepeattype
            this.date_List.remindRepeatcount = this.dataList.remindRepeatcount
            if (this.dataList.remindRepeatweek != '') {
                  this.date_List.remindRepeatweek = this.dataList.remindRepeatweek
            }
//            t.$store.state.warn.title = dataList.remindAdvance + '小时';
//            t.$store.state.InviteName.empCname = dataList.remindMemidDis
//            this.dataTime.dataStartTime = this.dataList.remindStatime.substring(0,10)
//            this.dataTime.dataEndTime = this.dataList.remindStoptime.substring(0,10)
          }
        }).catch(err =>{
          console.log(err)
        })
      },
      textTitle(){
        localStorage.setItem('input1',this.$refs.inputT.value)
      },
      placeTitle(){
        localStorage.setItem('input2',this.$refs.inputP.value)
      },
      goIndex() {
        this.$router.push({
          path:'/responsibleTask'
        })
        localStorage.removeItem('input1')
        localStorage.removeItem('input2')
        localStorage.removeItem('dateRemove')
      },
      repeat() {
        this.countShow = true
//        this.date_List.remindRepeatstop = ''
        Bus.$emit('repect', this.date_List)
        console.log(this.date_List)
      },
      dateWarn() {
        this.$store.commit('dateList/setwarnTime', true)
      },
      Invite() {
//        this.$store.state.InviteName = []
//        this.$store.state.InviteCount = []
        this.$store.commit('dateList/setInvitTime', true)
      },
      selectDateStart() {
        this.$refs.picker.open();
        const t = this
        this.$store.state.end = ''
//        this.$store.commit('dateMonthreveal',true)
        this.$store.commit('startTime','开始时间')

      },
      handleConfirm (data) {
        let date = moment(data).format('YYYY-MM-DD')
        if(this.$store.state.start == '开始时间'){
          this.$store.commit('selectDateTimeStart',date)
        } else if (this.$store.state.end == '结束时间') {
          this.$store.commit('selectDateTimeEnd',date)
        }
//        alert(date)
      },
      selectDateEnd(){
        this.$refs.picker.open();
        this.$store.state.start = ''
//        this.$store.commit('dateMonthreveal',true)
        this.$store.commit('startEnd','结束时间')
      },
      dateTimeShowStart() {
        this.$refs.pickerTime.open();
        localStorage.setItem('time',0)
//        this.dateShow = true
      },
      dateTimeShowEnd() {
        this.$refs.pickerTime.open();
        localStorage.setItem('time',1)
//        this.dateShow = true
      },
      handleConfirmTime(data) {
        if (localStorage.getItem('time') == 0){
          this.start_Hours = data
        } else {
          this.end_Hours = data
        }
        localStorage.removeItem('time')
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
            this.file = JSON.stringify(res.data) // 拿到的对象转为字符串
            this.fileName = Object.keys(res.data)[0]
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
      removeDateAll(){
        this.RemoveDate = true
      },
      removeIcon() {
        this.RemoveDate = false
      },
      removeOne(){
        const t = this
        const data = {
          _mt:'cmutRemind.delByIds',
          funId:'1',
          logType:'删除当前任务',
          remindMasterSlave: 2,
          delIds: this.dateId,
          companyId:pubsource.companyId
        }
        getDataLevelUserLogin(data).then(res =>{
          if (isSuccess(res,t)){
              this.$router.push({
                path:'/responsibleTask'
              })
              Toast({
                message: '删除当前任务成功',
                position: 'middle',
                duration: 2000
              });
          }
          this.RemoveDate = false
        }).catch(err =>{
          console.log(err)
        })
      },
      removeAll(){
        this.RemoveDate = false
        const t = this
        const data = {
          _mt:'cmutRemind.delByIds',
          funId:'1',
          logType:'删除所有任务',
          remindMasterSlave: 3,
          delIds: this.dateId,
          companyId:pubsource.companyId
        }
        getDataLevelUserLogin(data).then(res =>{
          if (isSuccess(res,t)){
              this.$router.push({
                path:'/responsibleTask'
              })
              Toast({
                message: '删除所有任务成功',
                position: 'middle',
                duration: 2000
              });
          }
        }).catch(err =>{
          console.log(err)
        })
      },
      orderRadio(value) {
        if (value === '1') {
          this.repeatShow = true
        } else {
          this.repeatShow = false
          this.date_List = {}
        }

      },
      /**
       * 下载文件
       * @param url filekey
       * @param filename
       */
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
    },
    components:{
      dateTime,
      RepectCount,
      dateMonth,
      warn,
      invitePeople
    },
    mounted() {
      Bus.$on('remove',()=>{
        this.dateShow = false
      })
      Bus.$on('sureStart',(res)=>{
        this.dateShow = false
        this.start_Hours = res
      })
      Bus.$on('endStart',(res)=>{
        this.dateShow = false
        this.end_Hours = res
      })
      Bus.$on('removeDate', ()=>{
        this.countShow = false
      })
      Bus.$on('sureDate', (res)=>{
        this.countShow = false
        this.date_List = res
        console.log(this.date_List)
      })
    }
  }
</script>
<style>

</style>
<style scoped lang="less" type="text/less">
  @import '../../../pages/css/appLink';
  .wrap{
    background: #F3F3F3;
    width:100%;
    height: 100%;
    position: relative;
    .wrapAll{
      height: 100%;
      overflow-y: scroll;
    }
    .goNext{
      position: absolute;
      background-size: 100% 100%;
      width:80%;
      height:90px;
      left: 60px;
      bottom: 0;
      background:#3399FF ;
      text-align: center;
      border-radius: 10px;
      font-size: 34px;
      color: white;
      line-height: 90px;
    }
  }
  .aaa{
    height:100px;
  }
  .top{
    width:100%;
    .title{
      width:100%;
      height:88px;
      background-color: #3399FF;
      font-size: 36px;
      color: #fff;
      text-align: center;
      line-height: 88px;
      position: relative;
    }
    .Image{
      position: absolute;
      left:38px;
      top:30px;
      width:14px;
      height:24px;
    }
    .ImageRl{
      position: absolute;
      right:38px;
      top:20px;
      color: #ffffff;
      font-size: 36px;
    }
    .ImageRemove{
      position: absolute;
      right: 150px;
      top:20px;
      color: #ffffff;
      font-size: 36px;
    }
  }
  .theme{
    width:100%;
    background: white;
    margin-bottom: 30px;
    .subject{
      padding: 30px;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      border:2px solid #f3f3f3;
      div:nth-of-type(1){
        width:36px;
        height:36px;
        background: #3399FF;
        border-radius: 50%;
        margin-right: 30px;
      }
      div:nth-of-type(2){
        input{
          border:0;
          outline: none;
          font-size: 32px;
        }
      }
    }
    .place{
      padding: 30px;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      border:2px solid #f3f3f3;
      div:nth-of-type(1){
        width:40px;
        height:40px;
        margin-right: 30px;
        img{
          width:100%;
        }
      }
      div:nth-of-type(2){
        input{
          border:0;
          outline: none;
          font-size: 32px;
        }
      }
    }
  }
  .dateTime{
    padding:20px 60px;
    box-sizing: border-box;
    width:100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    background: white;
    border-bottom:2px solid #f3f3f3;
    align-items: center;
    height:132px;
    .date{
      p:nth-of-type(1){
        font-size: 28px;
      }
      p:nth-of-type(2){
        font-size: 36px;
      }
    }
    .dateTimeImg{
      position: absolute;
      top: 40px;
      left:45%;
      background-image: url("../../../.././static/date/right.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width:50px;
      height: 60px;
    }
  }
  .day{
    padding: 30px 30px;
    box-sizing: border-box;
    width:100%;
    display: flex;
    justify-content: space-between;
    background: white;
    align-items: center;
    margin-bottom: 30px;
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
        opacity: 0;
      }
      .Image{
        position: absolute;
        top:0;
        left:0;
        width:45px;
        height:50px;
      }
    }
  }
  .alert1{
    margin: 0;
  }
  .alertPeople{
    padding: 30px 30px;
    box-sizing: border-box;
    width:100%;
    background: white;
    margin-bottom: 30px;
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
        color: black;
        margin-right: 10px;
      }
      input{
        width:40px;
        opacity: 0;
      }
      .Image{
        position: absolute;
        top:0;
        left:0;
        width:45px;
        height:50px;
      }
    }
  }
  .option{
    width:100%;
    height:90px;
    line-height: 90px;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    box-sizing: border-box;
    font-size: 32px;
    background: white;
    margin-bottom: 20px;
    .yesNo{
      font-size: 30px;
    }
    .emailIpt{
      height: 88px;
      width:230px;
      border: 0;
      outline: none;
      text-align: right;
    }
    .optionRadio{
      padding-top: 20px;
      font-size: 30px;
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
      color: #333333;
    }
    div:nth-of-type(2){
      color: #333333;
    }
  }
  .account{
    padding-left: 30px;
    width:100%;
    background: white;
    margin-top: 20px;
    box-sizing: border-box;
    div:nth-of-type(1){
      display: flex;
      align-items: center;
      font-size: 30px;
      img{
        width:50px;
        height:50px;
        vertical-align: text-bottom;
      }
    }
    textarea{
      outline: none;
      border:0;
    }
  }
  .account1{
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
    div:nth-of-type(2) {
      background: white;
      color: #3399FF;
      border-radius: 10px;
      margin-right: 20px;
    }
  }
  .dateLast{
    position: fixed;
    bottom:0;
    left: 0;
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    div{
      width: 360px;
      background: white;
      text-align: center;
      padding: 20px 0;
      img{
        width:50px;
        /*height:40px;*/
        vertical-align: middle;
      }
      span{
        font-size: 30px;
      }
    }
  }
  .removeDate{
    width:100%;
    position: absolute;
    top:0;
    left: 0;
    background: rgba(0,0,0,0.6);
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .removeDateOne{
      width:600px;
      height:400px;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      position: relative;
      font-size: 34px;
      text-align: center;
      .IconRem{
        position: absolute;
        top:0;
        right:20px;
        font-size: 70px;
      }
      div{
        background: #3399FF;
        color: white;
        width:250px;
        height:100px;
        line-height: 100px;
        border-radius: 10px;
        margin-right: 20px;
      }
    }
  }
</style>
