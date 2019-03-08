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
          <FormItem :label="$t('lang_lan.Mulg.lanType')" prop="lanType">
              <span @dblclick="clear">
                <Input v-model="lanTypeDis" icon="search" :readonly="true" :placeholder="$t('lang_lan.Mulg.p_lanTypeDis')" @on-click="pickData"/>
              </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_lan.Mulg.lanCode')" prop="lanCode">
            <Input v-model="formValidate.lanCode" :placeholder="$t('lang_lan.Mulg.p_lanCode')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_lan.Mulg.lanCn')" prop="lanCn">
            <Input v-model="formValidate.lanCn" :placeholder="$t('lang_lan.Mulg.p_lanCn')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_lan.Mulg.lanEn')" prop="lanEn">
            <Input v-model="formValidate.lanEn" :placeholder="$t('lang_lan.Mulg.p_lanEn')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_lan.Mulg.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_lan.Mulg.p_comment')"></Input>
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
      <langTypeSeaTable v-show="openPick" :title="title1" :searchText1="searchText1" :searchText2="searchText2" :searchCloumns="searchCloumns" :params="params" @closeUp="close" @changeinput="changeinput" ref="langTypeSeaTable"></langTypeSeaTable>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import langTypeSeaTable from '../../../components/searchTable/langTypeSeaTable'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        lanTypeDis: '',
        openPick: false,
        formValidate: {
          _mt: 'baseLang.addOrModifyLang',
          funId: '1',
          lanType: '',
          lanCode: '',
          lanCn: '',
          lanEn: '',
          comment: '',
        },
        title1: this.$t('lang_lan.searchType.title'),
        searchText1: this.$t('lang_lan.searchType.lanTypeName'),
        searchText2: this.$t('lang_lan.searchType.lanTypeCode'),
        searchCloumns: [
          {
            title: this.$t('lang_lan.searchType.lanTypeName'),
            key: 'lanTypeName',
            sortable: 'custom',
            width: 253,
          },
          {
            title: this.$t('lang_lan.searchType.lanTypeCode'),
            key: 'lanTypeCode',
            sortable: 'custom',
            width: 253,
          },
        ],
        params: {
          _mt: 'langType.selectByBaseLangTypePageList',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
        },
        ruleValidate: {
          lanType: [
            { required: true, message: this.$t('lang_lan.Mulg.rule_lanType'), trigger: 'change' },
          ],
          lanCode: [
            { required: true, message: this.$t('lang_lan.Mulg.rule_lanCode'), trigger: 'change' },
          ],
          lanCn: [
            { required: true, message: this.$t('lang_lan.Mulg.rule_lanCn'), trigger: 'change' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    components: {
      langTypeSeaTable,
    },
    updated() {

    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseLang.selectById',
          id: id,
          funId: '1',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.lanType = res.data.content[0].lanType
            t.lanTypeDis = res.data.content[0].lanTypeDis
            t.formValidate.lanCode = res.data.content[0].lanCode
            t.formValidate.lanCn = res.data.content[0].lanCn
            t.formValidate.lanEn = res.data.content[0].lanEn
            t.formValidate.comment = res.data.content[0].comment
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      close() {
        const t = this
        t.openPick = false
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
      pickData() {
        const t = this
        t.$refs.langTypeSeaTable.getData(this.params)
        t.openPick = true
      },
      changeinput(name, code) {
        const t = this
        t.lanTypeDis = name
        t.formValidate.lanType = code
      },
      clear() {
        const t = this
        t.lanTypeDis = ''
        t.formValidate.lanType = ''
      },
      handleReset() {
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
      },
    },
    watch: {

    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
</style>
