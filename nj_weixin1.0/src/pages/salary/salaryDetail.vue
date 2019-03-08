<template>
	<div>
		<ul class="issueTitle_ul">					
			<li class="issue_li" v-for="item in issueList">									
				<ul>
					<li>
						<span class="issue_date">{{item.period}}</span>
						<span class="issue_state">{{item.state}}</span>								
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
		<ul class="table_ul">
			<li class="title_li">
				<span class="span_left">项目</span>
				<span>金额</span>
			</li>
			<li class="table_li">
				<ul>
					<li v-for="item in detailList">
						<span class="span_left">{{item.pacemimItem}}</span>
						<span>{{item.pacemimAmount}}</span>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	import {isSuccess} from '@/lib/util'
	import {getDataLevelUserLogin} from '@/axios/axios'
	export default {
		data(){
			return{
				detailList: [],
				issueList: this.$store.state.detail
			}
		},
		mounted(){
			this.getIssueData();
		},
		methods:{
			getIssueData(){
				const t = this;
				let params = {
		          _mt: "wxSalaryBase.getSalaryItem",
		          companyId: pubsource.companyId,
		          accountEmpId: t.$store.state.detail[0].id,
		          userId: localStorage.getItem('bus_userid')
		       };
				getDataLevelUserLogin(params).then((res) => {
		          if (isSuccess(res, t)) {
		          	let data = res.data.content[0].value;
		          	for(let i=0;i<data.length;i++){
		          		let map = {};
		          		map["pacemimAmount"] = data[i].pacemimAmount;		          		
		          		map["pacemimItem"] = data[i].pacemimItem;
		          		t.detailList.push(map);
		          	}		          			          	
		          }
		       }).catch((res) => {
		          t.dialogMsg = res.data.stat.stateList[0].desc
		        })
			}
		}
	}
</script>

<style type="text/less" lang="less" scoped>
	.issueTitle_ul{
		color: #666666; 
		background-color: #fff; 
		list-style: none;									
		.issue_li{
			padding-top: 30px;
			padding-left: 40px;
			font-size: 28px;
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
			.issue_state{
				color:#F24E42;
				float: right;
				margin-right: 40px;
			}					
			.issue_left{
				display: inline-block;
				width: 26%;
			}					
		}			
	}
	.table_ul{
		color: #666666; 
		background-color: #fff; 
		margin-top: 20px;
		list-style: none;
		.title_li{
			    height: 80px;
				line-height: 80px;
				text-indent: 20px;
				font-size: 28px;
				border-bottom: 1px solid #ccc;
		}
		.span_left{
			display: inline-block;
			width: 65%;
		}
		.table_li{
			height: 870px;
			overflow-y: scroll;
			ul{
				li{
					height: 80px;
					line-height: 80px;
					text-indent: 20px;
					font-size: 28px;			
				}	
				.span_left{
					display: inline-block;
					width: 65%;
				}				
			}
		}	
	}
</style>