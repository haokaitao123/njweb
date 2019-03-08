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
        <Form :model="form" ref="form" label-position="right"  :label-width="120">
          <i-col span="11" >
            <FormItem :label="$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsInsurance')" >
              <Input  v-model="form.empinsInsurance"disabled  style="width: 100%" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11"offset="1">
            <FormItem :label="$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsBaseamt')">
              <Input   v-model="form.empinsBaseamt"disabled style="width: 100%"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsCompratio')" v-show="showDesc">
              <Input v-model="form.empinsCompratio" disabled ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsCompamt')" v-show="showDesc">
              <Input v-model="form.empinsCompamt" disabled ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsPersratio')" v-show="showDesc">
              <Input v-model="form.empinsPersratio" disabled ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsPersamt')" v-show="showDesc">
              <Input v-model="form.empinsPersamt"disabled  ></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsSdate')" v-show="showDesc">
              <Input v-model="form.empinsSdate" disabled ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsEdate')" v-show="showDesc">
              <Input v-model="form.empinsEdate" disabled ></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_ansrptEmpSihf.ansrptSihfInsurance.empinsComment')" prop="comment">
              <Input v-model="form.empinsComment"disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_authorization.platRole.commentDis')"></Input>
            </FormItem>
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
        platRolechildEmpidDis: '',
        openManger: false,
        rolecontType: [],
        form: {
          empinsInsurance: '',
          empinsBaseamt: '',
          empinsCompratio: '',
          empinsCompamt: '',
          empinsPersratio: '',
          empinsPersamt: '',
          empinsSdate: '',
          empinsEdate: '',
          empinsComment: '',
        },
        showDesc: true,
        rowId: '',
        searchMangerClo: [
          {
            title: this.$t('lang_authorization.platRole.searchColumn.empCname'),
            key: 'empCname',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_authorization.platRole.searchColumn.empGid'),
            key: 'empGid',
            sortable: 'custom',
          },
        ],
        paramsManger: {
          _mt: 'empBase.getPage',
          sort: 'id',
          order: 'desc',
          rows: '10',
          page: '1',
          logType: '员工查询',
          data: '{}',
        },
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
        t.rowId = id
        t.getdata(id)
      },
      getdata(rowId) {
        const t = this
        const params = {
          _mt: 'ansrptEmpSihfInsurance.getById',
          id: rowId,
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form.empinsInsurance = res.data.content[0].empinsInsuranceDis
            t.form.empinsBaseamt = res.data.content[0].empinsBaseamt
            t.form.empinsCompratio = res.data.content[0].empinsCompratio
            t.form.empinsCompamt = res.data.content[0].empinsCompamt
            t.form.empinsPersratio = res.data.content[0].empinsPersratio
            t.form.empinsPersamt = res.data.content[0].empinsPersamt
            t.form.empinsSdate = res.data.content[0].empinsSdate
            t.form.empinsEdate = res.data.content[0].empinsEdate
            t.form.empinsComment = res.data.content[0].empinsComment
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
