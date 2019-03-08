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
          <FormItem :label="$t('lang_role.adminpmtype.pmtypeCode')" prop="pmtypeCode">
            <Input v-model="formValidate.pmtypeCode" :placeholder="$t('lang_role.adminpmtype.ppmtypeCode')"
                  ></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.adminpmtype.pmtypeName')" prop="pmtypeName">
            <Input v-model="formValidate.pmtypeName" :placeholder="$t('lang_role.adminpmtype.ppmtypeName')"
                   ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">

            <FormItem :label="$t('lang_role.adminpmtype.pmtypeIsupdate')"  prop="pmtypeIsupdate">
              <RadioGroup v-model="formValidate.pmtypeIsupdate">
                <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}
                </Radio>
              </RadioGroup>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_role.adminpmtype.comment')"  prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   :placeholder="$t('lang_role.adminpmtype.pcomment')"></Input>
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

  import {isSuccess, deepCopy} from '../../../lib/util'

  export default {
    data() {
      return {
        radioYesOrNo: [],
        formValidate: {
          _mt: 'baseParmType.addOrUpdBaseParamType',
          pmtypeCode: '',
          pmtypeName: '',
          comment: '',
          pmtypeIsupdate: '1',
          funId: '1',
          companyId: '1',
        },
        ruleValidate: {
          pmtypeCode: [
            {required: true, message: this.$t('lang_role.adminpmtype.ppmtypeCode'), trigger: 'blur' },
          ],
          pmtypeName: [
            {required: true, message: this.$t('lang_role.adminpmtype.ppmtypeName'), trigger: 'blur' },
          ],
        },
      }
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
          _mt: 'baseParmType.selectParamTypeById',
          id: id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.pmtypeCode = res.data.content[0].pmtypeCode
            t.formValidate.pmtypeName = res.data.content[0].pmtypeName
            t.formValidate.pmtypeIsupdate = res.data.content[0].pmtypeIsupdate
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
    watch: {},
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
