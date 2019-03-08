<template>
	<div>
		<section class="salary_analysis">
			<article class="title">固定薪资构成分析</article>
			<div id="pieChart">
			</div>
		</section>
		<section class="salary_summary">
			<article class="title">年度薪资汇总</article>
			<div id="columChart" class="colum_chart">
			</div>
			<div class="colum_text">
				{{columYear}}年总收入：{{columValue}}元
			</div>
		</section>
		<section class="salary_base" v-if="baseList.length>0">
			<article class="title">
				薪资基本信息
				<span class="title_span" @click="toBasePage">查看</span>
			</article>			
			<div>
				<ul class="base_ul" v-for="item in baseList">					
					<li>
						<span class="base_left">职位级别：{{item.empsalbsAdminlevel}}</span>		
						<span class="base_right">薪资级别：{{item.empsalbsSalarylevel}}</span>		
					</li>
					<li>
						<span class="base_left">差旅级别：{{item.empsalbsTravellevel}}</span>		
						<span class="base_right">行政级别：{{item.empsalbsAdminlevel}}</span>			
					</li>
					<li>
						<span class="base_left">个税缴纳地：{{item.empsalbsTaxlocationDis}}</span>		
						<span class="base_right">薪资币种：{{item.empsalbsSalarycurrencyDis}}</span>			
					</li>
				</ul>
			</div>
		</section>
		<section class="salary_issue" v-if="issueList.length>0">
			<article class="title">
				薪资发放
				<span class="issue_more" @click="baseEmitFn()">更多</span>
			</article>			
			<div>
				<ul class="issue_ul">					
					<li class="issue_li" v-for="item in issueList">
						<span class="issue_href" @click="toDetailPage(item)">明细</span>						
						<ul>
							<li>
								<span class="issue_date">{{item.period}}</span>
								<span style="color:#F24E42">{{item.state}}</span>								
							</li>
							<li>
								<span class="issue_left">应发工资：</span>
								<span>{{item.pacemYfgz}}</span>
							</li>
							<li><span class="issue_left">免税额:</span> 
								<span>{{item.pacemMse}}</span> 
							</li>
							<li>
								<span class="issue_left">税前工资:</span>
								<span>{{item.pacemJsgz}}</span>
							</li>
							<li>
								<span class="issue_left">实发工资：</span>
								<span>{{item.pacemSfgz}}</span>
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
	import chartFn from "../../lib/echarts.js"
	import {getDataLevelUserLogin} from '@/axios/axios'
	export default {
		data(){
			return{	
				columYear: "",
				columValue: 0,
				pieData: {},
				columList: [],
				baseList: [],
				issueList:[]
			}
		},
		mounted() {
			this.getPieChartData();
			this.getColumChartData();
			this.getBaseData();
			this.getIssueData();			
		},
		methods: {
			getPieChartData(){
				const t = this;
				let params = {
		          _mt: "wxSalaryBase.getCurrSalary",
		          companyId: pubsource.companyId,
		          userId: localStorage.getItem('bus_userid'),
		          busEmpid: localStorage.getItem('bus_empid'),
		        };
		        t.pieData = {legendData:["暂无数据"],selected:{"暂无数据":true},seriesData:[{name:"暂无数据",value:"0"}]};
				getDataLevelUserLogin(params).then((res) => {
		          if (isSuccess(res, t)) {		          	
		          	let data = JSON.parse(res.data.content[0].value);		          	
		          	if(data.length == 0){
		          		chartFn(t.pieData,"pieChart");
		          		return;
		          	}
		          	t.pieDataProcessing(data);				          	
		          }else{
		          	chartFn(t.pieData,"pieChart");
		          	return;
		          }
		       }).catch((res) => {
		       	  chartFn(t.pieData,"pieChart");
		        })
			},
			getColumChartData(){
				const t = this;
				let params = {
		          _mt: "wxSalaryBase.getAllMonthSalary",
		          companyId: pubsource.companyId,
		          userId: localStorage.getItem('bus_userid'),
		          empWorkno: localStorage.getItem('bus_empWorkno'),
		       };
		        this.columYear = (new Date()).getFullYear();
		        t.columList = [0,0,0,0,0,0,0,0,0,0,0,0];
				getDataLevelUserLogin(params).then((res) => {
		          if (isSuccess(res, t)) {          	
		          	let data = JSON.parse(res.data.content[0].value);
		          	if(data.length==0){
		          		chartFn(t.columList,"columChart");		          		
		          		return;
		          	}
		          	t.columDataProcessing(res.data.content[0].value);
		          }else{
		          		chartFn(t.columList,"columChart");		          		
		          		return;
		          }
		       }).catch((res) => {
		       	  chartFn(t.columList,"columChart");	
		        })
			},
			getBaseData(){
				const t = this;
				let params = {
		          _mt: "wxSalaryBase.getSalaryList",
		          companyId: pubsource.companyId,
		          wxMobile: localStorage.getItem('wx_mobile'),
		          userId: localStorage.getItem('bus_userid'),
		          state: "",
		          busEmpid: localStorage.getItem('bus_empid'),
		          busEmpGid: localStorage.getItem('bus_empGid'),
		          busEmpWorkno: localStorage.getItem('bus_empWorkno')
		        };
		       	t.baseList = [];
				getDataLevelUserLogin(params).then((res) => {
		          if (isSuccess(res, t)) {
		          	let data = res.data.content[0];
		          	t.baseList.push(data); 
		          }
		      }).catch((res) => {
		      })
			},
			getIssueData(){
				const t = this;
				let params = {
		          _mt: "wxSalaryBase.getEmpAccount",
		          companyId: pubsource.companyId,
		          wxMobile: localStorage.getItem('wx_mobile'),
		          userId: localStorage.getItem('bus_userid'),
		          state: "",
		          busEmpid: localStorage.getItem('bus_empid'),
		          busEmpGid: localStorage.getItem('bus_empGid'),
		          busEmpWorkno: localStorage.getItem('bus_empWorkno')
		       };
				getDataLevelUserLogin(params).then((res) => {
		          if (isSuccess(res, t)) {
		          	let data = res.data.content[0].value;
		          	for(let i=0;i<data.length;i++){
		          		if(i<5){
		          			t.issueList.push(data[i])
		          		}
		          	}
		          }
		      }).catch((res) => {
		        })
			},
			columDataProcessing(data){
				this.columList = [];
				this.columValue = 0.00;
				this.columYear = "";
				data = JSON.parse(data);
                for(let key in data){
                	this.columYear = key.substring(0,4);
                	this.columValue += parseFloat(data[key]);                	
                	this.columList.push(this.numToString(parseFloat(data[key])));
                }
                this.columValue = this.numToString(this.columValue);
				chartFn(this.columList,"columChart");
			},
			numToString(numData){
				let numList = [];
				let numStr = "";
                numList = numData.toString().split(".");
                if(numList.length == 1){
                	numStr = numData.toString()+".00";
                }else{
                	numStr = numData.toFixed();
                }
                return numStr        	
			},
			pieDataProcessing(data){				
				let legendData = [];
	          	let selected ={};
	          	let seriesData = [];
				for(let i=0;i<data.length;i++){
	          		let map = {};
	          		legendData.push(data[i].empsaltmItemDis);
	          		selected[data[i].empsaltmItemDis] = true;
	          		map["name"] = data[i].empsaltmItemDis;
	          		map["value"] = data[i].empsaltmAmount;
	          		seriesData.push(map);
	           } 		            
				this.pieData = {};
				this.pieData["legendData"] = legendData;
				this.pieData["selected"] = selected;
				this.pieData["seriesData"] = seriesData;
				chartFn(this.pieData,"pieChart");		
			},
			baseEmitFn(){			
				this.$emit("baseEmitFn");
			},
			toBasePage(){
				this.$router.push({
		          path: "/mains/salaryBase"
		        })
			},
			toDetailPage(item){
				this.$store.state.detail = [];
				this.$store.state.detail.push(item);
				this.$router.push({
		          path: "/mains/salaryDetail"
		        })
			}
		}
	}
</script>

<style type="text/less" lang="less" scoped>
	.salary_analysis{ 
		color: #666666; 
		background-color: #fff; 
		article{ 
			text-indent: 40px; 
			font-size: 30px; 
			height: 100px; 
			line-height: 100px; 
			border-bottom: 1px solid #ccc; 
		} 
		div{ 
			height: 400px; 
		} 
	} 
	.salary_summary{ 
		margin-top: 20px; 
		color: #666666; 
		background-color: #fff; 
		article{ 
			text-indent: 40px; 
			font-size: 30px; 
			height: 100px; 
			line-height: 100px; 
			border-bottom: 1px solid #ccc; 
			} 
			.colum_chart{ 
				height: 340px; 
			}
			.colum_text{
				text-align: right;
				margin-right: 40px;
				height: 60px; 
				line-height: 60px; 
			}
		} 
		.salary_base{ 
			margin-top: 20px; 
			color: #666666; 
			background-color: #fff; 
			font-size: 28px;
			article{ 
				text-indent: 40px; 
				font-size: 30px; 
				height: 100px; line-height: 100px;
				border-bottom: 1px solid #ccc; 
			}
			.title_span{
				float: right;
				color: #359BFF;
				font-size: 28px;
				margin-right: 40px;
			} 
			div{ 
				height: 360px; 
				.base_ul{
					padding-top: 30px;
					list-style: none;
					li{
						width: 100%;
						height: 100px;
						line-height: 100px;
						.base_left{
							display: inline-block;
							width: 46%;
							margin-left: 40px;
						}
					}
				}
			} 			
		} 
		.salary_issue{ 
			margin-top: 20px; 
			color: #666666;
			font-size: 28px; 
			background-color: #fff; 
			article{ 
				text-indent: 40px; 
				font-size: 30px; 
				height: 100px; 
				line-height: 100px; 
				border-bottom: 1px solid #ccc; 
				.issue_more{
					color: #359BFF;
					float: right;
					font-size: 26px;
					margin-right: 40px; 
				}
			} 
			div{ 
				height: auto; 
			} 
			.issue_ul{
				list-style: none;									
				.issue_li{
					padding-top: 30px;
					padding-left: 20px;
					font-size: 28px;
					height: 360px;
					border-bottom: 1px solid #ccc; 
					.issue_href{
						float: right;
						margin-right: 40px;
						margin-top: 26px;
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
						height: 60px;
						line-height: 60px;
					}
					.issue_date{
						display: inline-block;
						width: 16%;
						color: #3297FF;
					}					
					.issue_left{
						display: inline-block;
						width: 26%;
					}					
				}			
			}
		}

</style>