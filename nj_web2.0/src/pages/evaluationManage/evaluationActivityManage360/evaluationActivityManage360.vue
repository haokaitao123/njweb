<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_evaluation.evaluation.evaluationResult')}}
        </p>
        <Row>
          <Col span="20" style="width:100% !important;">
          <Row>
          	<Input :placeholder="$t('lang_evaluation.evaluation.resYear1Ins')" style="width: 200px" v-model="resYear"/>
          	<span @dblclick="clearUserid">
            	<Input :placeholder="$t('lang_evaluation.evaluation.resEmpidDis1Ins1')" icon="search" :readonly="true" style="width: 200px" v-model="resEmpidDis" @on-click="pickUserData"/>
           </span>
          	<span @dblclick="clearPlanid">
            	<Input :placeholder="$t('lang_evaluation.evaluation.resEmpSchemeNameIns1')" icon="search" :readonly="true" style="width: 200px" v-model="resProidDis" @on-click="pickPlanData"/>
           </span>
            <span style="margin: 0;"><Button type="primary" icon="search" @click="search()">{{$t('button.ser')}}</Button></span>
            <Button type="primary" @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>
            <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
            <!--<Button type="primary"  @click="expData">{{$t('button.exp')}}</Button>-->
            <!--<Button type="primary" @click="importExcel">{{$t('button.imp')}}</Button>-->
            <Button type="primary"  @click="tongzhi">{{$t('lang_evaluation.evaluation.tongzhi')}}</Button>
          </Row>
          <row class="table-form" ref="table-form">
            <Table @on-select="selectedtable"  @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
          </row>
          <Row style="display: flex">
	          <Row style="display: flex">          <Page :total="total" showTotal size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=rows :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
	          <Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="refresh"></Button>
          </Row>
          </Col>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :logType="logType" @closeUpd="closeUp" @addNewArray="addNewArray" @updateArray="updateArray" ref="update"></update>
    </transition>
    <transition >
      <expwindow v-show="openExp" :id="tableselected" @setFileKey="setFileKey" :logType="logType"  :index="index" @closeExp="closeExp" ref="expwindow"></expwindow>
    </transition>
    <transition >
      <expdow v-show="openExpDow" :filekey="filekey" :filename="filename"  @closeExpDowMain="closeExpDowMain" ref="expdow"></expdow>
    </transition>
    <transition name="fade">
    <importExcel v-show="openImport" :impid="updateId" :imp_mt="imp_mt"  @closeImport="closeImport"ref="importExcel"></importExcel>
  	</transition>
  	<transition name="fade">
   	 	<evaluationObj v-show="openObj" @closeUp="closeObj" @changeinput="changeinputObj" ref="evaluationObj"></evaluationObj>
    </transition>
    <transition name="fade">
   	 	<evaluationPlan v-show="openPlan" @closeUpd="closePlan" @changeinputUpd="changeinputPlan" ref="evaluationPlan"></evaluationPlan>
    </transition>
  </div>
</template>
<script>
  import update from './upDiagnosticPlanManage'
  import { isSuccess } from '../../../lib/util'
  import evaluationObj from '../../../components/searchTable/searchPubEmp'
	import evaluationPlan from './searchModel'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
	import expwindow from '../../../components/fileOperations/expSms'
	import expdow from '../../../components/fileOperations/expdow'
	import importExcel from '../../../components/importModel/importParam'

  export default{
    data() {
      return {
        imp_mt: 'baseCity.importData',
        openImport: false,
        expDataTital: [{ code: 'resEmpidDis', name: '评价对象' }, { code: 'resYear', name: '评价年份' },
          { code: 'resStime', name: '评价开始时间'}, { code: 'resEtime', name: '评价结束时间' },
          { code: 'resTheme', name: '主题' }, { code: 'resProidDis', name: '评价方案'}],
				resEmpid: '',
				resEmpidDis: '',
				resYear: '',
				resProid: '',
				resProidDis: '',
				openObj: false,
      	openPlan: false,
        openExpDow: false,
        openExp: false,
        openPick: false,
        openScoreResult: false,
        filekey: '',
        filename: '',
        dataTree: [],
        treeheight: document.body.offsetHeight - 200,
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            fixed: 'left',
            align: 'center',
          },
          {
            title: this.$t('lang_evaluation.evaluation.resYear1'),
            key: 'resYear',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_evaluation.evaluation.resEmpidDis1'),
            key: 'resEmpidDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_evaluation.evaluation.resStime1'),
            key: 'resStime',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_evaluation.evaluation.resEtime1'),
            key: 'resEtime',
            sortable: 'custom',
          },
          {
          	title: this.$t('lang_evaluation.evaluation.resTheme'),
            key: 'resTheme',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_evaluation.evaluation.resProidDis1'),
            key: 'resProidDis',
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 70,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.upd'))
                    },
                  },
                }, this.$t('button.upd')),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 20,
        page: 1,
        funId: '1000',
        cityName: '',
        cityTypeName: '',
        cityCode1: '',
      }
    },
    components: {
      update,
      expwindow,
      expdow,
      importExcel,
      evaluationObj,
      evaluationPlan,
    },
    mounted() {
      this.getData()
    },
    methods: {
    	refresh() {
        this.getData()
      },
      getData() {
        const t = this
        const data = {
          _mt: 'evaluationResult.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          resYear: t.resYear,
          resEmpid: t.resEmpid,
          resProid: t.resProid,
          resType: '04eval',
          logType: this.$t('button.ser'),
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.data = [];
        t.total = 0;
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      tongzhi(){
      	let t = this;
      	if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
	        const data = {
	          _mt: 'evaluationResult.evaluationNotifi',
						id: this.tableselected.toString(),
	          logType: this.$t('button.ser'),
	        }
	      	getDataLevelUserLogin(data).then((res) => {
	          if (isSuccess(res, t)) {
          		t.$Modal.success({
	                title: this.$t('reminder.suc'),
	                content: this.$t('lang_evaluation.evaluation.mqsucess'),
	            })
	          }
	        }).catch(() => {
	          t.$Modal.error({
	            title: this.$t('reminder.err'),
	            content: this.$t('reminder.errormessage'),
	          })
	        })
        }
      },
      closeImport() {
        const t = this
        t.openImport = false
      },
      importExcel() {
        const t = this
        t.openImport = true
        //t.$refs.importExcel.getDowModelFile()
      },
      expData() {
        const data = {
          cityName: this.cityName,
          cityType: this.cityTypeName,
          cityCode1: this.cityCode1,
        }
        this.$refs.expwindow.getData(this.expDataTital, 'baseCity.export', data)
        this.openExp = true
      },
      closeExp() {
        const t = this
        t.openExp = false
      },
      closeExpDowMain() {
        const t = this
        t.openExpDow = false
      },
      closeObj(){
      	this.openObj = false;
      },
      closePlan(){
      	this.openPlan = false;
      },
      changeinputObj(name,id){
      	this.resEmpid = id;
      	this.resEmpidDis = name;
      },
      changeinputPlan(id,name){
      	this.resProid = id;
      	this.resProidDis = name;
      },
      setFileKey(filekey, filename, openExpDow) {
        const t = this
        t.filekey = filekey
        t.filename = filename
        t.openExpDow = openExpDow
        t.$refs.expdow.getPriToken(t.filekey)
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      updateArray() {
        const t = this
        t.getData()
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        } else {
          this.order = 'desc'
        }
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData()
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
      },
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
        	t.$Modal.confirm({
        		title: this.$t('reminder.remind'),
        		content: this.$t('reminder.confirmdelete'),
        		onOk: () => {
        getDataLevelUserLogin({
          _mt: 'evaluationResult.delByIds',
          funId: '1',
          logType: this.$t('button.del'),
          ids: t.tableselected.toString(),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.tableselected = []
            t.getData()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
        		},
        		onCancel: () => {},
        	})
        }
      },
      openUp(id, logType) {
        const t = this
        t.openUpdate = true;
        t.logType = logType;
        if (logType === this.$t('button.upd')) {
          t.$refs.update.getOptionData(id)
        } else if (logType === this.$t('button.add')) {
        	t.$refs.update.getOptionData('');
        }
      },
      pickUserData(){
      	this.$refs.evaluationObj.getData();
      	this.openObj = true;
      },
      pickPlanData(){
      	this.$refs.evaluationPlan.getData();
      	this.openPlan = true;
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
      close(){
      	this.openPick = false;
      },
      //TODO
      closeScoreResult(){
      	this.openScoreResult = false;
      },
      clearUserid(){
      	this.resEmpidDis = '';
      	this.resEmpid = '';
      },
      clearPlanid(){
      	this.resProid = '';
      	this.resProidDis = '';
      },
      search() {
        this.page = 1
        this.getData()
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form{
    margin: 10px 0;
  }
  .margin-right-10{
    margin-right: 10px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
