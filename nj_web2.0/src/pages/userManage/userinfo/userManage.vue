<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;
          &nbsp;{{$t('lang_user.rootuser.title')}}
        </p>
        <Row>
          <Input :placeholder="$t('lang_user.rootuser.placeholdername')" style="width: 200px" v-model="name"/>
          <Dropdown>
            <Button type="primary">
              {{statusDis}}
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list" >
              <span v-for="(item,index) in dropdownMenuList" :key="index" @click="getPageByState(item.paramCode,item.paramInfoCn)">
                  <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                </span>
            </DropdownMenu>
          </Dropdown>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp('',$t('button.add'))" v-show="status ==='00all' || status ==='01draft' ? true : false">{{$t('lang_user.rootuser.add')}}</Button>
          <span style="margin: 0;" v-show="status ==='01draft' ? true : false">
            <Button type="success" @click="modifystatu('02valid')">{{$t('lang_user.rootuser.valid')}}</Button>
            </span>
          <span style="margin: 0;" v-show="status ==='02valid' ? true : false">
            <Button type="primary" @click="modifystatu('01draft')">{{$t('lang_user.rootuser.draft')}}</Button>
            </span>
          <span style="margin: 0;" v-show="status ==='02valid' ? true : false">
            <Button type="error" @click="modifystatu('03invalid')">{{$t('lang_user.rootuser.invalid')}}</Button>
            </span>
          <span style="margin: 0;" v-show="status ==='03invalid' ? true : false">
            <Button type="success" @click="modifystatu('02valid')">{{$t('lang_user.rootuser.valid')}}</Button>
            </span>
          <Button type="primary" @click="importExcel" v-show="status ==='01draft' ? true : false">{{$t('lang_user.rootuser.import')}}</Button>
          <!--<Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
        </Row>
        <!--<Row>-->
          <!--<RadioGroup v-model="status" v-for="(item,index) in dropdownMenuList" :key="index" style="margin-top: 5px"  @on-change="getPageByState(item.paramCode,item.paramInfoName)">-->
            <!--<Radio :label="item.paramCode">{{item.paramInfoName}}</Radio>-->
          <!--</RadioGroup>-->
        <!--</Row>-->
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :current="page"  :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition name="fade">
      <importExcel v-show="openImport" :impid="updateId" :imp_mt="imp_mt"  @closeImport="closeImport"ref="importExcel"></importExcel>
    </transition>
  </div>
</template>
<script>
  import update from './updateUserInfo'
  import { getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import importExcel from '../../../components/importModel/importParam'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        statusDis: this.$t('lang_user.rootuser.valid'),
        openImport: false,
        logType: '',
        openUpdate: false,
        eakeEffect: 0,
        eakeinvalid: 1,
        updateId: NaN,
        imp_mt: 'sysUserinfo.importData',
        tableselected: [],
        dropdownMenuList: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_user.rootuser.name'),
            key: 'name',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootuser.mobileNo'),
            key: 'mobileNo',
            sortable: 'custom',
//          width: 120,
          },
          {
            title: this.$t('lang_user.rootuser.idNo'),
            key: 'idNo',
            sortable: 'custom',
//          width: 180,
          },
          {
            title: this.$t('lang_user.rootuser.genderDesc'),
            key: 'genderDesc',
            sortable: 'custom',
//          width: 100,
          },
          {
            title: this.$t('lang_user.rootuser.birthDate'),
            key: 'birthDate',
            sortable: 'custom',
//          width: 120,
          },
          {
            title: this.$t('lang_user.rootuser.email'),
            key: 'email',
            sortable: 'custom',
//          width: 160,
          },
          {
            title: this.$t('lang_user.rootuser.statusDesc'),
            key: 'statusDesc',
            sortable: 'custom',
//          width: 120,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 72,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginLeft: '5px',
                    display: this.status === '01draft' ? 'inline' : 'none',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginLeft: '5px',
                    display: this.status !== '01draft' ? 'inline' : 'none',
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
        select: '已生效',
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: 1,
        status: '02valid',
        name: '',
      }
    },
    computed: {

    },
    components: {
      update,
      importExcel,
    },
    mounted() {
      this.getData(1)
      this.getSelect()
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.page = page
        }
        if (this.order === 'normal') {
          this.order = 'desc'
        }
        getDataLevelUserLogin({
          _mt: 'userMgmt.userpage',
          status: t.status,
          name: t.name,
          sort: t.sort,
          order: t.order,
          rows: this.rows,
          page: this.page,
        }).then((res) => {
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
        if (t.data.length === 0) {
          t.data.push(res)
        } else {
          t.data.unshift(res)
        }
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
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmdelete'),
            onOk: () => {
                getDataLevelUserLogin({
                  _mt: 'userMgmt.deleteuser',
                  funId: '1',
                  companyId: '1',
                  logType: this.$t('button.del'),
                  ids: t.tableselected,
                }).then((res) => {
                  if (isSuccess(res, t)) {
                    t.getData(1)
                  }
                }).catch(() => {
                  t.$Modal.error({
                     title: this.$t('reminder.err'),
                     content: this.$t('reminder.errormessage'),
                  })
                })
            },
            onCancel: () => {
            },
          })
        }
      },
      modifystatu(state) {
        const t = this
        let logType = ''
        if (state === '02valid') {
          logType = '生效'
        } else if (state === '03invalid') {
          logType = '失效'
        }
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
          return
        }
        getDataLevelUserLogin({
          _mt: 'userMgmt.modifystatus',
          logType: logType,
          status: state,
          ids: t.tableselected,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.getData(1)
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '操作完成',
            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      open() {
        const t = this
        t.opendialog = true
      },
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        t.$refs.update.getSelect()
        if (id !== '') {
          t.$refs.update.getData(id)
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.formValidate.mobileNo = ''
        t.$refs.update.formValidate.name = ''
        t.$refs.update.formValidate.email = ''
        t.$refs.update.formValidate.idNo = ''
        t.$refs.update.formValidate.gender = ''
        t.$refs.update.formValidate.status = '01draft'
        t.$refs.update.formValidate.birthDate = ''
        t.$refs.update.formValidate.memo = ''
        t.$refs.update.formValidate.idType = ''
        t.$refs.update.cropedImg = ''
      },
      getSelect() {
        const t = this
        t.dropdownMenuList = []
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'pubuserstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.dropdownMenuList = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getPageByState(paramCode, paramInfoCn) {
        const t = this
        t.status = paramCode
//        if (t.status === '02valid') {
//          t.sysRootvalid = '1'
//        } else if (t.status === '03invalid') {
//          t.sysRootvalid = '0'
//        } else {
//          t.sysRootvalid = ''
//        }
        t.getData(1)
        t.statusDis = paramInfoCn
      },
      importExcel() {
        const t = this
        t.openImport = true
        t.$refs.importExcel.getDowModelFile()
      },
      closeImport() {
        const t = this
        t.openImport = false
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
