<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_communication.commonFlowUpdate2.payproContactComp')}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="content-main">
          <Row>
          <Input :placeholder="$t('lang_communication.commonFlowUpdate2.ppcCompanyscopeDis')" style="width: 200px" v-model="ppcCompanyscope"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>

        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable"  @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </div>
    </div>
  </div>
</template>
<script>

  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin,getDataLevelUserLoginNew3 } from '../../../axios/axios'

  export default{
    data() {
      return {
        tableheight:430,
        value: '',
        logType: '',
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        roleType: [],
        ppcCompanyscope:'',
        ppcRoleDis:'',
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_payroll.payProcessconfig.ppcSalset'),
            key: 'ppcSalsetDis',
          },
          {
            title: this.$t('lang_payroll.payProcessconfig.ppcScopecode'),
            key: 'ppcScopecode',
          },
          {
            title: this.$t('lang_payroll.payProcessconfig.ppcScopename'),
            key: 'ppcScopename',
          },
          {
            title: this.$t('lang_payroll.payProcessconfig.ppcCompanyscope'),
            key: 'ppcCompanyscope',
            width: 160,
          },
          {
            title: this.$t('lang_payroll.payProcessconfig.ppcRole'),
            key: 'ppcRoleDis',
          },
          {
            title: this.$t('lang_payroll.payProcessconfig.ppcContact'),
            key: 'ppcContact',
          },
          {
            title: this.$t('lang_payroll.payProcessconfig.ppcEmail'),
            key: 'ppcEmail',
          },
          {
            title: this.$t('lang_payroll.payProcessconfig.ppcPhone'),
            key: 'ppcPhone',
          },

        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
      }
    },
    props:{
        payproSalset:String
    },

    computed: {
    },
    components: {

    },
    mounted() {

        // this.getData(1)
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        t.formDataSubmit = {};
          t.formDataSubmit._mt = "payProcessconfig.getPage";
          t.formDataSubmit.logType = '查询';
          t.formDataSubmit.data = JSON.stringify({'ppcSalset':t.payproSalset,'ppcCompanyscope':t.ppcCompanyscope,isValid:'1'});
          t.formDataSubmit.rows = t.rows
          t.formDataSubmit.page = t.page
          t.formDataSubmit.sort = t.sort
          t.formDataSubmit.order = t.order
          t.formDataSubmit.ppcSalset= t.ppcSalset,
          console.log(t.formDataSubmit.stepId + "111111111111111111111");
          getDataLevelUserLoginNew3(t.formDataSubmit)
            .then(res => {

              if (isSuccess(res, t)) {
                 t.data = res.data.content[0].rows
                 t.total = res.data.content[0].records
              }
            })
            .catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage')
              });
            });
      },

      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        } else {
          this.order = 'desc'
        }
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData()
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
      },


      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.formValidate.ppcSalset = ''
        t.$refs.update.formValidate.ppcScopecode = ''
        t.$refs.update.formValidate.ppcScopename = ''
        t.$refs.update.formValidate.ppcCompanyscope = ''
        t.$refs.update.formValidate.ppcRole = ''
        t.$refs.update.formValidate.ppcContact = ''
        t.$refs.update.formValidate.ppcEmail = ''
        t.$refs.update.formValidate.ppcPhone = ''
        t.$refs.update.formValidate.ppcSdate = ''
        t.$refs.update.formValidate.ppcEdate = ''
        t.$refs.update.formValidate.ppcComment = ''
      },
      handleReset() {
        const t = this
        t.$emit('closeEmp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .content-main{
    height: 500px;
    .table-form{
      margin: 10px 0;
    }
  }
  .table-form{
    margin: 10px 0;
  }
  .margin-right-10{
    margin-right: 10px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
