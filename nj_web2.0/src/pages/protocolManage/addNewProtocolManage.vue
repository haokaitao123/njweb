<template>
  <div class="cover">
    <div class="box">
        <!-- <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="option">
              {{$t('lang_payroll.paySalSet.title')}}
            </MenuItem>
            <MenuItem name="content" v-show="$store.state.paySalSet.childId1">
              {{$t('lang_payroll.paySalSetItem.title')}}
            </MenuItem>
          </Menu>
        </i-col> -->
         <div class="title">
                    <div class="title-text">
                        <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
                            &nbsp;{{logType}}
                        </div>
                    <Button type="text" @click="handleReset">
                        <Icon type="close-round" size="16"></Icon>
                    </Button>
                </div>  
         <div class="option-main">
             <Spin size="large"
                fix
                v-if="spinShow"></Spin>
                <Row style="max-height: 420px;overflow-y: auto;"
                     ref="scrollBox">
               
                <!-- form表单 :model="formValidate" model表单数据对象绑定了formValidate :rules="ruleValidate" 表单验证规则  :label-width="135" 表单域标签的宽度-->
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
                        <Row>
                            <!--  prop 是Form对应表单域 model 里的字段 -->
                            <!--  员工姓名选择框  -->
                            <Col span="11">
                                <FormItem label="员工姓名" prop="empId">
                                    <!-- @dblclick="clearUserid" 员工姓名清空选择框  -->
                                    <span @dblclick="disabled?'':clearUserid()">
                                        <Input v-model="empnhName" icon="search" :readonly="true" :disabled="disabled" placeholder="请选择员工姓名"  @on-click="disabled?'':pickData3()" />
                                    </span>
                                </FormItem>
                            </Col>
                            <!--  部门名称输入框  -->
                            <Col span="11" offset="1">
                                <FormItem label="原部门名称" prop="deptoId">
                                    <Input v-model="unitoFname" disabled="disabled" placeholder="请输入原部门名称"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <!--  岗位名称输入框 -->
                            <Col span="11">
                            <FormItem label="原岗位名称" prop="postoId">
                                    <Input v-model="postoFname" disabled="disabled" placeholder="请输入原岗位名称"></Input>
                                </FormItem>
                            </Col>
                            <!--  证件号码输入框  -->
                            <Col span="11" offset="1">
                                <FormItem label="证件号码" prop="empnhIdno">
                                    <Input v-model="empnhIdno" disabled="disabled" placeholder="请输入证件号码" style="width: 100%"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <!--  合同编号  -->
                             <Col span="11">
                            <FormItem label="原合同编号" prop="contractoNo">
                                    <Input v-model="formValidate.contractoNo" disabled="disabled" placeholder="请输入原合同编号"></Input>
                                </FormItem>
                            </Col>
                            <!--  合同类别  -->
                            <Col span="11" offset="1">
                                <FormItem label="原合同类别" prop="contractoType">
                                <Select v-model="formValidate.contractoType" class="width200"
                                disabled="disabled"
                                placeholder="合同类别" >
                                    <Option v-for="(item, index) in selectContrpertypel" :value="item.paramCode"
                                    :key="index">{{ item.paramInfoName }}
                                    </Option>
                                </Select>
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <!-- 原合同期限  -->
                            <Col span="11" >
                                <FormItem label="原合同期限" prop="contractoPeriod">
                                <Select v-model="formValidate.contractoPeriod" class="width200"
                                disabled="disabled"
                                placeholder="合同期限" >
                                    <Option v-for="(item, index) in selectContperiod" :value="item.paramCode"
                                    :key="index">{{ item.paramInfoName }}
                                    </Option>
                                </Select>
                                </FormItem>
                            </Col>
                            <!--  原合同开始日  -->
                            <Col span="11" offset="1">
                                <FormItem label="原合同开始日期" prop="contractoStart">
                                    <DatePicker type="date"
                                        placeholder="选择合同开始日期"
                                        disabled="disabled"
                                        readonly="readonly"
                                        :editable="false"
                                        v-model="formValidate.contractoStart"
                                        style="width: 100%">
                                    </DatePicker>
                                </FormItem>
                            </Col>
                        </Row>
                        
                        <Row>
                            <!-- 原合同结束日-->
                            <Col span="11" >
                                <FormItem label="原合同结束日期" prop="contractoEnd">
                                    <DatePicker type="date"
                                        placeholder="选择合同结束日期"
                                        disabled="disabled"
                                        readonly="readonly"
                                        :editable="false"
                                        v-model="formValidate.contractoEnd"
                                        style="width: 100%">
                                    </DatePicker>
                                </FormItem>
                            </Col>
                            <!--  原合同工作时间-->
                            <Col span="11" offset="1">
                                <FormItem label="原合同工作时间" prop="contractoTime">
                                    <Select v-model="formValidate.contractoTime" class="width200"
                                    disabled="disabled"
                                    placeholder="合同工作时间" >
                                        <Option v-for="(item, index) in selectWorktimetype" :value="item.paramCode"
                                        :key="index">{{ item.paramInfoName }}
                                        </Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <!-- 原签订时间-->
                            <Col span="11" >
                                <FormItem label="原签订时间" prop="signingoTime">
                                    <DatePicker type="date"
                                        placeholder="选择签订时间"
                                        disabled="disabled"
                                        readonly="readonly"
                                        :editable="false"
                                        v-model="formValidate.signingoTime"
                                        style="width: 100%">
                                    </DatePicker>
                                </FormItem>
                            </Col>
                            <!--  新部门名称-->
                            <Col span="11"  offset="1">
                                <FormItem label="原员工类型" prop="empoType">
                                <Select v-model="formValidate.empoType" class="width200"
                                disabled="disabled"
                                placeholder="员工类型" >
                                    <Option v-for="(item, index) in selectEmptype" :value="item.paramCode"
                                    :key="index">{{ item.paramInfoName }}
                                    </Option>
                                </Select>
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <!-- 新岗位名称-->
                            <Col span="11">
                                <FormItem label="新岗位名称"
                                    prop="postnId">
                                    <span @dblclick="disabled?'':clearPost()">
                                        <Input v-model="postFname"
                                            icon="search"
                                            :readonly=true
                                            :disabled="disabled"
                                            placeholder="请选择岗位名称"
                                            @on-click="disabled?'':pickData()" />
                                    </span>
                                </FormItem>
                            </Col>
                            <!--  新部门名称-->
                            <Col span="11" offset="1">
                                <FormItem label="新部门名称"
                                    prop="deptnId">
                                    <span @dblclick="disabled?'':clearPid()">
                                        <Input v-model="unitFname"
                                            icon="search"
                                            :disabled="disabled"
                                            :readonly=true
                                            placeholder="请选择部门"
                                            @on-click="disabled?'':pickData2()" />
                                    </span>
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <!-- 新合同类别-->
                            <Col span="11" >
                                <FormItem label="新合同类别" prop="contractnType">
                                <Select v-model="formValidate.contractnType" class="width200"
                                :clearable="!disabled"
                                :disabled="disabled"
                                placeholder="选择合同类别" >
                                    <Option v-for="(item, index) in selectContrpertypel" :value="item.paramCode"
                                    :key="index">{{ item.paramInfoName }}
                                    </Option>
                                </Select>
                                </FormItem>
                            </Col>
                            <!--  新合同期限-->
                            <Col span="11" offset="1">
                                <FormItem label="新合同期限" prop="contractnPeriod">
                                <Select v-model="formValidate.contractnPeriod" class="width200"
                                :clearable="!disabled"
                                :disabled="disabled"
                                placeholder="选择合同期限" 
                                @on-change="contractnPeriodSelect">
                                    <Option v-for="(item, index) in selectContperiod" :value="item.paramCode"
                                    :key="index">{{ item.paramInfoName }}
                                    </Option>
                                </Select>
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <!-- 新合同开始日期-->
                            <Col span="11" >
                                <FormItem label="新合同开始日期" prop="contractnStart">
                                    <DatePicker type="date"
                                        placeholder="选择合同开始日期"
                                        :disabled="disabled"
                                        :editable="false"
                                        :readonly="disabled"
                                        v-model="formValidate.contractnStart"
                                        @on-change="contSdateChange"
                                        style="width: 100%">
                                    </DatePicker>
                                </FormItem>
                            </Col>
                            <!--  新合同结束日期-->
                            <Col span="11" offset="1">
                                <FormItem label="新合同结束日期" prop="contractnEnd">
                                    <DatePicker type="date"
                                        placeholder="选择合同结束日期"
                                        disabled="disabled"
                                        readonly="readonly"
                                        :editable="false"
                                        v-model="formValidate.contractnEnd"
                                        style="width: 100%">
                                    </DatePicker>
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <!-- 新合同工作时间-->
                            <Col span="11" >
                                <FormItem label="新合同工作时间" prop="contractnTime">
                                <Select v-model="formValidate.contractnTime" class="width200"
                                :clearable="!disabled"
                                :disabled="disabled"
                                placeholder="合同工作时间" >
                                    <Option v-for="(item, index) in selectWorktimetype" :value="item.paramCode"
                                    :key="index">{{ item.paramInfoName }}
                                    </Option>
                                </Select>
                                </FormItem>
                            </Col>
                            <!--  新员工类型-->
                            <Col span="11" offset="1">
                                <FormItem label="新员工类型" prop="empnType">
                                <Select v-model="formValidate.empnType" class="width200"
                                :clearable="!disabled"
                                :disabled="disabled"
                                placeholder="员工类型" >
                                    <Option v-for="(item, index) in selectEmptype" :value="item.paramCode"
                                    :key="index">{{ item.paramInfoName }}
                                    </Option>
                                </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="11" >
                                <FormItem label="新签订时间" prop="signingnTime">
                                    <DatePicker type="date"
                                        placeholder="选择签订时间"
                                        :disabled="disabled"
                                        :readonly="disabled"
                                        :editable="false"
                                        v-model="formValidate.signingnTime"
                                        style="width: 100%">
                                    </DatePicker>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                          <Col span="22">
                            <FormItem label="附件上传"
                                      prop="fileKey">
                                <Row>
                                    <i-col span="4"
                                           v-show="!disabled">
                                        <Upload :before-upload="handleUpload"
                                                action=" ">
                                            <Button type="ghost"
                                                    icon="ios-cloud-upload-outline"
                                                    :disabled="disabled">浏览</Button>
                                        </Upload>
                                    </i-col>
                                    <i-col span="19">
                                        <span v-if="file !==''">
                                            <i-col span="22"
                                                   @dblclick.native="disabled?'':clearFile()">
                                                <Input v-model="file.name"
                                                       readonly="readonly">
                                                <span slot="prepend">
                                                    <Icon type="folder"
                                                          size="16"></Icon>
                                                </span>
                                                </Input>
                                            </i-col>
                                            <i-col span="2">
                                                <Button type="text"
                                                        @click="uploadLocalFile"
                                                        v-if="loadingStatus">上传</Button>
                                                <Button type="text"
                                                        @click="downloadFile"
                                                        v-if="!loadingStatus">下载</Button>
                                            </i-col>
                                        </span>
                                    </i-col>
                                </Row>
                            </FormItem>
                           </Col>
                        </Row>
                        <Row>
                            <!--  备注文本域  -->
                            <Col span="23" >
                                <FormItem label="备注" prop="note">
                                    <Input v-model="formValidate.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :disabled="disabled" placeholder="请输入备注"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Row>
        </div>
         <Button type="ghost" @click="handleReset" class="btn1">{{$t('button.cal')}}</Button>
                                    <Button
                                        type="primary"
                                        @click="handleSubmit"
                                        class="btn"
                                        v-show="!disabled"
                                        >{{$t('button.sav')}}</Button>
    </div>
    <transition name="fade">
        <!--  员工信息的弹出框 v-show="openPickUser"绑定了一个判断员工信息弹窗是否显示隐藏的数据   @closeEmp="closeEmp" 关闭员工信息弹窗事件  @inputEmp="inputEmp" 员工信息弹出框input选中事件  -->
        <searchContract v-show="openPickUser" :params="params3" :searchCloumns="searchCloumns3" @closeUp="closeEmp" @changeinput="inputEmp" ref="searchContract"></searchContract>
    </transition>
    <transition name="fade">
        <searchOrgframe v-show="openPick2"
            :searchCloumns="searchCloumns2"
            :params="params2"
            @closeUp="close2"
            @changeinput="changeinput2"
            ref="searchOrgframe"></searchOrgframe>
    </transition>
    <transition name="fade">
      <searchTable v-show="openPick"
        :searchPostClo="searchCloumns"
        :params="params"
         @inputPost="inputPost"
         @closePost="closeTable"
         @changeinput="changeinput"
         ref="searchTable"></searchTable>
    </transition>
  </div>
</template>
<script>
    import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../axios/axios' //调用请求接口封装的公共方法
    import { isSuccess, deepCopy } from '../../lib/util'  //调用请求判断成功的公共方法和深拷贝方法
    import searchContract from '../../components/searchTable/searchContract' //引入员工信息页面弹出框 之后在export default 里的components加入这个组件 页面才可以使用
    import searchOrgframe from '../../components/searchTable/searchOrgframe'
    import searchTable from '../../components/searchTable/searchPost'
  export default {
    data() {
        const compareTime = (rule, value, callback) => {
        if (value === "" || !value) {
          callback(new Error("请选择合同开始时间"));
        } else {
          let startTimeNum = (new Date(this.formValidate.contractnStart)).getTime();
          let endTimeNum = (new Date(this.formValidate.contractnEnd)).getTime();
          if (startTimeNum > endTimeNum) {
            callback(new Error('开始时间不能大于结束时间'))
          }
          callback()
        }
      }
      return {
        loadingStatus:"",
        spinShow:false,
        disabled: false,
        distype: false,
        openPickUser: false,//员工信息默认false 隐藏
        openPick2: false,
        openPick: false,
        forbidden: null,
        selectEmptype: [],
        selectContrpertypel:[],
        selectContperiod:[],
        selectWorktimetype:[],
        searchCloumns: [
                {
                  title: this.$t('lang_employee.searchColumn.postCode'),
                  key: 'postCode',
                  sortable: 'custom',
                },
                {
                    title: this.$t('lang_employee.searchColumn.postFnameCnDis'),
                    key: 'postFname',
                    sortable: 'custom',
                }
        ],
        params: {
                _mt: 'orgPost.getPage',
                rows: 20,
                page: '1',
                sort: 'id',
                order: 'desc',
                logType: '岗位',
                state:'02valid'
            },
        params2: {
                _mt: 'orgUnits.getByOrgFramePageList',
                sort: 'id',
                order: 'desc',
                rows: 20,
                page: 1,
                funId: '1',
                logType: '组织架构查询',
                data: '{}',
                state:'02valid',
                unitType:'02dept',
        },
        params3: {
            _mt: "empContractinfo.getPage",
            rows: 20,
            page: 1,
            sort: "id",
            order: "asc",
            logType: "合同查询",
            state: '02valid'
        },
        searchCloumns2:[
                {
                    title: "组织编码",
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: "组织名称",
                    key: 'unitFname',
                },
                {
                    title: "组织类型",
                    key: 'unitTypeName',
                },
            ],
        searchCloumns3:[
                {
                    title: "员工姓名",
                    key: 'empnhName',
                    sortable: 'custom',
                },
                {
                    title: "合同编号",
                    key: 'numberCode',
                },
                {
                    title: "身份证号码",
                    key: 'empnhIdno',
                },
            ],
        formValidate: {
            _mt:'protocolManage.addOrUpd', //新增的数据接口
            funId: '1', //功能ID
            logType:this.logType, //操作类型
            deptoId: '', //原部门id
            empId: '', //员工id
            postoId: '', //原岗位id
            empoType:'',//原员工类型
            contractoType:'',//原合同类别
            contractoPeriod:'',//原合同期限
            contractoNo:'',//原合同编号
            contractoStart:'',//原合同开始日期
            contractoEnd:'',//原合同结束日期
            contractoTime:'',//原合同工作时间
            signingoTime:'',
            deptnId:'',
            postnId:'',
            empnType:'',
            fileKey: "", // 上传附件
            contractnType:'',
            contractnPeriod:'',
            contractnStart:'',
            contractnEnd:'',
            contractnTime:'',
            signingnTime:'',
            note: '',//备注
            state:'01ok',
        },
        fileKey: "", // 上传附件
        file: "",
        postoFname: '',//原岗位名称
        empnhName:'',//员工名称
        unitoFname:'',//原部门名称
        unitFname:'',
        postFname:'',
        empnhIdno: '',//身份证号码
        ruleValidate: { //表单验证规则
            // //员工
            empId: [ 
                 { required: true, message: '请选择员工', trigger: 'change' }
            ],
            // deptnId: [ 
            //     { required: true, message: '请选择部门', trigger: 'change' }
            // ],
            // postnId: [ 
            //     { required: true, message: '请选择岗位', trigger: 'change' }
            // ],
            // empnType: [
            //     { required: true, message: "请选择员工类型", trigger: "blur" }
            // ],
            // contractnType: [
            //     { required: true, message: "请选择合同类别", trigger: "blur" }
            // ],
            // contractnPeriod: [
            //     { required: true, message: "请选择合同期限", trigger: "blur" }
            // ],
            // contractnStart: [
            //   {
            //     required: true,
            //     type: "date",
            //     validator: compareTime,
            //     trigger: "blur"
            //   }
            // ],
            // contractnEnd: [
            //   {
            //     required: true,
            //     type: "date",
            //     message: "请选择合同结束日期",
            //     trigger: "blur"
            //   }
            // ],
            // contractnTime: [
            //     { required: true, message: "请选择合同工作时间", trigger: "blur" }
            // ],
            // signingnTime: [
            //   {
            //     required: true,
            //     type: "date",
            //     message: "请选择新签订时间",
            //     trigger: "blur"
            //   }
            // ],
        },
      }
    },
    //外部调用的组件注册到这里
    components: {
        searchContract,//员工信息弹出框组件
        searchTable,
        searchOrgframe,
    },
    // 定义子组件获取父组件传入的值
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    mounted () {
        this.getSelect();
    },
    methods: {
        //根据id查询信息回显数据
        getData(id) {
            const t = this;
            t.spinShow = true
            //根据id获取数据请求接口
            getDataLevelUserLogin({
                _mt: 'protocolManage.getById',
                id: id,
                logType: '根据id获取数据',
            }).then((res) => {
            if (isSuccess(res, t)) {
                //回显数据绑定
                t.formValidate.deptoId = res.data.content[0].deptoId
                t.formValidate.empId = res.data.content[0].empId
                t.unitoFname = res.data.content[0].unitoFname
                t.empnhName = res.data.content[0].empnhName
                t.postoFname = res.data.content[0].postoFname
                t.formValidate.postoId = res.data.content[0].postoId
                t.formValidate.empoType = res.data.content[0].empoType
                t.formValidate.contractoType = res.data.content[0].contractoType
                t.formValidate.contractoPeriod = res.data.content[0].contractoPeriod
                t.formValidate.contractoNo = res.data.content[0].contractoNo
                t.formValidate.contractoStart = res.data.content[0].contractoStart
                t.formValidate.contractoEnd = res.data.content[0].contractoEnd
                t.formValidate.contractoTime = res.data.content[0].contractoTime
                t.formValidate.signingoTime = res.data.content[0].signingoTime
                t.formValidate.deptnId = res.data.content[0].deptnId
                t.unitFname = res.data.content[0].unitFname
                t.formValidate.postnId = res.data.content[0].postnId
                t.postFname = res.data.content[0].postFname
                t.formValidate.empnType = res.data.content[0].empnType
                t.formValidate.contractnType = res.data.content[0].contractnType
                t.formValidate.contractnPeriod = res.data.content[0].contractnPeriod
                t.formValidate.contractnStart = res.data.content[0].contractnStart
                t.formValidate.contractnEnd = res.data.content[0].contractnEnd
                t.formValidate.contractnTime = res.data.content[0].contractnTime
                t.formValidate.signingnTime = res.data.content[0].signingnTime
                t.empnhIdno = res.data.content[0].empnhIdno
                t.formValidate.note = res.data.content[0].note
                if (res.data.content[0].fileKey) {
                            t.file = { name: res.data.content[0].fileKey.split(":")[0] };
                            t.filekey = res.data.content[0].fileKey.split(":")[1];
                        }
                if (id === res.data.content[0].companyId) {
                            t.forbidden = 'disabled'
                            t.distype = true
                    } else {
                            t.forbidden = null
                            t.distype = false
                    }
            }
            }).catch(() => {
                // this.$Modal.error({
                //     title: '错误',
                //     content: '网络错误',
                // })
                this.$Message.error(this.$t("reminder.errormessage"));
            })
            .finally(() => {
                    t.spinShow = false
            });
        },
         getSelect () {
            const t = this;
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: "emptype,contrpertype,contperiod,worktimetype"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.selectEmptype = res.data.content[0].value[0].paramList;
                        t.selectContrpertypel = res.data.content[0].value[1].paramList;
                        t.selectContperiod = res.data.content[0].value[2].paramList;
                        t.selectWorktimetype = res.data.content[0].value[3].paramList;
                    }
                })
                .catch(() => {
                    // this.$Modal.error({
                    //     title: this.$t("reminder.err"),
                    //     content: this.$t("reminder.errormessage")
                    // });
                    this.$Message.error(this.$t("reminder.errormessage"));
                });
        },

         //清除附件
        clearFile (ckdis) {
            this.$Modal.confirm({
                title: this.$t("reminder.remind"),
                content: "是否清除已上传的附件",
                onOk: () => {
                    this.file = "";
                    this.filekey = "";
                    this.formValidate.fileKey = "";
                    this.loadingStatus = false;
                },
                onCancel: () => { }
            });
        },
           //合同期限选中事件
        dateAdd (type, number, date) {
            switch (type) {
                case "y": {
                    date.setFullYear(date.getFullYear() + number);
                    return date;
                    break;
                }
                case "q": {
                    date.setMonth(date.getMonth() + number * 3);
                    return date;
                    break;
                }
                case "m": {
                    date.setMonth(date.getMonth() + number);
                    return date;
                    break;
                }
                case "w": {
                    date.setDate(date.getDate() + number * 7);
                    return date;
                    break;
                }
                case "d": {
                    date.setDate(date.getDate() + number);
                    return date;
                    break;
                }
                default: {
                    date.setDate(date.getDate() + number);
                    return date;
                    break;
                }
            }
        },
         //计算日期
        calculateDate (selectValue, sDate, eDate) {
            let value = this.formValidate[selectValue];
            let num = parseInt(value);
            let type = "";
            if (selectValue == "contProbat") {
                type = 'm';
            } else {
                if (value.indexOf('year') != -1) {
                    type = 'y';
                } else if (value.indexOf('month') != -1) {
                    type = 'm';
                } else if (value.indexOf('day') != -1) {
                    type = 'd';
                }
            }
            if (value === "99year") {
                this.formValidate[eDate] = "9999-12-31"
            } else {
                let now = new Date(this.formValidate[sDate]);
                this.formValidate[eDate] = this.dateAdd(type, num, now);
            }
        },
         //合同期限下拉选择事件
        contractnPeriodSelect (value) {
            if(value===undefined){
                this.formValidate.contractnPeriod=""
            }
            if (this.formValidate.contractnStart !== "") {
                this.calculateDate("contractnPeriod", "contractnStart", "contractnEnd")
            }
        },
         //合同开始日选择日期事件
        contSdateChange (date) {
            if (this.formValidate.contractnPeriod !== "") {
                this.calculateDate("contractnPeriod", "contractnStart", "contractnEnd")
            }
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
             if (data.contractnStart !== undefined && data.contractnStart !== '') {
               data.contractnStart = new Date(data.contractnStart).format('yyyy-MM-dd')
            } else {
               data.contractnStart = ''
            }
            if (data.contractnEnd !== undefined && data.contractnEnd !== '') {
               data.contractnEnd = new Date(data.contractnEnd).format('yyyy-MM-dd')
            } else {
               data.contractnEnd = ''
            }
            if (data.signingnTime !== undefined && data.signingnTime !== '') {
               data.signingnTime = new Date(data.signingnTime).format('yyyy-MM-dd')
            } else {
               data.signingnTime = ''
            }
            if (data.contractoStart !== undefined && data.contractoStart !== '') {
               data.contractoStart = new Date(data.contractoStart).format('yyyy-MM-dd')
            } else {
               data.contractoStart = ''
            }
            if (data.contractoEnd !== undefined && data.contractoEnd !== '') {
               data.contractoEnd = new Date(data.contractoEnd).format('yyyy-MM-dd')
            } else {
               data.contractoEnd = ''
            }
            if (data.signingoTime !== undefined && data.signingoTime !== '') {
               data.signingoTime = new Date(data.signingoTime).format('yyyy-MM-dd')
            } else {
               data.signingoTime = ''
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
                            // t.$Modal.success({
                            //     title:'成功',
                            //     content: '新增成功',
                            // })
                             this.$Message.success(this.$t("reminder.addsuccess"));
                            //对整个表单进行重置，将所有字段值重置为空并移除校验结果
                            t.$refs.formValidate.resetFields();
                            //像父组件传入新增成功的数据
                            t.$emit('getData', res.data.content[0])
                        } else {
                            // t.$Modal.success({
                            //     title: '成功',
                            //     content: '修改成功',
                            // })
                             this.$Message.success(this.$t("reminder.updsuccess"));
                            //像父组件传入修改成功的数据
                            t.$emit('update', res.data.content[0])
                        }
                    }
                    }).catch(() => {
                        // this.$Message.error(this.$t("reminder.errormessage"));
                    })
                }
            })
        },
        //关闭新增或修改弹出框事件
        handleReset() {
            this.$emit('closeUp')
            //对整个表单进行重置，将所有字段值重置为空并移除校验结果
            this.$refs.scrollBox.$el.scrollTop = "0"
            this.$refs.formValidate.resetFields()
        },
        //关闭员工信息弹出框
        closeEmp() {
            const t = this
            t.openPickUser = false
        },
         //附件上传
        handleUpload (file) {
            this.file = file;
            this.loadingStatus = true;
            return false;
        },
         //上传
        uploadLocalFile () {
            const t = this;
            const formData = new FormData();
            formData.append("upfile", t.file);
            console.log(formData);
            uploadFile(formData)
                .then(res => {
                    for (const key in res.data) {
                        t.file = { name: key };
                        t.filekey = res.data[key];
                        t.formValidate.fileKey = key + ":" + res.data[key];
                    }
                    this.$Message.success(this.$t("reminder.uploadsuccess"));
                    this.loadingStatus = false;
                }).catch(() => {
                    this.$Message.error(this.$t("reminder.errormessage"));
                })

        },
         //下载
        downloadFile () {
            const t = this;
            let data = {
                _mt: "userMgmt.getfiletoken",
                isprivate: true,
                logType: "导出",
                filekey: t.filekey,
                expiresecs: 180
            };
            getDataLevelUserLogin(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        localStorage.pageOpenedListAll = JSON.stringify(
                            JSON.parse(localStorage.pageOpenedList)
                        );
                        if (this.isIE()) {
                            window.location.href =
                                pubsource.pub_prvf_downlink +
                                res.data.content[0].value +
                                "&fname=" +
                                encodeURI(t.filekey);
                        } else {
                            let doclink =
                                pubsource.pub_prvf_downlink +
                                res.data.content[0].value +
                                "&fname=" +
                                encodeURI(t.filekey);
                            let link = document.createElement("a");
                            link.href = doclink;
                            link.download = "downloadfiletemp";
                            link.setAttribute("download", "downloadfiletemp");
                            document.body.appendChild(link);
                            link.click();
                        }
                        this.$store.state.app.pageOpenedList = JSON.parse(
                            localStorage.pageOpenedListAll
                        );
                        localStorage.pageOpenedList = JSON.stringify(
                            JSON.parse(localStorage.pageOpenedListAll)
                        );
                    }
                })
                .catch(() => {
                    this.$Message.error("网络错误");
                });
        },
        //清除岗位选择框数据
        clearPost () {
            const t = this;
            t.postFname = ""
            t.formValidate.postnId = ""
        },
        changeinput2 (name, id, type) {
            const t = this
            t.unitFname = name
            t.formValidate.deptnId = id
            t.type = type
        },
          //选择岗位
        changeinput (name, id) {
            const t = this
            t.postName = name
            t.postId = id
        },
        inputPost (name, id, postName, postId) {
            const t = this
            t.formValidate.postnId = id
            t.postFname = name
        },
        //打开岗位选择弹出框
        pickData () {
            const t = this
            t.$refs.searchTable.getData(t.params)
            t.openPick = true
        },
        //关闭岗位弹出框
        closeTable () {
            const t = this
            t.openPick = false
        },
         close2 () {
            const t = this
            t.openPick2 = false
        },
         pickData2 () {
                const t = this
                t.$refs.searchOrgframe.getData(t.params2)
                t.openPick2 = true
        },
         clearPid () {
                const t = this
                t.unitFname = ''
                t.formValidate.deptnId = ''
        },
        //员工信息弹出框input选中事件
        inputEmp(row) {
            console.log(row,"row")
              const t = this
            t.empnhName = row.empnhName //员工信息name赋值
            t.formValidate.empId = row.empId //员工信息id赋值
            t.unitoFname = row.unitoFname;
            t.formValidate.deptoId = row.deptoId;
            t.formValidate.postoId = row.postoId;
            t.postoFname = row.postoFname;
            t.formValidate.empoType = row.empType;
            t.formValidate.contractoType = row.contType;
            t.formValidate.contractoPeriod = row.contPeriod;
            t.formValidate.contractoStart = row.contSdate;
            t.formValidate.contractoEnd = row.contEdate;
            t.formValidate.contractoTime = row.contWorktime;
            t.formValidate.signingoTime = row.contSigndate;
            t.formValidate.contractoNo = row.numberCode;
            t.empnhIdno = row.empnhIdno;    
        },
        //清除员工信息
        clearUserid() {
             const t = this
            t.empnhName = '';
            t.formValidate.empId='';
            t.unitoFname = '';
            t.formValidate.deptoId='';
            t.postoFname = '';
            t.formValidate.postoId='';
            t.formValidate.empoType='';
            t.formValidate.contractoType='';
            t.formValidate.contractoPeriod='';
            t.empnhIdno='';
            t.formValidate.contractoNo='';
            t.formValidate.signingoTime = '';
            t.formValidate.contractoStart='';
            t.formValidate.contractoEnd='';
            t.formValidate.contractoTime='';
        },
        //打开员工信息弹出框
        pickData3() {
            const t = this
            t.$refs.searchContract.getData(t.params3) //调用员工信息子组件获取列表数据方法 列表回显数据
            t.openPickUser = true //打开员工信息弹出框
        },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../sass/updateAndAdd";
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
