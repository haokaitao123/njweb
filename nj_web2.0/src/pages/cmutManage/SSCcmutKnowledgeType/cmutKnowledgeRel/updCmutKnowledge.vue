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
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldOrder')" prop="cmutKldOrder">
            <Input v-model="formValidate.cmutKldOrder" disabled :readonly="true" :placeholder="$t('lang_knowBase.knowlegebase.cmutKldOrder')"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldPubcomp')" prop="cmutKldPubcomp">
            <Input v-model="cmutKldPubcompDis" icon="search" disabled :readonly="true" :placeholder="$t('lang_knowBase.knowlegebase.cmutKldPubcompDis')" />
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldPublish')" prop="cmutKldPublish">
            <DatePicker type="date" disabled :readonly="true" :placeholder="$t('lang_knowBase.knowlegebase.cmutKldPublishDis')" v-model="formValidate.cmutKldPublish" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldLosttime')">
            <DatePicker type="date" disabled :readonly="true" :placeholder="$t('lang_knowBase.knowlegebase.cmutKldLosttimeDis')" v-model="formValidate.cmutKldLosttime" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_knowBase.knowlegebase.publishAuthor')" prop="publishAuthor">
            <Input v-model="formValidate.publishAuthor" disabled :readonly="true"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldType')" prop="cmutKldType">
            <span >
                <Input v-model="cmutKldTypeDis" icon="search" disabled :readonly="true" :placeholder="$t('lang_knowBase.knowlegebase.cmutKldTypeDis')" />
            </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldTitle')" prop="cmutKldTitle">
            <Input v-model="formValidate.cmutKldTitle" disabled  :placeholder="$t('lang_knowBase.knowlegebase.cmutKldTitleDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldKeyword')" prop="cmutKldKeyword">
            <Input v-model="formValidate.cmutKldKeyword" disabled  :placeholder="$t('lang_knowBase.knowlegebase.cmutKldKeywordDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row style="margin-right: 30px;">
          <col span="23" >
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldContent')" prop="cmutKldContent" >
            <div id="editor"></div>
            <div id="txt" v-show="editShow"></div>
          </FormItem>
          </col>
        </Row>
        <Row>
          <Col span="24">
            <Col span="6">
            <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldAttach')" prop="cmutKldAttach">
                <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('button.brw')}}</Button>
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
				        		{{$t('button.upl')}}
				        	</Button>
				        	<Button type="text"   @click="uploadFile2" v-if="!loadingStatus">
				        		{{$t('button.dwl')}}
				        	</Button>
               </Col>
               </span>
              </Row>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldOrder')" prop="cmutKldState"  >
            <Select  disabled v-model="formValidate.cmutKldState" :placeholder="$t('lang_knowBase.knowlegebase.cmutKldOrder')" transfer>
              <Option  :value="item.paramCode" v-for="(item,index) in knowledgeStatus" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
            <!--<Select  disabled suffix  v-model="formValidate.cmutKldState"  :placeholder="选择知识点状态" transfer>-->
              <!--<Option  value="01entry">知识录入</Option>-->
            <!--</Select>-->
          </FormItem>
          </Col>
          <!--<Col span="11" v-else>-->
            <!--<Input v-model="formValidate.cmutKldState" :placeholder="知识录入" style="width: 200px" />-->
          <!--</Col>-->
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldOrder')" prop="cmutKldAuth">
            <RadioGroup v-model="formValidate.cmutKldAuth" disabled :placeholder="$t('lang_knowBase.knowlegebase.cmutKldOrder')" transfer>
              <Radio :disabled="true" :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" v-show="formValidate.cmutKldAuth === '1' ? true : false">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldOrder')" prop="cmutKldAuthtype" >
            <CheckboxGroup v-model="formValidate.cmutKldAuthtype">
              <Checkbox :label="item.paramCode" :disabled="true" v-for="(item,index) in Knowauthtype" :key="index"><span>{{item.paramInfoName}}</span></Checkbox>
            </CheckboxGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldOrder')" prop="cmutKldNote">
            <Input v-model="formValidate.cmutKldNote" type="textarea" disabled :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_knowBase.knowlegebase.cmutKldOrder')"></Input>
          </FormItem>
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
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../../../axios/axios'
  import searchTable from '../../../../components/searchTable/searchKnowType'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  let editor = new E('#editor')
  export default {
    data() {
      return {
        editShow: false,
        openPick: false,
        cmutKldStateDis: '',
        cmutKldAuthDis: '',
        cmutKldTypeDis: '',
        cmutKldPubcompDis: '',
        file: '',
        filekey: '',
        loadingStatus: false,
        formValidate: {
          _mt: 'cmutKnowledge.addOrUpd',
          cmutKldPublish: '',
          publishAuthor: '',
          cmutKldAuthtype: [],
          cmutKldPubcomp: '',
          cmutKldLosttime: '',
          cmutKldType: '',
          cmutKldTitle: '',
          cmutKldState: '01entry',
          cmutKldAttach: '',
          cmutKldAuth: '0',
          cmutKldContent: '',
          cmutKldKeyword: '',
          cmutKldNote: '',
          funId: '1',
          logType: '',
        },
        searchCloumns: [
          {
            title: this.$t('lang_knowBase.knowlegebase.cmutKntypeCode'),
            key: 'cmutKntypeCode',
            sortable: 'custom',
            width: 253,
          },
          {
            title: this.$t('lang_knowBase.knowlegebase.cmutKntypeName'),
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
            { required: true, type: 'date', message: this.$t('lang_knowBase.knowlegebase.cmutKldPublishDis'), trigger: 'change' },
         ],
          cmutKldOrder: [
            { required: true, message: this.$t('lang_knowBase.knowlegebase.cmutKldOrderDis'), trigger: 'blur' },
          ],
          cmutKldType: [
            { required: true, message: this.$t('lang_knowBase.knowlegebase.cmutKldTypeDis'), trigger: 'blur' },
          ],
          cmutKldTitle: [
            { required: true, message: this.$t('lang_knowBase.knowlegebase.cmutKldTitleDis'), trigger: 'blur' },
          ],
          cmutKldKeyword: [
            { required: true, message: this.$t('lang_knowBase.knowlegebase.cmutKldKeywordDis'), trigger: 'blur' },
          ],
          cmutKldState: [
            { required: true, message: this.$t('lang_knowBase.knowlegebase.cmutKldStateDis'), trigger: 'blur' },
          ],
          cmutKldContent: [
            { required: true, message: this.$t('lang_knowBase.knowlegebase.cmutKldContentDis'), trigger: 'blur' },
          ],
          cmutKldPubcomp: [
            { required: true, message: this.$t('lang_knowBase.knowlegebase.cmutKldPubcompDis'), trigger: 'blur' },
          ],
          cmutKldAuthtype: [
            { required: true, type: 'array', min: 1, message: this.$t('lang_knowBase.knowlegebase.cmutKldAuthtypeDis'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
      knowledgeStatus: Array,
      yesno: Array,
      knowledgeType: Array,
      submit: Boolean,
      Knowauthtype: Array, // 权限类型
    },
    components: {
      searchTable,
    },
    updated() {

    },
    mounted() {
//      this.getSelect()
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
//            t.formValidate.cmutKldState = '04invalid'
            if (res.data.content[0].cmutKldAuthtype === undefined || res.data.content[0].cmutKldAuthtype === '') {
              t.formValidate.cmutKldAuthtype = []
            } else {
              t.formValidate.cmutKldAuthtype = res.data.content[0].cmutKldAuthtype.split(',')
            }
            t.formValidate.cmutKldPubcomp = res.data.content[0].cmutKldPubcomp
            t.cmutKldPubcompDis = res.data.content[0].cmutKldPubcompDis
            t.formValidate.publishAuthor = res.data.content[0].publishAuthor // 发布人
            t.cmutKldStateDis = res.data.content[0].cmutKldStateDis
            t.formValidate.cmutKldAttach = res.data.content[0].cmutKldAttach
            t.cmutKldAttachDis = res.data.content[0].cmutKldAttachDis
            t.formValidate.cmutKldAuth = res.data.content[0].cmutKldAuth
            t.formValidate.cmutKldContent = res.data.content[0].cmutKldContent
            t.formValidate.cmutKldKeyword = res.data.content[0].cmutKldKeyword
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
            content: this.$t('reminder.uploadsuccess'),
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
            localStorage.pageOpenedListAll = localStorage.pageOpenedList
            window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
            this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
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
        t.formValidate.cmutKldKeyword = ''
        t.file = ''
        editor.txt.clear()
        t.$refs.formValidate.resetFields()
      },
      close() {
        const t = this
        t.clear()
        t.submit = true
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
  @import "../../../../sass/updateAndAdd";
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
