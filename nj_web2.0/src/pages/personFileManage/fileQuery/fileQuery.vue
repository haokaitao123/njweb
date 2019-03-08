<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_personalfile.fileQuery.title')}}
        </p>
        <Row>
          <Col span="20" style="width:100% !important;">
          <Row>
            <span @dblclick="clearUserid">
            	<Input v-model="entEmpName" icon="search" :readonly="true" :placeholder="$t('lang_personalfile.fileQuery.entEmpidDis')" style="width: 200px" @on-click="pickUserData" />
            </span>
            <span @dblclick="clearClassifid">
            	<Input v-model="entClaName" icon="search" :readonly="true" :placeholder="$t('lang_personalfile.fileQuery.entClaidDis')" style="width: 200px" @on-click="pickClassifData" />
            </span>
            <Input :placeholder="$t('lang_personalfile.fileQuery.entNoDis')" style="width: 200px" v-model="entNo"/>
            <Input :placeholder="$t('lang_personalfile.fileQuery.entNameDis')" style="width: 200px" v-model="entName"/>
            <span style="margin: 0;"><Button type="primary" icon="search" @click="search()">{{$t('button.ser')}}</Button></span>
            <Button type="primary" @click="openUp()" v-show="borrowFlag">{{$t('button.refer')}}</Button>
          </Row>
          <row class="table-form" ref="table-form">
            <Table @on-select="selectedtable"  @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
          </row>
          <Row style="display: flex">
	          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
	          <Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="refresh"></Button>
          </Row>
          </Col>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <borrowing v-show="openUpdate" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="borrowing"></borrowing>
    </transition>
    <transition name="fade">
      <searchEmpMaster v-show="openPickUser" @closeEmp="close" @inputEmp="changeinput" ref="searchEmpMaster"></searchEmpMaster>
    </transition>
    <transition name="fade">
      <searchClaPid v-show="openPickClassif" :params="params" :searchCloumns="searchCloumns" @closeUp="close1" @changeinput="changeinput1" ref="searchClaPid"></searchClaPid>
    </transition>
    <transition name="fade">
      <personFileDetail v-show="openDetail" @closeDetail="closeDetail" ref="personFileDetail"></personFileDetail>
    </transition>
  </div>
</template>
<script>
	import store from '../../../vuex/index'
  import borrowing from './BorrowingInfo'
  import searchClaPid from './searchClaPid'
  import { isSuccess } from '../../../lib/util'
  import personFileDetail from './personFileDetail'
  import searchEmpMaster from '../../../components/searchTable/searchEmpMaster'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

  export default{
    data() {
      return {
				entNo: '',
				entName: '',
				entClaid: '',
				entClaName: '',
				entEmpid: '',
				entEmpName: '',
				tableselected: [],
        tableheight: document.body.offsetHeight - 280,
        openUpdate: false,
        openPickUser: false,
        openDetail: false,
        borrowFlag: false,
        openPickClassif: false,
        columns: [
          {
            type: 'selection',
            width: 54,
            fixed: 'left',
            align: 'center',
          },
          {
            title: this.$t('lang_personalfile.fileQuery.entEmpid'),
            key: 'entEmpidDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_personalfile.fileQuery.entClaid'),
            key: 'entClaidDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_personalfile.fileQuery.entNo'),
            key: 'entNo',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_personalfile.fileQuery.entName'),
            key: 'entName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_personalfile.fileQuery.entTime'),
            key: 'entTime',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_personalfile.fileQuery.entCenid'),
            key: 'entCenidDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_personalfile.fileQuery.entCabid'),
            key: 'entCabidDis',
            sortable: 'custom',
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
                      this.openUpView(params.row.id)
                    },
                  },
                }, this.$t('button.view')),
              ])
            },
          },
        ],
        params: {
          _mt: 'archivesClassification.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          logType: '档案分类查询',
        },
        searchCloumns: [
          {
            title: this.$t('lang_personalfile.fileClass.claNo'),
            key: 'claNo',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_personalfile.fileClass.claName'),
            key: 'claName',
            sortable: 'custom',
          },
        ],
        data: [],
        total: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
      }
    },
    components: {
      borrowing,
      searchEmpMaster,
      searchClaPid,
      personFileDetail,
    },
    mounted() {
    },
    methods: {
    	refresh() {
        this.getData()
      },
      getData() {
        const t = this
        const data = {
          _mt: 'archivesEntry.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          flag: true,
					entNo: t.entNo,
					entName: t.entName,
					entClaid: t.entClaid,
					entEmpid: t.entEmpid,
          logType: this.$t('button.ser'),
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.data = []
        t.total = 0
        t.tableselected = []
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
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      updateArray(res) {
        const t = this
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
      openUp() {
        const t = this
				if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
        	let id = t.tableselected.join(',')
        	t.$refs.borrowing.getBorList(id, store.state.user.userId)
        	t.openUpdate = true
        }
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.borrowing.upFormData.id = ''
        t.$refs.borrowing.upFormData.userid = ''
        t.$refs.borrowing.upFormData.borReason = ''
        t.$refs.borrowing.upFormData.borBortime = ''
        t.$refs.borrowing.upFormData.borRettime = ''
        t.$refs.borrowing.upFormData.borCity = ''
        t.$refs.borrowing.upFormData.borAddress = ''
        t.$refs.borrowing.upFormData.borZipcode = ''
      },
      pickUserData() {
        const t = this
        t.$refs.searchEmpMaster.getData()
        t.openPickUser = true
      },
      pickClassifData() {
      	const t = this
        t.$refs.searchClaPid.getData()
        t.openPickClassif = true
      },
      openUpView(id) {
      	this.$refs.personFileDetail.getData(id)
      	this.openDetail = true
      },
      close() {
        const t = this
        t.openPickUser = false
      },
      close1() {
      	const t = this
        t.openPickClassif = false
      },
      closeDetail() {
      	const t = this
        t.openDetail = false
        t.$refs.personFileDetail.upFormData.entNo = ''
        t.$refs.personFileDetail.upFormData.entName = ''
        t.$refs.personFileDetail.upFormData.entEmpidDis = ''
        t.$refs.personFileDetail.upFormData.entClaid = ''
        t.$refs.personFileDetail.upFormData.entTime = ''
        t.$refs.personFileDetail.upFormData.entCenid = ''
        t.$refs.personFileDetail.upFormData.entCabid = ''
        t.$refs.personFileDetail.upFormData.entFile = ''
        t.$refs.personFileDetail.upFormData.entFileName = ''
        t.$refs.personFileDetail.upFormData.entNote = ''
      },
      changeinput(row) {
        const t = this
        t.entEmpName = row.empName
        t.entEmpid = row.id
      },
      changeinput1(id, name) {
        const t = this
        t.entClaid = id
        t.entClaName = name
      },
      search() {
        this.page = 1
        if (this.entEmpid) {
        	this.borrowFlag = true
        } else {
        	this.borrowFlag = false
        }
        this.getData()
      },
      clearUserid() {
      	this.entEmpName = ''
      	this.entEmpid = ''
      	this.borrowFlag = false
      },
      clearClassifid() {
      	this.entClaid = ''
				this.entClaName = ''
      },
      renderContent(h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%',
          },
        }, [
           h('Button', {
               props: {
               type: 'text',
               size: 'small',
               },
              on: {
                 click: () => { this.selectChange(data) },
              },
           }, [
            h('Icon', {
              props: {
                type: data.cityType === '01prov' ? 'android-home' : data.cityType === '02city' ? 'android-locate' : data.cityType === '03county' ? 'android-pin' : 'home',
                size: '15',
                color: data.cityType === '01prov' ? '#ff9900' : data.cityType === '02city' ? '#39c263' : data.cityType === '03county' ? '#bf3319' : '#3399ff',
              },
              style: {
                marginRight: '8px',
              },
            }),
            h('span', data.title),
            ]),
          ])
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
