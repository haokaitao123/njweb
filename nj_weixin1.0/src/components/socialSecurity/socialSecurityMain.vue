<template>
	<div>
		<section class="socialSecurity_info">
			<article class="title">
				社保基本信息
				<span class="title_span" @click="toBasePage">查看</span>
			</article>
			<div>
				<ul class="base_ul" v-for="item in baseList">
					<li>
						<span class="base_left">
							<span class="base_letter">公</span>司 :
						</span>
						<span class="base_right">{{item.empbntHirecompanyDis}}</span>
					</i>
					<li>
						<span class="base_left">社保缴纳地：</span>
						<span class="base_right">{{item.empbntBenefitlocationDis}}</span>
					</li>
					<li>
						<span class="base_left">社保政策：</span>
						<span class="base_right">{{item.empbntBenefitpolicyDis}}</span>
					</li>
				</ul>
			</div>
		</section>
		<section class="socialSecurity_pay">
			<article>
				社保缴纳
				<span class="socialSecurity_more" @click="baseEmitFn">更多</span>
			</article>
			<div>
				<ul class="base_ul" v-for="item in detailList">
					<li class="base_item">
						<span class="issue_href" @click="toDetailPage(item)">明细</span>
						<ul>
							<li>
								<span class="base_date">{{item.calcPeriod}}</span>
								<span class="base_state" :style="{ color: item.activeColor }">{{item.calcStatus}}</span>
							</li>
							<li>
								<span class="base_left">社保个人：</span>
								<span>{{item.siccempPersamt}}</span>
							</li>
							<li>
								<span class="base_left">个人补缴：</span>
								<span>{{item.siccempPersrpamt}}</span>
							</li>
							<li>
								<span class="base_left">个人调整：</span>
								<span>{{item.siccempPersajamt}}</span>
							</li>
							<li>
								<span class="base_left">个人合计：</span>
								<span>{{item.siccempPersttamt}}</span>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</section>
	</div>
</template>

<script>
	import {isSuccess} from '@/lib/util'
	import {getDataLevelUserLogin} from '@/axios/axios'
	export default {
		data(){
			return{
				baseList: [],
				detailList: []
			}
		},
		mounted(){
			this.getsocialSecurityBaseData();
			this.getsocialSecurityDetailData();
		},
		methods:{
			getsocialSecurityBaseData(){
				const t = this;
				let params = {
		          _mt: "wxEmpSihfInfo.getEmpSihfInfo",
		          empId: localStorage.getItem('bus_empid'),
		       	};
				getDataLevelUserLogin(params).then((res) => {
		          if (isSuccess(res, t)) {
		          	let data = JSON.parse(res.data.content[0].value);
		          	if(null == data){
		          		return;
		          	}
		          	t.baseList.push(data);
		          }else{
		          	return;
		          }
		       }).catch((res) => {
		        })
			},
			getsocialSecurityDetailData(){
				const t = this;
				let year = (new Date()).getFullYear();
				let params = {
		          _mt: "wxEmpSihfInfo.getEmpSihfCalcList",
		          empGid: localStorage.getItem('bus_empGid'),
		          sdate: year+"01",
		          edate: year+"12"
		       	};
				getDataLevelUserLogin(params).then((res) => {
		          if (isSuccess(res, t)) {
		          	let data = JSON.parse(res.data.content[0].value);
		          	if(0 == data.length){
		          		return;
		          	}
		          	t.dataProcessing(data);
		          }else{
		          	return;
		          }
		       }).catch((res) => {
		        })
			},
			dataProcessing(data){
				let activeColor = "";
				let dataList = [];
				for(let i=0;i<data.length;i++){
	          		var map = {};
	          		map["id"] = data[i].id;
	          		map["calcPeriod"] = data[i].calcPeriod;
	          		if("05already sealed" == data[i].calcStatus){
	          			map["calcStatus"] = "已申报";
	          			activeColor = "#51A655"
	          		}else{
	          			map["calcStatus"] = "未申报";
	          			activeColor = "#F54D44"
	          		}
	          		map["siccempPersamt"] = data[i].siccempPersamt;
	          		map["siccempPersrpamt"] = data[i].siccempPersrpamt;
	          		map["siccempPersajamt"] = data[i].siccempPersajamt;
	          		map["siccempPersttamt"] = data[i].siccempPersttamt;
	          		map["activeColor"] = activeColor;
	          		dataList.push(map);
		        }
		        this.detailList = dataList;
			},
			toBasePage(){
				this.$router.push({
		          path: "/mains/socialSecurityBase"
		        })
			},
			baseEmitFn(){
				this.$emit("baseEmitFn");
			},
			toDetailPage(item){
				console.log(item)
				this.$store.state.socialSecurity = [];
				this.$store.state.socialSecurity.push(item);
				this.$router.push({
		          path: "/mains/socialSecurityDetail"
		        })
			}
		}
	}
</script>

<style type="text/less" lang="less" scoped>
	.socialSecurity_info{
		color: #666666;
		background-color: #fff;
		article{
			text-indent: 40px;
			font-size: 30px;
			height: 100px;
			line-height: 100px;
			border-bottom: 1px solid #ccc;
			.title_span{
				float: right;
				color: #359BFF;
				font-size: 28px;
				margin-right: 40px;
			}
		}
		div{
			height: 240px;
			font-size: 28px;
			.base_ul{
				padding-top: 30px;
				list-style: none;
				li{
					width: 100%;
					height: 60px;
					line-height: 60px;
					.base_left{
						display: inline-block;
						width: 25%;
						margin-left: 40px;
					}
					.base_letter{
						letter-spacing: 60px;
					}
				}
			}
		}

	}
	.socialSecurity_pay{
		margin-top: 20px;
		color: #666666;
		article{
			text-indent: 40px;
			font-size: 30px;
			height: 100px;
			line-height: 100px;
			background-color: #fff;
			border-bottom: 1px solid #ccc;
			.socialSecurity_more{
				color: #359BFF;
				float: right;
				font-size: 24px;
				margin-right: 40px;
			}
		}
		div{
			font-size: 28px;
			height: 874px;
			.base_ul{
				list-style: none;
				.base_item{
					padding-top: 30px;
					height: 360px;
					padding-left: 40px;
					background-color: #fff;
					border-bottom: 1px solid #ccc;
					.issue_href{
						float: right;
						margin-right: 40px;
						margin-top: 14px;
						color: #FF850E;
						display: inline-block;
						border: 2px solid #FF850E;
						width: 100px;
						height: 40px;
						line-height: 40px;
						border-radius:20px;
						text-align: center;
					}
					li{
						height:60px;
						line-height: 60px;
						.base_date{
							color: #3399FE;
						}
						.base_left{
							display: inline-block;
							width: 28%;
						}
						.base_state{
							margin-left: 10px;
							font-size: 26px;
						}
					}

				}
			}
		}
	}
</style>
