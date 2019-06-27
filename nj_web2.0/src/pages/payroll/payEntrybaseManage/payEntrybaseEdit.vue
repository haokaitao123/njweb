<template>
  <div class="option-main">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Row style="overflow-y: auto;" :style="{ height: disabled?'500px':'420px' }" ref="scrollBox">
      <Form
        :model="formValidate"
        label-position="right"
        ref="formValidate"
        :label-width="100"
        :rules="ruleValidate"
      >
        <Row>
          <Col span="11">
            <FormItem label="招聘专员" prop="enbaStaff">
              <span @dblclick="disabled?'':clearEmpnhName()">
                <Input
                  v-model="empnhName"
                  icon="search"
                  :disabled="disabled"
                  :readonly="true"
                  placeholder="请选择招聘专员"
                  @on-click="disabled?'':empnhNamePick()"
                />
              </span>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="项目主管" prop="enbaPersonDis">
              <Input
                v-model="formValidate.enbaPersonDis"
                :disabled="disabled"
                placeholder="请输入项目主管"
              ></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="项目经理" prop="enbaManagerDis">
              <Input
                v-model="formValidate.enbaManagerDis"
                :disabled="disabled"
                placeholder="请输入项目经理"
              ></Input>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="项目名称" prop="unitFname">
              <Input v-model="formValidate.unitFname" :disabled="disabled" placeholder="请输入项目名称"></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="内招项目名称" prop="enbaDept">
              <span @dblclick="disabled?'':clearEnbaDeptDis()">
                <Input
                  v-model="enbaDeptDis"
                  icon="search"
                  :disabled="disabled"
                  :readonly="true"
                  placeholder="请选择内招项目名称"
                  @on-click="disabled?'':enbaDeptDisPick()"
                />
              </span>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="入职性质" prop="enbaNatureDis">
              <Select
                v-model="formValidate.enbaNatureDis"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择入职性质"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in enbaNatureDisData"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="入职日期" prop="enbaEtdate">
              <DatePicker
                type="date"
                placeholder="请选择入职日期"
                :editable="false"
                :disabled="disabled"
                :readonly="disabled"
                v-model="formValidate.enbaEtdate"
                format="yyyy-MM-dd"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="离职日期" prop="enbaLevdate">
              <DatePicker
                type="date"
                placeholder="请选择离职日期"
                :editable="false"
                :disabled="disabled"
                :readonly="disabled"
                v-model="formValidate.enbaLevdate"
                format="yyyy-MM-dd"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="业绩收入" prop="enbaPerfor">
              <Input v-model="formValidate.enbaPerfor" :disabled="disabled" placeholder="请输入业绩收入"></Input>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="入职客户名称" prop="enbaCusm">
              <Input v-model="formValidate.enbaCusm" :disabled="disabled" placeholder="请输入入职客户名称"></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="岗位名称" prop="enbaPost">
              <span @dblclick="disabled?'':clearPostFname()">
                <Input
                  v-model="postFname"
                  icon="search"
                  :disabled="disabled"
                  :readonly="true"
                  placeholder="请选择岗位名称"
                  @on-click="disabled?'':postFnamePick()"
                />
              </span>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="身份" prop="enbaIdentityDis">
              <Select
                v-model="formValidate.enbaIdentityDis"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择身份"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in enbaIdentityDisData"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="面试日期" prop="enbaFilldate">
              <DatePicker
                type="date"
                placeholder="请选择面试日期"
                :editable="false"
                :disabled="disabled"
                :readonly="disabled"
                v-model="formValidate.enbaFilldate"
                format="yyyy-MM-dd"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="姓名" prop="enbaName">
              <Input v-model="formValidate.enbaName" :disabled="disabled" placeholder="请输入姓名"></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="证件号码" prop="enbaIdno">
              <Input v-model="formValidate.enbaIdno" :disabled="disabled" placeholder="请输入证件号码"></Input>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="手机号" prop="enbaMobile">
              <Input v-model="formValidate.enbaMobile" :disabled="disabled" placeholder="请输入手机号"></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="性别" prop="enbaGenderDis">
              <Select
                v-model="formValidate.enbaGenderDis"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择性别"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in enbaGenderDisData"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="出生日期" prop="enbaBirtday">
              <DatePicker
                type="date"
                placeholder="请选择出生日期"
                :editable="false"
                :disabled="disabled"
                :readonly="disabled"
                v-model="formValidate.enbaBirtday"
                format="yyyy-MM-dd"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="籍贯" prop="enbaBirtplace">
              <Input v-model="formValidate.enbaBirtplace" :disabled="disabled" placeholder="请输入籍贯"></Input>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="民族" prop="enbaNatalityDis">
              <Select
                v-model="formValidate.enbaNatalityDis"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择民族"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in enbaNatalityDisData"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="婚育状况" prop="enbaPoliticalDis">
              <Select
                v-model="formValidate.enbaPoliticalDis"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择婚育状况"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in enbaPoliticalDisData"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="婚育状况" prop="enbaPoliticalDis">
              <Select
                v-model="formValidate.enbaPoliticalDis"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择婚育状况"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in enbaPoliticalDisData"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="婚育状况" prop="enbaPoliticalDis">
              <Select
                v-model="formValidate.enbaPoliticalDis"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择婚育状况"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in enbaPoliticalDisData"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="身高(cm)" prop="enbaHeight">
              <Input v-model="formValidate.enbaHeight" :disabled="disabled" placeholder="请输入身高(cm)"></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="体重(kg)" prop="enbaWeight">
              <Input v-model="formValidate.enbaWeight" :disabled="disabled" placeholder="请输入体重(kg)"></Input>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="学历" prop="enbaEducatDis">
              <Select
                v-model="formValidate.enbaEducatDis"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择学历"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in enbaEducatDisData"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="毕业院校" prop="enbaSchool">
              <Input v-model="formValidate.enbaSchool" :disabled="disabled" placeholder="请输入毕业院校"></Input>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="专业" prop="enbaProfes">
              <Input v-model="formValidate.enbaProfes" :disabled="disabled" placeholder="请输入专业"></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="现居住地" prop="enbaLiving">
              <Input v-model="formValidate.enbaLiving" :disabled="disabled" placeholder="请输入现居住地"></Input>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="家庭地址" prop="enbaFamadds">
              <Input v-model="formValidate.enbaFamadds" :disabled="disabled" placeholder="请输入家庭地址"></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="紧急联系人姓名" prop="enbaEmernm">
              <Input
                v-model="formValidate.enbaEmernm"
                :disabled="disabled"
                placeholder="请输入紧急联系人姓名"
              ></Input>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="紧急联系人电话" prop="enbaEmphone">
              <Input
                v-model="formValidate.enbaEmphone"
                :disabled="disabled"
                placeholder="请输入紧急联系人电话"
              ></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="与本人关系" prop="enbaWithmeDis">
              <Select
                v-model="formValidate.enbaWithmeDis"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择与本人关系"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in enbaWithmeDisData"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="期望薪资" prop="enbaSalary">
              <Input v-model="formValidate.enbaSalary" :disabled="disabled" placeholder="请输入期望薪资"></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="职业状态" prop="enbaProstatusDis">
              <Select
                v-model="formValidate.enbaProstatusDis"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择职业状态"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in enbaProstatusDisData"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="可到岗时间" prop="enbaAvaitime">
              <DatePicker
                type="date"
                placeholder="请选择可到岗时间"
                :editable="false"
                :disabled="disabled"
                :readonly="disabled"
                v-model="formValidate.enbaAvaitime"
                format="yyyy-MM-dd"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="是否有亲朋在本公司任职" prop="enbaIsrelativesDis">
              <Select
                v-model="formValidate.enbaIsrelativesDis"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择是否有亲朋在本公司任职"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in enbaIsrelativesDisData"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="本公司任职亲朋姓名" prop="enbaRelatname">
              <Input
                v-model="formValidate.enbaRelatname"
                :disabled="disabled"
                placeholder="请输入本公司任职亲朋姓名"
              ></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="本公司任职亲朋所在部门" prop="enbaRelatdept">
              <Input
                v-model="formValidate.enbaRelatdept"
                :disabled="disabled"
                placeholder="请输入本公司任职亲朋所在部门"
              ></Input>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="是否有犯罪记录" prop="enbaIscriminalDis">
              <Select
                v-model="formValidate.enbaIscriminalDis"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择是否有犯罪记录"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in enbaIscriminalDisData"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="通过何种方式应聘" prop="enbaApplytype">
              <Input
                v-model="formValidate.enbaApplytype"
                :disabled="disabled"
                placeholder="请输入通过何种方式应聘"
              ></Input>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="是否有纹身" prop="enbaIstattooDis">
              <Select
                v-model="formValidate.enbaIstattooDis"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择是否有纹身"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in enbaIstattooDisData"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          
          <Col span="11">
            <FormItem label="介绍人姓名" prop="enbaIntrname">
              <Input
                v-model="formValidate.enbaIntrname"
                :disabled="disabled"
                placeholder="请输入介绍人姓名"
              ></Input>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="是否服从调配" prop="enbaIscomDis">
              <Select
                v-model="formValidate.enbaIscomDis"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择是否服从调配"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in enbaIscomDisData"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="自我评价" prop="enbaSelfeval">
              <Input v-model="formValidate.enbaSelfeval" :disabled="disabled" placeholder="请输入自我评价"></Input>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="招生范围" prop="enbaEnrorage">
              <Input v-model="formValidate.enbaEnrorage" :disabled="disabled" placeholder="请输入招生范围"></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="是否毕业" prop="enba_isgraduDis">
              <Select
                v-model="formValidate.enba_isgraduDis"
                :clearable="!disabled"
                :disabled="disabled"
                placeholder="请选择是否毕业"
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in enbaIsgraduDisData"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="最后应聘时间" prop="enbaFinalapptm">
              <DatePicker
                type="date"
                placeholder="请选择最后应聘时间"
                :editable="false"
                :disabled="disabled"
                :readonly="disabled"
                v-model="formValidate.enbaFinalapptm"
                format="yyyy-MM-dd"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="划回时间" prop="enbaDrawback">
              <DatePicker
                type="date"
                placeholder="请选择划回时间"
                :editable="false"
                :disabled="disabled"
                :readonly="disabled"
                v-model="formValidate.enbaDrawback"
                format="yyyy-MM-dd"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="11" offset="1">
            <FormItem label="划出时间" prop="enbaDrwaout">
              <DatePicker
                type="date"
                placeholder="请选择划出时间"
                :editable="false"
                :disabled="disabled"
                :readonly="disabled"
                v-model="formValidate.enbaDrwaout"
                format="yyyy-MM-dd"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="23">
            <FormItem label="备注" prop="note">
              <Input
                v-model="formValidate.note"
                :disabled="disabled"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入备注..."
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Row>
    <Button class="btn" type="primary" @click="handleSubmit" v-show="!disabled">{{$t('button.sav')}}</Button>
    <!--  弹出选择框  -->
    <transition name="fade">
      <searchEmpnhMaster
        v-show="openEmpnhName"
        @closeModal="closeEmpnhName"
        @inputModal="inputEmpnhName"
        ref="empnhNameSearch"
      ></searchEmpnhMaster>
    </transition>
    <!-- <transition name="fade">
      <searchDept
        v-show="openEnbaDeptDis"
        @closeModal="closeEnbaDeptDis"
        @inputModal="inputEnbaDeptDis"
        ref="enbaDeptDisSearch"
      ></searchDept>
    </transition>
    <transition name="fade">
      <searchPost
        v-show="openPostFname"
        @closeModal="closePostFname"
        @inputModal="inputPostFname"
        ref="postFnameSearch"
      ></searchPost>
    </transition> -->
  </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
import downLoad from "@/components/downLoad/downLoad";
import valid from "@/lib/pub_valid";
import searchEmpnhMaster from "@/components/searchTable/searchEmpnhMaster";
import searchDept from "@/components/searchTable/searchDept";
import searchPost from "@/components/searchTable/searchPost";

export default {
  data() {
    //数字校验
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
      //表单loading
      spinShow: false,
      //禁选
      disabled: false,
      openEmpnhName: false,
      empnhName: "",
      enbaPersonDis: "",
      enbaManagerDis: "",
      unitFname: "",
      openEnbaDeptDis: false,
      enbaDeptDis: "",
      enbaNatureDis: "",
      openPostFname: false,
      postFname: "",
      enbaIdentityDis: "",
      enbaGenderDis: "",
      enbaNatalityDis: "",
      enbaPoliticalDis: "",
      enbaPoliticalDis: "",
      enbaPoliticalDis: "",
      enbaEducatDis: "",
      enbaWithmeDis: "",
      enbaProstatusDis: "",
      enbaIsrelativesDis: "",
      enbaIscriminalDis: "",
      enbaIstattooDis: "",
      enbaIscomDis: "",
      enbaIsgraduDis: "",

      typeCode:
        "enbaNature,Identitytype,gender,nationtype,marrystatus,marrystatus,marrystatus,education,relationship,empstatus,yesno,yesno,yesno,yesno,yesno",
      enbaNatureDisData: [],
      enbaIdentityDisData: [],
      enbaGenderDisData: [],
      enbaNatalityDisData: [],
      enbaPoliticalDisData: [],
      enbaPoliticalDisData: [],
      enbaPoliticalDisData: [],
      enbaEducatDisData: [],
      enbaWithmeDisData: [],
      enbaProstatusDisData: [],
      enbaIsrelativesDisData: [],
      enbaIscriminalDisData: [],
      enbaIstattooDisData: [],
      enbaIscomDisData: [],
      enbaIsgraduDisData: [],
      //提交mt名称
      addOrUpd_mt: "payEntrybase.addOrUpd",
      //获取数据详情mt名称
      getById_mt: "payEntrybase.getById",
      //form表单提交数据
      formValidate: {
        enbaStaff: "",
        enbaPerson: "",
        enbaManager: "",
        deptId: "",
        enbaDept: "",
        enbaNature: "",
        enbaEtdate: "",
        enbaLevdate: "",
        enbaPerfor: "",
        enbaCusm: "",
        enbaDrawback: "",
        enbaDrwaout: "",
        enbaPost: "",
        enbaIdentity: "",
        enbaFilldate: "",
        enbaName: "",
        enbaIdno: "",
        enbaMobile: "",
        enbaGender: "",
        enbaBirtday: "",
        enbaBirtplace: "",
        enbaNatality: "",
        enbaPolitical: "",
        enbaHealthsta: "",
        enbaMaritlsta: "",
        enbaHeight: "",
        enbaWeight: "",
        enbaEducat: "",
        enbaSchool: "",
        enbaProfes: "",
        enbaLiving: "",
        enbaFamadds: "",
        enbaEmernm: "",
        enbaEmphone: "",
        enbaWithme: "",
        enbaSalary: "",
        enbaProstatus: "",
        enbaAvaitime: "",
        enbaIsrelatives: "",
        enbaRelatname: "",
        enbaRelatdept: "",
        enbaIscriminal: "",
        enbaIstattoo: "",
        enbaApplytype: "",
        enbaIntrname: "",
        enbaIscom: "",
        enbaSelfeval: "",
        enbaEnrorage: "",
        enbaIsgradu: "",
        enbaFinalapptm: "",
        note: "",
        state: ""
      },
      //表单验证规则
      ruleValidate: {
        enbaStaff: [
          { required: true, message: "请输入招聘专员", trigger: "change" }
        ],
        enbaDept: [
          { required: true, message: "请输入内招项目名称", trigger: "change" }
        ],
        enbaNature: [
          { required: true, message: "请输入入职性质", trigger: "change" }
        ],
        enbaEtdate: [
          { required: true, message: "请输入入职日期", trigger: "change" }
        ],
        enbaLevdate: [
          { required: true, message: "请输入离职日期", trigger: "change" }
        ],
        enbaPerfor: [
          {
            required: true,
            validator: numberCheck,
            message: "请输入正确的格式",
            trigger: "blur"
          }
        ],
        enbaCusm: [
          { required: true, message: "请输入入职客户名称", trigger: "blur" }
        ],
        enbaPost: [
          { required: true, message: "请输入岗位名称", trigger: "change" }
        ],
        enbaName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        enbaSalary: [
          {
            required: true,
            validator: numberCheck,
            message: "请输入正确的格式",
            trigger: "blur"
          }
        ],
        enbaDrawback: [
          { required: true, message: "请输入划回时间", trigger: "change" }
        ],
        enbaDrwaout: [
          { required: true, message: "请输入划出时间", trigger: "change" }
        ]
      }
    };
  },
  props: {
    modity: String,
    index: Number
  },
  computed: {
    id() {
      return this.$store.state.payEntrybase.mainId;
    },
    logType() {
      return this.$store.state.payEntrybase.logType;
    }
  },
  components: {
    searchEmpnhMaster,
    searchDept,
    searchPost
  },
  mounted() {},
  methods: {
    //获取列表详情
    getData(id) {
      const t = this;
      t.spinShow = true;
      getDataLevelUserLogin({
        _mt: t.getById_mt,
        id: id,
        logType: "Id查询"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            let data = res.data.content[0];
            t.formValidate.enbaStaff = data.enbaStaff;
            t.empnhName = data.empnhName;
            t.formValidate.enbaPerson = data.enbaPerson;
            t.enbaPersonDis = data.enbaPersonDis;
            t.formValidate.enbaManager = data.enbaManager;
            t.enbaManagerDis = data.enbaManagerDis;
            t.formValidate.deptId = data.deptId;
            t.unitFname = data.unitFname;
            t.formValidate.enbaDept = data.enbaDept;
            t.enbaDeptDis = data.enbaDeptDis;
            t.formValidate.enbaNature = data.enbaNature;
            t.enbaNatureDis = data.enbaNatureDis;
            t.formValidate.enbaEtdate = data.enbaEtdate;
            t.formValidate.enbaLevdate = data.enbaLevdate;
            t.formValidate.enbaPerfor = data.enbaPerfor;
            t.formValidate.enbaCusm = data.enbaCusm;
            t.formValidate.enbaDrawback = data.enbaDrawback;
            t.formValidate.enbaDrwaout = data.enbaDrwaout;
            t.formValidate.enbaPost = data.enbaPost;
            t.postFname = data.postFname;
            t.formValidate.enbaIdentity = data.enbaIdentity;
            t.enbaIdentityDis = data.enbaIdentityDis;
            t.formValidate.enbaFilldate = data.enbaFilldate;
            t.formValidate.enbaName = data.enbaName;
            t.formValidate.enbaIdno = data.enbaIdno;
            t.formValidate.enbaMobile = data.enbaMobile;
            t.formValidate.enbaGender = data.enbaGender;
            t.enbaGenderDis = data.enbaGenderDis;
            t.formValidate.enbaBirtday = data.enbaBirtday;
            t.formValidate.enbaBirtplace = data.enbaBirtplace;
            t.formValidate.enbaNatality = data.enbaNatality;
            t.enbaNatalityDis = data.enbaNatalityDis;
            t.formValidate.enbaPolitical = data.enbaPolitical;
            t.enbaPoliticalDis = data.enbaPoliticalDis;
            t.formValidate.enbaHealthsta = data.enbaHealthsta;
            t.enbaPoliticalDis = data.enbaPoliticalDis;
            t.formValidate.enbaMaritlsta = data.enbaMaritlsta;
            t.enbaPoliticalDis = data.enbaPoliticalDis;
            t.formValidate.enbaHeight = data.enbaHeight;
            t.formValidate.enbaWeight = data.enbaWeight;
            t.formValidate.enbaEducat = data.enbaEducat;
            t.enbaEducatDis = data.enbaEducatDis;
            t.formValidate.enbaSchool = data.enbaSchool;
            t.formValidate.enbaProfes = data.enbaProfes;
            t.formValidate.enbaLiving = data.enbaLiving;
            t.formValidate.enbaFamadds = data.enbaFamadds;
            t.formValidate.enbaEmernm = data.enbaEmernm;
            t.formValidate.enbaEmphone = data.enbaEmphone;
            t.formValidate.enbaWithme = data.enbaWithme;
            t.enbaWithmeDis = data.enbaWithmeDis;
            t.formValidate.enbaSalary = data.enbaSalary;
            t.formValidate.enbaProstatus = data.enbaProstatus;
            t.enbaProstatusDis = data.enbaProstatusDis;
            t.formValidate.enbaAvaitime = data.enbaAvaitime;
            t.formValidate.enbaIsrelatives = data.enbaIsrelatives;
            t.enbaIsrelativesDis = data.enbaIsrelativesDis;
            t.formValidate.enbaRelatname = data.enbaRelatname;
            t.formValidate.enbaRelatdept = data.enbaRelatdept;
            t.formValidate.enbaIscriminal = data.enbaIscriminal;
            t.enbaIscriminalDis = data.enbaIscriminalDis;
            t.formValidate.enbaIstattoo = data.enbaIstattoo;
            t.enbaIstattooDis = data.enbaIstattooDis;
            t.formValidate.enbaApplytype = data.enbaApplytype;
            t.formValidate.enbaIntrname = data.enbaIntrname;
            t.formValidate.enbaIscom = data.enbaIscom;
            t.enbaIscomDis = data.enbaIscomDis;
            t.formValidate.enbaSelfeval = data.enbaSelfeval;
            t.formValidate.enbaEnrorage = data.enbaEnrorage;
            t.formValidate.enbaIsgradu = data.enbaIsgradu;
            t.enbaIsgraduDis = data.enba_isgraduDis;
            t.formValidate.enbaFinalapptm = data.enbaFinalapptm;
            t.formValidate.note = data.note;
            t.formValidate.state = data.state;
          }
        })
        .catch(() => {
          this.$Message.error(this.$t("reminder.errormessage"));
        })
        .finally(() => {
          t.spinShow = false;
        });
    },
    //获取下拉列表数据
    getSelect() {
      const t = this;
      getDataLevelUserLogin({
        _mt: "baseParmInfo.getSelectValue",
        typeCode: t.typeCode
      })
        .then(res => {
          if (isSuccess(res, t)) {
            let data = res.data.content[0];
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    //提交
    handleSubmit() {
      const t = this;
      const data = deepCopy(t.formValidate);
      data._mt = t.addOrUpd_mt;
      data.logType = t.logType;
      if (t.logType === t.$t("button.upd")) {
        data.id = t.id;
      }
      if (data.null !== undefined) {
        data.null =
          data.null === "" ? "" : new Date(data.null).format("yyyy-MM-dd");
      }

      t.$refs.formValidate.validate(valid => {
        if (valid) {
          getDataLevelUserLoginNew(data)
            .then(res => {
              if (isSuccess(res, t)) {
                if (t.logType === t.$t("button.add")) {
                  t.$Message.success(t.$t("reminder.addsuccess"));
                  t.$store.commit(
                    "payEntrybase/setMainId",
                    res.data.content[0].id
                  );
                  t.$store.commit("payEntrybase/setLogType", "修改");
                  t.$emit("newData", res.data.content[0]);
                } else {
                  t.$Message.success(t.$t("reminder.updsuccess"));
                  t.$emit("update", res.data.content[0]);
                }
                t.handleReset();
              }
            })
            .catch(() => {
              t.$Message.error(t.$t("reminder.errormessage"));
            });
        }
      });
    },
    //取消
    clear() {
      //重置表单
      this.$refs.scrollBox.$el.scrollTop = "0";
      this.$refs.formValidate.resetFields();
      this.formValidate = {};
      this.empnhName = "";
      this.enbaPersonDis = "";
      this.enbaManagerDis = "";
      this.unitFname = "";
      this.enbaDeptDis = "";
      this.enbaNatureDis = "";
      this.postFname = "";
      this.enbaIdentityDis = "";
      this.enbaGenderDis = "";
      this.enbaNatalityDis = "";
      this.enbaPoliticalDis = "";
      this.enbaPoliticalDis = "";
      this.enbaPoliticalDis = "";
      this.enbaEducatDis = "";
      this.enbaWithmeDis = "";
      this.enbaProstatusDis = "";
      this.enbaIsrelativesDis = "";
      this.enbaIscriminalDis = "";
      this.enbaIstattooDis = "";
      this.enbaIscomDis = "";
      this.enbaIsgraduDis = "";

      this.$emit("closeUp");
      this.disabled = false;
    },
    clearEmpnhName() {
      this.empnhName = "";
      this.formValidate.enbaStaff = "";
    },
    empnhNamePick() {
      this.$refs.empnhNameSearch.getData();
      this.openEmpnhName = true;
    },
    closeEmpnhName() {
      this.openEmpnhName = false;
    },
    inputEmpnhName(row) {
      this.formValidate.enbaStaff = row.enbaStaff;
      this.empnhName = row.empnhName;
    },
    clearEnbaDeptDis() {
      this.enbaDeptDis = "";
      this.formValidate.enbaDept = "";
    },
    enbaDeptDisPick() {
      this.$refs.enbaDeptDisSearch.getData();
      this.openEnbaDeptDis = true;
    },
    closeEnbaDeptDis() {
      this.openEnbaDeptDis = false;
    },
    inputEnbaDeptDis(row) {
      this.formValidate.enbaDept = row.enbaDept;
      this.enbaDeptDis = row.enbaDeptDis;
    },
    clearPostFname() {
      this.postFname = "";
      this.formValidate.enbaPost = "";
    },
    postFnamePick() {
      this.$refs.postFnameSearch.getData();
      this.openPostFname = true;
    },
    closePostFname() {
      this.openPostFname = false;
    },
    inputPostFname(row) {
      this.formValidate.enbaPost = row.enbaPost;
      this.postFname = row.postFname;
    }
  }
};
</script>
<style lang="scss">
@import "../../../sass/updatemain";
</style>