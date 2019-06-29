<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{roleGrpName}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>

      <Row class="table-form">
            <Input :placeholder="searchText" style="width: 200px" v-model="pmtypeCode"/>
            <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(sentParams)">{{$t('button.ser')}}</Button></span>
            <span style="margin: 0;"><Button type="warning" icon="trash-b" @click="clear(1)">{{$t('button.cle')}}</Button></span>
          </Row>
          <row class="table-form" ref="table-form">
            <i-col span="19">
             <Table @on-selection-change="selectedtable" height="320" :row-class-name="addRowClass" size="small" border ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
            </i-col>
            <i-col span="4" offset="1">
              <div class="btn-group">
                <Button type="primary" @click="handleSelectAll(true)" >{{$t('lang_user.rootrole.allPick')}}</Button>
                <Button type="primary" @click="handleSelectAll(false)">{{$t('lang_user.rootrole.resetTree')}}</Button>
                <Button type="primary" @click="updStateRoleMe()">{{$t('button.sav')}}</Button>
              </div>
            </i-col>
          </row>
          <Row style="display: flex">          <Page :total="total" showTotal size="small" show-elevator show-sizer placement="top" :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>

      <!-- 选项卡 开始-->
      <!--<Tabs value="name1">
        <TabPane label="分配角色" name="name1">
          <Row class="table-form">
            <Input :placeholder="searchText" style="width: 200px" v-model="pmtypeCode"/>
            <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(sentParams)">{{$t('button.ser')}}</Button></span>
            <span style="margin: 0;"><Button type="warning" icon="trash-b" @click="clear(1)">清空</Button></span>
          </Row>
          <row class="table-form" ref="table-form">
            <i-col span="19">
             <Table @on-selection-change="selectedtable" height="320" :row-class-name="addRowClass" size="small" border ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
            </i-col>
            <i-col span="4" offset="1">
              <div class="btn-group">
                <Button type="primary" @click="handleSelectAll(true)" >全选</Button>
                <Button type="primary" @click="handleSelectAll(false)">重置</Button>
                <Button type="primary" @click="updStateRoleMe()">{{$t('button.sav')}}</Button>
              </div>
            </i-col>
          </row>
          <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
        </TabPane>
        <TabPane label="分配组织架构" name="name2">
          <Row>
            <Col class="col border_l" span="19">
              <Tree :data="distribution_data" show-checkbox multiple ref="orangize_tree"></Tree>
            </Col>
            <Col span="4" offset="1">
            <div class="btn-group">
              <Button type="primary" @click="expand">展开</Button>
              <Button type="primary" @click="disExpand">收缩</Button>
              <Button type="primary" @click="allPick">全选</Button>
              <Button type="primary" @click="resetTree">重置</Button>
              <Button type="primary" @click="save">{{$t('button.sav')}}</Button>
            </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="分配成本中心" name="name3">
          <Row class="table-form">
            <Input :placeholder="cost_searchText" style="width: 200px" v-model="pmtypeCode_cost"/>
            <Button type="primary" icon="search" @click="cost_getData(id)">{{$t('button.ser')}}</Button>
            <Button type="warning" icon="trash-b" @click="clear(2)">清空</Button>
          </Row>
          <Row class="table-form">
            <Col span="19">
              <Table border ref="cost_select" :columns="cost_columns" :data="cost_data" height="320" :row-class-name="addClostRowClass"  @on-selection-change="cost_select_table"></Table>
            </Col>
            <Col span="4" offset="1">
              <div class="btn-group">
                <Button type="primary" @click="costSelectAll(true)">全选</Button>
                <Button type="primary" @click="costSelectAll(false)">重置</Button>
                <Button type="primary" @click="saveUpCost()">{{$t('button.sav')}}</Button>
              </div>
            </Col>
          </Row>
          <Row style="display: flex">          <Page :total="cost_total" size="small" show-elevator show-sizer placement="top" :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
        </TabPane>
      </Tabs>-->
      <!-- 选项卡 结束-->

    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default{
  data() {
    return {
      id: '',
      tableselected: [],
      total: NaN,
      //  分配角色
      pmtypeCode: '',
      params: {
        _mt: 'sysFunctions.selSysFunctionsByTree',
        funType: '1admin',
      },
      data: [],
      //  分配角色  ------------
      // 分配组织架构
      orangize_params: {
        _mt: 'orgUnits.getTree',
      },
      distribution_data: [],
      // 分配组织架构 -----------
      //  分配成本中心
      cost_searchText: '请输入成本中心',
      pmtypeCode_cost: '',
      costParams: {
        _mt: 'orgCostcenter.getPage',
        logType: '操作类型',
        sort: 'id',     //  排序字段
        order: 'desc',  //  排序类型
        rows: '10',     //  每页显示条数
        page: '1',      //  当前页
      },
      cost_columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: this.$t('lang_role.adminuser.costCode'),
          key: 'costCode',
        },
        {
          title: this.$t('lang_role.adminuser.cname'),
          key: 'cname',
        },
      ],
      cost_data: [],
      get_cost_table: '', //  存放分配成本中心表的id值
      cost_total: 0,      //  分配成本中心分页总条数
      //  分配成本中心  ---------
    }
  },
  props: {
    searchText: String,
    roleGrpName: String,
    searchCloumns: Array,
    sentParams: Object,
  },
  mounted() {

  },
  methods: {
    // 分配角色
      getData(sentParams) {
        const t = this
        const data = deepCopy(sentParams)
        data['roleCname'] = t.pmtypeCode
        data['authGroupSign'] = 2
        data['userIdSign'] = t.id
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            for (const dat in res.data.content[0].rows) {
              if (res.data.content[0].rows[dat].authGroupTitl === '1') {
                res.data.content[0].rows[dat]['_checked'] = true
                res.data.content[0].rows[dat]['_disabled'] = true
              }
              if (res.data.content[0].rows[dat].authGroupCheckd === '1') {
                res.data.content[0].rows[dat]['_checked'] = true
              }
            }
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
      addRowClass(row, index) {  // 添加高亮颜色
        if (row.authGroupTitl === '1') {
          return 'demo-table-error-row'
        }
        return ''
      },
    // 分配角色 ---------------------------------
    //  分配组织架构获取树
      orangize_getData() {
        const t = this
        const data = deepCopy(t.orangize_params)
        data.userId = t.id
        data.id = 0
        data.logType = '日志描述'
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0]) {
              t.distribution_data = t.toTree(res.data.content[0].value)
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
        /* 把后台数据转化为tree的格式 */
      toTree(data) {
        data.forEach((item) => {
          item.expand = false
          item.checked = item.isCheck === '1'
          item.title = item.unitCode + ' ' + item.unitSname
          delete item.children
        })
        const map = {}
        data.forEach((item) => {
          map[item.id] = item
        })
        const val = []
        data.forEach((item) => {
          const parent = map[item.unitPid]
          if (parent) {
            (parent.children || (parent.children = [])).push(item)
          } else {
            val.push(item)
          }
        })
        return val
      },
      expand() {  //  展开
        this.treeData(this.distribution_data, 'expand', true)
      },
      disExpand() { //  收缩
        this.treeData(this.distribution_data, 'expand', false)
      },
      allPick() { //  全选
        this.treeData2(this.distribution_data, 'checked', true)
      },
      resetTree() { //  重置
        this.treeData2(this.distribution_data, 'checked', false)
        this.treeData(this.distribution_data, 'checked', false)
      },
        //  保存（分配组织架构）
      save() {
        const t = this
        const checkedId = []
        const checked = t.$refs.orangize_tree.getCheckedNodes()
        for (let i = 0; i < checked.length; i++) {
          checkedId.push(checked[i].id)
        }
        const data = {
          _mt: 'authRolePower.addAuthUseorgunit',
          logType: '日志类型',
          orgUserId: t.id,
          orgunitid: checkedId.join(),
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.savsuccess'),
            })
            t.$emit('closePower')
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
        //  保存 END
        /* 遍历树形数组对象 */
      treeData(data, item, value) {
        const t = this
        for (let i = 0; i < data.length; i++) {
          if (data[i].children !== undefined) {
            data[i][item] = value
            t.treeData(data[i].children, item, value)
          }
        }
      },
      treeData2(data, item, value) {
        const t = this
        for (let i = 0; i < data.length; i++) {
          if (data[i].children !== undefined) {
            t.treeData2(data[i].children, item, value)
          } else {
            data[i][item] = value
          }
        }
      },
    //  分配组织架构获取树  -------------------------
    // 分配成本中心
      cost_getData(id) {
        const t = this
        const data = deepCopy(t.costParams)
        data['userId'] = id
        data['costCode'] = t.pmtypeCode_cost
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            for (const dat in res.data.content[0].rows) {
              // if (res.data.content[0].rows[dat].authGroupTitl === '1') {
              //   res.data.content[0].rows[dat]['_checked'] = true
              //   res.data.content[0].rows[dat]['_disabled'] = true
              // }
              if (res.data.content[0].rows[dat].isCheck === '1') {
                res.data.content[0].rows[dat]['_checked'] = true
              }
            }
            t.cost_data = res.data.content[0].rows
            t.cost_total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      costSelectAll(status) {
        this.$refs.cost_select.selectAll(status)
      },
      // 拿多选框的值
      cost_select_table(option) {
        const newArr = []
        for (let i = 0; i < option.length; i++) {
          newArr.push(option[i].id)
        }
        this.get_cost_table = newArr.toString()
      },
      // 保存提交（分配成本中心）
      saveUpCost() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'authRolePower.addAuthUsecostcenter',
          logType: '日志类型',
          cosUserId: t.id,
          costid: t.get_cost_table,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.savsuccess'),
            })
            // t.close()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      addClostRowClass(row, index) {  // 添加高亮颜色
      if (row.isCheck === '1') {
        return 'demo-table-error-row'
      }
      return ''
    },
    // 分配成本中心 ---------------------------------
    close() {
      this.$emit('close')
    },
    dbCkick(row) {
      const t = this
      this.$emit('changeinput', row[t.searchCloumns[0].key], row[t.searchCloumns[1].key])
      this.$emit('close')
    },
    clear(num) {  //  清空搜索条件
      if (num === 1) {
        this.pmtypeCode = ''
      } else if (num === 2) {
        this.pmtypeCode_cost = ''
      }
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status)
    },
    selectedtable(selection) {
      const newArr = []
      for (let i = 0; i < selection.length; i++) {
        newArr.push(selection[i].id)
      }
      this.tableselected = newArr.toString()
    },
    updStateRoleMe() {
      const t = this
      const arr = t.$refs.selection.getSelection()
      let ids = ''
      const idsArr = []
      for (let i = 0; i < arr.length; i++) {
        idsArr.push(arr[i].id)
      }
      ids = idsArr.join(',')
      getDataLevelUserLogin({
        _mt: 'sysUserinfo.setRoleByIds',
        funId: '1',
        logType: '分配权限',
        authRoleId: ids,
        roletype: '6essmss',
        id: t.id,
      }).then((res) => {
        if (isSuccess(res, t)) {
          t.$Modal.success({
            title: this.$t('reminder.suc'),
            content: this.$t('reminder.savsuccess'),
          })
          t.close()
        }
      }).catch(() => {
        t.$Modal.error({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    },
    sortable(column) {
      this.params.sort = column.key
      this.params.order = column.order
      if (column.order !== 'normal') {
        this.getData(this.params)
      }
    },
  },
}
</script>
<style lang="scss">
  @import "../../../sass/table";
</style>
<style lang="scss" scoped>
  .border_l{
    overflow-y: auto;
    border: 1px #efefef solid;
    padding: 20px 10px;
  }
  .table-form{
    margin-bottom: 10px;
  }
  .btn-group{
    width: 80%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .background{
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
  .backbox{
    position:relative;
    width: 900px;
    max-height: 540px;
    background-color: #fff;
    padding: 60px 20px 15px 20px;
    border-radius: 10px;
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
</style>
