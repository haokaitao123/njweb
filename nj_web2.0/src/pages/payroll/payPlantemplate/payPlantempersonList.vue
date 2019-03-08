<template>
  <div class="content-main">
    <Row>
      <Button type="primary" @click="showMsgBtn(NaN,'新增')">{{$t('button.add')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="data"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="params.page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <contentMsg v-show="showMsg" :logType="params.logType" @hideMsg="hideMsg" :id="id" :idname="idname" ref="contentMsg" @getData="getdata" @update="updateArray" ></contentMsg>
  </div>
</template>
<script>
  import contentMsg from './editPlantemperson'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        total: NaN,
        showMsg: false,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_payroll.payPlantemperson.pltpsEmpNo'),
            key: 'pltpsEmpNoDis',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payPlantemperson.pltpsEmpName'),
            key: 'pltpsEmpNameDis',
            width: 160,
          },
          {
            title: this.$t('lang_payroll.payPlantemperson.pltpsEmpCmp'),
            key: 'pltpsEmpCmpDis',
            width: 160,
          },
          {
            title: this.$t('lang_payroll.payPlantemperson.pltpsEmpDept'),
            key: 'pltpsEmpDeptDis',
            width: 160,
          },
          {
            title: this.$t('lang_payroll.payPlantemperson.pltpsIsmain'),
            key: 'pltpsIsmainDis',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payPlantemperson.pltpsResdesc'),
            key: 'pltpsResdesc',
            width: 160,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payPlantemperson.pltpsEmpstatus'),
            key: 'pltpsEmpstatusDis',
            width: 160,
            sortable: 'custom',
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
                      this.showMsgBtn(params.row.id, '修改', params.index)
                    },
                  },
                }, this.$t('button.upd')),
              ])
            },
          },
        ],
        data: [],
        params: {
          _mt: 'payPlantemperson.getPage',
          funId: '1',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          pltpsPlantpid: NaN,
          logType: '',
        },
        index: '',
        tableselected: '',
      }
    },
    props: {
      id: Number,
      idname: String,
    },
    components: {
      contentMsg,
    },
    methods: {
      get(id) {
        this.params.pltpsPlantpid = id + ''
        this.params.logType = '查询List信息'
        this.getdata()
      },
      getdata(page) {
        const t = this
        if (page) {
          t.params.page = page
        }
        const data = deepCopy(t.params)
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.total = res.data.content[0].records
            t.data = res.data.content[0].rows
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      pageChange(page) {
        const t = this
        t.params.page = page
        t.getdata()
      },
      sortable(column) {
        this.params.sort = column.key
        this.params.order = column.order
        if (this.params.order !== 'normal') {
          this.getdata()
        } else {
          this.params.order = 'desc'
        }
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
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
              // 添加请求模块
              getDataLevelUserLogin({
                _mt: 'payPlantemperson.delByIds',
                funId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getdata()
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
      sizeChange(size) {
        const t = this
        t.params.rows = size
        t.getdata()
      },
      showMsgBtn(id, logType, index) {
        const t = this
        t.showMsg = true
        t.index = index
        t.params.logType = logType
        t.$refs.contentMsg.setIdname(t.idname)
        if (logType === this.$t('button.upd')) {
          t.$refs.contentMsg.setRowId(id)
        }
      },
      addNewArray(res) {
        const t = this
        if (t.data.length === 0) {
          t.data.push(res)
        } else {
          t.data.unshift(res)
        }
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
      hideMsg() {
        this.showMsg = false
      },
    },
  }
</script>
<style lang="scss" scoped>
.content-main{
  height: 500px;
  .table-form{
    margin: 10px 0;
  }
}
</style>
