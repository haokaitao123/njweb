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
            <FormItem :label="$t('lang_flow.mailAttach.flsmlatOrder')" prop="flsmlatOrder">
              <Input v-model="formValidate.flsmlatOrder" :placeholder="$t('lang_flow.mailAttach.p_flsmlatOrder')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_flow.mailAttach.flsmlatSource')"  prop="flsmlatSource">
              <Select  v-model="formValidate.flsmlatSource" @on-change="setDocType" :placeholder="$t('lang_flow.mailAttach.p_flsmlatSource')">
                <Option :value="item.paramCode" v-for="(item,index) in attachType" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11" v-show=" typeValue === '01fixed' ">
            <FormItem :label="$t('lang_flow.mailAttach.flsmlatAttach')"  prop="flsmlatAttach">
              <span @dblclick="dbclear">
                <Input v-model="flsmlatAttachDis" icon="search"  :placeholder="$t('lang_flow.mailAttach.p_flsmlatAttach')" @on-click="pickData"/>
            </span>
            </FormItem>
          </i-col>
          <i-col span="11" v-show=" typeValue === '03flowgen' ">
            <FormItem :label="$t('lang_flow.mailAttach.flsmlatGendocid')" prop="flsmlatGendocid">
              <span @dblclick="dbclear">
                <Input v-model="flsmlatGendocidDis" icon="search"  :placeholder="$t('lang_flow.mailAttach.p_flsmlatGendocid')" @on-click="pickData"/>
            </span>
            </FormItem>
          </i-col>
          <i-col span="11" v-show=" typeValue === '02flowupload' ">
            <FormItem :label="$t('lang_flow.mailAttach.flsmlatUpdfield')"  prop="flsmlatUpdfield">
              <span @dblclick="dbclear">
                <Input v-model="flsmlatUpdidDis" icon="search"  :placeholder="$t('lang_flow.mailAttach.p_flsmlatUpdfield')" @on-click="pickData2"/>
            </span>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_flow.mailAttach.flsmlatConditionDis')" prop="flsmlatConditionDis">
              <Input v-model="formValidate.flsmlatConditionDis" type="textarea" readonly="readonly" :autosize="{minRows: 2,maxRows: 5}" placeholder="请设置附件条件..." style="width: 85%;margin-right: 10px;"></Input>
            	<Button type="primary" @click="generConditionNow(NaN,'条件设置')">{{$t('lang_flow.flowcommon.plat_condition')}}</Button>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_flow.mailAttach.flsmlatIsvalid')"  prop="flsmlatIsvalid">
              <RadioGroup  v-model="formValidate.flsmlatIsvalid">
                <Radio :label="item.paramCode" v-for="(item,index) in yesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="23" v-show="formValidate.flsmlatIsvalid === '0'?true:false">
            <FormItem :label="$t('lang_flow.mailAttach.flsmlatInvreason')" prop="flsmlatInvreason">
              <Input v-model="formValidate.flsmlatInvreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.mailAttach.p_flsmlatInvreason')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <FormItem :label="$t('lang_flow.mailAttach.flsmlatOrder')" prop="comment">
              <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.mailAttach.p_comment')"></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    </div>
    <transition name="fade">
      <searchTable v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="closeTable" @changeinput="changeinput" :searchTitle="searchTitle" :searchText="searchText" ref="searchTable"></searchTable>
    </transition>
    <transition name="fade">
      <platSffieldPop v-show="openPick2"  :searchCloumns="searchCloumns2" :title="searchTitle1" :searchText1="searchText1"  :searchText2="searchText2" :params="params2" @closeUp="closeTable2" @changeinput="changeinput2" ref="platSffieldPop"></platSffieldPop>
    </transition>
    <transition name="fade">
      <genrCondition v-show="openCondition"  @inputCondition="inputCondition"  @closeCondition="closeCondition"  ref="genrCondition"></genrCondition>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchTable from '../../../components/searchTable/searchTable'
  import platSffieldPop from '../../../components/searchTable/platSffieldPop'
  import genrCondition from './genrCondition'

  export default {
    data() {
      return {
  //      id: '',
        flsmlatAttachDis: '',
        flsmlatGendocidDis: '',
        flsmlatUpdidDis: '',
        flsmlatSourceDis: '',
        flsmlatIsvalid: '',
        openPick: false,
        openPick2: false,
        openCondition: false,
        yesOrNo: [],
        attachType: [],
        typeValue: '01fixed',
        transmitName: '',
        transmitValue: '',
        formValidate: {
          _mt: 'platFlsmlAttach.addOrUpd',
          flsmlatOrder: '',
          flsmlatSource: '',
          flsmlatAttach: '',
          flsmlatGendocid: '',
          flsmlatUpdfield: '',
          flsmlatCondition: '',
          flsmlatConditionDis: '',
          flsmlatIsvalid: '1',
          flsmlatInvreason: '',
          comment: '',
          flowId: '',
          flsmlatMail: this.$store.state.flowStepData.childId3,
          funId: '1',
//          logType: '',
        },
        ruleValidate: {
          flsmlatOrder: [
            { required: true, message: this.$t('lang_flow.mailAttach.rule_flsmlatOrder'), trigger: 'blur' },
          ],
          flsmlatSource: [
            { required: true, message: this.$t('lang_flow.mailAttach.rule_flsmlatSource'), trigger: 'blur' },
          ],
          flsmlatInvreason: [
            { required: true, message: this.$t('lang_flow.mailAttach.rule_flsmlatInvreason'), trigger: 'blur' },
          ],
        },
        searchTitle: this.$t('lang_flow.mailAttach.searchTitle'),
        searchText: this.$t('lang_flow.mailAttach.searchText'),
        searchCloumns: [
          {
            title: this.$t('lang_flow.mailAttach.flsdcTempname'),
            key: 'flsdcTempname',
            width: 253,
          },
          {
            title: this.$t('lang_flow.mailAttach.flsdcStepDis'),
            key: 'flsdcStepDis',
            width: 253,
          },
        ],
        params: {
          _mt: 'platFlsDoc.getByPreStep',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          targetType: 'emailAttach',
          flsdcStep: this.$store.state.flowStepData.mainId,
          flsdcType: '',
        },
        searchTitle1: this.$t('lang_flow.mailAttach.searchTitle1'),
        searchText1: this.$t('lang_flow.mailAttach.searchText1'),
        searchText2: this.$t('lang_flow.mailAttach.searchText2'),
        searchCloumns2: [
          {
            title: this.$t('lang_flow.mailAttach.sffPhyfield'),
            key: 'sffPhyfield',
            width: 253,
          },
          {
            title: this.$t('lang_flow.mailAttach.sffFieldNameCnDis'),
            key: 'sffFieldNameCnDis',
            width: 253,
          },
        ],
        params2: {
          _mt: 'platSformfield.getFieldList',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          sffLayout: 'p_layout_71',
          flowId: this.$store.state.flowStepData.flowId,
        },
      }
    },
    props: {
      logType: String,
      id: '',
    },
    components: {
      searchTable,
      platSffieldPop,
      genrCondition,
    },
    mounted() {
      this.getSelect()
      this.getFormData(this.id)
    },
    methods: {
      close() {
        this.clear()
        this.$emit('hideMsg')
      },
      getFormData(id) {
        const t = this
        t.id = id
        if (!id) {
          return
        }
        getDataLevelUserLogin({
          _mt: 'platFlsmlAttach.getById',
          id: id,
          flowId: t.$store.state.flowStepData.flowId,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.flsmlatOrder = res.data.content[0].flsmlatOrder
            t.formValidate.flsmlatSource = res.data.content[0].flsmlatSource
            t.flsmlatSourceDis = res.data.content[0].flsmlatSourceDis
            t.formValidate.flsmlatAttach = res.data.content[0].flsmlatAttach
            t.flsmlatAttachDis = res.data.content[0].flsmlatAttachDis
            t.formValidate.flsmlatGendocid = res.data.content[0].flsmlatGendocid
            t.flsmlatGendocidDis = res.data.content[0].flsmlatGendocidDis
            t.formValidate.flsmlatUpdfield = res.data.content[0].flsmlatUpdfield
            t.flsmlatUpdidDis = res.data.content[0].flsmlatUpdidDis
            t.formValidate.flsmlatIsvalid = res.data.content[0].flsmlatIsvalid
            t.flsmlatIsvalidDis = res.data.content[0].flsmlatIsvalidDis
            t.formValidate.flsmlatInvreason = res.data.content[0].flsmlatInvreason
            t.formValidate.flsmlatCondition = res.data.content[0].flsmlatCondition
            t.formValidate.flsmlatConditionDis = res.data.content[0].flsmlatConditionDis
            t.formValidate.comment = res.data.content[0].comment
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
          typeCode: 'yesno,mailattachtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.yesOrNo = res.data.content[0].value[0].paramList
            t.attachType = res.data.content[0].value[1].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      setDocType(value) {
        this.typeValue = value
        if (value === '01fixed') {
          this.params.flsdcType = '01fixed'
          this.formValidate.flsmlatUpdfield = ''
          this.flsmlatUpdidDis = ''
          this.formValidate.flsmlatGendocid = ''
          this.flsmlatGendocidDis = ''
        }
        if (value === '03flowgen') {
          this.params.flsdcType = '02notfixed'
          this.formValidate.flsmlatUpdfield = ''
          this.flsmlatUpdidDis = ''
          this.formValidate.flsmlatAttach = ''
          this.flsmlatAttachDis = ''
        }
        if (value === '02flowupload') {
          this.formValidate.flsmlatAttach = ''
          this.flsmlatAttachDis = ''
          this.formValidate.flsmlatGendocid = ''
          this.flsmlatGendocidDis = ''
        }
      },
      save() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        data.flowId = t.$store.state.flowStepData.flowId
        data.flsmlatMail = t.$store.state.flowStepData.childId3
        if (t.logType === this.$t('button.upd')) {
          data.id = t.id
        }
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
        if (t.formValidate.flsmlatIsvalid === '1') {
          delete t.ruleValidate.flsmlatInvreason
        } else {
          t.ruleValidate.flsmlatInvreason = [
            { required: true, message: '请输入失效原因', trigger: 'blur' },
          ]
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!data.id) {
                  t.$emit('closeUp')
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.formValidate.resetFields()
                  t.$emit('addNewArray', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('updMailAttach', res.data.content[0])
                }
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
      pickData() {
        const t = this
        t.openPick = true
        t.$refs.searchTable.getData(t.params)
      },
      closeTable() {
        const t = this
        t.openPick = false
      },
      changeinput(name, id) {
        const t = this
        if (this.typeValue === '01fixed') {
          t.flsmlatAttachDis = name
          t.formValidate.flsmlatAttach = id
        }
        if (this.typeValue === '03flowgen') {
          t.flsmlatGendocidDis = name
          t.formValidate.flsmlatGendocid = id
        }
      },
      pickData2() {
        const t = this
        t.openPick2 = true
        t.$refs.platSffieldPop.getData(t.params2)
      },
      closeTable2() {
        const t = this
        t.openPick2 = false
      },
      changeinput2(name, id) {
        const t = this
          t.flsmlatUpdidDis = name
          t.formValidate.flsmlatUpdfield = id
      },
      dbclear() {
        const t = this
        if (t.formValidate.flsmlatSource === '03flowgen') {
          t.flsmlatGendocidDis = ''
          t.formValidate.flsmlatGendocid = ''
        }
        if (t.formValidate.flsmlatSource === '02flowupload') {
          t.flsmlatUpdidDis = ''
          t.formValidate.flsmlatUpdfield = ''
        }
        if (t.formValidate.flsmlatSource === '01fixed') {
          t.formValidate.flsmlatAttach = ''
          t.flsmlatAttachDis = ''
        }
      },
      clear() {
        const t = this
        t.formValidate.flsmlatCondition = ''
        t.formValidate.flsmlatConditionDis = ''
        t.formValidate.flsmlatOrder = ''
        t.formValidate.flsmlatSource = ''
        t.flsmlatSourceDis = ''
        t.formValidate.flsmlatAttach = ''
        t.flsmlatAttachDis = ''
        t.formValidate.flsmlatGendocid = ''
        t.flsmlatGendocidDis = ''
        t.formValidate.flsmlatUpdfield = ''
        t.flsmlatUpdfield = ''
        t.formValidate.flsmlatIsvalid = ''
        t.flsmlatIsvalidDis = ''
        t.formValidate.flsmlatInvreason = ''
        t.formValidate.comment = ''
        t.$refs.formValidate.resetFields()
      },
      generConditionNow(id) {
      	const t = this
      	if (t.formValidate.flsmlatConditionDis && t.formValidate.flsmlatCondition) {
      		t.transmitName = t.formValidate.flsmlatConditionDis
	      	t.transmitValue = t.formValidate.flsmlatCondition
	      	t.$refs.genrCondition.getData(t.transmitName, t.transmitValue)
      	}
      	t.openCondition = true
      },
      closeCondition() {
      	const t = this
      	t.openCondition = false
      },
      inputCondition(name, value) {
      	const t = this
      	t.formValidate.flsmlatCondition = value
        t.formValidate.flsmlatConditionDis = name
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
      left: 20px;
      right: 20px;
      overflow-y: auto;
      position: absolute;
      height: 420px;
    }
  }
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
