<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_root.selectDefine.selCode')" prop="selCode">
            <Input v-model="formValidate.selCode" :placeholder="$t('lang_root.selectDefine.p_selCode')"></Input>
          </FormItem>
          </Col>

          <Col span="10" offset="1" >
          <FormItem :label="$t('lang_root.selectDefine.selName')" prop="selName">
            <Input v-model="formValidate.selName" :placeholder="$t('lang_root.selectDefine.p_selName')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_root.selectDefine.selMark')" prop="selMark">
            <Input v-model="formValidate.selMark" :placeholder="$t('lang_root.selectDefine.p_selMark')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_root.selectDefine.selPagelink')" prop="selPagelink">
            <Input v-model="formValidate.selPagelink" :placeholder="$t('lang_root.selectDefine.p_selPagelink')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_root.selectDefine.selLayout')" prop="selLayout">
            <CheckboxGroup v-model="formValidate.selLayout">
              <Checkbox :label="item.paramCode" v-for="(item,index) in selectLayoutMode" :key="index"><span>{{item.paramInfoName}}</span></Checkbox>
            </CheckboxGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_root.selectDefine.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_root.selectDefine.p_comment')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
              <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import searchTable from '../../../components/searchTable/searchTable'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        selectLayoutMode: [],
        formValidate: {
          _mt: 'platSelectDefine.addOrUpd',
          funId: '1',
          companyId: '1',
          selCode: '',
          selMark: '',
          selName: '',
          selLayout: [],
          selPagelink: '',
          comment: '',
        },
        ruleValidate: {
          selCode: [
            { required: true, message: this.$t('lang_root.selectDefine.rule_selCode'), trigger: 'blur' },
          ],
          selMark: [
            { required: true, message: this.$t('lang_root.selectDefine.rule_selMark'), trigger: 'blur' },
          ],
          selName: [
            { required: true, message: this.$t('lang_root.selectDefine.rule_selName'), trigger: 'blur' },
          ],
          selPagelink: [
            { required: true, message: this.$t('lang_root.selectDefine.rule_selPagelink'), trigger: 'blur' },
          ],
          selLayout: [
            { required: true, type: 'array', min: 1, message: this.$t('lang_root.selectDefine.rule_selLayout'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {
      searchTable,
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platSelectDefine.getById',
          funId: 1000,
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.selCode = res.data.content[0].selCode
            t.formValidate.selMark = res.data.content[0].selMark
            t.formValidate.selName = res.data.content[0].selName
            t.formValidate.selPagelink = res.data.content[0].selPagelink
            console.info(res.data.content[0].selLayout)
            if (res.data.content[0].selLayout === undefined || res.data.content[0].selLayout === '') {
              t.formValidate.selLayout = []
            } else {
              t.formValidate.selLayout = res.data.content[0].selLayout.split(',')
            }
            t.formValidate.comment = res.data.content[0].comment
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.selLayout = data.selLayout.toString()
        data.logType = t.logType
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.formValidate.resetFields()
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
              }
            }).catch(() => {
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      handleReset() {
        this.$emit('closeUp')
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'selectlayout',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectLayoutMode = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";

</style>
