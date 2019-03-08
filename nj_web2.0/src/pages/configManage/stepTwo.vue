<template>
  <!-- 第二步页面 新增-->
  <div>
    <Form ref="form" :model="form" :rules="rules" :label-width="135" style="height:470px;">
      <!-- 编号、样式 -->
      <Row>
        <Col span="24">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.suvadmin.platSuvCode')">
            <Input v-model="form.platSuvCode" readonly></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.suvadmin.platSuvStyleDis')" >
            <Input v-model="form.platSuvStyleDis" readonly></Input>
            <Input v-model="form.platSuvStyle" v-show="false"></Input>
          </FormItem>
          </Col>
        </Row>
        </Col>
      </Row>
      <!-- 调查信息标题、副标题 -->
      <Row>
        <Col span="24">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.suvadmin.platSuvTitle')"  prop="platSuvTitle">
            <Input v-model="form.platSuvTitle"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.suvadmin.platSuvSubtitle')">
            <Input v-model="form.platSuvSubtitle"></Input>
          </FormItem>
          </Col>
        </Row>
        </Col>
      </Row>
      <!-- 标题图片、收件人 -->
      <Row>
        <Col span="24">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.suvadmin.platSuvTo')" prop="platSuvTo">
            <Input v-model="form.platSuvTo"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.suvadmin.platSuvSubject')" prop="platSuvSubject">
            <Input v-model="form.platSuvSubject"></Input>
          </FormItem>
          </Col>
        </Row>
        </Col>
      </Row>
      <!-- 主题、链接名称 -->
      <Row>
        <Col span="24">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.suvadmin.platSuvLinkname')" prop="platSuvLinkname">
            <Input v-model="form.platSuvLinkname"></Input>
          </FormItem>
          </Col>
        </Row>
        </Col>
      </Row>
      <!-- 正文 -->
      <Row style="position:relative;z-index: 0;">
        <Col span="21" offset="1">
        <FormItem :label="$t('lang_role.suvadmin.platSuvContent')" prop="platSuvContent">
          <div id="editorCon" class="txtarea"></div>
          <div id="txtCon" v-model="form.platSuvContent" v-show="false"></div>
        </FormItem>
        </Col>
      </Row>
      <!-- 选项说明 -->
      <Row style="position:relative;z-index: 0;">
        <Col span="21" offset="1">
        <FormItem :label="$t('lang_role.suvadmin.platSuvOptdesc')">
          <div id="optionDes" class="txtarea"></div>
          <div id="txtDes" v-model="form.platSuvOptdesc" v-show="false"></div>
        </FormItem>
        </Col>
      </Row>
      <!-- 末尾 -->
      <Row style="position:relative;z-index: 0;">
        <Col span="21" offset="1">
        <FormItem :label="$t('lang_role.suvadmin.platSuvBottom')">
          <div id="editorEnd" class="txtarea"></div>
          <div id="txtEnd" v-model="form.platSuvBottom" v-show="false"></div>
        </FormItem>
        </Col>
      </Row>
      <!-- 是否计分、include suggestion -->
      <Row>
        <Col span="24">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.suvadmin.platSuvScoringDis')">
            <!-- <Checkbox v-model="form.platSuvScoring" @on-change="platScore" true-value='1' false-value="0">是（默认为否）</Checkbox> -->
            <RadioGroup v-model="form.platSuvScoring" @on-change="platScore">
              <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.suvadmin.platSuvSuggestDis')">
            <!-- <Checkbox v-model="form.platSuvSuggest" @on-change="platSuggest" true-value='1' false-value="0">是（默认为否）</Checkbox> -->
            <RadioGroup v-model="form.platSuvSuggest" @on-change="platSuggest">
              <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        </Col>
      </Row>
      <!-- 建议标题 -->
      <Row style="position:relative;z-index: 0;">
        <Col span="21" offset="1">
        <FormItem :label="$t('lang_role.suvadmin.platSuvSuggestitle')" prop="platSuvSuggestitle">
          <div id="editorSuggest" class="txtarea"></div>
          <div id="txtSuggest" v-model="form.platSuvSuggestitle" v-show="false"></div>
        </FormItem>
        </Col>
      </Row>
      <!-- 模板中是否包括员工号、预览生成时间 -->
      <Row>
        <Col span="24">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.suvadmin.platSuvIcworkno')">
            <!-- <Checkbox v-model="form.platSuvIcworkno" @on-change="platWork" true-value='1' false-value="0">是（默认为否）</Checkbox> -->
            <RadioGroup v-model="form.platSuvIcworkno" @on-change="platWork">
              <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.suvadmin.platSuvGentime')"prop="platSuvGentime"><!-- prop="platSuvGentime" -->
            <DatePicker type="date" v-model="form.platSuvGentime"
                        :placeholder="$t('lang_role.suvadmin.pplatSuvGentime')"
                        style="width:198px"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        </Col>
      </Row>
      <!-- 邮件正文中是否隐藏问题及答案 -->
      <Row>
        <Col span="24">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.suvadmin.platSuvDiscont')">
            <!-- <Checkbox v-model="form.platSuvDiscont" @on-change="platDiscont" true-value='1' false-value="0">是（默认为否）</Checkbox> -->
            <RadioGroup v-model="form.platSuvDiscont" @on-change="platDiscont">
              <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLogin2} from '../../axios/axios'
  import {isSuccess} from '../../lib/util'

  let editorCon = new E('#editorCon')
  let optionDes = new E('#optionDes')
  let editorEnd = new E('#editorEnd')
  let editorSuggest = new E('#editorSuggest')
  export default {
    data() {
      return {
        radioYesOrNo: [],
        form: {
          _mt: 'platSurvery.addOrUpd',
          logType: '新增',
          id: this.suvid,
          platSuvCode: '',                    //  编号
          platSuvStyle: this.styleCode,       //  样式
          platSuvStyleDis: this.styleTitle,
          platSuvTitle: '',                   //  调查信息标题
          platSuvSubtitle: '',                //  副标题
          platSuvTo: '',                      //  收件人
          platSuvSubject: '',                 //  主题
          platSuvLinkname: '',                //  链接名称
          platSuvContent: '',                 //  正文
          platSuvOptdesc: '',                 //  选项说明
          platSuvBottom: '',                  //  末尾
          platSuvScoring: '1',                //  是否计分
          platSuvSuggest: '1',                //  include suggestion
          platSuvSuggestitle: '',             //  建议标题
          platSuvIcworkno: '1',               //  模板中是否包括员工号
          platSuvGentime: '',                 //  预览生成时间
          platSuvDiscont: '1',                //  邮件正文中是否隐藏问题及答案
        },
        rules: {
          platSuvTitle: [
            {required: true, message: this.$t('lang_role.suvadmin.infoTitle'), trigger: 'blur'},
          ],
          platSuvTo: [
            {required: true, message: this.$t('lang_role.suvadmin.pplatSuvTo'), trigger: 'blur'},
          ],
          platSuvSubject: [
            {required: true, message: this.$t('lang_role.suvadmin.pplatSuvSubject'), trigger: 'blur'},
          ],
          platSuvLinkname: [
            {required: true, message: this.$t('lang_role.suvadmin.pplatSuvLinkname'), trigger: 'blur'},
          ],
          platSuvContent: [
            {required: true, message: this.$t('lang_role.suvadmin.pplatSuvContent'), trigger: 'blur'},
          ],
          platSuvGentime: [
            {required: true, type: 'date', message: this.$t('lang_role.suvadmin.ppplatSuvGentime'), trigger: 'change'},
          ],
          platSuvSuggestitle: [
            {required: true, message: this.$t('lang_role.suvadmin.pplatSuvSuggestitle'), trigger: 'blur'},
          ],
        },
      }
    },
    components: {},
    props: {
      styleTitle: String,
      styleCode: String,
      logType: String,
      id: Number,
      index: Number,
      researchMes: Object,
      suvid: String,
    },
    mounted() {
      this.getSelect()
      if (this.suvid === '') {
        this.getCode()
      }
      // 创建正文富文本
      editorCon.customConfig.onchange = function (html) {
        document.getElementById('txtCon').innerHTML = html
      }
      editorCon.create()
      // 创建选项说明富文本
      optionDes.customConfig.onchange = function (html) {
        document.getElementById('txtDes').innerHTML = html
      }
      optionDes.create()
      // 创建末尾富文本
      editorEnd.customConfig.onchange = function (html) {
        document.getElementById('txtEnd').innerHTML = html
      }
      editorEnd.create()
      // 创建建议标题富文本
      editorSuggest.customConfig.onchange = function (html) {
        document.getElementById('txtSuggest').innerHTML = html
      }
      editorSuggest.create()
      if (this.suvid !== '') {
        // console.log(this.researchMes)
        this.newGay()
      }
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
      //  获取编号
      getCode() {
        const t = this
        getDataLevelUserLoginNew({
          _mt: 'platSurvery.getCode',
          logType: '获取code',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.platSuvCode = res.data.content[0].value
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 是否计分
      platScore(value) {
        this.form.platSuvScoring = value
      },
      // include suggestion
      platSuggest(value) {
        this.form.platSuvSuggest = value
      },
      // 模板中是否包括员工号
      platWork(value) {
        this.form.platSuvIcworkno = value
      },
      // 邮件正文中是否隐藏问题及答案
      platDiscont(value) {
        this.form.platSuvDiscont = value
      },
      newGay() {
        this.form.platSuvCode = this.researchMes.platSuvCode
        this.form.platSuvStyle = this.researchMes.platSuvStyle          //  样式
        this.$emit("getStyle", this.researchMes.platSuvStyle)
        this.form.platSuvStyleDis = this.researchMes.platSuvStyleDis
        this.form.platSuvTitle = this.researchMes.platSuvTitle          //  调查信息标题
        this.form.platSuvSubtitle = this.researchMes.platSuvSubtitle    //  副标题
        this.form.platSuvTo = this.researchMes.platSuvTo                //  收件人
        this.form.platSuvSubject = this.researchMes.platSuvSubject      //  主题
        this.form.platSuvLinkname = this.researchMes.platSuvLinkname    //  链接名称
        this.form.platSuvContent = this.researchMes.platSuvContent      //  正文
        editorCon.txt.append(this.researchMes.platSuvContent)
        document.getElementById('txtCon').innerHTML = this.researchMes.platSuvContent
        this.form.platSuvOptdesc = this.researchMes.platSuvOptdesc      //  选项说明
        optionDes.txt.append(this.form.platSuvOptdesc)
        document.getElementById('txtDes').innerHTML = this.form.platSuvOptdesc
        this.form.platSuvBottom = this.researchMes.platSuvBottom        //  末尾
        editorEnd.txt.append(this.form.platSuvBottom)
        document.getElementById('txtEnd').innerHTML = this.form.platSuvBottom
        this.form.platSuvScoring = this.researchMes.platSuvScoring      //  是否计分
        this.form.platSuvSuggest = this.researchMes.platSuvSuggest      //  include suggestion
        this.form.platSuvSuggestitle = this.researchMes.platSuvSuggestitle //  建议标题
        editorSuggest.txt.append(this.form.platSuvSuggestitle)
        document.getElementById('txtSuggest').innerHTML = this.form.platSuvSuggestitle
        this.form.platSuvIcworkno = this.researchMes.platSuvIcworkno    //  模板中是否包括员工号
        this.form.platSuvGentime = this.researchMes.platSuvGentime      //  预览生成时间
        this.form.platSuvDiscont = this.researchMes.platSuvDiscont      //  邮件正文中是否隐藏问题及答案
      },
    },
  }
</script>

<style lang="scss" scoped>
  .ivu-form .ivu-form-item-label {
    width: 100px !important;
    line-height: 30px !important;
    padding-right: 10px !important;
  }

  .ivu-input-wrapper {
    width: 90%;
  }

  .ivu-form-item-error-tip {
    left: 6%;
  }

  .txtarea {
    z-index: 0;
    width: 590px;
  }

  .w-e-text {
    overflow-y: auto !important;
  }
</style>
