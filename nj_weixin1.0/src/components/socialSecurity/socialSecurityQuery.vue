<template>
	<div>
		<div class="select_date">
			<el-date-picker v-model="startDate" type="month" placeholder="选择开始月" class="start_date"></el-date-picker>
			<el-date-picker v-model="endDate" type="month" placeholder="选择结束月" class="end_date"></el-date-picker>
			<span class="date_query" @click="queryData">查询</span>
		</div>
		<ul class="issue_ul">
			<li class="issue_li" v-for="item in issueList">
				<span class="issue_href" @click="toDetailPage(item)">明细</span>
				<ul>
					<li>
						<span class="issue_date">{{item.calcPeriod}}</span>
						<span class="issue_state" :style="{ color: item.activeColor }">{{item.calcStatus}}</span>
					</li>
					<li>
						<span class="issue_left">社保个人：</span>
						<span>{{item.siccempPersamt}}</span>
					</li>
					<li><span class="issue_left">个人补缴:</span>
						<span>{{item.siccempPersrpamt}}</span>
					</li>
					<li>
						<span class="issue_left">个人调整:</span>
						<span>{{item.siccempPersajamt}}</span>
					</li>
					<li>
						<span class="issue_left">个人合计：</span>
						<span>{{item.siccempPersttamt}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div :class="{errorMeg:openSimple}">
			<error-tip :message="errorInfo" @closeSimpleDialog = "closeSimpleDialog"></error-tip>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {isSuccess} from '@/lib/util'
	import {DatePicker} from 'element-ui'
	import {getDataLevelUserLogin} from '@/axios/axios'
	import errorInfo from "@/components/errorInfo"
	Vue.use(DatePicker)

	export default {
		data(){
			return{
				startDate: '',
				endDate: '',
				errorInfo: '',
				openSimple: true,
				issueList: []
			}
		},
		methods:{
			getQueryIssueData(){
				const t = this;
				t.startDate.getTime()
				let params = {
		          _mt: "wxEmpSihfInfo.getEmpSihfCalcList",
		          empGid: localStorage.getItem('bus_empGid'),
		          sdate: t.formater(t.startDate),
		          edate: t.formater(t.endDate)
		       	};
				getDataLevelUserLogin(params).then((res) => {
		          if (isSuccess(res, t)) {
		          	let data = JSON.parse(res.data.content[0].value);
		          	t.dataProcessing(data);
		          }
		       }).catch((res) => {
		          t.dialogMsg = res.data.stat.stateList[0].desc
		        })
			},
			queryData(){
				if(!this.startDate){
					this.errorInfo = "请输入开始月份";
					this.openSimpleDialog();
					return;
				}
				if(!this.endDate){
					this.errorInfo = "请输入结束月份";
					this.openSimpleDialog();
					return;
				}
				this.getQueryIssueData();
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
		        this.issueList = dataList;
        console.log(this.issueList)
			},
			formater(date){
				let shoudDate = "";
				let dataStr = date.getFullYear()+"-"+(date.getMonth() +1);
				if(dataStr.split("-")[1].length == 1){
					shoudDate = dataStr.split("-").join("0");
				}else{
					shoudDate = dataStr.split("-").join("");
				}
				return shoudDate;
			},
			toDetailPage(item){
			  console.log(item)
				this.$store.state.detail = [];
				this.$store.state.detail.push(item);
				this.$router.push({
		          path: "/mains/socialSecurityDetail"
		        })
			},
			openSimpleDialog: function(){
			    this.openSimple = false;
		    },
		    closeSimpleDialog: function() {
				this.openSimple = true;
			},
		},
		components:{
			errorTip: errorInfo,
		}
	}
</script>

<style type="text/less" lang="less" scoped>
	.select_date{
		height: 100px;
		line-height: 100px;
		background-color: #fff;
		border-bottom: 1px solid #ccc;
    position: absolute;
    width:100%;
	}
	.start_date{
		margin-left: 20px;
	}
	.end_date{
		margin-left: 20px;
	}
	.date_query{
		color: #3399FE;
		font-size: 30px;
    position: absolute;
    right: 20px;
	}
	.issue_ul{
    padding-top: 100px;
		color: #666666;
		list-style: none;
		height: 1234px;
		overflow-y: scroll;
		.issue_li{
			padding-top: 30px;
			padding-left: 40px;
			font-size: 28px;
			height: 360px;
			background-color: #fff;
			border-bottom: 1px solid #ccc;
			.issue_href{
				float: right;
				margin-right: 40px;
				margin-top: 16px;
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
				color: #3297FF;
			}
			.issue_state{
				font-size: 26px;
				margin-left: 10px;
			}
			.issue_left{
				display: inline-block;
				width: 26%;
			}
		}
	}
	.tip{
		width: 80%;
		height: 80px;
		line-height: 80px;
		font-size: 30px;
	}
	.errorMeg {
		display: none;
	}
</style>
