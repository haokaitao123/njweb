<template>
	<div>
		<section class="socialSecurity_info">
			<div>
				<ul class="base_ul" v-for="item in baseList">					
					<li>
						<span class="base_left">
							<span class="base_letter">公</span>司 :							
						</span>		
						<span class="base_right">{{item.emphfdHirecompanyDis}}</span>			
					</i>
					<li>
						<span class="base_left">公积金缴纳地：</span>			
						<span class="base_right">{{item.emphfdHfundlocatioDis}}</span>		
					</li>
					<li>
						<span class="base_left">公积金政策：</span>			
						<span class="base_right">{{item.emphfdHfundpolicyDis}}</span>		
					</li>
				</ul>	
			</div>
		</section>
		<section class="socialSecurity_pay">
			<article>险种明细</article>
			<div>
				<ul class="base_ul">					
					<li class="base_item" v-for="item in insuranceDetailsList">
						<ul>
							<li>
								<span class="base_left">险种</span>			
								<span>{{item.empinsInsuranceDis}}</span>
							</li>
							<li>
								<span class="base_left">基数</span>			
								<span>{{item.empinsBaseamt}}</span>
							</li>
							<li>
								<span class="base_left">个人缴纳比例(%)</span>			
								<span>{{item.empinsPersratio}}</span>
							</li>
							<li>
								<span class="base_left">个人缴纳金额</span>			
								<span>{{item.empinsPersamt}}</span>
							</li>
							<li>
								<span class="base_left">生效日期</span>			
								<span>{{item.empinsSdate}}</span>
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
				baseList:[],
				insuranceDetailsList:[]
			}
		},
		mounted(){
			this.getprovidentFundBaseData();
			this.getprovidentFundDetailData();
		},
		methods:{
			getprovidentFundBaseData(){
				const t = this;
				let params = {
		          _mt: "wxEmpSihfHfInfo.getEmpSihfInfo",
		          empId: localStorage.getItem('bus_empid'),
		       	};
				getDataLevelUserLogin(params).then((res) => {
		          if (isSuccess(res, t)) {	
		          	let data = JSON.parse(res.data.content[0].value);	          	
		          	if(data == null){
		          		return;
		          	}
		          	t.baseList.push(data);	
		          }else{
		          	return;
		          }
		       }).catch((res) => {
		        })
			},
			getprovidentFundDetailData(){
				const t = this;
				let params = {
		          _mt: "wxEmpSihfHfInfo.getEmpSihfInsuranceList",
		          empId: localStorage.getItem('bus_empid'),
		       	};
				getDataLevelUserLogin(params).then((res) => {
		          if (isSuccess(res, t)) {	
		          	let data = JSON.parse(res.data.content[0].value);	
		          	if(data == null){
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
						width: 30%;
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
			border-bottom: 1px solid #ccc;
			background-color: #fff; 
		} 
		div{
			height: 974px;
			overflow-y: scroll;
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
							.base_state{
								margin-left: 10px;
								font-size: 26px;
								color: #F54D42;
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