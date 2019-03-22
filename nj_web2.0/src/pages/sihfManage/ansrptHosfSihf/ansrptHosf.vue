<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          <!--员工公积金信息-->
          &nbsp;{{$t('lang_ansrptEmpSihf.ansrptEmpSihf.titleHosf')}}
        </p>
        <Row>
          <span @dblclick="dbHCompany">
              <Input @on-click="selectHCompany" icon="search"  style="width: 200px" :readonly="true"
                     :placeholder="$t('lang_hfrepay.sihfHfrepay.sihfrpCompanyPrompt')" v-model="empbntHirecompanyDis"/>
            </span>
          <span @dblclick="clearCity2">
          <Input @on-click="pickDataCity" icon="search" style="width: 200px" :readonly="true"
                 :placeholder="$t('lang_ansrptEmpSihf.ansrptHosfSihf.empbntBenefitlocationCity')"
                 v-model="emphfdHfundlocatioDis"/>
             </span>
          <Input :placeholder="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empCname')" style="width: 200px" v-model="empCname"/>
          <!--<Input :placeholder="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empGid')" style="width: 200px" v-model="empGid"/>-->
          <!--<Input :placeholder="$t('lang_ansrptEmpSihf.ansrptEmpSihf.empkiWorkno')" style="width: 200px" v-model="empkiWorkno"/>-->
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
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntHirecompany'),
            key: 'emphfdHirecompanyDis',
            width: 150,
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptHosfSihf.empbntBenefitlocation'),
            key: 'emphfdHfundlocatioDis',
            width: 150,
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptHosfSihf.empbntBenefitpolicy'),
            key: 'emphfdHfundpolicyDis',
            width: 150,
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptHosfSihf.empbntBenefittype'),
            key: 'emphfdHfundtypeDis',
            width: 150,
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntSdate'),
            key: 'emphfdSdate',
            width: 150,
          },
          {
            title: this.$t('lang_ansrptEmpSihf.ansrptEmpSihf.empbntEdate'),
            key: 'emphfdEdate',
            width: 150,
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
                      this.openUp(params.row.id,params.row.emphfdEmpid, this.$t('button.ser'), params.index)
                    },
                  },
                }, this.$t('button.ser')),
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
            key: 'unitFname',
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
        emphfdHfundlocatioDis: '',
        emphfdHfundlocatio: '',
      }
    },
    computed: {

    },
    components: {
      update,
      searchHCompany,
      searchCityPub,
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
        if (t.empbntHirecompany === '' && t.emphfdHfundlocatio === '') {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '必须选择公司或者公积金缴纳地',
          })
        } else {
          const data = {
            _mt: 'ansrptEmpSihfHfund.getPage',
            sort: t.sort,
            order: t.order,
            rows: t.rows,
            page: t.page,
            logType: '查询List',
            empGid: t.empGid,
            empkiWorkno: t.empkiWorkno,
            empCname: t.empCname,
            emphfdHirecompany: t.empbntHirecompany,
            emphfdHfundlocatio: t.emphfdHfundlocatio,
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
        t.emphfdHfundlocatioDis = row.cityName
        t.emphfdHfundlocatio = row.id
      },
      clearCity2() {
        const t = this
        t.emphfdHfundlocatioDis = ''
        t.emphfdHfundlocatio = ''
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
        this.tableselected = newArr.toString()
      },
      open() {
        const t = this
        t.opendialog = true
      },
      openUp(id, empbntEmpid, logType, index) {
        const t = this
        t.openUpdate = true
//      将本条数据的id传入mainid（如果有的话）
        this.$store.commit('ansrptHosfSihf/setMainId', id)
        this.$store.commit('ansrptHosfSihf/setIndex', index)
        this.$store.commit('ansrptHosfSihf/setChildId1', empbntEmpid)
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
