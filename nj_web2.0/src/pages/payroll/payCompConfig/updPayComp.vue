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
          <Col span="10">
          <FormItem :label="$t('lang_payroll.payCompConfig.pcgCompany')" prop="pcgCompany">
            <span @dblclick="dbHCompany">
               <Input v-model="pcgCompanyName" icon="search" :readonly="true"  :placeholder="$t('lang_payroll.payCompConfig.pcgCompanyDis')"  @on-click="selectHCompany"/>
              </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.payCompConfig.pcgEmptype')" prop="pcgEmptype">
            <Select v-model="formValidate.pcgEmptype" >
              <Option :value="item.paramCode" v-for="(item,index) in selectEmptype" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem :label="$t('lang_payroll.payCompConfig.pcgSalset')" prop="pcgSalset">
            <Select v-model="formValidate.pcgSalset"  >
              <Option :value="item.id" v-for="(item,index) in selectSalset" :key="index" >{{item.payssCN}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_payroll.payCompConfig.pcgSdate')" prop="pcgSdate">
            <DatePicker type="date" v-model="formValidate.pcgSdate" :placeholder="$t('lang_payroll.payCompConfig.pcgSdateDis')" :editable="false" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem :label="$t('lang_payroll.payCompConfig.pcgEdate')" prop="pcgEdate">
              <DatePicker type="date" v-model="formValidate.pcgEdate" :placeholder="$t('lang_payroll.payCompConfig.pcgEdateDis')" :editable="false" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21">
          <FormItem :label="$t('lang_payroll.payCompConfig.pcgComment')" prop="pcgComment">
            <Input v-model="formValidate.pcgComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payCompConfig.pcgCommentDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21">
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
    <!--雇佣公司-->
    <transition name="fade">
      <searchHCompany v-show="openHCompany" @closeHCompany="closeHCompany" :searchHCClo="searchHCClo" @inputHCompany="inputHCompany" :params="paramsHCompany" ref="searchHCompany"></searchHCompany>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import searchHCompany from '../../../components/searchTable/searchHCompany'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        openHCompany: false,
        //      雇佣公司
        searchHCClo: [
          {
            title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.compCnFullName'),
            key: 'compFnameCnDis',
          },
          {
            title: this.$t('lang_employee.searchColumn.compEnFullName'),
            key: 'compFnameEnDis',
          },
        ],
        paramsHCompany: {
          _mt: 'orgUnits.getByOrgFramePageList',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'desc',
          unitType: '01company',
          logType: '雇佣公司',
        },
        formValidate: {
          _mt: 'payCompConfig.addOrUpd',
          funId: '1',
          pcgCompany: '',
          pcgEmptype: '',
          pcgSalset: '',
          pcgSdate: '',
          pcgEdate: '',
          pcgComment: '',
        },
        pcgCompanyName: '',
        ruleValidate: {
          pcgCompany: [
            { required: true, message: this.$t('lang_payroll.payCompConfig.pcgCompanyDis'), trigger: 'blur' },
          ],
          pcgEmptype: [
            { required: true, message: this.$t('lang_payroll.payCompConfig.pcgEmptypeDis'), trigger: 'blur' },
          ],
          pcgSalset: [
            { required: true, message: this.$t('lang_payroll.payCompConfig.pcgSalsetDis'), trigger: 'blur' },
          ],
          pcgSdate: [
            { required: true, type: 'date', message: this.$t('lang_payroll.payCompConfig.pcgSdateDis'), trigger: 'change' },
          ],
        },
      }
    },
    components: {
      searchHCompany,
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
      selectEmptype: Array,
      selectSalset: Array,
    },
    mounted() {
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'payCompConfig.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.pcgCompany = res.data.content[0].pcgCompany
            t.pcgCompanyName = res.data.content[0].pcgCompanyDis
            t.formValidate.pcgEmptype = res.data.content[0].pcgEmptype
            t.formValidate.pcgSalset = res.data.content[0].pcgSalset
            t.formValidate.pcgSdate = res.data.content[0].pcgSdate
            t.formValidate.pcgEdate = res.data.content[0].pcgEdate
            t.formValidate.pcgComment = res.data.content[0].pcgComment
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
        if (data.pcgSdate !== undefined) {
          data.pcgSdate = new Date(data.pcgSdate).format('yyyy-MM-dd')
        }
        if (data.pcgEdate !== undefined) {
          data.pcgEdate = data.pcgEdate === '' ? new Date('9999-12-31').format('yyyy-MM-dd') : new Date(data.pcgEdate).format('yyyy-MM-dd')
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
      //  	雇佣公司
      selectHCompany() {
        const t = this
        t.$refs.searchHCompany.getData(this.paramsHCompany)
        t.openHCompany = true
      },
      closeHCompany() {
        const t = this
        t.$refs.searchHCompany.unitCode = ''
        t.openHCompany = false
      },
      inputHCompany(name, id) {
        const t = this
        t.pcgCompanyName = name
        t.formValidate.pcgCompany = id
      },
      dbHCompany() {
        const t = this
        t.pcgCompanyName = ''
        t.formValidate.pcgCompany = ''
      },
      handleReset() {
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
