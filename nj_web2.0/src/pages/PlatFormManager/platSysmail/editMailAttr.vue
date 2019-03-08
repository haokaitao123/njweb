<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row>
        <Form :model="form" ref="form" label-position="right" :rules="ruleValidate" :label-width="120">
          <i-col span="11">
            <FormItem :label="$t('lang_platdoc.platMailAttach.sysmlatOrder')" v-show="showDesc" prop="sysmlatOrder">
              <Input v-model="form.sysmlatOrder" :placeholder="$t('lang_platdoc.platMailAttach.sysmlatOrderDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_platdoc.platMailAttach.sysmlatSource')" v-show="showDesc">
              <Select v-model="form.sysmlatSource" :placeholder="$t('lang_platdoc.platMailAttach.sysmlatSourceDis')" :transfer="true" @on-change="selChangeSource" >
                <Option :value="item.paramCode" v-for="(item,index) in sysmlatSourceType" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_platdoc.platMailAttach.sysmlatAttach')" v-show="showAttrHide0">
              <Input v-model="sysmlatAttachDis" icon="search" :readonly="true" :placeholder="$t('lang_platdoc.platMailAttach.sysmlatAttachDis')" @on-click="pickData1"/>
              <!--<Input v-model="form.sysmlatAttach" placeholder="请输入固定附件" ></Input>-->
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_platdoc.platMailAttach.sysmlatFlowattach')" v-show="showAttrHide1">
              <Input v-model="sysmlatFlowattachDis" icon="search" :readonly="true" :placeholder="$t('lang_platdoc.platMailAttach.sysmlatFlowattachDis')" @on-click="pickData2"/>
              <!--<Input v-model="form.sysmlatFlowattach" placeholder="请输入流程固定附件" ></Input>-->
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_platdoc.platMailAttach.sysmlatFlowupdfiled')" v-show="showAttrHide2">
              <Input v-model="sysmlatFlowupdfiledDis" icon="search" :readonly="true" :placeholder="$t('lang_platdoc.platMailAttach.sysmlatFlowupdfiledDis')" @on-click="pickData3"/>
              <!--<Input v-model="form.sysmlatFlowupdfiled" placeholder="请输入流程上传文件" ></Input>-->
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_platdoc.platMailAttach.sysmlatFlowgendocid')" v-show="showAttrHide3">
              <Input v-model="sysmlatFlowgendocidDis" icon="search" :readonly="true" :placeholder="$t('lang_platdoc.platMailAttach.sysmlatFlowgendocidDis')" @on-click="pickData4"/>
              <!--<Input v-model="form.sysmlatFlowgendocid" placeholder="请输入流程生成文件" ></Input>-->
            </FormItem>
          </i-col>
          <i-col span="11" :offset="offsetCondition">
            <FormItem :label="$t('lang_platdoc.platMailAttach.sysmlatCondition')" >
              <Input v-model="form.sysmlatCondition" :placeholder="$t('lang_platdoc.platMailAttach.sysmlatConditionDis')" ></Input>
            </FormItem>
          </i-col>
          <i-col span="11":offset="offsetCondi">
            <FormItem :label="$t('lang_platdoc.platMailAttach.sysmlatIsvalid')" >
              <RadioGroup v-model="form.sysmlatIsvalid"  :placeholder="$t('lang_platdoc.platMailAttach.sysmlatIsvalidDis')"  @on-change="validChange()">
                <Radio :label="item.paramCode" v-for="(item,index) in yesAndNoType" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="23" v-show="openInValid">
            <FormItem :label="$t('lang_platdoc.platMailAttach.sysmlatInvreason')" prop="comment">
              <Input v-model="form.sysmlatInvreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platdoc.platMailAttach.sysmlatInvreasonDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_platdoc.platMailAttach.sysmlatComment')" prop="comment">
              <Input v-model="form.sysmlatComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platdoc.platMailAttach.sysmlatCommentDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <row type="flex" justify="end">
              <FormItem prop="comment">
                <Button type="primary" @click="save">{{$t('button.sav')}}</Button>
              </FormItem>
            </row>
          </i-col>
        </Form>
      </Row>
    </div>
    <transition name="fade">
      <searchAttach v-show="openAttach" @closeAttach="closeAttach" @changeinput="changeinput" ref="searchAttach"></searchAttach>
    </transition>
    <transition name="fade">
      <searchFlowattach v-show="openAttach2" @closeAttach="closeAttach2" @changeinput="changeinput2" ref="searchFlowattach"></searchFlowattach>
    </transition>
    <transition name="fade">
      <searchFlowupdfiled v-show="openAttach3" @closeAttach="closeAttach3" @changeinput="changeinput3" ref="searchFlowupdfiled"></searchFlowupdfiled>
    </transition>
    <transition name="fade">
      <searchFlowgendocid v-show="openAttach4" @closeAttach="closeAttach4" @changeinput="changeinput4" ref="searchFlowgendocid"></searchFlowgendocid>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchAttach from './searchAttach'
  import searchFlowattach from './searchFlowattach'
  import searchFlowupdfiled from './searchFlowupdfiled'
  import searchFlowgendocid from './searchFlowgendocid'

  export default {
    data() {
      return {
        offsetCondition: '',
        offsetCondi: '',
        openInValid: false,
        yesAndNoType: [],
        sysmlatSourceType: [],
        openAttach: false,
        openAttach2: false,
        openAttach3: false,
        openAttach4: false,
        sysmlatAttachDis: '',
        sysmlatFlowupdfiledDis: '',
        sysmlatFlowgendocidDis: '',
        sysmlatFlowattachDis: '',
        form: {
          sysmlatFlowattach: '',
          sysmlatFlowgendocid: '',
          sysmlatFlowupdfiled: '',
          sysmlatOrder: '',
          sysmlatSource: '',
          sysmlatAttach: '',
          sysmlatCondition: '',
          sysmlatIsvalid: '1',
          sysmlatInvreason: '',
          sysmlatComment: '',
        },
        ruleValidate: {
          sysmlatOrder: [
            { required: true, message: this.$t('lang_platdoc.platMailAttach.sysmlatOrderDis'), trigger: 'blur' },
          ],
        },
        showAttrHide0: false,
        showAttrHide1: false,
        showAttrHide2: false,
        showAttrHide3: false,
        showDesc: true,
        rowId: '',
      }
    },
    props: {
      id: Number,
      logType: String,
    },
    components: {
      searchAttach,
      searchFlowattach,
      searchFlowupdfiled,
      searchFlowgendocid,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      setRowId(id) {
        const t = this
        t.offsetCondition = '0'
        t.offsetCondi = '1'
        t.rowId = id
        t.getdata(id)
      },
      validChange() {
        if (this.form.sysmlatIsvalid === '1') {
          this.openInValid = false
        } else {
          this.openInValid = true
        }
      },
      setIdname(idname) {
        const t = this
        t.offsetCondition = '0'
        t.offsetCondi = '1'
        t.form.cptcOptionDis = idname
      },
      pickData1() {
        const t = this
        t.$refs.searchAttach.getData()
        t.openAttach = true
      },
      closeAttach() {
        this.openAttach = false
      },
      changeinput(name, id) {
        const t = this
        t.sysmlatAttachDis = name
        t.form.sysmlatAttach = id
      },
      pickData2() {
        const t = this
        t.$refs.searchFlowattach.getData()
        t.openAttach2 = true
      },
      closeAttach2() {
        this.openAttach2 = false
      },
      changeinput2(name, id) {
        const t = this
        t.sysmlatFlowattachDis = name
        t.form.sysmlatFlowattach = id
      },
      pickData3() {
        const t = this
        t.$refs.searchFlowupdfiled.getData()
        t.openAttach3 = true
      },
      closeAttach3() {
        this.openAttach3 = false
      },
      changeinput3(name, id) {
        const t = this
        t.sysmlatFlowupdfiledDis = name
        t.form.sysmlatFlowupdfiled = id
      },
      pickData4() {
        const t = this
        t.$refs.searchFlowgendocid.getData()
        t.openAttach4 = true
      },
      closeAttach4() {
        this.openAttach4 = false
      },
      changeinput4(name, id) {
        const t = this
        t.sysmlatFlowgendocidDis = name
        t.form.sysmlatFlowgendocid = id
      },
      getdata(rowId) {
        const t = this
        const params = {
          _mt: 'platSysmailAttachment.getById',
          id: rowId,
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form.sysmlatFlowupdfiled = res.data.content[0].sysmlatFlowupdfiled
            t.form.sysmlatFlowgendocid = res.data.content[0].sysmlatFlowgendocid
            t.form.sysmlatFlowattach = res.data.content[0].sysmlatFlowattach
            t.form.sysmlatOrder = res.data.content[0].sysmlatOrder
            t.form.sysmlatSource = res.data.content[0].sysmlatSource
            t.form.sysmlatAttach = res.data.content[0].sysmlatAttach
            t.form.sysmlatCondition = res.data.content[0].sysmlatCondition
            t.form.sysmlatIsvalid = res.data.content[0].sysmlatIsvalid
            t.form.sysmlatInvreason = res.data.content[0].sysmlatInvreason
            t.form.sysmlatComment = res.data.content[0].sysmlatComment
            t.sysmlatAttachDis = res.data.content[0].sysmlatAttachDis
            t.sysmlatFlowupdfiledDis = res.data.content[0].sysmlatFlowupdfiledDis
            t.sysmlatFlowgendocidDis = res.data.content[0].sysmlatFlowgendocidDis
            t.sysmlatFlowattachDis = res.data.content[0].sysmlatFlowattachDis
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
        const params = deepCopy(t.form)
        params._mt = 'platSysmailAttachment.addOrUpd'
        params.logType = this.$t('button.add')
        params.sysmlatMailid = t.$store.state.platSysMailJS.mainId
        if (t.rowId !== '') {
          params.logType = this.$t('button.upd')
          params.id = t.rowId
        }
        for (const dat in params) {
          if (params[dat] === '') {
            delete params[dat]
          }
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(params).then((res) => {
              if (isSuccess(res, t)) {
                if (t.rowId === '') {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
    //              t.$refs.formValidate.resetFields()
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
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
//        alert(t.offsetCondition)
        t.offsetCondition = '0'
        t.offsetCondi = '1'
        t.form.sysmlatOrder = ''
        t.form.sysmlatSource = ''
        t.form.sysmlatCondition = ''
        t.form.sysmlatIsvalid = '1'
        t.form.sysmlatComment = ''
        t.form.sysmlatInvreason = ''
        t.form.sysmlatAttach = ''
        t.form.sysmlatFlowattach = ''
        t.form.sysmlatFlowgendocid = ''
        t.form.sysmlatFlowupdfiled = ''
        t.sysmlatAttachDis = ''
        t.sysmlatFlowupdfiledDis = ''
        t.sysmlatFlowgendocidDis = ''
        t.sysmlatFlowattachDis = ''
        t.showAttrHide0 = false
        t.showAttrHide1 = false
        t.showAttrHide2 = false
        t.showAttrHide3 = false
      },
      close() {
        this.$emit('hideMsg')
        this.clear()
        this.rowId = ''
      },
      selChangeSource() {
        const t = this
        if (t.form.sysmlatSource === '01fixed') {
          t.showAttrHide0 = true
          t.showAttrHide1 = false
          t.showAttrHide2 = false
          t.showAttrHide3 = false
          t.form.sysmlatFlowattach = ''
          t.form.sysmlatFlowgendocid = ''
          t.form.sysmlatFlowupdfiled = ''
          t.sysmlatFlowupdfiledDis = ''
          t.sysmlatFlowgendocidDis = ''
          t.sysmlatFlowattachDis = ''
        } else if (t.form.sysmlatSource === '02flowfixed') {
          t.showAttrHide0 = false
          t.showAttrHide1 = true
          t.showAttrHide2 = false
          t.showAttrHide3 = false
          t.form.sysmlatAttach = ''
          t.form.sysmlatFlowupdfiled = ''
          t.form.sysmlatFlowgendocid = ''
          t.sysmlatAttachDis = ''
          t.sysmlatFlowupdfiledDis = ''
          t.sysmlatFlowgendocidDis = ''
        } else if (t.form.sysmlatSource === '03flowupload') {
          t.showAttrHide0 = false
          t.showAttrHide1 = false
          t.showAttrHide2 = true
          t.showAttrHide3 = false
          t.form.sysmlatAttach = ''
          t.form.sysmlatFlowattach = ''
          t.form.sysmlatFlowgendocid = ''
          t.sysmlatAttachDis = ''
          t.sysmlatFlowattachDis = ''
          t.sysmlatFlowgendocidDis = ''
        } else if (t.form.sysmlatSource === '04flowgen') {
          t.showAttrHide0 = false
          t.showAttrHide1 = false
          t.showAttrHide2 = false
          t.showAttrHide3 = true
          t.form.sysmlatAttach = ''
          t.form.sysmlatFlowattach = ''
          t.form.sysmlatFlowupdfiled = ''
          t.sysmlatAttachDis = ''
          t.sysmlatFlowattachDis = ''
          t.sysmlatFlowupdfiledDis = ''
        }
        t.offsetCondition = '1'
        t.offsetCondi = '0'
//        this.offsetCondition = 1
//        this.offsetCondi = 0
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno,sysmailattachtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.yesAndNoType = res.data.content[0].value[0].paramList
            t.sysmlatSourceType = res.data.content[0].value[1].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
