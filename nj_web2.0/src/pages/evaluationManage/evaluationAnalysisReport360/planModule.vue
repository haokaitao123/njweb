<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_evaluation.evaluation.searchScheme')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="$t('lang_evaluation.evaluation.proNameIns')" style="width: 200px" v-model="proName"/>
        <span style="margin: 0;"><Button type="primary" icon="search" @click="search()">{{$t('button.ser')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" border ref="selection" :columns="columns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">          <Page :total="total" :current="page" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=[rows] :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default{
    data() {
      return {
        data: [],
        total: NaN,
        current: NaN,
        columns: [
          {
            title: this.$t('lang_evaluation.evaluation.proName'),
            key: 'proName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_evaluation.evaluation.proExplain'),
            key: 'proExplain',
            sortable: 'custom',
          },
        ],
        sort: 'id',
        order: 'desc',
        rows: 20,
        page: 1,
        proName: '',
      }
    },
    mounted() {

    },
    methods: {
      search() {
        const t = this
        t.page = 1
        t.getData()
      },
      getData() {
        const t = this
        const data = {
	      _mt: 'evaluationPro.getPage',
	      rows: t.rows,
	      page: t.page,
	      sort: t.sort,
	      order: t.order,
	      proName: t.proName,
	      proType: '04eval',
	      logType: this.$t('button.ser'),
        };
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
            t.current = res.data.content[0].page
          }
        }).catch(() => {
          // t.$Modal.error({
          //   title: this.$t('reminder.err'),
          //   content: this.$t('reminder.errormessage'),
          // })
        })
      },
      close() {
        this.proName = ''
        this.page = 1
        this.$emit('closePlan')
      },
      dbCkick(row) {
        const t = this
          this.$emit('changeinputPlan', row.id, row.proName)

        t.close()
      },
      sizeChange(size) {
        const t = this
        t.params.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.params.page = page
        t.getData()
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (column.order !== 'normal') {
          this.getData()
        } else {
          this.order = 'desc'
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form{
    margin-bottom: 10px;
  }
  .background{
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .backbox{
      position:relative;
      width: 800px;
      background-color: #fff;
      padding: 60px 20px 30px 20px;
      border-radius: 10px;
      .title{
        display: flex;
        position: absolute;
        height: 40px;
        width: 100%;
        line-height: 40px;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        top: 0;
        border-bottom: 1px solid #efefef;
        left: 0;

        .title-text{
          font-weight: bold;
          font-size: 14px;
        }
      }
    }
  }
</style>
