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
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="11">
          <FormItem label="知识库类型编码" prop="platKntypeCode">
            <Input v-model="formValidate.platKntypeCode" placeholder="请输入知识库类型编码"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem label="知识库类型名称" prop="platKntypeName">
            <Input v-model="formValidate.platKntypeName" placeholder="请输入知识库类型名称"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem label="所属知识库类型" prop="platKntypePid">
            <span @dblclick="clear">
                <Input v-model="platKntypePidDis" icon="search" :readonly="true" placeholder="请选择所属知识库类型"  @on-click="pickData"/>
            </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem label="备注" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注..."></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset" style="margin-left: 8px">取消</Button>
              <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
    <transition name="fade">
      <searchTable v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="close" @changeinput="changeinput" ref="searchTable"></searchTable>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import searchTable from '../../../components/searchTable/searchTable'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        updateId: '',
        openPick: false,
        platKntypePidDis: '',
        formValidate: {
          _mt: 'platKnlType.addOrUpd',
          platKntypeCode: '',
          platKntypeName: '',
          platKntypePid: '',
          comment: '',
          funId: '1',
          companyId: '1',
        },
        searchCloumns: [
          {
            title: '知识库类型编码',
            key: 'platKntypeCode',
            sortable: 'custom',
            width: 253,
          },
          {
            title: '知识库类型名称',
            key: 'platKntypeName',
            sortable: 'custom',
            width: 253,
          },
        ],
        params: {
          _mt: 'platKnlType.getPage',
          sort: 'platKntypeCode',
          order: 'asc',
          rows: '10',
          page: '1',
          funId: '1',
          logType: this.$t('button.ser'),
        },
        ruleValidate: {
          platKntypeCode: [
            { required: true, message: '请填写知识库类型编码', trigger: 'blur' },
          ],
          platKntypeName: [
            { required: true, message: '请填写知识库类型名称', trigger: 'blur' },
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
    },
    methods: {
      getData(id) {
        const t = this
        t.updateId = id
        getDataLevelUserLogin({
          _mt: 'platKnlType.getById',
          id: id,
          funId: '1',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.platKntypeCode = res.data.content[0].platKntypeCode
            t.formValidate.platKntypeName = res.data.content[0].platKntypeName
            t.formValidate.platKntypePid = res.data.content[0].platKntypePid
            t.platKntypePidDis = res.data.content[0].platKntypePidDis
            t.formValidate.comment = res.data.content[0].comment
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
        t.platKntypePidDis = name
        t.formValidate.platKntypePid = code
      },
      clear() {
        const t = this
        t.formValidate.platKntypeCode = ''
        t.formValidate.platKntypeName = ''
        t.formValidate.platKntypePid = ''
        t.platKntypePidDis = ''
        t.formValidate.comment = ''
        this.$emit('closeUp')
        t.$refs.formValidate.resetFields()
      },
      close() {
        const t = this
        t.openPick = false
      },
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
