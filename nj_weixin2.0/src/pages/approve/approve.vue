<template>
	<div class="approve">
		<noData v-show="list.length <= 0"></noData>
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="ref">
			<van-row>
				<van-col span="24">
					<div class="appItem" v-for="(item,index) in list" @click="goTo(item)">
						<div class="cent">
							<div class="cent_top">
								<label class="selects">
                                    <van-checkbox v-model="item.checked"
                                                  class="checkedBox"
                                                  :value="item"
                                                  @click="singleChecked(item.checked,index,item)"></van-checkbox>
                                </label>
								<div class="title">{{item.title}}</div>
								<div class="tranDate" v-if="item.deptIdpastDis">
									<span class="timeTow">
                                        {{item.createTime}}
                                    </span>
								</div>
								<div class="tranDates" v-if="item.dimReasonDis">
									<span class="timeTow">
                                        {{item.createTime}}
                                    </span>
								</div>
							</div>
							<div class="outTem">

								<div class="actionTimers" v-if="item.dimReasonDis">
									<span class="one">
                                        离职原因：{{item.dimReasonDis}}
                                    </span>
								</div>
								<div class="actionTimer" v-if="item.deptIdpastDis">
									<span class="one">
                                        原部门：{{item.deptIdpastDis}}
                                    </span>
									<span class="one">
                                        现部门：{{item.deptIdnewDis}}
                                    </span>
								</div>
								<div class="actionTimer" v-if="item.postIdpastDis">
									<span class="one">
                                       	 原岗位：{{item.postIdpastDis}}
                                    </span>
									<span class="one">
                                                                                                                          现岗位：{{item.postIdnewDis}}
                                    </span>
								</div>
								<!--考勤申诉-->
								<div v-if="item.tbname == 'atten_ckappeal'">
									<div class="actionTimer">
										<span class="one">
										申诉原因：{{item.chkReason}}
									</span>
									</div>
								</div>
								<!--调班-->
								<div v-if="item.tbname == 'atten_shift'">
									<!--<div class="actionTimer">
										<span class="one">
										加班人：{{}}
									</span>
									</div>-->
									<div class="actionTimer">
										<span class="ones">
										开始时间：{{item.shiftBgdate}}
									</span>
										<span class="ones">
									           结束时间：{{item.shiftEddate}}
									</span>
									</div>
								</div>
								<!--请假-->
								<div v-if="item.tbname == 'atten_vacation'">

									<div class="actionTimer">
										<span class="ones">
										开始时间：{{item.vacEdate}}
									</span>
										<span class="ones">
									          结束时间：{{item.vacSdate}}
									</span>
									</div>
									<div class="actionTimer">
										<span class="ones">
										请假类型：{{item.vacTypeDis}}
									</span>
									</div>
								</div>
								<!--外出-->
								<div v-if="item.tbname == 'atten_gooutproc'">
									<div class="actionTimer">
										<span class="ones">
										开始时间：{{item.goutBgdate}}
									</span>
										<span class="ones">
									           结束时间：{{item.goutEddate}}
									</span>
									</div>
								</div>
							</div>
							<div class="endTimer">
								<span class="one">
                                   		 待审批
                                </span>
							</div>
						</div>
					</div>

				</van-col>
			</van-row>
		</van-pull-refresh>
		<div v-if="	list.length > 0" class="topBtn">
			<label class="chooseAll">
                <van-checkbox :max="2"
                              class="allCheckedInput"
                              v-model='isAllChecked'
                              @click='chooseAll'> &nbsp;&nbsp;全选</van-checkbox>
            </label>
			<div class="save_button">
				<x-button class="x_button button_left" @click.native="comfirmSubmit('02noneapproved','不同意')" type="primary">不同意</x-button>
				<x-button class="x_button" @click.native="comfirmSubmit('01approved','同意')" type="primary">同意</x-button>
			</div>
		</div>
	</div>

</template>
<script>
	import {
		getDataLevelUserLogin
	} from '@/axios/axios'
	import { isSuccess } from '@/lib/util'
	import noData from '@/components/public/noData'
	export default {
		data() {
			return {
				list: [],
				checkedCode: [], // 用于保存被选中的数据
				checked: false,
				isAllChecked: false, // 正在进行中的数据是否被选中
				isLoading: false,
				formList: []
			}
		},
		components: {
			noData
		},
		created() {
			this.getInfor()
		},
		methods: {
			goTo(item) {
				this.$router.push({
					name: 'apprInfo',
					query: {
						item: item
					}
				})
			},
			// 用户单选
			singleChecked: function(checked, index, item) {
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
			getInfor() {
				console.log(window.localStorage.getItem('empId'))
				const t = this
				const data = {
					_mt: 'wxansrpttodo.getAllTodo',
					companyId: pubsource.companyId,
					empId: window.localStorage.getItem('empId')
				}
				getDataLevelUserLogin(data).then((res) => {
					if(isSuccess(res, t)) {
						console.log(res)
						if(res.data.content[0].value) {
							const listRes = JSON.parse(res.data.content[0].value, "123")
							listRes.forEach(function(item) {
								item.checked = false
							});
							t.list = listRes
							t.list.length
							localStorage.setItem("tipNum", t.list.length);
						}
						t.isLoading = false
					}
				}).catch(() => {
					localStorage.setItem("tipNum",0);
					t.$notify({
						message: '网络错误',
						duration: 1500,
						background: '#f44'
					});
					
				}).finally(() => {
					t.$store.commit('hideLoading');
					console.log('123', this.list)
				})
			},
			comfirmSubmit(type, logType) {
				console.log(this.checkedCode,'code')
				if(this.checkedCode.length > 0) {
					this.$dialog.confirm({
						title: '',
						message: '是否确认提交？'
					}).then(() => {
						this.submit(type, logType)
					}).catch(() => {
						// on cancel
					});
				} else {
					this.$notify({
						message: '请至少选一条数据',
						duration: 1500,
						background: '#dd5a57'
					});
				}
			},
			//下拉刷新
			onRefresh() {
				this.page = 1;
				this.isLoading = true;
				this.getInfor()
			},
			submit(type, logType) {
				const that = this;
				let params = []
				console.log(that.checkedCode)
				that.checkedCode.forEach(function(list, index) {
					console.log('list', list)
					let dataList = {}
					dataList.flowId = list.aprFlowId
					dataList.stepId = list.aprvrelaStepid
					dataList.billId = list.aprdBillid
                    dataList.tbname = list.tbname
                    if(list.aprvrelaStepid != 'empdim_10'&&list.tbname!='emp_empdim'){
                        if(list.aprvrelaStepid != 'vacation_3'&&list.tbname!='atten_vacation'){
                            params.push(dataList)
                        }
                    }
                    // if(list.aprvrelaStepid != 'empdim_10' && list.aprvrelaStepid != 'vacation_3') {
                    //     params.push(dataList)
                    // }
					console.log('params', params)
				});
				const t = this;
				const data = {
					_mt: 'wxansrpttodo.approvalSubmitAll',
					companyId: pubsource.companyId,
					logType: logType,
					result: type,
					aprover: localStorage.getItem('empId'),
					data: JSON.stringify(params),
				}
				console.log('参数', data)
				getDataLevelUserLogin(data).then((res) => {
					if(isSuccess(res, t)) {
						this.getInfor()
					}
				}).catch(() => {
					t.$notify({
						message: '网络错误',
						duration: 1500,
						background: '#f44'
					});
				}).finally(() => {
					console.log('rrr', t.list)
					t.$store.commit('hideLoading');
				});
			},
		},

	}
</script>

<style lang="less" scoped>
	#app {
		.approve {
			height: 84%;
			background: #f6f6f6;
			box-sizing: border-box;
			overflow: scroll;
			-webkit-overflow-scrolling: touch;
			.ref {
				height: 100%;
				overflow: auto;
			}
			.chooseAll {
				display: inline-block;
				padding: 10px 30px;
				border-radius: 5px;
				cursor: pointer;
				margin-top: 30px;
				margin-left: 10px;
			}
			.topBtn {
				width: 100%;
				height: 120px;
				background: white;
				position: fixed;
				border-top: 1px solid #f0f0f0;
				bottom: 100px;
				.save_button {
					width: 390px;
					margin-bottom: 100px;
					display: flex;
					margin-top: -70px;
					margin-left: 290px;
					.x_button {
						color: #fff;
						font-size: 15px;
						width: 140px;
						margin-left: 70px;
					}
					.button_left {
						color: #0179fe;
						background: #fff;
						border: 2px solid #339afe !important;
					}
					.weui-btn+.weui-btn {
						margin-top: 0;
					}
				}
			}
			.appItem {
				background: white;
				padding: 40px 40px;
				height: 100%;
				margin-bottom: 20px;
				overflow: hidden;
				.cent {
					.cent_top {
						display: flex;
						.selects {
							display: inline-block;
						}
						.title {
							margin-left: 20px;
							display: inline-block;
							font-size: 30px;
						}
						.tranDate {
							flex: 1;
							text-align: right;
							font-size: 30px;
						}
						.tranDates {
							flex: 1;
							text-align: right;
							font-size: 30px;
						}
					}
					.outTem {
						font-size: 30px;
						display: flex;
						justify-content: space-between;
						.actionTimers {
							flex: 1;
							margin-top: 30px;
							font-size: 30px;
						}
						.actionTimer {
							flex: 1;
							margin-top: 10px;
							margin-right: 15px;
							.one {
								overflow: hidden;
								text-overflow: ellipsis;
								width: 340px;
								white-space: nowrap;
								margin-top: 20px;
							}
							.ones {
								width: 305px;
								white-space: nowrap;
								margin-top: 20px;
								margin-right: 15px;
							}
						}
					}
					.endTimer {
						margin-top: 40px;
						color: green;
						font-size: 30px;
						width: 95%;
						text-align: right;
					}
				}
			}
		}
	}
</style>