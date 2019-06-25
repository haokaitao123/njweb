<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_payroll.empPayroll.title')}}
        </p>
        <Row>
           <span @dblclick="dbPeriod">
               <Input v-model="period" style="width: 160px" icon="search" @on-enter="getData(1)" :readonly="true" :placeholder="$t('lang_payroll.payAccount.paccPeriodDis')"
                      @on-click="pickFyperiod"/>
          </span>
          <Select v-model="paccSalaryset" clearable style="width: 160px"  :placeholder="$t('lang_payroll.payAccount.paccSalarysetDis')">
            <Option :value="item.id" v-for="(item,index) in Salaryset" :key="index" >{{item.payss}}</Option>
          </Select>
          <span @dblclick="dbHCompany">
               <Input v-model="pacemCompanyDis" style="width: 160px" icon="search" @on-enter="getData(1)" :readonly="true" :placeholder="$t('lang_payroll.payAdd.pladCompanyDis')"  @on-click="selectHCompany"/>
          </span>
          <Input v-model="pacemCname" style="width: 160px" @on-enter="getData(1)" :placeholder="$t('lang_payroll.payAccEmp.pacemCnameOrNum')" />
          <span style="margin: 0;">
            <Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button>
          </span>
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
      <itemList v-show="openItemList" :row="row" :id="updateId" :logType="logType" :index="index" @closeItem="closeItem" ref="itemList"></itemList>
    </transition>
    <!--雇佣公司-->
    <transition name="fade">
      <searchHCompany v-show="openHCompany" @closeHCompany="closeHCompany" :searchHCClo="searchHCClo" @inputHCompany="inputHCompany" :params="paramsHCompany" ref="searchHCompany"></searchHCompany>
    </transition>
  </div>
</template>
<script>
  import itemList from './empayItemList'
  import searchHCompany from '../../../components/searchTable/searchHCompany'
  import searchFyperiod from '../../../components/searchTable/searchFyperiod'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openHCompany: false,
        openItemList: false,
        openFyperiod: false,
        updateId: NaN,
        select: '全部',
        tableselected: [],
        Salaryset: [],
        //      雇佣公司
        pacemCompanyDis: '',
        pacemCompany: '',
        searchHCClo: [
          {
            title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.compCnFullName'),
            key: 'unitFname',
          },
        ],
        paramsHCompany: {
          _mt: 'orgUnits.getByOrgFramePageList',
          rows: 20,
          page: 1,
          sort: 'id',
          order: 'desc',
          unitType: '01company',
          logType: '雇佣公司',
        },
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
            fixed: 'left'
          },
          {
            title: this.$t('lang_payroll.payAccount.paccPeriod'),
            key: 'period',
            width: 120,
            align: 'center',
          },
          {
            title: this.$t('lang_payroll.payAccount.paccSalaryset'),
            key: 'paccSalarysetDis',
            width: 120,
            align: 'center',
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemCompany'),
            key: 'pacemCompanyDis',
            width: 180,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemDept'),
            width: 150,
            key: 'pacemDeptDis',
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemEmpworkno'),
            width: 120,
            key: 'pacemEmpworkno',
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemCname'),
            width: 120,
            key: 'pacemCname',
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemYfgz'),
            width: 120,
            key: 'pacemYfgz',
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemMse'),
            width: 120,
            key: 'pacemMse',
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemJsgz'),
            width: 120,
            key: 'pacemJsgz',
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemSfgz'),
            key: 'pacemSfgz',
            width: 120,
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
                      this.openEmpItem(params.row, this.$t('button.det'), params.index)
                    },
                  },
                }, this.$t('button.det')),
              ])
            },
          },
        ],
        row: {}, // 传递给子表用的数据
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
        paccStatus: '05alreadySealed',
        period: '',
        paccSalaryset: '',
        pacemCname: '',
      }
    },
    computed: {
    },
    components: {
      itemList,
      searchHCompany,
      searchFyperiod,
    },
    mounted() {
//      this.getCurrentPeroid()
      this.getSelectSalSet()
    },
    methods: {
      getCurrentPeroid() {
        let date = new Date().format('yyyyMM')
        this.period = date
      },
      getData(page) {
        const t = this
        if (t.period === '' || (t.pacemCompany === '' && t.paccSalaryset === '')) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_payroll.payAccEmp.reminder1'),
          })
        } else {
          if (page) {
            t.page = page
          }
          const data = {
            _mt: 'payAccountEmp.getPageByPeriod',
            rows: t.rows,
            page: t.page,
            sort: t.sort,
            order: t.order,
            logType: this.$t('button.ser'),
            period: t.period,
            paccSalaryset: t.paccSalaryset,
            pacemCname: t.pacemCname,
            paccStatus: t.paccStatus,
            pacemCompany: t.pacemCompany,
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
        }
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
        t.pacemCompanyDis = name
        t.pacemCompany = id
      },
      dbHCompany() {
        const t = this
        t.pacemCompanyDis = ''
        t.pacemCompany = ''
      },
      /**
       *  获取薪资账套下拉框
       * */
      getSelectSalSet() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'paySalSet.getSelectValue',
          data: '{}',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Salaryset = (res.data.content[0].value)
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
          })
        })
      },
      /**
       * 选择期间
       */
      pickFyperiod() {
        const t = this
        t.$refs.searchFyperiod.getData()
        t.openFyperiod = true
      },
      inputFyperiod(row) {
        const t = this
        t.period = row.fypdPeriod
      },
      closeFyperiod() {
        const t = this
        t.openFyperiod = false
        t.$refs.searchFyperiod.fypdYear = ''
      },
      dbPeriod() {
        const t = this
        t.period = ''
      },
      // 排序
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        } else {
          this.order = 'desc'
        }
      },
      // 分页
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
      /**
       * 打开薪资明细页面
       * @param row
       * @param logType
       * @param index
       */
      openEmpItem(row, logType, index) {
        const t = this
        t.row = row
        t.logType = logType
        t.openItemList = true
        t.index = index
        t.$refs.itemList.getEmpRow(row)
      },
      closeItem() {
        const t = this
        t.openItemList = false
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
