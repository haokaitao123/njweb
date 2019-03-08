<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_approval.dataBlock.title')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="120">
          <i-col span="11">
            <FormItem :label="$t('lang_approval.dataBlock.aprvdbOrder')" prop="aprvdbOrder">
              <Input v-model="formValidate.aprvdbOrder" :placeholder="$t('lang_approval.dataBlock.aprvdbOrderDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_approval.dataBlock.aprvdbType')" prop="aprvdbType">
              <Select  v-model="formValidate.aprvdbType">
                <Option :value="item.paramCode" v-for="(item,index1) in DBType" :key="index1">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_approval.dataBlock.aprvdbTitlecn')" prop="aprvdbTitlecn">
              <Input v-model="formValidate.aprvdbTitlecn" :placeholder="$t('lang_approval.dataBlock.aprvdbTitlecnDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_approval.dataBlock.aprvdbTitleen')" prop="aprvdbTitleen">
              <Input v-model="formValidate.aprvdbTitleen" :placeholder="$t('lang_approval.dataBlock.aprvdbTitleenDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_approval.dataBlock.aprvdbDisclms')"  prop="aprvdbDisclms" v-if ="formValidate.aprvdbType ==='01form'">
              <Select  v-model="formValidate.aprvdbDisclms">
                <Option :value="item.paramCode" v-for="(item,index2) in displayCol" :key="index2">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_approval.dataBlock.aprvdbSubformtype')"  prop="aprvdbSubformtype" v-if ="formValidate.aprvdbType ==='02subtable'">
              <Select  v-model="formValidate.aprvdbSubformtype" :placeholder="$t('lang_approval.dataBlock.p_aprvdbSubformtype')">
                <Option :value="item.paramCode" v-for="(item,index2) in formType" :key="index2">{{item.paramInfoName}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_approval.dataBlock.aprvdbSubform')" prop="aprvdbSubform" v-if ="formValidate.aprvdbType ==='02subtable'">
            <span @dblclick="stClear">
                <Input v-model="aprvdbSubformDis" icon="search" :readonly="true" :placeholder="$t('lang_approval.dataBlock.p_aprvdbSubform')"  @on-click="pickData"/>
            </span>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_approval.dataBlock.aprvdbSubisupd')" prop="aprvdbSubisupd" v-if ="formValidate.aprvdbType ==='02subtable'">
              <RadioGroup v-model="formValidate.aprvdbSubisupd"  >
                <Radio :label="item.paramCode" v-for="(item,index) in YesOrNoType" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_approval.dataBlock.aprvdbSubfilter')" v-if ="formValidate.aprvdbType ==='02subtable'">
              <Input v-model="formValidate.aprvdbSubfilter" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_approval.dataBlock.p_aprvdbSubfilter')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_approval.dataBlock.aprvdbComment')" prop="aprvdbComment">
              <Input v-model="formValidate.aprvdbComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_approval.dataBlock.aprvdbCommentDis')"></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    </div>
    <transition name="fade">
      <searchTable v-show="openPick" :searchCloumns="searchCloumns" :searchTitle="searchTitle" :searchText="searchText" :params="params" @closeUp="closeST" @changeinput="changeinput" ref="searchTable"></searchTable>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import sffSysoptTable from '../../../components/searchTable/sffSysoptTable'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchTable from '../../../components/searchTable/searchTable'

  export default {
    data() {
      return {
        openPick: false,
        DBType: [],
        displayCol: [],
        formType: [],
        YesOrNoType: [],
        aprvdbSubformDis: '',
        formValidate: {
          _mt: 'platAprvdatablock.addOrUpd',
          aprvdbAprvid: '',
          aprvdbOrder: '',
          aprvdbType: '01form',
          aprvdbTitlecn: '',
          aprvdbTitleen: '',
          aprvdbDisclms: '',
          aprvdbComment: '',
          aprvdbSubform: '',
          aprvdbSubfilter: '',
          aprvdbSubisupd: '1',
          aprvdbSubformtype: '',
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
          aprvdbOrder: [
            { required: true, message: this.$t('lang_approval.dataBlock.aprvdbOrderDis'), trigger: 'blur' },
          ],
          aprvdbType: [
            { required: true, message: this.$t('lang_approval.dataBlock.aprvdbTypeDis'), trigger: 'blur' },
          ],
          aprvdbTitlecn: [
            { required: true, message: this.$t('lang_approval.dataBlock.aprvdbTitlecnDis'), trigger: 'blur' },
          ],
          aprvdbTitleen: [
            { required: true, message: this.$t('lang_approval.dataBlock.aprvdbTitleenDis'), trigger: 'blur' },
          ],
          aprvdbDisclms: [
            { required: true, message: this.$t('lang_approval.dataBlock.aprvdbDisclmsDis'), trigger: 'blur' },
          ],
          aprvdbSubformtype: [
            { required: true, message: this.$t('lang_approval.dataBlock.p_aprvdbSubformtype'), trigger: 'change' },
          ],
          aprvdbSubform: [
            { required: true, message: this.$t('lang_approval.dataBlock.p_aprvdbSubform'), trigger: 'change' },
          ],
        },
      }
    },
    props: {
      logType: '',
    },
    components: {
      searchTable,
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
        console.log(t.DBType)
        getDataLevelUserLogin({
          _mt: 'platAprvdatablock.getById',
          id: id,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.aprvdbOrder = res.data.content[0].aprvdbOrder
            t.formValidate.aprvdbType = res.data.content[0].aprvdbType
            t.formValidate.aprvdbTitlecn = res.data.content[0].aprvdbTitlecn
            t.formValidate.aprvdbTitleen = res.data.content[0].aprvdbTitleen
            t.formValidate.aprvdbDisclms = res.data.content[0].aprvdbDisclms
            t.formValidate.aprvdbComment = res.data.content[0].aprvdbComment
            t.formValidate.aprvdbSubform = res.data.content[0].aprvdbSubform
            t.formValidate.aprvdbSubfilter = res.data.content[0].aprvdbSubfilter
            t.formValidate.aprvdbSubisupd = res.data.content[0].aprvdbSubisupd ? res.data.content[0].aprvdbSubisupd : '1'
            t.formValidate.aprvdbSubformtype = res.data.content[0].aprvdbSubformtype
            t.aprvdbSubformDis = res.data.content[0].aprvdbSubformDis
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
          typeCode: 'datablocktype,datablockcolumns,formtype,yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.DBType = res.data.content[0].value[0].paramList
            t.displayCol = res.data.content[0].value[1].paramList
            t.formType = res.data.content[0].value[2].paramList
            t.YesOrNoType = res.data.content[0].value[3].paramList
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
        if (data.aprvdbType === '02subtable') {
          delete this.ruleValidate.aprvdbDisclms
        } else {
          this.ruleValidate.aprvdbDisclms = [
            { required: true, message: '显示列', trigger: 'change' },
          ]
        }
        data.aprvdbAprvid = t.$store.state.platApproval.mainId
        data.logType = t.logType
        data.id = t.$store.state.platApproval.childId6
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.platApproval.childId6) {
                  t.$store.commit('platApproval/addNewArrayChildTable6', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$store.commit('platApproval/updateArrayChildTable6', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
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
      pickData() {
        const t = this
        t.$refs.searchTable.getData(this.params)
        t.openPick = true
      },
      changeinput(name, code) {
        const t = this
        t.aprvdbSubformDis = name
        t.formValidate.aprvdbSubform = code
      },
      stClear() {
        const t = this
        t.aprvdbSubformDis = ''
        t.formValidate.aprvdbSubform = ''
      },
      closeST() {
        const t = this
        t.openPick = false
      },
      clear() {
        const t = this
        t.formValidate.aprvdbOrder = ''
        t.formValidate.aprvdbType = '01form'
        t.formValidate.aprvdbTitlecn = ''
        t.formValidate.aprvdbTitleen = ''
        t.formValidate.aprvdbDisclms = ''
        t.formValidate.aprvdbComment = ''
        t.formValidate.aprvdbSubformtype = ''
        t.formValidate.aprvdbSubform = ''
        t.formValidate.aprvdbSubfilter = ''
        t.aprvdbSubformtypeDis = ''
        t.aprvdbSubformDis = ''
        t.$refs.formValidate.resetFields()
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
