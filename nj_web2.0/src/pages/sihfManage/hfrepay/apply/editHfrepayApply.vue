<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="140">
        <i-col span="11">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpCompany')">
            <span @dblclick="dbHCompany">
              <Input @on-click="selectHCompany" icon="search" :readonly="true"
                     :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpCompanyPrompt')"
                     v-model="sihfrpCompanyDis"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpDept')">
            <span @dblclick="clearDepart">
              <Input @on-click="pickDepart" icon="search" :readonly="true"
                     :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpDeptPrompt')"
                     v-model="sihfrpDeptDis"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpEmpworkno')" prop="sihfrpEmpworkno">
            <span @dblclick="clearEmp">
              <Input @on-click="pickDataEmp" icon="search" :readonly="true"
                     :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpEmpworknoPrompt')"
                     v-model="form.sihfrpEmpworkno"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpEmptype')">
            <Input v-model="form.sihfrpEmptypeDis" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpEmpgid')">
            <Input v-model="form.sihfrpEmpgid" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpCname')">
            <Input v-model="form.sihfrpCname" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpLastname')">
            <Input v-model="form.sihfrpLastname" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpFirstname')">
            <Input v-model="form.sihfrpFirstname" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpIdtype')">
            <Input v-model="form.sihfrpIdtypeDis" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpIdno')">
            <Input v-model="form.sihfrpIdno" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpBenefitlocation')" prop="sihfrpBenefitlocation">
             <span @dblclick="clearCity2">
              <Input @on-click="pickDataCity" icon="search" :readonly="true"
                     :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpBenefitlocationPrompt')"
                     v-model="form.sihfrpBenefitlocationDis"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpBenefitpolicy')"  prop="sihfrpBenefitpolicy">
            <span @dblclick="clearPolicy">
              <Input @on-click="pickDataPolicy" icon="search" :readonly="true"
                     :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpBenefitpolicyPrompt')"
                     v-model="form.sihfrpBenefitpolicyDis"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpBenefittype')"  prop="sihfrpBenefittype">
            <Select v-model="form.sihfrpBenefittype"
                    :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpBenefittype')" :transfer="true">
              <Option :value="item.paramCode" v-for="(item,index) in benefitacctype" :key="index">
                {{item.paramInfoName}}
              </Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpBaseamt')" prop="sihfrpBaseamt">
            <Input v-model="form.sihfrpBaseamt" ></Input>
          </FormItem>
        </i-col>
        <i-col span="23" ></i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpSmonth')"  prop="sihfrpSmonth">
            <DatePicker type="month" :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpSmonth')"
                        :editable="false"v-model="form.sihfrpSmonth" :transfer="true" style="width: 100%"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpEmonth')"  prop="sihfrpEmonth">
            <DatePicker type="month" :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpEmonth')" :editable="false"
                        v-model="form.sihfrpEmonth" :transfer="true" style="width: 100%"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpPaymonth')"  prop="sihfrpPaymonth">
            <DatePicker type="month" :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpPaymonth')" :editable="false"
                        v-model="form.sihfrpPaymonth" :transfer="true" style="width: 100%"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpStatus')">
            <Input v-model="form.sihfrpStatusDis" disabled></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpReason')" prop="sihfrpReason">
            <Input v-model="form.sihfrpReason" :autosize="{minRows: 2,maxRows: 5}"  type="textarea"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_hfrepay.sihfHfrepay.sihfrpComment')">
            <Input v-model="form.sihfrpComment" :autosize="{minRows: 2,maxRows: 5}"  type="textarea"></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
    <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
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
    <!--雇佣公司-->
    <transition name="fade">
      <searchHCompany v-show="openHCompany" @closeHCompany="closeHCompany" :searchHCClo="searchHCClo"
                      @inputHCompany="inputHCompany" :params="paramsHCompany" ref="searchHCompany"></searchHCompany>
    </transition>
    <!--部门-->
    <transition name="fade">
      <searchDept v-show="openDept" @closeDept="closeDept" :searchDeptClo="searchDeptClo" @inputDept="inputDept" :params="paramsDept" ref="searchDept"></searchDept>
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
          _mt: 'sihfHfrepay.addOrUpd',
          sihfrpCompany: '',
          sihfrpDept: '',
          sihfrpEmpworkno: '',
          sihfrpEmpgid: '',
          sihfrpCname: '',
          sihfrpLastname: '',
          sihfrpFirstname: '',
          sihfrpIdtype: '',
          sihfrpIdno: '',
          sihfrpEmptype: '',
          sihfrpBenefitlocation: '',
          sihfrpBenefitpolicy: '',
          sihfrpBenefittype: '',
          sihfrpSmonth: '',
          sihfrpEmonth: '',
          sihfrpPaymonth: '',
          sihfrpBaseamt: '',
          sihfrpReason: '',
          sihfrpStatus: '01draft',
          sihfrpComment: '',
          sihfrpCompanyDis: '',
          sihfrpDeptDis: '',
          sihfrpIdtypeDis: '',
          sihfrpEmptypeDis: '',
          sihfrpBenefitlocationDis: '',
          sihfrpBenefitpolicyDis: '',
          sihfrpStatusDis: '编辑中',
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
            key: 'compFnameCnDis',
          },
          {
            title: this.$t('lang_employee.searchColumn.departEnFullName'),
            key: 'compFnameEnDis',
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
        sihfrpDeptDis: '',
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
            key: 'compFnameCnDis',
          },
          {
            title: this.$t('lang_employee.searchColumn.compEnFullName'),
            key: 'compFnameEnDis',
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
        sihfrpCompanyDis: '',
        openPickEmp: false,
        openPickCity: false,
        openPickPolicy: false,
        ruleValidate: {
          sihfrpEmpworkno: [
            { required: true, message: this.$t('lang_hfrepay.sihfHfrepay.sihfrpEmpworknoWarning'), trigger: 'change' },
          ],
          sihfrpBenefitlocation: [
            { required: true, message: this.$t('lang_hfrepay.sihfHfrepay.sihfrpBenefitlocationWarning'), trigger: 'change' },
          ],
          sihfrpBenefitpolicy: [
            { required: true, message: this.$t('lang_hfrepay.sihfHfrepay.sihfrpBenefitpolicyPrompt'), trigger: 'change' },
          ],
          sihfrpBenefittype: [
            { required: true, message: this.$t('lang_hfrepay.sihfHfrepay.sihfrpBenefittypeWarning'), trigger: 'change' },
          ],
          sihfrpReason: [
            { required: true, message: this.$t('lang_hfrepay.sihfHfrepay.sihfrpReasonWarning'), trigger: 'change' },
          ],
          sihfrpBaseamt: [
            { required: true, message: this.$t('lang_hfrepay.sihfHfrepay.sihfrpBaseamtWarning'), trigger: 'blur' },
            { validator: sirpBaseamtcheck, message: this.$t('lang_hfrepay.sihfHfrepay.sihfrpBaseamtWarning'), trigger: 'blur' },
          ],
          sihfrpSmonth: [
            { required: true, type: 'date', message: this.$t('lang_hfrepay.sihfHfrepay.sihfrpSmonthWarning'), trigger: 'change' },
          ],
          sihfrpEmonth: [
            { required: true, type: 'date', message: this.$t('lang_hfrepay.sihfHfrepay.sihfrpEmonthWarning'), trigger: 'change' },
          ],
          sihfrpPaymonth: [
            { required: true, type: 'date', message: this.$t('lang_hfrepay.sihfHfrepay.sihfrpPaymonthWarning'), trigger: 'change' },
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
          _mt: 'sihfHfrepay.getById',
          id: t.$store.state.repayHfrepay.mainId,
          logType: '根据id查询',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.form.sihfrpCompany = res.data.content[0].sihfrpCompany
            this.form.sihfrpDept = res.data.content[0].sihfrpDept
            this.form.sihfrpEmpworkno = res.data.content[0].sihfrpEmpworkno
            this.form.sihfrpEmpgid = res.data.content[0].sihfrpEmpgid
            this.form.sihfrpCname = res.data.content[0].sihfrpCname
            this.form.sihfrpLastname = res.data.content[0].sihfrpLastname
            this.form.sihfrpFirstname = res.data.content[0].sihfrpFirstname
            this.form.sihfrpIdtype = res.data.content[0].sihfrpIdtype
            this.form.sihfrpIdno = res.data.content[0].sihfrpIdno
            this.form.sihfrpEmptype = res.data.content[0].sihfrpEmptype
            this.form.sihfrpBenefitlocation = res.data.content[0].sihfrpBenefitlocation
            this.form.sihfrpBenefitlocationDis = res.data.content[0].sihfrpBenefitlocationDis
            this.form.sihfrpBenefitpolicy = res.data.content[0].sihfrpBenefitpolicy
            this.form.sihfrpBenefittype = res.data.content[0].sihfrpBenefittype
            this.form.sihfrpSmonth = res.data.content[0].sihfrpSmonth
            this.form.sihfrpEmonth = res.data.content[0].sihfrpEmonth
            this.form.sihfrpPaymonth = res.data.content[0].sihfrpPaymonth
            this.form.sihfrpBaseamt = res.data.content[0].sihfrpBaseamt
            this.form.sihfrpReason = res.data.content[0].sihfrpReason
            this.form.sihfrpStatus = res.data.content[0].sihfrpStatus
            this.form.sihfrpComment = res.data.content[0].sihfrpComment
            this.form.sihfrpCompany = res.data.content[0].sihfrpCompany
            this.sihfrpCompanyDis = res.data.content[0].sihfrpCompanyDis
            this.form.sihfrpDept = res.data.content[0].sihfrpDept
            this.sihfrpDeptDis = res.data.content[0].sihfrpDeptDis
            this.form.sihfrpIdtypeDis = res.data.content[0].sihfrpIdtypeDis
            this.form.sihfrpEmptype = res.data.content[0].sihfrpEmptype
            this.form.sihfrpEmptypeDis = res.data.content[0].sihfrpEmptypeDis
            this.form.sihfrpBenefitlocation = res.data.content[0].sihfrpBenefitlocation
            this.form.sihfrpBenefitlocationDis = res.data.content[0].sihfrpBenefitlocationDis
            this.form.sihfrpBenefitpolicy = res.data.content[0].sihfrpBenefitpolicy
            this.form.sihfrpBenefitpolicyDis = res.data.content[0].sihfrpBenefitpolicyDis
            this.form.sihfrpStatus = res.data.content[0].sihfrpStatus
            this.form.sihfrpStatusDis = res.data.content[0].sihfrpStatusDis
            this.$store.commit('repayHfrepay/setInsuranceId', res.data.content[0].sihfrpBenefitpolicy)
            this.$store.commit('repayHfrepay/setMonthCount', res.data.content[0].sihfmonCount)
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
        if (t.$store.state.repayHfrepay.mainId) {
          data.id = t.$store.state.repayHfrepay.mainId
        }
        if (data.sihfrpSmonth !== '' && data.sihfrpEmonth !== '') {
          const startMonth = data.sihfrpSmonth.getMonth();
          const endMonth = data.sihfrpEmonth.getMonth();
          const intervalMonth = (data.sihfrpEmonth.getFullYear()*12+endMonth) - (data.sihfrpSmonth.getFullYear()*12+startMonth) + 1;
          this.$store.commit('repayHfrepay/setMonthCount', intervalMonth)
        }
        if (data.sihfrpSmonth !== '' ) {
          data.sihfrpSmonth = data.sihfrpSmonth.format('yyyy-MM')
        }
        if (data.sihfrpEmonth !== '' ) {
          data.sihfrpEmonth = data.sihfrpEmonth.format('yyyy-MM')
        }
        if (data.sihfrpPaymonth !== '' ) {
          data.sihfrpPaymonth = data.sihfrpPaymonth.format('yyyy-MM')
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
                t.$store.commit('repayHfrepay/setMainId', res.data.content[0].id)
                t.$store.commit('repayHfrepay/setInsuranceId', res.data.content[0].sihfrpBenefitpolicy)
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
      clear() {
        this.form.sihfrpCompany = ''
        this.sihfrpCompanyDis = ''
        this.form.sihfrpDept = ''
        this.sihfrpDeptDis = ''
        this.form.sihfrpEmpworkno = ''
        this.form.sihfrpEmpgid = ''
        this.form.sihfrpCname = ''
        this.form.sihfrpLastname = ''
        this.form.sihfrpFirstname = ''
        this.form.sihfrpIdtype = ''
        this.form.sihfrpIdno = ''
        this.form.sihfrpEmptype = ''
        this.form.sihfrpBenefitlocation = ''
        this.form.sihfrpBenefitpolicy = ''
        this.form.sihfrpBenefittype = ''
        this.form.sihfrpSmonth = ''
        this.form.sihfrpEmonth = ''
        this.form.sihfrpPaymonth = ''
        this.form.sihfrpBaseamt = ''
        this.form.sihfrpReason = ''
        this.form.sihfrpStatus = ''
        this.form.sihfrpComment = ''
        this.form.sihfrpCompanyDis = ''
        this.form.sihfrpDeptDis = ''
        this.form.sihfrpIdtypeDis = ''
        this.form.sihfrpEmptypeDis = ''
        this.form.sihfrpBenefitlocationDis = ''
        this.form.sihfrpBenefitpolicyDis = ''
        this.form.sihfrpStatusDis = '编辑中'
        this.$store.commit('repayHfrepay/setMainId', '')
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
        t.sihfrpCompanyDis = name
        t.form.sihfrpCompany = id
      },
      dbHCompany() {
        const t = this
        t.sihfrpCompanyDis = ''
        t.form.sihfrpCompany = ''
        t.clearDepart()
      },
      // 弹出框公司----end
      // 弹出框部门----start
      pickDepart() {
        const t = this
        if (t.form.sihfrpCompany === undefined || t.form.sihfrpCompany === '') {
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: '请选择公司',
          })
        } else {
          const paramsDept = deepCopy(t.paramsDept)
          t.$refs.searchDept.getData(paramsDept, t.form.sihfrpCompany)
          t.openDept = true
        }
      },
      inputDept(name, id) {
        const t = this
        t.sihfrpDeptDis = name
        t.form.sihfrpDept = id
      },
      clearDepart() {
        const t = this
        t.sihfrpDeptDis = ''
        t.form.sihfrpDept = ''
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
        if (t.form.sihfrpCompany === undefined || t.form.sihfrpCompany === '' || t.form.sihfrpDept === undefined || t.form.sihfrpDept === '') {
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: this.$t('lang_hfrepay.sihfHfrepay.empWarning'),
          })
        } else {
          this.$refs.searchPubEmp.getDataByBerms(t.form.sihfrpCompany, t.form.sihfrpDept)
          this.openPickEmp = true
        }
      },
      changeinputEmp(row, id) {
        const t = this
        t.form.sihfrpEmpworkno = row.empkiWorkno
        t.form.sihfrpEmpgid = row.empGid
        t.form.sihfrpCname = row.empCname
        t.form.sihfrpLastname = row.empLastname
        t.form.sihfrpFirstname = row.empFirstname
        t.form.sihfrpIdtype = row.empidType
        t.form.sihfrpIdtypeDis = row.empidTypeDis
        t.form.sihfrpIdno = row.empidNo
        t.form.sihfrpEmptype = row.empkiEmptype
        t.form.sihfrpEmptypeDis = row.empkiEmptypeDis
        t.form.sihfrpBenefitlocation = row.empbntBenefitlocation
        t.form.sihfrpBenefitlocationDis = row.empbntBenefitlocationDis
      },
      clearEmp() {
        const t = this
        t.form.sihfrpEmpworkno = ''
        t.form.sihfrpEmpgid = ''
        t.form.sihfrpCname = ''
        t.form.sihfrpLastname = ''
        t.form.sihfrpFirstname = ''
        t.form.sihfrpIdtype = ''
        t.form.sihfrpIdtypeDis = ''
        t.form.sihfrpIdno = ''
        t.form.sihfrpEmptype = ''
        t.form.sihfrpEmptypeDis = ''
        t.form.sihfrpBenefitlocationDis = ''
      },
      closeEmp() {
        const t = this
        t.openPickEmp = false
      },
      // 弹出框雇员----end
      // 弹出框公积金缴纳地----start
      pickDataCity() {
        this.$refs.searchCityPub.getData()
        this.openPickCity = true
      },
      changeinputCity(row) {
        const t = this
        t.form.sihfrpBenefitlocationDis = row.cityName
        t.form.sihfrpBenefitlocation = row.id
        t.form.sihfrpBenefitpolicyDis = ''
        t.form.sihfrpBenefitpolicy = ''
      },
      clearCity2() {
        const t = this
        t.form.sihfrpBenefitlocation = ''
        t.form.sihfrpBenefitlocationDis = ''
        t.form.sihfrpBenefitpolicyDis = ''
        t.form.sihfrpBenefitpolicy = ''
      },
      closeCity() {
        const t = this
        t.openPickCity = false
      },
      // 弹出框公积金缴纳地----end
      // 弹出框公积金政策----start
      pickDataPolicy() {
        if ('' !== this.form.sihfrpBenefitlocation) {
          this.$refs.searcSihfPolicy.getData('02hfund', this.form.sihfrpBenefitlocation)
          this.openPickPolicy = true
        } else {
          this.$Modal.warning({
            title: this.$t('reminder.err'),
            content: this.$t('lang_hfrepay.sihfHfrepay.sihfrpBenefitlocationWarning'),
          })
        }
      },
      changeinputPolicy(name, id) {
        const t = this
        t.form.sihfrpBenefitpolicyDis = name
        t.form.sihfrpBenefitpolicy = id
      },
      clearPolicy() {
        const t = this
        t.form.sihfrpBenefitpolicy = ''
        t.form.sihfrpBenefitpolicyDis = ''
      },
      closePolicy() {
        const t = this
        t.openPickPolicy = false
      },
      // 弹出框公积金政策----end
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
