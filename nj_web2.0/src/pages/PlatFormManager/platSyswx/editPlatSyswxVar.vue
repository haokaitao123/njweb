<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_platform.syswx.syswxvarInfo')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row>
        <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="100">
          <i-col span="11">
            <FormItem :label="$t('lang_platform.syswx.syswxvarMark')" prop="syswxvarMark">
              <Input v-model="form.syswxvarMark" :placeholder="$t('lang_platform.syswx.syswxvarMarkIns')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_platform.syswx.syswxvarName')">
              <Input v-model="form.syswxvarName" :placeholder="$t('lang_platform.syswx.syswxvarNameIns')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_platform.syswx.syswxvarValdesc')" prop="syswxvarValdesc">
              <Input v-model="form.syswxvarValdesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.syswx.syswxvarValdescIns')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_platform.syswx.syswxvarComment')" prop="syswxvarComment">
              <Input v-model="form.syswxvarComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.syswx.syswxvarCommentIns')"></Input>
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
  import validChenck from '../../../lib/pub_valid'

  export default {
    data() {
      return {
        form: {
          syswxvarMark: '',
          syswxvarName: '',
          syswxvarValdesc: '',
          syswxvarComment: '',
        },
        rowId: '',
        ruleValidate: {
          syswxvarMark: [
            { required: true, message: this.$t('lang_platform.syswx.syswxvarMarkIns'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
    },
    methods: {
      setRowId(id) {
        const t = this
        t.rowId = id
        t.getdata(id)
      },
      getdata(rowId) {
        const t = this
        const params = {
          _mt: 'platSyswxVar.getById',
          id: rowId,
          funId: '1',
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form.syswxvarMark = res.data.content[0].syswxvarMark
            t.form.syswxvarName = res.data.content[0].syswxvarName
            t.form.syswxvarValdesc = res.data.content[0].syswxvarValdesc
            t.form.syswxvarComment = res.data.content[0].syswxvarComment
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
        params._mt = 'platSyswxVar.addOrUpd'
        params.funId = '1'
        params.logType = this.$t('button.add')
        params.syswxvarWxid = t.id
        if (t.rowId) {
          params.logType = this.$t('button.upd')
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
        t.form.syswxvarMark = ''
        t.form.syswxvarName = ''
        t.form.syswxvarValdesc = ''
        t.form.syswxvarComment = ''
        this.$refs.form.resetFields()
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
