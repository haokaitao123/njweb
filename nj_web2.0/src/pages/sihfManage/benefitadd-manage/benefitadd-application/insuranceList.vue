<template>
  <div class="content-main">
    <Row>
      <Dropdown>
        <Button type="primary">
          &nbsp;{{select}}
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
      <Button type="primary" @click="init">{{$t('button.ini')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="data"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=[rows] :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <contentMsg v-show="showMsg" :logType="logType" :sibaEntrydate="sibaEntrydate" :sibaBenefitpolicy="sibaBenefitpolicy" :selectPcyinsIns="selectPcyinsIns" @hideMsg="hideMsg" :id="id" :idname="idname" ref="contentMsg" @getData="getdata" @update="updateArray" ></contentMsg>
  </div>
</template>
<script>
  import contentMsg from './editInsurance'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  export default {
    data() {
      return {
        logType: '',
        total: NaN,
        showMsg: false,
        select: this.$t('button.all'),
        sibaEntrydate: '',
        sibaBenefitpolicy: '',
        selectPcyinsIns: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_sihfPolicy.benefitaddInsurance.sibainsInsurance'),
            key: 'sibainsInsuranceDis',
            width: 150,
          },
          {
            title: this.$t('lang_sihfPolicy.benefitaddInsurance.sibainsBaseamt'),
            key: 'sibainsBaseamt',
            width: 150,
          },
          {
            title: this.$t('lang_sihfPolicy.benefitaddInsurance.sibainsCompratio'),
            key: 'sibainsCompratio',
            width: 150,
          },
          {
            title: this.$t('lang_sihfPolicy.benefitaddInsurance.sibainsCompamt'),
            key: 'sibainsCompamt',
            width: 150,
          },
          {
            title: this.$t('lang_sihfPolicy.benefitaddInsurance.sibainsPersratio'),
            key: 'sibainsPersratio',
            width: 150,
          },
          {
            title: this.$t('lang_sihfPolicy.benefitaddInsurance.sibainsPersamt'),
            key: 'sibainsPersamt',
            width: 150,
          },
          {
            title: this.$t('lang_sihfPolicy.benefitaddInsurance.sibaEntrydate'),
            key: 'sibaEntrydate',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_sihfPolicy.benefitaddInsurance.sibainsApplymonth'),
            key: 'sibainsApplymonth',
            width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 64,
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
          _mt: 'sihfBenefitaddInsurance.getPage',
          funId: '1',
          rows: 20,
          page: 1,
          sort: 'id',
          order: 'asc',
          logType: '',
          sibainsBaid: '',
          sibainsInsurance: '',
        },
        params2: {
          _mt: 'baseSscoverage.getSelectValue',
          funId: '1',
          sscType: '01social',
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
      get(id, sibaEntrydate, sibaBenefitpolicy) {
        this.sibaBenefitpolicy = sibaBenefitpolicy
        this.sibaEntrydate = sibaEntrydate
        this.params.sibainsBaid = id + ''
        this.params.logType = '查询List信息'
        this.getdata()
      },
      getdata() {
        const t = this
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
            if (t.data.length > 0) {
              for (let i = 0; i < t.data.length; i++) {
                t.data[i].sibaEntrydate = this.sibaEntrydate
              }
            }
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
        this.params.sibainsInsurance = key
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
        getDataLevelUserLogin({
          _mt: 'sihfBenefitaddInsurance.delByIds',
          funId: '1',
          logType: this.$t('button.del'),
          delIds: t.tableselected,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.getdata()
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.initSuccess'),
            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      sizeChange(size) {
        const t = this
        t.params.rows = size
        t.getdata()
      },
      showMsgBtn(id, logType, index) {
        const t = this
        t.showMsg = true
        t.logType = logType
        t.index = index
        t.$refs.contentMsg.setRowId(id)
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
      clear() {
        this.params.sibainsInsurance = ''
        this.select = this.$t('button.all')
      },
      hideMsg() {
        this.showMsg = false
      },
      /**
       * 重新初始化主表
       */
      init() {
        const t = this
        t.$Modal.confirm({
          title: this.$t('reminder.remind'),
          content: this.$t('reminder.isInit'),
          onOk: () => {
            const params = {
              _mt: 'sihfBenefitadd.init',
              id: t.id,
              logType: '初始化险种明细',
            }
            getDataLevelUserLogin(params).then((res) => {
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
          onCancel: () => {

          },
        })
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
