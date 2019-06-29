<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;签证领区管理
        </p>
        <Row>
          <Select v-model="areaDistrict" clearable style="width: 160px;" placeholder="请选择领区" >
            <Option :value="item.paramCode" v-for="(item,index) in Visaarea" :key="index">{{item.paramInfoCn}}</Option>
          </Select>
          <span @dblclick="dbCountry">
               <Input v-model="areaContryDis" style="width: 160px" icon="search" :readonly="true" placeholder="请选择目的地"  @on-click="selectCountry"/>
          </span>
          <Button type="primary" icon="search" @click="search">{{$t('button.ser')}}</Button>
          <Button type="primary" icon="primary" @click="openUp(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" icon="primary" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" showTotal size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=rows :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :Visaarea="Visaarea" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @newdata="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition name="fade">
      <searchCountry v-show="openCountry" @closeCountry="closeCountry"  @inputCountry="inputCountry" ref="searchCountry"></searchCountry>
    </transition>
  </div>
</template>
<script>
  import update from './visaAreaBase'
  import searchCountry from '../../../components/searchTable/searchCountry'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        tableselected: [],
        logType: '',
        openCountry: false,
        openUpdate: false,
        updateId: NaN,
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: '目的国',
            key: 'areaContryDis',
//            width: 160,
//            sortable: 'custom',
          },
          {
            title: '领区',
            key: 'areaDistrictDis',
//            width: 160,
          },
          {
            title: '受理区域范围',
            key: 'areaScope',
//            width: 160,
//            sortable: 'custom',
          },
          {
            title: '生效日期',
            key: 'areaTimesta',
//            width: 160,
            sortable: 'custom',
          },
          {
            title: '失效日期',
            key: 'areaTimestop',
//            width: 160,
            sortable: 'custom',
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
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
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
        order: 'desc',
        rows: 20,
        page: 1,
        Visaarea: [],
        areaContry: '',
        areaContryDis: '',
        areaDistrict: '',
      }
    },
    computed: {

    },
    components: {
      update,
      searchCountry,
    },
    mounted() {
      this.getSelect()
      this.search()
    },
    methods: {
      search() {
        this.page = 1
        this.getData()
      },
      getData() {
        const t = this
        const data = {
          _mt: 'visaArea.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: '查询List',
          areaContry: t.areaContry,
          areaDistrict: t.areaDistrict,
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
                _mt: 'visaArea.delByIds',
                funId: '1',
                logType: this.$t('button.del'),
                ids: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
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
      //  	选择国家
      selectCountry() {
        const t = this
        t.$refs.searchCountry.getData()
        t.openCountry = true
      },
      closeCountry() {
        const t = this
        t.$refs.searchCountry.countryCname = ''
        t.openCountry = false
      },
      inputCountry(name, id) {
        const t = this
        t.areaContryDis = name
        t.areaContry = id
      },
      dbCountry() {
        const t = this
        t.areaContryDis = ''
        t.areaContry = ''
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'visaarea',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Visaarea = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
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
        this.tableselected = newArr
      },
      // 修改
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        if (t.logType === this.$t('button.upd')) {
          t.$refs.update.getOption(id, logType)
        }
      },
      closeUp() {
        const t = this
        t.openUpdate = false
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
