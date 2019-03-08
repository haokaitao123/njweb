<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{ logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row>
        <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="110">
          <i-col span="11">
            <FormItem :label="$t('lang_payroll.payAdjustItem.plajitmType')" prop="plajitmType">
              <Input v-model="form.plajitmTypeDis" disabled :placeholder="$t('lang_payroll.payAdjustItem.plajitmTypeDis')" />
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_payroll.payAdjustItem.plajitmItem')" prop="plajitmItem">
              <Input v-model="form.plajitmItemDis" disabled :placeholder="$t('lang_payroll.payAdjustItem.plajitmItemDis')" />
            </FormItem>
          </i-col>
          <i-col span="11">
           <FormItem :label="$t('lang_payroll.payAdjustItem.plajitmCurrency')" prop="plajitmCurrency">
             <Input v-model="form.plajitmCurrencyDis" disabled :placeholder="$t('lang_payroll.payAdjustItem.plajitmCurrencyDis')" />
           </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_payroll.payAdjustItem.plajitmAmount')" prop="plajitmAmount">
              <Input v-model="form.plajitmAmount" disabled :placeholder="$t('lang_payroll.payAdjustItem.plajitmAmountDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_payroll.payAdjustItem.plajitmAdjust')" prop="plajitmAdjust">
              <RadioGroup v-model="form.plajitmAdjust"  :placeholder="$t('lang_payroll.payAdjustItem.plajitmAdjustDis')" >
                <Radio :label="item.paramCode" v-for="(item,index) in YesOrNoType" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_payroll.payAdjustItem.plajitmSdate')" prop="plajitmSdate">
              <Input v-model="form.plajitmSdate" disabled :placeholder="$t('lang_payroll.payAdjustItem.plajitmSdateDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_payroll.payAdjustItem.plajitmSpecsdate')" prop="plajitmSpecsdate">
              <DatePicker type="date" style="width: 100%" :placeholder="$t('lang_payroll.payAdjustItem.plajitmSpecsdateDis')" :editable="false" v-model="form.plajitmSpecsdate" ></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1" v-show="form.plajitmAdjust === '1'?true:false">
            <FormItem :label="$t('lang_payroll.payAdjustItem.plajitmAdjamt')" prop="plajitmAdjamt">
              <Input v-model="form.plajitmAdjamt" :placeholder="$t('lang_payroll.payAdjustItem.plajitmAdjamtDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_payroll.payAdjustItem.plajitmComment')" prop="plajitmComment">
              <Input v-model="form.plajitmComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payAdjustItem.plajitmCommentDis')"></Input>
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
        YesOrNoType: [],
        form: {},
        rowId: '',
        openItem: false,
        ruleValidate: {
          plajitmAdjamt: [
            { required: true, message: this.$t('lang_payroll.payAdjustItem.plajitmAdjamtDis'), trigger: 'blur' },
          ],
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
      this.getSelect()
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
          _mt: 'payAdjustSalitem.getById',
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
        params._mt = 'payAdjustSalitem.addOrUpd'
        params.funId = '1'
        params.logType = '修改'
        params.id = t.rowId
        if (params.plajitmSpecsdate) {
          params.plajitmSpecsdate = new Date(params.plajitmSpecsdate).format('yyyy-MM-dd')
        }
        if (params.plajitmAdjust === '0') {
          delete this.ruleValidate.plajitmAdjamt
        } else {
          this.ruleValidate.plajitmAdjamt = [
            { required: true, message: this.$t('lang_payroll.payAdjustItem.plajitmAdjamtDis'), trigger: 'blur' },
          ]
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
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.YesOrNoType = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      clear() {
        const t = this
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
