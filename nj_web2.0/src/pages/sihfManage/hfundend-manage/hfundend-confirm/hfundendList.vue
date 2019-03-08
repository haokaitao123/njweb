<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_sihfPolicy.hfundend.title2')}}
        </p>
        <Row>
          <Select v-model="sihfeBussource"   style="width: 160px;" :placeholder="$t('lang_sihfPolicy.hfundend.sihfeBussourceDis')" >
            <Option :value="item.paramCode" v-for="(item,index) in bussourceType" :key="index">{{item.paramInfoCn}}</Option>
          </Select>
          <Input v-model="sihfeEmpworkno" style="width: 160px;" :placeholder="$t('lang_sihfPolicy.hfundend.sihfeEmpworknoDis')"></Input>
          <Input v-model="sihfeCname"   style="width: 160px;" :placeholder="$t('lang_sihfPolicy.hfundend.sihfeCnameDis')"></Input>
          <span @dblclick="dbHCompany">
               <Input v-model="sihfeCompanyDis" style="width: 160px" icon="search" :readonly="true" :placeholder="$t('lang_sihfPolicy.hfundend.sihfeCompanyDis')"  @on-click="selectHCompany"/>
          </span>
          <span @dblclick="clearDepart">
               <Input v-model="sihfeDeptDis" style="width: 160px" icon="search" :readonly="true" :placeholder="$t('lang_sihfPolicy.hfundend.sihfeDeptDis')" @on-click="pickDepart"/>
          </span>
          <Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button>
          <Button type="primary" @click="openConfirm">{{$t('button.confirm')}}</Button>
          <Button type="primary" @click="handSubmit">{{$t('button.subm')}}</Button>
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
    <transition name="fade">
      <confirm v-show="confirm" :ids="tableselected.toString()" @resetTableselected="resetTableselected" @closeConfirm="closeConfirm" @getData="getData" ref="confirm"></confirm>
    </transition>
  </div>
</template>
<script>
  import confirm from './isOrNotConfirm'
  import update from './hfundendBase'
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
        confirm: false,
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
            title: this.$t('lang_sihfPolicy.hfundend.sihfeBussource'),
            key: 'sihfeBussourceDis',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.hfundend.sihfeEmpworkno'),
            key: 'sihfeEmpworkno',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.hfundend.sihfeCname'),
            key: 'sihfeCname',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.hfundend.sihfeEmptype'),
            key: 'sihfeEmptypeDis',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.hfundend.sihfeCompany'),
            key: 'sihfeCompanyDis',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.hfundend.sihfeDept'),
            key: 'sihfeDeptDis',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.hfundend.sihfeLastemployday'),
            key: 'sihfeLastemployday',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.hfundend.sihfeHfundlocation'),
            key: 'sihfeHfundlocationDis',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.hfundend.sihfeHfundpolicy'),
            key: 'sihfeHfundpolicyDis',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.hfundend.sihfeHfundtype'),
            key: 'sihfeHfundtypeDis',
            width: 160,
          },
          {
            title: this.$t('lang_sihfPolicy.hfundend.sihfeIsconfirm'),
            key: 'sihfeIsconfirmDis',
            width: 100,
            fixed: 'right',
            align: 'center',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 128,
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
        sihfeBussource: '',
        sihfeCompany: '',
        sihfeDept: '',
        sihfeCompanyDis: '',
        sihfeDeptDis: '',
        sihfeEmpworkno: '',
        sihfeCname: '',
      }
    },
    computed: {

    },
    components: {
      update,
      searchHCompany,
      searchDept,
      confirm,
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
          _mt: 'sihfHfundend.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: '查询List',
          sihfeStatus: '\'10confirm\'',
          sihfeBussource: t.sihfeBussource,
          sihfeCompany: t.sihfeCompany,
          sihfeDept: t.sihfeDept,
          sihfeEmpworkno: t.sihfeEmpworkno,
          sihfeCname: t.sihfeCname,
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
        t.sihfeCompanyDis = name
        t.sihfeCompany = id
      },
      dbHCompany() {
        const t = this
        t.sihfeCompanyDis = ''
        t.sihfeCompany = ''
      },
      // 选择部门
      pickDepart() {
        const t = this
        const paramsDept = deepCopy(t.paramsDept)
        t.$refs.searchDept.getData(paramsDept, t.sihfeCompany)
        t.openDept = true
      },
      inputDept(name, id) {
        const t = this
        t.sihfeDeptDis = name
        t.sihfeDept = id
      },
      clearDepart() {
        const t = this
        t.sihfeDeptDis = ''
        t.sihfeDept = ''
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
            _mt: 'sihfHfundend.checkIsConfirm',
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
                  content: this.$t('lang_sihfPolicy.sihfBenefitadd.notInit'),
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
          _mt: 'sihfHfundend.confirm',
          funId: '1',
          logType: '提交薪资数据',
          id: t.tableselected.toString(),
          sihfeStatus: '20declare',
        }
        getDataLevelUserLoginNew(data).then((res) => {
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
            t.bussourceType = res.data.content[0].value[0].paramList.slice(2)
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
