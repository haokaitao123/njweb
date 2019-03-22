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
            <span @dblclick="clearUserid">
            	<Input :placeholder="$t('lang_evaluation.evaluation.resYear1Ins')" style="width: 200px" v-model="resEmpTimeName" />
           </span>
            <span @dblclick="dbHCompany">
              <Input v-model="resEmpidDis" style="width: 190px" icon="search" :readonly="true" :placeholder="$t('lang_evaluation.evaluation.resEmpidDis1Ins1')"  @on-click="selectHCompany"/>
            </span>
            <span @dblclick="clearUserid">
            	<Input :placeholder="$t('lang_evaluation.evaluation.resEmpSchemeNameIns')" icon="search" :readonly="true" style="width: 200px" v-model="resEmpSchemeName" @on-click="pickUserSchemeData"/>
           </span>
            <span style="margin: 0;"><Button type="primary" icon="search" @click="search()">{{$t('button.ser')}}</Button></span>
            <Button type="primary" @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>
            <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
            <!--<Button type="primary"  @click="expData">{{$t('button.exp')}}</Button>-->
            <!--<Button type="primary" @click="importExcel">{{$t('button.imp')}}</Button>-->
          </Row>
          <row class="table-form" ref="table-form">
            <Table @on-select="selectedtable"  @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
          </row>
          <Row style="display: flex">
	          <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
	          <Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="refresh"></Button>
          </Row>
          </Col>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :logType="logType" @closeUpd="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
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
    <!--雇佣公司-->
    <transition name="fade">
      <searchHCompany v-show="openHCompany" @closeHCompany="closeHCompany" :searchHCClo="searchHCClo" @inputHCompany="inputHCompany" :params="paramsHCompany" ref="searchHCompany"></searchHCompany>
    </transition>
    <transition name="fade">
      <diagnosticScoreResult v-show="openScoreResult" @closePower="closeScoreResult" ref="diagnosticScoreResult"></diagnosticScoreResult>
   </transition>
    <transition name="fade">
      <searchScheme v-show="openScheme" @closeScheme="closeScheme" @changeinputScheme="changeinputScheme" ref="searchScheme"></searchScheme>
    </transition>
  </div>
</template>
<script>
  import update from './upEvaluationResultManage'
  import { isSuccess } from '../../../lib/util'
  import diagnosticScoreResult from './diagnosticScoreResult'
  import searchHCompany from '../../../components/searchTable/searchHCompany'
  import searchScheme from './searchScheme'
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
          { code: 'resProidDis', name: '方案名称' }, { code: 'resStime', name: '评价开始时间' },
          { code: 'resEtime', name: '评价结束时间' }],
				resEmpid: '',
        resEmpidDis: '',
        resEmpTimeName: '',
        resEmpTimeid: '',
        resEmpSchemeName: '',
        resEmpSchemeid: '',
        openExpDow: false,
        openExp: false,
        openHCompany: false,
        openScheme: false,
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
            title: this.$t('lang_evaluation.evaluation.resProidDis1'),
            key: 'resProidDis',
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
            title: this.$t('button.opr'),
            key: 'action',
            width: 180,
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
                h('Button', {
                	style: {
                		marginLeft: '10px',
                	},
                  props: {
                    type: 'info',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.diagnosticScoreResult(params.row.id)
                    },
                  },
                }, this.$t('lang_evaluation.evaluation.diagnosticScoreResult1')),
              ])
            },
          },
        ],
        //      雇佣公司
        searchHCClo: [
          {
            title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.compCnFullName'),
            key: 'unitsFname',
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
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
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
      searchHCompany,
      diagnosticScoreResult,
      searchScheme,
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
          resEmpid: t.resEmpid,
          resYear: t.resEmpTimeName,
          resProid: t.resEmpSchemeid,
          resType: '02eval',
          logType: this.$t('button.ser'),
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.data = []
        t.total = 0
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
      closeImport() {
        const t = this
        t.openImport = false
      },
      importExcel() {
        const t = this
        t.openImport = true
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
      updateArray(res) {
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
        t.openUpdate = true
        t.logType = logType
        if (logType === this.$t('button.upd')) {
          t.$refs.update.getData(id)
        } else if (logType === this.$t('button.add')) {
        	t.$refs.update.getData('')
        }
      },
      diagnosticScoreResult(id) {
      	const t = this
      	t.$refs.diagnosticScoreResult.getData(id)
      	this.openScoreResult = true
      },
      pickUserData() {
      	this.$refs.searchOrgUnit.getData()
      	this.openHCompany = true
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.upFormData.id = ''
        t.$refs.update.upFormData.resEmpidDis = ''
        t.$refs.update.upFormData.resProidDis = ''
        t.$refs.update.upFormData.resStime = ''
        t.$refs.update.upFormData.resEtime = ''
        t.$refs.update.upFormData.resNote = ''
      },
      // 评价方案
      pickUserSchemeData() {
        this.$refs.searchScheme.getData()
        this.openScheme = true
      },
      closeScheme() {
        this.openScheme = false
      },
      closeScoreResult() {
        this.openScoreResult = false
      },
     changeinputScheme(id, name) {
       this.resEmpSchemeName = name
       this.resEmpSchemeid = id
      },
      clearUserid() {
        this.resEmpSchemeName = ''
        this.resEmpSchemeid = ''
      },
      // 查询
      search() {
        this.page = 1
        this.getData()
      },
      renderContent(h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%',
          },
        }, [
           h('Button', {
               props: {
               type: 'text',
               size: 'small',
               },
              on: {
                 click: () => { this.selectChange(data) },
              },
           }, [
            h('Icon', {
              props: {
                type: data.cityType === '01prov' ? 'android-home' : data.cityType === '02city' ? 'android-locate' : data.cityType === '03county' ? 'android-pin' : 'home',
                size: '15',
                color: data.cityType === '01prov' ? '#ff9900' : data.cityType === '02city' ? '#39c263' : data.cityType === '03county' ? '#bf3319' : '#3399ff',
              },
              style: {
                marginRight: '8px',
              },
            }),
            h('span', data.title),
            ]),
          ])
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
        t.resEmpidDis = name
        t.resEmpid = id
      },
      dbHCompany() {
        const t = this
        t.resEmpidDis = ''
        t.resEmpid = ''
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
