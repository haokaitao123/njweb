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
      <Row class="content">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
          <i-col span="11">
            <FormItem :label="$t('lang_sysform.formField.sffOrder')" prop="sffOrder">
              <Input v-model="formValidate.sffOrder" :placeholder="$t('lang_sysform.formField.p_sffOrder')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sysform.formField.sffPhyfield')" prop="sffPhyfield">
              <Input v-model="formValidate.sffPhyfield" :placeholder="$t('lang_sysform.formField.p_sffPhyfield')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sysform.formField.sffFieldNameCnDis')" prop="sffName">
              <Input v-model="formValidate.sffName" :placeholder="$t('lang_sysform.formField.p_sffFieldNameCnDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" >
            <FormItem :label="$t('lang_sysform.formField.sffType')"  prop="sffType">
              <Select  v-model="formValidate.sffType">
                <Option :value="item.paramCode" v-for="(item,index) in fieldphyTypeOption" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sysform.formField.sffIsvalid')" prop="sffIsvalid">
              <RadioGroup  v-model="formValidate.sffIsvalid">
                <Radio :label="item.paramCode" v-for="(item,index) in yerOrNoOption" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sysform.formField.sffLayout')" prop="sffLayout">
              <Select  v-model="formValidate.sffLayout" @on-change="setLayOut" :placeholder="$t('lang_sysform.formField.p_sffLayout')">
                <Option :value="item.paramCode" v-for="(item,index) in layOutOption" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sysform.formField.sffProperty')" prop="sffProperty">
              <Select  v-model="formValidate.sffProperty" :placeholder="$t('lang_sysform.formField.p_sffProperty')">
                <Option :value="item.paramCode" v-for="(item,index) in fieldprop" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_sysform.formField.sffFilter')" prop="sffFilter">
              <Input v-model="formValidate.sffFilter" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sysform.formField.p_sffFilter')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_sysform.formField.sffCascadeget')" prop="sffCascadeget">
              <Input v-model="formValidate.sffCascadeget" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sysform.formField.p_sffCascadeget')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sysform.formField.sffIsupdate')" prop="sffIsupdate">
              <RadioGroup  v-model="formValidate.sffIsupdate">
                <Radio :label="item.paramCode" v-for="(item,index) in yerOrNoOption" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sysform.formField.sffDisdefault')" prop="sffDisdefault">
              <RadioGroup  v-model="formValidate.sffDisdefault">
                <Radio :label="item.paramCode" v-for="(item,index) in yerOrNoOption" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="11" v-show=" layOutValue === 'p_layout_02' ">
            <FormItem :label="$t('lang_sysform.formField.sffLength')">
              <Input v-model="formValidate.sffLength" :placeholder="$t('lang_sysform.formField.p_sffLength')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1" v-show=" layOutValue === 'p_layout_02' ">
            <FormItem :label="$t('lang_sysform.formField.sffPrecision')">
              <Input v-model="formValidate.sffPrecision" :placeholder="$t('lang_sysform.formField.p_sffPrecision')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sysform.formField.sffSelopt')" prop="sffSelopt">
              <Select v-model="formValidate.sffSelopt"  @on-change="showAnysffSelopt" :placeholder="$t('lang_sysform.formField.p_sffSelopt')">
                <Option :value="item.paramCode" v-for="(item,index) in fieldChType"  :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1" v-show="formValidate.sffSelopt === '02system' ? true:false">
            <FormItem :label="$t('lang_sysform.formField.sffSysoptDis')" >
              <span @dblclick="clearSelect">
                <Input v-model="sffSysoptDis" icon="search" :readonly="true" :placeholder="$t('lang_sysform.formField.p_sffSysoptDis')" @on-click="pickData"/>
            </span>
            </FormItem>
          </i-col>
          <i-col span="11"  offset="1" v-show="formValidate.sffSelopt === '03customer' ? true:false">
            <FormItem :label="$t('lang_sysform.formField.sffCustoptshow')">
              <Input v-model="sffCustoptshow" icon="search" :placeholder="$t('lang_sysform.formField.p_sffCustoptshow')" readonly @on-click="openEditFiel"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" :offset="formValidate.sffSelopt === '01none' ? 1:0">
            <FormItem :label="$t('lang_sysform.formField.sffDefault')">
              <Input v-model="formValidate.sffDefault" :placeholder="$t('lang_sysform.formField.p_sffDefault')"></Input>
            </FormItem>
          </i-col>
          <i-col span="21"></i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sysform.formField.sffIslist')" prop="sffIslist">
              <RadioGroup  v-model="formValidate.sffIslist">
                <Radio :label="item.paramCode" v-for="(item,index) in yerOrNoOption" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sysform.formField.sffComplexsearch')" prop="sffComplexsearch">
              <RadioGroup  v-model="formValidate.sffComplexsearch">
                <Radio :label="item.paramCode" v-for="(item,index) in yerOrNoOption" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sysform.formField.sffQuicksearche')" prop="sffQuicksearche">
              <RadioGroup  v-model="formValidate.sffQuicksearche" >
                <Radio :label="item.paramCode" v-for="(item,index) in yerOrNoOption" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="23" v-show=" layOutValue === 'p_layout_71' ">
            <FormItem :label="$t('lang_sysform.formField.sffUpdformat')">
              <CheckboxGroup v-model="formValidate.sffUpdformat">
                <Checkbox :label="item.paramCode" v-for="(item,index) in updfileformat" :key="index">{{item.paramInfoCn}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
          </i-col>
          <i-col span="11" v-show="layOutValue === 'p_layout_71' ">
            <FormItem :label="$t('lang_sysform.formField.sffLowersize')">
              <Input v-model="formValidate.sffLowersize" :placeholder="$t('lang_sysform.formField.p_sffLowersize')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1" v-show=" layOutValue === 'p_layout_71' ">
            <FormItem :label="$t('lang_sysform.formField.sffUppersize')">
              <Input v-model="formValidate.sffUppersize" :placeholder="$t('lang_sysform.formField.p_sffUppersize')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_sysform.formField.sffDesc')">
              <Input v-model="formValidate.sffDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sysform.formField.p_sffDesc')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_sysform.formField.sffSetvalue')">
              <Input v-model="formValidate.sffSetvalue" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sysform.formField.p_sffSetvalue')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_sysform.formField.sffDislogic')">
              <Input v-model="formValidate.sffDislogic" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sysform.formField.p_sffDislogic')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_sysform.formField.comment')">
              <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sysform.formField.comment')"></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <!--<Button type="ghost" style="margin-left: 8px">{{$t('button.cal')}}</Button>-->
      <Button class="btn1" type="ghost" @click="close">取消</Button>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    </div>
    <editFiel v-show="showEditFiel" @close="hidEditFiel" @setsffCustopt="setsffCustopt"></editFiel>
    <transition name="fade">
      <sffSysoptTable v-show="openPick" :searchText="searchText" :searchTitle="searchTitle" :searchCloumns="searchCloumns" :params="params" @closeUp="closeTable" @changeinput="changeinput" ref="sffSysoptTable"></sffSysoptTable>
    </transition>
  </div>
</template>
<script>
  import editFiel from './editFiel'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import sffSysoptTable from '../../../components/searchTable/sffSysoptTable'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        showSffSelopt: '0',
        showEditFiel: false,
        value4: '',
        yerOrNoOption: [],
        fieldphyTypeOption: [],
        layOutOption: [],
        fieldChType: [],
        updfileformat: [],
        fieldprop: [],
        fieldType: '',
//      自定义选项配置显示字段
        sffCustoptshow: '',
        openPick: false,
        sffSysoptDis: '',
        sffTypeDis: '',
        sffLayoutDis: '',
        sffSeloptDis: '',
        sffIsvalidDis: '',
        sffQuicksearcheDis: '',
        sffComplexsearchDis: '',
        sffCustoptDis: '',
        sffIslistDis: '',
        sffIsupdateDis: '',
        sffDisdefaultDis: '',
        sffPropertyDis: '',
        // layOut控制字段
        layOutValue: '',
        formValidate: {
          _mt: 'platSformfield.addOrUpd',
          sffOrder: '',
          sffPhyfield: '',
          sffName: '',
          sffLayout: '',
          sffIsvalid: '1',
          sffType: '',
          sffLength: '',
          sffSysopt: '',
          sffSelopt: '01none',
          sffComplexsearch: '0',
          sffQuicksearche: '0',
          sffCustoptDis: '',
          sffDefault: '',
          sffPrecision: '',
          sffUpdformat: [],
          sffUppersize: '',
          sffLowersize: '',
          sffSetvalue: '',
          sffDislogic: '',
          sffIslist: '0',
          sffProperty: '',
          sffPropertyDis: '',
          sffIsupdate: '1',
          sffDisdefault: '1',
          comment: '',
          funId: '1',
          logType: '',
          isSffCustoptUpd: '0',
          sffDesc: '',
          sffFilter: '',
          sffCascadeget: '',
        },
        ruleValidate: {
          sffOrder: [
            { required: true, message: this.$t('lang_sysform.formField.rule_sffOrder'), trigger: 'blur' },
          ],
          sffPhyfield: [
            { required: true, message: this.$t('lang_sysform.formField.rule_sffPhyfield'), trigger: 'blur' },
          ],
          sffName: [
            { required: true, message: this.$t('lang_sysform.formField.rule_sffFieldNameCnDis'), trigger: 'blur' },
          ],
          sffIsvalid: [
            { required: true, message: this.$t('lang_sysform.formField.rule_sffIsvalid'), trigger: 'blur' },
          ],
          sffLayout: [
            { required: true, message: this.$t('lang_sysform.formField.rule_sffLayout'), trigger: 'blur' },
          ],
        },
        searchCloumns: [
          {
            title: this.$t('lang_sysform.formField.selCode'),
            key: 'selCode',
            sortable: 'custom',
            width: 253,
          },
          {
            title: this.$t('lang_sysform.formField.selMark'),
            key: 'selMark',
            sortable: 'custom',
            width: 253,
          },
          {
            title: this.$t('lang_sysform.formField.selName'),
            key: 'selName',
            sortable: 'custom',
            width: 253,
          },
        ],
        searchTitle: this.$t('lang_sysform.formField.searchTitle'),
        searchText: this.$t('lang_sysform.formField.searchText'),
        params: {
          _mt: 'platSelectDefine.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
        },
      }
    },
    props: {
      logType: String,
    },
    components: {
      editFiel,
      sffSysoptTable,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      showAnysffSelopt(value) {
        if (this.formValidate.sffSelopt === '02system') {
          this.showSffSelopt = '1'
          this.sffCustoptshow = ''
          this.formValidate.sffCustoptDis = ''
        } else if (this.formValidate.sffSelopt === '03customer') {
          this.showSffSelopt = '2'
          this.sffSysoptDis = ''
          this.formValidate.sffSysopt = ''
        } else {
          this.showSffSelopt = '0'
          this.sffCustoptshow = ''
          this.formValidate.sffCustoptDis = ''
          this.sffSysoptDis = ''
          this.formValidate.sffSysopt = ''
        }
      },
      // 根据布局方式控制字段的显示隐藏
      setLayOut(value) {
          this.layOutValue = value
      },
      openEditFiel() {
        if (this.showSffSelopt !== '2') {
          return
        }
        this.showEditFiel = true
      },
      hidEditFiel() {
        this.showEditFiel = false
      },
      close() {
        this.clear()
        this.$emit('hideMsg')
      },
      closeTable() {
        const t = this
        t.openPick = false
      },
      getFormData() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platSformfield.getById',
          id: t.$store.state.sysData.childId1,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.sffOrder = res.data.content[0].sffOrder
            t.formValidate.sffPhyfield = res.data.content[0].sffPhyfield
            t.formValidate.sffName = res.data.content[0].sffName
            t.formValidate.sffIsvalid = res.data.content[0].sffIsvalid
            t.formValidate.sffLayout = res.data.content[0].sffLayout
            t.formValidate.sffProperty = res.data.content[0].sffProperty
            t.formValidate.sffPropertyDis = res.data.content[0].sffPropertyDis
            t.formValidate.sffType = res.data.content[0].sffType
            t.formValidate.sffLength = res.data.content[0].sffLength
            t.formValidate.sffSysopt = res.data.content[0].sffSysopt
            t.sffSysoptDis = res.data.content[0].sffSysoptDis
            t.formValidate.sffCustoptDis = res.data.content[0].sffCustoptDis
            t.formValidate.sffDefault = res.data.content[0].sffDefault
            t.formValidate.sffPrecision = res.data.content[0].sffPrecision
            if (res.data.content[0].sffUpdformat) {
             t.formValidate.sffUpdformat = res.data.content[0].sffUpdformat.split(',')
            }
            t.formValidate.sffUppersize = res.data.content[0].sffUppersize
            t.formValidate.sffLowersize = res.data.content[0].sffLowersize
            t.formValidate.sffSetvalue = res.data.content[0].sffSetvalue
            t.formValidate.sffDislogic = res.data.content[0].sffDislogic
            t.formValidate.sffSelopt = res.data.content[0].sffSelopt
            t.formValidate.sffComplexsearch = res.data.content[0].sffComplexsearch
            t.formValidate.sffQuicksearche = res.data.content[0].sffQuicksearche
            t.formValidate.sffIslist = res.data.content[0].sffIslist
            t.formValidate.sffIsupdate = res.data.content[0].sffIsupdate
            t.formValidate.sffDisdefault = res.data.content[0].sffDisdefault
            t.formValidate.comment = res.data.content[0].comment
            t.formValidate.sffDesc = res.data.content[0].sffDesc
            t.formValidate.sffFilter = res.data.content[0].sffFilter
            t.formValidate.sffCascadeget = res.data.content[0].sffCascadeget
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno,fielddatatype,layout,fieldopttype,updfileformat,fieldprop',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.yerOrNoOption = res.data.content[0].value[0].paramList
            t.fieldphyTypeOption = res.data.content[0].value[1].paramList
            t.layOutOption = res.data.content[0].value[2].paramList
            t.fieldChType = res.data.content[0].value[3].paramList
            t.updfileformat = res.data.content[0].value[4].paramList
            t.fieldprop = res.data.content[0].value[5].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      setsffCustopt(show, value) {
        this.formValidate.isSffCustoptUpd = '1'
        this.sffCustoptshow = show
        this.formValidate.sffCustoptDis = value
      },
      save() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.sffUpdformat = data.sffUpdformat.join()
        if (!t.$store.state.sysData.childId1) {
          data.logType = '新增'
          data.sffForm = t.$store.state.sysData.mainId
        } else {
          data.logType = '修改'
          data.sffForm = t.$store.state.sysData.mainId
          data.id = t.$store.state.sysData.childId1
        }
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.sysData.childId1) {
                  //            更新主表数据（无需重新加载）
                  t.$store.commit('sysData/addNewArrayChildTable1', res.data.content[0])
//            更新vuex中的mainId
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$store.commit('sysData/updateArrayChildTable1', res.data.content[0])
                  //            更新主表数据（无需重新加载）
                }
                t.clear()
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
      clear() {
        const t = this
        t.formValidate.sffPhyfield = ''
        t.formValidate.sffName = ''
        t.formValidate.sffIsvalid = ''
        t.formValidate.sffOrder = ''
        t.formValidate.sffType = ''
        t.formValidate.sffLength = ''
        t.formValidate.sffPrecision = ''
        t.formValidate.sffLayout = ''
        t.formValidate.sffSelopt = '01none'
        t.formValidate.sffSysopt = ''
        t.formValidate.sffCustoptDis = ''
        t.formValidate.sffDefault = ''
        t.formValidate.sffQuicksearche = ''
        t.formValidate.sffComplexsearch = ''
        t.formValidate.sffUpdformat = []
        t.formValidate.sffUppersize = ''
        t.formValidate.sffLowersize = ''
        t.formValidate.sffDislogic = ''
        t.formValidate.sffSetvalue = ''
        t.formValidate.sffIslist = ''
        t.formValidate.sffProperty = ''
        t.formValidate.sffDisdefault = ''
        t.formValidate.comment = ''
        t.formValidate.sffFilter = ''
        t.formValidate.sffCascadeget = ''
        t.formValidate.sffIsupdate = ''
        t.sffSysoptDis = ''
        t.sffTypeDis = ''
        t.sffLayoutDis = ''
        t.sffSeloptDis = ''
        t.sffIsvalidDis = ''
        t.showSffSelopt = '0'
        t.sffQuicksearcheDis = ''
        t.sffComplexsearchDis = ''
        t.sffCustoptDis = ''
        t.sffIslistDis = ''
        t.sffIsupdateDis = ''
        t.sffDisdefaultDis = ''
        t.sffPropertyDis = ''
        t.formValidate.sffDesc = ''
        t.$refs.formValidate.resetFields()
        t.$store.commit('sysData/setChildId1', '')
      },
      pickData() {
        const t = this
        if (t.showSffSelopt !== '1') {
          return
        }
        t.$refs.sffSysoptTable.getData(this.params)
        t.openPick = true
      },
      changeinput(name, code) {
        const t = this
        t.sffSysoptDis = name
        t.formValidate.sffSysopt = code
      },
      clearSelect() {
        const t = this
        t.sffSysoptDis = ''
        t.formValidate.sffSysopt = ''
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .box{
    height: 560px;
    overflow:hidden;
    .content{
      overflow-y: auto;
      position: absolute;
      height: 420px;
    }
  }
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
</style>
