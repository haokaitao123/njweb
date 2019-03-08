<template>
  <div class="table" >
    <Row >
      <Col span="24">
      <card style="margin: 0">
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_evaluation.evaluation.diagnosticAnalysis')}}
        </p>
        <Row style="overflow-x:scroll;overflow-y: hidden;  ">
          <div class="echats"  style="min-width:1088px;overflow-y: scroll;" :style="{height:tableheight + 'px'}">
            <i-col span="20" style="width: 33.333% !important;height: 600px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box" >
              <article style="height: 40px;line-height: 30px;border-bottom: 1px solid #ccc;">{{$t('lang_evaluation.evaluation.title1')}}</article>
              <div style="width: 100%;padding-top: 10px;padding-bottom: 20px;overflow:hidden">
              	<span style="padding:0;margin:0;display: inline-block;" class="fl_block1">
              		{{$t('lang_evaluation.evaluation.resYear')}}<Input v-model="year"  :placeholder="$t('lang_evaluation.evaluation.resYearIns')" style="margin-left:20px;width:150px;"></Input>
              	</span>
                	<Button type="primary" @click="search1" class="rt_block1">{{$t('button.ser')}}</Button>
			          <span @dblclick="clearPlanData" style="padding:0;display: inline-block;" class="fl_block2">
			                             {{$t('lang_evaluation.evaluation.planOfDiagnosis')}}<Input :placeholder="$t('lang_evaluation.evaluation.resEmpSchemeNameIns')" icon="search" :readonly="true" v-model="planOfDiagnosis" @on-click="pickPlanData" style="margin-left:20px;width: 150px;"/>
			          </span>

              </div>
              <companyOrderNum ref="companyOrderNum"></companyOrderNum>
            </i-col>
            <i-col span="20" style="width: 33.333% !important;height: 600px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              <article style="height: 40px;line-height: 30px;border-bottom: 1px solid #ccc;">{{$t('lang_evaluation.evaluation.title2')}}
</article>
              <div style="width: 100%;padding-top: 10px;padding-bottom: 20px;overflow:hidden">
              	<span @dblclick="clearDiagData" style="padding:0;margin:0;display: inline-block;" class="fl_block1">
              		{{$t('lang_evaluation.evaluation.resEmpidDis')}}<Input v-model="resEmpidDis"  :placeholder="$t('lang_evaluation.evaluation.resEmpidDisIns1')" icon="search" :readonly="true" @on-click="pickDiagObject" style="margin-left:20px;width: 150px"></Input>
              	</span>
                 <Button type="primary" @click="search2" class="rt_block1">{{$t('button.ser')}}</Button>
			          <span  @dblclick="clearClasData" style="padding:0;display: inline-block;" class="fl_block2">
			                             {{$t('lang_evaluation.evaluation.indName2')}}<Input v-model="indName" :placeholder="$t('lang_evaluation.evaluation.indName2Ins')" icon="search" :readonly="true" @on-click="pickSecondaryClas" style="margin-left:20px;width: 150px;"/></Input>
			          </span>

              </div>
              <MonthCompanyOrderNum ref="MonthCompanyOrderNum"></MonthCompanyOrderNum>
            </i-col>
            <i-col span="20" style="width: 33.333% !important;height: 600px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              	<article style="height: 40px;line-height: 30px;border-bottom: 1px solid #ccc;">{{$t('lang_evaluation.evaluation.title3')}}
</article>
	              <div style="width: 100%; margin-top:10px;overflow:hidden">
	              	<span @dblclick="clearDiagData2" style="padding:0;margin:0;display: inline-block;" class="fl_block1">
	              		{{$t('lang_evaluation.evaluation.resEmpidDis2')}}<Input v-model="resEmpidDis2"  :placeholder="$t('lang_evaluation.evaluation.resEmpidDis2Ins')" icon="search" :readonly="true" @on-click="pickDiagObject2(2)" style="margin-left:20px;width: 150px"></Input>
	              	</span>
                   <Button type="primary" @click="search3" class="rt_block1">{{$t('button.ser')}}</Button>
				          <span  @dblclick="clearClasData2" style="padding:0;display: inline-block;" class="fl_block2">
				                              {{$t('lang_evaluation.evaluation.indName2')}}&nbsp;<Input v-model="indName2" :placeholder="$t('lang_evaluation.evaluation.indName2Ins')" icon="search" :readonly="true" @on-click="pickSecondaryClas2(2)" style="margin-left:20px;width: 150px"/></Input>
				          </span>
	              </div>
	              <div style="width: 100%;overflow:hidden">
	              	<span @dblclick="clearDiagData3" style="padding:0;display: inline-block;" class="fl_block2">
	              		{{$t('lang_evaluation.evaluation.resEmpidDis3')}}<Input v-model="resEmpidDis3"  :placeholder="$t('lang_evaluation.evaluation.resEmpidDis3Ins')" icon="search" :readonly="true" @on-click="pickDiagObject2(3)" style="margin-left:20px;width: 150px"></Input>
	              	</span>

				          <span  @dblclick="clearClasData3" style="padding:0;display: inline-block;" class="fl_block2">
				                              {{$t('lang_evaluation.evaluation.indName2')}}&nbsp;<Input v-model="indName3" :placeholder="$t('lang_evaluation.evaluation.indName2Ins')" icon="search" :readonly="true" @on-click="pickSecondaryClas2(3)" style="margin-left:20px;width: 150px"/></Input>
				          </span>

	              </div>

                    <div style="width:320px;height:320px;margin:40px auto 0px ;padding:28px 0 0px 54px;background-image: url(../../../../../static/img/r_011.png);background-position:-10px -80px;">
                         <div style="width:12px;line-height:12px;float:left;margin-top:-40px;margin-left:-45px;text-align:center;color:#198970;font-size:12px;">{{indName3}}</div>
                        <div v-for="(item,index) in tableData" :key="index" :class="{isActive:item.is_father}" style="float:left;width:45px;height:45px;border:1px solid #fff;background:#b9955a;box-sizing:border-box">
                            <p v-for="(ite,i) in item.children" :key="i" style="height:20px;line-height:20px;overflow:hidden;" :title='ite'>
                                {{ite}}
                            </p>
                        </div>
                        <div style="line-height：20px;float:right;text-align:right;margin-top:30px;color:#046fc1;font-size:12px;">{{indName2}}</div>
                    </div>

            </i-col>
          </div>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
    	<planModule v-show="openPlan" @closePlan="closePlan" @changeinputPlan="changeinputPlan" ref="planModule"></planModule>
    </transition>
    <transition name="fade">
    	<diagObject v-show="openDiag" @closeDiag="closeDiag" @changeinputDiag="changeinputDiag" ref="diagObject"></diagObject>
    </transition>

    <transition name="fade">
    	<diagObject2 v-show="openDiag2" @closeDiag="closeDiag2" @changeinputDiag="changeinputDiag2" ref="diagObject2"></diagObject2>
    </transition>
    <transition name="fade">
    	<secondaryClas v-show="openClas" :resEmpid="resEmpid" @closeClas="closeClas" @changeinputClas="changeinputClas" ref="secondaryClas"></secondaryClas>
    </transition>
    <transition name="fade">
    	<secondaryClas2 v-show="openClas2" :resEmpid2="resEmpid2" :resEmpid3="resEmpid3" @closeClas="closeClas2" @changeinputClas="changeinputClas2" ref="secondaryClas2"></secondaryClas2>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import planModule from './planModule'
  import diagObject from './diagObject'
  import diagObject2 from './diagObject2'

  import secondaryClas from './secondaryClas'
  import secondaryClas2 from './secondaryClas2'
  import companyOrderNum from './companyOrderNum'
  import MonthCompanyOrderNum from './MonthCompanyOrderNum'

  export default{
    data() {
      return {
        clasShow: false,
        clasShow2: false,
        clasShow3: false,
      	openPlan: false,
        openDiag: false,
        openDiag2: false,
        openClas: false,
        openClas2: false,
      	yuan: '',
      	year: '',
      	proId: '',
        indId: '',
        indId2: '',
        indId3: '',
        resEmpid: '',
        resEmpid2: '',
        resEmpid3: '',
        indName: '',
        indName2: '',
        indName3: '',
        resId1: '',
        resId2: '',
      	planOfDiagnosis: '',
        resEmpidDis: '',
        resEmpidDis2: '',
        resEmpidDis3: '',
        tableheight: document.body.offsetHeight - 200,

        tableData: [
                    {
                        x_line:'A',
                        y_line:'E',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'A',
                        y_line:'D',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'A',
                        y_line:'C',
                        children:[

                        ],
                        is_father:true
                    },
                     {
                        x_line:'A',
                        y_line:'B',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'A',
                        y_line:'A',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'B',
                        y_line:'E',
                        children:[],
                        is_father:true
                    },
                     {
                        x_line:'B',
                        y_line:'D',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'B',
                        y_line:'C',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'B',
                        y_line:'B',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'B',
                        y_line:'A',
                        children:[],
                        is_father:true
                    },
                    {
                        x_line:'C',
                        y_line:'E',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'C',
                        y_line:'D',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'C',
                        y_line:'C',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'C',
                        y_line:'B',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'B',
                        y_line:'A',
                        children:[],
                        is_father:true
                    },
                    {
                        x_line:'D',
                        y_line:'E',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'D',
                        y_line:'D',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'D',
                        y_line:'C',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'D',
                        y_line:'B',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'D',
                        y_line:'A',
                        children:[],
                        is_father:false
                    },
                    {
                        x_line:'E',
                        y_line:'E',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'E',
                        y_line:'D',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'E',
                        y_line:'C',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'E',
                        y_line:'B',
                        children:[],
                        is_father:false
                    },
                     {
                        x_line:'E',
                        y_line:'A',
                        children:[],
                        is_father:false
                    },
                ],
      }
    },
    components: {
      companyOrderNum,
      MonthCompanyOrderNum,
      planModule,
      diagObject,
      secondaryClas,
      diagObject2,
       secondaryClas2,
    },
    mounted() {
      this.search3()
      this.year=2018;
      this.planOfDiagnosis= this.$t('lang_evaluation.evaluation.planOfDiagnosisName')
      this.resEmpidDis=this.$t('lang_evaluation.evaluation.resEmpidDisName')
      this.indName=this.$t('lang_evaluation.evaluation.indNameName')
      this.resEmpidDis2=this.$t('lang_evaluation.evaluation.resEmpidDis2Name')
      this.indName2=this.$t('lang_evaluation.evaluation.indName2Name')
      this.resEmpidDis3=this.$t('lang_evaluation.evaluation.resEmpidDis3Name')
      this.indName3=this.$t('lang_evaluation.evaluation.indName3Name')
      this.proId='1013'
      this.indId='1020'
      this.resEmpid='1000'
      this.resId1='1021'
      this.resId2='1017'
      this.indId2='1021'
      this.indId3=='1020'
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
      	pickDiagObject2(num){
    		let t = this;
    		t.$refs.diagObject2.getData(num);
    		t.openDiag2 = true;
      },

    	pickSecondaryClas(){
    		let t = this;
    		t.$refs.secondaryClas.getData();
    		t.openClas = true;
      },
      pickSecondaryClas2(num){
    		let t = this;
    		t.$refs.secondaryClas2.getData(num);
    		t.openClas2 = true;
      },

    	search1(){
    		if("" != this.proId){
    			this.$refs.companyOrderNum.getData(this.year,this.proId);
    		}
    	},
    	search2(){
    		if("" != this.indId && ""!=this.resEmpid){
    			this.$refs.MonthCompanyOrderNum.getData(this.indId,this.resEmpid);
    		}
    	},
    	search3(){
        const t=this
        if(t.resId1==''||t.resId2==''||t.indId2==''||t.indId3==''){
          var resIds=1021+','+1017
          var indIds=1021+','+1020
        }else{
          var resIds=t.resId1+','+t.resId2
          var indIds=t.indId2+','+t.indId3
        }

        const data = {
        _mt: 'evaluationResult.analysisChart3',
        logType:'查询',
        resIds:resIds,
        indIds:indIds,
	      resType: '01eval',
        };
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            for(let j=0;j<t.tableData.length;j++){
              t.tableData[j].children=[]
            }
            if(res.data.content[0].value!=''&&res.data.content[0].value!=undefined){
              let dataList=res.data.content[0].value
              if(dataList!=[]){
                for(let i=0;i<dataList.length;i++){
                dataList[i]=eval('('+dataList[i]+')');
                if(dataList[i].name==t.resEmpidDis2){
                  dataList[i].name = this.$t('lang_evaluation.evaluation.result1')
                }else{
                  dataList[i].name = this.$t('lang_evaluation.evaluation.result2')
                }
                for(let j=0;j<t.tableData.length;j++){
                    if(dataList[i].x_line==t.tableData[j].x_line&&dataList[i].y_line==t.tableData[j].y_line){
                      t.tableData[j].children.push(dataList[i].name)
                      t.tableData[j].is_father=true
                    }
                }
              }
              }
            }

          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
    	},
    	closePlan(){
    		this.openPlan = false;
    	},
    	closeDiag(){
    		this.openDiag = false;
      },
      closeDiag2(){
    		this.openDiag2 = false;
    	},
    	closeClas(){
    		this.openClas = false;
      },
      closeClas2(){
    		this.openClas2 = false;
    	},
    	changeinputPlan(id,name){
	    	this.proId = id;
	    	this.planOfDiagnosis = name;
      },
      	changeinputDiag(id,name){
	    	this.resEmpid = id;
	    	this.resEmpidDis = name;
	    	if(this.resEmpid){
	    		this.clasShow= true;
	    	}
    	},
    	changeinputDiag2(id,name,resEmpid,num){
        if(num==2){
          this.resId1=id
          	this.resEmpid2 = resEmpid;
          this.resEmpidDis2 = name;
          if(this.resEmpid2){
            this.clasShow2 = true;
          }
        }else{
           this.resId2=id
          	this.resEmpid3 = resEmpid;
            this.resEmpidDis3 = name;
            if(this.resEmpid3){
              this.clasShow3 = true;
            }
        }
    	},
    	changeinputClas(id,name){
	    	this.indId = id;
	    	this.indName = name;
      },
      changeinputClas2(id,name,num){
	    	if(num==2){
          this.indId2 = id;
	    	 this.indName2 = name;
        }else{
          this.indId3 = id;
	    	this.indName3 = name;
        }
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
      clearDiagData2(){
    		this.resEmpid2 = '';
      	this.resEmpidDis2 = '';
      	this.clasShow2 = false;
      },
      clearDiagData3(){
    		this.resEmpid3 = '';
      	this.resEmpidDis3 = '';
      	this.clasShow3 = false;
    	},
    	clearClasData(){
    		this.indId = '';
      	this.indName = '';
      },
      	clearClasData2(){
    		this.indId2 = '';
      	this.indName2 = '';
      },
      	clearClasData3(){
    		this.indId3= '';
      	this.indName3 = '';
    	},
    }
  }
</script>
<style lang="scss" scoped>
  .table{
    height: 500px;
    .echats{
      // width:500px;
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
