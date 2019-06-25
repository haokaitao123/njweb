<template>
	<div>
		<Row>
			<Col span="24">
			<card>
				<p slot="title">
					<Icon type="mouse"></Icon>
					&nbsp;待审批项
				</p>
				<Row :style="{height: rowHeight + 'px'}" class="divContent">
					<div style="height: 85%;overflow:auto;">
						<Spin fix size="large" v-if="isSpin">
							<!--<div>数据加载中...</div>-->
						</Spin>
						<div class="selects">

						</div>

						<div v-for="(item, index) in toDoAllData" :key="index" class="dataClass">
							<el-checkbox-group class="checkGroup" v-model="checkedCities" @change="handleCheckedCitiesChange">
								<el-checkbox class="checks" :label="item" :key="index">{{item}}</el-checkbox>
							</el-checkbox-group>
							<span class="item-list">{{item.apblTitlecn}} </span>
						</div>
					</div>
					<div class="topBtn">
						<div class="chooseAll">
							<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>&nbsp;&nbsp; 全选
						</div>
						<div class="btns">
							<div class="leftBtn">
								<el-button size="mini" @click.native="isSubmit('02noneapproved','不同意')">不同意</el-button>
								<el-button type="primary" size="mini" @click.native="isSubmit('01approved','同意')">同意</el-button>
							</div>
							<div class="rightBtn">
							</div>
						</div>
					</div>
				</Row>

			</card>
			</Col>
		</Row>
	</div>
</template>

<script>
	import { getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLoginSenior } from '../../../axios/axios'
	import { isSuccess, getCookie } from '../../../lib/util'
	import Bus from '../../../lib/bus'
	const cityOptions = ['上海', '北京', '广州', '深圳'];
	export default {
		data() {
			return {
				rowHeight: document.body.offsetHeight - 200,
				userTodoKey: '',
				toDoAllData: [],
				fID: '',
				isSpin: true,
				id: '',
				val: false,
				arr: '',
				checked: false,
				isAllChecked: false, // 正在进行中的数据是否被选中

				checkAll: false,
				//选中的数据
				checkedCities: [],
				//是否全选
				isIndeterminate: false,
				type: '',
				logType: ''
			}
		},
		mounted() {
			Bus.$on('stopRequest', (res) => {
				clearInterval(this.fID)
			})
			this.getAllData()
		},
		methods: {
			handleCheckAllChange(val) {
				console.log('a', val)
				this.checkedCities = val ? this.toDoAllData : [];
				console.log('b', this.checkedCities)
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				console.log(this.toDoAllData)
				console.log(value, 'aaa')
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.toDoAllData.length;
				console.log('c', this.checkAll)
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.toDoAllData.length;
				console.log('d', this.isIndeterminate)
			},
			getAllData() {
				const t = this
				const data = {
					_mt: 'ansrptTodoList.getAllTodo',
					logType: '查询所有待办1',
					roleType: localStorage.roleType,
				}
				getDataLevelUserLogin(data).then((res) => {
					if(isSuccess(res, t)) {
						t.userTodoKey = res.data.content[0].value
						if(res.data.content[0].value) {
							t.setInterFunc()
						} else {
							this.isSpin = false
						}
					}
				}).catch(() => {
					t.$Modal.error({
						title: this.$t('reminder.err'),
						content: this.$t('reminder.errormessage'),
					})
				})
			},
			setInterFunc() {
				const t = this
				t.fID = setInterval(function() {
					t.setInterData()
					console.log('hao', t.toDoAllData)
				}, 3000)
			},
			setInterData() {
				const t = this
				const data = {
					_mt: 'ansrptTodoList.queryGetAllTodo',
					logType: '查询所有待办2',
					roleType: localStorage.roleType,
					todoKey: t.userTodoKey,
				}
				getDataLevelUserLogin(data).then((res) => {
					if(isSuccess(res, t)) {
						if(res.data.content[0].todoStatus === 100) {
							if(res.data.content[0].todoList) { //分有无title两种情况
								for(let i = 0; i < res.data.content[0].todoList.length; i++) {
									if(res.data.content[0].todoList[i].todo_title) {
										t.toDoAllData.push(res.data.content[0].todoList[i])
									} else {
										let noTitle = JSON.parse(res.data.content[0].todoList[i].todo_data)
										for(let j = 0; j < noTitle.length; j++) {
											t.toDoAllData.push(noTitle[j])
										}
									}
								}
								t.toDoAllData.forEach(function(item) {
									item.checked = false
								});
								console.log(t.toDoAllData)
							}

							//        		console.log(t.toDoAllData)
						}
						//100停止调用
						if(res.data.content[0].todoStatus === 100) {
							clearInterval(t.fID)
							t.isSpin = false
						}
					}
				}).catch(() => {
					t.$Modal.error({
						title: this.$t('reminder.err'),
						content: this.$t('reminder.errormessage'),
					})
				})
			},
			// 用户单选
			singleChecked: function(checked, index, item) {
				console.log(1)
				const that = this
				console.log(checked, index)
				if(checked) {
					this.checkedCode.push(item)
				} else {
					console.log('//', this.checkedCode)
					this.checkedCode.forEach(function(v) {
						if(v.checked == false) {
							console.log('v', v.checked)
							that.checkedCode.remove(v)
						}
					});
				}
				console.log(index)
				console.log('1234', this.checkedCode)
				//判断每一个CheckBox是否选中，全选中让全选按钮选中
				if(this.list.length == this.checkedCode.length) {
					this.isAllChecked = true;
				} else { // 只要有一个checkbox不选中，让全选按钮不选中
					this.isAllChecked = false;
				}
			},
			isSubmit(type, logType) {
				this.type = type
				this.logType = logType
				const t = this
				if(t.checkedCities.length > 0) {
					t.$Modal.confirm({
						title: this.$t('reminder.remind'),
						content: '是否确认提交？',
						onOk: () => {
							console.log(t.type, t.logType)
							t.submit(t.type, t.logType)
						},
					})
				} else {
					t.$Modal.error({
						title: this.$t('请至少选择一条数据')
					})
				}
			},
			submit(type, logType) {
				const that = this;
				let params = []
				console.log('rn', that.checkedCities)
				that.checkedCities.forEach(function(list, index) {
					console.log('list', list)
					let dataList = {}
					dataList.flowId = list.apblAprvid
					dataList.stepId = list.aprvrelaStepid
					dataList.billId = list.aprdBillid
					dataList.tbname = list.tbname
					params.push(dataList)
					console.log('params', params)
				});
				let aprovers = that.checkedCities[0].aprvrelaApproverid
				const t = this;
				const data = {
					_mt: 'platAutoApprovalSubmitAgwService.approvalSubmitAll',
					logType: logType,
					result: type,
					aprover: aprovers,
					data: JSON.stringify(params),
				}
				console.log('参数', data)
				getDataLevelUserLogin(data).then((res) => {
					if(isSuccess(res, t)) {
						t.$Modal.success({
							title: this.$t('reminder.suc'),
							content: this.$t('审批成功'),
						})
						t.toDoAllData = []
						t.checkedCities = []
						this.getAllData()
						t.isIndeterminate = false;
					}
				}).catch(() => {}).finally(() => {
					t.$store.commit('hideLoading');
				});
			},
			doAnsrpt(item) {
				const t = this
				console.log(item)
				if(item.todo_title) {
					const itemData = JSON.parse(item.todo_data)
					const data = {
						_mt: 'sysFunctions.getFunByCode',
						funCode: itemData.funCode,
					}
					getDataLevelUserLogin(data).then((res) => {
						console.log(res)
						if(isSuccess(res, t)) {
							t.id = res.data.content[0].id
							const tag = {
								title: itemData.title,
								path: '/' + itemData.funAction,
								name: itemData.funAction,
								query: {
									id: t.id,
									code: itemData.funCode
								},
							}
							this.$store.commit('increateTag', tag)
							this.$router.push({
								path: itemData.funAction,
								query: {
									id: t.id,
									code: itemData.funCode,
								}
							})
						}
					}).catch(() => {
						t.$Modal.error({
							title: this.$t('reminder.err'),
							content: this.$t('reminder.errormessage'),
						})
					})
				} else {
					t.flowId = item.aprvrelaStepid
					t.pkValue = item.apblDataid
					t.aprdBillid = item.aprdBillid
					t.aprdApprover = item.aprvrelaApproveridDis
					t.aprvrelaApproverid = item.aprvrelaApproverid
					t.aprvrelaRecordidAll = item.aprvrelaRecordid
					t.aprvrelTitle = item.apblTitlecn
					t.aprvCode = item.aprvCode
					t.openTestUpd = true
				}
			},
			// 用户全选
			chooseAll() {
				//debugger;
				console.log("checked", this.isAllChecked)
				var that = this;
				if(that.checkedCode.length !== 0) {
					that.checkedCode = [];
				}
				if(that.isAllChecked) {
					that.list.forEach(function(item) {
						console.log(item, "item");
						item.checked = true;
						that.checkedCode.push(item)
					})
				} else {
					that.list.forEach(function(item) {
						console.log(item, "item");
						item.checked = false;
						that.checkedCode = []
					})
				}
				console.log('that.checkedCode', that.checkedCode)
				console.log("checked", this.isAllChecked)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.divContent {
		overflow: auto;
	}
	
	.item-list {
		position: absolute;
		top: 0px;
		left: 25px;
		width: 80%;
		color: black;
		display: inline-block;
		margin-left: 30px;
		vertical-align: middle;
	}
	
	.checks .el-checkbox__label {
		display: none;
	}
	
	.checks {
		width: 16px;
		overflow: hidden;
		display: block;
	}
	
	.checkGroup {
		display: flex;
		flex-flow: column;
		vertical-align: middle;
	}
	
	.dataClass {
		height: 40px;
		line-height: 40px;
		margin-bottom: -1px;
		padding-left: 20px;
		text-overflow: ellipsis;
		white-space: nowrap;
		position: relative;
	}
	
	.selects {
		display: inline-block;
	}
	
	.topBtn {
    display: flex;
    height: 15%;
		width: 88.5%;
    align-items: center;
	}
	
	.chooseAll {
		display: inline-block;
	}
	
	.btns {
		margin-left: 45px;
		display: inline-block;
	}
	
	.dataClass:hover {
		background: #f7f7f7;
		cursor: pointer;
		color: #2d8cf0;
	}
</style>
