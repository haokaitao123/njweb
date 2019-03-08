<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row>
      	<i-col span="24">
      		<Row :gutter="10">
      			<i-col span="6">
      			<Input v-model="selectVariable" placeholder="请选择变量..." icon="search" :readonly="true" @on-click="clickVariable"/>
      			</i-col>
      			<i-col span="6">
				<Select v-model="logOperatorValue" v-if="varParamOperType === '03date'">
					<Option label="等于" value="等于"></Option>
					<Option label="不等于" value="不等于"></Option>
					<Option label="大于" value="大于"></Option>
					<Option label="大于等于" value="大于等于"></Option>
					<Option label="小于" value="小于"></Option>
					<Option label="小于等于" value="小于等于"></Option>
				</Select>
				<Select v-model="logOperatorValue" v-else="">
					<Option label="等于" value="等于"></Option>
					<Option label="不等于" value="不等于"></Option>
				</Select>
				</i-col>
				<i-col span="6">
					<Input v-model="paramterValue" placeholder="请输入参数值..." v-if="flvarFieldType === ''"/>
					<Input v-model="paramterValue" placeholder="请输入参数值..." v-if="flvarFieldType === 'p_layout_01'"/>
					<Select v-model="paramterValue" placeholder="请选择参数值..." v-if="flvarFieldType === 'p_layout_12'" :label-in-value="true" @on-change="v =>{setOption(v,'type')}">
						<Option :value="item.key" v-for="(item,index) in selectParamVal" :key="index">{{item.value}}</Option>
					</Select>
					<DatePicker type="date" placeholder="请选择时间..." v-model="paramterValue" style="width: 100%" v-if="flvarFieldType === 'p_layout_03'"></DatePicker>
					<Input v-model="paramterValue" icon="search" :readonly="true" placeholder="请设置参数值..." v-if="flvarFieldType === 'p_layout_13'" @on-click="selectTKVal"/>
				</i-col>
				<i-col span="3" style="line-height: 30px;">
					<RadioGroup v-model="logOperatorType">
						<Radio label="与"></Radio>
						<Radio label="或"></Radio>
					</RadioGroup>
				</i-col>
				<!--<i-col span="3" v-show="showUpdate">
					<Button type="ghost" icon="refresh" @click="sureUpd">确定</Button>
				</i-col>-->
      		</Row>
      		<Row :gutter="10" style="margin-top: 30px;">
      			<i-col span="20">
      				<Table :height="tableheight" @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" size="small" border ref="selection" :columns="columns" :data="data"></Table>
      			</i-col>
      			<i-col span="3" offset="1" class="operBtn">
      				<Row v-show="!showUpdate">
      					<Button icon="plus-round" type="primary" @click="addCondition">添加</Button>
      				</Row>
      				<Row v-show="showUpdate">
      					<Button icon="plus-round" type="primary" @click="sureUpd">添加</Button>
      				</Row>
      				<Row>
      					<Button icon="compose" type="success" @click="updateCondition">修改</Button>
      				</Row>
      				<Row>
      					<Button icon="trash-b" type="error" @click="delArrElement">删除</Button>
      				</Row>
      				<Row>
      					<Button type="primary" @click="addBracket">( 添加 )</Button>
      				</Row>
      				<Row>
      					<Button type="error" @click="delBracket">( 去掉 )</Button>
      				</Row>
      				<Row>
      					<Button icon="android-document" type="warning" @click="submit">{{$t('button.sav')}}</Button>
      				</Row>
      				<Row>
      					<Button icon="gear-a" type="info" @click="dataCheck">校验</Button>
      				</Row>
      			</i-col>
      		</Row>
      	</i-col>
      </Row>
    </div>
    <transition name="fade">
      <searchVar v-show="openVar" :searchCloumns="searchCloumns" :params="params" @closeUp="closeVar" @changeinput="changeinput" ref="searchVar"></searchVar>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchVar from '../../../components/searchTable/searchVar'


  export default {
    data() {
      return {
      	data: [],
      	tableselected: [],
      	sendTableselected: [],
      	theDelArr: [],
      	selectParamVal: [],
      	valLab: '',
      	arrIndex: 0,
      	logType: '条件设置',
      	tableheight: 350,
      	logOperatorType: '与',
      	logOperatorTypeTransmit: '',
      	selectVariable: '',
      	variableValue: '',
      	logOperatorValue: '',
      	paramterValue: '',
      	paramterValue2: '',
      	varParamOperType: '',
      	varParamOperTypeTransmit: '',
      	conditionValueTransmit: '',
      	varParamValType: '',
      	flvarFieldType: 'p_layout_01',
      	flowID: '',
      	openVar: false,
      	showUpdate: false,
      	sendParValue: '',
      	sendOperTypeValue: '',
      	columns: [
      	  {
      	  	type: 'selection',
            width: 54,
            align: 'center',
      	  },
      	  {
            title: '条件值',
            key: 'conditionValue',
          },
      	],
      	searchCloumns: [
          {
            title: '流程变量名称',
            key: 'flvarName',
            sortable: 'custom',
          },
          {
            title: '流程变量标识',
            key: 'flvarMark',
            sortable: 'custom',
          },
      	],
      	params: {
          _mt: 'platFlowVar.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          logType: this.$t('button.ser'),
          flvarIscondition: '1',
          data: '{}',
        },
      }
    },
    props: {
    },
    components: {
    	searchVar,
    },
    updated() {

    },
    mounted() {
    },
    methods: {
//  	修改时给表格赋值
    	async getData(transmitName, transmitValue) {
    		transmitName = transmitName.replace(/\s/g, "")
    		transmitValue = transmitValue.replace(/\s/g, "")
    		const t = this
    		let flvarMark = ''
//				单条数据,没有连接符
    		if ((transmitValue.indexOf('&&') === -1) && (transmitValue.indexOf('||') === -1)) {
    			flvarMark = transmitValue.substring(1, transmitValue.indexOf('"', 1))
							//根据变量标识查询信息
							const data = deepCopy(t.params)
			        data.flvarMark = flvarMark
			        await getDataLevelUserLoginNew(data).then((res) => {
			          if (isSuccess(res, t)) {
			          	const data2 = {
										flvarFlow: res.data.content[0].rows[0].flvarFlow,
										flvarMark: res.data.content[0].rows[0].flvarMark,
									}
									getDataLevelUserLogin({
					          _mt: 'platFlowVar.getByFlowIdAndMark',
					          funId: '1',
					          logType: this.$t('button.ser'),
					          data: JSON.stringify(data2),
					        }).then((res) => {
					          if (isSuccess(res, t)) {
					          	t.data.push({
							    			conditionValue: transmitName,
							      		sendValue: transmitValue,
							      		index: t.arrIndex += 1,
							      		varParamOperType: res.data.content[0].flvarRtndatafmt,
												logOperatorType: '',
												flvarFieldType: res.data.content[0].flvarFieldType,
												selectParamVal: res.data.content[0].clmOptionList,
							    		})
					          }
					        }).catch(() => {
					          this.$Modal.error({
					            title: this.$t('reminder.err'),
					            content: this.$t('reminder.errormessage'),
					          })
					        })
			          }
			        }).catch(() => {
			          t.$Modal.error({
			            title: this.$t('reminder.err'),
			            content: this.$t('reminder.errormessage'),
			          })
			        })
    		} else {
    			let setDataArr = []
    			let setNameArr = []
//  			只有或连接符
    			if (transmitValue.indexOf('&&') === -1) {
    				setDataArr = transmitValue.split('||')
    				setNameArr = transmitName.split('或')
    				for (let i = 0; i < setDataArr.length - 1; i++) {
    					setNameArr[i] = setNameArr[i] + '或'
    					setDataArr[i] = setDataArr[i] + '||'
    				}
    				for (let i = 0; i < setDataArr.length; i++) {
    					if (setDataArr[i].substring(0, 1) === '(') {
    						flvarMark = setDataArr[i].substring(2, setDataArr[i].indexOf('"', 2))
    					} else {
    						flvarMark = setDataArr[i].substring(1, setDataArr[i].indexOf('"', 1))
    					}
    							//根据变量标识查询信息
									const data = deepCopy(t.params)
					        data.flvarMark = flvarMark
					        await getDataLevelUserLoginNew(data).then((res) => {
					          if (isSuccess(res, t)) {
					          	const data2 = {
												flvarFlow: res.data.content[0].rows[0].flvarFlow,
												flvarMark: res.data.content[0].rows[0].flvarMark,
											}
											getDataLevelUserLogin({
							          _mt: 'platFlowVar.getByFlowIdAndMark',
							          funId: '1',
							          logType: this.$t('button.ser'),
							          data: JSON.stringify(data2),
							        }).then((res) => {
							          if (isSuccess(res, t)) {
							          	t.data.push({
									    			conditionValue: setNameArr[i],
									      		sendValue: setDataArr[i],
									      		index: t.arrIndex += 1,
									      		varParamOperType: res.data.content[0].flvarRtndatafmt,
														logOperatorType: '或',
														flvarFieldType: res.data.content[0].flvarFieldType,
														selectParamVal: res.data.content[0].clmOptionList,
									    		})
							          }
							        }).catch(() => {
							          this.$Modal.error({
							            title: this.$t('reminder.err'),
							            content: this.$t('reminder.errormessage'),
							          })
							        })
					          }
					        }).catch(() => {
					          t.$Modal.error({
					            title: this.$t('reminder.err'),
					            content: this.$t('reminder.errormessage'),
					          })
					        })
    				}
//  				只有与连接符
    			} else if (transmitValue.indexOf('||') === -1) {
    				setDataArr = transmitValue.split('&&')
    				setNameArr = transmitName.split('与')
    				//最后一行不加连接符
    				for (let i = 0; i < setDataArr.length - 1; i++) {
    					setNameArr[i] = setNameArr[i] + '与'
    					setDataArr[i] = setDataArr[i] + '&&'
    				}
    				for (let i = 0; i < setDataArr.length; i++) {
    					if (setDataArr[i].substring(0, 1) === '(') {
    						flvarMark = setDataArr[i].substring(2, setDataArr[i].indexOf('"', 2))
    					} else {
    						flvarMark = setDataArr[i].substring(1, setDataArr[i].indexOf('"', 1))
    					}
    							//根据变量标识查询信息
									const data = deepCopy(t.params)
					        data.flvarMark = flvarMark
					        await getDataLevelUserLoginNew(data).then((res) => {
					          if (isSuccess(res, t)) {
					          	const data2 = {
												flvarFlow: res.data.content[0].rows[0].flvarFlow,
												flvarMark: res.data.content[0].rows[0].flvarMark,
											}
											getDataLevelUserLogin({
							          _mt: 'platFlowVar.getByFlowIdAndMark',
							          funId: '1',
							          logType: this.$t('button.ser'),
							          data: JSON.stringify(data2),
							        }).then((res) => {
							          if (isSuccess(res, t)) {
							          	t.data.push({
									    			conditionValue: setNameArr[i],
									      		sendValue: setDataArr[i],
									      		index: t.arrIndex += 1,
									      		varParamOperType: res.data.content[0].flvarRtndatafmt,
														logOperatorType: '与',
														flvarFieldType: res.data.content[0].flvarFieldType,
														selectParamVal: res.data.content[0].clmOptionList,
									    		})
							          }
							        }).catch(() => {
							          this.$Modal.error({
							            title: this.$t('reminder.err'),
							            content: this.$t('reminder.errormessage'),
							          })
							        })
					          }
					        }).catch(() => {
					          t.$Modal.error({
					            title: this.$t('reminder.err'),
					            content: this.$t('reminder.errormessage'),
					          })
					        })
    				}
    			} else {
//  				既有与,又有或连接符
    				let andArr = []
    				let andArrR = []
    				let orArr = []
    				let andArrName = []
    				let andArrRName = []
    				let orArrName = []
    				let str1 = transmitName.replace(/与/g, '与;')
    				str1 = str1.replace(/或/g, '或;')
    				setNameArr = str1.split(';')
    				let str2 = transmitValue.replace(/\|\|/g, '||;')
    				str2 = str2.replace(/&&/g, '&&;')
    				setDataArr = str2.split(';')
    				for (let i = 0; i < setDataArr.length; i++) {
    					if (setDataArr[i].substring(0, 1) === '(') {
    						flvarMark = setDataArr[i].substring(2, setDataArr[i].indexOf('"', 2))
    					} else {
    						flvarMark = setDataArr[i].substring(1, setDataArr[i].indexOf('"', 1))
    					}
    							//根据变量标识查询信息
									const data = deepCopy(t.params)
					        data.flvarMark = flvarMark
					        await getDataLevelUserLoginNew(data).then((res) => {
					          if (isSuccess(res, t)) {
					          	const data2 = {
												flvarFlow: res.data.content[0].rows[0].flvarFlow,
												flvarMark: res.data.content[0].rows[0].flvarMark,
											}
											getDataLevelUserLogin({
							          _mt: 'platFlowVar.getByFlowIdAndMark',
							          funId: '1',
							          logType: this.$t('button.ser'),
							          data: JSON.stringify(data2),
							        }).then((res) => {
							          if (isSuccess(res, t)) {
							          	t.data.push({
									    			conditionValue: setNameArr[i],
									      		sendValue: setDataArr[i],
									      		index: t.arrIndex += 1,
									      		varParamOperType: res.data.content[0].flvarRtndatafmt,
														logOperatorType: '与',
														flvarFieldType: res.data.content[0].flvarFieldType,
														selectParamVal: res.data.content[0].clmOptionList,
									    		})
							          }
							        }).catch(() => {
							          this.$Modal.error({
							            title: this.$t('reminder.err'),
							            content: this.$t('reminder.errormessage'),
							          })
							        })
					          }
					        }).catch(() => {
					          t.$Modal.error({
					            title: this.$t('reminder.err'),
					            content: this.$t('reminder.errormessage'),
					          })
					        })
    				}
    			}
    		}
    	},
    	handleReset() {
    		this.$emit('closeCondition')
    		this.selectVariable = ''
    		this.logOperatorValue = ''
    		this.paramterValue = ''
    		this.paramterValue2 = ''
    		this.tableselected = []
      	this.sendTableselected = []
      	this.theDelArr = []
      	this.selectParamVal = []
    		this.data = []
    	},
    	closeVar() {
    		this.openVar = false
    	},
    	clickVariable() {
    		const t = this
    		t.$refs.searchVar.getData(t.params)
    		t.openVar = true
    	},
    	changeinput(name, id, operType, valType, varMark) {
    		const t = this
//  		变量名
    		t.selectVariable = name
//  		条件值类型
    		t.varParamOperType = operType
//  		输入值类型
    		t.varParamValType = valType
//  		变量标识
    		t.variableValue = varMark
//  		流程ID
				t.flowID = id
				const data = {
					flvarFlow: t.flowID,
					flvarMark: t.variableValue,
				}
				 getDataLevelUserLogin({
          _mt: 'platFlowVar.getByFlowIdAndMark',
          funId: '1',
          logType: this.$t('button.ser'),
          data: JSON.stringify(data),
        }).then((res) => {
          if (isSuccess(res, t)) {
          	t.flvarFieldType = res.data.content[0].flvarFieldType
          	t.selectParamVal = res.data.content[0].clmOptionList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
    	},
//  	勾选数据
    	selectedtable(selection, row) {
	        const newArr = []
	        for (let i = 0; i < selection.length; i++) {
	          newArr.push({
	          	conditionValue: selection[i].conditionValue,
	          	index: selection[i].index,
	          })
	        }
	        this.tableselected = newArr
	        const newArr2 = []
	        for (let i = 0; i < selection.length; i++) {
	          newArr2.push({
	          	sendValue: selection[i].sendValue,
	          	index: selection[i].index,
	          })
	        }
	        this.sendTableselected = newArr2
	        this.theDelArr = []
	        for (let i = 0; i < selection.length; i++) {
	        	this.theDelArr.push({
		        	conditionValue: selection[i].conditionValue,
		        	sendValue: selection[i].sendValue,
		        	index: selection[i].index,
		        	varParamOperType: selection[i].varParamOperType,
		        	logOperatorType: selection[i].logOperatorType,
		        	flvarFieldType: selection[i].flvarFieldType,
							selectParamVal: selection[i].selectParamVal,
		        })
	        }
	    },
//	    添加一条条件数据
    	addCondition() {
    		const t = this
//  		条件值类型
    		switch (t.logOperatorValue) {
    			case '等于':
    				t.sendParValue = '=='
    				break
    			case '不等于':
    				t.sendParValue = '!='
    				break
    			case '大于':
    				t.sendParValue = '>'
    				break
    			case '大于等于':
    				t.sendParValue = '>='
    				break
    			case '小于':
    				t.sendParValue = '<'
    				break
    			case '小于等于':
    				t.sendParValue = '<='
    				break
    		}
//  		连接符
    		switch (t.logOperatorType) {
    			case '或':
    				t.sendOperTypeValue = '||'
    				break
    			default:
    				t.sendOperTypeValue = '&&'
    		}
//  		添加显示添加/保存条件
				if (t.selectVariable && t.logOperatorValue && t.paramterValue) {
					if (t.flvarFieldType === 'p_layout_03') {
						t.paramterValue = new Date(t.paramterValue).format('yyyy-MM-dd')
						t.data.push({
							conditionValue: '"' + t.selectVariable + '"' + t.logOperatorValue + '"' + t.paramterValue + '"' + t.logOperatorType,
							sendValue: '"' + t.variableValue + '"' + t.sendParValue + '"' + t.paramterValue + '"' + t.sendOperTypeValue,
							index: t.arrIndex += 1,
							varParamOperType: t.varParamOperType,
							logOperatorType: t.logOperatorType,
							flvarFieldType: t.flvarFieldType,
							selectParamVal: t.selectParamVal,
						})
					} else if (t.flvarFieldType === 'p_layout_12') {
						t.data.push({
							conditionValue: '"' + t.selectVariable + '"' + t.logOperatorValue + '"' + t.paramterValue2 + '"' + t.logOperatorType,
							sendValue: '"' + t.variableValue + '"' + t.sendParValue + '"' + t.paramterValue + '"' + t.sendOperTypeValue,
							index: t.arrIndex += 1,
							varParamOperType: t.varParamOperType,
							logOperatorType: t.logOperatorType,
							flvarFieldType: t.flvarFieldType,
							selectParamVal: t.selectParamVal,
						})
					} else {
						t.data.push({
							conditionValue: '"' + t.selectVariable + '"' + t.logOperatorValue + '"' + t.paramterValue + '"' + t.logOperatorType,
							sendValue: '"' + t.variableValue + '"' + t.sendParValue + '"' + t.paramterValue + '"' + t.sendOperTypeValue,
							index: t.arrIndex += 1,
							varParamOperType: t.varParamOperType,
							logOperatorType: t.logOperatorType,
							flvarFieldType: t.flvarFieldType,
							selectParamVal: t.selectParamVal,
						})
					}
//					t.selectVariable = ''
//	    		t.logOperatorValue = ''
//	    		t.paramterValue = ''
//	    		t.paramterValue2 = ''
//	    		t.varParamOperType = ''
//	    		t.logOperatorType = '与'
				} else {
					t.$Modal.warning({
    				title: this.$t('reminder.remind'),
    				content: '请完善条件！',
    			})
				}
				t.showUpdate = false
    	},
//  	删除一条条件数据
    	delArrElement() {
    		const t = this
    		for (let i = 0; i < t.theDelArr.length; i++) {
    			for (let j = 0; j < t.data.length; j++) {
    				if (t.theDelArr[i].index === t.data[j].index) {
    					t.data.splice(j, 1)
    				}
    			}
    		}
    		t.showUpdate = false
    		t.sendTableselected = []
    		t.tableselected = []
    	},
//  	修改选中的数据
    	updateCondition() {
    		const t = this
    		if (t.theDelArr.length !== 1) {
    			t.$Modal.warning({
    				title: this.$t('reminder.remind'),
    				content: '请选择一条数据',
    			})
    		} else {
    			if (t.theDelArr[0].conditionValue.substring(0, 1) !== '(') {
    				let str1 = t.theDelArr[0].conditionValue.indexOf('"', 1)
						let str2 = t.theDelArr[0].conditionValue.indexOf('"', str1 + 1)
						let str3 = t.theDelArr[0].conditionValue.indexOf('"', str2 + 1)
						t.selectVariable = t.theDelArr[0].conditionValue.substring(1, str1)
						t.paramterValue2 = t.theDelArr[0].conditionValue.substring(str2 + 1, str3)
						t.logOperatorValue = t.theDelArr[0].conditionValue.substring(str1 + 1, str2)
						t.varParamOperType = t.theDelArr[0].varParamOperType
						t.logOperatorType = t.theDelArr[0].logOperatorType
						t.flvarFieldType = t.theDelArr[0].flvarFieldType
						t.selectParamVal = t.theDelArr[0].selectParamVal
						let str11 = t.theDelArr[0].sendValue.indexOf('"', 1)
						let str22 = t.theDelArr[0].sendValue.indexOf('"', str11 + 1)
						let str33 = t.theDelArr[0].sendValue.indexOf('"', str22 + 1)
						t.variableValue = t.theDelArr[0].sendValue.substring(1, str11)
						t.sendParValue = t.theDelArr[0].sendValue.substring(str11 + 1, str22)
						t.paramterValue = t.theDelArr[0].sendValue.substring(str22 + 1, str33)
						t.showUpdate = true
    			} else {
    				let str1 = t.theDelArr[0].conditionValue.indexOf('"', 2)
						let str2 = t.theDelArr[0].conditionValue.indexOf('"', str1 + 1)
						let str3 = t.theDelArr[0].conditionValue.indexOf('"', str2 + 1)
						t.selectVariable = t.theDelArr[0].conditionValue.substring(2, str1)
						t.paramterValue2 = t.theDelArr[0].conditionValue.substring(str2 + 1, str3)
						t.logOperatorValue = t.theDelArr[0].conditionValue.substring(str1 + 1, str2)
						t.varParamOperType = t.theDelArr[0].varParamOperType
						t.logOperatorType = t.theDelArr[0].logOperatorType
						t.flvarFieldType = t.theDelArr[0].flvarFieldType
						t.selectParamVal = t.theDelArr[0].selectParamVal
						let str11 = t.theDelArr[0].sendValue.indexOf('"', 2)
						let str22 = t.theDelArr[0].sendValue.indexOf('"', str11 + 1)
						let str33 = t.theDelArr[0].sendValue.indexOf('"', str22 + 1)
						t.variableValue = t.theDelArr[0].sendValue.substring(2, str11)
						t.sendParValue = t.theDelArr[0].sendValue.substring(str11 + 1, str22)
						t.paramterValue = t.theDelArr[0].sendValue.substring(str22 + 1, str33)
						t.showUpdate = true
    			}
    		}
    	},
//  	确定修改
    	sureUpd() {
    		const t = this
//  		条件值类型
    		switch (t.logOperatorValue) {
    			case '等于':
    				t.sendParValue = '=='
    				break
    			case '不等于':
    				t.sendParValue = '!='
    				break
    			case '大于':
    				t.sendParValue = '>'
    				break
    			case '大于等于':
    				t.sendParValue = '>='
    				break
    			case '小于':
    				t.sendParValue = '<'
    				break
    			case '小于等于':
    				t.sendParValue = '<='
    				break
    		}
//  		连接符
    		switch (t.logOperatorType) {
    			case '或':
    				t.sendOperTypeValue = '||'
    				break
    			default:
    				t.sendOperTypeValue = '&&'
    		}
    		if (t.flvarFieldType === 'p_layout_03') {
						t.paramterValue = new Date(t.paramterValue).format('yyyy-MM-dd')
						for (let i = 0; i < t.theDelArr.length; i++) {
		    			for (let j = 0; j < t.data.length; j++) {
		    				if (t.theDelArr[i].index === t.data[j].index) {
		    					t.data[j].conditionValue = '"' + t.selectVariable + '"' + t.logOperatorValue + '"' + t.paramterValue + '"' + t.logOperatorType + ' '
		    					t.data[j].sendValue = '"' + t.variableValue + '"' + t.sendParValue + '"' + t.paramterValue + '"' + t.sendOperTypeValue
		    					t.data[j].varParamOperType = t.varParamOperType
		    					t.data[j].logOperatorType = t.logOperatorType
		    					t.data[j].flvarFieldType = t.flvarFieldType
									t.data[j].selectParamVal = t.selectParamVal
		    				}
		    			}
		    		}
				} else if (t.flvarFieldType === 'p_layout_12') {
//					console.log(t.paramterValue)
//					console.log(t.paramterValue2)
//					t.setOption(t.paramterValue, 'type')
					for (let i = 0; i < t.theDelArr.length; i++) {
		    			for (let j = 0; j < t.data.length; j++) {
		    				if (t.theDelArr[i].index === t.data[j].index) {
		    					t.data[j].conditionValue = '"' + t.selectVariable + '"' + t.logOperatorValue + '"' + t.paramterValue2 + '"' + t.logOperatorType + ' '
		    					t.data[j].sendValue = '"' + t.variableValue + '"' + t.sendParValue + '"' + t.paramterValue + '"' + t.sendOperTypeValue
		    					t.data[j].varParamOperType = t.varParamOperType
		    					t.data[j].logOperatorType = t.logOperatorType
		    					t.data[j].flvarFieldType = t.flvarFieldType
									t.data[j].selectParamVal = t.selectParamVal
		    				}
		    			}
		    		}
				} else {
					for (let i = 0; i < t.theDelArr.length; i++) {
		    			for (let j = 0; j < t.data.length; j++) {
		    				if (t.theDelArr[i].index === t.data[j].index) {
		    					t.data[j].conditionValue = '"' + t.selectVariable + '"' + t.logOperatorValue + '"' + t.paramterValue + '"' + t.logOperatorType + ' '
		    					t.data[j].sendValue = '"' + t.variableValue + '"' + t.sendParValue + '"' + t.paramterValue + '"' + t.sendOperTypeValue
		    					t.data[j].varParamOperType = t.varParamOperType
		    					t.data[j].logOperatorType = t.logOperatorType
		    					t.data[j].flvarFieldType = t.flvarFieldType
									t.data[j].selectParamVal = t.selectParamVal
		    				}
		    			}
		    		}
				}
    		t.showUpdate = false
    		t.selectVariable = ''
    		t.logOperatorValue = ''
    		t.paramterValue = ''
    		t.paramterValue2 = ''
    		t.logOperatorType = '与'
    		t.sendTableselected = []
    		t.tableselected = []
    	},
//  	添加括号
    	addBracket() {
    		const t = this
    		const newArr = deepCopy(t.data)
    		const newArr2 = deepCopy(t.data)
    		if (t.tableselected.length < 2) {
    			t.$Modal.warning({
    				title: this.$t('reminder.remind'),
    				content: '请至少选择两条数据',
    			})
    		} else {
	    		for (let i = 0; i < t.tableselected.length; i++) {
	    			for (let j = 0; j < newArr.length; j++) {
    					if (t.tableselected[0].index === newArr[j].index) {
    						newArr[j].conditionValue = '(' + t.tableselected[0].conditionValue
    					}
    					if (t.tableselected[t.tableselected.length - 1].index === newArr[j].index) {
    						const strPos = t.tableselected[t.tableselected.length - 1].conditionValue.lastIndexOf('"')
    						const str = t.tableselected[t.tableselected.length - 1].conditionValue.split('')
    						str.splice(strPos, 1, '")')
    						newArr[j].conditionValue = str.join('')
    					}
    			  }
	    		}
	    		for (let i = 0; i < t.sendTableselected.length; i++) {
	    			for (let j = 0; j < newArr2.length; j++) {
    					if (t.sendTableselected[0].index === newArr2[j].index) {
    						newArr2[j].sendValue = '(' + t.sendTableselected[0].sendValue
    					}
    					if (t.sendTableselected[t.sendTableselected.length - 1].index === newArr2[j].index) {
    						const strPos = t.sendTableselected[t.sendTableselected.length - 1].sendValue.lastIndexOf('"')
    						const str = t.sendTableselected[t.sendTableselected.length - 1].sendValue.split('')
    						str.splice(strPos, 1, '")')
    						newArr[j].sendValue = str.join('')
    					}
    			  }
	    		}
	    		t.showUpdate = false
	    		t.sendTableselected = []
	    		t.tableselected = []
    		}
    	},
//  	去掉括号
			delBracket() {
				const t = this
    		const newArr = deepCopy(t.data)
    		const newArr2 = deepCopy(t.data)
    		if (t.tableselected.length < 2) {
    			t.$Modal.warning({
    				title: this.$t('reminder.remind'),
    				content: '请至少选择两条数据',
    			})
    		} else {
    				for (let i = 0; i < t.tableselected.length; i++) {
    					for (let j = 0; j < newArr.length; j++) {
    						if (t.tableselected[0].index === newArr[j].index) {
		    					if (t.tableselected[0].conditionValue.slice(0, 1) === '(') {
		    						newArr[j].conditionValue = t.tableselected[0].conditionValue.substring(1)
		    					}
	    					}
    						if (t.tableselected[t.tableselected.length - 1].index === newArr[j].index) {
    								const str = t.tableselected[t.tableselected.length - 1].conditionValue
    								const strPos = str.lastIndexOf(')')
    								if (str[strPos] === ')') {
    									const strr = str.split('')
    									strr.splice(strPos, 1)
    									newArr[j].conditionValue = strr.join('')
    								}
	    					}
    					}
    				}
    				for (let i = 0; i < t.sendTableselected.length; i++) {
    					for (let j = 0; j < newArr2.length; j++) {
    						if (t.sendTableselected[0].index === newArr2[j].index) {
		    					if (t.sendTableselected[0].sendValue.slice(0, 1) === '(') {
		    						newArr2[j].sendValue = t.sendTableselected[0].sendValue.substring(1)
		    					}
	    					}
    						if (t.sendTableselected[t.sendTableselected.length - 1].index === newArr2[j].index) {
		    						const str = t.sendTableselected[t.sendTableselected.length - 1].sendValue
    								const strPos = str.lastIndexOf(')')
    								if (str[strPos] === ')') {
    									const strr = str.split('')
    									strr.splice(strPos, 1)
    									newArr[j].sendValue = strr.join('')
    								}
	    					}
    					}
    				}
    				t.showUpdate = false
		    		t.sendTableselected = []
		    		t.tableselected = []
    		}
			},
//			保存数据入库
    	submit() {
    		const sendValueArr = []
    		const sendNameArr = []
    		for (let i = 0; i < this.data.length; i++) {
    			sendValueArr.push({
    				sendValue: this.data[i].sendValue,
    			})
    			sendNameArr.push({
    				conditionValue: this.data[i].conditionValue
    			})
    		}
    		let sendResVal = ''
    		let sendResValcn = ''
    		const t = this
    		if (sendValueArr.length === 0) {
    			t.$Modal.warning({
    				title: this.$t('reminder.remind'),
    				content: this.$t('reminder.leastone'),
    			})
    		} else {
	    		if (sendValueArr.length === 1) {
	    			let str1 = sendValueArr[0].sendValue.indexOf('"', 1)
		    		let str2 = sendValueArr[0].sendValue.indexOf('"', str1 + 1)
		    		let str3 = sendValueArr[0].sendValue.indexOf('"', str2 + 1)
	    			sendResVal = sendValueArr[0].sendValue.substring(0, str3 + 1)
	    		}
	    		if (sendValueArr.length > 1) {
	    			let str11 = sendValueArr[sendValueArr.length - 1].sendValue.indexOf('"', 1)
		    		let str22 = sendValueArr[sendValueArr.length - 1].sendValue.indexOf('"', str11 + 1)
		    		let str33 = sendValueArr[sendValueArr.length - 1].sendValue.indexOf('"', str22 + 1)
	    			for (let i = 0; i < sendValueArr.length - 1; i++) {
	    				sendResVal += sendValueArr[i].sendValue
	    			}
	    			if (sendValueArr[sendValueArr.length - 1].sendValue.charAt(sendValueArr[sendValueArr.length - 1].sendValue.length - 1) === ')') {
	    				sendResVal += sendValueArr[sendValueArr.length - 1].sendValue.substring(0, str33 + 1)
	    				sendResVal += ')'
	    			} else if (sendValueArr[sendValueArr.length - 1].sendValue.charAt(sendValueArr[sendValueArr.length - 1].sendValue.length - 3) === ')') {
	    				sendResVal += sendValueArr[sendValueArr.length - 1].sendValue.substring(0, sendValueArr[sendValueArr.length - 1].sendValue.length - 2)
	    			}else {
	    				sendResVal += sendValueArr[sendValueArr.length - 1].sendValue.substring(0, str33 + 1)
	    			}
	    		}
    		}
    		if (sendNameArr.length === 0) {
    			t.$Modal.warning({
    				title: this.$t('reminder.remind'),
    				content: this.$t('reminder.leastone'),
    			})
    		} else {
	    		if (sendNameArr.length === 1) {
	    			let str1 = sendNameArr[0].conditionValue.indexOf('"', 1)
		    		let str2 = sendNameArr[0].conditionValue.indexOf('"', str1 + 1)
		    		let str3 = sendNameArr[0].conditionValue.indexOf('"', str2 + 1)
	    			sendResValcn = sendNameArr[0].conditionValue.substring(0, str3 + 1)
	    		}
	    		if (sendNameArr.length > 1) {
	    			let str11 = sendNameArr[sendNameArr.length - 1].conditionValue.indexOf('"', 1)
		    		let str22 = sendNameArr[sendNameArr.length - 1].conditionValue.indexOf('"', str11 + 1)
		    		let str33 = sendNameArr[sendNameArr.length - 1].conditionValue.indexOf('"', str22 + 1)
	    			for (let i = 0; i < sendNameArr.length - 1; i++) {
	    				sendResValcn += (sendNameArr[i].conditionValue + '  ')
	    			}
	    			if (sendNameArr[sendNameArr.length - 1].conditionValue.charAt(sendNameArr[sendNameArr.length - 1].conditionValue.length - 1) === ')') {
	    				sendResValcn += sendNameArr[sendNameArr.length - 1].conditionValue.substring(0, str33 + 1)
	    				sendResValcn += ')'
	    			} else if (sendNameArr[sendNameArr.length - 1].conditionValue.charAt(sendNameArr[sendNameArr.length - 1].conditionValue.length - 2) === ')') {
	    				sendResValcn += sendNameArr[sendNameArr.length - 1].conditionValue.substring(0, sendNameArr[sendNameArr.length - 1].conditionValue.length - 1)
	    			} else {
	    				sendResValcn += sendNameArr[sendNameArr.length - 1].conditionValue.substring(0, str33 + 1)
	    			}
	    		}
	    		t.delArrElement()
	    		t.handleReset()
	    		t.showUpdate = false
    		}
    		t.$emit('inputCondition', sendResValcn, sendResVal)
    	},
//  	下拉框获取value/label
    	setOption(value, type) {
    		const t = this
        if (value) {
          t.paramterValue = value.value
          t.paramterValue2 = value.label
        }
    	},
//  	校验
    	dataCheck() {
    		const t = this
    	},
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  .operBtn .ivu-row{
  	margin-bottom: 20px;
  }
</style>
