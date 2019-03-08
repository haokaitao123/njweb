<template>
  <div class="table">
    <Row>
      <Col name="body" span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_payroll.payrollReport.payrollReport')}}
        </p>
        <Row>
          <Select style="width: 200px" clearable v-model="year"   :placeholder="$t('lang_payroll.paySalplan.pltpYearCheck')" @on-change ="getPeriod">
            <Option :value="item.fyYear" v-for="(item,index) in selectFyear" :key="index">{{item.fyYear}}</Option>
          </Select>
          <Select style="width: 200px" clearable ref="period"  v-if="hackReset" v-model="period" :placeholder="$t('lang_payroll.paySalplan.salplPeriodCheck')" v-bind:disabled="isFperiod" @on-change ="getPeriod1">
            <Option :value="item.fypdPeriod"  v-for="(item,index) in selectFperiod" :key="index">{{item.fypdPeriod}}</Option>
          </Select>
          <Select style="width: 200px" clearable  v-model="salset"  :placeholder="$t('lang_payroll.paySalplan.salplSalsetCheck')">
            <Option :value="item.id"  v-for="(item,index) in selectSalset" :key="index">{{item.payss}}</Option>
          </Select>
          <Select v-model="reporttype" clearable   style="width: 190px;" :placeholder="$t('lang_payroll.payrollReport.reporttypeIns')" @on-change ="change" >
            <Option :value="item.paramCode" v-for="(item,index) in taxreporttype" :key="index">{{item.paramInfoCn}}</Option>
          </Select>
          <Select v-model="bussource" clearable v-if="reporttype === '01jinsan'"  style="width: 190px;" :placeholder="$t('lang_payroll.payrollReport.bussourceIns')" >
            <Option :value="item.paramCode" v-for="(item,index) in itemType" :key="index">{{item.paramInfoCn}}</Option>
          </Select>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="init()">{{$t('button.gen')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <!--<transition name="fade">-->
      <!--<update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>-->
    <!--</transition>-->
    <transition >
      <expdow v-show="openExpDow" :filekey="filekey" :filename="filename"  @closeExpDowMain="closeExpDowMain" ref="expdow"></expdow>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import expdow from '../../../components/fileOperations/expdow'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        updateId: NaN,
        reporttype: '',
        filekey: '',
        filename: '',
        file: {
          name: '',
          key: '',
        },
        openExpDow: false,
        bussource: '',
        tableselected: [],
        selectFyear: [],
        selectFperiod: [],
        selectSalset: [],
        taxreporttype: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_payroll.payrollReport.payrlogSalsetDis'),
            key: 'payrlogSalsetDis',
          },
          {
            title: this.$t('lang_payroll.payrollReport.payrlogPeriod'),
            key: 'payrlogPeriod',
          },
          {
            title: this.$t('lang_payroll.payrollReport.payrlogTypeDis'),
            key: 'payrlogTypeDis',
          },
          {
            title: this.$t('lang_payroll.payrollReport.payrlogFilename'),
            key: 'payrlogFilename',
            ellipsis: true,
            render: (h, params) => {
              return h('div', [
                h('a', {
                  style: {
                    color: '#2db7f5',
                    display: params.row.payrlogFilename === 'no record' ? 'none' : 'inline',
                  },
                  on: {
                    click: () => {
                      this.downloadAttach(params.row.payrlogFilekey)
                    },
                  },
                }, params.row.payrlogFilename),
              ])
            },
          },
          {
            title: this.$t('lang_payroll.payrollReport.payrlogEmptype'),
            key: 'payrlogEmptype',
          },
          {
            title: this.$t('lang_payroll.payrollReport.createByDis'),
            key: 'createByDis',
          },
          {
            title: this.$t('lang_payroll.payrollReport.createTime'),
            key: 'createTime',
          },
        ],
        itemType: [
          {
            paramInfoCn: this.$t('lang_payroll.payrollReport.paramInfoName1'),
            paramCode: this.$t('lang_payroll.payrollReport.paramCode1'),
          },
          {
            paramInfoCn: this.$t('lang_payroll.payrollReport.paramInfoName2'),
            paramCode: this.$t('lang_payroll.payrollReport.paramCode2'),
          },
          {
            paramInfoCn: this.$t('lang_payroll.payrollReport.paramInfoName3'),
            paramCode: this.$t('lang_payroll.payrollReport.paramCode3'),
          },
          {
            paramInfoCn: this.$t('lang_payroll.payrollReport.paramInfoName4'),
            paramCode: this.$t('lang_payroll.payrollReport.paramCode4'),
          },
        ],
        isFperiod: true,
        hackReset: true,
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
        year: '',
        period: '',
        salset: '',
      }
    },
    computed: {
    },
    components: {
      expdow,
    },
    mounted() {
      this.getSelect()
      this.getData()
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'payPayreportLog.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          payrlogPeriod: t.period,
          payrlogSalset: t.salset,
          payrlogType: t.reporttype,
          payrlogEmptype: t.bussource,
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
      downloadAttach(vname) {
        const t = this
        let data = {
          _mt: 'userMgmt.getfiletoken',
          isprivate: true,
          logType: '下载附件消息',
          filekey: vname,
          expiresecs: 180,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
            if (this.isIE()) {
              window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(vname)
            } else {
              let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(vname)
              let link = document.createElement('a')
              link.href = doclink
              link.download = 'downloadfiletemp'
              link.click()
            }
            this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
            localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
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
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'taxreporttype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.taxreporttype = res.data.content[0].value[0].paramList.slice(0, 3)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getPeriod1(value) {
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
        t.period = ''
      },
      init(id) {
        const t = this
        if (t.period === '' || t.salset === '' || t.stockType === '' || (t.stockType === '01jinsan' && t.bussource === '')) {
            alert(this.$t('lang_payroll.payrollReport.initErr'))
        } else {
              getDataLevelUserLogin({
                _mt: 'payAccountEmp.getAccountReport',
                logType: '生成',
                period: t.period,
                salset: t.salset,
                stockType: t.reporttype,
                itemType: t.bussource,
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.filekey = res.data.content[0].filekey
                  t.filename = res.data.content[0].filename
                  t.openExpDow = true
                  t.$refs.expdow.getPriToken(t.filekey)
                  this.getData()
                }
              }).catch(() => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
        }
      },
      closeExpDowMain() {
        const t = this
        t.openExpDow = false
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
      change(value) {
        const t = this
        if (t.reporttype !== '01jinsan') {
          t.bussource = ''
        }
      },
//      setFileKey(filekey, filename, openExpDow) {
//        const t = this
//        t.filekey = filekey
//        t.filename = filename
//        t.openExpDow = openExpDow
//        t.$refs.expdow.getPriToken(t.filekey)
//      },
//      downloadFile() {
//        const t = this
//        let data = {
//          _mt: 'userMgmt.getfiletoken',
//          isprivate: true,
//          logType: '导出',
//          filekey: t.filekey,
//          expiresecs: 180,
//        }
//        getDataLevelUserLogin(data).then((res) => {
//          if (isSuccess(res, t)) {
//            let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.file.name)
////            window.location.href = doclink
//            let link = document.createElement('a')
//            link.href = doclink
//            link.download = 'downloadfiletemp'
//            link.click()
//          }
//        }).catch(() => {
//          t.$Modal.error({
//            title: this.$t('reminder.err'),
//            content: this.$t('reminder.errormessage'),
//          })
//        })
//      },
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
