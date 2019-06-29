<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_organization.orgDeptpost.title')}}
        </p>
        <Row>
          <Input placeholder="请输入部门名称" style="width: 200px"  @on-enter="enterEvent" v-model="unitFname"/>
          <Input placeholder="请输入岗位名称" style="width: 200px" @on-enter="enterEvent"  v-model="postFname"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
          <Button type="primary" @click="expData">导出</Button>
          <Button type="primary" @click="importExcel">导入</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table :loading="loading" @on-select="selectedtable" @on-selection-change="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" :showTotal="showTotal" :current="page" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=rows :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="search()"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition>
      <expwindow
        v-show="openExp"
        :id="tableselected"
        @setFileKey="setFileKey"
        :logType="logType"
        :index="index"
        @closeExp="closeExp"
        ref="expwindow"
      ></expwindow>
    </transition>
    <transition>
      <expdow
        v-show="openExpDow"
        :filekey="filekey"
        :filename="filename"
        @closeExpDowMain="closeExpDowMain"
        ref="expdow"
      ></expdow>
    </transition>
    <transition name="fade">
      <importExcel
        v-show="openImport"
        :impid="updateId"
        :imp_mt="imp_mt"
        @getData="getData"
        @closeImport="closeImport"
        ref="importExcel"
      ></importExcel>
    </transition>
  </div>
</template>
<script>
  import update from './addOrgDeptpost'
  import { isSuccess } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import expwindow from "../../../components/fileOperations/expSms";
  import expdow from "../../../components/fileOperations/expdow";
  import importExcel from "../../../components/importModel/importParam";

  export default{
    data() {
      return {
        tableOperate:false,  //加上这个变量
        // 导入的mt名称
        imp_mt: "orgDeptpost.importData",
        // 导出字段设置, code字段名 name列名
        expDataTital: [
          { code: "unitFname", name: "部门名称" },
          { code: "postFname", name: "岗位名称" },
          { code: "note", name: "备注" }
        ],
        // 导入导出默认参数 无需变更
        openImport: false,
        openExpDow: false,
        openExp: false,
        filekey: "",
        filename: "",
        loading: "",
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
            fixed: 'left'
          },
          {
            title: this.$t('lang_organization.orgDeptpost.unitFname'),
            key: 'unitFname',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_organization.orgDeptpost.postFname'),
            key: 'postFname',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_organization.orgDeptpost.note'),
            key: 'note',
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
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        showTotal: true,
        index: 0,
        sort: 'id',
        order: 'asc',
        rows: 20,
        page: 1,
        funId: '1000',
        unitFname:'',
        postFname:'',
      }
    },
    computed: {

    },
    components: {
      update,
      expwindow,
      expdow,
      importExcel
    },
    mounted() {
      this.getData(1)
    },
    methods: {
      //enter事件
      enterEvent(e){
        if(e.target.value != ''){
          this.getData(1)
        }
      },
      getData(page) {
        const t = this
        if (page) {
          this.page = page
        }
        if (typeof (page) == "undefined") {
          this.page = 1;
        }
        const data = {
          _mt: 'orgDeptpost.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          funId: 1000,
          unitFname: t.unitFname,
          postFname: t.postFname,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.loading = true;
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.loading = false;
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.loading = false;
          t.$Message.error(this.$t('reminder.errormessage'))
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
      search(){
        this.getData(1);
        this.tableselected = [];
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData(t.page)
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
      },
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          this.$Message.warning(this.$t('reminder.leastone'))
        } else {
        	t.$Modal.confirm({
        		title: this.$t('reminder.remind'),
        		content: this.$t('reminder.confirmdelete'),
        		onOk: () => {
        			getDataLevelUserLogin({
          _mt: 'orgDeptpost.delByIds',
          funId: '1',
          logType: this.$t('button.del'),
          delIds: t.tableselected.toString(),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.$Message.success(this.$t('reminder.deletesuccess'))
            t.tableselected = []
            t.getData()
          }
        }).catch(() => {
            t.$Message.error(this.$t('reminder.errormessage'))
        })
        		},
        		onCancel: () => {},
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
//        t.$refs.update.getSelect()
        if (logType === this.$t('button.upd')) {
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

      },
      closeImport() {
        const t = this;
        t.openImport = false;
      },
      // 导入导出默认方法 无需更改
      importExcel() {
        const t = this;
        t.openImport = true;
        t.$refs.importExcel.getDowModelFile();
      },
      // 导入导出默认方法
      expData() {
        const t = this;
        // 填装查询条件
        const data = {
          unitFname: t.unitFname,
          postFname: t.postFname,
        };
        // 设置导出mt参数
        this.$refs.expwindow.getData(this.expDataTital, "orgDeptpost.export", data);
        this.openExp = true;
      },
      // 导入导出默认方法 无需更改
      closeExp() {
        const t = this;
        t.openExp = false;
      },
      // 导入导出默认方法 无需更改
      closeExpDowMain() {
        const t = this;
        t.openExpDow = false;
      },
      // 导入导出默认方法 无需更改
      setFileKey(filekey, filename, openExpDow) {
        const t = this;
        t.filekey = filekey;
        t.filename = filename;
        t.openExpDow = openExpDow;
        t.$refs.expdow.getPriToken(t.filekey);
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
