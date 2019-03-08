<!--邀请人-->
<template>
  <div class="wrap">
    <!--<headeTitle :title="title" :flag="flagImg"></headeTitle>-->
    <nav>
      <span>选择联系人</span>
      <span></span>
    </nav>
      <section>
        <div class="div1">
          <mt-loadmore style="overflow-y: scroll"  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottomDropText="" bottomPullText=""  >
            <div class="avatar" v-for="(item,index) in data.rows" :key="index" >
              <div :class="{peopleColor : item.value === '1'}" ref="avatar" @click="goDetail(index,$event)">{{item.empCname}}</div>
            </div>
            <div class="loading-box">
              <mt-spinner type="snake" :type="0" v-show="loading"></mt-spinner>
              <div class="loading_text">{{text}}</div>
            </div>
          </mt-loadmore>
        </div>
        <!--<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" :topLoadingText="text" :bottomLoadingText="text">-->
        <!--</mt-loadmore>-->
      </section>
    <div class="PeopleList">
        <img src="../../../../static/date/box.png" class="ImageBox" @click='boxAdd' alt="">
      <div class="completeAll" @click="complete">完成</div>
      <div class="boxCircle">{{invitePeopleNum}}</div>
    </div>
    <div class="maskBox" v-show="maskBox" @click="hideBox">
      <div class="maskBoxList" ref="maskBoxList">
        <mu-chip class="demo-chip" v-for="chip, index in this.invPeopleAll" :key="index" color="primary" @delete="remove(index,$event)" delete>{{chip.empCname}}</mu-chip>
      </div>
    </div>
  </div>
</template>
<script>
  import headeTitle from '@/components/headTitle'
  import {getDataLevelNone, getDataLevelUserLogin, uploadFile} from '@/axios/axios'
  import {isSuccess, strIsnull} from '@/lib/util'
  export default {
    name: 'invitePeople',
    data() {
      return {
        title:'邀请参与人员',
        flagImg:true,
        sort: 'id',
        order: 'asc',
        page: '1',
        data: '',
        list:[],
        invPeople:[],
        invPeopleCount:[],
        invPeopleAll:[],
        allLoaded:false,
        loading: true,
        p:10,
        text: '上拉加载更多',
        boxFlag:true,
        maskBox:false,
        invitePeopleNum: 0,
        chips: ['primary', 'secondary', 'success', 'warning', 'info', 'error']
      }
    },
    mounted(){
      this.getData()
    },
    methods:{
      uniq(array){
        var temp = []; //一个新的临时数组
        for(var i = 0; i < array.length; i++){
          if(temp.indexOf(array[i]) == -1){
            temp.push(array[i]);
          }
        }
        return temp;
      },
      loadBottom: function(){
        this.$refs.loadmore.onBottomLoaded();
        this.loading = true
        this.text = '加载中'
        setTimeout(() =>{
          this.$store.state.dateList.peoRows += 10
          this.getData();
        },2500)
      },
      getData(){
        const t = this
        const data = {
          _mt: 'weiXinRemind.getEmpPage',
          sort: t.sort,
          order: t.order,
          rows: t.$store.state.dateList.peoRows,
          page: t.page,
          logType: '查询参与人员',
//          data: JSON.stringify(nowDate),
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
//            console.log(res)
            t.data =JSON.parse(res.data.content[0].value)
            console.log(t.data, '')
            for(let i = 0; i < t.data.rows.length; i++) {
              for (let j = 0; j < this.$store.state.InviteCount.length; j++) {
//                console.log(this.$store.state.InviteCount)
                if (this.$store.state.InviteCount[j] === t.data.rows[i].id) {
                  console.log(this.$store.state.InviteCount[j])
//                  t.data.rows[i].value = '1'
                  this.invPeopleCount.push(this.$store.state.InviteCount[j])
                  this.invPeople.push(this.$store.state.InviteName[j])
                  console.log(this.$store.state.invPeopleAll, '0000')
                  if (this.$store.state.invPeopleAll.length == 0) {
                    this.invPeopleAll.push(t.data.rows[i])
                  } else {
                    this.invPeopleAll.push(this.$store.state.invPeopleAll[j])
                  }
                }
              }
            }
            this.loading = false
            this.text = '上拉加载更多'
//            console.log(t.data.rows, '5555555555555555')
            let obj = {};
            let obj1 = {};

            this.invPeopleAll = this.invPeopleAll.reduce((cur,next) => {
              obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
              return cur;
            },[])
            console.log(this.invPeopleAll, '5555555555555555')
            this.invitePeopleNum = this.invPeopleAll.length
          }
        }).catch((err) =>{
          console.log(err)
        })
      },
      goDetail(index, e){
        if (e.target.className.indexOf('peopleColor') < 0) {
          e.target.className = 'peopleColor';
          if (this.invPeopleCount.indexOf(index) == -1) {
            this.invPeopleCount.push(this.data.rows[index].id);
            this.invPeople.push(this.data.rows[index].empCname);
            this.invPeopleAll.push(this.data.rows[index])
          }
        } else {
          e.target.className = '';
          this.invPeople.splice(this.invPeople.indexOf(index),1);
          this.invPeopleCount.splice(this.invPeopleCount.indexOf(index),1);
          this.invPeopleAll.splice(this.invPeopleAll.indexOf(index),1)
        }
        console.log(this.invPeople)
        console.log(this.invPeopleCount)
        console.log(this.invPeopleAll)
        let obj = {};
        this.invPeopleAll = this.invPeopleAll.reduce((cur,next) => {
          obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
          return cur;
        },[])
        this.invitePeopleNum = this.invPeopleAll.length
        console.log(this.invPeopleAll)
        this.$store.commit('InviteName',this.uniq(this.invPeople))
        this.$store.commit('InviteCount',this.uniq(this.invPeopleCount))
        this.$store.commit('InvPeopleAll',this.invPeopleAll)
      },
      complete() {
        this.$store.commit('dateList/setInvitTime', false)
        this.$store.commit('dateList/setpeoRows', this.$store.state.dateList.peoRows)
      },
      hideBox() {
        this.maskBox = false
        this.boxFlag = true
        this.$refs.maskBoxList.style.height = 0 + 'px'
      },
      boxAdd() {
        this.maskBox = true
        if (this.boxFlag) {
          let a = 0
          console.log(this.$refs.maskBoxList.style.height)
          var timer = setInterval(() => {
            a += 100
            if (a == 300) {
              clearInterval(timer)
            } else {
              this.$refs.maskBoxList.style.height = a + 'px'
            }
          },10)
          this.maskBox = true
        } else {
          let b = this.$refs.maskBoxList.offsetHeight
          this.$refs.maskBoxList.style.height = 0 + 'px'
          this.maskBox = false
        }
        this.boxFlag = !this.boxFlag

      },
      remove(index,e) {
        let avatarName = this.invPeopleAll[index].empCname
        console.log(avatarName)
        this.invPeopleAll.splice(index, 1)
        for(let i = 0; i < this.$refs.avatar.length; i++) {
          if (this.$refs.avatar[i].innerHTML === avatarName) {
            this.$refs.avatar[i].className = ''
          }
        }
        for (let j = 0; j < this.invPeople.length; j++) {
          if (this.invPeople[j] === avatarName) {
            this.invPeople.splice(j,1)
            this.invPeopleCount.splice(j,1)
          }
        }
        console.log(this.invPeople)
        console.log(this.invPeopleCount)
        console.log(this.invPeopleAll)
        this.invitePeopleNum = this.invPeopleAll.length
        this.$store.commit('InviteName',this.uniq(this.invPeople))
        this.$store.commit('InviteCount',this.uniq(this.invPeopleCount))
        this.$store.commit('InvPeopleAll',this.uniq(this.invPeopleAll))
      }
    },
    components:{
      headeTitle
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .wrap{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    nav{
      padding: 30px;
      box-sizing: border-box;
      border-bottom: 2px solid #f3f3f3;
      background: #f3f3f3;
      font-size: 28px;
      color: #999999;
      display: flex;
      justify-content: space-between;
    }
    section{
      width: 100%;
      height: calc(100% - 100px);
      overflow-y: scroll;
      .div1{
        height:100%;
        padding: 30px 30px 30px 60px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
      }
      .loading-box{
        width:180px;
        margin: 0 auto;
        position: relative;
        height: 100px;
      }
      .loading_text{
        position: absolute;
        bottom:0;
        left:-30px;
        text-align: center;
        width:80%;
      }
      .loadingText{
        width:100%;
        text-align: center;
      }
      .avatar{
        display: flex;
        align-items: center;
        font-size: 28px;
        margin-bottom: 30px;
        flex-wrap: wrap;
        margin-right: 30px;
        width:100px;
        height:100px;
        div{
          width:100%;
          height:100%;
          z-index: 100;
          img{
            border-radius: 50%;
            margin-right: 20px;
          }
        }
        div{
          width:100px;
          height:100px;
          background: #3399FF;
          border:2px solid #3399FF;
          border-radius: 50%;
          color: white;
          line-height: 100px;
          text-align: center;
        }
        .peopleColor{
          width:100px;
          height:100px;
          color: #3399FF;
          border:2px solid #3399FF;
          border-radius: 50%;
          background: white;
          line-height: 100px;
          text-align: center;
        }
      }
    }
    .PeopleList{
      position: absolute;
      bottom: 0;
      left:0;
      width:100%;
      background: white;
      height: 100px;
      text-align: right;
      z-index: 100;
      .boxCircle{
        position: absolute;
        top:10px;
        left:126px;
        width:30px;
        height:30px;
        background: #ff4081;
        border-radius: 50%;
        color: white;
        text-align: center;
        line-height: 30px;
      }
      .ImageBox{
        position: absolute;
        left:50px;
        top:0;
        width:100px;
        height:100px;
      }
      .completeAll{
        position: absolute;
        right: 50px;
        top:0;
        width:100px;
        height:100px;
        line-height: 100px;
        font-size: 34px;
      }
    }
    .maskBox{
      position: absolute;
      top: 0;
      left:0;
      width:100%;
      background: rgba(0,0,0,0.5);
      height: calc(100% - 100px);
      z-index: 200;
      .maskBoxList{
        position: absolute;
        bottom:0;
        left:0;
        height: 0;
        background: white;
        width:100%;
        overflow-y: scroll;
      }
      .demo-chip {
        margin: 8px;
        vertical-align: middle;
      }
    }
  }
</style>

