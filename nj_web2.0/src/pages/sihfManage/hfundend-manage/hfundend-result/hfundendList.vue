<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_sihfPolicy.hfundend.title3')}}
        </p>
        <Row>
          <Select v-model="sihfeBussource"   style="width: 160px;" :placeholder="$t('lang_sihfPolicy.hfundend.sihfeBussourceDis')" >
            <Option :value="item.paramCode" v-for="(item,index) in bussourceType" :key="index">{{item.paramInfoCn}}</Option>
          </Select>
          <Input v-model="sihfeEmpworkno"   style="width: 160px;" :placeholder="$t('lang_sihfPolicy.hfundend.sihfeEmpworknoDis')"></Input>
          <Input v-model="sihfeCname"   style="width: 160px;" :placeholder="$t('lang_sihfPolicy.hfundend.sihfeCnameDis')"></Input>
          <span @dblclick="dbHCompany">
               <Input v-model="sihfeCompanyDis" style="width: 160px" icon="search" :readonly="true" :placeholder="$t('lang_sihfPolicy.hfundend.sihfeCompanyDis')"  @on-click="selectHCompany"/>
          </span>
          <span @dblclick="clearDepart">
               <Input v-model="sihfeDeptDis" style="width: 160px" icon="search" :readonly="true" :placeholder="$t('lang_sihfPolicy.hfundend.sihfeDeptDis')" @on-click="pickDepart"/>
          </span>
          <Dropdown>
            <Button type="primary">
              {{select}}
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list" >
                <span @click="selected('20declare\',\'30success\',\'40fail',$t('button.all'))">
                  <DropdownItem name="">{{$t('button.all')}}</DropdownItem>
                </span>
              <span v-for="(item,index) in Sihfstatus" :key="index" @click="selected(item.paramCode,item.paramInfoCn)">
                  <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                </span>
            </DropdownMenu>
          </Dropdown>
          <Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button>
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
      <declareFair v-show="openFairReason" :data="form" @getData="getData" @closeUp01="closeUp01" ref="declareFair"></declareFair>
    </transition>
  </div>
</template>
<script>
  import declareFair from './declareFair'
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
        select: this.$t('lang_sihfPolicy.sihfBenefitend.sibeload'),
        openHCompany: false,
        openUpdate: false,
        openDept: false,
        openFairReason: false,
        updateId: NaN,
        bussourceType: [],
        Sihfstatus: [],
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
            key: 'unitFname',
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
            key: 'unitFname',
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
            title: this.$t('lang_sihfPolicy.hfundend.sihfeStatus'),
            key: 'sihfeStatusDis',
            width: 100,
            fixed: 'right',
            align: 'center',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 220,
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
                    display: this.sihfeStatus === '\'20declare\'' ? 'inline' : 'none',
                  },
                  on: {
                    click: () => {
                      this.declareSucc(params.row.id, this.$t('lang_sihfPolicy.hfundend.declareSucc'), params.index)
                    },
                  },
                }, this.$t('lang_sihfPolicy.hfundend.declareSucc')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    display: this.sihfeStatus === '\'20declare\'' ? 'inline' : 'none',
                  },
                  on: {
                    click: () => {
                      this.declareFair(params.row.id, this.$t('lang_sihfPolicy.hfundend.declareFair'), params.index)
                    },
                  },
                }, this.$t('lang_sihfPolicy.hfundend.declareFair')),
              ])
            },
          },
        ],
        params: {
          _mt: 'sihfHfundend.getById',
          funId: '1',
        },
        data: [],
        form: {},
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
        sihfeStatus: '\'20declare\'',
      }
    },
    computed: {

    },
    components: {
      update,
      searchHCompany,
      searchDept,
      declareFair,
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
          sihfeStatus: t.sihfeStatus,
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
      selected(key, name) {
        this.select = name
        this.sihfeStatus = '\'' + key + '\''
        this.getData()
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
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'actiontype,sihfstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.bussourceType = res.data.content[0].value[0].paramList.slice(2)
            t.Sihfstatus = res.data.content[0].value[1].paramList.slice(2)
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
      // 申报成功
      declareSucc(id, logType, index) {
        const t = this
        t.params.id = id
        t.params.logType = '根据id查询数据'
        getDataLevelUserLogin(t.params).then((res) => {
          if (isSuccess(res, t)) {
            t.form = res.data.content[0]
            if (t.form.sihfeStatus === '30success' || t.form.sihfeStatus === '40fail') {
              t.$Modal.warning({
                title: this.$t('reminder.remind'),
                content: this.$t('lang_sihfPolicy.hfundend.sihfeReminder2'),
              })
            } else {
              t.confirmSuccess(id, logType, index)
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      confirmSuccess(id, logType, index) {
        const t = this
        const data = deepCopy(t.form)
        data._mt = 'sihfHfundend.confirm'
        data.logType = 'logType'
        data.id = id
        data.sihfeStatus = '30success'
        t.$Modal.confirm({
          title: this.$t('reminder.remind'),
          content: this.$t('lang_sihfPolicy.sihfBenefitadd.isDeclareSuccess'),
          onOk: () => {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: this.$t('lang_sihfPolicy.hfundend.declareSucc'),
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
          onCancel: () => {},
        })
      },
      // 申报失败
      declareFair(id, logType, index) {
        const t = this
        t.params.id = id
        t.params.logType = '根据id查询数据'
        getDataLevelUserLogin(t.params).then((res) => {
          if (isSuccess(res, t)) {
            t.form = res.data.content[0]
            if (t.form.sihfeStatus === '30success' || t.form.sihfeStatus === '40fail') {
              t.$Modal.warning({
                title: this.$t('reminder.remind'),
                content: this.$t('lang_sihfPolicy.hfundend.sihfeReminder2'),
              })
            } else {
              t.confirmFair(id, logType, index)
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      confirmFair(id, logType, index) {
        const t = this
        t.form.id = id
        t.form.logType = logType
        t.openFairReason = true
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
      closeUp01() {
        const t = this
        t.openFairReason = false
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
