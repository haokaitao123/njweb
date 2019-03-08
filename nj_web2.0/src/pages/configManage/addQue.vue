<template>
  <!-- 第三步调查问题页面  新增 -->
  <div class="cover">
    <div class="box" style="min-width: 900px; height:620px; ">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          {{$t('lang_role.suvadmin.editans')}}
        </div>
        <Button type="text" @click="cancle">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <!-- 新增部分 -->
      <div style="height:480px; overflow-y: auto;">
        <Form ref="forms" :model="form" :rules="rules" :label-width="135">
          <!-- 调查问题分类、系统order、显示order-->
          <Row>
            <Col span="24">
            <Row>
              <Col span="10" offset="1"
                   v-if="styleCode === 'p_suvstyle_02' || styleCode === 'p_suvstyle_04' || styleCode === 'p_suvstyle_05'">
              <FormItem :label="$t('lang_role.suvadmin.platQusCatidDis')">
                <Input v-model="platQusCatidDis" icon="search" readonly @on-click="choiceType"></Input>
              </FormItem>
              </Col>
              <Col span="10" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQusOrder')" prop="platQusOrder">
                <Input v-model="form.platQusOrder"></Input>
              </FormItem>
              </Col>
              <Col span="10" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQusDisorder')" prop="platQusDisorder">
                <Input v-model="form.platQusDisorder"></Input>
              </FormItem>
              </Col>
            </Row>
            </Col>
          </Row>
          <!-- 问题description英文 -->
          <Row>
            <Col span="24">
            <Row>
              <Col span="21" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQusDescen')"prop="platQusDescen">
                <Input v-model="form.platQusDescen" type="textarea" :autosize="{minRows: 2}"
                       :placeholder="$t('lang_role.suvadmin.pplatQusDescen')" ></Input>
              </FormItem>
              </Col>
            </Row>
            </Col>
          </Row>
          <!-- 问题description中文 -->
          <Row>
            <Col span="24">
            <Row>
              <Col span="21" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQusDesccn')" prop="platQusDesccn">
                <Input v-model="form.platQusDesccn" type="textarea" :autosize="{minRows: 2}"
                       :placeholder="$t('lang_role.suvadmin.pplatQusDesccn')" ></Input>
              </FormItem>
              </Col>
            </Row>
            </Col>
          </Row>
          <!-- answer type、with comments-->
          <Row>
            <Col span="24">
            <Row>
              <Col span="10" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQusAstype')" prop="platQusAstype">
                <Select v-model="form.platQusAstype" style="width:230px" @on-change="platType"
                        :disabled="styleCode === 'p_suvstyle_03' || styleCode === 'p_suvstyle_04' || styleCode === 'p_suvstyle_05'">
                  <Option v-for="(item, index) in ansType" :value="item.paramCode" :key="index">{{ item.paramInfoName
                    }}
                  </Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="10" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQusComments')">
                <!-- <Checkbox v-model="form.platQusComments" @on-change="platComments" true-value='1' false-value="0">是（不勾选默认为否）</Checkbox> -->
                <RadioGroup v-model="form.platQusComments" @on-change="platComments">
                  <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">
                    {{item.paramInfoCn}}
                  </Radio>
                </RadioGroup>
              </FormItem>
              </Col>
            </Row>
            </Col>
          </Row>
          <!-- 是否计分、是否有效-->
          <Row>
            <Col span="24">
            <Row>
              <Col span="10" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQusScoring')">
                <!-- <Checkbox v-model="form.platQusScoring" @on-change="platScore" true-value='1' false-value="0">是（不勾选默认为否）</Checkbox> -->
                <RadioGroup v-model="form.platQusScoring" @on-change="platScore">
                  <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">
                    {{item.paramInfoCn}}
                  </Radio>
                </RadioGroup>
              </FormItem>
              </Col>
              <Col span="10" offset="1">
              <FormItem :label="$t('lang_role.adminrole.validDis')">
                <!-- <Checkbox v-model="form.platQusValid" @on-change="platValid" true-value='1' false-value="0">是（不勾选默认为否）</Checkbox> -->
                <RadioGroup v-model="form.platQusValid" @on-change="platValid">
                  <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">
                    {{item.paramInfoCn}}
                  </Radio>
                </RadioGroup>
              </FormItem>
              </Col>
            </Row>
            </Col>
          </Row>
          <!-- 备注 -->
          <Row>
            <Col span="24">
            <Row>
              <Col span="21" offset="1">
              <FormItem :label="$t('lang_role.adminpmtype.comment')">
                <Input v-model="form.platQusNote" type="textarea" :autosize="{minRows: 2}" :placeholder="$t('lang_role.adminpmtype.placeholdername')"></Input>
              </FormItem>
              </Col>
            </Row>
            </Col>
          </Row>
          <!-- 是否必选项-->
          <Row>
            <Col span="24">
            <Row>
              <Col span="10" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQusIsmust')">
                <!-- <Checkbox v-model="form.platQusIsmust" @on-change="platIsmust" true-value='1' false-value="0">是（不勾选默认为否）</Checkbox> -->
                <RadioGroup v-model="form.platQusIsmust" @on-change="platIsmust">
                  <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">
                    {{item.paramInfoCn}}
                  </Radio>
                </RadioGroup>
              </FormItem>
              </Col>
            </Row>
            </Col>
          </Row>
        </Form>
      </div>
      <!-- 新增部分 结束-->
      <Row style="margin-top:20px;">
        <Col span="23">
        <Row type="flex" justify="end">
          <Button type="primary" @click="save" style="margin-right: 20px">{{$t('button.sav')}}</Button>
          <Button type="ghost" @click="cancle">{{$t('button.cal')}}</Button>
        </Row>
        </Col>
      </Row>
    </div>
    <transition name="fade">
      <classifyId ref="classifyId" v-if="showclassId" @closeClass="closeClass" :suvid="suvid" :classMes="classMes"
                  @getMes="getMes"></classifyId>
    </transition>
  </div>
</template>

<script>
  import classifyId from './classifyId'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLogin2} from '../../axios/axios'
  import {isSuccess, deepCopy} from '../../lib/util'
  import valids from '../../lib/pub_valid'

  export default {
    data() {
      const ordercheck = (rule, value, call) => {
        if (this.form.platQusOrder !== '') {
          if (valids.val_number101(value)) {
            return call()
          }
          return call(new Error(rule.message))
        }
        return call()
      }
      return {
        showclassId: false,         //  调查信息分类id页面
        platQusCatidDis: "",               //  调查信息分类id相关
        classMes: {},               //  调查信息分类id相关
        radioYesOrNo: [],
        form: {
          _mt: 'platSurveyquestion.addOrUpd',
          logType: '新增',
          platQusCatid: '',                                   //  调查信息分类id
          platQusSuvid: this.suvid,                           //  调查信息id
          platQusOrder: '',                                   //  请输入系统order
          platQusDisorder: '',                                //  请输入显示order
          platQusDescen: '',                                  //  问题description英文
          platQusDesccn: '',                                  //  问题description中文
          platQusAstype: this.ansType[0].paramCode,           //  answer type
          platQusComments: '1',                               //  with comments
          platQusScoring: '1',                                //  是否计分
          platQusValid: '1',                                  //  是否有效
          platQusNote: '',                                    //  备注
          platQusIsmust: '1',                                 //  是否必选项
        },
        rules: {
          // platQusCatid: [
          //     { required: true, message: '请输入调查分类id', trigger: 'blur' },
          // ],
          platQusOrder: [
            {required: true, message: this.$t('lang_role.suvadmin.pplatQusOrder'), trigger: 'blur'},
            {validator: ordercheck, message: this.$t('lang_role.suvadmin.ppplatQusOrder'), trigger: 'blur'},
          ],
          platQusDisorder: [
            {required: true, message: this.$t('lang_role.suvadmin.pplatQusDisorder'), trigger: 'blur'},
          ],
          platQusDescen: [
            {required: true, message: this.$t('lang_role.suvadmin.pplatQusDescen'), trigger: 'blur'},
          ],
          platQusDesccn: [
            {required: true, message: this.$t('lang_role.suvadmin.pplatQusDesccn'), trigger: 'blur'},
          ],
          platQusAstype: [
            {required: true, message: this.$t('lang_role.suvadmin.pplatQusAstype'), trigger: 'change'},
          ],
        },
      }
    },
    props: {
      logType: String,
      id: Number,
      index: Number,
      ansType: Array,
      suvid: String,
      styleCode: String,
      // platQusCatid: String,
    },
    components: {
      classifyId,
    },
    mounted() {
      this.getSelect()
      if (!isNaN(this.id)) {
        this.upData(this.id)
      }
    },
    methods: {
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.radioYesOrNo = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 修改
      upData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platSurveyquestion.getById',
          id: id,
          logType: '修改',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.platQusCatid = res.data.content[0].platQusCatid
            t.platQusCatidDis = res.data.content[0].platQusCatidDis
            t.form.platQusOrder = res.data.content[0].platQusOrder
            t.form.platQusDisorder = res.data.content[0].platQusDisorder
            t.form.platQusDescen = res.data.content[0].platQusDescen
            t.form.platQusDesccn = res.data.content[0].platQusDesccn
            t.form.platQusAstype = res.data.content[0].platQusAstype
            t.form.platQusComments = res.data.content[0].platQusComments
            t.form.platQusScoring = res.data.content[0].platQusScoring
            t.form.platQusValid = res.data.content[0].platQusValid
            t.form.platQusNote = res.data.content[0].platQusNote
            t.form.platQusIsmust = res.data.content[0].platQusIsmust
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        t.$refs.forms.validate((valid) => {
          if (valid) {
            const data = deepCopy(t.form)
            for (const dat in data) {
              if (data[dat] === '') {
                delete data[dat]
              }
            }
            data.logType = t.logType
            if (t.logType === this.$t('button.upd')) {
              data.id = t.id
            }
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.forms.resetFields()
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
              }
              t.cancle()
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      cancle() {
        const t = this
        t.$refs.forms.resetFields()
        t.form.platQusDesccn = ''
        t.form.platQusNote = ''
        t.form.platQusComments = '1'
        t.form.platQusScoring = '1'
        t.form.platQusValid = '1'
        t.form.platQusIsmust = '1'
        t.$emit('cancle')
      },
      // answer type
      platType(value) {
        this.form.platQusAstype = value
      },
      // with comments
      platComments(value) {
        this.form.platQusComments = value
      },
      // 是否计分
      platScore(value) {
        this.form.platQusScoring = value
      },
      // 是否有效
      platValid(value) {
        this.form.platQusValid = value
      },
      // 是否必选项
      platIsmust(value) {
        this.form.platQusIsmust = value
      },
      // 开启分类信息id 页面
      choiceType() {
        this.showclassId = true
      },
      // 关闭分类信息id 页面
      closeClass() {
        this.showclassId = false
      },
      getMes(obj) {
        console.log(obj)
        this.form.platQusCatid = obj.id
        this.platQusCatidDis = obj.platCatDesccn
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/updateAndAdd";
</style>
