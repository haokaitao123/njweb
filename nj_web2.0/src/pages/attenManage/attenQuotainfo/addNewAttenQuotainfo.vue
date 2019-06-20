<template>
  <div class="option-main">
    <Spin size="large"
            fix
            v-if="spinShow">
      </Spin>
    <Row style="max-height: 420px;overflow-y: auto;">
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="100">
        <i-col span="11">
          <FormItem label="员工姓名"  prop="empId"  >
            <!--绑定双击清除方法-->
            <span @dblclick="disabled?'':dbclean()">
              <!--v-model绑定显示字段-->
              <Input v-model="empName" icon="search" readonly="readonly" :disabled="disabled" placeholder="请选择员工"  @on-click="disabled?'':pickUserData()" />
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
          <FormItem label="年假天数" prop="quoLeady">
            <Input v-model="formValidate.quoLeady"
                   disabled="disabled"
                   placeholder="请输入年假天数"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="年假剩余天数" prop="quoLearesdy">
            <Input v-model="formValidate.quoLearesdy"
                   disabled="disabled"
                   placeholder="请输入年假剩余天数"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="调班天数" prop="quoShdy">
            <Input v-model="formValidate.quoShdy"
                   disabled="disabled"
                   placeholder="请输入调班天数"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="调班剩余天数" prop="quoShrestdy">
            <Input v-model="formValidate.quoShrestdy"
                   disabled="disabled"
                   placeholder="请输入调班剩余天数"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="年份" prop="quoYear">
            <Input v-model="formValidate.quoYear"
                   :disabled="disabled"
                   placeholder="请输入年份"></Input>
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
     <!-- <Button type="ghost" @click="handleReset" class="btn1">{{$t('button.cal')}}</Button>-->
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
    const numberCheck = (rule, value, numberValCheck) => {
      if (value !== "" && value !== undefined) {
        if (valid.val_number103(value)) {
          return numberValCheck();
        }
        return numberValCheck(new Error(rule.message));
      }
      numberValCheck();
    };      
      return {
        spinShow: false,
        disabled: false,
        file: '',
        filekey: '',
        loadingStatus: false,
        type: '',
        distype: false,
        forbidden: null,
        formValidate: {
          deptId:"",
          //deptIdName:"",
          empId:"",
          //empName:"",
          postId:"",
          //postName:"",
          quoLeady:"",
          quoLearesdy:"",
          quoShdy:"",
          quoShrestdy:"",
          quoYear:"",
          note:"",
        },
        openEmpMaster:false,
        postName: '',//岗位名称
        empName:'',//员工名称
        deptIdName:'',//部门名称
        /*必填验证*/
        ruleValidate: {
          empId: [
            { 
              required: true, 
              message: "请选择员工姓名", 
              trigger: 'change' 
            }
          ],
          // quoLeady: [
          //   {
          //     required: true,
          //     message: "请输入年假天数",
          //     trigger: "blur"
          //   },
          //   {
          //     validator: numberCheck,
          //     message: "请输入正确的数字格式",
          //     trigger: "blur"
          //   }
          // ],
          // quoLearesdy: [
          //   {
          //     required: true,
          //     message: "请输入年假剩余天数",
          //     trigger: "blur"
          //   },
          //   {
          //     validator: numberCheck,
          //     message: "请输入正确的数字格式",
          //     trigger: "blur"
          //   }
          // ],
          // quoShdy: [
          //   {
          //     required: true,
          //     message: "请输入调班天数",
          //     trigger: "blur"
          //   },
          //   {
          //     validator: numberCheck,
          //     message: "请输入正确的数字格式",
          //     trigger: "blur"
          //   }
          // ],
          // quoShrestdy: [
          //   {
          //     required: true,
          //     message: "请输入调班剩余天数",
          //     trigger: "blur"
          //   },
          //   {
          //     validator: numberCheck,
          //     message: "请输入正确的数字格式",
          //     trigger: "blur"
          //   }
          // ],
          quoYear: [
            {
              required: true,
              message: "请输入年份",
              trigger: "blur"
            },
            {
              validator: numberCheck,
              message: "请输入正确的数字格式",
              trigger: "blur"
            }
          ],
        },
      }
    },
    props: {
      //id: Number,
      //logType: String,
      index: Number,
    },
    /*资源加载子页面，js不需要*/
    components: {
      searchEmpMaster,
      valid,
    },
    computed: {
        id () {
            return this.$store.state.attenQuotainfo.mainId;
        },
        logType () {
            return this.$store.state.attenQuotainfo.logType;
        }
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
      },
      getData (id) {
        const t = this;
        t.spinShow = true; //开启loading效果
        getDataLevelUserLogin({
          _mt: 'attenQuotainfo.getById',
          id: id,
          funId: '1',
          logType: '配额信息id查询',
        }).then((res) => {
          if (isSuccess(res, t)) {
            //回显数据绑定
            t.formValidate.deptId = res.data.content[0].deptId
            t.formValidate.empId = res.data.content[0].empId
            t.deptIdName = res.data.content[0].unitFname
            t.empName = res.data.content[0].empnhName
            t.postName = res.data.content[0].postFname
            t.formValidate.postId = res.data.content[0].postId
            t.formValidate.quoLeady = res.data.content[0].quoLeady
            t.formValidate.quoLearesdy = res.data.content[0].quoLearesdy
            t.formValidate.quoShdy = res.data.content[0].quoShdy
            t.formValidate.quoShrestdy = res.data.content[0].quoShrestdy
            t.formValidate.quoYear = res.data.content[0].quoYear
            t.formValidate.note = res.data.content[0].note
          }
        }).catch(() => {
            this.$Message.error(this.$t('reminder.errormessage'))
        }).finally(() => {
            t.spinShow = false; //关闭loading效果
        });
      },
      handleSubmit () {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        data._mt = 'attenQuotainfo.addOrUpd'
        if (t.id != '') {
              this.$store.commit('attenQuotainfo/setLogType', "修改");
            }
        if (t.logType === '修改') {
          data.id = t.id
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
              t.$emit("closeUp");
              if (t.logType === '新增') {
                t.$Message.success(this.$t('reminder.addsuccess'))
                this.$store.commit('attenQuotainfo/setMainId', res.data.content[0].id)
                t.$emit('newData', res.data.content[0])
              } else {
                t.$Message.success(this.$t('reminder.updsuccess'))
                this.$store.commit('attenQuotainfo/setMainId', res.data.content[0].id)
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
        t.deptIdName = row.unitFname;
        t.formValidate.deptId = row.deptId;
        t.formValidate.postId = row.postId;
        t.postName = row.postFname;
      },
      handleReset () {
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
      },
       clear () {
            const t = this
            t.formValidate = {}
            t.empName="",
            t.deptIdName="",
            t.postName = "",
            this.$refs.formValidate.resetFields()
            t.openUpdate = false
            t.disabled = false
            this.$store.commit('attenQuotainfo/setMainId', "")
            this.$store.commit('attenQuotainfo/setLogType', "");
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
