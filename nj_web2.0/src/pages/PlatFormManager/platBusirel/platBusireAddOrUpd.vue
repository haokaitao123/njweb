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
          <FormItem :label="$t('lang_platBusirel.platBusirel.platSerConperson')" prop="platSerConperson">
            <Input v-model="formValidate.platSerConperson" :placeholder="$t('lang_platBusirel.platBusirel.p_platSerConperson')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_platBusirel.platBusirel.platSerTel')" prop="platSerTel">
            <Input v-model="formValidate.platSerTel" :placeholder="$t('lang_platBusirel.platBusirel.p_platSerTel')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_platBusirel.platBusirel.platSerEmail')" prop="platSerEmail">
            <Input v-model="formValidate.platSerEmail" :placeholder="$t('lang_platBusirel.platBusirel.p_platSerEmail')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_platBusirel.platBusirel.platSerTeam')" prop="platSerTeam">
            <Input v-model="formValidate.platSerTeam" :placeholder="$t('lang_platBusirel.platBusirel.p_platSerTeam')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_platBusirel.platBusirel.platSerLevelName')" prop="platSerLevel">
            <Select v-model="formValidate.platSerLevel" :placeholder="$t('lang_platBusirel.platBusirel.p_platSerLevel')">
              <Option :value="item.paramCode" v-for="(item,index) in servicelevel" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_platBusirel.platBusirel.platSerTime')" prop="platSerTime">
            <Input v-model="formValidate.platSerTime" :placeholder="$t('lang_platBusirel.platBusirel.p_platSerTime')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_platBusirel.platBusirel.platSerRange')" prop="platSerRange">
            <Input type="textarea" v-model="formValidate.platSerRange" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platBusirel.platBusirel.p_platSerRange')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_platBusirel.platBusirel.platSerComment')" prop="platSerComment">
            <Input v-model="formValidate.platSerComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platBusirel.platBusirel.p_platSerComment')"></Input>
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
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        servicelevel: [],
        formValidate: {
          _mt: 'platBusirel.addOrUpd',
          funId: '1',
          platSerConperson: '',
          platSerTel: '',
          platSerEmail: '',
          platSerTeam: '',
          platSerLevel: '',
          platSerRange: '',
          platSerTime: '',
          platSerComment: '',
        },
        ruleValidate: {
          platSerConperson: [
            { required: true, message: this.$t('lang_platBusirel.platBusirel.rule_platSerConperson'), trigger: 'blur' },
          ],
          platSerTel: [
            { required: true, message: this.$t('lang_platBusirel.platBusirel.rule_platSerTel'), trigger: 'blur' },
          ],
          platSerEmail: [
            { required: true, message: this.$t('lang_platBusirel.platBusirel.rule_platSerEmail'), trigger: 'blur' },
          ],
          platSerTeam: [
            { required: true, message: this.$t('lang_platBusirel.platBusirel.rule_platSerTeam'), trigger: 'blur' },
          ],
          platSerLevel: [
            { required: true, message: this.$t('lang_platBusirel.platBusirel.rule_platSerLevel'), trigger: 'change' },
          ],
          platSerTime: [
            { required: true, message: this.$t('lang_platBusirel.platBusirel.rule_platSerTime'), trigger: 'blur' },
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
          _mt: 'platBusirel.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.platSerConperson = res.data.content[0].platSerConperson
            t.formValidate.platSerTel = res.data.content[0].platSerTel
            t.formValidate.platSerEmail = res.data.content[0].platSerEmail
            t.formValidate.platSerTeam = res.data.content[0].platSerTeam
            t.formValidate.platSerLevel = res.data.content[0].platSerLevel
            t.formValidate.platSerRange = res.data.content[0].platSerRange
            t.formValidate.platSerTime = res.data.content[0].platSerTime
            t.formValidate.paysiComment = res.data.content[0].paysiComment
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
            getDataLevelUserLoginNew(data).then((res) => {
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
          typeCode: 'servicelevel',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.servicelevel = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
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
