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
          <FormItem :label="$t('lang_evaluation.evaluation.proName')" prop="proName">
            <Input v-model="upFormData.proName" :placeholder="$t('lang_evaluation.evaluation.proNameIns')"></Input>
          </FormItem>
         </Col>
        </Row>
        <Row>
        	<Col span="21" offset="1">
          <FormItem :label="$t('lang_evaluation.evaluation.proExplain')" type="textarea" prop="proExplain">
            <Input v-model="upFormData.proExplain" type="textarea" :placeholder="$t('lang_evaluation.evaluation.proExplainIns')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_evaluation.evaluation.proNote')" prop="proNote">
            <Input v-model="upFormData.proNote" type="textarea" :placeholder="$t('lang_evaluation.evaluation.proNoteIns')"></Input>
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
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        upFormData: {
        	id: '',
          proName: '',
          proExplain: '',
          proNote: '',
        },
        openPick: false,
        ruleValidate: {
          proName: [
            { required: true, message: this.$t('lang_evaluation.evaluation.proNameIns'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {
    },
    props: {
      logType: String,
    },
    mounted() {
    },
    methods: {
      getData(id) {
        const t = this
        if (id) {
	        getDataLevelUserLogin({
	          _mt: 'evaluationPro.getById',
	          logType: '查询单条数据',
	          id: id,
	        }).then((res) => {
	          if (isSuccess(res, t)) {
			        t.upFormData.id = res.data.content[0].id;
			        t.upFormData.proName = res.data.content[0].proName;
			        t.upFormData.proExplain = res.data.content[0].proExplain;
			        t.upFormData.proNote = res.data.content[0].proNote;
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
        		data._mt = "evaluationPro.addOrUpd";
        		data.proType = '01eval';
        		data.logType = t.logType;
        		if (t.logType === this.$t('button.add')){
        			delete data.id;
        		}
		        getDataLevelUserLoginNew(data).then((res) => {
		          if (isSuccess(res, t)) {
		          	t.handleReset();
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
      close() {
        const t = this
        t.openPick = false
      },
      changeinput(name,ss,fd,fg,id) {
        const t = this
        t.upFormData.cenAdminDis = name;
        t.upFormData.cenAdmin = id;
      },
      pickData() {
        const t = this;
        t.$refs.searchPubUser.getData()
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
