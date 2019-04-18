<template>
  <div class="option-main">
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="100">
        <i-col span="11">
          <FormItem label="员工姓名"  prop="empId"  >
            <!--绑定双击清除方法-->
            <span @dblclick="dbclean()">
              <!--v-model绑定显示字段-->
              <Input v-model="empName" icon="search" readonly="readonly" :disabled="disabled" placeholder="请选择员工"  @on-click="pickUserData()" />
            </span>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="部门"
                    prop="deptId">
            <Input v-model="deptIdName"
                   disabled="disabled"
                   placeholder="请输入部门名称"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="岗位"
                    prop="postId">
            <Input v-model="postName"
                   disabled="disabled"
                   placeholder="请输入岗位名称"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="证件号码" prop="empnhIdno">
            <Input v-model="formValidate.empnhIdno"
                   disabled="disabled"
                   placeholder="请输入证件号码"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="总金额" prop="moneyNum">
            <Input v-model="formValidate.moneyNum"
                   disabled="disabled"
                   placeholder="请输入总金额"></Input>
          </FormItem>
        </i-col>

        <i-col span="22">
          <FormItem label="备注"
                    prop="note">
            <Input v-model="formValidate.note"
                   type="textarea"
                   :disabled="disabled"
                   :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入备注..."></Input>
          </FormItem>
        </i-col>
      </Form>
    </Row>
     <Button type="ghost" @click="handleReset" class="btn1">{{$t('button.cal')}}</Button>
                                    <Button
                                        type="primary"
                                        @click="handleSubmit"
                                        class="btn"
                                        v-show="!disabled"
                                        >{{$t('button.sav')}}</Button>
    <!--一个弹出框一个transition-->
    <transition name="fade">
      <!--  员工信息的弹出框 v-show="openPickUser"绑定了一个判断员工信息弹窗是否显示隐藏的数据   @closeEmp="closeEmp" 关闭员工信息弹窗事件  @inputEmp="inputEmp" 员工信息弹出框input选中事件  -->
      <searchEmpMaster v-show="openEmpMaster" @closeEmp="closeEmp" @inputEmp="inputEmp" ref="searchEmpMaster"></searchEmpMaster>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin,uploadFile } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchEmpMaster from '../../../components/searchTable/searchEmpnhMaster'
  import valid from '../../../lib/pub_valid.js'

  export default {
    data () {
      return {
        disabled: false,
        file: '',
        filekey: '',
        loadingStatus: false,
        type: '',
        distype: false,
        forbidden: null,
        formValidate: {
          deptId:"",
          deptIdName:"",
          empId:"",
          empName:"",
          postId:"",
          postName:"",
          empnhIdno:"",
          moneyNum:"",
          note:"",
        },
        openEmpMaster:false,

        postName: '',//岗位名称
        empName:'',//员工名称
        deptIdName:'',//部门名称
        /*必填验证*/
        ruleValidate: {
          empName: [{ required: true, message: "请选择员工姓名", trigger: 'change' },],
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
      valid,
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
        t.formValidate.empId = '';
        t.empName = '';
        t.formValidate.deptId = '';
        t.deptIdName = '';
        t.formValidate.postId = '';
        t.postName = '';
        t.formValidate.empnhIdno = '';
      },
      getData (id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'depManage.getById',
          id: id,
          funId: '1',
          logType: '借支信息id查询',
        }).then((res) => {
          if (isSuccess(res, t)) {
          //回显数据绑定
          t.formValidate.deptId = res.data.content[0].deptId
          t.formValidate.empId = res.data.content[0].empId
          t.deptIdName = res.data.content[0].deptIdName
          t.empName = res.data.content[0].empName
          t.postName = res.data.content[0].postName
          t.formValidate.postId = res.data.content[0].postId
          t.formValidate.empnhIdno = res.data.content[0].empnhIdno
          t.formValidate.moneyNum = Number(res.data.content[0].moneyNum)
          t.formValidate.note = res.data.content[0].note
           if (id === res.data.content[0].companyId) {
                            t.forbidden = 'disabled'
                            t.distype = true
                    } else {
                            t.forbidden = null
                            t.distype = false
                    }
        }
      }).catch(() => {
          this.$Message.error(this.$t('reminder.errormessage'))
      })
      },
      handleSubmit () {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        data._mt = 'depManage.addOrUpd'

        if((!isNaN(t.id)) && t.id != ''){
          //alert(1)
          t.logType = '修改'
        }
        if (t.logType === '修改') {
          data.id = t.id
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              //debugger
              if (isSuccess(res, t)) {
              if (t.logType === '新增') {
                t.$Message.success(this.$t('reminder.addsuccess'))
                t.id = res.data.content[0].id
                t.$emit('newdata', res.data.content[0])
              } else {
                t.$Message.success(this.$t('reminder.updsuccess'))
                t.$emit('update', res.data.content[0])
              }
            }
          }).catch(() => {
              t.$Message.error(this.$t('reminder.errormessage'))
          })
          }
        })
      },
      //打开员工信息弹出框
      pickUserData() {
        const t = this
        t.$refs.searchEmpMaster.getData() //调用员工信息子组件获取列表数据方法 列表回显数据
        t.openEmpMaster = true //打开员工信息弹出框
      },
      closeEmp() {
        const t = this
        t.openEmpMaster = false
      },
      inputEmp(row) {
        const t = this
        t.empName = row.empnhName //员工信息name赋值
        t.formValidate.empId = row.id //员工信息id赋值
        t.deptIdName = row.deptIdDis;
        t.formValidate.deptId = row.deptId;
        t.formValidate.postId = row.postId;
        t.postName = row.postIdDis;
        t.formValidate.empnhIdno = row.empnhIdno;
      },
      handleReset () {
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
      },
      clear(){
        this.$refs.formValidate.resetFields()
      },
      handleUpload(file) {
        this.file = file
        this.loadingStatus = true
        return false
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
