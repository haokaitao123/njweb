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
    <div class="readUl" v-loading="isLoading">
      <div class="readUlAll" v-for="(item,index) in data">
        <div class="readUlTop">
          <div>{{item.apblTitlecn.substring(0,7)}}</div>
          <div>{{item.createTime}}</div>
        </div>
        <div class="readUlMiddle"  @click="goInformDetail(item.tbname,item.apblDataid,item.flowId,item.aprdBillid,item.aprvrelaStepid)">
          <span>详情</span>
          <img src="../../../.././static/action/05.png" alt="">
        </div>
      </div>
      <NoInfo v-show="NoInfoShow"></NoInfo>
    </div>
  </div>
</template>
<script>
  import headTitle from '../../.././components/headTitle.vue'
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  import loadingList from '../../../components/loadingList'
  import NoInfo from '../../../components/NoInfo.vue'
  export default {
    name: 'informNotice',
    data() {
      return {
      	loadingInfo:{},
      	pagingData: [],
        flagImg:true,
        NoInfoShow:false,
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
      this.getData(0)
    },
    methods:{

      getData(num) {
        const t = this
        const data = {
          _mt: 'weiXinTodo.getAllTodo',
          logType: '获取所有待办事项',
          roleType: '6essmss',
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
          	t.pagingData = res.data.content[0].value
//            alert(num)
            this.getDataList(t.pagingData,num)
//	          for(let i=0;i<t.pagingData.length;i++){
//		          t.data.push(t.pagingData[i]);
//		        }
          }
        }).catch((err) =>{
            console.log(err)
        })
      },
      getDataList (tokey,num) {
        const t = this
        const data = {
          _mt: 'weiXinTodo.queryGetAllTodo',
          logType: '查询所有待办事项返回',
          roleType: '6essmss',
          todoKey: tokey,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            t.pagingData = JSON.parse(res.data.content[0].value)
            t.isLoading = false
            console.log(t.pagingData.todoStatus)
            if (t.pagingData.todoStatus !== 100) {
              this.getDataList(tokey,num)
            } else {
//              this.data = JSON.parse(t.pagingData.todoList[0].todo_data)
              let data = JSON.parse(t.pagingData.todoList[0].todo_data)
              console.log(data)
              this.data = []
              for (let i = 0; i < data.length; i++) {
                if (num == 0) {
                  if (data[i].isRead == 0) {
                    this.data.push(data[i])
                  }
                } else if (num == 1){
                  if (data[i].isRead == 1) {
                    this.data.push(data[i])
                  }
                }
              }
              if (this.data == '') {
                this.NoInfoShow = true
              } else {
                this.NoInfoShow = false
              }
            }
          }
        }).catch((err) =>{
          console.log(err)
        })
      },
      linkToDetail(id) {
        const ID = id
        const nowDate = {
          noticereadMsgid: ID,
        }
        const data = {
          _mt: 'weiXinMsgrecord.addOrUpd',
          logType: '新增已读记录',
          data: JSON.stringify(nowDate),
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)){
            console.log(res)
          }
        }).catch((err) =>{
          console.log(err)
        })
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
      goInformDetail(tbname,apblDataid,flowId,aprdBillid,aprdStepid) {
        if(tbname == 'emp_flow_dimission') {
          this.$router.push({
            path:'/LeaveApproval',
            query:{
              Tbname:tbname,
              apId:apblDataid,
              flowId:flowId,
              aprdBillid:aprdBillid,
              aprdStepid:aprdStepid,
            }
          })
//          this.linkToDetail(this.data[index].id)
        } else if (tbname == 'emp_flow_internaltransfer') {
          this.$router.push({
            path:'/redeployApproval',
            query:{
              Tbname:tbname,
              apId:apblDataid,
              flowId:flowId,
              aprdBillid:aprdBillid,
              aprdStepid:aprdStepid,
            }
          })
        }

      },
    },
    components:{
      headTitle,
      NoInfo,
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
