<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card style="margin: 0">
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_evaluation.evaluation.evaluationAnalyReport')}}
        </p>
        <Row style="overflow-x:scroll;overflow-y: hidden;  ">
          <div class="echats"  style="min-width:1088px; overflow-y:scroll" :style="{height:tableheight + 'px'}">
            <i-col span="20" style="width: 33.333% !important;height: 600px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              <article style="height: 40px;line-height: 30px;border-bottom: 1px solid #ccc;">{{$t('lang_evaluation.evaluation.title4')}}</article>
              <div style="width: 100%;padding-top: 10px;padding-bottom: 20px;overflow:hidden">
              	<span style="padding:0;margin:0;display: inline-block;" class="fl_block1">
              		{{$t('lang_evaluation.evaluation.resYear1')}}<Input v-model="year"  :placeholder="$t('lang_evaluation.evaluation.resYear1Ins')" style="margin-left:20px;width: 150px"></Input>
              	</span>
                	<Button type="primary" @click="search1"  class="rt_block1">{{$t('button.ser')}}</Button>
			          <span @dblclick="clearPlanData" style="padding:0;display: inline-block;" class="fl_block2">
			                 {{$t('lang_evaluation.evaluation.resProidDis1')}}<Input :placeholder="$t('lang_evaluation.evaluation.resEmpSchemeNameIns1')" icon="search" :readonly="true" v-model="planOfDiagnosis" @on-click="pickPlanData" style="margin-left:20px;width: 150px"/>
			          </span>

              </div>
              <companyOrderNum ref="companyOrderNum"></companyOrderNum>
            </i-col>
            <i-col span="20" style="width: 33.333% !important;height: 600px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              <article style="height: 40px;line-height: 30px;border-bottom: 1px solid #ccc;">{{$t('lang_evaluation.evaluation.title5')}}</article>
              <div style="width: 100%;padding-top: 10px;padding-bottom: 20px;overflow:hidden">
              	<span @dblclick="clearDiagData" style="padding:0;margin:0;display: inline-block;" class="fl_block1">
              		{{$t('lang_evaluation.evaluation.resEmpidDis1')}}<Input v-model="resEmpidDis"  :placeholder="$t('lang_evaluation.evaluation.resEmpidDis1Ins1')" icon="search" :readonly="true" @on-click="pickDiagObject" style="margin-left:20px;width: 150px"></Input>
              	</span>
                <Button type="primary" @click="search2" class="rt_block1">{{$t('button.ser')}}</Button>
			          <span  @dblclick="clearClasData" style="padding:0;display: inline-block;" class="fl_block2">
			                              {{$t('lang_evaluation.evaluation.indName2')}}<Input v-model="indName" :placeholder="$t('lang_evaluation.evaluation.indName2Ins')" icon="search" :readonly="true" @on-click="pickSecondaryClas" style="margin-left:20px;width: 150px"/></Input>
			          </span>

              </div>
              <MonthCompanyOrderNum ref="MonthCompanyOrderNum"></MonthCompanyOrderNum>
            </i-col>
            <i-col span="20" style="width: 33.333% !important;height: 600px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              	<article style="height: 40px;line-height: 30px;border-bottom: 1px solid #ccc;">{{$t('lang_evaluation.evaluation.title6')}}</article>
	              <div style="width: 100%;padding-top: 10px;padding-bottom: 20px;overflow:hidden">
              	<span @dblclick="clearDiagData1" style="padding:0;margin:0;display: inline-block;" class="fl_block1">
              		{{$t('lang_evaluation.evaluation.resEmpidDis41')}}<Input v-model="resEmpidDis1"  :placeholder="$t('lang_evaluation.evaluation.resEmpidDis4Ins')" icon="search" :readonly="true" @on-click="pickDiagObject1" style="margin-left:20px;width: 150px;"></Input>
              	</span>
			          <Button type="primary" @click="search3" class="rt_block1">{{$t('button.ser')}}</Button>
              </div>
								<OrderClassNum ref="OrderClassNum"></OrderClassNum>

            </i-col>
          </div>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
    	<planModule v-show="openPlan" @closePlan="closePlan"  @changeinputPlan="changeinputPlan" ref="planModule"></planModule>
    </transition>
    <transition name="fade">
    	<diagObject v-show="openDiag" @closeDiag="closeDiag" @changeinputDiag="changeinputDiag" ref="diagObject"></diagObject>
    </transition>
    <transition name="fade">
    	<diagObject1 v-show="openDiag1" @closeDiag="closeDiag1" @changeinputDiag="changeinputDiag1" ref="diagObject1"></diagObject1>
    </transition>
    <transition name="fade">
    	<secondaryClas v-show="openClas" :resEmpid="resEmpid" @closeClas="closeClas" @changeinputClas="changeinputClas" ref="secondaryClas"></secondaryClas>
    </transition>


  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import planModule from './planModule'
  import diagObject from './diagObject'
  import diagObject1 from './diagObject1'
  import OrderClassNum from './OrderClassNum'
  import secondaryClas from './secondaryClas'
  import companyOrderNum from './companyOrderNum'
  import MonthCompanyOrderNum from './MonthCompanyOrderNum'

  export default{
    data() {
      return {
        clasShow: false,
      	openPlan: false,
        openDiag: false,
         openDiag1: false,
        openClas: false,
      	yuan: '',
      	year: '',
        proId1: '',
        indId: '',
        indId1: '',
        resEmpid: '',
        resEmpid1: '',
        indName: '',
        planOfDiagnosis: '',
        resEmpidDis: '',
        resEmpidDis1: '',
        tableheight: document.body.offsetHeight - 200,
        yearOfDiagnosis: '',
      }
    },
    components: {
      companyOrderNum,
      MonthCompanyOrderNum,
      planModule,
      diagObject,
      diagObject1,
      secondaryClas,
      OrderClassNum
    },
    mounted() {
      this.year=2018;
      this.planOfDiagnosis= this.$t('lang_evaluation.evaluation.zh1')
      this.resEmpidDis=this.$t('lang_evaluation.evaluation.zh2')
      this.indName=this.$t('lang_evaluation.evaluation.zh3')
      this.resEmpidDis1=this.$t('lang_evaluation.evaluation.zh4')
      this.proId1='1009'
      this.indId='1030'
      this.resEmpid='1000'
      this.resEmpid1='1016'
     this.search1()
      this.search2()
      this.search3()
    },
    computed: {
 		},
    methods: {
    	pickPlanData(){
    		let t = this;
    		t.$refs.planModule.getData();
    		t.openPlan = true;
    	},
    	pickDiagObject(){
    		let t = this;
    		t.$refs.diagObject.getData();
    		t.openDiag = true;
      },
      pickDiagObject1(){
    		let t = this;
    		t.$refs.diagObject1.getData();
    		t.openDiag1 = true;
    	},
    	pickSecondaryClas(){
    		let t = this;
    		t.$refs.secondaryClas.getData();
    		t.openClas = true;
      },


    	search1(){
    		if("" != this.proId1){
    			this.$refs.companyOrderNum.getData(this.year,this.proId1);
    		}
    	},
    	search2(){
    		if("" != this.indId && ""!=this.resEmpid){
    			this.$refs.MonthCompanyOrderNum.getData(this.indId,this.resEmpid);
    		}
      },
      search3(){
    		if( ""!=this.resEmpid1){
    			this.$refs.OrderClassNum.getData(this.resEmpid1);
    		}
    	},

    	closePlan(){
    		this.openPlan = false;
    	},
    	closeDiag(){
    		this.openDiag = false;
      },
     	closeDiag1(){
    		this.openDiag1 = false;
      },
    	closeClas(){
    		this.openClas = false;
      },

    	changeinputPlan(id,name){

          	this.proId1 = id;
	    	    this.planOfDiagnosis = name;

    	},
    	changeinputDiag(id,name){
	    	this.resEmpid = id;
	    	this.resEmpidDis = name;
	    	if(this.resEmpid){
	    		this.clasShow = true;
	    	}
      },
     changeinputDiag1(id,name){
	    	this.resEmpid1 = id;
	    	this.resEmpidDis1 = name;
      },
    	changeinputClas(id,name){
	    	this.indId = id;
	    	this.indName = name;
      },

    	clearPlanData(){
    		this.proId = '';
      	this.planOfDiagnosis = '';
      },
      clearDiagData(){
    		this.resEmpid = '';
      	this.resEmpidDis = '';
      	this.clasShow = false;
      },
       clearDiagData1(){
    		this.resEmpid1 = '';
      	this.resEmpidDis1 = '';
      },

    	clearClasData(){
    		this.indId = '';
      	this.indName = '';
      },


    }
  }
</script>
<style lang="scss" scoped>
  .table{
    height: 500px;
    .echats{
      width:100%;
      overflow-y: scroll;
      border:2px solid rgb(240, 240, 240);
    }
  }
  .ivu-card-body{
    padding-top: 0px;
  }
  .table-form{
    margin: 10px 0;
  }
  .ivu-card-head{
    padding: 0;
  }
  .ivu-tabs-bar{
    border:0 !important;
  }
  .margin-right-10{
    margin-right: 10px;
  }
  .colTree{
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
  }
  .divtree{
    padding-left: 10px;
    overflow: auto;
    border: 1px #efefef solid;
  }
  .fl_block1{
    width: 70%;
    float:left;
  }
  .fl_block2{
    width: 70%;float:left;margin-top:10px;
  }
  .rt_block1{
    float:right
  }
</style>
