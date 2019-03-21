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
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_organization.orgcostcenter.costCode')" prop="costCode">
            <Input v-model="formValidate.costCode" :placeholder="$t('lang_organization.orgcostcenter.costCodeDis')"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_organization.orgcostcenter.cname')" prop="costName">
            <Input v-model="formValidate.costName" :placeholder="$t('lang_organization.orgcostcenter.cnameDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_organization.orgcostcenter.validdate')" prop="validdate">
            <DatePicker type="date" :placeholder="$t('lang_organization.orgcostcenter.validdateDis')" :editable="false" v-model="formValidate.validdate" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_organization.orgcostcenter.invdate')" prop="invdate">
            <DatePicker type="date" :placeholder="$t('lang_organization.orgcostcenter.invdateDis')" :editable="false" v-model="formValidate.invdate" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_organization.orgcostcenter.invreason')" prop="invreason">
            <Input v-model="formValidate.invreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_organization.orgcostcenter.invreasonDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_organization.orgcostcenter.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_organization.orgcostcenter.commentDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
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
          _mt: 'orgCostcenter.addOrUpd',
          funId: '1',
          costCode: '',
          costName: '',
          validdate: '',
          invdate: '',
          invreason: '',
          comment: '',
        },
        ruleValidate: {
          costCode: [
            { required: true, message: this.$t('lang_organization.orgcostcenter.costCodeDis'), trigger: 'blur' },
          ],
          costName: [
            { required: true, message: this.$t('lang_organization.orgcostcenter.cnameDis'), trigger: 'blur' },
          ],
          validdate: [
            { required: true, type: 'date', message: this.$t('lang_organization.orgcostcenter.validdateDis'), trigger: 'change' },
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
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'orgCostcenter.getById',
          funId: 1,
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.costCode = res.data.content[0].costCode
            t.formValidate.costName = res.data.content[0].costName
            t.formValidate.validdate = res.data.content[0].validdate
            t.formValidate.invdate = res.data.content[0].invdate
            t.formValidate.invreason = res.data.content[0].invreason
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
        if (data.validdate !== undefined) {
          data.validdate = new Date(data.validdate).format('yyyy-MM-dd')
        }
        if (data.invdate !== undefined) {
          data.invdate = data.invdate === '' ? null : new Date(data.invdate).format('yyyy-MM-dd')
        }
        console.log(data.invdate)
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
