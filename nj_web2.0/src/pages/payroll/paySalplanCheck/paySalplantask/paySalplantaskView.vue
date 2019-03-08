<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.paySalplan.salpltkDate')" prop="salpltkDate">
            <DatePicker type="date" :placeholder="$t('lang_payroll.paySalplan.salpltkStringCheck')" :editable="false" v-model="formValidate.salpltkDate" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.paySalplan.salpltkTaskshort')" prop="salpltkTaskshort">
            <Input v-model="formValidate.salpltkTaskshort" :placeholder="$t('lang_payroll.paySalplan.salpltkTaskshortCheck')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_payroll.paySalplan.salpltkTaskname')" prop="salpltkTaskname">
            <Input v-model="formValidate.salpltkTaskname" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.paySalplan.salpltkTasknameCheck')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_payroll.paySalplan.salpltkTaskdesc')" prop="salpltkTaskdesc">
            <Input v-model="formValidate.salpltkTaskdesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.paySalplan.salpltkTaskdescCheck')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_payroll.paySalplan.person')">
            <Input disabled="" v-model="formValidate.personDis" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.paySalplan.salpltkIskeyDis')" prop="salpltkIskey">
            <RadioGroup v-model="formValidate.salpltkIskey" :placeholder="$t('lang_payroll.paySalplan.salpltkIskeyDisCheck')">
              <Radio :label="item.paramCode" v-for="(item,index) in selectYesNo" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.paySalplan.salpltkTime')" prop="salpltkTime">
            <TimePicker format="HH:mm"  v-model="formValidate.salpltkTime" :placeholder="$t('lang_payroll.paySalplan.salpltkTimeCheck')" style="width: 100%" :editable="false"></TimePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_payroll.paySalplan.salpltkComment')" prop="salpltkComment">
            <Input v-model="formValidate.salpltkComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.paySalplan.salpltkCommentCheck')"></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  export default {
    data() {
      return {
        selectYesNo: [],
        updateImg: false,
        formValidate: {
          salpltkDate: '',
          salpltkTaskshort: '',
          salpltkTaskname: '',
          salpltkTaskdesc: '',
          salpltkIskey: '',
          salpltkTime: '',
          salpltkTasktempid: '',
          salpltkPlanid: '',
          salpltkComment: '',
        },
        ruleValidate: {
          salpltkDate: [
            { required: true, type: 'date', message: this.$t('lang_payroll.paySalplan.salpltkStringCheck'), trigger: 'change' },
          ],
          salpltkTaskshort: [
            { required: true, message: this.$t('lang_payroll.paySalplan.salpltkTaskshortCheck'), trigger: 'blur' },
          ],
          salpltkTaskname: [
            { required: true, message: this.$t('lang_payroll.paySalplan.salpltkTasknameCheck'), trigger: 'blur' },
          ],
          salpltkIskey: [
            { required: true, message: this.$t('lang_payroll.paySalplan.salpltkIskeyDisCheck'), trigger: 'change' },
          ],
          salpltkTime: [
            { required: true, message: this.$t('lang_payroll.paySalplan.salpltkTimeCheck'), trigger: 'change' },
          ],
        },
        planId: '',
      }
    },
    components: {
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    updated() {
    },
    mounted() {
    },
    methods: {
      getPlanid(id, date) {
        const t = this
        t.planId = id
        t.formValidate.salpltkDate = new Date(date)
        t.getSelect()
      },
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'paySalplantask.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate = res.data.content[0]
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      updateimg() {
        this.updateImg = true
      },
      closeImg() {
        const t = this
        t.updateImg = false
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectYesNo = res.data.content[0].value[0].paramList
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
        const params = deepCopy(t.formValidate)
        if (params.salpltkDate !== undefined && params.salpltkDate !== '') {
          params.salpltkDate = new Date(params.salpltkDate).format('yyyy-MM-dd')
        }
        if (params.salpltkTasktempid === undefined || params.salpltkTasktempid === '') {
          params.salpltkTasktempid = '0'
        }
        params.salpltkPlanid = t.planId
        params._mt = 'paySalplantask.addOrUpd'
        params.logType = this.$t('button.add')
//        params.atskdfAtskid = t.id
        if (t.logType === this.$t('button.upd')) {
          params.logType = this.$t('button.upd')
          params.id = t.id
        }
        t.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(params).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$emit('getData', res.data.content[0])
                }
                if (t.logType === this.$t('button.upd')) {
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
      handleReset() {
        this.$emit('closeUp')
        this.formValidate = {}
        this.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd";
</style>
