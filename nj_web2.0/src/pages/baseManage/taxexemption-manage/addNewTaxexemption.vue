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
          <FormItem :label="$t('lang_baseManage.baseTaxexemption.taxexeEmptypeName')" prop="taxexeEmptype">
            <Select v-model="formValidate.taxexeEmptype" :placeholder="$t('lang_baseManage.baseTaxexemption.taxexeEmptypeNameDis')">
              <Option :value="item.paramCode" v-for="(item,index) in selectEmpType" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseTaxexemption.taxexeThreshold')" prop="taxexeThreshold">
            <Input v-model="formValidate.taxexeThreshold" :placeholder="$t('lang_baseManage.baseTaxexemption.taxexeThresholdDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseTaxexemption.taxexeSdate')" prop="taxexeSdate">
            <DatePicker type="date" :placeholder="$t('lang_baseManage.baseTaxexemption.taxexeSdateDis')" :editable="false" v-model="formValidate.taxexeSdate" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseTaxexemption.taxexeEdate')" prop="taxexeEdate">
            <DatePicker type="date" :placeholder="$t('lang_baseManage.baseTaxexemption.taxexeEdateDis')" :editable="false" v-model="formValidate.taxexeEdate" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_baseManage.baseTaxexemption.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_baseManage.baseTaxexemption.commentDis')"></Input>
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
        selectEmpType: [],
        formValidate: {
          _mt: 'baseTaxexemption.addOrUpd',
          funId: '1',
          taxexeEmptype: '',
          taxexeThreshold: '',
          taxexeSdate: '',
          taxexeEdate: '',
          comment: '',
        },
        ruleValidate: {
          taxexeEmptype: [
            { required: true, message: this.$t('lang_baseManage.baseTaxexemption.taxexeEmptypeNameDis'), trigger: 'blur' },
          ],
          taxexeThreshold: [
            { required: true, message: this.$t('lang_baseManage.baseTaxexemption.taxexeThresholdDis'), trigger: 'blur' },
          ],
          taxexeSdate: [
            { required: true, type: 'date', message: this.$t('lang_baseManage.baseTaxexemption.taxexeSdateDis'), trigger: 'change' },
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
          _mt: 'baseTaxexemption.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.taxexeEmptype = res.data.content[0].taxexeEmptype
            t.formValidate.taxexeThreshold = res.data.content[0].taxexeThreshold
            t.formValidate.taxexeSdate = res.data.content[0].taxexeSdate
            t.formValidate.taxexeEdate = res.data.content[0].taxexeEdate
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
        if (data.taxexeSdate !== undefined) {
          data.taxexeSdate = new Date(data.taxexeSdate).format('yyyy-MM-dd')
        }
        if (data.taxexeEdate !== undefined) {
          data.taxexeEdate = data.taxexeEdate === '' ? '' : new Date(data.taxexeEdate).format('yyyy-MM-dd')
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
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'emptype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectEmpType = res.data.content[0].value[0].paramList
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
