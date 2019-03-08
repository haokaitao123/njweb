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
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
          <Col span="11" >
          <FormItem :label="$t('lang_platform.platPostno.sPostNo')" prop="sPostNo">
            <Input v-model="formValidate.sPostNo" :placeholder="$t('lang_platform.platPostno.sPostNoDis')"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_platform.platPostno.ePostNo')" prop="ePostNo">
            <Input v-model="formValidate.ePostNo" :placeholder="$t('lang_platform.platPostno.ePostNoDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" >
          <FormItem :label="$t('lang_platform.platPostno.companys')" prop="companys">
            <Input v-model="formValidate.companys" :placeholder="$t('lang_platform.platPostno.companysDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
              <Button type="primary" @click="handleSubmit">{{$t('button.gen')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        formValidate: {
          _mt: 'platPostno.Init',
          funId: '1',
          sPostNo: '',
          ePostNo: '',
          companys: '',
        },
        ruleValidate: {
          sPostNo: [
            { required: true, message: this.$t('lang_platform.platPostno.sPostNoDis'), trigger: 'blur' },
          ],
          companys: [
            { required: true, message: this.$t('lang_platform.platPostno.companysDis'), trigger: 'blur' },
          ],
          ePostNo: [
            { required: true, message: this.$t('lang_platform.platPostno.ePostNoDis'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
    },
    updated() {

    },
    mounted() {
    },
    methods: {
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLogin(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                t.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: this.$t('reminder.initSuccess'),
                })
                t.$emit('getData')
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
        this.$emit('closeUp')
        this.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
