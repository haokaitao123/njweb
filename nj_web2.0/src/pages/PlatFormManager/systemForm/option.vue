<template>
  <div class="option-main">
    <Row>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  label-position="right" :label-width="100">
        <i-col span="11">
          <FormItem :label="$t('lang_sysform.sysForm.sformCode')" prop="sformCode">
            <Input v-model="formValidate.sformCode" :placeholder="$t('lang_sysform.sysForm.p_sformCode')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sysform.sysForm.sformName')" prop="sformName">
            <Input v-model="formValidate.sformName" :placeholder="$t('lang_sysform.sysForm.p_sformName')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_sysform.sysForm.sformTbname')" prop="sformTbname">
            <Input v-model="formValidate.sformTbname" :placeholder="$t('lang_sysform.sysForm.p_sformTbname')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_sysform.sysForm.sformParentfield')" prop="sformParentfield">
            <Input v-model="formValidate.sformParentfield" :placeholder="$t('lang_sysform.sysForm.p_sformParentfield')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_sysform.sysForm.sformAfthdClass')" prop="sformAfthdClass">
            <Input v-model="formValidate.sformAfthdClass"  :placeholder="$t('lang_sysform.sysForm.p_sformAfthdClass')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_sysform.sysForm.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sysform.sysForm.p_comment')"></Input>
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
        formValidate: {
          _mt: 'platSysform.addOrUpd',
          funId: '1',
          sformCode: '',
          sformName: '',
          sformTbname: '',
          sformAfthdClass: '',
          sformParentfield: '',
          comment: '',
        },
        ruleValidate: {
          sformCode: [
            { required: true, message: this.$t('lang_sysform.sysForm.rule_sformCode'), trigger: 'blur' },
          ],
          sformName: [
            { required: true, message: this.$t('lang_sysform.sysForm.rule_sformName'), trigger: 'blur' },
          ],
          sformTbname: [
            { required: true, message: this.$t('lang_sysform.sysForm.rule_sformTbname'), trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
        /*
        * 修改时初始数据
        * */
      getdata() {
        const t = this
        const data = {
          _mt: 'platSysform.getById',
          id: t.$store.state.sysData.mainId,
          funId: '1',
          logType: this.$t('button.ser'),
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            this.formValidate.sformCode = res.data.content[0].sformCode
            this.formValidate.sformName = res.data.content[0].sformName
            this.formValidate.sformTbname = res.data.content[0].sformTbname
            this.formValidate.sformAfthdClass = res.data.content[0].sformAfthdClass
            this.formValidate.sformParentfield = res.data.content[0].sformParentfield
            this.formValidate.comment = res.data.content[0].comment
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
      * 新增或者修改
      * */
      save() {
        const t = this
        const data = deepCopy(t.formValidate)
        if (!t.$store.state.sysData.mainId) {
          data.logType = '新增'
        } else {
          data.logType = '修改'
          data.id = t.$store.state.sysData.mainId
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (!t.$store.state.sysData.mainId) {
//            更新vuex中的mainId
              t.$store.commit('sysData/setMainId', res.data.content[0].id)
//            更新主表数据（无需重新加载）
              t.$store.commit('sysData/addNewArrayMainTable', res.data.content[0])
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('reminder.addsuccess'),
              })
            } else {
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('reminder.updsuccess'),
              })
              //            更新主表数据（无需重新加载）
              t.$store.commit('sysData/updateArrayMainTable', res.data.content[0])
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      clear() {
        this.formValidate.sformCode = ''
        this.formValidate.sformName = ''
        this.formValidate.sformTbname = ''
        this.formValidate.sformAfthdClass = ''
        this.formValidate.sformParentfield = ''
        this.formValidate.comment = ''
        this.$refs.formValidate.resetFields()
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
