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
        <Form :model="form" ref="form" label-position="right"  :label-width="140">
          <i-col span="11" >
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsInsurance')" >
              <Input  v-model="form.sirpinsInsuranceDis" disabled  style="width: 100%"></Input>
            </FormItem>
          </i-col>
          <i-col span="11"offset="1">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsBaseamt')">
              <Input   v-model="form.sirpinsBaseamt"disabled style="width: 100%"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsCompratio')" >
              <Input v-model="form.sirpinsCompratio"disabled  ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsCompamt')" >
              <Input v-model="form.sirpinsCompamt" disabled ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsCompsum')" >
              <Input v-model="form.sirpinsCompsum" disabled ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsPersratio')" >
              <Input v-model="form.sirpinsPersratio" disabled ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsPersamt')" >
              <Input v-model="form.sirpinsPersamt" disabled ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsPerssum')" >
              <Input v-model="form.sirpinsPerssum" disabled ></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_repayApply.sihfRepayInsurance.sirpinsComment')" prop="comment">
              <Input v-model="form.sirpinsComment" type="textarea"disabled :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_authorization.platRole.commentDis')"></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <!--<Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>-->
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  export default {
    data() {
      return {
        platRolechildEmpidDis: '',
        openManger: false,
        logType: this.$t('lang_authorization.platRole.searchColumn.title'),
        rolecontType: [],
        form: {
          _mt: 'sihfRepay.addOrUpdChild',
          sirpinsInsurance: '',
          sirpinsBaseamt: '',
          sirpinsCompratio: '',
          sirpinsCompamt: '',
          sirpinsCompsum: '',
          sirpinsPersratio: '',
          sirpinsPersamt: '',
          sirpinsPerssum: '',
          sirpinsComment: '',
          sirpinsInsuranceDis: '',
          sirpinsRpid: '',
        },
        rowId: '',
      }
    },
    props: {
      id: Number,
      logType: String,
    },
    components: {
    },
    mounted() {
    },
    methods: {
      setRowId(id) {
        const t = this
        if (id !== '') {
          t.rowId = id
          t.getdata(id)
        }
      },
      getdata(rowId) {
        const t = this
        const params = {
          _mt: 'sihfRepay.getByIdChild',
          id: rowId,
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form.sirpinsInsurance = res.data.content[0].sirpinsInsurance
            t.form.sirpinsBaseamt = res.data.content[0].sirpinsBaseamt
            t.form.sirpinsCompratio = res.data.content[0].sirpinsCompratio
            t.form.sirpinsCompamt = res.data.content[0].sirpinsCompamt
            t.form.sirpinsCompsum = res.data.content[0].sirpinsCompsum
            t.form.sirpinsPersratio = res.data.content[0].sirpinsPersratio
            t.form.sirpinsPersamt = res.data.content[0].sirpinsPersamt
            t.form.sirpinsPerssum = res.data.content[0].sirpinsPerssum
            t.form.sirpinsComment = res.data.content[0].sirpinsComment
            t.form.sirpinsInsuranceDis = res.data.content[0].sirpinsInsuranceDis
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      clear() {
        const t = this
        t.form.empinsInsurance = ''
        t.form.empinsBaseamt = ''
        t.form.empinsCompratio = ''
        t.form.empinsCompamt = ''
        t.form.empinsPersratio = ''
        t.form.empinsPersamt = ''
        t.form.empinsSdate = ''
        t.form.empinsEdate = ''
        t.form.empinsComment = ''
        t.form.sirpinsRpid = ''
      },
//      save() {
//        const t = this
//        const data = deepCopy(t.form)
//        if (t.$store.state.repayConfirm.mainId) {
//          data.sirpinsRpid = t.$store.state.repayConfirm.mainId
//          data.id = t.rowId
//        }
//        data.logType = '修改'
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
//        getDataLevelUserLoginNew(data).then((res) => {
//          if (isSuccess(res, t)) {
//            t.$store.commit('repayConfirm/setChildId1', res.data.content[0].id)
//            t.$Modal.success({
//              title: this.$t('reminder.suc'),
//              content: this.$t('reminder.updsuccess'),
//            })
//            t.close()
////            this.$emit('getdata', res.data.content[0])
////            t.$emit('updata', res.data.content[0])
//          }
//        }).catch(() => {
//          this.$Modal.error({
//            title: this.$t('reminder.err'),
//            content: this.$t('reminder.errormessage'),
//          })
//        })
//      },
      close() {
        this.$emit('hideMsg')
        this.clear()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd.scss";
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
