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
          <Col span="10">
          <FormItem :label="$t('lang_platform.platBenefitarea.bfareaCode')" prop="bfareaCode">
            <Input v-model="formValidate.bfareaCode" :placeholder="$t('lang_platform.platBenefitarea.bfareaCodeDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_platform.platBenefitarea.bfareaCname')" prop="bfareaCname">
            <Input v-model="formValidate.bfareaCname" :placeholder="$t('lang_platform.platBenefitarea.bfareaCnameDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem :label="$t('lang_platform.platBenefitarea.bfareaEname')" prop="bfareaEname">
            <Input v-model="formValidate.bfareaEname" :placeholder="$t('lang_platform.platBenefitarea.bfareaEnameDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_platform.platBenefitarea.bfareaType')" prop="bfareaType">
            <Select v-model="formValidate.bfareaType" :placeholder="$t('lang_platform.platBenefitarea.bfareaTypeDis')">
              <Option :value="item.paramCode" v-for="(item,index) in selectbfareaType" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21">
          <FormItem :label="$t('lang_platform.platBenefitarea.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.platBenefitarea.commentDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21">
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
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        selectbfareaType: [],
        formValidate: { },
        ruleValidate: {
          bfareaCode: [
            { required: true, message: this.$t('lang_platform.platBenefitarea.bfareaCode'), trigger: 'blur' },
          ],
          bfareaCname: [
            { required: true, message: this.$t('lang_platform.platBenefitarea.bfareaCname'), trigger: 'blur' },
          ],
          bfareaEname: [
            { required: true, message: this.$t('lang_platform.platBenefitarea.bfareaEname'), trigger: 'blur' },
          ],
          bfareaType: [
            { required: true, message: this.$t('lang_platform.platBenefitarea.bfareaType'), trigger: 'blur, change' },
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
    mounted() {
      this.getSelect()
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platBenefitarea.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate = res.data.content[0]
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
        const params = deepCopy(t.formValidate)
        params._mt = 'platBenefitarea.addOrUpd'
        params.logType = this.$t('button.add')
        if (t.logType === this.$t('button.upd')) {
          params.logType = this.$t('button.upd')
          params.id = t.id
        }
        t.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(params).then((res) => {
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
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'benefitareatype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectbfareaType = res.data.content[0].value[0].paramList
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
        this.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
