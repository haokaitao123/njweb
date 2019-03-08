<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="120">
        <i-col span="11">
        <FormItem :label="$t('lang_platdoc.platMail.sysmailNo')"  prop="sysmailNo">
          <Input v-model="form.sysmailNo" :placeholder="$t('lang_platdoc.platMail.sysmailNoDis')" ></Input>
        </FormItem>
      </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_platdoc.platMail.sysmailName')" prop="sysmailName">
            <Input v-model="form.sysmailName" :placeholder="$t('lang_platdoc.platMail.sysmailNameDis')" ></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_platdoc.platMail.sysmailObject')" prop="sysmailObject">
            <Input v-model="form.sysmailObject" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platdoc.platMail.sysmailObjectDis')"></Input>
          </FormItem>
        </i-col>

        <i-col span="11">
          <FormItem :label="$t('lang_platdoc.platMail.sysmailTo')" prop="sysmailTo">
            <Input v-model="form.sysmailTo" :placeholder="$t('lang_platdoc.platMail.sysmailToDis')" ></Input>
          </FormItem>
        </i-col>
      </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_platdoc.platMail.sysmailCc')" prop="sysmailCc">
            <Input v-model="form.sysmailCc" :placeholder="$t('lang_platdoc.platMail.sysmailCcDis')" ></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_platdoc.platMail.sysmailContent')" prop="sysmailContent">
            <div id="editor"></div>
            <!--<Input v-model="form.sysmailContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="请输入内容..."></Input>-->
          </FormItem>
        </i-col>

        <i-col span="11" >
          <FormItem :label="$t('lang_platdoc.platMail.sysmailSendcondition')" prop="sysmailSendcondition">
            <Input v-model="form.sysmailSendcondition" :placeholder="$t('lang_platdoc.platMail.sysmailSendconditionDis')" ></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_platdoc.platMail.sysmailIsencrypt')" prop="sysmailIsencrypt" :label-width="135">
            <RadioGroup v-model="form.sysmailIsencrypt" :placeholder="$t('lang_platdoc.platMail.sysmailIsencryptDis')">
              <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_platdoc.platMail.sysmailFlow')" prop="sysmailFlow">
            <span @dblclick="dbClear">
              <Input v-model="sysmailFlowDis" icon="search" :readonly="true" :placeholder="$t('lang_platdoc.platMail.sysmailFlowDis')" @on-click="getFlowId"/>
            </span>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('lang_platdoc.platMail.sysmailFlowstep')" prop="sysmailFlowstep">
            <span @dblclick="dbClear2">
            <Input v-model="sysmailFlowstepDis" icon="search" :readonly="true" :placeholder="$t('lang_platdoc.platMail.sysmailFlowstepDis')" @on-click="getFlowstepId"/>
              </span>
            <!--<Input v-model="form.sysmailFlowstep" :placeholder="请输入收件人" ></Input>-->
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('lang_platdoc.platMail.sysmailIsvalid')" prop="sysmailIsvalid">
            <RadioGroup v-model="form.sysmailIsvalid" :placeholder="$t('lang_platdoc.platMail.sysmailIsvalidDis')">
              <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
        <i-col span="23">
          <FormItem :label="$t('lang_platdoc.platMail.sysmailInvreason')" prop="sysmailInvreason">
            <Input v-model="form.sysmailInvreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platdoc.platMail.sysmailInvreasonDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="23">
        <FormItem :label="$t('lang_platdoc.platMail.sysmailComment')" prop="sysmailComment">
          <Input v-model="form.sysmailComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platdoc.platMail.sysmailCommentDis')"></Input>
        </FormItem>
        </i-col>
      </Form>
    </Row>
    <transition name="fade">
      <searchTable v-show="openPick" @closeUp="close" @changeinput="changeinput" ref="searchTable"></searchTable>
    </transition>
    <transition name="fade">
      <searchTable2 v-show="openPick2" :flstepFlowCop="flstepFlowCop"  @closeUp="close2" @changeinput="changeinput2" ref="searchTable2"></searchTable2>
    </transition>
    <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
  </div>
</template>
<script>
  import E from 'wangeditor'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchTable from '../../../components/searchTable/searchPubStep'
  import searchTable2 from '../../../components/searchTable/searchPubFlowStep'
  import validChenck from '../../../lib/pub_valid'

  let editor = new E('#editor')
  editor.customConfig.zIndex = 100
  editor.customConfig.menus = [
    'head',  // 标题
    'bold',  // 粗体
    'fontSize',  // 字号
    'fontName',  // 字体
    'italic',  // 斜体
    'underline',  // 下划线
    'strikeThrough',  // 删除线
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色
    'link',  // 插入链接
    'list',  // 列表
    'justify',  // 对齐方式
    'table',  // 表格
    'code',  // 插入代码
    'undo',  // 撤销
    'redo',  // 重复
  ]
  export default {
    data() {
      const sysmailNocheck = (rule, value, callbackFun) => {
        if (validChenck.val_number106(value)) {
          return callbackFun()
        }
        return callbackFun(new Error(rule.message))
      }
      return {
        openPick2: false,
        openPick: false,
        form: {
          _mt: 'platSysmail.addOrUpd',
          sysmailNo: '',
          sysmailName: '',
          sysmailObject: '',
          sysmailTo: '',
          sysmailCc: '',
          sysmailContent: '',
          sysmailSendcondition: '',
          sysmailSendconditiondis: '',
          sysmailIsencrypt: '0',
          sysmailFlow: '',
          sysmailFlowstep: '',
          sysmailIsvalid: '1',
          sysmailInvreason: '',
          sysmailComment: '',
        },
        flstepFlowCop: '',
        sysmailFlowDis: '',
        sysmailFlowstepDis: '',
        radioYesOrNo: [],
        tifymode: [],
        showPhone: true,
        offsetVal: 0,
        ruleValidate: {
          sysmailNo: [
            { required: true, message: this.$t('lang_platdoc.platMail.sysmailNoDis'), trigger: 'blur' },
            { validator: sysmailNocheck, message: this.$t('lang_platdoc.platMail.syssmsNocheck'), trigger: 'change' },
          ],
          sysmailName: [
            { required: true, message: this.$t('lang_platdoc.platMail.sysmailNameDis'), trigger: 'blur' },
          ],
          sysmailObject: [
            { required: true, message: this.$t('lang_platdoc.platMail.sysmailObjectDis'), trigger: 'blur' },
          ],
          sysmailTo: [
            { required: true, message: this.$t('lang_platdoc.platMail.sysmailToDis'), trigger: 'blur' },
          ],
          sysmailCc: [
            { required: true, message: this.$t('lang_platdoc.platMail.sysmailCcDis'), trigger: 'blur' },
          ],
          sysmailContent: [
            { required: true, message: this.$t('lang_platdoc.platMail.sysmailContentDis'), trigger: 'blur' },
          ],
          sysmailFlow: [
            { required: true, message: this.$t('lang_platdoc.platMail.sysmailFlowDis'), trigger: 'blur' },
          ],
          sysmailFlowstep: [
            { required: true, message: this.$t('lang_platdoc.platMail.sysmailFlowstepDis'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    components: {
      searchTable,
      searchTable2,
    },
    mounted() {
      editor.create()
      this.getSelect()
    },
    methods: {
      getdata() {
        const t = this
        const params = {
          _mt: 'platSysmail.getById',
          id: t.$store.state.platSysMailJS.mainId,
          logType: '根据id查询',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.form.sysmailNo = res.data.content[0].sysmailNo
            this.form.sysmailName = res.data.content[0].sysmailName
            this.form.sysmailObject = res.data.content[0].sysmailObject
            this.form.sysmailTo = res.data.content[0].sysmailTo
            this.form.sysmailCc = res.data.content[0].sysmailCc
            this.form.sysmailContent = editor.txt.html(res.data.content[0].sysmailContent)
            this.form.sysmailSendcondition = res.data.content[0].sysmailSendcondition
            this.form.sysmailSendconditiondis = res.data.content[0].sysmailSendconditiondis
            this.form.sysmailIsencrypt = res.data.content[0].sysmailIsencrypt
            this.form.sysmailFlow = res.data.content[0].sysmailFlow
            this.flstepFlowCop = res.data.content[0].sysmailFlow
            this.form.sysmailFlowstep = res.data.content[0].sysmailFlowstep
            this.form.sysmailIsvalid = res.data.content[0].sysmailIsvalid
            this.form.sysmailInvreason = res.data.content[0].sysmailInvreason
            this.form.sysmailComment = res.data.content[0].sysmailComment
            this.sysmailFlowDis = res.data.content[0].sysmailFlowDis
            this.sysmailFlowstepDis = res.data.content[0].sysmailFlowstepDis
            this.$store.commit('platSysMailJS/setFlowId', res.data.content[0].sysmailFlow)
            this.$store.commit('platSysMailJS/setFlowstepId', res.data.content[0].sysmailFlowstep)
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
        t.form.sysmailContent = editor.txt.html()
        const data = deepCopy(t.form)
        if (t.$store.state.platSysMailJS.mainId) {
          data.id = t.$store.state.platSysMailJS.mainId
        }
        data.logType = this.$t('button.add')
        this.$refs.form.validate((valid) => {
          if (valid) {
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            // 更新vuex中的mainId
            t.$store.commit('platSysMailJS/setMainId', res.data.content[0].id)
            this.$store.commit('platSysMailJS/setFlowId', res.data.content[0].sysmailFlow)
            this.$store.commit('platSysMailJS/setFlowstepId', res.data.content[0].sysmailFlowstep)
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
      clear() {
        this.form.sysmailNo = ''
        this.form.sysmailName = ''
        this.form.sysmailObject = ''
        this.form.sysmailTo = ''
        this.form.sysmailCc = ''
        this.form.sysmailContent = editor.txt.html('')
        this.form.sysmailSendcondition = ''
        this.form.sysmailSendconditiondis = ''
        this.form.sysmailIsencrypt = '0'
        this.form.sysmailFlow = ''
        this.flstepFlowCop = ''
        this.form.sysmailFlowstep = ''
        this.form.sysmailIsvalid = '1'
        this.form.sysmailInvreason = ''
        this.form.sysmailComment = ''
        this.sysmailFlowDis = ''
        this.sysmailFlowstepDis = ''
        this.$store.commit('platSysMailJS/setMainId', '')
        this.$refs.form.resetFields()
        this.$store.commit('platSysMailJS/setFlowId', '')
        this.$store.commit('platSysMailJS/setFlowstepId', '')
      },
      getFlowId() {
        const t = this
        t.$refs.searchTable.getData(this.params)
        t.openPick = true
      },
      dbClear() {
        const t = this
        t.sysmailFlowDis = ''
        t.flstepFlowCop = ''
        t.form.sysmailFlow = ''
        t.dbClear2()
      },
      dbClear2() {
        const t = this
        t.sysmailFlowstepDis = ''
        t.form.sysmailFlowstep = ''
      },
      getFlowstepId() {
        const t = this
        if (t.form.sysmailFlow) {
          t.flstepFlowCop = t.form.sysmailFlow
          t.$refs.searchTable2.getData(1)
          t.openPick2 = true
        } else {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_platdoc.platMail.selectFlowRemind'),
          })
        }
      },
      changeinput(name, id) {
        const t = this
        t.sysmailFlowDis = name
        t.form.sysmailFlow = id
        t.flstepFlowCop = id
        t.sysmailFlowstepDis = ''
        t.form.sysmailFlowstep = ''
      },
      changeinput2(name, id) {
        const t = this
        t.sysmailFlowstepDis = name
        t.form.sysmailFlowstep = id
      },
      close() {
        const t = this
        t.openPick = false
        t.$refs.searchTable.flowName = ''
      },
      close2() {
        const t = this
        t.openPick2 = false
        t.$refs.searchTable2.flstepCnName = ''
      },
    },
  }
</script>
<style lang="scss" scoped>
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
