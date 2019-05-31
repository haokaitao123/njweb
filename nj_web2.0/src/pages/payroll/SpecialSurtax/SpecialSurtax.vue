<template>
  <div class="table">
    <Row>
      <Col name="body" span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;专项附加扣除
        </p>
        <Row>
          <span>
           扣除年度:
            <Select style="width: 200px" clearable v-model="year"   placeholder="请输入扣除年度" @on-change ="getPeriod">
            <Option :value="item.fyYear" v-for="(item,index) in selectFyear" :key="index">{{item.fyYear}}</Option>
          </Select>
          </span>
          <Button type="primary" @click="getData(1)">查看</Button>
          <Button type="primary" @click="importExcel">{{$t('button.imp')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable"
                 @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns"
                 :data="data"></Table>
        </row>
        <Row style="display: flex">
          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page"
                @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]"></Page>
          <Button type="ghost" size="small" shape="circle" icon="refresh"
                  style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
        </Row>
      </card>
      </Col>
    </Row>
    <div class="cover" v-if="openUpdate">
      <div class="box" style="padding-top: 20px;height: 101%">
        <div style="display: flex;justify-content: space-between">
          <span style="font-size: 15px;font-weight: bold">员工信息</span>
          <Button type="text"  @click="close1">
            <Icon type="close-round" size="16"></Icon>
          </Button>
        </div>
        <Row>
          <i-switch v-model="switch1" size="large" @on-change="changeOpen">
            员工信息<span slot="open">折叠</span>
            员工信息<span slot="close">展开</span>
          </i-switch>
        </Row>
        <Row :style="{height: this.Height + 'px'}" class="demo1">
        <!--<Row style="max-height: 420px;overflow-y: auto">-->
              <Form :model="form" label-position="right" ref="form" :label-width="110">
                <i-col span="11">
                  <FormItem label="姓名" style="margin-bottom: 10px">
                    <Input v-model="form.taxCname"  disabled />
                  </FormItem>
                </i-col>
                <i-col span="12" offset="1">
                  <FormItem label="证件类型" style="margin-bottom: 10px">
                    <Input v-model="form.taxIdtypeDis"  disabled />
                  </FormItem>
                </i-col>
                <i-col span="11">
                  <FormItem label="证件号码" style="margin-bottom: 10px">
                    <Input v-model="form.taxIdno"  disabled />
                  </FormItem>
                </i-col>
                <i-col span="12" offset="1" >
                  <FormItem label="纳税人识别号" style="margin-bottom: 10px">
                    <Input v-model="form.taxNo" disabled></Input>
                  </FormItem>
                </i-col>
                <i-col span="11">
                  <FormItem label="手机号码" style="margin-bottom: 10px">
                    <Input v-model="form.taxPhone" disabled ></Input>
                  </FormItem>
                </i-col>
                <i-col span="12" offset="1">
                  <FormItem label="邮箱" style="margin-bottom: 10px">
                    <Input v-model="form.taxEmail" disabled ></Input>
                  </FormItem>
                </i-col>
                <i-col span="11">
                  <FormItem label="扣缴义务人纳税人识别号" style="margin-bottom: 10px">
                    <Input v-model="form.taxAgentno" disabled ></Input>
                  </FormItem>
                </i-col>
                <i-col span="12" offset="1">
                  <FormItem label="扣缴义务人名称" style="margin-bottom: 10px">
                    <Input v-model="form.taxAgentname" disabled></Input>
                  </FormItem>
                </i-col>
                <i-col span="24">
                  <FormItem label="联系地址" style="margin-bottom: 10px">
                    <Input v-model="form.taxAddress" disabled ></Input>
                  </FormItem>
                </i-col>
                <i-col span="11">
                  <FormItem label="配偶情况" style="margin-bottom: 10px">
                    <Input v-model="form.taxMarrystatusDis" disabled ></Input>
                  </FormItem>
                </i-col>
                <i-col span="12" offset="1">
                  <FormItem label="配偶姓名" style="margin-bottom: 10px">
                    <Input v-model="form.taxSpouse" disabled ></Input>
                  </FormItem>
                </i-col>
                <i-col span="11">
                  <FormItem label="配偶证件类型" style="margin-bottom: 10px">
                    <Input v-model="form.taxSpouseidtypeDis" disabled ></Input>
                  </FormItem>
                </i-col>
                <i-col span="12" offset="1">
                  <FormItem label="配偶证件号码" style="margin-bottom: 10px">
                    <Input v-model="form.taxSpouseidno" disabled ></Input>
                  </FormItem>
                </i-col>
              </Form>
        </Row>
        <Row>
          <i-col span="24" class="demo-tabs-style3">
            <Tabs type="card">
              <TabPane label="继续教育" name="name1">
                <issueOne :mainId = "mainId" ref="issueOne" :selectFyear="selectFyear" :tableheight="tableheight1"></issueOne>
              </TabPane>
              <TabPane label="子女教育" name="name2">
                <issueTwo :mainId = "mainId" ref="issueTwo"></issueTwo>
              </TabPane>
              <TabPane label="大病医疗" name="name3">
                <issueThree :mainId = "mainId" ref="issueThree"></issueThree>
              </TabPane>
              <TabPane label="住房贷款" name="name5">
                <issueFour :mainId = "mainId" ref="issueFour"></issueFour>
              </TabPane>
              <TabPane label="住房租金" name="name6">
                <housingLease :mainId = "mainId" ref="housingLease"></housingLease>
              </TabPane>
              <TabPane label="赡养老人" name="name7">
                <issueSix  :mainId = "mainId" :id="form.id" ref="issueSix"></issueSix>
              </TabPane>
            </Tabs>
          </i-col>
        </Row>
      </div>
    </div>
    <transition name="fade">
      <importExcel v-show="openImport" :impid="updateId" :imp_mt="imp_mt"  @closeImport="closeImport"ref="importExcel"></importExcel>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import issueOne from './issueOne.vue'
  import issueTwo from './issueTwo.vue'
  import issueThree from './issueThree.vue'
  import issueFour from './issueFour.vue'
  import housingLease from './housingLease.vue'
  import issueSix from './issueSix.vue'
  import importExcel from '../../../components/importModel/importParam'

  export default {
    data() {
      return {
        imp_mt: 'taxUser.importData',
        openImport: false,
        tableheight: document.body.offsetHeight - 280,
        tableheight1: document.body.offsetHeight - 300,
        value: '',
        value1: '1',
        logType: '',
        openUpdate: false,
        updateId: NaN,
        reporttype: '',
        ChildHeight: 300,
        filekey: '',
        filename: '',
        mainId: '',
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
        switch1: false,
        Height: 120,
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
            fixed: 'left',
          },
          {
            title: '扣除年度',
            key: 'taxYear',
            fixed: 'left',
            width: 80,
          },
          {
            title: '姓名',
            key: 'taxCname',
            fixed: 'left',
            width: 80,
          },
          {
            title: '证件类型',
            key: 'taxIdtypeDis',
            width: 100,
          },
          {
            title: '证件号码',
            key: 'taxIdno',
            width: 120,
          },
          {
            title: '纳税人识别号',
            key: 'taxNo',
            width: 130,
          },
          {
            title: '手机号',
            key: 'taxPhone',
            width: 100,
          },
          {
            title: '邮箱',
            key: 'taxEmail',
            width: 120,
          },
          {
            title: '扣缴义务人纳税人识别号',
            key: 'taxAgentno',
            width: 170,
          },
          {
            title: '扣缴义务人名称',
            key: 'taxAgentname',
            width: 100,
          },
          {
            title: '联系地址',
            key: 'taxAddress',
            width: 100,
          },
          {
            title: '配偶情况',
            key: 'taxMarrystatusDis',
            width: 100,
          },
          {
            title: '配偶姓名',
            key: 'taxSpouse',
            width: 90,
          },
          {
            title: '配偶证件类型',
            key: 'taxSpouseidtypeDis',
            width: 130,
          },
          {
            title: '配偶证件号码',
            key: 'taxSpouseidno',
            width: 130,
          },
          {
            title: '是否是独生子女',
            key: 'taxOnlychildDis',
            width: 120,
          },
          {
            title: '分摊方式',
            key: 'taxSharetypeDis',
            width: 130,
          },
          {
            title: '本年度月扣除金额（赡养）',
            key: 'taxShareamout',
            width: 150,
          },
          {
            title: '操作',
            key: 'payrlogFilename',
            ellipsis: true,
            width: 100,
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
                    display: params.row.payrlogFilename === 'no record' ? 'none' : 'inline',
                  },
                  on: {
                    click: () => {
                      this.openSps(params.row.id)
                    },
                  },
                }, '查看'),
              ])
            },
          },
        ],
        itemType: [
          {
            paramInfoName: this.$t('lang_payroll.payrollReport.paramInfoName1'),
            paramCode: this.$t('lang_payroll.payrollReport.paramCode1'),
          },
          {
            paramInfoName: this.$t('lang_payroll.payrollReport.paramInfoName2'),
            paramCode: this.$t('lang_payroll.payrollReport.paramCode2'),
          },
          {
            paramInfoName: this.$t('lang_payroll.payrollReport.paramInfoName3'),
            paramCode: this.$t('lang_payroll.payrollReport.paramCode3'),
          },
          {
            paramInfoName: this.$t('lang_payroll.payrollReport.paramInfoName4'),
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
        form: {},
      }
    },
    computed: {},
    components: {
      issueOne,
      issueTwo,
      issueThree,
      issueFour,
      housingLease,
      issueSix,
      importExcel,
    },
    mounted() {
      this.getSelect()
      this.getData()
    },
    methods: {
      changeOpen(status) {
        if (status) {
          this.Height = 305
          this.$refs.issueOne.tableheight = document.body.offsetHeight - 450
          this.$refs.issueTwo.tableheight = document.body.offsetHeight - 450
          this.$refs.issueThree.tableheight = document.body.offsetHeight - 450
          this.$refs.issueFour.tableheight = document.body.offsetHeight - 450
          this.$refs.housingLease.tableheight = document.body.offsetHeight - 450
          this.$refs.issueSix.tableheight = document.body.offsetHeight - 450
        } else {
          this.Height = 120
          this.$refs.issueOne.tableheight = document.body.offsetHeight - 300
          this.$refs.issueTwo.tableheight = document.body.offsetHeight - 250
          this.$refs.issueThree.tableheight = document.body.offsetHeight - 250
          this.$refs.issueFour.tableheight = document.body.offsetHeight - 250
          this.$refs.housingLease.tableheight = document.body.offsetHeight - 250
          this.$refs.issueSix.tableheight = document.body.offsetHeight - 320
        }
      },
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'taxUser.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          taxYear: t.year,
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
      openSps(id) {
        this.openUpdate = true
        const t = this
        getDataLevelUserLogin({
          _mt: 'taxUser.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            this.form = res.data.content[0]
            console.log(res.data.content[0])
            console.log(this.form)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
        this.mainId = id
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
      },
      getPeriod1(value) {
        this.hackReset = false
        this.$nextTick(() => {
          this.hackReset = true
        })
      },
      closeImport() {
        const t = this
        t.openImport = false
      },
      importExcel() {
        const t = this
        t.openImport = true
        t.$refs.importExcel.getDowModelFile()
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
      close1() {
        this.openUpdate = false
        this.switch1 = false
        this.Height = 120
        this.$refs.issueOne.tableheight = document.body.offsetHeight - 300
        this.$refs.issueTwo.tableheight = document.body.offsetHeight - 250
        this.$refs.issueThree.tableheight = document.body.offsetHeight - 250
        this.$refs.issueFour.tableheight = document.body.offsetHeight - 250
        this.$refs.housingLease.tableheight = document.body.offsetHeight - 250
        this.$refs.issueSix.tableheight = document.body.offsetHeight - 320
      },
    },
  }
</script>
<style>
  .demo-tabs-style3 .ivu-tabs-nav-scroll {
    width: 100%;
  }

  .demo-tabs-style3 .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
    border-radius: 0;
    background: #fff;
    width: 136px;
    text-align: center;
    height: 31px;
  }

  .demo-tabs-style3 .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar {
    width: 100%;
    /*background: #18BE6A;*/
    margin-bottom: 5px;
  }

  .demo-tabs-style3 .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
    background: #318EF0;
    color: #FFFFFF;
  }

  .demo-tabs-style3 .ivu-tabs-nav-container {
    font-size: 14px;
  }
</style>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .table-form {
    margin: 10px 0;
  }

  .margin-right-10 {
    margin-right: 10px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .demo1{
    overflow-y: hidden;
  }
</style>
