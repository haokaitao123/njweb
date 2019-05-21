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
              <Spin  size="large"
                     fix
                     v-if="spinShow">
              </Spin>
                <Row style="max-height: 420px;overflow-y: auto;" ref="scrollBox">
                    <Form ref="formValidate"
                          :model="formValidate"
                          :rules="ruleValidate"
                          :label-width="100">
                        <i-col span="11">
                          <FormItem label="员工姓名"  prop="empnhName"  >
                            <!--绑定双击清除方法-->
                            <span @dblclick="forbidden?'':dbclean()">
                          <!--v-model绑定显示字段-->
                              <Input v-model="formValidate.empnhName" icon="search" readonly="readonly" :disabled="forbidden" placeholder="请选择员工"  @on-click="forbidden?'':pickEmpData()" />
                            </span>
                          </FormItem>
                        </i-col>

                      <i-col span="11">
                        <FormItem label="证件号码"
                                  prop="empnhIdno">
                          <Input v-model="formValidate.empnhIdno"
                                 disabled="disabled"
                                 placeholder="请输入证件号码"></Input>
                        </FormItem>
                      </i-col>
                        <i-col span="11">
                            <FormItem label="部门"
                                      prop="unitFname">
                                <Input v-model="formValidate.unitFname"
                                       disabled="disabled"
                                       placeholder="请输入部门名称"></Input>
                            </FormItem>
                        </i-col>
                      <i-col span="11">
                        <FormItem label="岗位"
                                  prop="postFname">
                          <Input v-model="formValidate.postFname"
                                 disabled="disabled"
                                 placeholder="请输入岗位名称"></Input>
                        </FormItem>
                      </i-col>
                      <i-col span="22">
                          <FormItem label="试用期评价"
                                    prop="empoffResult">
                              <Input v-model="formValidate.empoffResult"
                                     type="textarea"
                                     :disabled="forbidden"
                                     :autosize="{minRows: 2,maxRows: 5}"
                                     placeholder="请输入试用期评价..."></Input>
                          </FormItem>
                      </i-col>
                      <!--上传下载-->
                      <i-col span="23">
                        <FormItem label="试用期评估表" prop="fileKey">
                          <Row>
                            <i-col span="3" v-show="!forbidden">
                              <Upload :before-upload="handleUpload"  action=" ">
                                <Button  type="ghost" icon="ios-cloud-upload-outline">浏览</Button>
                              </Upload>
                            </i-col>
                            <i-col span="20" >
                             <span v-if="file !== '' " >
                                <i-col span="22"  @dblclick.native="forbidden?'':fileclean()">
                                <Input v-model="file.name" >
                                  <span slot="prepend">
                                    <Icon type="folder" size="16" ></Icon>
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
                                     :disabled="forbidden"
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
          spinShow: false,
          file: '',
          filekey: '',
          loadingStatus: false,
            type: '',
            distype: false,
            forbidden: false,
            formValidate: {
              empnhName : '',
              empnhIdno : '',
              empId : '',
              unitFname : '',
              deptId : '',
              postFname : '',
              postId : ''
            },
            openEmpMaster:false,
          /*必填验证*/
            ruleValidate: {
                empnhName: [
                    { required: true, message: "请选择员工姓名", trigger: "change" },
                ],
                empoffResult: [
                    { required: true, message: "请填写试用期评价结论", trigger: "change" },
                ]
            },
        }
    },
  /*资源加载子页面，js不需要*/
    components: {
        searchEmpMaster,
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    updated () {

    },
    mounted () {
        //this.getSelect("emptype");
    },
    methods: {
      fileclean(){
        const t = this
        t.$Modal.confirm({
          title: '提示',
          content: '请确定删除附件',
          onOk: () => {
            t.formValidate.fileKey = ''
            t.file = ''
            t.filekey = ''
          },
        })

      },
      //上级清除员工选择
      dbclean(){
        const t = this
        t.formValidate.empnhName = '';
        t.formValidate.empnhIdno = '';
        t.formValidate.empId = '';
        t.formValidate.unitFname = '';
        t.formValidate.deptId = '';
        t.formValidate.postFname = '';
        t.formValidate.postId = '';
      },
        getData (id) {
            const t = this
            t.spinShow = true; //开启loading效果
            getDataLevelUserLogin({
                _mt: 'empEmpofficial.getById',
                id: id,
                funId: '1',
                logType: '员工转正id查询',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    console.log(res.data.content[0])
                    t.formValidate = res.data.content[0]
                    if (res.data.content[0].fileKey) {
                      t.formValidate.fileKey = res.data.content[0].fileKey
                      t.file = { name: res.data.content[0].fileKey.split(':')[0] }
                      t.filekey = res.data.content[0].fileKey.split(':')[1]
                    }
                    t.formValidate.note= res.data.content[0].note
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
            }).finally(() => {
              t.spinShow = false; //关闭loading效果
            });
        },
        handleSubmit () { 
            const t = this
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            data._mt = 'empEmpofficial.addOrUpd'

            if (t.logType === '修改') {
                data.id = t.id
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginSenior(data).then((res) => {
                        if (isSuccess(res, t)) {
                            if (t.logType === '新增') {
                                /*t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })*/
                                t.$Message.success('新增成功');
                                t.$emit('getData', res.data.content[0])
                            } else {
                                t.$Message.success('修改成功');
                                t.$emit('update', res.data.content[0])
                            }
                            t.handleReset();
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
        t.formValidate.empnhName = row.empnhName;
        t.formValidate.empnhIdno = row.empnhIdno;
        t.formValidate.empId = row.id;
        t.formValidate.unitFname = row.unitFname;
        t.formValidate.deptId = row.deptId;
        t.formValidate.postFname = row.postFname;
        t.formValidate.postId = row.postId;
      },
      handleReset () {
          this.$refs.formValidate.resetFields()
          this.$refs.scrollBox.$el.scrollTop = '0'
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
            t.formValidate.fileKey = key + ':' + res.data[key]
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
           // debugger
            console.log(pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey))
            if (this.isIE()) {
              window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
            } else {
              let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
              /*let link = document.createElement('a')
              link.href = doclink
              link.download = 'downloadfiletemp'
              link.click()*/
              let link = document.createElement('a')
              link.href = doclink
              link.download = 'downloadfiletemp'
              link.setAttribute('download', 'downloadfiletemp');
              document.body.appendChild(link);
              link.click();
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
