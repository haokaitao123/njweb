<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_approval.wxcontract.upwxitle')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form ref="formValidate" :model="formValidate" label-position="right" :label-width="120">
          <i-col span="11">
            <FormItem :label="$t('lang_approval.wxcontract.apwxtoContact')" prop="apwxtoContactDis">
              <Input v-model="apwxtoContactDis" readonly placeholder=""></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_approval.wxcontract.apwxtoIsvalid')" prop="apwxtoIsvalid">
              <Select  v-model="formValidate.apwxtoIsvalid">
                <Option :value="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_approval.wxcontract.apwxtoCondition')" prop="apwxtoConditiondis">
              <span @dblclick="clearCondition">
                <Input v-model="formValidate.apwxtoConditiondis" readonly="readonly" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_approval.wxcontract.apwxtoConditionDis')" style="width: 85%;margin-right: 10px;"></Input>
              </span>
           		<Button type="primary" @click="generConditionNow(NaN,$t('lang_approval.wxcontract.conditionSetting'))">{{$t('lang_approval.wxcontract.conditionSetting')}}</Button>
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
        id: '',
        openCondition: false,
        apwxtoContactDis: '',
        yesno: [],
        apwxtoWx: '',
        apwxtoConttype: '',
        transmitName: '',
        transmitValue: '',
        formValidate: {
          _mt: 'platAprvwxto.addOrUpd',
          apwxtoContact: '',
          apwxtoCondition: '',
          apwxtoConditiondis: '',
          apwxtoIsvalid: '1',
          funId: '1',
        },
      }
    },
    props: {
      logType: '',
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
          _mt: 'platAprvwxto.getById',
          id: id,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.apwxtoContact = res.data.content[0].apwxtoContact
            t.formValidate.apwxtoIsvalid = res.data.content[0].apwxtoIsvalid
            t.apwxtoContactDis = res.data.content[0].apwxtoContactDis
            t.formValidate.apwxtoCondition = res.data.content[0].apwxtoCondition
            t.formValidate.apwxtoConditiondis = res.data.content[0].apwxtoConditiondis
            t.apwxtoConttype = res.data.content[0].apwxtoConttype
            t.apwxtoWx = res.data.content[0].apwxtoWx
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
        data.id = t.$store.state.platApproval.childId5
        data.apwxtoWx = t.apwxtoWx
        data.apwxtoConttype = t.apwxtoConttype
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$store.commit('platApproval/updateArrayChildTable5', res.data.content[0])
                t.clear()
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
          _mt: 'platAprvwxto.delByIds',
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
        t.formValidate.apwxtoContact = ''
        t.formValidate.apwxtoCondition = ''
        t.formValidate.apwxtoConditiondis = ''
        t.$refs.formValidate.resetFields()
      },
       generConditionNow(id) {
      	const t = this
      	if (t.formValidate.apwxtoConditiondis && t.formValidate.apwxtoCondition) {
      		t.transmitName = t.formValidate.apwxtoConditiondis
	      	t.transmitValue = t.formValidate.apwxtoCondition
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
      	t.formValidate.apwxtoCondition = value
        t.formValidate.apwxtoConditiondis = name
      },
      clearCondition() {
        const t = this
        t.formValidate.apwxtoCondition = ''
        t.formValidate.apwxtoConditiondis = ''
      },
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
