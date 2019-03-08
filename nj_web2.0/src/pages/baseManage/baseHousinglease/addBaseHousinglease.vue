<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_baseManage.baseHousinglease.leaseYear')" prop="leaseYear">
            <Select  clearable v-model="formValidate.leaseYear"   placeholder="请输入扣除年度" @on-change ="getPeriod">
              <Option :value="item.fyYear" v-for="(item,index) in selectFyear" :key="index">{{item.fyYear}}</Option>
            </Select>
          </FormItem>
          </Col>
        <Col span="11" offset="1" >
        <FormItem :label="$t('lang_baseManage.baseHousinglease.leaseAmout')" prop="leaseAmout">
          <Select  clearable v-model="formValidate.leaseAmout"  placeholder="请输入扣除金额" @on-change ="getPeriod1">
            <Option :value="item.fyMoney" v-for="(item,index) in selectMoney" :key="index">{{item.fyMoney}}</Option>
          </Select>
          <!--<Input v-model="formValidate.leaseAmout" :placeholder="$t('lang_baseManage.baseHousinglease.p_leaseAmout')"></Input>-->
        </FormItem>
        </Col>
        </Row>
        <Row>
          <Col span="20">
          <FormItem :label="$t('lang_baseManage.baseHousinglease.leaseCitysDis')" prop="leaseCitys">
            <Input v-model="formValidate.leaseCitysDis" type="textarea" :placeholder="$t('lang_baseManage.baseHousinglease.p_leaseCitysDis')"></Input>
          </FormItem>
          </Col>
          <Col span="3" style="text-align: right">
            <Button type="primary" @click="selectCity">选择城市</Button>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_baseManage.baseHousinglease.leaseSdate')" prop="leaseSdate">
            <DatePicker type="date" :placeholder="$t('lang_baseManage.baseHousinglease.p_leaseSdate')" :editable="false" v-model="formValidate.leaseSdate" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_baseManage.baseHousinglease.leaseEdate')" prop="leaseEdate">
            <DatePicker type="date" :placeholder="$t('lang_baseManage.baseHousinglease.p_leaseEdate')" :editable="false" v-model="formValidate.leaseEdate" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_baseManage.baseHousinglease.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_baseManage.baseHousinglease.p_comment')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
              <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
    <transition name="fade">
      <searchCitySel v-show="openPick"  @closeUp="close" @changeinput="changeinput" ref="searchCitySel"></searchCitySel>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchCitySel from '../../../components/searchTable/searchCitySel.vue'
//  import searchCity from '../../../components/searchTable/searchCity'

  export default {
    data() {
      return {
        updateImg: false,
        selectFyear: [],
        leaseCitysDis: '',
        formValidate: {
          _mt: 'baseHousinglease.addOrUpd',
          funId: '1',
          leaseYear: '',
          leaseAmout: '',
          leaseSdate: '',
          leaseCitys: '',
          leaseEdate: '',
          comment: '',
        },
        selectMoney: [
          { fyMoney: '1500' },
          { fyMoney: '1100' },
          { fyMoney: '800' },
        ],
        openPick: false,
//        levdfCityName: '',
//        params: {
//          _mt: 'baseCity.getPage',
//          sort: 'id',
//          order: 'desc',
//          rows: '10',
//          page: '1',
//          funId: '1',
//          logType: this.$t('button.ser'),
//          data: '{"cityIsvalid" : "1"}',
//        },
//        searchCloumns: [
//          {
//            title: this.$t('lang_baseManage.baseCity.cityName'),
//            key: 'cityName',
//            sortable: 'custom',
//            width: 380,
//          },
//          {
//            title: this.$t('lang_baseManage.baseCity.cityTypeName'),
//            key: 'cityTypeName',
//            sortable: 'custom',
//            width: 379,
//          },
//        ],
        ruleValidate: {
          leaseYear: [
            { required: true, message: this.$t('lang_baseManage.baseHousinglease.r_leaseYear'), trigger: 'blur' },
          ],
          leaseAmout: [
            { required: true, message: this.$t('lang_baseManage.baseHousinglease.r_leaseAmout'), trigger: 'blur' },
          ],
          leaseCitysDis: [
            { required: true, message: this.$t('lang_baseManage.baseHousinglease.r_leaseCitysDis'), trigger: 'blur' },
          ],
          leaseSdate: [
            { required: true, type: 'date', message: this.$t('lang_baseManage.baseHousinglease.r_leaseSdate'), trigger: 'change' },
          ],
        },
      }
    },
    components: {
      searchCitySel,
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    updated() {

    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseLevadfamount.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.leaseYear = res.data.content[0].leaseYear
            t.leaseCitysDis = res.data.content[0].leaseCitysDis
            t.formValidate.leaseCitys = res.data.content[0].leaseCitys
            t.formValidate.leaseAmout = res.data.content[0].leaseAmout
            t.formValidate.leaseSdate = res.data.content[0].leaseSdate
            t.formValidate.leaseEdate = res.data.content[0].leaseEdate
            t.formValidate.comment = res.data.content[0].comment
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      updateimg() {
        this.updateImg = true
      },
      closeImg() {
        const t = this
        t.updateImg = false
      },
      selectCity() {
        this.openPick = true
        this.$refs.searchCitySel.getData(1)
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        console.log(data)
        data.logType = t.logType
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        if (data.leaseSdate !== undefined) {
          data.leaseSdate = new Date(data.leaseSdate).format('yyyy-MM-dd')
        }
        if (data.leaseEdate !== undefined) {
          data.leaseEdate = data.leaseEdate === '' ? '' : new Date(data.leaseEdate).format('yyyy-MM-dd')
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.formValidate.resetFields()
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
              }
            }).catch(() => {
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      close() {
        const t = this
        t.openPick = false
      },
      getPeriod1(value) {
        this.formValidate.leaseAmout = value
      },
      getPeriod() {

      },
      changeinput(id, name) {
        const t = this
        console.log(name)
        console.log(id)
        t.formValidate.leaseCitysDis = name.join(',')
        t.formValidate.leaseCitys = id.join(',')
//        t.formValidate.levdfCityid = id
      },
//      pickData() {
//        const t = this
//        t.$refs.searchCity.getData(this.params, '02city\',\'03county')
//        t.openPick = true
//      },
//      clearCityid() {
//        const t = this
//        t.levdfCityName = ''
//        t.formValidate.levdfCityid = ''
//      },
      handleReset() {
        this.$emit('closeUp')
        this.$refs.formValidate.resetFields()
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platFiscalyear.getSelectValue',
          data: '{}',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectFyear = (res.data.content[0].value)
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
