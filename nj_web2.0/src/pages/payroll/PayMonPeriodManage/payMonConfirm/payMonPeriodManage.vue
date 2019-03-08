<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_payroll.payMonPeriod.title2')}}
        </p>
        <Row>
           <span @dblclick="dbHCompany">
               <Input v-model="plsimnpCompanyDis" style="width: 190px" icon="search" :readonly="true"  :placeholder="$t('lang_payroll.payMonPeriod.plsimnpCompanyDis')"  @on-click="selectHCompany"/>
          </span>
          <span @dblclick="clearFyperiod">
               <Input v-model="plsimnpPeriodDis" style="width: 190px" icon="search" :readonly="true"  :placeholder="$t('lang_payroll.payMonPeriod.plsimnpPeriodDis')"  @on-click="pickFyperiod"/>
          </span>
          <Select v-model="plsimnpSalaryset" @on-change="getData(1)" style="width: 190px" :placeholder="$t('lang_payroll.payMonPeriod.plsimnpSalarysetDis')">
            <Option :value="item.id" v-for="(item,index) in Salaryset" :key="index" >{{item.payss}}</Option>
          </Select>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <!--<Button type="primary" @click="handSubmit('确认')">{{$t('button.confirm')}}</Button>-->
          <Button type="primary" @click="openConfirm">{{$t('button.confirm')}}</Button>
          <Button type="primary" @click="handSubmit">{{$t('button.subm')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable"
                 :height="tableheight" size="small" border ref="selection" :columns="columns01.length === 0 ? columns:columns01" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" :current="page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :Salaryset="Salaryset" :ItemArray="ItemArray"   :index="index" @closeUp="closeUp" @getData="getData"  ref="update"></update>
    </transition>
    <transition name="fade">
      <searchHCompany v-show="openHCompany" @closeHCompany="closeHCompany" :searchHCClo="searchHCClo" @inputHCompany="inputHCompany" :params="paramsHCompany" ref="searchHCompany"></searchHCompany>
    </transition>
    <transition name="fade">
      <searchFyperiod v-show="openFyperiod"  @closeUp="closeFyperiod" @changeinput="inputFyperiod" ref="searchFyperiod"></searchFyperiod>
    </transition>
    <transition name="fade">
      <confirm v-show="confirm" :ids="tableselected.toString()" @resetTableselected="resetTableselected" @closeConfirm="closeConfirm" @getData="getData" ref="confirm"></confirm>
    </transition>
  </div>
</template>
<script>
  import confirm from './isOrNotConfirm'
  import update from './payMonPeriodEdit'
  import searchHCompany from '../../../../components/searchTable/searchHCompany'
  import searchFyperiod from '../../../../components/searchTable/searchFyperiod'
  import { deepCopy, isSuccess } from '../../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'

  export default{
    data() {
      return {
        confirm: false,
        openHCompany: false,
        openFyperiod: false,
        Salaryset: [],
        Salhdstatus: [],
        select: '编辑中',
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        ItemArray: {},
        columns01: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_payroll.payMonPeriod.plsimnpEmpworkno'),
            key: 'plsimnpEmpworkno',
            width: 140,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payMonPeriod.plsimnpCname'),
            width: 140,
            key: 'plsimnpCname',
          },
          {
            title: this.$t('lang_payroll.payMonPeriod.plsimnpCompany'),
            width: 140,
            key: 'plsimnpCompanyDis',
          },
          {
            title: this.$t('lang_payroll.payMonPeriod.plsimnpmnpDept'),
            width: 140,
            key: 'plsimnpDeptDis',
          },
          {
            title: this.$t('lang_payroll.payMonPeriod.plsimnpPeriod'),
            width: 140,
            key: 'plsimnpPeriodDis',
          },
          {
            title: this.$t('lang_payroll.payMonPeriod.plsimnpSalaryset'),
            width: 140,
            key: 'plsimnpSalarysetDis',
          },
          {
            title: this.$t('lang_payroll.payMonPeriod.plsimnpSalarycurrency'),
            width: 140,
            key: 'plsimnpSalarycurrencyDis',
          },
          {
            title: this.$t('lang_payroll.payMonPeriod.plsimnpSalaryItem'),
            width: 140,
          },
          {
            title: this.$t('lang_payroll.payMonPeriod.plsimnpIsconfirm'),
            key: 'plsimnpIsconfirmDis',
            width: 100,
            fixed: 'right',
            align: 'center',
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
        //      雇佣公司
        searchHCClo: [
          {
            title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.compCnFullName'),
            key: 'compFnameCnDis',
          },
          {
            title: this.$t('lang_employee.searchColumn.compEnFullName'),
            key: 'compFnameEnDis',
          },
        ],
        paramsHCompany: {
          _mt: 'orgUnits.getByOrgFramePageList',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'desc',
          unitType: '01company',
          logType: '雇佣公司',
        },
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
        isInit: 0,
        plsimnpCompany: '',
        plsimnpCompanyDis: '',
        plsimnpPeriod: '',
        plsimnpPeriodDis: '',
        plsimnpSalaryset: '1000',
        plsimnpStatus: '10confirm',
      }
    },
    computed: {

    },
    components: {
      update,
      searchHCompany,
      searchFyperiod,
      confirm,
    },
    mounted() {
      this.getSelect()
      this.getSelectSalSet()
      this.getData(1)
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'paySalitemMonthnoperiod.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          plsimnpCompany: t.plsimnpCompany,
          plsimnpPeriod: t.plsimnpPeriod,
          plsimnpSalaryset: t.plsimnpSalaryset,
          plsimnpStatus: t.plsimnpStatus,
        }
        for (const dat in data) {
          if (data[dat] === undefined || data[dat] === '') {
            delete data[dat]
          }
        }
        if (data.plsimnpSalaryset === undefined || data.plsimnpSalaryset === '') {
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: this.$t('lang_payroll.payMonPeriod.plsimnpReminder'),
          })
        } else {
          getDataLevelUserLoginNew(data).then((res) => {
            if (isSuccess(res, t)) {
              t.columns01 = [] // 动态显示列表中的值
              for (let i = 0; i < t.columns.length; i++) {
                if (i !== t.columns.length - 3) { // 项目... 不添加进去
                  t.columns01.push(t.columns[i])
                }
              }
              t.data = res.data.content[0].rows
              if (t.data.length > 0) {
                let obj = Object.keys(t.data[0]) // 得到对象的key 转换为数组
                obj.sort() // 按照字母表的顺序对属性进行排序
                for (let i = 0; i < obj.length; i++) {
                  if (obj[i].indexOf('plsimnpSn') !== -1 || obj[i].indexOf('plsimnpUn') !== -1) {
                    let tempColumn = {
                      title: t.data[0][obj[i]].split(',')[0],
                      width: 150,
                      key: obj[i],
                    }
                    // 拆分表头和表尾部
                    t.columns01.splice(t.columns01.length - 2, 0, tempColumn)
                    for (let j = 0; j < t.data.length; j++) {
                      t.data[j][obj[i]] = t.data[j][obj[i]].split(',')[1]
                      if (t.ItemArray[t.data[j]['id']] === undefined) {
                        t.ItemArray[t.data[j]['id']] = [] // 创建皴法该内容的数组
                      }
                      let object = {}
                      object.label = tempColumn.title // label标签
                      object.value = t.data[j][obj[i]]// 值
                      t.ItemArray[t.data[j]['id']].push(object)
                    }
                  }
                }
              }
              t.total = res.data.content[0].records
            }
          }).catch(() => {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        }
      },
//      // 提交确认
//      handSubmit(manalType) {
//        const t = this
//        if (t.tableselected.length === 0) {
//          t.$Modal.warning({
//            title: this.$t('reminder.remind'),
//            content: this.$t('reminder.leastone'),
//          })
//        } else {
//          const data = {
//            _mt: 'paySalitemMonthnoperiod.checkItem',
//            funId: '1',
//            logType: '检查当前数据是否确认',
//            manalType: manalType,
//            id: t.tableselected.toString(),
//          }
//          getDataLevelUserLogin(data).then((res) => {
//            if (isSuccess(res, t)) {
//              t.isInit = res.data.content[0].value
//              if (t.isInit === 0) {
//                t.$Modal.confirm({
//                  title: this.$t('reminder.remind'),
//                  content: this.$t('reminder.confirmSubmit'),
//                  onOk: () => {
//                    t.submit()
//                  },
//                  onCancel: () => {},
//                })
//              } else {
//                if (manalType === '确认') {
//                  t.$Modal.warning({
//                    title: this.$t('reminder.err'),
//                    content: this.$t('reminder.confirmDataCheck1'),
//                  })
//                } else {
//                  t.$Modal.warning({
//                    title: this.$t('reminder.err'),
//                    content: this.$t('reminder.confirmDataCheck2'),
//                  })
//                }
//              }
//            }
//          }).catch(() => {
//            t.$Modal.error({
//              title: this.$t('reminder.err'),
//              content: this.$t('reminder.errormessage'),
//            })
//          })
//        }
//      },
      // 提交
      handSubmit() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          const data = {
            _mt: 'paySalitemMonthnoperiod.checkIsConfirm',
            funId: '1',
            logType: '确认当前选中的数据是否全部确认',
            ids: t.tableselected.toString(),
          }
          getDataLevelUserLogin(data).then((res) => {
            if (isSuccess(res, t)) {
              t.isInit = res.data.content[0].value
              if (t.isInit === 0) {
                t.$Modal.confirm({
                  title: this.$t('reminder.remind'),
                  content: this.$t('reminder.confirmSubmit'),
                  onOk: () => {
                    t.submit()
                  },
                  onCancel: () => {},
                })
              } else {
                t.$Modal.warning({
                  title: this.$t('reminder.remind'),
                  content: this.$t('lang_payroll.payMonPeriod.noconfirmRemind'),
                })
              }
            }
          }).catch(() => {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        }
      },
      submit() {
        const t = this
        const data = {
          _mt: 'paySalitemMonthnoperiod.updStatusByIds',
          funId: '1',
          logType: '提交月度非周期性薪资数据',
          id: t.tableselected.toString(),
          plsimnpStatus: '20toupd',
        }
        getDataLevelUserLoginNew(data).then((res) => {
          t.tableselected = []
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.submitsuccess'),
            })
            t.getData()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'salhdstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Salhdstatus = res.data.content[0].value[0].paramList.slice(0, 3)
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
            t.Salaryset = res.data.content[0].value
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
          })
        })
      },
      //  	雇佣公司
      selectHCompany() {
        const t = this
        t.$refs.searchHCompany.getData(this.paramsHCompany)
        t.openHCompany = true
      },
      closeHCompany() {
        const t = this
        t.$refs.searchHCompany.unitCode = ''
        t.openHCompany = false
      },
      inputHCompany(name, id) {
        const t = this
        t.plsimnpCompanyDis = name
        t.plsimnpCompany = id
      },
      dbHCompany() {
        const t = this
        t.plsimnpCompanyDis = ''
        t.plsimnpCompany = ''
      },
      // 选择期间
      pickFyperiod() {
        const t = this
        t.$refs.searchFyperiod.getData()
        t.openFyperiod = true
      },
      inputFyperiod(row) {
        const t = this
        t.plsimnpPeriodDis = row.fypdPeriod
        t.plsimnpPeriod = row.id
      },
      clearFyperiod() {
        const t = this
        t.plsimnpPeriodDis = ''
        t.plsimnpPeriod = ''
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
          this.getData()
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
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
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
        if (logType === this.$t('button.upd')) {
          t.$refs.update.getData(id)
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.form = {}
      },
      /**
       * 打开确认页面
       */
      openConfirm() {
        const t = this
        let isDelete = false
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.confirm = true
        }
      },
      closeConfirm() {
        const t = this
        t.confirm = false
      },
      // 确认后重置
      resetTableselected() {
        this.tableselected = []
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
