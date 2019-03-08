<!--是否重复页面-->
<template>
  <div class="countTime">
    <div class="countAll">
      <nav>
        <div style="font-weight: bold">
          {{dayTest}}重复
        </div>
        <div class="select">
          <div>
            <img src="../../../../.././static/action/01.png" alt="" @click="selectAll">
          </div>
          <!--<div>-->
            <!--<mu-switch style="margin-left: 16px" v-model="docked"></mu-switch>-->
          <!--</div>-->
          <!--  弹出框   每周 每天 每年  每月-->
          <div class="selectList" v-if="selectShow">
            <div  v-for="(item,index) in selectList[0]['paramList']" @click="selectHide(index)">{{item.paramInfoName}}</div>
          </div>
        </div>
      </nav>

      <section>
        <div class="everyDay">
            每 <input type="text" v-model="day"> {{dayTitle}}
        </div>
        <div class="weekDay" v-if="weekShow">
            <div v-for="(item,index) in weekDay" :class="{weekColor : item.value == '1'}"  @click="selectWeek(index,$event)">
              {{item.title}}
            </div>
        </div>
        <div class="selectDate">
          <span style="font-weight: bold" @click="selectListDayShow">{{dayCount}}<img src="../../../../.././static/action/01.png" alt=""></span>
          <span v-if="everyDay"><input type="text" v-model="dateNum">次</span>
          <span v-if="everyDayOne" @click="goDateYaar">{{dateLineTime}}</span>
          <!--  弹出框    直至某个日期-->
          <div class="selectListOne" v-if="selectShowOne">
            <div  v-for="(item,index) in selectListDay" @click="selectListDayHide(index)">{{item.title}}</div>
          </div>
        </div>
      </section>
      <footer>
            <span @click="removeDate">取消</span>
            <span @click="sureDate">确定</span>
      </footer>
    </div>
    <dateYear v-show="dateYear"></dateYear>
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
  </div>
</template>
<script>
  import dateYear from './dateYear.vue'
  import Bus from '@/lib/bus'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  import { DatetimePicker } from 'mint-ui'
  import moment from 'moment'// 格式化时间
  export default {
    name: 'repeatCount',
    data() {
      return {
        startDate: new Date(),
        docked:false,
        show:false,
        selectShow:false,
        selectShowOne:false,
        dayTest:'每天',
        dayCount:'',
        dayTitle:'天',
        input:'',
        everyDay:true,
        everyDayOne:false,
        dateYear:false,
        dateLine:'',
        dateLineTime:'',
        day:1,
        weekShow:false,
        dateNum:1,
        selectList:'',
        date_List:{
          remindRepeatstoptype:'enddatefrequency',// 结束日期类型 直到某个日期
          remindRepeattype:'repeateveryday', /// 每周每天每月
          remindRepeatnum:'', //每几天  每几次
          remindRepeatcount:'',
          remindRepeatstop:'',//结束日期
          remindRepeatweek:[], //week
        },
        weekdayNum:'',
        selectListDay:[

          {
            title:'重复一定次数',
            type:'enddatefrequency'
          },
          {
            title:'直至某个日期',
            type:'enddatedate',
          },
        ],
        weekDay:[
          {
            title:'周一',
            num:1
          },
          {
            title:'周二',
            num:2
          },
          {
            title:'周三',
            num:3
          },
          {
            title:'周四',
            num:4
          },
          {
            title:'周五',
            num:5
          },
          {
            title:'周六',
            num:6
          },
          {
            title:'周日',
            num:7
          },

        ],
        repectList:{}
      }
    },
    components:{
      dateYear
    },
    created() {
      var myDate = new Date();
      this.dateLine = myDate.getFullYear() + '-' +  (myDate.getMonth() + 1) + '-' + myDate.getDate()
      this.dateLineTime = myDate.getFullYear() + '-' +  (myDate.getMonth() + 1) + '-' + myDate.getDate()

    },
//    props:{
//      repectList:Object
//    },
    mounted(){
      this.getData();
      Bus.$on('dateDel', ()=>{
        this.dateYear = false

      })
      Bus.$on('dateCom', (res)=>{
        this.dateYear = false
//        console.log(res)
        this.date_List.remindRepeatstop = res
        this.dateLineTime = res
      })
      Bus.$on('repect', (res) => {
        this.repectList = res
        console.log(res)
        if (this.repectList.hasOwnProperty('remindRepeatcount')) {
          if (this.repectList.remindRepeattype == 'repeateveryday') {
            this.dayTitle = '天'
            this.dayTest = '每天'
          } else if (this.repectList.remindRepeattype == 'repeatweekly') {
            this.dayTitle = '周'
            this.dayTest = '每周'
          } else {
            this.dayTitle = '月'
            this.dayTest = '每月'
          }
          this.day = this.repectList.remindRepeatnum
          if (this.repectList.remindRepeatcount != '') {
            this.dayCount = '重复一定次数'
            this.dateNum = this.repectList.remindRepeatcount
            this.everyDayOne = false
            this.everyDay = true
          }
          if (this.repectList.remindRepeatstop != '') {
            this.dayCount = '直至某个日期'
            this.dateLineTime = this.repectList.remindRepeatstop
            this.everyDay = false
            this.everyDayOne = true
          }
          if (this.repectList.remindRepeatweek != '') {
            this.weekShow = true
//            this.date_List.remindRepeatweek = this.repectList.remindRepeatweek.split(',')
//            for (let i = 0; i < this.weekDay.length; i++) {
//              for (let j = 0; j < this.repectList.remindRepeatweek.length; j++) {
//                if (this.weekDay[i].num == this.repectList.remindRepeatweek[j]) {
////                  this.date_List.remindRepeatweek.push(this.repectList.remindRepeatweek[j])
//                  this.weekDay[i].value = '1'
//                }
//              }
//            }
            console.log(this.date_List.remindRepeatweek, '11111')
          }
        } else {
          this.dayCount = '重复一定次数'
        }
      })
    },
    methods:{
      handleConfirm (data) {
        let date = moment(data).format('YYYY-MM-DD')
        this.date_List.remindRepeatstop = date
        this.dateLineTime = date
//        alert(date)
      },
      getData(){
        const t = this
        const data = {
          _mt:'weiXinRemind.getSelectValue',
          funId:'1',
          logType:'每次查询',
          typeCode:'repeattype'
        }
        getDataLevelUserLogin(data).then(res => {
          if (isSuccess(res, t)) {
            this.selectList = JSON.parse(res.data.content[0].value)
            console.log(this.selectList[0].paramList)
          }

        }).catch((err) => {
          console.log(err)
        })
      },
      selectAll(){
        this.selectShow = true
      },
      selectHide(index,e) {
        this.selectShow = false
        this.dayTest = this.selectList[0].paramList[index].paramInfoName
        this.date_List.remindRepeattype = this.selectList[0].paramList[index].paramCode
        switch(this.dayTest){
          case '每天':
            this.dayTitle = '天'
            this.weekShow = false
            break;
          case '每周':
            this.dayTitle = '周'
            this.weekShow = true
            break;
          case '每月':
            this.dayTitle = '月'
            this.weekShow = false
            break;
        }

      },
      selectListDayShow() {
        this.selectShowOne = true
      },
      selectListDayHide(index){
          this.dayCount = this.selectListDay[index].title
          this.date_List.remindRepeatstoptype = this.selectListDay[index].type
          this.selectShowOne = false
          if(this.dayCount == '重复一定次数') {
            this.date_List.remindRepeatstop = ''
            this.everyDay = true
            this.date_List.remindRepeatcount = this.dateNum;
            this.dateLineTime = ''
          } else {
            this.everyDay = false
            var myDate = new Date();
            this.dateLineTime = myDate.getFullYear() + '-' +  (myDate.getMonth() + 1) + '-' + myDate.getDate()
          }
        if(this.dayCount == '直至某个日期') {
            console.log(this.dateLineTime)
          this.date_List.dateNum = ''
          this.date_List.remindRepeatstop = this.dateLineTime
          this.dateNum = ''
          this.everyDayOne = true
          this.everyDay = false
        } else {
          this.everyDayOne = false
          this.dateNum = 1
        }
      },
      selectWeek(index, e) {
        // const selectArr = [];
        console.log(index,e,"index e");
        if (e.target.className.indexOf('weekColor') < 0) {
          e.target.className = 'weekColor';
          if (this.date_List.remindRepeatweek.indexOf(index) == -1) {
            this.date_List.remindRepeatweek.push(index);
          }
        } else {
          e.target.className = '';
          this.date_List.remindRepeatweek.splice(this.date_List.remindRepeatweek.indexOf(index),1);
        }
        console.log(this.date_List.remindRepeatweek,"remindRepeatweek");
      },
      goDateYaar() {
        this.$refs.picker.open();
      },
      removeDate() {
        Bus.$emit('removeDate')
      },
      sureDate() {
//        this.dayCount = '重复一定次数',
//        this.everyDay = false // 默认重复一定次数
//        this.everyDayOne = false // 默认重复一定次数
        this.date_List.remindRepeatnum  = this.day
        this.date_List.remindRepeatstoptype  = 'enddatefrequency'
        this.date_List.remindRepeatcount = this.dateNum;
//        this.date_List.remindRepeatstop = ''
        console.log(this.date_List)
        Bus.$emit('sureDate',this.date_List)
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .countTime{
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.9);
    position: absolute;
    top:0;
    left:0;
    .countAll{
      position: absolute;
      width: 600px;
      background: white;
      /*height:550px;*/
      left: 50%;
      top:50%;
      margin-left: -300px;
      margin-top: -225px;
      border-radius: 15px;
      nav{
        display: flex;
        border-radius: 15px;
        justify-content: space-between;
        padding: 20px 30px;
        box-sizing: border-box;
        background: #eff3f6;
        .select{
          display: flex;
          align-items: center;
          position: relative;
          .selectList{
            position: absolute;
            right: 0;
            top:0px;
            width:200px;
            height:250px;
            background: white;
            z-index: 200;
            /*box-shadow: 1px;*/

            box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
            div{
              box-sizing: border-box;
              margin-bottom: 10px;
              padding-top: 20px;
              padding-left: 30px;
            }
            div:hover{
              background: #888888;
            }
          }
        }
      }
      section{
        width: 100%;
        .everyDay{
          padding: 30px 0 0 30px;
          box-sizing: border-box;
          input{
            width:40px;
            height:30px;
            outline: none;
            border-top: 0;
            border-left: 0;
            border-right: 0;
            border-bottom-color: #3399FF;
          }
        }
        .weekDay{
          padding: 30px 0 0 30px;
          box-sizing: border-box;
          display: flex;
          width:100%;
          flex-wrap: wrap;
          .weekColor{
            color: #3399FF;
            border: 2px solid #3399FF;
          }
          div{
            width:80px;
            height:80px;
            line-height: 80px;
            border-radius: 50%;
            text-align: center;
            border: 2px solid #666666;
            color: #666666;
            margin-right: 60px;
            margin-bottom: 20px;
          }
        }
        .selectDate{
          padding: 30px 0 0 30px;
          box-sizing: border-box;
          margin-top: 40px;
          position: relative;
          input{
            width:40px;
            height:30px;
            outline: none;
            border-top: 0;
            border-left: 0;
            border-right: 0;
            border-bottom-color: #3399FF;
          }
        }
        .selectListOne{
          position: absolute;
          left: 0;
          top:30px;
          width:200px;
          height:150px;
          background: white;
          /*box-shadow: 1px;*/
          box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
          div{
            box-sizing: border-box;
            margin-bottom: 10px;
            padding-top: 20px;
            padding-left: 30px;
          }
          div:hover{
            background: #888888;
          }
        }
      }
      footer{
        margin-top: 150px;
        width:100%;
        text-align: right;
        padding-right: 30px;
        box-sizing: border-box;
        padding-bottom: 30px;
        font-size: 28px;
        color: #3399FF;
        span:nth-of-type(1){
          margin-right: 100px;

        }
      }
    }
  }
</style>
