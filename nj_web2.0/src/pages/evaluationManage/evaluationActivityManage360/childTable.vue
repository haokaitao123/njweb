<template>
  <div class="content-main">
    <Row>
      <Button type="primary" @click="showMsgBtn(NaN,$t('button.add'))">{{$t('button.add')}} </Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="420" size="small" border ref="selection" :columns="columns" :data="data"></Table>
    </row>
    <Row style="display: flex">          <Page :current="page" :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <upChildTable v-show="openChild" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></upChildTable>
  </div>
</template>
<script>
	import upChildTable from './upChildTable'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        total: NaN,
        openChild: false,
        nameOrMobile: '',
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_evaluation.evaluation.resLevelDis'),
            key: 'resLevelDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_evaluation.evaluation.resEmpidDis4'),
            key: 'resEmpidDis',
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 64,
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
                      this.showMsgBtn(params.row.id, this.$t('button.upd'))
                    },
                  },
                }, this.$t('button.upd')),
              ])
            },
          },
        ],
        data: [],
        rows: 10,
	      page: 1,
	      sort: 'id',
	      order: 'desc',
        index: '',
        logType: '',
        tableselected: '',
      }
    },
    components: {
      upChildTable,
    },
    methods: {
      getData(id) {
        const t = this
        t.index = id
        const params = {
        	_mt: 'evaluationRelation.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          resPid: t.index,
          logType: '子表分页',
        }
        getDataLevelUserLoginNew(params).then((res) => {
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
        t.page = page
        t.getData(t.index)
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData(this.index)
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
                _mt: 'evaluationRelation.delByIds',
                logType: this.$t('button.del'),
                ids: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getData(t.index)
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
      closeUp() {
      	this.openChild = false
      	this.$refs.update.clear()
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData(t.index)
      },
      showMsgBtn(id, logType) {
        const t = this
        t.openChild = true
//      t.logType = logType;
        if (logType === this.$t('button.add')) {
          t.$refs.update.getData(t.index, logType)
        } else {
        	t.$refs.update.getData(id, logType)
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
        t.getData(t.index);
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
