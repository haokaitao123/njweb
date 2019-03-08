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
          <FormItem :label="$t('lang_user.rootgrprole.companyIdDis')" prop="companyIdDis">
             <span @dblclick="clearDub1">
              <Input v-model="formValidate.companyIdDis" icon="search" :disabled="disabled" :readonly="true"
                     :placeholder="$t('lang_user.rootgrprole.pcompanyIdDis')" @on-click="pickData"/>
             </span>
          </FormItem>
          </Col>
          <Col span="12" style="margin-left: 10px;">
          <div style="line-height: 30px;color: red;">{{this.$t('lang_user.rootuserrole.readCheck')}}</div>
          </Col>
        </Row>

        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootuser.name')" prop="userName">
		           <span @dblclick="clearDubUser">
		          <Input v-model="formValidate.userName" icon="search"
                     :disabled="this.logType ===$t('button.view') ? true : false"
                     :placeholder="$t('lang_user.rootuserrole.puserName')" :readonly="true"
                     @on-click="pickDataUserInfo"/>
		         </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootuser.mobileNo')" prop="mobileNo">
            <Input v-model="formValidate.mobileNo" :readonly="true"
                   :disabled="this.logType ===$t('button.view') ? true : false"></Input>
          </FormItem>
          </Col>

        </Row>

        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootrole.loginName')" prop="loginName">
            <Input v-model="formValidate.loginName" :readonly="true"
                   :disabled="this.logType ===$t('button.view') ? true : false"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootuser.email')" prop="email">
            <Input v-model="formValidate.email" :readonly="true"
                   :disabled="this.logType ===$t('button.view') ? true : false"></Input>
          </FormItem>
          </Col>

        </Row>

        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootuserrole.sysUsadrolegrpDis')" prop="sysUsadrolegrpDis">
              <span @dblclick="clearDubGrp">
               <Input v-model="formValidate.sysUsadrolegrpDis"
                      :disabled="this.logType ===$t('button.view') ? true : false"
                      :placeholder="$t('lang_user.rootgrprole.pcompanyIdDis')"
                      icon="search" :readonly="true" @on-click="pickDataRolegrp"/>
              </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootgrprole.validDis')" prop="sysAdminvalid">
            <RadioGroup v-model="formValidate.sysAdminvalid"
                        :disabled="this.logType ===$t('button.view') ? true : false"
                        :placeholder="$t('lang_user.rootuserrole.sysAdminvalid')"
                       >
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
              <Button type="primary" @click="handleSubmit"
                      v-show="this.logType ===$t('button.upd') || this.logType === $t('button.add') ? true : false">
                {{$t('button.sav')}}
              </Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
    <transition name="fade">
      <searchPubDate v-show="openPick" @closeUp="close" @changeinput="changeinput" ref="searchPubDate"></searchPubDate>
    </transition>
    <transition name="fade">
      <searchPubUser v-show="openPickUser" @closeUp="close2" @changeinput="changeinput2"
                     ref="searchPubUser"></searchPubUser>
    </transition>
    <transition name="fade">
      <searchPubRole v-show="openPickRole" @closeUp="close3" @changeinput="changeinput3"
                     ref="searchPubRole"></searchPubRole>
    </transition>
  </div>
</template>
<script>
  import {getDataLevelUserLoginSenior, getDataLevelUserLogin} from '../../../axios/axios'
  import searchPubDate from '../../../components/searchTable/searchOrgCompany'
  import searchPubUser from '../../../components/searchTable/searchPubUser'
  import searchPubRole from '../../../components/searchTable/searchSysRoleGrp'
  import {isSuccess, deepCopy} from '../../../lib/util'

  export default {
    data() {
      return {
        formValidate: {
          _mt: 'sysUserinfo.addOrUpdUserinfo',
          sysUsadrolegrp: '',
          sysUserid: '',
          sysAdminvalid: '1',
          companyIdTi: '',
          companyIdDis: '',
          sysUsadrolegrpDis: '',
          userName: '',
          mobileNo: '',
          loginName: '',
          email: '',
        },
        disabled: false,
        openPick: false,
        openPickUser: false,
        openPickRole: false,
        radioYesOrNo: [],
        ruleValidate: {
          companyIdDis: [
            {required: true, message: this.$t('lang_user.rootgrprole.pcompanyIdDis'), trigger: 'blur'},
          ],
          userName: [
            {required: true, message: this.$t('lang_user.rootuserrole.puserName'), trigger: 'blur'},
          ],
          mobileNo: [
            {required: true, message: this.$t('lang_user.rootuser.pmobileNo'), trigger: 'blur'},
          ],
          sysUsadrolegrpDis: [
            {required: true, message: this.$t('lang_user.rootuserrole.psysUsadrolegrpDis'), trigger: 'blur'},
          ],
        },
      }
    },
    components: {
      searchPubDate,
      searchPubUser,
      searchPubRole,
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
            t.formValidate.companyIdDis = res.data.content[0].companyIdDis
            t.formValidate.companyIdTi = res.data.content[0].companyId
            t.formValidate.userName = res.data.content[0].userName
            t.formValidate.mobileNo = res.data.content[0].mobileNo
            t.formValidate.loginName = res.data.content[0].loginName
            t.formValidate.email = res.data.content[0].email
            t.formValidate.sysUsadrolegrpDis = res.data.content[0].sysUsadrolegrpDis
            t.formValidate.sysAdminvalid = res.data.content[0].sysAdminvalid
            t.formValidate.sysUsadrolegrp = res.data.content[0].sysUsadrolegrp
            t.formValidate.sysUserid = res.data.content[0].sysUserid
            t.disabled = true
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
      pickData() {
        const t = this
        if (t.disabled) {
          return
        }
        t.$refs.searchPubDate.getData()
        t.openPick = true
      },
      changeinput(name, id) {
        const t = this
        t.formValidate.companyIdDis = name
        t.formValidate.companyIdTi = id
      },
      pickDataUserInfo() {
        const t = this
        t.$refs.searchPubUser.getData()
        t.openPickUser = true

      },
      pickDataRolegrp() {
        const t = this
         console.log(t.formValidate.companyIdDis)
        if (t.formValidate.companyIdDis) {
          t.$refs.searchPubRole.getData(t.formValidate.companyIdTi)
          t.openPickRole = true
        } else {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_user.rootuserrole.recomp'),
          })
        }
      },
      changeinput2(name, email, mobileNo, loginName, id) {
        const t = this
        t.formValidate.userName = name
        t.formValidate.mobileNo = email
        t.formValidate.email = mobileNo
        t.formValidate.sysUserid = id
        t.formValidate.loginName = loginName
      },
      changeinput3(name, id) {
        const t = this
        t.formValidate.sysUsadrolegrpDis = name
        t.formValidate.sysUsadrolegrp = id
      },
      close() {
        const t = this
        t.openPick = false
        t.$refs.searchPubDate.pmtypeCode = ''
      },
      close2() {
        const t = this
        t.openPickUser = false
        t.$refs.searchPubUser.pmtypeCode = ''
      },
      close3() {
        const t = this
        t.openPickRole = false
        t.$refs.searchPubRole.pmtypeCode = ''
      },
      clearDub1() {
        const t = this
        if (t.disabled) {
          return
        }
        t.formValidate.companyIdTi = ''
        t.formValidate.companyIdDis = ''
      },
      clearDubUser() {
        const t = this
        t.formValidate.userName = ''
        t.formValidate.mobileNo = ''
        t.formValidate.loginName = ''
        t.formValidate.email = ''
        t.formValidate.sysUserid = ''
      },
      clearDubGrp() {
        const t = this
        t.formValidate.sysUsadrolegrp = ''
        t.formValidate.sysUsadrolegrpDis = ''
      },
      clearCheck() {
        const t = this
        t.$refs.formValidate.resetFields()
        t.formValidate.companyIdTi = ''
        t.formValidate.companyIdDis = ''
        t.formValidate.userName = ''
        t.formValidate.mobileNo = ''
        t.formValidate.loginName = ''
        t.formValidate.email = ''
        t.formValidate.sysUsadrolegrpDis = ''
        t.formValidate.sysAdminvalid = '1'
        t.formValidate.sysUserid = ''
        t.formValidate.companyId = ''
        t.formValidate.sysUsadrolegrp = ''
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
        this.disabled = false
        this.$emit('closeUp')
      },
    },
    watch: {},
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>

