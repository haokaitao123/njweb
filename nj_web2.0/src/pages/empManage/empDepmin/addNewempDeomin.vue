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
          <FormItem :label="$t('lang_baseManage.eddyManager.managerName')" prop="managerName">
            <Input v-model="formValidate.managerName" :placeholder="$t('lang_baseManage.eddyManager.managerName')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.eddyManager.managerPart')" prop="managerPart">
            <Input v-model="formValidate.managerPart" :placeholder="$t('lang_baseManage.eddyManager.managerPart')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.eddyManager.managerSdate')" prop="managerSdate">
            <Input v-model="formValidate.managerSdate" :placeholder="$t('lang_baseManage.eddyManager.managerSdate')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.eddyManager.managerSex')" prop="managerSex">
            <Input v-model="formValidate.managerSex" :placeholder="$t('lang_baseManage.eddyManager.managerSex')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.eddyManager.managerAge')" prop="managerAge">
            <Input v-model="formValidate.managerAge" :placeholder="$t('lang_baseManage.eddyManager.managerAge')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_baseManage.eddyManager.managerComment')" prop="managerComment">
            <Input v-model="formValidate.managerComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_baseManage.eddyManager.managerComment')"></Input>
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
        formValidate: {
          _mt: 'managerInfoAgwService.addOrUpd',
          funId: '1',
          managerName: '',
          managerPart: '',
          managerSdate: '',
          managerSex: '',
          managerAge: '',
          managerComment: '',
        },
        ruleValidate: {
          noticePublish: [
            {
              required: true,
              type: "date",
              message: "请选择生效日期",
              trigger: "change"
            }
          ]
        }
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    updated() {

    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'managerInfoAgwService.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.managerName = res.data.content[0].managerName
            t.formValidate.managerPart = res.data.content[0].managerPart
            t.formValidate.managerSdate = res.data.content[0].managerSdate
            t.formValidate.managerSex = res.data.content[0].managerSex
            t.formValidate.managerAge = res.data.content[0].managerAge
            t.formValidate.managerComment = res.data.content[0].managerComment
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
      handleReset() {
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
