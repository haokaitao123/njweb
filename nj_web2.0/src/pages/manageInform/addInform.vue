<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80" style="height:470px;">
        <!-- 发布日期 -->
        <!--<Row>-->
        <!--<Col span="24">-->
        <!--<Row style="margin-bottom: 0;">-->
        <!--<Col span="12" >-->
        <!--<FormItem prop="cmutNoticePublish" label="发布日期">-->
        <!--<DatePicker type="date" :disabled="editdisabled"
        :readonly="editdisabled" v-model="form.cmutNoticePublish"
        placeholder="请选择选择日期" class="width200"  ></DatePicker>-->
        <!--</FormItem>-->
        <!--</Col>-->
        <!--<Col span="8" offset="3" >-->
        <!--<FormItem prop="cmutPublishHour">-->
        <!--<TimePicker type="time" :disabled="editdisabled" :readonly="editdisabled"
        placeholder="请选择时间"  v-model="form.cmutPublishHour" ></TimePicker>-->
        <!--</FormItem>-->
        <!--</Col>-->
        <!--</Row>-->
        <!--</Col>-->
        <!--</Row>-->
        <Row>
          <Col span="12">
          <FormItem :label="$t('lang_role.cmutnotic.cmutNoticeLosttime')" prop="cmutNoticeLosttime">
            <DatePicker type="date" :disabled="editdisabled" :readonly="editdisabled"
                        :placeholder="$t('lang_role.cmutnotic.pcmutNoticeLosttime')" :editable="false"
                        v-model="form.cmutNoticeLosttime" class="width200"></DatePicker>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.cmutnotic.cmutNoticeType')" prop="cmutNoticeType">
            <Select v-model="form.cmutNoticeType" :disabled="editdisabled" class="width200"
                    :placeholder="$t('lang_role.cmutnotic.pcmutNoticeType')" >
              <Option v-for="(item, index) in selectType" :value="item.paramCode"
                      :key="index">{{ item.paramInfoName }}
              </Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_role.cmutnotic.cmutNoticeTitle')"  prop="cmutNoticeTitle">
            <Input v-model="form.cmutNoticeTitle" :disabled="editdisabled"
                   :placeholder="$t('lang_role.cmutnotic.infoTitle')" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row style="position:relative;z-index: 0;">
          <Col span="23">
          <FormItem :label="$t('lang_role.cmutnotic.cmutNoticeContent')"  prop="cmutNoticeContent">
            <div id="editor" style="z-index: 0;"></div>
            <div id="txt" v-model="form.cmutNoticeContent" v-show="false"></div>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_role.cmutnotic.handleUpload')" >
            <Row :gutter="40">
              <i-col span="17" v-if="file !== ''">
                <Input v-model="file.name" readonly>
                <span slot="prepend">
                      <Icon type="folder" size="16"></Icon>
                    </span>
                </Input>
              </i-col>
              <i-col span="3">
                <Upload :before-upload="handleUpload" :format="['pdf']" action="1">
                  <Button type="primary" :disabled="editdisabled" icon="ios-cloud-upload-outline">{{$t('lang_role.cmutnotic.phandleUpload')}}</Button>
                </Upload>
              </i-col>
            </Row>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem :label="$t('lang_role.cmutnotic.cmutNoticeStateDis')" prop="flowStatus">
            <Select v-model="form.cmutNoticeState" :disabled="editdisabled"
                    :placeholder="$t('lang_role.cmutnotic.pcmutNoticeState')"  transfer>
              <Option :value="item.paramCode" v-for="(item,index) in CmutNoticeStatelist" :key="index">
                {{item.paramInfoCn}}
              </Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <!-- 备注 -->
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_role.adminpmtype.comment')" >
            <Input v-model="form.cmutNoticeNote" :disabled="editdisabled" type="textarea"
                   :placeholder="$t('lang_role.adminpmtype.pcomment')" :autosize="{minRows: 2,maxRows: 5}" ></Input>
          </FormItem>
          </Col>
        </Row>

        <!-- 保存、取消按钮 -->
      </Form>
      <Row style="margin-top:20px;">
        <Col span="22" offset="1">
        <Row type="flex" justify="end">
          <Button type="ghost" @click="handleReset" v-show="!editdisabled" style="margin-right: 8px">{{$t('button.cal')}}</Button>
          <Button type="primary" v-show="!editdisabled" @click="handleSubmit">{{$t('button.sav')}}</Button>
        </Row>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import E from 'wangeditor'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile} from '../../axios/axios'
  import {isSuccess, deepCopy} from '../../lib/util'

  let editor = new E('#editor')
  export default {
    data() {
      return {
        date1: '',
        date2: '',
        editdisabled: false,
        CmutNoticeStatelist: [],
        form: {
          _mt: 'cmutNotic.addOrUpd',
          logType: '新增',
          cmutNoticePublish: '',  //  发布日期
          cmutPublishHour: '',
          cmutNoticeLosttime: '',   //  失效日期
          cmutNoticeType: '',       //  类型
          cmutNoticeTitle: '',      //  标题
          cmutNoticeContent: '',    //  发布内容
          cmutNoticeNote: '',       //  备注
          cmutNoticeAttach: '',     //  附件
          cmutNoticeState: '01draft',
        },
        ruleValidate: {
          cmutNoticePublish: [
            { required: true, type: 'date', message: this.$t('lang_role.cmutnotic.pcmutNoticePublish'), trigger: 'change' },
            // { validator: validatePass1, message: '开始日期要小于结束日期', trigger: 'change' },
          ],
          cmutPublishHour: [
            { required: true, message: this.$t('lang_role.cmutnotic.cmutPublishHour'), trigger: 'change' },
          ],
          cmutNoticeLosttime: [
            { required: true, type: 'date', message: this.$t('lang_role.cmutnotic.pcmutNoticeLosttime'), trigger: 'change' },
            // { validator: validatePass2, message: '结束日期不能小于开始日期', trigger: 'change' },
          ],
          cmutNoticeType: [
            { required: true, message: this.$t('lang_role.cmutnotic.pcmutNoticeType'), trigger: 'change' },
          ],
          cmutNoticeTitle: [
            { required: true, message: this.$t('lang_role.cmutnotic.infoTitle'), trigger: 'blur' },
          ],
          cmutNoticeContent: [
            { required: true, message: this.$t('lang_role.cmutnotic.pcmutNoticeContent'), trigger: 'blur' },
          ],
        },
        file: '',
      }
    },
    props: {
      selectType: Array,
      id: Number,
      logType: String,
      index: Number,
      flowStatus: String,
    },
    computed: {},
    components: {},
    mounted() {
      this.getSelect()
      editor.customConfig.onchange = function (html) {
        document.getElementById('txt').innerHTML = html
      }
      editor.create()
    },
    methods: {
      // 获取下拉状态
      getSelect() {
        const t = this
        t.dropdownMenuList = []
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'pubuserstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.CmutNoticeStatelist = res.data.content[0].value[0].paramList.splice(1, 3)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 上传pdf
      handleUpload(file) {
        const t = this
        const fileName = file.name
        let fileType = fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase()
        if (fileType === 'pdf') {
          t.file = file
          t.uploadFile1()
        } else {
          t.$Message.error({
            content: this.$t('lang_role.cmutnotic.fileerr'),
            duration: '2',
          })
        }
        return false
      },
      uploadFile1() {
        const t = this
        const formData = new FormData()
        let kName
        let vName
        formData.append('upfile', t.file)
        uploadFile(formData).then(res => {
          for (let i in res.data) {
            kName = i
            vName = res.data[i]
          }
          t.form.cmutNoticeAttach = kName + ':' + vName
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },  // 上传pdf--------------------------------------------
      // 修改
      upData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'cmutNotic.getById',
          id: id,
          logType: '修改',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.cmutNoticePublish = res.data.content[0].cmutNoticePublish
            t.form.cmutPublishHour = res.data.content[0].cmutPublishHour
            t.form.cmutNoticeLosttime = res.data.content[0].cmutNoticeLosttime
            t.form.cmutNoticeType = res.data.content[0].cmutNoticeType
            t.form.cmutNoticeTitle = res.data.content[0].cmutNoticeTitle
            t.form.cmutNoticeContent = res.data.content[0].cmutNoticeContent
            t.form.cmutNoticeState = res.data.content[0].cmutNoticeState
            if (t.form.cmutNoticeState !== '01draft') {
              t.editdisabled = true
            }
            t.form.cmutNoticeNote = res.data.content[0].cmutNoticeNote
            editor.txt.append(t.form.cmutNoticeContent)
            document.getElementById('txt').innerHTML = t.form.cmutNoticeContent
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 修改---------------------------------------------------
      // 保存
      handleSubmit() {
        const t = this
        t.form.cmutNoticeContent = document.getElementById('txt').innerHTML //  获取发布内容
        t.$refs.form.validate((valid) => {
          if (valid) {
            // t.form.cmutNoticePublish = t.form.cmutNoticePublish.format('yyyy-MM-dd')  //  获取发布日期
            t.form.cmutNoticeLosttime = t.form.cmutNoticeLosttime.format('yyyy-MM-dd')  //  获取失效日期
            const data = deepCopy(t.form)
            data.logType = t.logType
            if (t.logType === this.$t('button.upd')) {
              data.id = t.id
            }
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
                t.handleReset()
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },  // 保存-----------------------------------------------
      // 关闭窗口
      handleReset() {
        const t = this
        t.editdisabled = false
        t.form.cmutNoticePublish = ''
        t.form.cmutPublishHour = ''
        t.form.cmutNoticeLosttime = ''
        t.form.cmutNoticeType = ''
        t.form.cmutNoticeTitle = ''
        t.form.cmutNoticeContent = ''
        t.form.cmutNoticeState = ''
        t.form.cmutNoticeNote = ''
        editor.txt.clear()
        t.file = ''
        this.$refs.form.resetFields()
        t.$emit('closeUp')
      },  // 关闭窗口-------------------------------------------
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../sass/updateAndAdd";

  .width200 {
  }

  .cover .box {
    padding-bottom: 0px;
    padding-bottom: 20px;
  }

  .cover .box form {
    max-height: 600px;
    overflow-y: auto;
    padding: 20px;
  }
</style>
