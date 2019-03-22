<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_payroll.payEnd.title3')}}
        </p>
        <Row>
      <!--    <Select v-model="pledBussource" clearable  style="width: 190px;" :placeholder="$t('lang_payroll.payEnd.pledBussourceDis')" >
            <Option :value="item.paramCode" v-for="(item,index) in bussourceType" :key="index">{{item.paramInfoCn}}</Option>
          </Select>-->
          <span @dblclick="dbHCompany">
               <Input v-model="pledCompanyDis" style="width: 190px" icon="search" :readonly="true" :placeholder="$t('lang_payroll.payEnd.pledCompanyDis')"  @on-click="selectHCompany"/>
          </span>
          <span @dblclick="clearDepart">
               <Input v-model="pledDeptDis" style="width: 190px" icon="search" :readonly="true" :placeholder="$t('lang_payroll.payEnd.pledDeptDis')"  @on-click="pickDepart"/>
          </span>
          <Input v-model="pledEmpworkno"   style="width: 190px;" :placeholder="$t('lang_payroll.payEnd.pledEmpworknoDis')"></Input>
          <Input v-model="pledCname"   style="width: 190px;" :placeholder="$t('lang_payroll.payEnd.pledCnameDis')"></Input>
          <Dropdown>
            <Button type="primary">
              {{select}}
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list" >
              <span v-for="(item,index) in Salhdstatus" :key="index" @click="selected(item.paramCode,item.paramInfoName)">
               <DropdownItem>{{item.paramInfoName}}</DropdownItem>
            </span>
            </DropdownMenu>
          </Dropdown>
          <Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button>
          <Button type="primary" v-show="pledStatus === '20toupd'?true:false" @click="handSubmit">{{$t('button.subm')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <!--雇佣公司-->
    <transition name="fade">
      <searchHCompany v-show="openHCompany" @closeHCompany="closeHCompany" :searchHCClo="searchHCClo" @inputHCompany="inputHCompany" :params="paramsHCompany" ref="searchHCompany"></searchHCompany>
    </transition>
    <transition name="fade">
      <searchDept v-show="openDept" @closeDept="closeDept" :searchDeptClo="searchDeptClo" @inputDept="inputDept" :params="paramsDept" ref="searchDept"></searchDept>
    </transition>
  </div>
</template>
<script>
  import update from './payEndBase'
  import searchHCompany from '../../../../components/searchTable/searchHCompany'
  import searchDept from '../../../../components/searchTable/searchDept'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  export default {
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        select: '已确认待更新',
        pledStatus: '20toupd',
        openHCompany: false,
        openUpdate: false,
        openDept: false,
        updateId: NaN,
        bussourceType: [],
        Salhdstatus: [],
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
            title: this.$t('lang_payroll.payEnd.pledBussource'),
            key: 'pledBussourceDis',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payEnd.pledEmpworkno'),
            key: 'pledEmpworkno',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payEnd.pledEmptype'),
            key: 'pledEmptypeDis',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payEnd.pledCname'),
            key: 'pledCname',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payEnd.pledCompany'),
            key: 'pledCompanyDis',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payEnd.pledDept'),
            key: 'pledDeptDis',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payEnd.pledTaxlocation'),
            key: 'pledTaxlocationDis',
            width: 160,
            //  sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payEnd.pledDimtype'),
            key: 'pledDimtypeDis',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payEnd.pledDimdate'),
            key: 'pledDimdate',
            width: 160,
            //  sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payEnd.pledSalaryset'),
            key: 'pledSalarysetDis',
            width: 160,
            // sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payEnd.pledStatus'),
            key: 'pledStatusDis',
            width: 100,
            fixed: 'right',
            align: 'center',
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
                      this.openUp(params.row.id, this.$t('button.view'), params.index)
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
        isInit: 0,
        pledBussource: '',
        pledCompany: '',
        pledDept: '',
        pledCompanyDis: '',
        pledDeptDis: '',
        pledEmpworkno: '',
        pledCname: '',
      }
    },
    computed: {

    },
    components: {
      update,
      searchHCompany,
      searchDept,
    },
    mounted() {
      this.getSelect()
      this.getData(1)
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'payEnd.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: '查询List',
          pledStatus: this.pledStatus,
          pledBussource: t.pledBussource,
          pledCompany: t.pledCompany,
          pledDept: t.pledDept,
          pledEmpworkno: t.pledEmpworkno,
          pledCname: t.pledCname,
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
        t.pledCompanyDis = name
        t.pledCompany = id
      },
      dbHCompany() {
        const t = this
        t.pledCompanyDis = ''
        t.pledCompany = ''
      },
      // 选择部门
      pickDepart() {
        const t = this
        const paramsDept = deepCopy(t.paramsDept)
        t.$refs.searchDept.getData(paramsDept, t.pledCompany)
        t.openDept = true
      },
      inputDept(name, id) {
        const t = this
        t.pledDeptDis = name
        t.pledDept = id
      },
      clearDepart() {
        const t = this
        t.pledDeptDis = ''
        t.pledDept = ''
      },
      closeDept() {
        const t = this
        t.$refs.searchDept.unitCode = ''
        t.openDept = false
      },
      // 提交
      handSubmit() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmSubmit'),
            onOk: () => {
              t.submit()
            },
            onCancel: () => {},
          })
        }
      },
      submit() {
        const t = this
        const data = {
          _mt: 'payEnd.updStatusByIds',
          funId: '1',
          logType: '提交薪资数据',
          id: t.tableselected.toString(),
          pledStatus: '30updated',
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
          typeCode: 'actiontype,salhdstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.bussourceType = res.data.content[0].value[0].paramList.slice(2)
            t.Salhdstatus = res.data.content[0].value[1].paramList.slice(2)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      selected(key, name) {
        this.select = name
        this.pledStatus = key
        this.getData()
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
        this.tableselected = newArr
      },
      // 修改
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        t.$refs.update.getOption(id, logType)
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
