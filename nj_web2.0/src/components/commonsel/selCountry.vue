<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;选择国家信息
        </div>
        <Button type="text"  @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input placeholder="请输入国家英文" style="width: 200px" v-model="countryCn"/>
        <Input placeholder="请输入国家英文" style="width: 200px" v-model="countryEn"/>
        <span style="margin: 0;"><Button type="primary" icon="search" @click="getData">{{$t('button.ser')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" border ref="selection" :columns="columns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCKick"></Table>
      </row>
      <Page :total="total" size="small" show-elevator show-sizer placement="top"  @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew } from '../../axios/axios'
  import { isSuccess } from '../../lib/util'

  export default{
    data() {
      return {
        countryCn: '',
        countryEn: '',
        columns: [
          {
            title: '国家中文',
            key: 'countryCname',
            sortable: 'custom',
          },
          {
            title: '国家英文',
            key: 'countryEname',
            sortable: 'custom',
          },
          {
            title: '编码1',
            key: 'countryCode1',
            sortable: 'custom',
          },
        ],
        funId: 0,
        total: 0,
        sort: 'id',
        order: 'asc',
        rows: '10',
        page: '1',
        data: [],
      }
    },
    props: {
      selSort: String,
      selOrder: String,
    },
    mounted() {

    },
    methods: {
      getData() {
        const t = this
        console.info(t.selSort)
        console.info(t.selOrder)
        const data = {
          _mt: 'baseCountry.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: t.funId,
          logType: this.$t('button.ser'),
          countryCname: t.countryCn,
          countryEname: t.countryEn,
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
      dbCKick(row) {
        this.$emit('selOk', row.id, row.countryCname)
        this.close()
      },
      close() {
        this.countryCn = ''
        this.countrye = ''
        this.$emit('close')
      },
      sizeChange(size) {
        const t = this
        t.params.rows = size
        t.getData(t.params)
      },
      pageChange(page) {
        const t = this
        t.params.page = page
        t.getData(t.params)
      },
      sortable(column) {
        this.params.sort = column.key
        this.params.order = column.order
        if (column.order !== 'normal') {
          this.getData(this.params)
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
