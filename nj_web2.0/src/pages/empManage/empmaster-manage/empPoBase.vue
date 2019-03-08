<template>
  <div class="cover">
    <div class="box box1">
      <row>
        <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem :name="$store.state.user.funId">
              {{$t('lang_employee.empmaster.title1')}}
            </MenuItem>
            <MenuItem :name="item.id" v-for="(item, index) in childFun" :key="index">
              {{item.funLancodeDis}}
            </MenuItem>
          </Menu>
        </i-col>
        <i-col class="meau-right" span="19" style="max-height: 600px;overflow-y: auto;">
          <div class="title">
            <div class="title-text">
              <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>{{$t('button.upd')}}
            </div>
            <Button type="text" @click="handleReset">
              <Icon type="close-round" size="16"></Icon>
            </Button>
          </div>
          <div style="margin-top: 40px;padding: 10px;max-height: 550px;overflow-y: auto;">
            <mOption v-if="option" :pklv='pklv' :tableheight=430></mOption>
            <mContent v-if="content"
                      :formData1="formData"
                      :tbName="tbName"
                      :formlist="formlist"
                      ref="commonSingleForm"></mContent>
            <Button type="primary" style="margin-left: 84%" @click="save" v-if="content">{{$t('button.sav')}}</Button>
          </div>

        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import mOption from './../../common/commonList/commonSingleTable'
//  import mContent from './../../common/commonList/commonSinglePageList'
  import mContent from './../../common/commonCompanents/commonSingleForm'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

  export default {
    data() {
      return {
        active: this.$store.state.user.funId,
        option: false,
        dataForm: {},
        childFun: [],
        formData: {},
        formlist: {},
        tbName: '',
        content: false,
        id: '',
        idname: '',
        data: {
          _mt: 'sihfPolicy.getById',
          funId: '1',
        },
      }
    },
    components: {
       mOption,
       mContent,
    },
    props: {
      logType: String,
      index: Number,
      params: Object,
      pklv: String,
    },
    mounted() {
      this.getChildId()
      this.getColumn()
    },
    methods: {
      handleReset() {
//        this.clear()
        this.$store.commit('setChildFunId', '')
        this.$emit('closeUp')
      },
      getColumn() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platAutoLayoutGetEdit.getEditColumn',
          logType: 'getListColumn３',
          pkValue: t.pklv,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formData = res.data.content[0]
            t.tbName = res.data.content[0].tbName
            t.formlist = t.getFormDataSubmit(res.data.content[0].columns)
            t.content = true
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
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
      }
      form._mt='platAutoLayoutSave.addOrUpd'
      form.logType= this.$t('button.sav')
      formData.form = form
      formData.ruler = ruler
      formData.clmmap = clmmap
      formData.dis = dis
      return formData
    },
      changeMenu() {
        this.active = 'content'
      },
      getOptionData() {
        this.$refs.option.getdata()
      },
      save() {
//        alert(this.tbName)
        this.$refs.commonSingleForm.saveForm()
      },
      getChildId() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'sysFunctions.getChiSysFunctionsList',
          logType: this.$t('button.ser'),
        }).then(res => {
          if (isSuccess(res, t)) {
            t.childFun = res.data.content[0].value
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
//      getOption(logType) {
//        this.data.id = this.$store.state.empPo.mainId
//        this.data.logType = logType
//      },
//      getid(id, name) {
//        this.id = parseInt(id, 10)
//        this.idname = name
//      },
      pageTo(name) {
        const t = this
        t.option = false
        t.content = false
        t.active = name
        t.$store.commit('setChildFunId', name)
        if (t.$store.state.user.funId === t.$store.state.user.childFunId) {
          setTimeout(() => {
            t.content = true
          }, 100)
        } else {
          setTimeout(() => {
            t.option = true
          }, 100)
        }
//        this[name] = true
//        if (name === 'content') {
//          this.$refs.content.getdata()
//        }
      },
//      clear() {
//        this.option = true
//        this.content = false
//        this.id = NaN
//        this.active = 'option'
//        this.$refs.option.clear()
//      },
      update(data) {
        this.$emit('getData', data)
      },
      newdata(data) {
        this.$emit('getData', data)
      },
    },
  }
</script>
<style>
  .ivu-menu-vertical.ivu-menu-light:after{
    background-color: transparent;
  }
</style>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .header-box{
    display: flex;
    position: relative;
    justify-content: flex-end;
  }
  .cover .box{
    padding: 0px;
  }
  .box1{
    padding-left: 20px;
  }
  .cover .box .form{
    margin-top: 60px;
  }
  .meau-left{
    max-height: 550px;
    overflow-y: auto;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .meau-right{
  	max-height: 600px;
    overflow-y: auto;
    position: relative;
    border-left: 2px solid #efefef;
  }
  .header-cover{
    display: none;
    top: 0;
    right: 0;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 150px;
    height: 150px;
    background-color: rgba(0,0,0,.3);
  }
  .header-box:hover .header-cover{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header-box:hover {
    cursor: pointer;
  }
  .header{
    height: 150px;
    width: 150px;
    border-radius: 50%;
    overflow: hidden;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
