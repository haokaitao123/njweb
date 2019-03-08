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
          <FormItem :label="$t('lang_evaluation.evaluation.indName')" prop="indName">
            <Input v-model="upFormData.indName" :placeholder="$t('lang_evaluation.evaluation.indNameIns')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_evaluation.evaluation.indPidDis')" prop="indPidDis">
            <span @dblclick="clearNormalid">
              <Input v-model="upFormData.indPidDis" icon="search" :readonly="true" :placeholder="$t('lang_evaluation.evaluation.indPidDisIns')" @on-click="pickData"></Input>
	          </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
        	<Col span="10" offset="1">
          <FormItem :label="$t('lang_evaluation.evaluation.indOrder')" prop="indOrder">
            <Input v-model="upFormData.indOrder" :placeholder="$t('lang_evaluation.evaluation.indOrderIns')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_evaluation.evaluation.indModeDis')" prop="indMode">
          	<Select v-model="upFormData.indMode" :placeholder="$t('lang_evaluation.evaluation.indModeDisIns')">
              <Option :value="item.num" v-for="(item,index) in selectType" key="index">{{item.type}}</Option>
           </Select>
          </FormItem>
          </Col>
        </Row>
        <Row v-if="upFormData.indMode != 0">
        	<Col span="10" offset="1" v-if="upFormData.indMode == 1">
          <FormItem :label="$t('lang_evaluation.evaluation.indIden')" prop="indIden">
            <Input v-model="upFormData.indIden" :placeholder="$t('lang_evaluation.evaluation.indIdenIns')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1" v-if="upFormData.indMode == 2">
          <FormItem :label="$t('lang_evaluation.evaluation.indHighestscore')" prop="indHighestscore">
            <Input v-model="upFormData.indHighestscore" :placeholder="$t('lang_evaluation.evaluation.indHighestscoreIns')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
        	<Col span="21" offset="1">
          <FormItem :label="$t('lang_evaluation.evaluation.indExplain')" prop="indExplain">
            <Input v-model="upFormData.indExplain" type="textarea" :placeholder="$t('lang_evaluation.evaluation.indExplainIns')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_evaluation.evaluation.indNote')" prop="indNote">
            <Input v-model="upFormData.indNote" type="textarea" :placeholder="$t('lang_evaluation.evaluation.indNoteIns')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" style="margin-left: 8px" @click="handleReset">{{$t('button.cal')}}</Button>
              <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
    <transition name="fade">
      <searchIndPid v-show="openPick" :params="params" :searchCloumns="searchCloumns" @closeUp="close" @changeinput="changeinput" ref="searchIndPid"></searchIndPid>
    </transition>
  </div>
</template>
<script>
	import searchIndPid from './searchIndPid'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
      	openPick: false,
      	selectType: [
          {
            num: '0',
            type: this.$t('lang_evaluation.evaluation.not'),
          },
          {
            num: '1',
            type: this.$t('lang_evaluation.evaluation.one'),
          },
          {
            num: '2',
            type: this.$t('lang_evaluation.evaluation.two1'),
          },
      	],
        upFormData: {
        	id: '',
          indName: '',
          indPid: '',
          indPidDis: '',
          indOrder: '',
          indMode: '0',
          indIden: '',
          indHighestscore: '',
          indExplain: '',
          indNote: '',
        },
        ruleValidate: {
          indName: [
            { required: true, message: this.$t('lang_evaluation.evaluation.indNameIns'), trigger: 'blur' },
          ],
          indOrder: [
            { required: true, validator: this.displayNumber, trigger: 'blur' },
          ],
        },
        params: {
        	_mt: 'evaluationIndex.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          indType: '02eval',
          logType: this.$t('button.ser'),
        },
        searchCloumns: [
          {
            title: this.$t('lang_evaluation.evaluation.indName'),
            key: 'indName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_evaluation.evaluation.indExplain'),
            key: 'indExplain',
            sortable: 'custom',
          },
        ],
      }
    },
    components: {
	    searchIndPid,
    },
    props: {
      logType: String,
    },
    methods: {
      getData(id) {
        const t = this
        if(id){
	        getDataLevelUserLogin({
	          _mt: 'evaluationIndex.getById',
	          logType: '查询单条数据',
	          indType: '02eval',
	          id: id,
	        }).then((res) => {
	          if (isSuccess(res, t)) {
			        t.upFormData.id = res.data.content[0].id;
			        t.upFormData.indName = res.data.content[0].indName;
			        t.upFormData.indPidDis = res.data.content[0].indPidDis;
			        t.upFormData.indPid = res.data.content[0].indPid;
			        t.upFormData.indOrder = res.data.content[0].indOrder;
			        t.upFormData.indMode = res.data.content[0].indMode;
			        t.upFormData.indIden = res.data.content[0].indIden;
			        t.upFormData.indHighestscore = res.data.content[0].indHighestscore;
			        t.upFormData.indExplain = res.data.content[0].indExplain;
			        t.upFormData.indNote = res.data.content[0].indNote;
	          }
	        }).catch(() => {
	          this.$Modal.error({
	            title: this.$t('reminder.err'),
	            content: this.$t('reminder.errormessage'),
	          })
	        })
        }
      },
      displayNumber(rule, value, callback) {
        let reg = new RegExp('^[0-9]*$')
        if (!value) {
          return callback(new Error(this.$t('lang_evaluation.evaluation.notNull')))
        } else if (!reg.test(value)) {
          return callback(new Error(this.$t('lang_evaluation.evaluation.IsNum')))
        } else {
          return callback()
        }
      },
      handleSubmit() {
        const t = this;
        t.$refs.upFormData.validate((valid) => {
        	if(valid){
		        const data = deepCopy(t.upFormData);
		        data._mt = "evaluationIndex.addOrUpd";
		        data.indType =  '02eval';
		        data.logType = t.logType;
            if (t.logType === this.$t('button.add')) {
              delete data.id
            }
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
      clearNormalid() {
        this.upFormData.indPid = ''
        this.upFormData.indPidDis = ''
      },
      changeinput(id,name) {
        const t = this;
        t.upFormData.indPid = id;
        t.upFormData.indPidDis = name;
      },
      pickData() {
        const t = this;
        t.openPick = true;
        t.$refs.searchIndPid.getData();
      },
      handleReset() {
        this.$emit('closeUp')
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
