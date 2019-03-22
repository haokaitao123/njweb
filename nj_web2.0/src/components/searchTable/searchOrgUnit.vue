<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{type ==='01company' ? $t('lang_payroll.salaryBase.searchCmp') : $t('lang_payroll.salaryBase.searchDept')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="type ==='01company' ? searchText : searchText2" style="width: 200px" v-model="unitsFname" />
        <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(type, 1)">{{$t('button.ser')}}</Button></span>
        <span style="margin: 0;"><Button type="warning" icon="trash-b" @click="clear">{{$t('button.cel')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" border ref="selection" :columns="type ==='01company' ? searchCloumns : searchCloumns2" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Page :total="total" size="small" :current="params.page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
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
      type: '',
      unitsFname: '',
      searchText: this.$t('lang_payroll.salaryBase.unitsNameIns'),
      searchText2: this.$t('lang_payroll.salaryBase.unitsNameIns2'),
      params: {
        _mt: 'orgUnits.getByOrgFramePageList',
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        logType: '公司弹出框',
      },
      searchCloumns: [
        {
          title: this.$t('lang_payroll.salaryBase.unitCode'),
          key: 'unitCode',
          sortable: 'custom',
        },
        {
          title: this.$t('lang_payroll.salaryBase.compFnameCnDis'),
          key: 'unitsFname',
        },
      ],
      searchCloumns2: [
        {
          title: this.$t('lang_payroll.salaryBase.unitCode2'),
          key: 'unitCode',
          sortable: 'custom',
        },
        {
          title: this.$t('lang_payroll.salaryBase.compFnameCnDis2'),
          key: 'unitsFname',
        },
      ],
    }
  },
  props: {
  },
  mounted() {

  },
  methods: {
    getData(type, page) {
      const t = this
      if (t.type === '') {
        t.type = type
      }
      if (page) {
        t.params.page = page
      }
      const data = deepCopy(t.params)
      data['unitsFname'] = t.unitsFname
      data['unitType'] = t.type
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
      this.unitsFname = ''
      this.params.page = 1
      this.$emit('closeUp')
    },
    dbCkick(row) {
      const t = this
      this.close()
      this.$emit('changeinput', row[t.searchCloumns[1].key], row.id)
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
