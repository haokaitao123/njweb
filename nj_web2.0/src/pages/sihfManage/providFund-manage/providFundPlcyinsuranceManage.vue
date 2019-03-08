<template>
  <div class="content-main">
    <Row>
      <Dropdown>
        <Button type="primary">
          {{select}}
          <Icon type="arrow-down-b"></Icon>
        </Button>
        <DropdownMenu slot="list" >
                <span @click="selected('',$t('button.all'))">
                  <DropdownItem name="">{{$t('button.all')}}</DropdownItem>
                </span>
                <span v-for="(item,index) in selectPcyinsIns" :key="index" @click="selected(item.id,item.sscName)">
                  <DropdownItem>{{item.sscName}}</DropdownItem>
                </span>
        </DropdownMenu>
      </Dropdown>
      <Button type="primary" @click="showMsgBtn(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="data"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <contentMsg v-show="showMsg":logType="logType" :sihfpcy="sihfpcy" @hideMsg="hideMsg" :id="id" :idname="idname" ref="contentMsg" @getData="addNewArray" @update="updateArray" ></contentMsg>
  </div>
</template>
<script>
  import contentMsg from './providFundPlcyinsuranceView'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        selectPcyinsIns: [],
        select: this.$t('button.all'),
        total: NaN,
        logType: '',
        sihfpcy: '',
        showMsg: false,
        sihfpcyinsIns: '',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
            fixed: 'left',
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsHfPolicyName'),
            key: 'sihfpcyinsPolicyName',
            sortable: 'custom',
            width: 125,
            fixed: 'left',
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsOrder'),
            key: 'sihfpcyinsOrder',
            sortable: 'custom',
            width: 80,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsInsName'),
            key: 'sihfpcyinsInsName',
            sortable: 'custom',
            width: 100,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCbll'),
            key: 'sihfpcyinsCbll',
            sortable: 'custom',
            width: 150,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCbul'),
            key: 'sihfpcyinsCbul',
            sortable: 'custom',
            width: 150,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPbll'),
            key: 'sihfpcyinsPbll',
            sortable: 'custom',
            width: 150,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPbul'),
            key: 'sihfpcyinsPbul',
            sortable: 'custom',
            width: 150,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCrtypeName'),
            key: 'sihfpcyinsCrtypeName',
            sortable: 'custom',
            width: 130,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCr'),
            key: 'sihfpcyinsCr',
            sortable: 'custom',
            width: 105,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCrll'),
            key: 'sihfpcyinsCrll',
            sortable: 'custom',
            width: 130,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCrul'),
            key: 'sihfpcyinsCrul',
            sortable: 'custom',
            width: 130,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPrtypeName'),
            key: 'sihfpcyinsPrtypeName',
            sortable: 'custom',
            width: 130,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPr'),
            key: 'sihfpcyinsPr',
            sortable: 'custom',
            width: 105,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPrll'),
            key: 'sihfpcyinsPrll',
            sortable: 'custom',
            width: 130,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPrul'),
            key: 'sihfpcyinsPrul',
            sortable: 'custom',
            width: 130,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCall'),
            key: 'sihfpcyinsCall',
            sortable: 'custom',
            width: 150,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCaul'),
            key: 'sihfpcyinsCaul',
            sortable: 'custom',
            width: 150,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPall'),
            key: 'sihfpcyinsPall',
            sortable: 'custom',
            width: 150,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPaul'),
            key: 'sihfpcyinsPaul',
            sortable: 'custom',
            width: 150,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCarullName'),
            key: 'sihfpcyinsCarullName',
            sortable: 'custom',
            width: 150,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsParullName'),
            key: 'sihfpcyinsParullName',
            sortable: 'custom',
            width: 150,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsCaa'),
            key: 'sihfpcyinsCaa',
            sortable: 'custom',
            width: 130,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsPaa'),
            key: 'sihfpcyinsPaa',
            sortable: 'custom',
            width: 130,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPlcyinsurance.sihfpcyinsFrequency'),
            key: 'sihfpcyinsFrequency',
            sortable: 'custom',
            width: 100,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 64,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.showMsgBtn(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
              ])
            },
          },
        ],
        data: [],
        params: {
          _mt: 'sihfPlcyinsurance.getPage',
          funId: '1',
          rows: 10,
          page: 1,
          sort: 'sihfpcyinsOrder',
          order: 'asc',
          sihfpcyinsIns: '',
          sihfpcyinsPolicyid: this.$store.state.providFund.childId1,

          logType: '',
        },
        params2: {
          _mt: 'baseSscoverage.getSelectValue',
          funId: '1',
          sscType: '02hfund',
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
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getdata() {
        const t = this
        t.params.logType = '查询List信息'
        t.params.sihfpcyinsPolicyid = t.$store.state.providFund.childId1
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
        const t = this
        t.params2.logType = '查询选项信息'
        const data = deepCopy(t.params2)
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.selectPcyinsIns = res.data.content[0].value
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
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
          this.params.order = 'desc'
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
                _mt: 'sihfPlcyinsurance.delByIds',
                funId: '1',
                logType: this.$t('button.del'),
                ids: t.tableselected,
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = [] // 记得将选项数组清空
                  t.getdata()
                }
              }).catch(() => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            },
            onCancel: () => {
            },
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
        t.sihfpcy = t.$store.state.providFund.sihfpcy
        if (logType === this.$t('button.upd')) {
          t.$refs.contentMsg.setRowId(id)
        }
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
        t.data.splice(t.index, 1, res)
      },
      hideMsg() {
        this.showMsg = false
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
