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
        <Form :model="form" :label-position="right" :rules="ruleValidate"  ref="form" :label-width="110">
          <i-col span="11">
            <FormItem :label="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsInsurance')">
              <Select v-model="form.sihfeinsInsurance" disabled :placeholder="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsInsuranceDis')" >
                <Option :value="item.id" v-for="(item,index) in selectPcyinsIns" :key="index">{{item.sscName}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsBaseamt')" prop="sihfeinsBaseamt">
              <Input v-model="form.sihfeinsBaseamt" disabled :placeholder="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsBaseamtDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
           <FormItem :label="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsCompratio')" prop="sihfeinsCompratio">
            <Input v-model="form.sihfeinsCompratio" disabled :placeholder="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsCompratioDis')"></Input>
           </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsCompamt')" prop="sihfeinsCompamt">
              <Input v-model="form.sihfeinsCompamt" disabled :placeholder="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsCompamtDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsPersratio')" prop="sihfeinsPersratio">
              <Input v-model="form.sihfeinsPersratio" disabled :placeholder="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsPersratioDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1" >
            <FormItem :label="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsPersamt')" prop="sihfeinsPersamt">
              <Input v-model="form.sihfeinsPersamt" disabled :placeholder="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsPersamtDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sihfPolicy.hfundendInsurance.sihfeLastemployday')">
              <Input v-model="sihfeLastemployday" disabled :placeholder="$t('lang_sihfPolicy.hfundendInsurance.sihfeLastemploydayDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsApplymonth')" prop="sihfeinsApplymonth">
              <DatePicker type="month" :placeholder="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsApplymonthDis')" style="width: 100%" :editable="false"
                          v-model="form.sihfeinsApplymonth" ></DatePicker>
              <!--<Input v-model="form.sihfeinsApplymonth" disabled :placeholder="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsInsuranceDis')"></Input>-->
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsComment')" prop="sihfeinsComment">
              <Input v-model="form.sihfeinsComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sihfPolicy.hfundendInsurance.sihfeinsCommentDis')"></Input>
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
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  export default {
    data() {
      return {
        openPick: false,
        form: {},
        rowId: '',
        ruleValidate: {
          sihfeinsApplymonth: [
            { required: true, type: 'date', message: this.$t('lang_sihfPolicy.hfundendInsurance.sihfeinsApplymonthDis'), trigger: 'change' },
          ],
          sihfeinsPersratio: [
            { required: true, message: this.$t('lang_sihfPolicy.hfundendInsurance.sihfeinsPersratioDis'), trigger: 'blur' },
          ],
          sihfeinsCompratio: [
            { required: true, message: this.$t('lang_sihfPolicy.hfundendInsurance.sihfeinsCompratioDis'), trigger: 'blur' },
          ],
          sihfeinsBaseamt: [
            { required: true, message: this.$t('lang_sihfPolicy.hfundendInsurance.sihfeinsBaseamtDis'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      sihfeLastemployday: String,
      selectPcyinsIns: Array,
    },
    components: {
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
          _mt: 'sihfHfundendInsurance.getById',
          id: rowId,
          funId: '1',
          logType: '根据id查询险种明细信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form = res.data.content[0]
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
        params._mt = 'sihfHfundendInsurance.addOrUpd'
        params.funId = '1'
        params.logType = '修改'
        params.id = t.rowId
        if (params.sihfeinsApplymonth !== '') {
          params.sihfeinsApplymonth = new Date(params.sihfeinsApplymonth).format('yyyy-MM')
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(params).then((res) => {
              if (isSuccess(res, t)) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('getData', res.data.content[0])
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
        t.sihfeLastemployday = ''
        t.form = {}
        t.$refs.form.resetFields()
      },
      close() {
        this.rowId = ''
        this.$emit('hideMsg')
        this.clear()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd";
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
