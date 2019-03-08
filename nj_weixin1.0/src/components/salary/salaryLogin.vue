<template>
	<div>
		<div class="salary_login">
			<img class="salary_logo" src="../../../static/main/logo.png" />
			<div class="salary_pass">
				<span>薪资密码</span>
				<input type="password" v-model="password">
			</div>
			<input class="salary_sure" type="button" value="登录" @click="loginToSalary">
		</div>
		<div :class="{errorMeg:openSimple}">
			<error-tip :message="errorInfo" @closeSimpleDialog = "closeSimpleDialog"></error-tip>
		</div>
	</div>
</template>
<script>
	import {isSuccess} from '@/lib/util'
	import errorInfo from "@/components/errorInfo"
	import {getDataLevelUserLogin} from '@/axios/axios'
	export default{
		data(){
			return{
				password: "",
				errorInfo: "",
				openSimple: true
			}
		},
		mounted(){
			this.isLogin();
		},
		methods:{
			isLogin(){				
				const t = this;
				let params = {
		          _mt: "wxSalaryPwd.getUserPwd",
		          wxUserId: 1000,
		          userId: localStorage.getItem('bus_userid'),
		          busEmpid: localStorage.getItem('bus_empid'),
		          md5pwd: "",
		          oldPwd: ""
		      	};		      	
				getDataLevelUserLogin(params).then((res) => {
		          if (isSuccess(res, t)) {	
		          	let param = res.data.content[0].value;
		          	console.log(res.data.content[0].value)
		          	if(1 == param){
						this.$router.push({
				          path:'/setPassword'
				        })
		          	}
		          }
		       }).catch((res) => {
		          t.dialogMsg = res.data.stat.stateList[0].desc
		        })
			},
			loginToSalary(){
				const t = this;
				if(!t.password){
					t.errorInfo = "请输入密码",
		          	t.openSimpleDialog();
					return;
				}
				let params = {
		          _mt: "wxSalaryPwd.getUserPwd",
		          wxUserId: 1000,
		          userId: localStorage.getItem('bus_userid'),
		          busEmpid: localStorage.getItem('bus_empid'),
		          md5pwd: "",
		          oldPwd: md5(t.password)
		      	};
				getDataLevelUserLogin(params).then((res) => {
		          if (isSuccess(res, t)) {	
		          	let param = res.data.content[0].value;
		          	if(2 == param){
		          		t.$emit("toLoginFn");
		          	}else{
		          		t.errorInfo = "密码错误",
		          		t.openSimpleDialog();
		          	}
		          }
		       }).catch((res) => {
		          t.dialogMsg = res.data.stat.stateList[0].desc
		        })
			},
			openSimpleDialog: function(){	    	
			    this.openSimple = false;		    
		    },
		    closeSimpleDialog: function() {
				this.openSimple = true;
			}
		},
		components:{
			errorTip: errorInfo,
		}
	}

</script>

<style type="text/less" lang="less" scoped>
    .salary_login{
    	position: absolute;
    	text-align: center;
    	height: 100%;
    	width: 100%;
    	background-image: url(../../../static/main/bg.png);
    	background-size: 100% 100%;    	
    }
	.salary_logo{
		margin-top: 200px;
		width: 306px;
		height:74px;
	}
	.salary_pass{
		font-size: 36px;
		color: #666666;
		margin-top: 150px;
		input{
			width: 55%;
			border: 0;
			outline:none;
			margin-left: 20px;
			letter-spacing: 10px;	
			background-color: transparent;		
			border-bottom: 4px solid #93C5F8;			
		}
	}
	.salary_sure{
		border: 0;
		outline:none;
		margin-top: 150px;
		width: 80%;
		height: 86px;
		line-height: 86px;
		font-size: 36px;
		color: #fff;
		letter-spacing: 20px;
		background-color: #3399FE;
		border-radius: 5px;
	}
	.errorMeg {
		display: none;
	}
</style>