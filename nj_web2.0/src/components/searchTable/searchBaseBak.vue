<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_knowBase.knowlegeType.businessFlow')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="searchText" style="width: 200px" v-model="pmtypeCode"/>
        <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(params, 1)">{{$t('button.ser')}}</Button></span>
        <!--<span style="margin: 0;"><Button type="warning" icon="trash-b" @click="clear">{{$t('button.cle')}}</Button></span>-->
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" border ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Page :total="total" size="small" show-elevator show-sizer :current="params.page" placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
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
      pmtypeCode: '',
    }
  },
  props: {
    searchText: String,
    searchCloumns: Array,
    params: Object,
  },
  mounted() {

  },
  methods: {
    getData(params, page) {
      const t = this
      if (page) {
        params.page = page
      }
      const data = deepCopy(params)
      data[t.searchCloumns[0].key] = t.pmtypeCode
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
    close() {
      this.pmtypeCode = ''
      this.params.page = 1
      this.$emit('closeUp')
    },
    dbCkick(row) {
      const t = this
      this.close()
      this.$emit('changeinput', row[t.searchCloumns[0].key], row.id)
      this.$emit('closeUp')
    },
    clear() {
      this.$emit('clear')
      this.$emit('closeUp')
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
