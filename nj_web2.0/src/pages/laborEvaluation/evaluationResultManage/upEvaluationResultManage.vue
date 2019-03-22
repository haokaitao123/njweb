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
          <FormItem :label="$t('lang_evaluation.evaluation.resEmpidDis1')" prop="resEmpidDis">
             <span @dblclick="dbHCompany">
               <Input v-model="upFormData.resEmpidDis" style="width: 100%" icon="search" :readonly="true" :placeholder="$t('lang_evaluation.evaluation.resEmpidDis1Ins1')"  @on-click="selectHCompany"/>
          </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_evaluation.evaluation.resProidDis')" prop="resProidDis">
          	<span @dblclick="clearUserid">
            	<Input :placeholder="$t('lang_evaluation.evaluation.resProidDisIns')" icon="search" :readonly="true" style="width: 100%" v-model="upFormData.resProidDis" @on-click="pickModelData"/>
           </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_evaluation.evaluation.resStime1')" prop="resStime">
            <DatePicker v-model="upFormData.resStime" style="width: 100%" type="date" :placeholder="$t('lang_evaluation.evaluation.resStime1Ins')"></DatePicker>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_evaluation.evaluation.resEtime1')" prop="resEtime">
            <DatePicker v-model="upFormData.resEtime" style="width: 100%" type="date" :placeholder="$t('lang_evaluation.evaluation.resEtime1Ins')"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_evaluation.evaluation.resYear1')" prop="resYear">
            <Input v-model="upFormData.resYear" :placeholder="$t('lang_evaluation.evaluation.resYear1Ins')"  ></Input>
          </FormItem>
          </Col>

        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_evaluation.evaluation.resNote')" prop="resNote">
            <Input v-model="upFormData.resNote" type="textarea" :placeholder="$t('lang_evaluation.evaluation.resNoteIns')"></Input>
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
      <searchModel v-show="openModel" @closeUpd="closeModel" @changeinputUpd="changeinputModel" ref="searchModel"></searchModel>
    </transition>
    <!--雇佣公司-->
    <transition name="fade">
      <searchHCompany v-show="openHCompany" @closeHCompany="closeHCompany" :searchHCClo="searchHCClo" @inputHCompany="inputHCompany" :params="paramsHCompany" ref="searchHCompany"></searchHCompany>
    </transition>
  </div>
</template>
<script>
	import searchModel from './searchModel'
  import searchHCompany from '../../../components/searchTable/searchHCompany'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        openHCompany: false,
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
           resYear: '',
        },
        //      雇佣公司
        searchHCClo: [
          {
            title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.compCnFullName'),
            key: 'unitFname',
          },
        ],
        paramsHCompany: {
          _mt: 'orgUnits.getByOrgFramePageList',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'desc',
          unitType: '01company',
          logType: '雇佣公司',
        },
        ruleValidate: {
          resEmpidDis: [
            { required: true, message: this.$t('lang_evaluation.evaluation.resEmpidDis1Ins1'), trigger: 'blur' },
          ],
          resProidDis: [
            { required: true, message: this.$t('lang_evaluation.evaluation.resProidDisIns'), trigger: 'blur' },
          ],
          resYear: [
            { required: true, message: this.$t('lang_evaluation.evaluation.resYear1Ins'), trigger: 'blur' },
          ],
          resStime: [
            { required: true, type: 'date', validator: this.validStartTime, trigger: 'change' },
          ],
          resEtime: [
            { required: true, type: 'date', message: this.$t('lang_evaluation.evaluation.resEtime1Ins'), trigger: 'change' },
          ],
        },
      }
    },
    components: {
    	searchModel,
      searchHCompany,
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
	          _mt: 'evaluationResult.getById',
	          logType: '查询单条数据',
	          id: id,
	        }).then((res) => {
	          if (isSuccess(res, t)) {
			        t.upFormData.id = res.data.content[0].id
			        t.upFormData.resEmpid = res.data.content[0].resEmpid
              t.upFormData.resProid = res.data.content[0].resProid
               t.upFormData.resYear = res.data.content[0].resYear
			        t.upFormData.resEmpidDis = res.data.content[0].resEmpidDis
			        t.upFormData.resProidDis = res.data.content[0].resProidDis
			        t.upFormData.resStime = res.data.content[0].resStime
			        t.upFormData.resEtime = res.data.content[0].resEtime
			        t.upFormData.resNote = res.data.content[0].resNote
	          }
	        }).catch(() => {
	          this.$Modal.error({
	            title: this.$t('reminder.err'),
	            content: this.$t('reminder.errormessage'),
	          })
	        })
        }
      },
      validStartTime(rule, value, callback) {
      	  let startTimeNum = (new Date(this.upFormData.resStime)).getTime()
  				let endTimeNum = (new Date(this.upFormData.resEtime)).getTime()
        if (!value) {
          return callback(new Error(this.$t('lang_evaluation.evaluation.resStime1Ins')))
        } else if (startTimeNum > endTimeNum) {
          return callback(new Error(this.$t('lang_evaluation.evaluation.resStime1Ins1')))
        } else {
	      		return callback()
	      	}
      },
      handleSubmit() {
        const t = this
        t.$refs.upFormData.validate((valid) => {
        	if (valid) {
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
        		data._mt = 'evaluationResult.addOrUpd'
        		data.logType = t.logType
        		data.resType = '02eval'
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
      // 方案
      closeModel() {
        const t = this
        t.openModel = false
      },
      changeinputModel(id, name) {
        const t = this
        t.upFormData.resProidDis = name
        t.upFormData.resProid = id
      },
      pickModelData() {
        const t = this
        t.$refs.searchModel.getData()
        t.openModel = true
      },
      clearUserid() {
        this.upFormData.resProidDis = ''
        this.upFormData.resProid = ''
      },
      //  	雇佣公司
      selectHCompany() {
        const t = this
        t.$refs.searchHCompany.getData(this.paramsHCompany)
        t.openHCompany = true
      },
      closeHCompany() {
        const t = this
        t.$refs.searchHCompany.unitCode = ''
        t.openHCompany = false
      },
      inputHCompany(name, id) {
        const t = this
        t.upFormData.resEmpidDis = name
        t.upFormData.resEmpid = id
      },
      dbHCompany() {
        const t = this
        t.upFormData.resEmpidDis = ''
        t.upFormData.resEmpid = ''
      },
      // 关闭
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
