<template>
  <div>
    <div class="cover">
      <div class="box">
        <div class="title">
          <div class="title-text">
            <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
            &nbsp;表单
          </div>
          <Button type="text" @click="close">
            <Icon type="close-round" size="16"></Icon>
          </Button>
        </div>
        <div class="content">
          <!--<renderd></renderd>-->
          <commonSingleForm
            v-if="isShow"
            :formData="formData"
            :tbName="tbName"
            ref="commonSingleForm">
          </commonSingleForm>
        </div>
        <Button type="primary" @click="save">{{$t('button.sav')}}</Button>
      </div>
    </div>
  </div>
</template>
<script>
  import commonSingleForm from '../commonCompanents/commonSingleForm'
  import { getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, findComponentUpward } from '../../../../lib/util'

  export default {
    data() {
      return {
        isShow: false,  // 防止数据未加载完成就显示form页面
        formData: {},
      }
    },
    props: {
      id: String,
      tbName: String,
    },
    mounted() {
      this.getColumn()
    },
    components: {
      commonSingleForm,
    },
    methods: {
      getColumn() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platAutoLayoutGetEdit.getEditColumn',
          logType: 'getListColumn２',
          pkValue: t.id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formData = res.data.content[0]
            t.isShow = true
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      close() {
        this.$emit('close')
      },
      save() {
//        alert(this.tbName)
        this.$refs.commonSingleForm.saveForm()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd";
  .cover .box{
    width: 940px;
  }
.content{
  max-height: 500px;
  overflow-y: auto;
}
</style>
