<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_payroll.platAplInfo.flowstepInfo')}}
        </div>
        <Button type="text" @click="clear">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
  <div class="option-main">
    <Row>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  label-position="right" :label-width="100">
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.platAplInfo.apstCode')" prop="apstCode">
            <Input v-model="formValidate.apstCode" :placeholder="$t('lang_payroll.platAplInfo.apstCodeIns')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_payroll.platAplInfo.apstName')" prop="apstName">
            <Input v-model="formValidate.apstName" :placeholder="$t('lang_payroll.platAplInfo.apstNameIns')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_payroll.platAplInfo.apstApprovetype')" prop="apstApprovetype">
            <Select  v-model="formValidate.apstApprovetype" @on-change="change">
              <Option :value="item.paramCode" v-for="(item,index) in approvetype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_payroll.platAplInfo.apstApprovelevel')" prop="apstApprovelevel" v-if="formValidate.apstApprovetype === '01bylevel'">
            <Select  v-model="formValidate.apstApprovelevel">
              <Option :value="item.paramCode" v-for="(item,index) in approvelevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_payroll.platAplInfo.apstApprovepost')"  prop="apstApprovepost"  v-if="formValidate.apstApprovetype === '02bypost'">
              <span @dblclick="cleardb">
                <Input v-model="apstApprovepostDis" :readonly="true" icon="search"  :placeholder="$t('lang_payroll.platAplInfo.apstApprovepostIns')" @on-click="pickData"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11" >
          <FormItem :label="$t('lang_payroll.platAplInfo.apstDesapprover')"  prop="apstDesapprover" v-if="formValidate.apstApprovetype === '04byperson'">
              <span @dblclick="cleardb1">
                <Input v-model="apstDesapproverDis" :readonly="true" icon="search"  :placeholder="$t('lang_payroll.platAplInfo.apstDesapproverIns')" @on-click="pickData1"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11"  >
          <FormItem :label="$t('lang_payroll.platAplInfo.apstApprovemode')" prop="apstApprovemode">
            <Select  v-model="formValidate.apstApprovemode">
              <Option :value="item.paramCode" v-for="(item,index) in approvemode" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_payroll.platAplInfo.apstComment')" prop="apstComment">
            <Input v-model="formValidate.apstComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.platAplInfo.apstCommentIns')"></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
    <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    <transition name="fade">
      <searchTable v-show="openPick" :searchPostClo="searchCloumns" :params="params"  @inputPost="inputPost" @closePost="closeTable" @changeinput="changeinput" ref="searchTable"></searchTable>
    </transition>
    <transition name="fade">
      <searchFlowcontacts v-show="openPick1" :searchCloumns="searchCloumns1" :params="params1" @closeUp="close1" @changeinput="changeinput1" ref="searchFlowcontacts"></searchFlowcontacts>
    </transition>
     </div>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'
  import searchTable from '../../../../components/searchTable/searchPost'
  import searchFlowcontacts from '../../../../components/searchTable/searchFlowcontacts'
  import Bus from '../../../.././lib/bus'
  export default {
    data() {
      return {
        baseId: '',
        openPick: false,
        openPick1: false,
        approvetype: [],
        approvelevel: [],
        approvemode: [],
        apstApprovepostDis: '',
        apstDesapproverDis: '',
        formValidate: {
          _mt: 'platAprvstep.addOrUpd',
          funId: '1',
          apstCode: '',
          apstApprovetype: '',
          apstApprovelevel: '',
          apstApprovemode: '',
          apstName: '',
          apstApprovepost: '',
          apstDesapprover: '',
          apstComment: '',
        },
        ruleValidate: {
          apstCode: [
            { required: true, message: this.$t('lang_payroll.platAplInfo.apstCodeIns'), trigger: 'blur' },
          ],
          apstApprovetype: [
            { required: true, message: this.$t('lang_payroll.platAplInfo.apstApprovetypeIns'), trigger: 'blur' },
          ],
          apstApprovelevel: [
            { required: true, message: this.$t('lang_payroll.platAplInfo.apstApprovelevelIns'), trigger: 'blur' },
          ],
          apstApprovepost: [
            { required: true, message: this.$t('lang_payroll.platAplInfo.apstApprovepostIns'), trigger: 'blur' },
          ],
          apstDesapprover: [
            { required: true, message: this.$t('lang_payroll.platAplInfo.apstDesapproverIns'), trigger: 'blur' },
          ],
          apstName: [
            { required: true, message: this.$t('lang_payroll.platAplInfo.apstNameIns'), trigger: 'blur' },
          ],
          apstApprovemode: [
            { required: true, message: this.$t('lang_payroll.platAplInfo.apstApprovemodeIns'), trigger: 'blur' },
          ],
        },
        searchCloumns: [
          {
            title: this.$t('lang_employee.searchColumn.postCode'),
            key: 'postCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.postFnameCnDis'),
            key: 'postFname',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.postFnameEnDis'),
            key: 'postFnameEnDis',
            sortable: 'custom',
          },
        ],
        params: {
          _mt: 'orgPost.getPage',
          rows: '10',
          page: '1',
          sort: 'id',
          order: 'desc',
          logType: '岗位',
        },
        searchCloumns1: [
          {
            title: this.$t('lang_payroll.platAplInfo.flcontMark'),
            key: 'flcontMark',
            sortable: 'custom',
//          width: 130,
          },
          {
            title: this.$t('lang_payroll.platAplInfo.flcontName'),
            key: 'flcontName',
            sortable: 'custom',
//          width: 130,
          },
          {
            title: this.$t('lang_payroll.platAplInfo.flcontValueName'),
            key: 'flcontValueName',
            sortable: 'custom',
//          width: 140,
          },
        ],
        params1: {
          _mt: 'platFlowcontacts.getPage',
          sort: 'id',
          order: 'desc',
          rows: '10',
          page: '1',
          logType: this.$t('button.ser'),
          data: '{}',
        },
      }
    },
    components: {
      searchTable,
      searchFlowcontacts,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
        /*
        * 修改时初始数据
        * */
      getdata() {
        const t = this
        const data = {
          _mt: 'platAprvstep.getById',
          id: t.baseId,      //  步骤id
          funId: '1',
          logType: this.$t('button.ser'),
        }
            getDataLevelUserLogin(data).then((res) => {
              if (isSuccess(res, t)) {
                t.formValidate.apstCode = res.data.content[0].apstCode
                t.formValidate.apstName = res.data.content[0].apstName
                t.formValidate.apstApprovelevel = res.data.content[0].apstApprovelevel
                t.formValidate.apstApprovemode = res.data.content[0].apstApprovemode
                t.formValidate.apstApprovetype = res.data.content[0].apstApprovetype
                t.apstApprovepostDis = res.data.content[0].apstApprovepostDis
                t.formValidate.apstApprovepost = res.data.content[0].apstApprovepost
                t.apstDesapproverDis = res.data.content[0].apstDesapproverDis
                t.formValidate.apstDesapprover = res.data.content[0].apstDesapprover
                t.formValidate.apstComment = res.data.content[0].apstComment
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
      },
      change(value) {
        const t = this
        if (value !== '01bylevel') {
//          t.formValidate.apstApprovelevel.resetFields()
          t.formValidate.apstApprovelevel = ''
        }
        if (value !== '02bypost') {
//          t.formValidate.apstApprovepost.resetFields()
          t.apstApprovepostDis = ''
          t.formValidate.apstApprovepost = ''
        }
        if (value !== '04byperson') {
//          t.formValidate.apstDesapprover.resetFields()
          t.apstDesapproverDis = ''
          t.formValidate.apstDesapprover = ''
        }
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'approvetype,approvelevel,approvemode',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.approvetype = res.data.content[0].value[0].paramList
            t.approvelevel = res.data.content[0].value[1].paramList
            t.approvemode = res.data.content[0].value[2].paramList
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
        t.openPick = true
        t.$refs.searchTable.getData(t.params)
      },
      closeTable() {
        const t = this
        t.openPick = false
      },
      changeinput(name, id) {
        const t = this
          t.apstApprovepostDis = name
          t.formValidate.apstApprovepost = id
      },
      cleardb() {
        const t = this
        t.apstApprovepostDis = ''
        t.formValidate.apstApprovepost = ''
      },
      cleardb1() {
        const t = this
        t.apstDesapproverDis = ''
        t.formValidate.apstDesapprover = ''
      },
      close1() {
        const t = this
        t.openPick1 = false
      },
      changeinput1(name, id) {
        const t = this
        t.formValidate.apstDesapprover = id
        t.apstDesapproverDis = name
      },
      pickData1() {
        const t = this
        t.$refs.searchFlowcontacts.getData(this.params1, 'approvalFlow', t.$store.state.platApproval.mainId)
        t.openPick1 = true
      },
      setId(id) {
        this.baseId = id
        this.getdata()
      },
      /*
      * 新增或者修改
      * */
      save() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = '修改'
        data.id = t.baseId
        data.apstAprvid = t.$store.state.platApproval.mainId
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              Bus.$emit('ApprovaleditText', res.data.content[0].apstAprvid)
              if (isSuccess(res, t)) {
                t.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: this.$t('reminder.updsuccess'),
                })
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
      inputPost(name, id, postName, postId) {
        const t = this
        t.formValidate.apstApprovepost = id
        t.apstApprovepostDis = name
      },
      clear() {
        this.formValidate.apstCode = ''
        this.formValidate.apstApprovepost = ''
        this.formValidate.apstApprovelevel = ''
        this.formValidate.apstApprovemode = ''
        this.formValidate.apstApprovetype = ''
        this.apstApprovepostDis = ''
        this.apstComment = ''
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
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
  @import "../../../../sass/updateAndAdd";
  .operBtn .ivu-row{
    margin-bottom: 20px;
  }
</style>
