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
          <FormItem :label="$t('democode')" prop="orgDemocode">
            <Input v-model="formValidate.orgDemocode" :placeholder="$t('请输入democode')"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('demoname')" prop="orgDemoname">
            <Input v-model="formValidate.orgDemoname" :placeholder="$t('请输入demoname')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
            <FormItem :label="$t('lang_baseManage.baseCity.cityName')" prop="cityName">
              <Input v-model="formValidate.cityName" :placeholder="$t('lang_baseManage.baseCity.cityNameDis')"></Input>
            </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem :label="$t('练习下拉框')" prop="cityType">
              <Select v-model="formValidate.cityType" @on-change="typeChange"  :placeholder="$t('选择城市')">
                <Option :value="item.paramCode" v-for="(item,index) in selectCityType" key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

      </Form>
    </div>
  </div>
</template>
<script>
  /*？？？？*/
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        selectCityType: [],
        formValidate: {
          _mt: 'orgCostcenter.addOrUpd',
          funId: '1',
          orgDemocode: '',
          orgDemoname: '',
          cityType: ''
        },
        /*验证信息*/
        ruleValidate: {
          orgDemocode: [
            { required: true, message: '请输入democode', trigger: 'blur' },
          ],
          orgDemoname: [
            { required: true, message: '请输入demoname', trigger: 'blur' },
          ]
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
            t.formValidate.orgDemocode= res.data.content[0].orgDemocode
            t.formValidate.orgDemoname = res.data.content[0].orgDemoname
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'citytype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectCityType = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      typeChange(){

      },
      /**/
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
<!--样式-->
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
