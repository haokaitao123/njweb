<template>
  <div class="content-main">
      <!--<Button type="primary" @click="showMsgBtn(NaN,$t('button.add'))">{{$t('button.add')}}</Button>-->
      <!--<Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
    <RadioGroup v-model="showType" @on-change="radioChange">
      <Radio label="Enabled">{{$t('button.enabled')}}</Radio>
      <Radio label="NotEnabled">{{$t('button.unenabled')}}</Radio>
      <Radio label="All">{{$t('button.all')}}</Radio>
    </RadioGroup>
    <Button type="primary" @click="opendistCoun()">{{$t('button.adjOrd')}}</Button>
    <row class="table-form" ref="table-form">
      <Table class="fff" id="tab01" @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="data"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" :current="params.page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=params.rows :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <contentMsg v-show="showMsg":logType="logType" @hideMsg="hideMsg" :id="id" :idname="idname" ref="contentMsg" @getData="addNewArray" @update="updateArray" ></contentMsg>
    <formula v-show="showMsg1" @hideMsg="hideMsg" :id="id" ref="formula" ></formula>
    <transition name="fade">
      <distCountry v-show="opendistCountry" :id="updateId" @getdata="getdata" @closedistCountry="closedistCountry" ref="distCountry"></distCountry>
    </transition>
  </div>
</template>
<script>
  import distCountry from './distCountry'
  import contentMsg from './paySalSetItemView'
  import formula from './formulaView'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        opendistCountry: false,
        selectPcyinsIns: [],
        select: '全部',
        total: NaN,
        updateId: '',
        logType: '',
        showMsg: false,
        showMsg1: false,
        sihfpcyinsIns: '',
        showType: 'Enabled',
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_payroll.paySalSetItem.payssiItemName'),
            key: 'payssiItemName',
          },
          {
            title: this.$t('lang_payroll.paySalSetItem.payssiItemtypeName'),
            key: 'payssiItemtypeName',
          },
          {
            title: this.$t('lang_payroll.paySalSetItem.payssiDatasource'),
            key: 'payssiDatasourceDis',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 150,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    display: this.showType != 'Enabled' ? 'none' : 'inline',
                  },
                  on: {
                    click: () => {
                      this.showMsgBtn(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  style: {
                    display: this.showType != 'Enabled' || params.row.payssiDatasource != '05formula' ? 'none' : 'inline',
                  },
                  on: {
                    click: () => {
                      this.showformual(params.row.id)
                    },
                  },
                }, this.$t('lang_payroll.paySalSetItem.payssiFormula')),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  style: {
//                    align: center,
                    display: this.showType != 'NotEnabled' ? 'none' : 'inline',
                  },
                  on: {
                    click: () => {
                      this.enabled(params.row.id, this.$store.state.paySalSet.childId1)
                    },
                  },
                }, this.$t('button.enabled')),
              ])
            },
          },
        ],
        butt: {
          title: this.$t('button.opr'),
          key: 'action',
          width: 150,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                },
                style: {
                  marginRight: '5px',
                  display: this.showType != 'Enabled' ? 'none' : 'inline',
                },
                on: {
                  click: () => {
                    this.showMsgBtn(params.row.id, this.$t('button.upd'), params.index)
                  },
                },
              }, this.$t('button.upd')),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                style: {
                  display: this.showType != 'Enabled' || params.row.payssiDatasource != '05formula' ? 'none' : 'inline',
                },
                on: {
                  click: () => {
                    this.showformual(params.row.id)
                  },
                },
              }, this.$t('lang_payroll.paySalSetItem.payssiFormula')),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                style: {
//                    align: center,
                  display: this.showType != 'NotEnabled' ? 'none' : 'inline',
                },
                on: {
                  click: () => {
                    this.enabled(params.row.id, this.$store.state.paySalSet.childId1)
                  },
                },
              }, this.$t('button.enabled')),
            ])
          },
        },
        data: [],
        params: {
          _mt: 'paySalSetItem.getPage',
          funId: '1',
          rows: 20,
          page: 1,
          sort: 'payssiOrder',
          order: 'asc',
          sihfpcyinsIns: '',
          payssiSsid: this.$store.state.paySalSet.childId1,
          logType: '',
        },
        index: '',
        tableselected: '',
      }
    },
    props: {
      id: Number,
      idname: String,
    },
    components: {
      contentMsg,
      formula,
      distCountry,
    },
    mounted() {
    },
    methods: {
      radioChange(value) {
        const t = this
        if (value === 'All') {
          this.columns.pop()
        } else if (this.columns.length <= 4) {
          this.columns.push(this.butt)
        }
        t.params.showType = value
        t.params.rows = 10
        t.params.page = 1
        t.getdata()
      },
      getdata() {
        const t = this
        t.params.logType = '查询List信息'
        t.params.payssiSsid = t.$store.state.paySalSet.childId1
        t.params.showType = t.showType
        const data = deepCopy(t.params)
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.total = res.data.content[0].records
            t.data = res.data.content[0].rows
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelect() {

      },
      selected(key, name) {
        this.select = name
        this.params.sihfpcyinsIns = key
        this.getdata()
      },
      pageChange(page) {
        const t = this
        t.params.page = page
        t.getdata()
      },
      sortable(column) {
        this.params.sort = column.key
        this.params.order = column.order
        if (this.params.order !== 'normal') {
          this.getdata()
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
                _mt: 'paySalSetItem.delByIds',
                funId: '1',
                companyId: '1000',
                logType: this.$t('button.del'),
                delIds: t.tableselected,
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.getdata()
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
      sizeChange(size) {
        const t = this
        t.params.rows = size
        t.getdata()
      },
      showMsgBtn(id, logType, index) {
        const t = this
        t.showMsg = true
        t.index = index
        t.logType = logType
        if (logType === this.$t('button.upd')) {
          t.$refs.contentMsg.setRowId(id)
        }
      },
      showformual(id) {
        const t = this
        t.showMsg1 = true
        t.$refs.formula.getData(id)
        // t.$refs.contentMsg.setRowId(id)
      },
      addNewArray(res) {
        const t = this
        if (t.data.length === 0) {
          t.data.push(res)
        } else {
          t.data.unshift(res)
        }
      },
      updateArray(res) {
        const t = this
        t.getdata()
      },
      hideMsg() {
        this.showMsg = false
        this.showMsg1 = false
      },
      enabled(id, ssid) {
        const t = this
        const params = { }
        params._mt = 'paySalSetItem.addOrUpd'
        params.logType = '启用'
        params.id = id
        params.showType = '启用'
        params.payssiSsid = ssid
        params.isValid = '1'
        getDataLevelUserLoginNew(params).then((res) => {
          if (isSuccess(res, t)) {
            t.getdata()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      opendistCoun() {
        const t = this
        t.updateId = 1000
          t.opendistCountry = true
          t.$refs.distCountry.getClumns1(this.$store.state.paySalSet.childId1)
//        t.$refs.distCountry.getOptional(1000)
      },
      closedistCountry() {
        const t = this
        t.opendistCountry = false
        //  t.$refs.distCountry.formValidate = {}
      },
      closedistCity() {
        const t = this
        t.opendistCity = false
        t.getdata()
        //  t.$refs.distCountry.formValidate = {}
      },
    },
  }
</script>
<style lang="scss" scoped>
  .content-main{
    height: 500px;
    .table-form{
      margin: 10px 0;
    }
  }
</style>
