<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;审批服务跟踪
        </p>
        <Row>
          <Input placeholder="请输入审批标题" style="width: 200px" v-model="apblTitlecn"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData">{{$t('button.ser')}}</Button></span>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-sort-change="sortable"  @on-select-all="selectedtable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=rows :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
	    <commonFlowUpdate v-if="openTestUpd"
	                      @close="closeTest"
	                      ref="commonFlowUpdate"
	                      :pkValue="pkValue"
	                      :aprvrelaStepidAll="flowId"
	                      :aprvrelTitle="aprvrelTitle"
	                      :aprdBillid="aprdBillid"
      >
	    </commonFlowUpdate>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
	import commonFlowUpdate from '../../ansrptManage/toDoListManage/commonFlowUpdate'
  import { isSuccess } from '../../../lib/util'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        openTestUpd: false,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: '审批流程',
            key: 'apblAprvidDis',
            sortable: 'custom',
          },
          {
            title: '审批标题中文',
            key: 'apblTitlecn',
            sortable: 'custom',
            render: (h, params) => {
              return h('Tooltip', {
                props: { placement: 'top-start', color: 'white' },
              }, [
                params.row.apblTitlecn,
                h('span', {
                  slot: 'content',
                  style: {
                    whiteSpace: 'normal',
                    wordBreak: 'break-all',
                    color: 'white',
                  },
                }, params.row.apblTitlecn),
              ])
            },
          },
          {
            title: '提交人',
            key: 'createByDis',
            sortable: 'custom',
          },
          {
            title: '提交时间',
            key: 'createTime',
            sortable: 'custom',
          },
          {
            title: '状态',
            key: 'apblStatusDis',
            sortable: 'custom',
          },
          {
            title: '审批完成时间',
            key: 'apblRestime',
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 75,
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
                      this.openUp(params.row, '查看')
                    },
                  },
                }, '查看'),
              ])
            },
          },
        ],
        data: [],
        total: NaN, // 总页数
        sort: 'id',
        order: 'desc',
        rows: 20,
        page: '1',
        index: 0,
        apblTitlecn: '',
        aprvrelTitle: '',
        logType: '',
        flowId: '',
        pkValue: '',
        aprdBillid: '',
      }
    },
    computed: {

    },
    components: {
      commonFlowUpdate,
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        const t = this
        const data = {
          _mt: 'platAprvbill.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          apblTitlecn: t.apblTitlecn,
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
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        }
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
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
      },
      openUp(row, logType) {
        const t = this
        t.flowId = row.apblAprvid
        t.pkValue = row.apblDataid
        t.aprdBillid = row.id
        t.aprvrelTitle = row.apblTitlecn
        t.openTestUpd = true
      },
      closeTest() {
      	const t = this
        t.openTestUpd = false
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

</style>
