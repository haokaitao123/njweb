<template>
	<div>
		<section class="socialSecurity_info">
			<div>
				<ul class="base_ul" v-for="item in baseList">
					<li>
						<span class="base_left" style="color: #3399FE;">{{item.calcPeriod}}</span>
						<span class="base_state" :style="{ color: item.activeColor }">{{item.calcStatus}}</span>
					</i>
					<li>
						<span class="base_left">社保个人</span>
						<span>{{item.siccempPersamt}}</span>
					</i>
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
			</div>
		</section>
		<section class="socialSecurity_pay">
			<article>险种明细</article>
			<div>
				<ul class="base_ul" v-for="item in insuranceDetailsList">
					<li class="base_item">
						<ul>
							<li>
								<span class="base_left">险种</span>
								<span>{{item.siccinsInsuranceDis}}</span>
							</li>
							<li>
								<span class="base_left">缴费类型</span>
								<span>{{item.siccinsCalctypeDis}}</span>
							</li>
							<li>
								<span class="base_left">个人缴纳比例(%)</span>
								<span>{{item.siccinsPersratio}}</span>
							</li>
							<li>
								<span class="base_left">个人缴纳金额</span>
								<span>{{item.siccinsPersamt}}</span>
							</li>
							<li>
								<span class="base_left">补缴/调整月份</span>
								<span>{{item.siccinsRpmonth}}/{{item.siccinsAjmonth}}</span>
							</li>
						</ul>
						<div class="base_bar"></div>
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
				baseList:this.$store.state.detail,
				insuranceDetailsList:[],
			}
		},
		mounted(){
			this.getsocialSecurityDetailData()
		},
		methods:{
			getsocialSecurityDetailData(){
				const t = this;
				let params = {
		          _mt: "wxEmpSihfInfo.getEmpSihfCalcInsList",
		          empcalId: t.$store.state.detail[0].id,
		        };
				getDataLevelUserLogin(params).then((res) => {
		          if (isSuccess(res, t)) {
		          	let data = JSON.parse(res.data.content[0].value);
		          	if(0 == data.length){
		          		return;
		          	}
		          	t.insuranceDetailsList = data;
		          }else{
		          	return;
		          }
		       	}).catch((res) => {
		        })
			}
		}
	}
</script>

<style type="text/less" lang="less" scoped>
	.socialSecurity_info{
		color: #666666;
		background-color: #fff;
		div{
			height: 340px;
			font-size: 28px;
			.base_ul{
				padding-top: 20px;
				list-style: none;
				li{
					width: 100%;
					height: 60px;
					line-height: 60px;
					.base_left{
						display: inline-block;
						width: 30%;
						margin-left: 40px;
					}
					.base_letter{
						letter-spacing: 60px;
					}
					.base_state{
						float: right;
						margin-right: 60px;
						font-size: 26px;
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
			border-bottom: 1px solid #ccc;
			background-color: #fff;
		}
		div{
			overflow-y: scroll;
			height: 874px;
			.base_ul{
				list-style: none;
				li:nth-child(1){
					padding-top: 0px;
				}
				li{
					font-size: 28px;
					padding-top: 20px;
					text-indent: 20px;
					ul{
						background-color: #fff;
						li{
							padding-top: 0px;
							padding-left: 0px;
							height:60px;
							line-height: 60px;
							.base_left{
								display: inline-block;
								width: 50%;
							}
						}
					}
					.base_bar{
						width: 100%;
						height: 20px;
					}
				}
			}
		}
	}
</style>
