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
          <FormItem :label="$t('lang_platform.platCalendar.sYear')" prop="sYear">
            <Input v-model="formValidate.sYear" :placeholder="$t('lang_platform.platCalendar.sYearDis')"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_platform.platCalendar.eYear')" prop="eYear">
            <Input v-model="formValidate.eYear" :placeholder="$t('lang_platform.platCalendar.sYearDis')"></Input>
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
          _mt: 'platCalendar.Init',
          funId: '1',
          sYear: '',
          eYear: '',
        },
        ruleValidate: {
          sYear: [
            { required: true, message: this.$t('lang_platform.platCalendar.sYearDis'), trigger: 'blur' },
          ],
          eYear: [
            { required: true, message: this.$t('lang_platform.platCalendar.eYearDis'), trigger: 'blur' },
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
                this.$refs.formValidate.resetFields()
                t.$emit('closeUp')
                t.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: this.$t('reminder.initSuccess'),
                })
                t.$emit('getData')
                t.$emit('getSelect')
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
