<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="upFormData" :model="upFormData" :rules="ruleValidate" :label-width="135">
        <Row>
        	<Col span="10" offset="1">
          <FormItem label="诊断对象" prop="resEmpidDis">
            <Input v-model="upFormData.resEmpidDis" icon='search' :readonly="true" placeholder='请选择诊断对象' @on-click="pickEmpData"></Input>
          </FormItem>
         	</Col>
          <Col span="10" offset="1">
          <FormItem label="方案名称" prop="resProidDis">
          	<Input v-model="upFormData.resProidDis" icon='search' :readonly="true" placeholder="请选择方案名称" @on-click="pickModelData"/></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
        	<Col span="10" offset="1">
          <FormItem label="诊断开始时间" prop="resStime">
            <DatePicker v-model="upFormData.resStime" type="date" placeholder="请选择诊断开始时间"></DatePicker>
          </FormItem>
         </Col>
          <Col span="10" offset="1">
          <FormItem label="诊断结束时间" prop="resEtime">
          	<DatePicker v-model="upFormData.resEtime" type="date" placeholder="请选择诊断结束时间"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem label="备注" prop="resNote">
            <Input v-model="upFormData.resNote" type="textarea" placeholder="备注"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset">{{$t('button.cal')}}</Button>
              <Button type="primary" @click="handleSubmit" style="margin-left: 20px">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
    <transition name="fade">
      <searchModel v-show="openModel" @closeUpd="closeModel" @changeinputUpd="changeinputModel" ref="searchModel"></searchModel>
    </transition>
    <transition name="fade">
      <searchOrgUnit v-show="openPick" @closeUp="close" @changeinput="changeinput" ref="searchOrgUnit"></searchOrgUnit>
    </transition>
  </div>
</template>
<script>
	import searchModel from './searchModel'
	import searchOrgUnit from './searchOrgUnit'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
      	openPick: false,
        openModel: false,
        upFormData: {
        	id: '',
        	resEmpid: '',
        	resProid: '',
          resEmpidDis: '',
          resProidDis: '',
          resStime: '',
          resEtime: '',
          resNote: '',
        },
        ruleValidate: {
          resEmpidDis: [
            { required: true, message: "诊断对象不能为空", trigger: 'blur' },
          ],
          resProidDis: [
            { required: true, message: "方案名称不能为空", trigger: 'blur' },
          ],
          resStime: [
            { required: true, type: 'date', validator: this.validStartTime, trigger: 'change' },
          ],
          resEtime: [
            { required: true, type: 'date', message: "诊断结束时间不能为空", trigger: 'change' },
          ],
        },
      }
    },
    components: {
    	searchModel,
      searchOrgUnit,
    },
    props: {
      logType: String,
    },
    mounted() {
    },
    methods: {
      getData(id) {
        const t = this
        if(id){
	        getDataLevelUserLogin({
	          _mt: 'evaluationResult.getById',
	          logType: '查询单条数据',
	          id: id,
	        }).then((res) => {
	          if (isSuccess(res, t)) {
			        t.upFormData.id = res.data.content[0].id;
			        t.upFormData.resEmpid = res.data.content[0].resEmpid;
			        t.upFormData.resProid = res.data.content[0].resProid;
			        t.upFormData.resEmpidDis = res.data.content[0].resEmpidDis;
			        t.upFormData.resProidDis = res.data.content[0].resProidDis;
			        t.upFormData.resStime = res.data.content[0].resStime;
			        t.upFormData.resEtime = res.data.content[0].resEtime;
			        t.upFormData.resNote = res.data.content[0].resNote;
	          }
	        }).catch(() => {
	          this.$Modal.error({
	            title: this.$t('reminder.err'),
	            content: this.$t('reminder.errormessage'),
	          })
	        })
        }
      },
      validStartTime(rule, value, callback){
      	  let startTimeNum = (new Date(this.upFormData.resStime)).getTime();
  				let endTimeNum = (new Date(this.upFormData.resEtime)).getTime();
	      	if(!value){
	      		return callback(new Error("开始时间不能为空"));
	      	}else if(startTimeNum>endTimeNum){
	      		return callback(new Error("开始时间不能大于结束时间"));
	      	}else{
	      		return callback();
	      	}
      },
      handleSubmit() {
        const t = this;
        t.$refs.upFormData.validate((valid) => {
        	if(valid){
        		const data = deepCopy(t.upFormData)
        		if (data.resStime !== undefined && data.resStime !== '') {
		          data.resStime = new Date(data.resStime).format('yyyy-MM-dd')
		        } else {
		          data.resStime = ''
		        }
		        if (data.resEtime !== undefined && data.resEtime !== '') {
		          data.resEtime = new Date(data.resEtime).format('yyyy-MM-dd')
		        } else {
		          data.resEtime = ''
		        }
        		data._mt = "evaluationResult.addOrUpd";
        		data.logType = t.logType;
        		data.resType = '04eval';
        		if (t.logType == '新增'){
        			delete data.id;
        		}
		        getDataLevelUserLoginNew(data).then((res) => {
		          if (isSuccess(res, t)) {
		          	t.handleReset();
		      	    if (t.logType == '新增') {
		              t.$Modal.success({
		                title: this.$t('reminder.suc'),
		                content: this.$t('reminder.addsuccess'),
		              })
		              t.$refs.upFormData.resetFields()
		              t.$emit('getData', res.data.content[0])
		            } else {
		              t.$Modal.success({
		                title: this.$t('reminder.suc'),
		                content: this.$t('reminder.updsuccess'),
		              })
		              t.$emit('update', res.data.content[0])
		            }
		          }
		        }).catch(() => {
		          this.$Modal.error({
		            title: this.$t('reminder.err'),
		            content: this.$t('reminder.errormessage'),
		          })
		        })
        	}
        })
      },
      close() {
        const t = this
        t.openPick = false
      },
      closeModel(){
      	const t = this;
        t.openModel = false;
      },
      changeinput(name,id) {
        const t = this
        t.upFormData.resEmpidDis = name;
        t.upFormData.resEmpid = id;
      },
      changeinputModel(id,name){
      	const t = this
        t.upFormData.resProidDis = name;
        t.upFormData.resProid = id;
      },
      pickEmpData() {
        const t = this;
        t.$refs.searchOrgUnit.getData()
        t.openPick = true;
      },
      pickModelData(){
      	const t = this;
        t.$refs.searchModel.getData()
        t.openModel = true;
      },
      handleReset() {
        this.$emit('closeUpd')
        this.$refs.upFormData.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
	.cover{
	  position: fixed;
	  overflow: auto;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  z-index: 1000;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  background-color: rgba(0,0,0,.5);
	  -webkit-overflow-scrolling: touch;
	  outline: 0;
	  .box{
	    position:relative;
	    width: 900px;
	    background-color: #fff;
	    padding: 60px 20px 30px 20px;
	    border-radius: 10px;
	    .form{
	      max-height: 800px;
	      overflow-y: auto;
	    }
	    .title{
	      display: flex;
	      position: absolute;
	      height: 40px;
	      width: 100%;
	      line-height: 40px;
	      justify-content: space-between;
	      align-items: center;
	      padding-left: 20px;
	      top: 0;
	      border-bottom: 1px solid #efefef;
	      left: 0;
	      .title-text{
	        font-weight: bold;
	        font-size: 14px;
	      }
	    }
	  }
	}
</style>
