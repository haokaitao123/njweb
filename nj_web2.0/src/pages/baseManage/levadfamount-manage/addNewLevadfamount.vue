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
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseLevadfamount.levdfCityName')" prop="levdfCityid">
            <span @dblclick="clearCityid">
              <Input v-model="levdfCityName" icon="search" :readonly="true" :placeholder="$t('lang_baseManage.baseLevadfamount.selCity')" @on-click="pickData" />
            </span>
          </FormItem>
          </Col>
        <Col span="10" offset="1">
        <FormItem :label="$t('lang_baseManage.baseLevadfamount.levdfDfamount')" prop="levdfDfamount">
          <Input v-model="formValidate.levdfDfamount" :placeholder="$t('lang_baseManage.baseLevadfamount.levdfDfamountDis')"></Input>
        </FormItem>
        </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseLevadfamount.levdfSdate')" prop="levdfSdate">
            <DatePicker type="date" :placeholder="$t('lang_baseManage.baseLevadfamount.levdfSdateDis')" :editable="false" v-model="formValidate.levdfSdate" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseLevadfamount.levdfEdate')" prop="levdfEdate">
            <DatePicker type="date" :placeholder="$t('lang_baseManage.baseLevadfamount.levdfEdateDis')" :editable="false" v-model="formValidate.levdfEdate" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_baseManage.baseLevadfamount.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_baseManage.baseLevadfamount.commentDis')"></Input>
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
      <searchCity v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="close" @changeinput="changeinput" ref="searchCity"></searchCity>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchCity from '../../../components/searchTable/searchCity'

  export default {
    data() {
      return {
        updateImg: false,
        formValidate: {
          _mt: 'baseLevadfamount.addOrUpd',
          funId: '1',
          levdfCityid: '',
          levdfDfamount: '',
          levdfSdate: '',
          levdfEdate: '',
          comment: '',
        },
        openPick: false,
        levdfCityName: '',
        params: {
          _mt: 'baseCity.getPage',
          sort: 'id',
          order: 'desc',
          rows: '10',
          page: '1',
          funId: '1',
          logType: this.$t('button.ser'),
          data: '{"cityIsvalid" : "1"}',
        },
        searchCloumns: [
          {
            title: this.$t('lang_baseManage.baseCity.cityName'),
            key: 'cityName',
            sortable: 'custom',
            width: 380,
          },
          {
            title: this.$t('lang_baseManage.baseCity.cityTypeName'),
            key: 'cityTypeName',
            sortable: 'custom',
            width: 379,
          },
        ],
        ruleValidate: {
          levdfCityid: [
            { required: true, message: this.$t('lang_baseManage.baseLevadfamount.selCity'), trigger: 'blur' },
          ],
          levdfDfamount: [
            { required: true, message: this.$t('lang_baseManage.baseLevadfamount.levdfDfamountDis'), trigger: 'blur' },
          ],
          levdfSdate: [
            { required: true, type: 'date', message: this.$t('lang_baseManage.baseLevadfamount.levdfSdateDis'), trigger: 'change' },
          ],
        },
      }
    },
    components: {
      searchCity,
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
            t.formValidate.levdfCityid = res.data.content[0].levdfCityid
            t.levdfCityName = res.data.content[0].levdfCityName
            t.formValidate.levdfDfamount = res.data.content[0].levdfDfamount
            t.formValidate.levdfSdate = res.data.content[0].levdfSdate
            t.formValidate.levdfEdate = res.data.content[0].levdfEdate
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
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        if (data.levdfSdate !== undefined) {
          data.levdfSdate = new Date(data.levdfSdate).format('yyyy-MM-dd')
        }
        if (data.levdfEdate !== undefined) {
          data.levdfEdate = data.levdfEdate === '' ? '' : new Date(data.levdfEdate).format('yyyy-MM-dd')
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
      changeinput(name, id) {
        const t = this
        t.levdfCityName = name
        t.formValidate.levdfCityid = id
      },
      pickData() {
        const t = this
        t.$refs.searchCity.getData(this.params, '02city\',\'03county')
        t.openPick = true
      },
      clearCityid() {
        const t = this
        t.levdfCityName = ''
        t.formValidate.levdfCityid = ''
      },
      handleReset() {
        this.$emit('closeUp')
        this.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
