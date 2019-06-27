<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_payroll.payAccount.title')}}
        </p>
        <Row>
           <span @dblclick="clearFyperiod">
               <Input v-model="paccPeriodDis" style="width: 190px" icon="search" :readonly="true" :placeholder="$t('lang_payroll.payAccount.paccPeriodDis')" @on-click="pickFyperiod"/>
          </span>
<!--          <Select v-model="paccSalaryset" @on-change="getData(1)" style="width: 190px"  :placeholder="$t('lang_payroll.payAccount.paccSalarysetDis')">
            <Option :value="item.id" v-for="(item,index) in Salaryset" :key="index" >{{item.payss}}</Option>
          </Select>-->
          <Dropdown>
<!--            <Button type="primary">
              {{select}}
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list" >
              <span @click="selected('',$t('button.all'))">
                  <DropdownItem name="">{{$t('button.all')}}</DropdownItem>
                </span>
              <span v-for="(item,index) in RoundType" :key="index" @click="selected(item.paramCode,item.paramInfoCn)">
               <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
            </span>
            </DropdownMenu>-->
          </Dropdown>
          <span style="margin: 0;">
            <Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button>
          </span>
          <Button type="primary" v-show="state==='01all' || state==='02accounting' ? true:false" @click="openUp(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" v-show="state ==='02accounting' ? true:false" @click="deletemsg">{{$t('button.del')}}</Button>
          <Button type="primary" v-show="state==='02accounting' ? true:false" @click="submit('03ToBeConfirmed')" >{{$t('button.submConfirm')}}</Button>
          <Button type="primary" v-show="state==='03ToBeConfirmed' ? true:false" @click="submit('04confirmed')" >{{$t('button.confirm')}}</Button>
          <Button type="primary" v-show="state==='03ToBeConfirmed' ? true:false" @click="submit('02accounting')" >{{$t('button.back')}}</Button>
          <Button type="primary" v-show="state==='04confirmed' ? true:false" @click="submit('05alreadySealed')" >{{$t('button.seal')}}</Button>
        </Row>
        <Row>
          <RadioGroup v-model="state" v-for="(item,index) in Calstatus" :key="index" style="margin-top: 5px"  @on-change="getPageByState">
            <Radio :label="item.paramCode">{{item.paramInfoCn}}</Radio>
          </RadioGroup>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" :current="page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=[rows] :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <searchFyperiod v-show="openFyperiod"  @closeUp="closeFyperiod" @changeinput="inputFyperiod" ref="searchFyperiod"></searchFyperiod>
    </transition>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :RoundType="RoundType" :Salaryset="Salaryset" :Calstatus="Calstatus"
              :currencyObj="currencyObj" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition name="fade">
      <empList v-show="openEmpList" :id="updateId" :logType="logType" :RoundType="RoundType" :Salaryset="Salaryset" :Calstatus="Calstatus"
               :currencyObj="currencyObj" :index="index" @closeEmp="closeEmp" @getData="addNewArray" @update="updateArray" ref="empList"></empList>
    </transition>
  </div>
</template>
<script>
  import update from './payAccountView'
  import empList from './accountEmpList'
  import searchFyperiod from '../../../components/searchTable/searchFyperiod'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 300,
        value: '',
        logType: '',
        openUpdate: false,
        openFyperiod: false,
        openEmpList: false,
        updateId: NaN,
        select: this.$t('button.all'),
        tableselected: [],
        RoundType: [],
        Salaryset: [],
        Calstatus: [], // 核算状态
        currencyObj: {}, // 薪资账套和本位币的对应关系
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
            fixed: 'left'
          },
          {
            title: this.$t('薪资期间'),
            key: 'paccPeriod',
            sortable: 'custom',
          },
          {
            title: this.$t('账套名称'),
            key: 'paccComment',
          },
          {
            title: this.$t('账套类型'),
            key: 'paccOptrecord',
          },
/*          {
            title: this.$t('lang_payroll.payAccount.paccRound'),
            key: 'paccRoundDis',
          },*/
/*          {
            title: this.$t('lang_payroll.payAccount.totalAmount'),
            key: 'totalAmount',
          },
          {
            title: this.$t('lang_payroll.payAccount.updateBy'),
            key: 'updateByDis',
          },
          {
            title: this.$t('lang_payroll.payAccount.updateTime'),
            key: 'updateTime',
            width: 160,
          },*/
          {
            title: this.$t('账套状态'),
            key: 'stateDis',
            fixed: 'right',
            align: 'center',
            width: 160,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.view'), params.index)
                    },
                  },
                }, this.$t('button.view')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    display: this.state === '02accounting' ? 'inline' : 'none',
                  },
                  on: {
                    click: () => {
                      this.accounting(params.row, this.$t('lang_payroll.payAccount.payAccount'), params.index)
                    },
                  },
                }, this.$t('lang_payroll.payAccount.payAccount')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.openEmp(params.row, this.$t('button.det'), params.index)
                    },
                  },
                }, this.$t('button.det')),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 20,
        page: 1,
        funId: '1000',
        state: '01all',
        paccPeriod: '',
        paccPeriodDis: '',
        paccSalaryset: '',
        jobueueId: '',
        comp: '',
        isSend: false,
      }
    },
    computed: {
    },
    components: {
      update,
      empList,
      searchFyperiod,
    },
    mounted() {
      this.getSelect()
      //this.getSelectSalSet()
      this.getData(1)
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'payAccount.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          paccPeriod: t.paccPeriod,
          paccSalaryset: t.paccSalaryset,
          state: t.state,
        }
        // 全部的状态，不需要卡条件
        if (data.state === '01all') {
          data.state = ''
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      accounting(row, logType, index) {
/*        const t = this
        getDataLevelUserLogin({
          _mt: 'payAccount.cacl',
          logType: logType,
          paysalId: row.paccSalaryset,
          period: row.paccPeriod,
          mainId: row.id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            if (isSuccess(res, t)) {
              // 3 秒后执行
              t.comp = setInterval(t.countPaySalaryState, 3000)
              t.jobQueueId = res.data.content[0].jobQueueId
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('lang_payroll.payAccount.accountRemind'),
                onOk: () => {
                  t.isSend = true
                  clearInterval(t.comp)
                },
              })
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })*/
      },
      countPaySalaryState() {
        const t = this
        clearInterval(t.comp)
        getDataLevelUserLogin({
          _mt: 'userJobQueue.compStatusQuery',
          jobueueId: t.jobQueueId,
        }).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].status !== '100') {
              // 继续等待定时任务执行
              setTimeout(() => {
                if (!t.isSend) {
                  t.countPaySalaryState()
                }
              }, 3000)
            } else {
              clearInterval(t.comp)
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('lang_payroll.payAccount.accountSuc'),
              })
              //t.getData()
            }
          } else {
            clearInterval(t.comp)
          }
        }).catch(() => {
          clearInterval(t.comp)
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 状态改变
      submit(status) {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmOper'),
            onOk: () => {
              const data = {
                _mt: 'payAccount.updStatusByIds',
                logType: '改变状态',
                id: t.tableselected.toString(),
                state: status,
              }
              getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  //t.getData()
                }
              }).catch(() => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            },
            onCancel: () => {
              t.tableselected = []
            },
          })
        }
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'calcround,calculation',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.RoundType = res.data.content[0].value[0].paramList
            t.Calstatus = res.data.content[0].value[1].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelectSalSet() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'paySalSet.getSelectValue',
          data: '{}',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Salaryset = (res.data.content[0].value)
            for (let i = 0; i < t.Salaryset.length; i++) {
              t.currencyObj[t.Salaryset[i].id] = t.Salaryset[i] // id与数组对应关系i
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
          })
        })
      },
      getPageByState(value) {
        this.state = value
        this.getData(1)
      },
      // 选项按钮，重新设置值
      selected(key, name) {
        this.select = name
        this.paccRound = key
        //this.getData(1)
      },
      // 选择期间
      pickFyperiod() {
        const t = this
        t.$refs.searchFyperiod.getData()
        t.openFyperiod = true
      },
      inputFyperiod(row) {
        const t = this
        t.paccPeriodDis = row.fypdPeriod
        t.paccPeriod = row.id
      },
      clearFyperiod() {
        const t = this
        t.paccPeriodDis = ''
        t.paccPeriod = ''
      },
      closeFyperiod() {
        const t = this
        t.openFyperiod = false
        t.$refs.searchFyperiod.fypdYear = ''
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          //this.getData()
        } else {
          this.order = 'desc'
        }
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        //t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        //t.getData()
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
                _mt: 'payAccount.delByIds',
                funId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  //t.getData()
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
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        if (logType === this.$t('button.view')) {
          t.$refs.update.getData(id)
        }
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
      openEmp(row, logType, index) {
        const t = this
        t.logType = logType
        t.index = index
        t.openEmpList = true
        t.$refs.empList.getRow(row)
      },
      closeEmp() {
        const t = this
        t.openEmpList = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form{
    margin: 10px 0;
  }
  .margin-right-10{
    margin-right: 10px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
