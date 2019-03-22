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
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.adminpminfo.paramTypeDis')" prop="paramType">
            <span @dblclick="dubClear">
            <Input v-model="paramTypeDis" icon="search" :disabled="logType === $t('button.upd')?true:false" :readonly="true"
                   :placeholder="$t('lang_role.adminpminfo.pparamName')"  @on-click="pickData"/>
           </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.adminpminfo.paramCode')" prop="paramCode">
            <Input v-model="formValidate.paramCode" :disabled="logType === $t('button.upd')?true:false"
                   :placeholder="$t('lang_role.adminpminfo.pparamCode')"  ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.adminpminfo.paramInfoName')" prop="paramInfoName">
            <Input v-model="formValidate.paramInfoName" :placeholder="$t('lang_role.adminpminfo.pparamInfoName')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_role.adminpmtype.comment')" prop="desc">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   :placeholder="$t('lang_role.adminpmtype.pcomment')"  ></Input>
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
    <transition name="fade">
      <searchTable v-show="openPick"
                   @closeUp="close" @changeinput="changeinput" ref="searchTable"></searchTable>
    </transition>
  </div>
</template>
<script>
  import {getDataLevelUserLoginSenior, getDataLevelUserLogin} from '../../../axios/axios'
  import {isSuccess, deepCopy} from '../../../lib/util'
  import searchTable from '../../../components/searchTable/searchParamType'

  export default {
    data() {
      return {
        formValidate: {
          _mt: 'baseParmInfo.addOrUpdBaseParamInfo',
          funId: '1',
          companyId: '1',
          paramType: '',
          paramCode: '',
          paramInfoName: '',
          comment: '',
        },
        openPick: false,
        paramTypeDis: '',
        ruleValidate: {
          paramType: [
            {required: true, message:  this.$t('lang_role.adminpminfo.pparamName'), trigger: 'blur'},
          ],
          paramCode: [
            {required: true, message: this.$t('lang_role.adminpminfo.pparamCode') , trigger: 'blur'},
          ],
          paramInfoName: [
            {required: true, message:  this.$t('lang_role.adminpminfo.pparamInfoName'), trigger: 'blur'},
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
    updated() {

    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getParamInfoById',
          id: id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.paramType = res.data.content[0].paramType
            t.paramTypeDis = res.data.content[0].paramTypeDis
            t.formValidate.paramCode = res.data.content[0].paramCode
            t.formValidate.paramInfoName = res.data.content[0].paramInfoName
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
        data.logType = t.logType
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
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
      dubClear() {
        const t = this
        if (t.logType !== this.$t('button.upd')) {
          t.paramTypeDis = ''
          t.formValidate.paramTypeDis = ''
        }
      },
      close() {
        const t = this
        t.openPick = false
        t.$refs.searchTable.pmtypeCode = ''
      },
      changeinput(name, id) {
        const t = this
        t.paramTypeDis = name
        t.formValidate.paramType = id
      },
      pickData() {
        const t = this
        if (t.logType !== this.$t('button.upd')) {
          t.$refs.searchTable.getData()
          t.openPick = true
        }
      },
      handleReset() {
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
      },
    },
    watch: {},
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";

</style>
