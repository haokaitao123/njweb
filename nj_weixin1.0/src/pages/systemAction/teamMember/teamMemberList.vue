<!--试用期自评-->
<template>
  <div class="wrap">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
    <div class="read">
      <div class="uread" @click="setEmpStatus">
        <span :class="{readColor:num == 1}" >{{curState}}</span>
        <img src="../../../.././static/action/01.png" alt="" v-if="isStatus">
        <img src="../../../.././static/action/03.png" alt="" v-else="isStatus">
		    <ul id="stateId" v-show="stateShow" class="list_state">
		    	<li @click="selectValue($event, item)" v-for="item in stateList">{{item.paramInfoCn}}</li>
		    </ul>
      </div>
      <div class="unread" @click="setSort">
        <span :class="{unreadColor:nums == 1}" >{{curSort}}</span>
        <img src="../../../.././static/action/01.png" alt="" v-if="isSort">
        <img src="../../../.././static/action/03.png" alt="" v-else="isSort">
        <ul id="sortId" v-show="sortShow" class="list_sort">
		    	<li @click="selectValue($event, item)" v-for="item in sortList">{{item.paramInfoCn}}</li>
		    </ul>
      </div>
    </div>
    <memberResume v-loading="isLoading" data-mu-loading-overlay-color="white" :styleShow="true"
                  style="position: relative; width: 100%;" :dataList="dataList" :noInfo="noInfo"></memberResume>
  </div>
</template>

<script>
  import headTitle from '../../.././components/headTitle.vue'
  import memberResume from './memberResume.vue'
  import {getDataLevelNone, getDataLevelUserLogin} from '../../.././axios/axios'
  import {isSuccess, strIsnull} from '@/lib/util'
  export default {
    name: "teamMemberList",
    data() {
      return {
      	stateShow: false,
      	sortShow: false,
      	switchFlag: true,
        isLoading: true,
        noInfo: false,
        title: '团队成员',
        flagImg: true,
        dataList: [],
        curState: "状态",
        curSort: "排序方式",
        stateList: [],
        sortList: [
          {paramCode: 'id', paramInfoCn: '排序方式'},
          {paramCode: 'empkiWorkno', paramInfoCn: '员工工号'},
          {paramCode: 'empcompEntrydate', paramInfoCn: '入职日期'},
          {paramCode: 'empBirthdate', paramInfoCn: '出生日期'},
        ],
        curEle: "",
        isStatus:false,
        isSort:true,
        num: 0,
        nums:0,
        memberStatus: '01active',
        sort: 'id',
      }
    },
    components: {
      headTitle,
      memberResume,
    },
    mounted() {
      this.getSelect()
      this.getData()
    },
    methods: {
      getData(){
        const t = this
        t.isLoading = true
        let params = {
          _mt: "weiXinTeamMember.getTeamMemberList",
          companyId: pubsource.companyId,
          memberStatus: t.memberStatus,
          busiId: localStorage.getItem('bus_empid'),
          sort: t.sort,
          order: 'asc'
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.dataList = JSON.parse(res.data.content[0].value)
            t.isLoading = false
            if (t.dataList.length === 0) {
              t.noInfo = true
            } else {
              t.noInfo = false
            }
          }
        }).catch((res) =>{
          console.error(res.data.desc)
        })
      },
      /**
       * 下拉框，获取员工状态
       */
      getSelect(){
        const t = this
        const data = {
          _mt:'weiXinRemind.getSelectValue',
          funId:'1',
          logType:'每次查询',
          typeCode:'empstatus'
        }
        getDataLevelUserLogin(data).then(res => {
          if (isSuccess(res, t)) {
            let json = JSON.parse(res.data.content[0].value)
            this.stateList = json[0].paramList.splice(0, 2)
            this.stateList.unshift({paramCode: 'id', paramInfoCn: '状态'})
            this.stateList.push({paramCode: '', paramInfoCn: '全部'})
          }

        }).catch((err) => {
          console.log(err)
        })
      },
    //设置参数 memberStatus
      setEmpStatus() {
      	this.switchFlag = true;
 	      this.getSelectData();
        if (this.isStatus) {
          this.num = 1;
          this.nums = 0;
          this.isSort = true
        } else {
          this.num = 0;
        }
        this.isStatus = !this.isStatus
      },
      //设置排序 memberStatus
      setSort() {
        this.switchFlag = false;
        this.getSelectData();
        if (this.isSort) {
          this.nums = 1;
          this.num = 0
          this.isStatus = true
        } else {
          this.nums = 0;
        }
        this.isSort = !this.isSort
      },
      getSelectData(){
        if(this.switchFlag){
          this.stateShow = !this.stateShow;
          this.sortShow = false
          if("状态" == this.curState){
            setTimeout(function(){
              let child = document.getElementById("stateId").childNodes[0];
              child.style.backgroundColor = "#3399FE"
            },0)
          }
        }else{
          this.sortShow = !this.sortShow;
          this.stateShow = false
          if("排序方式" == this.curSort){
            setTimeout(function(){
              let child = document.getElementById("sortId").childNodes[0];
              child.style.backgroundColor = "#3399FE";
            },0)
          }
        }

      },
      selectValue(e, item){
        if (item.paramInfoCn === '排序方式' || item.paramInfoCn === '状态') {
          return;
        }
      	let state = "";
      	if(this.switchFlag){
      		this.curState = e.target.innerText
	      	state = this.curState;
      		this.memberStatus = item.paramCode
          this.getData()
      	}else{
      		this.curSort = e.target.innerText
      		state = this.curSort;
      		this.sort = item.paramCode
          this.getData()
      	}
      	e.target.style.backgroundColor = "#3399FE"
      	let parent = e.target.parentNode.childNodes;
				for(let i=0; i<parent.length; i++){
      		if(state != parent[i].innerText){
      			parent[i].style.backgroundColor = "#fff"
      		}
      	}
      },
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../css/common_inform';
  .wrap{
    height:100%;
    overflow: hidden;
  }
  .list_state{
  	width: 300px;
  	z-index: 101;
  	list-style: none;
  	position: absolute;
  	margin-left: 40px;
  	background-color: white;
  	li{
  		height: 60px;
  		line-height: 60px;
  		font-size: 30px;
  		text-align: left;
  		text-indent: 50px;
  	}
    .li:hover{
      color: red;
    }
  }
  .list_sort{
  	width: 300px;
  	z-index: 101;
  	list-style: none;
  	position: absolute;
  	margin-right: 40px;
  	background-color: white;
  	li{
  		height: 60px;
  		line-height: 60px;
  		font-size: 30px;
  		text-align: left;
  		text-indent: 50px;
  	}
  }
</style>
