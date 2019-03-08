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
            <span @dblclick="clearDub">
             <Input v-model="formValidate.companyIdDis" icon="search" :disabled="disabled" :readonly="true"
                    :placeholder="$t('lang_user.rootgrprole.pcompanyIdDis')"  @on-click="pickData"/>
            </span>
          </FormItem>
          </Col>
          <Col span="12" style="margin-left: 10px;">

          <div style="line-height: 30px;color: red;">{{this.$t('lang_user.rootgrprole.readCheck')}}</div>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootgrprole.rolegrpCode')" prop="rolegrpCode">
            <Input v-model="formValidate.rolegrpCode"  :placeholder="$t('lang_user.rootgrprole.prolegrpCode')" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootgrprole.rolegrpCname')" prop="rolegrpCname">
            <Input v-model="formValidate.rolegrpCname" :placeholder="$t('lang_user.rootgrprole.pprolegrpCname')"  ></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootgrprole.rolegrpEname')" prop="rolegrpEname">
            <Input v-model="formValidate.rolegrpEname"  :placeholder="$t('lang_user.rootgrprole.prolegrpEname')" ></Input>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_user.rootgrprole.rolegrpDesc')" prop="rolegrpDesc">
            <Input v-model="formValidate.rolegrpDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   :placeholder="$t('lang_user.rootgrprole.prolegrpDesc')" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_user.rootgrprole.validDis')" prop="valid">
            <RadioGroup v-model="formValidate.valid"  :placeholder="$t('lang_user.rootgrprole.valid')" @on-change="validChange()">
              <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}
              </Radio>
            </RadioGroup>
          </FormItem>
          </Col>
          <Col span="10" offset="1" v-show="openInValid">
          <FormItem :label="$t('lang_user.rootgrprole.invdate')" prop="invdate">
            <span @dblclick="clear">
              <DatePicker type="date" :placeholder="$t('lang_user.rootgrprole.pinvdate')"   :editable="false" v-model="formValidate.invdate"
                          style="width: 100%"></DatePicker>
            </span>
          </FormItem>
          </Col>
        </Row>
        <Row v-show="openInValid">
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_user.rootgrprole.invreason')" prop="invreason">
            <Input v-model="formValidate.invreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   :placeholder="$t('lang_user.rootgrprole.pinvreason')"  ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_user.rootuser.memo')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   :placeholder="$t('lang_user.rootuser.pmemo')"  ></Input>
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
        openPick: false,
        disabled: false,
        openInValid: false,
        radioYesOrNo: [],
        formValidate: {
          _mt: 'authRoleGroup.addOrUpdAuthRoleGroup',
          companyIdDis: '',
          rolegrpCode: '',
          rolegrpType: '1admin',
          rolegrpCname: '',
          rolegrpEname: '',
          rolegrpDesc: '',
          valid: '1',
          invdate: '',
          invreason: '',
          comment: '',
        },
        ruleValidate: {
          rolegrpCode: [
            {required: true, message: this.$t('lang_user.rootgrprole.prolegrpCode'), trigger: 'blur'},
          ],
          rolegrpCname: [
            {required: true, message: this.$t('lang_user.rootgrprole.pprolegrpCname'), trigger: 'blur'},
          ],
          rolegrpEname: [
            {required: true, message: this.$t('lang_user.rootgrprole.prolegrpEname'), trigger: 'blur'},
          ],
          companyIdDis: [
            {required: true, message: this.$t('lang_user.rootgrprole.pcompanyIdDis'), trigger: 'change'},
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
          _mt: 'authRoleGroup.selAuthRoleGroupByIds',
          ids: id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.rolegrpCode = res.data.content[0].value[0].rolegrpCode
            t.formValidate.rolegrpType = res.data.content[0].value[0].rolegrpType
            t.formValidate.rolegrpCname = res.data.content[0].value[0].rolegrpCname
            t.formValidate.rolegrpEname = res.data.content[0].value[0].rolegrpEname
            t.formValidate.rolegrpDesc = res.data.content[0].value[0].rolegrpDesc
            t.formValidate.valid = res.data.content[0].value[0].valid
            t.formValidate.invdate = res.data.content[0].value[0].invdate
            t.formValidate.invreason = res.data.content[0].value[0].invreason
            t.formValidate.comment = res.data.content[0].value[0].comment
            t.formValidate.companyIdDis = res.data.content[0].value[0].companyIdDis
            t.formValidate.companyIdTi = res.data.content[0].value[0].companyId
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
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        if (data.invdate !== undefined) {
          data.invdate = data.invdate === '' ? '' : new Date(data.invdate).format('yyyy-MM-dd')
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
      clear() {
        const t = this
        t.formValidate.invdate = ''
      },
      clearCheck() {
        const t = this
        t.$refs.formValidate.resetFields()
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
        t.$refs.searchCompDate.getData()
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
      handleReset() {
        this.openInValid = false
        this.disabled = false
        this.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";

</style>
