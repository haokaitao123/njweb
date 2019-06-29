<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse"
                size="16"
                style="margin-right: 10px;">
          </Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16">
          </Icon>
        </Button>
      </div>
      <div class="option-main">
        <Spin size="large"
              fix
              v-if="spinShow">
        </Spin>
        <Row class="main-height"
             ref="scrollBox">
          <Form ref="formValidate"
                :model="formValidate"
                :rules="ruleValidate"
                :label-width="100">
            <Row>
              <Col span="11">
              <FormItem label="项目名称" prop="deptId">
                    <span @dblclick="disabled?'':clearUnitFname()">
                      <Input v-model="unitFname"
                             icon="search"
                             :disabled="disabled"
                             :readonly="true"
                             placeholder="请选择项目名称"
                             @on-click="disabled?''
                        :unitFnamePick()"/>
                    </span>
              </FormItem>
              </Col>
              <Col span="11" offset="1">
              <FormItem label="所属期间" prop="profPer">
                <Input v-model="formValidate.profPer"
                       :disabled=disabled
                       placeholder="请输入所属期间"></Input>
              </FormItem>
              </Col>
              <Col span="11">
              <FormItem label="工资回款" prop="profPays">
                <Input v-model="formValidate.profPays"
                       :disabled=disabled
                       placeholder="请输入工资回款"></Input>
              </FormItem>
              </Col>
              <Col span="11" offset="1">
              <FormItem label="社保回款" prop="profSses">
                <Input v-model="formValidate.profSses"
                       :disabled=disabled
                       placeholder="请输入社保回款"></Input>
              </FormItem>
              </Col>
              <Col span="11">
              <FormItem label="公积金回款" prop="profAcfun">
                <Input v-model="formValidate.profAcfun"
                       :disabled=disabled
                       placeholder="请输入公积金回款"></Input>
              </FormItem>
              </Col>
              <Col span="11" offset="1">
              <FormItem label="服务费回款" prop="profServer">
                <Input v-model="formValidate.profServer"
                       :disabled=disabled
                       placeholder="请输入服务费回款"></Input>
              </FormItem>
              </Col>
              <Col span="11">
              <FormItem label="税金回款" prop="profTax">
                <Input v-model="formValidate.profTax"
                       :disabled=disabled
                       placeholder="请输入税金回款"></Input>
              </FormItem>
              </Col>
<!--              <Col span="11" offset="1">
              <FormItem label="工资支出" prop="profPayout">
                <Input v-model="formValidate.profPayout"
                       :disabled=disabled
                       placeholder="请输入工资支出"></Input>
              </FormItem>
              </Col>
              <Col span="11">
              <FormItem label="社保支出" prop="profSsesout">
                <Input v-model="formValidate.profSsesout"
                       :disabled=disabled
                       placeholder="请输入社保支出"></Input>
              </FormItem>
              </Col>
              <Col span="11" offset="1">
              <FormItem label="公积金支出" prop="profAcfunout">
                <Input v-model="formValidate.profAcfunout"
                       :disabled=disabled
                       placeholder="请输入公积金支出"></Input>
              </FormItem>
              </Col>
              <Col span="11">
              <FormItem label="税金支出" prop="profTaxout">
                <Input v-model="formValidate.profTaxout" :disabled=disabled placeholder="请输入税金支出"></Input>
              </FormItem>
              </Col>
              <Col span="11" offset="1">
              <FormItem label="其他" prop="profOther">
                <Input v-model="formValidate.profOther" :disabled=disabled placeholder="请输入其他"></Input>
              </FormItem>
              </Col>-->
              <Col span="23">
              <FormItem label="备注" prop="note">
                <Input v-model="formValidate.note"
                       :disabled="disabled" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       placeholder="请输入备注..."></Input>
              </FormItem>
              </Col>

            </Row>
          </Form>
        </Row>
      </div>
      <div class="button_box">
        <Button type="ghost"
                @click="handleReset"
                class="btn1">取消
        </Button>
        <Button type="primary"
                @click="handleSubmit"
                v-show="!disabled"
                class="btn">保存
        </Button>
      </div>

    </div>
    <!--  弹出选择框  -->
    <transition name="fade">
      <searchDept v-show="openUnitFname"
                  @closeModal="closeUnitFname"
                  @inputModal="inputUnitFname"
                  ref="unitFnameSearch"></searchDept>
    </transition>

  </div>
</template>
<script>
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, deepCopy} from '@/lib/util'
  import downLoad from '@/components/downLoad/downLoad'
  import valid from '@/lib/pub_valid'
  import searchDept from "@/components/searchTable/searchDept";

  export default {
    data() {
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
        openUnitFname: false,
        unitFname: "",
        typeCode: "",
        //提交mt名称
        addOrUpd_mt: 'payProfit.addOrUpd',
        //获取数据详情mt名称
        getById_mt: 'payProfit.getById',
        //form表单提交数据
        formValidate: {
          deptId: '',
          profPer: '',
          profPays: '',
          profSses: '',
          profAcfun: '',
          profServer: '',
          profTax: '',
          profPayout: '',
          profSsesout: '',
          profAcfunout: '',
          profTaxout: '',
          profOther: '',
          note: '',
        },
        //表单验证规则
        ruleValidate: {
          deptId: [
            {required: true, message: "请输入项目名称", trigger: "change"},
          ],
          profPer: [
            {required: true, message: "请输入所属期间", trigger: "blur"},
          ],
          profPays: [
            {required: true, message: "请输入工资回款", trigger: "blur"},
            {required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur"},
          ],
          profSses: [
            {required: true, message: "请输入社保回款", trigger: "blur"},
            {required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur"},
          ],
          profAcfun: [
            {required: true, message: "请输入公积金回款", trigger: "blur"},
            {required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur"},
          ],
          profServer: [
            {required: true, message: "请输入服务费回款", trigger: "blur"},
            {required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur"},
          ],
          profTax: [
            {required: true, message: "请输入税金回款", trigger: "blur"},
            {required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur"},
          ],
          /*profPayout: [
            {required: true, message: "请输入工资支出", trigger: "blur"},
            {required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur"},
          ],
          profSsesout: [
            {required: true, message: "请输入社保支出", trigger: "blur"},
            {required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur"},
          ],
          profAcfunout: [
            {required: true, message: "请输入公积金支出", trigger: "blur"},
            {required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur"},
          ],
          profTaxout: [
            {required: true, message: "请输入税金支出", trigger: "blur"},
            {required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur"},
          ],
          profOther: [
            {required: true, validator: numberCheck, message: "请输入正确的格式", trigger: "blur"},
          ],*/

        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    components: {
      searchDept,


    },
    mounted() {

    },
    methods: {
      //获取列表详情
      getData(id) {
        const t = this
        t.spinShow = true
        getDataLevelUserLogin({
          _mt: t.getById_mt,
          id: id,
          logType: 'Id查询',
        }).then((res) => {
          if (isSuccess(res, t)) {
            let data = res.data.content[0]
            t.formValidate.deptId = data.deptId;
            t.unitFname = data.unitFname;
            t.formValidate.profPer = data.profPer;
            t.formValidate.profPays = data.profPays;
            t.formValidate.profSses = data.profSses;
            t.formValidate.profAcfun = data.profAcfun;
            t.formValidate.profServer = data.profServer;
            t.formValidate.profTax = data.profTax;
            t.formValidate.profPayout = data.profPayout;
            t.formValidate.profSsesout = data.profSsesout;
            t.formValidate.profAcfunout = data.profAcfunout;
            t.formValidate.profTaxout = data.profTaxout;
            t.formValidate.profOther = data.profOther;
            t.formValidate.note = data.note;
          }
        }).catch(() => {
          this.$Message.error(this.$t("reminder.errormessage"));
        }).finally(() => {
          t.spinShow = false
        });
      },
      //获取下拉列表数据
      getSelect() {
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
      handleSubmit() {
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
      handleReset() {
        //重置表单
        this.$refs.scrollBox.$el.scrollTop = "0";
        this.$refs.formValidate.resetFields();
        this.formValidate = {};
        this.unitFname = "";
        this.$emit('closeUp');
      },
      clearUnitFname() {
        this.unitFname = "";
        this.formValidate.deptId = "";
      },
      unitFnamePick() {
        this.$refs.unitFnameSearch.getData();
        this.openUnitFname = true;
      },
      closeUnitFname() {
        this.openUnitFname = false;
      },
      inputUnitFname(row) {
        this.formValidate.deptId = row.deptId;
        this.unitFname = row.unitFname;
      },

    },
  }
</script>
<style lang="scss">
  @import "../../../sass/updateAndAdd";
  @import "../../../sass/singleUpdateAdd";
</style>
