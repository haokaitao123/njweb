<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_payroll.payAccEmp.title') }}
        </div>
        <!--row.paccPeriodDis + ' ' + row.paccSalarysetDis + ' ' + row.paccRoundDis +  + ' (' + row.paccStatusDis + ')'-->
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="content-main">
        <Row>
          <span @dblclick="dbHCompany">
            <Input v-model="pacemCompanyDis" style="width: 190px" icon="search" :readonly="true"  :placeholder="$t('lang_payroll.payAccEmp.pacemCompanyDis')"  @on-click="selectHCompany"/>
          </span>
          <Input v-model="pacemCname" style="width: 190px" :placeholder="$t('lang_payroll.payAccEmp.pacemCnameOrNum')" />
          <Button type="primary" @click="getData(1)">{{$t('button.ser')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator :current="page" show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=[rows] :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
        <transition name="fade">
          <searchHCompany v-show="openHCompany" @closeHCompany="closeHCompany" :searchHCClo="searchHCClo" @inputHCompany="inputHCompany" :params="paramsHCompany" ref="searchHCompany"></searchHCompany>
        </transition>
        <transition name="fade">
          <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
        </transition>
        <transition name="fade">
          <itemList v-show="openItemList" :row="row" :id="updateId" :logType="logType" :index="index" @closeItem="closeItem" @getData="addNewArray" @update="updateArray" ref="itemList"></itemList>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import update from './accountEmpView'
  import itemList from './accEmpItemList'
  import searchHCompany from '../../../components/searchTable/searchHCompany'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

  export default{
    data() {
      return {
        logType: '',
        updateId: NaN,
        openHCompany: false,
        openUpdate: false,
        openItemList: false,
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemCname'),
            key: 'pacemComment',
            width: 100,
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemIdno'),
            key: 'pacemIdno',
            width: 100,
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemAccount'),
            key: 'pacemAccount',
            width: 100,
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemYfgz'),
            key: 'pacemYfgz',
            width: 100,
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemMse'),
            key: 'pacemMse',
            width: 100,
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemJsgz'),
            key: 'pacemJsgz',
            width: 100,
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemSfgz'),
            key: 'pacemSfgz',
            width: 100,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 128,
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
                  on: {
                    click: () => {
                      this.openEmp(params.row, this.$t('lang_payroll.payAccItem.title'), params.index)
                    },
                  },
                }, this.$t('button.det')),
              ])
            },
          },
        ],
        // 雇佣公司参数
        searchHCClo: [
          {
            title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.compCnFullName'),
            key: 'unitFname',
            sortable: 'custom',
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
        row: {}, // 主表数据
        // getPage查询参数
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 20,
        page: 1,
        funId: '1000',
        pacemPacid: '',
        pacemCompany: '',
        pacemCompanyDis: '',
        pacemCname: '',
      }
    },
    computed: {
    },
    components: {
      searchHCompany,
      update,
      itemList,
    },
    mounted() {
    },
    methods: {
      getRow(row) {
        const t = this
        t.row = row
        t.pacemPacid = row.id
        //t.getData()
      },
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'payAccountEmp.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          pacemPacid: t.pacemPacid, // 主表(核算表)id
          pacemCompany: t.pacemCompany,
          pacemCname: t.pacemCname,
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
      // 弹出选择雇佣公司
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
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        t.$refs.update.getData(id)
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
      openEmp(row, logType, index) {
        const t = this
        t.logType = logType
        t.index = index
        t.openItemList = true
        t.$refs.itemList.getEmpRow(row)
      },
      closeItem() {
        const t = this
        t.openItemList = false
      },
      handleReset() {
        const t = this
        t.$emit('closeEmp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .content-main{
    height: 500px;
    .table-form{
      margin: 10px 0;
    }
  }
</style>
