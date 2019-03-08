<template>
  <!-- 第三步调查分类页面  新增 -->
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
          <!-- 分类order、是否有效-->
          <Row>
            <Col span="24">
            <Row>
              <Col span="10" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQasOrder')" prop="platCatOrder">
                <Input v-model="form.platCatOrder"></Input>
              </FormItem>
              </Col>
              <Col span="10" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQasOrder')">
                <!-- <Checkbox v-model="form.platCatValid" @on-change="platValid" true-value='1' false-value="0">是（不勾选默认为否）</Checkbox> -->
                <!--<RadioGroup v-model="form.platCatValid" @on-change="platValid">-->
                  <!--<Radio label="1">是</Radio>-->
                  <!--<Radio label="0">否</Radio>-->
                <!--</RadioGroup>-->

                <RadioGroup v-model="form.platCatValid">
                  <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">
                    {{item.paramInfoCn}}
                  </Radio>
                </RadioGroup>
              </FormItem>
              </Col>
            </Row>
            </Col>
          </Row>
          <!-- 分类description英文 -->
          <Row>
            <Col span="24">
            <Row>
              <Col span="21" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQasOrder')">
                <Input v-model="form.platCatDesccn" type="textarea" :autosize="{minRows: 2}"
                       :placeholder="$t('lang_role.suvadmin.pplatQasAsweren')"></Input>
              </FormItem>
              </Col>
            </Row>
            </Col>
          </Row>
          <!-- 分类description中文 -->
          <Row>
            <Col span="24">
            <Row>
              <Col span="21" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platQasOrder')" prop="platCatDescen">
                <Input v-model="form.platCatDescen" type="textarea" :autosize="{minRows: 2}"
                       :placeholder="$t('lang_role.suvadmin.pplatQasAsweren')"></Input>
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
              <FormItem :label="$t('lang_role.suvadmin.platQasOrder')">
                <Input v-model="form.platCatNote" type="textarea" :autosize="{minRows: 2}" :placeholder="$t('lang_role.suvadmin.pplatQasAsweren')"></Input>
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
  </div>
</template>

<script>
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLogin2} from '../../axios/axios'
  import {isSuccess, deepCopy} from '../../lib/util'
  import valids from '../../lib/pub_valid'

  export default {
    data() {
      const ordercheck = (rule, value, call) => {
        if (this.form.platCatOrder !== '') {
          if (valids.val_number101(value)) {
            return call()
          }
          return call(new Error(rule.message))
        }
        return call()
      }
      return {
        radioYesOrNo: [],
        form: {
          _mt: 'platSurveycategory.addOrUpd',
          logType: '新增',
          platCatSuvid: this.suvid,       //  调查信息id
          platCatOrder: '',               //  请输入分类order
          platCatValid: '1',              //  是否有效
          platCatDescen: '',              //  分类description英文
          platCatDesccn: '',              //  分类description中文
          platCatNote: '',                //  备注
        },
        rules: {
          platCatOrder: [
            { required: true, message: this.$t('lang_role.suvadmin.pplatCatOrder'), trigger: 'blur' },
            { validator: ordercheck, message: this.$t('lang_role.suvadmin.ppplatCatOrder'), trigger: 'blur' },
          ],
          platCatDescen: [
            { required: true, message: this.$t('lang_role.suvadmin.pplatCatDescen'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      logType: String,
      id: Number,
      index: Number,
      suvid: String,
      platQusCatid: String,    //  新增后获取的调查分类id
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
          _mt: 'platSurveycategory.getById',
          id: id,
          logType: '修改',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.platCatOrder = res.data.content[0].platCatOrder
            t.form.platCatDescen = res.data.content[0].platCatDescen
            t.form.platCatDesccn = res.data.content[0].platCatDesccn
            t.form.platCatValid = res.data.content[0].platCatValid
            t.form.platCatNote = res.data.content[0].platCatNote
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
                  t.platQusCatid = res.data.content[0].id
                  t.$emit('getClassid', t.platQusCatid)
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
        t.form.platCatDesccn = ''
        t.form.platCatNote = ''
        t.form.platCatValid = '1'
        t.$emit('cancle')
      },
      // 是否有效
      platValid(value) {
        this.form.platCatValid = value
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/updateAndAdd";
</style>
