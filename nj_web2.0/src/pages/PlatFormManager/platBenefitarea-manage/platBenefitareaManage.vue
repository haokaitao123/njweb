﻿<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_platform.platBenefitarea.platBenefitarea')}}
        </p>
        <Row>
          <Input :placeholder="$t('lang_platform.platBenefitarea.bfareaCodeDis')" style="width: 160px" v-model="bfareaCode"/>
          <Input :placeholder="$t('lang_platform.platBenefitarea.bfareaName')" style="width: 160px" v-model="bfareaCname"/>
          <span style="margin: 0;"><Button type="primary" icon="search" @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" :current="page" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=rows :page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition name="fade">
      <distCountry v-show="opendistCountry" :id="updateId" @closedistCountry="closedistCountry" ref="distCountry"></distCountry>
    </transition>
    <transition name="fade">
      <distCity v-show="opendistCity" :id="updateId" @closedistCity="closedistCity" ref="distCity"></distCity>
    </transition>
  </div>
</template>
<script>
  import distCountry from './distCountry'
  import distCity from './distCity'
  import update from './addNewPlatBenefitarea'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 280,
        value: '',
        logType: '',
        openUpdate: false,
        opendistCountry: false,
        opendistCity: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_platform.platBenefitarea.bfareaCode'),
            key: 'bfareaCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.platBenefitarea.bfareaCname'),
            key: 'bfareaCname',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.platBenefitarea.bfareaEname'),
            key: 'bfareaEname',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.platBenefitarea.bfareaType'),
            key: 'bfareaTypeDis',
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 200,
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
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.upd'), params.index)
                    },
                  },
                }, this.$t('button.upd')),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.opendistCoun(params.row.id, params.row.bfareaType)
                    },
                  },
                }, this.$t('lang_platform.platBenefitarea.dist') + params.row.bfareaTypeDis.slice(1)),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 20,
        page: 1,
        funId: '1000',
        bfareaCode: '',
        bfareaCname: '',
      }
    },
    computed: {

    },
    components: {
      update,
      distCountry,
      distCity,
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
        const data = {
          _mt: 'platBenefitarea.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          funId: '1000',
          bfareaCode: t.bfareaCode,
          bfareaCname: t.bfareaCname,
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
          _mt: 'platBenefitarea.delByIds',
          funId: '1',
          logType: this.$t('button.del'),
          ids: t.tableselected,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.getData()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
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
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.formValidate = {}
      },
      opendistCoun(id, type) {
        const t = this
        t.updateId = parseInt(id, 10)
        if (type === '02company') {
          t.opendistCountry = true
          t.$refs.distCountry.getClumns1(id)
        } else if (type === '01city') {
          t.opendistCity = true
          t.$refs.distCity.getClumns1(id)
        }
      },
      closedistCountry() {
        const t = this
        t.opendistCountry = false
      //  t.$refs.distCountry.formValidate = {}
      },
      closedistCity() {
        const t = this
        t.opendistCity = false
        //  t.$refs.distCountry.formValidate = {}
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
