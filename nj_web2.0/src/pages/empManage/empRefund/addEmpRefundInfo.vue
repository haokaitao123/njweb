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
                <Row style="max-height: 420px;overflow-y: auto;">
                    <Form ref="formValidate"
                          :model="formValidate"
                          :rules="ruleValidate"
                          :label-width="100">


                     
                      <i-col span="11">
                        <FormItem label="金额" prop="monTotal">
                          <Input v-model="formValidate.monTotal"
                                 :disabled="forbidden"
                                 placeholder="请输入金额"></Input>
                        </FormItem>
                      </i-col>
<!--                      <i-col span="11">
                        <FormItem label="操作时间"
                                  prop="bodeOpetime">
                          <DatePicker type="date"
                                      placeholder="选择操作时间"
                                      :editable="false"
                                      v-model="formValidate.bodeOpetime"
                                      format="yyyy-MM-dd"
                                      style="width: 100%"></DatePicker>
                        </FormItem>
                      </i-col>-->
                      <i-col span="22">
                          <FormItem label="备注"
                                    prop="note">
                              <Input v-model="formValidate.note"
                                     type="textarea"
                                     :disabled="forbidden"
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
            <Button type="primary" v-show="!forbidden"
                    @click="handleSubmit"
                    class="btn">{{$t('button.sav')}}</Button>
        </div>
      <!--一个弹出框一个transition-->
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin,uploadFile } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchEmpMaster from '../../../components/searchTable/searchEmpnhMaster'
import valid from '../../../lib/pub_valid.js'

export default {
    data () {
      /*数字验证*/
      const numberCheck = (rule, value, numberValCheck) => {
        if (value !== '' && value !== undefined) {
          if (valid.val_number103(value)) {
            return numberValCheck()
          }
          return numberValCheck(new Error(rule.message))
        }
        numberValCheck()
      }
        return {
          file: '',
          filekey: '',
          bodeTypeList:[],
          bodeReasonList:[],
          loadingStatus: false,
            type: '',
            distype: false,
            forbidden: false,
            formValidate: {
              monTotal:"",
              note:"",
            },
            openEmpMaster:false,
          /*必填验证*/
            ruleValidate: {
              monTotal:[
                {
                  required: true,
                  message: "请输入金额",
                  trigger: "blur"
                },
                {
                  validator: numberCheck,
                  message: '请输入正确的数字格式',
                  trigger: 'blur'
                },
              ],
            },
        }
    },
    props: {
        //mainId:Number,
        //id: Number,
        logType: String,
        index: Number,
        mainId:Number
    },
  /*资源加载子页面，js不需要*/
    components: {
        searchEmpMaster,
      valid,
    },
    mounted () {
        this.getSelect();
    },
    methods: {
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'bodeType,bodeReason',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.bodeTypeList = res.data.content[0].value[0].paramList
            t.bodeReasonList = res.data.content[0].value[1].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      //上级清除员工选择
        getData (id) {
            const t = this
            getDataLevelUserLogin({
                _mt: 'empRefundInfo.getById',
                id: id,
                funId: '1',
                logType: '退款明细id查询',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    console.log(res.data.content[0])
                   t.formValidate.monTotal= res.data.content[0].monTotal
                    t.formValidate.note= res.data.content[0].note
                    if (t.logType === '查看') {
                        t.forbidden = true
                        t.distype = true
                    } else {
                      t.forbidden = false
                        t.distype = false
                    }
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            data._mt = 'empRefundInfo.addOrUpd'
            alert(t.id)
            if (t.logType === '修改') {
                data.id = t.id
            }
            if (data.handleDate !== undefined) {
             data.handleDate = new Date(data.handleDate).format("yyyy-MM-dd");
             }
            //data.monPid =t.mainId
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginSenior(data).then((res) => {
                        if (isSuccess(res, t)) {
                             t.handleReset();
                            if (t.logType === '新增') {
                                t.$Message.success('新增成功');
                                //t.$refs.formValidate.resetFields()
                                t.$emit('getData', res.data.content[0])
                            } else {
                                t.$Message.success('修改成功');
                                t.$emit('update', res.data.content[0])
                            }
                }
                    }).catch(() => {
                        this.$Message.error(this.$t("reminder.errormessage"));
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
        t.formValidate.empIdName = row.empnhName;
        t.formValidate.empIdIden = row.empnhIdno;
        t.formValidate.empId = row.id;
        t.formValidate.deptIdDis = row.deptIdDis;
        t.formValidate.deptId = row.deptId;
        t.formValidate.postIdDis = row.postIdDis;
        t.formValidate.postId = row.postId;
      },
      handleReset () {
          const t = this;
          this.$refs.formValidate.resetFields()
          t.formValidate.handleDate="";
          t.formValidate.monTotal="";
          t.formValidate.note="";
          
          this.$emit('closeUp')
      },
      handleUpload(file) {
        this.file = file
        this.loadingStatus = true
        return false
      },
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
