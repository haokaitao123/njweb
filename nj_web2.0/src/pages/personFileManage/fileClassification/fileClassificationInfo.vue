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
          <FormItem :label="$t('lang_personalfile.fileClass.claNo')" prop="claNo">
            <Input v-model="upFormData.claNo" :placeholder="$t('lang_personalfile.fileClass.claNoDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_personalfile.fileClass.claName')" prop="claName">
            <Input v-model="upFormData.claName" :placeholder="$t('lang_personalfile.fileClass.claNameDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_personalfile.fileClass.claPid')" prop="claPidDis">
          	<span @dblclick="clearUserid">
          		<Input v-model="upFormData.claPidDis" icon="search" :readonly="true" :placeholder="$t('lang_personalfile.fileClass.claPidDis')" @on-click="pickData" />
          	</span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_personalfile.fileClass.claYesno')" prop="claYesno">
          	<RadioGroup v-model="upFormData.claYesno">
                <Radio label="1">{{$t('lang_personalfile.fileClass.yes')}}</Radio>
                <Radio label="0">{{$t('lang_personalfile.fileClass.no')}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_personalfile.fileClass.claNote')" prop="claNote">
            <Input v-model="upFormData.claNote" type="textarea" :placeholder="$t('lang_personalfile.fileClass.claNoteDis')"></Input>
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
      <searchClaPid v-show="openPick" :params="params" :searchCloumns="searchCloumns" @closeUp="close" @changeinput="changeinput" ref="searchClaPid"></searchClaPid>
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
          claName: '',
          claNo: '',
          claPid: '',
          claYesno: '0',
          claNote: '',
          claPidDis: '',
        },
        openPick: false,
        params: {
          _mt: 'archivesClassification.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          logType: '档案分类查询',
        },
        searchCloumns: [
          {
            title: this.$t('lang_personalfile.fileClass.claNo'),
            key: 'claNo',
            sortable: 'custom',
          },
 					{
            title: this.$t('lang_personalfile.fileClass.claName'),
            key: 'claName',
            sortable: 'custom',
          },
        ],
        ruleValidate: {
          claName: [
            { required: true, message: this.$t('lang_personalfile.fileClass.claNoDis'), trigger: 'blur' },
          ],
          claNo: [
            { required: true, message: this.$t('lang_personalfile.fileClass.claNameDis'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {
      searchClaPid,
    },
    props: {
      logType: String,
    },
    methods: {
      getData(id) {
        const t = this
        if (id) {
	        getDataLevelUserLogin({
	          _mt: 'archivesClassification.getById',
	          logType: '查询单条数据',
	          id: id,
	        }).then((res) => {
	          if (isSuccess(res, t)) {
			        t.upFormData.id = res.data.content[0].id;
			        t.upFormData.claName = res.data.content[0].claName;
			        t.upFormData.claNo = res.data.content[0].claNo;
			        t.upFormData.claPid = res.data.content[0].claPid;
			        t.upFormData.claYesno = res.data.content[0].claYesno;
			        t.upFormData.claNote = res.data.content[0].claNote;
			        t.upFormData.claPidDis = res.data.content[0].claPidDis;
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
        const t = this
        t.$refs.upFormData.validate((valid) => {
        	if (valid) {
		        const data = deepCopy(t.upFormData)
		        data._mt = 'archivesClassification.addOrUpd';
		        data.logType = t.logType
		        if (t.logType === this.$t('button.add')) {
		        	delete data.id
		        }
		        getDataLevelUserLoginNew(data).then((res) => {
		          if (isSuccess(res, t)) {
		          	t.handleReset()
		      	    if (t.logType === this.$t('button.add')) {
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
      clearUserid() {
      	this.upFormData.claPidDis = ''
      	this.upFormData.claPid = ''
      },
      close() {
        const t = this
        t.openPick = false
      },
      changeinput(id, name) {
        const t = this
        t.upFormData.claPid = id
        t.upFormData.claPidDis = name
      },
      pickData() {
        const t = this
        t.openPick = true
        t.$refs.searchClaPid.getData()
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
