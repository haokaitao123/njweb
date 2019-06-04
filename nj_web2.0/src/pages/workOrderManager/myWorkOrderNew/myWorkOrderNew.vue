<!---->
<template>
  <Row style="background: white;border-radius: 5px">
    <Col span="24">
    <p class="p1">
      <Icon type="mouse"></Icon>
      &nbsp;{{$t('lang_communication.myWorkOrderNew.title')}}
    </p>
      <Row class="demo-tabs-style2">
        <Tabs type="card" @on-click="tabClick">
          <TabPane :label="$t('lang_communication.myWorkOrderNew.paneTitle1')" icon="chatboxes" name="name5">
            <div class="table">
              <Row>
                <Col span="24">
                <Row v-if="totalQ > 0 || totalF > 0">
                  <p class="pTitle2">
                    {{$t('lang_communication.myWorkOrderNew.pTitle2')}}：<a v-if="totalF > 0">{{$t('lang_communication.workStatus.cmwdStatus5')}} [ {{totalF}} ]</a>  <span v-if="totalQ > 0 && totalF > 0">/</span>  <a v-if="totalQ > 0">{{$t('lang_communication.workStatus.cmwdStatus6')}} [ {{totalQ}} ]</a>
                  </p>
                </Row>
                <Row style="padding: 0 16px;box-sizing: border-box">
                  <i-col span="24">
			            <span @dblclick="clearKnowType">
			              {{$t('lang_communication.workorderSearch.cmwdType')}}：<Input v-model="cmwdTypeDis" icon="search" :readonly="true" :placeholder="$t('lang_communication.workorderSearch.cmwdTypeDis')" style="width: 110px;" @on-click="pickData" />
			            </span>
                    {{$t('lang_communication.workorderSearch.cmwdCode')}}：<Input :placeholder="$t('lang_communication.workorderSearch.cmwdCodeDis')" v-model="cmwdCode" style="width: 120px;" />
                    {{$t('lang_communication.workorderSearch.createTime')}}：<DatePicker type="datetime" v-model="ranTimeLeft" @on-change="search"  :placeholder="$t('lang_communication.myWorkOrderNew.ranTimeLeftDis')"  style="width: 110px;" />
                             <span style="color: #C3C3C3;"></span>
                             <DatePicker type="datetime" v-model="ranTimeRight" :placeholder="$t('lang_communication.myWorkOrderNew.ranTimeRightDis')" style="width: 110px;"/>
                    {{$t('lang_communication.myWorkOrderNew.cmwdkeyWord')}}：<Input :placeholder="$t('lang_communication.myWorkOrderNew.cmwdkeyWordDis')"  v-model="cmwdkeyWord" style="width: 110px;"  />
                    <Button type="primary" @click="search">{{$t('button.ser')}}</Button>
                    <Button type="primary" style="background: #339966;border-color:#339966" @click="start">{{$t('button.start')}}</Button>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="24">
                    <Row style="margin: 10px 0;">
                      <Table style="width:100% !important;" :height="tableheight" size="small" :columns="columns" :data="data"></Table>
                    </Row>
                    <Row style="display: flex">
                      <Page :total="total" :current="page" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=[rows] :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
                  </i-col>
                </Row>
                </Col>
              </Row>
            </div>
          </TabPane>
          <!---->
          <TabPane :label="$t('lang_communication.myWorkOrderNew.businessOrder')" icon="merge" name="name6" >
            <businessOrder ref="businessOrder"></businessOrder>
          </TabPane>
        </Tabs>
      </Row>
      <transition name="fade">
        <searchTable v-show="openPick" :searchTitle="searchTitle" :searchCloumns="searchCloumns"  :params="params" @closeUp="closeUp" @changeinput="changeinput" ref="searchTable"></searchTable>
      </transition>
      <transition name="fade">
        <div class="background" v-if="commitWorkOrder">
          <commitWorkOrder></commitWorkOrder>
        </div>
      </transition>
    <!--工单详情-->
    <transition name="fade">
      <div class="background" v-if="orderDetailList">
        <orderDetailList ref="orderDetailList" @lookDetailNew="lookDetailNew" @getData="getData" @getTotal="getTotal"></orderDetailList>
      </div>
    </transition>
    <!--业务工单  问题类型选项-->
    <transition name="fade">
      <div class="background" v-if="this.$store.state.myWorkOrderNew.ProblemTypes">
          <Row style="width: 500px; height: 350px;background: white;border-radius: 10px;padding: 10px">
            <Col span="24">
              <p class="pTitle">
                <span>
                  <Icon type="mouse"></Icon>
                  {{$t('lang_communication.myWorkOrderNew.businessOrderType')}}
                </span>
                <Button type="text"  @click="close1">
                  <Icon type="close-round" size="16"></Icon>
                </Button>
              </p>
            </Col>
            <Col span="24">
               <div class="pText" v-for="item,index in this.$store.state.myWorkOrderNew.ProblemTypesList">
                 <p style="color: #1c2438;font-weight:700;font-size: 14px;width: 140px;padding: 5px;display: flex;align-items: center">
                   <img :src="'../../../../static/indexImg/' + index.split('_')[2]" style="width: 18px;height: 18px;margin-right: 5px" alt="">{{index.split("_")[1]}}
                 </p>
                 <p style="padding-left: 20px">
                   <span v-for="items,indexs in item" style="border-right: 1px solid #d8d8d8" @click="problemType(items.cmutKntypeName,items.cmutKntypeProcessid,items.flowId,items.id)">{{items.cmutKntypeName}}</span>
                 </p>
               </div>
            </Col>
          </Row>
      </div>
    </transition>
    <transition name="fade">
      <div class="background" v-if="this.$store.state.myWorkOrderNew.commonFlowUpdate">
        <update ref="commonFlowUpdate" @close="close2"></update>
      </div>
    </transition>
    </Col>
  </Row>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchTable from '../../../components/searchTable/searchKnowType'
  import commitWorkOrder from '../commitWorkOrder/commitWorkOrder'
  import orderDetailList from '../myWorkOrder/orderDetail'
  import businessOrder from './businessOrder'
  import update from '../commonFlowList/commonFlowUpdate'
  import Bus from '../bus'
  export default {
    name: 'myWorkOrderNew',
    data() {
      return {
        // 咨询工单
        openPick: false,
        tableheight: document.body.offsetHeight - 280,
        totalF: 0,
        totalQ: 0,
        data: [],
        cmwdCode: '',
        cmwdType: '',
        cmwdTypeDis: '',
        cmwdkeyWord: '',
        ranTimeLeft: '',
        ranTimeRight: '',
        sort: 'id',
        order: 'desc',
        rows: 20,
        page: 1,
        total: NaN,
        commitWorkOrder: false,
        searchTitle: this.$t('lang_communication.workorderSearch.serchTitle'),
        searchCloumns: [
          {
            title: this.$t('lang_communication.workorderSearch.cmutKntypeCode'),
            key: 'cmutKntypeCode',
            sortable: 'custom',
            width: 253,
          },
          {
            title: this.$t('lang_communication.workorderSearch.cmutKntypeName'),
            key: 'cmutKntypeName',
            sortable: 'custom',
            width: 253,
          },
        ],
        params: {
          _mt: 'cmutKnlType.getPage',
          sort: 'cmutKntypeCode',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          cmutKntypeBusprop: '01consultation',
        },
        columns: [
//          {
//            type: 'selection',
//            width: 60,
//            align: 'center'
//          },
          {
            title: this.$t('lang_communication.allotWorkOrder.cmwdCode'),
            key: 'cmwdCode',
            width: '200',
            align: 'left',
          },
          {
            title: this.$t('lang_communication.allotWorkOrder.cmwdDesc'),
            key: 'cmwdDesc',
            ellipsis: true,
            width: '200',
            align: 'left',
//          		className: 'table-column',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  style: {
                    color: '#2db7f5',
                  },
                  on: {
                    click: () => {
                      this.lookDetail(params.row)
                    },
                  },
                }, params.row.cmwdDesc),
              ])
            },
          },
          {
            title: this.$t('lang_communication.allotWorkOrder.cmwdType'),
            key: 'cmwdTypeDis',
            align: 'left',
            width: '200',
          },
          {
            title: this.$t('lang_communication.allotWorkOrder.cmwdPriority'),
            key: 'cmwdPriorityDis',
            align: 'left',
            width: '200',
          },
          {
            title: this.$t('lang_communication.allotWorkOrder.createTime'),
            key: 'createTime',
            width: '200',
            align: 'left',
          },
//          {
//            title: '工单属性',
//            key: 'cmwdPropertyDis',
//            align: 'left',
//            width: '150',
//          },
          {
            title: this.$t('lang_communication.allotWorkOrder.cmwdStatus'),
            key: 'cmwdStatusDis',
            width: '150',
            align: 'left',
            filters: [
              {
                label: this.$t('lang_communication.workStatus.cmwdStatus9'),
                value: 1
              },
              {
                label: this.$t('lang_communication.workStatus.cmwdStatus2'),
                value: 2
              },
              {
                label: this.$t('lang_communication.workStatus.cmwdStatus3'),
                value: 3
              },
              {
                label: this.$t('lang_communication.workStatus.cmwdStatus4'),
                value: 4
              },
              {
                label: this.$t('lang_communication.workStatus.cmwdStatus5'),
                value: 5
              },
              {
                label: this.$t('lang_communication.workStatus.cmwdStatus6'),
                value: 6
              },
              {
                label: this.$t('lang_communication.workStatus.cmwdStatus7'),
                value: 7
              },
              {
                label: this.$t('lang_communication.workStatus.cmwdStatus8'),
                value: 8
              },
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              if (value === 1) {
                return row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus9')
              } else if (value === 2) {
                return row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus2')
              } else if (value === 3) {
                return row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus3')
              } else if (value === 4) {
                return row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus4')
              } else if (value === 5) {
                return row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus5')
              } else if (value === 6) {
                return row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus6')
              } else if (value === 7) {
                return row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus7')
              } else if (value === 8) {
                return row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus8')
              }
            },
          },
          {
            title: this.$t('button.opr'),
            key: '',
            width: '120',
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              if (params.row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus9')) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                    },
                    on: {
                      click: () => {
                        this.lookDetail(params.row)
                      },
                    },
                  }, this.$t('button.view')),
                ])
              } else if (params.row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus7')) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                      marginRight: '10px',
                    },
                    style: {
			                  	marginRight: '10px',
			                  },
                    on: {
                      click: () => {
                        this.lookDetail(params.row)
                      },
                    },
                  }, this.$t('button.view')),
//			                h('a', {
//			                  style: {
//			                  	marginRight: '10px',
//			                  	fontSize: '13px',
//			                  	color: '#2db7f5',
//			                  },
//			                  on: {
//			                    click: () => {
//			                      this.deleteOrder(params.row.id)
//			                    },
//			                  },
//			                }, '删除'),
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                      fontSize: '13px',
                      marginLeft: '10px',
                    },
                    on: {
                      click: () => {
                        this.evaluate(params.row)
                      },
                    },
                  }, this.$t('button.eva')),
                ])
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                      fontSize: '13px',
                    },
                    on: {
                      click: () => {
                        this.lookDetail(params.row)
                      },
                    },
                  }, this.$t('button.view')),
//			                h('a', {
//			                  style: {
//			                  	fontSize: '13px',
//			                  	color: '#2db7f5',
//			                  },
//			                  on: {
//			                    click: () => {
//			                      this.deleteOrder(params.row.id)
//			                    },
//			                  },
//			                }, '删除'),
                ])
              }
            },
          },
        ],
        orderDetailList: false,
//        businessOrderType: this.$store.state.myWorkOrderNew.ProblemTypes,
        commonFlowUpdate: false,
      }
    },
    components: {
      searchTable,
      commitWorkOrder,
      orderDetailList,
      businessOrder,
      update,
    },
    mounted() {
      this.getData()
      this.getTotal()
      Bus.$on('closeAll', (res) => {
        if (res) {
          this.getData()
        }
        this.commitWorkOrder = false
      })
      Bus.$on('orderDetailList', () => {
        this.orderDetailList = false
      })
//      this.$refs.commonFlowUpdate.getColumns()
      console.log(this.$refs.commonFlowUpdate)
    },
    methods: {
      // 咨询工单
      getTotal() {
        const t = this
        const data = {
          _mt: 'cmutWorkorder.getCountByState',
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.totalF = res.data.content[0].value.split(',')[0]
            t.totalQ = res.data.content[0].value.split(',')[1]
            t.$store.commit('workOrder/setAllTotal', Number(t.totalF) + Number(t.totalQ) )
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      pickData() {
        const t = this
        t.$refs.searchTable.getData(this.params)
        t.openPick = true
      },
      changeinput(name, id) {
        const t = this
        t.cmwdTypeDis = name
        t.cmwdType = id
      },
      closeUp() {
        const t = this
        t.openPick = false
      },
      clearKnowType() {
        const t = this
        t.cmwdTypeDis = ''
        t.cmwdType = ''
      },
      search() {
        const t = this
        t.page = 1
        t.getData()
      },
      getData() {
        const t = this
        const data = {
          _mt: 'cmutWorkorder.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          logType: this.$t('button.ser'),
          data: '',
        }
        data['cmwdCode'] = t.cmwdCode
        data['cmwdType'] = t.cmwdType
        data['cmwdkeyWord'] = t.cmwdkeyWord
        data['cmwdWotypeprop'] = '01consultation'
        if (t.ranTimeLeft !== undefined) {
          data['ranTimeLeft'] = t.ranTimeLeft === '' ? '' : new Date(t.ranTimeLeft).format('yyyy-MM-dd hh:mm:ss')
        }
        if (t.ranTimeRight !== undefined) {
          data['ranTimeRight'] = t.ranTimeRight === '' ? '' : new Date(t.ranTimeRight).format('yyyy-MM-dd hh:mm:ss')
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
            console.log(t.data)
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
        t.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData()
      },
      // 查看
      lookDetail(pRow) {
        const row = deepCopy(pRow)
        /// 点击查看的时候存取funID cmwdMarkno orderBusiPro
        this.$store.commit('workOrder/setIsfunId', row.functionId)
        this.$store.commit('workOrder/setCmwdMarkno', row.cmwdMarkno)
        this.$store.commit('workOrder/setOrderBusiPro', row.orderBusiPro)
        this.$store.commit('workOrder/setbtnShow', false)
        this.getFirstAttachData(row)
//	        	this.getCommunRecordData(row.id)
        //切换到详情页面
        this.$store.commit('workOrder/setOrderTemp', 'detail')
        //提交详情信息
        this.$store.commit('workOrder/seachOrderDetail', row)
        //切换到评价或反馈
        if(row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus7')) {
          this.$store.commit('workOrder/setOnlyRecord', true)
          this.$store.commit('workOrder/setBackOrEvalu', false)
        } else if (row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus8')) {
          this.$store.commit('workOrder/setOnlyRecord', false)
          this.$store.commit('workOrder/setBackOrEvalu', false)
        } else if (pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus9')) {
          this.$store.commit('workOrder/setOnlyRecord', false)
        } else {
          this.$store.commit('workOrder/setBackOrEvalu', true)
          this.$store.commit('workOrder/setOnlyRecord', true)
        }
        //切换步骤条状态
        if (row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus9')) {
          this.$store.commit('workOrder/setStepStaus', 0) //第一步
          this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus1'))
          this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus10'))
          this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus11'))
          this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepContent1', this.$t('lang_communication.workStatus.content1'))
          this.$store.commit('workOrder/setStepContent2', '')
          this.$store.commit('workOrder/setStepContent3', '')
          this.$store.commit('workOrder/setStepContent4', '')
        } else if (row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus5') || row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus6') || row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus7')) {
          this.$store.commit('workOrder/setStepStaus', 2) //第三步
          this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus12'))
          this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus13'))
          this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus11'))
          this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepContent1', '')
          this.$store.commit('workOrder/setStepContent2', '')
          this.$store.commit('workOrder/setStepContent3', row.cmwdStatusDis)
          this.$store.commit('workOrder/setStepContent4', '')
        } else if (row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus8')) {
          this.$store.commit('workOrder/setStepStaus', 3) //第四步
          this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus12'))
          this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus13'))
          this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus14'))
          this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepContent1', '')
          this.$store.commit('workOrder/setStepContent2', '')
          this.$store.commit('workOrder/setStepContent3', '')
          this.$store.commit('workOrder/setStepContent4', this.$t('lang_communication.workStatus.content2') +  '：' + row.cmwdActtime + this.$t('lang_communication.workStatus.minute'))
        } else {
          this.$store.commit('workOrder/setStepStaus', 1) //第二步
          this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus12'))
          this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus10'))
          this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus11'))
          this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepContent1', '')
          this.$store.commit('workOrder/setStepContent2', row.cmwdStatusDis)
          this.$store.commit('workOrder/setStepContent3', '')
          this.$store.commit('workOrder/setStepContent4', '')
        }
        this.orderDetailList = true
      },
      // 查看
      lookDetailNew(pRow) {
        const row = deepCopy(pRow)
        /// 点击查看的时候存取funID cmwdMarkno orderBusiPro
        this.$store.commit('workOrder/setIsfunId', row.functionId)
        this.$store.commit('workOrder/setCmwdMarkno', row.cmwdMarkno)
        this.$store.commit('workOrder/setOrderBusiPro', row.orderBusiPro)
        this.$store.commit('workOrder/setbtnShow', false)
        this.getFirstAttachData(row)
//	        	this.getCommunRecordData(row.id)
        //切换到详情页面
        this.$store.commit('workOrder/setOrderTemp', 'detail')
        //提交详情信息
        this.$store.commit('workOrder/seachOrderDetail', row)
        //切换到评价或反馈
        if(row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus7')) {
          this.$store.commit('workOrder/setOnlyRecord', true)
          this.$store.commit('workOrder/setBackOrEvalu', false)
        } else if (row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus8')) {
          this.$store.commit('workOrder/setOnlyRecord', false)
          this.$store.commit('workOrder/setBackOrEvalu', false)
        } else {
          this.$store.commit('workOrder/setBackOrEvalu', true)
          this.$store.commit('workOrder/setOnlyRecord', true)
        }
        //切换步骤条状态
        if (row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus9')) {
          this.$store.commit('workOrder/setStepStaus', 0) //第一步
          this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus1'))
          this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus10'))
          this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus11'))
          this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepContent1', this.$t('lang_communication.workStatus.content1'))
          this.$store.commit('workOrder/setStepContent2', '')
          this.$store.commit('workOrder/setStepContent3', '')
          this.$store.commit('workOrder/setStepContent4', '')
        } else if (row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus5') || row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus6') || row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus7')) {
          this.$store.commit('workOrder/setStepStaus', 2) //第三步
          this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus12'))
          this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus13'))
          this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus11'))
          this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepContent1', '')
          this.$store.commit('workOrder/setStepContent2', '')
          this.$store.commit('workOrder/setStepContent3', row.cmwdStatusDis)
          this.$store.commit('workOrder/setStepContent4', '')
        } else if (row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus8')) {
          this.$store.commit('workOrder/setStepStaus', 3) //第四步
          this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus12'))
          this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus13'))
          this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus14'))
          this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepContent1', '')
          this.$store.commit('workOrder/setStepContent2', '')
          this.$store.commit('workOrder/setStepContent3', '')
          this.$store.commit('workOrder/setStepContent4', this.$t('lang_communication.workStatus.content2') +  '：' +  row.cmwdActtime + this.$t('lang_communication.workStatus.minute'))
        } else {
          this.$store.commit('workOrder/setStepStaus', 1) //第二步
          this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus12'))
          this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus10'))
          this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus11'))
          this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepContent1', '')
          this.$store.commit('workOrder/setStepContent2', row.cmwdStatusDis)
          this.$store.commit('workOrder/setStepContent3', '')
          this.$store.commit('workOrder/setStepContent4', '')
        }
      },
      // 删除
      deleteOrder(id) {
        const t = this
        t.$Modal.confirm({
          title: this.$t('reminder.remind'),
          content: this.$t('lang_communication.workStatus.deleteRemind'),
          onOk: () => {
            const data = {
              _mt: 'cmutWorkorder.delByIds',
              logType: '删除工单',
              delIds: id,
            }
            for (const dat in data) {
              if (data[dat] === '') {
                delete data[dat]
              }
            }
            getDataLevelUserLogin(data).then((res) => {
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
        })
      },
      // 评价
      evaluate(pRow) {
        const row = deepCopy(pRow)
        this.getFirstAttachData(row)
//	        	this.getCommunRecordData(pRow.id)
        //切换到详情页面
        this.$store.commit('workOrder/setOrderTemp', 'detail')
        //提交详情信息
        this.$store.commit('workOrder/seachOrderDetail', row)
        this.$store.commit('workOrder/setOnlyRecord', true)
        //切换到评价
        this.$store.commit('workOrder/setBackOrEvalu', false)
        //第三步
        this.$store.commit('workOrder/setStepStaus', 2) //第三步
        this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus12'))
        this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus13'))
        this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus11'))
        this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
        this.$store.commit('workOrder/setStepContent1', '')
        this.$store.commit('workOrder/setStepContent2', '')
        this.$store.commit('workOrder/setStepContent3', row.cmwdStatusDis)
        this.$store.commit('workOrder/setStepContent4', '')
        this.orderDetailList = true
      },
      // 获取沟通记录信息
      getCommunRecordData(orderId) {
        const t = this
        const data = {
          _mt: 'cmutWorkorderrecord.getObject',
          logType: '查看记录',
          sort: 'id',
          order: 'asc',
        }
        data['cmwdrdWdid'] = orderId
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            let resData = res.data.content[0].value
            if (resData) {
              for (let i = 0; i < resData.length; i++) {
                if (resData[i].cmwdrdAttach) {
                  let attachData = resData[i].cmwdrdAttach.split('|')
                  let resAttch = []
                  for (let x = 0; x < attachData.length; x++) {
                    resAttch.push({
                      kname: attachData[x].split(':')[0],
                      vname: attachData[x].split(':')[1],
                    })
                  }
                  res.data.content[0].value[i].cmwdrdAttach = resAttch
                }
              }
            }
            t.$store.commit('workOrder/setMyOrderRecordData', res.data.content[0].value)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 获取第一条沟通记录的附件信息
      getFirstAttachData(pRow) {
        const t = this
        if (pRow.cmwdAttach) {
          let attachData = pRow.cmwdAttach.split('|')
          let resAttch = []
          let fileType = ''
          for (let x = 0; x < attachData.length; x++) {
            let data = {
              _mt: 'userMgmt.getfiletoken',
              isprivate: true,
              logType: '下载图片',
              filekey: attachData[x].split(':')[1],
              expiresecs: 180,
            }
            getDataLevelUserLogin(data).then((res) => {
              if (isSuccess(res, t)) {
                resAttch.push({
                  kname: attachData[x].split(':')[0],
                  vname: attachData[x].split(':')[1],
                  kType: attachData[x].split(':')[0].split('.')[1],
                  upUrl: pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(attachData[x].split(':')[1]),
                })
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
          pRow.cmwdAttach = resAttch
        }
      },
      start() {
        this.commitWorkOrder = true
      },

      // 业务工单
      close1() {
        this.$store.commit('myWorkOrderNew/setProblemTypes', false) // 关闭业务工单类型选项页面
      },
      close2() {
        this.$store.commit('myWorkOrderNew/setCommonFlowUpdate', false) // 关闭流程页面
      },
      problemType(name, funId, flowId, Id) {
        this.$store.commit('myWorkOrderNew/setProblemTypeName', name)
        this.$store.commit('myWorkOrderNew/setProblemTypes', false)
        this.$store.commit('myWorkOrderNew/setisfunId', funId)  //存flowId
        this.$store.commit('myWorkOrderNew/setisflowId', flowId)  //存flowId
        this.$store.commit('myWorkOrderNew/setorderTypeId', Id)  // 存Id
//        this.$store.commit('myWorkOrderNew/setProblemTypeId', name) //第三步
      },
      tabClick(value) {
        if (value === 'name6') {
          this.$refs.businessOrder.getData()
        } else if (value === 'name5') {
          this.getData()
        }
      },
    },
    destroyed() { // 组件销毁时候的使用
      this.cmwdTypeDis = ''
      this.cmwdType = ''
      this.$store.commit('myWorkOrderNew/setProblemTypeName', '')
      this.$store.commit('myWorkOrderNew/setProblemTypes', false)
      this.$store.commit('myWorkOrderNew/setisfunId', '')  //存flowId
      this.$store.commit('myWorkOrderNew/setisflowId', '')  //存flowId
      this.$store.commit('myWorkOrderNew/setorderTypeId', '')  // 存Id
    },
  }
</script>
<style scoped lang="scss">
  .p1{
    font-size: 14px;
    color: #1c2438;
    font-weight:700;
    padding: 10px;
  }
  .ivu-card-body{
    padding: 0 16px !important;
  }
  .background{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    border-radius: 10px;
    .table-form{
      margin-top: 10px;
      .ivu-table{
        .p_flowst_0{
          .ivu-table-cell{
            height: 40px;
            padding: 0;
          }
        }
        .p_flowst_1{
          background-color: #ffc100;
          color: #fff;
          cursor: pointer;
          .ivu-table-cell{
            height: 40px;
            padding: 0;
          }
        }
        .p_flowst_1:hover{
          transition: all .3s;
          background-color: #edb300;
        }
        .p_flowst_2{
          background-color: #4472c5;
          color: #fff;
          cursor: pointer;
          .ivu-table-cell{
            height: 40px;
            padding: 0;
          }
        }
        .p_flowst_2:hover{
          transition: all .3s;
          background-color: #395fa5;
        }
        .p_flowst_3{
          background-color: #70ad46;
          color: #fff;
          cursor: pointer;
          .ivu-table-cell{
            height: 40px;
            padding: 0;
          }
        }
        .p_flowst_3:hover{
          transition: all .3s;
          background-color: #598937;
        }
      }
    }
  }
  .pTitle{
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    font-size: 14px;
    color: #1c2438;
    font-weight:700;
    box-sizing: border-box
    /*border:1px solid rgba(0,0,0,0.5);*/
  }
  .pText{
    width:100%;
    padding-left: 10px;
    p:nth-of-type(1){
      margin-bottom: 10px;
    }
    p:nth-of-type(2){
      color: #0089DD;
      span{
        padding-left: 5px;
        padding-right: 5px;
      }
    }
    p:nth-of-type(2) span:hover{
      cursor:pointer
    }
  }

</style>
