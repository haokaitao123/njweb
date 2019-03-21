<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="option-main">
        <Row style="max-height: 420px;overflow-y: auto;">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <i-col span="11"  >
              <FormItem :label="$t('lang_organization.orgframe.unitCode')" prop="unitCode" >
                <Input v-model="formValidate.unitCode" :readonly="forbidden" :placeholder="$t('lang_organization.orgframe.unitCodeInp')"></Input>
              </FormItem>
            </i-col>
            <i-col span="11"  >
              <FormItem :label="$t('lang_organization.orgframe.unitTypeName')" prop="unitType">
                <Select v-model="formValidate.unitType" v-bind:disabled="distype" :placeholder="$t('lang_organization.orgframe.unitTypeNameInp')">
                  <Option :value="item.paramCode" v-for="(item,index) in selectUnitType" :key="index">{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11"  >
              <FormItem :label="$t('lang_organization.orgframe.compFnameCnDis')" prop="compFnameCnDis">
                <Input v-model="formValidate.compFnameCnDis" :placeholder="$t('lang_organization.orgframe.compFnameCnDisInp')"></Input>
              </FormItem>
            </i-col>
            <i-col span="11"  >
              <FormItem :label="$t('lang_organization.orgframe.compFnameEnDis')" prop="compFnameEnDis">
                <Input v-model="formValidate.compFnameEnDis" :placeholder="$t('lang_organization.orgframe.compFnameEnDisInp')"></Input>
              </FormItem>
            </i-col>
            <i-col span="11"  >
              <FormItem :label="$t('lang_organization.orgframe.compSnameCnDis')" prop="compSnameCnDis">
                <Input v-model="formValidate.compSnameCnDis" :placeholder="$t('lang_organization.orgframe.compSnameCnDisInp')"></Input>
              </FormItem>
            </i-col>
            <i-col span="11"  >
              <FormItem :label="$t('lang_organization.orgframe.compSnameEnDis')" prop="compSnameEnDis">
                <Input v-model="formValidate.compSnameEnDis" :placeholder="$t('lang_organization.orgframe.compSnameEnDisInp')"></Input>
              </FormItem>
            </i-col>
            <i-col span="11"  >
              <FormItem :label="$t('lang_organization.orgframe.unitPname')" prop="unitPid" >
                <span @dblclick="clearPid">
                  <Input v-model="unitPname" icon="search" :readonly="true" :placeholder="$t('lang_organization.orgframe.unitPnameInp')"  @on-click="pickData2" />
                </span>
              </FormItem>
            </i-col>
            <i-col span="11"  >
              <FormItem :label="$t('lang_organization.orgframe.unitDfcostcenter')" prop="unitDfcostcenter">
                <span @dblclick="clearCostcenter">
                  <Input v-model="unitDfcostcenterName" icon="search" :readonly="true" :placeholder="$t('lang_organization.orgframe.unitDfcostcenterInp')"  @on-click="pickData3" />
                </span>
              </FormItem>
            </i-col>
            <i-col span="11"  >
              <FormItem :label="$t('lang_organization.orgframe.unitDfhirecity')" prop="unitDfhirecity">
                <span @dblclick="clearDfhire">
                  <Input v-model="unitDfhirecityName" icon="search" :readonly="true" :placeholder="$t('lang_organization.orgframe.unitDfhirecityInp')"  @on-click="pickData" />
                </span>
            </FormItem>
            </i-col>
            <i-col span="11"  >
              <FormItem :label="$t('lang_organization.orgframe.unitDfworkcity')" prop="unitDfworkcity">
                <span @dblclick="clearDfwork">
                  <Input v-model="unitDfworkcityName" icon="search" :readonly="true" :placeholder="$t('lang_organization.orgframe.unitDfworkcityInp')"  @on-click="pickData1" />
                </span>
              </FormItem>
            </i-col>
            <i-col span="11"  >
              <FormItem :label="$t('lang_organization.orgframe.validdate')" prop="validdate">
                <DatePicker type="date" :placeholder="$t('lang_organization.orgframe.validdateInp')" :editable="false" v-model="formValidate.validdate" style="width: 100%"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11"  >
              <FormItem :label="$t('lang_organization.orgframe.invdate')" prop="invdate">
                <DatePicker type="date" :placeholder="$t('lang_organization.orgframe.invdateInp')" :editable="false" v-model="formValidate.invdate" style="width: 100%"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="22"  >
              <FormItem :label="$t('lang_organization.orgframe.invreason')" prop="invreason">
                <Input v-model="formValidate.invreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_organization.orgframe.invreasonInp')"></Input>
              </FormItem>
            </i-col>
            <i-col span="22"  >
              <FormItem :label="$t('lang_organization.orgframe.unitAgentno')" prop="unitAgentno">
                <Input v-model="formValidate.unitAgentno" :placeholder="$t('lang_organization.orgframe.unitAgentnoInp')"></Input>
              </FormItem>
            </i-col>
            <i-col span="22"  >
              <FormItem :label="$t('lang_organization.orgframe.comment')" prop="comment">
                <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_organization.orgframe.commentInp')"></Input>
              </FormItem>
            </i-col>
        </Form>
        </Row>
      </div>
      <Button type="ghost" @click="handleReset" class="btn1">{{$t('button.cal')}}</Button>
      <Button type="primary" @click="handleSubmit" class="btn">{{$t('button.sav')}}</Button>
    </div>
    <transition name="fade">
      <searchCity v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="close" @changeinput="changeinput" ref="searchCity"></searchCity>
    </transition>
    <transition name="fade">
      <searchOrgframe v-show="openPick2" :searchCloumns="searchCloumns2" :params="params2" @closeUp="close2" @changeinput="changeinput2" ref="searchOrgframe"></searchOrgframe>
    </transition>
    <transition name="fade">
      <searchOrgcostcenter v-show="openPick3" :searchCloumns="searchCloumns3" :params="params3" @closeUp="close3" @changeinput="changeinput3" ref="searchOrgcostcenter"></searchOrgcostcenter>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchCity from '../../../components/searchTable/searchCity'
  import searchOrgframe from '../../../components/searchTable/searchOrgframe'
  import searchOrgcostcenter from '../../../components/searchTable/searchOrgcostcenter'

  export default {
    data() {
      return {
        type: '',
        distype: false,
        forbidden: null,
        popup: '',
        value: '',
        selectUnitType: [],
        formValidate: {
          _mt: 'orgUnits.addOrModifyOrgUnits',
          unitCode: '',
          unitType: '',
          unitPid: '',
          unitDfcostcenter: '',
          unitDfhirecity: '',
          unitDfworkcity: '',
          validdate: '',
          invdate: '',
          invreason: '',
          comment: '',
          funId: '1',
          logType: '',
        },
        openPick: false,
        openPick2: false,
        openPick3: false,
        unitPname: '',
        unitDfcostcenterName: '',
        unitDfhirecityName: '',
        unitDfworkcityName: '',
        params: {
          _mt: 'baseCity.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
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
        params2: {
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
        searchCloumns2: [
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
            key: 'costName',
          },
        ],
        ruleValidate: {
          unitCode: [
            { required: true, message: this.$t('lang_organization.orgframe.unitCodeInp'), trigger: 'blur' },
          ],
          compFnameCnDis: [
            { required: true, message: this.$t('lang_organization.orgframe.compFnameCnDisInp'), trigger: 'blur' },
          ],
          compFnameEnDis: [
            { required: true, message: this.$t('lang_organization.orgframe.compFnameEnDisInp'), trigger: 'blur' },
          ],
          compSnameCnDis: [
            { required: true, message: this.$t('lang_organization.orgframe.compSnameCnDisInp'), trigger: 'blur' },
          ],
          compSnameEnDis: [
            { required: true, message: this.$t('lang_organization.orgframe.compSnameEnDisInp'), trigger: 'blur' },
          ],
          unitAgentno: [
            { required: true, message: this.$t('lang_organization.orgframe.unitAgentnoInp'), trigger: 'blur' },
          ],
          unitType: [
            { required: true, message: this.$t('lang_organization.orgframe.unitTypeNameInp'), trigger: 'blur' },
          ],
          unitPid: [
            { required: true, message: this.$t('lang_organization.orgframe.unitPnameInp'), trigger: 'blur' },
          ],
          validdate: [
            { required: true, type: 'date', message: this.$t('lang_organization.orgframe.validdateInp'), trigger: 'change' },
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
      searchCity,
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
          _mt: 'orgUnits.selectById',
          id: id,
          funId: '1',
          logType: 'Id查询',
        }).then((res) => {
          if (isSuccess(res, t)) {
            console.log(res.data.content[0])
            t.formValidate.unitCode = res.data.content[0].unitCode
            t.formValidate.compFnameCnDis = res.data.content[0].compFnameCnDis
            t.formValidate.compFnameEnDis = res.data.content[0].compFnameEnDis
            t.formValidate.compSnameCnDis = res.data.content[0].compSnameCnDis
            t.formValidate.compSnameEnDis = res.data.content[0].compSnameEnDis
            t.formValidate.unitAgentno = res.data.content[0].compSnameEnDis
            t.formValidate.validdate = res.data.content[0].validdate
            t.formValidate.invdate = res.data.content[0].invdate
            t.formValidate.invreason = res.data.content[0].invreason
            t.formValidate.comment = res.data.content[0].comment
            t.formValidate.unitPid = res.data.content[0].unitPid
            t.formValidate.unitType = res.data.content[0].unitType
            t.unitPname = res.data.content[0].unitPname
            t.formValidate.unitDfhirecity = res.data.content[0].unitDfhirecity
            t.unitDfhirecityName = res.data.content[0].unitDfhirecityName
            t.formValidate.unitDfworkcity = res.data.content[0].unitDfworkcity
            t.unitDfworkcityName = res.data.content[0].unitDfworkcityName
            t.formValidate.unitDfcostcenter = res.data.content[0].unitDfcostcenter
            t.unitDfcostcenterName = res.data.content[0].unitDfcostcenterName
            t.type = res.data.content[0].unitType
            if (id === res.data.content[0].companyId) {
              t.forbidden = 'readonly'
              t.distype = true
            } else {
              t.forbidden = null
              t.distype = false
            }
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
          typeCode: 'orgunittype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectUnitType = res.data.content[0].value[0].paramList
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
        if (t.type === '02dept' && data.unitType === '01company') {
          t.$Modal.success({
            title: this.$t('reminder.err'),
            content: this.$t('lang_organization.orgframe.reminderErr'),
          })
          return
        }
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
      changeinput(name, id) {
        const t = this
        if (t.popup === '0') {
          t.unitDfhirecityName = name
          t.formValidate.unitDfhirecity = id
        } else if (t.popup === '1') {
          t.unitDfworkcityName = name
          t.formValidate.unitDfworkcity = id
        }
      },
      changeinput2(name, id, centerName, center, type) {
        const t = this
       // t.formValidate.unitType = type
        t.unitPname = name
        t.formValidate.unitPid = id
        t.formValidate.unitDfcostcenter = center
        t.unitDfcostcenterName = centerName
        t.type = type
      },
      changeinput3(name, id) {
        const t = this
        t.unitDfcostcenterName = name
        t.formValidate.unitDfcostcenter = id
      },
      pickData() {
        const t = this
        t.popup = '0'
        t.$refs.searchCity.getData(this.params, '02city\',\'03county')
        t.openPick = true
      },
      pickData1() {
        const t = this
        t.popup = '1'
        t.$refs.searchCity.getData(this.params)
        t.openPick = true
      },
      pickData2() {
        if (this.forbidden === null) {
          const t = this
          t.$refs.searchOrgframe.getData(this.params2)
          t.openPick2 = true
        }
      },
      pickData3() {
        const t = this
        t.$refs.searchOrgcostcenter.getData(this.params3)
        t.openPick3 = true
      },
      clearPid() {
        const t = this
        t.unitPname = ''
        t.formValidate.unitPid = ''
      },
      clearDfhire() {
        const t = this
        t.unitDfhirecityName = ''
        t.formValidate.unitDfhirecity = ''
      },
      clearDfwork() {
        const t = this
        t.unitDfworkcityName = ''
        t.formValidate.unitDfworkcity = ''
      },
      clearCostcenter() {
        const t = this
        t.unitDfcostcenterName = ''
        t.formValidate.unitDfcostcenter = ''
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
  }
  .btn{
    position: absolute;
    bottom: 20px;
    right: 60px;
  }
  .btn1{
    position: absolute;
    bottom: 20px;
    right: 124px;
  }
</style>
