<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;
          {{$t('lang_repayApply.base.check1')}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_repayApply.base.isConfirm')" prop="isConfirm">
            <RadioGroup v-model="form.isConfirm">
              <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1" v-show="form.isConfirm == '0' ? true : false">
          <FormItem :label="$t('lang_repayApply.base.noreason')" prop="noreason">
            <Input v-model="form.noreason" type="textarea" :autosize="{minRows: 2,maxRows: 2}" :placeholder="$t('lang_repayApply.base.pnoreason')"></Input>
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
  import { getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  export default {
    data() {
      return {
        form: {
          isConfirm: '1',
          noreason: '',
        },
        radioYesOrNo: [],
        ruleValidate: {
          isConfirm: [
            { required: true, message: this.$t('lang_repayApply.base.yesconfirm'), trigger: 'blur' },
          ],
          noreason: [
            { required: true, message: this.$t('lang_repayApply.base.pnoreason'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      ids: String,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.radioYesOrNo = res.data.content[0].value[0].paramList
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
        if (t.form.isConfirm === '1') {
          delete this.ruleValidate.noreason
        } else {
          this.ruleValidate.noreason = [
            { required: true, message: this.$t('lang_repayApply.base.pnoreason'), trigger: 'blur' },
          ]
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLogin({
              _mt: 'sihfHfrepay.updConfirmByIds',
              funId: '1',
              logType: this.$t('button.del'),
              ids: t.ids,
              isConfirm: t.form.isConfirm,
              noreason: t.form.noreason,
            }).then((res) => {
              if (isSuccess(res, t)) {
                t.handleReset()
                t.$emit('resetTableselected')
                t.$emit('getData')
                t.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: this.$t('lang_repayApply.base.reminder'),
                })
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
      handleReset() {
        this.$emit('closeConfirm')
        this.$refs.form.resetFields()
        this.form.isConfirm = '1'
        this.form.noreason = ''
      },
    },
  }
</script>
<style lang="scss" scoped>
  /*@import "../../../../sass/updateAndAdd";*/
  .cover{
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box{
      position:relative;
      width: 800px;
      background-color: #fff;
      padding: 60px 10px 30px 10px;
      border-radius: 10px;
      .form{
        max-height: 800px;
        overflow-y: auto;
      }
      .title{
        display: flex;
        position: absolute;
        height: 40px;
        width: 100%;
        line-height: 40px;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        top: 0;
        border-bottom: 1px solid #efefef;
        left: 0;
        .title-text{
          font-weight: bold;
          font-size: 14px;
        }
      }
    }
  }

</style>

