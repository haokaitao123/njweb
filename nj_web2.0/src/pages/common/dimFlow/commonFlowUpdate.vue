<template>
  <div>
    <div class="cover">
      <div class="box">
        <div class="title">
          <div class="title-text">
            <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
            &nbsp;{{thisStepName}}
          </div>
          <Button type="text" @click="close">
            <Icon type="close-round" size="16"></Icon>
          </Button>
        </div>
        <div class="content">
          <row class="table-form" ref="table-form">
            <Table v-show="thisPkValue!=='0'" size="small" border ref="selection" :columns="columns" :data="data" :loading="data.length === 0"></Table>
          </row>
          <div class="dataBlocks" v-for="(item, index) in dataBlocks" :key="index">
            <div class="dataBlocksTitle">
              <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}</div>
            <div class="dataContent">
              <!--<Spin size="large" v-if="!item.blockColumn" fix></Spin>-->
              <commonSingleForm v-if="item.blockColumn" :formData1="item.blockColumn" :formlist="item.formlist" :tbName="tbName" :disabled="disabled || item.flsdbOptauth === '01view'"
                :ref="'block' + item.flsdbMark" :lebWidth="200">
              </commonSingleForm>
              <!--:columns="columnsChild" :data="data1"-->
              <div v-if="stepAuthLimits === '03submit' && item.flsdbOptauth === '02update' && item.flsdbSubisupd === '1'">
                <Button class="btns" type="primary" v-if="!item.blockColumn" @click="btnFunction(item.flsdbSubform,item.flsdbSubformtype,item.flsdbSubfilter)">新增</Button>
                <Button class="btns" type="error"   v-if="!item.blockColumn" @click="isdelete(item.flsdbSubform,item.flsdbSubformtype,item.flsdbSubfilter)">删除</Button>
              </div>
              <row class="table-form" ref="table-form">
                <Table @on-selection-change="selectedtable" v-if="!item.blockColumn" border ref="selection" size="small" :columns="columnsChild" :data="dataTable"></Table>
              </row>
              <row v-if="!item.blockColumn">
                <Row style="display: flex">          <Page :total="totalTable" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
              </row>
            </div>
          </div>
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
          <div class="dataBlocks" v-for="(item, index) in operation">
            <div class="dataBlocksTitle">
              <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}</div>
            <div class="dataContent">
              <div class="">
                <Form label-position="right" :label-width="200">
                  <Row>
                    <Col span="10" offset="1">
                      <FormItem label="操作人:">
                        <Input :value="item.flsdbMark.optuser" disabled></Input>
                      </FormItem>
                    </Col>
                    <Col span="10" offset="1">
                      <FormItem label="更新时间:">
                        <Input :value="item.flsdbMark.opttime" disabled></Input>
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
                <!-- <span style="margin-right: 10px;">操作人:</span>
                <span style="margin-right: 120px;">{{item.flsdbMark.optuser}}</span>
                <span style="margin-right: 10px;">更新时间:</span>
                <span style="margin-right: 120px;">{{item.flsdbMark.opttime}}</span> -->
              </div>
            </div>
          </div>
        </div>
        <div v-if="flowShow">
          <div class="footer" v-show="thisStepState !== 'p_flowst_3' && thisStepState !== 'p_flowst_0'">
            <div class="footerChilden" v-show="stepAuthLimits == '03submit'">
              <Button type="primary" @click="save" :loading="loading1">{{$t('button.sav')}}</Button>
              <Button type="success" style="margin-left: 5px;" @click="isSubmit" :loading="loading2" v-show="thisPkValue !== '0'">提交</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <emaillogView v-show="openUpdate" logType="查询" @closeUp="closeUp" ref="update"></emaillogView>
    </transition>
    <transition name="fade">
      <testUpdPage v-if="openTestUpd" :showflag="showflag" @closePage="closePage" :ChidlTableId="ChidlTableId" :Tabledisabled="Tabledisabled"  @close="closeTest" :flsdbSubfilter="flsdbSubfilter" :thisPkValue="thisPkValue" :flsdbSubform="flsdbSubform" :flsdbSubformtype="flsdbSubformtype" @getData="getData" :tbName="tbNameTable" :id="formNo" :pklv="pklv" :formParentfield="formParentfieldTable"></testUpdPage>
    </transition>
  </div>
</template>
<script>
  import testUpdPage from './commonSinglePageUpdate.vue'
  import commonSingleForm from '../commonCompanents/commonSingleForm'
  import emaillogView from '../commonFlowList/emaillogView.vue'
  import {
    getDataLevelUserLogin,
    getDataLevelUserLoginNew2,
    getDataLevelUserLoginNew2Id,
    getDataLevelUserLoginNewId,
    getDataLevelUserLoginId
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
        Tabledisabled: false,
        loading1: false,
        loading2: false,
        dataBlocksFake: [], // 临时存储
        formData: {},
        formDataSubmit: {},
        openTestUpd: false,
        clmMap: {},
        tbName: '',
        data: [],
        showflag: false,
        columns: [],
        columnsChild: [],
        formParentfieldTable: [],
        tableselected: [],
        valueMap: {},
        isFinish: false,
        requirCount: 0,
        finishCount: 0,
        thisPkValue: this.pkValue,
        thisStepId: this.stepId,
        thisStepState: this.stepState,
        thisStepName: this.stepName,
        operation: [],
        docs: [],
        mailRecords: [],
        dataBlocksFakeId: '',
        stepAuthLimits: '',
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        dataTable: [],
        totalTable: 0,
        formNo: '0',
        tbNameTable: '',
        flsdbSubfilter: '',
        ChidlTableId: '',
        ChildDataBloks: [],
        revise: {
          width: 120,
          title: this.$t('button.opr'),
          key: 'action',
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            console.log(params)
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                },
                style: {
                  marginRight: '10px',
                },
                on: {
                  click: () => {
                    this.ChildopenUp(params.row.id, params.index, params)
                  },
                },
              }, '查看'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                },
                style: {
                  marginRight: '10px',
                  display: this.stepAuthLimits === '03submit' && this.columnsChild[0].flsdbOptauth === '02update' && this.columnsChild[0].flsdbSubisupd === '1' ? 'inline' : 'none',
                },
                on: {
                  click: () => {
                    this.update(params.row.id, params.index, params)
                  },
                },
              }, this.$t('button.upd')),
            ])
          },
        },
      }
    },
    props: {
      flowId: String,
      pkValue: String,
      stepId: String,
      stepName: String,
      stepState: String,
      funId: String,
      flowShow: Boolean,
      pklv: String, // 主表id
    },
    created() {
      this.getColumns()
      this.getDataBlock()
    },
    components: {
      commonSingleForm,
      emaillogView,
      testUpdPage,
    },
    mounted() {
      Bus.$on('getDataBlock', () => {
        this.getPageChildTable(this.dataBlocksFakeId)
      })
    },
    methods: {
      update(params) {
        console.log(params)
          this.flsdbSubform = this.ChildDataBloks[0].flsdbSubform
          this.flsdbSubformtype = this.ChildDataBloks[0].flsdbSubformtype
          this.flsdbSubfilter = this.ChildDataBloks[0].flsdbSubfilter
          this.Tabledisabled = false
          this.openTestUpd = true
          this.showflag = true
          this.formNo = params
          this.ChidlTableId = params
      },
      ChildopenUp(params) {
        this.flsdbSubform = this.ChildDataBloks[0].flsdbSubform
        this.flsdbSubformtype = this.ChildDataBloks[0].flsdbSubformtype
        this.flsdbSubfilter = this.ChildDataBloks[0].flsdbSubfilter
        this.openTestUpd = true
        this.Tabledisabled = true
        this.showflag = false
        this.formNo = params
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
        console.log(this.tableselected)
      },
      isdelete() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: '请选择要删除的对象',
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: '是否确认删除？',
            onOk: () => {
              t.deletemsg()
            },
          })
        }
      },
      deletemsg() {
        const t = this
        console.log(t.tableselected)
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: '请选择要删除的对象',
          })
          return
        }
        getDataLevelUserLogin({
          _mt: 'subTableSave.deleteBySubIds',
          logType: this.$t('button.del'),
          subFromIds: t.tableselected,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '删除成功',
            })
            this.getPageChildTable(t.dataBlocksFakeId)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
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
          flowId: t.flowId, // 流程ID
          stepId: t.thisStepId, // 流程步骤ID
          roleType: t.$store.state.user.roleType, // 角色类型
          logType: 'getDataBlock', // 主键值
          pkValue: t.thisPkValue,
          funId: t.funId,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.dataBlocksFake = res.data.content[0].dataBlocks
            t.thisStepId = res.data.content[0].stepId
            t.stepAuthLimits = res.data.content[0].stepAuth
//            console.log(t.stepAuthLimits)
//            console.log(res.data.content[0].stepId + '222222222222')
//            console.log(t.thisStepId + '33333333333333333')
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
//              console.log(t.dataBlocksFake[i].flsdbType)
              if (t.dataBlocksFake[i].flsdbType === '01form') {
                t.getColumn(t.dataBlocksFake[i].id, t.dataBlocksFake[i].flsdbType)
              } else {
                t.getPageChildTable(t.dataBlocksFake[i].id, t.dataBlocksFake[i].flsdbType)
                t.getColumnChildTable(t.dataBlocksFake[i].id)
                t.dataBlocksFakeId = t.dataBlocksFake[i].id
              }
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
//        console.info(t.docs)
      },
      btnFunction(flsdbSubformid, flsdbSubformtype, flsdbSubfilter) {
        this.flsdbSubform = flsdbSubformid
        this.flsdbSubformtype = flsdbSubformtype
        this.flsdbSubfilter = flsdbSubfilter
        this.ChidlTableId = ''
        this.formNo = '0'
        this.showflag = true
        this.openTestUpd = true
      },
      closeTest() {
        this.openTestUpd = false
      },
      closePage() {
        this.openTestUpd = false
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
        let columns = data // 字段
        let formData = {}
        let form = {} // 表单
        let ruler = {} // 校验规则
        let dis = {} // 是否禁止修改
        let clmmap = {}
//        console.log(data)
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].clmLayout === 20) {
            // 当数据类型为checkBox group时，需要数据类型为数组
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
          if (columns[i].columnValid) {
            ruler[columns[i].clmName] = []
            for (let j = 0; j < columns[i].columnValid.length; j++) {
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
          if (columns[i].clmDefDis === false) {
            // 默认是否显示
            delete form[columns[i].clmName]
          }
          if (columns[i].clmIsupdate === true) {
            dis[columns[i].clmName] = true
          } else {
            dis[columns[i].clmName] = false
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
          _mt: 'platAutoLayoutGetFlowList.getListColumn',
          roleType: t.$store.state.user.roleType,
          logType: 'getListColumn',
          funId: t.funId,
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
                  this.thisStepName = this.stepName
                  let bb = []
                  if (params.row[aa[i].key]) {
                    bb = params.row[aa[i].key].split('$')
                  }
                  let text = ''
                  let show = ''
                  switch (bb[3]) {
                    case 'p_flowst_0':
                      show = '未开启'
                      break
                    case 'p_flowst_1':
                      show = '待处理'
                      break
                    case 'p_flowst_2':
                      show = '处理中'
                      break
                    case 'p_flowst_3':
                      show = '已完成'
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
                        placement: 'right',
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
                            this.thisPkValue = params.row.id
                            this.thisStepId = params.row[params.column.key].split('$')[1]
                            // console.log(this.thisStepId + '444444444444444444')
                            if (params.row[params.column.key].split('$')[3] === 'p_flowst_0') {
                              return
                            }
                            this.thisStepState = params.row[params.column.key].split('$')[3]
                            this.thisStepName = params.row[params.column.key].split('$')[5]
                            // alert(this.thisStepState)
//                            console.log('11111111111111111111111' + this.thisStepState)
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
            console.log(t.columns, '396')
            this.getData()
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
          _mt: 'platAutoLayoutGetFlowList.getPage',
          sort: 'id',
          order: 'desc',
          rows: '1',
          page: '1',
          roleType: t.$store.state.user.roleType,
          logType: 'getPage',
          data: JSON.stringify({
            id: t.thisPkValue,
          }),
          funId: t.funId,
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
          stepId: t.thisStepId, // 流程步骤ID
          dataBlockId: dataBlockId,
          dataBlockType: dataBlockType,
          roleType: t.$store.state.user.roleType, // 角色类型
          logType: 'getBlockColumn', // 主键值
          pkValue: t.thisPkValue,
          funId: t.funId,
        }
        getDataLevelUserLoginId(params).then((res) => {
          if (isSuccess(res, t)) {
            t.dataBlocks = [] // 进入之后每次清空datablock里的数据
            t.finishCount = t.finishCount + 1
            let bb = t.dataBlocksFake
            for (let i = 0; i < bb.length; i++) {
              if (bb[i].id === dataBlockId) {
                bb[i]['blockColumn'] = res.data.content[0]
                bb[i]['formlist'] = t.getFormDataSubmit(res.data.content[0].columns)
              }
            }
            t.dataBlocksFake = bb // 临时block存储变量最后赋值给正式的block，这样才能正确更新数据
            t.dataBlocks = t.dataBlocksFake
            t.ChildDataBloks = []
            for (let i = 0; i < t.dataBlocks.length; i++) {
              if (t.dataBlocks[i].flsdbType === '02subtable') {
                t.ChildDataBloks.push(t.dataBlocks[i])
              }
            }
            console.log(t.ChildDataBloks)
            console.log(t.dataBlocks, '7777777777777')
            if (t.finishCount === t.requirCount) {
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
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getPageChildTable()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getPageChildTable()
      },
      getPageChildTable(dataBlockId) {
        const t = this
        const params = {
          _mt: 'subGetList.getPage',
          dataBlockId: dataBlockId,
          logType: '流程子集', // 主键值
          flowDataId: t.thisPkValue,
          funId: t.funId,
          sort: t.sort,
          page: t.page,
          rows: t.rows,
          order: t.order,
        }
        getDataLevelUserLogin(params).then(res => {
          t.dataTable = JSON.parse(res.data.content[0].rows)
          t.totalTable = res.data.content[0].records
        }).catch(err => {
          console.log(err)
        })
      },
      getColumnChildTable(dataBlockId) {
        const t = this
        const params = {
          _mt: 'subGetList.getListColumn',
          dataBlockId: dataBlockId,
          logType: '流程子集', // 主键值
          funId: t.funId,
        }
        getDataLevelUserLogin(params).then(res => {
          let aa = []
          t.formParentfieldTable = res.data.content[0].formParentfield
          t.btns = res.data.content[0].btns
          t.tbNameTable = res.data.content[0].tbName
          aa = res.data.content[0].columns
          for (let i = 0; i < aa.length; i++) {
            if (!aa[i].width) {
              aa[i].width = 140
            } else {
              aa[i].width = 60
            }
          }
          t.columnsChild = aa
          t.columnsChild.push(t.revise)
          console.log(t.columnsChild, '533')
        }).catch(err => {
          console.log(err)
        })
      },
      getValueMap(dataBlocks) {
        const t = this
        t.valueMap = {}
        for (let i = 0; i < dataBlocks.length; i++) {
          let item = dataBlocks[i].blockColumn.columns
          for (let j = 0; j < item.length; j++) {
            t.valueMap[item[j].clmName] = 'block' + dataBlocks[i].flsdbMark
          }
        }
      },
      close() {
        const t = this
        t.$Modal.confirm({
          title: this.$t('reminder.remind'),
          content: '是否确认关闭？',
          onOk: () => {
            t.docs = []
            t.operation = []
            t.mailRecords = []
            t.$emit('close')
          },
        })
      },
      isSubmit() {
        const t = this
        t.$Modal.confirm({
          title: this.$t('reminder.remind'),
          content: '是否确认提交？',
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
          t.formDataSubmit._mt = 'platAutoLayoutFlowSave.addOrUpd'
          t.formDataSubmit.tbName = t.tbName
          t.formDataSubmit.stepId = t.thisStepId
          t.formDataSubmit.roleType = t.$store.state.user.roleType // 角色类型
          t.formDataSubmit.flowId = t.flowId
          t.formDataSubmit.pkValue = t.thisPkValue
          t.formDataSubmit.clmMap = JSON.stringify(t.clmMap)
          t.formDataSubmit.funId = t.funId
//          console.log(t.formDataSubmit.stepId + '111111111111111111111')
          getDataLevelUserLoginNew2Id(t.formDataSubmit).then((res) => {
            t.loading2 = false
            if (isSuccess(res, t)) {
              let data = {}
              data._mt = 'platAutoLayoutFlowSubmit.submit'
              data.tbName = t.tbName
              data.stepId = t.thisStepId
              data.roleType = t.$store.state.user.roleType // 角色类型
              data.flowId = t.flowId
              data.pkValue = t.thisPkValue
              data.logType = 'submit'
              //        t.formDataSubmit.clmMap = JSON.stringify(t.clmMap)
              getDataLevelUserLogin(data).then((res2) => {
                t.loading2 = false
                if (isSuccess(res2, t)) {
                  t.thisStepState = 'p_flowst_3'
                  t.getColumns()
                  t.getDataBlock()
                  t.$emit('getData')
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: '提交成功',
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
            localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
            if (this.isIE()) {
              window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(filename)
            } else {
              let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(filename)
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
          t.formDataSubmit._mt = 'platAutoLayoutFlowSave.addOrUpd'
          t.formDataSubmit.tbName = t.tbName
          t.formDataSubmit.stepId = t.thisStepId
          t.formDataSubmit.roleType = t.$store.state.user.roleType // 角色类型
          t.formDataSubmit.flowId = t.flowId
          t.formDataSubmit.pkValue = t.thisPkValue
          t.formDataSubmit.clmMap = JSON.stringify(t.clmMap)
          t.formDataSubmit.funId = t.funId
//          console.log(t.formDataSubmit,'11111111111111')
          t.formDataSubmit.clmMap = JSON.stringify(t.clmMap)
          getDataLevelUserLoginNew2Id(t.formDataSubmit).then((res) => {
            t.loading1 = false
            if (isSuccess(res, t)) {
              if (t.thisPkValue === '0') {
                t.thisPkValue = res.data.content[0].value.split('_')[0]
                t.thisStepId = res.data.content[0].value.split('_')[1]
//                console.log(res.data.content[0].value)
//                console.log(t.thisStepId + '保存')
                t.getData()
                t.$emit('getData')
              }
              this.getColumns()
              this.getDataBlock()
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: '保存成功',
              })
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
    height: 450px;
    position: relative;
    overflow-y: auto;
    .table-form {
      margin-top: 0;
      margin-bottom: 20px;
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
        /*padding-right: 100px;*/
        padding-top: 15px;
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

</style>
