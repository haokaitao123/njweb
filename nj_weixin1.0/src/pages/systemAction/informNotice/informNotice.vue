<!--通知公告-->
<template>
  <div class="wrap">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
    <div class="read">
      <div class="uread" @click="uread">
        <span :class="{readColor:num == 1}">未读</span>
        <img src="../../../.././static/action/01.png" alt="" v-if="read">
        <img src="../../../.././static/action/03.png" alt="" v-else="read">
      </div>
      <div class="unread" @click="unread">
        <span :class="{unreadColor:nums == 1}">已读</span>
        <img src="../../../.././static/action/01.png" alt="" v-if="Uread">
        <img src="../../../.././static/action/03.png" alt="" v-else="Uread">
      </div>
    </div>
    <!--<ul class="readUl" v-infinite-scroll="loadMore" infinite-scroll-distance="20">-->
    	<!--<li v-for="(item,index) in data" class="readLi" @click="goInformDetail(index)">-->
    		<!--<span class="span_title">{{item.msgTitle}}</span>-->
    		<!--<span class="span_middle">{{item.msgTime.substring(0,11)}}</span>-->
    		<!--<img class="span_right" src="../../../.././static/action/05.png" alt="">-->
    	<!--</li>-->
    	<!--<loadingList :loadingInfo="loadingInfo" @loadingListData = "loadingListData" ref="loadingList"></loadingList>-->
    <!--</ul>-->
    <div class="readUl" v-loading="isLoading">
      <div class="readUlAll" v-for="(item,index) in data">
        <div class="readUlTop">
          <div>{{item.cmutNoticeTitle}}</div>
          <div>{{item.cmutNoticePublish}}</div>
          <!--.substring(0,11)-->
        </div>
        <div class="readUlMiddle"  @click="goInformDetail(index)">
          <span>详情</span>
          <img src="../../../.././static/action/05.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import headTitle from '../../.././components/headTitle.vue'
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  import loadingList from '../../../components/loadingList'
  export default {
    name: 'informNotice',
    data() {
      return {
      	loadingInfo:{},
      	pagingData: [],
        flagImg:true,
        title:'通知公告',
        read:false,
        num:1,
        nums:0,
        Uread:true,
        isLoading:true,
        sort: 'id',
        order: 'asc',
        rows: '20',
        page: '1',
        data: [],
        list:''
      }
    },
    mounted() {
    	this.loadingInfo["num"] = 0;
      this.getData(0)
    },
    methods:{
      getData(num) {
        const t = this
        let nums = num
        const nowDate = {
          IsRead: nums,
        }
        const data = {
          _mt: 'weiXinMsgrecord.getPage',
          //baseMsgrecord.addBaseNoticeread
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          logType: '查询消息',
          data: JSON.stringify(nowDate),
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
          	t.pagingData = JSON.parse(res.data.content[0].value).rows;
	          for(let i=0;i<t.pagingData.length;i++){
		          t.data.push(t.pagingData[i]);
		        }
		        console.log(t.data)
            this.isLoading = false
		        t.loadingInfo["pagingData"] = t.pagingData;
		        t.loadingInfo["ajaxFlag"] = true;
		        t.loadingInfo["isRefresh"] = true;
        		t.loadingInfo["isNoMore"] = false;
          }
        }).catch((err) =>{
            console.log(err)
        })
      },
      loadingListData(data){
      	let t = this;
      	t.page = data.page;
      	t.getData(data.num);
      },
      loadMore(){
      	let t= this;
      	t.$refs.loadingList.loadMore();
      },
      goIndex() {
        this.$router.go(-1)
      },
      uread() {
        if (this.read) {
          this.isLoading = true
        	this.data = [];
          this.getData(0)
          this.num = 1;
          this.nums = 0;
          this.Uread = true;
          this.loadingInfo["num"] = 0;
        } else {
          this.num = 0;
        }
        this.read = !this.read
      },
      unread() {
        if (this.Uread) {
        	this.data = [];
          this.isLoading = true
          this.getData(1)
          this.nums = 1;
          this.num = 0
          this.read = true
          this.loadingInfo["num"] = 1;
        } else {
          this.nums = 0;
        }
        this.Uread = !this.Uread
      },
      goInformDetail(index) {
        this.$router.push({
          path:'/InformDetails',
          query:{ id:this.data[index].id }
        })
      },
    },
    components:{
      headTitle,
      loadingList
    }
  }
</script>
<style lang="less" type="text/less" scoped>
  @import '../../css/common_inform';
  .readUl{
  	list-style: none;
  	height: calc(100% - 110px);
  	overflow-y: auto;
    padding: 20px;
    width:100%;
    box-sizing: border-box;
    padding-top: 0;
    position: relative;
    .readUlAll{
      width:100%;
      background: white;
      margin-bottom: 20px;
      .readUlTop{
        width:100%;
        padding: 20px;
        border-bottom: 2px solid #f0f0f0;
        div:nth-of-type(1){
          font-size: 34px;
          color: #333;
          margin-bottom: 10px;
        }
        div:nth-of-type(2){
          font-size: 28px;
          color: #999;
        }
      }
      .readUlMiddle{
        width:100%;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 34px;
        img{
          height: 30px;
        }
      }
    }
  }

</style>
