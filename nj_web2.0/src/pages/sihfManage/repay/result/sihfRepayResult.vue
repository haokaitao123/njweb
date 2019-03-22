<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_repayApply.sihfRepay.title3')}}
        </p>
        <Row>
             <span @dblclick="dbHCompany">
               <Input v-model="sirpCompanyDis" style="width: 160px" icon="search" :readonly="true"
                      :placeholder="$t('lang_repayApply.sihfRepay.sirpCompanyPrompt')" @on-click="selectHCompany"/>
          </span>
          <span @dblclick="clearDepart">
               <Input v-model="sirpDeptDis" style="width: 160px" icon="search" :readonly="true"
                      :placeholder="$t('lang_repayApply.sihfRepay.sirpDeptPrompt')" @on-click="pickDepart"/>
          </span>
          <Input :placeholder="$t('lang_repayApply.sihfRepay.sirpCnamePrompt')" style="width: 160px"
                 v-model="sirpCname"/>
          <Input :placeholder="$t('lang_repayApply.sihfRepay.sirpEmpworknoPrompt')" style="width: 160px"
                 v-model="sirpEmpworkno"/>
          <Dropdown>
            <Button type="primary">
              {{select}}
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list">
                <span @click="selected('all',$t('button.all'))">
                  <DropdownItem name="">{{$t('button.all')}}</DropdownItem>
                </span>
              <span v-for="(item,index) in sihfstatus" :key="index"
                    @click="selected(item.paramCode,item.paramInfoCn)">
                  <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                </span>
            </DropdownMenu>
          </Dropdown>
          <span style="margin: 0;">
            <Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button>
          </span>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small"
                 border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">
          <Page :current="page" :total="total" size="small" show-elevator show-sizer placement="top"
                @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]"></Page>
          <Button type="ghost" size="small" shape="circle" icon="refresh"
                  style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" @closeUp="closeUp" ref="update" @getData="addNewArray" @update="updateArray"></update>
    </transition>
    <!--雇佣公司-->
    <transition name="fade">
      <searchHCompany v-show="openHCompany" @closeHCompany="closeHCompany" :searchHCClo="searchHCClo"
                      @inputHCompany="inputHCompany" :params="paramsHCompany" ref="searchHCompany"></searchHCompany>
    </transition>
    <transition name="fade">
      <searchDept v-show="openDept" @closeDept="closeDept" :searchDeptClo="searchDeptClo" @inputDept="inputDept"
                  :params="paramsDept" ref="searchDept"></searchDept>
    </transition>
    <transition name="fade">
      <declareFair v-show="openFairReason" @getData="getData" @closeUp01="closeFair" ref="declareFair"></declareFair>
    </transition>
  </div>
</template>
<script>
  import update from './repayResultBase'
  import declareFair from './deFair'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../../axios/axios'
  import {isSuccess, deepCopy} from '../../../../lib/util'
  import searchHCompany from '../../../../components/searchTable/searchHCompany'
  import searchDept from '../../../../components/searchTable/searchDept'

  export default {
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        select: this.$t('lang_repayApply.base.select'),
        value: '',
        logType: '',
        paramName: '',
        openUpdate: false,
        openHCompany: false,
        openDept: false,
        openFairReason: false,
        updateId: NaN,
        sihfstatus: [],
        tableselected: [],
        //      部门
        searchDeptClo: [
          {
            title: this.$t('lang_employee.searchColumn.unitCodeDepart'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.departCnFullName'),
            key: 'unitsFname',
          },
        ],
        paramsDept: {
          _mt: 'orgUnits.getByOrgFramePageList',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'desc',
          funId: '1106',
          logType: '部门',
          unitType: '02dept',
        },
        //      雇佣公司
        searchHCClo: [
          {
            title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.compCnFullName'),
            key: 'unitsFname',
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
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_repayApply.sihfRepay.sirpCompany'),
            key: 'sirpCompanyDis',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_repayApply.sihfRepay.sirpDept'),
            key: 'sirpDeptDis',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_repayApply.sihfRepay.sirpCname'),
            key: 'sirpCname',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_repayApply.sihfRepay.sirpEmpworkno'),
            key: 'sirpEmpworkno',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_repayApply.sihfRepay.sirpEmpgid'),
            key: 'sirpEmpgid',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_repayApply.sihfRepay.sirpIdtype'),
            key: 'sirpIdtypeDis',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_repayApply.sihfRepay.sirpIdno'),
            key: 'sirpIdno',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_repayApply.sihfRepay.sirpEmptype'),
            key: 'sirpEmptypeDis',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_repayApply.sihfRepay.sirpBenefitlocation'),
            key: 'sirpBenefitlocationDis',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_repayApply.sihfRepay.sirpBenefitpolicy'),
            key: 'sirpBenefitpolicyDis',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_repayApply.sihfRepay.sirpBenefittype'),
            key: 'sirpBenefittypeDis',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_repayApply.sihfRepay.sirpSmonth'),
            key: 'sirpSmonth',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_repayApply.sihfRepay.sirpEmonth'),
            key: 'sirpEmonth',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_repayApply.sihfRepay.sirpStatus'),
            key: 'sirpStatusDis',
            width: 150,
            fixed: 'right',
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 230,
            fixed: 'right',
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
                      this.openUp(params.row.id, params.row.sirpEmpgid, this.$t('button.ser'), params.index)
                    },
                  },
                }, this.$t('button.ser')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    display: this.sirpStatus === '20declare' ? 'inline' : 'none',
                  },
                  on: {
                    click: () => {
                      this.declare(params.row,  this.$t('lang_repayApply.base.declare'), params.index)
                    },
                  },
                },  this.$t('lang_repayApply.base.declare')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    display: this.sirpStatus === '20declare' ? 'inline' : 'none',
                  },
                  on: {
                    click: () => {
                      this.declare(params.row, this.$t('lang_repayApply.base.declaref'), params.index)
                    },
                  },
                }, this.$t('lang_repayApply.base.declaref')),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        sirpCompany: '',
        sirpCompanyDis: '',
        sirpCname: '',
        sirpEmpworkno: '',
        sirpDept: '',
        sirpDeptDis: '',
        sirpStatus: '20declare',
      }
    },
    computed: {},
    components: {
      update,
      searchHCompany,
      searchDept,
      declareFair,
    },
    mounted() {
      this.getData(1)
      this.getSelect()
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'sihfRepay.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          logType: '查询List',
          sirpCompany: t.sirpCompany,
          sirpCname: t.sirpCname,
          sirpEmpworkno: t.sirpEmpworkno,
          sirpDeptDis: t.sirpDeptDis,
          sirpStatus: t.sirpStatus,
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
      openUp(id, empbntEmpid, logType, index) {
        const t = this
        t.openUpdate = true
//      将本条数据的id传入mainid（如果有的话）
        this.$store.commit('repayResult/setMainId', id)
        this.$store.commit('repayResult/setIndex', index)
        this.$store.commit('repayResult/setChildId1', empbntEmpid)
        this.$store.commit('repayResult/setInsuranceId', id)
        if (id) {
          t.$refs.update.getOptionData()
        }
        t.$refs.update.getOption(logType)
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.clear()
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      updateArray(res) {
        const t = this
        t.index = this.$store.state.repayResult.index
        t.data.splice(t.index, 1, res)
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
        t.sirpCompanyDis = name
        t.sirpCompany = id
      },
      dbHCompany() {
        const t = this
        t.sirpCompanyDis = ''
        t.sirpCompany = ''
      },
      // 选择部门
      pickDepart() {
        const t = this
        const paramsDept = deepCopy(t.paramsDept)
        t.$refs.searchDept.getData(paramsDept, t.sirpCompany)
        t.openDept = true
      },
      inputDept(name, id) {
        const t = this
        t.sirpDeptDis = name
        t.sirpDept = id
      },
      clearDepart() {
        const t = this
        t.sirpDeptDis = ''
        t.sirpDept = ''
      },
      closeDept() {
        const t = this
        t.$refs.searchDept.unitCode = ''
        t.openDept = false
      },
      // 申报成功
      declare(row, logType, index) {
        const t = this
        t.$store.commit('repayResult/setMainId', row.id)
        if (row.sirpStatus === '30success' || row.sirpStatus === '40fail') {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('lang_repayApply.base.declarefw'),
          })
        } else {
          if (logType === this.$t('lang_repayApply.base.declare')) {
            t.$Modal.confirm({
              title: this.$t('reminder.remind'),
              content: this.$t('lang_repayApply.base.declarefw2'),
              onOk: () => {
                t.submit(row.id, "30success")
              },
              onCancel: () => {
              },
            })
          } else {

            t.openFairReason = true
          }
        }
      },
      closeFair() {
        const t = this
        t.openFairReason = false
      },
      // 提交
      submit(id, status) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'sihfRepay.updStatus',
          logType: '申请提交',
          ids: id,
          status: status,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.getData(1)
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.addsuccess'),
            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      selected(key, name) {
        if ('all' === key) {
          this.sirpStatus = '20declare,30success,40fail'
        } else {
          this.sirpStatus = key
        }
        this.select = name
        this.getData(1)
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'sihfstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.sihfstatus = res.data.content[0].value[0].paramList.slice(2)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form {
    margin: 10px 0;
  }

  .margin-right-10 {
    margin-right: 10px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
