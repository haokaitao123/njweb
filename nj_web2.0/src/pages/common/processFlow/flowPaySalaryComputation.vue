<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_communication.commonFlowUpdate2.payReport')}}
        </div>
        <Button type="text" @click="closeModel">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="content-main">
          <Row>
          <Input :placeholder="$t('lang_communication.commonFlowUpdate2.pacemCnameDis')" style="width: 200px" v-model="pacemCname"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>

        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable"  @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
        <transition name="fade">
          <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
        </transition>
        <transition name="fade">
          <itemList v-show="openItemList" :row="row" :id="updateId" :logType="logType" :index="index" @closeItem="closeItem" @getData="addNewArray" @update="updateArray" ref="itemList"></itemList>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>

  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin,getDataLevelUserLoginNew3 } from '../../../axios/axios'
  import update from '../../payroll/payAccount/accountEmpView'
  import itemList from '../../payroll/payAccount/accEmpItemList'

  export default{
    data() {
      return {
        pacemCname:'',
        tableheight:430,
        value: '',
        logType: '',
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        roleType: [],
        ppcCompanyscope:'',
        ppcRoleDis:'',
        openUpdate: false,
        openItemList: false,
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemCompany'),
            key: 'pacemCompanyDis',
            width: 100,
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemEmpworkno'),
            key: 'pacemEmpworkno',
            width: 100,
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemCname'),
            key: 'pacemCname',
            width: 100,
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemIdno'),
            key: 'pacemIdno',
            width: 100,
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemAccount'),
            key: 'pacemAccount',
            width: 100,
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemYfgz'),
            key: 'pacemYfgz',
            width: 100,
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemMse'),
            key: 'pacemMse',
            width: 100,
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemJsgz'),
            key: 'pacemJsgz',
            width: 100,
          },
          {
            title: this.$t('lang_payroll.payAccEmp.pacemSfgz'),
            key: 'pacemSfgz',
            width: 100,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 128,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.view'), params.index)
                    },
                  },
                }, this.$t('button.view')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.openEmp(params.row, this.$t('lang_payroll.payAccItem.title'), params.index)
                    },
                  },
                }, this.$t('button.det')),
              ])
            },
          },
        ],
        row: { paccPeriodDis: '', paccSalarysetDis: '', paccRoundDis: '', paccStatusDis: this.payproPeriod }, // 主表数据
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        // funId: '1000',
      }
    },
    props:{
        payproPeriod:String,
        payproSalset:String,
        payproRound:String,
        paccStatus:String,
        openIdUpdate:String,
        roundNumber:String
    },

    computed: {
    },
    components: {
      update,
      itemList,
    },
    mounted() {
        this.getData(1)
    },
    methods: {
      getRow(row) {
        const t = this
        t.row = row
        t.pacemPacid = row.id
        t.getData()
      },
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        var paramsData={'periodname':t.payproPeriod,'paccSalaryset':t.payproSalset,'paccRound':t.roundNumber,'paccStatus':t.paccStatus,'pacemCname':t.pacemCname}
        if(t.payproRound=='90final'){
        var paramsData={'periodname':t.payproPeriod,'paccSalaryset':t.payproSalset,'paccRound':t.roundNumber,'pacemCname':t.pacemCname,'paccStatus':"04confirmed,05alreadySealed" }
        }
        t.formDataSubmit = {};
          t.formDataSubmit._mt = "payAccountEmp.getPageByObject";
          t.formDataSubmit.logType = '查询';
          t.formDataSubmit.data = JSON.stringify(paramsData);
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
                content: this.$t('reminder.errormessage'),
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
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        t.$refs.update.getData(id)
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
      openEmp(row, logType, index) {
        const t = this
        t.logType = logType
        t.index = index
        t.openItemList = true
        t.$refs.itemList.getEmpRow(row)
      },
      closeItem() {
        const t = this
        t.openItemList = false
      },
      closeModel() {
        const t = this;
        t.$emit("closeModel");
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
