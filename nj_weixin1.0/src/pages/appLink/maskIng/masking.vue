<!---->
<template>
  <div class="leaveReason">
    <div class="demo">
    	<input v-if="types"  class="textStl" type="text" :placeholder="textTitle" v-model="value">
    	<input v-if="types" class="buttonStl" type="button" value="查询" @click="queryCityData">
      <ul >
        <li v-if="type == 1"  v-for="(item,index) in list" @click="sureValue(index)">{{item.countryCname}}</li>
        <li v-if="type == 2"  v-for="(item,index) in list" @click="sureValue(index)">{{item.countryCname}}</li>
        <li v-if="type == 3"  v-for="(item,index) in list" @click="sureValue(index)">{{item.cityName}}</li>
        <li v-if="type == 4"  v-for="(item,index) in list" @click="sureValue(index)">{{item.cityName}}</li>
        <li v-if="type == 5"  v-for="(item,index) in list" @click="sureValue(index)">{{item.countryCname}}</li>
        <li v-if="type == 6"  v-for="(item,index) in list" @click="sureValue(index)">{{item.cityName}}</li>
        <li v-if="type == 7"  v-for="(item,index) in list" @click="sureValue(index)">{{item.cityName}}</li>
        <li v-if="type == 8"  v-for="(item,index) in list" @click="sureValue(index)">{{item.countryCname}}</li>
        <li v-if="type == 9"  v-for="(item,index) in list" @click="sureValue(index)">{{item.bankCname}}</li>
        <li v-if="type == 10"  v-for="(item,index) in list" @click="sureValue(index)">{{item.bankCname}}</li>
        <li v-if="type == 11"  v-for="(item,index) in list" @click="sureValue(index)">{{item.paramInfoName}}</li>
        <li v-if="type == 12"  v-for="(item,index) in list" @click="sureValue(index)">{{item.paramInfoName}}</li>
        <li v-if="type == 13"  v-for="(item,index) in list" @click="sureValue(index)">{{item.paramInfoName}}</li>
        <li v-if="type == 14"  v-for="(item,index) in list" @click="sureValue(index)">{{item.paramInfoName}}</li>
        <li v-if="type == 15"  v-for="(item,index) in list" @click="sureValue(index)">{{item.paramInfoName}}</li>
        <li v-if="type == 16"  v-for="(item,index) in list" @click="sureValue(index)">{{item.paramInfoName}}</li>
        <li v-if="type == 17"  v-for="(item,index) in list" @click="sureValue(index)">{{item.paramInfoName}}</li>
        <li v-if="type == 18"  v-for="(item,index) in list" @click="sureValue(index)">{{item.paramInfoName}}</li>
        <li v-if="type == 19"  v-for="(item,index) in list" @click="sureValue(index)">{{item.paramInfoName}}</li>
        <li v-if="type == 20"  v-for="(item,index) in list" @click="sureValue(index)">{{item.paramInfoName}}</li>
        <!--<loadingList :loadingInfo="loadingInfo" @loadingListData = "loadingListData" ref="loadingList"></loadingList>-->
      </ul>
      <img src="../../../../static/action/remove.png" alt="" @click="close" class="close">
    </div>
  </div>
</template>
<script>
  import Bus from '../../../lib/bus'
  import {isSuccess} from '@/lib/util'
  import loadingList from '../../../components/loadingList'
  import {getDataLevelNone, getDataLevelUserLogin, getDataLevelNoneNew} from '@/axios/axios'
  export default {
    name: 'masking',
    data() {
      return {
      	value: '',
        textTitle: '',
        type:'',
        types:false,
        cityName: '',
        bankCname: '',
        rows:10,
        page: 1,
        list:[],
        pagingData: [],
        loadingInfo: {},
        PublicType:''
      }
    },
    created(){

    },
    props:{

    },
    methods: {
      sureValue(index){
        if(this.type == 1){
          Bus.$emit('rtnValue',this.list[index].id,this.list[index].countryCname, )
        } else if(this.type == 2){
          Bus.$emit('rtnValue2',this.list[index].id,this.list[index].countryCname)
        } else if(this.type == 3){
          Bus.$emit('rtnValue3',this.list[index].id,this.list[index].cityName)
        }else if(this.type == 4){
          Bus.$emit('rtnValue4',this.list[index].id,this.list[index].cityName)
        }else if(this.type == 5){
          Bus.$emit('rtnValue5',this.list[index].id,this.list[index].countryCname)
        }else if(this.type == 6){
          Bus.$emit('rtnValue6',this.list[index].id,this.list[index].cityName)
        }else if(this.type == 7){
          Bus.$emit('rtnValue7',this.list[index].id,this.list[index].cityName)
        }else if(this.type == 8){
          Bus.$emit('rtnValue8',this.list[index].id,this.list[index].countryCname)
        }else if(this.type == 9){
          Bus.$emit('rtnValue9',this.list[index].id,this.list[index].bankCname)
        }else if(this.type == 10){
          Bus.$emit('rtnValue10',this.list[index].id,this.list[index].bankCname)
        }else if(this.type == 11){
          Bus.$emit('rtnValue11',this.list[index].paramCode,this.list[index].paramInfoName)
        }else if(this.type == 12){
          Bus.$emit('rtnValue12',this.list[index].paramCode,this.list[index].paramInfoName)
        }else if(this.type == 13){
          Bus.$emit('rtnValue13',this.list[index].paramCode,this.list[index].paramInfoName)
        }else if(this.type == 14){
          Bus.$emit('rtnValue14',this.list[index].paramCode,this.list[index].paramInfoName)
        }else if(this.type == 15){
          Bus.$emit('rtnValue15',this.list[index].paramCode,this.list[index].paramInfoName)
        }else if(this.type == 16){
          Bus.$emit('rtnValue16',this.list[index].paramCode,this.list[index].paramInfoName)
        }else if(this.type == 17){
          Bus.$emit('rtnValue17',this.list[index].paramCode,this.list[index].paramInfoName)
        }else if(this.type == 18){
          Bus.$emit('rtnValue18',this.list[index].paramCode,this.list[index].paramInfoName)
        }else if(this.type == 19){
          Bus.$emit('rtnValue19',this.list[index].paramCode,this.list[index].paramInfoName)
        }else if(this.type == 20){
          Bus.$emit('rtnValue20',this.list[index].paramCode,this.list[index].paramInfoName)
        }
        Bus.$emit('removeShow');
        this.$store.commit('appOther/setPublicType','')
        this.value = ''
        this.cityName = ''
        this.bankCname = ''
        this.list = [];
      },
      queryCityData(){
      	this.list = [];

      	this.page = 1;
      	if (this.$store.state.appOther.PublicType == 'bank') {
          this.bankCname = this.value;
      	  this.bankNone()
        } else {
          this.cityName = this.value;
          this.citysNone();
        }
      },
      citysNone(){

      	let t = this;
        let data = {
          _mt:'weixinEmpFlowNewhire.baseCitygetPage',
          rows: t.rows,
          page: t.page,
          sort: 'id',
          order: 'asc',
          cityName: t.cityName,
          companyId: pubsource.companyId,
          cityType:  t.$store.state.appOther.PublicType,
          cityIsvalid: '1',
        }
        t.pagingData = [];
        getDataLevelNoneNew(data).then((res)=>{
        	t.pagingData = JSON.parse(res.data.content[0].value).rows;
          for(let i=0;i<t.pagingData.length;i++){
	          t.list.push(t.pagingData[i]);
	        }
        }).catch((err)=>{
          console.log(err)
        })
      },
      bankNone() {
        let t = this;
        let data = {
          _mt:'weixinEmpFlowNewhire.baseBankinfogetPage',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          companyId: pubsource.companyId,
          bankCname: t.bankCname,
        }
        getDataLevelNoneNew(data).then((res)=>{
          Bus.$emit('getSelectValue',JSON.parse(res.data.content[0].value).rows,9,'bank')
        }).catch((err)=>{
          console.log(err)
        })
      },
      close() {
        this.$emit('close')
      }
    },
    mounted(){
      Bus.$on('getSelectValue',(value,num,types)=>{
//        console.log(this.list)
//        console.log(types)
//        console.log(num)
        if (num === 3 || num === 6) {
            this.textTitle = '输入省份名称'
        }
        if (num === 4 || num === 7) {
          this.textTitle = '输入城市名称'
        }
        if (num === 9 || num === 10) {
          this.textTitle = '输入银行名称'
        }
        if (types === undefined) {
          console.log(value)
          this.list = value
          this.type = num
          if (value == 10) {
            this.types = true
          } else {
            this.types = false
          }
          return
        } if (types === 'bank') {
          this.list = value
          this.type = num
          this.$store.commit('appOther/setPublicType',types)
          this.types = true
          return
        } else {
          this.page = 1;
//          this.PublicType = types
          this.$store.commit('appOther/setPublicType',types)
          this.citysNone();
          this.types = true
          this.type = num
        }
      })
    },
    components:{
    	loadingList,
    }
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
    	overflow-y: scroll;
    	height:500px;
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
