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
                <Spin size="large"
              fix
              v-if="spinShow"></Spin>
        </div>
        <!-- form表单 :model="formValidate" model表单数据对象绑定了formValidate :rules="ruleValidate" 表单验证规则  :label-width="135" 表单域标签的宽度-->
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
            <Row>
                <!--  prop 是Form对应表单域 model 里的字段 -->
                <Col span="10" offset="1">
                    <FormItem label="月利润上限" prop="profitCap">
                            <Input v-model="formValidate.profitCap"   placeholder="请输入月利润上限"/>
                    </FormItem>
                </Col>
                <Col span="10" offset="1">
                    <FormItem label="月利润下限" prop="profitFloor">
                        <Input v-model="formValidate.profitFloor" placeholder="请输入月利润下限"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="10" offset="1">
                    <FormItem label="封顶金额" prop="profitBig">
                        <Input v-model="formValidate.profitBig" placeholder="请输入封顶金额"></Input>
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
  </div>
</template>
<script>
    import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios' //调用请求接口封装的公共方法
    import { isSuccess, deepCopy } from '../../../lib/util'  //调用请求判断成功的公共方法和深拷贝方法
    import valid from '../../../lib/pub_valid.js'
  export default {
    data() {
        /*数字验证*/
      const numberCheck = (rule, value, numberValCheck) => {
        if (value !== '' && value !== undefined) {
          if (valid.val_number103(value)) {
            return numberValCheck()
          }
          return numberValCheck(new Error(rule.message))
        }
        numberValCheck()
      };
        const limitMoney = (rule, value, callback) => {
            if (value === "" || !value) {
                callback(new Error("请输入金额"));
            } else {
                let profitCap = Number(this.formValidate.profitCap);
                let profitFloor = Number(this.formValidate.profitFloor);
                if (profitCap < profitFloor) {
                    callback(new Error("上限金额必须大于下限金额"));
                }
                callback();
            }
        };
      return {
        spinShow:false,
        formValidate: {
            _mt: 'depCeilRule.addOrUpd', //新增的数据接口
            funId: '1', //功能ID
            logType:this.logType, //操作类型
            profitCap: '',
            profitFloor: '',
            profitBig: '', 
            note: '',//备注
        },
        ruleValidate: { 
             profitCap:[
                {
                  required: true,
                  message: "请输入月利润上限",
                  trigger: "blur"
                },
                {
                  validator: numberCheck,
                  message: '请输入正确的数字格式',
                  trigger: 'blur'
                },
                {
                  validator: limitMoney,
                  message: '上限金额必须大于下限金额',
                  trigger: 'blur'
                },
              ],
            profitFloor:[
                {
                  required: true,
                  message: "请输入月利润下限",
                  trigger: "blur"
                },
                {
                  validator: numberCheck,
                  message: '请输入正确的数字格式',
                  trigger: 'blur'
                },
              ],
             profitBig:[
                {
                  required: true,
                  message: "请输入最低应交金额",
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
    //外部调用的组件注册到这里
    components: {
         valid,
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
            const t = this;
            t.spinShow = true
            //根据id获取数据请求接口
            getDataLevelUserLogin({
                _mt: 'depCeilRule.getById',
                id: id,
                logType: '根据id获取数据',
            }).then((res) => {
            if (isSuccess(res, t)) {
                //回显数据绑定
                t.formValidate.profitCap = res.data.content[0].profitCap
                t.formValidate.profitFloor = res.data.content[0].profitFloor
                t.formValidate.profitBig = res.data.content[0].profitBig
                t.formValidate.note = res.data.content[0].note
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
        //点击提交事件
        handleSubmit() {
            const t = this
            //修改请求的参数
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            if (t.logType === '修改') {
                data.id = t.id
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
                        //请求失败
                        // this.$Modal.error({
                        //     title: '错误',
                        //     content: '网络错误',
                        // })
                        this.$Message.error(this.$t("reminder.errormessage"));
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
