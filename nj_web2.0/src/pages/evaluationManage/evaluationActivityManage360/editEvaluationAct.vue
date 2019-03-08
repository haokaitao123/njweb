<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="110">
        <i-col span="11">
        <FormItem :label="$t('lang_evaluation.evaluation.resEmpidDis1')" prop="resEmpidDis">
          <Input v-model="form.resEmpidDis" icon="search" :readonly="true" :placeholder="$t('lang_evaluation.evaluation.resEmpidDis1Ins')" @on-click="pickUserData"></Input>
        </FormItem>
      	</i-col>
        <i-col span="11" push="1">
          <FormItem :label="$t('lang_evaluation.evaluation.resYear1')" prop="resYear">
            <Input v-model="form.resYear" :placeholder="$t('lang_evaluation.evaluation.resYear1Ins')" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_evaluation.evaluation.resStime1')" prop="resStime">
          	<DatePicker v-model="form.resStime" style="width: 100%" type="date" :placeholder="$t('lang_evaluation.evaluation.resStime1Ins')"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11" push="1">
          <FormItem :label="$t('lang_evaluation.evaluation.resEtime1')" prop="resEtime">
          	<DatePicker v-model="form.resEtime" style="width: 100%" type="date" :placeholder="$t('lang_evaluation.evaluation.resEtime1Ins')"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_evaluation.evaluation.resTheme')" prop="resTheme">
          	<Input v-model="form.resTheme" :placeholder="$t('lang_evaluation.evaluation.resThemeIns')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" push="1">
          <FormItem :label="$t('lang_evaluation.evaluation.resProidDis1')" prop="resProidDis" >
						<Input v-model="form.resProidDis" icon="search" :readonly="true" :placeholder="$t('lang_evaluation.evaluation.resEmpSchemeNameIns1')" @on-click="pickPlanData"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_evaluation.evaluation.editorEva')" prop="resText">
          	<div id="editorEva"></div>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_evaluation.evaluation.resNote')" prop="resNote" >
						<Input v-model="form.resNote" type="textarea" :placeholder="$t('lang_evaluation.evaluation.resNoteIns')"></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
    <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    <transition name="fade">
   	 	<evaluationObj v-show="openObj" @closeUp="closeObj" @changeinput="changeinputObj" ref="evaluationObj"></evaluationObj>
    </transition>
    <transition name="fade">
   	 	<evaluationPlan v-show="openPlan" @closeUpd="closePlan" @changeinputUpd="changeinputPlan" ref="evaluationPlan"></evaluationPlan>
    </transition>
  </div>
</template>
<script>
	import E from 'wangeditor'
	import evaluationObj from '../../../components/searchTable/searchPubEmp'
	import evaluationPlan from './searchModel'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  let editor = new E('#editorEva')
  editor.customConfig.zIndex = 100
  editor.customConfig.menus = [
    'head',  // 标题
    'bold',  // 粗体
    'fontSize',  // 字号
    'fontName',  // 字体
    'italic',  // 斜体
    'underline',  // 下划线
    'strikeThrough',  // 删除线
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色
    'link',  // 插入链接
    'list',  // 列表
    'justify',  // 对齐方式
    'table',  // 表格
    'code',  // 插入代码
    'undo',  // 撤销
    'redo',  // 重复
  ]

  export default {
    data() {
      return {
      	openObj: false,
      	openPlan: false,
        form: {
          id: "",
          resEmpid: "",
          resProid: "",
					resEmpidDis: "",
					resYear: "",
					resStime: "",
					resEtime: "",
					resTheme: '',
					resText: '',
					resProidDis: "",
        },
        ruleValidate: {
          resEmpidDis: [
            { required: true, message: this.$t('lang_evaluation.evaluation.resEmpidDis1Ins'), trigger: 'blur' },
          ],
          resYear: [
            { required: true, message: this.$t('lang_evaluation.evaluation.resYear1Ins'), trigger: 'blur' },
          ],
          resStime: [
            { required: true, type: 'date', message: this.$t('lang_evaluation.evaluation.resStime1Ins'), trigger: 'change'},
          ],
          resEtime: [
            { required: true, type: 'date', message: this.$t('lang_evaluation.evaluation.resEtime1Ins'), trigger: 'change'},
          ],
          resProidDis: [
            { required: true, message: this.$t('lang_evaluation.evaluation.resEmpSchemeNameIns1'), trigger: 'blur' },
          ],
          resTheme: [
            { required: true, message: this.$t('lang_evaluation.evaluation.resThemeIns'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      logType: String,
    },
    mounted() {
    	editor.create()
    },
    components:{
    	evaluationObj,
    	evaluationPlan,
    },
    methods: {
      getData(id) {
        const t = this
        if ('' === id) {
        	return
        }
        const data = {
          _mt: 'evaluationResult.getById',
          id: id,
          logType: '根据id查询',
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
						this.form.id = res.data.content[0].id
		        this.form.resEmpid = res.data.content[0].resEmpid
		        this.form.resProid = res.data.content[0].resProid
		        this.form.resEmpidDis = res.data.content[0].resEmpidDis
		        this.form.resYear = res.data.content[0].resYear
		        this.form.resStime = res.data.content[0].resStime
		        this.form.resEtime = res.data.content[0].resEtime
		        this.form.resTheme = res.data.content[0].resTheme
		        this.form.resText = editor.txt.html(res.data.content[0].resText)
		        this.form.resProidDis = res.data.content[0].resProidDis
          }
        }).catch(() => {
        })
      },
      save() {
        const t = this
        t.form.resText = editor.txt.html()
        const data = deepCopy(t.form)
        data._mt = 'evaluationResult.addOrUpd'
        data.logType = t.logType
        data.resType = '04eval'
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
        if(this.$t('button.add')==t.logType) {
        	this.form.id = ""
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            // 更新vuex中的mainId
            if (t.logType === this.$t('button.add')) {
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('reminder.addsuccess'),
              })
              t.$emit('newdata', res.data.content[0])
            } else {
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('reminder.updsuccess'),
              })
              t.$emit('updata')
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
          }
        })
      },
      closeObj() {
      	this.openObj = false
      },
      closePlan() {
      	this.openPlan = false
      },
      pickUserData() {
      	this.$refs.evaluationObj.getData()
      	this.openObj = true
      },
      pickPlanData() {
      	this.$refs.evaluationPlan.getData()
      	this.openPlan = true
      },
      changeinputObj(name, id) {
      	this.form.resEmpid = id
      	this.form.resEmpidDis = name
      },
      changeinputPlan(id, name) {
      	this.form.resProid = id
      	this.form.resProidDis = name
      },
      clear() {
        this.form.id = ''
        this.form.resEmpid = ''
        this.form.resProid = ''
        this.form.resEmpidDis = ''
        this.form.resYear = ''
        this.form.resStime = ''
        this.form.resEtime = ''
        this.form.resTheme = ''
        this.form.resText = editor.txt.html('');
        this.form.resProidDis = ''
        this.$refs.form.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  .option-main{
    position: relative;
    height: 500px;
    .btn{
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>
