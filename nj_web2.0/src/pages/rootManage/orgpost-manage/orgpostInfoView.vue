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
      <div class="option-main">
        <Row style="max-height: 420px;overflow-y: auto;">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <i-col span="11">
            <FormItem :label="$t('lang_organization.orgpost.postCode')" prop="postCode">
              <Input v-model="formValidate.postCode" :placeholder="$t('lang_organization.orgpost.postCodeInp')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_organization.orgpost.postFnameCnDis')" prop="postFnameCnDis">
              <Input v-model="formValidate.postFnameCnDis" :placeholder="$t('lang_organization.orgpost.postFnameCnDisInp')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_organization.orgpost.postFnameEnDis')" prop="postFnameEnDis">
              <Input v-model="formValidate.postFnameEnDis" :placeholder="$t('lang_organization.orgpost.postFnameEnDisInp')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_organization.orgpost.postSnameCnDis')" prop="postSnameCnDis">
              <Input v-model="formValidate.postSnameCnDis" :placeholder="$t('lang_organization.orgpost.postSnameCnDisInp')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_organization.orgpost.postSnameEnDis')" prop="postSnameEnDis">
              <Input v-model="formValidate.postSnameEnDis" :placeholder="$t('lang_organization.orgpost.postSnameEnDisInp')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1" >
            <FormItem :label="$t('lang_organization.orgpost.postUnitName')" prop="postUnit">
              <span @dblclick="clearPid">
                <Input v-model="postUnitName" icon="search" :readonly="true" :placeholder="$t('lang_organization.orgpost.postUnitNameInp')"  @on-click="pickData" />
              </span>
            </FormItem>
            </i-col>
            <i-col span="11" >
              <FormItem :label="$t('lang_organization.orgpost.postDfcostcenterName')" prop="postDfcostcenterName">
                <span @dblclick="clearCostcenter">
                  <Input v-model="postDfcostcenterName" icon="search" :readonly="true" :placeholder="$t('lang_organization.orgpost.postDfcostcenterNameInp')"  @on-click="pickData3" />
                </span>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1" >
              <FormItem :label="$t('lang_organization.orgpost.postDfpslevel')" prop="postDfpslevel">
                <Select v-model="formValidate.postDfpslevel" :placeholder="$t('lang_organization.orgpost.postDfpslevelInp')">
                  <Option :value="item.paramCode" v-for="(item,index) in selectDfpslevel" :key="index">{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11" >
              <FormItem :label="$t('lang_organization.orgpost.postDfsallevel')" prop="postDfsallevel">
                <Select v-model="formValidate.postDfsallevel" :placeholder="$t('lang_organization.orgpost.postDfsallevelInp')">
                  <Option :value="item.paramCode" v-for="(item,index) in selectDfsallevel" :key="index">{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem :label="$t('lang_organization.orgpost.postDftrvlevel')" prop="postDftrvlevel">
                <Select v-model="formValidate.postDftrvlevel" :placeholder="$t('lang_organization.orgpost.postDftrvlevelInp')">
                  <Option :value="item.paramCode" v-for="(item,index) in selectDftrvlevel" :key="index">{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11" >
              <FormItem :label="$t('lang_organization.orgpost.validdate')" prop="validdate">
                <DatePicker type="date" :placeholder="$t('lang_organization.orgpost.validdateInp')" :editable="false" v-model="formValidate.validdate" style="width: 100%"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem :label="$t('lang_organization.orgpost.invdate')" prop="invdate">
                <DatePicker type="date" :placeholder="$t('lang_organization.orgpost.invdateInp')" :editable="false" v-model="formValidate.invdate" style="width: 100%"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="23">
              <FormItem :label="$t('lang_organization.orgpost.invreason')" prop="invreason">
                <Input v-model="formValidate.invreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_organization.orgpost.invreasonInp')"></Input>
              </FormItem>
            </i-col>
            <i-col span="23">
              <FormItem :label="$t('lang_organization.orgpost.comment')" prop="comment">
                <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_organization.orgpost.commentInp')"></Input>
              </FormItem>
            </i-col>
          </Form>
        </Row>
        <Button type="ghost" @click="handleReset" class="btn1">{{$t('button.cal')}}</Button>
        <Button type="primary" @click="handleSubmit" class="btn">{{$t('button.sav')}}</Button>
      </div>
    </div>
    <transition name="fade">
      <searchOrgframe v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="close" @changeinput="changeinput" ref="searchOrgframe"></searchOrgframe>
    </transition>
    <transition name="fade">
      <searchOrgcostcenter v-show="openPick3" :searchCloumns="searchCloumns3" :params="params3" @closeUp="close3" @changeinput="changeinput3" ref="searchOrgcostcenter"></searchOrgcostcenter>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchOrgframe from '../../../components/searchTable/searchOrgframe'
  import searchOrgcostcenter from '../../../components/searchTable/searchOrgcostcenter'

  export default {
    data() {
      return {
        value: '',
        selectDfpslevel: [],
        selectDfsallevel: [],
        selectDftrvlevel: [],
        formValidate: {
          _mt: 'orgPost.addOrUpd',
          postCode: '',
          postDfpslevel: '',
          postDfsallevel: '',
          postDftrvlevel: '',
          postUnit: '',
          postDfcostcenter: '',
          postSnameCnDis: '',
          postSnameEnDis: '',
          postFnameCnDis: '',
          postFnameEnDis: '',
          validdate: '',
          invdate: '',
          invreason: '',
          comment: '',
          funId: '1',
          logType: '',
        },
        openPick: false,
        openPick3: false,
        postUnitName: '',
        postDfcostcenterName: '',
        params: {
          _mt: 'orgUnits.getByOrgFramePageList',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: '组织架构查询',
          data: '{}',
          unitPid: 0,
        },
        searchCloumns: [
          {
            title: this.$t('lang_organization.orgframe.unitCode'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_organization.orgframe.compCOrEName'),
            key: 'unitsName',
          },
          {
            title: this.$t('lang_organization.orgframe.unitTypeName'),
            key: 'unitTypeName',
          },
//          {
//            title: '组织类型名称',
//            key: 'unitDfcostcenterName',
//            sortable: 'custom',
//          },
//          {
//            title: '组织类型',
//            key: 'unitDfcostcenter',
//            sortable: 'custom',
//          },
        ],
        params3: {
          _mt: 'orgCostcenter.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: '成本中心查询',
          data: '{}',
        },
        searchCloumns3: [
          {
            title: this.$t('lang_organization.orgcostcenter.costCode'),
            key: 'costCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_organization.orgcostcenter.cname'),
            key: 'cname',
          },
          {
            title: this.$t('lang_organization.orgcostcenter.ename'),
            key: 'ename',
          },
        ],
        ruleValidate: {
          postCode: [
            { required: true, message: this.$t('lang_organization.orgpost.postCodeInp'), trigger: 'blur' },
          ],
          postFnameCnDis: [
            { required: true, message: this.$t('lang_organization.orgpost.postFnameCnDisInp'), trigger: 'blur' },
          ],
          postFnameEnDis: [
            { required: true, message: this.$t('lang_organization.orgpost.postFnameEnDisInp'), trigger: 'blur' },
          ],
          postSnameCnDis: [
            { required: true, message: this.$t('lang_organization.orgpost.postSnameCnDisInp'), trigger: 'blur' },
          ],
          postSnameEnDis: [
            { required: true, message: this.$t('lang_organization.orgpost.postSnameEnDisInp'), trigger: 'blur' },
          ],
          postUnit: [
            { required: true, message: this.$t('lang_organization.orgpost.postUnitNameInp'), trigger: 'blur' },
          ],
          validdate: [
            { required: true, type: 'date', message: this.$t('lang_organization.orgpost.validdateInp'), trigger: 'change' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    components: {
      searchOrgframe,
      searchOrgcostcenter,
    },
    updated() {

    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'orgPost.getById',
          id: id,
          funId: '1',
          logType: 'Id查询',
        }).then((res) => {
          if (isSuccess(res, t)) {
            console.log(res.data.content[0])
            t.formValidate.postCode = res.data.content[0].postCode
            t.formValidate.postFnameCnDis = res.data.content[0].postFnameCnDis
            t.formValidate.postFnameEnDis = res.data.content[0].postFnameEnDis
            t.formValidate.postSnameCnDis = res.data.content[0].postSnameCnDis
            t.formValidate.postSnameEnDis = res.data.content[0].postSnameEnDis
            t.formValidate.validdate = res.data.content[0].validdate
            t.formValidate.invdate = res.data.content[0].invdate
            t.formValidate.invreason = res.data.content[0].invreason
            t.formValidate.comment = res.data.content[0].comment
            t.formValidate.postUnit = res.data.content[0].postUnit
            t.formValidate.postDfpslevel = res.data.content[0].postDfpslevel
            t.formValidate.postDftrvlevel = res.data.content[0].postDftrvlevel
            t.formValidate.postDfsallevel = res.data.content[0].postDfsallevel
            t.postUnitName = res.data.content[0].postUnitName
            t.formValidate.unitDfhirecity = res.data.content[0].unitDfhirecity
            t.unitDfhirecityName = res.data.content[0].unitDfhirecityName
            t.formValidate.unitDfworkcity = res.data.content[0].unitDfworkcity
            t.unitDfworkcityName = res.data.content[0].unitDfworkcityName
            t.formValidate.postDfcostcenter = res.data.content[0].postDfcostcenter
            t.postDfcostcenterName = res.data.content[0].postDfcostcenterName
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
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'postlevel,salarylevel,travellevel',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectDfpslevel = res.data.content[0].value[0].paramList
            t.selectDfsallevel = res.data.content[0].value[1].paramList
            t.selectDftrvlevel = res.data.content[0].value[2].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      render1() {
        this.$Modal.confirm({
          ref: 'imgEdit',
          onOk: () => {
            const formData = new FormData(document.getElementById('fileinput1'))
            uploadimage(formData).then((res) => {
              alert(res)
            }).catch((res) => {
              alert(res)
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
        if (data.validdate !== undefined) {
          data.validdate = new Date(data.validdate).format('yyyy-MM-dd')
        }
        if (data.invdate !== undefined) {
          data.invdate = data.invdate === '' ? '' : new Date(data.invdate).format('yyyy-MM-dd')
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
      close2() {
        const t = this
        t.openPick2 = false
      },
      close3() {
        const t = this
        t.openPick3 = false
      },
      changeinput(name, id, costname, costid) {
        const t = this
        t.postUnitName = name
        t.formValidate.postUnit = id
        t.postDfcostcenterName = costname
        t.formValidate.postDfcostcenter = costid
      },
      changeinput3(name, id) {
        const t = this
        t.postDfcostcenterName = name
        t.formValidate.postDfcostcenter = id
      },
      pickData() {
        const t = this
        t.$refs.searchOrgframe.getData(this.params)
        t.openPick = true
      },
      pickData3() {
        const t = this
        t.$refs.searchOrgcostcenter.getData(this.params3)
        t.openPick3 = true
      },
      clearPid() {
        const t = this
        t.postUnitName = ''
        t.formValidate.postUnit = ''
      },
      clearCostcenter() {
        const t = this
        t.postDfcostcenterName = ''
        t.formValidate.postDfcostcenter = ''
      },
      handleReset() {
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
      },
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  .option-main{
    position: relative;
    height: 500px;
    .btn{
      position: absolute;
      bottom: 20px;
      right: 40px;
    }
    .btn1{
      position: absolute;
      bottom: 20px;
      right: 100px;
    }
  }
</style>
