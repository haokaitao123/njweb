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
          <Col span="11" v-show="logType === this.$t('button.upd')">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldOrder')" prop="cmutKldOrder">
            <Input v-model="formValidate.cmutKldOrder" :disabled="true" :placeholder="$t('lang_knowBase.knowlegebase.cmutKldOrderDis')"></Input>
          </FormItem>
          </Col>
          <Col span="11" :offset="logType === this.$t('button.upd') ? 1:0">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldPubcomp')" prop="cmutKldPubcomp">
            <span @dblclick="dbHCompany">
               <Input v-model="cmutKldPubcompDis" icon="search" :readonly="true" :placeholder="$t('lang_knowBase.knowlegebase.cmutKldPubcompDis')"  @on-click="selectHCompany"/>
          </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldPublish')" prop="cmutKldPublish">
            <DatePicker type="date" :placeholder="$t('lang_knowBase.knowlegebase.cmutKldPublishDis')" v-model="formValidate.cmutKldPublish" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldLosttime')">
            <DatePicker type="date" :placeholder="$t('lang_knowBase.knowlegebase.cmutKldLosttimeDis')" v-model="formValidate.cmutKldLosttime" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_knowBase.knowlegebase.publishAuthor')" prop="publishAuthor">
            <Input v-model="formValidate.publishAuthor" :disabled="true"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldType')" prop="cmutKldType">
            <span @dblclick="clear">
                <Input v-model="cmutKldTypeDis" icon="search" :readonly="true" :placeholder="$t('lang_knowBase.knowlegebase.cmutKldTypeDis')"  @on-click="pickData"/>
            </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldTitle')" prop="cmutKldTitle">
            <Input v-model="formValidate.cmutKldTitle" :placeholder="$t('lang_knowBase.knowlegebase.cmutKldTitleDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldTitle')" prop="cmutKldKeyword">
            <Input v-model="formValidate.cmutKldKeyword"  :placeholder="$t('lang_knowBase.knowlegebase.cmutKldTitleDis')"></Input>
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
              <Upload :before-upload="handleUpload" action=" ">
                <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('button.brw')}}</Button>
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
          {{fdsfs}}
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldState')" prop="cmutKldState" >
            <Input v-model="this.cmutKldStateDis" disabled ></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldAuth')" prop="cmutKldAuth">
            <RadioGroup  v-model="formValidate.cmutKldAuth" :placeholder="$t('lang_knowBase.knowlegebase.cmutKldAuthDis')" transfer>
              <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" v-show="formValidate.cmutKldAuth === '1' ? true : false">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldAuthtype')" prop="cmutKldAuthtype" >
            <CheckboxGroup v-model="formValidate.cmutKldAuthtype">
              <Checkbox :label="item.paramCode" v-for="(item,index) in Knowauthtype" :key="index"><span>{{item.paramInfoName}}</span></Checkbox>
            </CheckboxGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_knowBase.knowlegebase.cmutKldNote')" prop="cmutKldNote">
            <Input v-model="formValidate.cmutKldNote"  type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_knowBase.knowlegebase.cmutKldNoteDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23" >
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="close" style="margin-left: 8px">{{$t('button.cle')}}</Button>
              <Button type="primary" v-show="submit" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
    <!--雇佣公司-->
    <transition name="fade">
      <searchHCompany v-show="openHCompany" @closeHCompany="closeHCompany" :searchHCClo="searchHCClo" @inputHCompany="inputHCompany" :params="paramsHCompany" ref="searchHCompany"></searchHCompany>
    </transition>
    <transition name="fade">
      <searchTable v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="closeUp" @changeinput="changeinput" ref="searchTable"></searchTable>
    </transition>
  </div>
</template>
<script>
  import E from 'wangeditor'
  import searchHCompany from '../../../../components/searchTable/searchHCompany'
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../../../axios/axios'
  import searchTable from '../../../../components/searchTable/searchKnowType'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  let editor = new E('#editor')
  export default {
    data() {
      return {
        editShow: false,
        openPick: false,
        cmutKldStateDis: '知识录入',
        cmutKldAuthDis: '',
        cmutKldPubcompDis: '',
        cmutKldTypeDis: '',
        file: '',
        filekey: '',
        loadingStatus: false,
        openHCompany: false,
        currentDate: new Date(),
        formValidate: {
          _mt: 'cmutKnowledge.addOrUpd',
          cmutKldPublish: new Date(),
          cmutKldLosttime: '',
          publishAuthor: '',
          cmutKldType: '',
          cmutKldTitle: '',
          cmutKldAuthtype: [],
          cmutKldState: '',
          cmutKldAttach: '',
          cmutKldPubcomp: '',
          cmutKldKeyword: '',
          cmutKldAuth: '0',
          cmutKldContent: '',
          cmutKldNote: '',
          funId: '1',
          logType: '',
        },
        //      雇佣公司
        searchHCClo: [
          {
            title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.compCnFullName'),
            key: 'compFnameCnDis',
          },
          {
            title: this.$t('lang_employee.searchColumn.compEnFullName'),
            key: 'compFnameEnDis',
          },
        ],
        paramsHCompany: {
          _mt: 'orgUnits.getByOrgFramePageList',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'desc',
          unitType: '01company',
          logType: '雇佣公司',
        },
        // 知识库类型
        searchCloumns: [
          {
            title: this.$t('lang_knowBase.knowlegeType.cmutKntypeCode'),
            key: 'cmutKntypeCode',
            sortable: 'custom',
            width: 253,
          },
          {
            title: this.$t('lang_knowBase.knowlegeType.cmutKntypeName'),
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
          roleType: '3user',
          cmutKntypeBusprop: '01consultation',

        },
        ruleValidate: {
          cmutKldPublish: [
            { required: true, type: 'date', message: this.$t('lang_knowBase.knowlegebase.cmutKldPublishDis'), trigger: 'change' },
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
      searchHCompany,
    },
    updated() {
    },
    mounted() {
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
            if (res.data.content[0].cmutKldAuthtype === undefined || res.data.content[0].cmutKldAuthtype === '') {
              t.formValidate.cmutKldAuthtype = []
            } else {
              t.formValidate.cmutKldAuthtype = res.data.content[0].cmutKldAuthtype.split(',')
            }
            t.cmutKldTypeDis = res.data.content[0].cmutKldTypeDis
            t.formValidate.cmutKldTitle = res.data.content[0].cmutKldTitle
            t.formValidate.cmutKldState = res.data.content[0].cmutKldState
//            t.formValidate.cmutKldState = '04invalid'
            t.cmutKldStateDis = res.data.content[0].cmutKldStateDis
            t.formValidate.cmutKldAttach = res.data.content[0].cmutKldAttach
            t.cmutKldAttachDis = res.data.content[0].cmutKldAttachDis
            t.formValidate.cmutKldPubcomp = res.data.content[0].cmutKldPubcomp
            t.cmutKldPubcompDis = res.data.content[0].cmutKldPubcompDis
            t.formValidate.cmutKldAuth = res.data.content[0].cmutKldAuth
            t.formValidate.createBy = res.data.content[0].createBy
            t.formValidate.publishAuthor = res.data.content[0].publishAuthor // 发布人
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
      // 新增的时候获取，发布者公司
      getPubAuorAndComp() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'cmutKnowledge.getPubAuorAndComp',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.publishAuthor = res.data.content[0].publishAuthor // 发布人
            t.formValidate.cmutKldPubcomp = res.data.content[0].cmutKldPubcomp // 发布者绑定员工的公司
            t.cmutKldPubcompDis = res.data.content[0].cmutKldPubcompDis
            t.cmutKldStateDis = '知识录入'
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
        if (data.cmutKldAuthtype) {
          data.cmutKldAuthtype = data.cmutKldAuthtype.toString()
        }
        data.logType = t.logType
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        data.cmutKldState = '01entry'
        if (data.cmutKldAuth === '0') { // 不控制权限的时候，删除限制
          delete this.ruleValidate.cmutKldAuthtype
        } else {
          this.ruleValidate.cmutKldAuthtype = [
            { required: true, type: 'array', min: 1, message: this.$t('lang_knowBase.knowlegebase.authRemind'), trigger: 'blur' },
          ]
        }
        console.log(t.formValidate.cmutKldPublish)
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            data.cmutKldPublish = t.formValidate.cmutKldPublish.format('yyyy-MM-dd')  //  获取发布日期
            if (t.formValidate.cmutKldLosttime) {
              data.cmutKldLosttime = t.formValidate.cmutKldLosttime.format('yyyy-MM-dd')
            }
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
      //  	雇佣公司
      selectHCompany() {
        const t = this
        t.$refs.searchHCompany.getData(this.paramsHCompany)
        t.openHCompany = true
      },
      closeHCompany() {
        const t = this
        t.$refs.searchHCompany.unitCode = ''
        t.openHCompany = false
      },
      inputHCompany(name, id) {
        const t = this
        t.cmutKldPubcompDis = name
        t.formValidate.cmutKldPubcomp = id
      },
      dbHCompany() {
        const t = this
        t.cmutKldPubcompDis = ''
        t.formValidate.cmutKldPubcomp = ''
      },
      // 选择知识库类型
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
        t.formValidate.cmutKldPubcomp = ''
        t.cmutKldPubcompDis = ''
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
