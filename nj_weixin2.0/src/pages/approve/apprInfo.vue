<template>
	<div class="appInfo">
		<div class="head">
			<div class="title" v-if="list.empName">
				{{list.empName}}
			</div>
			<!--请假-->
			<div v-if="list.tbname == 'atten_vacation'">
				<div class="title" v-if="list.empnhName">
					{{list.empnhName}}
				</div>
			</div>
			<!--考勤申诉-->
			<div v-if="list.tbname == 'atten_ckappeal'">
				<div class="title" v-if="list.empnhName">
					{{list.empnhName}}
				</div>
			</div>
			<!--调班-->
			<div v-if="list.tbname == 'atten_shift'">
				<div class="title" v-if="list.empnhName">
					{{list.empnhName}}
				</div>
			</div>
			<!--外出-->
			<div v-if="list.tbname == 'atten_gooutproc'">
				<div class="title" v-if="list.empnhName">
					{{list.empnhName}}
				</div>
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
			<!--请假-->
			<div v-if="list.tbname == 'atten_vacation'">
				<div class="sections" v-if="list.unitFname">
					<span class="one">
                    部门&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.unitFname}}
                </span>
				</div>
				<div class="endTimer" v-if="list.postFname">
					<span class="one">
                    	岗位&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.postFname}}
                </span>
				</div>
				<div class="actionTimer" v-if="list.vacSdate">
					<span class="one">
                    开始时间&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.vacSdate}}
                </span>
				</div>
				<div class="endTimer" v-if="list.vacEdate">
					<span class="one">
                    结束时间&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.vacEdate}}
                </span>
				</div>
				<div class="actionTimer" v-if="list.vacTypeDis">
					<span class="one">
                    请假类型&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.vacTypeDis}}
                </span>
				</div>
				<div class="endTimer" v-if="list.vacDay">
					<span class="one">
                    请假天数&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.vacDay}}
                </span>
				</div>
			</div>
			<!--调班-->
			<div v-if="list.tbname == 'atten_shift'">
				<div class="sections" v-if="list.unitFname">
					<span class="one">
                    部门&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.unitFname}}
                </span>
				</div>
				<div class="endTimer" v-if="list.postFname">
					<span class="one">
                    	岗位&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.postFname}}
                </span>
				</div>
				<div class="actionTimer" v-if="list.shiftBgdate">
					<span class="one">
                    开始时间&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.shiftBgdate}}
                </span>
				</div>
				<div class="endTimer" v-if="list.shiftEddate">
					<span class="one">
                    结束时间&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.shiftEddate}}
                </span>
				</div>
				<!--<div class="actionTimer" v-if="list.vacTypeDis">
				<span class="one">
                    请假类型&nbsp&nbsp:
                </span>
				<span class="tow">
                    {{list.vacTypeDis}}
                </span>
			</div>-->
				<div class="endTimer" v-if="list.vacDay">
					<span class="one">
                    调班天数&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.shiftDays}}
                </span>
				</div>
			</div>
			<!--外出-->
			<div v-if="list.tbname == 'atten_gooutproc'">
				<div class="sections" v-if="list.unitFname">
					<span class="one">
                    部门&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.unitFname}}
                </span>
				</div>
				<div class="endTimer" v-if="list.postFname">
					<span class="one">
                    	岗位&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.postFname}}
                </span>
				</div>
				<div class="actionTimer" v-if="list.goutBgdate">
					<span class="one">
                    开始时间&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.goutBgdate}}
                </span>
				</div>
				<div class="endTimer" v-if="list.goutEddate">
					<span class="one">
                    结束时间&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.goutEddate}}
                </span>
				</div>
				<!--<div class="actionTimer" v-if="list.vacTypeDis">
				<span class="one">
                    请假类型&nbsp&nbsp:
                </span>
				<span class="tow">
                    {{list.vacTypeDis}}
                </span>
			</div>-->
				<div class="endTimer" v-if="list.goutReason">
					<span class="one">
                                                      外出原因&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.goutReason}}
                </span>
				</div>
			</div>
			<!--考请申诉-->
			<div v-if="list.tbname == 'atten_ckappeal'">
				<div class="sections" v-if="list.unitFname">
					<span class="one">
                    	部门&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.unitFname}}
                </span>
				</div>
				<div class="endTimer" v-if="list.chkIndtod">
					<span class="one">
                    	原上班打卡时间&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.chkIndtod}}
                </span>
				</div>
				<div class="actionTimer" v-if="list.chkUpresodDis">
					<span class="one">
                    	原上班考勤结果&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.chkUpresodDis}}
                </span>
				</div>
				<div class="endTimer" v-if="list.chkOutod">
					<span class="one">
                    	原下班打卡时间&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.chkOutod}}
                </span>
				</div>
				<div class="actionTimer" v-if="list.chkDresodDis">
					<span class="one">
                    	原下班考勤结果&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.chkDresodDis}}
                </span>
				</div>
				<div class="actionTimer" v-if="list.chkLevpodDis">
					<span class="one">
                    	原请假类型&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.chkLevpodDis}}
                </span>
				</div>
				<div class="endTimer" v-if="list.chkIndtnw">
					<span class="one">
                     	原上班打卡时间&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.chkIndtnw}}
                </span>
				</div>
				<div class="actionTimer" v-if="list.chkUpresnwDis">
					<span class="one">
                    	现上班考勤结果&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.chkUpresnwDis}}
                </span>
				</div>
				<div class="endTimer" v-if="list.chkOutnw">
					<span class="one">
                     	现下班打卡时间&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.chkOutnw}}
                </span>
				</div>
				<div class="actionTimer" v-if="list.chkLevpodDis">
					<span class="one">
                    	现下班考勤结果&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.chkDresnwDis}}
                </span>
				</div>
				<div class="endTimer" v-if="list.chkLevpnwDis">
					<span class="one">
                     	现请假类型&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.chkLevpnwDis}}
                </span>
				</div>
				<div class="endTimer" v-if="list.chkReason">
					<span class="one">
                     	申诉原因&nbsp&nbsp:
                </span>
					<span class="tow">
                    {{list.chkReason}}
                </span>
				</div>
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
		<!--交接人-->
		<div v-if="this.$route.query.item.tbname == 'emp_empdim'">
			<div class="item_box" v-if="relibInvitemanShow">
				<cell title="" is-link value-align="left" v-model="empIdName" v-verify="form.relibInviteman" @click.native="popupClick('empShow','relibInviteman')">
					<div slot="title">交接人<span>*</span></div>
				</cell>
				<icon type="warn" class="error" v-show="empIdName=='请选择'" v-remind="form.relibInviteman"></icon>
			</div>
		</div>
		<!-- 归来日期 -->
		<div v-if="this.$route.query.item.tbname == 'atten_vacation'">
			<div v-if="this.$route.query.item.aprdStepcode == 'vacation_3'" class="item_box">
				<cell title="" is-link value-align="left" v-model="form.relibFilldate"  v-verify="form.relibFilldate" @click.native="popupClick('relibFilldateShow','relibFilldate')">
					<div slot="title">归来日期<span>*</span></div>
				</cell>
				<icon type="warn" class="error" v-show="form.relibFilldate=='请选择'" v-remind="form.relibFilldate"></icon>
			</div>
		</div>
		<group>
			<x-textarea class="textWrite" :max="300" v-model="value" placeholder="请填写审批意见"></x-textarea>
		</group>
		<div class="save_button">
			<x-button class="x_button button_left" @click.native="comfirmSubmit('02noneapproved','不同意')" type="primary">不同意</x-button>
			<x-button class="x_button" @click.native="comfirmSubmit('01approved','同意')" type="primary">同意</x-button>
		</div>
		<!--归来日期-->
		<van-popup v-model="relibFilldateShow" position="bottom" >
			<van-datetime-picker v-model="relibFilldateDate" type="date" :min-date="minRelibFilldate" :max-date="maxRelibFilldate" @confirm="confirm" @cancel="cancel" />
		</van-popup>
		<!--交接人-->
		<van-popup v-model="empShow" position="right" class="popup_width">
			<searchEmp @inputEmp="inputEmp" :currentId="form.relibInviteman" v-if="empShow" ref="searchEmp"></searchEmp>
		</van-popup>
	</div>
</template>

<script>
	import {
		XButton,
		XTextarea,
		Group,
		Popup,
		Cell,
		Icon,
		XInput,
	} from 'vux'
	import {
		getDataLevelUserLoginNew,
		getDataLevelUserLogin
	} from '@/axios/axios'
	import { isSuccess } from '@/lib/util'
	import searchEmp from '@/components/search/searchAllEmp'
	//import { Group, ,  XTextarea, } from 'vux'
	export default {
		data() {
			return {
				list: [],
				value: '',
				time: '',
				curDom: "",
				curDomShow: "",
				relibFilldateShow: false,
				empShow: false,
				empIdName: "请选择",
				disabled: false,
				minRelibFilldate: new Date(),
				maxRelibFilldate: new Date(2099, 12, 31),
				relibFilldateDate: new Date(),
				form: {
					relibInviteman: '',             //交接人id
					relibFilldate: "请选择",        //归来日期 
                },
                relibInvitemanShow:false,
			}
		},
		verify: {
			form: {
				relibInviteman: "required",
				relibName: "required",
				relibGender: "required",
				relibMobile: ["required", "mobile"],
				relibFilldate: "required",
			}
		},
		components: {
			XButton,
			XTextarea,
			Group,
			Popup,
			Cell,
			Icon,
			XInput,
			searchEmp
		},

		created() {
			this.getData()
		},

		methods: {
			//获取详情
			getData() {
				const t = this;
				if(this.$route.query.item === undefined) {
					return;
				}
				const data = {
					_mt: 'wxansrpttodo.getAnsrptData',
					companyId: pubsource.companyId,
					dataId: this.$route.query.item.apblDataid,
					billId: this.$route.query.item.aprdBillid,
					tbname: this.$route.query.item.tbname
				}
				getDataLevelUserLogin(data).then((res) => {
					if(isSuccess(res, t)) {
                        let data = JSON.parse(res.data.content[0].value);
                        console.log(data,"data")
                        t.list = data;
                        let code = this.$route.query.item.aprdStepcode;
                        if(code ==='empdim_10'&&!(data.dimManPostType == '07Edirector' || data.dimManPostType == '08Employee')){
                            t.relibInvitemanShow =true
                        }
                       if(code ==='empdim_20'&&(data.dimManPostType == '07Edirector' || data.dimManPostType == '08Employee')){
                            t.relibInvitemanShow =true
                        }
                        console.log(data,"t.data")
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
			comfirmSubmit(type, logType) {
				const t = this;
				if(t.$verify.check()) {
					this.$dialog.confirm({
						title: '',
						message: '是否确认提交？'
					}).then(() => {
						this.submit(type, logType)
					}).catch(() => {
						// on cancel
					});
				}
			},
			submit(type, logType) {
				const t = this;
				let params = {
					aprdApprover: localStorage.getItem('empId'),
					aprdAprvtime: new Date().format('yyyy-MM-dd hh:mm:ss'),
					aprdAprvresult: type,
					aprdAprvopinion: this.value
				}
				let dates = {}
				if(this.$route.query.item.tbname == 'atten_vacation') {
                    if(this.$route.query.item.aprdStepcode==='vacation_3'){
                        dates.vacActdate = this.form.relibFilldate
                    }
					
				}

				if(this.$route.query.item.tbname == 'emp_empdim') {
                    if(t.relibInvitemanShow){
                        dates.dimReceive = this.form.relibInviteman
                    }
				}
				const data = {
					_mt: 'wxansrpttodo.approvalSubmit',
					companyId: pubsource.companyId,
					logType: logType,
					stepId: this.$route.query.item.aprvrelaStepid,
					billId: this.$route.query.item.aprdBillid,
					aprFlowId: this.$route.query.item.aprFlowId,
					data: JSON.stringify(params),
					tbname: this.$route.query.item.tbname,
					pkValue: this.list.id,
					pkData: JSON.stringify(dates),
				}
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
			//底部弹出
			popupClick(domShow, dom) {
				console.log(domShow, dom)
				this.curDom = dom;
				this.curDomShow = domShow;
				this[domShow] = true;
			},
			//底部弹出确定事件
			confirm(value) {
				if(this.curDomShow.indexOf("dateShow") != -1) {
					value = new Date(value).format('yyyy-MM-dd');
					this.currentDate = new Date();
					this.form[this.curDom] = value
				} else {
					this.form[this.curDom] = value.key;
					let str = this.curDom
					str += "Dis";
					this[str] = value.text;
				}
				this[this.curDomShow] = false;
			},
			//底部弹出取消事件
			cancel(value) {
				this[this.curDomShow] = false;
			},
			//员工弹出框事件
			inputEmp(res) {
				this.empShow = false;
				this.form.relibInviteman = res.id;
				this.empIdName = res.empnhName;
			},
		}
	}
</script>

<style lang="less" scoped>
	.appInfo {
		width: 100%;
		height: calc(~"100% - 100px");
		padding: 20px;
		background: white;
		box-sizing: border-box;
		overflow: -Scroll;
		overflow-x: hidden;
		overflow-y: auto;
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
			width: 95%;
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
					margin-left: 20px;
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
					margin-left: 20px;
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
					margin-left: 20px;
					display: inline-block;
				}
			}
		}
		.course {
			font-size: 30px;
			padding: 20px 20px;
			margin-bottom: 10px;
			width: 100%;
			.start {
				width: 90%;
				margin-top: 20px;
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
		.textWrite {
			font-size: 30px;
			border-bottom: 1px solid gainsboro;
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
		.item_box {
			border-top: 0.1px solid #d9d9d9;
			/*padding-top: 20px;*/
			font-size: 30px;
			height: 100px;
			line-height: 95px;
		}
		.weui-cell /deep/ .vux-cell-align-left {
			margin-left: 50px !important;
			margin-top: -90px !important;
		}
		.weui-cell /deep/ span {
			display: inline-block;
			color: red;
		}
		.item_box /deep/.weui-icon-warn {
			float: right;
			margin-top: -160px;
		}
		.weui-cell_access /deep/.weui-cell__ft:after{
			width: 24px;
			height: 24px;
		}
		.popup_width {
			width: 80%;
			height: 100%;
			overflow: scroll;
			-webkit-overflow-scrolling: touch;
		}
	}
</style>