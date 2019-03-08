<template>
  <div class="option-main">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_root.getDefine.gvfMark')" prop="gvfMark">
            <Input v-model="formValidate.gvfMark" :placeholder="$t('lang_root.getDefine.p_gvfMark')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1" >
          <FormItem :label="$t('lang_root.getDefine.gvfName')" prop="gvfName">
            <Input v-model="formValidate.gvfName" :placeholder="$t('lang_root.getDefine.p_gvfName')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_root.getDefine.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_root.getDefine.p_comment')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Button class="btn" type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
      </Form>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        selectLayoutMode: [],
        formValidate: {
          _mt: 'platGetValDefine.addOrUpd',
          funId: '1',
          gvfMark: '',
          gvfName: '',
          comment: '',
        },
        ruleValidate: {
          gvfMark: [
            { required: true, message: this.$t('lang_root.getDefine.rule_gvfMark'), trigger: 'blur' },
          ],
          gvfName: [
            { required: true, message: this.$t('lang_root.getDefine.rule_gvfName'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    methods: {
      getdata() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platGetValDefine.getById',
          funId: 1000,
          id: t.$store.state.platGetValDefine.mainId,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.gvfMark = res.data.content[0].gvfMark
            t.formValidate.gvfName = res.data.content[0].gvfName
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
        if (t.$store.state.platGetValDefine.mainId) {
          data.logType = '修改'
          data.id = t.$store.state.platGetValDefine.mainId
        } else {
          data.logType = '新增'
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.platGetValDefine.mainId) {
                  t.$store.commit('platGetValDefine/addNewArrayMainTable', res.data.content[0])
                  t.$store.commit('platGetValDefine/setMainId', res.data.content[0].id)
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$store.commit('platGetValDefine/updateArrayMainTable', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
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
        const t = this
        t.formValidate.gvfMark = ''
        t.formValidate.gvfName = ''
        t.formValidate.comment = ''
        t.$refs.formValidate.resetFields()
      },
      close() {
        this.clear()
        this.$emit('hideMsg')
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

