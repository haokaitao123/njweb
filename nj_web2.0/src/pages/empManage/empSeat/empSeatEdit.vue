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
        <Row class="main-height" ref="scrollBox">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <Row>
              <Col span="11">
                <FormItem label="分机号" prop="seatNumber">
                  <Input
                    v-model="formValidate.seatNumber"
                    :disabled="disabled"
                    placeholder="请输入分机号"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="员工姓名" prop="empId">
                  <span @dblclick="disabled?'':clearEmpnhName()">
                    <Input
                      v-model="empnhName"
                      icon="search"
                      :disabled="disabled"
                      :readonly="true"
                      placeholder="请选择员工姓名"
                      @on-click="disabled?'':empnhNamePick()"
                    />
                  </span>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="部门名称" prop="deptId">
                  <span @dblclick="disabled?'':clearUnitFname()">
                    <Input
                      v-model="unitFname"
                      icon="search"
                      :disabled="disabled"
                      :readonly="true"
                      placeholder="请选择部门名称"
                      @on-click="disabled?'':unitFnamePick()"
                    />
                  </span>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="岗位名称" prop="postId">
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
              <Col span="11">
                <FormItem label="结束时间" prop="seatEndtime">
                  <DatePicker
                    type="date"
                    placeholder="请选择结束时间"
                    :editable="false"
                    :disabled="disabled"
                    :readonly="disabled"
                    v-model="formValidate.seatEndtime"
                    format="yyyy-MM-dd"
                    style="width: 100%"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="状态" prop="state">
                  <Input v-model="formValidate.state" :disabled="disabled" placeholder="请输入状态"></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="状态时长" prop="seatStahours">
                  <Input
                    v-model="formValidate.seatStahours"
                    :disabled="disabled"
                    placeholder="请输入状态时长"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="间隙时间" prop="seatGaphours">
                  <Input
                    v-model="formValidate.seatGaphours"
                    :disabled="disabled"
                    placeholder="请输入间隙时间"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="通话数量" prop="seatCallnumber">
                  <Input
                    v-model="formValidate.seatCallnumber"
                    :disabled="disabled"
                    placeholder="请输入通话数量"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="总通话时长" prop="seatTotalhours">
                  <Input
                    v-model="formValidate.seatTotalhours"
                    :disabled="disabled"
                    placeholder="请输入总通话时长"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="总通话均长" prop="seatAverage">
                  <Input
                    v-model="formValidate.seatAverage"
                    :disabled="disabled"
                    placeholder="请输入总通话均长"
                  ></Input>
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
      </div>
      <div class="button_box">
        <Button type="ghost" @click="handleReset" class="btn1">取消</Button>
        <Button type="primary" @click="handleSubmit" v-show="!disabled" class="btn">保存</Button>
      </div>
    </div>
    <!--  弹出选择框  -->
    <transition name="fade">
      <searchEmpnhMaster
        v-show="openEmpnhName"
        @closeModal="closeEmpnhName"
        @inputModal="inputEmpnhName"
        ref="empnhNameSearch"
      ></searchEmpnhMaster>
    </transition>
    <transition name="fade">
      <searchDept
        v-show="openUnitFname"
        @closeModal="closeUnitFname"
        @inputModal="inputUnitFname"
        ref="unitFnameSearch"
      ></searchDept>
    </transition>
    <transition name="fade">
      <searchPost
        v-show="openPostFname"
        @closeModal="closePostFname"
        @inputModal="inputPostFname"
        ref="postFnameSearch"
      ></searchPost>
    </transition>
  </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
import downLoad from '@/components/downLoad/downLoad'
import valid from '@/lib/pub_valid'
import searchEmpnhMaster from "@/components/searchTable/searchEmpnhMaster";
import searchDept from "@/components/searchTable/searchDept";
import searchPost from "@/components/searchTable/searchPost";

export default {
    data () {
        //数字校验
        const numberCheck = (rule, value, numberValCheck) => {
            if (value !== '' && value !== undefined) {
                if (valid.val_number103(value)) {
                    return numberValCheck()
                }
                return numberValCheck(new Error(rule.message))
            }
            numberValCheck()
        };
        return {
            //表单loading
            spinShow: false,
            //禁选 
            disabled: false,
            openEmpnhName: false,
empnhName: "",
openUnitFname: false,
unitFname: "",
openPostFname: false,
postFname: "",

            
            typeCode: "",
            //提交mt名称
            addOrUpd_mt: 'empSeat.addOrUpd',
            //获取数据详情mt名称
            getById_mt: 'empSeat.getById',
            //form表单提交数据
            formValidate: {
            	    seatNumber: '', 
    empId: '', 
    deptId: '', 
    postId: '', 
    seatEndtime: '', 
    state: '', 
    seatStahours: '', 
    seatGaphours: '', 
    seatCallnumber: '', 
    seatTotalhours: '', 
    seatAverage: '', 
    note: '', 

            },
            //表单验证规则
            ruleValidate: {
                seatNumber: [
{ required: true, message: "请输入分机号", trigger: "blur"  },
],
empId: [
{ required: true, message: "请输入员工姓名", trigger: "change"  },
],
deptId: [
{ required: true, message: "请输入部门名称", trigger: "change"  },
],
postId: [
{ required: true, message: "请输入岗位名称", trigger: "change"  },
],
seatEndtime: [
{ required: true, message: "请输入结束时间", trigger: "change" , type:"date"  },
],
state: [
{ required: true, message: "请输入状态", trigger: "blur"  },
],
seatStahours: [
{ required: true, message: "请输入状态时长", trigger: "blur"  },
],
seatGaphours: [
{ required: true, message: "请输入间隙时间", trigger: "blur"  },
],
seatCallnumber: [
{ required: true, message: "请输入通话数量", trigger: "blur"  },
{ required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur"  },
],
seatTotalhours: [
{ required: true, message: "请输入总通话时长", trigger: "blur"  },
],
seatAverage: [
{ required: true, message: "请输入总通话均长", trigger: "blur"  },
],

            },
        }
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    components: {
    	searchEmpnhMaster,
searchDept,
searchPost,

        
    },
    mounted () {
        
    },
    methods: {
        //获取列表详情
        getData (id) {
            const t = this
            t.spinShow = true
            getDataLevelUserLogin({
                _mt: t.getById_mt,
                id: id,
                logType: 'Id查询',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let data = res.data.content[0]
                       t.formValidate.seatNumber = data.seatNumber;
    t.formValidate.empId = data.empId;
    t.empnhName = data.empnhName;
    t.formValidate.deptId = data.deptId;
    t.unitFname = data.unitFname;
    t.formValidate.postId = data.postId;
    t.postFname = data.postFname;
    t.formValidate.seatEndtime = data.seatEndtime;
    t.formValidate.state = data.state;
    t.formValidate.seatStahours = data.seatStahours;
    t.formValidate.seatGaphours = data.seatGaphours;
    t.formValidate.seatCallnumber = data.seatCallnumber;
    t.formValidate.seatTotalhours = data.seatTotalhours;
    t.formValidate.seatAverage = data.seatAverage;
    t.formValidate.note = data.note;

                }
            }).catch(() => {
                this.$Message.error(this.$t("reminder.errormessage"));
            }).finally(() => {
                t.spinShow = false
            });
        },
        //获取下拉列表数据
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt: 'baseParmInfo.getSelectValue',
                typeCode: t.typeCode,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let data = res.data.content[0];
                    
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        //提交
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data._mt = t.addOrUpd_mt;
            data.logType = t.logType;
            if (t.logType === t.$t('button.upd')) {
                data.id = t.id
            }
            
            t.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginNew(data).then((res) => {
                        if (isSuccess(res, t)) {
                            if (t.logType === t.$t('button.add')) {
                                t.$Message.success(t.$t("reminder.addsuccess"));
                                t.$emit('newData', res.data.content[0])
                            } else {
                                t.$Message.success(t.$t("reminder.updsuccess"));
                                t.$emit('update', res.data.content[0])
                            }
                            t.handleReset();
                        }
                    }).catch(() => {
                        t.$Message.error(t.$t("reminder.errormessage"));
                    })
                }
            })
        },
        //取消
        handleReset () {
            //重置表单
            this.$refs.scrollBox.$el.scrollTop = "0";
            this.$refs.formValidate.resetFields();
            this.formValidate = {};
            this.empnhName = "";
this.unitFname = "";
this.postFname = "";

            this.$emit('closeUp');
        },
       clearEmpnhName () {
this.empnhName = "";
this.formValidate.empId = "";
},
empnhNamePick () {
this.$refs.empnhNameSearch.getData();
this.openEmpnhName = true;
 },
closeEmpnhName () {
this.openEmpnhName = false;
},
inputEmpnhName (row) {
this.formValidate.empId = row.empId;
this.empnhName = row.empnhName;
},
clearUnitFname () {
this.unitFname = "";
this.formValidate.deptId = "";
},
unitFnamePick () {
this.$refs.unitFnameSearch.getData();
this.openUnitFname = true;
 },
closeUnitFname () {
this.openUnitFname = false;
},
inputUnitFname (row) {
this.formValidate.deptId = row.deptId;
this.unitFname = row.unitFname;
},
clearPostFname () {
this.postFname = "";
this.formValidate.postId = "";
},
postFnamePick () {
this.$refs.postFnameSearch.getData();
this.openPostFname = true;
 },
closePostFname () {
this.openPostFname = false;
},
inputPostFname (row) {
this.formValidate.postId = row.postId;
this.postFname = row.postFname;
},

    },
}
</script>
<style lang="scss">
@import "../../../sass/updateAndAdd";
@import "../../../sass/singleUpdateAdd";
</style>