<!--业务工单-->
<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_communication.archiveFlow.title')}}
        </p>
      <Row>
        <i-col span="24">
          {{$t('lang_communication.workorderSearch.cmwdCode')}}：<Input :placeholder="$t('lang_communication.workorderSearch.cmwdCodeDis')" v-model="cmwdCode" style="width: 100px;"  />
          {{$t('lang_communication.myWorkOrderNew.cmwdkeyWord')}}：<Input :placeholder="$t('lang_communication.myWorkOrderNew.cmwdkeyWordDis')"   v-model="cmwdkeyWord" style="width: 100px;"  />
          <span @dblclick="clearUserid">
             {{$t('lang_communication.archiveFlow.entEmpName')}}：<Input v-model="entEmpName" icon="search" :readonly="true" :placeholder="$t('lang_communication.archiveFlow.entEmpNameDis')" style="width: 100px" @on-click="pickUserData" />
          </span>
          <span @dblclick="dbHCompany">
             {{$t('lang_communication.archiveFlow.entHirecom')}}：<Input v-model="entHirecomDis" :placeholder="$t('lang_communication.archiveFlow.entHirecomDis')" style="width: 100px" icon="search" :readonly="true"   @on-click="selectHCompany"/>
          </span>
          <span @dblclick="clearClassifid">
            {{$t('lang_communication.archiveFlow.entClaName')}}：<Input v-model="entClaName" icon="search" :readonly="true" :placeholder="$t('lang_communication.archiveFlow.entClaNameDis')" style="width: 100px" @on-click="pickClassifData" />
          </span>
          <Button type="primary" @click="search">{{$t('button.ser')}}</Button>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <Row style="margin: 10px 0 20px 0;">
            <Table style="width:100% !important;" :height="tableheight" size="small" :columns="columns" :data="data"></Table>
          </Row>
          <Row style="display: flex">
            <Page :total="total" :current="page" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
        </i-col>
      </Row>
      </card>
      </Col>
    </Row>
    <commonFlowUpdate v-if="openTestUpd"
                      @close="closeTest"
                      :flowId="flowId"
                      :pkValue="pkValue"
                      :stepId="stepId"
                      :stepName="stepName"
                      :stepState="stepState"
                      :funId="funId"
                      :flowShow="flowShow"
    >
    </commonFlowUpdate>
    <transition name="fade">
      <searchHCompany v-show="openHCompany" @closeHCompany="closeHCompany" :searchHCClo="searchHCClo" @inputHCompany="inputHCompany" :params="paramsHCompany" ref="searchHCompany"></searchHCompany>
    </transition>
    <!-- 雇员 -->
    <transition name="fade">
      <searchEmpMaster v-show="openPickUser" @closeEmp="closeEmp" @inputEmp="inputEmp" ref="searchEmpMaster"></searchEmpMaster>
    </transition>
    <!-- 档案类别 -->
    <transition name="fade">
      <searchClaPid v-show="openPickClassif" :params="params" :searchCloumns="searchCloumns" @closeUp="closeClassif" @changeinput="changeClassif" ref="searchClaPid"></searchClaPid>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginId, uploadFile } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import commonFlowUpdate from '../entryFlow/commonFlowUpdate.vue'
  import searchHCompany from '../../../components/searchTable/searchHCompany'
  import searchEmpMaster from '../../../components/searchTable/searchEmpMaster'
  import searchClaPid from './searchClaPid'
  import Bus from '../bus'
  export default {
    name: 'businessOrder',
    data() {
      return {
        openPick: false,
        openPickUser: false,
        openPickClassif: false,
        tableheight: document.body.offsetHeight - 280,
        data: [],
        entEmpid: '',
        entEmpName: '',
        entHirecom: '',
        entHirecomDis: '',
        entClaid: '',
        entClaName: '',
        entNo: '',
        cmwdCode: '',
        cmwdType: '',
        cmwdTypeDis: '',
        cmwdkeyWord: '',
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        total: NaN,
        commitWorkOrder: false,
        openTestUpd: false,
        params: {
          _mt: 'archivesClassification.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          logType: '档案分类查询',
        },
        searchCloumns: [
          {
            title: this.$t('lang_personalfile.fileClass.claNo'),
            key: 'claNo',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_personalfile.fileClass.claName'),
            key: 'claName',
            sortable: 'custom',
          },
        ],
        columns: [
          {
            title: this.$t('lang_communication.workorderSearch.cmwdCode'),
            key: 'cmwdCode',
            align: 'left',
          },
          {
            title: this.$t('lang_communication.workorderSearch.cmwdDesc'),
            key: 'cmwdDesc',
            ellipsis: true,
            align: 'left',
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
            title: this.$t('lang_communication.workorderSearch.cmwdAuthor'),
            key: 'cmwdAuthorDis',
            align: 'center',
          },
          {
            title: this.$t('lang_communication.workorderSearch.createTime'),
            key: 'createTime',
            align: 'left',
          },
          {
            title: this.$t('lang_communication.workorderSearch.cmwdStatus'),
            key: 'cmwdStatusDis',
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
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                    fontSize: '13px',
                  },
                  style: {
                    marginRight: '10px',
                  },
                  on: {
                    click: () => {
                      this.businessLook(params.row)
                    },
                  },
                }, this.$t('button.view')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                    fontSize: '13px',
                  },
                  style: {
                    marginRight: '10px',
                  },
                  on: {
                    click: () => {
                      this.businessHandle(params.row)
                    },
                  },
                }, this.$t('button.hdl')),
              ])
            },
          },
        ],
        orderDetailList: false,
        flowId: '',
        stepId: '',
        pkValue: '',
        stepState: '',
        stepName: '',
        funId: '',
        flowShow: false,
        flowWorkno: '',
        flowFirstName: '',
        flowLastName: '',
        flowCName: '',
        openHCompany: false,
        openUpdate: false,
        //      雇佣公司
        paramsHCompany: {
          _mt: 'orgUnits.getByOrgFramePageList',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'desc',
          unitType: '01company',
          logType: '雇佣公司',
        },
        searchHCClo: [
          {
            title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.compCnFullName'),
            key: 'unitFname',
          },
        ],
        flowEmpCompDis: '',
      }
    },
    mounted() {
       this.getData()
    },
    components: {
      commonFlowUpdate,
      searchHCompany,
      searchEmpMaster,
      searchClaPid,
    },
    methods: {
      closeTest() {
        this.openTestUpd = false
      },
      //  	雇佣公司
      selectHCompany() {
        const t = this
        t.$refs.searchHCompany.getData(this.paramsHCompany)
        t.openHCompany = true
      },
      closeHCompany() {
        const t = this
        t.$refs.searchHCompany.unitCode = ''
        t.openHCompany = false
      },
      inputHCompany(name, id) {
        const t = this
        t.entHirecomDis = name
        t.entHirecom = id
      },
      dbHCompany() {
        const t = this
        t.entHirecomDis = ''
        t.entHirecom = ''
      },
      /**
       * 选择雇员
       */
      pickUserData() {
        const t = this;
        t.$refs.searchEmpMaster.getData();
        t.openPickUser = true;
      },
      closeEmp() {
        const t = this
        t.openPickUser = false
      },
      inputEmp(row) {
        const t = this
        t.entEmpName = row.empName;
        t.entEmpid = row.id;
      },
      clearUserid(){
        const t = this
        t.entEmpName = '';
        t.entEmpid = '';
      },
      /**
       * 档案分类
       */
      pickClassifData() {
        const t = this
        t.$refs.searchClaPid.getData()
        t.openPickClassif = true
      },
      closeClassif(){
        const t = this
        t.openPickClassif = false
      },
      changeClassif(id,name) {
        const t = this
        t.entClaid = id;
        t.entClaName = name;
      },
      clearClassifid(){
        this.entClaid = '';
        this.entClaName = '';
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
            console.log(JSON.parse(res.data.content[0].value))
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
      /**
       * 点击查询按钮
       */
      search() {
        const t = this
        t.page = 1
        t.getData()
      },
      getData() {
        const t = this
        const data = {
          _mt: 'cmutWorkorder.getWorkorderForProcess',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          roleType: t.$store.state.user.roleType, // 角色类型
          data: '',
        }
        data['cmwdCode'] = t.cmwdCode
        data['cmwdType'] = t.cmwdType
        data['cmwdkeyWord'] = t.cmwdkeyWord
        data['cmwdWotypeprop'] = '02busprocess'
        data['entClaid'] = t.entClaid
        data['entHirecom'] = t.entHirecom
        data['entEmpid'] = t.entEmpid
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
        /// 点击查看的时候存取funID cmwdMarkno orderBusiPro
        this.$store.commit('workOrder/setIsfunId', pRow.functionId)
        this.$store.commit('workOrder/setCmwdMarkno', pRow.cmwdMarkno)
        this.$store.commit('workOrder/setOrderBusiPro', pRow.orderBusiPro)
        this.$store.commit('workOrder/setbtnShow', false)
        this.getFirstAttachData(pRow)
//	        	this.getCommunRecordData(pRow.id)
        //切换到详情页面
        this.$store.commit('workOrder/setOrderTemp', 'detail')
        //提交详情信息
        this.$store.commit('workOrder/seachOrderDetail', pRow)
        //切换到评价或反馈
        if(pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus7')) {
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
          this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepContent1', '')
          this.$store.commit('workOrder/setStepContent2', '')
          this.$store.commit('workOrder/setStepContent3', '')
          this.$store.commit('workOrder/setStepContent4', this.$t('lang_communication.workStatus.content2')+ '：')
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
        console.log(pRow)
        const t = this
        getDataLevelUserLoginId({
          _mt: 'platAutoLayoutGetFlowList.getNeedOpenStep',
          roleType: t.$store.state.user.roleType,
          flowId: pRow.flowId,
          funId: pRow.functionId,
          woMarkno: pRow.cmwdMarkno,
        }).then((res) => {
          t.stepId = res.data.content[0].value.split('_')[0]
          t.pkValue = res.data.content[0].value.split('_')[1]
          t.funId = pRow.functionId
          t.openTestUpd = true
          t.flowId = pRow.flowId
          t.flowShow = false
          t.stepName = pRow.cmwdTypeDis
        }).catch(err => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      businessHandle(pRow) {
        const t = this
        getDataLevelUserLoginId({
          _mt: 'platAutoLayoutGetFlowList.getNeedOpenStep',
          roleType: t.$store.state.user.roleType,
          flowId: pRow.flowId,
          funId: pRow.functionId,
          woMarkno: pRow.cmwdMarkno,
        }).then((res) => {
          t.stepId = res.data.content[0].value.split('_')[0]
          t.pkValue = res.data.content[0].value.split('_')[1]
          t.funId = pRow.functionId
          t.openTestUpd = true
          t.flowId = pRow.flowId
          t.stepName = pRow.cmwdTypeDis
          t.flowShow = true
        }).catch(err => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style scoped lang="scss" type="text/scss">

</style>
