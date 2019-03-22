<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="140">
        <i-col span="11">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpCompany')">
             <span @dblclick="dbHCompany">
               <Input v-model="sirpCompanyDis" icon="search" :readonly="true"
                      :placeholder="$t('lang_repayApply.sihfRepay.sirpCompanyPrompt')"  @on-click="selectHCompany"/>
          </span>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpDept')">
             <span @dblclick="clearDepart">
               <Input v-model="sirpDeptDis" icon="search" :readonly="true"
                      :placeholder="$t('lang_repayApply.sihfRepay.sirpDeptPrompt')"  @on-click="pickDepart"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpEmpworkno')" prop="sirpEmpworkno">
            <span @dblclick="clearEmp">
              <Input @on-click="pickDataEmp" icon="search" :readonly="true"
                     :placeholder="$t('lang_repayApply.sihfRepay.sirpEmpworkno')"
                     v-model="form.sirpEmpworkno"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpEmptype')">
            <Input v-model="form.sirpEmptypeDis" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpEmpgid')">
            <Input v-model="form.sirpEmpgid" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpCname')">
            <Input v-model="form.sirpCname" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpLastname')">
            <Input v-model="form.sirpLastname" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpFirstname')">
            <Input v-model="form.sirpFirstname" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpIdtype')">
            <Input v-model="form.sirpIdtypeDis" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpIdno')">
            <Input v-model="form.sirpIdno" disabled></Input>
          </FormItem>
        </i-col>

        <i-col span="11" >
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpBenefitlocation')" prop="sirpBenefitlocation">
             <span @dblclick="clearCity2">
              <Input @on-click="pickDataCity" icon="search" :readonly="true"
                     :placeholder="$t('lang_repayApply.sihfRepay.sirpBenefitlocation')"
                     v-model="form.sirpBenefitlocationDis"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpBenefitpolicy')"  prop="sirpBenefitpolicy">
            <span @dblclick="clearPolicy">
              <Input @on-click="pickDataPolicy" icon="search" :readonly="true"
                     :placeholder="$t('lang_repayApply.sihfRepay.sirpBenefitpolicy')"
                     v-model="form.sirpBenefitpolicyDis"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpBenefittype')"  prop="sirpBenefittype">
            <Select v-model="form.sirpBenefittype"
                    :placeholder="$t('lang_repayApply.sihfRepay.sirpBenefittype')" :transfer="true">
              <Option :value="item.paramCode" v-for="(item,index) in benefitacctype" :key="index">
                {{item.paramInfoName}}
              </Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpBaseamt')" prop="sirpBaseamt">
            <Input v-model="form.sirpBaseamt" ></Input>
          </FormItem>
        </i-col>
        <i-col span="23" ></i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpSmonth')"  prop="sirpSmonth">
            <DatePicker type="month" :placeholder="$t('lang_repayApply.sihfRepay.sirpSmonth')" :editable="false"
                        v-model="form.sirpSmonth" :transfer="true" style="width: 100%"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpEmonth')"  prop="sirpEmonth">
            <DatePicker type="month" :placeholder="$t('lang_repayApply.sihfRepay.sirpEmonth')" :editable="false"
                        v-model="form.sirpEmonth" :transfer="true" style="width: 100%"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpPaymonth')"  prop="sirpPaymonth">
            <DatePicker type="month" :placeholder="$t('lang_repayApply.sihfRepay.sirpPaymonth')" :editable="false"
                        v-model="form.sirpPaymonth" :transfer="true" style="width: 100%"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11"  offset="1">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpStatus')">
            <Input v-model="form.sirpStatusDis" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpReason')" prop="sirpReason">
            <Input v-model="form.sirpReason" :autosize="{minRows: 2,maxRows: 5}" type="textarea"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_repayApply.sihfRepay.sirpComment')">
            <Input v-model="form.sirpComment" type="textarea"></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
    <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    <!--雇佣公司-->
    <transition name="fade">
      <searchHCompany v-show="openHCompany" @closeHCompany="closeHCompany" :searchHCClo="searchHCClo"
                      @inputHCompany="inputHCompany" :params="paramsHCompany" ref="searchHCompany"></searchHCompany>
    </transition>
    <!--部门-->
    <transition name="fade">
      <searchDept v-show="openDept" @closeDept="closeDept" :searchDeptClo="searchDeptClo" @inputDept="inputDept" :params="paramsDept" ref="searchDept"></searchDept>
    </transition>
    <transition name="fade">
      <searchPubEmp v-show="openPickEmp" @closeUp="closeEmp" @changeinput="changeinputEmp"
                    ref="searchPubEmp"></searchPubEmp>
    </transition>
    <transition name="fade">
      <searchCityPub v-show="openPickCity" @closeUp="closeCity" @changeinput="changeinputCity"
                     ref="searchCityPub"></searchCityPub>
    </transition>
    <transition name="fade">
      <searcSihfPolicy v-show="openPickPolicy" @closeUp="closePolicy" @changeinput="changeinputPolicy"
                       ref="searcSihfPolicy"></searcSihfPolicy>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'
  import searchHCompany from '../../../../components/searchTable/searchHCompany'
  import searchDept from '../../../../components/searchTable/searchDept'
  import searchPubEmp from '../../../../components/searchTable/searchPubEmpOther'
  import searchCityPub from '../../../../components/searchTable/searchCityPub'
  import searcSihfPolicy from '../../../../components/searchTable/searcSihfPolicy'
  import valid from '../../../../lib/pub_valid'

  export default {
    data() {
      const sirpBaseamtcheck = (rule, value, caaaaa) => {
          if (valid.val_number105(value)) {
            return caaaaa()
          }
          return caaaaa(new Error(rule.message))
      }
      return {
        form: {
          _mt: 'sihfRepay.addOrUpd',
          sirpCompany: '',
          sirpEmpworkno: '',
          sirpEmpgid: '',
          sirpCname: '',
          sirpLastname: '',
          sirpFirstname: '',
          sirpIdtype: '',
          sirpIdno: '',
          sirpBenefitlocation: '',
          sirpBenefitpolicy: '',
          sirpBenefittype: '',
          sirpSmonth: '',
          sirpEmonth: '',
          sirpPaymonth: '',
          sirpBaseamt: '',
          sirpReason: '',
          sirpComment: '',
          sirpStatus: '01draft',
          sirpCompanyDis: '',
          sirpDeptDis: '',
          sirpDept: '',
          sirpIdtypeDis: '',
          sirpEmptype: '',
          sirpEmptypeDis: '',
          sirpBenefitlocationDis: '',
          sirpBenefitpolicyDis: '',
          sirpStatusDis: this.$t('button.edi'),
        },
        benefitacctype: [],
        showPhone: true,
        openDept: false,
        //      部门
        searchDeptClo: [
          {
            title: this.$t('lang_employee.searchColumn.unitCodeDepart'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.departCnFullName'),
            key: 'unitsFname',
          },
        ],
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
        openHCompany: false,
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
        sirpCompanyDis: '',
        sirpDeptDis: '',
        openPickEmp: false,
        openPickCity: false,
        openPickPolicy: false,
        ruleValidate: {
          sirpEmpworkno: [
            { required: true, message: this.$t('lang_repayApply.sihfRepay.sirpEmpworknoWarning'), trigger: 'change' },
          ],
          sirpBenefitlocation: [
            { required: true, message: this.$t('lang_repayApply.sihfRepay.sirpBenefitlocationWarning'), trigger: 'change' },
          ],
          sirpBenefitpolicy: [
            { required: true, message: this.$t('lang_repayApply.sihfRepay.sirpBenefitlocationWarning'), trigger: 'change' },
          ],
          sirpBenefittype: [
            { required: true, message: this.$t('lang_repayApply.sihfRepay.sirpBenefitlocationWarning'), trigger: 'change' },
          ],
          sirpReason: [
            { required: true, message: this.$t('lang_repayApply.sihfRepay.sirpBenefitlocationWarning'), trigger: 'change' },
          ],
          sirpBaseamt: [
            { required: true, message: this.$t('lang_repayApply.sihfRepay.sirpBaseamtWarning'), trigger: 'blur' },
            { validator: sirpBaseamtcheck, message: this.$t('lang_repayApply.sihfRepay.sirpBaseamtWarning'), trigger: 'blur' },
          ],
          sirpSmonth: [
            { required: true, type: 'date', message: this.$t('lang_repayApply.sihfRepay.sirpSmonthWarning'), trigger: 'change' },
          ],
          sirpEmonth: [
            { required: true, type: 'date', message: this.$t('lang_repayApply.sihfRepay.sirpEmonthWarning'), trigger: 'change' },
          ],
          sirpPaymonth: [
            { required: true, type: 'date', message: this.$t('lang_repayApply.sihfRepay.sirpPaymonthWarning'), trigger: 'change' },
          ],
        },
      }
    },
    props: {
      logType: String,
      index: Number,
    },
    mounted() {
    },
    components: {
      searchHCompany,
      searchDept,
      searchPubEmp,
      searchCityPub,
      searcSihfPolicy,
    },
    methods: {
      getdata() {
        const t = this
        const params = {
          _mt: 'sihfRepay.getById',
          id: t.$store.state.repayApply.mainId,
          logType: '根据id查询',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.form.sirpCompany = res.data.content[0].sirpCompany
            this.form.sirpEmpworkno = res.data.content[0].sirpEmpworkno
            this.form.sirpEmpgid = res.data.content[0].sirpEmpgid
            this.form.sirpCname = res.data.content[0].sirpCname
            this.form.sirpLastname = res.data.content[0].sirpLastname
            this.form.sirpFirstname = res.data.content[0].sirpFirstname
            this.form.sirpIdtype = res.data.content[0].sirpIdtype
            this.form.sirpIdno = res.data.content[0].sirpIdno
            this.form.sirpEmptype = res.data.content[0].sirpEmptype
            this.form.sirpBenefitlocation = res.data.content[0].sirpBenefitlocation
            this.form.sirpBenefitpolicy = res.data.content[0].sirpBenefitpolicy
            this.form.sirpBenefittype = res.data.content[0].sirpBenefittype
            this.form.sirpSmonth = res.data.content[0].sirpSmonth
            this.form.sirpEmonth = res.data.content[0].sirpEmonth
            this.form.sirpPaymonth = res.data.content[0].sirpPaymonth
            this.form.sirpBaseamt = res.data.content[0].sirpBaseamt
            this.form.sirpReason = res.data.content[0].sirpReason
            this.form.sirpComment = res.data.content[0].sirpComment
            this.form.sirpCompanyDis = res.data.content[0].sirpCompanyDis
            t.sirpCompanyDis = res.data.content[0].sirpCompanyDis
            this.form.sirpDeptDis = res.data.content[0].sirpDeptDis
            t.sirpDeptDis = res.data.content[0].sirpDeptDis
            this.form.sirpDept = res.data.content[0].sirpDept
            this.form.sirpBenefitlocationDis = res.data.content[0].sirpBenefitlocationDis
            this.form.sirpBenefitpolicyDis = res.data.content[0].sirpBenefitpolicyDis
            this.form.sirpEmptypeDis = res.data.content[0].sirpEmptypeDis
            this.form.sirpIdtypeDis = res.data.content[0].sirpIdtypeDis
            t.$store.commit('repayApply/setInsuranceId', res.data.content[0].sirpBenefitpolicy)
            this.$store.commit('repayHfrepay/setMonthCount', res.data.content[0].sirpfmonCount)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const data = deepCopy(t.form)
        if (t.$store.state.repayApply.mainId) {
          data.id = t.$store.state.repayApply.mainId
        }
        if (data.sirpSmonth !== '' && data.sirpEmonth !== '') {
          const startMonth = data.sirpSmonth.getMonth()
          const endMonth = data.sirpEmonth.getMonth()
          const intervalMonth = (data.sirpEmonth.getFullYear() * 12 + endMonth) - (data.sirpSmonth.getFullYear() * 12 + startMonth) + 1
          this.$store.commit('repayApply/setMonthCount', intervalMonth)
        }
        if (data.sirpSmonth !== '') {
          data.sirpSmonth = data.sirpSmonth.format('yyyy-MM')
        }
        if (data.sirpEmonth !== '') {
          data.sirpEmonth = data.sirpEmonth.format('yyyy-MM')
        }
        if (data.sirpPaymonth !== '') {
          data.sirpPaymonth = data.sirpPaymonth.format('yyyy-MM')
        }
        data.logType = t.logType
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$store.commit('repayApply/setInsuranceId', res.data.content[0].sirpBenefitpolicy)
                t.$store.commit('repayApply/setMainId', res.data.content[0].id)
//                t.$emit('closeUp')
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
                  t.$emit('updateCopy')
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
      clear() {
        this.form.sirpCompany = ''
        this.form.sirpDept = ''
        this.form.sirpEmpworkno = ''
        this.form.sirpEmpgid = ''
        this.form.sirpCname = ''
        this.form.sirpLastname = ''
        this.form.sirpFirstname = ''
        this.form.sirpIdtype = ''
        this.form.sirpIdno = ''
        this.form.sirpEmptype = ''
        this.form.sirpBenefitlocation = ''
        this.form.sirpBenefitpolicy = ''
        this.form.sirpBenefittype = ''
        this.form.sirpSmonth = ''
        this.form.sirpEmonth = ''
        this.form.sirpPaymonth = ''
        this.form.sirpBaseamt = ''
        this.form.sirpReason = ''
        this.form.sirpComment = ''
        this.form.sirpEmptypeDis = ''
        this.form.sirpBenefitlocationDis = ''
        this.form.sirpBenefitpolicyDis = ''
        this.form.sirpCompanyDis = ''
        this.sirpCompanyDis = ''
        this.form.sirpDeptDis = ''
        this.sirpDeptDis = ''
        this.form.sirpStatusDis = this.$t('button.edi')
        this.form.sirpIdtypeDis = ''
        this.$store.commit('repayApply/setMainId', '')
        this.$store.commit('repayApply/setInsuranceId', '')
        this.$refs.form.resetFields()
      },
      //  雇佣公司
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
        t.sirpCompanyDis = name
        t.form.sirpCompany = id
      },
      dbHCompany() {
        const t = this
        t.sirpCompanyDis = ''
        t.form.sirpCompany = ''
        t.clearDepart()
      },
      // 弹出框公司----end
      // 弹出框部门----start
      pickDepart() {
        const t = this
        if (t.form.sirpCompany === undefined || t.form.sirpCompany === '') {
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: '请选择公司',
          })
        } else {
          const paramsDept = deepCopy(t.paramsDept)
          t.$refs.searchDept.getData(paramsDept, t.form.sirpCompany)
          t.openDept = true
        }
      },
      inputDept(name, id) {
        const t = this
        t.sirpDeptDis = name
        t.form.sirpDept = id
      },
      clearDepart() {
        const t = this
        t.sirpDeptDis = ''
        t.form.sirpDept = ''
        t.clearEmp()
      },
      closeDept() {
        const t = this
        t.$refs.searchDept.unitCode = ''
        t.openDept = false
      },
      // 弹出框部门----end
      // 弹出框雇员----start
      pickDataEmp() {
        const t = this
        if (t.form.sirpCompany === undefined || t.form.sirpCompany === '' || t.form.sirpCompany === undefined || t.form.sirpDept === '') {
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: this.$t('lang_repayApply.sihfRepay.sirpEmpWarning'),
          })
        } else {
          this.$refs.searchPubEmp.getDataByBerms(this.form.sirpCompany, this.form.sirpDept)
          this.openPickEmp = true
        }
      },
//      social社保信息 benefit公积金信息
      changeinputEmp(row) {
        const t = this
        t.form.sirpEmpworkno = row.empkiWorkno
        t.form.sirpEmpgid = row.empGid
        t.form.sirpCname = row.empCname
        t.form.sirpLastname = row.empLastname
        t.form.sirpFirstname = row.empFirstname
        t.form.sirpIdtype = row.empidType
        t.form.sirpIdtypeDis = row.empidTypeDis
        t.form.sirpIdno = row.empidNo
        t.form.sirpEmptype = row.empkiEmptype
        t.form.sirpEmptypeDis = row.empkiEmptypeDis
        t.form.sirpBenefitlocation = row.empbntBenefitlocation
        t.form.sirpBenefitlocationDis = row.empbntBenefitlocationDis
      },
      clearEmp() {
        const t = this
        t.form.sirpEmpworkno = ''
        t.form.sirpEmpgid = ''
        t.form.sirpCname = ''
        t.form.sirpLastname = ''
        t.form.sirpFirstname = ''
        t.form.sirpIdtype = ''
        t.form.sirpIdtypeDis = ''
        t.form.sirpIdno = ''
        t.form.sirpEmptype = ''
        t.form.sirpEmptypeDis = ''
        t.form.sirpBenefitlocation = ''
        t.form.sirpBenefitlocationDis = ''
      },
      closeEmp() {
        const t = this
        t.openPickEmp = false
      },
      // 弹出框雇员----end
      // 弹出框城市----start
      pickDataCity() {
        this.$refs.searchCityPub.getData()
        this.openPickCity = true
      },
      changeinputCity(row) {
        const t = this
        t.form.sirpBenefitlocationDis = row.cityName
        t.form.sirpBenefitlocation = row.id
        t.form.sirpBenefitpolicy = ''
        t.form.sirpBenefitpolicyDis = ''
      },
      clearCity2() {
        const t = this
        t.form.sirpBenefitlocation = ''
        t.form.sirpBenefitlocationDis = ''
        t.form.sirpBenefitpolicy = ''
        t.form.sirpBenefitpolicyDis = ''
      },
      closeCity() {
        const t = this
        t.openPickCity = false
      },
      // 弹出框城市----end
      // 弹出框社保政策----start
      pickDataPolicy() {
        if (this.form.sirpBenefitlocation !== '') {
          this.$refs.searcSihfPolicy.getData('01social', this.form.sirpBenefitlocation)
          this.openPickPolicy = true
        } else {
          this.$Modal.warning({
            title: this.$t('reminder.err'),
            content: '请选择补缴社保缴纳地',
          })
        }
      },
      changeinputPolicy(name, id) {
        const t = this
        t.form.sirpBenefitpolicyDis = name
        t.form.sirpBenefitpolicy = id
        t.$store.commit('repayApply/setInsuranceId', id)
      },
      clearPolicy() {
        const t = this
        t.form.sirpBenefitpolicy = ''
        t.form.sirpBenefitpolicyDis = ''
      },
      closePolicy() {
        const t = this
        t.openPickPolicy = false
      },
      //弹出框社保政策----end
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'benefitacctype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.benefitacctype = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .option-main {
    position: relative;
    height: 500px;
    .btn {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>
