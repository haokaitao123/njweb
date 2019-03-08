<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_approval.smsList.title')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form :model="form" label-position="right" :rules="ruleValidate"  :label-width="100" ref="form">
          <i-col span="11">
            <FormItem :label="$t('lang_approval.smsList.aprvsmsOrder')" prop="aprvsmsOrder">
                <Input v-model="form.aprvsmsOrder" :placeholder="$t('lang_approval.smsList.aprvsmsOrderDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_approval.smsList.aprvsmsContent')" prop="aprvsmsContent">
              <Input v-model="form.aprvsmsContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_approval.smsList.aprvsmsContentDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_approval.smsList.aprvsmsSendstyle')" prop="aprvsmsSendstyle">
              <Select  v-model="form.aprvsmsSendstyle">
                <Option :value="item.paramCode" v-for="(item,index) in sendType" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_approval.smsList.aprvsmsIsvalid')" prop="aprvsmsIsvalid">
              <RadioGroup  v-model="form.aprvsmsIsvalid">
                <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
              <!--<Select  v-model="form.aprvsmsIsvalid">-->
                <!--<Option :value="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Option>-->
              <!--</Select>-->
            </FormItem>
          </i-col>
          <i-col span="23" v-show="form.aprvsmsIsvalid === '0'?true:false">
            <FormItem :label="$t('lang_approval.smsList.aprvsmsInvreason')" prop="aprvsmsInvreason">
              <Input v-model="form.aprvsmsInvreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_approval.smsList.aprvsmsInvreasonDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_approval.smsList.aprvsmsComment')" prop="aprvsmsComment">
              <Input v-model="form.aprvsmsComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_approval.smsList.aprvsmsComment')"></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        sendType: [],
        yesno: [],
        form: {
          _mt: 'platAprvsms.addOrUpd',
          aprvsmsOrder: '',
          aprvsmsContent: '',
          aprvsmsSendstyle: '',
          aprvsmsIsvalid: '1',
          aprvsms_invreason: '',
          aprvsmsComment: '',
          funId: '1',
          logType: '',
        },
        ruleValidate: {
          aprvsmsOrder: [
            { required: true, message: this.$t('lang_approval.smsList.aprvsmsOrderDis'), trigger: 'blur' },
          ],
          aprvsmsContent: [
            { required: true, message: this.$t('lang_approval.smsList.aprvsmsContentDis'), trigger: 'blur' },
          ],
          aprvsmsSendstyle: [
            { required: true, message: this.$t('lang_approval.smsList.aprvsmsSendstyleDis'), trigger: 'blur' },
          ],
          aprvsmsInvreason: [
            { required: true, message: this.$t('lang_approval.smsList.aprvsmsInvreasonDis'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getFormData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platAprvsms.getById',
          id: id,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.aprvsmsOrder = res.data.content[0].aprvsmsOrder
            t.form.aprvsmsContent = res.data.content[0].aprvsmsContent
            t.form.aprvsmsSendstyle = res.data.content[0].aprvsmsSendstyle
            t.form.aprvsmsIsvalid = res.data.content[0].aprvsmsIsvalid
            t.form.aprvsmsInvreason = res.data.content[0].aprvsmsInvreason
            t.form.aprvsmsComment = res.data.content[0].aprvsmsComment
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
          typeCode: 'yesno,approvesendmode',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.yesno = res.data.content[0].value[0].paramList
            t.sendType = res.data.content[0].value[1].paramList
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
        const data = deepCopy(t.form)
        data.aprvsmsAprvid = t.$store.state.platApproval.mainId
        if (!t.$store.state.platApproval.childId4) {
          data.logType = this.$t('button.add')
        } else {
          data.logType = this.$t('button.upd')
          data.id = t.$store.state.platApproval.childId4
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        if (t.form.aprvsmsIsvalid === '1') {
          delete t.ruleValidate.aprvsmsInvreason
        } else {
          t.ruleValidate.aprvsmsInvreason = [
            { required: true, message: this.$t('lang_approval.smsList.aprvsmsInvreasonDis'), trigger: 'blur' },
          ]
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.platApproval.childId4) {
                  t.$store.commit('platApproval/addNewArrayChildTable4', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$store.commit('platApproval/updateArrayChildTable4', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                }
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
      clear() {
        const t = this
        t.form.aprvsmsOrder = ''
        t.form.aprvsmsContent = ''
        t.form.aprvsmsSendstyle = ''
        t.form.aprvsmsIsvalid = ''
        t.form.aprvsmsInvreason = ''
        t.form.aprvsmsComment = ''
        t.$refs.form.resetFields()
      },
      close() {
        this.clear()
        this.$emit('hideMsg')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .box{
    height: 550px;
    overflow:hidden;
  .content{
    left: 20px;
    right: 20px;
    overflow-y: auto;
    position: absolute;
    height: 400px;
  }
  }
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
