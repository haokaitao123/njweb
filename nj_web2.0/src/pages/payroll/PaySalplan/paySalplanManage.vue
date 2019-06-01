<template>
  <div class="table">
    <Row>
      <Col name="body" span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_payroll.paySalplan.paysalplan')}}
        </p>
        <Row>
          <Select style="width: 200px" v-model="salplYear"   :placeholder="$t('lang_payroll.paySalplan.pltpYearCheck')" @on-change ="getPeriod">
            <Option :value="item.fyYear" v-for="(item,index) in selectFyear" :key="index">{{item.fyYear}}</Option>
          </Select>
          <Select style="width: 200px" ref="period"  v-if="hackReset" v-model="salplPeriod" :placeholder="$t('lang_payroll.paySalplan.salplPeriodCheck')" v-bind:disabled="isFperiod" @on-change ="getPeriod1">
            <Option :value="item.fypdPeriod"  v-for="(item,index) in selectFperiod" :key="index">{{item.fypdPeriod}}</Option>
          </Select>
          <Select style="width: 200px"  v-model="salplSalset"  :placeholder="$t('lang_payroll.paySalplan.salplSalsetCheck')">
            <Option :value="item.id"  v-for="(item,index) in selectSalset" :key="index">{{item.payss}}</Option>
          </Select>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="init()" >{{$t('button.ini')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
        <Spin v-if="loading" fix></Spin>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './paySalplanView'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import Bus from '../../.././lib/bus'
  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        loading: false,
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        selectFyear: [],
        selectFperiod: [],
        selectSalset: [],
        isFperiod: true,
        hackReset: true,
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
            fixed: 'left'
          },
          {
            title: this.$t('lang_payroll.paySalplan.salplYear'),
            key: 'salplYear',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salplPeriod'),
            key: 'salplPeriod',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salplSalsetDis'),
            key: 'salplSalsetDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salplStatusDis'),
            key: 'salplStatusDis',
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 200,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    icon: 'calendar',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('lang_payroll.paySalplan.periodplan'), params.index)
                    },
                  },
                }, this.$t('lang_payroll.paySalplan.periodplan')),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.confirm(params.row.id)
                    },
                  },
                }, this.$t('lang_payroll.paySalplan.confirmCheck')),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
        salplYear: '',
        salplPeriod: '',
        salplSalset: '',
      }
    },
    computed: {
    },
    components: {
      update,
    },
    mounted() {
      this.getData(1)
      this.getSelect()
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'paySalplan.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          salplYear: t.salplYear,
          salplPeriod: t.salplPeriod,
          salplSalset: t.salplSalset,
          salplStatus: '01draft',
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
      init() {
        const t = this
        if (t.salplYear === '' || t.salplPeriod === '' || t.salplSalset === '') {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_payroll.paySalplan.error'),
          })
        } else {
          t.loading = true
          const data = {
            _mt: 'paySalplan.init',
            logType: '初始化',
            salplYear: t.salplYear,
            salplPeriod: t.salplPeriod,
            salplSalset: t.salplSalset,
          }
          for (const dat in data) {
            if (data[dat] === '') {
              delete data[dat]
            }
          }
          getDataLevelUserLoginNew(data).then((res) => {
            t.loading = false
            if (isSuccess(res, t)) {
              t.getData()
            }
          }).catch(() => {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        }
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platFiscalyear.getSelectValue',
          data: '{}',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectFyear = (res.data.content[0].value)
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
          })
        })
        getDataLevelUserLogin({
          _mt: 'paySalSet.getSelectValue',
          data: '{}',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectSalset = (res.data.content[0].value)
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
          })
        })
      },
      getPeriod1(value) {
//        console.log(value)
//        console.log(this.selectFperiod)
//        this.salplPeriod = value
        this.hackReset = false
        this.$nextTick(() => {
          this.hackReset = true
        })
      },
      getPeriod(value) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platFyperiod.getSelectValue',
          data: '{"fypdYear":"' + value + '"}',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectFperiod = res.data.content[0].value
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
          })
        })
        if (value !== '') {
          t.isFperiod = false
        } else if (value === '') {
          t.isFperiod = true
        }
        t.salplPeriod = ''
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
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
                _mt: 'paySalplan.delByIds',
                funId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
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
      confirm(id) {
        const t = this
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_payroll.paySalplan.confirm'),
            onOk: () => {
              getDataLevelUserLoginNew({
                _mt: 'paySalplan.addOrUpd',
                logType: '提交',
                id: id,
                salplStatus: '02confirm',
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
      },
      open() {
        const t = this
        t.opendialog = true
      },
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        t.$refs.update.getTime(id)
        t.$refs.update.getSelect()
        t.$refs.update.TransformationMode(2)
        // Bus.$emit('onChange', id)
//        t.$refs.update.getSelect()
//        if (logType === this.$t('button.upd')) {
//          t.$refs.update.getData(id)
//        }
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.planId = ''
        // t.$refs.update.formValidate = ''
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
