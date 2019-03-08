<template>
  <div class="option-main">
    <Row>
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="120">
        <i-col span="11">
        <FormItem :label="$t('lang_platform.platFiscalyear.fyYear')"  prop="fyYear">
          <Input v-model="form.fyYear" :placeholder="$t('lang_platform.platFiscalyear.fyYearDis')" ></Input>
        </FormItem>
      </i-col>
        <i-col span="11"  >
          <FormItem :label="$t('lang_platform.platFiscalyear.fyMark1')" prop="fyMark1">
            <Input v-model="form.fyMark1" :placeholder="$t('lang_platform.platFiscalyear.fyMark1Dis')" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_platform.platFiscalyear.fyMark2')" prop="fyMark2">
            <Input v-model="form.fyMark2" :placeholder="$t('lang_platform.platFiscalyear.fyMark2Dis')" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11"  >
          <FormItem :label="$t('lang_platform.platFiscalyear.fyMark3')" prop="fyMark3">
            <Input v-model="form.fyMark3" :placeholder="$t('lang_platform.platFiscalyear.fyMark3Dis')" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_platform.platFiscalyear.fySdate')" prop="fySdate">
            <DatePicker type="date" :placeholder="$t('lang_platform.platFiscalyear.fySdateDis')" :editable="false" v-model="form.fySdate" style="width: 100%"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11"  >
          <FormItem :label="$t('lang_platform.platFiscalyear.fyEdate')" prop="fyEdate">
            <DatePicker type="date" :placeholder="$t('lang_platform.platFiscalyear.fyEdateDis')" :editable="false" v-model="form.fyEdate" style="width: 100%"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_platform.platFiscalyear.fyAlcalcdate')" prop="fyAlcalcdate">
            <DatePicker type="date" :placeholder="$t('lang_platform.platFiscalyear.fyAlcalcdateDis')" :editable="false" v-model="form.fyAlcalcdate" style="width: 100%"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11"  >
          <FormItem :label="$t('lang_platform.platFiscalyear.fyAlclosedate')" prop="fyAlclosedate">
            <DatePicker type="date" :placeholder="$t('lang_platform.platFiscalyear.fyAlclosedateDis')" :editable="false" v-model="form.fyAlclosedate" style="width: 100%"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="22">
        <FormItem :label="$t('lang_platform.platFiscalyear.comment')" prop="comment">
          <Input v-model="form.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.platFiscalyear.commentDis')"></Input>
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
          _mt: 'platFiscalyear.addOrUpd',
          funId: '1',
          fyYear: '',
          fyMark1: '',
          fyMark2: '',
          fyMark3: '',
          fyAlcalcdate: '',
          fyAlclosedate: '',
          fySdate: '',
          fyEdate: '',
          comment: '',
        },
        ruleValidate: {
          fySdate: [
            { required: true, type: 'date', message: this.$t('lang_platform.platFiscalyear.fySdateDis'), trigger: 'change' },
          ],
          fyEdate: [
            { required: true, type: 'date', message: this.$t('lang_platform.platFiscalyear.fyEdateDis'), trigger: 'change' },
          ],
          fyYear: [
            { required: true, message: this.$t('lang_platform.platFiscalyear.fyYearDis'), trigger: 'blur' },
          ],
        },
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
      getdata() {
        const t = this
        const params = {
          _mt: 'platFiscalyear.getById',
          id: t.$store.state.platFis.mainId,
          logType: '根据id查询',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.form.fyYear = res.data.content[0].fyYear
            this.form.fyMark1 = res.data.content[0].fyMark1
            this.form.fyMark2 = res.data.content[0].fyMark2
            this.form.fyMark3 = res.data.content[0].fyMark3
            this.form.fyAlcalcdate = res.data.content[0].fyAlcalcdate
            this.form.fyAlclosedate = res.data.content[0].fyAlclosedate
            this.form.fySdate = res.data.content[0].fySdate
            this.form.fyEdate = res.data.content[0].fyEdate
            this.form.comment = res.data.content[0].comment
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
        if (t.$store.state.platFis.mainId) {
          data.id = t.$store.state.platFis.mainId
        }
        data.logType = t.logType
        if (data.fyAlcalcdate !== undefined && data.fyAlcalcdate !== '') {
          data.fyAlcalcdate = new Date(data.fyAlcalcdate).format('yyyy-MM-dd')
        }
        if (data.fyAlclosedate !== undefined && data.fyAlclosedate !== '') {
          data.fyAlclosedate = new Date(data.fyAlclosedate).format('yyyy-MM-dd')
        }
        if (data.fySdate !== undefined && data.fySdate !== '') {
          data.fySdate = new Date(data.fySdate).format('yyyy-MM-dd')
        }
        if (data.fyEdate !== undefined && data.fyEdate !== '') {
          data.fyEdate = new Date(data.fyEdate).format('yyyy-MM-dd')
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.$emit('getid', res.data.content[0].id)
            // 更新vuex中的mainId
            t.$store.commit('platFis/setChildId1', data.fyYear)
//            alert(t.$store.state.platRole.mainId)
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
        this.form.fyYear = ''
        this.form.fyMark1 = ''
        this.form.fyMark2 = ''
        this.form.fyMark3 = ''
        this.form.fyAlcalcdate = ''
        this.form.fyAlclosedate = ''
        this.form.fySdate = ''
        this.form.fyEdate = ''
        this.form.comment = ''
        this.$store.commit('platFis/setMainId', '')
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
