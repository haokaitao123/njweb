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
          <FormItem :label="$t('lang_personalfile.archivesRoom.cenNo')" prop="cenNo">
            <Input v-model="upFormData.cenNo" :placeholder="$t('lang_personalfile.archivesRoom.cenNoDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_personalfile.archivesRoom.cenName')" prop="cenName">
            <Input v-model="upFormData.cenName" :placeholder="$t('lang_personalfile.archivesRoom.cenNameDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_personalfile.archivesRoom.cenAddress')" prop="cenAddress">
          	<Input v-model="upFormData.cenAddress" type="textarea" :placeholder="$t('lang_personalfile.archivesRoom.cenAddressDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_personalfile.archivesRoom.cenAdmin')" prop="cenAdminDis">
          	<span @dblclick="clearUserid">
          		<Input v-model="upFormData.cenAdminDis" icon="search" :readonly="true" :placeholder="$t('lang_personalfile.archivesRoom.cenAdminDis')" @on-click="pickData" />
          	</span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_personalfile.archivesRoom.cenAdminTel')" prop="cenAdminTel">
          	<Input v-model="upFormData.cenAdminTel" :placeholder="$t('lang_personalfile.archivesRoom.cenAdminTelDis')"/>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_personalfile.archivesRoom.cenAdminMail')" prop="cenAdminMail">
          	<Input v-model="upFormData.cenAdminMail" :placeholder="$t('lang_personalfile.archivesRoom.cenAdminMailDis')"/>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_personalfile.archivesRoom.cenNote')" prop="cenNote">
            <Input v-model="upFormData.cenNote" type="textarea" :placeholder="$t('lang_personalfile.archivesRoom.cenNoteDis')"></Input>
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
      <searchPubEmp v-show="openPick" @closeUp="close" @changeinput="changeinput" ref="searchPubEmp"></searchPubEmp>
    </transition>
  </div>
</template>
<script>
	import searchPubEmp from '../../../components/searchTable/searchPubEmp'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        upFormData: {
        	id: '',
          cenNo: '',
          cenName: '',
          cenAddress: '',
          cenAdmin: '',
          cenNote: '',
          cenAdminDis: '',
          cenAdminTel: '',
          cenAdminMail: '',
        },
        openPick: false,
        ruleValidate: {
          cenNo: [
            { required: true, message: this.$t('lang_personalfile.archivesRoom.cenNoDis'), trigger: 'blur' },
          ],
          cenName: [
            { required: true, message: this.$t('lang_personalfile.archivesRoom.cenNameDis'), trigger: 'blur' },
          ],
          cenAddress: [
            { required: true, message: this.$t('lang_personalfile.archivesRoom.cenAddressDis'), trigger: 'blur' },
          ],
          cenAdminDis: [
            { required: true, message: this.$t('lang_personalfile.archivesRoom.cenAdminDis'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {
      searchPubEmp,
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
	          _mt: 'archivesCenter.getById',
	          logType: '查询单条数据',
	          id: id,
	        }).then((res) => {
	          if (isSuccess(res, t)) {
			        t.upFormData.id = res.data.content[0].id;
			        t.upFormData.cenNo = res.data.content[0].cenNo;
			        t.upFormData.cenName = res.data.content[0].cenName;
			        t.upFormData.cenAddress = res.data.content[0].cenAddress;
			        t.upFormData.cenAdmin = res.data.content[0].cenAdmin;
			        t.upFormData.cenNote = res.data.content[0].cenNote;
			        t.upFormData.cenAdminDis = res.data.content[0].cenAdminDis;
			        t.upFormData.cenAdminTel = res.data.content[0].cenAdminTel;
			        t.upFormData.cenAdminMail = res.data.content[0].cenAdminMail;
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
        t.$refs.upFormData.validate((valid) => {
        	if(valid){
        		const data = deepCopy(t.upFormData)
        		data._mt = "archivesCenter.addOrUpd";
        		data.logType = t.logType;
        		if (t.logType == this.$t('button.add')) {
        			delete data.id;
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
      clearUserid(){
      	this.upFormData.cenAdminDis = '';
      	this.upFormData.cenAdmin = '';
      },
      close() {
        const t = this
        t.openPick = false
      },
      changeinput(name,id) {
        const t = this
        t.upFormData.cenAdminDis = name;
        t.upFormData.cenAdmin = id;
      },
      pickData() {
        const t = this;
        t.$refs.searchPubEmp.getData()
        t.openPick = true;
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
