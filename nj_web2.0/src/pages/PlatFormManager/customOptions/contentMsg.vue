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
      <Row>
        <Form :model="form" ref ="form" label-position="right" :rules="ruleValidate" :label-width="100">
          <i-col span="11">
            <FormItem :label="$t('lang_selfdef.platCopcontent.cptcOrder')" prop="cptcOrder">
              <Input v-model="form.cptcOrder" :placeholder="$t('lang_selfdef.platCopcontent.p_cptcOrder')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_selfdef.platCopcontent.cptcOption')" prop="cptcOption">
              <Input v-model="form.cptcOptionDis" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_selfdef.platCopcontent.cptcCname')" prop="cptcCname">
              <Input v-model="form.cptcCname" placeholder="$t('lang_selfdef.platCopcontent.p_cptcCname')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_selfdef.platCopcontent.cptcEname')" prop="cptcEname">
              <Input v-model="form.cptcEname" :placeholder="$t('lang_selfdef.platCopcontent.p_cptcEname')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23" prop="comment">
            <FormItem :label="$t('lang_selfdef.platCopcontent.comment')" >
              <Input v-model="form.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_selfdef.platCopcontent.p_comment')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <row type="flex" justify="end">
              <FormItem label="" prop="comment">
                <Button type="primary" @click="save">{{$t('button.sav')}}</Button>
              </FormItem>
            </row>
          </i-col>
        </Form>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        form: {
          cptcOptionDis: '',
          cptcOrder: '',
          cptcCname: '',
          cptcEname: '',
          comment: '',
        },
        rowId: '',
        ruleValidate: {
          cptcOrder: [
            { required: true, message: this.$t('lang_selfdef.platCopcontent.rule_cptcOrder'), trigger: 'blur' },
          ],
          cptcCname: [
            { required: true, message: this.$t('lang_selfdef.platCopcontent.rule_cptcCname'), trigger: 'blur' },
          ],
          cptcEname: [
            { required: true, message: this.$t('lang_selfdef.platCopcontent.rule_cptcEname'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
    },
    methods: {
      setRowId(id) {
        const t = this
        t.rowId = id
        t.getdata(id)
      },
      setIdname(idname) {
        const t = this
        t.form.cptcOptionDis = idname
      },
      getdata(rowId) {
        const t = this
        const params = {
          _mt: 'platCopcontent.getById',
          id: rowId,
          funId: '1',
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form.cptcOptionDis = res.data.content[0].cptcOptionDis
            t.form.cptcOrder = res.data.content[0].cptcOrder
            t.form.cptcCname = res.data.content[0].cptcCname
            t.form.cptcEname = res.data.content[0].cptcEname
            t.form.comment = res.data.content[0].comment
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
        const params = deepCopy(t.form)
        params._mt = 'platCopcontent.addOrUpd'
        params.funId = '1'
        params.logType = '新增'
        params.cptcOption = t.id
        if (t.rowId) {
          params.logType = '修改'
          params.id = t.rowId
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(params).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.rowId) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
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
        t.rowId = ''
        t.form.cptcOptionDis = ''
        t.form.cptcOrder = ''
        t.form.cptcCname = ''
        t.form.cptcEname = ''
        t.form.comment = ''
        t.$refs.form.resetFields()
      },
      close() {
        this.$emit('hideMsg')
        this.clear()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
