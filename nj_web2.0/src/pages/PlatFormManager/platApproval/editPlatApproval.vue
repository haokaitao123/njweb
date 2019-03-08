<template>
  <div class="option-main">
    <Row>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  label-position="right" :label-width="120">
        <i-col span="11">
          <FormItem :label="$t('lang_approval.platapprovallist.aprvCode')" prop="aprvCode">
            <Input v-model="formValidate.aprvCode" :disabled="editDisbale" :placeholder="$t('lang_approval.platapprovallist.aprvCodeDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_approval.platapprovallist.aprvName')" prop="aprvName">
            <Input v-model="formValidate.aprvName" :disabled="editDisbale" :placeholder="$t('lang_approval.platapprovallist.aprvNameDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_approval.platapprovallist.aprvStatus')" prop="aprvStatus">
            <Select v-model="formValidate.aprvStatus" :disabled="editDisbale" :placeholder="$t('lang_approval.platapprovallist.aprvStatusDis')" transfer>
              <Option :value="item.paramCode" v-for="(item,index) in selectAprvStatus" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_approval.platapprovallist.aprvFormtype')" prop="aprvFormtype">
            <Select v-model="formValidate.aprvFormtype" :disabled="editDisbale">
              <Option :value="item.paramCode" v-for="(item,index) in selectFormType" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_approval.platapprovallist.aprvForm')" prop="aprvForm">
             <span @dblclick="clear1">
                <Input v-model="aprvFormDis" :disabled="editDisbale" icon="search" :readonly="true" :placeholder="$t('lang_approval.platapprovallist.aprvFormDis')"  @on-click="pickData"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11"  offset="1">
            <FormItem :label="$t('lang_approval.platapprovallist.aprvVersion')" prop="aprvVersion">
              <Input v-model="formValidate.aprvVersion" :disabled="editDisbale" :placeholder="$t('lang_approval.platapprovallist.aprvVersionDis')"></Input>
            </FormItem>
          </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_approval.platapprovallist.aprvAfthd')" prop="aprvAfthdclass">
            <Input v-model="formValidate.aprvAfthdclass" :disabled="editDisbale"  :placeholder="$t('lang_approval.platapprovallist.aprvAfthdDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_approval.platapprovallist.aprvComment')" prop="aprvComment">
            <Input v-model="formValidate.aprvComment" :disabled="editDisbale" type="textarea"  :autosize="{minRows: 2,maxRows: 5}"  :placeholder="$t('lang_approval.platapprovallist.aprvCommentDis')"></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
    <transition name="fade">
      <searchTable v-show="openPick" :searchCloumns="searchCloumns" :params="params" :searchTitle="searchTitle" :searchText="searchText" @closeUp="close"
                   @changeinput="changeinput" ref="searchTable"></searchTable>
    </transition>
    <Button class="btn" type="primary" v-show="!editDisbale" @click="handleSubmit">{{$t('button.sav')}}</Button>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import searchTable from '../../../components/searchTable/searchTable'
  import { isSuccess, deepCopy } from '../../../lib/util'


  export default {
    data() {
      return {
        openPick: false,
        editDisbale: false, // 是否可编辑
        selectAprvStatus: [],
        selectFormType: [],
        aprvStatusDis: '',
        aprvFormtypeDis: '',
        aprvFormDis: '',
        logType: '',
        formValidate: {
          _mt: 'platApproval.addOrUpd',
          aprvCode: '',
          aprvName: '',
          aprvStatus: '',
          aprvFormtype: '',
          aprvForm: '',
          aprvAfthdclass: '',
          aprvComment: '',
          aprvVersion: '',
          funId: '1',
        },
        searchTitle: this.$t('lang_approval.platapprovallist.searchTitle'),
        searchCloumns: [
          {
            title: this.$t('lang_approval.platapprovallist.sformName'),
            key: 'sformName',
            sortable: 'custom',
            width: 253,
          },
          {
            title: this.$t('lang_approval.platapprovallist.sformTbname'),
              key: 'sformTbname',
            sortable: 'custom',
            width: 253,
          },
        ],
        searchText: this.$t('lang_approval.platapprovallist.searchText'),
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
          aprvCode: [
            { required: true, message: this.$t('lang_approval.platapprovallist.aprvCodeDis'), trigger: 'blur' },
          ],
          aprvName: [
            { required: true, message: this.$t('lang_approval.platapprovallist.aprvNameDis'), trigger: 'blur' },
          ],
          aprvForm: [
            { required: true, message: this.$t('lang_approval.platapprovallist.aprvFormDis'), trigger: 'blur' },
          ],
          aprvFormtype: [
            { required: true, message:this.$t('lang_approval.platapprovallist.aprvFormtypeDis'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {
      searchTable,
    },
    updated() {

    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getData() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platApproval.getById',
          id: t.$store.state.platApproval.mainId,
          funId: '1',
          logType: '根据id查询审批流程信息',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.aprvCode = res.data.content[0].aprvCode
            t.formValidate.aprvName = res.data.content[0].aprvName
            t.formValidate.aprvStatus = res.data.content[0].aprvStatus
            if (t.formValidate.aprvStatus !== '01draft') { // 不是编辑中的状态就不可修改
              t.editDisbale = true
            }
            t.aprvStatusDis = res.data.content[0].aprvStatusDis
            t.formValidate.aprvFormtype = res.data.content[0].aprvFormtype
            t.aprvFormtypeDis = res.data.content[0].aprvFormtypeDis
            t.formValidate.aprvForm = res.data.content[0].aprvForm
            t.aprvFormDis = res.data.content[0].aprvFormDis
            t.formValidate.aprvAfthdclass = res.data.content[0].aprvAfthdclass
            t.formValidate.aprvVersion = res.data.content[0].aprvVersion
            t.formValidate.aprvComment = res.data.content[0].aprvComment
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        t.logType = t.$store.state.platApproval.mainLogType
        data.logType = t.logType
        data.id = t.$store.state.platApproval.mainId
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
                  t.$store.commit('platApproval/setMainId', res.data.content[0].id)
                  t.$store.commit('platApproval/addNewArrayMainTable', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$store.commit('platApproval/updateArrayMainTable', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
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
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'pubuserstatus,formtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectAprvStatus = res.data.content[0].value[0].paramList.splice(1,3)
            t.selectFormType = res.data.content[0].value[1].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      pickData() {
        const t = this
        if (t.editDisbale) {
          return
        }
        t.$refs.searchTable.getData(this.params)
        t.openPick = true
      },
      changeinput(name, code) {
        const t = this
        t.aprvFormDis = name
        t.formValidate.aprvForm = code
      },
      clear() {
        const t = this
        t.aprvFormDis = ''
        t.aprvStatusDis = ''
        t.aprvFormtypeDis = ''
        t.formValidate.aprvCode = ''
        t.formValidate.aprvName = ''
        t.formValidate.aprvStatus = ''
        t.formValidate.aprvFormtype = ''
        t.formValidate.aprvForm = ''
        t.formValidate.aprvAfthdclass = ''
        t.formValidate.aprvVersion = ''
        t.formValidate.aprvComment = ''
        this.editDisbale = false
        this.$refs.formValidate.resetFields()
      },
      clear1() {
        const t = this
        if (t.editDisbale) {
          return
        }
        t.aprvFormDis = ''
        t.formValidate.aprvForm = ''
        t.formValidate.aprvAfthdclass = ''
        t.formValidate.aprvVersion = ''
      },
      close() {
        const t = this
        t.openPick = false
      },
    },
    watch: {
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

