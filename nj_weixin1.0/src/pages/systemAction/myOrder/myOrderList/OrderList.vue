<!--选择工单类型-->
<template>
  <div class="workOrderWrap">
    <!--<head-title :title="title" :flag="true"></head-title>-->
    <div class="workOrderContent">
      <div class="workOrder_let">
        <div v-for="item,index in leftData" :key="index" class="workOrder_left_item" :class="{workOrder_left_item_selected : selectId == index}" @click="handleItem(item.id,index,item.contentDetail)">{{item.cmutKntypeName}}</div>

      </div>
      <div class="workOrder_right">
        <div v-for="item,index in this.contentDetail" :key="index" class="workOrder_right_item" @click="selectItem(item.id,item.cmutKntypeName)">{{item.cmutKntypeName}}</div>
      </div>
    </div>
  </div>
</template>
<script>
//  import headTitle from '../../../../components/headTitle.vue';
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  export default {
    name: 'workOrder',
    data() {
      return {
        title:"选择工单类型",
        selectId:0,
        contentDetail:[],
        leftData:[
          {
            id:0,
            content:"哈哈哈哈0",
            contentDetail:['lala1','lala2','lala3']
          },
          {
            id:1,
            content:"哈哈哈哈1",
            contentDetail:['xixi1','lala2','lala3']
          },
          {
            id:2,
            content:"哈哈哈哈2",
            contentDetail:['1','2','3','4','5']
          },
          {
            id:3,
            content:"哈哈哈哈3",
            contentDetail:[]
          },{
            id:4,
            content:"哈哈哈哈4",
            contentDetail:['78778787878878']
          },
        ]

      }
    },
    components:{
//      headTitle
    },
    created () {
      this.contentDetail = this.leftData[0].contentDetail;
      const t = this;
      const data = {
        _mt:'weiXinWorkorder.getOrderType',
        companyId:pubsource.companyId,
        userId: localStorage.getItem('bus_userid'),
        logType:'工单列表',
        woTypeBusiProp: '01consultation',
        woTypeParentId: '0',
      }
      getDataLevelUserLogin(data).then(res => {
        this.leftData = JSON.parse(res.data.content[0].value)
//        console.log(JSON.parse(res.data.content[0].value))
        this.handleItem(JSON.parse(res.data.content[0].value)[0].id,0)
      }).catch(err => {
        console.log(err)
      })
    },
    methods : {
      handleItem(id,index,detail) {
        this.selectId = index;
        const t = this;
        const data = {
          _mt:'weiXinWorkorder.getOrderType',
          companyId:pubsource.companyId,
          userId: localStorage.getItem('bus_userid'),
          logType:'工单列表',
          woTypeBusiProp: '01consultation',
          woTypeParentId: id,
        }
        getDataLevelUserLogin(data).then(res => {
          this.contentDetail = JSON.parse(res.data.content[0].value)
//          console.log(this.contentDetail)
        }).catch(err => {
          console.log(err)
        })
      },
      selectItem(id,name) {
        this.$router.push({
          path:'/submitOrder',
          query:{
            name: name,
            id: id
          }
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .workOrderWrap{
    width: 100%;
    height: 100%;
    .workOrderContent{
      width: 100%;
      height: calc(100% - 90px);
      overflow-y: scroll;
      display: flex;
      font-size: 28px;
      .workOrder_let{
        width: 237px;
        background-color: #EAEAEA;
        overflow-y: scroll;
        .workOrder_left_item{
          width: 100%;
          height: 68px;
          line-height: 68px;
          padding-left: 18px;
          box-sizing: border-box;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          overflow: hidden;
        }
        .workOrder_left_item_selected{
          background-color: white;
          border-left: 4px solid #FF9833;
        }
      }
      .workOrder_right{
        flex: 1;
        height: 100%;
        background-color: white;
        .workOrder_right_item{
          width: 100%;
          height: 68px;
          line-height: 68px;
          padding-left: 50px;
          box-sizing: border-box;
        }
      }
    }
  }

</style>

