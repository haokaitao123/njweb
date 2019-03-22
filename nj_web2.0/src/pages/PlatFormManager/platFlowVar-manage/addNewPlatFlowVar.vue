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
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <Row>
          <i-col span="12">
            <FormItem :label="$t('lang_platform.platFlowVar.flvarFormtype')" prop="flvarFormtype">
              <Select v-model="formValidate.flvarFormtype"  :placeholder="$t('lang_platform.platFlowVar.flvarFormtypeIns')">
                <Option :value="item.paramCode" v-for="(item,index) in selectFormType" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="12">
          <FormItem :label="$t('lang_platform.platFlowVar.flvarFlow')" prop="flvarFlow" v-show="formValidate.flvarFormtype === '01system'">
            <span @dblclick="clearFlow">
              <Input v-model="flvarFlowDis" icon="search" :readonly="true" :placeholder="$t('lang_platform.platFlowVar.flvarFlowIns')"  @on-click="pickData" />
            </span>
          </FormItem>
          </i-col>
          <i-col span="12">
          <FormItem :label="$t('lang_platform.platFlowVar.flvarMark')" prop="flvarMark">
            <Input v-model="formValidate.flvarMark" :placeholder="$t('lang_platform.platFlowVar.flvarMarkIns')"></Input>
          </FormItem>
          </i-col>
          <i-col span="12">
          <FormItem :label="$t('lang_platform.platFlowVar.flvarName')" prop="flvarName">
            <Input v-model="formValidate.flvarName" :placeholder="$t('lang_platform.platFlowVar.flvarNameIns')"></Input>
          </FormItem>
          </i-col>
          <i-col span="12">
          <FormItem :label="$t('lang_platform.platFlowVar.flvarValresource')" prop="flvarValresource">
            <Select v-model="formValidate.flvarValresource" :placeholder="$t('lang_platform.platFlowVar.flvarValresourceIns')">
              <Option :value="item.paramCode" v-for="(item,index) in selectValresource" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </i-col>
          <i-col span="12">
          <FormItem :label="$t('lang_platform.platFlowVar.flvarSysval')" prop="flvarSysval" v-if="formValidate.flvarValresource === '01sys'">
            <Select v-model="formValidate.flvarSysval" :placeholder="$t('lang_platform.platFlowVar.Ins')">
              <Option :value="item.id" v-for="(item,index) in selectFlvarSysval" :key="index">{{item.platVarCode}}</Option>
            </Select>
          </FormItem>
          </i-col>
          <i-col span="12">
          <FormItem :label="$t('lang_platform.platFlowVar.flvarFiled')" prop="flvarFiledDis" v-if="formValidate.flvarValresource === '02filed' || formValidate.flvarValresource === '03getbyfield'">
            <span @dblclick="clearFiled">
              <Input v-model="flvarFiledDis" icon="search" :readonly="true" :placeholder="$t('lang_platform.platFlowVar.flvarFiledIns')"  @on-click="pickData1" />
            </span>
          </FormItem>
          </i-col>
          <i-col span="12">
          <FormItem :label="$t('lang_platform.platFlowVar.flvarGetvalbyfiled')" prop="flvarGetvalbyfiledDis" v-if="formValidate.flvarValresource === '03getbyfield'">
            <span @dblclick="clearValbyfiled">
              <Input v-model="flvarGetvalbyfiledDis" icon="search" :readonly="true" :placeholder="$t('lang_platform.platFlowVar.flvarGetvalbyfiledIns')"  @on-click="pickData2" />
            </span>
          </FormItem>
          </i-col>
          <i-col span="12">
          <FormItem :label="$t('lang_platform.platFlowVar.flvarRtndatafmt')" prop="flvarRtndatafmt">
            <Select v-model="formValidate.flvarRtndatafmt" :placeholder="$t('lang_platform.platFlowVar.flvarRtndatafmtIns')">
              <Option :value="item.paramCode" v-for="(item,index) in selectFlvarRtndatafmt" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </i-col>
          <i-col span="12">
          <FormItem :label="$t('lang_platform.platFlowVar.flvarDatefmt')" prop="flvarDatefmt" v-if="formValidate.flvarRtndatafmt === '03date'">
            <Select v-model="formValidate.flvarDatefmt" :placeholder="$t('lang_platform.platFlowVar.flvarDatefmtIns')">
              <Option :value="item.paramCode" v-for="(item,index) in selectFlvarDatefmt" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem :label="$t('lang_platform.platFlowVar.flvarIscondition')" prop="flvarIscondition">
              <RadioGroup v-model="formValidate.flvarIscondition" :placeholder="$t('lang_platform.platFlowVar.flvarIsconditionIns')">
                <Radio :label="item.paramCode" v-for="(item,index) in selectYesNo" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="24">
          <FormItem :label="$t('lang_platform.platFlowVar.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.platFlowVar.commentIns')"></Input>
          </FormItem>
          </i-col>
          <i-col span="24">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
              <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </i-col>
        </Row>
      </Form>
    </div>
    <transition name="fade">
      <searchFlcontFlow v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="close" @changeinput="changeinput" ref="searchFlcontFlow"></searchFlcontFlow>
    </transition>
    <transition name="fade">
      <searchFlvarFiled v-show="openPick1" :searchCloumns="searchCloumns1" :params="params1" @closeUp="close1" @changeinput="changeinput1" ref="searchFlvarFiled"></searchFlvarFiled>
    </transition>
    <transition name="fade">
      <searchValbyfiled v-show="openPick2" :searchCloumns="searchCloumns2" :params="params2" @closeUp="close2" @changeinput="changeinput2" ref="searchValbyfiled"></searchValbyfiled>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchFlcontFlow from '../../../components/searchTable/searchPlatSysform'
  import searchFlvarFiled from '../../../components/searchTable/platSffieldPop'
  import searchValbyfiled from '../../../components/searchTable/searchPlatValbyfiled'

  export default {
    data() {
      return {
        selectFormType: [],
        selectValresource: [],
        selectFlvarSysval: [],
        selectFlvarRtndatafmt: [],
        selectFlvarDatefmt: [],
        selectYesNo: [],
        updateImg: false,
        formValidate: {
          _mt: 'platFlowVar.addOrUpd',
          funId: '1',
          flvarMark: '',
          flvarFormtype: '01system',
          flvarFlow: '',
          flvarName: '',
          flvarSysval: '',
          flvarValresource: '02filed',
          flvarFiled: '',
          flvarGetvalbyfiled: '',
          flvarRtndatafmt: '02string',
          flvarDatefmt: '',
          flvarIscondition: '0',
          comment: '',
        },
        openPick: false,
        openPick1: false,
        openPick2: false,
        flvarFlow: '',
        flvarFlowDis: '',
        flvarFiledDis: '',
        flvarGetvalbyfiledDis: '',
        params: {
          _mt: 'platSysform.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          data: '{}',
        },
        searchCloumns: [
          {
            title: this.$t('lang_platform.platFlowVar.sformName'),
            key: 'sformName',
            sortable: 'custom',
            width: 380,
          },
          {
            title: this.$t('lang_platform.platFlowVar.sformTbname'),
            key: 'sformTbname',
            sortable: 'custom',
            width: 379,
          },
        ],
        params1: {
          _mt: 'platSformfield.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          // flowId: '',
        },
        searchCloumns1: [
          {
            title: this.$t('lang_platform.platFlowVar.sffPhyfield'),
            key: 'sffPhyfield',
            width: 253,
          },
          {
            title: this.$t('lang_platform.platFlowVar.sffFieldNameCnDis'),
            key: 'sffName',
            width: 253,
          },

        ],
        params2: {
          _mt: 'platValdefinefield.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          data: '{}', // "vffMainid":"1014"
        },
        searchCloumns2: [
          {
            title: this.$t('lang_platform.platFlowVar.sourceName'),
            key: 'sourceName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.platFlowVar.vffPropname'),
            key: 'vffPropname',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.platFlowVar.vffProperty'),
            key: 'vffProperty',
            sortable: 'custom',
          },
        ],
        ruleValidate: {
          flvarFormtype: [
            { required: true, message: this.$t('lang_platform.platFlowVar.flvarFormtypeIns'), trigger: 'blur' },
          ],
          flvarFlow: [
            { required: true, message: this.$t('lang_platform.platFlowVar.flvarFlowIns'), trigger: 'blur' },
          ],
          flvarMark: [
            { required: true, message: this.$t('lang_platform.platFlowVar.flvarMarkIns'), trigger: 'blur' },
          ],
          flvarName: [
            { required: true, message: this.$t('lang_platform.platFlowVar.flvarNameIns'), trigger: 'blur' },
          ],
          flvarValresource: [
            { required: true, message: this.$t('lang_platform.platFlowVar.flvarValresourceIns'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {
      searchFlcontFlow,
      searchFlvarFiled,
      searchValbyfiled,
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    updated() {

    },
    mounted() {
      this.getSelect()
    },
    methods: {
//      setData() {
//        const f = this.formValidate
//        f.flvarFormtype = '01system'
//        f.flvarValresource = '02filed'
//        f.flvarRtndatafmt = '02string'
//        f.flvarIscondition = '0'
//      },
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platFlowVar.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.flvarFormtype = res.data.content[0].flvarFormtype
            t.formValidate.flvarMark = res.data.content[0].flvarMark
            t.formValidate.flvarFlow = res.data.content[0].flvarFlow
            t.formValidate.flvarRtndatafmt = res.data.content[0].flvarRtndatafmt
            t.formValidate.flvarDatefmt = res.data.content[0].flvarDatefmt
            t.formValidate.flvarIscondition = res.data.content[0].flvarIscondition
            t.formValidate.flvarName = res.data.content[0].flvarName
            t.formValidate.flvarSysval = res.data.content[0].flvarSysval
            t.formValidate.flvarValresource = res.data.content[0].flvarValresource
            t.formValidate.flvarFiled = res.data.content[0].flvarFiled
            t.formValidate.flvarGetvalbyfiled = res.data.content[0].flvarGetvalbyfiled
            t.formValidate.comment = res.data.content[0].comment
            t.flvarFlowDis = res.data.content[0].flvarFlowDis
            t.flvarFiledDis = res.data.content[0].flvarFiledDis
            t.flvarGetvalbyfiledDis = res.data.content[0].flvarGetvalbyfiledDis
            t.flvarFlow = res.data.content[0].flvarFlow
            console.log(t.formValidate)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      updateimg() {
        this.updateImg = true
      },
      closeImg() {
        const t = this
        t.updateImg = false
      },
      handleSubmit() {
        const t = this
        console.log(t.formValidate)
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        if (t.formValidate.flvarValresource !== '01sys') {
          data.flvarSysval = ''
        }
        if (t.formValidate.flvarValresource !== '02filed' && t.formValidate.flvarValresource !== '03getbyfield') {
          data.flvarFiled = ''
        }
        if (t.formValidate.flvarValresource !== '03getbyfield') {
          data.flvarGetvalbyfiled = ''
        }
        if (t.formValidate.flvarRtndatafmt !== '03date') {
          data.flvarDatefmt = ''
        }
        console.log(data)
        t.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.formValidate.resetFields()
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
              t.$Modal.error({
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
      changeinput(name, id) {
        const t = this
        t.flvarFlowDis = name
        t.formValidate.flvarFlow = id
      },
      pickData() {
        const t = this
        t.$refs.searchFlcontFlow.getData(this.params)
        t.openPick = true
      },
      close1() {
        const t = this
        t.openPick1 = false
      },
      changeinput1(name, id) {
        const t = this
        t.flvarFiledDis = name
        t.formValidate.flvarFiled = id
      },
      pickData1() {
        const t = this
        this.params1['sffForm'] = t.formValidate.flvarFlow
        t.$refs.searchFlvarFiled.getData(this.params1)
        t.openPick1 = true
      },
      close2() {
        const t = this
        t.openPick2 = false
      },
      changeinput2(name, id) {
        const t = this
        t.flvarGetvalbyfiledDis = name
        t.formValidate.flvarGetvalbyfiled = id
      },
      pickData2() {
        const t = this
        t.$refs.searchValbyfiled.getData(this.params2)
        t.openPick2 = true
      },
      clearFlow() {
        const t = this
        t.flvarFlowDis = ''
        t.formValidate.flvarFlow = ''
      },
      clearFiled() {
        const t = this
        t.flvarFiledDis = ''
        t.formValidate.flvarFiled = ''
      },
      clearValbyfiled() {
        const t = this
        t.flvarGetvalbyfiledDis = ''
        t.formValidate.flvarGetvalbyfiled = ''
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'varvaltype,yesno,formtype,vardatatype,dateformat',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectValresource = res.data.content[0].value[0].paramList
            t.selectYesNo = res.data.content[0].value[1].paramList
            t.selectFormType = res.data.content[0].value[2].paramList
            t.selectFlvarRtndatafmt = res.data.content[0].value[3].paramList
            t.selectFlvarDatefmt = res.data.content[0].value[4].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
        getDataLevelUserLogin({
          _mt: 'platFormVar.getSelectValue',
          data: '{}',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectFlvarSysval = (res.data.content[0].value)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset() {
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
