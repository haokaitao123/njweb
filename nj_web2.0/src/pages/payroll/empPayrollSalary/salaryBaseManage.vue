<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_payroll.salaryBase.salaryBase')}}
        </p>
        <Row>
          <span @dblclick="clearCompany('1')">
               <Input v-model="companyDisName" style="width: 200px" icon="search" :readonly="true"  :placeholder="$t('lang_payroll.payCompConfig.pcgCompanyDis')"  @on-click="pickData('1')"/>
          </span>
          <span @dblclick="clearCompany('2')">
               <Input v-model="deptDisName" style="width: 200px" icon="search" :readonly="true"  :placeholder="$t('lang_payroll.salaryBase.deptDisNameIns')"  @on-click="pickData('2')"/>
          </span>
          <Input :placeholder="$t('lang_payroll.salaryBase.worknoDisIns')" style="width: 200px" v-model="worknoDis"/>
          <Input :placeholder="$t('lang_payroll.salaryBase.cnameDisIns')" style="width: 200px" v-model="cnameDis"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" :current="page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition name="fade">
      <searchOrgCompany v-show="openPick" @closeUp="closeCompany" @changeinput="changeinput" ref="searchOrgCompany"></searchOrgCompany>
    </transition>
  </div>
</template>
<script>
  import update from './framework'
  import searchOrgCompany from '../../../components/searchTable/searchOrgUnit'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        openPick: false,
        status: '0',
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
            fixed: 'left'
          },
          {
            title: this.$t('lang_payroll.salaryBase.companyDis'),
            key: 'companyDis',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.salaryBase.deptDis'),
            key: 'deptDis',
//          width: 150,
//            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.salaryBase.worknoDis'),
            key: 'worknoDis',
//          width: 150,
//            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.salaryBase.cnameDis'),
            key: 'cnameDis',
//          width: 150,
//            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.salaryBase.empsalbsSalarysetDis'),
            key: 'empsalbsSalarysetDis',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.salaryBase.empsalbsPostlevelDis'),
            key: 'empsalbsPostlevelDis',
//          width: 150,
//            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.salaryBase.empsalbsSalarylevelDis'),
            key: 'empsalbsSalarylevelDis',
//          width: 150,
//            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.salaryBase.empsalbsTravellevelDis'),
            key: 'empsalbsTravellevelDis',
//          width: 150,
//            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.salaryBase.empsalbsAdminlevelDis'),
            key: 'empsalbsAdminlevelDis',
//          width: 150,
//            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 64,
            fixed: 'right',
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
                }, this.$t('button.view')),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        worknoDis: '',
        cnameDis: '',
        companyDis: '',
        companyDisName: '',
        deptDis: '',
        deptDisName: '',
      }
    },
    computed: {

    },
    components: {
      update,
      searchOrgCompany,
    },
    mounted() {
      this.getData(1)
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'empPayrollSalaryBase.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          logType: '查询List',
          worknoDis: t.worknoDis,
          cnameDis: t.cnameDis,
          companyDis: t.companyDis,
          deptDis: t.deptDis,
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
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        } else {
          this.order = 'desc'
        }
      },
      selectedtable(selection) {
        const newArr = []
      for (let i = 0; i < selection.length; i++) {
    newArr.push(selection[i].id)
  }
  this.tableselected = newArr.toString()
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
          t.$refs.update.getOption(id, logType)
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
      changeinput(name, id) {
        const t = this
        if (t.status === '1') {
          t.companyDisName = name
          t.companyDis = id
        } else if (t.status === '2') {
          t.deptDisName = name
          t.deptDis = id
        }
      },
      pickData(id) {
        const t = this
        if (id === '1') {
          t.$refs.searchOrgCompany.getData('01company')
        } else if (id === '2') {
          t.$refs.searchOrgCompany.getData('02dept')
        }
        t.status = id
        t.openPick = true
      },
      clearCompany(id) {
        const t = this
        if (id === '1') {
          t.companyDisName = ''
          t.companyDis = ''
        } else if (id === '2') {
          t.deptDisName = ''
          t.deptDis = ''
        }
      },
      closeCompany() {
        const t = this
        t.openPick = false
        t.$refs.searchOrgCompany.pmtypeCode = ''
        t.$refs.searchOrgCompany.type = ''
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
