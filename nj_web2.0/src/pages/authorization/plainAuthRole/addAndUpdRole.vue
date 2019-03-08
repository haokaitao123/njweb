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
          <FormItem :label="$t('lang_role.adminrole.roleCode')" prop="roleCode">
            <Input v-model="formValidate.roleCode" :placeholder="$t('lang_role.adminrole.proleCode')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.adminrole.roleCname')" prop="roleCname">
            <Input v-model="formValidate.roleCname" :placeholder="$t('lang_role.adminrole.pproleCname')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.adminrole.roleEname')" prop="roleEname">
            <Input v-model="formValidate.roleEname" :placeholder="$t('lang_role.adminrole.proleEname')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.adminrole.validDis')" prop="valid">
            <RadioGroup v-model="formValidate.valid" :placeholder="$t('lang_role.adminrole.valid')" @on-change="validChange()">
              <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}
              </Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_role.adminrole.roleDesc')" prop="roleDesc">
            <Input v-model="formValidate.roleDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   :placeholder="$t('lang_role.adminrole.proleDesc')" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row v-show="openInValid">
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.adminrole.invdate')" prop="invdate">
            <DatePicker type="date":placeholder="$t('lang_role.adminrole.pinvdate')" :editable="false" v-model="formValidate.invdate"
                        style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
          <Col span="10" offset="1">

          </Col>
        </Row>
        <Row v-show="openInValid">
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_role.adminrole.invreason')" prop="invreason">
            <Input v-model="formValidate.invreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   :placeholder="$t('lang_role.adminrole.pinvreason')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_role.adminpmtype.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   :placeholder="$t('lang_role.adminpmtype.pcomment')" ></Input>
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
  </div>
</template>
<script>
  import {getDataLevelUserLoginSenior, getDataLevelUserLogin} from '../../../axios/axios'
  import searchTable from '../../../components/searchTable/searchTable'
  import {isSuccess, deepCopy} from '../../../lib/util'

  export default {
    data() {
      return {
        radioYesOrNo: [],
        openInValid: false,
        formValidate: {
          _mt: 'authRole.addOrUpd',
          funId: '1',
          roleCode: '',
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
            {required: true, message: this.$t('lang_role.adminrole.proleCode'), trigger: 'blur'},
          ],
          roleCname: [
            {required: true, message: this.$t('lang_role.adminrole.pproleCname'), trigger: 'blur'},
          ],
          roleEname: [
            {required: true, message: this.$t('lang_role.adminrole.proleEname'), trigger: 'blur'},
          ],
          roleType: [
            {required: true, message: this.$t('lang_role.adminrole.proleTypeDis'), trigger: 'blur'},
          ],
        },
      }
    },
    components: {
      searchTable,
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
          _mt: 'authRole.getById',
          id: id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.roleCode = res.data.content[0].roleCode
            t.formValidate.roleType = res.data.content[0].roleType
            t.formValidate.roleCname = res.data.content[0].roleCname
            t.formValidate.roleEname = res.data.content[0].roleEname
            t.formValidate.roleDesc = res.data.content[0].roleDesc
            t.formValidate.valid = res.data.content[0].valid
            t.formValidate.invdate = res.data.content[0].invdate
            t.formValidate.invreason = res.data.content[0].invreason
            t.formValidate.comment = res.data.content[0].comment
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
      validChange() {
        if (this.formValidate.valid === '1') {
          this.openInValid = false
        } else {
          this.openInValid = true
        }

      },
      handleReset() {
        this.openInValid = false
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
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
