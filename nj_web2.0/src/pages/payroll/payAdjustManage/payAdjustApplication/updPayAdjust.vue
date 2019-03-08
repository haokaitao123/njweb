<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="110">
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdjust.plajCompany')">
            <span @dblclick="dbHCompany">
               <Input v-model="plajCompanyDis" icon="search" :readonly="true" :placeholder="$t('lang_payroll.payAdjust.plajCompanyDis')"  @on-click="selectHCompany"/>
          </span>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajDept')" prop="plajDept">
            <span @dblclick="clearDepart">
               <Input v-model="plajDeptDis" icon="search" :readonly="true"  :placeholder="$t('lang_payroll.payAdjust.plajDeptDis')"  @on-click="pickDepart"/>
          </span>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdjust.plajEmpworkno')">
            <span @dblclick="clearEmp">
               <Input v-model="plajEmpworkno" icon="search" :readonly="true"  :placeholder="$t('lang_payroll.payAdjust.plajEmpworknoDis')"  @on-click="pickEmp"/>
          </span>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajEmpgid')">
            <Input v-model="form.plajEmpgid" disabled :placeholder="$t('lang_payroll.payAdjust.plajEmpgidDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdjust.plajCname')">
            <Input v-model="form.plajCname" disabled :placeholder="$t('lang_payroll.payAdjust.plajCnameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajPost')" prop="plajPost" >
            <Input  v-model="form.plajPostDis" disabled :placeholder="$t('lang_payroll.payAdjust.plajPostDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_payroll.payAdjust.plajEmptype')">
            <Select v-model="form.plajEmptype" disabled  :placeholder="$t('lang_payroll.payAdjust.plajEmptypeDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Emptype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajCostcenter')" prop="plajCostcenter">
            <Input  v-model="form.plajCostcenterDis" disabled :placeholder="$t('lang_payroll.payAdjust.plajCostcenterDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdjust.plajTaxlocation')" prop="plajTaxlocation">
            <Select v-model="form.plajTaxlocation" disabled  :placeholder="$t('lang_payroll.payAdjust.plajTaxlocationDis')" >
              <Option :value="item.id" v-for="(item,index) in Taxlocation" :key="index">{{item.cityName}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="23"></i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdjust.plajPostlevelOld')" prop="plajPostlevelOld" >
            <Select v-model="form.plajPostlevelOld" disabled  :placeholder="$t('lang_payroll.payAdjust.plajPostlevelOldDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Postlevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajPostlevelNew')" prop="plajPostlevelNew" >
            <Select v-model="form.plajPostlevelNew"  :placeholder="$t('lang_payroll.payAdjust.plajPostlevelNewDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Postlevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdjust.plajSalarylevelOld')" prop="plajSalarylevelOld">
            <Select v-model="form.plajSalarylevelOld" disabled  :placeholder="$t('lang_payroll.payAdjust.plajSalarylevelOldDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Salarylevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11"  offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajSalarylevelNew')" prop="plajSalarylevelNew">
            <Select v-model="form.plajSalarylevelNew"   :placeholder="$t('lang_payroll.payAdjust.plajSalarylevelNewDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Salarylevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_payroll.payAdjust.plajTravellevelOld')" prop="plajTravellevelOld" >
            <Select v-model="form.plajTravellevelOld" disabled  :placeholder="$t('lang_payroll.payAdjust.plajTravellevelOldDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Travellevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajTravellevelNew')" prop="plajTravellevelNew" >
            <Select v-model="form.plajTravellevelNew"   :placeholder="$t('lang_payroll.payAdjust.plajTravellevelNewDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Travellevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11"  >
          <FormItem :label="$t('lang_payroll.payAdjust.plajAdminlevelOld')" prop="plajAdminlevelOld">
            <Select v-model="form.plajAdminlevelOld" disabled  :placeholder="$t('lang_payroll.payAdjust.plajAdminlevelOldDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Adminlevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajAdminlevelNew')" prop="plajAdminlevelNew">
            <Select v-model="form.plajAdminlevelNew"   :placeholder="$t('lang_payroll.payAdjust.plajAdminlevelNewDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in Adminlevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="23"></i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_payroll.payAdjust.plajSalaryset')" prop="plajSalaryset">
            <Select v-model="form.plajSalaryset" disabled :placeholder="$t('lang_payroll.payAdjust.plajSalarysetDis')">
              <Option :value="item.id" v-for="(item,index) in Salaryset" :key="index" >{{item.payss}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajSalarycurrency')" prop="plajSalarycurrency">
            <Select v-model="form.plajSalarycurrency" disabled :placeholder="$t('lang_payroll.payAdjust.plajSalarycurrencyDis')" >
              <Option :value="item.id" v-for="(item,index) in Salarycurrency" :key="index" >{{item.currCurrency}}</Option>
            </Select>
          </FormItem>
        </i-col>
          <i-col span="11">
          <FormItem :label="$t('lang_payroll.payAdjust.plajReadon')" prop="plajReadon">
            <Select v-model="form.plajReadon"  :placeholder="$t('lang_payroll.payAdjust.plajReadonDis')" >
              <Option :value="item.paramCode" v-for="(item,index) in SalajReason" :key="index" >{{item.paramInfoName}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_payroll.payAdjust.plajAdjustdate')" prop="plajAdjustdate">
            <DatePicker type="date" :placeholder="$t('lang_payroll.payAdjust.plajAdjustdateDis')" :editable="false" v-model="form.plajAdjustdate" ></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_payroll.payAdjust.plajConfirmrecord')" prop="plajConfirmrecord">
            <Input v-model="form.plajConfirmrecord" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payAdjust.plajConfirmrecordDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_payroll.payAdjust.plajComment')" prop="plajComment">
            <Input v-model="form.plajComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payAdjust.plajCommentDis')"></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
    <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    <!--雇佣公司-->
    <transition name="fade">
      <searchHCompany v-show="openHCompany" @closeHCompany="closeHCompany" :searchHCClo="searchHCClo" @inputHCompany="inputHCompany" :params="paramsHCompany" ref="searchHCompany"></searchHCompany>
    </transition>
    <transition name="fade">
      <searchDept v-show="openDept" @closeDept="closeDept" :searchDeptClo="searchDeptClo" @inputDept="inputDept" :params="paramsDept" ref="searchDept"></searchDept>
    </transition>
    <transition name="fade">
      <searchEmpMaster v-show="openEmp" :empcompHirecompany="form.plajCompany" :empcompDept="form.plajDept" @closeEmp="closeEmp" @inputEmp="inputEmp" ref="searchEmpMaster"></searchEmpMaster>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'
  import searchHCompany from '../../../../components/searchTable/searchHCompany'
  import searchDept from '../../../../components/searchTable/searchDept'
  import searchEmpMaster from '../../../../components/searchTable/searchEmpMaster'

  export default {
    data() {
      return {
        title: '',
        plajCompanyDis: '',
        plajDeptDis: '',
        plajEmpworkno: '',
        Emptype: [],
        Taxlocation: [],
        Salaryset: [],
        Salarycurrency: [],
        Postlevel: [],
        Salarylevel: [],
        Travellevel: [],
        Adminlevel: [],
        SalajReason: [],
        form: {},
        openEmp: false,
        openHCompany: false,
        // 部门
        openDept: false,
        paramsDept: {
          _mt: 'orgUnits.getByOrgFramePageList',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'desc',
          funId: '1106',
          logType: '部门',
          unitType: '02dept',
        },
        searchDeptClo: [
          {
            title: this.$t('lang_employee.searchColumn.unitCodeDepart'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.departCnFullName'),
            key: 'compFnameCnDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.departEnFullName'),
            key: 'compFnameEnDis',
            sortable: 'custom',
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
            key: 'compFnameCnDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.compEnFullName'),
            key: 'compFnameEnDis',
            sortable: 'custom',
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
          plajPostlevelNew: [
            { required: true, message: this.$t('lang_payroll.payAdjust.plajPostlevelNewDis'), trigger: 'change' },
          ],
          plajSalarylevelNew: [
            { required: true, message: this.$t('lang_payroll.payAdjust.plajSalarylevelNewDis'), trigger: 'change' },
          ],
          plajTravellevelNew: [
            { required: true, message: this.$t('lang_payroll.payAdjust.plajTravellevelNewDis'), trigger: 'change' },
          ],
          plajAdminlevelNew: [
            { required: true, message: this.$t('lang_payroll.payAdjust.plajAdminlevelNewDis'), trigger: 'change' },
          ],
          plajReadon: [
            { required: true, message: this.$t('lang_payroll.payAdjust.plajReadonDis'), trigger: 'change' },
          ],
          plajAdjustdate: [
            { required: true, type: 'date', message: this.$t('lang_payroll.payAdjust.plajAdjustdateDis'), trigger: 'change' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    components: {
      searchHCompany,
      searchDept,
      searchEmpMaster,
    },
    mounted() {
      this.getSelect()
      this.getSelectSalSet()
      this.getSelectTaxlocation()
      this.getSelectSalarycurrency()
    },
    methods: {
      getdata(params) {
        const t = this
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form = res.data.content[0]
            t.form.plajAdjustdate = res.data.content[0].plajAdjustdate
            t.form.plajEmpId = res.data.content[0].plajEmpId
            t.plajCompanyDis = res.data.content[0].plajCompanyDis
            t.plajDeptDis = res.data.content[0].plajDeptDis
            t.plajEmpworkno = res.data.content[0].plajEmpworkno
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getEmpMaster(row) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'empPayrollSalaryBase.getByEmpWorkno',
          empWorkno: row.empkiWorkno,
          funId: '1',
          logType: '根据员工工号查询员工信息',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.plajEmpid = row.id
            t.plajEmpworkno = row.empkiWorkno
            t.form.plajEmpworkno = row.empkiWorkno
            t.form.plajEmpgid = row.empGid
            t.form.plajCname = row.empName
            t.form.plajPost = row.empcompPost
            t.form.plajPostDis = row.empcompPostDis
            t.form.plajEmptype = row.empkiEmptype
            t.form.plajEmptypeDis = row.empkiEmptypeDis
            t.form.plajCostcenter = row.empcompCostcenter
            t.form.plajCostcenterDis = row.empcompCostcenterDis
            t.form.plajTaxlocation = res.data.content[0].empsalbsTaxlocation
            t.form.plajPostlevelOld = res.data.content[0].empsalbsPostlevel
            t.form.plajSalarylevelOld = res.data.content[0].empsalbsSalarylevel
            t.form.plajTravellevelOld = res.data.content[0].empsalbsTravellevel
            t.form.plajAdminlevelOld = res.data.content[0].empsalbsAdminlevel
            t.form.plajSalaryset = res.data.content[0].empsalbsSalaryset
            t.form.plajSalarycurrency = res.data.content[0].empsalbsSalarycurrency
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'emptype,postlevel,salarylevel,travellevel,adminlevel,salajreason',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Emptype = res.data.content[0].value[0].paramList
            t.Postlevel = res.data.content[0].value[1].paramList
            t.Salarylevel = res.data.content[0].value[2].paramList
            t.Travellevel = res.data.content[0].value[3].paramList
            t.Adminlevel = res.data.content[0].value[4].paramList
            t.SalajReason = res.data.content[0].value[5].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelectSalSet() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'paySalSet.getSelectValue',
          data: '{}',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Salaryset = res.data.content[0].value
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
          })
        })
      },
      getSelectTaxlocation() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseCity.getSelectValue',
          data: '{"cityIsvalid" : "1"}',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Taxlocation = res.data.content[0].value
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
          })
        })
      },
      getSelectSalarycurrency() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseCurrency.getSelectValue',
          data: '{}',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Salarycurrency = res.data.content[0].value
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
          })
        })
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
        t.plajCompanyDis = name
        t.form.plajCompany = id
      },
      dbHCompany() {
        const t = this
        t.plajCompanyDis = ''
        t.form.plajCompany = ''
      },
      // 选择部门
      pickDepart() {
        const t = this
        if (!t.form.plajCompany) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_employee.empmaster.empHireCompDis'),
          })
        } else {
          const paramsDept = deepCopy(t.paramsDept)
          t.$refs.searchDept.getData(paramsDept, t.form.plajCompany)
          t.openDept = true
        }
      },
      inputDept(name, id) {
        const t = this
        t.plajDeptDis = name
        t.form.plajDept = id
      },
      clearDepart() {
        const t = this
        t.plajDeptDis = ''
        t.form.plajDept = ''
        t.clearEmp()
      },
      closeDept() {
        const t = this
        t.$refs.searchDept.unitCode = ''
        t.openDept = false
      },
      // 选择员工
      pickEmp() {
        const t = this
        if (!t.form.plajDept) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '请先选择部门!',
          })
        } else {
          t.$refs.searchEmpMaster.getData()
          t.openEmp = true
        }
      },
      inputEmp(row, id) {
        const t = this
        t.getEmpMaster(row)
      },
      clearEmp() {
        const t = this
        t.plajEmpworkno = ''
        t.form.plajEmpworkno = ''
        t.form.plajEmpgid = ''
        t.form.plajCname = ''
        t.form.plajPost = ''
        t.form.plajPostDis = ''
        t.form.plajEmptype = ''
        t.form.plajEmptypeDis = ''
        t.form.plajCostcenter = ''
        t.form.plajCostcenterDis = ''
        t.form.plajTaxlocation = ''
        t.form.plajPostlevelOld = ''
        t.form.plajSalarylevelOld = ''
        t.form.plajTravellevelOld = ''
        t.form.plajAdminlevelOld = ''
        t.form.plajSalaryset = ''
        t.form.plajSalarycurrency = ''
      },
      closeEmp() {
        const t = this
        t.$refs.searchEmpMaster.empName = ''
        t.openEmp = false
      },
      save() {
        const t = this
        const data = deepCopy(t.form)
        data._mt = 'payAdjust.addOrUpd'
        data.funId = '1'
        data.logType = t.logType
        data.id = t.id
        if (data.plajAdjustdate !== '') {
          data.plajAdjustdate = new Date(data.plajAdjustdate).format('yyyy-MM-dd')
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (t.logType === this.$t('button.add')) {
                  t.$emit('getid', res.data.content[0].id)
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
                  t.$emit('update', res.data.content[0])
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
      clear() {
        const t = this
        t.plajCompanyDis = ''
        t.plajDeptDis = ''
        t.plajEmpworkno = ''
        t.form = {}
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

