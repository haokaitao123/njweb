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
        <Form :model="form" ref="form" label-position="right" :rules="ruleValidate" :label-width="135">
          <i-col span="11">
            <FormItem :label="$t('lang_platdoc.platMailVar.sysmlvarMark')" prop="sysmlvarMark">
              <Input v-model="form.sysmlvarMark" :placeholder="$t('lang_platdoc.platMailVar.sysmlvarMarkDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_platdoc.platMailVar.sysmlvarName')" prop="sysmlvarName">
              <Input v-model="form.sysmlvarName" :placeholder="$t('lang_platdoc.platMailVar.sysmlvarNameDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_platdoc.platMailVar.sysmlvarValdesc')" >
              <Input v-model="form.sysmlvarValdesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platdoc.platMailVar.sysmlvarValdescDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_platdoc.platMailVar.sysmlvarComment')" >
              <Input v-model="form.sysmlvarComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platdoc.platMailVar.sysmlvarCommentDis')"></Input>
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
        rolecontType: [],
        form: {
          sysmlvarMark: '',
          sysmlvarName: '',
          sysmlvarValdesc: '',
          sysmlvarComment: '',
        },
        ruleValidate: {
          sysmlvarMark: [
            { required: true, message: this.$t('lang_platdoc.platMailVar.sysmlvarMarkDis'), trigger: 'blur' },
          ],
          sysmlvarName: [
            { required: true, message: this.$t('lang_platdoc.platMailVar.sysmlvarNameDis'), trigger: 'blur' },
          ],
        },
        showDesc: true,
        rowId: '',
      }
    },
    props: {
      id: Number,
      logType: String,
    },
    mounted() {
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
          _mt: 'platSysmailVar.getById',
          id: rowId,
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form.sysmlvarMark = res.data.content[0].sysmlvarMark
            t.form.sysmlvarName = res.data.content[0].sysmlvarName
            t.form.sysmlvarValdesc = res.data.content[0].sysmlvarValdesc
            t.form.sysmlvarComment = res.data.content[0].sysmlvarComment
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
        params._mt = 'platSysmailVar.addOrUpd'
        params.logType = this.$t('button.add')
        params.sysmlvarMailid = t.$store.state.platSysMailJS.mainId
        for (const dat in params) {
          if (t.rowId) {
            params.logType = this.$t('button.upd')
            params.id = t.rowId
          }
          if (params[dat] === '') {
            delete params[dat]
          }
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
        t.form.sysmlvarMark = ''
        t.form.sysmlvarName = ''
        t.form.sysmlvarValdesc = ''
        t.form.sysmlvarComment = ''
        t.$refs.form.resetFields()
      },
      close() {
        this.$emit('hideMsg')
        this.clear()
      },
      selChangeType() {
        const t = this
        if (t.form.platRolechildType === '01emplyee') {
          t.showDesc = false
        } else {
          t.showDesc = true
        }
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
