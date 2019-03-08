<template>
  <div class="content-main">
    <row></row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="445" size="small" border ref="selection" :columns="columns" :data="data"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="params.page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <contentMsg v-show="showMsg"  @hideMsg="hideMsg" :logType="logType" :id="id" ref="contentMsg" @getData="getData" @update="updateArray" ></contentMsg>
  </div>
</template>
<script>
  import contentMsg from './updSalItem'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  export default {
    data() {
      return {
        logType: '',
        total: NaN,
        showMsg: false,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_payroll.payAddSalItem.pladitmType'),
            key: 'pladitmTypeDis',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payAddSalItem.pladitmItem'),
            key: 'pladitmItemDis',
            width: 150,
          },
          {
            title: this.$t('lang_payroll.payAddSalItem.pladitmCurrency'),
            key: 'pladitmCurrencyDis',
            width: 150,
          },
          {
            title: this.$t('lang_payroll.payAddSalItem.pladitmAmount'),
            key: 'pladitmAmount',
            width: 150,
          },
          {
            title: this.$t('lang_payroll.payAddSalItem.pladitmSdate'),
            key: 'pladitmSdate',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.payAddSalItem.pladitmEdate'),
            key: 'pladitmEdate',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
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
                      this.showMsgBtn(params.row.id, this.$t('button.view'), params.index)
                    },
                  },
                }, this.$t('button.view')),
              ])
            },
          },
        ],
        data: [],
        params: {
          _mt: 'payAddSalitem.getPage',
          funId: '1',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          logType: '',
          pladitmBillid: '',
        },
        index: '',
        tableselected: '',
      }
    },
    props: {
      id: Number,
    },
    components: {
      contentMsg,
    },
    mounted() {
    },
    methods: {
      get(id) {
        this.params.pladitmBillid = id + ''
        this.params.logType = '查询List信息'
        this.getData()
      },
      getData() {
        const t = this
        const data = deepCopy(t.params)
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
        getDataLevelUserLogin({
          _mt: 'payAddSalitem.delByIds',
          funId: '1',
          logType: this.$t('button.del'),
          delIds: t.tableselected,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.getData()
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
        t.getData()
      },
      showMsgBtn(id, logType, index) {
        const t = this
        t.showMsg = true
        t.logType = logType
        t.index = index
        t.$refs.contentMsg.setRowId(id)
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
      clear() {
        this.select = this.$t('button.all')
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
