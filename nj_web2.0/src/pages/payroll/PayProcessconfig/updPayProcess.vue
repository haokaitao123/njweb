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
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.payProcessconfig.ppcSalset')" prop="ppcSalset">
            <Select v-model="formValidate.ppcSalset"  >
              <Option :value="item.id" v-for="(item,index) in selectSalset" :key="index" >{{item.payssCN}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.payProcessconfig.ppcScopecode')" prop="ppcScopecode">
            <Input v-model="formValidate.ppcScopecode" :placeholder="$t('lang_payroll.payProcessconfig.ppcScopecodeDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.payProcessconfig.ppcScopename')" prop="ppcScopename">
            <Input v-model="formValidate.ppcScopename" :placeholder="$t('lang_payroll.payProcessconfig.ppcScopenameDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_payroll.payProcessconfig.ppcCompanyscope')" prop="ppcCompanyscope">
            <Input v-model="formValidate.ppcCompanyscope" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payProcessconfig.ppcCompanyscopeDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.payProcessconfig.ppcRole')" prop="ppcRole">
            <Select v-model="formValidate.ppcRole" >
              <Option :value="item.paramCode" v-for="(item,index) in roleType" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.payProcessconfig.ppcContact')" prop="ppcContact">
            <Input v-model="formValidate.ppcContact" :placeholder="$t('lang_payroll.payProcessconfig.ppcContactDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.payProcessconfig.ppcEmail')" prop="ppcEmail">
            <Input v-model="formValidate.ppcEmail" :placeholder="$t('lang_payroll.payProcessconfig.ppcEmailDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.payProcessconfig.ppcPhone')" prop="ppcPhone">
            <Input v-model="formValidate.ppcPhone" :placeholder="$t('lang_payroll.payProcessconfig.ppcPhoneDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.payProcessconfig.ppcSdate')" prop="ppcSdate">
            <DatePicker type="date" v-model="formValidate.ppcSdate" :placeholder="$t('lang_payroll.payProcessconfig.ppcSdateDis')" :editable="false" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.payProcessconfig.ppcEdate')" prop="ppcEdate">
              <DatePicker type="date" v-model="formValidate.ppcEdate" :placeholder="$t('lang_payroll.payProcessconfig.ppcEdateDis')" :editable="false" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_payroll.payProcessconfig.ppcComment')" prop="ppcComment">
            <Input v-model="formValidate.ppcComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payProcessconfig.ppcCommentDis')"></Input>
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
    <!--<transition name="fade">-->
      <!--<searchOrgCompany v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="close" @changeinput="changeinput" ref="searchOrgCompany"></searchOrgCompany>-->
    <!--</transition>-->
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
//  import searchOrgCompany from '../../../components/searchTable/searchOrgCompany'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
//        openPick: false,
        ppcSalsetDis: '',
        ppcRoleDis: '',
        formValidate: {
          _mt: 'payProcessconfig.addOrUpd',
          funId: '1',
          ppcSalset: '',
          ppcScopecode: '',
          ppcScopename: '',
          ppcCompanyscope: '',
          ppcRole: '',
          ppcContact: '',
          ppcEmail: '',
          ppcPhone: '',
          ppcComment: '',
        },
        ruleValidate: {
          ppcSalset: [
            { required: true, message: this.$t('lang_payroll.payProcessconfig.ppcSalsetDis'), trigger: 'blur' },
          ],
          ppcScopecode: [
            { required: true, message: this.$t('lang_payroll.payProcessconfig.ppcScopecodeDis'), trigger: 'blur' },
          ],
          ppcScopename: [
            { required: true, message: this.$t('lang_payroll.payProcessconfig.ppcScopenameDis'), trigger: 'blur' },
          ],
          ppcCompanyscope: [
            { required: true, message: this.$t('lang_payroll.payProcessconfig.ppcCompanyscopeDis'), trigger: 'blur' },
          ],
          ppcRole: [
            { required: true, message: this.$t('lang_payroll.payProcessconfig.ppcRoleDis'), trigger: 'blur' },
          ],
          ppcContact: [
            { required: true, message: this.$t('lang_payroll.payProcessconfig.ppcContactDis'), trigger: 'blur' },
          ],
          ppcEmail: [
            { required: true, message: this.$t('lang_payroll.payProcessconfig.ppcEmailDis'), trigger: 'blur' },
          ],
          ppcSdate: [
            { required: true, type: 'date', message: this.$t('lang_payroll.payProcessconfig.ppcSdateDis'), trigger: 'change' },
          ],
        },
      }
    },
    components: {
//      searchOrgCompany,
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
      roleType: Array,
      selectSalset: Array,
    },
    mounted() {
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'payProcessconfig.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.ppcSalset = res.data.content[0].ppcSalset
            t.ppcSalsetDis = res.data.content[0].ppcSalsetDis
            t.formValidate.ppcScopecode = res.data.content[0].ppcScopecode
            t.formValidate.ppcScopename = res.data.content[0].ppcScopename
            t.formValidate.ppcCompanyscope = res.data.content[0].ppcCompanyscope
            t.formValidate.ppcRole = res.data.content[0].ppcRole
            t.ppcRoleDis = res.data.content[0].ppcRoleDis
            t.formValidate.ppcContact = res.data.content[0].ppcContact
            t.formValidate.ppcEmail = res.data.content[0].ppcEmail
            t.formValidate.ppcPhone = res.data.content[0].ppcPhone
            t.formValidate.ppcSdate = res.data.content[0].ppcSdate
            t.formValidate.ppcEdate = res.data.content[0].ppcEdate
            t.formValidate.ppcComment = res.data.content[0].ppcComment
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
        if (data.ppcSdate !== undefined) {
          data.ppcSdate = new Date(data.ppcSdate).format('yyyy-MM-dd')
        }
        if (data.ppcEdate !== undefined) {
          data.ppcEdate = data.ppcEdate === '' ? new Date('9999-12-31').format('yyyy-MM-dd') : new Date(data.ppcEdate).format('yyyy-MM-dd')
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
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
