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
            <FormItem label="工作日期" prop="checkWktm">
              <DatePicker
                type="date"
                :disabled="disabled"
                placeholder="请选择工作日期"
                :editable="false"
                v-model="formValidate.checkWktm"
                style="width: 100%;"
              ></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="员工姓名"  prop="empId"  >
              <!--绑定双击清除方法-->
              <span @dblclick="disabled?'':dbclean()">
                <!--v-model绑定显示字段-->
                <Input v-model="formValidate.empnhName"
                       icon="search"
                       readonly="readonly"
                       :disabled="disabled"
                       placeholder="请选择员工"
                       @on-click="disabled?'':pickEmpData()" />
              </span>
            </FormItem>
          </i-col>

          <i-col span="11">
            <FormItem label="证件号码"
                      prop="empnhIdno">
              <Input v-model="formValidate.empnhIdno"
                     :disabled="true"
                     placeholder="请输入证件号码"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="部门名称" prop="deptId">
              <span @dblclick="disabled?'':cleardeptId()">
                <Input v-model="formValidate.unitFname"
                       icon="search"
                       :disabled="true"
                       :readonly="true"
                       placeholder="选择部门"
                       @on-click="disabled?''
                       :pickDeptData()" />
              </span>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="岗位名称" prop="postId">
              <span @dblclick="disabled?'':dbPost()">
                <Input placeholder="请选择岗位"
                       icon="search"
                       :readonly="true"
                       :disabled='true'
                       v-model="formValidate.postFname"
                       @on-click="disabled?''
                       :selectPost()" />
              </span>
            </FormItem>
          </i-col>

          <i-col span="11">
            <FormItem label="上班基准时间"
                      prop="checkUpwoke">
              <DatePicker
                type="datetime"
                placeholder="请选择上班基准时间"
                :disabled="true"
                v-model="formValidate.checkUpwoke"
                style="width: 100%;"
              ></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="上班打卡时间"
                      prop="checkUpckin">
              <DatePicker
                type="datetime"
                placeholder="请选择上班打卡时间"
                :editable="false"
                v-model="formValidate.checkUpckin"
                style="width: 100%;"
              ></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="上班考勤结果" prop="checkUpresult">
              <Select v-model="formValidate.checkUpresult"
                      :clearable="!disabled"
                      :disabled="disabled"
                      placeholder="请选择上班考勤结果">
                <Option :value="item.paramCode"
                        v-for="(item,index) in selectUpresult"
                        :key="index"
                        >{{item.paramInfoCn}}
                </Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="下班基准时间"
                      prop="checkDwktm">
              <DatePicker
                type="datetime"
                placeholder="请选择下班基准时间"
                :disabled="true"
                v-model="formValidate.checkDwktm"
                style="width: 100%;"
              ></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="下班打卡时间"
                      prop="checkDckout">
              <DatePicker
                type="datetime"
                placeholder="请选择下班打卡时间"
                :editable="false"
                v-model="formValidate.checkDckout"
                style="width: 100%;"
              ></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="下班考勤结果" prop="checkDresult">
              <Select v-model="formValidate.checkDresult"
                      :clearable="!disabled"
                      :disabled="disabled"
                      placeholder="请选择下班考勤结果">
                <Option :value="item.paramCode"
                        v-for="(item,index) in selectDresult"
                        :key="index"
                        >{{item.paramInfoCn}}
                </Option>
              </Select>
            </FormItem>
          </i-col>
            <i-col span="11">
              <FormItem label="请假类型" prop="checkType">
                <Select v-model="formValidate.checkType"
                        :clearable="!disabled"
                        :disabled="disabled"
                        placeholder="请选择请假类型">
                  <Option :value="item.paramCode"
                          v-for="(item,index) in selectcheckType"
                          :key="index"
                  >{{item.paramInfoCn}}
                  </Option>
                </Select>
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
      </div>
      <Button type="ghost"
              @click="handleReset"
              class="btn1">{{$t('button.cal')}}</Button>
      <Button type="primary" v-show="!disabled"
              @click="handleSubmit"
              class="btn">{{$t('button.sav')}}</Button>
    </div>
    <!--一个弹出框一个transition-->
    <transition name="fade">
      <searchEmpMaster v-show="openEmpMaster"
                       @closeEmp="closeEmp"
                       @inputEmp="inputEmp"
                       ref="searchEmpMaster">
      </searchEmpMaster>
    </transition>



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
        disabled: false,
        formValidate: {
          empnhIdno : '',
          empId : '',
          deptId : '',
          postId : '',
          checkUpwoke : '',
          checkUpckin : '',
          checkUpresult:'',
          checkDwktm : '',
          checkDckout : '',
          checkDresult:'',
          checkType:'',
        },
        empnhName : '',
        unitFname : '',
        postFname : '',
        checkUpresultDis : '',
        checkDresultDis : '',
        openEmpMaster:false,
        selectUpresult: [],
        selectDresult: [],
        selectcheckType: [],
        /*必填验证*/
        ruleValidate: {
          empId: [
            { required: true, message: "请选择员工姓名", trigger: "change" },
          ],
          deptId: [
            { required: true, message:"请选择部门", trigger: 'change' },
          ],
          postId: [
            { required: true, message:"请选择岗位", trigger: 'change' },
          ],
          checkUpresult: [{
            required: true,
            message: "请选择上班考勤结果",
            trigger: "blur"
          }],
          checkDresult: [{
            required: true,
            message: "请选择下班考勤结果",
            trigger: "blur"
          }],
          checkWktm: [{
            required: true,
            type: "date",
            message: "请选择工作日期",
            trigger: "change"
          }],
          checkUpwoke: [{
            required: true,
            type: "date",
            message: "请选择上班基准时间",
            trigger: "change"
          }],
          checkUpckin: [{
            required: true,
            type: "date",
            message: "请选择上班打卡时间",
            trigger: "change"
          }],
          checkDwktm: [{
            required: true,
            type: "date",
            message: "请选择下班基准时间",
            trigger: "change"
          }],
          checkDckout: [{
            required: true,
            type: "date",
            message: "请选择下班打卡时间",
            trigger: "change"
          }],
        },
      }
    },
    /*资源加载子页面，js不需要*/
    components: {
      searchEmpMaster,
    },
    props: {
      selectType: Array,
      id: Number,
      logType: String,
      index: Number,
    },
    updated () {

    },
    mounted () {
      this.getSelect();
    },
    methods: {
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
          _mt: 'attenCheckupdday.getById',
          id: id,
          funId: '1',
          logType: '日修订考勤单条查询',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate = res.data.content[0]
            t.formValidate.note= res.data.content[0].note
            if (t.logType === '查看') {
              t.disabled = true
              t.distype = true
            } else {
              t.disabled = false
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
      getSelect() {
        const t = this;
        getDataLevelUserLogin({
          _mt: "baseParmInfo.getSelectValue",
          logType: '查询下拉数据',
          typeCode:"attendtype,attendtype,leaveType",
        }).then(res => {
          if (isSuccess(res, t)) {
            t.selectUpresult = res.data.content[0].value[0].paramList;
            t.selectDresult = res.data.content[0].value[1].paramList;
            t.selectcheckType = res.data.content[0].value[2].paramList;
          }
        }).catch(() => {
          this.$Message.error(this.$t("reminder.errormessage"));
        });
      },
      handleSubmit () {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        data._mt = 'attenCheckupdday.addOrUpd'
        if(data.checkWktm !== undefined) {
          data.checkWktm = data.checkWktm === "" ? "" : new Date(data.checkWktm).format("yyyy-MM-dd ");
        }
        if(data.checkUpwoke !== undefined) {
          data.checkUpwoke = data.checkUpwoke === "" ? "" : new Date(data.checkUpwoke).format("yyyy-MM-dd hh:mm:ss");
        }
        if(data.checkUpckin !== undefined) {
          data.checkUpckin = data.checkUpckin === "" ? "" : new Date(data.checkUpckin).format("yyyy-MM-dd hh:mm:ss");
        }
        if(data.checkDwktm !== undefined) {
          data.checkDwktm = data.checkDwktm === "" ? "" : new Date(data.checkDwktm).format("yyyy-MM-dd hh:mm:ss");
        }
        if(data.checkDckout !== undefined) {
          data.checkDckout = data.checkDckout === "" ? "" : new Date(data.checkDckout).format("yyyy-MM-dd hh:mm:ss");
        }
        if (t.logType === '修改') {
          data.id = t.id
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                if (t.logType === '新增') {
                  t.$Message.success('新增成功');
                  t.$emit('newData', res.data.content[0])
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
        this.$refs.formValidate.resetFields();
        this.$refs.scrollBox.$el.scrollTop = '0';
        this.formValidate = {};
        this.empnhName = '';
        this.unitFname = '';
        this.postFname = '';
        this.checkUpresultDis = '';
        this.checkDresultDis = '';
        this.checkTypeDis = '';
        this.$emit('closeUp')
      },
      //部门
      cleardeptId() {
        const t = this
        t.unitFname = ''
        t.formValidate.deptId = ''
      },
      pickDeptData() {
        const t = this
        const paramsDept = deepCopy(t.deptParams)
        t.$refs.searchDept.getData(paramsDept)
        t.openDeptPick = true
      },
      closeDept() {
        const t = this
        t.$refs.searchDept.unitCode = ''
        t.openDeptPick = false
      },
      changeDeptInput(name, id) {
        const t = this
        console.log(name, "name")
        t.unitFname = name
        t.formValidate.deptId = id
      },
      //岗位
      dbPost() {
        const t = this;
        t.formValidate.postId = "";
        t.postFname = "";
      },
      selectPost() {
        const t = this;
        const paramsPost = deepCopy(t.paramsPost);
        t.$refs.searchPost.getData(paramsPost);
        t.openPost = true;
      },
      closePost() {
        const t = this;
        t.$refs.searchPost.postCode = "";
        t.openPost = false;
      },
      inputPost(name, id, postName, postId) {
        const t = this;
        t.postFname = name;
        t.formValidate.postId = id;
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
