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
          <FormItem :label="$t('lang_baseManage.baseMapping.mapTypeDis')" prop="mapType" :placeholder="$t('lang_baseManage.baseMapping.mapTypeIns')" >
            <Select  v-model="formValidate.mapType">
              <Option :value="item.paramCode" v-for="(item,index) in mappingType" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem label="Mapping code1" prop="mapCode1">
            <Input v-model="formValidate.mapCode1" :placeholder="$t('lang_baseManage.baseMapping.mapCode1Ins')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem label="Mapping code1 desc" prop="mapCodedesc1">
            <Input v-model="formValidate.mapCodedesc1" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_baseManage.baseMapping.mapCodedesc1Ins')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem label="Mapping code2" prop="mapCode2">
            <Input v-model="formValidate.mapCode2" :placeholder="$t('lang_baseManage.baseMapping.mapCode2Ins')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem label="Mapping code2 desc" prop="mapCodedesc2">
            <Input v-model="formValidate.mapCodedesc2" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="$t('lang_baseManage.baseMapping.mapCodedesc2Ins')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_baseManage.baseMapping.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_baseManage.baseMapping.commentIns')"></Input>
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
        mappingType: '',
        formValidate: {
          _mt: 'baseMapping.addOrModifyLang',
          funId: '1',
          companyId: '1',
          mapType: '',
          mapCode1: '',
          mapCodedesc1: '',
          mapCode2: '',
          mapCodedesc2: '',
          comment: '',
        },
        params: {
          _mt: 'baseMapping.selectById',
          sort: 'id',
          order: 'desc',
          rows: '10',
          page: '1',
        },
        ruleValidate: {
          mapType: [
            { required: true, message: this.$t('lang_baseManage.baseMapping.mapTypeIns'), trigger: 'blur' },
          ],
          mapCode1: [
            { required: true, message: this.$t('lang_baseManage.baseMapping.mapCode1Ins'), trigger: 'blur' },
          ],
          mapCode2: [
            { required: true, message: this.$t('lang_baseManage.baseMapping.mapCode2Ins'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {},
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    created() {
      this.getSelect()
    },
    updated() {

    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseMapping.selectById',
          id: id,
          funId: '1',
          logType: 'Id查询',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.mapType = res.data.content[0].mapType
            t.formValidate.mapCode1 = res.data.content[0].mapCode1
            t.formValidate.mapCodedesc1 = res.data.content[0].mapCodedesc1
            t.formValidate.mapCode2 = res.data.content[0].mapCode2
            t.formValidate.mapCodedesc2 = res.data.content[0].mapCodedesc2
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
          typeCode: 'mappingtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.mappingType = res.data.content[0].value[0].paramList
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
      },
    },
    watch: {

    },
  }
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";

</style>
