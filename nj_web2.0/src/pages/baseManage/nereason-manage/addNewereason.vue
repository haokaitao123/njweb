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
          <FormItem :label="$t('lang_baseManage.baseNereason.nerCode')" prop="nerCode">
            <Input v-model="formValidate.nerCode" :placeholder="$t('lang_baseManage.baseNereason.nerCodeDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseNereason.nerCname')" prop="nerName">
            <Input v-model="formValidate.nerName" :placeholder="$t('lang_baseManage.baseNereason.nerCnameDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">

          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_baseManage.baseNereason.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_baseManage.baseNereason.commentDis')"></Input>
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
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        formValidate: {
          _mt: 'baseNereason.addOrUpd',
          funId: '1',
          nerCode: '',
          nerName: '',
          comment: '',
        },
        ruleValidate: {
          nerCode: [
            { required: true, message: this.$t('lang_baseManage.baseNereason.nerCodeDis'), trigger: 'blur' },
          ],
          nerName: [
            { required: true, message: this.$t('lang_baseManage.baseNereason.nerCnameDis'), trigger: 'blur' },
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
          _mt: 'baseNereason.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.nerCode = res.data.content[0].nerCode
            t.formValidate.nerName = res.data.content[0].nerName
            t.formValidate.comment = res.data.content[0].comment
          }
        }).catch(() => {
          t.$Message.error(this.$t('reminder.errormessage'))
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
                  t.$Message.success(this.$t('reminder.addsuccess'))
                  t.$refs.formValidate.resetFields()
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Message.success(this.$t('reminder.updsuccess'))
                  t.$emit('update', res.data.content[0])
                }
              }
            }).catch(() => {
              t.$Message.error(this.$t('reminder.errormessage'))
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
