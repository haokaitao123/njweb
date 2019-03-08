<template>
  <!-- 第三步调查答案页面  新增 -->
  <div class="cover">
    <div class="box" style="min-width: 900px; height:620px;">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_role.suvadmin.editans')}}
        </div>
        <Button type="text" @click="cancle">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <!-- 新增部分 -->
      <div style="height:480px; overflow-y: auto;">
        <Form ref="forms" :model="form" :rules="rules" :label-width="135">
          <!-- 答案order-->
          <Row>
            <Col span="24">
            <Row>
              <Col span="10" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQasOrder')" prop="platQasOrder">
                <Input v-model="form.platQasOrder"></Input>
              </FormItem>
              </Col>
              <Col span="10" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQasQustidDis')" prop="platQasQustid"
                        v-if="styleCode === 'p_suvstyle_01' || styleCode === 'p_suvstyle_02'">
                <Input v-model="platQasQustidDis" icon="search" readonly @on-click="choiceType"></Input>
              </FormItem>
              <FormItem :label="$t('lang_role.suvadmin.platQasQustidDis')" v-else
                        v-show="styleCode === 'p_suvstyle_01' || styleCode === 'p_suvstyle_02'">
                <Input v-model="platQasQustidDis" icon="search" readonly @on-click="choiceType"></Input>
              </FormItem>
              </Col>
            </Row>
            </Col>
          </Row>
          <!-- 答案描述英文 -->
          <Row>
            <Col span="24">
            <Row>
              <Col span="21" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQasAsweren')" prop="platQasAsweren">
                <Input v-model="form.platQasAsweren" type="textarea" :autosize="{minRows: 2}"
                       :placeholder="$t('lang_role.suvadmin.pplatQasAsweren')"></Input>
              </FormItem>
              </Col>
            </Row>
            </Col>
          </Row>
          <!-- 答案描述中文 -->
          <Row>
            <Col span="24">
            <Row>
              <Col span="21" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQasAswercn')">
                <Input v-model="form.platQasAswercn" type="textarea" :autosize="{minRows: 2}"
                       :placeholder="$t('lang_role.suvadmin.pplatQasAsweren')"></Input>
              </FormItem>
              </Col>
            </Row>
            </Col>
          </Row>
          <!-- value、是否有效-->
          <Row>
            <Col span="24">
            <Row>
              <Col span="10" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQasValid')">
                <RadioGroup v-model="form.platQasValid">
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
              <FormItem :label="$t('lang_role.adminpmtype.comment')" >
                <Input v-model="form.platQasNote" type="textarea" :autosize="{minRows: 2}"
                       :placeholder="$t('lang_role.adminpmtype.pcomment')" ></Input>
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
      <queId ref="queId" v-if="showqueId" @closeClass="closeClass" :suvid="suvid" :queMes="queMes"
             @getMes="getMes"></queId>
    </transition>
  </div>
</template>

<script>
  import queId from './queId'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLogin2} from '../../axios/axios'
  import {isSuccess, deepCopy} from '../../lib/util'
  import valids from '../../lib/pub_valid'

  export default {
    data() {
      const ordercheck = (rule, value, call) => {
        if (this.form.platQasOrder !== '') {
          if (valids.val_number101(value)) {
            return call()
          }
          return call(new Error(rule.message))
        }
        return call()
      }
      return {
        showqueId: false,                   //  调查问题id页面
        platQasQustidDis: '',                   //  调查问题id页面
        radioYesOrNo: [],                         //  调查问题id相关
        queMes: {},                         //  调查问题id相关
        form: {
          _mt: 'platSurveyquesasw.addOrUpd',
          logType: '新增',
          id: '',
          platQasSuvid: this.suvid,       //  调查信息id
          platQasQustid: '',              //  调查问题id
          platQasOrder: '',               //  请输入答案order
          platQasAsweren: '',             //  答案描述英文
          platQasAswercn: '',             //  答案描述中文
          platQasValid: '1',              //  是否有效
          platQasNote: '',                //  备注
        },
        rules: {
          platQasQustid: [
            {required: true, message: this.$t('lang_role.suvadmin.platQasQustid'), trigger: 'blur'},
          ],
          platQasOrder: [
            {required: true, message: this.$t('lang_role.suvadmin.pplatQasOrder'), trigger: 'blur'},
            {validator: ordercheck, message: this.$t('lang_role.suvadmin.ppplatQasOrder'), trigger: 'blur'},
          ],
          platQasAsweren: [
            {required: true, message: this.$t('lang_role.suvadmin.pplatQasAsweren'), trigger: 'blur'},
          ],
        },
      }
    },
    components: {
      queId,
    },
    props: {
      logType: String,
      id: Number,
      index: Number,
      suvid: String,
      styleCode: String,
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
          _mt: 'platSurveyquesasw.getById',
          id: id,
          logType: '修改',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.platQasQustid = res.data.content[0].platQasQustid
            t.platQasQustidDis = res.data.content[0].platQasQustidDis
            t.form.platQasOrder = res.data.content[0].platQasOrder
            t.form.platQasAsweren = res.data.content[0].platQasAsweren
            t.form.platQasAswercn = res.data.content[0].platQasAswercn
            t.form.platQusAstype = res.data.content[0].platQusAstype
            t.form.platQasValid = res.data.content[0].platQasValid
            t.form.platQasNote = res.data.content[0].platQasNote
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
        t.form.platQasAswercn = ''
        t.form.platQasNote = ''
        t.form.platQasValid = '1'
        t.$emit('cancle')
      },
      // 是否有效
      platValid(value) {
        this.form.platQasValid = value
      },
      // 开启分类信息id 页面
      choiceType() {
        this.showqueId = true
      },
      // 关闭分类信息id 页面
      closeClass() {
        this.showqueId = false
      },
      getMes(obj) {
        console.log(obj)
        this.form.platQasQustid = obj.id
        this.platQasQustidDis = obj.platQusDesccn
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/updateAndAdd";
</style>
