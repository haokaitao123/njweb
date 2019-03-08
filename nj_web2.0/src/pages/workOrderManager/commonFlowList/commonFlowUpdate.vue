<template>
  <div>
    <div class="cover">
      <div class="box">
        <div class="title">
          <div class="title-text">
            <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
            &nbsp;{{thisSetpName ? thisSetpName : this.$store.state.myWorkOrderNew.ProblemTypeName}}
          </div>
          <Button type="text" @click="close">
            <Icon type="close-round" size="16"></Icon>
          </Button>
        </div>
        <div class="content">
          <row class="table-form" ref="table-form">
            <Table v-show="this.thisPkValues!=='0'" size="small" border ref="selection" :columns="columns" :data="data" :loading="data.length === 0"></Table>
          </row>
          <!-- 步骤表单内容 -->
          <div class="dataBlocks" v-for="(item, index) in dataBlocks" :key="index">
            <div class="dataBlocksTitle">
              <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}</div>
            <div class="dataContent">
              <Spin size="large" v-if="!item.blockColumn" fix></Spin>
              <commonSingleForm v-if="item.blockColumn" :formData1="item.blockColumn" :formlist="item.formlist" :tbName="tbName" :disabled="disabled || item.flsdbOptauth === '01view'"
                :ref="'block' + item.flsdbMark" :lebWidth="200">
              </commonSingleForm>
            </div>
          </div>
          <!-- 流程步骤发送邮件部分 -->
          <div class="dataBlocks" v-for="(item, index) in mailRecords" :key="index">
            <div class="dataBlocksTitle">
              <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}</div>
            <div class="dataContent">
              <div class="docs" v-for="(item2, index2) in item.flsdbMark" :key="index2">
                <a href="javascript:;" @click="openUp(item2.mailId)">
                  <Icon type="email"></Icon>
                  {{item2.object}}
                </a>
                <br/>
              </div>
            </div>
          </div>
          <!-- 流程生成文档 -->
          <div class="dataBlocks" v-for="(item, index) in docs">
            <div class="dataBlocksTitle">
              <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}</div>
            <div class="dataContent">
              <div class="docs">
                <a href="javascript:;" v-for="(item2, index2) in item.flsdbMark" :key="index2" @click="downloadDocs(item2.url,item2.name)">
                  <Icon type="ios-download"></Icon>
                  {{item2.name}}
                </a>
              </div>
            </div>
          </div>
          <!-- 操作人 -->
          <div class="dataBlocks" v-for="(item, index) in operation">
            <div class="dataBlocksTitle">
              <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}</div>
            <div class="dataContent">
              <div class="">
                <Form label-position="right" :label-width="200">
                  <Row>
                    <Col span="10" offset="1">
                      <FormItem :label="$t('lang_communication.commonFlowUpdate.optuser')">
                        <Input :value="item.flsdbMark.optuser" disabled></Input>
                      </FormItem>
                    </Col>
                    <Col span="10" offset="1">
                      <FormItem :label="$t('lang_communication.commonFlowUpdate.opttime')">
                        <Input :value="item.flsdbMark.opttime" disabled></Input>
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div v-show="this.$store.state.myWorkOrderNew.flowShow">
          <div class="footer" v-show="thisStepState !== 'p_flowst_3' && thisStepState !== 'p_flowst_0'">
            <div class="footerChilden" v-show="stepAuthLimits == '03submit'">
              <Button type="primary" @click="save" :loading="loading1">{{$t('button.sav')}}</Button>
              <Button type="success" style="margin-left: 5px;" @click="isSubmit" :loading="loading2" v-if="thisPkValues !== '0'">{{$t('button.subm')}}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <emaillogView v-show="openUpdate" logType="查询" @closeUp="closeUp" ref="update"></emaillogView>
    </transition>
  </div>
</template>
<script>
  import commonSingleForm from '../commonCompanents/commonSingleForm'
  import emaillogView from './emaillogView'
  import {
    getDataLevelUserLogin,
    getDataLevelUserLoginNew2,
    getDataLevelUserLoginNew2Id,
    getDataLevelUserLoginId,
    getDataLevelUserLoginNewId
  } from '../../../axios/axios'
  import {
    isSuccess,
    findComponentUpward,
    deepCopy,
    extendObject
  } from '../../../lib/util'
  import validCode from '../commonCompanents/validCode'
  import {
    onChange
  } from '../onChange/index'
  import Bus from '../bus'

  export default {
    data() {
      return {
        openUpdate: false,
        isShow: false, // 防止数据未加载完成就显示form页面
        dataBlocks: [],
        disabled: this.stepState === 'p_flowst_3',
        loading1: false,
        loading2: false,
        dataBlocksFake: [], // 临时存储
        formData: {},
        formDataSubmit: {},
        clmMap: {},
        clmkvMap: {}, // 弹出框，{物理列名：字段中文名}
        popForm: {}, // 该步骤，所有表单，布局为弹出框的数据 key, value
        tbName: '',
        data: [],
        columns: [],
        valueMap: {},
        isFinish: false,
        requirCount: 0,
        finishCount: 0,
        thisPkValue: this.thisPkValues,
        thisStepId: this.thisStepIds,
        thisStepState: '',
        thisSetpName: this.setpName,
        thisStepIdOne: '',
        operation: [],
        docs: [],
        mailRecords: [],
        stepAuthLimits: '',
      }
    },
//    props: {
//      flowId: String,
//      pkValue: String,
//      stepId: String,
//      setpName: String,
//      stepState: String,
//    },
    created() {
      this.getColumns()
    },
    components: {
      commonSingleForm,
      emaillogView,
    },
    computed: {
      thisStepIds() {
        return this.$store.state.myWorkOrderNew.thisStepId
      },
      stepStates() {
        return this.$store.state.myWorkOrderNew.stepState
      },
      thisPkValues() {
        return this.$store.state.myWorkOrderNew.thisPkValue
      },
    },
    methods: {
      getDataBlock() {
        const t = this
        t.requirCount = 0
        t.finishCount = 0
        t.dataBlocks = []
        t.dataBlocksFake = []
        t.operation = []
        t.docs = []
        t.mailRecords = []
        getDataLevelUserLoginId({
          _mt: 'platAutoLayoutGetFlowEdit.getDataBlock',
          flowId: t.$store.state.myWorkOrderNew.isflowId, // 流程ID
          stepId: t.thisStepIds, // 流程步骤ID
          roleType: t.$store.state.user.roleType, // 角色类型
          logType: 'getDataBlock', // 主键值
          pkValue: t.thisPkValues,
          funId: t.$store.state.myWorkOrderNew.isfunId, // 流程ID
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.dataBlocksFake = res.data.content[0].dataBlocks // 表单数据块
            t.thisStepIds = res.data.content[0].stepId // 步骤id
            t.thisStepIdOne = res.data.content[0].stepId // 步骤id
            t.stepAuthLimits = res.data.content[0].stepAuth // '03submit'
            t.flowId = res.data.content[0].flowId
            // 不是form表单做特殊处理
            for (let i = t.dataBlocksFake.length - 1; i > 0; i--) {
              if (t.dataBlocksFake[i].flsdbType === 'docs') {
                t.dataBlocksFake[i].flsdbMark = JSON.parse(t.dataBlocksFake[i].flsdbMark)
                t.dataBlocksFake[i].flsdbMark = t.dataBlocksFake[i].flsdbMark.map((item) => {
                  let a = item.file.split(':')
                  return {
                    name: a[0],
                    url: a[1],
                  }
                })
                t.docs.push(t.dataBlocksFake[i])
                t.dataBlocksFake.splice(i, 1)
              } else if (t.dataBlocksFake[i].flsdbType === 'operation') {
                t.dataBlocksFake[i].flsdbMark = JSON.parse(t.dataBlocksFake[i].flsdbMark)
                t.operation.push(t.dataBlocksFake[i])
                t.dataBlocksFake.splice(i, 1)
              } else if (t.dataBlocksFake[i].flsdbType === 'mailRecords') {
                t.dataBlocksFake[i].flsdbMark = JSON.parse(t.dataBlocksFake[i].flsdbMark)
                t.mailRecords.push(t.dataBlocksFake[i])
                t.dataBlocksFake.splice(i, 1)
              }
            }
            for (let i = 0; i < t.dataBlocksFake.length; i++) {
              t.requirCount = t.dataBlocksFake.length
              if (t.dataBlocksFake[i].flsdbType === '01form') {
                t.getColumn(t.dataBlocksFake[i].id, t.dataBlocksFake[i].flsdbType)
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
      openUp(id) {
        const t = this
        t.openUpdate = true
        t.$refs.update.getData(id)
      },
      closeUp() {
        this.openUpdate = false
      },
      /*
       * 格式化数据
       * */
      getFormDataSubmit(data) {
        const t = this
        let columns = data // 字段
        let formData = {}
        let form = {} // 表单
        let ruler = {} // 校验规则
        let dis = {} // 是否禁止修改
        let clmmap = {}
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].clmSelOptMark === 'user-info-std') { // 设置默认值, 用户
            if (!columns[i].clmValue) {
              columns[i].clmValue = t.$store.state.user.userId
              getDataLevelUserLogin({
                _mt: 'userMgmt.getuserbyid',
                id: t.$store.state.user.userId,
                funId: '1',
                logType: '根据用户id获取用户信息',
              }).then((res) => {
                if (isSuccess(res, t)) {
                  columns[i].clmDisValue = res.data.content[0].name
                }
              }).catch(() => {
                this.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            }
          }
          if (columns[i].clmLayout === 20) {
            if (columns[i].clmValue !== '') {
              form[columns[i].clmName] = columns[i].clmValue.split(',')
            } else {
              form[columns[i].clmName] = []
            }
          } else {
            form[columns[i].clmName] = columns[i].clmValue
          }
          if (columns[i].clmName !== 'companyId') {
            clmmap[columns[i].clmName] = columns[i].clmDbName
          }
          if (columns[i].columnValid) { // 如果有校验
            ruler[columns[i].clmName] = []
            for (let j = 0; j < columns[i].columnValid.length; j++) { //
              // 单个多选框 的值，必填，在校验的时候。 不勾选。校验逻辑不一样。 做特殊校验 0 的值。
              if (columns[i].clmLayout == 10 && columns[i].columnValid[j].clmvMod == 'p_vldmod_000') {
                ruler[columns[i].clmName].push({
                  validator: (rule, value, callback) => {
                    if (form[rule.field] == undefined || form[rule.field] == '' || form[rule.field] == '0' ) { //如果不行，就传值报错
                      callback(new Error(rule.message))
                    } else {
                      callback()
                    }
                  },
                  trigger: 'change',
                  message: columns[i].clmDname + columns[i].columnValid[j].clmvPrompts,
                  valid: columns[i].columnValid[j].clmvMod,
                })

              } else {
                ruler[columns[i].clmName].push({
                  validator: (rule, value, callback) => {
                    if (!validCode[rule.valid](form[rule.field])) {
                      callback(new Error(rule.message))
                    } else {
                      callback()
                    }
                  },
                  trigger: 'change',
                  message: columns[i].clmDname + columns[i].columnValid[j].clmvPrompts,
                  valid: columns[i].columnValid[j].clmvMod,
                })
              }
            }
          }
          if (columns[i].clmDefDis === false) {
            delete form[columns[i].clmName]
          }
          if (columns[i].clmIsupdate === true) {
            dis[columns[i].clmName] = true
          } else {
            dis[columns[i].clmName] = false
          }
          // 弹出选择
          for (let i = 0; i < columns.length; i++) {
            if (columns[i].clmLayout == 13) {
              this.popForm[columns[i].clmName] = columns[i].clmValue
            }
          }
        }
        form._mt = 'platAutoLayoutSave.addOrUpd'
        form.logType = '保存'
        formData.form = form
        formData.ruler = ruler
        formData.clmmap = clmmap
        formData.dis = dis
        return formData
      },
      /*
       * 获取表格字段
       * */
      getColumns() {
        const t = this
        getDataLevelUserLoginId({
          _mt: 'workorderFlowList.getListColumnForWorkOder',
          roleType: t.$store.state.user.roleType,
          logType: 'getListColumn',
          funId: t.$store.state.myWorkOrderNew.isfunId,
        }).then((res) => {
          if (isSuccess(res, t)) {
            let aa = []
            t.flowId = res.data.content[0].flowId
            t.btns = res.data.content[0].btns
            t.tbName = res.data.content[0].tbName
            aa = res.data.content[0].columns
            for (let i = 0; i < aa.length; i++) {
              aa[i].sortable = false
              if (!aa[i].width) {
                aa[i].width = 120
              } else {
                aa[i].width = 60
              }
              if (aa[i].className !== '') {
                aa[i].width = 120
                aa[i]['render'] = (h, params) => {
                  this.thisStepState = params.row[params.column.key].split('$')[3]
                  this.thisSetpName = params.row[params.column.key].split('$')[5]
                  let bb = []
                  if (params.row[aa[i].key]) {
                    bb = params.row[aa[i].key].split('$')
                  }
                  let text = ''
                  let show = ''
                  switch (bb[3]) {
                    case 'p_flowst_0':
                      show = this.$t('lang_communication.commonFlowUpdate.pflowst0')
                      break
                    case 'p_flowst_1':
                      show = this.$t('lang_communication.commonFlowUpdate.pflowst1')
                      break
                    case 'p_flowst_2':
                      show = this.$t('lang_communication.commonFlowUpdate.pflowst2')
                      break
                    case 'p_flowst_3':
                      show = this.$t('lang_communication.commonFlowUpdate.pflowst3')
                      break
                  }
                  if (bb[2]) {
                    text = '[ ' + bb[2] + ' ]'
                  }
                  if (text !== '') {
                    return h('Tooltip', {
                      props: {
                        trigger: 'hover',
                        content: show,
                        placement: 'left',
                      },
                    }, [
                      h('div', {
                        style: {
                          width: '119px',
                          height: '100%',
                          'line-height': '40px',
                          'text-align': 'center',
                        },
                        on: {
                          click: () => {
                            this.thisPkValues = params.row.id
                            this.thisStepIds = params.row[params.column.key].split('$')[1]
                            // console.log(this.thisStepId + '444444444444444444')
                            if (params.row[params.column.key].split('$')[3] === 'p_flowst_0') {
                              return
                            }
                            this.thisStepState = params.row[params.column.key].split('$')[3]
                            this.thisSetpName = params.row[params.column.key].split('$')[5]
                            this.getDataBlock()
                          },
                        },
                      }, text),
                    ])
                  }
                  return h()
                }
              }
            }
            t.columns = aa
            this.getData()    // 获取数据
            this.getDataBlock() // 获取表单模块
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
       * 获取表格数据
       * */
      getData() {
        const t = this
        getDataLevelUserLoginId({
          _mt: 'workorderFlowList.getPageForWorkOder',
          sort: 'id',
          order: 'desc',
          rows: 1,
          page: 1,
          roleType: t.$store.state.user.roleType,
          logType: 'getPage',
          data: JSON.stringify({
            id: t.thisPkValues
          }),
          funId: t.$store.state.myWorkOrderNew.isfunId
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.data = JSON.parse(res.data.content[0].rows)
            for (let i = 0; i < t.data.length; i++) {
              t.data[i].cellClassName = {}
              for (let item in t.data[i]) {
                if (typeof t.data[i][item] === 'string') {
                  if (t.data[i][item].split('$').length > 1) {
                    t.data[i].cellClassName[item] = t.data[i][item].split('$')[3]
                  }
                }
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
      getColumn(dataBlockId, dataBlockType) {
        const t = this
        const params = {
          _mt: 'platAutoLayoutGetFlowEdit.getDataBlockColumn',
          flowId: t.flowId, // 流程ID
          stepId: t.thisStepIds, // 流程步骤ID
          dataBlockId: dataBlockId,
          dataBlockType: dataBlockType,
          roleType: t.$store.state.user.roleType, // 角色类型
          logType: 'getBlockColumn', // 主键值
          pkValue: t.thisPkValues,
          funId: t.$store.state.myWorkOrderNew.isfunId,
        }
        getDataLevelUserLoginId(params).then((res) => {
          if (isSuccess(res, t)) {
            t.dataBlocks = [] // 进入之后每次清空datablock里的数据
            t.finishCount = t.finishCount + 1 // 已经获取的步骤表单条数
            let bb = t.dataBlocksFake
            for (let i = 0; i < bb.length; i++) {
              if (bb[i].id === dataBlockId) {
                bb[i]['blockColumn'] = res.data.content[0]
                bb[i]['formlist'] = t.getFormDataSubmit(res.data.content[0].columns)
              }
            }
            // 弹出框的 (物理名称，字段名)
            for (let j = 0; j < res.data.content[0].columns.length; j++) {
              if (res.data.content[0].columns[j].clmLayout == 13) {
                t.clmkvMap[res.data.content[0].columns[j].clmName] = res.data.content[0].columns[j].clmDname
              }
            }
            t.dataBlocksFake = bb // 临时block存储变量最后赋值给正式的block，这样才能正确更新数据
            t.dataBlocks = t.dataBlocksFake
            if (t.finishCount === t.requirCount) {
              this.$store.commit('flowClmkMap/setClmkvMap', t.clmkvMap)
              t.clmkvMap = {} // 清空
              this.$store.commit('flowClmkMap/setPopForm', t.popForm)
              t.popForm = {} // 清空
              console.log(this.$store.state.flowClmkMap.popForm)
              this.getValueMap(t.dataBlocks)
              Bus.map = t.valueMap
              Bus.father = t
              if (onChange.hasOwnProperty(this.tbName)) {
                setTimeout(() => {
                  onChange[this.tbName].all_dis.call(this)
                }, 500)
              }
            }
          }
        }).catch((res) => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: res,
          })
        })
      },
      getValueMap(dataBlocks) {
        const t = this
        let arr = []
        t.valueMap = {}
        console.log(dataBlocks)
        for (let i = 0; i < dataBlocks.length; i++) {
          arr.concat(dataBlocks[i].formlist)
          let item = dataBlocks[i].blockColumn.columns
          for (let j = 0; j < item.length; j++) {
            t.valueMap[item[j].clmName] = 'block' + dataBlocks[i].flsdbMark
          }
        }
        console.log(arr)
      },
      close() {
        const t = this
        t.$Modal.confirm({
          title: this.$t('reminder.remind'),
          content: this.$t('lang_communication.commonFlowUpdate.confirmRemind'),
          onOk: () => {
            t.docs = []
            t.operation = []
            t.mailRecords = []
            t.$emit('close')
            Bus.$emit('getData')
          },
        })
      },
      isSubmit() {
        const t = this
        t.$Modal.confirm({
          title: this.$t('reminder.remind'),
          content: this.$t('lang_communication.commonFlowUpdate.sumitRemind'),
          onOk: () => {
            t.submit()
          },
        })
      },
      async submit() {
        const t = this
        t.loading2 = true
        t.formDataSubmit = {}
        try {
          let a = true
          for (let i = 0; i < this.$children.length; i++) {
            if (this.$children[i].$options) {
              if (this.$children[i].$options._componentTag === 'commonSingleForm') {
                let b = await this.$children[i].validForm()
                if (!b) {
                  a = false
                }
                extendObject(t.formDataSubmit, t.$children[i].formDataSubmit)
                extendObject(t.clmMap, t.$children[i].clmMap)
              }
            }
          }
          if (!a) {
            t.loading2 = false
            return
          }
          t.formDataSubmit._mt = 'workorderFlowSave.addOrUpd'
          t.formDataSubmit.tbName = t.tbName
          t.formDataSubmit.stepId = t.thisStepIds
          t.formDataSubmit.roleType = t.$store.state.user.roleType // 角色类型
          t.formDataSubmit.cmutType = t.$store.state.myWorkOrderNew.orderTypeId // 问题类型ID
          t.formDataSubmit.flowId = t.flowId
          t.formDataSubmit.funId = t.$store.state.myWorkOrderNew.isfunId
          t.formDataSubmit.pkValue = t.thisPkValues
          t.formDataSubmit.clmMap = JSON.stringify(t.clmMap)
          getDataLevelUserLoginNew2Id(t.formDataSubmit).then((res) => {
            t.loading2 = false
            if (isSuccess(res, t)) {
              let data = {}
              data._mt = 'cmutWorkorder.submitOrderAndBusi'
              data.logType = 'submit'
              data.cmwdIscreate = '1'
              data.functionId = t.$store.state.myWorkOrderNew.isfunId
              data.roleStyle = this.$store.state.user.roleType // 角色类型
              data.cmwdMarkno = this.$store.state.myWorkOrderNew.problemCmwdMarkno // 角色类型
              data.id = this.$store.state.myWorkOrderNew.entryId // 角色类型
              getDataLevelUserLoginNewId(data).then((res2) => {
                t.loading2 = false
                if (isSuccess(res2, t)) {
                  t.thisStepState = 'p_flowst_3'
                  t.getColumns()
//                  t.getDataBlock()
                  t.$emit('getData')
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('lang_communication.commonFlowUpdate.SubmittedSuccess'),
                  })
                }
              }).catch(() => {
                t.loading2 = false
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            }
          }).catch(() => {
            t.loading2 = false
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        } catch (res) {
          t.loading2 = false
        }
      },
      change() {
        const t = this
        for (let i = 0; i < this.$children.length; i++) {
          if (this.$children[i].$options) {
            if (this.$children[i].$options._componentTag === 'commonSingleForm') {
              t.$children[i].change()
            }
          }
        }
      },
      downloadDocs(url,filename) {
        const t = this
    		let data = {
	        _mt: 'userMgmt.getfiletoken',
	        isprivate: true,
	        logType: '下载',
	        filekey: url,
	        expiresecs: 180,
	      }
	      getDataLevelUserLogin(data).then((res) => {
	        if (isSuccess(res, t)) {
            localStorage.pageOpenedListAll = localStorage.pageOpenedList
	          let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(filename);
            let link = document.createElement('a');
            link.href = doclink;
            link.download = "downloadfiletemp";
            link.click();
            this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
	        }
	      }).catch(() => {
	        t.$Modal.error({
	          title: this.$t('reminder.err'),
	          content: this.$t('reminder.errormessage'),
	        })
	      })
      },
      /*
       * 保存方法
       * */
      async save() {
        const t = this
        t.loading1 = true
        t.formDataSubmit = {}
        try {
          let a = true
          for (let i = 0; i < this.$children.length; i++) {
            if (this.$children[i].$options) {
              if (this.$children[i].$options._componentTag === 'commonSingleForm') {
                let b = await this.$children[i].validForm()
                if (!b) {
                  a = false
                }
                extendObject(t.formDataSubmit, t.$children[i].formDataSubmit)
                extendObject(t.clmMap, t.$children[i].clmMap)
              }
            }
          }
          if (!a) {
            t.loading1 = false
            return
          }
          t.formDataSubmit._mt = 'workorderFlowSave.addOrUpd'
          t.formDataSubmit.tbName = t.tbName
          if (t.thisStepIds === 0) {
            t.formDataSubmit.stepId = t.thisStepIdOne
          } else {
            t.formDataSubmit.stepId = t.thisStepIds
          }
          t.formDataSubmit.roleType = t.$store.state.user.roleType // 角色类型
          t.formDataSubmit.cmutType = t.$store.state.myWorkOrderNew.orderTypeId // 问题类型ID
          t.formDataSubmit.flowId = t.flowId
          t.formDataSubmit.funId = t.$store.state.myWorkOrderNew.isfunId
          t.formDataSubmit.pkValue = t.thisPkValues
          t.formDataSubmit.clmMap = JSON.stringify(t.clmMap)
          getDataLevelUserLoginNew2Id(t.formDataSubmit).then((res) => {
            t.loading1 = false
            if (isSuccess(res, t)) {
              if (t.thisPkValues === '0') {
                t.thisPkValues = res.data.content[0].value.split('_')[0]
                t.thisStepIds = res.data.content[0].value.split('_')[1]
                t.getData()
                t.$emit('getData')
              }
              this.getColumns()
//              this.getDataBlock() // 直接在getColumns方法中调用，保证顺序
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('lang_communication.commonFlowUpdate.saveSuccess'),
              })
              if (t.thisStepIds === 0) {
                this.$store.commit('myWorkOrderNew/setCommonFlowUpdate', false)
              }
              Bus.$emit('getData')
            }
          }).catch(() => {
            t.loading1 = false
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        } catch (res) {
          t.loading1 = false
        }
      },
    },
    watch: {
      thisStepState(value) {
        if (value === 'p_flowst_3') {
          this.disabled = true
        } else {
          this.disabled = false
        }
      },
    },
  }

</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .cover .box {
    width: 1200px;
  }

  .content {
    height: 430px;
    position: relative;
    overflow-y: auto;
    .table-form {
      margin-top: 0;
      margin-bottom: 20px;
      .ivu-table{

        }
    }
    .dataBlocks {
      .dataBlocksTitle {
        /*background: linear-gradient(-45deg, #c6b7ff, #ffffff);*/
        background-color: rgba(39, 142, 255, 0.2);
        font-size: 14px;
        padding: 0 20px;
        height: 26px;
        font-weight: bold;
        line-height: 26px;
      }
      .dataContent {
        position: relative;
        background-color: #f9f9f9;
        padding-right: 100px;
        padding-top: 30px;
        padding-bottom: 10px;
        /*width: 1100px;*/
        .operation {
          text-align: right;
          padding: 0 0 0 50px;
        }
        .docs {
          padding: 0 0 20px 100px;
        }
      }
    }
  }

  .footer {
    margin-top: 10px;
    padding: 0 30px;
    display: flex;
    justify-content: flex-end;
  }
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
  .btns{
    margin-right: 5px;
  }

</style>
