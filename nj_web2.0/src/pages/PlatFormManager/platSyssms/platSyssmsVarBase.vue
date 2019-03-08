<template>
  <div class="content-main">
    <Row>
      <Button type="primary" @click="showMsgBtn(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
      <Button type="primary" @click="init">{{$t('button.ini')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="data"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <contentMsg v-show="showMsg" @hideMsg="hideMsg" :logType="logType" :id="id" ref="contentMsg" @getData="addNewArray" @update="updateArray" ></contentMsg>
  </div>
</template>
<script>
  import contentMsg from './editPlatSyssmsVar'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        total: NaN,
        showMsg: false,
        nameOrMobile: '',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_platdoc.platSyssmsVar.syssmsvarMark'),
            key: 'syssmsvarMark',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platSyssmsVar.syssmsvarName'),
            key: 'syssmsvarName',
          },
          {
            title: this.$t('lang_platdoc.platSyssmsVar.syssmsvarValdesc'),
            key: 'syssmsvarValdesc',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 80,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.showMsgBtn(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
              ])
            },
          },
        ],
        // 用于初始化变量
        syssmsContent: '',
        syssmsTo: '',
        syssmsSendcondition: '',
        data: [],
        params: {
          _mt: 'platSyssmsVar.getPage',
          funId: '1',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          syssmsvarSmsid: NaN,
          logType: '',
        },
        index: '',
        tableselected: '',
        logType: '',
      }
    },
    props: {
      id: Number,
    },
    components: {
      contentMsg,
    },
    methods: {
      get(id, content, syssmsTo, condition) {
        this.params.syssmsvarSmsid = id + ''
        this.params.logType = '查询List信息'
        this.syssmsContent = content
        this.syssmsTo = syssmsTo
        this.syssmsSendcondition = condition
        this.getdata()
      },
      getdata() {
        const t = this
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
              getDataLevelUserLogin({
                _mt: 'platSyssmsVar.delByIds',
                funId: '1',
                logType: this.$t('button.del'),
                ids: t.tableselected.toString(),
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
      init() {
        const t = this
        const data = {
          _mt: 'platSyssmsVar.initVar',
          funId: '1',
          logType: '初始化短信变量',
          id: this.params.syssmsvarSmsid,
          syssmsContent: this.syssmsContent,
          syssmsTo: this.syssmsTo,
          syssmsSendcondition: this.syssmsSendcondition,
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.getdata()
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
        t.params.rows = size
        t.getdata()
      },
      showMsgBtn(id, logType, index) {
        const t = this
        t.showMsg = true
        t.index = index
        t.logType = logType
//        t.$refs.contentMsg.setIdname(t.idname)
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
