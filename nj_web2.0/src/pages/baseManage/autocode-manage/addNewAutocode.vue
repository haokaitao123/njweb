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
          <FormItem :label="$t('lang_baseManage.autocode.autoFlag')" prop="autoFlag">
            <Input v-model="formValidate.autoFlag" :placeholder="$t('lang_baseManage.autocode.autoFlagIns')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.autocode.autoName')" prop="autoName">
            <Input v-model="formValidate.autoName" :placeholder="$t('lang_baseManage.autocode.autoNameIns')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.autocode.autoPrefix')" prop="autoPrefix">
            <Input v-model="formValidate.autoPrefix" :placeholder="$t('lang_baseManage.autocode.autoPrefixIns')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.autocode.autoTimeformatName')" prop="autoTimeformat">
            <Select v-model="formValidate.autoTimeformat" :placeholder="$t('lang_baseManage.autocode.autoTimeformatIns')">
              <Option :value="item.paramCode" v-for="(item,index) in selectTimeType" key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.autocode.autoWater')" prop="autoWater">
            <Input v-model="formValidate.autoWater" :placeholder="$t('lang_baseManage.autocode.autoWaterIns')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.autocode.autoValidityName')" prop="autoValidity" :label-width="135">
            <RadioGroup v-model="formValidate.autoValidity" :placeholder="$t('lang_baseManage.autocode.autoValidityIns')">
              <Radio :label="item.paramCode" v-for="(item,index) in selectIsType" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.autocode.autoCode')" prop="autoCode">
            <Input v-model="formValidate.autoCode" :placeholder="$t('lang_baseManage.autocode.autoCodeIns')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_baseManage.autocode.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_baseManage.autocode.commentIns')"></Input>
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
        selectTimeType: [],
        selectIsType: [],
        formValidate: {
          _mt: 'baseAutocode.addOrUpd',
          funId: '1',
          autoFlag: '',
          autoName: '',
          autoPrefix: '',
          autoTimeformat: '',
          autoWater: '',
          autoValidity: '1',
          autoCode: '',
          comment: '',
        },
        ruleValidate: {
          autoFlag: [
            { required: true, message: this.$t('lang_baseManage.autocode.autoFlagIns'), trigger: 'blur' },
          ],
          autoName: [
            { required: true, message: this.$t('lang_baseManage.autocode.autoNameIns'), trigger: 'blur' },
          ],
          autoPrefix: [
            { required: true, message: this.$t('lang_baseManage.autocode.autoPrefixIns'), trigger: 'blur' },
          ],
          autoTimeformat: [
            { required: true, message: this.$t('lang_baseManage.autocode.autoTimeformatIns'), trigger: 'blur' },
          ],
          autoWater: [
            { required: true, message: this.$t('lang_baseManage.autocode.autoWaterIns'), trigger: 'blur' },
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
          _mt: 'baseAutocode.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.autoFlag = res.data.content[0].autoFlag
            t.formValidate.autoName = res.data.content[0].autoName
            t.formValidate.autoPrefix = res.data.content[0].autoPrefix
            t.formValidate.autoTimeformat = res.data.content[0].autoTimeformat
            t.formValidate.autoWater = res.data.content[0].autoWater
            t.formValidate.autoValidity = res.data.content[0].autoValidity
            t.formValidate.autoCode = res.data.content[0].autoCode
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
          typeCode: 'autodateformat,yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectTimeType = res.data.content[0].value[0].paramList
            t.selectIsType = res.data.content[0].value[1].paramList
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
