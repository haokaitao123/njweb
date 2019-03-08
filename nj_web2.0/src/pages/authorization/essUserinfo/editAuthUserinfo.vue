<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootuser.name')" prop="userName">
            <span @dblclick="clearDubUser">
            <Input v-model="formValidate.userName" icon="search" :readonly="true" :placeholder="$t('lang_role.adminuser.userName')"
                   @on-click="pickDataUserInfo"/>
              </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootuser.mobileNo')" prop="mobileNo">
            <Input v-model="mobileNo" disabled></Input>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootuserrole.loginName')" prop="loginName">
            <Input v-model="loginName" disabled></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootuser.email')" prop="email">
            <Input v-model="email" disabled></Input>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.essrole.sysEssRolegrpDis')" prop="sysEssRolegrpDis">
            <span @dblclick="clearDubGrp">
            <Input v-model="formValidate.sysEssRolegrpDis" icon="search" :readonly="true" :placeholder="$t('lang_role.essrole.psysEssRolegrpDis')"
                   @on-click="pickDataRolegrp"/>
              </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.adminuser.sysUsempid')"  prop="sysUsempid">
            <span @dblclick="clearDubUsempid">
            <Input v-model="sysUsempidDis" icon="search" :readonly="true" :placeholder="$t('lang_role.adminuser.psysUsempid')"
                   @on-click="pickDatasysUsempid"/>
              </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.adminrole.validDis')" prop="sysEssvalid">
            <RadioGroup v-model="formValidate.sysEssvalid" :placeholder="$t('lang_role.adminrole.valid')">
              <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}
              </Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
              <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
    <transition name="fade">
      <searchPubUser v-show="openPickUser" @closeUp="closeUser" @changeinput="changeinput2"
                     ref="searchPubUser"></searchPubUser>
    </transition>
    <transition name="fade">
      <searchPubRole v-show="openPickRole" @closeUp="close" @changeinput="changeinput3"
                     ref="searchPubRole"></searchPubRole>
    </transition>
    <transition name="fade">
      <searchPubUsempid v-show="openPickUsempid" @closeUp="closeUsempid" @changeinput="changeinput4"
                        ref="searchPubUsempid"></searchPubUsempid>
    </transition>
  </div>
</template>
<script>
  import {getDataLevelUserLoginSenior, getDataLevelUserLogin} from '../../../axios/axios'
  import searchPubUser from '../../../components/searchTable/searchPubUser'
  import searchPubRole from '../../../components/searchTable/searchEssAdminRoleGrp'
  import searchPubUsempid from '../../../components/searchTable/searchPubEmp'
  import {isSuccess, deepCopy} from '../../../lib/util'

  export default {
    data() {
      return {
        formValidate: {
          _mt: 'sysUserinfo.addOrUpdEss',
          sysEssRolegrp: '',
          sysUserid: '',
          sysEssvalid: '1',
          sysEssRolegrpDis: '',
          userName: '',
          sysUsempid: '',
        },
        openPickUser: false,
        openPickRole: false,
        openPickUsempid: false,
        radioYesOrNo: [],
        sysUsempidDis: '',
        companyIdDis: '',
        mobileNo: '',
        loginName: '',
        email: '',
        ruleValidate: {
          userName: [
            {required: true, message: this.$t('lang_role.adminuser.userName') , trigger: 'blur,change'},
          ],
          sysEssRolegrpDis: [
            {required: true, message: this.$t('lang_role.essrole.psysEssRolegrpDis'), trigger: 'blur,change'},
          ],
          sysUsempid: [
            {required: true, message: this.$t('lang_role.adminuser.psysUsempid'), trigger: 'blur,change'},
          ],
        },
      }
    },
    components: {
      searchPubUser,
      searchPubRole,
      searchPubUsempid,
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    updated() {

    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'sysUserinfo.getSysUserinfoById',
          id: id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.companyIdDis = res.data.content[0].companyIdDis
            t.formValidate.userName = res.data.content[0].userName
            t.mobileNo = res.data.content[0].mobileNo
            t.loginName = res.data.content[0].loginName
            t.email = res.data.content[0].email
            t.formValidate.sysEssRolegrpDis = res.data.content[0].sysEssRolegrpDis
            t.formValidate.sysEssvalid = res.data.content[0].sysEssvalid
            t.formValidate.sysEssRolegrp = res.data.content[0].sysEssRolegrp
            t.formValidate.sysUserid = res.data.content[0].sysUserid
            t.formValidate.sysUsempid = res.data.content[0].sysUsempid
            t.sysUsempidDis = res.data.content[0].sysUsempidDis
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
        data.logType = t.logType
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.formValidate.validate((valid) => {
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
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      pickDatasysUsempid() {
        const t = this
        t.$refs.searchPubUsempid.getData()
        t.openPickUsempid = true
      },
      closeUsempid() {
        const t = this
        t.openPickUsempid = false
        t.$refs.searchPubUsempid.pmtypeCode = ''
      },
      clearDubUsempid() {
        const t = this
        t.formValidate.sysUsempid = ''
        t.sysUsempidDis = ''
      },
      changeinput4(name, id) {
        const t = this
        t.sysUsempidDis = name
        t.formValidate.sysUsempid = id
      },
      pickDataUserInfo() {
        const t = this
        t.$refs.searchPubUser.getData()
        t.openPickUser = true
      },
      closeUser() {
        const t = this
        t.openPickUser = false
        t.$refs.searchPubUser.pmtypeCode = ''
      },
      clearDubUser() {
        const t = this
        t.formValidate.userName = ''
        t.mobileNo = ''
        t.loginName = ''
        t.email = ''
        t.formValidate.sysUserid = ''
      },
      changeinput2(name, email, mobileNo, loginName, id) {
        const t = this
        t.formValidate.userName = name
        t.mobileNo = email
        t.email = mobileNo
        t.loginName = loginName
        t.formValidate.sysUserid = id
      },
      pickDataRolegrp() {
        const t = this
        t.$refs.searchPubRole.getData()
        t.openPickRole = true
      },
      changeinput3(name, id) {
        const t = this
        t.formValidate.sysEssRolegrpDis = name
        t.formValidate.sysEssRolegrp = id
      },
      clearDubGrp() {
        const t = this
        t.formValidate.sysEssRolegrpDis = ''
        t.formValidate.sysEssRolegrp = ''
      },
      close() {
        const t = this
        t.openPickRole = false
        t.$refs.searchPubRole.pmtypeCode = ''
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.radioYesOrNo = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset() {
        this.$emit('closeUp')
      },
      clearCheck() {
        const t = this
        t.$refs.formValidate.resetFields()
      },
    },
    watch: {},
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
