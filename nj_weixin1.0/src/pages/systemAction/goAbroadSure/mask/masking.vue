<!---->
<template>
  <div class="leaveReason">
    <div class="demo">
      <h3>签证办理领区</h3>
      <ul v-for="item in dataList">
        <h3 @click="goBack(item.id,item.areaContryDis)">{{item.areaContryDis}}</h3>
        <li >{{item.areaScope}}</li>
      </ul>
      <img src="../../../../../static/action/remove.png" alt="" @click="close" class="close">
    </div>
  </div>
</template>
<script>
  import Bus from '@/lib/bus'
  import {isSuccess} from '@/lib/util'
  import {getDataLevelNone, getDataLevelUserLogin, getDataLevelNoneNew} from '@/axios/axios'
  export default {
    name: 'masking',
    data() {
      return {
        dataList:[]
      }
    },
    props:{
      areaContrys:Array
    },
    methods: {
      close() {
        this.$emit('close1')
      },
      goBack(id,name) {
        this.$emit('close1')
        Bus.$emit('close1',id,name)
      },
      getData(){
        const t = this
        const data = {
          _mt:'wxVisaPassport.getVisaArea',
          companyId:pubsource.companyId,
          userId: localStorage.getItem('bus_userid'),
          sort: 'id',
          order: 'asc',
          isValid: '1',
          areaContry: this.areaContrys[0].passDestination
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLogin(data).then(res => {
          this.dataList = JSON.parse(res.data.content[0].value)
          console.log(this.dataList)
        }).catch((err) => {
          console.log(11)
        })
      },
    },
  }
</script>
<style scoped lang="less" type="text/less">
  .demo {
    width: 80%;
    margin: auto;
    margin-top: 300px;
    background: white;
    padding: 20px 20px 20px 60px;
    border-radius: 10px;
    position: relative;
    overflow-y: scroll;
    height:500px;
    .close{
      position: absolute;
      right: 5px;
      width:40px;
      height: 40px;
      top: 5px;
    }
    .textStl{
    	width: 60%;
    	height: 60px;
    	font-size: 26px;
    	line-height: 60px;
    	outline: none;
    	border: 1px solid #ccc;
    	border-radius: 10px;
    }
    .textStl:hover{
    	border: 1px solid #00B2EE;
    }
    .buttonStl{
    	color: #fff;
    	float: right;
    	margin-right: 40px;
    	width: 100px;
    	height: 60px;
    	outline: none;
    	font-size: 26px;
    	border: 1px solid #ccc;
    	border-radius: 10px;
    	background-color: #00B2EE;
    }
    ul{
    	font-size: 30px;
    	li{
      height: 80px;
      line-height: 80px;
    }}

  }
  /*.demo li:hover{*/
    /*color: red;*/
    /*background: black;*/
  /*}*/
  .leaveReason{
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    left:0;
    background: black;
    z-index: 100;
    .reasonOne{
      position: absolute;
      top:150px;
      left: 20%;
    }
  }
</style>
