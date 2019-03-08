<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_baseManage.baseCity.areaLists')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="$t('lang_baseManage.baseCity.cityNameDis')" style="width: 200px" v-model="cityName"/>
        <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" border ref="selection" @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" :columns="searchCloumns" @on-sort-change="sortable" :data="data"></Table>
      </row>
      <row>
        <Page :total="total" :current="params.page" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      </row>
      <row style="text-align: right">
        <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
      </row>
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
        cityName: '',
        tableselected: [],
        tableCityName: [],
        theCityType: '',
        searchCloumns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_baseManage.baseCity.cityName'),
            key: 'cityName',
            sortable: 'custom',
            width: 380,
          },
          {
            title: this.$t('lang_baseManage.baseCity.cityTypeName'),
            key: 'cityTypeName',
            sortable: 'custom',
            width: 379,
          },
        ],
        params: {
          _mt: 'baseCity.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          logType: this.$t('button.ser'),
          cityType: '02city',
          cityIsvalid: '1',
//          data: '{"cityType":"02city","cityIsvalid" : "1"}',
        },
      }
    },
    props: {
    },
    mounted() {
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          this.params.page = page
        }
        const data = deepCopy(this.params)
        data['cityName'] = t.cityName
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
      selectedtable(selection) {
        const newArr = []
        const newArr1 = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
          newArr1.push(selection[i].cityName)
        }
        this.tableselected = newArr
        this.tableCityName = newArr1
      },
      close() {
        this.cityName = ''
        this.theCityType = ''
        this.params.page = 1
        this.$emit('closeUp')
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
        this.cityName = ''
        this.theCityType = ''
        this.params.page = 1
        this.$emit('clear')
        this.$emit('closeUp')
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
      handleSubmit() {
        const t = this
        this.$emit('changeinput', this.tableselected, this.tableCityName)
        t.close()
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
