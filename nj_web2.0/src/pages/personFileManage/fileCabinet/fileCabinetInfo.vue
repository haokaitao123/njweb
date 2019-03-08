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
          <FormItem :label="$t('lang_personalfile.fileCabinet.cabCenid')" prop="cabCenidDis">
          	<span @dblclick="clearRoomid">
            <Input v-model="upFormData.cabCenidDis" icon="search" :readonly="true" :placeholder="$t('lang_personalfile.fileCabinet.cabCenidDis')" @on-click="pickClassifData" ></Input>
            </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_personalfile.fileCabinet.cabNo')" prop="cabNo">
            <Input v-model="upFormData.cabNo" :placeholder="$t('lang_personalfile.fileCabinet.cabNoDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_personalfile.fileCabinet.cabName')" prop="cabName">
            <Input v-model="upFormData.cabName"  :placeholder="$t('lang_personalfile.fileCabinet.cabNameDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_personalfile.fileCabinet.cabNote')" prop="cabNote">
            <Input v-model="upFormData.cabNote" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_personalfile.fileCabinet.cabNoteDis')"></Input>
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
      <searchClaPid v-show="openPick"  @closeUp="close" @changeinput="changeinput" ref="searchClaPid"></searchClaPid>
    </transition>
  </div>
</template>
<script>
	import searchClaPid from './searchClaPid'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        upFormData: {
        	id: '',
          cabCenid: '',
          cabCenidDis: '',
          cabNo: '',
          cabNote: '',
          cabName: '',
        },
        openPick: false,

        ruleValidate: {
          cabCenidDis: [
            { required: true, message: this.$t('lang_personalfile.fileCabinet.cabCenidDis'), trigger: 'blur' },
          ],
          cabNo: [
            { required: true, message: this.$t('lang_personalfile.fileCabinet.cabNoDis'), trigger: 'blur' },
          ],
          cabName: [
            { required: true, message: this.$t('lang_personalfile.fileCabinet.cabNameDis'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      logType: String,
    },
    components: {
      searchClaPid,
    },
    methods: {
      getData(id) {
        const t = this
        if(id){
	        getDataLevelUserLogin({
	          _mt: 'archivesCabinet.getById',
	          logType: '查询单条数据',
	          id: id,
	        }).then((res) => {
	          if (isSuccess(res, t)) {
			        t.upFormData.id = res.data.content[0].id;
			        t.upFormData.cabCenid = res.data.content[0].cabCenid;
			        t.upFormData.cabCenidDis = res.data.content[0].cabCenidDis;
			        t.upFormData.cabNo = res.data.content[0].cabNo;
			        t.upFormData.cabName = res.data.content[0].cabName;
			        t.upFormData.cabNote = res.data.content[0].cabNote;
	          }
	        }).catch(() => {
	          this.$Modal.error({
	            title: this.$t('reminder.err'),
	            content: this.$t('reminder.errormessage'),
	          })
	        })
        }
      },
      pickClassifData(){
      	const t = this;
      	t.$refs.searchClaPid.getData();
      	t.openPick =true;
      },
      changeinput(id,name){
      	const t = this;
        t.upFormData.cabCenid = id;
        t.upFormData.cabCenidDis = name;
      },
      handleSubmit() {
        const t = this;
        const data = deepCopy(t.upFormData)
        data._mt = "archivesCabinet.addOrUpd";
        data.logType = t.logType;
        if (t.logType == this.$t('button.add')){
        	delete data.id;
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
      clearRoomid(){
      	this.upFormData.cabCenidDis = "";
      	this.upFormData.cabCenid = "";
      },
      close() {
        const t = this
        t.openPick = false
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
