<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
          <i-col span="11">
            <FormItem :label="$t('lang_flow.dataBlock.flsdbOrder')" prop="flsdbOrder">
              <Input v-model="formValidate.flsdbOrder" :placeholder="$t('lang_flow.dataBlock.p_flsdbOrder')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_flow.dataBlock.flsdbType')" prop="flsdbType">
              <Select  v-model="formValidate.flsdbType" :placeholder="$t('lang_flow.dataBlock.p_flsdbType')">
                <Option :value="item.paramCode" v-for="(item,index1) in DBType" :key="index1">{{item.paramInfoName}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_flow.dataBlock.flsdbCnName')" prop="flsdbName">
              <Input v-model="formValidate.flsdbName" :placeholder="$t('lang_flow.dataBlock.p_flsdbCnName')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1" >
            <FormItem :label="$t('lang_flow.dataBlock.flsdbDisclms')" prop="flsdbDisclms" v-if ="formValidate.flsdbType ==='01form'">
              <Select  v-model="formValidate.flsdbDisclms" :placeholder="$t('lang_flow.dataBlock.p_flsdbDisclms')">
                <Option :value="item.paramCode" v-for="(item,index2) in displayCol" :key="index2">{{item.paramInfoName}}</Option>
              </Select>
            </FormItem>
          </i-col>

          <i-col span="11">
            <FormItem :label="$t('lang_flow.dataBlock.flsdbSubformtype')"  prop="flsdbSubformtype" v-if ="formValidate.flsdbType ==='02subtable'">
              <Select  v-model="formValidate.flsdbSubformtype" :placeholder="$t('lang_flow.dataBlock.p_flsdbSubformtype')">
                <Option :value="item.paramCode" v-for="(item,index2) in formType" :key="index2">{{item.paramInfoName}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_flow.dataBlock.flsdbSubform')" prop="flsdbSubform" v-if ="formValidate.flsdbType ==='02subtable'">
            <span @dblclick="stClear">
                <Input v-model="flsdbSubformDis" icon="search" :readonly="true" :placeholder="$t('lang_flow.dataBlock.p_flsdbSubform')"  @on-click="pickData"/>
            </span>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_flow.dataBlock.flsdbSubisupd')" prop="flsdbSubisupd" v-if ="formValidate.flsdbType ==='02subtable'">
              <RadioGroup v-model="formValidate.flsdbSubisupd"  >
                <Radio :label="item.paramCode" v-for="(item,index) in YesOrNoType" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <!--:offset="formValidate.flsdbType === '' ? 0 : 1"-->
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_flow.dataBlock.flsdbOptauth')" prop="flsdbOptauth">
              <Select v-model="formValidate.flsdbOptauth" :placeholder="$t('lang_flow.dataBlock.p_flsdbOptauth')">
                <Option :value="item.paramCode" v-for="(item,index3) in fieldAuth" :key="index3">{{item.paramInfoName}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_flow.dataBlock.flsdbSubfilter')" v-if ="formValidate.flsdbType ==='02subtable'">
              <Input v-model="formValidate.flsdbSubfilter" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.dataBlock.p_flsdbSubfilter')"></Input>
            </FormItem>
          </i-col>
          <!--<i-col span="11">-->
            <!--<FormItem label="数据块唯一标识" prop="flsdbOnlymark">-->
              <!--<Input v-model="formValidate.flsdbOnlymark" readonly placeholder="请输入数据块唯一标识"></Input>-->
            <!--</FormItem>-->
          <!--</i-col>-->
          <i-col span="23">
            <FormItem :label="$t('lang_flow.dataBlock.flsdbDiscondition')">
              <span @dblclick="clearCondition">
                <Input v-model="formValidate.flsdbDiscondition" type="textarea" readonly="readonly" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.dataBlock.p_flsdbDiscondition')" style="width: 85%;margin-right: 10px;"></Input>
              </span>
            	<Button type="primary" @click="generConditionNow(NaN,'条件设置')">{{$t('lang_flow.flowcommon.plat_condition')}}</Button>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_flow.dataBlock.comment')">
              <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.dataBlock.p_comment')"></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    </div>
    <transition name="fade">
      <genrCondition v-show="openCondition"  @inputCondition="inputCondition"  @closeCondition="closeCondition"  ref="genrCondition"></genrCondition>
    </transition>
    <transition name="fade">
      <searchTable v-show="openPick" :searchCloumns="searchCloumns" :searchTitle="searchTitle" :searchText="searchText" :params="params" @closeUp="closeST" @changeinput="changeinput" ref="searchTable"></searchTable>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
//  import sffSysoptTable from '../../../components/searchTable/sffSysoptTable'
  import searchTable from '../../../components/searchTable/searchTable'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import genrCondition from './genrCondition'

  export default {
    data() {
      return {
        openPick: false,
      	openCondition: false,
        DBType: [],
        fieldAuth: [],
        displayCol: [],
        formType: [],
        YesOrNoType: [],
        flsdbTypeDis: '',
        flsdbOptauthDis: '',
        flsdbDisclmsDis: '',
        transmitName: '',
        transmitValue: '',
        flsdbSubformtypeDis: '',
        flsdbSubformDis: '',
        formValidate: {
          _mt: 'platflsDBlock.addOrUpd',
          flsdbStep: '',
          flsdbOrder: '',
          flsdbType: '01form',
          flsdbName: '',
          flsdbDiscondition: '',
          flsdbconditionMark: '',
          flsdbOptauth: '',
          flsdbDisclms: '',
          flsdbSubformtype: '',
          flsdbOnlymark: '',
          flsdbSubform: '',
          flsdbSubfilter: '',
          flsdbSubisupd: '1',
          comment: '',
          funId: '1',
          logType: '',
        },
        searchCloumns: [
          {
            title: this.$t('lang_flow.searchCloumns.sformName'),
            key: 'sformName',
            sortable: 'custom',
            width: 253,
          },
          {
            title: this.$t('lang_flow.searchCloumns.sformTbname'),
            key: 'sformTbname',
            sortable: 'custom',
            width: 253,
          },
        ],
        searchTitle: this.$t('lang_flow.searchCloumns.searchTitle'),
        searchText: this.$t('lang_flow.searchCloumns.searchText'),
        params: {
          _mt: 'platSysform.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
        },
        ruleValidate: {
          flsdbOrder: [
            { required: true, message: this.$t('lang_flow.dataBlock.p_flsdbOrder'), trigger: 'blur' },
          ],
          flsdbType: [
            { required: true, message: this.$t('lang_flow.dataBlock.p_flsdbType'), trigger: 'blur' },
          ],
          flsdbName: [
            { required: true, message: this.$t('lang_flow.dataBlock.p_flsdbCnName'), trigger: 'blur' },
          ],
          flsdbOptauth: [
            { required: true, message: this.$t('lang_flow.dataBlock.p_flsdbOptauth'), trigger: 'change' },
          ],
          flsdbDisclms: [
            { required: true, message: this.$t('lang_flow.dataBlock.p_flsdbDisclms'), trigger: 'blur' },
          ],
//          flsdbSubisupd: [
//            { required: true, message: '请选择子集是否可修改', trigger: 'blur' },
//          ],
          flsdbSubformtype: [
            { required: true, message: this.$t('lang_flow.dataBlock.p_flsdbSubformtype'), trigger: 'change' },
          ],
          flsdbSubform: [
            { required: true, message: this.$t('lang_flow.dataBlock.p_flsdbSubform'), trigger: 'change' },
          ],
        },
      }
    },
    props: {
      logType: '',
    },
    components: {
      searchTable,
    	genrCondition,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      close() {
        this.clear()
        this.$emit('hideMsg')
      },
      getFormData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platflsDBlock.getById',
          id: id,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.flsdbOrder = res.data.content[0].flsdbOrder
            t.formValidate.flsdbType = res.data.content[0].flsdbType
            t.formValidate.flsdbName = res.data.content[0].flsdbName
            t.formValidate.flsdbDiscondition = res.data.content[0].flsdbDiscondition
            t.formValidate.flsdbconditionMark = res.data.content[0].flsdbconditionMark
            t.formValidate.flsdbOptauth = res.data.content[0].flsdbOptauth
            t.formValidate.flsdbDisclms = res.data.content[0].flsdbDisclms
            t.formValidate.flsdbOnlymark = res.data.content[0].flsdbOnlymark
            t.formValidate.flsdbSubformtype = res.data.content[0].flsdbSubformtype
            t.formValidate.flsdbSubform = res.data.content[0].flsdbSubform
            t.formValidate.flsdbSubfilter = res.data.content[0].flsdbSubfilter
            t.formValidate.flsdbSubisupd = res.data.content[0].flsdbSubisupd ? res.data.content[0].flsdbSubisupd : '1',
            t.flsdbTypeDis = res.data.content[0].flsdbTypeDis
            t.flsdbDisclmsDis = res.data.content[0].flsdbDisclmsDis
            t.flsdbOptauthDis = res.data.content[0].flsdbOptauthDis
            t.flsdbSubformtypeDis = res.data.content[0].flsdbSubformtypeDis
            t.flsdbSubformDis = res.data.content[0].flsdbSubformDis
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
          typeCode: 'datablocktype,datafieldauth,datablockcolumns,formtype,yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.DBType = res.data.content[0].value[0].paramList
            t.fieldAuth = res.data.content[0].value[1].paramList
            t.displayCol = res.data.content[0].value[2].paramList
            t.formType = res.data.content[0].value[3].paramList
            t.YesOrNoType = res.data.content[0].value[4].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const data = deepCopy(t.formValidate)
        if (data.flsdbType === '02subtable') {
          delete this.ruleValidate.flsdbDisclms
//          delete this.ruleValidate.flsdbOptauth
        } else {
//          this.ruleValidate.flsdbOptauth = [
//            { required: true, message: '操作权限', trigger: 'change' },
//          ]
          this.ruleValidate.flsdbDisclms = [
            { required: true, message: '显示列', trigger: 'change' },
          ]
        }
        data.flsdbStep = t.$store.state.flowStepData.mainId
        data.logType = t.logType
        data.id = t.$store.state.flowStepData.childId1
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.flowStepData.childId1) {
                  t.$store.commit('flowStepData/addNewArrayChildTable1', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$store.commit('flowStepData/updateArrayChildTable1', res.data.content[0])
                }
                t.clear()
                t.close()
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
      // 当改变表单的Type是，出现相应的填写项
//      chgByType(value) {
//        if (value === '02subtable') {
//          delete this.ruleValidate.flsdbDisclms
//          delete this.ruleValidate.flsdbOptauth
//        } else {
//          this.ruleValidate.flsdbOptauth = [
//            { required: true, message: '操作权限', trigger: 'change' },
//          ]
//          this.ruleValidate.flsdbDisclms = [
//            { required: true, message: '显示列', trigger: 'change' },
//          ]
//        }
//      },
      pickData() {
        const t = this
        t.$refs.searchTable.getData(this.params)
        t.openPick = true
      },
      changeinput(name, code) {
        const t = this
        t.flsdbSubformDis = name
        t.formValidate.flsdbSubform = code
      },
      stClear() {
        const t = this
        t.flsdbSubformDis = ''
        t.formValidate.flsdbSubform = ''
      },
      closeST() {
        const t = this
        t.openPick = false
      },
      clear() {
        const t = this
        t.formValidate.flsdbOrder = ''
        t.formValidate.flsdbType = '01form'
        t.formValidate.flsdbName = ''
        t.formValidate.flsdbDiscondition = ''
        t.formValidate.flsdbconditionMark = ''
        t.formValidate.flsdbOptauth = ''
        t.formValidate.flsdbDisclms = ''
        t.formValidate.flsdbOnlymark = ''
        t.formValidate.flsdbSubformtype = ''
        t.formValidate.flsdbSubform = ''
        t.formValidate.flsdbSubfilter = ''
        t.flsdbTypeDis = ''
        t.flsdbDisclmsDis = ''
        t.flsdbOptauthDis = ''
        t.flsdbSubformtypeDis = ''
        t.flsdbSubformDis = ''
        t.$refs.formValidate.resetFields()
      },
      generConditionNow(id) {
      	const t = this
      	if (t.formValidate.flsdbDiscondition && t.formValidate.flsdbconditionMark) {
      		t.transmitName = t.formValidate.flsdbDiscondition
	      	t.transmitValue = t.formValidate.flsdbconditionMark
	      	t.$refs.genrCondition.getData(t.transmitName, t.transmitValue)
      	}
      	t.openCondition = true
      },
      closeCondition() {
      	const t = this
      	t.openCondition = false
      },
      inputCondition(name, value) {
      	const t = this
      	t.formValidate.flsdbDiscondition = name
        t.formValidate.flsdbconditionMark = value
      },
      clearCondition() {
        const t = this
        t.formValidate.flsdbDiscondition = ''
        t.formValidate.flsdbconditionMark = ''
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .box{
    height: 560px;
    overflow:hidden;
    .content{
      overflow-y: auto;
      position: absolute;
      height: 420px;
    }
  }
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
