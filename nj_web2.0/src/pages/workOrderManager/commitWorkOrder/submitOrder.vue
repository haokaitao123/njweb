<!--负责任务-->
<template>
  <Row>
    <div class="WODiv" :style="{height:woheight + 'px'}">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <FormItem :label="$t('lang_communication.allotWorkOrder.cmwdType')" style="margin-bottom: 10px">
            <span>{{this.$store.state.workOrder.cmutKntypeName}}</span>
          </FormItem>
        </Row>
        <Row>
          <FormItem :label="$t('lang_communication.allotWorkOrder.cmwdPriority')" style="margin-bottom: 10px">
            <RadioGroup v-model="formValidate.cmwdPriority">
              <Radio :label="item.paramCode" :disabled="disableShow" v-for="(item,index) in cmwdPriorityYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
            <Card>
              <div v-if="formValidate.cmwdPriority === '01common'">{{$t('lang_communication.commitWorkOrder.priorityCommon')}}</div>
              <div v-if="formValidate.cmwdPriority === '02Important'">{{$t('lang_communication.commitWorkOrder.priorityImport')}}</div>
            </Card>
          </FormItem>
        </Row>
        <Row v-if="formValidate.cmwdPriority === '02Important'">
          <FormItem :label="$t('lang_communication.commitWorkOrder.impportReason')" prop="cmwdImportantreason" style="margin-bottom: 10px">
            <Input  type="textarea" :disabled="disableShow" v-model="formValidate.cmwdImportantreason" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_communication.commitWorkOrder.impportReasonDis')"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem :label="$t('lang_communication.allotWorkOrder.cmwdDesc')" prop="cmwdDesc" style="margin-bottom: 20px">
            <Input  type="textarea" :disabled="disableShow" v-model="formValidate.cmwdDesc" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_communication.workorderSearch.cmwdrdDescDis')"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem :label="$t('lang_communication.handleWorkOrder.cmwdConfidentialinfo')" style="margin-bottom: 10px">
            <Input  type="textarea" :disabled="disableShow" v-model="formValidate.cmwdConfidentialinfo" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_communication.workorderSearch.cmwdrdConfidentialinfoDis')"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem :label="$t('lang_communication.allotWorkOrder.cmwdExpfeedbacktime')" prop="cmwdExpfeedbacktime" style="margin-bottom: 20px">
            <DatePicker type="date" :disabled="disableShow" :options="optionsf" v-model="formValidate.cmwdExpfeedbacktime" :placeholder="$t('lang_communication.allotWorkOrder.cmwdExpfeedbacktime')" style="width: 260px;"></DatePicker>
          </FormItem>
        </Row>
        <Row>
          <FormItem :label="$t('lang_communication.allotWorkOrder.cmwdMobile')" prop="cmwdMobile" style="margin-bottom: 20px">
            <Input :placeholder="$t('lang_communication.commitWorkOrder.cmwdMobileDis')" :disabled="disableShow" v-model="formValidate.cmwdMobile" style="width: 260px;"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem :label="$t('lang_communication.commitWorkOrder.cmwdSmsprom')" style="margin-bottom: 10px">
            <RadioGroup v-model="formValidate.cmwdSmsprom" :disabled="disableShow">
              <Radio :label="item.paramCode" v-for="(item,index) in cmwdSmspromYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <FormItem :label="$t('lang_communication.commitWorkOrder.email')" prop="cmwdMail" style="margin-bottom: 20px">
            <Input :placeholder="$t('lang_communication.commitWorkOrder.emailDis')" :disabled="disableShow" v-model="formValidate.cmwdMail" style="width: 260px;"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem :label="$t('lang_communication.handleWorkOrder.UploadAttach')" class="updFJ" style="margin-bottom: 10px">
            <Upload action="1" :before-upload="handleUpload">
              <Button type="ghost" icon="ios-cloud-upload-outline" :disabled="disableShow">{{$t('lang_communication.handleWorkOrder.UploadAttach')}}</Button>
            </Upload>
            <div v-for="(item,index) in fileList" :key="index" class="upBtn">
              {{item.fName}}
              <Button type="text" size="small" @click="deleteFile(item)">{{$t('button.del')}}</Button>
            </div>
            <div v-for="(item,index) in imgList" :key="index" class="upBtn">
              <img :src="item.upUrl" style="width: 50px;height: 50px;" @click="lookBig(item)">
              <Button type="text" size="small" @click="deleteFile(item)">{{$t('button.del')}}</Button>
            </div>
            <div style="color: firebrick;height: 22px;">{{$t('lang_communication.workorderSearch.uploadCondition1')}}</div>
            <div style="height: 22px;color: #808080;">{{$t('lang_communication.workorderSearch.uploadCondition2')}}</div>
          </FormItem>
        </Row>
        <Row>
          <FormItem style="margin-bottom: 10px">
            <Button type="primary" :disabled="disableShow" @click="save">{{$t('button.subm')}}</Button>
          </FormItem>
        </Row>
        <Modal :title="$t('lang_communication.allotWorkOrder.browerImage')" v-model="visible" width="600" :styles="{top: '20px'}">
          <img :src="imgItem" v-if="visible" style="width: 100%">
          <div slot="footer">
            <div style="display: flex;justify-content: flex-end;">
				        		<span>
				        			<Button type="primary" @click="visible = false">{{$t('button.clo')}}</Button>
				        		</span>
            </div>
          </div>
        </Modal>
      </Form>
    </div>
  </Row>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLoginSenior, getDataLevelUserLoginId, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import Bus from '../bus'
  export default{
    data() {
      return {
        woheight: document.body.offsetHeight - 240,
        disableShow: false,
        formValidate: {
          cmwdPriority: '01common',
          cmwdImportantreason: '',
          cmwdDesc: '',
          cmwdConfidentialinfo: '',
          cmwdExpfeedbacktime: '',
          cmwdMobile: '',
          cmwdSmsprom: '01anytime',
          cmwdMail: '',
          cmwdAttach: '',
          cmwdMarkno: '',
        },
        showSubmit: false, //提交显示隐藏
        cmwdPriorityYesOrNo: [],
        cmwdSmspromYesOrNo: [],
//	      	cmwdExpfeedbacktimeYesOrNo: [],
        updName: '',
        file: '',
        attachArr: [],
        attachArr2: [],
        fileList: [],
        imgList: [],
        imgList2: [],
        filekey: '',
        fileArr: [],
        imgItem: '',
        visible: false,
        ruleValidate: {
          cmwdDesc: [
            { required: true, message: this.$t('lang_communication.commitWorkOrder.cmwdDescDis'), trigger: 'blur' },
          ],
          cmwdExpfeedbacktime: [
            { required: true, type: 'date', message: this.$t('lang_communication.commitWorkOrder.cmwdExpfeedbacktimeDis'), trigger: 'change' },
          ],
          cmwdMobile: [
            { required: true, message: this.$t('lang_communication.commitWorkOrder.cmwdMobileDis'), trigger: 'blur' },
          ],
          cmwdMail: [
            { required: true, message: this.$t('lang_communication.commitWorkOrder.emailDis'), trigger: 'blur' },
          ],
          cmwdImportantreason: [
            { required: true, message: this.$t('lang_communication.commitWorkOrder.cmwdImportantreasonDis'), trigger: 'blur' },
          ],
        },
        optionsf: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000
          },
        },
        fx: 0,
        iy: 0,
        iy2: 0,
      }
    },
    computed: {
      list() {
        return this.$store.state.workOrder.issueListDataOneList
      },
    },
    components: {
    },
    mounted() {
      this.getSelect()
      this.getUserById()
      Bus.$on('change', () => {
        this.formValidate.cmwdConfidentialinfo = ''
        this.formValidate.cmwdDesc = ''
        this.formValidate.cmwdImportantreason = ''
        this.formValidate.cmwdExpfeedbacktime = ''
        this.formValidate.cmwdMarkno = ''
        this.formValidate.id = ''
        this.showSubmit = false
      })
    },
    methods: {
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'workorderpriority,workordersmstime',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.cmwdPriorityYesOrNo = res.data.content[0].value[0].paramList
            t.cmwdSmspromYesOrNo = res.data.content[0].value[1].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getUserById() {
        const t = this
        const data = {
          _mt: 'userMgmt.getuserbyid',
          logType: '查询个人信息',
          id: t.$store.state.user.userId,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.cmwdMobile = res.data.content[0].mobileNo
            t.formValidate.cmwdMail = res.data.content[0].email
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleUpload(file) {
        const t = this
        if (file.size > 8388608) {
          t.$Message.error({
            content: this.$t('lang_communication.handleWorkOrder.errReminder'),
            duration: 2,
          })
          return false
        }
        t.updName = file.name
        const fileName = file.name
        let fileType = fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase()
        if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
          t.file = file
          t.uploadFile1()
        } else {
          t.$Message.error({
            content: this.$t('lang_communication.handleWorkOrder.errReminder2'),
            duration: 2,
          })
        }
        return false
      },
      uploadFile1() {
        const t = this
        const formData = new FormData()
        let kName
        let vName
        let fileType = t.file.name.slice(t.file.name.lastIndexOf('.') + 1).toLowerCase()
        formData.append('upfile', t.file)
        uploadFile(formData).then(res => {
          for (let i in res.data) {
            kName = i
            vName = res.data[i]
          }
          if (t.fileArr.length < 5) {
            t.fileArr.push('file') //记录上传数量
            if (fileType === 'png' || fileType === 'jpg' || fileType === 'gif' || fileType === 'jpeg') {
              t.download(vName)
              t.imgList2.push({
                fName: kName,
                fKey: vName,
                index: t.iy2 += 1
              })
            } else {
              t.fileList.push({
                fName: kName,
                fKey: vName,
                index: t.fx += 1
              })
            }
          } else {
            this.$Message.warning(this.$t('lang_communication.handleWorkOrder.uploadCondition1'));
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      deleteFile(item) {
        const t = this
        if (item.upUrl) { //图片数组
          for (let i = 0; i < t.imgList.length; i++) {
            if (item.index === t.imgList[i].index) {
              t.imgList.splice(i, 1)
              t.imgList2.splice(i, 1)
              t.fileArr.splice(0, 1)
            }
          }
        } else { //文件数组
          for (let x = 0; x < t.fileList.length; x++) {
            if (item.index === t.fileList[x].index) {
              t.fileList.splice(x, 1)
              t.fileArr.splice(0, 1)
            }
          }
        }
      },
      download(vName) {
        const t = this
        let data = {
          _mt: 'userMgmt.getfiletoken',
          isprivate: true,
          logType: '下载公告消息',
          filekey: vName,
          expiresecs: 180,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            t.imgList.push({
              upUrl: pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(vName),
              index: t.iy += 1
            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      lookBig(tItem) {
        const t = this
        t.imgItem = tItem.upUrl
        t.visible = true
      },
      save() {
        const t = this
//        t.attachArr2 = []
//        t.attachArr = t.fileList.concat(t.imgList2)
//        for (let i = 0; i < t.attachArr.length; i++) {
//          t.attachArr2.push({
//            cumtAttach: t.attachArr[i].fName + ':' + t.attachArr[i].fKey
//          })
//        }
//        for (let i = 0; i < t.attachArr2.length; i++) {
//          t.formValidate.cmwdAttach += t.attachArr2[i].cumtAttach + '|'
//        }
//        t.formValidate.cmwdAttach = t.formValidate.cmwdAttach.substring(0, t.formValidate.cmwdAttach.length - 1)
//        t.formValidate.cmwdExpfeedbacktime = new Date(t.formValidate.cmwdExpfeedbacktime).format('yyyy-MM-dd')
//        const data = deepCopy(t.formValidate)
//        data['_mt'] = 'cmutWorkorder.addOrUpd'
//        data['cmwdStatus'] = '01waiting'
//        data['cmwdAuthor'] = t.$store.state.user.userId
//        data['logType'] = '提交工单'
//        data['cmwdProperty'] = '01manual'
//        data['cmwdType'] = t.$store.state.workOrder.orderTypeId
//        data['cmwdWotypeprop'] = t.$store.state.workOrder.cmutKntypeBusprop   //  进入第一步时返回的工单状态 01consultation 还是 02busprocess
//        if (this.list.cmutKntypeBusprop === '02busprocess') {
//          data['cmwdStatus'] = '0201open-distribute'    // 传入一个死值 cmwdStatus:'01waiting"
//        } else {
//          data['cmwdStatus'] = '01waiting'
//        }
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            t.attachArr2 = []
            t.attachArr = t.fileList.concat(t.imgList2)
            for (let i = 0; i < t.attachArr.length; i++) {
              t.attachArr2.push({
                cumtAttach: t.attachArr[i].fName + ':' + t.attachArr[i].fKey
              })
            }
            for (let i = 0; i < t.attachArr2.length; i++) {
              t.formValidate.cmwdAttach += t.attachArr2[i].cumtAttach + '|'
            }
            t.formValidate.cmwdAttach = t.formValidate.cmwdAttach.substring(0, t.formValidate.cmwdAttach.length - 1)
            t.formValidate.cmwdExpfeedbacktime = new Date(t.formValidate.cmwdExpfeedbacktime).format('yyyy-MM-dd')
            const data = deepCopy(t.formValidate)
            data['_mt'] = 'cmutWorkorder.addOrUpd'
            data['cmwdStatus'] = '01waiting'
            data['cmwdAuthor'] = t.$store.state.user.userId
            data['logType'] = '提交工单'
            data['cmwdProperty'] = '01manual'
            data['cmwdType'] = t.$store.state.workOrder.orderTypeId
            data['cmwdWotypeprop'] = t.$store.state.workOrder.cmutKntypeBusprop   //  进入第一步时返回的工单状态 01consultation 还是 02busprocess
            if (this.list.cmutKntypeBusprop === '02busprocess') {
              data['cmwdStatus'] = '0201open-distribute'    // 传入一个死值 cmwdStatus:'01waiting"
            } else {
              data['cmwdStatus'] = '01waiting'
            }
            for (const dat in data) {
              if (data[dat] === '') {
                delete data[dat]
              }
            }
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$Message.success({
                  content: this.$t('lang_communication.commitWorkOrder.saveRemind'),
                  duration: 3
                })
                t.$refs.formValidate.resetFields()
                t.getUserById()
                t.formValidate.cmwdConfidentialinfo = ''
                t.attachArr = []
                t.attachArr2 = []
                t.fileList = []
                t.imgList = []
                t.imgList2 = []
                t.fileArr = []
                Bus.$emit('closeAll', true)
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
      wczhqh(pRow) {
        //切换到详情页面
        this.$store.commit('workOrder/setOrderTemp', 'detail')
        //提交详情信息
        this.$store.commit('workOrder/seachOrderDetail', pRow)
        //切换到评价或反馈
        if(pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus7')) {
          this.$store.commit('workOrder/setOnlyRecord', true)
          this.$store.commit('workOrder/setBackOrEvalu', false)
        } else if (pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus8')) {
          this.$store.commit('workOrder/setOnlyRecord', false)
          this.$store.commit('workOrder/setBackOrEvalu', false)
        } else {
          this.$store.commit('workOrder/setBackOrEvalu', true)
          this.$store.commit('workOrder/setOnlyRecord', true)
        }
        //切换步骤条状态
        if (pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus9')) {
          this.$store.commit('workOrder/setStepStaus', 0) //第一步
          this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus1'))
          this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus10'))
          this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus11'))
          this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepContent1', this.$t('lang_communication.workStatus.content1'))
          this.$store.commit('workOrder/setStepContent2', '')
          this.$store.commit('workOrder/setStepContent3', '')
          this.$store.commit('workOrder/setStepContent4', '')
        } else if (pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus5') ||
                    pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus6') ||
                    pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus7')) {
          this.$store.commit('workOrder/setStepStaus', 2) //第三步
          this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus12'))
          this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus13'))
          this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus11'))
          this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepContent1', '')
          this.$store.commit('workOrder/setStepContent2', '')
          this.$store.commit('workOrder/setStepContent3', pRow.cmwdStatusDis)
          this.$store.commit('workOrder/setStepContent4', '')
        } else if (pRow.cmwdStatusDis === this.$t('lang_communication.workStatus.cmwdStatus8')) {
          this.$store.commit('workOrder/setStepStaus', 3) //第四步
          this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus12'))
          this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus13'))
          this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus14'))
          this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepContent1', '')
          this.$store.commit('workOrder/setStepContent2', '')
          this.$store.commit('workOrder/setStepContent3', '')
          this.$store.commit('workOrder/setStepContent4', this.$t('lang_communication.workStatus.content2'))
        } else {
          this.$store.commit('workOrder/setStepStaus', 1) //第二步
          this.$store.commit('workOrder/setStepTitle1', this.$t('lang_communication.workStatus.cmwdStatus12'))
          this.$store.commit('workOrder/setStepTitle2', this.$t('lang_communication.workStatus.cmwdStatus10'))
          this.$store.commit('workOrder/setStepTitle3', this.$t('lang_communication.workStatus.cmwdStatus11'))
          this.$store.commit('workOrder/setStepTitle4', this.$t('lang_communication.workStatus.cmwdStatus8'))
          this.$store.commit('workOrder/setStepContent1', '')
          this.$store.commit('workOrder/setStepContent2', pRow.cmwdStatusDis)
          this.$store.commit('workOrder/setStepContent3', '')
          this.$store.commit('workOrder/setStepContent4', '')
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .hIssue div{
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-size: 15px;
    background: #EFEFEF;
  }
  .WODiv{
    /*border: solid 1px #DDDDDD;*/
    overflow: auto;
    padding: 0px 20px 20px 20px;
  }
  .WODiv .ivu-row{
    /*margin-left: 5%;*/
    width: 70%;
  }
  .upBtn button{
    color: #3399FF;
    margin-left: 10px;
  }
  .updFJ div img:hover{
    border: dashed 1px #19be6b;
    cursor: pointer;
  }

</style>
