<template>
  <div class="cover">
    <div  class="box" style="width: 900px;">
      <!--style="width: 90%;height: 70%"-->
      <div class="title">
        <div class="title-text">
          <Icon type="mouse"></Icon>&nbsp;{{$t('lang_platform.platCalendar.title')}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row>
        <!--<Button class="lbtn" v-bind:class="{checked: ischecked3}" @click="TransformationMode(3)"><Icon type="clock"></Icon>{{$t('lang_payroll.paySalplan.confirmInfo')}}</Button>-->
        <Button class="lbtn" v-bind:class="{checked: ischecked2}" @click="TransformationMode(2)"><Icon type="calendar"></Icon>{{$t('lang_platform.platCalendar.calendartitle')}}</Button>
        <Button class="lbtn" v-bind:class="{checked: ischecked1}" @click="TransformationMode(1)"><Icon type="clipboard"></Icon>{{$t('lang_platform.platCalendar.clipboardtitle')}}</Button>
      </Row>
      <Col span="24">
      <!-- table表格 日历-->
      <div v-show="calendarModel1" class="calendar_table">
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" size="small" border ref="selection" :columns="columns" :data="data1" ></Table>
        </row>
        <Row style="display: flex">          <Page :total="total1" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </div>

      <!-- 日历 -->
      <div v-show="calendarModel2" class="calendar_table">
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
            <!--<div v-for="(item,index2) in data1 " :key="index2">-->
            <!-- 工作日样式 -->
            <div v-if="days.isKey === '2'" class="conbox area bgWhite" style="background-color: rgb(255,226,226)">
              <div class="day">{{days.calendarDate1}}</div>
              <!--<p >-->
              <span v-html="days.taskName" style="white-space:nowrap;display:block;width:95px;text-overflow: ellipsis;white-space: nowrap;overflow:hidden"></span>
              <!--</p>-->
              <span class="edit" v-if="days.calendarDate1" @click="openUp(days.calendarDate, $t('button.upd'), index1)">{{$t('button.edi')}}</span>

            </div>
            <div v-else-if="days.isKey === '1'" class="conbox area bgWhite" style="background-color: rgba(36,187,239,0.29)">
              <div class="day">{{days.calendarDate1}}</div>

              <span v-html="days.taskName" style="white-space:nowrap;display:block;width:95px;text-overflow: ellipsis;white-space: nowrap;overflow:hidden"></span>

              <span class="edit" v-if="days.calendarDate1" @click="openUp(days.calendarDate, $t('button.upd'), index1)">{{$t('button.edi')}}</span>

            </div>
            <div v-else-if="days.calendarComptype === '01workday' || days.calendarLegaltype === '01workday'" class="conbox area bgWhite">
              <div class="day">{{days.calendarDate1}}</div>

              <span v-html="days.taskName" style="white-space:nowrap;display:block;width:95px;text-overflow: ellipsis;white-space: nowrap;overflow:hidden"></span>

              <span class="edit" v-if="days.calendarDate1" @click="openUp(days.calendarDate, $t('button.upd'), index1)">{{$t('button.edi')}}</span>

            </div>
            <!-- 休息日、节假日样式 -->
            <div v-else-if="days.calendarComptype === '02weekend'
                                 || days.calendarComptype === '03holiday'
                                 || days.calendarLegaltype === '02weekend'
                                 || days.calendarLegaltype === '03holiday'"
                 class="conbox area" style="background-color: rgba(151,255,152,0.34)">
              <div class="day">{{days.calendarDate1}}</div>

              <var v-html="days.taskName" style="white-space:nowrap"></var>

              <span class="edit" v-if="days.calendarDate1" @click="openUp(days.calendarDate, $t('button.upd'), index1)">{{$t('button.edi')}}</span>
            </div>

            <!-- 没有日期的样式 -->
            <div v-else="days.calendarComptypeName" class="conbox area"></div>
            <!--</div>-->
            </Col>
          </Row>
          </Col>
          <Col span="2" class="tableNote">
          <Row class="colorOne">
            <Col span="18" class="colorOnel"></Col>
            <Col span="6" class="colorOner">{{$t('lang_payroll.paySalplan.iskey')}}</Col>
          </Row>
          <Row class="colorThree">
            <Col span="18" class="colorThreel"></Col>
            <Col span="6" class="colorThreer">{{$t('lang_payroll.paySalplan.today')}}</Col>
          </Row>
          <Row class="colorFour">
            <Col span="18" class="colorFourl"></Col>
            <Col span="6" class="colorFourr">{{$t('lang_payroll.paySalplan.restday')}}</Col>
          </Row>
          </Col>
        </Row>
        <Spin v-if="loading" fix></Spin>
      </div>
      <!-- 日历 结束 -->
      <!-- table表格 日历-->
      <div v-show="calendarModel3" class="calendar_table">
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" size="small" border ref="selection" :columns="columns1" :data="data3" :height="tableheight"></Table>
        </row>
      </div>
      </Col>

    </div>
     <!--进行修改操作弹出的页面 start-->
    <transition name="fade">
      <update-one v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="getData" ref="update"></update-one>
    </transition>
     <!--进行修改操作弹出的页面 end-->

    <transition name="fade">
      <update-two v-show="openUpdate2" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp2" @getData="addNewArray" @update="updateArray" ref="update2"></update-two>
    </transition>
    <transition name="fade">
      <person v-show="openPersondate" @closePerson="closePerson" @getData="getData"  ref="person"></person>
    </transition>

  </div>
</template>
<script>
  import updateOne from './paySalplantask/paySalplantaskManage'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import updateTwo from './paySalplantask/paySalplantaskView'
  import person from './paySalplantaskperson/paySalplantaskpersonManage'

  export default{
    data() {
      return {
        loading: true,
        tableheight: '296px',
        value: '',
        logType: '',
        openUpdate: false,
        openUpdate2: false,
        openPersondate: false,
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
            title: this.$t('lang_payroll.paySalplan.salpltkDate'),
            key: 'salpltkDate',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkTaskshort'),
            key: 'salpltkTaskshort',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkTaskname'),
            key: 'salpltkTaskname',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkIskeyDis'),
            key: 'salpltkIskeyDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkTime'),
            key: 'salpltkTime',
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.openPerson(params.row.id)
                    },
                  },
                }, this.$t('lang_payroll.paySalplan.person')),
              ])
            },
          },
        ],
        columns1: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salplcfConfirmtime'),
            key: 'salplcfConfirmtime',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salplcfConfirmerDis'),
            key: 'salplcfConfirmerDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salplcfConfirmedDis'),
            key: 'salplcfConfirmedDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salplcfReason'),
            key: 'salplcfReason',
            sortable: 'custom',
            width: 500,
          },
        ],
        data: [],
        data1: [], // 任务数据
        total1: 0, // 任务数据
        total3: 0,
        data2: [], // 任务数据日历模式
        data3: [], // 负责人数据
        planId: '', // 主表ID
        index: 0,
        calendar_index: 0,
        sort: 'salptkInit',
        order: 'asc',
        rows: '10',
        page: '1',
        funId: '1000',
        year: '',
        month: '',
        day: '',
        calendarModel1: true,  //  表格日历
        ischecked1: true,
        ischecked2: false,
        ischecked3: false,
        calendarModel2: false,  //  月份日历
        calendarModel3: false,
        calendar_data: [], // 日历日期数组
        getBlur1: false,
        getBlur2: false,
        getBlur3: false,
        taskMap: [],
      }
    },
    computed: {

    },
    components: {
      updateOne,
      person,
      updateTwo,
    },
    mounted() {

    },
    methods: {
      // 获取当前时间
      getTime(planId) {
        const t = this
        if (t.planId === '') {
          t.planId = planId
        }
        let date = new Date()
        t.year = date.format('yyyy')
        t.month = date.format('MM')
        t.day = date.format('dd')
      },
      getData(flag) {
        const t = this
        if (!flag) {
              t.getCaldearData()
            }else{
              t.getPageMenthod();
            }

      },
      getPageMenthod() {
        const t = this
        const data1 = {
          _mt: 'paySalplantask.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          salpltkPlanid: t.planId,
        }
        for (const dat in data1) {
          if (data1[dat] === '') {
            delete data1[dat]
          }
        }
        getDataLevelUserLoginNew(data1).then((res) => {
          if (isSuccess(res, t)) {
            t.data1 = res.data.content[0].rows
            // console.log(t.data)
            t.total1 = res.data.content[0].records

          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      openUp2(id, logType, index, date) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate2 = true
        t.index = index
        t.$refs.update2.getPlanid(t.planId, date)
//        t.$refs.update.getSelect()
        if (logType === this.$t('button.upd')) {
          t.$refs.update2.getData(id)
        }
      },
      closeUp2() {
        const t = this
        t.openUpdate2 = false
      },
      openPerson(id) {
        const t = this
        t.openPersondate = true
//        t.$refs.update.getSelect()
        t.$refs.person.getData(id)
      },
      closePerson() {
        const t = this
        t.openPersondate = false
      },
      addNewArray(res) {
        const t = this
        t.data1.unshift(res)
      },
      // 更新
      updateArray(res) {
        const t = this
        t.data1.splice(t.index, 1, res)
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData(true)
          this.getSelect()
        }
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData(true)
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData(true)
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
        this.tableselected = newArr.toString()
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
                _mt: 'paySalplantask.delByIds',
                logType: this.$t('button.del'),
                delIds: t.tableselected,
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.getData(true)
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
      copy() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_payroll.paySalplan.iscopay'),
            onOk: () => {
              getDataLevelUserLogin({
                _mt: 'paySalplantask.copyByIds',
                logType: '复制',
                ids: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.getData(true)
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
        t.$refs.update.getPlanid(t.planId)
        if (logType === this.$t('button.upd')) {
          t.$refs.update.getData(id)
        }
      },
      closeUp() {
        const t = this
        t.getData(true)
        t.getCaldearData()
        t.openUpdate = false
      },
      // 工作日历管理 样式转换  start
      TransformationMode(num) {
        const t = this
//        t.getData(t.planId)
//        t.getCaldearData()
        if (num === 1) {
          t.ischecked1 = true
          t.ischecked2 = false
          t.ischecked3 = false
          t.calendarModel1 = true
          t.calendarModel2 = false
          t.calendarModel3 = false
          t.getData(true)
        } else if (num === 2) {
          t.ischecked2 = true
          t.ischecked1 = false
          t.ischecked3 = false
          t.calendarModel2 = true
          t.calendarModel1 = false
          t.calendarModel3 = false
          t.getData(false)
        } else if (num === 3) {
          const data = {
            _mt: 'paySalplanconfirm.getPage',
            rows: '100',
            page: '1',
            sort: 'id',
            order: 'asc',
            logType: this.$t('button.ser'),
            salplcfPlanid: t.planId,
          }
          for (const dat in data) {
            if (data[dat] === '') {
              delete data[dat]
            }
          }
          getDataLevelUserLoginNew(data).then((res) => {
            if (isSuccess(res, t)) {
              t.data3 = res.data.content[0].rows
              // console.log(t.data)
              t.total3 = res.data.content[0].records
            }
          }).catch(() => {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
          t.ischecked1 = false
          t.ischecked2 = false
          t.ischecked3 = true
          t.calendarModel1 = false
          t.calendarModel2 = false
          t.calendarModel3 = true
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
              title: this.$t('reminder.remind'),
              content: this.$t('lang_platform.platCalendar.errReminder'),
            })
          }
        }
        const data1 = {
          _mt: 'paySalplantask.getSelectValue',
          logType: this.$t('button.ser'),
          salpltkPlanid: t.planId,
          salpltkIskey: '1',
        }
        getDataLevelUserLoginNew(data1).then((res) => {
          if (isSuccess(res, t)) {
            t.data2 = res.data.content[0].value
            const data = {
              _mt: 'platCalendar.getPlanperiod',
              logType: this.$t('button.ser'),
              id: t.planId,
            }
            for (const dat in data) {
              if (data[dat] === '') {
                delete data[dat]
              }
            }
            getDataLevelUserLogin(data).then((res1) => {
              if (isSuccess(res1, t)) {
                t.calendar_data = res1.data.content[0].value
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
                let leng = Math.ceil(t.calendar_data.length / 7) * 7
                for (let j = t.calendar_data.length; j < leng; j++) {
                  t.calendar_data.push('')
                }
                // 工作日和节假日添加不同的颜色
                for (let k = 0; k < t.calendar_data.length; k++) {
                  if (t.calendar_data[k] !== '') {
                    t.getBlur1 = false
                    if (t.calendar_data[k].calendarDate === t.year + '-' + t.month + '-' + t.day) {
                      t.calendar_data[k]['isKey'] = '1'
                    }
                    if (t.data2) {
                      let j = 0
                      for (let l = 0; l < t.data2.length; l++) {
                        if (t.calendar_data[k].calendarDate === t.data2[l].salpltkDate) {
                          if (t.calendar_data[k]['taskName']&& j<2) {
                            t.calendar_data[k]['taskName'] += '● ' + t.data2[l].salpltkTaskshort + '<br />'
                           j++
                         } else if (j<2){
                            t.calendar_data[k]['taskName'] = '● ' + t.data2[l].salpltkTaskshort + '<br />'
                          }
                          if (t.data2[l].salpltkIskey === '1') {
                            t.calendar_data[k]['isKey'] = '2'
                          }
                        }
                      }
                    }
                  }
                }
                t.toNum()
                t.loading = false
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
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
              item['calendarDate1'] = newDayNum
            }
          }
        })
      },
      // 工作日历管理 样式转换  end-----------------------------------------
      handleReset() {
        this.$emit('closeUp')
        // this.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  .table-form{margin: 10px 0;overflow-y: scroll}
  .margin-right-10{margin-right: 10px;}
  .fade-enter-active, .fade-leave-active {transition: opacity .2s}
  .fade-enter, .fade-leave-to {opacity: 0}
  .cover .box {
    width: 1130px !important;

  }
  .ivu-table-wrapper {
    height: 330px !important;
    overflow-y:scroll;
    border-bottom: 1px solid #dddee1;
  }
  .ivu-table-body{
    border-bottom: 1px solid #E9E7E7 !important;
    height: 296px !important;
  }
  .ivu-table-tip table td{
    height: 261px !important;
  }
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
  .conbox{position:relative; height:71px;padding-top:25px;}
  .edit{position:absolute; right:6px; bottom:0px; color:#2d8cf0; cursor: pointer;}
  .bgWhite{background-color: #ffffff;}
  .bgFeedd3{background-color: #feedd3;}
  .lbtn1{margin-left:20px; float: right;}
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
  .colorOnel,.colorTwol,.colorThreel,.colorFourl{background-color: rgb(255, 226, 226); width:15px; height:15px;}
  .colorOner,.colorTwor,.colorThreer,.colorFourr{
    width:73px; text-align:left; padding-left:12px; line-height:15px; color: rgb(214, 188, 188);
  }
  .colorTwol,.comrest{background-color: rgba(151,255,152,0.46);}
  .colorThreel,.comholiday{background-color: rgba(36,187,239,0.35);}
  .colorFourl,.Legalrest{background-color: rgba(151,255,152,0.46);}
  .colorTwor{color: rgba(151,255,152,0.46);}
  .colorThreer{color: rgba(34, 183, 230, 0.64);}
  .colorFourr{color: rgb(133, 212, 133);}
  .LegalDay{
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
    -moz-text-overflow: ellipsis; -webkit-text-overflow: ellipsis;
  }
  @media screen and (max-width: 2000px) {
    .table_body div{height:90px;}
    .conbox{padding-top:19px;}
    .table_body p{line-height:20px; margin-bottom:2px;}
    .day{font-size:14px;}
    .edit{bottom:-1px;}
  }
</style>
