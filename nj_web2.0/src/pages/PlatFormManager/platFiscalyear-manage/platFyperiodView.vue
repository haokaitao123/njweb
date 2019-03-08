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
        <Form :model="form" ref="form" label-position="right" :rules="ruleValidate" :label-width="100">
          <i-col span="11" >
            <FormItem :label="$t('lang_platform.PlatFyperiod.fypdPeriod')"  prop="fypdPeriod">
              <Input v-model="form.fypdPeriod" :placeholder="$t('lang_platform.PlatFyperiod.fypdPeriodDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_platform.PlatFyperiod.fypdMark1')" prop="fypdMark1">
              <Input v-model="form.fypdMark1" :placeholder="$t('lang_platform.PlatFyperiod.fypdMark1Dis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_platform.PlatFyperiod.fypdMark2')" prop="fypdMark2">
              <Input v-model="form.fypdMark2" :placeholder="$t('lang_platform.PlatFyperiod.fypdMark2Dis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_platform.PlatFyperiod.fypdMark3')" prop="fypdMark3">
              <Input v-model="form.fypdMark3" :placeholder="$t('lang_platform.PlatFyperiod.fypdMark3Dis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_platform.PlatFyperiod.fypdStartdate')" prop="fypdStartdate">
              <DatePicker type="date" :placeholder="$t('lang_platform.PlatFyperiod.fypdStartdateDis')" :editable="false" v-model="form.fypdStartdate" style="width: 100%"></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_platform.PlatFyperiod.fypdEnddate')" prop="fypdEnddate">
              <DatePicker type="date" :placeholder="$t('lang_platform.PlatFyperiod.fypdEnddateDis')" :editable="false" v-model="form.fypdEnddate" style="width: 100%"></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_platform.PlatFyperiod.comment')" prop="comment">
              <Input v-model="form.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.PlatFyperiod.commentDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <row type="flex" justify="end">
              <FormItem label="" prop="comment">
                <Button type="ghost" @click="close" style="margin-left: 8px">{{$t('button.cal')}}</Button>
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
          fypdYear: '',
          fypdPeriod: '',
          fypdMark1: '',
          fypdMark2: '',
          fypdMark3: '',
          fypdStartdate: '',
          fypdEnddate: '',
          comment: '',
        },
        ruleValidate: {
          fypdPeriod: [
            { required: true, message: this.$t('lang_platform.PlatFyperiod.fypdPeriodDis'), trigger: 'blur' },
          ],
          fypdStartdate: [
            { required: true, type: 'date', message: this.$t('lang_platform.PlatFyperiod.fypdStartdateDis'), trigger: 'change' },
          ],
          fypdEnddate: [
            { required: true, type: 'date', message: this.$t('lang_platform.PlatFyperiod.fypdEnddateDis'), trigger: 'change' },
          ],
        },
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
//        t.form.cptcOptionDis = idname
      },
      getdata(rowId) {
        const t = this
        const params = {
          _mt: 'platFyperiod.getById',
          id: rowId,
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form.fypdPeriod = res.data.content[0].fypdPeriod
            t.form.fypdMark1 = res.data.content[0].fypdMark1
            t.form.fypdMark2 = res.data.content[0].fypdMark2
            t.form.fypdMark3 = res.data.content[0].fypdMark3
            t.form.fypdStartdate = res.data.content[0].fypdStartdate
            t.form.fypdEnddate = res.data.content[0].fypdEnddate
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
        params._mt = 'platFyperiod.addOrUpd'
        params.logType = this.$t('button.add')
        params.fypdYear = t.$store.state.platFis.childId1
        if (t.logType === this.$t('button.upd')) {
          params.id = t.id
        }
        for (const dat in params) {
          if (t.rowId) {
            params.logType = this.$t('button.upd')
            params.id = t.rowId
          }
        }
        if (params.fypdStartdate !== undefined) {
          params.fypdStartdate = new Date(params.fypdStartdate).format('yyyy-MM-dd')
        }
        if (params.fypdEnddate !== undefined) {
          params.fypdEnddate = new Date(params.fypdEnddate).format('yyyy-MM-dd')
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(params).then((res) => {
              if (isSuccess(res, t)) {
                t.close()
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.form.resetFields()
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
        t.rowId = null
        t.form.fypdPeriod = ''
        t.form.fypdMark1 = ''
        t.form.fypdMark2 = ''
        t.form.fypdMark3 = ''
        t.form.fypdStartdate = ''
        t.form.fypdEnddate = ''
        t.form.comment = ''
        t.$refs.form.resetFields()
      },
      close() {
        this.$emit('hideMsg')
        this.$refs.form.resetFields()
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
