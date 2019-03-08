<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseExrate.exrLocalcurrencyName')" prop="exrLocalcurrency">
            <Select v-model="formValidate.exrLocalcurrency" :placeholder="$t('lang_baseManage.baseExrate.exrLocalcurrencyNameDis')">
              <Option :value="item.id" v-for="(item,index) in selectCurrency" key="index">{{item.currCurrency}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseExrate.exrCurrencyName')" prop="exrCurrency">
            <Select v-model="formValidate.exrCurrency" :placeholder="$t('lang_baseManage.baseExrate.exrCurrencyNameDis')">
              <Option :value="item.id" v-for="(item,index) in selectCurrency" key="index">{{item.currCurrency}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseExrate.exrDate')" prop="exrDate">
            <DatePicker type="date" :placeholder="$t('lang_baseManage.baseExrate.exrDateDis')" :editable="false" v-model="formValidate.exrDate" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseExrate.exrExrate')" prop="exrExrate">
            <Input v-model="formValidate.exrExrate" :placeholder="$t('lang_baseManage.baseExrate.exrExrateDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_baseManage.baseExrate.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_baseManage.baseExrate.commentDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
              <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        selectCurrency: [],
        formValidate: {
          _mt: 'baseExrate.addOrUpd',
          funId: '1',
          exrCurrency: '',
          exrDate: '',
          exrLocalcurrency: '',
          exrExrate: '',
          comment: '',
        },
        ruleValidate: {
          exrLocalcurrency: [
            { required: true, message: this.$t('lang_baseManage.baseExrate.exrLocalcurrencyNameDis'), trigger: 'blur' },
          ],
          exrCurrency: [
            { required: true, message: this.$t('lang_baseManage.baseExrate.exrCurrencyNameDis'), trigger: 'blur' },
          ],
          exrDate: [
            { required: true, type: 'date', message: this.$t('lang_baseManage.baseExrate.exrDateDis'), trigger: 'change' },
          ],
          exrExrate: [
            { required: true, message: this.$t('lang_baseManage.baseExrate.exrExrateDis'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    updated() {

    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseExrate.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.exrCurrency = res.data.content[0].exrCurrency
            t.formValidate.exrDate = res.data.content[0].exrDate
            t.formValidate.exrExrate = res.data.content[0].exrExrate
            t.formValidate.exrLocalcurrency = res.data.content[0].exrLocalcurrency
            t.formValidate.comment = res.data.content[0].comment
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        if (data.exrDate !== undefined) {
          data.exrDate = new Date(data.exrDate).format('yyyy-MM-dd')
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.formValidate.resetFields()
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
              this.$Modal.error({
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
          _mt: 'baseCurrency.getSelectValue',
          data: '{}',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectCurrency = (res.data.content[0].value)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset() {
        this.$emit('closeUp')
        this.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
