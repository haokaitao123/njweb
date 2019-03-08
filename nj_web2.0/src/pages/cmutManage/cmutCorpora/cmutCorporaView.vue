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
          <Col span="10" offset="1" v-if="logType !== $t('button.add')">
          <FormItem :label="$t('lang_cmut.cmutCorpora.cmutCorpOrder')" prop="cmutCorpOrder">
            <Input v-model="formValidate.cmutCorpOrder" :placeholder="$t('lang_cmut.cmutCorpora.cmutCorpOrderIns')" disabled></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1" v-if="logType !== $t('button.add')">
          <FormItem :label="$t('lang_cmut.cmutCorpora.cmutCorpStateDis')" prop="cmutCorpState">
            <Select v-model="formValidate.cmutCorpState" :placeholder="$t('lang_cmut.cmutCorpora.cmutCorpStateIns')" disabled>
              <Option :value="item.paramCode" v-for="(item,index) in selectpubstatus" key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_cmut.cmutCorpora.cmutCorpQtype')" prop="cmutCorpQtype">
            <Input v-model="formValidate.cmutCorpQtype" :placeholder="$t('lang_cmut.cmutCorpora.cmutCorpQtypeIns')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_cmut.cmutCorpora.cmutCorpTitle')" prop="cmutCorpTitle">
            <Input v-model="formValidate.cmutCorpTitle" :placeholder="$t('lang_cmut.cmutCorpora.cmutCorpTitleIns')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_cmut.cmutCorpora.cmutCorpContent')" prop="cmutCorpContent">
            <Input v-model="formValidate.cmutCorpContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_cmut.cmutCorpora.cmutCorpContentIns')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_cmut.cmutCorpora.cmutCorpWxcontent')" prop="cmutCorpWxcontent">
            <Input v-model="formValidate.cmutCorpWxcontent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_cmut.cmutCorpora.cmutCorpWxcontentIns')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_cmut.cmutCorpora.comment')" prop="cmutCorpComment">
            <Input v-model="formValidate.cmutCorpComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_cmut.cmutCorpora.commentIns')"></Input>
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
        selectpubstatus: [],
        formValidate: {
          _mt: 'cmutCorpora.addOrUpd',
          funId: '1',
          cmutCorpState: '',
          cmutCorpContent: '',
          cmutCorpWxcontent: '',
          cmutCorpTitle: '',
          cmutCorpQtype: '',
          cmutCorpOrder: '',
          cmutCorpComment: '',
        },
        ruleValidate: {
          cmutCorpState: [
            { required: true, message: this.$t('lang_cmut.cmutCorpora.cmutCorpStateIns'), trigger: 'change' },
          ],
          cmutCorpContent: [
            { required: true, message: this.$t('lang_cmut.cmutCorpora.cmutCorpContentIns'), trigger: 'blur' },
          ],
          cmutCorpWxcontent: [
            { required: true, message: this.$t('lang_cmut.cmutCorpora.cmutCorpWxcontentIns'), trigger: 'blur' },
          ],
          cmutCorpTitle: [
            { required: true, message: this.$t('lang_cmut.cmutCorpora.cmutCorpTitleIns'), trigger: 'blur' },
          ],
          cmutCorpQtype: [
            { required: true, message: this.$t('lang_cmut.cmutCorpora.cmutCorpQtypeIns'), trigger: 'blur' },
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
          _mt: 'cmutCorpora.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.cmutCorpState = res.data.content[0].cmutCorpState
            t.formValidate.cmutCorpContent = res.data.content[0].cmutCorpContent
            t.formValidate.cmutCorpWxcontent = res.data.content[0].cmutCorpWxcontent
            t.formValidate.cmutCorpTitle = res.data.content[0].cmutCorpTitle
            t.formValidate.cmutCorpQtype = res.data.content[0].cmutCorpQtype
            t.formValidate.cmutCorpOrder = res.data.content[0].cmutCorpOrder
            t.formValidate.cmutCorpComment = res.data.content[0].cmutCorpComment
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
          typeCode: 'pubstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectpubstatus = res.data.content[0].value[0].paramList
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
