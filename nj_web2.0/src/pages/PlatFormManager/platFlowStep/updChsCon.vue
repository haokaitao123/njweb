<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form ref="formValidate" :model="formValidate" label-position="right" :label-width="100">
          <i-col span="11">
            <FormItem :label="$t('lang_flow.mailCon.flsmlrContact')" prop="flsmlrContact">
              <Input v-model="flsmlrContactDis" readonly placeholder=""></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_flow.mailCon.flsmlrIsvalid')" prop="flsmlrIsvalid">
              <RadioGroup  v-model="formValidate.flsmlrIsvalid">
                <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_flow.mailCon.flsmlrConditionDis')" prop="flsmlrConditionDis">
              <span @dblclick="clearCondition">
                <Input v-model="formValidate.flsmlrConditionDis" type="textarea" readonly="readonly" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.mailCon.p_flsmlrConditionDis')" style="width: 85%;margin-right: 10px;"></Input>
              </span>
              <Button type="primary" @click="generConditionNow(NaN,'条件设置')">{{$t('lang_flow.flowcommon.plat_condition')}}</Button>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    </div>
    <transition name="fade">
      <genrCondition v-show="openCondition"  @inputCondition="inputCondition"  @closeCondition="closeCondition"  ref="genrCondition"></genrCondition>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import genrCondition from './genrCondition'

  export default {
    data() {
      return {
      	openCondition: false,
        id: '',
        flsmlrContactDis: '',
        flsmlrIsvalidDis: '',
        yesno: [],
        flsmlrConttype: '',
        flsmlrMail: '',
        transmitName: '',
        transmitValue: '',
        formValidate: {
          _mt: 'platFlsmlTocc.addOrUpd',
          flsmlrContact: '',
          flsmlrCondition: '',
          flsmlrConditionDis: '',
          flsmlrIsvalid: '1',
          funId: '1',
        },
      }
    },
    props: {
      logType: String,
      conttype: '',
    },
    components: {
    	genrCondition,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      close() {
        this.clear()
        this.$emit('hideMsg')
      },
      getFormData(id) {
        const t = this
        t.id = id
        getDataLevelUserLogin({
          _mt: 'platFlsmlTocc.getById',
          id: id,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.flsmlrContact = res.data.content[0].flsmlrContact
            t.flsmlrContactDis = res.data.content[0].flsmlrContactDis
            t.formValidate.flsmlrCondition = res.data.content[0].flsmlrCondition
            t.formValidate.flsmlrConditionDis = res.data.content[0].flsmlrConditionDis
            t.flsmlrConttype = res.data.content[0].flsmlrConttype
            t.flsmlrMail = res.data.content[0].flsmlrMail
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = '修改'
        data.id = t.$store.state.flowStepData.childId5
        data.flsmlrType = t.conttype
        data.flsmlrConttype = t.flsmlrConttype
        data.flsmlrMail = t.flsmlrMail
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$store.commit('flowStepData/updateArrayChildTable5', res.data.content[0])
                t.close()
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
      },
      deletemsg() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platFlsmlTocc.delByIds',
          funId: '1',
          companyId: '1',
          logType: this.$t('button.del'),
          delIds: t.tableselected,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.getdata()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.yesno = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      clear() {
        const t = this
        t.formValidate.flsmlrCondition = ''
        t.formValidate.flsmlrConditionDis = ''
        t.$refs.formValidate.resetFields()
      },
       generConditionNow(id) {
      	const t = this
      	if (t.formValidate.flsmlrConditionDis && t.formValidate.flsmlrCondition) {
      		t.transmitName = t.formValidate.flsmlrConditionDis
	      	t.transmitValue = t.formValidate.flsmlrCondition
	      	t.$refs.genrCondition.getData(t.transmitName, t.transmitValue)
      	}
      	t.openCondition = true
      },
      closeCondition() {
      	const t = this
      	t.openCondition = false
      },
      inputCondition(name, value) {
      	const t = this
      	t.formValidate.flsmlrCondition = value
        t.formValidate.flsmlrConditionDis = name
      },
      clearCondition() {
        const t = this
        t.formValidate.flsmlrCondition = ''
        t.formValidate.flsmlrConditionDis = ''
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .box{
    height: 560px;
    overflow:hidden;
    .content{
      left: 20px;
      right: 20px;
      overflow-y: auto;
      position: absolute;
      height: 420px;
    }
  }
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
