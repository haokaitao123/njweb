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
            <FormItem :label="$t('lang_flow.flow.flowCode')"  prop="flowCode">
            <Input v-model="formValidate.flowCode" :disabled="editDisbale" :placeholder="$t('lang_flow.flow.p_flowCode')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem :label="$t('lang_flow.flow.flowName')" prop="flowName">
            <Input v-model="formValidate.flowName" :disabled="editDisbale" :placeholder="$t('lang_flow.flow.p_flowName')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_flow.flow.flowFormtype')"  prop="flowFormtype" :placeholder="$t('lang_flow.flow.p_flowFormtype')" transfer>
            <Select v-model="formValidate.flowFormtype" :disabled="editDisbale">
              <Option :value="item.paramCode" v-for="(item,index) in selectFormType" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_flow.flow.flowForm')" prop="flowForm">
            <span @dblclick="clear">
                <Input v-model="flowFormDis" icon="search" :disabled="editDisbale" :readonly="true" :placeholder="$t('lang_flow.flow.p_flowForm')"  @on-click="pickData"/>
            </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_flow.flow.flowVersion')" prop="flowVersion">
            <Input v-model="formValidate.flowVersion" :disabled="editDisbale" :placeholder="$t('lang_flow.flow.p_flowVersion')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_flow.flow.flowStatus')" prop="flowStatus">
            <Select v-model="formValidate.flowStatus" :disabled="editDisbale"  :placeholder="$t('lang_flow.flow.p_flowStatus')" transfer>
              <Option :value="item.paramCode" v-for="(item,index) in selectFlowStatus" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_flow.flow.flowAfthdClass')" prop="flowAfthdClass">
            <Input v-model="formValidate.flowAfthdClass" :disabled="editDisbale"  :placeholder="$t('lang_flow.flow.p_flowAfthdClass')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_flow.flow.comment')" prop="comment">
            <Input v-model="formValidate.comment" :disabled="editDisbale" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.flow.p_comment')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset" v-show="!editDisbale" style="margin-left: 8px">{{$t('button.cal')}}</Button>
              <Button type="primary" v-show="!editDisbale" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
    <transition name="fade">
      <searchTable v-show="openPick" :searchTitle="searchTitle" :searchCloumns="searchCloumns" :searchText="searchText" :params="params" @closeUp="close" @changeinput="changeinput" ref="searchTable"></searchTable>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import searchTable from '../../../components/searchTable/searchTable'
  import { isSuccess, deepCopy } from '../../../lib/util'


  export default {
    data() {
      return {
        openPick: false,
        editDisbale: false, // 是否可编辑
        selectFlowStatus: [],
        selectFormType: [],
        flowStatusDis: '',
        flowFormtypeDis: '',
        flowFormDis: '',
        formValidate: {
          _mt: 'platFlow.addOrUpd',
          flowCode: '',
          flowName: '',
          flowStatus: '',
          flowFormtype: '',
          flowForm: '',
          flowVersion: '',
          flowAfthdClass: '',
          comment: '',
          funId: '1',
          logType: '',
        },
        searchCloumns: [
          {
            title: this.$t('lang_flow.flow.sformName'),
            key: 'sformName',
            sortable: 'custom',
            width: 253,
          },
          {
            title: this.$t('lang_flow.flow.sformTbname'),
            key: 'sformTbname',
            sortable: 'custom',
            width: 253,
          },
        ],
        searchTitle: this.$t('lang_flow.flow.searchTitle'),
        searchText: this.$t('lang_flow.flow.searchText'),
        params: {
          _mt: 'platSysform.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
        },
        ruleValidate: {
          flowCode: [
            { required: true, message: this.$t('lang_flow.flow.rule_flowCode'), trigger: 'blur' },
          ],
          flowName: [
            { required: true, message: this.$t('lang_flow.flow.rule_flowName'), trigger: 'blur' },
          ],
          flowForm: [
            { required: true, message: this.$t('lang_flow.flow.rule_flowForm'), trigger: 'blur' },
          ],
          flowFormtype: [
            { required: true, message: this.$t('lang_flow.flow.rule_flowFormtype'), trigger: 'blur' },
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
      searchTable,
    },
    updated() {

    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platFlow.getById',
          id: id,
          funId: '1',
          logType: '反查',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.flowCode = res.data.content[0].flowCode
            t.formValidate.flowName = res.data.content[0].flowName
            t.formValidate.flowStatus = res.data.content[0].flowStatus
            if (t.formValidate.flowStatus !== '01draft') { // 不是编辑中的状态就不可修改
              t.editDisbale = true
            }
            t.flowStatus = res.data.content[0].flowStatusDis
            t.formValidate.flowFormtype = res.data.content[0].flowFormtype
            t.flowFormtypeDis = res.data.content[0].flowFormtypeDis
            t.flowFormDis = res.data.content[0].flowFormDis
            t.formValidate.flowForm = res.data.content[0].flowForm
            t.formValidate.flowVersion = res.data.content[0].flowVersion
            t.formValidate.flowAfthdClass = res.data.content[0].flowAfthdClass
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
      handleReset() {
        this.$emit('closeUp')
        this.editDisbale = false
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'pubuserstatus,formtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectFlowStatus = res.data.content[0].value[0].paramList.splice(1, 3)
            t.selectFormType = res.data.content[0].value[1].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      pickData() {
        const t = this
        if (t.editDisbale) { // 不可编辑，不触发事件
          return
        }
        t.$refs.searchTable.getData(this.params)
        t.openPick = true
      },
      changeinput(name, code) {
        const t = this
        t.flowFormDis = name
        t.formValidate.flowForm = code
      },
      clear() {
        const t = this
        if (t.editDisbale) {
          return
        }
        t.flowFormDis = ''
        t.formValidate.flowForm = ''
        t.formValidate.flowAfthdClass = ''
      },
      close() {
        const t = this
        t.openPick = false
      },
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
