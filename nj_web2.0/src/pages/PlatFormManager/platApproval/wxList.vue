<template>
  <div class="content-main">
    <Row>
      <Button type="primary" @click="openUp(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="$store.state.platApproval.childTable4"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <updWxDetail v-show="showMsg" @hideMsg="hideMsg" ref="updWxDetail" :logType="logType"></updWxDetail>
    <wxToList v-show="showConMsg" @hideMsg="hideConMsg" ref="wxToList" :logType="logType"></wxToList>
    <wxVar v-show="showVarMsg" @hideMsg="hideVarMsg" ref="wxVar"></wxVar>
  </div>
</template>
<script>

  import updWxDetail from './updWxDetail'
  import wxToList from './wxToList'
  import wxVar from './wxVar'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        logType: '',
        total: NaN,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        tableselected: [],
        showMsg: false,
        showConMsg: false,
        showVarMsg: false,
        columns: [
          {
            type: 'selection',
            width: 60,
//            align: 'center',
          },
          {
            title: this.$t('lang_approval.wxList.aprvwxOrder'),
            key: 'aprvwxOrder',
            width: 80,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_approval.wxList.aprvwxType'),
            key: 'aprvwxTypeDis',
            //          sortable: 'custom',
          },
          {
            title: this.$t('lang_approval.wxList.aprvwxContent'),
            key: 'aprvwxContent',
  //          sortable: 'custom',
          },
          {
            title: this.$t('lang_approval.wxList.aprvwxSendstyle'),
            key: 'aprvwxSendstyleDis',
//            align: 'center',
          },
          {
            title: this.$t('lang_approval.wxList.aprvwxReciever'),
            key: 'aprvwxReciever',
//            align: 'center',
          },
          {
            title: this.$t('lang_approval.wxList.aprvwxIsvalid'),
            key: 'aprvwxIsvalidDis',
//            align: 'center',
          },
          {
            title: this.$t('lang_approval.wxList.action'),
            key: 'action',
            width: 100,
//            align: 'center',
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.showContact(params.row.id, params.index)
                    },
                  },
                }, this.$t('lang_approval.wxList.aprvwxReciever')),
              ])
            },
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            align: 'center',
            width: 128,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '3px',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '3px',
                  },
                  on: {
                    click: () => {
                      this.vindicateVar(params.row.id, params.index)
                    },
                  },
                }, this.$t('lang_approval.wxList.variab')),
              ])
            },
          },
        ],
      }
    },
    components: {
      updWxDetail,
      wxToList,
      wxVar,
    },
    methods: {
      getdata(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'platAprvwx.getPage',
          funId: '1',
          logType: this.$t('button.ser'),
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          aprvwxAprvid: t.$store.state.platApproval.mainId,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              t.$store.commit('platApproval/setChildTable4', res.data.content[0].rows)
              t.total = res.data.content[0].records
            } else {
              t.$store.commit('platApproval/setChildTable4', [])
            }
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
        t.getdata()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getdata()
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getdata()
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
                _mt: 'platAprvwx.delByIds',
                funId: '1',
                companyId: '1',
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
      showMsgBtn() {
        this.showMsg = true
      },
      openUp(id, logType, index) {
        const t = this
        t.showMsg = true
        t.logType = logType
        t.$store.commit('platApproval/setIndex', index)
        t.$store.commit('platApproval/setChildId4', id)
        if (id) {
          t.$refs.updWxDetail.getFormData(id)
        }
      },
      hideMsg() {
        this.showMsg = false
      },
      showContact(id, index) {
        const t = this
        t.showConMsg = true
        t.$store.commit('platApproval/setIndex', index)
        t.$store.commit('platApproval/setChildId4', id)
        t.$refs.wxToList.getdata(id)
      },
      hideConMsg() {
        this.getdata()
        this.showConMsg = false
      },
      hideVarMsg() {
        this.showVarMsg = false
      },
      vindicateVar(id, index) {
        const t = this
        t.showVarMsg = true
        t.$store.commit('platApproval/setIndex', index)
        t.$store.commit('platApproval/setChildId4', id)
        if (id) {
          t.$refs.wxVar.getdata()
        }
      },
      hideVarMsg() {
        this.showVarMsg = false
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
