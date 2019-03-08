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
          <FormItem :label="$t('lang_payroll.paySalplan.salpltkpEmployeeDis')" prop="salpltkpEmployeeDis">
            <span @dblclick="clearCityid">
              <Input v-model="formValidate.salpltkpEmployeeDis" icon="search" :readonly="true" :placeholder="$t('lang_payroll.paySalplan.salpltkpEmployeeDisCheck')"  @on-click="pickData" />
            </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.paySalplan.salpltkpIsmain')" prop="salpltkpIsmain">
            <RadioGroup v-model="formValidate.salpltkpIsmain" :placeholder="$t('lang_payroll.paySalplan.salpltkpIsmainCheck')">
              <Radio :label="item.paramCode" v-for="(item,index) in selectYesNo" key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_payroll.paySalplan.salpltkpResdesc')" prop="salpltkpResdesc">
            <Input v-model="formValidate.salpltkpResdesc" :placeholder="$t('lang_payroll.paySalplan.salpltkpResdescCheck')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.paySalplan.salpltkpEmpstatusDis')" >
            <Input disabled v-model="formValidate.salpltkpEmpstatusDis"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_payroll.paySalplan.salpltkpComment')" prop="salpltkpComment">
            <Input v-model="formValidate.salpltkpComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.paySalplan.salpltkpCommentCheck')"></Input>
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
      <searchCity v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="close" @changeinput="changeinput" ref="searchCity"></searchCity>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'
  import searchCity from '../../../../components/searchTable/searchActiveEmp'

  export default {
    data() {
      return {
        updateImg: false,
        selectYesNo: [],
        formValidate: { salpltkpEmpstatusDis: this.$t('lang_payroll.paySalplan.empstatus') },
        openPick: false,
        searchCloumns: [
          {
            title: this.$t('lang_payroll.paySalplan.salpltkpEmployeeDis'),
            key: 'empCname',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkpEmployeeNoDis'),
            key: 'empkiWorkno',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkpEmployeeCompanyDis'),
            key: 'empcompHirecompanyDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_payroll.paySalplan.salpltkpEmployeeDeptDis'),
            key: 'empcompDeptDis',
            sortable: 'custom',
          },
        ],
        params: {
          _mt: 'viewEmpMaster.getPage',
          sort: 'id',
          order: 'asc',
          rows: '10',
          page: '1',
          funId: '1',
          logType: this.$t('button.ser'),
          empkiStatus: '\'00probation\',\'01active\'',
        },
        ruleValidate: {
          salpltkpEmployeeDis: [
            { required: true, message: this.$t('lang_payroll.paySalplan.salpltkpEmployeeDisCheck'), trigger: 'blur,change' },
          ],
          salpltkpIsmain: [
            { required: true, message: this.$t('lang_payroll.paySalplan.salpltkpIsmainCheck'), trigger: 'blur,change' },
          ],
        },
        taskId: '',
      }
    },
    components: {
      searchCity,
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    updated() {

    },
    mounted() {
    },
    methods: {
      getTaskid(id) {
        const t = this
        t.taskId = id
        t.getSelect()
        t.formValidate.salpltkpEmpstatusDis = this.$t('lang_payroll.paySalplan.empstatus')
      },
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'paySalplantaskperson.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate = res.data.content[0]
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectYesNo = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      updateimg() {
        this.updateImg = true
      },
      closeImg() {
        const t = this
        t.updateImg = false
      },
      handleSubmit() {
        const t = this
        const params = deepCopy(t.formValidate)
        params.salpltkpTaskid = t.taskId
        params._mt = 'paySalplantaskperson.addOrUpd'
        params.logType = this.$t('button.add')
//        params.atskdfAtskid = t.id
        if (t.logType === this.$t('button.upd')) {
          params.logType = this.$t('button.upd')
          params.id = t.id
        } else {
          params.salpltkpEmpstatus = '01active'
        }
        t.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(params).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$emit('getData', res.data.content[0])
                }
                if (t.logType === this.$t('button.upd')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      close() {
        const t = this
        t.openPick = false
      },
      changeinput(name, id) {
        const t = this
        t.formValidate.salpltkpEmployeeDis = name
        t.formValidate.salpltkpEmployee = id
      },
      pickData() {
        const t = this
        t.$refs.searchCity.getData(t.params)
        t.openPick = true
      },
      clearCityid() {
        const t = this
        t.formValidate.salpltkpEmployeeDis = ''
        t.formValidate.salpltkpEmployee = ''
      },
      handleReset() {
        this.$emit('closeUp')
        this.formValidate = {}
        this.$refs.formValidate.resetFields()
        // this.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd";
</style>
