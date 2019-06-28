<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;
          {{$t('lang_user.rootrole.title4')}}
        </p>
        <Row>
          <Input :placeholder="$t('lang_user.rootuser.placeholdername')" style="width: 200px" v-model="nameOrMobile"/>
          <Dropdown>
            <Button type="primary">
              {{statusDis}}
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <span v-for="(item,index) in dropdownMenuList" :key="index"
                    @click="getPageByState(item.paramCode,item.paramInfoCn)">
                  <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                </span>
            </DropdownMenu>
          </Dropdown>
          <span style="margin: 0;"><Button type="primary" icon="search"
                                           @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp('',$t('button.add'))" v-show="sysAdminStatus !=='03invalid' ? true : false">{{$t('button.add')}}
          </Button>
          <Button type="error" @click="deletemsg('0')" v-show="sysAdminStatus ==='02valid' ? true : false">{{$t('lang_user.rootuser.invalid')}}</Button>
          <span style="margin: 0;" v-show="sysAdminStatus ==='03invalid' ? true : false">
          <Button type="success" @click="deletemsg('1')">{{$t('lang_user.rootuser.valid')}}</Button>
             </span>
        </Row>
        <!--<Row>-->
        <!--<RadioGroup v-model="sysAdminStatus" v-for="(item,index) in dropdownMenuList" :key="index" style="margin-top: 5px"  @on-change="getPageByState(item.paramCode,item.paramInfoName)">-->
        <!--<Radio :label="item.paramCode">{{item.paramInfoName}}</Radio>-->
        <!--</RadioGroup>-->
        <!--</Row>-->
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable"
                 @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns"
                 :data="data"></Table>
        </row>
        <Row style="display: flex">
          <Page :total="total" showTotal size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange"
                @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]"></Page>
          <Button type="ghost" size="small" shape="circle" icon="refresh"
                  style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp"
              @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition name="fade">
      <updStateUser v-show="updState" :roleUserName="roleUserName" :params="params" :searchText="searchText"
                    :searchCloumns="searchCloumns" @close="close" @changeinput="changeinput"
                    ref="updStateUser"></updStateUser>
    </transition>
  </div>
</template>
<script>
  import update from './editAuthUserinfo'
  import updStateUser from './updStateUser'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'

  import {isSuccess, deepCopy} from '../../../lib/util'

  export default {
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        statusDis: this.$t('lang_user.rootuser.valid'),
        logType: '',
        sysAdminStatus: '02valid',
        openUpdate: false,
        updateId: NaN,
        dropdownMenuList: [],
        tableselected: [],
        updState: false,
        searchText: this.$t('lang_user.rootgrprole.searchText'),
        searchCloumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_user.rootgrprole.roleCname'),
            key: 'roleCname',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootuserrole.authGrpDis'),
            key: 'authGrpDis',
            sortable: 'custom',
          },
        ],
        params: {
          _mt: 'authRole.getAuthRoleByPage',
          sort: 'id',
          order: 'desc',
          rows: '1000',
          page: '1',
          roleType: '1admin',
        },
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_user.rootuser.name'),
            key: 'userName',
            sortable: 'custom',
//          width: 150,
          },
          {
            title: this.$t('lang_user.rootuser.email'),
            key: 'email',
            sortable: 'custom',
//          width: 180,
          },
          {
            title: this.$t('lang_user.rootuser.mobileNo'),
            key: 'mobileNo',
            sortable: 'custom',
//          width: 150,
          },
          {
            title: this.$t('lang_user.rootgrprole.companyIdDis'),
            key: 'companyIdDis',
            sortable: 'custom',
//          width: 140,
          },
          {
            title: this.$t('lang_user.rootuserrole.authGrpDis'),
            key: 'sysUsadrolegrpDis',
            sortable: 'custom',
//          width: 140,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 150,
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
                    display: this.sysAdminStatus === '02valid' ? 'inline' : 'none',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    display: this.sysAdminStatus === '02valid' ? 'inline' : 'none',
                  },
                  on: {
                    click: () => {
                      this.updRoleState(params.row.id, params.row.companyId, params.row.userName)
                    },
                  },
                }, this.$t('lang_user.rootrole.assauth')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    display: this.sysAdminStatus !== '02valid' ? 'inline' : 'none',
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
        select: this.$t('lang_user.rootuser.valid'),
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: '1',
        status: '02valid',
        likeName: '',
        nameOrMobile: '',
        mobileNo: '',
        userName: '',
        roleUserName: '',
        sysAdminvalid: '1',
      }
    },
    computed: {},
    components: {
      update,
      updStateUser,
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
        const data = {
          _mt: 'sysUserinfo.getUserinfoByPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          sysUserSign: '2',
          sysAdminvalid: t.sysAdminvalid,
          userName: t.nameOrMobile,
          logType: '管理员用户查询列表',
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
        console.log(column)
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData(1)
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
      updRoleState(id, companyId, userName) {
        const t = this
        t.$refs.updStateUser.id = id
        const data = deepCopy(t.params)
        data['rootCompId'] = companyId
        t.$refs.updStateUser.getData(data)
        t.updState = true
        t.roleUserName = userName
      },
      changeinput(name, id) {
        const t = this
        t.rolegrpCode = name
        t.rolegrpCname = id
      },
      deletemsg(sysAdminvalid) {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmdelete'),
            onOk: () => {
              getDataLevelUserLogin({
                _mt: 'sysUserinfo.delByIds',
                logType: this.$t('button.del'),
                delIds: t.tableselected,
                sysAdminvalid: sysAdminvalid,
                stateType: '1',
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
        t.updState = false
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.clearCheck()
      },
      getSelect() {
        const t = this
        t.dropdownMenuList = []
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'pubuserstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            let statusList = res.data.content[0].value[0].paramList
            for (let i = 0; i < statusList.length; i++) {
              if (statusList[i].paramCode !== '01draft') {
                t.dropdownMenuList.push(statusList[i])
              }
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getPageByState(paramCode, paramInfoName) {
        const t = this
        t.sysAdminStatus = paramCode
        if (t.sysAdminStatus === '02valid') {
          t.sysAdminvalid = '1'
        } else if (t.sysAdminStatus === '03invalid') {
          t.sysAdminvalid = '0'
        } else {
          t.sysAdminvalid = '\'0\',\'1\''
        }
        t.getData(1)
        t.statusDis = paramInfoName
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form {
    margin: 10px 0;
  }

  .margin-right-10 {
    margin-right: 10px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
