<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;公积金政策管理
        </p>
        <Row>
          <Input :placeholder="$t('lang_sihfPolicy.sihtPolicy.sihfpcyNoDis')" style="width: 200px" v-model="sihfpcyNo"/>
          <Input :placeholder="$t('lang_sihfPolicy.sihtPolicy.sihfpcyCnDis')" style="width: 200px" v-model="sihfpcyCn"/>
          <span @dblclick="clearCityid">
              <Input v-model="sihfpcyAreaName" icon="search" :readonly="true" :placeholder="$t('lang_sihfPolicy.sihtPolicy.sihfpcyAreaNameDis')" style="width: 200px" @on-click="pickData" />
            </span>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp('',$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" :current="page" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :logType="logType" @closeUp="closeUp" @getData="getData" ref="update"></update>
    </transition>
    <transition name="fade">
      <searchCity v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="close1" @changeinput="changeinput" ref="searchCity"></searchCity>
    </transition>
  </div>
</template>
<script>
  import update from './providFundBase'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import searchCity from '../../../components/searchTable/searchCity'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
            fixed: 'left',
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyNo'),
            key: 'sihfpcyNo',
            sortable: 'custom',
            width: 140,
//          width: 105,
            fixed: 'left',
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyCn'),
            key: 'sihfpcyCn',
            width: 140,
//          width: 115,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyEn'),
            key: 'sihfpcyEn',
            width: 140,
//          width: 115,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyAreaName'),
            key: 'sihfpcyAreaName',
            sortable: 'custom',
            width: 140,
//          width: 90,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyRegisterpropertyName'),
            key: 'sihfpcyRegisterpropertyName',
            sortable: 'custom',
            width: 140,
//          width: 105,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyScopedesc'),
            key: 'sihfpcyScopedesc',
            sortable: 'custom',
            width: 140,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyNewdate'),
            key: 'sihfpcyNewdate',
            sortable: 'custom',
            width: 140,
//          width: 105,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyCutdate'),
            key: 'sihfpcyCutdate',
            sortable: 'custom',
            width: 140,
//          width: 105,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcySamebaseName'),
            key: 'sihfpcySamebaseName',
            sortable: 'custom',
            width: 140,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcySdate'),
            key: 'sihfpcySdate',
            sortable: 'custom',
            width: 140,
//          width: 105,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyEdate'),
            key: 'sihfpcyEdate',
            sortable: 'custom',
            width: 140,
//          width: 105,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 64,
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
                      this.openUp(params.row.id, this.$t('button.upd'), params.index, params.row.id)
                    },
                  },
                }, this.$t('button.upd')),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        sihfpcyCn: '',
        sihfpcyNo: '',
        sihfpcyArea: '',
        openPick: false,
        sihfpcyAreaName: '',
        params: {
          _mt: 'baseCity.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          data: '{}',
        },
        searchCloumns: [
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
      }
    },
    computed: {

    },
    components: {
      searchCity,
       update,
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
          _mt: 'sihfPolicy.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: '查询List',
          sihfpcyArea: t.sihfpcyArea,
          sihfpcyCn: t.sihfpcyCn,
          sihfpcyNo: t.sihfpcyNo,
          sihfpcyType: '02hfund',
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
      updateimg() {
        this.updateImg = true
      },
      closeImg() {
        const t = this
        t.updateImg = false
      },
      close1() {
        const t = this
        t.openPick = false
      },
      changeinput(name, id) {
        const t = this
        t.sihfpcyAreaName = name
        t.sihfpcyArea = id
      },
      pickData() {
        const t = this
        t.$refs.searchCity.getData(this.params, '02city\',\'03county')
        t.openPick = true
      },
      clearCityid() {
        const t = this
        t.sihfpcyAreaName = ''
        t.sihfpcyArea = ''
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
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        } else {
          this.order = 'desc'
        }
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
      },
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
        	t.$Modal.confirm({
        		title: this.$t('reminder.remind'),
        		content: this.$t('reminder.confirmdelete'),
        		onOk: () => {
        			getDataLevelUserLogin({
          _mt: 'sihfPolicy.delByIds',
          funId: '1',
          companyId: '1',
          logType: this.$t('button.del'),
          ids: t.tableselected,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.getData()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
          },
          onCancel: () => {},
        	})
        }
      },
      open() {
        const t = this
        t.opendialog = true
      },
      openUp(id, logType, index) {
        const t = this
        t.openUpdate = true
        t.logType = logType
//      将本条数据的id传入mainid（如果有的话）
        this.$store.commit('providFund/setMainId', id)
         this.$store.commit('providFund/setChildId1', id)
        this.$store.commit('providFund/setIndex', index)
        if (id) {
          t.$refs.update.getOptionData()
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.clear()
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
