<template>
	<div>
		<section class="base_scan">
			<ul class="scan_ul" v-for="item in baseList">					
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
		</section>
		<section class="table_ul">
			<ul class="base_table">					
				<li>
					<span class="cell_left">项目</span>		
					<span class="cell_center">金额</span>
					<span class="cell_right">生效日期</span>		
				</li>
				<li v-for="item in tableData">
					<span class="cell_left">{{item.empsaltmItemDis}}</span>		
					<span class="cell_center">{{item.empsaltmAmount}}</span>			
					<span class="cell_right">{{item.empsaltmSdate}}</span>			
				</li>
			</ul>
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
				tableData: []
			}
		},
		mounted(){
			this.getBaseData();
			this.getPieData();
		},
		methods:{
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
		          t.dialogMsg = res.data.stat.stateList[0].desc
		        })
			},
			getPieData(){
				const t = this;
				let params = {
		          _mt: "wxSalaryBase.getCurrSalary",
		          companyId: pubsource.companyId,
		          userId: localStorage.getItem('bus_userid'),
		          busEmpid: localStorage.getItem('bus_empid'),
		       };
		        t.pieData = {};
				getDataLevelUserLogin(params).then((res) => {
		          if (isSuccess(res, t)) {
		          	let data = res.data.content[0].value;
		          	data = JSON.parse(data);
		          	for(let i=0;i<data.length;i++){
		          		let map = {};
		          		map["empsaltmItemDis"] = data[i].empsaltmItemDis;
		          		map["empsaltmAmount"] = data[i].empsaltmAmount;
		          		map["empsaltmSdate"] = data[i].empsaltmSdate;	
		          		t.tableData.push(map);		          		
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
	.base_scan{
		color: #666666; 
		background-color: #fff; 
		height: 300px;
		.scan_ul{
			padding-top: 30px;
			list-style: none;			
			font-size: 28px;
			li{
				width: 100%;
				height: 80px;
				line-height: 80px;
				.base_left{
					display: inline-block;
					width: 46%;
					margin-left: 40px;
				}
			}
		}
	}
	.table_ul{
		margin-top: 20px;
		color: #666666; 
		background-color: #fff;		
		.base_table{
			list-style: none;
			li:first-child{
				font-size: 28px; 
				border-bottom: 1px solid #ccc;
			}
			li{
				font-size: 24px; 
				height: 80px;
				line-height: 80px;
                .cell_left{
                	display: inline-block;
                	margin-left: 40px;
                	width: 40%;
                }
                .cell_center{
                	display: inline-block;
                	width: 28%;
                }
                .cell_right{
                	display: inline-block;
                	width: 22%;
                }
			}
		}
	}
</style>