<template>
  <div class="content-main">
    <row>
      <Input v-model="docsName"   style="width: 160px;" placeholder="请输入资料名称"></Input>
      <Button type="primary" icon="search" @click="search">{{$t('button.ser')}}</Button>
      <Button type="primary" icon="primary" @click="showMsgBtn(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
      <Button type="error" icon="primary" @click="deletemsg">{{$t('button.del')}}</Button>
    </row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="data"></Table>
    </row>
    <Row style="display: flex">
      <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="params.page" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=rows :page-size-opts = "[10, 20, 50, 100]" ></Page>
      <Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="search"></Button>
    </Row>
    <contentMsg v-show="showMsg"  @hideMsg="hideMsg" :mainId="mainId" :logType="logType" ref="contentMsg" @newdata="addNewArray" @update="updateArray" ></contentMsg>
  </div>
</template>
<script>
  import contentMsg from './updVisaAreaDocs'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        total: NaN,
        logType: '',
        showMsg: false,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '序号',
            key: 'docsOrder',
//            width: 150,
            sortable: 'custom',
          },
          {
            title: '资料名称',
            key: 'docsName',
//            width: 150,
          },
          {
            title: '生效日期',
            key: 'docsTimesta',
//            width: 150,
          },
          {
            title: '失效日期',
            key: 'docsTimestop',
//            width: 150,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            align: 'center',
            width: 64,
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
        data: [],
        docsName: '',
        params: {
          _mt: 'visaAreaDocs.getPage',
          funId: '1',
          rows: 20,
          page: 1,
          sort: 'id',
          order: 'asc',
          logType: '',
          visaAreaId: '',
        },
        index: '',
        tableselected: [],
      }
    },
    props: {
      mainId: Number,
    },
    components: {
      contentMsg,
    },
    mounted() {
    },
    methods: {
//      get(id) {
//        this.params.visaAreaId = id + ''
//        this.params.logType = '查询List信息'
//        this.getData()
//      },
      search() {
        this.params.page = 1
        this.params.visaAreaId = this.mainId + ''
        this.getData()
      },
      getData() {
        const t = this
        const data = deepCopy(t.params)
        data.docsName = t.docsName
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
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
        t.getData()
      },
      sortable(column) {
        this.params.sort = column.key
        this.params.order = column.order
        if (this.params.order !== 'normal') {
          this.getData()
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
                _mt: 'visaAreaDocs.delByIds',
                funId: '1',
                logType: this.$t('button.del'),
                ids: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.getData()
                  t.tableselected = []
                }
              }).catch(() => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            },
            onCancel: () => {
            },
          })
        }
      },
      sizeChange(size) {
        const t = this
        t.params.rows = size
        t.getData()
      },
      showMsgBtn(id, logType, index) {
        const t = this
        t.showMsg = true
        t.logType = logType
        t.index = index
        if (t.logType === this.$t('button.upd')) {
          t.$refs.contentMsg.setRowId(id)
        }
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
      clear() {
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
