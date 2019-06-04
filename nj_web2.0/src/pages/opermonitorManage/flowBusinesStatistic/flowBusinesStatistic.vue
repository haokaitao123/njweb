<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_operatmonitor.flowBusinesStatistic.title')}}
        </p>
        <Row>
          <i-col span="20" style="width: 100% !important">
            <Row>
              <Input :placeholder="$t('lang_operatmonitor.flowBusinesStatistic.searhText')" style="width: 200px" v-model="flowName"/>
              <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
            </Row>
            <row class="table-form" ref="table-form">
              <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-sort-change="sortable"  @on-select-all="selectedtable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
            </row>
            <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=[rows] :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
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
            title: this.$t('lang_operatmonitor.flowBusinesStatistic.flowCode'),
            key: 'flowCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_operatmonitor.flowBusinesStatistic.flowName'),
            key: 'flowName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_operatmonitor.flowBusinesStatistic.flowTotal'),
            key: 'flowTotal',
          },
          {
            title: this.$t('lang_operatmonitor.flowBusinesStatistic.flowDealCount'),
            key: 'flowDealCount',
          },
          {
            title: this.$t('lang_operatmonitor.flowBusinesStatistic.flowClosedCount'),
            key: 'flowClosedCount',
          },
        ],
        data: [],
        total: NaN,
        sort: 'flowCode',
        order: 'asc',
        rows: 20,
        page: 1,
        index: 0,
        logType: '',
        flowName: '',
      }
    },
    mounted() {
      this.getData(1)
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'ansrptFlowStatistic.getFlowStatisticPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          flowName: t.flowName,
          logType: '查询List',
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
