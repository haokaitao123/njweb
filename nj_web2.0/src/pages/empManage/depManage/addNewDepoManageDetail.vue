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
                <!--  员工姓名选择框  -->
                <Col span="11" >
                    <FormItem label="类型" prop="depoType">
                        <Select v-model="formValidate.depoType" class="width200"
                            :disabled="disabled"
                            placeholder="押金类型" >
                                <Option v-for="(item, index) in selectDepoType" :value="item.paramCode"
                                :key="index">{{ item.paramInfoName }}
                                </Option>
                        </Select>
                    </FormItem>
                </Col>
                 <!--  操作时间输入框  -->
                <Col span="11" offset="1">
                    <FormItem label="操作时间" prop="depoHandle">
                        <DatePicker type="date"
                            :disabled="disabled"
                            :readonly="disabled"
                            placeholder="请选择操作时间"
                            :editable="false"
                            v-model="formValidate.depoHandle"
                            style="width: 100%">
                        </DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <!--  变动原因-->
                <Col span="11">
                   <FormItem label="变动原因" prop="depoReason">
                        <Input v-model="formValidate.depoReason" :disabled="disabled" placeholder="请输入变动原因"></Input>
                    </FormItem>
                </Col>
                  <!--  金额输入框  -->
                <Col span="11" offset="1">
                    <FormItem label="金额" prop="moneyNum">
                        <Input v-model="formValidate.moneyNum" :disabled="disabled" placeholder="请输入金额"  style="width: 100%"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <!--  备注文本域  -->
                <Col span="23">
                    <FormItem label="备注" prop="note">
                        <Input v-model="formValidate.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :disabled="disabled" placeholder="请输入备注"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <!--  保存 取消 按钮  -->
                <Col span="21" offset="1">
                    <Row type="flex" justify="end">
                        <FormItem>
                             <Button type="ghost" @click="handleReset" class="btn1">{{$t('button.cal')}}</Button>
                                    <Button
                                        type="primary"
                                        @click="handleSubmit"
                                        class="btn"
                                        v-show="!disabled"
                                        >{{$t('button.sav')}}</Button>
                        </FormItem>
                    </Row>
                </Col>
            </Row>
      </Form>
    </div>
  </div>
</template>
<script>
    import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios' //调用请求接口封装的公共方法
    import { isSuccess, deepCopy } from '../../../lib/util'  //调用请求判断成功的公共方法和深拷贝方法
     import valid from '../../../lib/pub_valid.js'
  export default {
    data() {
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
          disabled: false,
          selectDepoType:[],
        formValidate: {
            _mt:'depoManageDetail.addOrUpd', //新增的数据接口
            funId: '1', //功能ID
            logType:this.logType, //操作类型
            depoType: '', //押金类型
            depoHandle: '', //操作时间
            depoReason: '', //变动原因
            moneyNum:'',//金额
            note: '',//备注
        },
        ruleValidate: { //表单验证规则
            //押金类型
            depoType: [ 
                { required: true, message: '请选择押金类型', trigger: 'change' }
            ],
            //操作时间
            depoHandle: [
                { required: true, type: "date", message: '请选择操作时间', trigger: 'change'}
            ],
            //金额
            moneyNum:[
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
    components: {
         valid,
    },
    // 定义子组件获取父组件传入的值
    props: {
        mainId: Number,
        logType: String,
        index: Number,
    },
    mounted () {
        this.getSelect();
    },
    methods: {
        //根据id查询信息回显数据
        getData(id) {
            const t = this
            
            //根据id获取数据请求接口
            getDataLevelUserLogin({
                _mt: 'depoManageDetail.getById',
                id: id,
                logType: '根据id获取数据',
            }).then((res) => {
            if (isSuccess(res, t)) {
                //回显数据绑定
                t.formValidate.depoReason = res.data.content[0].depoReason
                t.formValidate.depoType = res.data.content[0].depoType
                t.formValidate.depoHandle = res.data.content[0].depoHandle
                t.formValidate.moneyNum = res.data.content[0].moneyNum
                t.formValidate.note = res.data.content[0].note
                if (id === res.data.content[0].companyId) {
                            t.forbidden = 'disabled'
                            t.distype = true
                    } else {
                            t.forbidden = null
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
         getSelect () {
            const t = this;
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: "bodeType"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.selectDepoType = res.data.content[0].value[0].paramList;
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
        //点击提交事件
        handleSubmit() {
            const t = this
            //修改请求的参数
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            data.dempId = t.mainId // 放入主表id
            if (t.logType === '修改') {
                data.id = t.id
            }
             if (data.depoHandle !== undefined && data.depoHandle !== '') {
               data.depoHandle = new Date(data.depoHandle).format('yyyy-MM-dd')
            } else {
               data.depoHandle = ''
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
                            t.$Message.success('新增成功');
                            t.$emit('getData', res.data.content[0])
                        } else {
                            t.$Message.success('修改成功');
                            t.$emit('update', res.data.content[0])
                        }
                    }
                    }).catch(() => {
                        //请求失败
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
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
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
