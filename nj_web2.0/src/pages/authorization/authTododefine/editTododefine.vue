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
          <FormItem :label="$t('lang_authorization.authTodofine.autdNo')" prop="autdNo">
            <Input v-model="formValidate.autdNo" :placeholder="$t('lang_authorization.authTodofine.autdNoDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_authorization.authTodofine.autdName')" prop="autdName">
            <Input v-model="formValidate.autdName" :placeholder="$t('lang_authorization.authTodofine.autdNameDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>

          <Col span="10" offset="1">
          <FormItem :label="$t('lang_authorization.authTodofine.autdPlatform')" prop="autdPlatform" :label-width="135">
            <Select v-model="formValidate.autdPlatform"  :placeholder="$t('lang_authorization.authTodofine.autdPlatformDis')" :transfer="true">
              <Option :value="item.paramCode" v-for="(item,index) in radioautdPlatform" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>

          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_authorization.authTodofine.autdProp')" prop="autdProp" :label-width="135">
            <RadioGroup v-model="formValidate.autdProp"  :placeholder="$t('lang_authorization.authTodofine.autdPropDis')" :transfer="true">
              <Radio :label="item.paramCode" v-for="(item,index) in radioAutdProp" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_authorization.authTodofine.autdThread')" prop="autdThread">
            <Input v-model="formValidate.autdThread" :placeholder="$t('lang_authorization.authTodofine.autdThreadDis')"></Input>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_authorization.authTodofine.autdValid')" prop="autdValid" :label-width="135">
            <!--@on-change="changeIsprocess"-->
            <RadioGroup v-model="formValidate.autdValid" :placeholder="$t('lang_authorization.authTodofine.autdValidDis')">
              <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row >
          <Col span="21" offset="1" v-show="this.formValidate.autdValid  === '0'?true:false">
          <FormItem :label="$t('lang_authorization.authTodofine.autdInvreason')" prop="autdInvreason" >
            <Input  v-model="formValidate.autdInvreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_authorization.authTodofine.autdInvreasonDis')"></Input>
            <!--<Input v-model="formValidate.autdInvreason" :placeholder="请输入失效原因"></Input>-->
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_authorization.authTodofine.autdComment')" prop="autdComment">
            <Input v-model="formValidate.autdComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_authorization.authTodofine.autdCommentDis')"></Input>
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
      <searchCompDate v-show="openPick" @closeUp="close" @changeinput="changeinput" ref="searchCompDate"></searchCompDate>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import searchCompDate from '../../../components/searchTable/searchOrgCompany'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        radioYesOrNo: [],
        radioautdPlatform: [],
        radioAutdProp: [],
        openPick: false,
        disabled: false,
        formValidate: {
          _mt: 'authTododefine.addOrUpd',
          autdNo: '',
          autdName: '',
          autdPlatform: '',
          autdProp: '',
          autdThread: '',
          autdValid: '1',
          autdInvreason: '',
          autdComment: '',
        },
        ruleValidate: {
          autdNo: [
            { required: true, message: this.$t('lang_authorization.authTodofine.autdNoDis'), trigger: 'blur' },
          ],
          autdName: [
            { required: true, message: this.$t('lang_authorization.authTodofine.autdNameDis'), trigger: 'blur' },
          ],
          autdPlatform: [
            { required: true, message: this.$t('lang_authorization.authTodofine.autdPlatformDis'), trigger: 'blur' },
          ],
          autdProp: [
            { required: true, message: this.$t('lang_authorization.authTodofine.autdPropDis'), trigger: 'blur' },
          ],
          autdThread: [
            { required: true, message: this.$t('lang_authorization.authTodofine.autdThreadDis'), trigger: 'blur' },
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
          _mt: 'authTododefine.getById',
          logType:'根据id获取信息',
          id: id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.autdNo = res.data.content[0].autdNo
            t.formValidate.autdName = res.data.content[0].autdName
            t.formValidate.autdPlatform = res.data.content[0].autdPlatform
            t.formValidate.autdProp = res.data.content[0].autdProp
            t.formValidate.autdThread = res.data.content[0].autdThread
            t.formValidate.autdValid = res.data.content[0].autdValid
            t.formValidate.autdInvreason = res.data.content[0].autdInvreason
            t.formValidate.autdComment = res.data.content[0].autdComment
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
      handleReset() {
      	this.disabled = false
        this.$emit('closeUp')
      },
      close() {
        const t = this
        t.openPick = false
        t.$refs.searchCompDate.pmtypeCode = ''
      },
      clearCheck() {
        const t = this
        t.$refs.formValidate.resetFields()
        t.formValidate.autdNo = ''
        t.formValidate.autdName = ''
        t.formValidate.autdPlatform = ''
        t.formValidate.autdProp = ''
        t.formValidate.autdThread = ''
        t.formValidate.autdValid = '1'
        t.formValidate.autdInvreason = ''
        t.formValidate.autdComment = ''
      },
      changeinput(name, id) {
        const t = this
        t.formValidate.companyIdDis = name
        t.formValidate.companyIdTi = id
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno,bustype,todoprop',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.radioYesOrNo = res.data.content[0].value[0].paramList
            t.radioautdPlatform = res.data.content[0].value[1].paramList
            t.radioAutdProp = res.data.content[0].value[2].paramList
            for (let i = t.radioautdPlatform.length - 1; i >= 0; i--) {
              if (t.radioautdPlatform[i].paramCode === '0root') {
                t.radioautdPlatform.splice(i, 1)
              }
              if (t.radioautdPlatform[i].paramCode === '1admin') {
                t.radioautdPlatform.splice(i, 1)
              }
            }
          }
        }).catch((res) => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: res,
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";

</style>
