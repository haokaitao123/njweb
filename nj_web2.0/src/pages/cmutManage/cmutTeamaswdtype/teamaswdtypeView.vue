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
          <FormItem :label="$t('lang_cmut.teamMapping.cmtmtpWdtype')" prop="cmtmtpWdtype">
             <span @dblclick="clearCmtmtpWdtype">
              <Input v-model="cmtmtpWdtypeName" icon="search" :readonly="true" :placeholder="$t('lang_cmut.teamMapping.p_cmtmtpWdtypeName')" @on-click="pickData01" />
            </span>
          </FormItem>
          </Col>
        <Col span="10" offset="1">
        <FormItem :label="$t('lang_cmut.teamMapping.cmtmtpTeam')" prop="cmtmtpTeam">
           <span @dblclick="clearCmtmtpTeam">
              <Input v-model="cmtmtpTeamName" icon="search" :readonly="true" :placeholder="$t('lang_cmut.teamMapping.p_cmtmtpTeam')" @on-click="pickData02" />
            </span>
        </FormItem>
        </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_cmut.teamMapping.cmtmtpTeammember')" prop="cmtmtpTeammember">
            <span @dblclick="clearCmtmtpTeamMember">
              <Input v-model="cmtmtpTeammemberName" icon="search" :readonly="true" :placeholder="$t('lang_cmut.teamMapping.cmtmtpTeammember')" @on-click="pickData03" />
            </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_cmut.teamMapping.cmtmtpComment')" prop="cmtmtpComment">
            <Input v-model="formValidate.cmtmtpComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_cmut.teamMapping.p_cmtmtpComment')"></Input>
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
      <searchKnowType v-show="openPick01" :searchTitle="searchTitle" :searchCloumns="searchCloumns01" :params="params01" @closeUp="close01" @changeinput="changeinput01" ref="searchKnowType"></searchKnowType>
    </transition>
    <transition name="fade">
      <searchKnowTeam v-show="openPick02" :searchTitle="searchTitle1" :searchText="searchText1" :searchCloumns="searchCloumns02" :params="params02" @closeUp="close02" @changeinput="changeinput02" ref="searchKnowTeam"></searchKnowTeam>
    </transition>
    <transition name="fade">
      <searchTeamMember v-show="openPick03" :searchtTitle="searchTitle2" :searchText="searchText2" :searchCloumns="searchCloumns03" :params="params03" :cmstmStid="formValidate.cmtmtpTeam" @closeUp="close03" @changeinput="changeinput03" ref="searchTeamMember"></searchTeamMember>
    </transition>
  </div>
</template>
<script>
  import searchKnowType from '../../../components/searchTable/searchKnowType'
  import searchKnowTeam from '../../../components/searchTable/searchKnowTeam'
  import searchTeamMember from '../../../components/searchTable/searchTeamMember'

  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        formValidate: {
          _mt: 'cmutTeamaswdtype.addOrUpd',
          funId: '1',
          cmtmtpWdtype: '',
          cmtmtpTeam: '',
          cmtmtpTeammember: '',
          cmtmtpComment: '',
        },
        openPick01: false,
        cmtmtpWdtypeName: '',
        searchTitle: this.$t('lang_cmut.searchKnowType.searchTitle'),
        params01: {
          _mt: 'cmutKnlType.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          data: '{}',
        },
        searchCloumns01: [
          {
            title: this.$t('lang_cmut.searchKnowType.cmutKntypeCode'),
            key: 'cmutKntypeCode',
            sortable: 'custom',
            width: 380,
          },
          {
            title: this.$t('lang_cmut.searchKnowType.cmutKntypeName'),
            key: 'cmutKntypeName',
            sortable: 'custom',
            width: 379,
          },
        ],
        openPick02: false,
        cmtmtpTeamName: '',
        searchTitle1: this.$t('lang_cmut.searchKnowTeam.searchTitle1'),
        searchText1: this.$t('lang_cmut.searchKnowTeam.searchText1'),
        params02: {
          _mt: 'cmutSupportteam.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          data: '{}',
        },
        searchCloumns02: [
          {
            title: this.$t('lang_cmut.searchKnowTeam.cmstTeamcode'),
            key: 'cmstTeamcode',
            sortable: 'custom',
            width: 380,
          },
          {
            title: this.$t('lang_cmut.searchKnowTeam.cmstTeamname'),
            key: 'cmstTeamname',
            sortable: 'custom',
            width: 379,
          },
        ],
        openPick03: false,
        cmtmtpTeammemberName: '',
        searchTitle2: this.$t('lang_cmut.searchTeamMember.searchTitle2'),
        searchText2: this.$t('lang_cmut.searchTeamMember.searchText2'),
        params03: {
          _mt: 'cmutSupteammember.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
          data: '{}',
        },
        searchCloumns03: [
          {
            title: this.$t('lang_cmut.searchTeamMember.cmstmCode'),
            key: 'cmstmCode',
            sortable: 'custom',
            width: 380,
          },
          {
            title: this.$t('lang_cmut.searchTeamMember.cmstmUseridDis'),
            key: 'cmstmUseridDis',
            sortable: 'custom',
            width: 379,
          },
        ],
        ruleValidate: {
          cmtmtpWdtype: [
            { required: true, message: this.$t('lang_cmut.teamMapping.cmtmtpWdtype'), trigger: 'blur' },
          ],
          cmtmtpTeam: [
            { required: true, message: this.$t('lang_cmut.teamMapping.cmtmtpTeam'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {
      searchKnowType,
      searchKnowTeam,
      searchTeamMember,
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
          _mt: 'cmutTeamaswdtype.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.cmtmtpWdtype = res.data.content[0].cmtmtpWdtype
            t.formValidate.cmtmtpTeam = res.data.content[0].cmtmtpTeam
            t.formValidate.cmtmtpTeammember = res.data.content[0].cmtmtpTeammember
            t.formValidate.cmtmtpComment = res.data.content[0].cmtmtpComment
            t.cmtmtpWdtypeName = res.data.content[0].cmtmtpWdtypeName
            t.cmtmtpTeamName = res.data.content[0].cmtmtpTeamName
            t.cmtmtpTeammemberName = res.data.content[0].cmtmtpTeammemberName
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
      handleReset() {
        this.$emit('closeUp')
        this.$refs.formValidate.resetFields()
      },
      close01() {
        const t = this
        t.openPick01 = false
      },
      close02() {
        const t = this
        t.openPick02 = false
      },
      close03() {
        const t = this
        t.openPick03 = false
      },
      changeinput01(name, id) {
        const t = this
        t.cmtmtpWdtypeName = name
        t.formValidate.cmtmtpWdtype = id
      },
      changeinput02(name, id) {
        const t = this
        t.cmtmtpTeamName = name
        t.formValidate.cmtmtpTeam = id
      },
      changeinput03(name, id) {
        const t = this
        t.cmtmtpTeammemberName = name
        t.formValidate.cmtmtpTeammember = id
      },
      pickData01() {
        const t = this
        t.$refs.searchKnowType.getData(this.params01)
        t.openPick01 = true
      },
      pickData02() {
        const t = this
        t.$refs.searchKnowTeam.getData(this.params02)
        t.openPick02 = true
      },
      pickData03() {
//        alert(this.searchTitle2)
        const t = this
        if (t.formValidate.cmtmtpTeam) {
          t.$refs.searchTeamMember.getData(this.params03)
          t.openPick03 = true
        } else {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('lang_cmut.teamMapping.reminder'),
          })
        }
      },
      clearCmtmtpWdtype() {
        const t = this
        t.cmtmtpWdtypeName = ''
        t.formValidate.cmtmtpWdtype = ''
      },
      clearCmtmtpTeam() {
        const t = this
        t.cmtmtpTeamName = ''
        t.formValidate.cmtmtpTeam = ''
      },
      clearCmtmtpTeamMember() {
        const t = this
        t.cmtmtpTeammemberName = ''
        t.formValidate.cmtmtpTeammember = ''
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
