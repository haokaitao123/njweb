<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 11px;"></Icon>&nbsp;{{$t('button.view')}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="option-main">
        <Row style="max-height: 480px;overflow-y: auto;">
          <Form ref="form" :model="form" :label-width="120">
            <i-col span="11">
              <FormItem :label="$t('lang_employee.empContractList.empctWorkNo')" prop="empctWorkNoDis">
                <Input v-model="form.empctWorkNoDis" disabled/>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem :label="$t('lang_employee.empContractList.empctName')" prop="empctNameDis">
                <Input v-model="form.empctNameDis" disabled/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem :label="$t('lang_employee.empContractList.empctHirecompany')" prop="empctHirecompanyDis">
                <Input v-model="form.empctHirecompanyDis" disabled />
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem :label="$t('lang_employee.empContractList.empctDept')" prop="empctDeptDis">
                <Input v-model="form.empctDeptDis" disabled />
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem :label="$t('lang_employee.empContractList.empctContracttype')" prop="empctContracttypeDis">
                <Input v-model="form.empctContracttypeDis" disabled />
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem :label="$t('lang_employee.empContractList.empctContractperiod')" prop="empctContractperiodDis">
                <Input v-model="form.empctContractperiodDis" disabled/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem :label="$t('lang_employee.empContractList.empctContractsdate')" prop="empctContractsdate">
                <Input v-model="form.empctContractsdate" disabled />
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem :label="$t('lang_employee.empContractList.empctContractedate')" prop="empctContractedate">
                <Input v-model="form.empctContractedate" disabled />
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem :label="$t('lang_employee.empContractList.empctContractprom')" prop="empctContractprom">
                <Input v-model="form.empctContractprom" disabled />
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem :label="$t('lang_employee.empContractList.empctConfidential')" prop="empctConfidential">
                <Input v-model="form.empctConfidential" disabled />
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem :label="$t('lang_employee.empContractList.empctProbation')" prop="empctProbation">
                <Input v-model="form.empctProbation" disabled />
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem :label="$t('lang_employee.empContractList.empctProbationdate')" prop="empctProbationdate">
                <Input v-model="form.empctProbationdate" disabled />
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem :label="$t('lang_employee.empContractList.empctSdate')" prop="empctSdate">
                <Input v-model="form.empctSdate" disabled />
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem :label="$t('lang_employee.empContractList.empctEdate')" prop="empctEdate">
                <Input v-model="form.empctEdate" disabled />
              </FormItem>
            </i-col>
            <i-col span="23">
              <FormItem :label="$t('lang_employee.empContractList.empctComment')" prop="empctComment">
                <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="form.empctComment" disabled />
              </FormItem>
            </i-col>
          </Form>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        form: {},
      }
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
          _mt: 'empContract.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form = res.data.content[0]
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset() {
        const t = this
        t.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .cover{
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1100;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box{
      position:relative;
      width: 900px;
      background-color: #fff;
      padding: 60px 0px 30px 20px;
      border-radius: 11px;
      .form{
        max-height: 800px;
        overflow-y: auto;
      }
      .title{
        display: flex;
        position: absolute;
        height: 40px;
        width: 100%;
        line-height: 40px;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        top: 0;
        border-bottom: 1px solid #efefef;
        left: 0;
        .title-text{
          font-weight: bold;
          font-size: 14px;
        }
      }
    }
  }
  .option-main{
    position: relative;
    height: 480px;
    .btn{
      position: absolute;
      bottom: 20px;
      right: 115px;
    }
    .btn1{
      position: absolute;
      bottom: 20px;
      right: 170px;
    }
  }
</style>
