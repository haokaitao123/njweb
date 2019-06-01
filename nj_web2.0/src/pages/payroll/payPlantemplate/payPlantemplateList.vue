<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_payroll.payPlantemplate.title')}}
        </p>
        <Row>
          <Select v-model="pltpYear"  clearable style="width: 130px;margin: 0px 5px 0px 0px;" :placeholder="$t('lang_payroll.payPlantemplate.pltpYearDis')" >
              <Option :value="item.fyYear" v-for="(item,index) in PltpYearType" :key="index">{{item.fyYear}}</Option>
          </Select>
          <Select v-model="pltpSalset" clearable  style="width: 130px;" :placeholder="$t('lang_payroll.payPlantemplate.pltpSalsetDis')" >
            <Option :value="item.id" v-for="(item,index) in SalsetType" :key="index">{{item.payssCN}}</Option>
          </Select>
          <Select v-model="pltpTasktype" clearable style="width: 130px;" :placeholder="$t('lang_payroll.payPlantemplate.pltpTasktypeDis')">
            <Option :value="item.paramCode" v-for="(item,index) in Tasktype" :key="index">{{item.paramInfoCn}}</Option>
          </Select>
          <Select v-model="pltpIskey" clearable  style="width: 130px;" :placeholder="$t('lang_payroll.payPlantemplate.pltpIskeyDis')">
            <Option :value="item.paramCode" v-for="(item,index) in YesOrNoType" :key="index">{{item.paramInfoCn}}</Option>
          </Select>
          <Input v-model="pltpTaskshort" clearable  style="width: 130px;" :placeholder="$t('lang_payroll.payPlantemplate.pltpTaskshortDis')"></Input>
          <span style="margin: 5px;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
          <Button type="primary" @click="copyrows">{{$t('button.cop')}}</Button>
          <Button type="primary" @click="checkRows">{{$t('button.cek')}}</Button>
          <Button type="primary" @click="expData">{{$t('button.exp')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @setSelectValue="setSelectValue"
              @setSelectValue02="setSelectValue02"  @setSelectValue03="setSelectValue03" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition >
      <expwindow v-show="openExp" :id="tableselected" @setFileKey="setFileKey" :logType="logType"  :index="index" @closeExp="closeExp" ref="expwindow"></expwindow>
    </transition>
    <transition >
      <expdow v-show="openExpDow" :filekey="filekey" :filename="filename"  @closeExpDowMain="closeExpDowMain" ref="expdow"></expdow>
    </transition>
  </div>
</template>
<script>
  import update from './payPlantemplateBase'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import expwindow from '../../../components/fileOperations/expSms'
  import expdow from '../../../components/fileOperations/expdow'

  export default {
    data() {
      return {
        expDataTital: [
          { code: 'pltpYear', name: this.$t('lang_payroll.payPlantemplate.pltpYear') },
          { code: 'pltpSalsetDis', name: this.$t('lang_payroll.payPlantemplate.pltpSalset') },
          { code: 'pltpTaskshort', name: this.$t('lang_payroll.payPlantemplate.pltpTaskshort') },
          { code: 'pltpTaskname', name: this.$t('lang_payroll.payPlantemplate.pltpTaskname') },
          { code: 'pltpTaskdesc', name: this.$t('lang_payroll.payPlantemplate.pltpTaskdesc') },
          { code: 'pltpIskeyDis', name: this.$t('lang_payroll.payPlantemplate.pltpIskey') },
          { code: 'pltpTasktypeDis', name: this.$t('lang_payroll.payPlantemplate.pltpTasktype') },
          { code: 'pltpTaskday', name: this.$t('lang_payroll.payPlantemplate.pltpTaskday') },
          { code: 'pltpersonDis', name: this.$t('lang_payroll.payPlantemplate.pltperson') },
          { code: 'pltpSpecdate', name: this.$t('lang_payroll.payPlantemplate.pltpSpecdate') },
          { code: 'pltpNonworkruleDis', name: this.$t('lang_payroll.payPlantemplate.pltpNonworkrule') },
          { code: 'pltpTime', name: this.$t('lang_payroll.payPlantemplate.pltpTime') },
          { code: 'pltpComment', name: this.$t('lang_payroll.payPlantemplate.pltpComment') },
        ],
        openExpDow: false,
        openExp: false,
        filekey: '',
        filename: '',
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
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
            title: this.$t('lang_payroll.payPlantemplate.pltpYear'),
            key: 'pltpYear',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payPlantemplate.pltpSalset'),
            key: 'pltpSalsetDis',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payPlantemplate.pltpTaskshort'),
            key: 'pltpTaskshort',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payPlantemplate.pltpIskey'),
            key: 'pltpIskeyDis',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payPlantemplate.pltpTasktype'),
            key: 'pltpTasktypeDis',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payPlantemplate.pltpTaskday'),
            key: 'pltpTaskday',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payPlantemplate.pltperson'),
            key: 'pltpersonDis',
            width: 160,
          },
          {
            title: this.$t('lang_payroll.payPlantemplate.pltpSpecdate'),
            key: 'pltpSpecdate',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payPlantemplate.pltpNonworkrule'),
            key: 'pltpNonworkruleDis',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payPlantemplate.pltpTime'),
            key: 'pltpTime',
            width: 160,
            sortable: 'custom',
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
        order: 'asc',
        rows: 10,
        page: 1,
        YesOrNoType: [],
        Tasktype: [],
        SalsetType: [],
        PltpYearType: [],
        pltpYear: '',
        pltpSalset: '',
        pltpTaskshort: '',
        pltpIskey: '',
        pltpTasktype: '',
      }
    },
    computed: {

    },
    components: {
      update,
      expwindow,
      expdow,
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
          _mt: 'payPlantemplate.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: '查询List',
          pltpYear: t.pltpYear,
          pltpSalset: t.pltpSalset,
          pltpTaskshort: t.pltpTaskshort,
          pltpIskey: t.pltpIskey,
          pltpTasktype: t.pltpTasktype,
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
      expData() {
        const t = this
        const data = {
          pltpYear: t.pltpYear,
          pltpSalset: t.pltpSalset,
          pltpTaskshort: t.pltpTaskshort,
          pltpIskey: t.pltpIskey,
          pltpTasktype: t.pltpTasktype,
        }
        this.$refs.expwindow.getData(t.expDataTital, 'payPlantemplate.export', data)
        this.openExp = true
      },
      closeExp() {
        const t = this
        t.openExp = false
      },
      closeExpDowMain() {
        const t = this
        t.openExpDow = false
      },
      setFileKey(filekey, filename, openExpDow) {
        const t = this
        t.filekey = filekey
        t.filename = filename
        t.openExpDow = openExpDow
        t.$refs.expdow.getPriToken(t.filekey)
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
      setSelectValue(yesOrNo, task) {
        this.YesOrNoType = yesOrNo
        this.Tasktype = task
      },
      setSelectValue02(salset) {
        this.SalsetType = salset
      },
      setSelectValue03(year) {
        this.PltpYearType = year
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
                _mt: 'payPlantemplate.delByIds',
                funId: '1',
                companyId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
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
        }
      },
      copyrows() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmCopy'),
            onOk: () => {
              getDataLevelUserLogin({
                _mt: 'payPlantemplate.copyRows',
                logType: '复制数据',
                ids: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
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
        }
      },
      checkRows() {
        const t = this
        if (!t.pltpYear || !t.pltpSalset) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_payroll.payPlantemplate.pltpReminder01'),
          })
        } else {
          const data = {
            _mt: 'payPlantemplate.checkRows',
            funId: '1',
            logType: '检查数据',
            pltpYear: t.pltpYear,
            pltpSalset: t.pltpSalset,
          }
          getDataLevelUserLoginNew(data).then((res) => {
            if (isSuccess(res, t)) {
              let resStr = ''
              let resCode = res.data.content[0].value
              for (let i = 0; i < resCode.length; i++) {
                resStr += (i + 1) + '.' + resCode[i] + '<br/>'
              }
              if (resStr) {
                t.$Modal.warning({
                  title: this.$t('reminder.err'),
                  content: '<p style="color: red;">' + resStr + '</p>',
                })
              } else {
                t.$Modal.success({
                  title: this.$t('reminder.rig'),
                  content: this.$t('reminder.dataRational'),
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
        t.$refs.update.clear()
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
