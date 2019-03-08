<template>
	<!--看板-->
	<div class="wrap">
		<div class="wrapOne">
			<div class="personalInfo" v-for="item in cusDataList" v-show="meShow">
        <img v-if="$store.state.InfoList.hasOwnProperty('empphotouploadbigicon')" :src="httpImg + $store.state.InfoList.empphotouploadbigicon.split(',')[1]" alt="" class="avatar">
        <img v-else="$store.state.InfoList.hasOwnProperty('empphotouploadbigicon')" src="../../../static/main/header.png" alt="" class="avatar">
				<div class="info">
					<p class="name">{{item.view_title}}</p>
					<div class="rank">
						<span>星级 : </span>
						<img v-show="wholeShow" src="../../../static/action/star.svg" v-for="i in starNum">
						<img v-show="incompleteShow" :src="incompleteStar" alt="">
					</div>
					<p class="info_f">您于{{item.view_entrydate}}加入公司，已经和公司一起奋斗了{{item.view_workingtime}}了，我们一起加油，共创辉煌！</p>
				</div>
			</div>
			<div class="remindDiv" v-show="scheduleValue>0" v-for="item in cusDataList">
				<p>
					今日您有{{scheduleValue}}项任务需处理，请关注日程管理。
				</p>
				<p v-show="remindBirShow">
					今天是您的生日，祝您生日快乐！
				</p>
				<p v-show="remindTryShow">{{remindTryText}}</p>
				<p v-show="remindContractShow">
					您的合同签订于{{item.view_consdate}}，期限 {{item.view_conperiod}}年，将于{{item.view_conedate}}到期，请关注合同到期评估信息，公司真诚期望与您继续续约。
				</p>
			</div>
			<div class="personalDetail" v-if="empTotal>0">
				<div class="statistics">
					<div class="statisticsT">团队统计</div>
					<div class="firstLine" v-for="item in empDataList">
						<div class="line_right">
							<div class="staff">
								<div class="box">
									<div>{{item.cyleaveCount}}</div>
									<div>当年入职</div>
								</div>
								<div class="box">
									<div>{{item.cyentryCount}}</div>
									<div>当年离职</div>
								</div>
								<div class="box">
									<div>{{item.staffTotal}}</div>
									<div>员工总数</div>
								</div>
							</div>
							<div>员工动态</div>
						</div>
						<div class="line_left">
							<div id="gender"></div>
							<div class="picText">男女比例</div>
						</div>
					</div>
					<div style="height: 1px;background: #E3E3E3;margin-bottom: 42px"></div>
					<div class="firstLine">
						<div class="line_right">
							<div id="study"></div>
							<div>学历统计</div>
						</div>
						<div class="line_left">
							<div id="time">
							</div>
							<div class="picText">工作年限</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { isSuccess } from '@/lib/util'
	import chartFn from '../../lib/echarts'
	import { getDataLevelUserLogin } from '@/axios/axios'
	import headerTitle from '../../components/headTitle.vue';

	export default {
		name: 'spectaculars',
		data() {
			return {
				starNum: 0,
				title: '看板',
				meShow: true,
				wholeShow: false,
				incompleteShow: true,
				remindBirShow: false,
				remindTryShow: false,
				remindContractShow: false,
				wholeStar: "",
				incompleteStar: "",
				remindTryText: "",
				scheduleValue: 0,
				cusDataList: [],
				empTotal: 0,
				empDataList: [],
        httpImg:'',
			}
		},
		components: {
			headerTitle
		},
		mounted() {

		},
    created() {
      this.getCusData();
      this.getScheduleData();
      this.getEmployeeStatiData();
      this.httpImg = pubsource.pub_pubf_downlink
    },
		methods: {
			getCusData() {
				const t = this;
				let params = {
					_mt: "weiXinBoardView.getRemindInfo",
					clientIp: pubsource.clientId,
					applicationId: pubsource.applicationId,
					companyId: pubsource.companyId,
					userId: localStorage.getItem('bus_userid'),
					busEmpid: localStorage.getItem('bus_empid'),
				};
				t.cusDataList = [{}];
				getDataLevelUserLogin(params).then((res) => {
					if(isSuccess(res, t)) {
						t.cusDataList = [];
						let data = res.data.content[0];
						if(Object.getOwnPropertyNames(data)<=0){
							t.meShow = false;
							return;
						}
						if(1 == data.view_isbirth) {
							t.remindBirShow = true;
						}
						if(1 == data.view_iscon) {
							t.remindContractShow = true;
						}
						t.isShowTry(data.view_ispro, data.view_isproedate);
						t.getStar(data.view_workingtime);
						 t.cusDataList.push(data);

					}
				}).catch((res) => {})
			},
			getScheduleData() {
				const t = this;
				let params = {
					_mt: "weiXinBoardView.getSchedule",
					clientIp: pubsource.clientId,
					applicationId: pubsource.applicationId,
					companyId: pubsource.companyId,
					userId: localStorage.getItem('bus_userid'),
					busEmpid: localStorage.getItem('bus_empid'),
				};
				t.scheduleValue = 0;
				getDataLevelUserLogin(params).then((res) => {
					if(isSuccess(res, t)) {
						t.scheduleValue = res.data.content[0].value;
					}
				}).catch((res) => {})
			},
			getEmployeeStatiData() {
				const t = this;
				let params = {
					_mt: "weixinTeamStatistic.getTeamStatistic",
					clientIp: pubsource.clientId,
					applicationId: pubsource.applicationId,
					companyId: pubsource.companyId,
					userId: localStorage.getItem('bus_userid'),
					pmpId: localStorage.getItem('bus_empid'),
				};
				getDataLevelUserLogin(params).then((res) => {
					if(isSuccess(res, t)) {
						let data = res.data.content[0];
						t.dataProcessing(data);
					}
				}).catch((res) => {})
			},
			getStar(str) {
				const t = this;
				let dateStr = "";
				let month = 0;
				console.log("yuan",str)
				if(str.indexOf("年") != -1) {
					if(5 < str.split("年")[0] || 5 == str.split("年")[0]) {
						t.wholeShow = true;
						t.starNum = 1;
						t.wholeStar = "../../../static/star/xj_06.png";
						return;
					}
					if(3 < str.split("年")[0] || 3 == str.split("年")[0]) {
						t.wholeShow = true;
						t.starNum = 1;
						t.wholeStar = "../../../static/star/xj_05.png";
						return;
					}
					if(str.split("年")[0]) {
						t.wholeShow = true;
						t.starNum = parseInt(str.split("年")[0]);
						t.wholeStar = "../../../static/star/xj_04.png";
					}
					if(str.split("年")[1]) {
						let dateStr = str.split("年")[1];
						let day = parseInt(dateStr.substring(0, dateStr.length - 1).split("个月")[1]);
						month = parseInt(dateStr.substring(0, dateStr.length - 1).split("个月")[0]);
						if(15 < day || 15 == day) {
							month = month + 1;
						};
					}
				} else {
					if(str) {
						let day = parseInt(str.substring(0, str.length - 1).split("个月")[1]);
						month = parseInt(str.substring(0, str.length - 1).split("个月")[0]);
						if(15 < day || 15 == day) {
							month = month + 1;
						};

					}
				}
				if(1 > month) {
					t.incompleteShow = false;
					return;
				};
				if(3 > month && (1 < month || 1 == month)) {
					t.incompleteStar = "../../../static/star/xj_01.png";
				}
				if(6 > month && (3 < month || 3 == month)) {
					t.incompleteStar = "../../../static/star/xj_02.png";
				}
				if(9 > month && (6 < month || 6 == month)) {
					t.incompleteStar = "../../../static/star/xj_03.png";
				}
				console.log('year:',t.starNum)
			},
			isShowTry(str, date) {
				if(1 == str) {
					this.remindTryShow = true;
					this.remindTryText = "今天是你的试用期结束时间，请您确认！"
				}
				if(2 == str) {
					this.remindTryShow = true;
					this.remindTryText = "您的试用期将于" + date + "结束，请关注试 用到期评估信息，祝您早日转正。"
				}
			},
			dataProcessing(data){
				const t = this;
				let genderData = {};
				let histogramDataList = [];
				let pieDataList = [];
				let pieTotal = 0;
				t.empTotal = data.staffTotal;
				t.empDataList.push(data);
				histogramDataList.push(data.level1);
				histogramDataList.push(data.level2);
				histogramDataList.push(data.level3);
				histogramDataList.push(data.level4);
				pieTotal = parseInt(data.less1)+parseInt(data.bwn1and3)+parseInt(data.bwn3and5)+parseInt(data.bwn5and10)+parseInt(data.more10);
				if(pieTotal == 0){
					return;
				}
				if(parseInt(data.less1)>0){
					let map = {};
					map["name"] = "少于1年\n("+(parseInt(data.less1)/pieTotal*100).toFixed(2)+"%)";
					map["value"] = data.less1;
					pieDataList.push(map);
				}
				if(parseInt(data.bwn1and3)>0){
					let map = {};
					map["name"] = "1到3年\n("+(parseInt(data.bwn1and3)/pieTotal*100).toFixed(2)+"%)";
					map["value"] = data.bwn1and3;
					pieDataList.push(map);
				}
				if(parseInt(data.bwn3and5)>0){
					let map = {};
					map["name"] = "3到5年\n("+(parseInt(data.bwn3and5)/pieTotal*100).toFixed(2)+"%)";
					map["value"] = data.bwn3and5;
					pieDataList.push(map);
				}
				if(parseInt(data.bwn5and10)>0){
					let map = {};
					map["name"] = "当年5到10年\n("+(parseInt(data.bwn5and10)/pieTotal*100).toFixed(2)+"%)";
					map["value"] = data.bwn5and10;
					pieDataList.push(map);
				}
				if(parseInt(data.more10)>0){
					let map = {};
					map["name"] = "超过10年\n("+(parseInt(data.more10)/pieTotal*100).toFixed(2)+"%)";
					map["value"] = data.more10;
					pieDataList.push(map);
				}
				genderData["manCount"] = data.manCount;
				genderData["femaleCount"] = data.femaleCount;
				setTimeout(function() {
					t.drawGender(genderData);
					t.drawLine(histogramDataList);
					t.drawTime(pieDataList)
				}, 0)
			},
			drawTime(data) {
				let myChart1 = this.$echarts.init(document.getElementById('time'));
				myChart1.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: <br/>{c} ({d}%)"
					},
					color: ['#F77F9A', '#77D8CF', "#FDD5DC", '#A1CFFD', '#7288D5', "#F99772", "#DAD794", "#AD95D5", "#C7DCD3"],
					series: [{
						name: '工作年限',
						type: 'pie',
						radius: '80%',
						center: ['50%', '50%'],
						data: data,
						itemStyle: {
							normal: {
								label: {
									show: true,
									fontSize: 8,
									position: 'inner'
								},
								labelLine: {
									show: false //隐藏标示线
								}
							},
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				})
			},
			drawGender(data) {
				let myChart1 = this.$echarts.init(document.getElementById('gender'));
				myChart1.setOption({
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)',
					},
					grid: {
						top: '5%',
						left: '3%',
						right: '0%',
						bottom: '15%',
						containLabel: true,
					},
					series: [{
						name: '男女比例',
						type: 'pie',
						radius: ['70%', '90%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center',
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '14',
									fontWeight: 'bold',
								},
							},
						},
						labelLine: {
							normal: {
								show: false,
							},
						},
						data: [{
								value: data.manCount,
								name: '男'
							},
							{
								value: data.femaleCount,
								name: '女'
							},
						],
					}, ],
					color: [
						'#89c5e9',
						'#ffdc99',
					],
				})
			},
			drawLine(data) {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('study'))
				// 绘制图表
				myChart.setOption({
					color: ['#fdd5c9'],
					grid: {
						top: '5%',
						left: '3%',
						right: '0%',
						bottom: '5%',
						containLabel: true,
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c}',
					},
					xAxis: [{
						type: 'category',
						data: ['大专', '本科', '硕士', '博士'],
						axisTick: {
							alignWithLabel: true,
						},
					}, ],
					yAxis: [{
						type: 'value',
						minInterval : 1
					}, ],
					series: [{
						name: '教育程度',
						type: 'bar',
						barWidth: '60%',
						data: data,
					}, ],
				})
			},
		}
	}
</script>
<style type="text/less" lang="less" scoped>
	.wrap {
		width: 100%;
		height: 100%;
		background: #F6F6F6;
		.wrapOne{
			height: calc(100% - 180px);
			overflow: scroll;
			}
			.personalInfo {
				width: 100%;
				height: 270px;
				background-image: url(../../../static/main/bg_01.png);
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				color: #FFFFFF;
				font-size: 24px;
				.avatar {
					width: 130px;
					height: 130px;
					border-radius: 50%;
					margin-left: 30px;
					margin-right: 35px;
					}
					.info {
						width: 520px;
						.name {
							font-size: 34px;
						}
            .info_f{
              font-size: 28px;
            }
						.rank {
							margin: 10px 0;
							display: flex;
              font-size: 28px;
							justify-content: flex-start;
							img {
								margin-left: 6px;
								margin-right: 6px;
								width: 36px;
								height: 36px;
								}

							}

						}

					}
					.remindDiv{
						padding: 0 30px;
						p{
							padding: 44px 30px 44px 50px;
							box-sizing: border-box;
							background: white;
							border-left-width: 10px;
							border-left-style: solid;
							border-top-left-radius: 10px;
							border-bottom-left-radius: 10px;
							span {
								color: #FF9834;
								}

							}
							p:first-child {
								margin-top: 20px;
								border-left-color: #6FB8FD;

							}
							p:nth-of-type(2) {
								 border-left-color: #F99774;
							}
							p:nth-of-type(3) {
								border-left-color: #DAD793;
							}
							p:nth-of-type(4) {
								border-left-color: #6FD4CE;
							}

						}
						.personalDetail {
							padding: 20px 30px;
							box-sizing: border-box;
							color: #666666;
							font-size: 30px;
							#study {
								width: 422px;
								height: 180px;
							}
							#time {
								width: 200px;
								height: 200px;
							}
							.statistics {
								box-sizing: border-box;
								background: white;
								.statisticsT{
									padding-left: 34px;
                  padding-top: 20px;
								}
								.firstLine {
									margin-top: 55px;
									display: flex;
									justify-content: flex-start;
									align-items: flex-end;
									padding-bottom: 44px;
									.line_left {
										width: 400px;
										text-align: center;
										margin-left: 58px;
										#gender {
											width: 128px;
											height: 128px;
											margin:0 auto;
											 /*background: lightcyan;*/
											 margin-bottom: 34px;
										}
										.picText {
											font-size: 24px;
											color: #333333;
										}
									}
									.line_right {
										width: 422px;
										text-align: center;
										.staff {
											width: 422px;
											height: 118px;
											border: 1px solid #F7F7F7;
											margin-bottom: 34px;
											display: flex;
											padding-top: 20px;
											padding-bottom: 20px;
											box-sizing: border-box;
											.box {
												flex: 1;
												font-size: 20px;
												color: #999999;
												border-right: 1px solid #F3F5F7;
												div:nth-of-type(1) {
													font-size: 36px; color: #3399FF;
												}
											}
											.box:last-child {
												border: none;
											}
										}
									}
								}
							}
						}
					}
</style>
