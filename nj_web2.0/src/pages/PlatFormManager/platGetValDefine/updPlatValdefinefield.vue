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
            <FormItem :label="$t('lang_root.getDefine.vffProperty')" prop="p_vffProperty">
              <Input v-model="formValidate.vffProperty" :placeholder="$t('lang_root.getDefine.p_vffProperty')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_root.getDefine.vffPropname')" prop="vffPropname">
              <Input v-model="formValidate.vffPropname"  :placeholder="$t('lang_root.getDefine.p_vffPropname')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_root.getDefine.comment')" prop="comment">
              <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_root.getDefine.p_comment')"></Input>
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
        logType: '',
        id: '',
        vffMainid: '',
        formValidate: {
          _mt: 'platValdefinefield.addOrUpd',
          vffProperty: '',
          vffPropname: '',
          comment: '',
        },
        ruleValidate: {
          vffProperty: [
            { required: true, message: this.$t('lang_root.getDefine.rule_vffProperty'), trigger: 'blur' },
          ],
          vffPropname: [
            { required: true, message: this.$t('lang_root.getDefine.rule_vffPropname'), trigger: 'blur' },
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
      getFormData() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platValdefinefield.getById',
          id: t.$store.state.platGetValDefine.childId1,
          logType: this.$t('button.ser'),
          funId: '1',
          companyId: '0',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.vffProperty = res.data.content[0].vffProperty
            t.formValidate.vffPropname = res.data.content[0].vffPropname
            t.formValidate.comment = res.data.content[0].comment
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
        if (t.$store.state.platGetValDefine.childId1) {
          data.id = t.$store.state.platGetValDefine.childId1
          data.logType = '修改'
        } else {
          data.logType = '新增'
        }
        data.vffMainid = t.$store.state.platGetValDefine.mainId
        t.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.platGetValDefine.childId1) {
                  t.$store.commit('platGetValDefine/addNewArrayChildTable1', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  this.$store.commit('platGetValDefine/setChildId1', '')
                  t.$store.commit('platGetValDefine/updateArrayChildTable1', res.data.content[0])
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
        t.vffMainid = ''
        t.formValidate.vffProperty = ''
        t.formValidate.vffPropname = ''
        t.formValidate.comment = ''
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
