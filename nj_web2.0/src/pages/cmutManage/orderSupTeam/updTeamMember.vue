<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
          <i-col span="11">
            <FormItem :label="$t('lang_cmut.TeamMem.cmstmStid')" prop="cmstmStid">
              <Input v-model="$store.state.orderTeam.teamName" readonly ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_cmut.TeamMem.cmstmCode')" prop="cmstmCode">
              <Input v-model="formValidate.cmstmCode"  :placeholder="$t('lang_cmut.TeamMem.p_cmstmCode')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_cmut.TeamMem.cmstmUserid')" prop="cmstmUserid">
              <span @dblclick="clearDubUser">
                <Input v-model="cmstmUseridDis" icon="search" :readonly="true" :placeholder="$t('lang_cmut.TeamMem.p_cmstmUserid')" @on-click="pickDataUserInfo"/>
              </span>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_cmut.TeamMem.mobileNo')" prop="mobileNo">
              <Input v-model="mobileNo" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_cmut.TeamMem.loginName')" prop="loginName">
              <Input v-model="loginName" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_cmut.TeamMem.email')" prop="email">
              <Input v-model="email" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_cmut.TeamMem.cmstmDistribute')" prop="cmstmDistribute">
              <RadioGroup  v-model="formValidate.cmstmDistribute">
                <Radio :label="item.paramCode" v-for="(item,index) in yesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_cmut.TeamMem.cmstmIsvalid')"  prop="cmstmIsvalid">
              <RadioGroup  v-model="formValidate.cmstmIsvalid">
                <Radio :label="item.paramCode" v-for="(item,index) in yesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_cmut.TeamMem.comment')" prop="comment">
              <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_cmut.TeamMem.p_comment')"></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <Button class="btncal" type="ghost" @click="close">{{$t('button.cal')}}</Button>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    </div>
    <transition name="fade">
      <searchBusiUser v-show="openPickUser"  @closeUp="closeUser" @changeinput="changeinput2" ref="searchBusiUser"></searchBusiUser>
    </transition>
  </div>
</template>
<script>
  import searchBusiUser from '../../../components/searchTable/searchBusiUser'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        yesOrNo: [],
        cmstmStidDis: '',
        cmstmUseridDis: '',
        cmstmDistributeDis: '',
        cmstmIsvalidDis: '',
        openPickUser: false,
        mobileNo: '',
        loginName: '',
        email: '',
        formValidate: {
          _mt: 'cmutSupteammember.addOrUpd',
          cmstmStid: this.$store.state.orderTeam.mainId,
          cmstmCode: '',
          cmstmUserid: '',
          cmstmDistribute: '',
          cmstmIsvalid: '1',
          comment: '',
        },
        ruleValidate: {
          cmstmCode: [
            { required: true, message: this.$t('lang_cmut.TeamMem.rule_cmstmCode'), trigger: 'blur' },
          ],
          cmstmUserid: [
            { required: true, message: this.$t('lang_cmut.TeamMem.rule_cmstmUserid'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      logType: String,
    },
    components: {
      searchBusiUser,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      close() {
        this.clear()
        this.$emit('hideMsg')
      },
      getFormData() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'cmutSupteammember.getById',
          id: t.$store.state.orderTeam.childId1,
          logType: this.$t('button.ser'),
          funId: '1',
          companyId: '0',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.cmstmStid = res.data.content[0].cmstmStid
            t.formValidate.cmstmCode = res.data.content[0].cmstmCode
            t.formValidate.cmstmUserid = res.data.content[0].cmstmUserid
            t.formValidate.cmstmDistribute = res.data.content[0].cmstmDistribute
            t.formValidate.cmstmIsvalid = res.data.content[0].cmstmIsvalid
            t.formValidate.comment = res.data.content[0].comment
            t.cmstmStidDis = res.data.content[0].cmstmStidDis
            t.cmstmUseridDis = res.data.content[0].cmstmUseridDis
            t.cmstmDistributeDis = res.data.content[0].cmstmDistributeDis
            t.cmstmIsvalidDis = res.data.content[0].cmstmIsvalidDis
            t.loginName = res.data.content[0].loginName
            t.email = res.data.content[0].email
            t.mobileNo = res.data.content[0].mobileNo
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
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.yesOrNo = res.data.content[0].value[0].paramList
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
        if (t.$store.state.orderTeam.childId1) {
          data.id = t.$store.state.orderTeam.childId1
          data.logType = '修改'
        } else {
          data.logType = '新增'
          data.id = ''
        }
        data.cmstmStid = t.$store.state.orderTeam.mainId
        t.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.orderTeam.childId1) {
                  t.$store.commit('orderTeam/addNewArrayChildTable1', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$store.commit('orderTeam/updateArrayChildTable1', res.data.content[0])
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
      pickDataUserInfo() {
        const t = this
        t.$refs.searchBusiUser.getData()
        t.openPickUser = true
      },
      closeUser() {
        const t = this
        t.openPickUser = false
        t.$refs.searchBusiUser.pmtypeCode = ''
      },
      clearDubUser() {
        const t = this
        t.cmstmUseridDis = ''
        t.mobileNo = ''
        t.loginName = ''
        t.email = ''
        t.formValidate.cmstmUserid = ''
      },
      changeinput2(name, email, mobileNo, loginName, id) {
        const t = this
        t.cmstmUseridDis = name
        t.mobileNo = email
        t.email = mobileNo
        t.loginName = loginName
        t.formValidate.cmstmUserid = id
      },
      clear() {
        const t = this
        t.formValidate.cmstmStid = ''
        t.formValidate.cmstmCode = ''
        t.formValidate.cmstmUserid = ''
        t.formValidate.cmstmDistribute = ''
        t.formValidate.cmstmIsvalid = ''
        t.formValidate.comment = ''
        t.cmstmStidDis = ''
        t.cmstmUseridDis = ''
        t.cmstmDistributeDis = ''
        t.cmstmIsvalidDis = ''
        t.loginName = ''
        t.email = ''
        t.mobileNo = ''
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
      left: 20px;
      right: 20px;
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
  .btncal{
    position: absolute;
    bottom: 20px;
    right: 95px;
  }
</style>
