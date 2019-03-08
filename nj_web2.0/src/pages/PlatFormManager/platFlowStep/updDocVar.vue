<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
          <i-col span="11">
            <FormItem :label="$t('lang_flow.varList.flspvarMark')" prop="flspvarMark">
              <Input v-model="formValidate.flspvarMark" :placeholder="$t('lang_flow.varList.p_flspvarMark')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_flow.varList.flspvarName')" prop="flspvarName">
              <Input v-model="flspvarName" readonly></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        id: '',
        flspvarName: '',
        flspvarBillid: '',
        flspvarSource: '',
        formValidate: {
          _mt: 'platFlstepVar.addOrUpd',
          flspvarMark: '',
          funId: '1',
        },
        ruleValidate: {
          flspvarMark: [
            { required: true, message: this.$t('lang_flow.varList.rule_flspvarMark'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      logType: String,
    },
    components: {
    },
    mounted() {
    },
    methods: {
      close() {
        this.clear()
        this.$emit('hideMsg')
      },
      getFormData(id) {
        const t = this
        t.id = id
        getDataLevelUserLogin({
          _mt: 'platFlstepVar.getById',
          id: id,
          flowId: t.$store.state.flowStepData.flowId,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.flspvarMark = res.data.content[0].flspvarMark
            t.flspvarName = res.data.content[0].flspvarName
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.flspvarBillid = t.$store.state.flowStepData.childId4
        data.flspvarSource = 'flowdoc'
        data.logType = t.logType
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        if (t.logType === this.$t('button.add')) {
          data.flowId = t.$store.state.flowStepData.flowId
        }
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
        t.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.id) {
                  t.$store.commit('flowStepData/addNewArrayChildTable4', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$store.commit('flowStepData/updateArrayChildTable4', res.data.content[0])
                  // 更新主表数据（无需重新加载）
                }
                t.clear()
                t.close()
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
        t.formValidate.flspvarMark = ''
        t.flspvarName = ''
        t.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .box{
    height: 560px;
    overflow:hidden;
    .content{
      left: 20px;
      right: 20px;
      overflow-y: auto;
      position: absolute;
      height: 420px;
    }
  }
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
