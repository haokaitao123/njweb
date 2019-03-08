<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_sihfPolicy.sihfBenefitadd.sibaSberror')}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_sihfPolicy.sihfBenefitadd.sibaSberror')" prop="sibaSberror">
            <Input v-model="form.sibaSberror" type="textarea" :autosize="{minRows: 2,maxRows: 2}" :placeholder="$t('lang_sihfPolicy.sihfBenefitadd.sibaSberrorDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
              <Button type="primary" @click="handleSubmit">{{$t('button.subm')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  export default {
    data() {
      return {
        form: {
          sibaSberror: '',
        },
        ruleValidate: {
          sibaSberror: [
            { required: true, message: this.$t('lang_sihfPolicy.sihfBenefitadd.sibaSberrorDis'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      data: Object,
    },
    methods: {
      handleSubmit() {
        const t = this
        t.data._mt = 'sihfBenefitadd.confirm'
        t.data.sibaStatus = '40fail'
        t.data.sibaSberror = this.form.sibaSberror
        this.$refs.form.validate((valid) => {
          if (valid) {
            t.$Modal.confirm({
              title: this.$t('reminder.remind'),
              content: this.$t('lang_repayApply.base.psirpSberrorq'),
              onOk: () => {
                getDataLevelUserLoginNew(t.data).then((res) => {
                  if (isSuccess(res, t)) {
                    t.$Modal.success({
                      title: this.$t('reminder.suc'),
                      content: this.$t('reminder.submitsuccess'),
                    })
                    this.$emit('getData')
                  }
                }).catch(() => {
                  t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                  })
                })
              },
              onCancel: () => {},
            })
          }
        })
      },
      handleReset() {
        this.$emit('closeUp01')
        this.$refs.form.resetFields()
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

