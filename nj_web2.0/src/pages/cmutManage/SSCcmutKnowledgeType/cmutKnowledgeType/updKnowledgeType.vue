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
          <FormItem :label="$t('lang_knowBase.knowlegeType.cmutKntypeCode')" prop="cmutKntypeCode">
            <Input v-model="formValidate.cmutKntypeCode" :placeholder="$t('lang_knowBase.knowlegeType.cmutKntypeCodeDis')"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_knowBase.knowlegeType.cmutKntypeName')" prop="cmutKntypeName">
            <Input v-model="formValidate.cmutKntypeName" :placeholder="$t('lang_knowBase.knowlegeType.cmutKntypeNameDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_knowBase.knowlegeType.cmutKntypeBusprop')"  prop="cmutKntypeBusprop" :placeholder="$t('lang_knowBase.knowlegeType.cmutKntypeBuspropDis')">
            <Select v-model="formValidate.cmutKntypeBusprop" disabled >
              <Option :value="item.paramCode" v-for="(item,index) in kntypebusprop" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="11"  offset="1">
          <FormItem :label="$t('lang_knowBase.knowlegeType.cmutWorkodprop')" prop="cmutWorkodprop" :placeholder="$t('lang_knowBase.knowlegeType.cmutWorkodpropDis')">
            <Select v-model="formValidate.cmutWorkodprop" disabled>
              <Option :value="item.paramCode" v-for="(item,index) in workodprop" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_knowBase.knowlegeType.cmutKntypePid')" prop="cmutKntypePid">
            <span @dblclick="cleardb">
                <Input v-model="cmutKntypePidDis" icon="search" :readonly="true" :placeholder="$t('lang_knowBase.knowlegeType.cmutKntypePidDis')"  @on-click="pickData"/>
            </span>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_knowBase.knowlegeType.cmutKntypePic')" prop="cmutKntypePic">
            <img :src="selectIma" style="width: 30px;height: 30px;" v-show="selectIma.indexOf('.png') > -1"/>
            <Icon type="ios-plus" v-show="selectIma.indexOf('.png') == -1" size="20" @click="selectIcon" style="margin-left: 10px;vertical-align: middle;"></Icon>
            <Icon type="ios-close" v-show="selectIma.indexOf('.png') > -1" size="20" @click="deleteIcon" style="margin-left: 10px;vertical-align: middle;"></Icon>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
            <FormItem :label="$t('lang_knowBase.knowlegeType.cmutKntypeDesc')" prop="cmutKntypeDesc">
             <Input v-model="formValidate.cmutKntypeDesc" :placeholder="$t('lang_knowBase.knowlegeType.cmutKntypeDescDis')"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_knowBase.knowlegeType.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_knowBase.knowlegeType.commentDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset" style="margin-left: 8px">{{$t('button.cle')}}</Button>
              <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
    <transition name="fade">
      <searchTable v-show="openPick"  :searchCloumns="searchCloumns" :params="params" @closeUp="close" @changeinput="changeinput" ref="searchTable"></searchTable>
    </transition>
    <transition name="fade">
      <searchTable3 v-show="openPick4" :searchText="searchText4" :searchCloumns="searchCloumns4" :params="params4" @closeUp="close" @changeinput="changeinput4" ref="searchTable3"></searchTable3>
    </transition>
    <transition name="fade">
      <editQuickMoveImg v-show="openUpdateImg" @close="closeImg"  @getImgId="getImgId"   ref="editQuickMoveImg"></editQuickMoveImg>
    </transition>
  </div>
</template>
<script>
	import editQuickMoveImg from '../../../homePage/editQuickMoveImg'
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../../axios/axios'
  import searchTable from '../../../../components/searchTable/searchKnowType'
  import searchTable3 from '../../../../components/searchTable/searchBaseBak'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  export default {
    data() {
      return {
        workodprop: [],
        updateId: '',
        openPick: false,
        selectIma: '',
        cmutKntypePidDis: '',
        cmutKntypeProcessidDis: '',
        kntypebusprop: [],
        showIsprocess: true,
        openPick4: false,
        openUpdateImg: false,
        formValidate: {
          _mt: 'cmutKnlType.addOrUpd',
          cmutKntypeCode: '',
          cmutKntypeName: '',
          cmutKntypePid: '',
          cmutKntypeDesc: '',
          cmutKntypePic: '',
          cmutWorkodprop: '01manual', // 类型属性
          cmutKntypeBusprop: '01consultation',
          cmutKntypeProcessid: '',
          cmutKntypeStdprice: '',
          cmutKntypeStddltime: '',
          cmutKntypeCaudltime: '',
          comment: '',
          funId: '1',
          companyId: '1',
        },
     //   searchText: '请输入类型名称',
        searchCloumns: [
          {
            title: this.$t('lang_knowBase.knowlegeType.cmutKntypeCode'),
            key: 'cmutKntypeCode',
            sortable: 'custom',
            width: 253,
          },
          {
            title: this.$t('lang_knowBase.knowlegeType.cmutKntypeName'),
            key: 'cmutKntypeName',
            sortable: 'custom',
            width: 253,
          },
        ],
        params: {
          _mt: 'cmutKnlType.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
//          roleType: '3user',
          cmutKntypeBusprop: '01consultation',
        },
        searchText4: '',
        searchCloumns4: [
          {
            title: this.$t('lang_knowBase.knowlegeType.flowName'),
            key: 'flowName',
            width: 150,
            sortable: 'custom',
          },
        ],
        params4: {
          _mt: 'platFlow.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: '查询List',
        },
        ruleValidate: {
          cmutKntypeCode: [
            { required: true, message: this.$t('lang_knowBase.knowlegeType.cmutKntypeCodeDis'), trigger: 'blur' },
          ],
          cmutKntypeName: [
            { required: true, message: this.$t('lang_knowBase.knowlegeType.cmutKntypeNameDis'), trigger: 'blur' },
          ],
          cmutKntypeProcessid: [
            { required: true, message: this.$t('lang_knowBase.knowlegeType.flowNameDis'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    updated() {

    },
    components: {
      searchTable,
      searchTable3,
      editQuickMoveImg,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getData(id) {
        const t = this
        t.updateId = id
        getDataLevelUserLogin({
          _mt: 'cmutKnlType.getById',
          id: id,
          funId: '1',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.cmutKntypeCode = res.data.content[0].cmutKntypeCode
            t.formValidate.cmutKntypeName = res.data.content[0].cmutKntypeName
            t.formValidate.cmutKntypePid = res.data.content[0].cmutKntypePid
            t.formValidate.cmutKntypeDesc = res.data.content[0].cmutKntypeDesc
            t.formValidate.cmutKntypePic = res.data.content[0].cmutKntypePic
            t.formValidate.cmutKntypeBusprop = res.data.content[0].cmutKntypeBusprop
            t.formValidate.cmutWorkodprop = res.data.content[0].cmutWorkodprop
            t.formValidate.cmutKntypeProcessid = res.data.content[0].cmutKntypeProcessid
            t.cmutKntypePidDis = res.data.content[0].cmutKntypePidDis
            t.cmutKntypeBuspropDis = res.data.content[0].cmutKntypeBuspropDis
            t.cmutKntypeProcessidDis = res.data.content[0].cmutKntypeProcessidDis
            t.formValidate.comment = res.data.content[0].comment
            t.formValidate.cmutKntypeStdprice = res.data.content[0].cmutKntypeStdprice
            t.formValidate.cmutKntypeStddltime = res.data.content[0].cmutKntypeStddltime
            t.formValidate.cmutKntypeCaudltime = res.data.content[0].cmutKntypeCaudltime
            t.selectIma = "./static/indexImg/" + t.formValidate.cmutKntypePic
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
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
                t.clear()
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
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'kntypebusprop,workodprop',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.kntypebusprop = res.data.content[0].value[0].paramList
            t.workodprop = res.data.content[0].value[1].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      selectIcon(){
      	this.openUpdateImg = true;
      },
      deleteIcon(){
      	this.selectIma = "";
      	this.formValidate.cmutKntypePic = "";
      },
      closeImg(){
      	this.openUpdateImg = false;
      },
      getImgId(imgid) {
        let t = this
				t.formValidate.cmutKntypePic = imgid;
        t.selectIma = "./static/indexImg/"+imgid;
        t.openUpdateImg = false
      },
      handleReset() {
        this.clear()
        this.$emit('closeUp')
        this.$refs.formValidate.resetFields()
      },
      pickData() {
        const t = this
        t.$refs.searchTable.getData(this.params)
        t.openPick = true
      },
      changeinput(name, code) {
        const t = this
        t.cmutKntypePidDis = name
        t.formValidate.cmutKntypePid = code
      },
      cleardb() {
        const t = this
        t.cmutKntypePidDis = ''
        t.formValidate.cmutKntypePid = ''
      },
      pickData4() {
        const t = this
        t.$refs.searchTable3.getData(this.params4)
        t.openPick4 = true
      },
      changeinput4(name, code) {
        const t = this
        t.cmutKntypeProcessidDis = name
        t.formValidate.cmutKntypeProcessid = code
      },
      cleardb4() {
        const t = this
        t.cmutKntypeProcessidDis = ''
        t.formValidate.cmutKntypeProcessid = ''
      },
      clear() {
        const t = this
        t.formValidate.cmutKntypeCode = ''
        t.formValidate.cmutKntypeName = ''
        t.formValidate.cmutKntypePid = ''
        t.formValidate.cmutKntypeDesc = ''
        t.formValidate.cmutKntypePic = ''
        t.formValidate.cmutKntypeProcessid = ''
        t.formValidate.cmutKntypeBusprop = ''
        t.formValidate.cmutKntypeStdprice = ''
        t.formValidate.cmutKntypeStddltime = ''
        t.formValidate.cmutKntypeCaudltime = ''
        t.cmutKntypePidDis = ''
        t.cmutKntypeProcessidDis = ''
        t.cmutKntypeBuspropDis = ''
        t.formValidate.comment = ''
        t.selectIma = ''
        this.$emit('closeUp')
        t.$refs.formValidate.resetFields()
      },
      close() {
        const t = this
        t.openPick = false
        t.openPick4 = false
      },
      changeIsprocess() {
        const t = this
        if (t.formValidate.cmutKntypeBusprop === '01consultation') {
          t.showIsprocess = false
        } else {
          t.showIsprocess = true
        }
      },
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd";
</style>
