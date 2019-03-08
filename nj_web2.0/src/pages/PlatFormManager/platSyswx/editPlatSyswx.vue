<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="100">
        <i-col span="11">
          <FormItem :label="$t('lang_platform.syswx.syswxNo')" prop="syswxNo">
            <Input v-model="form.syswxNo" :placeholder="$t('lang_platform.syswx.syswxNoIns')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_platform.syswx.syswxTypeDis')" prop="syswxType">
            <Select  v-model="form.syswxType">
              <Option :value="item.paramCode" v-for="(item,index) in wxmsgtype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_platform.syswx.syswxTitle')" prop="syswxTitle">
            <Input v-model="form.syswxTitle" :placeholder="$t('lang_platform.syswx.syswxTitleIns')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_platform.syswx.syswxTo')" prop="syswxTo">
            <Input v-model="form.syswxTo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.syswx.syswxToIns')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_platform.syswx.syswxContent')" prop="syswxContent">
            <Input v-model="form.syswxContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.syswx.syswxContentIns')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_platform.syswx.syswxLink')" v-if="form.syswxType === '02textcard'" prop="syswxLink">
            <Input v-model="form.syswxLink" :placeholder="$t('lang_platform.syswx.syswxLinkIns')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_platform.syswx.syswxSendcondition')" prop="syswxSendcondition">
            <Input v-model="form.syswxSendcondition" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.syswx.syswxSendconditionIns')"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_platform.syswx.syswxIsvalid')" prop="syswxIsvalid">
            <RadioGroup v-model="form.syswxIsvalid" :placeholder="$t('lang_platform.syswx.syswxIsvalidIns')">
              <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_platform.syswx.syswxInvreason')" prop="syswxInvreason" v-if="form.syswxIsvalid === '0'">
            <Input v-model="form.syswxInvreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="a$t('lang_platform.syswx.syswxInvreasonIns')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_platform.syswx.syswxComment')" prop="syswxComment">
            <Input v-model="form.syswxComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.syswx.syswxCommentIns')"></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
    <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import validChenck from '../../../lib/pub_valid'

  export default {
    data() {
      const syswxNocheck = (rule, value, callbackFun) => {
        if (validChenck.val_number106(value)) {
          return callbackFun()
        }
        return callbackFun(new Error(rule.message))
      }
      return {
        form: {
          _mt: 'platSyswx.addOrUpd',
          funId: '1',
          syswxNo: '',
          syswxTo: '',
          syswxSendcondition: '',
          syswxSendconditiondis: '',
          syswxTitle: '',
          syswxContent: '',
          syswxIsvalid: '',
          syswxInvreason: '',
          syswxComment: '',
          syswxType: '',
          syswxLink: '',
        },
        wxmsgtype: [],
        radioYesOrNo: [],
        ruleValidate: {
          syswxNo: [
            { required: true, message: this.$t('lang_platform.syswx.syswxNoIns'), trigger: 'blur' },
            { validator: syswxNocheck, message: this.$t('lang_platform.syswx.syswxNoIns2'), trigger: 'change' },
          ],
          syswxContent: [
            { required: true, message: this.$t('lang_platform.syswx.syswxContentIns'), trigger: 'blur' },
          ],
          syswxTitle: [
            { required: true, message: this.$t('lang_platform.syswx.syswxTitleIns'), trigger: 'blur' },
          ],
          syswxIsvalid: [
            { required: true, message: this.$t('lang_platform.syswx.syswxIsvalidIns'), trigger: 'blur' },
          ],
          syswxTo: [
            { required: true, message: this.$t('lang_platform.syswx.syswxToIns'), trigger: 'blur' },
          ],
          syswxType: [
            { required: true, message: this.$t('lang_platform.syswx.syswxTypeDisIns'), trigger: 'change' },
          ],
          syswxLink: [
            { required: true, message: this.$t('lang_platform.syswx.syswxLinkIns'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getdata(params) {
        const t = this
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form.syswxType = res.data.content[0].syswxType
            t.form.syswxLink = res.data.content[0].syswxLink
            this.form.syswxNo = res.data.content[0].syswxNo
            this.form.syswxTo = res.data.content[0].syswxTo
            this.form.syswxSendcondition = res.data.content[0].syswxSendcondition
            this.form.syswxSendconditiondis = res.data.content[0].syswxSendconditiondis
            this.form.syswxIsvalid = res.data.content[0].syswxIsvalid
            this.form.syswxInvreason = res.data.content[0].syswxInvreason
            this.form.syswxTitle = res.data.content[0].syswxTitle
            this.form.syswxContent = res.data.content[0].syswxContent
            this.form.syswxComment = res.data.content[0].syswxComment
            t.$emit('getid', res.data.content[0].id, res.data.content[0].syswxContent,
              res.data.content[0].syswxTo, res.data.content[0].syswxSendcondition)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const data = deepCopy(t.form)
        data.logType = t.logType
        data.id = t.id
        if (data.syswxType !== '02textcard') {
          data.syswxTitle = ''
          data.syswxLink = ''
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('getid', res.data.content[0].id, res.data.content[0].syswxContent,
                  res.data.content[0].syswxTo, res.data.content[0].syswxSendcondition)
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$emit('newdata', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
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
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno,wxmsgtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.radioYesOrNo = res.data.content[0].value[0].paramList
            t.wxmsgtype = res.data.content[0].value[1].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      clear() {
        this.form.syswxNo = ''
        this.form.syswxTo = ''
        this.form.syswxType = ''
        this.form.syswxLink = ''
        this.form.syswxSendcondition = ''
        this.form.syswxSendconditiondis = ''
        this.form.syswxTitle = ''
        this.form.syswxContent = ''
        this.form.syswxIsvalid = ''
        this.form.syswxInvreason = ''
        this.form.syswxComment = ''
        this.$refs.form.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  /*@import "../../../../sass/updateAndAdd";*/
  .option-main{
    position: relative;
    height: 500px;
    .btn{
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>

