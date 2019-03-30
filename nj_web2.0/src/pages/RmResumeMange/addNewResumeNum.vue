<template>
  <div class="cover">
    <div class="box">
        <div class="title">
            <div class="title-text">
                <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
                    &nbsp;{{logType}}
                </div>
            <Button type="text" @click="handleReset">
                <Icon type="close-round" size="16"></Icon>
            </Button>
        </div>
        <!-- form表单 :model="formValidate" model表单数据对象绑定了formValidate :rules="ruleValidate" 表单验证规则  :label-width="135" 表单域标签的宽度-->
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
            <Row>
                <!--  prop 是Form对应表单域 model 里的字段 -->
                <!--  项目名称输入框  -->
                <Col span="10" offset="1">
                    <FormItem label="项目名称" prop="entryId">
                        <Input v-model="entryName" placeholder="请输入项目名称"></Input>
                    </FormItem>
                </Col>
                <!--  员工姓名选择框  -->
                <Col span="10" offset="1">
                    <FormItem label="员工姓名" prop="empId">
                        <!-- @dblclick="clearUserid" 员工姓名清空选择框  -->
                        <span @dblclick="clearUserid">
                            <Input v-model="empName" icon="search" :readonly="true" placeholder="请选择员工姓名"  @on-click="pickUserData" />
                        </span>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <!--  简历日期选择框 -->
                <Col span="10" offset="1">
                    <FormItem label="简历日期" prop="resumeDate">
                        <DatePicker type="date"
                            placeholder="选择简历日期"
                            :editable="false"
                            v-model="formValidate.resumeDate"
                            style="width: 100%">
                        </DatePicker>
                    </FormItem>
                </Col>
                <!--  简历使用量输入框  -->
                <Col span="10" offset="1">
                    <FormItem label="简历使用量" prop="resumeNum">
                        <Input v-model="formValidate.resumeNum" placeholder="请输入简历使用量"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <!--  备注文本域  -->
                <Col span="21" offset="1">
                    <FormItem label="备注" prop="note">
                        <Input v-model="formValidate.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <!--  保存 取消 按钮  -->
                <Col span="21" offset="1">
                    <Row type="flex" justify="end">
                        <FormItem>
                            <Button type="ghost" @click="handleReset" style="margin-left: 8px">取消</Button>
                            <Button type="primary" @click="handleSubmit">保存</Button>
                        </FormItem>
                    </Row>
                </Col>
            </Row>
      </Form>
    </div>
    <transition name="fade">
        <!--  员工信息的弹出框 v-show="openPickUser"绑定了一个判断员工信息弹窗是否显示隐藏的数据   @closeEmp="closeEmp" 关闭员工信息弹窗事件  @inputEmp="inputEmp" 员工信息弹出框input选中事件  -->
        <searchEmpMaster v-show="openPickUser" @closeEmp="closeEmp" @inputEmp="inputEmp" ref="searchEmpMaster"></searchEmpMaster>
    </transition>
  </div>
</template>
<script>
    import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../axios/axios' //调用请求接口封装的公共方法
    import { isSuccess, deepCopy } from '../../lib/util'  //调用请求判断成功的公共方法和深拷贝方法
    import searchEmpMaster from '../../components/searchTable/searchEmpnhMaster' //引入员工信息页面弹出框 之后在export default 里的components加入这个组件 页面才可以使用
  export default {
    data() {
      return {
        openPickUser: false,//员工信息默认false 隐藏
        formValidate: {
            _mt: 'rmResume.addOrUpd', //新增的数据接口
            funId: '1', //功能ID
            logType:this.logType, //操作类型
            entryId: '', //项目id
            empId: '', //员工id
            resumeDate: '', //简历日期
            resumeNum: '',//resumeNum
            note: '',//备注
        },
        entryName: '',//项目名称
        empName:'',//员工名称
        ruleValidate: { //表单验证规则
            //员工
            empId: [ 
                { required: true, message: '请选择员工', trigger: 'change' }
            ],
            // //简历日期
            // resumeDate: [
            //     { required: true, message: '请选择日期', trigger: 'change' }
            // ],
            //简历数量
            resumeNum: [
                { required: true, message: '请输入简历数量', trigger: 'blur' }
            ],
        },
      }
    },
    //外部调用的组件注册到这里
    components: {
        searchEmpMaster,//员工信息弹出框组件
    },
    // 定义子组件获取父组件传入的值
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    methods: {
        //根据id查询信息回显数据
        getData(id) {
            const t = this
            //根据id获取数据请求接口
            getDataLevelUserLogin({
                _mt: 'rmResume.getById',
                id: id,
                logType: '根据id获取数据',
            }).then((res) => {
            if (isSuccess(res, t)) {
                //回显数据绑定
                t.formValidate.entryId = res.data.content[0].entryId
                t.formValidate.empId = res.data.content[0].empId
                t.entryName = res.data.content[0].entryName
                t.empName = res.data.content[0].empName
                t.formValidate.resumeDate = res.data.content[0].resumeDate
                t.formValidate.resumeNum = res.data.content[0].resumeNum
                t.formValidate.note = res.data.content[0].note
            }
            }).catch(() => {
                this.$Modal.error({
                    title: '错误',
                    content: '网络错误',
                })
            })
        },
        //点击提交事件
        handleSubmit() {
            const t = this
            //修改请求的参数
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            if (t.logType === '修改') {
                data.id = t.id
            }
            if (data.resumeDate !== undefined && data.resumeDate !== '') {
               data.resumeDate = new Date(data.resumeDate).format('yyyy-MM-dd')
            } else {
               data.resumeDate = ''
            }
            // //form表单校验事件
            this.$refs.formValidate.validate((valid) => {
                //校验成功
                if (valid) {
                    //调取新增修改请求接口
                    getDataLevelUserLoginSenior(data).then((res) => {
                    if (isSuccess(res, t)) {
                        t.$emit('closeUp')
                        if (t.logType === '新增') {
                            t.$Modal.success({
                                title:'成功',
                                content: '新增成功',
                            })
                            //对整个表单进行重置，将所有字段值重置为空并移除校验结果
                            t.$refs.formValidate.resetFields();
                            //像父组件传入新增成功的数据
                            t.$emit('getData', res.data.content[0])
                        } else {
                            t.$Modal.success({
                                title: '成功',
                                content: '修改成功',
                            })
                            //像父组件传入修改成功的数据
                            t.$emit('update', res.data.content[0])
                        }
                    }
                    }).catch(() => {
                        //请求失败
                        this.$Modal.error({
                            title: '错误',
                            content: '网络错误',
                        })
                    })
                }
            })
        },
        //关闭新增或修改弹出框事件
        handleReset() {
            this.$emit('closeUp')
            //对整个表单进行重置，将所有字段值重置为空并移除校验结果
            this.$refs.formValidate.resetFields()
        },
        //关闭员工信息弹出框
        closeEmp() {
            const t = this
            t.openPickUser = false
        },
        //员工信息弹出框input选中事件
        inputEmp(row) {
            const t = this
            t.empName = row.empnhName //员工信息name赋值
            t.formValidate.empId = row.id //员工信息id赋值
            t.entryName = row.deptIdDis;
            t.formValidate.entryId = row.deptId;
        },
        //清除员工信息
        clearUserid() {
            const t = this
            t.empName = ''
            t.empId = ''
        },
        //打开员工信息弹出框
        pickUserData() {
            const t = this
            t.$refs.searchEmpMaster.getData() //调用员工信息子组件获取列表数据方法 列表回显数据
            t.openPickUser = true //打开员工信息弹出框
        },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../sass/updateAndAdd";
</style>
