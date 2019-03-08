<template>
	<div>
		<div class="loading-box" v-if="loading">
		    <mt-spinner type="snake" class="loading-more"></mt-spinner>
		    <span class="loading-more-txt">加载中...</span>
	 	</div>
	 	<div class="no-more" v-if="noMore">暂无数据</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				page: 1,				
				num: 0,
				noMore: false,
				loading: false,	
				loadingToPage: {}
			}
		},
		props:['loadingInfo'],
		methods:{
			loadMore() {
				let t = this;
				let pagingData = [];
				pagingData = t.loadingInfo.pagingData;
				if(t.num){
					if(t.num != t.loadingInfo.num){
						t.page = 0;
					}
				}			
				if(!t.loadingInfo.ajaxFlag){					
					return;
				}
				if(t.loadingInfo.isRefresh){					
					t.page = 0;
				}
				if(pagingData == undefined || pagingData.length==0){
					if(t.loadingInfo.isNoMore){
						return;
					}
					t.loadingInfo.isNoMore = true;
					t.loading = false;					
				  	t.noMore = true;
		  	    	setTimeout(() => {
						t.noMore = false;						
					}, 2000);	
					return;
				}
				t.loading = true;
				t.loadingInfo.ajaxFlag = false;
				t.loadingInfo.isRefresh = false;
				t.num = t.loadingInfo.num;
				console.log("page:"+t.page)
				t.page++;				  
				t.loadingToPage["page"] = t.page;
				t.loadingToPage["num"] = t.loadingInfo.num;								
			  	setTimeout(() => {
			  		t.$emit('loadingListData',t.loadingToPage);					  	
			    	t.loading = false;
			    	return;
			  	}, 500);
			},
		}

	}
</script>

<style lang="less" type="text/less" scoped>
  .loading-box{
	    padding:.1rem 0;
	    text-align:center; 
	    background-color: #fff;    
		.loading-more{
		  display:inline-block;
		  vertical-align: middle;
		  margin-right:20px;
		}
		.loading-more-txt{    	
		  vertical-align: middle;
		  font-size:30px;
		}
	}
	.no-more{
	  	height: 80px;
	  	line-height: 80px;
	  	font-size:28px;
	  	text-align: center;  
	  	background-color: #fff;	
	  }
</style>