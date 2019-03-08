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
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsInsurance')" >
              <Input  v-model="form.sihfrpinsInsuranceDis" disabled  style="width: 100%"></Input>
            </FormItem>
          </i-col>
          <i-col span="11"offset="1">
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsBaseamt')">
              <Input   v-model="form.sihfrpinsBaseamt"disabled style="width: 100%"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsCompratio')" >
              <Input v-model="form.sihfrpinsCompratio"disabled  ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsCompamt')" >
              <Input v-model="form.sihfrpinsCompamt" disabled ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsCompsum')" >
              <Input v-model="form.sihfrpinsCompsum"  disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsPersratio')" >
              <Input v-model="form.sihfrpinsPersratio"  disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsPersamt')" >
              <Input v-model="form.sihfrpinsPersamt" disabled ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsPerssum')" >
              <Input v-model="form.sihfrpinsPerssum"  disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_hfrepay.sihfHfrepayInsurance.sihfrpinsComment')" prop="comment">
              <Input v-model="form.sihfrpinsComment"disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                     :placeholder="$t('lang_authorization.platRole.commentDis')"></Input>
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
        openManger: false,
//        logType: this.$t('lang_authorization.platRole.searchColumn.title'),
        rolecontType: [],
        form: {
          _mt: 'sihfHfrepay.addOrUpdChild',
          sihfrpinsInsurance: '',
          sihfrpinsBaseamt: '',
          sihfrpinsCompratio: '',
          sihfrpinsCompamt: '',
          sihfrpinsCompsum: '',
          sihfrpinsPersratio: '',
          sihfrpinsPersamt: '',
          sihfrpinsPerssum: '',
          sihfrpinsComment: '',
          sihfrpinsInsuranceDis: '',
          sihfrpinsRpid: '',
        },
        rowId: '',
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
          _mt: 'sihfHfrepay.getByIdChild',
          id: rowId,
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form.sihfrpinsInsurance = res.data.content[0].sihfrpinsInsurance
            t.form.sihfrpinsBaseamt = res.data.content[0].sihfrpinsBaseamt
            t.form.sihfrpinsCompratio = res.data.content[0].sihfrpinsCompratio
            t.form.sihfrpinsCompamt = res.data.content[0].sihfrpinsCompamt
            t.form.sihfrpinsCompsum = res.data.content[0].sihfrpinsCompsum
            t.form.sihfrpinsPersratio = res.data.content[0].sihfrpinsPersratio
            t.form.sihfrpinsPersamt = res.data.content[0].sihfrpinsPersamt
            t.form.sihfrpinsPerssum = res.data.content[0].sihfrpinsPerssum
            t.form.sihfrpinsComment = res.data.content[0].sihfrpinsComment
            t.form.sihfrpinsInsuranceDis = res.data.content[0].sihfrpinsInsuranceDis
            t.form.sihfrpinsRpid = res.data.content[0].sihfrpinsRpid
            this.$store.commit('repayHfrepay/setChildId1', res.data.content[0].id)
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
        t.form.sihfrpinsInsurance = ''
        t.form.sihfrpinsBaseamt = ''
        t.form.sihfrpinsCompratio = ''
        t.form.sihfrpinsCompamt = ''
        t.form.sihfrpinsCompsum = ''
        t.form.sihfrpinsPersratio = ''
        t.form.sihfrpinsPersamt = ''
        t.form.sihfrpinsPerssum = ''
        t.form.sihfrpinsComment = ''
        t.form.sihfrpinsInsuranceDis = ''
        t.form.sihfrpinsRpid = ''
        this.$store.commit('repayHfrepay/setChildId1', '')
        this.$refs.form.resetFields()
      },
//      save() {
//        const t = this
//        if (t.$store.state.repayHfrepay.childId1 !== '') {
//          t.form["id"] = t.rowId
//        }
//        const data = deepCopy(t.form)
//        data.logType = '修改'
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
//        getDataLevelUserLoginNew(data).then((res) => {
//          if (isSuccess(res, t)) {
//            t.$store.commit('repayApply/setChildId1', res.data.content[0].id)
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
