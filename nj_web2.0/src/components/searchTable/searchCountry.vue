<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;选择国家
        </div>
        <Button type="text"  @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="searchText" style="width: 200px" v-model="countryCname"/>
        <span style="margin: 0;"><Button type="primary" icon="search" @click="search">{{$t('button.ser')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" border ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Page :total="total" :current="current" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew } from '../../axios/axios'
  import { isSuccess, deepCopy } from '../../lib/util'

  export default{
    data() {
      return {
        data: [],
        total: NaN,
        current: NaN,
        countryCname: '',
        searchText: '请输入国家中文名称',
        searchCloumns: [
          {
            title: '国家中文',
            key: 'countryCname',
          },
          {
            title: '国家英文',
            key: 'countryEname',
          },
        ],
        params: {
          _mt: 'baseCountry.getPage',
          sort: 'id',
          order: 'asc',
          rows: 10,
          page: 1,
          logType: '查询',
          funId: 1126,
        },
      }
    },
    props: {
    },
    mounted() {

    },
    methods: {
      search() {
        this.params.page = 1
        this.getData()
      },
      getData() {
        const t = this
        const data = deepCopy(t.params)
        data.countryCname = t.countryCname
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
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      close() {
        this.countryCname = ''
        this.params.page = 1
        this.$emit('closeCountry')
      },
      dbCkick(row) {
        const t = this
        this.$emit('inputCountry', row.countryCname, row.id)
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
        this.params.sort = column.key
        this.params.order = column.order
        if (column.order !== 'normal') {
          this.getData()
        } else {
          this.params.order = 'desc'
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
