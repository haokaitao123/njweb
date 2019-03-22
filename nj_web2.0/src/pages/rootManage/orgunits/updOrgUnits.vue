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
          <FormItem :label="$t('lang_organization.orgframe.unitCode1')" prop="unitCode">
            <Input v-model="formValidate.unitCode" :placeholder="$t('lang_organization.orgframe.unitCodeInp1')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_organization.orgframe.compFnameCnDis')" prop="unitFname">
            <Input v-model="formValidate.unitFname" :placeholder="$t('lang_organization.orgframe.compFnameCnDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_organization.orgframe.compSnameCnDis')" prop="unitSname">
            <Input v-model="formValidate.unitSname" :placeholder="$t('lang_organization.orgframe.compSnameCnDisInp')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1" >
          <FormItem :label="$t('lang_organization.orgframe.validdate')" prop="validdate">
            <DatePicker type="date" :placeholder="$t('lang_organization.orgframe.validdateInp')" :editable="false" v-model="formValidate.validdate" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
          <Col span="10" offset="1" >
          <FormItem :label="$t('lang_organization.orgframe.invdate')" prop="invdate">
            <DatePicker type="date" :placeholder="$t('lang_organization.orgframe.invdateInp')" :editable="false" v-model="formValidate.invdate" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_organization.orgframe.invreason')" prop="invreason">
            <Input v-model="formValidate.invreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_organization.orgframe.invreasonInp')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_organization.orgframe.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_organization.orgframe.commentInp')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <!--<Button type="ghost" @click="handleReset" style="margin-left: 8px">取消</Button>-->
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
          _mt: 'orgUnits.addOrModifyOrgUnits',
          unitCode: '',
          validdate: '',
          invdate: '',
          invreason: '',
          comment: '',
          funId: '1',
          logType: '',
        },
        ruleValidate: {
          unitCode: [
            { required: true, message: this.$t('lang_organization.orgframe.unitCodeInp1'), trigger: 'blur' },
          ],
          unitFname: [
            { required: true, message: this.$t('lang_organization.orgframe.compFnameCnDisInp'), trigger: 'blur' },
          ],
          unitSname: [
            { required: true, message: this.$t('lang_organization.orgframe.compSnameCnDisInp'), trigger: 'blur' },
          ],
          validdate: [
            { required: true, type: 'date', message: this.$t('lang_organization.orgframe.validdateInp'), trigger: 'change' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    components: {
    },
    updated() {

    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'orgUnits.selectById',
          id: id,
          funId: '1',
          logType: 'Id查询',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.unitCode = res.data.content[0].unitCode
            t.formValidate.unitFname = res.data.content[0].unitFname
            t.formValidate.unitSname = res.data.content[0].unitSname
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
        if (data.validdate !== undefined && data.validdate !== '') {
          data.validdate = new Date(data.validdate).format('yyyy-MM-dd')
        } else {
          data.validdate = ''
        }
        if (data.invdate !== undefined && data.invdate !== '') {
          data.invdate = new Date(data.invdate).format('yyyy-MM-dd')
        } else {
          data.invdate = ''
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
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
