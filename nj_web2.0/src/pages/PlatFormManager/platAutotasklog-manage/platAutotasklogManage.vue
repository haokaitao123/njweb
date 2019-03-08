<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_platform.autotasklog.autotasklog')}}
        </p>
        <Row>
              <span @dblclick="clearatsk">
              <Input v-model="atlogAtskidName" icon="search" :readonly="true" :placeholder="$t('lang_platform.autotasklog.atlogAtskidNameIns')" style="width: 200px" @on-click="pickData" />
            </span>
          <DatePicker type="date" :placeholder="$t('lang_platform.autotasklog.sdateIns')" :editable="false" v-model="sdate" style="width: 200px"></DatePicker>
          <DatePicker type="date" :placeholder="$t('lang_platform.autotasklog.edateIns')" :editable="false" v-model="edate" style="width: 200px"></DatePicker>
          <Input :placeholder="$t('lang_platform.autotasklog.atlogRuntypeIns')" style="width: 200px" v-model="atlogRuntype"/>
            <Select style="width: 200px"  v-model="atlogStatus"  :placeholder="$t('lang_platform.autotasklog.atlogStatusIns')">
              <Option :value="item.paramCode"  v-for="(item,index) in selectStatusType" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          <!--<Dropdown>-->
          <!--<DropdownMenu slot="list" >-->
                <!--<span key="index" @click="selected('','全部')">-->
                  <!--<DropdownItem name="">全部</DropdownItem>-->
                <!--</span>-->
            <!--<span v-for="(item,index) in selectStatusType" key="index" @click="selected(item.paramCode,item.paramInfoCn)">-->
                  <!--<DropdownItem>{{item.paramInfoCn}}</DropdownItem>-->
                <!--</span>-->
          <!--</DropdownMenu>-->
          <!--</Dropdown>-->
          <span style="margin: 0;"><Button type
                                               ="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" :current="page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" @closeUp="close" :id="updateId" :logType="logType" :index="index"  @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition name="fade">
      <searchtask v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="close1" @changeinput="changeinput" ref="searchtask"></searchtask>
    </transition>
  </div>
</template>
<script>
  import searchtask from '../../../components/searchTable/searchAutotask'
  import update from './platAutotasklogView'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        selectStatusType: [],
        openUpdate: false,
        updateId: NaN,
        atlogAtskidName: '',
        atlogAtskid: '',
        openPick: false,
        tableselected: [],
        params: {
          _mt: 'platAutotask.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          logType: this.$t('button.ser'),
          data: '{}',
        },
        searchCloumns: [
          {
            title: this.$t('lang_platform.autotasklog.atskName'),
            key: 'atskName',
            sortable: 'custom',
            width: 380,
          },
          {
            title: this.$t('lang_platform.autotasklog.atskTypeName'),
            key: 'atskTypeName',
            sortable: 'custom',
            width: 379,
          },
        ],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_platform.autotasklog.atlogRuntime'),
            key: 'atlogRuntime',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.autotasklog.atlogRuntype'),
            key: 'atlogRuntype',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.autotasklog.atlogAtskidName'),
            key: 'atlogAtskidName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.autotasklog.atlogStatusName'),
            key: 'atlogStatusName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.autotasklog.atlogError'),
            key: 'atlogError',
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
                      this.openUp(params.row.id, this.$t('button.view'), params.index)
                    },
                  },
                }, this.$t('button.view')),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        sdate: '',
        edate: '',
        atlogStatus: '',
        atlogRuntype: '',
      }
    },
    computed: {

    },
    components: {
      searchtask,
      update,
    },
    mounted() {
      this.getSelect()
      this.getData(1)
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt: 'platAutotasklog.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          funId: t.funId,
          logType: this.$t('button.ser'),
          sdate: t.sdate,
          edate: t.edate,
          atlogStatus: t.atlogStatus,
          atlogRuntype: t.atlogRuntype,
          atlogAtskid: t.atlogAtskid,
        }
        if (data.sdate !== undefined) {
          data.sdate = data.sdate === '' ? '' : new Date(data.sdate).format('yyyy-MM-dd HH:mm:ss')
        }
        if (data.edate !== undefined) {
          data.edate = data.edate === '' ? '' : new Date(data.edate).format('yyyy-MM-dd HH:mm:ss')
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
        this.tableselected = newArr.toString()
      },
      open() {
        const t = this
        t.opendialog = true
      },
      close1() {
        const t = this
        t.openPick = false
      },
      changeinput(name, id) {
        const t = this
        t.atlogAtskidName = name
        t.atlogAtskid = id
      },
      pickData() {
        const t = this
        t.$refs.searchtask.getData(this.params)
        t.openPick = true
      },
      clearatsk() {
        const t = this
        t.atlogAtskid = ''
        t.atlogAtskidName = ''
      },
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
//        t.$refs.update.getSelect()
        if (logType === this.$t('button.view')) {
          t.$refs.update.getData(id)
        }
      },
      close() {
        const t = this
        t.openUpdate = false
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'atskrunstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectStatusType = (res.data.content[0].value[0].paramList)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
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
