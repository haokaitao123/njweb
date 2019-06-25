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
            <FormItem :label="$t('lang_root.sysVar.platVarCode')"  prop="platVarCode">
            <Input v-model="formValidate.platVarCode" :placeholder="$t('lang_root.sysVar.p_platVarCode')" ></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem :label="$t('lang_root.sysVar.platVarCnname')" prop="platVarCnname">
            <Input v-model="formValidate.platVarCnname" :placeholder="$t('lang_root.sysVar.p_cplatVarCnname')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_root.sysVar.platVarDesc')" prop="platVarDesc">
            <Input v-model="formValidate.platVarDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_root.sysVar.p_platVarDesc')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_root.sysVar.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_root.sysVar.p_comment')"></Input>
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
          _mt: 'platFormVar.addOrModifyVar',
          platVarCode: '',
          platVarCnname: '',
          platVarDesc: '',
          comment: '',
          funId: '1',
          logType: '',
        },
        ruleValidate: {
          platVarCode: [
            { required: true, message: this.$t('lang_root.sysVar.rule_platVarCode'), trigger: 'blur' },
          ],
          platVarCnname: [
            { required: true, message: this.$t('lang_root.sysVar.rule_platVarCnname'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    components: {
    },
    updated() {

    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platFormVar.selectVarById',
          id: id,
          funId: '1',
          logType: '反查',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.platVarCode = res.data.content[0].platVarCode
            t.formValidate.platVarCnname = res.data.content[0].platVarCnname
            t.formValidate.platVarDesc = res.data.content[0].platVarDesc
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
        this.$emit('closeUp')
      },
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
