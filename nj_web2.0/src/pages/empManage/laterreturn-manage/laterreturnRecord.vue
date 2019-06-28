<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;逾期回国查询
        </p>
        <Row>
          <i-col span="20" style="width: 100% !important">
            <Row>
              <DatePicker type="date" placeholder="请选择截止日期" :editable="false" :clearable="false" v-model="deadline" ></DatePicker>
              <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
            </Row>
            <row class="table-form" ref="table-form">
              <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-sort-change="sortable"  @on-select-all="selectedtable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
            </row>
            <Row style="display: flex">
              <Page :total="total" showTotal size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=rows :page-size-opts = "[10, 20, 50, 100]" ></Page>
              <Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
          </i-col>
        </Row>
      </card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: '出国标题',
            key: 'returnTitle',
            width: 120,
          },
          {
            title: '目的地',
            key: 'returnDestinationDis',
            width: 120,
          },
          {
            title: '开始日期',
            key: 'returnDatesta',
            width: 120,
          },
          {
            title: '天数',
            key: 'returnDaynum',
            width: 120,
          },
          {
            title: '结束日期',
            key: 'returnDatestop',
            width: 120,
          },
          {
            title: '姓名',
            key: 'returnName',
            width: 120,
          },
          {
            title: '公司',
            key: 'returnCompDis',
            width: 200,
          },
          {
            title: '是否已回国',
            key: 'returnIsbackDis',
            width: 120,
          },
          {
            title: '回国日期',
            key: 'returnTime',
            width: 120,
          },
          {
            title: '逾期天数',
            key: 'overduedays',
            width: 120,
          },
        ],
        data: [],
        total: NaN,
        sort: 'id',
        order: 'asc',
        rows: 20,
        page: 1,
        index: 0,
        logType: '',
        deadline: '',
      }
    },
    mounted() {
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        if (t.deadline !== undefined) {
          t.deadline = t.deadline === '' ? '':new Date(t.deadline).format('yyyy-MM-dd')
        }
        if  (t.deadline === '') {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '请选择截止日期！',
          })
          return
        }
        const data = {
          _mt: 'visaReturnStatistic.getPageByObjInfo',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          deadline: t.deadline,
          logType: '查询逾期未回国人详细信息',
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
      // 表格操作发请求
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        } else {
          this.order = 'desc'
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
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
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
  .colTree{
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
  }
  .divtree{
    padding-left: 10px;
    overflow: auto;
    border: 1px #efefef solid;
  }
</style>
