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
          <FormItem :label="$t('lang_user.rootrole.companyIdDis')" prop="companyIdDis">
              <span @dblclick="clearDub">
               <Input v-model="formValidate.companyIdDis" icon="search" :disabled="disabled" :readonly="true"
                      :placeholder="$t('lang_user.rootrole.pcompanyIdDis')"  @on-click="pickData"/>
              </span>
          </FormItem>
          </Col>
          <Col span="12" style="margin-left: 10px;">
          <div style="line-height: 30px;color: red;">{{this.$t('lang_user.rootrole.readCheck')}}</div>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootrole.roleCode')" prop="roleCode">
            <Input v-model="formValidate.roleCode" :placeholder="$t('lang_user.rootrole.proleCode')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootrole.roleCname')" prop="roleCname">
            <Input v-model="formValidate.roleCname" :placeholder="$t('lang_user.rootrole.proleCnamec')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootrole.roleEname')"  prop="roleEname">
            <Input v-model="formValidate.roleEname":placeholder="$t('lang_user.rootrole.proleEname')" ></Input>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootrole.validDis')"  prop="valid">
            <RadioGroup v-model="formValidate.valid":placeholder="$t('lang_user.rootrole.pvalid')" @on-change="validChange()">
              <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}
              </Radio>
            </RadioGroup>
          </FormItem>
          </Col>
          <Col span="10" offset="1" v-show="openInValid">
          <FormItem :label="$t('lang_user.rootrole.invdate')"  prop="invdate">
            <DatePicker type="date"  :placeholder="$t('lang_user.rootrole.pinvdate')":editable="false" v-model="formValidate.invdate"
                        style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_user.rootrole.roleDesc')" prop="roleDesc">
            <Input v-model="formValidate.roleDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                  :placeholder="$t('lang_user.rootrole.proleDesc')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row v-show="openInValid">
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_user.rootrole.invreason')"  prop="invreason">
            <Input v-model="formValidate.invreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                  :placeholder="$t('lang_user.rootrole.pinvreason')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_user.rootuser.memo')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   :placeholder="$t('lang_user.rootuser.pmemo')"></Input>
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
      <searchCompDate v-show="openPick" @closeUp="close" @changeinput="changeinput"
                      ref="searchCompDate"></searchCompDate>
    </transition>
  </div>
</template>
<script>
  import {getDataLevelUserLoginSenior, getDataLevelUserLogin} from '../../../axios/axios'
  import searchCompDate from '../../../components/searchTable/searchOrgCompany'
  import {isSuccess, deepCopy} from '../../../lib/util'

  export default {
    data() {
      return {
        radioYesOrNo: [],
        openPick: false,
        disabled: false,
        openInValid: false,
        formValidate: {
          _mt: 'authRole.addOrUpdAuthRole',
          roleCode: '',
          companyIdDis: '',
          companyIdTi: '',
          roleCname: '',
          roleEname: '',
          roleType: '',
          roleDesc: '',
          valid: '1',
          invdate: '',
          invreason: '',
          comment: '',
        },
        ruleValidate: {
          roleCode: [
            {required: true, message: this.$t('lang_user.rootrole.proleCode'), trigger: 'blur' },
          ],
          roleCname: [
            {required: true, message: this.$t('lang_user.rootrole.proleCnamec'), trigger: 'blur' },
          ],
          roleEname: [
            {required: true, message: this.$t('lang_user.rootrole.proleEname'), trigger: 'blur' },
          ],
          roleType: [
            {required: true, message: this.$t('lang_user.rootrole.proleTypeDis'), trigger: 'blur' },
          ],
          companyIdDis: [
            {required: true, message: this.$t('lang_user.rootrole.pcompanyIdDis'), trigger: 'change' },
          ],
        },
      }
    },
    components: {
      searchCompDate,
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
          _mt: 'authRole.selAuthRoleByIds',
          ids: id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.roleCode = res.data.content[0].value[0].roleCode
            t.formValidate.roleType = res.data.content[0].value[0].roleType
            t.formValidate.roleCname = res.data.content[0].value[0].roleCname
            t.formValidate.roleEname = res.data.content[0].value[0].roleEname
            t.formValidate.roleDesc = res.data.content[0].value[0].roleDesc
            t.formValidate.valid = res.data.content[0].value[0].valid
            t.formValidate.invdate = res.data.content[0].value[0].invdate
            t.formValidate.invreason = res.data.content[0].value[0].invreason
            t.formValidate.comment = res.data.content[0].value[0].comment
            t.formValidate.companyIdTi = res.data.content[0].value[0].companyId
            t.formValidate.companyIdDis = res.data.content[0].value[0].companyIdDis
            t.disabled = true
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      validChange() {
        if (this.formValidate.valid === '1') {
          this.openInValid = false
        } else {
          this.openInValid = true
        }

      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        data.roleType = '1admin'
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        if (data.invdate !== undefined) {
          data.invdate = new Date(data.invdate).format('yyyy-MM-dd')
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
      handleReset() {
        this.openInValid = false
        this.disabled = false
        this.$emit('closeUp')
      },
      clearDub() {
        const t = this
        if (t.disabled) {
          return
        }
        t.formValidate.companyIdTi = ''
        t.formValidate.companyIdDis = ''
      },
      close() {
        const t = this
        t.openPick = false
        t.$refs.searchCompDate.pmtypeCode = ''
      },
      clearCheck() {
        const t = this
        t.$refs.formValidate.resetFields()
        t.formValidate.roleCode = ''
        t.formValidate.roleType = ''
        t.formValidate.roleCname = ''
        t.formValidate.roleEname = ''
        t.formValidate.roleDesc = ''
        t.formValidate.valid = '1'
        t.formValidate.companyIdTi = ''
        t.formValidate.invdate = ''
        t.formValidate.invreason = ''
        t.formValidate.comment = ''
        t.formValidate.companyIdTi = ''
        t.formValidate.companyIdDis = ''
      },
      changeinput(name, id) {
        const t = this
        t.formValidate.companyIdDis = name
        t.formValidate.companyIdTi = id
      },
      pickData() {
        const t = this
        if (t.disabled) {
          return
        }
        t.$refs.searchCompDate.getData(this.params)
        t.openPick = true
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
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";

</style>
