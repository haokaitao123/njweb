<!--政策制度-->
<template>
  <div class="wrap">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
    <div class="readUl" v-loading="isLoading">
      <div class="readUlAll" v-for="(item,index) in dataList">
        <div class="readUlTop">
          <div>{{item.cmutKldTitle}}</div>
          <div>{{item.cmutKldPublish.substring(0,11)}}</div>
        </div>
        <div class="readUlMiddle"  @click="goInformDetail(index)">
          <span>详情</span>
          <img src="../../../.././static/action/05.png" alt="">
        </div>
      </div>
    </div>
    <!--<div class="readList">-->
        <!--<div class="readListOne" v-for="(item,index) in dataList" @click="goInformDetail(index)">-->
          <!--<div>{{item.}}</div>-->
          <!--<div class="readListDate">-->
            <!--<div>{{item.cmutKldPublish.substring(0,11)}}</div>-->
            <!--<div class="Image">-->
              <!--<img src="../../../.././static/action/05.png" alt="">-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import headTitle from '../../.././components/headTitle.vue'
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'

    export default {
        name: "policySystem",
      data(){
        return{
          flagImg:true,
          title:'政策制度',
          dataList: [],
          isLoading:false,
          sort: 'id',
          order: 'asc',
          rows: '10',
          page: '1',
          knCode: '',
        }
      },
      components:{
        headTitle
      },
      mounted() {
        this.getRules()
      },
      created (){
//        this.getRules()
      },
      methods:{
        getRules() {
          const t = this
          const data = {
            _mt: 'wxKnowledge.getByRules',
//            sort: t.sort,
//            order: t.order,
//            rows: t.rows,
//            page: t.page,
            //logType: '查询消息',
            companyId: 1000,
            userId: localStorage.getItem('bus_userid'),
            knCode: '185',
          }
          getDataLevelUserLogin(data).then((res) => {
            if (isSuccess(res, t)) {
              console.log(res)
              t.dataList = JSON.parse(res.data.content[0].value)
              //t.subDataList.push(JSON.parse(res.data.content[0].value))
              console.log(t.dataList)
            }
          }).catch((err) =>{
            console.log(err)
          })
        },
        goInformDetail(index) {
          this.$router.push({
            path:'/policyDetails',
            query:{ cmutKldContent:this.dataList[index].cmutKldContent, cmutKldAuth: this.dataList[index].cmutKldAuth}
          })
        },
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
