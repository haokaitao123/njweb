<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          {{$t('lang_flow.varList.title2')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
  <div class="content-main">
    <Row>
      <Button type="primary" @click="openUp(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
      <Button type="primary" @click="initVar">{{$t('button.ini')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="$store.state.flowStepData.childTable4"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <updWxVar v-show="showMsg" @hideMsg="hideMsg" ref="updMailVar" :logType="logType"></updWxVar>
  </div>
    </div>
  </div>
</template>
<script>
  import updWxVar from './updWxVar'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        logType: '',
        total: NaN,
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: '1',
        showMsg: false,
        tableselected: '',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_flow.varList.flspvarMark'),
            key: 'flspvarMark',
            align: 'left',
          },
          {
            title: this.$t('lang_flow.varList.flspvarName'),
            key: 'flspvarName',
            align: 'left',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            align: 'center',
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
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
              ])
            },
          },
        ],
      }
    },
    components: {
      updWxVar,
    },
    methods: {
      getdata() {
        const t = this
        const data = {
          _mt: 'platFlstepVar.getPage',
          funId: '1',
          logType: this.$t('button.ser'),
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          flspvarMark: t.flspvarMark,
          flspvarSource: 'flowwx',
          flowId: t.$store.state.flowStepData.flowId,
          flspvarBillid: t.$store.state.flowStepData.childId6,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            this.$store.commit('flowStepData/setChildTable4', res.data.content[0].rows)
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
        }
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
      },
      deletemsg() {
        const t = this
        if (t.tableselected.length > 0) {
          getDataLevelUserLogin({
            _mt: 'platFlstepVar.delByIds',
            funId: '1',
            companyId: '1',
            logType: this.$t('button.del'),
            delIds: t.tableselected,
          }).then((res) => {
            t.$Modal.confirm({
              onOk: () => {
                if (isSuccess(res, t)) {
                  t.getdata()
                }
              },
              title: this.$t('reminder.remind'),
              content: this.$t('reminder.confirmdelete'),
            })
          }).catch(() => {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        } else {
          t.$Modal.success({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        }
      },
      initVar() {
        const t = this
        getDataLevelUserLoginNew({
          _mt: 'platFlstepVar.initVar',
          funId: '1',
          logType: '初始化',
          flspvarMark: t.flspvarMark,
          flspvarSource: 'flowwx',
          flowId: t.$store.state.flowStepData.flowId,
          flspvarBillid: t.$store.state.flowStepData.childId6,
        }).then((res) => {
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
      showMsgBtn() {
        this.showMsg = true
      },
      openUp(id, logType, index) {
        const t = this
        t.showMsg = true
        t.logType = logType
//      将本条数据的id传入mainid（如果有的话）
        this.$store.commit('flowStepData/setIndex', index)
        if (id) {
          t.$refs.updMailVar.getFormData(id)
        }
      },
      hideMsg() {
        this.showMsg = false
      },
      close() {
        this.$emit('hideMsg')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .content-main{
    height: 500px;
    .table-form{
      margin: 10px 0;
    }
  }
</style>
