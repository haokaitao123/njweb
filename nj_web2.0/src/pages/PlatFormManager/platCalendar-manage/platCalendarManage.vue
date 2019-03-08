<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title" style="height: 33px;line-height: 33px;">
          <Icon type="mouse"></Icon>&nbsp;{{$t('lang_platform.platCalendar.title1')}}
          <Button class="lbtn" v-bind:class="{checked: ischecked2}" @click="TransformationMode($event,2)"><Icon type="calendar"></Icon>{{$t('lang_platform.platCalendar.calendartitle')}}</Button>
          <Button class="lbtn" v-bind:class="{checked: ischecked1}" @click="TransformationMode($event,1)"><Icon type="clipboard"></Icon>{{$t('lang_platform.platCalendar.clipboardtitle')}}</Button>
        </p>
        <!-- table表格 日历-->
        <div v-show="calendarModel1">
          <Row>
            <Select v-model="year" v style="width: 200px">
              <Option :value="item" v-for="(item,index) in selectYearType" :key="index">{{item}}</Option>
            </Select>
            <Select v-model="month" style="width: 200px;">
              <Option value="01">01</Option>
              <Option value="02">02</Option>
              <Option value="03">03</Option>
              <Option value="04">04</Option>
              <Option value="05">05</Option>
              <Option value="06">06</Option>
              <Option value="07">07</Option>
              <Option value="08">08</Option>
              <Option value="09">09</Option>
              <Option value="10">10</Option>
              <Option value="11">11</Option>
              <Option value="12">12</Option>
            </Select>
            <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
            <Button type="primary" @click="openIn($t('button.ini'))">{{$t('button.ini')}}</Button>
            <!-- <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button> -->
          </Row>
          <row class="table-form" ref="table-form">
            <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" size="small" border ref="selection" :columns="columns" :data="data" :height="tableheight"></Table>
          </row>
          <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
        </div>

        <!-- 日历 -->
        <div v-show="calendarModel2" class="calendar_table">
          <Row>
            <Button type="primary" @click="getCaldearData(1)">{{$t('lang_platform.platCalendar.lastM')}}</Button>
            <Select v-model="year" style="width: 150px" @on-change="getCaldearData()">
              <Option :value="item" v-for="(item,index) in selectYearType" :key="index">{{item}}</Option>
            </Select>
            <Select v-model="month" style="width: 150px" @on-change="getCaldearData()">
              <Option value="01">01</Option>
              <Option value="02">02</Option>
              <Option value="03">03</Option>
              <Option value="04">04</Option>
              <Option value="05">05</Option>
              <Option value="06">06</Option>
              <Option value="07">07</Option>
              <Option value="08">08</Option>
              <Option value="09">09</Option>
              <Option value="10">10</Option>
              <Option value="11">11</Option>
              <Option value="12">12</Option>
            </Select>
            <Button type="primary" @click="getCaldearData(2)">{{$t('lang_platform.platCalendar.nextM')}}</Button>
            <Button type="warning" @click="openIn($t('button.ini'))">{{$t('button.ini')}}</Button>
          </Row>
          <Row style="min-width: 1200px;">
            <Col span="20">
              <Row class="table_header_box">
                <Col span='3' class="table_header">{{$t('lang_platform.platCalendar.sun')}}</Col>
                <Col span='3' class="table_header">{{$t('lang_platform.platCalendar.mon')}}</Col>
                <Col span='3' class="table_header">{{$t('lang_platform.platCalendar.tues')}}</Col>
                <Col span='3' class="table_header">{{$t('lang_platform.platCalendar.wed')}}</Col>
                <Col span='3' class="table_header">{{$t('lang_platform.platCalendar.thurs')}}</Col>
                <Col span='3' class="table_header">{{$t('lang_platform.platCalendar.fri')}}</Col>
                <Col span='3' class="table_header">{{$t('lang_platform.platCalendar.sat')}}</Col>
              </Row>
              <Row class="table_body_box">
                  <Col span="3" class="table_body" v-for="(days,index1) in calendar_data" :key="index1">
                    <!-- 工作日样式 -->
                    <div v-if="days.calendarComptype === '01workday' || days.calendarLegaltype === '01workday'" class="conbox area bgWhite">
                      <div class="day">{{days.calendarDate}}</div>
                      <!-- 法定 -->
                      <p  class="LegalDay" :class="{Legalholiday: days.calendarLegaltype === '03holiday', Legalrest: days.calendarLegaltype === '02weekend'}">
                        <img src="../../../../static/img/law1.png" class="lawicon" v-if="days.calendarLegaltype === '02weekend'
                                                                                      || days.calendarLegaltype === '03holiday'">
                        <img src="../../../../static/img/law2.png" class="lawicon" v-else="days.calendarLegaltype === '02weekend'
                                                                                      || days.calendarLegaltype === '03holiday'">
                        {{days.calendarLegaltypeName}}&nbsp;<span v-if="days.calendarDesc">（{{days.calendarDesc}}）</span>
                      </p>
                      <!-- 公司定 -->
                      <p :class="{comrest: days.calendarComptype === '02weekend', comholiday: days.calendarComptype === '03holiday'}">
                        <Icon type="podium" size="16" class="lawicon"></Icon>{{days.calendarComptypeName}}
                      </p>
                      <span class="edit" v-if="days.calendarDate" @click="openUp(days.id, $t('button.upd'), index1)">{{$t('button.edi')}}</span>
                    </div>
                    <!-- 休息日、节假日样式 -->
                    <div v-else-if="days.calendarComptype === '02weekend'
                                 || days.calendarComptype === '03holiday'
                                 || days.calendarLegaltype === '02weekend'
                                 || days.calendarLegaltype === '03holiday'"
                                  class="conbox area bgWhite">
                      <div class="day">{{days.calendarDate}}</div>
                      <!-- 法定 -->
                      <p  class="LegalDay" :class="{Legalholiday: days.calendarLegaltype === '03holiday', Legalrest: days.calendarLegaltype === '02weekend'}">
                        <img src="../../../../static/img/law1.png" class="lawicon" v-if="days.calendarLegaltype === '02weekend'
                                                                                      || days.calendarLegaltype === '03holiday'">
                        <img src="../../../../static/img/law2.png" class="lawicon" v-else="days.calendarLegaltype === '02weekend'
                                                                                      || days.calendarLegaltype === '03holiday'">
                        {{days.calendarLegaltypeName}}&nbsp;<span v-if="days.calendarDesc">（{{days.calendarDesc}}）</span>
                      </p>
                      <!-- 公司定 -->
                      <p :class="{comrest: days.calendarComptype === '02weekend', comholiday: days.calendarComptype === '03holiday'}">
                        <Icon type="podium" size="16" class="lawicon"></Icon>{{days.calendarComptypeName}}
                      </p>
                      <span class="edit" v-if="days.calendarDate" @click="openUp(days.id, $t('button.upd'), index1)">{{$t('button.edi')}}</span>
                    </div>

                    <!-- 没有日期的样式 -->
                    <div v-else="days.calendarComptypeName" class="conbox area"></div>
                  </Col>
              </Row>
            </Col>
            <Col span="2" class="tableNote">
              <Row class="noteTitle">
                <Col span="24" offset="0"><img src="../../../../static/img/law2.png" class="lawicon">{{$t('lang_platform.platCalendar.legHoliday')}}</Col>
              </Row>
              <Row class="noteTitle" style="margin-bottom:20px;">
                <Col span="24"><Icon type="podium" color="#5c6b77" size="18" class="lawicon"></Icon>{{$t('lang_platform.platCalendar.comHoliday')}}</Col>
              </Row>
              <Row class="colorOne">
                <Col span="18" class="colorOnel"></Col>
                <Col span="6" class="colorOner">{{$t('lang_platform.platCalendar.legHoliday')}}</Col>
              </Row>
              <Row class="colorFour">
                <Col span="18" class="colorFourl"></Col>
                <Col span="6" class="colorFourr">{{$t('lang_platform.platCalendar.legRestDay')}}</Col>
              </Row>
              <Row class="colorThree">
                <Col span="18" class="colorThreel"></Col>
                <Col span="6" class="colorThreer">{{$t('lang_platform.platCalendar.comHoliday')}}</Col>
              </Row>
              <Row class="colorTwo">
                <Col span="18" class="colorTwol"></Col>
                <Col span="6" class="colorTwor">{{$t('lang_platform.platCalendar.comRestDay')}}</Col>
              </Row>
            </Col>
          </Row>
        </div>
        <!-- 日历 结束 -->
      </card>
      </Col>

    </Row>

    <!-- 进行修改操作弹出的页面 start -->
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <!-- 进行修改操作弹出的页面 end -->

    <!-- 初始化时间页面 start-->
    <transition name="fade">
      <init v-show="openInit" :id="updateId" :logType="logType"  @closeUp="closeInit" ref="init"></init>
    </transition>
    <!-- 初始化时间页面 end-->
  </div>
</template>
<script>
  import update from './addNewPlatCalendar'
  import init from './initPlatCalendar'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 290,
        value: '',
        logType: '',
        openUpdate: false,
        openInit: false,
        updateId: NaN,
        selectYearType: [],
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },

          {
            title: this.$t('lang_platform.platCalendar.calendarDate'),
            key: 'calendarDate',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.platCalendar.calendarLegaltypeName'),
            key: 'calendarLegaltypeName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.platCalendar.calendarComptypeName'),
            key: 'calendarComptypeName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.platCalendar.calendarDesc'),
            key: 'calendarDesc',
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 64,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        calendar_index: 0,
        sort: 'calendarDate',
        order: 'asc',
        rows: 10,
        page: 1,
        funId: '1000',
        year: '',
        month: '',
        calendarModel1: true,  //  表格日历
        ischecked1: true,
        ischecked2: false,
        calendarModel2: false,  //  月份日历
        calendar_data: [], // 日历日期数组
        getBlur1: false,
        getBlur2: false,
      }
    },
    computed: {

    },
    components: {
      update,
      init,
    },
    mounted() {
      this.getTime()
      this.getData(1)
      this.getSelect()
      // this.getCaldearData()
    },
    methods: {
      // 获取当前时间
      getTime() {
        const t = this
        let date = new Date()
        t.year = date.format('yyyy')
        t.month = date.format('MM')
        t.getCaldearData()
      },
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'platCalendar.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          calendarDate: t.year + '-' + t.month,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            // console.log(t.data)
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      // 更新日期
      updateArray(res) {
        const t = this
        if (t.calendarModel1 === true) {
          t.data.splice(t.index, 1, res)
        } else if (t.calendarModel2 === true) {
          if (res.calendarDate.length === 10) {
            let dayNum = res.calendarDate
            dayNum = dayNum.slice(8)
            let newDayNum = parseInt(dayNum, 10)
            res.calendarDate = newDayNum
          }
          t.calendar_data.splice(t.calendar_index, 1, res)
        }
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
          this.getSelect()
        } else {
          this.order = 'desc'
        }
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData()
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platCalendar.getList',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectYearType = res.data.content[0].value
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
      },
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
        	t.$Modal.confirm({
        		title: this.$t('reminder.remind'),
        		content: this.$t('reminder.confirmdelete'),
        		onOk: () => {
        			 getDataLevelUserLogin({
          _mt: 'platCalendar.delByIds',
          funId: '1',
          logType: this.$t('button.del'),
          ids: t.tableselected.toString(),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.tableselected = []
            t.getData()
            t.getSelect()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
        		},
        		onCancel: () => {},
        	})
        }
      },
      open() {
        const t = this
        t.opendialog = true
      },
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        t.calendar_index = index
        if (logType === this.$t('button.upd')) {
          t.$refs.update.getData(id)
        }
      },
      openIn(logType) {
        const t = this
        t.logType = logType
        t.openInit = true
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
      closeInit() {
        const t = this
        t.openInit = false
        t.$refs.init.formValidate.sYear = ''
        t.$refs.init.formValidate.eYear = ''
        t.getData()
        t.getSelect()
      },
      // 工作日历管理 样式转换  start
      TransformationMode(event, num) {
        const t = this
        if (num === 1) {
          t.ischecked1 = true
          t.ischecked2 = false
          t.calendarModel1 = true
          t.calendarModel2 = false
        } else if (num === 2) {
          t.ischecked2 = true
          t.ischecked1 = false
          t.calendarModel2 = true
          t.calendarModel1 = false
        }
      },
      // 生成日历
      getCaldearData(preNum) {
        const t = this
        if (preNum !== null && preNum !== undefined && preNum !== '') {
          if (t.month !== '' && t.year !== '') {
            let getNum = preNum
            let changeMonth = Number(t.month)
            let changeYear = t.year
            if (getNum === 1) { //  上个月
              if (changeMonth <= 1) {
                changeMonth = 12
                for (let i = 0; i < t.selectYearType.length; i++) {
                  if (changeYear === t.selectYearType[i]) {
                    if (i - 1 >= 0) {
                      changeYear = t.selectYearType[i - 1]
                    } else {
                      changeYear = t.selectYearType[t.selectYearType.length - 1]
                      break
                    }
                  }
                }
              } else {
                changeMonth--
              }
            } else if (getNum === 2) { //  下个月
              if (changeMonth >= 12) {
                changeMonth = '1'
                for (let i = 0; i < t.selectYearType.length; i++) {
                  if (changeYear === t.selectYearType[i]) {
                    if (i + 1 <= t.selectYearType.length - 1) {
                      changeYear = t.selectYearType[i + 1]
                      break
                    } else {
                      changeYear = t.selectYearType[0]
                    }
                  }
                }
              } else {
                changeMonth++
              }
            }
            if (changeMonth < 10) {
              changeMonth = '0' + changeMonth.toString()
            }
            t.month = changeMonth.toString()
            t.year = changeYear
          } else {
            t.$Modal.warning({
              title: this.$t('reminder.err'),
              content: this.$t('lang_platform.platCalendar.errReminder'),
            })
          }
        }
        const data = {
          _mt: 'platCalendar.getPage',
          rows: '31',
          page: '1',
          sort: 'calendarDate',
          order: 'asc',
          logType: this.$t('button.ser'),
          calendarDate: t.year + '-' + t.month,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.calendar_data = res.data.content[0].rows
            // console.log(t.calendar_data)
            let firstWeek = t.calendar_data[0].calendarWeek //  得到第一天是星期几
            // t.calendar_data.calendarDate = newDayNum           //  处理后的日期
            // 删掉数组中的空值
            for (let dat in t.calendar_data) {
              if (data[dat] === '') {
                delete data[dat]
              }
            }
            // 向前边追加空值
            for (let i = firstWeek; i > 1; i--) {
              t.calendar_data.unshift('')
            }
            // 向后边追加空值，显示整个日历
            for (let j = t.calendar_data.length; j < 35; j++) {
              t.calendar_data.push('')
            }
            // 工作日和节假日添加不同的颜色
            for (let k = 0; k < t.calendar_data.length; k++) {
              if (t.calendar_data[k] !== '') {
                t.getBlur1 = false
              }
            }
            t.toNum()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 生成日历-----------------------------------------------------------
      //  循环修改日期
      toNum() {
        const t = this
        t.calendar_data.forEach((item, index) => {
          if (item.calendarDate && item.calendarDate.length === 10) {
            let dayNum = item.calendarDate
            if (dayNum) {
              dayNum = dayNum.slice(8)
              let newDayNum = parseInt(dayNum, 10)
              item.calendarDate = newDayNum
            }
          }
        })
      },
      // 工作日历管理 样式转换  end-----------------------------------------
    },
  }
</script>
<style lang="scss" scoped>
.table-form{margin: 10px 0;}
.margin-right-10{margin-right: 10px;}
.fade-enter-active, .fade-leave-active {transition: opacity .2s}
.fade-enter, .fade-leave-to {opacity: 0}

.table_header_box,.table_body_box{width:100%;}
.table_header,.table_body{width:14.28%;}
.area{padding:5px; font-size: 12px;}
.table_header_box{margin-top: 10px; border-radius: 5px 5px 0 0;}
.table_header{
  background-color: #2d8cf0; color: #ffffff; line-height: 30px; text-align: center; border-right:1px solid #dddddd;
}
.table_body_box{border-left:1px solid #dddddd;}
.table_body{border-bottom:1px solid #dddddd; border-right:1px solid #dddddd; background-color: #f2f2f2;}
.table_body p{text-align: center; line-height:25px; margin-bottom:5px;}
.conbox{position:relative; height:100px;padding-top:25px;}
.edit{position:absolute; right:6px; bottom:0px; color:#2d8cf0; cursor: pointer;}
.bgWhite{background-color: #ffffff;}
.bgFeedd3{background-color: #feedd3;}
.lbtn{margin-left:20px;background-color: #2d8cf0; color: #fff; border: none; float: right;}
.lbtn:hover{border: none !important;}
.lbtn i{font-size:14px; margin-right:5px;}
.checked{background-color: #18be6a;}
.Legalholiday,.Legalrest,.comholiday,.comrest{color: #fff; border-radius:4px;}
.Legalholiday{background-color: #70ad46;}
.day{
  position:absolute; right: 0; top: 0;
  padding-right:10px;font-size: 16px; font-weight: bold;
}
.tableNote{width:100px; padding-top:5px; margin-left: 20px;}
.noteTitle{margin:5px 0;}
.noteTitle Col{font-weight:bold;}
.lawicon{display: inline-block; width:16px; height:16px; margin-right:10px; vertical-align: middle; margin-top:-5px;}
.colorOne,.colorTwo,.colorThree,.colorFour{width:100px; margin:10px 0;}
.colorOnel,.colorTwol,.colorThreel,.colorFourl{background-color: #70ad46; width:15px; height:15px;}
.colorOner,.colorTwor,.colorThreer,.colorFourr{
  width:85px; text-align:left; padding-left:12px; line-height:15px; color:#70ad46;
}
.colorTwol,.comrest{background-color: #4472c5;}
.colorThreel,.comholiday{background-color: #ffc100;}
.colorFourl,.Legalrest{background-color: #9c7dbc;}
.colorTwor{color: #4472c5;}
.colorThreer{color: #ffc100;}
.colorFourr{color:  #9c7dbc;}
.LegalDay{
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  -moz-text-overflow: ellipsis; -webkit-text-overflow: ellipsis;
}
@media screen and (max-width: 1367px) {
  .table_body div{height:76px;}
  .conbox{padding-top:19px;}
  .table_body p{line-height:20px; margin-bottom:2px;}
  .day{font-size:14px;}
  .edit{bottom:-1px;}
}

</style>
