<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_communication.workorderSearch.title')}}
        </p>
        <Row>
          <span @dblclick="clearKnowType">
              <Input v-model="cmwdTypeDis" @on-click="pickData" icon="search" :readonly="true" :placeholder="$t('lang_communication.workorderSearch.cmwdTypeDis')"
                     style="width: 160px;margin-right: 10px;"/>
          </span>
          <Input :placeholder="$t('lang_communication.workorderSearch.cmwdCodeDis')" style="width: 200px" v-model="cmwdCode"/>
          <Input :placeholder="$t('lang_communication.workorderSearch.cmwdkeyWordDis')" style="width: 200px" v-model="cmwdkeyWord"/>
          <span style="margin: 0;"><Button type="primary" icon="search"
                                           @click="getData(1)">{{$t('button.ser')}}</Button></span>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns"
                 :data="data"></Table>
        </row>
        <Row style="display: flex">
          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page"
              @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <searchTable v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="closeUp"
                   @changeinput="changeinput" :searchTitle="searchTitle" ref="searchTable"></searchTable>
    </transition>
    <!--咨询工单详情-->
    <transition name="fade">
      <div class="background" v-if="orderDetailList">
        <orderDetailList ref="orderDetailList"></orderDetailList>
      </div>
    </transition>
    <!--业务工单详情-->
    <transition name="fade">
    <div class="background" v-if="this.$store.state.myWorkOrderNew.commonFlowUpdate">
        <commonFlowUpdate ref="commonFlowUpdate" @close="close3"></commonFlowUpdate>
    </div>
    </transition>
    <!--薪资工单详情-->
    <transition name="fade">
    <div class="background" v-if="flowShow">
      <commonFlowUpdate2
                        @close4="close4"
                        :flowId="flowId"
                        :pkValue="pkValue"
                        :stepId="stepId"
                        :openId="openId"
                        :setpName="stepName"
                        :stepState="stepState"
                        :funId="funId"
                        :flowShow="flowShow">
      </commonFlowUpdate2>
    </div>
    </transition>
  </div>
</template>

<script>
  import {
    getDataLevelUserLoginNew,
    getDataLevelUserLoginSenior,
    getDataLevelUserLogin,
    uploadFile
  } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchTable from '../../../components/searchTable/searchKnowType'
  import orderDetailList from '../myWorkOrder/orderDetail'
  import commonFlowUpdate from '../commonFlowList/commonFlowUpdate'
  import commonFlowUpdate2 from '../commonFlowList/commonFlowUpdate2'
  import Bus from '../bus'

  export default {
    data() {
      return {
        openPick: false,
        tableheight: document.body.offsetHeight - 280,
        totalF: 0,
        totalQ: 0,
        data: [],
        cmwdCode: '',
        cmwdType: '',
        cmwdTypeDis: '',
        cmwdkeyWord: '',
        flowId: '',
        stepId: '',
        openId: '',
        pkValue: '',
        stepState: '',
        stepName: '',
        funId: '',
        flowShow: false,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        total: NaN,
        orderDetailList: false,
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
          order: 'asc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
        },
        columns: [
          {
            title: this.$t('lang_communication.workorderSearch.cmwdCode'),
            key: 'cmwdCode',
            width: '200',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_communication.workorderSearch.cmwdDesc'),
            key: 'cmwdDesc',
            sortable: 'custom',
            ellipsis: true,
            width: '250',
            render: (h, params) => {
              return h('Tooltip', {
                props: {
                  placement: 'top-start',
                  width: '250',
                },
              }, [
                params.row.cmwdDesc,
                h('span', {
                  slot: 'content',
                  style: {
                    whiteSpace: 'normal',
                    wordBreak: 'break-all',
                  },
                }, params.row.cmwdDesc),
              ])
            },
          },
          {
            title: this.$t('lang_communication.workorderSearch.cmwdType'),
            key: 'cmwdTypeDis',
            width: '150',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_communication.workorderSearch.cmwdProperty'),
            key: 'cmwdPropertyDis',
            align: 'left',
            width: '150',
          },
          {
            title: this.$t('lang_communication.workorderSearch.cmwdAuthor'),
            key: 'cmwdAuthorDis',
            sortable: 'custom',
            width: '150',
          },
          {
            title: this.$t('lang_communication.workorderSearch.createTime'),
            key: 'createTime',
            width: '150',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_communication.workorderSearch.cmwdStatus'),
            key: 'cmwdStatusDis',
            sortable: 'custom',
            width: '150',
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
//                  style: {
//                    fontSize: '13px',
//                    color: '#2db7f5',
//                  },
                  on: {
                    click: () => {
                      this.lookDetail(params.row)
                    },
                  },
                }, this.$t('button.view')),
              ])
            },
          },
        ],
      }
    },
    computed: {},
    components: {
      searchTable,
      orderDetailList,
      commonFlowUpdate,
      commonFlowUpdate2,
    },
    mounted() {
      this.getData()
      Bus.$on('orderDetailList', () => {
        this.orderDetailList = false
      })
    },
    methods: {
      pickData() {
        const t = this
        t.$refs.searchTable.getData(this.params)
        t.openPick = true
      },
      changeinput(name, id) {
        const t = this
        t.cmwdTypeDis = name
        t.cmwdType = id
        t.getData()
      },
      closeUp() {
        const t = this
        t.openPick = false
      },
      clearKnowType() {
        const t = this
        t.cmwdTypeDis = ''
        t.cmwdType = ''
        t.getData()
      },
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }

        const data = {
          _mt: 'cmutWorkorder.getPageNew',
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
        data['cmwdProperty'] = '01manual'
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
      /**
       * 排序
       * @param column
       */
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
      // 查看
      lookDetail(pRow) {
        if (pRow.cmwdWotypeprop === '02busprocess') {
          getDataLevelUserLogin({
            _mt: 'workorderFlowList.getWorkOrderData',
            flowId: pRow.flowId,
            orderMarkNo: pRow.cmwdMarkno,
          }).then(res => {
            // console.log(res.data.content[0].value)
            if (pRow.cmwdTypeCode === '190100') {
              this.openId = pRow.firstStep.split('_')[1]
              this.flowId = pRow.flowId
              this.pkValue = res.data.content[0].value
              this.setpName = pRow.cmwdTypeDis
              this.stepId = pRow.firstStep.split('_')[0]
              this.funId = pRow.functionId
              this.flowShow = true
            } else {
              this.$store.commit('myWorkOrderNew/setthisStepId', pRow.firstStep)
              this.$store.commit('myWorkOrderNew/setstepState', '')
              this.$store.commit('myWorkOrderNew/setthisPkValue', res.data.content[0].value)
              this.$store.commit('myWorkOrderNew/setisfunId', pRow.functionId)  //存flowId
              this.$store.commit('myWorkOrderNew/setisflowId', pRow.flowId)  //存flowId
              this.$store.commit('myWorkOrderNew/setproblemCmwdMarkno', pRow.cmwdMarkno)  //存flowId
              this.$store.commit('myWorkOrderNew/setflowShow', false)
              this.$store.state.myWorkOrderNew.commonFlowUpdate = true
              this.flowShow = false
              this.$store.state.myWorkOrderNew.ProblemTypeName = ''
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
//	        	this.getCommunRecordData(pRow.id)
          this.$store.commit('workOrder/setIsfunId', pRow.functionId)
          this.$store.commit('workOrder/setCmwdMarkno', pRow.cmwdMarkno)
          this.$store.commit('workOrder/setOrderBusiPro', pRow.orderBusiPro)
          this.$store.commit('workOrder/setbtnShow', false)
          this.getFirstAttachData(pRow)
          // 切换到详情页面
          // this.$store.commit('workOrder/setOrderTemp', 'detail')
          // 提交详情信息
          this.$store.commit('workOrder/seachOrderDetail', pRow)
          this.$store.commit('workOrder/setOnlyRecord', false)
          this.$store.commit('workOrder/setBackOrEvalu', false) 
//          // 切换到评价或反馈
//          if (pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus7')) { // 待您评价
//            this.$store.commit('workOrder/setOnlyRecord', false)
//            this.$store.commit('workOrder/setBackOrEvalu', false)
//          } else if (pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus8')) { // 已关闭
//            this.$store.commit('workOrder/setOnlyRecord', false)
//            this.$store.commit('workOrder/setBackOrEvalu', false)
//          } else if (pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus9')) { // 待处理
//            this.$store.commit('workOrder/setOnlyRecord', false)
//          } else {
//            this.$store.commit('workOrder/setBackOrEvalu', false)
//            this.$store.commit('workOrder/setOnlyRecord', false)
//          }
          // 切换步骤条状态
          if (pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus9')) {
            this.$store.commit('workOrder/setStepStaus', 0) // 第一步
            this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus1'))
            this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus10'))
            this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus11'))
            this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
            this.$store.commit('workOrder/setStepContent1', this.$t('lang_communication.workStatus.content1'))
            this.$store.commit('workOrder/setStepContent2', '')
            this.$store.commit('workOrder/setStepContent3', '')
            this.$store.commit('workOrder/setStepContent4', '')
          } else if (pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus5') ||
                     pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus6') ||
                     pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus7')) {
            this.$store.commit('workOrder/setStepStaus', 2) // 第三步
            this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus12'))
            this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus13'))
            this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus11'))
            this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
            this.$store.commit('workOrder/setStepContent1', '')
            this.$store.commit('workOrder/setStepContent2', '')
            this.$store.commit('workOrder/setStepContent3', pRow.cmwdStatusDis)
            this.$store.commit('workOrder/setStepContent4', '')
          } else if (pRow.cmwdStatusDis === '已关闭') {
            this.$store.commit('workOrder/setStepStaus', 3) // 第四步
            this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus12'))
            this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus13'))
            this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus14'))
            this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
            this.$store.commit('workOrder/setStepContent1', '')
            this.$store.commit('workOrder/setStepContent2', '')
            this.$store.commit('workOrder/setStepContent3', '')
            this.$store.commit('workOrder/setStepContent4', this.$t('lang_communication.workStatus.content2') + '：')
          } else {
            this.$store.commit('workOrder/setStepStaus', 1) // 第二步
            this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus12'))
            this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus10'))
            this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus11'))
            this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
            this.$store.commit('workOrder/setStepContent1', '')
            this.$store.commit('workOrder/setStepContent2', pRow.cmwdStatusDis)
            this.$store.commit('workOrder/setStepContent3', '')
            this.$store.commit('workOrder/setStepContent4', '')
          }
          this.orderDetailList = true
        }
      },
      // 删除
      // 评价
      evaluate(pRow) {
        this.getFirstAttachData(pRow)
//	        	this.getCommunRecordData(pRow.id)
        // 切换到详情页面
        this.$store.commit('workOrder/setOrderTemp', 'detail')
        // 提交详情信息
        this.$store.commit('workOrder/seachOrderDetail', pRow)
        this.$store.commit('workOrder/setOnlyRecord', true)
        // 切换到评价
        this.$store.commit('workOrder/setBackOrEvalu', false)
        // 第三步
        this.$store.commit('workOrder/setStepStaus', 2) // 第三步
        this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus12'))
        this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus13'))
        this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus11'))
        this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
        this.$store.commit('workOrder/setStepContent1', '')
        this.$store.commit('workOrder/setStepContent2', '')
        this.$store.commit('workOrder/setStepContent3', pRow.cmwdStatusDis)
        this.$store.commit('workOrder/setStepContent4', '')
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
//       					const t = this
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
      close3() {
        this.$store.commit('myWorkOrderNew/setCommonFlowUpdate', false) // 关闭流程页面
      },
      close4() {
        this.flowShow = false // 关闭流程页面
      },
    },
  }
</script>
<style>
  .ivu-table td.table-column {
    color: #2db7f5;
  }

  .single-page {
    /*background: white;*/
  }

  .p1 {
    font-size: 14px;
    color: #1c2438;
    font-weight: 700;
  }
</style>
<style lang="scss" scoped>
  .pTitle {
    line-height: 30px;
    font-size: 14px;
    border-bottom: solid 1px #CCCCCC;
  }

  .pTitle2 {
    line-height: 30px;
    font-size: 14px;
    border: solid 1px #CCCCCC;
    margin-top: 10px;
    background: #EFEFEF;
    padding-left: 5px;
  }

  .table-form {
    margin: 10px 0;
  }

  .background {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    border-radius: 10px;
    .table-form {
      margin-top: 10px;
      .ivu-table {
        .p_flowst_0 {
          .ivu-table-cell {
            height: 40px;
            padding: 0;
          }
        }
        .p_flowst_1 {
          background-color: #ffc100;
          color: #fff;
          cursor: pointer;
          .ivu-table-cell {
            height: 40px;
            padding: 0;
          }
        }
        .p_flowst_1:hover {
          transition: all .3s;
          background-color: #edb300;
        }
        .p_flowst_2 {
          background-color: #4472c5;
          color: #fff;
          cursor: pointer;
          .ivu-table-cell {
            height: 40px;
            padding: 0;
          }
        }
        .p_flowst_2:hover {
          transition: all .3s;
          background-color: #395fa5;
        }
        .p_flowst_3 {
          background-color: #70ad46;
          color: #fff;
          cursor: pointer;
          .ivu-table-cell {
            height: 40px;
            padding: 0;
          }
        }
        .p_flowst_3:hover {
          transition: all .3s;
          background-color: #598937;
        }
      }
    }
  }
</style>
