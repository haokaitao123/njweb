<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form :model="form" label-position="right" :rules="ruleValidate"  :label-width="100" ref="form">
          <i-col span="11">
            <FormItem :label="$t('lang_sysform.Sffvalid.sffvFieldname')" prop="sffvFieldname">
           <span @dblclick="clearpop1">
                <Input  v-model="sffvFieldnameDis" icon="search" :placeholder="$t('lang_sysform.Sffvalid.sffvFieldname')" @on-click="openFiled"></Input>
            </span>
            </FormItem>
          </i-col>
        <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sysform.Sffvalid.sffvStyle')" prop="sffvStyle">
              <Select  v-model="form.sffvStyle" :placeholder="$t('lang_sysform.Sffvalid.p_sffvStyle')">
                <Option :value="item.paramCode" v-for="(item,index) in sffValidType" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sysform.Sffvalid.sffvValidvalue')" prop="sffvValidvalue">
              <Input v-model="form.sffvValidvalue" :placeholder="$t('lang_sysform.Sffvalid.p_sffvValidvalue')"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sysform.Sffvalid.sffvFieldname')" prop="sffvIsmust">
              <RadioGroup  v-model="form.sffvIsmust">
                <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem :label="$t('lang_sysform.Sffvalid.sffvPrommsg')" prop="sffvPrommsg">
              <span @dblclick="clearpop2">
                <Input v-model="sffvPrommsgDis" icon="search" :placeholder="$t('lang_sysform.Sffvalid.p_sffvPrommsg')" @on-click="openLang"></Input>
              </span>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem :label="$t('lang_sysform.Sffvalid.sffvMustmsg')" prop="sffvMustmsg">
              <span @dblclick="clearpop3">
                <Input v-model="sffvMustmsgDis" icon="search" :placeholder="$t('lang_sysform.Sffvalid.p_sffvMustmsg')" @on-click="openLang2"></Input>
              </span>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <Button class="btn1" type="ghost" @click="close">{{$t('button.cal')}}</Button>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    </div>
    <transition name="fade">
      <platSffieldPop v-show="openFNameList" :searchText1 ="searchText1" :searchText2 ="searchText2" :title="title1" :searchCloumns="fieldCloumns" :params="fieldParams" @closeUp="closeTable" @changeinput="changeinput" ref="platSffieldPop"></platSffieldPop>
    </transition>
    <transition name="fade">
      <baseLangPop v-show="openPick" :searchText3 ="searchText3" :title="title2" :searchCloumns="promCloumns" :params="promParams" @closeUp="closeTable" @langchangeinput="langchangeinput" ref="baseLangPop"></baseLangPop>
    </transition>
    <transition name="fade">
      <baseLangPop v-show="openPick2" :searchText3 ="searchText3" :title="title2" :searchCloumns="promCloumns" :params="mustParams" @closeUp="closeTable" @langchangeinput="langchangeinput" ref="baseLangPop2"></baseLangPop>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import platSffieldPop from '../../../components/searchTable/platSffieldPop'
  import baseLangPop from '../../../components/searchTable/baseLangPop'

  export default {
    data() {
      return {
        openPick: false,
        openPick2: false,
        openFlag: '0', //哪个弹出框的标志，0 openPick, 1 openPick2
        openFNameList: false,
        value4: '',
        fruit: [],
        sffValidType: [],
        yesno: [],
        sffvIsmustDis: '',
        sffvStyleDis: '',
        sffvPrommsgDis: '',
        sffvMustmsgDis: '',
        sffvFieldnameDis: '',
        form: {
          _mt: 'platSffvalid.addOrUpd',
          sffvFieldname: '',
          sffvStyle: '',
          sffvValidvalue: '',
          sffvIsmust: '1',
          sffvPrommsg: '',
          sffvMustmsg: '',
          funId: '1',
          logType: '',
        },
        title1: this.$t('lang_sysform.fieldCloumns.title1'),
        searchText1: this.$t('lang_sysform.fieldCloumns.searchText1'),
        searchText2: this.$t('lang_sysform.fieldCloumns.searchText2'),
        fieldCloumns: [
          {
            title: this.$t('lang_sysform.fieldCloumns.sffPhyfield'),
            key: 'sffPhyfield',
            sortable: 'custom',
            width: 189,
          },
          {
            title: this.$t('lang_sysform.fieldCloumns.sffFieldNameCnDis'),
            key: 'sffFieldNameCnDis',
            width: 189,
          },
        ],
        title2: this.$t('lang_sysform.promCloumns.title2'),
        searchText3: this.$t('lang_sysform.promCloumns.searchText3'),
       promCloumns: [
         {
           title: this.$t('lang_sysform.promCloumns.lanCode'),
           key: 'lanCode',
           sortable: 'custom',
           width: 253,
         },
         {
            title: this.$t('lang_sysform.promCloumns.lanCn'),
            key: 'lanCn',
            sortable: 'custom',
            width: 253,
          },
          {
            title: this.$t('lang_sysform.promCloumns.lanEn'),
            key: 'lanEn',
            sortable: 'custom',
            width: 253,
          },
        ],
        fieldParams: {
          _mt: 'platSformfield.getPage',
          sort: 'sffOrder',
          order: 'asc',
          rows: '10',
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
        },
         promParams: {
          _mt: 'baseLang.selectByBaseLangPageList',
          sort: 'lanCode',
          order: 'asc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          lanCode: 'cv_prompt',
          lanType: 'common',
        },
        mustParams: {
          _mt: 'baseLang.selectByBaseLangPageList',
          sort: 'lanCode',
          order: 'asc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          lanCode: 'cv_must',
          lanType: 'common',
        },
        ruleValidate: {
          sffvFieldname: [
            { required: true, message: this.$t('lang_sysform.Sffvalid.sffvPrommsg'), trigger: 'change' },
          ],
          sffvStyle: [
            { required: true, message: this.$t('lang_sysform.Sffvalid.sffvPrommsg'), trigger: 'change' },
          ],
          sffvIsmust: [
            { required: true, message: this.$t('lang_sysform.Sffvalid.sffvPrommsg'), trigger: 'change' },
          ],
          sffvMustmsg: [
            { required: true, message: this.$t('lang_sysform.Sffvalid.sffvPrommsg'), trigger: 'change' },
          ],
        },
      }
    },
    props: {
        logType: String,
    },
    components: {
      platSffieldPop,
      baseLangPop,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      openFiled() {
        const t = this
        t.fieldParams.sffForm = this.$store.state.sysData.mainId
        t.$refs.platSffieldPop.getData(t.fieldParams)
        t.openFNameList = true
      },
      openLang() {
        const t = this
        t.openFlag = '0'
        t.$refs.baseLangPop.getData(t.promParams)
        t.openPick = true
      },
      openLang2() {
        const t = this
        t.openFlag = '1'
        t.$refs.baseLangPop2.getData(t.mustParams)
        t.openPick2 = true
      },
      closeTable() {
        const t = this
        t.openFNameList = false
        t.openPick = false
        t.openPick2 = false
        t.openFlag == '0'
      },
      changeinput(name, code) {
        const t = this
        t.sffvFieldnameDis = name
        t.form.sffvFieldname = code
      },
      langchangeinput(name, code) {
        const t = this
        if (t.openFlag == '0') {
          t.sffvPrommsgDis = name
          t.form.sffvPrommsg = code
        }
        if (t.openFlag == '1') {
          t.sffvMustmsgDis = name
          t.form.sffvMustmsg = code
        }
      },
      clearpop1() {
          const t = this
          t.form.sffvFieldname = ''
          t.sffvFieldnameDis = ''
      },
      clearpop2() {
        const t = this
        t.form.sffvPrommsg = ''
        t.sffvPrommsgDis = ''
      },
      clearpop3() {
        const t = this
        t.form.sffvMustmsg = ''
        t.sffvMustmsgDis = ''
      },
      getFormData() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platSffvalid.getById',
          id: t.$store.state.sysData.childId2,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form.sffvFieldname = res.data.content[0].sffvFieldname
            t.sffvFieldnameDis = res.data.content[0].sffvFieldnameDis
            t.form.sffvStyle = res.data.content[0].sffvStyle
            t.sffvStyleDis = res.data.content[0].sffvStyleDis
            t.form.sffvValidvalue = res.data.content[0].sffvValidvalue
            t.form.sffvPrommsg = res.data.content[0].sffvPrommsg
            t.sffvPrommsgDis = res.data.content[0].sffvPrommsgDis
            t.form.sffvIsmust = res.data.content[0].sffvIsmust
            t.sffvIsmustDis = res.data.content[0].sffvIsmustDis
            t.form.sffvMustmsg = res.data.content[0].sffvMustmsg
            t.sffvMustmsgDis = res.data.content[0].sffvMustmsgDis
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
          typeCode: 'yesno,validmode',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.yesno = res.data.content[0].value[0].paramList
            t.sffValidType = res.data.content[0].value[1].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const data = deepCopy(t.form)
        if (!t.$store.state.sysData.childId2) {
          data.logType = '新增'
          data.sffvForm = t.$store.state.sysData.mainId
        } else {
          data.logType = '修改'
          data.sffvForm = t.$store.state.sysData.mainId
          data.id = t.$store.state.sysData.childId2
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.sysData.childId2) {
//            更新vuex中的mainId
                  t.$store.commit('sysData/childId2', res.data.content[0].id)
//            更新主表数据（无需重新加载）
                  t.$store.commit('sysData/addNewArrayChildTable2', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  //            更新主表数据（无需重新加载）
                  t.$store.commit('sysData/updateArrayChildTable2', res.data.content[0])
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
        t.form.sffvFieldname = ''
        t.sffvFieldnameDis = ''
        t.sffvStyleDis = ''
        t.form.sffvStyle = ''
        t.form.sffvValidvalue = ''
        t.form.sffvPrommsg = ''
        t.sffvPrommsgDis = ''
        t.form.sffvIsmust = ''
        t.sffvIsmustDis = ''
        t.form.sffvMustmsg = ''
        t.sffvMustmsgDis = ''
        t.$refs.form.resetFields()
      },
      close() {
        this.clear()
        this.$emit('hideMsg')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .box{
    height: 300px;
    overflow:hidden;
  .content{
    overflow-y: auto;
    position: absolute;
    height: 250px;
  }
  }
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
  .btn1{
    position: absolute;
    bottom: 20px;
    right: 96px;
  }
</style>
