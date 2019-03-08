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
          <FormItem :label="$t('lang_evaluation.evaluation.resLevelDis')" prop="resLevel">
            <Select v-model="upFormData.resLevel" :placeholder="$t('lang_evaluation.evaluation.resLevelDisIns')">
              <Option :value="item.num" v-for="(item,index) in selectType" key="index">{{item.type}}</Option>
           </Select>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_evaluation.evaluation.resEmpidDis4')" prop="resEmpidDis">
            <Input v-model="upFormData.resEmpidDis" icon="search" :readonly="true" :placeholder="$t('lang_evaluation.evaluation.resEmpidDisIns4')" @on-click="pickUserId"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_evaluation.evaluation.proNote')" prop="resNote">
            <Input v-model="upFormData.resNote" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_evaluation.evaluation.proNoteIns')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
              <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
    <transition name="fade">
   	 	<evaluationObj v-show="openObj" @closeUp="closeObj" @changeinput="changeinputObj" ref="evaluationObj"></evaluationObj>
    </transition>
  </div>
</template>
<script>
	import evaluationObj from '../../../components/searchTable/searchPubEmp'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
      	openObj: false,
      	index: "",
      	logType: '',
        upFormData: {
        	id: '',
          resLevel: '',
          resEmpid: '',
          resEmpidDis: '',
          resNote: '',
        },
        selectType: [
        	{
        		type: this.$t('lang_evaluation.evaluation.sup'),
        		num: '0',
        	},{
        		type: this.$t('lang_evaluation.evaluation.same'),
        		num: '1',
        	},{
        		type: this.$t('lang_evaluation.evaluation.subo'),
        		num: '2',
        	}
        ],
        openPick: false,
        ruleValidate: {
          resLevel: [
            { required: true, message: this.$t('lang_evaluation.evaluation.resLevelDisIns'), trigger: 'blur' },
          ],
          resEmpidDis: [
            { required: true, message: this.$t('lang_evaluation.evaluation.resEmpidDis4Ins'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {
			evaluationObj,
    },
    methods: {
      getData(id,logType) {
        const t = this
        if(id){
        	t.logType = logType;
        	if(this.$t('button.add') == logType){
        		t.index = id;
        		return;
        	}
	        getDataLevelUserLogin({
	          _mt: 'evaluationRelation.getById',
	          logType: '查询单条数据',
	          id: id,
	        }).then((res) => {
	          if (isSuccess(res, t)) {
			        t.upFormData.id = res.data.content[0].id;
			        t.upFormData.resText = res.data.content[0].resText;
			        t.upFormData.resLevel = res.data.content[0].resLevel;
			        t.upFormData.resEmpid = res.data.content[0].resEmpid;
			        t.upFormData.resEmpidDis = res.data.content[0].resEmpidDis;
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
      handleSubmit() {
        const t = this;
        const data = deepCopy(t.upFormData)
        data._mt = "evaluationRelation.addOrUpd";
        data.logType = t.logType;
        if (t.logType == this.$t('button.add')){
        	data.id = "";
        	data.resPid = t.index;
        }
        t.$refs.upFormData.validate((valid) => {
        	if(valid){
	        	getDataLevelUserLoginNew(data).then((res) => {
		          if (isSuccess(res, t)) {
		          	t.handleReset();
		      	    if (t.logType == this.$t('button.add')) {
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
		              t.$emit('update')
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
			pickUserId(){
				let t = this;
				t.$refs.evaluationObj.getData();
				t.openObj = true;
			},
      closeObj(){
      	this.openObj = false;
      },
      changeinputObj(name, id){
      	this.upFormData.resEmpid = id;
      	this.upFormData.resEmpidDis = name;
      },
      handleReset() {
        this.$emit('closeUp')
        this.$refs.upFormData.resetFields()
      },
      clear(){
      	let t = this;
	t.upFormData.id = '';
        t.upFormData.resLevel = '';
        t.upFormData.resEmpid = '';
        t.upFormData.resEmpidDis = '';
        t.upFormData.resNote = '';
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
