<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row>
        <Form :model="form" label-position="right"  ref="form" :label-width="110">
          <i-col span="11">
            <FormItem :label="$t('lang_payroll.payEndSalItem.pleditmType')" prop="pleditmType">
              <Select v-model="form.pleditmType" disabled :placeholder="$t('lang_payroll.payEndSalItem.pleditmTypeDis')" >
                <Option :value="item.paramCode" v-for="(item,index) in selectItemType" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_payroll.payEndSalItem.pleditmItem')" prop="pleditmItem">
            <span style="width: 100%">
              <Input v-model="form.pleditmItemDis" disabled icon="search" readonly :placeholder="$t('lang_payroll.payEndSalItem.pleditmItemDis')" />
            </span>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_payroll.payEndSalItem.pleditmCurrency')" prop="pleditmCurrency">
              <Select v-model="form.pleditmCurrency" disabled :placeholder="$t('lang_payroll.payEndSalItem.pleditmCurrencyDis')" >
                <Option :value="item.id" v-for="(item,index) in selectCurrency" :key="index">{{item.currCurrency}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_payroll.payEndSalItem.pleditmAmount')" prop="pleditmAmount">
              <Input v-model="form.pleditmAmount" disabled :placeholder="$t('lang_payroll.payEndSalItem.pleditmAmountDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_payroll.payEndSalItem.pleditmSdate')" prop="pleditmSdate">
              <Input v-model="form.pleditmSdate" disabled :placeholder="$t('lang_payroll.payEndSalItem.pleditmSdateDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1" >
            <FormItem :label="$t('lang_payroll.payEndSalItem.pleditmEdate')" prop="pleditmEdate">
              <Input v-model="form.pleditmEdate" disabled :placeholder="$t('lang_payroll.payEndSalItem.pleditmEdateDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_payroll.payEndSalItem.pleditmComment')" prop="pleditmComment">
              <Input v-model="form.pleditmComment" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payEndSalItem.pleditmCommentDis')"></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
    </div>
    <transition name="fade">
      <searchProllItem v-show="openItem" :searchCloumns="searchCloumns" :params="params" @closeUp="closeItem" @changeinput="changeinput" ref="searchProllItem"></searchProllItem>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'
  import searchProllItem from '../../../../components/searchTable/searchProllItem'

  export default {
    data() {
      return {
        selectItemType: [],
        selectCurrency: [],
        form: {},
        rowId: '',
        openItem: false,
        params: {
          _mt: 'paySalItem.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          data: '{}',
        },
        searchCloumns: [
          {
            title: this.$t('lang_payroll.paySalItem.paysiCN'),
            key: 'paysiCN',
            sortable: 'custom',
            width: 380,
          },
          {
            title: this.$t('lang_payroll.paySalItem.paysiEN'),
            key: 'paysiEN',
            sortable: 'custom',
            width: 379,
          },
        ],
      }
    },
    props: {
      id: Number,
      logType: String,
    },
    components: {
      searchProllItem,
    },
    mounted() {
      this.getSelect()
      this.getSelectCurrency()
    },
    methods: {
      setRowId(id) {
        const t = this
        t.rowId = id
        t.getdata(id)
      },
      getdata(rowId) {
        const t = this
        const params = {
          _mt: 'payEndSalitem.getById',
          id: rowId,
          funId: '1',
          logType: '根据id查询险种明细信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form = res.data.content[0]
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      pickData() {
        const t = this
        t.$refs.searchProllItem.getData(this.params)
        t.openItem = true
      },
      changeinput(name, id) {
        const t = this
        t.form.pleditmItemDis = name
        t.form.pleditmItem = id
      },
      clearItem() {
        const t = this
        t.form.pleditmItemDis = ''
        t.form.pleditmItem = ''
      },
      closeItem() {
        const t = this
        t.openItem = false
      },
      save() {
        const t = this
        const params = deepCopy(t.form)
        params._mt = 'payEndSalitem.addOrUpd'
        params.funId = '1'
        params.logType = '修改'
        params.id = t.rowId
        if (params.pleditmEdate !== '') {
          params.pleditmEdate = new Date(params.pleditmEdate).format('yyyy-MM-dd')
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(params).then((res) => {
              if (isSuccess(res, t)) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('getData', res.data.content[0])
                  t.close()
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'payroll_itemtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectItemType = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelectCurrency() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseCurrency.getSelectValue',
          data: '{}',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectCurrency = (res.data.content[0].value)
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
          })
        })
      },
      clear() {
        const t = this
        t.form = {}
        t.$refs.form.resetFields()
      },
      cancel() {
        this.close()
      },
      close() {
        this.rowId = ''
        this.$emit('hideMsg')
        this.clear()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd";
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
