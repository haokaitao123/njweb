<template>
  <div class="option-main">
    <Row>
      <Form
        :model="form"
        label-position="right"
        :rules="ruleValidate"
        ref="form"
        :label-width="150"
      >
        <i-col span="11">
          <FormItem :label="$t('唯一编号')" prop="numberCode">
            <Input v-model="form.numberCode" :disabled="true"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('雇员姓名')" prop="empnhName">
            <Input v-model="form.empnhName" placeholder="请输入雇员姓名"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('姓名拼音')" prop="empnhPinyin">
            <Input v-model="form.empnhPinyin"></Input>
          </FormItem>
        </i-col>

        <i-col span="11" offset="1">
          <FormItem label="曾用名" prop="empnhPtname">
            <Input v-model="form.empnhPtname" placeholder="请输入你用过的名字"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('民族')" prop="empnhNationDis">
            <Select v-model="form.empnhNationDis" clearable placeholder="请选择民族">
              <Option
                :value="item.paramCode"
                v-for="(item,index) in selectNation"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <!-- <i-col span="11" offset="1">
                  <FormItem :label="$t('部门名称')" prop="deptIdDis">
                    <span @dblclick="search1">
                      <Input
                        v-model="form.deptIdDis"
                        icon="search"
                        :disabled="disabled"
                        :readonly="true"
                        placeholder="选择部门"
                        @on-click="pickData"
                      />
                    </span>
                  </FormItem>
        </i-col>-->
        <!-- <i-col span="11">
                  <FormItem :label="$t('岗位名称')" prop="postIdDis">
                    <span @dblclick="search2">
                      <Input
                        v-model="form.postIdDis"
                        icon="search"
                        :disabled="disabled"
                        :readonly="true"
                        placeholder="选择岗位"
                        @on-click="pickData1"
                      />
                    </span>
                  </FormItem>
                  
        </i-col>-->
        <!-- <i-col span="11" offset="1">
                  <FormItem :label="$t('直接上级')" prop="empnhPmpDis">
                    <span @dblclick="search3">
                      <Input
                        v-model="form.empnhPmpDis"
                        icon="search3"
                        :disabled="disabled"
                        :readonly="true"
                        placeholder="选择直接上级"
                        @on-click="pickData2"
                      />
                    </span>
                  </FormItem>
                  
        </i-col>-->
        <i-col span="11">
          <FormItem :label="$t('证件类型')" prop="empnhIdtypeDis">
            <Select v-model="form.empnhIdtypeDis">
              <Option
                :value="item.paramCode"
                v-for="(item,index) in selectIdtype"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>

        <i-col span="11" offset="1">
          <FormItem :label="$t('证件号码')" prop="empnhIdno">
            <Input v-model="form.empnhIdno" placeholder="请输入证件号码"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('生效日期')" prop="empnhSday">
            <DatePicker
              type="date"
              placeholder="请选择生效日期"
              :editable="false"
              v-model="form.empnhSday"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('证件到期日')" prop="empnhEday">
            <DatePicker
              type="date"
              placeholder="请选择证件到期日"
              :editable="false"
              v-model="form.empnhEday"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>

        <i-col span="11">
          <FormItem :label="$t('性别')" prop="empnhGenderDis">
            <Select v-model="form.empnhGenderDis">
              <Option
                :value="item.paramCode"
                v-for="(item,index) in selectGender"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('出生日期')" prop="empnhBirthdate">
            <DatePicker
              type="date"
              placeholder="请选择出生日期"
              :editable="false"
              v-model="form.empnhBirthdate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('手机号码')" prop="empnhMobile">
            <Input v-model="form.empnhMobile" placeholder="请输入手机号码"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('居住地址')" prop="empnhResiaddr">
            <Input v-model="form.empnhResiaddr" placeholder="请输入居住地址"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('户籍地址')" prop="empnhRegaddrDis">
            <Input v-model="form.empnhRegaddrDis" placeholder="请输入户籍地址"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('户籍性质')" prop="empnhRegtypeDis">
            <Select v-model="form.empnhRegtypeDis" clearable placeholder="请选择户籍性质">
              <Option
                :value="item.paramCode"
                v-for="(item,index) in selectRegtype"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="个人邮箱" prop="empnhPersmail">
            <Input v-model="form.empnhPersmail" placeholder="请输入个人邮箱"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="公司邮箱" prop="empnhCompmail">
            <Input v-model="form.empnhCompmail" placeholder="请输入公司邮箱"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="QQ号码" prop="empnhQq">
            <Input v-model="form.empnhQq" placeholder="请输入QQ号码"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="微信号" prop="empnhWechat">
            <Input v-model="form.empnhWechat" placeholder="请输入微信号码"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
                  <FormItem :label="$t('工作地点')" prop="empnhWklocatDis">
                    <span @dblclick="workplace">
                      <Input
                        v-model="unitCityName"
                        icon="search"
                        :disabled="disabled"
                        :readonly="true"
                        placeholder="选择工作地点"
                        @on-click="pickData"
                      />
                    </span>
                  </FormItem>
                 
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('入职日期')" prop="empnhEntrydate">
            <DatePicker
              type="date"
              placeholder="请选择入职日期"
              :editable="false"
              v-model="form.empnhEntrydate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('转正日期')" prop="empnhIrmentdate">
            <DatePicker
              type="date"
              placeholder="请选择转正日期"
              :editable="false"
              v-model="form.empnhIrmentdate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('开户银行')" prop="empnhSalbankDis">
            <Select v-model="form.empnhSalbankDis" clearable placeholder="请选择开户银行">
              <Option
                :value="item.paramCode"
                v-for="(item,index) in selectSalbank"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('银行账号')" prop="empnhSalaccount">
            <Input v-model="form.empnhSalaccount" placeholder="请输入银行账号"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem :label="$t('户号')" prop="empnhSalaccname">
            <Input v-model="form.empnhSalaccname" placeholder="请输入户号"></Input>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="婚姻状况" prop="empnhMarriageDis">
            <Select v-model="form.empnhMarriageDis" clearable placeholder="请选择婚姻状况">
              <Option
                :value="item.paramCode"
                v-for="(item,index) in selectMarriage"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="政治面貌" prop="empnhPoliticalDis">
            <Select v-model="form.empnhPoliticalDis">
              <Option
                :value="item.paramCode"
                v-for="(item,index) in selectPolitical"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem :label="$t('参加工作时间')" prop="empnhFirstwkdate">
            <DatePicker
              type="date"
              placeholder="请选择参加工作时间"
              :editable="false"
              v-model="form.empnhFirstwkdate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>

        <i-col span="11" offset="1">
          <FormItem label="职称" prop="empnhTechtilDis">
            <Select v-model="form.empnhTechtilDis" clearable placeholder="请选择职称">
              <Option
                :value="item.paramCode"
                v-for="(item,index) in selectTechnicaltitle"
                :key="index"
              >{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="职称专业" prop="empnhTechspec">
            <Input v-model="form.empnhTechspec" placeholder="请输入职称专业"></Input>
          </FormItem>
        </i-col>
        <i-col span="11" offset="1">
          <FormItem label="职称取得时间" prop="empnhTechdate">
            <DatePicker
              type="date"
              placeholder="请选择职称取得时间"
              :editable="false"
              v-model="form.empnhTechdate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>

        <i-col span="23">
          <FormItem :label="$t('是否考勤')" prop="empnhAttendynDis">
            <RadioGroup v-model="form.empnhAttendynDis">
              <Radio
                :label="item.paramCode"
                v-for="(item,index) in selectAttendy"
                :key="index"
                :disabled="disabled"
              >{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
        </i-col>

        <!-- <i-col span="22"  >
              <FormItem label="操作记录" prop="unitAgentno">
                <Input v-model="form.unitAgentno" :placeholder="$t('lang_organization.orgframe.unitAgentnoInp')"></Input>
              </FormItem>
        </i-col>-->
        <i-col span="23">
          <FormItem :label="$t('备注')" prop="note">
            <Input
              v-model="form.note"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              :placeholder="$t('备注')"
            ></Input>
          </FormItem>
        </i-col>
      </Form>
      <Button class="btn" type="primary" @click="save">保存</Button>
      <!-- <div style="padding-bottom: 20px;">
        <Row type="flex" justify="end">
          <Col span="4" pull="1">
            <Button type="primary" @click="save">保存</Button>
          </Col>
        </Row>
      </div> -->
      <transition name="fade">
        <searchCity
          v-show="openPick"
          :searchCloumns="searchCloumns"
          :params="params"
          @closeUp="close"
          @changeinput="changeinput"
          ref="searchCity"
        ></searchCity>
      </transition>
      <!-- <transition name="fade">
              <searchOrgframe
                v-show="openPick2"
                :searchCloumns="searchCloumns2"
                :params="params2"
                @closeUp="close2"
                @changeinput="changeinput2"
                ref="searchOrgframe"
              ></searchOrgframe>
      </transition>-->
      <!-- <transition name="fade">
              <searchOrgcostcenter
                v-show="openPick3"
                :searchCloumns="searchCloumns3"
                :params="params3"
                @closeUp="close3"
                @changeinput="changeinput3"
                ref="searchOrgcostcenter"
              ></searchOrgcostcenter>
            </transition>
            <transition name="fade">
              <searchOrgcostcenter1
                v-show="openPick4"
                :searchCloumns="searchCloumns4"
                :params="params4"
                @closeUp="close4"
                @changeinput="changeinput4"
                ref="searchOrgcostcenter"
              ></searchOrgcostcenter1>
      </transition>-->
    </Row>
  </div>
</template>
<script>
// import searchCountry from "../../../components/searchTable/searchCountry";
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin
} from "../../../../axios/axios";
import { isSuccess, deepCopy } from "../../../../lib/util";
import searchCity from "../../../../components/searchTable/searchCity";
// import searchOrgframe from "../../../../components/searchTable/searchOrgframe";
// import searchOrgcostcenter from "../../../components/searchTable/searchOrgcostcenter";
// import searchOrgcostcenter1 from "../../../components/searchTable/searchOrgcostcenter";

export default {
  data() {
    return {
      disabled: false,
      unitCityName: '',
       popup: '',
      form: {
        _mt: "empEmpnh.addOrUpd",
        // updateBy: "", // 修改人
        // updateTime: "", // 修改时间
        // deleteFlag: "", // 删除标记
        // importFlag: "", // 导入标记
        // companyId: "", // 所属公司
        numberCode: "'XXXXXX'", // 唯一编号
        empnhName: "", // 雇员姓名
        empnhPinyin: "", // 姓名拼音
        empnhPtname: "", // 曾用名
        // empnhGenderDis: "", // 性别
        empnhBirthdate: "", // 出生日期
        // empnhNation: "", // 民族
        // deptId: "", // 部门名称
        // postId: "", // 岗位名称
        // empnhPmp: "", // 直接上级
        // empnhIdtype: "", // 证件类型
        empnhIdno: "", // 证件号码
        empnhSday: "", // 生效日期
        empnhEday: "", // 证件到期日
        empnhPersmail: "", // 个人邮箱
        empnhMobile: "", // 手机号码
        empnhResiaddr: "", // 居住地址
        // empnhRegtype: "", // 户籍性质
        // empnhRegaddr: "", // 户籍地址
        empnhCompmail: "", // 公司邮箱

        // empnhAttendyn: "", // 是否考勤
        empnhQq: "", // QQ号码
        empnhWechat: "", // 微信号
        // empnhWklocat: "", // 工作地点
        empnhEntrydate: "", // 入职日期
        empnhIrmentdate: "", // 转正日期
        // empnhSalbank: "", // 开户银行
        empnhSalaccount: "", // 银行账号
        empnhSalaccname: "", // 户名
        // empnhMarriage: "", // 婚姻状况
        // empnhPolitical: "", // 政治面貌
        empnhFirstwkdate: "", // 参加工作时间
        // empnhTechtil: "", // 职称
        empnhTechspec: "", // 职称专业
        empnhTechdate: "", // 职称取得时间
        // fileKey: "", // 上传附件
        // empnhRecord: "", // 操作记录
        // state: "", // 状态
        note: "", // 备注
        empnhRegtypeDis: "", // 户籍性质显示字段
        empnhSalbankDis: "", // 开户银行显示字段
        empnhCostcentDis: "", // 成本中心显示字段 弹框
        empnhGenderDis: "", // 性别显示字段
        empnhNationDis: "", // 民族显示字段 弹框
        deptIdDis: "", // 部门名称显示字段 弹框
        postIdDis: "", // 岗位名称显示字段  弹框
        empnhPmpDis: "", // 直接上级显示字段 弹框
        // empBankDis: "", // 开户银行显示字段
        empnhIdtypeDis: "", // 证件类型显示字段
        empnhRegaddrDis: "", // 户籍地址显示字段
        empnhAttendynDis: "", // 是否考勤显示字段
        empnhWklocatDis: "", // 工作地点显示字段 弹框
        empnhMarriageDis: "", // 婚姻状况显示字段
        empnhPoliticalDis: "", // 政治面貌显示字段
        empnhTechtilDis: "" // 职称显示字段

        // stateDis: "" // 员工状态显示字段
      },
      // 弹出框相关参数
      openPick: false,
      

      params: {
        _mt: "baseCity.getPage",
        sort: "id",
        order: "desc",
        rows: 10,
        page: 1,
        funId: "1",
        logType: "工作地方查询",
        data: '{"cityIsvalid" : "1"}'
      },
      searchCloumns: [
        {
          title: "城市名称",
          key: "cityName",
          sortable: "custom",
          width: 380
        },
        {
          title: "城市类型",
          key: "cityTypeName",
          sortable: "custom",
          width: 379
        }
      ],
      // params2: {
      //   _mt: "orgUnits.getByOrgFramePageList",
      //   sort: "id",
      //   order: "desc",
      //   rows: 10,
      //   page: 1,
      //   funId: "1",
      //   logType: "部门名称查询",
      //   data: "{}",
      //   unitPid: 0
      // },
      // searchCloumns2: [
      //   {
      //     title: "组织编码",
      //     key: "unitCode",
      //     sortable: "custom"
      //   },
      //   {
      //     title: "组织名称",
      //     key: "unitFname"
      //   },
      //   {
      //     title: "组织类型",
      //     key: "unitTypeName"
      //   }
      // ],

      // params3: {
      //     _mt: 'orgCostcenter.getPage',
      //     sort: 'id',
      //     order: 'desc',
      //     rows: 10,
      //     page: 1,
      //     funId: '1',
      //     logType: '直接上级查询',
      //     data: '{}',
      // },
      // searchCloumns3: [
      //     {
      //         title: "",
      //         key: '',
      //         sortable: 'custom',
      //     },
      //     {
      //         title: "",
      //         key: '',
      //     },
      // ],
      // params4: {
      //     _mt: '',
      //     sort: 'id',
      //     order: 'desc',
      //     rows: 10,
      //     page: 1,
      //     funId: '1',
      //     logType: '岗位名称查询',
      //     data: '{}',
      // },
      // searchCloumns4: [
      //     {
      //         title: "",
      //         key: '',
      //         sortable: 'custom',
      //     },
      //     {
      //         title: "",
      //         key: 'costName',
      //     },
      // ],

      // params5: {
      //   _mt: "orgCostcenter.getPage",
      //   sort: "id",
      //   order: "desc",
      //   rows: 10,
      //   page: 1,
      //   funId: "1",
      //   logType: "成本中心查询",
      //   data: "{}"
      // },
      // searchCloumns5: [
      //   {
      //     title: "成本中心编码",
      //     key: "costCode",
      //     sortable: "custom"
      //   },
      //   {
      //     title: "成本中心名称",
      //     key: "costName"
      //   }
      // ],

      yesOrNo: [],
      selectGender: [],
      selectTechnicaltitle: [],
      selectMarriage: [],
      selectPolitical: [],
      selectNation: [],
      selectIdtype: [],
      selectRegtype: [],
      selectSalbank: [],
      selectAttendy: [
        {
          paramCode: "1",
          paramInfoCn: "是"
        },
        {
          paramCode: "0",
          paramInfoCn: "否"
        }
      ],
      ruleValidate: {
        empnhName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        empnhGenderDis: [
          {
            required: true,
            message: "选择性别",
            trigger: "change"
          }
        ],
        empnhTechtilDis: [
          {
            required: true,
            message: "选择职称",
            trigger: "change"
          }
        ],
        empnhPoliticalDis: [
          {
            required: true,
            message: "选择政治面貌",
            trigger: "change"
          }
        ],
        empnhMarriageDis: [
          {
            required: true,
            message: "请选择婚姻状况",
            trigger: "change"
          }
        ],
        empnhFirstwkdate: [
          {
            required: true,
            type: "date",
            message: "请选择参加工作时间",
            trigger: "change"
          }
        ],
        empnhEntrydate: [
          {
            required: true,
            type: "date",
            message: "请选择参入职日期",
            trigger: "change"
          }
        ],

        empnhPtname: [
          {
            required: true,
            message: "请输入曾用名",
            trigger: "blur"
          }
        ],
        empnhAttendynDis: [
          {
            required: true,
            message: "请选择考勤",
            trigger: "change"
          }
        ]
      }
    };
  },
  // 接收主子表页面参数 visaare一般不传
  props: {
    id: Number,
    logType: String,
    index: Number
  },
  components: {
    searchCity
  },
  mounted() {
    this.getSelect();
  },
  methods: {
    //      获取主表数据 无需变更
    getdata(params) {
      const t = this;
      getDataLevelUserLogin(params)
        .then(res => {
          if (isSuccess(res, t)) {
            console.log(res.data.content[0]);
            // t.form = res.data.content[0];
            if (res.data.content[0].numberCode) {
              t.form.numberCode = res.data.content[0].numberCode;
            } else {
              t.form.numberCode = "";
            }

            if (res.data.content[0].empnhName) {
              t.form.empnhName = res.data.content[0].empnhName;
            } else {
              t.form.empnhName = "";
            }

            if (res.data.content[0].empnhPinyin) {
              t.form.empnhPinyin = res.data.content[0].empnhPinyin;
            } else {
              t.form.empnhPinyin = "";
            }

            if (res.data.content[0].empnhPtname) {
              t.form.numberCode = res.data.content[0].empnhPtname;
            } else {
              t.form.empnhPtname = "";
            }

            if (res.data.content[0].empnhGenderDis) {
              t.form.empnhGenderDis = res.data.content[0].empnhGenderDis;
            } else {
              t.form.empnhGenderDis = "";
            }
            if (res.data.content[0].empnhBirthdate) {
              t.form.empnhBirthdate = res.data.content[0].empnhBirthdate;
            } else {
              t.form.empnhBirthdate = "";
            }
            if (res.data.content[0].empnhNationDis) {
              t.form.empnhNationDis = res.data.content[0].empnhNationDis;
            } else {
              t.form.empnhPtname = "";
            }
            if (res.data.content[0].deptIdDis) {
              t.form.deptIdDis = res.data.content[0].deptIdDis;
            } else {
              t.form.deptIdDis = "";
            }

            if (res.data.content[0].postIdDis) {
              t.form.postIdDis = res.data.content[0].postIdDis;
            } else {
              t.form.postIdDis = "";
            }

            if (res.data.content[0].empnhPmpDis) {
              t.form.empnhPmpDis = res.data.content[0].empnhPmpDis;
            } else {
              t.form.empnhPmpDis = "";
            }

            if (res.data.content[0].empnhIdtypeDis) {
              t.form.empnhIdtypeDis = res.data.content[0].empnhIdtypeDis;
            } else {
              t.form.empnhIdtypeDis = "";
            }

            if (res.data.content[0].empnhIdno) {
              t.form.empnhIdno = res.data.content[0].empnhIdno;
            } else {
              t.form.empnhIdtypeDis = "";
            }
            if (res.data.content[0].empnhSday) {
              t.form.empnhSday = res.data.content[0].empnhSday;
            } else {
              t.form.empnhSday = "";
            }
            if (res.data.content[0].empnhEday) {
              t.form.empnhEday = res.data.content[0].empnhEday;
            } else {
              t.form.empnhEday = "";
            }
            if (res.data.content[0].empnhPersmail) {
              t.form.empnhPersmail = res.data.content[0].empnhPersmail;
            } else {
              t.form.empnhPersmail = "";
            }
            if (res.data.content[0].empnhMobile) {
              t.form.empnhMobile = res.data.content[0].empnhMobile;
            } else {
              t.form.empnhMobile = "";
            }
            if (res.data.content[0].empnhResiaddr) {
              t.form.empnhResiaddr = res.data.content[0].empnhResiaddr;
            } else {
              t.form.empnhResiaddr = "";
            }
            if (res.data.content[0].empnhRegtypeDis) {
              t.form.empnhRegtypeDis = res.data.content[0].empnhRegtypeDis;
            } else {
              t.form.empnhRegtypeDis = "";
            }
            if (res.data.content[0].empnhRegaddrDis) {
              t.form.empnhRegaddrDis = res.data.content[0].empnhRegaddrDis;
            } else {
              t.form.empnhRegaddrDis = "";
            }
            if (res.data.content[0].empnhCompmail) {
              t.form.empnhCompmail = res.data.content[0].empnhCompmail;
            } else {
              t.form.empnhCompmail = "";
            }
            if (res.data.content[0].empnhAttendyn) {
              t.form.empnhAttendyn = res.data.content[0].empnhAttendyn;
            } else {
              t.form.empnhAttendyn = "";
            }
            if (res.data.content[0].empnhQq) {
              t.form.empnhQq = res.data.content[0].empnhQq;
            } else {
              t.form.empnhQq = "";
            }
            if (res.data.content[0].empnhWechat) {
              t.form.empnhWechat = res.data.content[0].empnhWechat;
            } else {
              t.form.empnhWechat = "";
            }
            if (res.data.content[0].empnhWklocatDis) {
              t.form.empnhWklocatDis = res.data.content[0].empnhWklocatDis;
            } else {
              t.form.empnhWklocatDis = "";
            }
            if (res.data.content[0].empnhEntrydate) {
              t.form.empnhEntrydate = res.data.content[0].empnhEntrydate;
            } else {
              t.form.empnhEntrydate = "";
            }
            if (res.data.content[0].empnhIrmentdate) {
              t.form.empnhIrmentdate = res.data.content[0].empnhIrmentdate;
            } else {
              t.form.empnhIrmentdate = "";
            }
            if (res.data.content[0].empnhSalbankDis) {
              t.form.empnhSalbankDis = res.data.content[0].empnhSalbankDis;
            } else {
              t.form.empnhSalbankDis = "";
            }
            if (res.data.content[0].empnhSalaccount) {
              t.form.empnhSalaccount = res.data.content[0].empnhSalaccount;
            } else {
              t.form.empnhSalaccount = "";
            }
            if (res.data.content[0].empnhSalaccname) {
              t.form.empnhSalaccname = res.data.content[0].empnhSalaccname;
            } else {
              t.form.empnhSalaccname = "";
            }
            if (res.data.content[0].empnhMarriageDis) {
              t.form.empnhMarriageDis = res.data.content[0].empnhMarriageDis;
            } else {
              t.form.empnhMarriageDis = "";
            }
            if (res.data.content[0].empnhPoliticalDis) {
              t.form.empnhPoliticalDis = res.data.content[0].empnhPoliticalDis;
            } else {
              t.form.empnhPoliticalDis = "";
            }
            if (res.data.content[0].empnhFirstwkdate) {
              t.form.empnhFirstwkdate = res.data.content[0].empnhFirstwkdate;
            } else {
              t.form.empnhFirstwkdate = "";
            }
            if (res.data.content[0].empnhTechtilDis) {
              t.form.empnhTechtilDis = res.data.content[0].empnhTechtilDis;
            } else {
              t.form.empnhTechtilDis = "";
            }
            if (res.data.content[0].empnhTechspec) {
              t.form.empnhTechspec = res.data.content[0].empnhTechspec;
            } else {
              t.form.empnhTechspec = "";
            }
            if (res.data.content[0].empnhTechdate) {
              t.form.empnhTechdate = res.data.content[0].empnhTechdate;
            } else {
              t.form.empnhTechdate = "";
            }
            if (res.data.content[0].empnhAttendynDis) {
              t.form.empnhAttendynDis = res.data.content[0].empnhAttendynDis;
            } else {
              t.form.empnhAttendynDis = "";
            }
            if (res.data.content[0].note) {
              t.form.note = res.data.content[0].note;
            } else {
              t.form.note = "";
            }
            t.unitCityName = res.data.content[0].unitCityName
            // t.form.numberCode = res.data.content[0].numberCode;
            // t.form.empnhName = res.data.content[0].empnhName;
            // t.form.empnhPinyin = res.data.content[0].empnhPinyin;
            // t.form.empnhPtname = res.data.content[0].empnhPtname;
            // t.form.empnhGenderDis = res.data.content[0].empnhGenderDis;
            // t.form.empnhBirthdate = res.data.content[0].empnhBirthdate;
            // t.form.empnhNationDis = res.data.content[0].empnhNationDis;
            // t.form.deptIdDis = res.data.content[0].deptIdDis; //可能有问题
            // t.form.postIdDis = res.data.content[0].postIdDis; //可能有问题
            // t.form.empnhPmpDis = res.data.content[0].empnhPmpDis; //可能有问题
            // t.form.empnhIdtypeDis = res.data.content[0].empnhIdtypeDis;
            // t.form.empnhIdno = res.data.content[0].empnhIdno;
            // t.form.empnhSday = res.data.content[0].empnhSday;
            // t.form.empnhEday = res.data.content[0].empnhEday;
            // t.form.empnhPersmail = res.data.content[0].empnhPersmail;
            // t.form.empnhMobile = res.data.content[0].empnhMobile;
            // t.form.empnhResiaddr = res.data.content[0].empnhResiaddr;
            // t.form.empnhRegtypeDis = res.data.content[0].empnhRegtypeDis;
            // t.form.empnhRegaddrDis = res.data.content[0].empnhRegaddrDis;
            // t.form.empnhCompmail = res.data.content[0].empnhCompmail;
            // t.form.empnhAttendyn = res.data.content[0].empnhAttendyn;
            // t.form.empnhQq = res.data.content[0].empnhQq;
            // t.form.empnhWechat = res.data.content[0].empnhWechat;
            // t.form.empnhWklocatDis = res.data.content[0].empnhWklocatDis;
            // t.form.empnhEntrydate = res.data.content[0].empnhEntrydate;
            // t.form.empnhIrmentdate = res.data.content[0].empnhIrmentdate;
            // t.form.empnhSalbankDis = res.data.content[0].empnhSalbankDis;
            // t.form.empnhSalaccount = res.data.content[0].empnhSalaccount;
            // t.form.empnhSalaccname = res.data.content[0].empnhSalaccname;
            // t.form.empnhMarriageDis = res.data.content[0].empnhMarriageDis;
            // t.form.empnhPoliticalDis = res.data.content[0].empnhPoliticalDis;
            // t.form.empnhFirstwkdate = res.data.content[0].empnhFirstwkdate;
            // t.form.empnhTechtilDis = res.data.content[0].empnhTechtilDis;
            // t.form.empnhTechspec = res.data.content[0].empnhTechspec;
            // t.form.empnhTechdate = res.data.content[0].empnhTechdate;
            // t.form.empnhAttendynDis = res.data.content[0].empnhAttendynDis;
            // t.form.note = res.data.content[0].note;
          }
        })
        .catch(() => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    //      查询公共参数
    getSelect() {
      const t = this;
      getDataLevelUserLogin({
        _mt: "baseParmInfo.getSelectValue",
        // typeCode: "actiontype,emptype,idtype",
        typeCode: "gender,techlevel,marrystatus,political"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            console.log(res);
            t.selectNation = res.data.content[0].value[0].paramList; //待解决 民族
            t.selectIdtype = res.data.content[0].value[0].paramList; //待解决 员工类型
            t.selectRegtype = res.data.content[0].value[0].paramList; //待解决 户籍性质
            t.selectSalbank = res.data.content[0].value[0].paramList; //待解决 开户银行
            t.selectGender = res.data.content[0].value[0].paramList;
            t.yesOrNo = res.data.content[0].value[0].paramList;
            t.selectTechnicaltitle = res.data.content[0].value[3].paramList;
            t.selectMarriage = res.data.content[0].value[1].paramList;
            t.selectPolitical = res.data.content[0].value[2].paramList;
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    // getSelect() {
    //   const t = this;
    //   getDataLevelUserLogin({
    //     _mt: "baseParmInfo.getSelectValue",
    //     typeCode: "yesno"
    //   })
    //     .then(res => {
    //       if (isSuccess(res, t)) {
    //         t.yesOrNo = res.data.content[0].value[0].paramList;
    //       }
    //     })
    //     .catch(() => {
    //       this.$Modal.error({
    //         title: this.$t("reminder.err"),
    //         content: this.$t("reminder.errormessage")
    //       });
    //     });
    // },

    // 弹出框相关方法
    close() {
      const t = this;
      t.openPick = false;
    },
   
    changeinput(name, id) {
      const t = this;
      t.unitCityName = name;
      t.form.empnhWklocatDis = id;
    },
    
    pickData() {
     const t = this
            if (!this.disabled) {
                t.popup = '0'
                t.$refs.searchCity.getData(this.params, '02city\',\'03county')
                t.openPick = true
            }
    },
    
    workplace() {
      if (!this.disabled) {
                const t = this
                t.unitCityName = ''
                t.form.empnhWklocatDis = ''
            }
    },
    
    //      保存方法
    save() {
      const t = this;
      const data = deepCopy(t.form);
      // _mt = "empEmpnh.addOrUpd";
      data.logType = t.logType;
      data.id = t.id;
      //        若有日期字段 需要进行转换
      if (data.areaTimesta !== undefined) {
        data.areaTimesta =
          data.areaTimesta === ""
            ? ""
            : new Date(data.areaTimesta).format("yyyy-MM-dd");
      }
      if (data.areaTimestop !== undefined) {
        data.areaTimestop =
          data.areaTimestop === ""
            ? ""
            : new Date(data.areaTimestop).format("yyyy-MM-dd");
      }
      //        保存无需关闭页面 无需变更
      this.$refs.form.validate(valid => {
        if (valid) {
          getDataLevelUserLoginNew(data)
            .then(res => {
              if (isSuccess(res, t)) {
                if (t.id) {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.updsuccess")
                  });
                  t.$emit("update", res.data.content[0]);
                } else {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.addsuccess")
                  });
                  t.$emit("newdata", res.data.content[0]);
                }
              }
            })
            .catch(() => {
              t.$Modal.error({
                title: this.$t("reminder.err"),
                content: this.$t("reminder.errormessage")
              });
            });
        }
      });
    },
    clear() {
      const t = this;
      // t.areaContryDis = "";
      t.form = {};
      this.$refs.form.resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.option-main{
  position: relative;
  height: 500px;
  overflow-y: auto;
  .btn{
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>

