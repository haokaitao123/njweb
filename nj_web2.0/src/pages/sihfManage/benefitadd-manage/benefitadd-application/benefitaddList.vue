<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_sihfPolicy.sihfBenefitadd.title1')}}
        </p>
        <Row>
          <Select v-model="sibaBussource" clearable style="width: 160px;" :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaBussourceDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in bussourceType" :key="index">{{item.paramInfoCn}}</Option>
          </Select>
          <Input v-model="sibaEmpworkno"   style="width: 160px;" :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaEmpworkno')"></Input>
          <Input v-model="sibaCname"   style="width: 160px;" :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaCname')"></Input>
          <span @dblclick="dbHCompany">
               <Input v-model="sibaCompanyDis" style="width: 160px" icon="search" :readonly="true" :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaCompanyDis')"  @on-click="selectHCompany"/>
          </span>
          <span @dblclick="clearDepart">
               <Input v-model="sibaDeptDis" style="width: 160px" icon="search" :readonly="true" :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaDeptDis')"  @on-click="pickDepart"/>
          </span>
          <Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button>
          <Button type="primary" @click="handSubmit">{{$t('button.subm')}}</Button>
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
  import update from './benefitaddBase'
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
        openHCompany: false,
        openUpdate: false,
        openDept: false,
        updateId: NaN,
        bussourceType: [],
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
            key: 'compFnameCnDis',
          },
          {
            title: this.$t('lang_employee.searchColumn.departEnFullName'),
            key: 'compFnameEnDis',
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
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_sihfPolicy.sihfBenefitadd.sibaBussource'),
            key: 'sibaBussourceDis',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.sihfBenefitadd.sibaEmpworkno'),
            key: 'sibaEmpworkno',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.sihfBenefitadd.sibaCname'),
            key: 'sibaCname',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.sihfBenefitadd.sibaEmptype'),
            key: 'sibaEmptypeDis',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.sihfBenefitadd.sibaCompany'),
            key: 'sibaCompanyDis',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.sihfBenefitadd.sibaDept'),
            key: 'sibaDeptDis',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.sihfBenefitadd.sibaEntrydate'),
            key: 'sibaEntrydate',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.sihfBenefitadd.sibaBenefitlocation'),
            key: 'sibaBenefitlocationDis',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.sihfBenefitadd.sibaBenefitpolicy'),
            key: 'sibaBenefitpolicyDis',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.sihfBenefitadd.sibaBenefittype'),
            key: 'sibaBenefittypeDis',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.sihfBenefitadd.sibaStatus'),
            key: 'sibaStatusDis',
            width: 100,
            align: 'center',
            fixed: 'right',
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
                }, this.$t('button.upd')),
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
        sibaBussource: '',
        sibaCompany: '',
        sibaDept: '',
        sibaCompanyDis: '',
        sibaDeptDis: '',
        sibaEmpworkno: '',
        sibaCname: '',
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
          _mt: 'sihfBenefitadd.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: '查询List',
          sibaStatus: '\'01draft\'',
          sibaBussource: t.sibaBussource,
          sibaCompany: t.sibaCompany,
          sibaDept: t.sibaDept,
          sibaEmpworkno: t.sibaEmpworkno,
          sibaCname: t.sibaCname,
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
        t.sibaCompanyDis = name
        t.sibaCompany = id
      },
      dbHCompany() {
        const t = this
        t.sibaCompanyDis = ''
        t.sibaCompany = ''
      },
      // 选择部门
      pickDepart() {
        const t = this
        const paramsDept = deepCopy(t.paramsDept)
        t.$refs.searchDept.getData(paramsDept, t.sibaCompany)
        t.openDept = true
      },
      inputDept(name, id) {
        const t = this
        t.sibaDeptDis = name
        t.sibaDept = id
      },
      clearDepart() {
        const t = this
        t.sibaDeptDis = ''
        t.sibaDept = ''
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
          const data = {
            _mt: 'sihfBenefitadd.confirmCheck',
            funId: '1',
            logType: '查看是否已经初始化',
            id: t.tableselected.toString(),
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
                  content: this.$t('lang_sihfPolicy.sihfBenefitadd.sibaReminder1'),
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
          _mt: 'sihfBenefitadd.confirm',
          funId: '1',
          logType: '提交报增申请',
          id: t.tableselected.toString(),
          sibaStatus: '10confirm',
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
          typeCode: 'actiontype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.bussourceType = res.data.content[0].value[0].paramList.slice(0, 3)
          }
        }).catch(() => {
          this.$Modal.error({
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
