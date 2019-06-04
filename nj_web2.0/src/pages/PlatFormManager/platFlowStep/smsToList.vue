<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_flow.SMSCon.title')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
  <div class="content-main">
    <Row>
      <Button type="primary" @click="addSMSCon">{{$t('button.add')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="$store.state.flowStepData.childTable7"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=rows :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <updSmsTo v-show="showMsg" :logType=logType @hideMsg="hideMsg" ref="updSmsTo"></updSmsTo>
    <addSMSCon v-show="showAddMsg" @hideMsg="hideAddMsg" ref="addSMSCon"></addSMSCon>
  </div>
    </div>
  </div>
</template>
<script>
  // 修改联系人
  import updSmsTo from './updSmsTo'
  // 增加联系人
  import addSMSCon from './addSMSCon'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    tableselected: '',
    data() {
      return {
        id: '',
        conttype: '',
        sort: 'id',
        total: NaN,
        order: 'desc',
        rows: 20,
        page: 1,
        tableselected: [],
        showMsg: false,
        showAddMsg: false,
        flsmlrIsvalidDis: '',
        logType: '',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_flow.SMSCon.flsmsrContactDis'),
            key: 'flsmsrContactDis',
//            align: 'center',
          },
          {
            title: this.$t('lang_flow.SMSCon.flsmsrIsvalidDis'),
            key: 'flsmsrIsvalidDis',
//            align: 'center',
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
                      this.openUp(params.row.id, params.index,this.$t('button.upd'))
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
      updSmsTo,
      addSMSCon,
    },
    methods: {
      getdata(id) {
        const t = this
        t.id = id // 当前数据id
        const data = {
          _mt: 'platFlsmsTo.getPage',
          flsmsrMail: t.$store.state.flowStepData.childId6, // 短信id
          funId: '1',
          logType: this.$t('button.ser'),
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              this.$store.commit('flowStepData/setChildTable7', res.data.content[0].rows)
              t.total = res.data.content[0].records
            } else {
              this.$store.commit('flowStepData/setChildTable7', [])
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
        t.getdata(t.id)
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getdata(t.id)
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getdata(t.id)
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
                _mt: 'platFlsmsTo.delByIds',
                funId: '1',
                companyId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getdata(t.id)
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
      openUp(id, index,logType) {
        const t = this
        t.showMsg = true
        t.logType = logType
        t.$store.commit('flowStepData/setIndex', index)
        t.$store.commit('flowStepData/setChildId7', id)
        if (id) {
          t.$refs.updSmsTo.getFormData(id)
        }
      },
      hideMsg() {
        this.showMsg = false
      },
      close() {
        this.$emit('hideMsg')
      },
      addSMSCon() {
        const t = this
        t.showAddMsg = true
          t.$refs.addSMSCon.getdata()
      },
      hideAddMsg() {
        this.showAddMsg = false
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
