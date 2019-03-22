<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_employee.empmaster.title')}}
        </p>
        <Row>
          <Col span="6" class="colTree">
          <div class="divtree" :style="{height:treeheight + 'px'}">
            <Tree v-if="dataTree != ''" :data="dataTree" @on-select-change="selectChange" :render="renderContent"></Tree>
            <Spin v-if="loading" size="large" :style="{height:treeheight + 'px'}"></Spin>
          </div>
          </Col>
          <Col span="18" style="width: 73.3333% !important;">
          <Row>
            <Input :placeholder="$t('lang_employee.empmaster.empCnameDis')" style="width: 200px" v-model="empCname"/>
            <Input :placeholder="$t('lang_employee.empmaster.empkiWorknoDis')" style="width: 200px" v-model="empNo"/>
            <span style="margin: 0;"><Button type="primary" icon="search" @click="search()">{{$t('button.ser')}}</Button></span>
            <Button type="primary" @click="openUp1(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
            <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
          </Row>
          <row class="table-form" ref="table-form">
            <Table @on-select="selectedtable" :loading="loading" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
          </row>
          <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="search()"></Button></Row>
          </Col>
        </Row>
      </card>
      </Col>
    </Row>
    <!--<transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>-->
    <transition name="fade">
      <update v-if="openUpdate" :pklv="pklv" @closeUp="closeUp"></update>
    </transition>
    <transition name="fade">
    	<addemployee v-show="openAddEmp" @closeEmp="closeEmp" :id="addEmpId" @getData="addNewArray" @update="updateArray" :logType="logType" ref="addemployee"></addemployee>
    </transition>
  </div>
</template>
<script>
  import update from './empPoBase'
  import addemployee from './addNewEmployee'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

  export default{
    data() {
      return {
        dataTree: [],
        loading: true,
        treeheight: document.body.offsetHeight - 200,
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        addEmpId: NaN,
        openAddEmp: false,
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
//          fixed: 'left',
            align: 'center',
          },
          {
            title: this.$t('lang_employee.empmaster.empCname'),
            key: 'empCname',
//          fixed: 'left',
//            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.empmaster.empGenderDis'),
            key: 'empGenderDis',
          },
          {
            title: this.$t('lang_employee.empmaster.companyName'),
            key: 'empcompHirecompanyDis',
          },
          {
            title: this.$t('lang_employee.empmaster.deptName'),
            key: 'empcompDeptDis',
          },
          {
            title: this.$t('lang_employee.empmaster.empcompPostDis'),
            key: 'empcompPostDis',
          },
          {
            title: this.$t('lang_employee.empmaster.empGid'),
            key: 'empGid',
          },
          {
            title: this.$t('lang_employee.empmaster.empcompEntrydate'),
            key: 'empcompEntrydate',
          },
          {
            title: this.$t('lang_employee.empmaster.empkiWorkno'),
            key: 'empkiWorkno',
          },
          {
            title: this.$t('lang_employee.empmaster.empkiEmptypeName'),
            key: 'empkiEmptypeDis',
          },
        {
          title: this.$t('button.opr'),
          key: 'action',
          width: 64,
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
                    this.openUp(params.row.id, this.$t('button.upd'), params.index)
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
        rows: 10,
        page: 1,
        funId: '1000',
        empCname: '',
        empNo: '',
        treeid: '',
        treeType: '',
        pklv: '',
      }
    },
    computed: {

    },
    components: {
      update,
      addemployee,
    },
    mounted() {
      this.getData('', 1)
      this.getTree()
    },
    methods: {
      getData(id, page) {
        const t = this
        if (id === '$') {
          id = ''
        }
        if (page) {
          t.page = page
        }
        const dataPar = {
          _mt: 'viewEmpMaster.getLitePage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: '员工主数据查询',
          empkiWorkno: t.empNo,
          empCname: t.empCname,
          pid: id || '',
        }
        for (const dat in dataPar) {
          if (dataPar[dat] === '') {
            delete dataPar[dat]
          }
        }
        getDataLevelUserLoginNew(dataPar).then((res) => {
          if (isSuccess(res, t)) {
          	t.data = []
            if (res.data.content[0].rows) {
              for (let i = 0; i < res.data.content[0].rows.length; i++) {
                t.data.push({
                  id: res.data.content[0].rows[i].id,
                  empCname: res.data.content[0].rows[i].empCname,
                  empcompHirecompanyDis: res.data.content[0].rows[i].empcompHirecompanyDis,
                  empcompEntrydate: res.data.content[0].rows[i].empcompEntrydate,
                  empcompDeptDis: res.data.content[0].rows[i].empcompDeptDis,
                  empGenderDis: res.data.content[0].rows[i].empGenderDis,
                  empGid: res.data.content[0].rows[i].empGid,
                  empcompPostDis: res.data.content[0].rows[i].empcompPostDis,
                  empkiWorkno: res.data.content[0].rows[i].empkiWorkno,
                  empkiEmptypeDis: res.data.content[0].rows[i].empkiEmptypeDis,
                })
              }
              t.total = res.data.content[0].records
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      closeUp() {
        const t = this
        t.openUpdate = false
//        t.$refs.update.clear()
      },
      getTree() {
        const t = this
        const data = {
          _mt: 'orgUnits.getTree',
          rows: '100',
          page: 1,
          sort: 'unitCode',
          order: 'asc',
          logType: this.$t('button.ser'),
          id: '0',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.loading = false
            setTimeout(() => {
              t.dataTree = t.toTree(res.data.content[0].value)
            }, 500)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /* 树点击事件 */
      selectChange(e) {
        this.treeid = e.id
        this.treeType = e.unitType
        this.page = 1
        this.getData(e.unitType + '$' + e.id, 1)
      },
      /* 把后台数据转化为tree的格式 */
      toTree(data) {
        data.forEach((item) => {
          item.expand = false
          item.checked = item.authRoleFunDis === '1'
          item.title = item.unitCode + ' ' + item.unitSname
          delete item.children
        })
        const map = {}
        data.forEach((item) => {
          map[item.id] = item
        })
        const val = []
        data.forEach((item) => {
          const parent = map[item.unitPid]
          if (parent) {
            (parent.children || (parent.children = [])).push(item)
          } else {
            val.push(item)
          }
        })
        return val
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
        t.getTree()
         t.getData()
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
        t.getTree()
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData(this.treeType + '$' + this.treeid)
        }
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData(this.treeType + '$' + this.treeid)
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData(this.treeType + '$' + this.treeid)
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
          _mt: 'empMaster.delByIds',
          funId: '1',
          logType: this.$t('button.del'),
          ids: t.tableselected.toString(),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.tableselected = []
            t.getTree()
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
      open() {
        const t = this
        t.opendialog = true
      },
      openUp1(id, logType) {
        const t = this
        t.addEmpId = parseInt(id, 10)
        t.logType = logType
        t.openAddEmp = true
      },
      openUp(id, logType, index) {
        const t = this
        t.openUpdate = true
        t.logType = '查询'
//      将本条数据的id传入mainid（如果有的话）
        this.pklv = id
//        this.$store.commit('empPo/setChildId1', id)
//        this.$store.commit('empPo/setIndex', index)
//        if (id) {
//          t.$refs.update.getOptionData()
//        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeEmp() {
        const t = this
        t.$refs.addemployee.formEmpValidate.baseGid = ''
	  		t.$refs.addemployee.formEmpValidate.baseCname = ''
	  		t.$refs.addemployee.formEmpValidate.baseAlias = ''
	  		t.$refs.addemployee.formEmpValidate.baseLastname = ''
	  		t.$refs.addemployee.formEmpValidate.baseFirstname = ''
	  		t.$refs.addemployee.formEmpValidate.idsType = ''
	  		t.$refs.addemployee.formEmpValidate.idsNo = ''
	  		t.$refs.addemployee.formEmpValidate.baseBirthdate = ''
	  		t.$refs.addemployee.formEmpValidate.baseGender = ''
	  		t.$refs.addemployee.formEmpValidate.baseMarriage = ''
	  		t.$refs.addemployee.formEmpValidate.baseNation = ''
	  		t.$refs.addemployee.formEmpValidate.basePolitical = ''
	  		t.$refs.addemployee.formEmpValidate.baseTechnicaltitle = ''
	  		t.$refs.addemployee.formEmpValidate.baseTechspec = ''
	  		t.$refs.addemployee.formEmpValidate.baseFirstworkdate = ''
	  		t.$refs.addemployee.formEmpValidate.baseTechdate = ''
	  		t.$refs.addemployee.formEmpValidate.pkiWorkno = ''
	  		t.$refs.addemployee.formEmpValidate.pkiEmptype = ''
	  		t.$refs.addemployee.formEmpValidate.compHirecompany = ''
	  		t.$refs.addemployee.formEmpValidate.compDept = ''
	  		t.$refs.addemployee.formEmpValidate.compPost = ''
	  		t.$refs.addemployee.formEmpValidate.compCostcenter = ''
	  		t.$refs.addemployee.formEmpValidate.compHirelocation = ''
	  		t.$refs.addemployee.formEmpValidate.compWorklocation = ''
	  		t.$refs.addemployee.formEmpValidate.compBuspmp = ''
	  		t.$refs.addemployee.formEmpValidate.compFunpmp = ''
	  		t.$refs.addemployee.formEmpValidate.compEntrydate = ''
	  		t.$refs.addemployee.formEmpValidate.compServicedate = ''
	  		t.$refs.addemployee.formEmpValidate.compCertificatedate = ''
	  		t.$refs.addemployee.formEmpValidate.compHr = ''
	  		t.$refs.addemployee.formEmpValidate.ctContracttype = ''
	  		t.$refs.addemployee.formEmpValidate.ctContractperiod = ''
	  		t.$refs.addemployee.formEmpValidate.ctContractsdate = ''
	  		t.$refs.addemployee.formEmpValidate.ctContractedate = ''
	  		t.$refs.addemployee.formEmpValidate.ctContractprom = ''
	  		t.$refs.addemployee.formEmpValidate.ctConfidential = ''
	  		t.$refs.addemployee.formEmpValidate.ctContractworktime = ''
	  		t.$refs.addemployee.formEmpValidate.ctSigndate = ''
	  		t.$refs.addemployee.formEmpValidate.ctProbation = ''
	  		t.$refs.addemployee.formEmpValidate.ctProbationdate = ''
	  		t.$refs.addemployee.formEmpValidate.ctProbationprom = ''
	  		t.$refs.addemployee.formEmpValidate.salPostlevel = ''
	  		t.$refs.addemployee.formEmpValidate.salSalarylevel = ''
	  		t.$refs.addemployee.formEmpValidate.salTravellevel = ''
	  		t.$refs.addemployee.formEmpValidate.salAdminlevel = ''
	  		t.$refs.addemployee.formEmpValidate.salSalaryset = ''
	  		t.$refs.addemployee.formEmpValidate.bkBank = ''
	  		t.$refs.addemployee.formEmpValidate.bkAccount = ''
	  		t.$refs.addemployee.formEmpValidate.bkAccnane = ''
	  		t.$refs.addemployee.formEmpValidate.sbBenefitlocation = ''
	  		t.$refs.addemployee.formEmpValidate.sbHfundlocatio = ''
	  		t.$refs.addemployee.formEmpValidate.sbBenefitpolicy = ''
	  		t.$refs.addemployee.formEmpValidate.sbBenefittype = ''
	  		t.$refs.addemployee.formEmpValidate.edEducationlevel = ''
	  		t.$refs.addemployee.formEmpValidate.edCuntry = ''
	  		t.$refs.addemployee.formEmpValidate.edSchool = ''
	  		t.$refs.addemployee.formEmpValidate.edDegree = ''
	  		t.$refs.addemployee.formEmpValidate.edSpecialty = ''
	  		t.$refs.addemployee.formEmpValidate.edSdate = ''
	  		t.$refs.addemployee.formEmpValidate.edEdate = ''
	  		t.$refs.addemployee.formEmpValidate.ctaMobile = ''
	  		t.$refs.addemployee.formEmpValidate.ctaPhone = ''
	  		t.$refs.addemployee.formEmpValidate.ctaPersmail = ''
	  		t.$refs.addemployee.formEmpValidate.ctaCompmail = ''
	  		t.$refs.addemployee.formEmpValidate.ctaQq = ''
	  		t.$refs.addemployee.formEmpValidate.ctaWechat = ''
	  		t.$refs.addemployee.formEmpValidate.ctaEmergcontact = ''
	  		t.$refs.addemployee.formEmpValidate.ctaEmcrelation = ''
	  		t.$refs.addemployee.formEmpValidate.ctaEmcphone = ''
	  		t.$refs.addemployee.formEmpValidate.ctaEmcaddr = ''
	  		t.$refs.addemployee.formEmpValidate.addCuntry = ''
	  		t.$refs.addemployee.formEmpValidate.addProvince = ''
	  		t.$refs.addemployee.formEmpValidate.addCity = ''
	  		t.$refs.addemployee.formEmpValidate.addStreet = ''
	  		t.$refs.addemployee.formEmpValidate.addZip = ''
	  		t.$refs.addemployee.formEmpValidate.addrCuntry = ''
	  		t.$refs.addemployee.formEmpValidate.addrProvince = ''
	  		t.$refs.addemployee.formEmpValidate.addrCity = ''
	  		t.$refs.addemployee.formEmpValidate.addrStreet = ''
	  		t.$refs.addemployee.formEmpValidate.addrRegisterproperty = ''
	  		t.$refs.addemployee.formEmpValidate.addrZip = ''
        t.$refs.addemployee.cropedImg = ''
        t.$refs.addemployee.cropedImgDis = ''
	  		t.openAddEmp = false
      },
      search() {
        this.treeid = ''
        this.page = 1
        this.treeType = ''
        this.getData('', 1)
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
                type: data.unitType === '01company' ? 'social-buffer' : 'ios-people',
                size: '15',
                color: data.unitType === '01company' ? '#3399ff' : '#ff9900',
              },
              style: {
                marginRight: '8px',
              },
            }),
            h('span', data.title),
          ]),
        ])
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
  .colTree{
    /*min-height: 600px;*/
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
  }
  .divtree{
  	padding-left: 10px;
  	box-sizing: border-box;
    /*height: 750px;*/
    overflow: auto;
    border: 1px #efefef solid;
  }
</style>
