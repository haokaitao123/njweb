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
      <div class="option-main">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Row style="max-height: 420px;overflow-y: auto;" ref="scrollBox">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <i-col span="11">
              <FormItem label="扣款人姓名" prop="empId">
                <!--绑定双击清除方法-->
                <span @dblclick="forbidden?'':dbclean()">
                  <!--v-model绑定显示字段-->
                  <Input
                    v-model="empnhName"
                    icon="search"
                    readonly="readonly"
                    :disabled="forbidden"
                    placeholder="请选择员工"
                    @on-click="forbidden?'':pickEmpData()"
                  />
                </span>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="扣款部门" prop="unitFname">
                <Input v-model="unitFname" :disabled="true" placeholder="请输入部门名称"></Input>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="扣款岗位" prop="postFname">
                <Input v-model="postFname" :disabled="true" placeholder="请输入岗位名称"></Input>
              </FormItem>
            </i-col>

            <i-col span="11">
              <FormItem label="扣款指标" prop="asesPerfaDis">
                <span @dblclick="forbidden?'':dbPerfclean()">
                  <Input
                    v-model="asesPerfaDis"
                    icon="search"
                    readonly="readonly"
                    :disabled="forbidden"
                    placeholder="选择考核指标"
                    @on-click="forbidden?'':pickPerfData('a')"
                  />
                </span>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="扣款类型" prop="asesPerfbDis">
                
                  <Input
                    v-model="asesPerfbDis"
                    icon="search"
                    readonly="readonly"
                    :disabled="forbidden"
                    placeholder="选择扣款类型"
                    @on-click="forbidden?'':pickPerfData('b')"
                  />
             
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="扣款项" prop="asesPerfcDis">
               
                  <Input
                    v-model="asesPerfcDis"
                    icon="search"
                    readonly="readonly"
                    :disabled="forbidden"
                    placeholder="请选择扣款项"
                    @on-click="forbidden?'':pickPerfData('c')"
                  />
               
              </FormItem>
            </i-col>

            <i-col span="11">
              <FormItem label="扣款金额" prop="asesAmount">
                <Input
                  v-model="formValidate.asesAmount"
                  :disabled="forbidden"
                  placeholder="请输入扣款金额"
                >></Input>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="扣款日期" prop="asesDate">
                <DatePicker
                  type="date"
                  placeholder="请选择扣款日期"
                  :disabled="forbidden"
                  v-model="formValidate.asesDate"
                  style="width: 100%;"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="收款人" prop="asesUser">
                <Input v-model="asesUserDis" :disabled="true"></Input>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="是否工资扣除" prop="asesIspay">
                <RadioGroup v-model="formValidate.asesIspay">
                  <Radio
                    :label="item.paramCode"
                    v-for="(item,index) in selectAttendy"
                    :key="index"
                    :disabled="forbidden"
                  >{{item.paramInfoCn}}</Radio>
                </RadioGroup>
              </FormItem>
            </i-col>
            <!-- <i-col span="11">
              <FormItem label="1.5R扣款金额" prop="asesPamount">
                <Input v-model="formValidate.asesPamount" :disabled="forbidden"></Input>
              </FormItem>
            </i-col> -->
            <i-col span="22">
              <FormItem label="备注" prop="note">
                <Input
                  v-model="formValidate.note"
                  type="textarea"
                  :disabled="forbidden"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="请输入备注..."
                ></Input>
              </FormItem>
            </i-col>
          </Form>
        </Row>
      </div>
      <Button type="ghost" @click="handleReset" class="btn1">{{$t('button.cal')}}</Button>
      <Button
        type="primary"
        v-show="!forbidden"
        @click="handleSubmit"
        class="btn"
      >{{$t('button.sav')}}</Button>
    </div>
    <!--一个弹出框一个transition-->
    <transition name="fade">
      <searchEmpMaster
        v-show="openEmpMaster"
        @closeModal="closeEmp"
        @inputModal="inputEmp"
        ref="searchEmpMaster"
      ></searchEmpMaster>
    </transition>
    <transition name="fade">
      <searchPerfIndicators
        v-show="openPick"
        @closePerf="closePerf"
        @inputPerf="inputPerf"
        ref="searchPerfIndicators"
      ></searchPerfIndicators>
    </transition>
  </div>
</template>
<script>
import {
  getDataLevelUserLoginSenior,
  getDataLevelUserLogin,
  uploadFile
} from "../../axios/axios";
import { isSuccess, deepCopy } from "../../lib/util";
import searchEmpMaster from "../../components/searchTable/searchEmpnhMaster";
import searchPerfIndicators from "../../components/searchTable/searchPerfIndicators";
import valid from "../../lib/pub_valid.js";

export default {
  data() {
    /*数字验证*/
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
      file: "",
      filekey: "",
      loadingStatus: false,
      type: "",
      distype: false,
      perftype: "",
      forbidden: false,
      formValidate: {
        empnhIdno: "",
        empId: "",
        deptId: "",
        postId: "",
        asesPerfa: "",
        asesPerfb: "",
        asesPerfc: "",
        asesAmount: "",
        asesDate: "",
        asesUser: localStorage.getItem("userId"),
        asesIspay: "",
       // asesPamount: ""
      },
      empnhName: "",
      unitFname: "",
      postFname: "",
      asesPerfaDis: "",
      asesPerfbDis: "",
      asesPerfcDis: "",
      asesUserDis: localStorage.getItem("name"),
      selectAttendy: [],
      openPick: false,
      openEmpMaster: false,
      /*必填验证*/
      ruleValidate: {
        empId: [
          { required: true, message: "请选择员工姓名", trigger: "change" }
        ],
        // asesPamount: [
        //   {
        //     required: true,
        //     message: "请输入1.5R扣款金额",
        //     trigger: "blur"
        //   },
        //   {
        //     validator: numberCheck,
        //     message: "请输入正确的数字格式",
        //     trigger: "blur"
        //   }
        // ],
        asesAmount: [
          {
            required: true,
            message: "请输入扣款金额",
            trigger: "blur"
          },
          {
            validator: numberCheck,
            message: "请输入正确的数字格式",
            trigger: "blur"
          }
        ]
      }
    };
  },
  /*资源加载子页面，js不需要*/
  components: {
    searchEmpMaster,
    searchPerfIndicators,
    valid
  },
  props: {
    id: Number,
    logType: String,
    index: Number
  },
  updated() {},
  mounted() {
    this.getSelect();
  },
  methods: {
    fileclean() {
      const t = this;
    },
    //上级清除员工选择
    dbclean() {
      const t = this;
      t.empnhName = "";
      t.formValidate.empnhIdno = "";
      t.formValidate.empId = "";
      t.unitFname = "";
      t.formValidate.deptId = "";
      t.postFname = "";
      t.formValidate.postId = "";
    },
    dbPerfclean() {
      const t = this;
      t.asesPerfaDis = "";
      t.formValidate.asesPerfa = "";
      t.formValidate.asesPerfb = "";
      t.asesPerfbDis = "";
      t.formValidate.asesPerfc = "";
      t.asesPerfcDis = "";
    },
    getData(id) {
      const t = this;
      t.spinShow = true; //开启loading效果
      getDataLevelUserLogin({
        _mt: "perfAssess.getById",
        id: id,
        funId: "1",
        logType: "绩效考核id查询"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            console.log(res.data.content[0]);
            t.formValidate.empnhIdno = res.data.content[0].empnhIdno;
            t.empnhName = res.data.content[0].empnhName;
            t.formValidate.empId = res.data.content[0].empId;
            t.unitFname = res.data.content[0].unitFname;
            t.formValidate.deptId = res.data.content[0].deptId;
            t.postFname = res.data.content[0].postFname;
            t.formValidate.postId = res.data.content[0].postId;
            t.asesPerfaDis = res.data.content[0].asesPerfaDis;
            t.asesPerfbDis = res.data.content[0].asesPerfbDis;
            t.asesPerfcDis = res.data.content[0].asesPerfcDis;
            t.formValidate.asesPerfa = res.data.content[0].asesPerfa;
            t.formValidate.asesPerfb = res.data.content[0].asesPerfb;
            t.formValidate.asesPerfc = res.data.content[0].asesPerfc;
            t.formValidate.asesAmount = res.data.content[0].asesAmount;
            t.formValidate.asesDate = res.data.content[0].asesDate;
            t.formValidate.asesUser = res.data.content[0].asesUser;
            t.asesUserDis = res.data.content[0].asesUserDis;
            t.formValidate.asesIspay = res.data.content[0].asesIspay;
           // t.formValidate.asesPamount = res.data.content[0].asesPamount;
            t.formValidate.note = res.data.content[0].note;
            if (t.logType === "查看") {
              t.forbidden = true;
            } else {
              t.forbidden = false;
            }
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        })
        .finally(() => {
          t.spinShow = false; //关闭loading效果
        });
    },
    getSelect() {
      //获取下拉列表数据
      const t = this;

      getDataLevelUserLogin({
        _mt: "baseParmInfo.getSelectValue",
        typeCode: "yesno"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.selectAttendy = res.data.content[0].value[0].paramList;
          }
        })
        .catch(() => {
          this.$Message.error(this.$t("reminder.errormessage"));
        });
    },
    handleSubmit() {
      const t = this;
      const data = deepCopy(t.formValidate);
      data.logType = t.logType;
      data._mt = "perfAssess.addOrUpd";
      if (data.asesDate !== undefined) {
        data.asesDate =
          data.asesDate === ""
            ? ""
            : new Date(data.asesDate).format("yyyy-MM-dd ");
      }
      if (t.logType === "修改") {
        data.id = t.id;
      }
      console.log(data, "data");
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          getDataLevelUserLoginSenior(data)
            .then(res => {
              if (isSuccess(res, t)) {
                if (t.logType === "新增") {
                  t.$Message.success("新增成功");
                  t.$emit("newData", res.data.content[0]);
                } else {
                  t.$Message.success("修改成功");
                  t.$emit("update", res.data.content[0]);
                }
                t.handleReset();
              }
            })
            .catch(() => {
              this.$Modal.error({
                title: this.$t("reminder.err"),
                content: this.$t("reminder.errormessage")
              });
            });
        }else{
					 this.$nextTick(function(){
                            let tt = document.querySelectorAll('.ivu-form-item-error');
                            if(tt[0].parentNode.offsetTop<this.$refs.scrollBox.$el.scrollTop){
                                this.$refs.scrollBox.$el.scrollTop = tt[0].parentNode.offsetTop
                            }
                        }) 
				}
      });
    },

    /*选择考核指标*/
    pickPerfData(type) {
      const t = this;
      if (type == "a") {
        t.$refs.searchPerfIndicators.params.perfPid = "0";
        t.perftype = "a";
      } else if (type == "b") {
        if (t.asesPerfaDis == "") {
          t.$Message.warning("请先选择扣款指标");
          return (t.openPick = false);
        }
        t.$refs.searchPerfIndicators.params.perfPid = t.formValidate.asesPerfa;
        t.perftype = "b";
      } else if (type == "c") {
        if (t.asesPerfbDis == "") {
          t.$Message.warning("请先选择扣款类型");
          return (t.openPick = false);
        }
        t.$refs.searchPerfIndicators.params.perfPid = t.formValidate.asesPerfb;
        t.perftype = "c";
      }
      t.$refs.searchPerfIndicators.getData();
      t.openPick = true;
    },
    closePerf() {
      const t = this;
      t.openPick = false;
    },
    inputPerf(row) {
      const t = this;
      if (t.perftype == "a") {
        t.asesPerfaDis = row.perfName;
        t.formValidate.asesPerfa = row.id;
      } else if (t.perftype == "b") {
        t.asesPerfbDis = row.perfName;
        t.formValidate.asesPerfb = row.id;
      } else if (t.perftype == "c") {
        t.asesPerfcDis = row.perfName;
        t.formValidate.asesPerfc = row.id;
      }
    },
    /*选择员工*/
    pickEmpData() {
      const t = this;
      t.$refs.searchEmpMaster.getData();
      t.openEmpMaster = true;
    },
    closeEmp() {
      const t = this;
      t.openEmpMaster = false;
    },
    inputEmp(row) {
      console.log("afgd", row);
      const t = this;
      t.empnhName = row.empnhName;
      t.formValidate.empnhIdno = row.empnhIdno;
      t.formValidate.empId = row.id;
      t.unitFname = row.unitFname;
      t.formValidate.deptId = row.deptId;
      t.postFname = row.postFname;
      t.formValidate.postId = row.postId;
    },
    handleReset() {
      const t = this;
      t.$refs.formValidate.resetFields();
      t.$refs.scrollBox.$el.scrollTop = "0";
      t.formValidate.empnhIdno = "";
      t.empnhName = "";
      t.formValidate.empId = "";
      t.unitFname = "";
      t.formValidate.deptId = "";
      t.postFname = "";
      t.formValidate.postId = "";
      t.asesPerfaDis = "";
      t.asesPerfbDis = "";
      t.asesPerfcDis = "";
      t.formValidate.asesPerfa = "";
      t.formValidate.asesPerfb = "";
      t.formValidate.asesPerfc = "";
      t.formValidate.asesAmount = "";
      t.formValidate.asesDate = "";
      t.formValidate.asesIspay = "";
      //t.formValidate.asesPamount = "";
      t.formValidate.note = "";
      t.$emit("closeUp");
    },
    handleUpload(file) {
      this.file = file;
      this.loadingStatus = true;
      return false;
    }
  }
};
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
