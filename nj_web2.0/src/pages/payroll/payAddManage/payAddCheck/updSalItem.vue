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
        <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="110">
          <i-col span="11">
            <FormItem :label="$t('lang_payroll.payAddSalItem.pladitmType')" prop="pladitmType">
              <Select v-model="form.pladitmType" disabled :placeholder="$t('lang_payroll.payAddSalItem.pladitmTypeDis')" >
                <Option :value="item.paramCode" v-for="(item,index) in selectItemType" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_payroll.payAddSalItem.pladitmItem')" prop="pladitmItem">
            <span>
              <Input v-model="form.pladitmItemDis" disabled icon="search" readonly :placeholder="$t('lang_payroll.payAddSalItem.pladitmItemDis')" style="width: 100%"/>
            </span>
            </FormItem>
          </i-col>
          <i-col span="11">
           <FormItem :label="$t('lang_payroll.payAddSalItem.pladitmCurrency')" prop="pladitmCurrency">
             <Select v-model="form.pladitmCurrency"  :placeholder="$t('lang_payroll.payAddSalItem.pladitmCurrencyDis')" >
               <Option :value="item.id" v-for="(item,index) in selectCurrency" :key="index">{{item.currCurrency}}</Option>
             </Select>
           </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_payroll.payAddSalItem.pladitmAmount')" prop="pladitmAmount">
              <Input v-model="form.pladitmAmount"  :placeholder="$t('lang_payroll.payAddSalItem.pladitmAmountDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_payroll.payAddSalItem.pladitmSdate')" prop="pladitmSdate">
              <Input v-model="form.pladitmSdate" disabled :placeholder="$t('lang_payroll.payAddSalItem.pladitmSdateDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1" >
            <FormItem :label="$t('lang_payroll.payAddSalItem.pladitmEdate')" prop="pladitmEdate">
                <DatePicker type="date" :placeholder="$t('lang_payroll.payAddSalItem.pladitmEdateDis')" style="width: 100%" :editable="false" v-model="form.pladitmEdate" ></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_payroll.payAddSalItem.pladitmComment')" prop="pladitmComment">
              <Input v-model="form.pladitmComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_payroll.payAddSalItem.pladitmCommentDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <row type="flex" justify="end">
              <FormItem label="" prop="comment">
                <Button type="ghost" @click="close" style="margin-left: 8px">{{$t('button.cal')}}</Button>
                <Button type="primary" @click="save">{{$t('button.sav')}}</Button>
              </FormItem>
            </row>
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
        ruleValidate: {
          pladitmAmount: [
            { required: true, message: this.$t('lang_payroll.payAddSalItem.pladitmAmountDis'), trigger: 'blur' },
          ],
        },
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
          _mt: 'payAddSalitem.getById',
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
        t.form.pladitmItemDis = name
        t.form.pladitmItem = id
      },
      clearItem() {
        const t = this
        t.form.pladitmItemDis = ''
        t.form.pladitmItem = ''
      },
      closeItem() {
        const t = this
        t.openItem = false
      },
      save() {
        const t = this
        const params = deepCopy(t.form)
        params._mt = 'payAddSalitem.addOrUpd'
        params.funId = '1'
        params.logType = '修改'
        params.id = t.rowId
        if (params.pladitmEdate !== '') {
          params.pladitmEdate = new Date(params.pladitmEdate).format('yyyy-MM-dd')
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
