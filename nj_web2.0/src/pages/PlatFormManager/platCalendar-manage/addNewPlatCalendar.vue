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
          <FormItem :label="$t('lang_platform.platCalendar.calendarDate')" prop="calendarDate">
            <Input v-model="formValidate.calendarDate" :readonly="true"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_platform.platCalendar.calendarLegaltypeName')" prop="valid">
            <Select v-model="formValidate.calendarLegaltype" :placeholder="$t('lang_platform.platCalendar.calendarLegaltypeNameDis')">
              <Option :value="item.paramCode" v-for="(item,lawIndex) in selectDateType" :key="lawIndex">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_platform.platCalendar.calendarComptypeName')" prop="valid">
            <Select v-model="formValidate.calendarComptype" :placeholder="$t('lang_platform.platCalendar.calendarComptypeNameDis')">
              <Option :value="item.paramCode" v-for="(item,comIndex) in selectDateType" :key="comIndex">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_platform.platCalendar.calendarDesc')" prop="calendarDesc">
            <Input v-model="formValidate.calendarDesc" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_platform.platCalendar.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.platCalendar.commentDis')"></Input>
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
        selectDateType: [],
        formValidate: {
          _mt: 'platCalendar.addOrUpd',
          funId: '1',
          calendarLegaltype: '',
          calendarComptype: '',
          calendarDate: '',
          calendarDesc: '',
          comment: '',
        },
        ruleValidate: {
          calendarLegaltype: [
            { required: true, message: this.$t('lang_platform.platCalendar.calendarLegaltypeName'), trigger: 'blur' },
          ],
          calendarComptype: [
            { required: true, message: this.$t('lang_platform.platCalendar.calendarComptypeName'), trigger: 'blur' },
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
          _mt: 'platCalendar.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.calendarDate = res.data.content[0].calendarDate
            t.formValidate.calendarLegaltype = res.data.content[0].calendarLegaltype
            t.formValidate.calendarComptype = res.data.content[0].calendarComptype
            t.formValidate.calendarDesc = res.data.content[0].calendarDesc
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
          typeCode: 'datetype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectDateType = res.data.content[0].value[0].paramList
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
