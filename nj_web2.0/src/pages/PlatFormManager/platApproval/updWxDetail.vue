<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_approval.wxList.title')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form :model="form" label-position="right" :rules="ruleValidate"  :label-width="120" ref="form">
          <i-col span="11">
            <FormItem :label="$t('lang_approval.wxList.aprvwxOrder')" prop="aprvwxOrder">
                <Input v-model="form.aprvwxOrder" :placeholder="$t('lang_approval.wxList.aprvwxOrderDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_approval.wxList.aprvwxType')" prop="aprvwxType">
              <Select  v-model="form.aprvwxType">
                <Option :value="item.paramCode" v-for="(item,index) in wxmsgtype" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_approval.wxList.aprvwxTitle')" v-if="form.aprvwxType === '02textcard'" prop="aprvwxTitle">
              <Input v-model="form.aprvwxTitle" :placeholder="$t('lang_approval.wxList.aprvwxTitleDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_approval.wxList.aprvwxContent')" prop="aprvwxContent">
              <Input v-model="form.aprvwxContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_approval.wxList.aprvwxContentDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_approval.wxList.aprvwxLink')" v-if="form.aprvwxType === '02textcard'" prop="aprvwxLink">
              <Input v-model="form.aprvwxLink" :placeholder="$t('lang_approval.wxList.aprvwxLinkDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_approval.wxList.aprvwxSendstyle')" prop="aprvwxSendstyle">
              <Select  v-model="form.aprvwxSendstyle">
                <Option :value="item.paramCode" v-for="(item,index) in sendType" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_approval.wxList.aprvwxIsvalid')" prop="aprvwxIsvalid">
              <RadioGroup  v-model="form.aprvwxIsvalid">
                <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
              <!--<Select  v-model="form.aprvwxIsvalid">-->
                <!--<Option :value="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Option>-->
              <!--</Select>-->
            </FormItem>
          </i-col>
          <i-col span="23" v-show="form.aprvwxIsvalid === '0'?true:false">
            <FormItem :label="$t('lang_approval.wxList.aprvwxInvreason')" prop="aprvwxInvreason">
              <Input v-model="form.aprvwxInvreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_approval.wxList.aprvwxInvreasonDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_approval.wxList.aprvwxComment')" prop="aprvwxComment">
              <Input v-model="form.aprvwxComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_approval.wxList.aprvwxCommentDis')"></Input>
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
        wxmsgtype: [],
        form: {
          _mt: 'platAprvwx.addOrUpd',
          aprvwxOrder: '',
          aprvwxContent: '',
          aprvwxSendstyle: '',
          aprvwxIsvalid: '1',
          aprvwxType: '',
          aprvwxTitle: '',
          aprvwxLink: '',
          aprvwxInvreason: '',
          aprvwxComment: '',
          funId: '1',
          logType: '',
        },
        ruleValidate: {
          aprvwxOrder: [
            { required: true, message: this.$t('lang_approval.wxList.aprvwxOrderDis'), trigger: 'blur' },
          ],
          aprvwxContent: [
            { required: true, message: this.$t('lang_approval.wxList.aprvwxContentDis'), trigger: 'blur' },
          ],
          aprvwxSendstyle: [
            { required: true, message: this.$t('lang_approval.wxList.aprvwxSendstyleDis'), trigger: 'blur' },
          ],
          aprvwxInvreason: [
            { required: true, message: this.$t('lang_approval.wxList.aprvwxInvreasonDis'), trigger: 'blur' },
          ],
          aprvwxType: [
            { required: true, message: this.$t('lang_approval.wxList.aprvwxTypeDis'), trigger: 'change' },
          ],
          aprvwxTitle: [
            { required: true, message: this.$t('lang_approval.wxList.aprvwxTitleDis'), trigger: 'blur' },
          ],
          aprvwxLink: [
            { required: true, message: this.$t('lang_approval.wxList.aprvwxLinkDis'), trigger: 'blur' },
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
          _mt: 'platAprvwx.getById',
          id: id,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.aprvwxType = res.data.content[0].aprvwxType
            t.form.aprvwxTitle = res.data.content[0].aprvwxTitle
            t.form.aprvwxLink = res.data.content[0].aprvwxLink
            t.form.aprvwxOrder = res.data.content[0].aprvwxOrder
            t.form.aprvwxContent = res.data.content[0].aprvwxContent
            t.form.aprvwxSendstyle = res.data.content[0].aprvwxSendstyle
            t.form.aprvwxIsvalid = res.data.content[0].aprvwxIsvalid
            t.form.aprvwxInvreason = res.data.content[0].aprvwxInvreason
            t.form.aprvwxComment = res.data.content[0].aprvwxComment
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
          typeCode: 'yesno,approvesendmode,wxmsgtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.yesno = res.data.content[0].value[0].paramList
            t.sendType = res.data.content[0].value[1].paramList
            t.wxmsgtype = res.data.content[0].value[2].paramList
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
        data.aprvwxAprvid = t.$store.state.platApproval.mainId
        if (!t.$store.state.platApproval.childId4) {
          data.logType = this.$t('button.add')
        } else {
          data.logType = this.$t('button.upd')
          data.id = t.$store.state.platApproval.childId4
        }
        if (data.aprvwxType !== '02textcard') {
          data.aprvwxTitle = ''
          data.aprvwxLink = ''
        }
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
        if (t.form.aprvwxIsvalid === '1') {
          delete t.ruleValidate.aprvwxInvreason
        } else {
          t.ruleValidate.aprvwxInvreason = [
            { required: true, message: this.$t('lang_approval.wxList.aprvwxInvreasonDis'), trigger: 'blur' },
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
        t.form.aprvwxOrder = ''
        t.form.aprvwxContent = ''
        t.form.aprvwxSendstyle = ''
        t.form.aprvwxType = ''
        t.form.aprvwxTitle = ''
        t.form.aprvwxLink = ''
        t.form.aprvwxIsvalid = ''
        t.form.aprvwxInvreason = ''
        t.form.aprvwxComment = ''
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
