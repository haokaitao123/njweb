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
          <FormItem :label="$t('lang_baseManage.baseSscoverage.sscCode')" prop="sscCode">
            <Input v-model="formValidate.sscCode" :placeholder="$t('lang_baseManage.baseSscoverage.sscCodeDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseSscoverage.sscTypeName')" prop="sscType">
            <Select v-model="formValidate.sscType" :placeholder="$t('lang_baseManage.baseSscoverage.sscTypeNameDis')">
              <Option :value="item.paramCode" v-for="(item,index) in selectsscType" key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseSscoverage.sscCname')" prop="sscCname">
            <Input v-model="formValidate.sscCname" :placeholder="$t('lang_baseManage.baseSscoverage.sscCnameDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseSscoverage.sscEname')" prop="sscEname">
            <Input v-model="formValidate.sscEname" :placeholder="$t('lang_baseManage.baseSscoverage.sscEnameDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_baseManage.baseSscoverage.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_baseManage.baseSscoverage.commentDis')"></Input>
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
        selectsscType: [],
        formValidate: {
          _mt: 'baseSscoverage.addOrUpd',
          funId: '1',
          sscCode: '',
          sscType: '',
          sscCname: '',
          sscEname: '',
          comment: '',
        },
        ruleValidate: {
          sscCode: [
            { required: true, message: this.$t('lang_baseManage.baseSscoverage.sscCodeDis'), trigger: 'blur' },
          ],
          sscType: [
            { required: true, message: this.$t('lang_baseManage.baseSscoverage.sscTypeNameDis'), trigger: 'blur' },
          ],
          sscCname: [
            { required: true, message: this.$t('lang_baseManage.baseSscoverage.sscCnameDis'), trigger: 'blur' },
          ],
          sscEname: [
            { required: true, message: this.$t('lang_baseManage.baseSscoverage.sscEnameDis'), trigger: 'blur' },
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
          _mt: 'baseSscoverage.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.sscCode = res.data.content[0].sscCode
            t.formValidate.sscType = res.data.content[0].sscType
            t.formValidate.sscCname = res.data.content[0].sscCname
            t.formValidate.sscEname = res.data.content[0].sscEname
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
          typeCode: 'benefittype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectsscType = res.data.content[0].value[0].paramList
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
