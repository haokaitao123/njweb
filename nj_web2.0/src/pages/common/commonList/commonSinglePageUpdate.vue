<template>
  <div>
    <div class="cover">
      <div class="box">
        <div class="title">
          <div class="title-text">
            <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
            &nbsp;{{logType ? logType : 编辑表单 }}
          </div>
          <Button type="text" @click="close">
            <Icon type="close-round" size="16"></Icon>
          </Button>
        </div>

        <div class="content">
          <Spin v-show="loading" size="large" fix></Spin>
          <!--<renderd></renderd>-->
          <commonSingleForm
            v-if="isShow"
            :formData1="formData"
            :formlist="formlist"
            :tbName="tbName"
            :pklv="pklv"
            @close="close"
            :formParentfield="formParentfield"
            ref="commonSingleForm">
          </commonSingleForm>
        </div>
        <div class="footer">
          <Button type="ghost" @click="close" style="margin-right: 5px">{{$t('button.cal')}}</Button>
          <Button type="primary" @click="save">{{$t('button.sav')}}</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import commonSingleForm from '../commonCompanents/commonSingleForm'
  import { getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, findComponentUpward } from '../../../lib/util'
  import validCode from '../commonCompanents/validCode'

  export default {
    data() {
      return {
        isShow: false,  // 防止数据未加载完成就显示form页面
        formData: {},
        formlist: {},
        clmkvMap: {}, // 弹出框，{物理列名：字段中文名}
        popForm: {}, // 该步骤，所有表单，布局为弹出框的数据 key, value
        loading: true,
      }
    },
    props: {
      id: String,
      pklv: String, // 主表id
      formParentfield: String, // 主表字段名
      tbName: String,
      logType: String,
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
          logType: 'getListColumn１',
          pkValue: t.id,
          parentfield: t.pklv === '' || t.pklv === null || t.pklv === undefined ? 0 : t.pklv,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formData = res.data.content[0]
            t.formlist = t.getFormDataSubmit(res.data.content[0].columns)
            t.isShow = true
            t.loading = false
            /**
             * 收集弹出选择的 (key:value)(字段物理名, 字段值)
             */
            for (let j = 0; j < res.data.content[0].columns.length; j++) {
              if (res.data.content[0].columns[j].clmLayout == 13) {
                t.clmkvMap[res.data.content[0].columns[j].clmName] = res.data.content[0].columns[j].clmDname
              }
            }
            this.$store.commit('flowClmkMap/setClmkvMap', t.clmkvMap)
            t.clmkvMap = {} // 清空
            this.$store.commit('flowClmkMap/setPopForm', t.popForm)
            t.popForm = {} // 清空
          }
        }).catch((res) => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: res,
          })
        })
      },
            /*
    * 格式化数据
    * */
    getFormDataSubmit(data) {
      let columns = data // 字段
      let formData = {}
      let form = {}  // 表单
      let ruler = {}  // 校验规则
      let dis = {}
      let clmmap = {}
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].clmLayout === 20) {
          // 当数据类型为checkBox group时，需要数据类型为数组
          if (columns[i].clmValue !== '') {
            form[columns[i].clmName] = columns[i].clmValue.split(',')
          } else {
            form[columns[i].clmName] = []
          }
        } else {
          form[columns[i].clmName] = columns[i].clmValue
        }
        if (columns[i].clmName !== 'companyId') {
          clmmap[columns[i].clmName] = columns[i].clmDbName
        }
        if (columns[i].columnValid) {
          ruler[columns[i].clmName] = []
          for (let j = 0; j < columns[i].columnValid.length; j++) {
            ruler[columns[i].clmName].push({
              validator: (rule, value, callback) => {
              if (!validCode[rule.valid](form[rule.field])) {
                callback(new Error(rule.message))
              } else {
                callback()
              }
            },
              trigger: 'change',
              message: columns[i].clmDname + columns[i].columnValid[j].clmvPrompts,
              valid: columns[i].columnValid[j].clmvMod,
            })
          }
        }
        if (columns[i].clmDefDis === false) {
          // 默认是否显示
          delete form[columns[i].clmName]
        }
        if (columns[i].clmIsupdate === true) {
          dis[columns[i].clmName] = true
        } else {
          dis[columns[i].clmName] = false
        }
        // 弹出选择
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].clmLayout == 13) {
            this.popForm[columns[i].clmName] = columns[i].clmValue
          }
        }
      }
      form._mt = 'platAutoLayoutSave.addOrUpd'
      form.logType = '保存'
      formData.form = form
      formData.ruler = ruler
      formData.clmmap = clmmap
      formData.dis = dis
      return formData
    },
      close() {
        this.$emit('close')
        this.$emit('getData')
      },
      save() {
//        alert(this.tbName)
        this.$refs.commonSingleForm.saveForm()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  .cover .box{
    width: 940px;
  }
.content{
  max-height: 500px;
  overflow-y: auto;
}
  .footer{
    margin-top: 10px;
    padding: 0 30px;
    display: flex;
    margin-right: 40px;
    justify-content: flex-end;
  }
</style>
