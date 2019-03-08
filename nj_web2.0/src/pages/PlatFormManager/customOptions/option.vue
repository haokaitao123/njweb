<template>
  <div class="option-main">
    <Row>
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="110">
        <i-col span="11">
          <FormItem :label="$t('lang_selfdef.platCustoption.cptTablename')" prop="cptTablename">
            <Input v-model="form.cptTablename" :placeholder="$t('lang_selfdef.platCustoption.p_cptTablename')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_selfdef.platCustoption.cptFiele')" prop="cptFiele">
            <Input v-model="form.cptFiele" :placeholder="$t('lang_selfdef.platCustoption.p_cptFiele')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
        <FormItem :label="$t('lang_selfdef.platCustoption.comment')" prop="comment">
          <Input v-model="form.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_selfdef.platCustoption.p_comment')"></Input>
        </FormItem>
        </i-col>
      </Form>
    </Row>
    <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        form: {
          _mt: 'platCustoption.addOrUpd',
          funId: '1',
          cptTablename: '',
          cptFiele: '',
          comment: '',
        },
        ruleValidate: {
          cptTablename: [
            { required: true, message: this.$t('lang_selfdef.platCustoption.rule_cptTablename'), trigger: 'blur' },
          ],
          cptFiele: [
            { required: true, message: this.$t('lang_selfdef.platCustoption.rule_cptFiele'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    methods: {
      getdata(params) {
        const t = this
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.form.cptTablename = res.data.content[0].cptTablename
            this.form.cptFiele = res.data.content[0].cptFiele
            this.form.comment = res.data.content[0].comment
            t.$emit('getid', res.data.content[0].id, t.form.cptFiele)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const data = deepCopy(t.form)
        data.logType = t.logType
        data.id = t.id
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('getid', res.data.content[0].id, t.form.cptFiele)
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$emit('newdata', res.data.content[0])
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
      clear() {
        this.form.cptTablename = ''
        this.form.cptFiele = ''
        this.form.comment = ''
        this.$refs.form.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
.option-main{
  position: relative;
  height: 500px;
  .btn{
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>
