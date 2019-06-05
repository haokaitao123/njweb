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
          <FormItem :label="$t('lang_baseManage.baseBankinfo.bankCode')" prop="bankCode">
            <Input v-model="formValidate.bankCode" :placeholder="$t('lang_baseManage.baseBankinfo.bankCodeDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseBankinfo.bankCityName')" prop="bankCityid">
            <span @dblclick="clearCityid">
              <Input v-model="bankCityName" icon="search" :readonly="true" :placeholder="$t('lang_baseManage.baseBankinfo.bankCityNameDis')"  @on-click="pickData" />
            </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseBankinfo.bankCname')" prop="bankCname">
            <Input v-model="formValidate.bankCname" :placeholder="$t('lang_baseManage.baseBankinfo.bankCnameDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseBankinfo.bankEname')" prop="bankEname">
            <Input v-model="formValidate.bankEname" :placeholder="$t('lang_baseManage.baseBankinfo.bankEnameDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseBankinfo.bankCadd')" prop="bankCadd">
            <Input v-model="formValidate.bankCadd" :placeholder="$t('lang_baseManage.baseBankinfo.bankCaddDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseBankinfo.bankEadd')" prop="bankEadd">
            <Input v-model="formValidate.bankEadd" :placeholder="$t('lang_baseManage.baseBankinfo.bankEaddDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseBankinfo.bankSwiftcode')" prop="bankSwiftcode">
            <Input v-model="formValidate.bankSwiftcode" :placeholder="$t('lang_baseManage.baseBankinfo.bankSwiftcodeDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_baseManage.baseBankinfo.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_baseManage.baseBankinfo.commentDis')"></Input>
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
          _mt: 'baseBankinfo.addOrUpd',
          funId: '1',
          bankCode: '',
          bankCityid: '',
          bankCname: '',
          bankEname: '',
          bankCadd: '',
          bankEadd: '',
          bankSwiftcode: '',
          comment: '',
        },
        openPick: false,
        bankCityName: '',
        params: {
          _mt: 'baseCity.getPage',
          sort: 'id',
          order: 'desc',
          rows: 20,
          page: '1',
          funId: '1',
          logType: this.$t('button.ser'),
          data: '{"cityType":"02city", "cityIsvalid" : "1"}',
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
          bankCode: [
            { required: true, message: this.$t('lang_baseManage.baseBankinfo.bankCodeDis'), trigger: 'blur' },
          ],
          bankCityid: [
            { required: true, message: this.$t('lang_baseManage.baseBankinfo.bankCityNameDis'), trigger: 'blur' },
          ],
          bankCname: [
            { required: true, message: this.$t('lang_baseManage.baseBankinfo.bankCnameDis'), trigger: 'blur' },
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
          _mt: 'baseBankinfo.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.bankCode = res.data.content[0].bankCode
            t.formValidate.bankCityid = res.data.content[0].bankCityid
            t.bankCityName = res.data.content[0].bankCityName
            t.formValidate.bankCname = res.data.content[0].bankCname
            t.formValidate.bankEname = res.data.content[0].bankEname
            t.formValidate.bankCadd = res.data.content[0].bankCadd
            t.formValidate.bankEadd = res.data.content[0].bankEadd
            t.formValidate.bankSwiftcode = res.data.content[0].bankSwiftcode
            t.formValidate.comment = res.data.content[0].comment
          }
        }).catch(() => {
          t.$Message.error(this.$t('reminder.errormessage'))
        })
      },
      updateimg() {
        this.updateImg = true
      },
      closeImg() {
        const t = this
        t.updateImg = false
      },
      render1() {
        this.$Modal.confirm({
          ref: 'imgEdit',
          onOk: () => {
            const formData = new FormData(document.getElementById('fileinput1'))
            uploadimage(formData).then((res) => {
              alert(res)
            }).catch((res) => {
              t.$Message.error(this.$t('reminder.errormessage'))
            })
          },
          attrs: {
            id: 'foo',
          },
          render: (h) => {
            return h(imgEdit, {
              props: {
                value: this.value,
              },
              on: {
                change: (val) => {
                  this.value = val
                },
              },

            })
          },

        })
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
                  t.$Message.success(this.$t('reminder.addsuccess'))
                  t.$refs.formValidate.resetFields()
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Message.success(this.$t('reminder.updsuccess'))
                  t.$emit('update', res.data.content[0])
                }
              }
            }).catch(() => {
              t.$Message.error(this.$t('reminder.errormessage'))
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
        t.bankCityName = name
        t.formValidate.bankCityid = id
      },
      pickData() {
        const t = this
        t.$refs.searchCity.getData(this.params, '02city\',\'03county')
        t.openPick = true
      },
      clearCityid() {
        const t = this
        t.bankCityName = ''
        t.formValidate.bankCityid = ''
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
