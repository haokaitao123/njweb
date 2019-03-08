<!--日程管理-->
<template>
  <div class="wrap">
    <!--<div class="top">-->
      <!--<div class="title">{{title}}</div>-->
      <!--<img src="../../../.././static/action/jt_01.png" class="Image" alt="" v-show="flag" @click="goIndex">-->
    <!--</div>-->
    <div class="middle">
      <div class="dateItems">
        <p>日程列表</p>
        <p>{{now_year}}年{{now_month}}月{{now_day}}日</p>
      </div>
      <img src="../../../.././static/date/rl.png" class="ImageRl" alt="" v-show="flag" @click="goDate">
    </div>
    <div class="calendarBox" style="overflow: hidden">
      <div class="date" style="display: none">
        <span @click="chooseTime" class="yearMonth left">{{now_year}}年{{now_month}}月 <span class="triangle-down"></span></span>
        <span @click="moveToday" class="right jin">今</span>
      </div>
      <div class="content">
        <div class="week">
          <ul>
            <li>日</li>
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
          </ul>
        </div>
        <div class="calendar" @touchstart="moveStart" @touchend="moveEnd">
          <ul id="d2">
            <li :class="{black:item.isNowMonth,gray:!item.isNowMonth,red:item.checked,today:item.old.isToday}" v-for="(item,index) in list" @click="checkMe(item.id-1)">
              <div class="daySize" >{{item.num}}</div>
              <div class="daySize"  style="font-size: .12rem;position: relative">{{item.old.old_str}}
                <!--class="redCircle"-->
                <!--{{dateArray}}-->
                <!--{{list[index].num}}-->
                <div v-if="list[index].month == 'now'">
                  <div v-if="now_month < 10">
                    <div v-if="list[index].num < 10" v-for="(item,indexs) in dateArray" :class="{redCircle : now_year + '-' +  '0' + now_month  + '-' + '0' + list[index].num == dateArray[indexs]}"></div>
                    <div v-if="list[index].num >= 10" v-for="(item,indexs) in dateArray" :class="{redCircle : now_year + '-' +  '0' + now_month  + '-' +  list[index].num == dateArray[indexs]}"></div>
                  </div>
                  <div v-if="now_month >= 10">
                    <div v-if="list[index].num < 10"  v-for="(item,indexs) in dateArray" :class="{redCircle : now_year + '-' + now_month  + '-' + '0'  + list[index].num == dateArray[indexs]}"></div>
                    <div v-if="list[index].num >= 10" v-for="(item,indexs) in dateArray" :class="{redCircle : now_year + '-' + now_month  + '-' +  list[index].num == dateArray[indexs]}"></div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <popup v-model="showPopup">
        <div>
          <div @click="showPopup=false" class="close">
            取消
          </div>
          <div @click="sure" class="sure" >
            确定
          </div>
          <div style="display: block;clear:both;"></div>
        </div>
        <datetime-view v-model="selectTime"></datetime-view>
      </popup>
    </div>
    <div class="footerAll" v-if="this.dataListAll">
      <div class="footer" v-for="(item,index) in dataListAll" @click="goDateInfo(index)">
        <div class="dateTime">
          <!--<span>{{item.createTime.substring(5,7)}}</span>-->
          <!--<span>今天</span>-->
          <div></div>
        </div>
        <div class="dateList">
          <div>{{item.remindTitle}}</div>
          <div class="dataListOne">
            <div></div>
            <div>{{item.remindStatimeHour}} - {{item.remindStoptimeHour}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import {Popup,DatetimeView} from 'vux'
  import calendar from '../../../../static/calendar'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  export default {
    name: 'dateManage',
    data() {
      return {
        title:'日程管理',
        flag:true,
        selectTime:'',
        showPopup:false,
        list:[],  //日历显示的数据
        oneMonthList:[],  //暂存一个月的数据
        week:1,  //第几周
        check:'',
        moveStartX:'',  // 滑动开始的横坐标
        moveEndX:'',    // 滑动结束的横坐标
        moveStartY:'',  // 滑动开始的纵坐标
        moveEndY:'',    // 滑动结束的纵坐标
        now_year:'',  //当前年份
        now_month:'', //当前月份
        now_day:'', //当前日期
        mode:'M',  //当前是显示一个月还是一个星期（默认月）
        maxHeight:'8rem',
        minHeight:'1.1rem',
        aaa:false,
        curveDate:'',//当前月份
        dateArray:[],///存放日期 进行对比
        dataList:"",
        dataListAll:'',
        curveDay:'',
        curveYear:'',
        endTime:'',
        startTime:''
      }
    },
    created(){
      this.curveDate = new Date().getMonth() + 1;
        this.curveDay = new Date().getDate();
      this.curveYear = new Date().getFullYear();

      /* 获取当月第一天 */
      /*function getCurrentMonthFirst(){
        var date=new Date();
        date.setDate(1);
        return date;
      }
      let date = getCurrentMonthFirst();
      if((date.getMonth() + 1) < 10){
        this.startTime = date.getFullYear() + '-' + '0' + (date.getMonth() + 1) + '-' + date.getDate()
      } else if((date.getMonth() + 1) >= 10){
        this.startTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      }
      alert(this.startTime)
      */
    },
    mounted() {
      let nstr=new Date() //当天时间
      this.now_year=nstr.getFullYear() //年份
      this.now_month=nstr.getMonth()+1 //月份
      this.now_day=nstr.getDate()  //日期
      console.log(this.now_year + '-' + this.now_month + '-' + this.now_day, '321111111111111')
      if (this.now_month < 10) {
        if (this.now_day < 10) {
          let Time = this.now_year + '-' + '0' + this.now_month + '-' + '0' + this.now_day
          this.getDataList(Time)
        } else if (this.now_day >= 10) {
          let Time = this.now_year + '-' + '0' + this.now_month + '-' + this.now_day
          this.getDataList(Time)
        }
      } else if (this.now_month >= 10){
        if (this.now_day < 10) {
          let Time = this.now_year + '-' + this.now_month + '-' + '0' + this.now_day
          this.getDataList(Time)
        } else if (this.now_day >= 10) {
          let Time = this.now_year + '-' +  this.now_month + '-' + this.now_day
          this.getDataList(Time)
        }
      }
      this.createCalendar(this.now_year,this.now_month)
      this.getData()
    },
    computed:{
      list_date(){
        for (let i = 0; i < this.list.length; i++){
          if (this.list[i].num == '20'){
            this.aaa = true
          }
        }
      },
      stopTime(){
        let year = this.now_year
        let month = this.now_month
        var  day = new Date(year,month,0);
        return year + '-' + month + '-' + day.getDate();
      }
    },
    methods:{
      ///请求
      getData(){
        const t = this;
        const data = {
          _mt:'weiXinRemind.getPage',
          funId:'1',
          logType:'日程管理获取日历信息',
          companyId:pubsource.companyId,
          remindPlat:'wx',
          remindMasterSlave:0,
          remindMemid:localStorage.getItem('bus_empid'),
//          remindStatime:this.startTime,
          remindStatime:this.now_year + '-' + this.now_month + '-' + '01' + ' ' + "00:00:00",
          remindStoptime:this.stopTime + ' ' +"23:59:59"
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then(res => {
          if (isSuccess(res, t)) {
            console.log(res)
            this.dataList = JSON.parse(res.data.content[0].value)
            //console.log(typeof this.dataList)
            var arr = []
            for (var i in this.dataList) {
              arr.push(this.dataList[i]); //属性
            }
           // console.log(arr)
            this.dateArray = []
            for (let j = 0; j < arr.length; j++){
              this.dateArray.push(arr[j].remindStatime.substring(0,10))
            }
            console.log(this.dateArray + '当前日期信息')
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      /////////点击某天进行请求
      getDataList(startTime){
        let StartTime = startTime
        const t = this;
        const data = {
          _mt:'weiXinRemind.getPage',
          funId:'1',
          logType:'日程管理点击某天进行请求',
          companyId:pubsource.companyId,
          remindPlat:'wx',
          remindMasterSlave:0,
          remindMemid:localStorage.getItem('bus_empid'),
          remindStatime: StartTime + ' ' + "00:00:00",
          remindStoptime:StartTime + ' ' +"23:59:59"
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then(res => {
          if (isSuccess(res, t)) {
            console.log(res)
            console.log(res)
            this.dataListAll = JSON.parse(res.data.content[0].value)
            console.log(this.dataListAll)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      goDateInfo(index){
        this.$router.push({
          path:'/dateTaskManage',
          query:{id:this.dataListAll[index].id}
        })
      },
      goIndex(){
        this.$router.go(-1)
      },
      goDate(){
        this.$router.push({
          path:'/responsibleTask'
        })
      },
      //      是否为闰年
      is_leap(year) {
        return (year%100==0?(year%400==0?1:0):(year%4==0?1:0));
      },
//      选择日期
      checkMe(id){
        for(let i of this.oneMonthList){
          i.checked=false
        }
//        不是本月的
        if(this.oneMonthList[id].isNowMonth==false){
          let checkDay=this.oneMonthList[id].num
//          上个月的
          if(this.oneMonthList[id].month=='last'){
            this.chooseMonth('pre')
            this.AddClass('leftmove')
            this.createCalendar(this.now_year,this.now_month)
            for( let s of this.oneMonthList){
              if(s.isNowMonth){
                if(s.num==checkDay){
                  s.checked=true
                  this.now_day=s.num
                  this.check= s.id-1
                }
              }
            }
//              下个月的
          }else if(this.oneMonthList[id].month=='next'){
            this.chooseMonth('next')
            this.AddClass('rightmove')
            this.createCalendar(this.now_year,this.now_month)
            for( let s of this.oneMonthList){
              if(s.isNowMonth==true){
                if(s.num==checkDay){
                  this.now_day=s.num
                  s.checked=true
                  this.check= s.id-1
                }
              }
            }
          }
        }else{
          this.oneMonthList[id].checked=true
          this.check=id
        }
//        返回点击的时间
        let times=this.now_year+"-"+this.now_month+"-"+this.now_day
//        console.log(this.oneMonthList[id])
//        console.log(times)
        console.log(this.oneMonthList[id].old.cYear +'-' + this.oneMonthList[id].old.cMonth +  '-' + this.oneMonthList[id].old.cDay)
        if(this.oneMonthList[id].old.cMonth < 10){
          if(this.oneMonthList[id].old.cDay < 10) {
            let Stime = this.oneMonthList[id].old.cYear +'-' + '0' + this.oneMonthList[id].old.cMonth +  '-' + '0' + this.oneMonthList[id].old.cDay
            console.log()
            this.getDataList(Stime)
          } else {
            let Stime = this.oneMonthList[id].old.cYear +'-' + '0' + this.oneMonthList[id].old.cMonth +  '-' + this.oneMonthList[id].old.cDay
            this.getDataList(Stime)
          }
        } else if (this.oneMonthList[id].old.cMonth >= 10){
          if(this.oneMonthList[id].old.cDay < 10) {
            let Stime = this.oneMonthList[id].old.cYear +'-' + this.oneMonthList[id].old.cMonth +  '-' + '0' + this.oneMonthList[id].old.cDay
            this.getDataList(Stime)
          } else {
            let Stime = this.oneMonthList[id].old.cYear +'-' + this.oneMonthList[id].old.cMonth +  '-' +  this.oneMonthList[id].old.cDay
            this.getDataList(Stime)
          }
        }
        this.$emit('checkTime',times)

      },
//      创建一个月的日历
      createCalendar(year,month,day){
        this.list=[]
        let nstr1=new Date(year,month-1,1)  //当月第一天
        let firstDay=nstr1.getDay()   //当月第一天是星期几
        let m_days=[31,28+this.is_leap(year),31,30,31,30,31,31,30,31,30,31]; //各月份的总天数
        let lastMonth=''  //上个月
        let lastWeek=''   //上个月的最后一天的星期数
        let lastDays=''
        if(month==1){
          lastMonth=11
          lastWeek=new Date(year-1,lastMonth,m_days[lastMonth]).getDay()
          lastDays=m_days[lastMonth]-lastWeek
        }else{
          lastMonth=month-1
          lastWeek=new Date(year,lastMonth-1,m_days[lastMonth-1]).getDay()
          lastDays=m_days[lastMonth-1]-lastWeek
        }
        let list=[]
        let s=1
        let id=1
        for(let i=0;i<6;i++){
          for(let j=0;j<7;j++){
            let idx=i*7+j; //单元格自然序列号
            let  date_str=idx-firstDay+1; //计算日期
            //前一个月的最后几天
            if(date_str<=0){
              //月份在1到12之间
              if(month>1&&month<=12){
                this.list.push({id:id++,num:lastDays++,isNowMonth:false,month:'last',old:calendar.solar2lunar(year,month-1,lastDays-1),checked:false})
                //月份为1
              }else if(month==1){
                this.list.push({id:id++,num:lastDays++,isNowMonth:false,month:'last',old:calendar.solar2lunar(year-1,12,lastDays-1),checked:false})
              }
              //下一个月的开始几天
            }else if(date_str>m_days[lastMonth]){
              //月份在1到12之间
              if(month<12&&month>=1){
                this.list.push({id:id++,num:s++,isNowMonth:false,month:'next',old:calendar.solar2lunar(year,month+1,s-1),checked:false})
                //月份为12
              }else if(month==12){
                this.list.push({id:id++,num:s++,isNowMonth:false,month:'next',old:calendar.solar2lunar(year+1,1,s-1),checked:false})
              }
              //当前月份
            }else{
              this.list.push({id:id++,num:date_str,isNowMonth:true,month:'now',old:calendar.solar2lunar(year,month,date_str),checked:false})
            }
          }
        }
        this.oneMonthList=this.list
        console.log(this.list)
      },
      moveStart(e){
        this.moveStartX= e.changedTouches[0].clientX
        this.moveStartY= e.changedTouches[0].clientY
      },
      moveEnd(e){
        let self=this
        this.moveEndX= e.changedTouches[0].clientX
        this.moveEndY= e.changedTouches[0].clientY
        //  下拉
        if(this.moveEndY - this.moveStartY>40){
          this.mode='M'
          $('#d2').css('height',this.maxHeight)
          this.createCalendar(this.now_year,this.now_month)
          if(this.check!=''){
            this.list[this.check].checked=true
          }
        }
        //   上拉
//        if(this.moveStartY - this.moveEndY>40){
//          this.mode='W'
//          $('#d2').css('height',this.minHeight)
//          this.createdWeek(this.now_year,this.now_month)
//          if(this.check!=''){
//            this.list[this.check].checked=true
//          }
//          this.oneMonthList=this.list
//          if(this.check<=6){
//            this.week=1
//          }else if(this.check>6&&this.check<=13){
//            this.week=2
//          }else if(this.check>6&&this.check<=20){
//            this.week=3
//          }else if(this.check>6&&this.check<=27){
//            this.week=4
//          }else if(this.check>6&&this.check<=34){
//            this.week=5
//          }else if(this.check>6&&this.check<=41){
//            this.week=6
//          }
//          this.list=this.oneMonthList.slice(this.week*7-7,(this.week*7-7)+7)
//        }


        //下个月
        if(this.moveStartX-this.moveEndX>60 && this.mode=='M'){
          $("#d2").css('opacity',0)
          this.check=''
          //   月份为12月
          this.chooseMonth('next')
          this.AddClass('rightmove')
          this.createCalendar(this.now_year,this.now_month)
          this.getData()
          //          上个月
        }else if(this.moveEndX-this.moveStartX>60 && this.mode=='M'){
          $("#d2").css('opacity',0)
          this.check=''
          this.AddClass('leftmove')

          //          月份为1月
          this.chooseMonth('pre')

          this.createCalendar(this.now_year,this.now_month)
          this.getData()

        }


//        周显示 （下一周）
        if(this.moveStartX-this.moveEndX>60 && this.mode=='W'){
          for(let i of this.oneMonthList){
            i.checked=false
          }
          this.check=''
          if(this.week<5){
            this.week++;
            this.list=this.oneMonthList.slice(this.week*7-7,(this.week*7-7)+7)
          }else if(this.week==5){
//            第六周里有下个月的1号或最后一个数这个月的最大日期
            for(let u=0;u<7;u++){
              if(this.oneMonthList.slice(28,35)[u].num==1||this.oneMonthList.slice(28,35)[6].num==[31,28+this.is_leap(this.now_year),31,30,31,30,31,31,30,31,30,31][this.now_month-1]){
                this.week=1
                this.chooseMonth('next')
                this.createdWeek(this.now_year,this.now_month)
                this.oneMonthList=this.list
                this.list=this.oneMonthList.slice(this.week*7-7,(this.week*7-7)+7)
                break;
              }
            }
          }else if(this.week==6){
            this.week=1
            this.chooseMonth('next')
            this.createdWeek(this.now_year,this.now_month,1)
            this.oneMonthList=this.list
            this.list=this.oneMonthList.slice(this.week*7-7,(this.week*7-7)+7)
          }
          //   月份为12月
          this.AddClass('rightmove')


          // 上一周
        }else if(this.moveEndX-this.moveStartX>60 && this.mode=='W'){
          for(let i of this.oneMonthList){
            i.checked=false
          }
          this.check=''
          this.AddClass('leftmove')
          //          月份为1月
          if(this.week>1){
            this.week--;
          }else if(this.week==1){
            this.week=6
            this.chooseMonth('pre')
            this.createdWeek(this.now_year,this.now_month)
            this.oneMonthList=this.list
            //   第六周里没有这个月的最大日期
            for(let u=0;u<7;u++) {
              if (this.oneMonthList.slice(35,42)[u].num != [31, 28 + this.is_leap(this.now_year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.now_month - 1]) {
                this.week = 5
                this.list = this.oneMonthList.slice(this.week * 7 - 7, (this.week * 7 - 7) + 7)
              }
            }
          }
          this.list=this.oneMonthList.slice(this.week*7-7,(this.week*7-7)+7)
        }
      },
      createdWeek(y,m){
        this.createCalendar(y,m)
      },
//      月份判断
      chooseMonth(time){
        if(time=='next'){
          if(this.now_month==12){
            this.now_month=1
            this.now_year=this.now_year+1
          }else{
            this.now_month=this.now_month+1
          }
        }else if(time=='pre'){
          if(this.now_month==1){
            this.now_month=12
            this.now_year=this.now_year-1
          }else{
            this.now_month=this.now_month-1
          }
        }
      },
//      添加类
      AddClass(classname){
        $("#d2").removeClass('leftmove')
        $("#d2").removeClass('rightmove')
        setTimeout(function () {
          $("#d2").addClass(classname)
        },50)
      },
//      点击‘今’
      moveToday(){
        let today=new Date()
        this.now_year=today.getFullYear() //年份
        this.now_month=today.getMonth()+1 //月份
        this.now_day=today.getDate()  //日期
        this.createCalendar(this.now_year,this.now_month)
      },
//      选择时间
      chooseTime(){
        this.showPopup=true
      },
//      确定时间
      sure(){
        this.showPopup=false
        let time=this.selectTime.split('-')
        this.now_year=time[0]
        this.now_month=parseInt(time[1])
        this.now_day=parseInt(time[2])
        if(this.mode=='M'){
          this.createCalendar(this.now_year,this.now_month)
          for( let s of this.oneMonthList){
            if(s.isNowMonth){
              if(s.num==this.now_day){
                s.checked=true
                this.check= s.id-1
              }
            }
          }
        }else if(this.mode=='W'){
          this.createCalendar(this.now_year,this.now_month)
          let day=this.now_day
          let weeks=''
          for(let i=0;i<this.oneMonthList.length;i++){
            this.oneMonthList[i].checked=false
            if(this.oneMonthList[i].isNowMonth){
              if(day==this.oneMonthList[i].num){
                weeks=this.oneMonthList[i].id
              }
            }
          }
          if(weeks<=7){
            this.week=1
          }else if(weeks>7&&weeks<=14){
            this.week=2
          }else if(weeks>14&&weeks<=21){
            this.week=3
          }else if(weeks>21&&weeks<=28){
            this.week=4
          }else if(weeks>28&&weeks<=35){
            this.week=5
          }else if(weeks>35&&weeks<=42){
            this.week=6
          }
          this.oneMonthList[weeks-1].checked=true
          this.check=weeks-1
          this.list = this.oneMonthList.slice(this.week * 7 - 7, (this.week * 7 - 7) + 7)
        }
      }
    },
    components:{
      Popup,
      DatetimeView
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .wrap{
    width:100%;
    height:100%;
    background: #FFFFFF;
    position: relative;
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
        top:25px;
        width:14px;
        height:24px;
      }

    }
    .middle{
      width:100%;
      background-image: url("../../../.././static/date/bj.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      height:160px;
      position: absolute;
      .dateItems{
        display: flex;
        padding: 60px 28px 0 32px;
        box-sizing: border-box;
        justify-content: space-between;
        font-size: 30px;
        color: #FFFFFF;
      }
      .ImageRl{
        position: absolute;
        right:38px;
        top:10px;
        width:50px;
        height:50px;
      }
    }
    .date{
      width: 100%;
      height: 1.4rem;
      line-height: 1.4rem;
      background: #DA5751;
      color: #fff;
      padding: 0 3%;
      box-sizing: border-box;
    }
    /*.redCircle:after{*/
    /*width: 10px;*/
    /*height: 10px;*/
    /*background-color: red;*/
    /*border-radius: 50%;*/
    /*display: inline-block;*/
    /*content: '';*/
    /*text-align: center;*/
    /*left: 50%;*/
    /*vertical-align: middle;*/
    /*top: 50px;*/
    /*}*/
    .redCircle{
      width: 10px;
      height: 10px;
      background-color: red;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 40%;
      margin-top: 20px;
      margin-left: 5px;
      font-size: 28px;
    }
    .date:after{
      display: block;
      content: '';
      clear: both;
    }
    .left{
      float: left;
      position: relative;
    }
    .triangle-down{
      position: absolute;
      right: -.2rem;
      top: 45px;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-top: 6px solid #fff;
    }
    .right{
      float: right;
    }
    .date span.jin{
      display: block;
      width: 1.2rem;
      height: 1.2rem;
      line-height: 1.2rem;
      border: 2px solid #fff;
      border-radius: 50%;
      text-align: center;
      margin-top: 0.08rem;
    }
    .date span.jin:active{
      border-color:rgba(255,255,255,0.6);
      color: rgba(255,255,255,0.6);
    }
    .yearMonth:active .triangle-down{
      border-top-color: rgba(255,255,255,0.6);
    }
    .content{
      /*background: #b97676;*/
      padding-top: 150px;
    }
    .week ul{
      transition: all 1s ease;
      width: 100%;
      padding-left:0.5rem;
      margin: 0.1rem 0;
      display: flex;
      display: -webkit-flex;
      display: -ms-flexbox;
      flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
    }
    .week li{
      flex: 0;
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 13%;
      text-align: center;
      border: 2px solid transparent;
    }
    .tables {
      font-size: .14rem;
      color: #666;
      font-family: "微软雅黑";
      display: flex;
      display: -webkit-flex;
      display: -ms-flexbox;
    }
    .calendar ul{
      width: 100%;
      padding-left: 0.5rem;
      margin: .1rem 0;
      display: flex;
      display: -webkit-flex;
      display: -ms-flexbox;
      flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
    }
    .calendar ul li{
      flex: 0;
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 13%;
      text-align: center;
      height: 1.1rem;
      border: 2px solid transparent;
      border-radius: 0.05rem;
    }
    #d2{
      transition: height 0.5s ease;
    }
    .black{
      color: #333;
    }
    .gray{
      color: #ccc;
    }
    .daySize{
      font-size: 28px;
    }
    .red{
      background:#3399FF!important;
      color: #ffffff;
    }
    .today{
      background: red;
      color: #fff;
    }
    @keyframes moveRight {
      from{
        transform: translateX(100%);
        opacity: 0;
      }
      to{
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes moveLeft {
      from{
        transform: translateX(-100%);
        opacity: 0;
      }
      to{
        transform: translateX(0);
        opacity: 1;
      }
    }

    .rightmove{
      animation: moveRight 1s both;
      -moz-animation: moveRight 1s both; /* Firefox */
      -webkit-animation: moveRight 1s both;  /* Safari 和 Chrome */
      -o-animation: moveRight 1s both;
    }
    .leftmove{
      animation: moveLeft 1s both;
      -moz-animation: moveLeft 1s both;  /* Firefox */
      -webkit-animation: moveLeft 1s both; /* Safari 和 Chrome */
      -o-animation: moveLeft 1s both;
    }

    .close{
      float: left;
      padding: .1rem;
      color: #828282;
    }
    .sure{
      float: right;
      padding: .1rem;
      color:#FF9900;
    }
    .footerAll{
      width:100%;
      height:calc(100% - 708px);
      overflow: scroll;
      .footer{
        width:100%;
        padding: 26px 30px 0 30px;
        display: flex;
        .dateTime{
          width: 50px;
          display: flex;
          align-items: center;
          line-height: 50px;
          justify-content: center;
          div{
            width:10px;
            height:10px;
            background:#3399FF;
            border-radius: 50%;
          }
          span:nth-of-type(1){
            color: #3399FF;
            font-size: 36px;
            font-family: MicrosoftYaHei;
          }
          span:nth-of-type(2){
            color: #3399FF;
            font-size: 24px;
            font-family: MicrosoftYaHei;
          }
        }
        .dateList{
          flex: 1;
          padding-top: 26px;
          padding-bottom: 26px;
          padding-left: 26px;
          box-sizing: border-box;
          margin-left: 24px;
          background: #F3F3F3;
          .dataListOne{
            display: flex;
            align-items: center;
            div:nth-of-type(1){
              width:10px;
              height:10px;
              border-radius: 50%;
              background:#3399FF ;
              margin-right: 30px;
            }
          }
        }
      }
    }
  }
</style>
