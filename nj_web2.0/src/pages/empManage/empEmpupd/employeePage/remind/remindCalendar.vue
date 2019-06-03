<!--  -->
<template>
  <div class="main">
    <div class="menu">
      <Menu active-name="0" width="auto" @on-select="changeMenu">
        <MenuItem name="0">
        <Icon type="document-text"></Icon>
        负责的任务
        </MenuItem>
        <MenuItem name="1">
        <Icon type="chatbubbles"></Icon>
        参与的任务
        </MenuItem>
      </Menu>
    </div>
    <div class="content">
      <div class="title">
        <div class="left">
          <Button type="ghost" size="small" @click="backTody">今天</Button>
          <Button type="ghost" size="small" icon="chevron-left" @click="lastMonth"></Button>
          <Button type="ghost" size="small" icon="chevron-right" @click="nextMonth"></Button>
          <DatePicker :open="open" :value="value" confirm type="month" @on-change="handleChange" @on-clear="handleClear" @on-ok="handleOk">
            <div class="date_text" @click="handleClick">{{year +'年'+ month + '月'}}</div>
          </DatePicker>
        </div>
        <div class="right">
          <Button type="primary" shape="circle" icon="plus" @click="newTodo">新日程</Button>
        </div>
      </div>
      <div class="calendar">
        <div class="cal_title">
          <strong v-for="(item, index) in fullWeekMap" :key="index">{{item}}</strong>
        </div>
        <div class="cal_body" v-for="(num, i) in dayList" :key="i">
          <div class="day_cell" :class="[ item.type, { 'now_date': item.isToday, 'selected': item.selected }]" v-for="(item, index) in num"
            :key="index" @click="cellClick(i, index)">
            <div class="num">{{item.date}}</div>
            <div class="events" v-for="(item2, index2) in item.events" :key="index2" @click="changeEventP(item2.id)">{{item2.title}}</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="创建日程" width='600px' :visible.sync="updateOrAdd" @close="close">
      <addOrUpdate ref="addOrUpdate" :id="id" :state="state" @closeTodo="closeTodo" @rerender="rerender"></addOrUpdate>
    </el-dialog>
    <el-dialog title="修改日程" width='600px' :visible.sync="changeEvent" @close="close">
      <addOrUpdate ref="addOrUpdate" :id="id" :state="state" @closechang="closechang" @rerender="rerender"></addOrUpdate>
    </el-dialog>
  </div>
</template>

<script>
  import addOrUpdate from './addOrUpdate'
  import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin
  } from '../../../axios/axios'
  import {
    isSuccess,
    deepCopy
  } from '../../../lib/util'

  export default {
    data() {
      return {
        state: '0',
        year: '', // 标题显示的年份
        nowYear: '', // 当前年份
        month: '', // 标题显示的月份d
        nowMonth: '', // 当前月份
        day: '', // 选中的日期
        nowDay: '', // 当前的日期
        dayList: [], // 选中月的天数集合
        fullWeekMap: [],
        fullMonthMap: [],
        open: false,
        value: '',
        selected: [],
        updateOrAdd: false,
        changeEvent: false,
        selectDay: '',
        dayListFake: [],
        id: '',
      }
    },
    components: {
      addOrUpdate,
    },
    created() {
      this.init()
      // this.getData()
    },
    computed: {
      dayList1: function (value) {
        return this.dayList
      },
    },
    methods: {
      // 初始化日历
      init() {
        let date = new Date()
        let nowMonthFirthDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate() // 获取本月第一天
        let nowMonthLastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() // 获取本月最后一天
        this.nowMonth = date.getMonth() + 1
        this.month = date.getMonth() + 1
        if (this.month < 10) {
          this.month = '0' + this.month
        }
        this.nowYear = date.getFullYear()
        this.year = date.getFullYear()
        this.fullWeekMap.push(
          this.$t('date.week.Sun'),
          this.$t('date.week.Mon'),
          this.$t('date.week.Tue'),
          this.$t('date.week.Wed'),
          this.$t('date.week.Thu'),
          this.$t('date.week.Fri'),
          this.$t('date.week.Sat')
        )
        this.render(this.nowYear, this.nowMonth - 1)
      },
      // 渲染日历数据
      render(y, m) {
        let date = new Date()
        let monthFirthDay = new Date(y, m, 1) // 获取第一天
        let monthLastDay = new Date(y, m + 1, 0) // 获取本月最后一天
        let lastMonthDay = new Date(y, m, 0) // 获取上月最后一天
        let days = monthLastDay.getDate() - monthFirthDay.getDate() + 1
        let k = 1
        let lk = lastMonthDay.getDate()
        let type = 'nowMonth'
        this.dayList = []
        this.dayList.push([], [], [], [], [], [])
        for (let i = 0; i < 6; i++) {
          if (i === 0) {
            if (monthFirthDay.getDay() !== 0) {
              let j = 6 - monthFirthDay.getDay()
              let h = 6 - j
              for (let n = h - 1; n >= 0; n--) {
                let isToday = false
                if (lk === date.getDate() && this.year === date.getFullYear() && parseInt(this.month) === date.getMonth() +
                  1) {
                  isToday = true
                } else {
                  isToday = false
                }
                this.dayList[i][n] = {
                  date: lk,
                  month: m - 1,
                  type: 'lastMonth',
                  isToday: isToday,
                  events: [],
                }
                lk = lk - 1
              }
              for (let n = 0; n < j + 1; n++) {
                let isToday = false
                if (k === date.getDate() && this.year === date.getFullYear() && parseInt(this.month) === date.getMonth() +
                  1) {
                  isToday = true
                } else {
                  isToday = false
                }
                this.dayList[i][monthFirthDay.getDay() + n] = {
                  date: k,
                  month: m,
                  type: 'nowMonth',
                  isToday: isToday,
                  events: [],
                }
                k = k + 1
              }
            } else {
              for (let n = 6; n >= 0; n--) {
                let isToday = false
                if (k === date.getDate() && this.year === date.getFullYear() && parseInt(this.month) === date.getMonth() +
                  1) {
                  isToday = true
                } else {
                  isToday = false
                }
                this.dayList[i][n] = {
                  date: lk,
                  month: m - 1,
                  type: 'lastMonth',
                  isToday: isToday,
                  events: [],
                }
                lk = lk - 1
              }
            }
          } else {
            for (let n = 0; n < 7; n++) {
              let isToday = false
              let mon = m + 1
              if (k > monthLastDay.getDate()) {
                k = 1
                type = 'nextMonth'
              }
              if (type !== 'nextMonth') {
                mon = m
                if (k === date.getDate() && this.year === date.getFullYear() && parseInt(this.month) === date.getMonth() +
                  1) {
                  isToday = true
                } else {
                  isToday = false
                }
              }
              this.dayList[i][n] = {
                date: k,
                type: type,
                month: mon,
                isToday: isToday,
                events: [],
              }
              k = k + 1
            }
          }
        }
        this.dayListFake = deepCopy(this.dayList)
        let _firstMonth = this.dayList[0][0].month + 1
        let _lastMonth = this.dayList[5][6].month + 1
        let startTime = this.year + '-' + _firstMonth + '-' + this.dayList[0][0].date
        let endTime = this.year + '-' + _lastMonth + '-' + this.dayList[5][6].date
        this.getData(startTime, endTime)
      },
      rerender() {
        let _firstMonth = this.dayList[0][0].month + 1
        let _lastMonth = this.dayList[5][6].month + 1
        let startTime = this.year + '-' + _firstMonth + '-' + this.dayList[0][0].date
        let endTime = this.year + '-' + _lastMonth + '-' + this.dayList[5][6].date
        this.getData(startTime, endTime)
      },
      changeMenu(name) {
        this.state = name
        this.rerender()
      },
      nextMonth() {
        let date = new Date(this.year, this.month - 1, 1)
        date.setMonth(date.getMonth() + 1)
        this.year = date.getFullYear()
        this.month = date.getMonth() + 1
        if (this.month < 10) {
          this.month = '0' + this.month
        }
        this.render(this.year, this.month - 1)
      },
      lastMonth() {
        let date = new Date(this.year, this.month - 1, 1)
        date.setMonth(date.getMonth() - 1)
        this.year = date.getFullYear()
        this.month = date.getMonth() + 1
        if (this.month < 10) {
          this.month = '0' + this.month
        }
        this.render(this.year, this.month - 1)
      },
      backTody() {
        this.year = this.nowYear
        this.month = this.nowMonth
        if (this.month < 10) {
          this.month = '0' + this.month
        }
        this.render(this.nowYear, this.nowMonth - 1)
      },
      getEvents(n, m, title, en, em) {
        this.dayList = []
        for (let i = n; i < en; i++) {
          for (let j = m; j < em; j++) {
            this.dayListFake[i][j].events.push({
              title: title,
            })
          }
        }
        this.dayList = this.dayListFake
      },
      getData(startTime, endTime) {
        let t = this
        getDataLevelUserLogin({
          _mt: 'cmutRemind.getdataByList',
          logType: this.$t('button.ser'),
          data: JSON.stringify({
            remindPlat: '6essmss',
            remindStatime: startTime,
            remindStoptime: endTime,
            remindMasterSlave: t.state,
            remindMemid: t.$store.state.user.sysUsempid,
          }),
        }).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].value === undefined) {
              t.dayList = []
              let arr = res.data.content[0].value
              for (let a = 0; a < 6; a++) {
                for (let b = 0; b < 7; b++) {
                  t.dayListFake[a][b].events = []
                }
              }
              t.dayList = t.dayListFake
              return
            }
            t.dayList = []
            let arr = res.data.content[0].value
            for (let a = 0; a < 6; a++) {
              for (let b = 0; b < 7; b++) {
                t.dayListFake[a][b].events = []
                for (let i = 0; i < arr.length; i++) {
                  let startTime = new Date(arr[i].remindStatime)
                  let endTime = new Date(arr[i].remindStoptime)
                  let shouldStday = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())
                  let shouldEnday = new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate())
                  let cellDay = new Date(t.year, t.dayListFake[a][b].month, t.dayListFake[a][b].date)
                  if (cellDay >= shouldStday && cellDay <= shouldEnday) {
                    t.dayListFake[a][b].events.push({
                      title: arr[i].remindTitle,
                      id: arr[i].id,
                    })
                  }
                }
              }
            }
            t.dayList = t.dayListFake
          }
        }).catch((res) => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: res,
          })
        })
      },
      cellClick(row, column) {
        // 不知道为啥正常方法刷新不了
        let aa = deepCopy(this.dayList)
        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < 7; j++) {
            aa[i][j].selected = false
          }
        }
        aa[row][column].selected = true
        this.selected.push(aa[row][column])
        this.dayList = []
        this.dayList = deepCopy(aa)
        this.selectDay = aa[row][column]
      },
      handleClick() {
        this.open = !this.open
      },
      handleChange(date) {
        this.value = date
      },
      handleClear() {
        this.open = false
      },
      handleOk() {
        this.year = this.value.split('-')[0]
        this.month = this.value.split('-')[1]
        this.render(this.year, this.month - 1)
        this.open = false
      },
      newTodo() {
        this.updateOrAdd = true
        setTimeout(() => {
          this.$refs.addOrUpdate.getInfoById('')
        }, 100);
      },
      changeEventP(id) {
        this.changeEvent = true
        setTimeout(() => {
          this.$refs.addOrUpdate.getInfoById(id)
        }, 100);
      },
      closeTodo() {
        this.updateOrAdd = false
      },
      closechang() {
        this.changeEvent = false
      },
      close() {
        this.$refs.addOrUpdate.reset()
      },
    },
  }

</script>
<style scoped lang="scss">
  .main {
    margin-top: 46px;
    display: flex;
    position: relative;
    .menu {
      padding-top: 30px;
      width: 200px;
      height: 100%;
      background: #fff;
      box-shadow: 2px 0 2px #dddddd;
      z-index: 1;
    }
    .content {
      position: absolute;
      left: 200px;
      right: 0;
      top: 0;
      bottom: 0; // background-color: aqua;
      .title {
        display: flex;
        height: 46px;
        background-color: #fff;
        padding: 7px 20px;
        justify-content: space-between;
        .left {
          height: 32px;
          line-height: 32px;
          width: 200px;
          align-items: center;
          justify-content: space-around;
          display: flex;
          .date_text {
            cursor: pointer;
            font-size: 14px;
            margin-left: 20px;
            transition: all .3s;
          }
          .date_text:hover {
            color: #2d8cf0;
          }
        }
      }
      .calendar {
        position: absolute; // padding: 10px 20px;
        top: 56px;
        left: 20px;
        right: 10px;
        bottom: 0;
        box-shadow: 0 0 6px #dddddd;
        overflow-y: scroll;
        .cal_title {
          display: flex;
          height: 36px;
          line-height: 36px;
          background-color: #fff; // border-top:1px solid #e0e0e0;
          border-bottom: 1px solid #e0e0e0; // border-left:1px solid #e0e0e0;
          strong {
            flex: 1;
            text-align: center; // border-right:1px solid #e0e0e0;
          }
        }
        .cal_body {
          display: flex;
          background-color: #fff;
          border-bottom: 1px solid #e0e0e0;
          .day_cell {
            flex: 1;
            height: 130px;
            border-right: 1px solid #e0e0e0;
            background-color: #fff;
            transition: all .3s;
            padding: 1px 3px;
            .num {
              text-align: right;
            }
            .events {
              color: #444444;
              font-weight: bold;
              padding: 0 4px;
              cursor: pointer;
              margin-top: 4px;
              transition: all .3s;
              background-color: rgba(64, 142, 243, 0.432);
              border-radius: 2px;
            }
            .events:hover {
              background-color: rgba(64, 171, 243, 0.664);
            }
          } // .day_cell:hover{
          //   background-color: #aadfbc71;
          // }
          .now_date {
            background-color: rgba(230, 84, 84, 0.2);
          }
          .selected {
            background-color: rgba(84, 159, 230, 0.2);
            ;
          }
          .nextMonth,
          .lastMonth {
            color: #999999; // background-color: #efefef;
          }
        }
      }
    }
  }

</style>
