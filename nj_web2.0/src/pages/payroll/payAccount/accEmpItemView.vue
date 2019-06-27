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
      <div>
        <Row>
          <Form ref="form" :model="form" :label-width="130">


            <i-col span="10">
              <FormItem :label="$t('lang_payroll.payAccItem.pacemimItem')" prop="pacemimItem">
                <Input v-model="form.pacemimValueDis" disabled :placeholder="$t('lang_payroll.payAccItem.pacemimItemDis')"/>
              </FormItem>
            </i-col>
            <i-col span="10">
              <FormItem :label="$t('lang_payroll.payAccItem.pacemimValue')" prop="pacemimValue">
                <Input v-model="form.pacemimValue" disabled :placeholder="$t('lang_payroll.payAccItem.pacemimValueDis')"/>
              </FormItem>
            </i-col>
            <i-col span="21">
              <FormItem :label="$t('lang_payroll.payAccItem.pacemimComment')" prop="pacemimComment">
                <Input v-model="form.pacemimComment" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payAccItem.pacemimCommentDis')"></Input>
              </FormItem>
            </i-col>
          </Form>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        form: {},
        pacemEmpworkno: '',
        pacemCname: '',
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    mounted() {
    },
    methods: {
      getData(row) {
        const t = this
        t.pacemEmpworkno = row.pacemEmpworkno
        t.pacemCname = row.pacemCname
        getDataLevelUserLogin({
          _mt: 'payAccountEmpitem.getById',
          id: row.id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form = res.data.content[0]
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset() {
        const t = this
        t.form = {}
        t.$refs.form.resetFields()
        t.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
