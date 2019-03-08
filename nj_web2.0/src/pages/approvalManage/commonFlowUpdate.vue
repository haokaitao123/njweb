<template>
  <div>
    <div class="cover">
      <div class="box">
        <div class="title">
          <div class="title-text">
            <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
            &nbsp;{{aprvrelTitle}}
          </div>
          <Button type="text" @click="close">
            <Icon type="close-round" size="16"></Icon>
          </Button>
        </div>
        <div class="content">
        	<!--<row class="table-form" ref="table-form">
            <Table v-show="thisPkValue!=='0'" size="small" border ref="selection" :columns="columns" :data="data" :loading="data.length === 0"></Table>
          </row>-->
          <div class="dataBlocks" v-for="(item, index) in dataBlocks" :key="index">
            <div class="dataBlocksTitle"><Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}</div>
            <div class="dataContent">
              <Spin size="large" v-if="!item.blockColumn" fix></Spin>
              <commonSingleForm
                v-if="item.blockColumn"
                :formData1="item.blockColumn"
                :formlist="item.formlist"
                :tbName="tbName"
                :disabled="disabled"
                :ref="'block'"
                :lebWidth="200">
              </commonSingleForm>
            </div>
          </div>

          <!--<div class="dataBlocks">
          	<div class="dataBlocksTitle"><Icon type="compose" style="margin-right: 5px;"></Icon>基础信息</div>
	          	<div class="dataContent">
	          		<Spin size="large" v-if="!tbName" fix></Spin>
			          <commonSingleForm
			            v-if="isShow"
			            :formData1="formData"
			            :formlist="formlist"
			            :tbName="tbName"
			            :pklv="thisPkValue"
			            @close="close"
			            ref="commonSingleForm">
			          </commonSingleForm>
		          </div>
	        </div>-->
          <!--<div class="dataBlocks" v-for="(item, index) in operation" :key="index">-->
            <!--<div class="dataBlocksTitle"><Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}</div>-->
            <!--<div class="dataContent">-->
              <!--<div class="operation">-->
                <!--<span style="margin-right: 10px;">操作人:</span><span  style="margin-right: 120px;">{{item.flsdbMark.optuser}}</span>-->
                <!--<span style="margin-right: 10px;">更新时间:</span><span style="margin-right: 120px;">{{item.flsdbMark.opttime}}</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <div class="approvRecord" v-if="isHaveRecord">
          	<div class="dataBlocksTitle2"><Icon type="compose" style="margin-right: 5px;"></Icon>审批记录</div>
          	<div class="recordContent">
          		<!--<div class="recordTitleClass">
          			<Row gutter="5">
	          			<i-col span="4" offset="4">
	          				<span>审批人</span>
	          			</i-col>
	          			<i-col span="4">
	          				<span>审批结论</span>
	          			</i-col>
	          			<i-col span="5">
	          				<span>审批意见</span>
	          			</i-col>
	          			<i-col span="4">
	          				<span>审批时间</span>
	          			</i-col>
	          		</Row>
	          	</div>-->
          		<div v-for="(item, index) in approvRecordList" :key="index" class="recordClass">
	          		<!--<Row gutter="5">
	          			<i-col span="4" offset="4">
	          				{{item.aprdApproverDis}}
	          			</i-col>
	          			<i-col span="4">
	          				{{item.aprdAprvresultDis}}
	          			</i-col>
	          			<i-col span="5" class="aprdAprvopinion">
	          				{{item.aprdAprvopinion}}
	          			</i-col>
	          			<i-col span="4">
	          				{{item.aprdAprvtime}}
	          			</i-col>
	          		</Row>-->
                {{item.aprdStepidDis}}&nbsp;&nbsp;{{item.aprdApproverDis}}&nbsp;&nbsp;{{item.aprdAprvtime}}&nbsp;&nbsp;{{item.aprdAprvresultDis}}&nbsp;&nbsp;<span v-if="item.aprdAprvopinion">( 意见： {{item.aprdAprvopinion}} )</span>
	          	</div>
          	</div>
          </div>

          <div class="approvIdea" v-if="$store.state.user.roleType === '6essmss'">
          	<div class="dataBlocksTitle2"><Icon type="compose" style="margin-right: 5px;"></Icon>我的审批</div>
          	<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
          		<Row>
          			<i-col span="9" offset="2" style="margin-right: 15px;">
          				<FormItem label="审批人">
          					<Input v-model="formValidate.aprdApprover" style="width: 85%;"></Input>
          				</FormItem>
          			</i-col>
          			<i-col span="9" offset="1">
          				<FormItem label="审批时间">
          					 <DatePicker type="datetime" placeholder="请选择审批时间..." style="width: 95%;" v-model="formValidate.aprdAprvtime"></DatePicker>
          				</FormItem>
          			</i-col>
          		</Row>
          		<Row>
          			<i-col span="9" offset="2" >
          				<FormItem label="审批结论" prop="aprdAprvresult">
	          				<Select @on-change="selectAprd" placeholder="请选择审批结论..." v-model="formValidate.aprdAprvresult" style="width: 85%;">
						 					<Option :value="item.paramCode" v-for="(item,index) in resultList" :key="index">{{item.paramInfoCn}}</Option>
						 				</Select>
	          			</FormItem>
          			</i-col>
          		</Row>
              <Row>
                <i-col span="19" offset="2" v-if="!this.formValidate.aprdAprvopinionFlag">
                  <FormItem label="审批意见" prop="aprdAprvopinion">
                    <Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写审批意见..." v-model="formValidate.aprdAprvopinion"></Input>
                  </FormItem>
                </i-col>
              </Row>
          		<Row>
          			<i-col span="19" offset="2" v-if="this.formValidate.aprdAprvopinionFlag">
          				<FormItem label="审批意见" prop="aprdAprvopinion">
	          				<Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写审批意见..." v-model="formValidate.aprdAprvopinion"></Input>
	          			</FormItem>
          			</i-col>
          		</Row>
          	</Form>
          </div>
        </div>
        <div class="footer">
        	<Button type="primary" @click="close2">取消</Button>
        	<!--<Button type="primary" @click="save2">{{$t('button.sav')}}</Button>
          <Button type="success" style="margin-left: 5px;" @click="isSubmit">提交</Button>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import commonSingleForm from '../common/commonCompanents/commonSingleForm'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew2 } from '../../axios/axios'
  import { isSuccess, findComponentUpward, deepCopy, extendObject } from '../../lib/util'
  import validCode from '../common/commonCompanents/validCode'
  import { onChange } from '../common/onChange/index'
  import Bus from '../common/bus'

  export default {
    data() {
      return {
        isShow: false,  // 防止数据未加载完成就显示form页面
        dataBlocks: [],
        disabled: true,
        loading1: false,
        loading2: false,
        dataBlocksFake: [], // 临时存储
        formData: {},
        formDataSubmit: {},
        clmMap: {},
        tbName: '',
        data: [],
        columns: [],
        valueMap:{},
        isFinish: false,
        requirCount: 0,
        finishCount: 0,
        thisPkValue: this.pkValue,
        thisStepId: this.stepId,
        thisStepState: this.stepState,
        thisSetpName: this.setpName,
        //新增的审批数据
        formValidate: {
        	aprdApprover: '',
        	aprdAprvtime: new Date(),
        	aprdAprvresult: '',
        	aprdAprvopinion: '',
          aprdAprvopinionFlag: false,
        },
        resultList: [],
        approvRecordList: [],
        ruleValidate: {
          aprdAprvresult: [
            { required: true, message: '请选择审批结论', trigger: 'change' },
          ],
          aprdAprvopinion: [
            { required: true, message: '请填写审批意见', trigger: 'blur' },
          ],
        },
        blockStepId: '',
        flowName: '',
        isHaveRecord: false,
        operation: [],
      }
    },
    props: {
//      flowId: String,
      pkValue: String,
      aprdBillid: String,
      aprvrelaStepidAll: String,
      aprvrelTitle: String,
    },
    created() {
//  	this.getOneBlockData()
//  	this.getColumn()
//      this.getColumns()
			//获取数据块
      this.getDataBlock()
      //获取下拉框
      this.getSelect()
      //获取审批记录
      this.getAnsrptRecord()
    },
    components: {
      commonSingleForm,
    },
    methods: {
    	getAnsrptRecord() {
    		const t = this
    		getDataLevelUserLogin({
	          _mt: 'platAprvrecord.getList',
	          logType: '查询审批记录',
	          aprdBillid: t.aprdBillid,
	        }).then((res) => {
	          if (isSuccess(res, t)) {
	          	if (res.data.content[0].value) {
	          		t.approvRecordList = res.data.content[0].value
	          		t.isHaveRecord = true
	          	}
	          }
	        }).catch(() => {
	          this.$Modal.error({
	            title: this.$t('reminder.err'),
	            content: this.$t('reminder.errormessage'),
	          })
	        })
    	},
      selectAprd(value) {
        // 02noneapproved
        // 01approved
        if (value === '02noneapproved') {
          this.formValidate.aprdAprvopinionFlag = false
        } else {
          this.formValidate.aprdAprvopinionFlag = true
        }
      },
    	getSelect() {
	        const t = this
	        getDataLevelUserLogin({
	          _mt: 'baseParmInfo.getSelectValue',
	          logType: this.$t('button.ser'),
	          typeCode: 'approveresult',
	        }).then((res) => {
	          if (isSuccess(res, t)) {
	            t.resultList = res.data.content[0].value[0].paramList.slice(1)
	          }
	        }).catch(() => {
	          this.$Modal.error({
	            title: this.$t('reminder.err'),
	            content: this.$t('reminder.errormessage'),
	          })
	        })
	    },
    	getOneBlockData() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platAutoApprovalEditAgwService.getDataBlockColumn',
          flowId: t.flowId, // 流程ID
          roleType: t.$store.state.user.roleType, // 角色类型
          logType: 'getBlockColumn', // 主键值
          pkValue: t.thisPkValue,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formData = res.data.content[0]
            t.formlist = t.getFormDataSubmit(res.data.content[0].columns)
            t.tbName = res.data.content[0].tbName
            t.isShow = true
          }
        }).catch((res) => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: res,
          })
        })
    	},
      getDataBlock() {
    	  //审批记录跟踪使用
        const t = this
        t.requirCount = 0
        t.finishCount = 0
        t.dataBlocks = []
        t.dataBlocksFake = []
        getDataLevelUserLogin({
          _mt: 'platAutoApprovalEditAgwService.getDataBlock',
          flowId: t.aprvrelaStepidAll, // 流程ID
//        stepId: '0', // 流程步骤ID
					aprdApprover: '34',
          aprvrelaStepid: t.aprvrelaStepidAll,
					aprdBillid: t.aprdBillid, //单据id
          roleType: t.$store.state.user.roleType, // 角色类型
          logType: 'getDataBlock', // 主键值
          pkValue: t.pkValue,
          selType: 'logTrack',
        }).then((res) => {
          if (isSuccess(res, t)) {
          	if (res.data.content[0].stepName) {
          		t.dataBlocksFake = res.data.content[0].dataBlocks
	            t.blockStepId = res.data.content[0].stepId
	            t.flowName = res.data.content[0].stepName
	            for (let i = t.dataBlocksFake.length - 1; i > 0; i--) {
	              if (t.dataBlocksFake[i].flsdbType === 'operation') {
	                t.dataBlocksFake[i].flsdbMark = JSON.parse(t.dataBlocksFake[i].flsdbMark)
	                t.operation.push(t.dataBlocksFake[i])
	                t.dataBlocksFake.splice(i, 1)
	              }
	            }
	            for (let i = 0; i < t.dataBlocksFake.length; i++) {
	              t.requirCount = t.dataBlocksFake.length
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
          /*
    * 格式化数据
    * */
    getFormDataSubmit(data) {
      let columns = data // 字段
      let formData = {}
      let form = {}  // 表单
      let ruler = {}  // 校验规则
      let dis = {} // 是否禁止修改
      let clmmap = {}
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
      form._mt='platAutoLayoutSave.addOrUpd'
      form.logType='保存'
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
        getDataLevelUserLogin({
          _mt: 'platAutoApprovalAgwService.getListColumn',
          roleType: t.$store.state.user.roleType,
          logType: 'getListColumn',
          apblAprvid: t.apblAprvid,
        }).then((res) => {
          console.log(res)
          if (isSuccess(res, t)) {
            let aa = []
            t.flowId = res.data.content[0].flowId
            console.log(t.flowId)
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
                  let bb = []
                  if (params.row[aa[i].key]) {
                    bb = params.row[aa[i].key].split('$')
                  }
                  let text = ''
                  let show = ''
                  switch (bb[3]) {
                    case 'p_flowst_0': show = '未开启'
                      break
                    case 'p_flowst_1': show = '待处理'
                      break
                    case 'p_flowst_2': show = '处理中'
                      break
                    case 'p_flowst_3': show = '已完成'
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
                            if (params.row[params.column.key].split('$')[3] === 'p_flowst_0') {
                              return
                            }
                            this.thisStepState = params.row[params.column.key].split('$')[3]
                            this.thisSetpName = params.row[params.column.key].split('$')[5]
//                          this.getDataBlock()
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
        getDataLevelUserLogin({
          _mt: 'platAutoLayoutGetFlowList.getPage',
          sort: 'id',
          order: 'desc',
          rows: '1',
          page: '1',
          roleType: t.$store.state.user.roleType,
          logType: 'getPage',
          data: JSON.stringify({ id: t.thisPkValue }),
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
          _mt: 'platAutoApprovalEditAgwService.getDataBlockColumn',
          flowId: t.aprvrelaStepidAll, // 流程ID
          dataBlockId: dataBlockId,
//        roleType: t.$store.state.user.roleType, // 角色类型
          logType: 'getBlockColumn', // 主键值
          pkValue: t.thisPkValue,
        }
        getDataLevelUserLogin(params).then((res) => {
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
//      t.$emit('close')
        t.$Modal.confirm({
          title: this.$t('reminder.remind'),
          content: '是否确认关闭？',
          onOk: () => {
            t.$emit('close')
          },
        })
      },
      close2() {
      	this.$emit('close')
      },
      isSubmit() {
        const t = this
//      t.submit2()
        t.$Modal.confirm({
          title: this.$t('reminder.remind'),
          content: '是否确认提交？',
          onOk: () => {
            t.submit2()
          },
        })
      },
      //提交审批信息
      submit2() {
      	const t = this
      	t.$refs.formValidate.validate((valid) => {
          if (valid) {
            delete t.formValidate.aprdAprvopinionFlag
            const data1 = deepCopy(t.formValidate)
            data1.aprdAprvtime = new Date(data1.aprdAprvtime).format('yyyy-MM-dd hh:mm:ss')
            const data = {
		      		_mt: 'platAutoApprovalSubmitAgwService.submit',
		      		logType: '提交审批',
		      		aprvrelaFlowid: t.flowId,
		      		aprdStepid: t.blockStepId,
		      		roleType: t.$store.state.user.roleType,
		      		aprdBillid: t.aprdBillid,
		      		data: JSON.stringify(data1),
		      	}
            for (const dat in data) {
              if (data[dat] === '') {
                delete data[dat]
              }
            }
            getDataLevelUserLogin(data).then((res) => {
              if (isSuccess(res, t)) {
              	t.$Modal.success({
	                title: this.$t('reminder.suc'),
	                content: '提交成功',
	              })
              	t.$emit('close')
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
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
          getDataLevelUserLoginNew2(t.formDataSubmit).then((res) => {
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
      //保存审批意见
      save2() {
      	const t = this
      	t.$refs.formValidate.validate((valid) => {
          if (valid) {
            const data1 = deepCopy(t.formValidate)
            data1.aprdAprvtime = new Date(data1.aprdAprvtime).format('yyyy-MM-dd hh:mm:ss')
            const data = {
		      		_mt: 'platAutoApprovalSaveAgwService.addOrUpd',
		      		logType: '保存审批',
		      		aprvrelaFlowid: t.flowId,
		      		aprdStepid: t.blockStepId,
		      		roleType: t.$store.state.user.roleType,
		      		aprdBillid: t.aprdBillid,
//		      		aprdApprover: '35',
		      		data: JSON.stringify(data1),
		      	}
            for (const dat in data) {
              if (data[dat] === '') {
                delete data[dat]
              }
            }
            getDataLevelUserLogin(data).then((res) => {
              if (isSuccess(res, t)) {
              	t.$Modal.success({
	                title: this.$t('reminder.suc'),
	                content: '保存成功',
	              })
              	t.$emit('close')
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
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
          getDataLevelUserLoginNew2(t.formDataSubmit).then((res) => {
            t.loading1 = false
            if (isSuccess(res, t)) {
              if (t.thisPkValue === '0') {
                t.thisPkValue = res.data.content[0].value.split('_')[0]
                t.thisStepId = res.data.content[0].value.split('_')[1]
                t.getData()
                t.$emit('getData')
              }
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
//      if (value === 'p_flowst_3') {
//        this.disabled = true
//      } else {
//        this.disabled = false
//      }
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../sass/updateAndAdd.scss";
  .cover .box{
    width: 1200px;
  }
  .content{
    height: 500px;
    position: relative;
    overflow-y: auto;
    .table-form{
      margin-top: 0;
      margin-bottom: 20px;
    }
    .dataBlocks{
      .dataBlocksTitle{
        /*background: linear-gradient(-45deg, #c6b7ff, #ffffff);*/
        background-color: rgba(39, 142, 255, 0.2);
        font-size: 14px;
        padding: 0 20px;
        height: 26px;
        font-weight: bold;
        line-height: 26px;
      }
      .dataContent{
        position: relative;
        background-color: #f9f9f9;
        padding-right: 100px;
        padding-top: 30px;
        padding-bottom: 10px;
        /*width: 1100px;*/
       .operation{
          text-align: left;
          padding: 0 0 0 180px;
        }
      }
    }
  }
  .footer{
    margin-top: 10px;
    padding: 0 30px;
    display: flex;
    justify-content: flex-end;
  }
  .approvRecord{
  	/*margin-bottom: 10px;*/
  }
  .approvIdea{
  	.dataBlocksTitle2{
  		/*margin-bottom: 10px;*/
  	}
  	.ivu-form{
  		background-color: #f9f9f9;
  		padding: 20px;
  	}
  }
  .dataBlocksTitle2{
    /*background: linear-gradient(-45deg, #c6b7ff, #ffffff);*/
    background-color: rgba(39, 142, 255, 0.2);
    font-size: 14px;
    padding: 0 20px;
    height: 26px;
    font-weight: bold;
    line-height: 26px;
  }
  .recordTitleClass{
  	height: 40px;
  	line-height: 40px;
  	font-size: 14px;
  	font-weight: bold;
  	/*margin-left: 180px;*/
  }
  .recordClass{
  	height: 36px;
  	line-height: 36px;
  	margin: 0 180px;
  	overflow: hidden;
  	text-overflow: ellipsis;
  	white-space: nowrap;
  }
  .recordContent{
  	background-color: #f9f9f9;
  }
  .aprdAprvopinion{
  	overflow: hidden;
  	text-overflow: ellipsis;
  	white-space: nowrap;
  }
</style>
