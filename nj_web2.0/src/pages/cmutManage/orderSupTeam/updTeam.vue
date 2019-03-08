<template>
  <div class="option-main">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_cmut.cmutTeam.cmstTeamcode')" prop="cmstTeamcode">
            <Input v-model="formValidate.cmstTeamcode" :placeholder="$t('lang_cmut.cmutTeam.p_cmstTeamcode')"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem :label="$t('lang_cmut.cmutTeam.cmstTeamname')" prop="cmstTeamname">
            <Input v-model="formValidate.cmstTeamname" :placeholder="$t('lang_cmut.cmutTeam.p_cmstTeamname')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem :label="$t('lang_cmut.cmutTeam.cmstWddistribute')" prop="cmstWddistribute">
            <Select  v-model="formValidate.cmstWddistribute">
              <Option :value="item.paramCode" v-for="(item,index) in orderType" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
<!--          <Col span="11" offset="1">
          <FormItem label="团队图标" prop="cmstPicture">
            <Input v-model="formValidate.cmstPicture" placeholder="选取团队图标"></Input>
          </FormItem>
          </Col>-->
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_cmut.cmutTeam.cmstComment')" prop="cmstComment">
            <Input v-model="formValidate.cmstComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_cmut.cmutTeam.p_cmstComment')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Button class="btn" type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
      </Form>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        orderType: [],
        formValidate: {
          _mt: 'cmutSupportteam.addOrUpd',
          funId: '1',
          cmstTeamcode: '',
          cmstTeamname: '',
          cmstWddistribute: '',
          cmstPicture: '',
          cmstComment: '',
        },
        ruleValidate: {
          cmstTeamcode: [
            { required: true, message: this.$t('lang_cmut.cmutTeam.rule_cmstTeamcode'), trigger: 'blur' },
          ],
          cmstTeamname: [
            { required: true, message: this.$t('lang_cmut.cmutTeam.rule_cmstTeamname'), trigger: 'blur' },
          ],
          cmstWddistribute: [
            { required: true, message: this.$t('lang_cmut.cmutTeam.rule_cmstWddistribute'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {
    },
    mounted() {
      this.getSelect()
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    methods: {
      getdata() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'cmutSupportteam.getById',
          funId: 1000,
          id: t.$store.state.orderTeam.mainId,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.cmstTeamcode = res.data.content[0].cmstTeamcode
            t.formValidate.cmstTeamname = res.data.content[0].cmstTeamname
            t.formValidate.cmstWddistribute = res.data.content[0].cmstWddistribute
            t.formValidate.cmstPicture = res.data.content[0].cmstPicture
            t.formValidate.cmstComment = res.data.content[0].cmstComment
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
        if (t.$store.state.orderTeam.mainId) {
          data.logType = '修改'
          data.id = t.$store.state.orderTeam.mainId
        } else {
          data.logType = '新增'
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.orderTeam.mainId) {
                  t.$store.commit('orderTeam/addNewArrayMainTable', res.data.content[0])
                  t.$store.commit('orderTeam/setMainId', res.data.content[0].id)
                  t.$store.commit('orderTeam/setTeamName', res.data.content[0].cmstTeamname)
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$store.commit('orderTeam/updateArrayMainTable', res.data.content[0])
                  t.$store.commit('orderTeam/setMainId', res.data.content[0].id)
                  t.$store.commit('orderTeam/setTeamName', res.data.content[0].cmstTeamname)
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                }
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
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'distributetype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.orderType = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      clear() {
        const t = this
        t.formValidate.cmstTeamcode = ''
        t.formValidate.cmstTeamname = ''
        t.formValidate.cmstWddistribute = ''
        t.formValidate.cmstComment = ''
        t.formValidate.cmstPicture = ''
        t.$refs.formValidate.resetFields()
      },
      close() {
        this.clear()
        this.$emit('hideMsg')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .option-main{
    position: relative;
    height: 500px;
    .btn{
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>

