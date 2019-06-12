<template>
	<div class="appInfo">
		<div class="head">
			<div class="title" v-if="list.empName">
				{{list.empName}}
			</div>
		</div>
		<div class="content">
			<div class="appNumber" v-if="list.ansrptTime">
				<span class="one">
					申请日期&nbsp&nbsp:
				</span>
				<span class="tow">
					{{list.ansrptTime}}
				</span>
			</div>
			<div class="appNumber" v-if="list.deptDis">
				<span class="one">
					所在部门&nbsp&nbsp:
				</span>
				<span class="tow">
					{{list.deptDis}}
				</span>
			</div>
			<div class="appNumber" v-if="list.deptDis">
				<span class="one">
					所在岗位&nbsp&nbsp:
				</span>
				<span class="tow">
					{{list.postDis}}
				</span>
			</div>
			<div class="appNumber" v-if="list.deptDis">
				<span class="one">
					离职类型&nbsp&nbsp:
				</span>
				<span class="tow">
					{{list.dimType}}
				</span>
			</div>

			<div class="appNumber" v-if="list.transDate">
				<span class="one">
					异动日期&nbsp&nbsp:
				</span>
				<span class="tow">
					{{list.transDate}}
				</span>
			</div>
			<div class="sections" v-if="list.deptIdpastDis">
				<span class="one">
					原部门&nbsp&nbsp:
				</span>
				<span class="tow">
					{{list.deptIdpastDis}}
				</span>
			</div>
			<div class="actionTimer" v-if="list.postIdpastDis">
				<span class="one">
					原岗位&nbsp&nbsp:
				</span>
				<span class="tow">
					{{list.postIdpastDis}}
				</span>
			</div>
			<div class="endTimer" v-if="list.deptIdnewDis">
				<span class="one">
					现部门&nbsp&nbsp:
				</span>
				<span class="tow">
					{{list.deptIdnewDis}}
				</span>
			</div>
			<div class="endTimer" v-if="list.postIdnewDis">
				<span class="one">
					现岗位&nbsp&nbsp:
				</span>
				<span class="tow">
					{{list.postIdnewDis}}
				</span>
			</div>

			<div class="endTimer" v-if="list.dimReason">
				<span class="one">
					离职原因&nbsp&nbsp:
				</span>
				<span class="tow">
					{{list.dimReason}}
				</span>
			</div>
		</div>
		<div class="course">
			<div v-for="(item,index) in list.ansList">
				<div class="start">
					<div class="first">
						{{item.name}}
					</div>
					<div class="firsts">
						{{item.state}}
					</div>
					<div class="data">
						{{item.date}}
					</div>
				</div>

			</div>
		</div>
		<group>
			<x-textarea class="textWrite" :max="300" v-model="value" placeholder="审批意见...." ></x-textarea>
		</group>
		<div class="save_button">
			<x-button class="x_button button_left" @click.native="submit('02noneapproved','不同意')" type="primary">不同意</x-button>
			<x-button class="x_button" @click.native="submit('01approved','同意')" type="primary">同意</x-button>
		</div>
	</div>
</template>

<script>
	import {
		XButton,
		XTextarea,
		Group
	} from 'vux'
	import {
		getDataLevelUserLoginNew,
		getDataLevelUserLogin
	} from '@/axios/axios'
	import { isSuccess } from '@/lib/util'
	export default {
		data() {
			return {
				list: [],
				value: '',
				time: ''
			}
		},
		components: {
			XButton,
			XTextarea,
			Group
		},
		created() {
			this.getData()
		},
		methods: {
			//获取详情
			getData() {
				const t = this;
				console.log(this.$route.query.item)
				if(this.$route.query.item === undefined) {
					console.log('123www')
					return;
				}
				const data = {
					_mt: 'wxansrpttodo.getAnsrptData',
					companyId: pubsource.companyId,
					dataId: this.$route.query.item.apblDataid,
					billId: this.$route.query.item.aprdBillid,
					tbname: this.$route.query.item.tbname
				}
				console.log('参数', data)
				getDataLevelUserLogin(data).then((res) => {
					if(isSuccess(res, t)) {
						let data = JSON.parse(res.data.content[0].value);
						t.list = data;
					}
				}).catch((err) => {
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
			submit(type,logType) {
				let params = {
					aprdApprover: localStorage.getItem('empId'),
					aprdAprvtime: new Date().format('yyyy-MM-dd hh:mm:ss'),
					aprdAprvresult: type,
					aprdAprvopinion: this.value
				}
				const t = this;
				const data = {
					_mt: 'wxansrpttodo.approvalSubmit',
					companyId: pubsource.companyId,
					logType:logType,
					stepId: this.$route.query.item.aprvrelaStepid,
					billId: this.$route.query.item.aprdBillid,
					aprFlowId: this.$route.query.item.aprFlowId,
					data: JSON.stringify(params),
					tbname: this.$route.query.item.tbname
				}
				console.log('参数', data)
				getDataLevelUserLogin(data).then((res) => {
					if(isSuccess(res, t)) {
						this.$router.push({
							name: 'approve',
						})
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
		}
	}
</script>

<style lang="less" scoped>
	.appInfo {
		width: 100%;
		height: 100%;
		padding: 20px;
		background: white;
		box-sizing: border-box;
		overflow:-Scroll;
		overflow-x:hidden;
		overflow:-Scroll;
		overflow-y:hidden;
		.head {
			width: 100%;
			height: 80px;
			border-bottom: 1px solid gainsboro;
			.title {
				font-size: 35px;
				margin-left: 40px;
				margin-top: 50px;
			}
		}
		.content {
			padding: 20px 20px;
			padding-bottom: 40px;
			width: 100%;
			border-bottom: 1px solid gainsboro;
			.appNumber {
				padding-top: 20px;
				width: 100%;
				height: 60px;
				font-size: 30px;
				.one {
					color: gray;
					display: inline-block;
				}
				.tow {
					margin-left: 20px;
					display: inline-block;
				}
			}
			.sections {
				padding-top: 18px;
				width: 100%;
				height: 50px;
				font-size: 30px;
				.one {
					color: gray;
					display: inline-block;
				}
				.tow {
					margin-left: 50px;
					display: inline-block;
				}
			}
			.actionTimer {
				padding-top: 18px;
				width: 100%;
				height: 50px;
				font-size: 30px;
				.one {
					color: gray;
					display: inline-block;
				}
				.tow {
					margin-left: 50px;
					display: inline-block;
				}
			}
			.endTimer {
				padding-top: 18px;
				width: 100%;
				height: 50px;
				font-size: 30px;
				.one {
					color: gray;
					display: inline-block;
				}
				.tow {
					margin-left: 50px;
					display: inline-block;
				}
			}
		}
		.course {
			font-size: 30px;
			padding: 20px 20px;
			width: 100%;
			.start {
				width: 90%;
				margin-top: 30px;
				.first {
					display: inline-block;
					width: 100px;
					height: 20px;
					border: 1px solid white;
				}
				.data {
					float: right;
				}
				.firsts {
					width: 150px;
					height: 20px;
					border: 1px solid white;
					text-align: left;
					display: inline-block;
					margin-left: 70px;
					color: green;
				}
			}
			.point {
				margin-top: 30px;
				margin-left: 100px;
				width: 1px;
				height: 50px;
				border: 1px solid black;
			}
		}
		.textWrite{
			font-size: 30px;
		}
		.save_button {
			padding: 65px 54px 50px;
			display: flex;
			.x_button {
				color: #fff;
				font-size: 34px;
				width: 300px;
				margin-left: 20px;
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
</style>