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
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135" style="height: 500px;overflow-y: auto;padding: 5px;">
        <Row>
          <Col span="11">
          <FormItem label="发布时间" prop="cmutKldPublish">
            <DatePicker type="date" placeholder="请选择发布时间..." v-model="formValidate.cmutKldPublish" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem label="失效时间">
            <DatePicker type="date" placeholder="请选择失效时间..." v-model="formValidate.cmutKldLosttime" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem label="序号" prop="cmutKldOrder">
            <Input v-model="formValidate.cmutKldOrder"  placeholder="请输入序号..."></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem label="知识库类型" prop="cmutKldType">
            <span @dblclick="clear">
                <Input v-model="cmutKldTypeDis" icon="search" :readonly="true" placeholder="请选择知识点上级标题"  @on-click="pickData"/>
            </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem label="知识点标题" prop="cmutKldTitle">
            <Input v-model="formValidate.cmutKldTitle"  placeholder="请输入知识点标题..."></Input>
          </FormItem>
          </Col>
        </Row>
        <Row style="margin-right: 30px;">
          <col span="23" >
          <FormItem label="内容" prop="cmutKldContent" >
            <div id="editor"></div>
            <div id="txt" v-show="editShow"></div>
          </FormItem>
          </col>
        </Row>
        <Row>
          <Col span="24">
            <Col span="6">
            <FormItem label="附件" prop="cmutKldAttach">
              <Upload :before-upload="handleUpload" action=" ">
                <Button type="ghost" icon="ios-cloud-upload-outline">浏览</Button>
              </Upload>
            </FormItem>
            </Col>
            <Col span="18" >
                <Row>
               <span v-if="file !== '' ">
               	<Col span="22">
               	<Input v-model="file.name" readonly="readonly" >
			    				<span slot="prepend">
			    					<Icon type="folder" size="16"></Icon>
			    				</span>
                </Input>
			    			</Col>
			    			<Col span="2">
	               	<Button type="text"  @click="uploadFile1" v-if="loadingStatus">
				        		上传
				        	</Button>
				        	<Button type="text"  @click="uploadFile2" v-if="!loadingStatus">
				        		下载
				        	</Button>
               </Col>
               </span>
              </Row>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem label="状态" prop="cmutKldState">
            <Select v-model="formValidate.cmutKldState"  placeholder="选择知识点状态" transfer>
              <Option :value="item.paramCode" v-for="(item,index) in knowledgeStatus" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem label="是否控制权限" prop="cmutKldAuth">
            <RadioGroup v-model="formValidate.cmutKldAuth"  placeholder="选择是否控制权限" transfer>
              <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem label="备注" prop="cmutKldNote">
            <Input v-model="formValidate.cmutKldNote" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注..."></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23" >
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="close" style="margin-left: 8px">取消</Button>
              <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
    <transition name="fade">
      <searchTable v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="closeUp" @changeinput="changeinput" ref="searchTable"></searchTable>
    </transition>
  </div>
</template>
<script>
  import E from 'wangeditor'
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
  import searchTable from '../../../components/searchTable/searchKnowType'
  import { isSuccess, deepCopy } from '../../../lib/util'

  let editor = new E('#editor')
  export default {
    data() {
      return {
        editShow: false,
        openPick: false,
        knowledgeStatus: [],
        yesno: [],
        knowledgeType: [],
        cmutKldStateDis: '',
        cmutKldAuthDis: '',
        cmutKldTypeDis: '',
        file: '',
        filekey: '',
        loadingStatus: false,
        formValidate: {
          _mt: 'cmutKnowledge.addOrUpd',
          cmutKldPublish: '',
          cmutKldLosttime: '',
          cmutKldType: '',
          cmutKldTitle: '',
          cmutKldState: '02valid',
          cmutKldAttach: '',
          cmutKldAuth: '0',
          cmutKldContent: '',
          cmutKldNote: '',
          funId: '1',
          logType: '',
        },
        searchCloumns: [
          {
            title: '知识库类型编码',
            key: 'cmutKntypeCode',
            sortable: 'custom',
            width: 253,
          },
          {
            title: '知识库类型名称',
            key: 'cmutKntypeName',
            sortable: 'custom',
            width: 253,
          },
        ],
        params: {
          _mt: 'cmutKnlType.getPage',
          sort: 'cmutKntypeCode',
          order: 'asc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
        },
        ruleValidate: {
          cmutKldPublish: [
            { required: true, type: 'date', message: '生效时间不能为空', trigger: 'change' },
         ],
          cmutKldOrder: [
            { required: true, message: '知识点序号不能为空', trigger: 'blur' },
          ],
          cmutKldType: [
            { required: true, message: '知识点类型不能为空', trigger: 'blur' },
          ],
          cmutKldTitle: [
            { required: true, message: '知识点标题不能为空', trigger: 'blur' },
          ],
          cmutKldState: [
            { required: true, message: '知识点状态', trigger: 'blur' },
          ],
          cmutKldContent: [
            { required: true, message: '内容不能为空', trigger: 'blur' },
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
    },
    updated() {

    },
    mounted() {
      this.getSelect()
      editor.customConfig.onchange = function (html) {
        document.getElementById('txt').innerHTML = html
      }
      editor.customConfig.zIndex = 100
      editor.create()
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'cmutKnowledge.getById',
          id: id,
          funId: '1',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.cmutKldPublish = res.data.content[0].cmutKldPublish
            t.formValidate.cmutKldLosttime = res.data.content[0].cmutKldLosttime
            t.formValidate.cmutKldOrder = res.data.content[0].cmutKldOrder
            t.formValidate.cmutKldType = res.data.content[0].cmutKldType
            t.cmutKldTypeDis = res.data.content[0].cmutKldTypeDis
            t.formValidate.cmutKldTitle = res.data.content[0].cmutKldTitle
            t.formValidate.cmutKldState = res.data.content[0].cmutKldState
            t.cmutKldStateDis = res.data.content[0].cmutKldStateDis
            t.formValidate.cmutKldAttach = res.data.content[0].cmutKldAttach
            t.cmutKldAttachDis = res.data.content[0].cmutKldAttachDis
            t.formValidate.cmutKldAuth = res.data.content[0].cmutKldAuth
            t.formValidate.cmutKldContent = res.data.content[0].cmutKldContent
            editor.txt.clear()
            editor.txt.append(t.formValidate.cmutKldContent)
            t.formValidate.cmutKldNote = res.data.content[0].cmutKldNote
            if (res.data.content[0].cmutKldAttach) {
              t.file = { name: res.data.content[0].cmutKldAttach.split(':')[0] }
              t.filekey = res.data.content[0].cmutKldAttach.split(':')[1]
            }
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
        t.formValidate.cmutKldContent = editor.txt.html()
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            data.cmutKldPublish = t.formValidate.cmutKldPublish.format('yyyy-MM-dd')  //  获取发布日期
            if (t.formValidate.cmutKldLosttime) {
              data.cmutKldLosttime = t.formValidate.cmutKldLosttime.format('yyyy-MM-dd')
            }
             //  获取发布日期
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                t.close()
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.formValidate.resetFields()
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
              }
            }).catch(() => {
              this.$Modal.error({
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
          typeCode: 'pubstatus,knowledgetype,yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.knowledgeStatus = res.data.content[0].value[0].paramList
            t.knowledgeType = res.data.content[0].value[1].paramList
            t.yesno = res.data.content[0].value[2].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleUpload(file) {
        this.file = file
        this.loadingStatus = true
        return false
      },
      uploadFile1() {
        const t = this
        const formData = new FormData()
        formData.append('upfile', t.file)
        uploadFile(formData).then(res => {
          for (const key in res.data) {
            t.filekey = res.data[key]
            t.formValidate.cmutKldAttach = key + ':' + res.data[key]
          }
          t.$Modal.success({
            title: this.$t('reminder.suc'),
            content: '上传成功',
            onOk: () => {
              t.loadingStatus = false
            },
          })
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      uploadFile2() {
        const t = this
        let data = {
          _mt: 'userMgmt.getfiletoken',
          isprivate: true,
          logType: '导出',
          filekey: t.filekey,
          expiresecs: 180,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
            if (this.isIE()) {
              window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
            } else {
              let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
              let link = document.createElement('a')
              link.href = doclink
              link.download = 'downloadfiletemp'
              link.click()
            }
            this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
            localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      pickData() {
        const t = this
        t.$refs.searchTable.getData(this.params)
        t.openPick = true
      },
      changeinput(name, code) {
        const t = this
        t.cmutKldTypeDis = name
        t.formValidate.cmutKldType = code
      },
      clear() {
        const t = this
        t.formValidate.cmutKldPublish = ''
        t.formValidate.cmutKldLosttime = ''
        t.formValidate.cmutKldOrder = ''
        t.formValidate.cmutKldTitle = ''
        t.formValidate.cmutKldState = ''
        t.cmutKldStateDis = ''
        t.formValidate.cmutKldAttach = ''
        t.cmutKldAttachDis = ''
        t.formValidate.cmutKldContent = ''
        t.formValidate.cmutKldNote = ''
        t.formValidate.cmutKldType = ''
        t.cmutKldTypeDis = ''
        t.formValidate.cmutKldAuth = ''
        t.file = ''
        editor.txt.clear()
        t.$refs.formValidate.resetFields()
      },
      close() {
        const t = this
        t.clear()
        this.$emit('closeUp')
      },
      closeUp() {
        const t = this
        t.openPick = false
      },
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  .box{
    /*height: 560px;
    overflow-y:auto;*/
    .content{
      overflow-y: auto;
      position: absolute;
      height: 420px;
    }
  }
</style>
