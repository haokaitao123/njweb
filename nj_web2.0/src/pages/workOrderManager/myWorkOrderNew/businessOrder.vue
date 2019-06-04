<!--业务工单-->
<template>
  <div class="table">
    <Row>
      <Col span="24">
      <Row v-if="totalQ > 0 || totalF > 0">
        <p class="pTitle2">
          {{$t('lang_communication.myWorkOrderNew.pTitle2')}}：<a v-if="totalF > 0">{{$t('lang_communication.myWorkOrderNew.cmwdStatus5')}} [ {{totalF}} ]</a>  <span v-if="totalQ > 0 && totalF > 0">/</span>  <a v-if="totalQ > 0">{{$t('lang_communication.myWorkOrderNew.cmwdStatus6')}} [ {{totalQ}} ]</a>
        </p>
      </Row>

      <Row style="padding: 0 16px;box-sizing: border-box">
        <i-col span="24">
			            <span @dblclick="clearKnowType">
			              {{$t('lang_communication.workorderSearch.cmwdType')}}：<Input v-model="this.$store.state.myWorkOrderNew.ProblemTypeName" icon="search" :readonly="true" :placeholder="$t('lang_communication.workorderSearch.cmwdTypeDis')" style="width: 160px;margin-right: 10px;" @on-click="pickData" />
			            </span>
          {{$t('lang_communication.workorderSearch.cmwdCode')}}：<Input :placeholder="$t('lang_communication.workorderSearch.cmwdCodeDis')" v-model="cmwdCode" style="width: 150px;margin-right: 10px;"  @on-change="getData"/>
          <!--提交时间：<DatePicker type="datetime" v-model="ranTimeLeft" @on-change="getData"  placeholder="请选择开始时间..."  style="width: 160px;"></DatePicker><span style="color: #C3C3C3;"> — </span><DatePicker type="datetime" v-model="ranTimeRight"  @on-change="getData" placeholder="请选择结束时间..." style="width: 160px;margin-right: 10px;"></DatePicker>-->
          <span @dblclick="clearKnowType">
            {{$t('lang_communication.myWorkOrderNew.cmwdkeyWord')}}：<Input :placeholder="$t('lang_communication.myWorkOrderNew.cmwdkeyWordDis')"  v-model="cmwdkeyWord" style="width: 150px;margin-right: 10px;"  />
          </span>
            <Button type="primary" @click="getData">{{$t('button.ser')}}</Button>
            <Button type="primary" style="background: #339966;border-color:#339966" @click="start">{{$t('button.start')}}</Button>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <Row style="margin: 10px 0 20px 0;">
              <Table style="width:100% !important;" :height="tableheight" size="small" :columns="columns" :data="data"></Table>
          </Row>
          <Row style="display: flex">    <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=rows :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
        </i-col>
      </Row>
      </Col>
    </Row>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLoginNewId, getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import Bus from '../bus'
  export default {
    name: 'businessOrder',
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
//        ranTimeLeft: '',
        ranTimeRight: '',
        sort: 'id',
        order: 'desc',
        rows: 20,
        page: 1,
        total: NaN,
        commitWorkOrder: false,
        check: '1',
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
            width: '130',
            align: 'center',
          },
          {
            title: this.$t('lang_communication.workorderSearch.cmwdDesc'),
            key: 'cmwdDesc',
            ellipsis: true,
            width: '230',
            align: 'center',
            overflow: 'scroll',
            className: 'table-column',
            render: (h, params) => {
              return h('Tooltip', {
                props: { placement: 'top-start', color: 'white' },
              }, [
                params.row.cmwdDesc,
                h('span', {
                    slot: 'content',
                    style: {
                      whiteSpace: 'normal',
                      wordBreak: 'break-all',
                      color: 'white',
                    },
                  }, params.row.cmwdDesc),
              ])
            },
          },
          {
            title: this.$t('lang_communication.workorderSearch.cmwdType'),
            key: 'cmwdTypeDis',
            align: 'center',
            width: '130',
          },
          {
            title: this.$t('lang_communication.workorderSearch.createTime'),
            key: 'createTime',
            width: '200',
            align: 'center',
          },
          {
            title: this.$t('lang_communication.workorderSearch.cmwdStatus'),
            key: 'cmwdStatusDis',
            width: '230',
            align: 'center',
            filters: [
//              {
//                label: '待处理',
//                value: 1,
//              },
//              {
//                label: '处理中-已分派',
//                value: 2,
//              },
              {
                label: this.$t('lang_communication.workStatus.cmwdStatus3'),
                value: 3,
              },
//              {
//                label: '处理中-转交待接单',
//                value: 4,
//              },
//              {
//                label: '待您反馈',
//                value: 5,
//              },
//              {
//                label: '待您确认',
//                value: 6,
//              },
//              {
//                label: '待您评价',
//                value: 7,
//              },
              {
                label: this.$t('lang_communication.workStatus.cmwdStatus8'),
                value: 8,
              },
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              if (value === 3) {
                return row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus3')
              } else if (value === 8) {
                return row.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus8')
              }
            },
          },
          {
            title: this.$t('button.opr'),
            key: '',
            width: '200',
            align: 'center',
          	fixed: 'right',
            render: (h, params) => {
//              if (params.row.cmwdStatusDis === '待处理') {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                      fontSize: '13px',
                    },
                    style: {
                      marginRight: '10px',
                      display: params.row.cmwdIscreate === '1' ? 'none' : 'inline',
                    },
                    on: {
                      click: () => {
                        this.businessSubmit(params.row)
                      },
                    },
                  }, this.$t('button.subm')),
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                      fontSize: '13px',
                    },
                    style: {
                      marginRight: '10px',
                      display: params.row.cmwdIscreate === '1' ? 'none' : 'inline',
                    },
                    on: {
                      click: () => {
                        this.businessEdit(params.row)
                        console.log(h)
                      },
                    },
                  }, this.$t('button.upd')),
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                      fontSize: '13px',
                    },
                    on: {
                      click: () => {
                        this.businessLook(params.row)
                      },
                    },
                  }, this.$t('button.view')),
                ])
            },
          },
        ],
        orderDetailList: false,
      }
    },
    mounted() {
      Bus.$on('getData', () => {
        this.getData()
      })
    },
    methods: {
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
        t.$store.state.myWorkOrderNew.ProblemTypes = true
        t.getProblemTypes()
      },
      getProblemTypes() {
        const t = this
        const data = {
          _mt: 'cmutKnlType.getMapForBusi',
          funId: 1,
          logType: this.$t('button.ser'),
          cmutKntypePid: '0',
          cmutKntypeBusprop: '02busprocess',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            let ProblemTypesList = JSON.parse(res.data.content[0].value)
            this.$store.commit('myWorkOrderNew/setProblemTypesList', ProblemTypesList)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      closeUp() {
        const t = this
        t.openPick = false
      },
      clearKnowType() {
        const t = this
        t.cmwdTypeDis = ''
        t.cmwdType = ''
        t.$store.state.myWorkOrderNew.ProblemTypeName = ''
        t.$store.state.myWorkOrderNew.orderTypeId = ''
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
        data['cmwdkeyWord'] = t.cmwdkeyWord
        data['cmwdWotypeprop'] = '02busprocess'
        data['cmwdType'] = t.$store.state.myWorkOrderNew.orderTypeId

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
        this.$store.commit('workOrder/setIsfunId', pRow.functionId)
        this.$store.commit('workOrder/setCmwdMarkno', pRow.cmwdMarkno)
        this.$store.commit('workOrder/setOrderBusiPro', pRow.orderBusiPro)
        this.$store.commit('workOrder/setbtnShow', false)
        this.getFirstAttachData(pRow)
        // 切换到详情页面
        this.$store.commit('workOrder/setOrderTemp', 'detail')
        // 提交详情信息
        this.$store.commit('workOrder/seachOrderDetail', pRow)
        // 切换到评价或反馈
        if (pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus7')) {
          this.$store.commit('workOrder/setOnlyRecord', true)
          this.$store.commit('workOrder/setBackOrEvalu', false)
        } else if (pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus8')) {
          this.$store.commit('workOrder/setOnlyRecord', false)
          this.$store.commit('workOrder/setBackOrEvalu', false)
        } else {
          this.$store.commit('workOrder/setBackOrEvalu', true)
          this.$store.commit('workOrder/setOnlyRecord', true)
        }
        //切换步骤条状态
        if (pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus9')) {
          this.$store.commit('workOrder/setStepStaus', 0) //第一步
          this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus1'))
          this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus10'))
          this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus11'))
          this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepContent1', this.$t('lang_communication.workStatus.content1'))
          this.$store.commit('workOrder/setStepContent2', '')
          this.$store.commit('workOrder/setStepContent3', '')
          this.$store.commit('workOrder/setStepContent4', '')
        } else if (pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus5') || pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus6') || pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus7')) {
          this.$store.commit('workOrder/setStepStaus', 2) //第三步
          this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus12'))
          this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus13'))
          this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus11'))
          this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepContent1', '')
          this.$store.commit('workOrder/setStepContent2', '')
          this.$store.commit('workOrder/setStepContent3', pRow.cmwdStatusDis)
          this.$store.commit('workOrder/setStepContent4', '')
        } else if (pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus8')) {
          this.$store.commit('workOrder/setStepStaus', 3) //第四步
          this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus12'))
          this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus13'))
          this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus14'))
          this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepContent1', '')
          this.$store.commit('workOrder/setStepContent2', '')
          this.$store.commit('workOrder/setStepContent3', '')
          this.$store.commit('workOrder/setStepContent4', this.$t('lang_communication.workStatus.content2'))
        } else {
          this.$store.commit('workOrder/setStepStaus', 1) //第二步
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
      },
      // 删除
      deleteOrder(id) {
        const t = this
        t.$Modal.confirm({
          title: this.$t('reminder.remind'),
          content: this.$t('lang_communication.myWorkOrderNew.deleteRemind'),
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
        this.getFirstAttachData(pRow)
//	        	this.getCommunRecordData(pRow.id)
        //切换到详情页面
        this.$store.commit('workOrder/setOrderTemp', 'detail')
        //提交详情信息
        this.$store.commit('workOrder/seachOrderDetail', pRow)
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
        this.$store.commit('workOrder/setStepContent3', pRow.cmwdStatusDis)
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
            const t = this
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
      businessLook(pRow) {
        getDataLevelUserLogin({
          _mt: 'workorderFlowList.getWorkOrderData',
          flowId: pRow.flowId,
          orderMarkNo: pRow.cmwdMarkno,
        }).then(res => {
          // console.log(res.data.content[0].value)
        this.$store.state.myWorkOrderNew.ProblemTypeName = ''
        this.$store.commit('myWorkOrderNew/setthisStepId', pRow.firstStep)
        this.$store.commit('myWorkOrderNew/setstepState', '')
          this.$store.commit('myWorkOrderNew/setthisPkValue', res.data.content[0].value)
          this.$store.commit('myWorkOrderNew/setisfunId', pRow.functionId)  //存flowId
          this.$store.commit('myWorkOrderNew/setisflowId', pRow.flowId)  //存flowId
          this.$store.commit('myWorkOrderNew/setproblemCmwdMarkno', pRow.cmwdMarkno)  //存flowId
          this.$store.commit('myWorkOrderNew/setflowShow', false)
          this.$store.state.myWorkOrderNew.commonFlowUpdate = true
        }).catch(err => {
          console.log(err)
        })
      },
      businessSubmit(pRow) {
        this.$store.commit('myWorkOrderNew/setthisStepId', pRow.firstStep)
        this.$store.commit('myWorkOrderNew/setstepState', '')
        this.$store.commit('myWorkOrderNew/setisfunId', pRow.functionId)  //存flowId
        this.$store.commit('myWorkOrderNew/setisflowId', pRow.flowId)  //存flowId
        this.$store.commit('myWorkOrderNew/setproblemCmwdMarkno', pRow.cmwdMarkno)  //存flowId
        let data = {}
        data._mt = 'cmutWorkorder.submitOrderAndBusi'
        data.logType = 'submit'
        data.cmwdIscreate = '1'
        data.functionId = pRow.functionId
        data.roleStyle = this.$store.state.user.roleType // 角色类型
        data.cmwdMarkno = pRow.cmwdMarkno // 角色类型
        data.id = pRow.id // 角色类型
        //        t.formDataSubmit.clmMap = JSON.stringify(t.clmMap)
        getDataLevelUserLoginNewId(data).then((res2) => {
          if (isSuccess(res2, this)) {
            if (res2.data.content[0].cmwdIscreate === '1') {
              this.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('reminder.submitsuccess'),
              })
              this.getData()
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      businessEdit(pRow) {
        getDataLevelUserLogin({
          _mt: 'workorderFlowList.getWorkOrderData',
          flowId: pRow.flowId,
          orderMarkNo: pRow.cmwdMarkno,
        }).then(res => {
          // console.log(res.data.content[0].value)
          this.$store.commit('myWorkOrderNew/setthisStepId', pRow.firstStep)
          this.$store.commit('myWorkOrderNew/setstepState', '')
          this.$store.commit('myWorkOrderNew/setthisPkValue', res.data.content[0].value)
          this.$store.commit('myWorkOrderNew/setisfunId', pRow.functionId)  // 存flowId
          this.$store.commit('myWorkOrderNew/setisflowId', pRow.flowId)  // 存flowId
          this.$store.commit('myWorkOrderNew/setproblemCmwdMarkno', pRow.cmwdMarkno)  // 存flowId
          this.$store.commit('myWorkOrderNew/setflowShow', true)  // 存flowId
          this.$store.commit('myWorkOrderNew/setentryId', pRow.id)  // 存flowId
          this.$store.state.myWorkOrderNew.commonFlowUpdate = true
        }).catch(err => {
          console.log(err)
        })
      },
      start() {
        if (this.$store.state.myWorkOrderNew.ProblemTypeName !== '') {
          this.$store.state.myWorkOrderNew.commonFlowUpdate = true
          this.$store.commit('myWorkOrderNew/setthisStepId', 0)
          this.$store.commit('myWorkOrderNew/setstepState', '')
          this.$store.commit('myWorkOrderNew/setthisPkValue', '0')
          this.$store.commit('myWorkOrderNew/setflowShow', true)  // 保存 提交的显示与隐藏
        } else {
          this.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_communication.commitWorkOrder.startRemind'),
          })
        }
      },
    },
  }
</script>
<style scoped lang="scss" type="text/scss">

</style>
