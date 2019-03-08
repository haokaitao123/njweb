<!--业务工单-->
<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_communication.visareturn.title')}}
        </p>
      <Row>
        <i-col span="24">
          {{$t('lang_communication.workorderSearch.cmwdCode')}}：<Input :placeholder="$t('lang_communication.workorderSearch.cmwdCodeDis')" v-model="cmwdCode" style="width: 120px;"  />
          {{$t('lang_communication.myWorkOrderNew.cmwdkeyWord')}}：<Input :placeholder="$t('lang_communication.myWorkOrderNew.cmwdkeyWordDis')"   v-model="cmwdkeyWord" style="width: 120px;"  />
          <span @dblclick="dbHCompany">
               {{$t('lang_communication.contextFlow.pladCompany')}}<Input v-model="pladCompanyDis" :placeholder="$t('lang_communication.contextFlow.pladCompanyDis')" style="width: 120px" icon="search" :readonly="true"   @on-click="selectHCompany"/>
          </span>
          {{$t('lang_communication.visareturn.empName')}}：<Input :placeholder="$t('lang_communication.visareturn.empNameDis')"   v-model="flowCName" style="width: 120px;"  />
          <Button type="primary" @click="search">{{$t('button.ser')}}</Button>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <Row style="margin: 10px 0 20px 0;">
            <Table style="width:100% !important;" :height="tableheight" size="small" :columns="columns" :data="data"></Table>
          </Row>
          <Row style="display: flex">          <Page :total="total" size="small" :current="page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
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
    <transition name="fade">
      <searchDept v-show="openDept" @closeDept="closeDept" :searchDeptClo="searchDeptClo" @inputDept="inputDept" :params="paramsDept" ref="searchDept"></searchDept>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginId, uploadFile } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import commonFlowUpdate from '../entryFlow/commonFlowUpdate.vue'
  import searchHCompany from '../../../components/searchTable/searchHCompany'
  import searchDept from '../../../components/searchTable/searchDept'
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
        ranTimeRight: '',
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        total: NaN,
        commitWorkOrder: false,
        openTestUpd: false,
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
//          		fixed: 'right',
            render: (h, params) => {
//              if (params.row.cmwdStatusDis === '待处理') {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                    fontSize: '13px',
//                    disabled: params.row.cmwdIscreate !== '1' ? false : true,
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
//                    disabled: params.row.cmwdIscreate !== '1' ? false : true,
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
        flowEmpComp: '',
        openHCompany: false,
        openUpdate: false,
        openDept: false,
        pladDeptDis: '',
        pladCompanyDis: '',
        paramsDept: {
          _mt: 'orgUnits.getByOrgFramePageList',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'desc',
          funId: '1106',
          logType: '部门',
          unitType: '02dept',
        },
        paramsHCompany: {
          _mt: 'orgUnits.getByOrgFramePageList',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'desc',
          unitType: '01company',
          logType: '雇佣公司',
        },
        //      部门
        searchDeptClo: [
          {
            title: this.$t('lang_employee.searchColumn.unitCodeDepart'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.departCnFullName'),
            key: 'compFnameCnDis',
          },
          {
            title: this.$t('lang_employee.searchColumn.departEnFullName'),
            key: 'compFnameEnDis',
          },
        ],
        //      雇佣公司
        searchHCClo: [
          {
            title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.compCnFullName'),
            key: 'compFnameCnDis',
          },
          {
            title: this.$t('lang_employee.searchColumn.compEnFullName'),
            key: 'compFnameEnDis',
          },
        ],
        flowEmpCompDis: '',
        flowEmpDeptDis: '',
      }
    },
    mounted() {
       this.getData()
    },
    components: {
      commonFlowUpdate,
      searchHCompany,
      searchDept,
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
        t.pladCompanyDis = name
        t.flowEmpCompDis = id
      },
      dbHCompany() {
        const t = this
        t.pladCompanyDis = ''
        t.flowEmpCompDis = ''
      },
      // 选择部门
      pickDepart() {
        const t = this
        const paramsDept = deepCopy(t.paramsDept)
        t.$refs.searchDept.getData(paramsDept, t.pladCompany)
        t.openDept = true
      },
      inputDept(name, id) {
        const t = this
        t.pladDeptDis = name
        t.flowEmpDeptDis = id
      },
      clearDepart() {
        const t = this
        t.pladDeptDis = ''
        t.flowEmpDeptDis = ''
      },
      closeDept() {
        const t = this
        t.$refs.searchDept.unitCode = ''
        t.openDept = false
      },
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
//        this.$store.commit('myWorkOrderNew/setProblemTypes', true) //第三步
        t.getProblemTypes()
        t.$store.state.myWorkOrderNew.ProblemTypes = true
      },
//      changeinput(name, id) {
//        const t = this
//        t.cmwdTypeDis = name
//        t.cmwdType = id
//        t.getData()
//      },
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
        t.getData()
      },
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
        data['cmwdkeyWord'] = t.cmwdkeyWord
        data['cmwdWotypeprop'] = '02busprocess'
        data['flowEmpComp'] = t.flowEmpCompDis
        data['flowCName'] = t.flowCName
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
      // 获取沟通记录信息
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
        console.log(pRow.cmwdTypeDis)
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
        console.log(pRow.cmwdTypeDis)
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
          t.flowShow = true
          t.stepName = pRow.cmwdTypeDis
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
