<template>
	<div>
		<div class="maskDiv"></div>
		<div class="errorDiv">
			<p class="errorTitle">提示</p>
			<div class="errorContext">{{message}}</div>
			<input class="errorButt" type="button" value="确认" @click="closeSimpleDialog"/>
		</div>
	</div>
</template>
<script>
	export default {
		props:['message'],
		methods: {
		    closeSimpleDialog: function() {			    	
		    	this.$emit("closeSimpleDialog");
		    }
		}
	}
</script>

<style scoped>    
	.errorDiv{  	
    	padding: 0;
    	background-color: #fff;
		margin: 0 auto;
        top: calc(50% - 150px);
        padding: 20px;
        display: block;
        position: fixed;
        left: 0;
        right: 0;
        width: 75%;
        height: 300px;
        border-radius: 10px;
		-webkit-border-radius: 10px;
    }
    .maskDiv{ 
    	top: 0;
    	background: rgba(0,0,0,0.5);
    	display: block;
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;      
    }
    .errorTitle{
    	color: #494A4C;
    	height: 50px;
    	margin-top: 0px;
    	margin-left: 10px;
    	font-size: 38px;
    	letter-spacing:10px;
    	background-color: #fff;
    	border-top-left-radius: 10px;
    	border-top-right-radius: 10px;
    }
    .errorContext{
    	margin-left: 20px;
    	font-size: 32px;
    	word-break:break-all;
    	width: 94%;
    	height: 40%;
    	padding-top: 30px;
    }
    .errorButt{
    	width: 120px;
        height: 60px;
    	float: right;
    	bottom: 20px;
    	border: 0;
    	background-color: #409EFF;    	
        margin-right: 10px;
        top:10px;
        color: white;
        clear: both;
        font-size: 28px;
        border-radius: 10px;
		-webkit-border-radius: 10px;
    }      
</style>