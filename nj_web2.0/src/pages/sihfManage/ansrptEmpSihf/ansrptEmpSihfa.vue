<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_ansrptEmpSihf.ansrptEmpSihf.title')}}
        </p>
        <Row>
            <span @dblclick="dbHCompany">
              <Input @on-click="selectHCompany" icon="search"  style="width: 200px" :readonly="true"
                     :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpCompanyPrompt')" v-model="empbntHirecompanyDis"/>
            </span>
          <span @dblclick="clearCity2">
          <Input @on-click="pickDataCity" icon="search" style="width: 200px" :readonly="true"
                 :placeholder="$t('lang_ansrptEmpSihf.ansrptHosfSihf.empbntBenefitlocationDis')"
                 v-model="empbntBenefitlocationDis"/>
             </span>
          <!--<Input :placeholder="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empGid')" style="width: 200px" v-model="empGid"/>-->
          <!--<Input :placeholder="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empkiWorkno')" style="width: 200px" v-model="empkiWorkno"/>-->
          <Input :placeholder="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empCname')" style="width: 200px" v-model="empCname"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :current="page" :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
    <update v-show="openUpdate" @closeUp="closeUp" ref="update"></update>
    </transition>
    <!--雇佣公司-->
    <transition name="fade">
      <searchHCompany v-show="openHCompany" @closeHCompany="closeHCompany" :searchHCClo="searchHCClo"
                      @inputHCompany="inputHCompany" :params="paramsHCompany" ref="searchHCompany"></searchHCompany>
    </transition>
    <transition name="fade">
      <searchCityPub v-show="openPickCity" @closeUp="closeCity" @changeinput="changeinputCity"
                     ref="searchCityPub"></searchCityPub>
    </transition>
  </div>
</template>
<script>
  import update from './empSihfbase'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import searchHCompany from '../../../components/searchTable/searchHCompany'
  import searchCityPub from '../../../components/searchTable/searchCityPub'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        openPickCity: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntEmpid'),
            key: 'empCname',
            width: 150,
//            sortable: 'custom',
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntHirecompany'),
            key: 'empbntHirecompanyDis',
            width: 150,
//            sortable: 'custom',
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntBenefitlocation'),
            key: 'empbntBenefitlocationDis',
            width: 150,
//            sortable: 'custom',
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntBenefitpolicy'),
            key: 'empbntBenefitpolicyDis',
            width: 150,
//            sortable: 'custom',
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntBenefittype'),
            key: 'empbntBenefittypeDis',
            width: 150,
//            sortable: 'custom',
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntSdate'),
            key: 'empbntSdate',
            width: 150,
//            sortable: 'custom',
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntEdate'),
            key: 'empbntEdate',
            width: 150,
//            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 64,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id,params.row.empbntEmpid, this.$t('button.view'), params.index)
                    },
                  },
                }, this.$t('button.view')),
              ])
            },
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
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        empGid: '',
        empkiWorkno: '',
        empCname: '',
        empbntHirecompany: '',
        empbntHirecompanyDis: '',
        empbntBenefitlocation: '',
        empbntBenefitlocationDis: '',
      }
    },
    computed: {

    },
    components: {
      update,
      searchCityPub,
      searchHCompany,
    },
    mounted() {
//      this.getData(1)
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        if (t.empbntHirecompany === '' && t.empbntBenefitlocation === '') {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '必须选择公司或者社保缴纳地',
          })
        } else {
          const data = {
            _mt: 'ansrptEmpSihfBenefit.getPage',
            sort: t.sort,
            order: t.order,
            rows: t.rows,
            page: t.page,
            logType: '查询List',
            empGid: t.empGid,
            empkiWorkno: t.empkiWorkno,
            empCname: t.empCname,
            empbntHirecompany: t.empbntHirecompany,
            empbntBenefitlocation: t.empbntBenefitlocation,
          }
          for (const dat in data) {
            if (data[dat] === '') {
              delete data[dat]
            }
          }
          getDataLevelUserLoginNew(data).then((res) => {
            if (isSuccess(res, t)) {
              t.data = res.data.content[0].rows
              t.total = res.data.content[0].records
            }
          }).catch(() => {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        }
      },
      //  雇佣公司
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
        t.empbntHirecompanyDis = name
        t.empbntHirecompany = id
      },
      dbHCompany() {
        const t = this
        t.empbntHirecompanyDis = ''
        t.empbntHirecompany = ''
      },
      // 弹出框公司----end
      pickDataCity() {
        this.$refs.searchCityPub.getData()
        this.openPickCity = true
      },
      changeinputCity(row) {
        const t = this
        t.empbntBenefitlocationDis = row.cityName
        t.empbntBenefitlocation = row.id
      },
      clearCity2() {
        const t = this
        t.empbntBenefitlocationDis = ''
        t.empbntBenefitlocation = ''
      },
      closeCity() {
        const t = this
        t.openPickCity = false
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
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        } else {
          this.order = 'desc'
        }
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
      },
      open() {
        const t = this
        t.opendialog = true
      },
      openUp(id,empbntEmpid, logType, index) {
        const t = this
        t.openUpdate = true
//      将本条数据的id传入mainid（如果有的话）
        this.$store.commit('ansrptEmpSihf/setMainId', id)
        this.$store.commit('ansrptEmpSihf/setIndex', index)
        this.$store.commit('ansrptEmpSihf/setChildId1', empbntEmpid)
        if (id) {
          t.$refs.update.getOptionData()
        }
        t.$refs.update.getOption(logType)
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.clear()
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
    },
  }
</script>
<style lang="scss" scoped>
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
