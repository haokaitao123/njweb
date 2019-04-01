<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <div class="option-main">
                <Row style="max-height: 420px;overflow-y: auto;">
                    <Form ref="formValidate"
                          :model="formValidate"
                          :rules="ruleValidate"
                          :label-width="100">
                        <i-col span="11">
                          <FormItem label="员工姓名"  prop="empIdName"  >
                            <!--绑定双击清除方法-->
                            <span @dblclick="dbclean">
                          <!--v-model绑定显示字段-->
                              <Input v-model="formValidate.empIdName" icon="search" readonly="readonly" placeholder="请选择员工"  @on-click="pickEmpData" />
                        </span>
                          </FormItem>
                        </i-col>

                      <i-col span="11">
                        <FormItem label="证件号码"
                                  prop="empIdIden">
                          <Input v-model="formValidate.empIdIden"
                                 readonly="readonly"
                                 placeholder="请输入证件号码"></Input>
                        </FormItem>
                      </i-col>
                        <i-col span="11">
                            <FormItem label="部门"
                                      prop="deptIdDis">
                                <Input v-model="formValidate.deptIdDis"
                                       readonly="readonly"
                                       placeholder="请输入部门名称"></Input>
                            </FormItem>
                        </i-col>
                      <i-col span="11">
                        <FormItem label="岗位"
                                  prop="postIdDis">
                          <Input v-model="formValidate.postIdDis"
                                 readonly="readonly"
                                 placeholder="请输入岗位名称"></Input>
                        </FormItem>
                      </i-col>
                      <i-col span="22">
                          <FormItem label="试用期评价结论"
                                    prop="empoffResult">
                              <Input v-model="formValidate.empoffResult"
                                     type="textarea"
                                     :readonly="forbidden"
                                     :autosize="{minRows: 2,maxRows: 5}"
                                     placeholder="请输入试用期评价结论..."></Input>
                          </FormItem>
                      </i-col>
                      <!--上传下载-->
                      <i-col span="23">
                        <FormItem label="试用期评估表" prop="empoffDocument">
                          <Row>
                            <i-col span="3">
                              <Upload :before-upload="handleUpload" action=" ">
                                <Button type="ghost" icon="ios-cloud-upload-outline">浏览</Button>
                              </Upload>
                            </i-col>
                            <i-col span="20" offset="1">
                             <span v-if="file !== '' ">
                              <i-col span="22">
                              <Input v-model="file.name" readonly="readonly" >
                                <span slot="prepend">
                                  <Icon type="folder" size="16"></Icon>
                                </span>
                              </Input>
                              </i-col>
                              <i-col span="2">
                                <Button type="text" v-show="!forbidden" @click="uploadLocalFile" v-if="loadingStatus">
                                  上传
                                </Button>
                                <Button type="text"  @click="downloadFile" v-if="!loadingStatus">
                                  下载
                                </Button>
                             </i-col>
                             </span>
                            </i-col>
                          </Row>
                        </FormItem>
                      </i-col>
                      <i-col span="22">
                          <FormItem label="备注"
                                    prop="note">
                              <Input v-model="formValidate.note"
                                     type="textarea"
                                     :readonly="forbidden"
                                     :autosize="{minRows: 2,maxRows: 5}"
                                     placeholder="请输入备注..."></Input>
                          </FormItem>
                      </i-col>
                    </Form>
                </Row>
            </div>
            <Button type="ghost"
                    @click="handleReset"
                    class="btn1">{{$t('button.cal')}}</Button>
            <Button type="primary" v-show="!forbidden"
                    @click="handleSubmit"
                    class="btn">{{$t('button.sav')}}</Button>
        </div>
      <!--一个弹出框一个transition-->
      <transition name="fade">
        <searchEmpMaster v-show="openEmpMaster" @closeEmp="closeEmp" @inputEmp="inputEmp" ref="searchEmpMaster"></searchEmpMaster>
      </transition>
        <!--<transition name="fade">
            <searchCity v-show="openPick"
                        :searchCloumns="searchCloumns"
                        :params="params"
                        @closeUp="close"
                        @changeinput="changeinput"
                        ref="searchCity"></searchCity>
        </transition>-->

    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin,uploadFile } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchEmpMaster from '../../../components/searchTable/searchEmpnhMaster'

export default {
    data () {
        return {
          file: '',
          filekey: '',
          loadingStatus: false,
            type: '',
            distype: false,
            forbidden: false,
            formValidate: {
                _mt: 'empEmpofficial.addOrUpd', //新增接口url
                empId:'',
                empIdName: '',//员工姓名
                empIdIden: '',//证件号码
                deptIdDis: '',//部门
                deptId:'',//部门id
                postIdDis: '',//岗位
                postId:'',//岗位id
                empoffResult: '',//评价结果
                empoffDocument:'',//评估表
                note: '',//备注
                funId: '1',
                logType: '',
            },
            openEmpMaster:false,
          /*必填验证*/
            ruleValidate: {
                empIdName: [
                    { required: true, message: "请选择员工姓名", trigger: 'change' },
                ],
                empoffResult: [
                    { required: true, message: "请填写试用期评价结论", trigger: 'blur' },
                ]
            },
        }
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
  /*资源加载子页面，js不需要*/
    components: {
        searchEmpMaster,
    },
    updated () {

    },
    mounted () {
        //this.getSelect("emptype");
    },
    methods: {
      //上级清除员工选择
      dbclean(){
        const t = this
        t.formValidate.empIdName = '';
        t.formValidate.empIdIden = '';
        t.formValidate.empId = '';
        t.formValidate.deptIdDis = '';
        t.formValidate.deptId = '';
        t.formValidate.postIdDis = '';
        t.formValidate.postId = '';
      },
        getData (id) {
            const t = this
            getDataLevelUserLogin({
                _mt: 'empEmpofficial.getById',
                id: id,
                funId: '1',
                logType: '员工转正id查询',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    console.log(res.data.content[0])
                    t.formValidate.empId = res.data.content[0].empId
                    t.formValidate.empIdName = res.data.content[0].empIdName
                    t.formValidate.empIdIden= res.data.content[0].empIdIden
                    t.formValidate.deptIdDis= res.data.content[0].deptIdDis
                    t.formValidate.deptId= res.data.content[0].deptId
                    t.formValidate.postId= res.data.content[0].postId
                    t.formValidate.postIdDis= res.data.content[0].postIdDis
                    t.formValidate.empoffResult= res.data.content[0].empoffResult
                  //alert(res.data.content[0].empoffDocument)
                  //debugger
                    if (res.data.content[0].empoffDocument) {
                      t.formValidate.empoffDocument = res.data.content[0].empoffDocument
                      t.file = { name: res.data.content[0].empoffDocument.split(':')[0] }
                      t.filekey = res.data.content[0].empoffDocument.split(':')[1]
                    }
                    t.formValidate.note= res.data.content[0].note
                  //debugger
                    if (t.logType === '查看') {
                        t.forbidden = true
                        t.distype = true
                    } else {
                      t.forbidden = false
                        t.distype = false
                    }
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.logType = t.logType

            if (t.logType === this.$t('button.upd')) {
                data.id = t.id
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginSenior(data).then((res) => {
                        if (isSuccess(res, t)) {
                            t.$emit('closeUp')
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
      /*选择员工*/
      pickEmpData() {
        const t = this;
        t.$refs.searchEmpMaster.getData();
        t.openEmpMaster = true;
      },
      closeEmp() {
        const t = this
        t.openEmpMaster = false
      },
      inputEmp(row) {
        const t = this
        t.formValidate.empIdName = row.empnhName;
        t.formValidate.empIdIden = row.empnhIdno;
        t.formValidate.empId = row.id;
        t.formValidate.deptIdDis = row.deptIdDis;
        t.formValidate.deptId = row.deptId;
        t.formValidate.postIdDis = row.postIdDis;
        t.formValidate.postId = row.postId;
      },
      handleReset () {
          this.$refs.formValidate.resetFields()
          this.$emit('closeUp')
      },
      handleUpload(file) {
        this.file = file
        this.loadingStatus = true
        return false
      },
      uploadLocalFile() {
        const t = this
        const formData = new FormData()
        formData.append('upfile', t.file)
        console.log(formData)
        uploadFile(formData).then(res => {
          for (const key in res.data) {
            t.file =  { name: key }
            t.filekey = res.data[key]
            t.formValidate.empoffDocument = key + ':' + res.data[key]
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
      downloadFile() {
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
    },
    watch: {
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
.option-main {
  position: relative;
  height: 500px;
}
.btn {
  position: absolute;
  bottom: 20px;
  right: 60px;
}
.btn1 {
  position: absolute;
  bottom: 20px;
  right: 124px;
}
</style>
