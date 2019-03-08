<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row>
        <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="100">
          <i-col span="11">
            <FormItem :label="$t('lang_payroll.payPlantemperson.pltpsEmployee')" prop="pltpsEmployee">
            <span @dblclick="clearEmp">
              <Input v-model="pltpsEmpNameDis" icon="search" readonly :placeholder="$t('lang_payroll.payPlantemperson.pltpsEmployeeDis')" style="width: 100%" @on-click="pickData" />
            </span>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_payroll.payPlantemperson.pltpsEmpstatus')" prop="pltpsEmpstatus">
              <Input v-model="pltpsEmpstatusDis" readonly :placeholder="$t('lang_payroll.payPlantemperson.pltpsEmpstatusDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_payroll.payPlantemperson.pltpsIsmain')" prop="pltpsIsmain">
              <RadioGroup v-model="form.pltpsIsmain">
                <Radio :label="item.paramCode" v-for="(item,index) in YesOrNoType" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_payroll.payPlantemperson.pltpsResdesc')" prop="pltpsResdesc">
              <Input v-model="form.pltpsResdesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payPlantemperson.pltpsResdescDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_payroll.payPlantemperson.pltpsComment')" prop="pltpsComment">
              <Input v-model="form.pltpsComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payPlantemperson.pltpsCommentDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <row type="flex" justify="end">
              <FormItem label="" prop="comment">
                <Button type="ghost" @click="close" style="margin-left: 8px">{{$t('button.cal')}}</Button>
                <Button type="primary" @click="save">{{$t('button.sav')}}</Button>
              </FormItem>
            </row>
          </i-col>
        </Form>
      </Row>
    </div>
    <transition name="fade">
      <searchActiveEmp v-show="openPick" @closeUp="closeUp" @changeinput="changeinput" ref="searchActiveEmp"></searchActiveEmp>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import validChenck from '../../../lib/pub_valid'
  import searchActiveEmp from '../../../components/searchTable/searchActiveEmp'

  export default {
    data() {
      return {
        openPick: false,
        form: {
          pltpsEmployee: '',
          pltpsIsmain: '0',
          pltpsResdesc: '',
          pltpsEmpstatus: '01active',
          pltpsComment: '',
        },
        pltpsEmpNameDis: '',
        pltpsEmpstatusDis: this.$t('lang_payroll.payPlantemperson.pltpsEmpstatusInit'),
        YesOrNoType: [],
        rowId: '',
        searchCloumns: [
          {
            title: '姓名',
            key: 'empCname',
            sortable: 'custom',
          },
          {
            title: '邮箱',
            key: 'empctaPersmail',
            sortable: 'custom',
          },
        ],
        params: {
          _mt: 'viewEmpMaster.getPage',
          sort: 'id',
          order: 'asc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          empkiStatus: '\'00probation\',\'01active\'',
        },
        ruleValidate: {
          pltpsEmployee: [
            { required: true, message: this.$t('lang_payroll.payPlantemperson.pltpsEmployeeDis'), trigger: 'blur' },
          ],
          pltpsIsmain: [
            { required: true, message: this.$t('lang_payroll.payPlantemperson.pltpsIsmainDis'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
    },
    components: {
      searchActiveEmp,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      setRowId(id) {
        const t = this
        t.rowId = id
        t.getdata(id)
      },
      setIdname(idname) {
        const t = this
      },
      getdata(rowId) {
        const t = this
        const params = {
          _mt: 'payPlantemperson.getById',
          id: rowId,
          funId: '1',
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form.pltpsEmployee = res.data.content[0].pltpsEmployee
            t.form.pltpsIsmain = res.data.content[0].pltpsIsmain
            t.form.pltpsResdesc = res.data.content[0].pltpsResdesc
            t.form.pltpsEmpstatus = res.data.content[0].pltpsEmpstatus
            t.form.pltpsComment = res.data.content[0].pltpsComment
            t.pltpsEmpNameDis = res.data.content[0].pltpsEmpNameDis
            t.pltpsEmpstatusDis = res.data.content[0].pltpsEmpstatusDis
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const params = deepCopy(t.form)
        params._mt = 'payPlantemperson.addOrUpd'
        params.funId = '1'
        params.logType = '新增'
        params.pltpsPlantpid = t.id
        if (t.rowId) {
          params.logType = '修改'
          params.id = t.rowId
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(params).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.rowId) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$emit('getData')
                  t.close()
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('getData')
                  t.close()
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
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.YesOrNoType = res.data.content[0].value[0].paramList
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
        t.$refs.searchActiveEmp.getData()
        t.openPick = true
      },
      changeinput(row) {
        const t = this
        t.pltpsEmpNameDis = row.empCname
        t.form.pltpsEmployee = row.id
      },
      closeUp() {
        const t = this
        t.openPick = false
      },
      clearEmp() {
        const t = this
        t.form.pltpsEmployee = ''
        t.pltpsEmpNameDis = ''
      },
      clear() {
        const t = this
        t.form.pltpsEmployee = ''
        t.pltpsEmpNameDis = ''
        t.form.pltpsIsmain = ''
        t.form.pltpsResdesc = ''
        t.form.pltpsEmpstatus = '01active'
        t.pltpsEmpstatusDis = '在职'
        t.form.pltpsComment = ''
        this.$refs.form.resetFields()
      },
      close() {
        this.rowId = ''
        this.$emit('hideMsg')
        this.clear()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
