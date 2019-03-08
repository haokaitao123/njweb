<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;错误列表
        </div>
        <Button type="text" @click="closeErrorListModel">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="content-main">
          <Row>
          <Input placeholder="请输入员工姓名或工号" style="width: 200px" v-model="ppcCompanyscope"/>
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
            title: '雇用公司',
            key: 'payerrCompidDis',
          },
          {
            title: '期间',
            key: 'payerrPeriod',
          },
          {
            title: '当前轮次',
            key: 'payerrRoundDis',
          },
          {
            title: this.$t('lang_payroll.payAccItem.pacemimItem'),
            key: 'payerrSalitemDis',
          },

         {
            title: this.$t('lang_payroll.payAccItem.pacemCname'),
            key: 'payerrEmpname',
          },
          {
            title: this.$t('lang_payroll.payAccItem.pacemEmpworkno'),
            key: 'payerrWorkno',
            sortable: true
          },
          {
            title: '错误类型',
            key: 'payerrErrortypeDis',
          },
          {
            title: ' 错误信息',
            key: 'payerrErrorinfo',
          },
           {
            title: '负责人',
            key: 'payerrRespersonDis',
          },
          {
            title: '处理状态',
            key: 'payerrDealstatusDis',
          },
           {
            title: '处理人',
            key: 'payerrDealpersonDis',
          },
          {
            title: '处理时间',
            key: 'payerrDealtime',
          },

        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
      }
    },
    props:{
        payproPeriod:String,
        payproSalset:String,
        payproRound:String,
        paccStatus:String,
        funId:String,
        openIdUpdate:String,
        roundNumber:String
    },

    computed: {
    },
    components: {

    },
    mounted() {

        this.getData(1)
    },
    methods: {
      getData(page) {

        const t = this
        if (page) {
          t.page = page
        }
        t.formDataSubmit = {};
          t.formDataSubmit._mt = "payProErrorlist.getPage";
          t.formDataSubmit.logType = '查询';
          t.formDataSubmit.data = JSON.stringify({'payerrPeriod':t.payproPeriod,'payerrSalset':t.payproSalset,'payerrRound':t.roundNumber,'payerrEmpname':t.ppcCompanyscope});
          t.formDataSubmit.rows = t.rows
          t.formDataSubmit.page = t.page
          t.formDataSubmit.sort = t.sort
          t.formDataSubmit.order = t.order
          t.formDataSubmit.funId= t.funId,
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
                title: "错误",
                content: "网络错误"
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



     closeErrorListModel(){
           const t = this;
            t.$emit("closeErrorListModel");

      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .cover .box {
  width: 1200px;
}
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
