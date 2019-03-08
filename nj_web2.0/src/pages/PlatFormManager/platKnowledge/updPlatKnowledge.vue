<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135" style="height: 500px;overflow-y: auto;">
        <Row>
          <Col span="11">
          <FormItem label="发布时间" prop="platKldPublish">
            <DatePicker type="date" placeholder="请选择发布时间..." v-model="formValidate.platKldPublish" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem label="失效时间">
            <DatePicker type="date" placeholder="请选择失效时间..." v-model="formValidate.platKldLosttime" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem label="序号" prop="platKldOrder">
            <Input v-model="formValidate.platKldOrder"  placeholder="请输入序号..."></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem label="知识库类型" prop="platKldType">
            <span @dblclick="clear">
                <Input v-model="platKldTypeDis" icon="search" :readonly="true" placeholder="请选择知识点上级标题"  @on-click="pickData"/>
            </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem label="知识点标题" prop="platKldTitle">
            <Input v-model="formValidate.platKldTitle"  placeholder="请输入知识点标题..."></Input>
          </FormItem>
          </Col>
        </Row>
        <Row style="margin-right: 30px;">
          <col span="23" >
          <FormItem label="内容" prop="platKldContent" >
            <div id="editor"></div>
            <input id="txt" v-model="formValidate.platKldContent"  v-show="editShow"></input>
          </FormItem>
          </col>
        </Row>
        <Row>
          <Col span="23">
            <Col span="6">
            <FormItem label="附件" prop="platKldAttach">
              <Upload :before-upload="handleUpload" action=" ">
                <Button type="ghost" icon="ios-cloud-upload-outline">浏览</Button>
              </Upload>
            </FormItem>
            </Col>
            <Col span="16" style="margin-left: 10px;">
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
          <FormItem label="状态" prop="platKldState">
            <Select v-model="formValidate.platKldState"  placeholder="选择知识点状态" transfer>
              <Option :value="item.paramCode" v-for="(item,index) in knowledgeStatus" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem label="是否控制权限" prop="platKldAuth">
            <RadioGroup v-model="formValidate.platKldAuth"  placeholder="选择是否控制权限" transfer>
              <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem label="备注" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注..."></Input>
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
      <searchTable v-show="openPick" :searchCloumns="searchCloumns" :searchText="searchText" :params="params" @closeUp="closeUp" @changeinput="changeinput" ref="searchTable"></searchTable>
    </transition>
  </div>
</template>
<script>
  import E from 'wangeditor'
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
  import searchTable from '../../../components/searchTable/searchTable'
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
        platKldStateDis: '',
        platKldAuthDis: '',
        platKldTypeDis: '',
        file: '',
        filekey: '',
        loadingStatus: false,
        formValidate: {
          _mt: 'platKnowledge.addOrUpd',
          platKldPublish: '',
          platKldLosttime: '',
          platKldType: '',
          platKldTitle: '',
          platKldState: '02valid',
          platKldAttach: '',
          platKldAuth: '0',
          platKldContent: '',
          platKldNote: '',
          funId: '1',
          logType: '',
        },
        searchText: '知识库分类',
        searchCloumns: [
          {
            title: '知识库类型编码',
            key: 'platKntypeCode',
            sortable: 'custom',
            width: 253,
          },
          {
            title: '知识库类型名称',
            key: 'platKntypeName',
            sortable: 'custom',
            width: 253,
          },
        ],
        params: {
          _mt: 'platKnlType.getPage',
          sort: 'platKntypeCode',
          order: 'asc',
          rows: '10',
          page: '1',
          funId: '1',
          logType: this.$t('button.ser'),
        },
        ruleValidate: {
          platKldPublish: [
            { required: true, type: 'date', message: '生效时间不能为空', trigger: 'change' },
         ],
          platKldOrder: [
            { required: true, message: '知识点序号不能为空', trigger: 'blur' },
          ],
          platKldType: [
            { required: true, message: '知识点类型不能为空', trigger: 'blur' },
          ],
          platKldTitle: [
            { required: true, message: '知识点标题不能为空', trigger: 'blur' },
          ],
          platKldState: [
            { required: true, message: '知识点状态', trigger: 'blur' },
          ],
          platKldContent: [
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
        document.getElementById('txt').value = html
      }
      editor.customConfig.zIndex = 100
      editor.create()
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platKnowledge.getById',
          id: id,
          funId: '1',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.platKldPublish = res.data.content[0].platKldPublish
            t.formValidate.platKldLosttime = res.data.content[0].platKldLosttime
            t.formValidate.platKldOrder = res.data.content[0].platKldOrder
            t.formValidate.platKldType = res.data.content[0].platKldType
            t.platKldTypeDis = res.data.content[0].platKldTypeDis
            t.formValidate.platKldTitle = res.data.content[0].platKldTitle
            t.formValidate.platKldState = res.data.content[0].platKldState
            t.platKldStateDis = res.data.content[0].platKldStateDis
            t.formValidate.platKldAttach = res.data.content[0].platKldAttach
            t.platKldAttachDis = res.data.content[0].platKldAttachDis
            t.formValidate.platKldAuth = res.data.content[0].platKldAuth
            t.formValidate.platKldContent = res.data.content[0].platKldContent
            editor.txt.clear()
            editor.txt.append(t.formValidate.platKldContent)
            t.formValidate.platKldNote = res.data.content[0].platKldNote
            if (res.data.content[0].platKldAttach) {
              t.file = { name: res.data.content[0].platKldAttach.split(':')[0] }
              t.filekey = res.data.content[0].platKldAttach.split(':')[1]
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
        t.formValidate.platKldContent = document.getElementById('txt').value
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            data.platKldPublish = t.formValidate.platKldPublish.format('yyyy-MM-dd')  //  获取发布日期
            data.platKldLosttime = t.formValidate.platKldLosttime.format('yyyy-MM-dd')  //  获取发布日期
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
            t.formValidate.platKldAttach = key + ':' + res.data[key]
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
        t.platKldTypeDis = name
        t.formValidate.platKldType = code
      },
      clear() {
        const t = this
            t.formValidate.platKldPublish = ''
            t.formValidate.platKldLosttime = ''
            t.formValidate.platKldOrder = ''
            t.formValidate.platKldTitle = ''
            t.formValidate.platKldState = ''
            t.platKldStateDis = ''
            t.formValidate.platKldAttach = ''
            t.platKldAttachDis = ''
            t.formValidate.platKldContent = ''
            t.formValidate.platKldNote = ''
            t.formValidate.platKldType = ''
            t.platKldTypeDis = ''
            t.formValidate.platKldAuth = ''
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
    /*height: 560px;*/
    /*overflow-y:auto;*/
    .content{
      overflow-y: auto;
      position: absolute;
      height: 420px;
    }
  }
</style>
