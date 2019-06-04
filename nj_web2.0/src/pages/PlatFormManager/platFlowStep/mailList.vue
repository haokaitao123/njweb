<template>
  <div class="content-main">
    <Row>
      <Button type="primary" @click="openUp(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="$store.state.flowStepData.childTable3"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator :current="page" show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=[rows] :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <updMailDetail v-show="showMsg" @hideMsg="hideMsg" ref="updMailDetail" :logType="logType"></updMailDetail>
    <chosedContact v-show="showConMsg" @hideMsg="hideConMsg" ref="chosedContact" :logType="logType"></chosedContact>
    <mailAttachList v-show="showAttachMsg" @hideMsg="hideAttachMsg" ref="mailAttachList"></mailAttachList>
    <mailVar v-show="showVarMsg" @hideMsg="hideVarMsg" ref="mailVar"></mailVar>
  </div>
</template>
<script>

  import updMailDetail from './updMailDetail'
  import chosedContact from './chosedContact'
  import mailAttachList from './mailAttachList'
  import mailVar from './mailVar'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        logType: '',
        conttype: '',
        total: NaN,
        sort: 'flsmlOrder',
        order: 'asc',
        rows: 20,
        page: 1,
        showMsg: false,
        showConMsg: false,
        showAttachMsg: false,
        showVarMsg: false,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_flow.mail.flsmlOrder'),
            key: 'flsmlOrder',
            width: 80,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_flow.mail.flsmlObject'),
            key: 'flsmlObject',
//            width: 220,
//            align: 'center',
          },
          {
            title: this.$t('lang_flow.mail.flsmlSendstyle'),
            key: 'flsmlSendstyleDis',
//            width: 150,
//            align: 'center',
          },
          {
            title: this.$t('lang_flow.mail.flsmlIsvalid'),
            key: 'flsmlIsvalidDis',
//            width: 80,
//            align: 'center',
          },
          {
            title: this.$t('lang_flow.mail.flsmlReciever'),
            key: 'flsmlReciever',
//            width: 80,
//            align: 'center',
          },
          {
            title: this.$t('lang_flow.mail.flsmlCC'),
            key: 'flsmlCC',
//            width: 80,
//            align: 'center',
          },
          {
            title: this.$t('lang_flow.mail.flsmlRandCC'),
            key: 'action',
            width: 150,
            align: 'center',
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
                      this.showContact(params.row.id, '01to', params.index)
                    },
                  },
                }, this.$t('lang_flow.mail.flsmlReciever')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.showContact(params.row.id, '02cc', params.index)
                    },
                  },
                }, this.$t('lang_flow.mail.flsmlCC')),
              ])
            },
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            align: 'center',
            width: 180,
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
                }, this.$t('lang_flow.mail.flsmlVar')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                     this.showAttachtact(params.row.id, params.index)
                    },
                  },
                }, this.$t('lang_flow.mail.flsmlAttach')),
              ])
            },
          },
        ],
      }
    },
    components: {
      updMailDetail,
      chosedContact,
      mailAttachList,
      mailVar,
    },
    methods: {
      getdata(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'platFlsMail.getPage',
          funId: '1',
          logType: this.$t('button.ser'),
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          flsmlStep: t.$store.state.flowStepData.mainId,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              this.$store.commit('flowStepData/setChildTable3', res.data.content[0].rows)
              t.total = res.data.content[0].records
            } else {
              this.$store.commit('flowStepData/setChildTable3', [])
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
                _mt: 'platFlsMail.delByIds',
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
      showMsgBtn() {
        this.showMsg = true
      },
      openUp(id, logType, index) {
        const t = this
        t.showMsg = true
        t.logType = logType
//      将本条数据的id传入mainid（如果有的话）
        this.$store.commit('flowStepData/setIndex', index)
        t.$store.commit('flowStepData/setChildId3', id)
        if (id) {
          t.$refs.updMailDetail.getFormData(id)
        }
      },
      hideMsg() {
        this.showMsg = false
      },
      showContact(id, conttype, index) {
        const t = this
        t.showConMsg = true
        this.$store.commit('flowStepData/setIndex', index)
          t.$refs.chosedContact.getdata(id, conttype)
          t.$store.commit('flowStepData/setChildId3', id)
      },
      hideConMsg() {
        this.getdata()
        this.showConMsg = false
      },
      showAttachtact(id, index) {
        const t = this
        t.showAttachMsg = true
        this.$store.commit('flowStepData/setIndex', index)
        t.$store.commit('flowStepData/setChildId3', id)
        t.$refs.mailAttachList.getdata()
      },
      hideAttachMsg() {
        this.showAttachMsg = false
      },
      vindicateVar(id, index) {
        const t = this
        t.showVarMsg = true
//      将本条数据的id传入mainid（如果有的话）
        this.$store.commit('flowStepData/setIndex', index)
        this.$store.commit('flowStepData/setChildId3', id)
        if (id) {
          t.$refs.mailVar.getdata()
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
