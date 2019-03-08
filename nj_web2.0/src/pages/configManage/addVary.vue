<template>
  <!-- 第三步调查表变量页面  新增 -->
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
          <!-- 系统order、显示order-->
          <Row>
            <Col span="24">
            <Row>
              <Col span="10" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platSvaName')" prop="platSvaName">
                <Input v-model="form.platSvaName"></Input>
              </FormItem>
              </Col>
              <Col span="10" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platSvaCname')" prop="platSvaCname">
                <Input v-model="form.platSvaCname"></Input>
              </FormItem>
              </Col>
            </Row>
            </Col>
          </Row>
          <!-- 系统order、显示order-->
          <Row>
            <Col span="24">
            <Row>
              <Col span="10" offset="1">
              <FormItem :label="$t('lang_role.suvadmin.platSvaColumn')" prop="platSvaColumn">
                <Input v-model="form.platSvaColumn"></Input>
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
                <Input v-model="form.platSvaNote" type="textarea" :autosize="{minRows: 2}"
                       :placeholder="$t('lang_role.adminpmtype.pcomment')"></Input>
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

  export default {
    data() {
      return {
        form: {
          _mt: 'platSurveyvar.addOrUpd',
          logType: '新增',
          platSvaSuvid: this.suvid,       //  调查信息id
          platSvaName: '',                //  变量标识
          platSvaCname: '',               //  变量名称
          platSvaNote: '',                //  备注
          platSvaColumn: '',                //  备注
        },
        rules: {
          platSvaName: [
            {required: true, message: this.$t('lang_role.suvadmin.pplatSvaName'), trigger: 'blur'},
          ],
          platSvaCname: [
            {required: true, message: this.$t('lang_role.suvadmin.pplatSvaCname'), trigger: 'blur'},
          ],
          platSvaColumn: [
            {required: true, message: this.$t('lang_role.suvadmin.pplatSvaColumn'), trigger: 'blur'},
          ],
        },
      }
    },
    props: {
      logType: String,
      id: Number,
      index: Number,
      suvid: String,
      styleCode: String,
    },
    mounted() {
      if (!isNaN(this.id)) {
        this.upData(this.id)
      }
    },
    methods: {
      // 修改
      upData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platSurveyvar.getById',
          id: id,
          logType: '修改',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.platSvaName = res.data.content[0].platSvaName
            t.form.platSvaCname = res.data.content[0].platSvaCname
            t.form.platSvaNote = res.data.content[0].platSvaNote
            t.form.platSvaColumn = res.data.content[0].platSvaColumn
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
        t.form.platSvaNote = ''
        t.form.platSvaColumn = ''
        t.$emit('cancle')
      },
      // 是否有效
      platValid(value) {
        this.form.platQasValid = value
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/updateAndAdd";
</style>
