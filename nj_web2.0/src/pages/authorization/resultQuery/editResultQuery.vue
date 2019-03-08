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
      <Form ref="formValidate" :model="formValidate"  :label-width="80">
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_role.que.platRasEmpName')" >
            <Input v-model="formValidate.platRasEmpName" disabled></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_role.que.platRasEmpNo')">
            <Input v-model="formValidate.platRcdSuvidDis"disabled ></Input>
          </FormItem>
          </Col>

        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_role.que.platRcdSuvidDis')">
            <Input v-model="formValidate.platRcdSuvidDis"disabled ></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_role.que.platRasQustidDis')">
            <Input v-model="formValidate.platRasQustidDis"disabled ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_role.que.platRasAnswercn')">
            <Input v-model="formValidate.platRasAnswercn" disabled></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_role.que.platRasAnsweren')">
            <Input v-model="formValidate.platRasAnsweren" disabled></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_role.que.platRasValue')" >
            <Input v-model="formValidate.platRasValue" disabled></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>

        </Row>
        <Row>
          <Col span="23">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLogin } from '../../../axios/axios'

  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        formValidate: {
          platRasEmpName: '',
          platRcdSuvidDis: '',
          platRasQustidDis: '',
          platRasAnsweren: '',
          platRasAnswercn: '',
          platRasValue: '',
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
          _mt: 'platRecordanswer.getById',
          id: id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.platRasEmpName = res.data.content[0].platRasEmpName
            t.formValidate.platRcdSuvidDis = res.data.content[0].platRcdSuvidDis
            t.formValidate.platRasQustidDis = res.data.content[0].platRasQustidDis
            t.formValidate.platRasAnsweren = res.data.content[0].platRasAnsweren
            t.formValidate.platRasAnswercn = res.data.content[0].platRasAnswercn
            t.formValidate.platRasValue = res.data.content[0].platRasValue
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
