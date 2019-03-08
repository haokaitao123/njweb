<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_platdoc.platMailAttach.searchTitle')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="searchText" style="width: 200px" v-model="sffFieldNameCnDis"/>
        <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
        <span style="margin: 0;"><Button type="warning" icon="trash-b" @click="clear">{{$t('button.cle')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" border ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">          <Page :total="total" :current="params.page" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
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
      sffFieldNameCnDis: '',
      params: {
        _mt: 'platSformfield.getFieldList',
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        logType: '',
        flowId: '0',
        sffFieldNameCnDis: '',
        sffLayout: 'p_layout_71',
      },
      searchText: this.$t('lang_platdoc.platMailAttach.searchText3'),
      searchCloumns: [
        {
          title: this.$t('lang_platdoc.platMailAttach.sffFieldNameCn'),
          key: 'sffFieldNameCnDis',
          width: 250,
        },
        {
          title: this.$t('lang_platdoc.platMailAttach.sffPhyfield'),
          key: 'sffPhyfield',
          width: 250,
        },
      ],
    }
  },
  mounted() {

  },
  methods: {
    getData(page) {
      const t = this
      if (page) {
        t.params.page = page
      }
      const data = deepCopy(this.params)
      data.logType = '查询'
      data.sffFieldNameCnDis = this.sffFieldNameCnDis
      if (this.$store.state.platSysMailJS.flowId) {
        data.flowId = this.$store.state.platSysMailJS.flowId
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
    close() {
      this.sffFieldNameCnDis = ''
      this.$emit('closeAttach')
    },
    dbCkick(row) {
      const t = this
      this.$emit('changeinput', row[t.searchCloumns[0].key], row[t.searchCloumns[1].key])
      this.$emit('closeAttach')
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
    clear() {
      this.$emit('closeAttach')
    },
    sortable(column) {
      this.params.sort = column.key
      if (column.order !== 'normal') {
        this.params.order = column.order
        this.getData()
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
