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
          <FormItem label="流程类型" prop="procType">
                <span @dblclick="clearPid()">
                  <Input
                    v-model="procTypeDis"
                    icon="search"
                    :readonly="true"
                    placeholder="请选择流程类型"
                    @on-click="pickData()"
                  />
                </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem label="审批类型" prop="procAppr">
                <span @dblclick="clearPid()">
                  <Input
                    v-model="procApprDis"
                    icon="search"
                    :readonly="true"
                    placeholder="请选择审批类型"
                    @on-click="pickData()"
                  />
                </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem label="审批步骤" prop="procStep">
                <span @dblclick="clearPid()">
                  <Input
                    v-model="procStepDis"
                    icon="search"
                    :readonly="true"
                    placeholder="请选择审批步骤"
                    @on-click="pickData()"
                  />
                </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem label="操作类型" prop="procOper">
                <span @dblclick="clearPid()">
                  <Input
                    v-model="procOperDis"
                    icon="search"
                    :readonly="true"
                    placeholder="请选择操作类型"
                    @on-click="pickData()"
                  />
                </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem label="操作人" prop="procUser">
                <span @dblclick="clearPid()">
                  <Input
                    v-model="procUserDis"
                    icon="search"
                    :readonly="true"
                    placeholder="请选择操作人"
                    @on-click="pickData()"
                  />
                </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem label="操作岗" prop="procPost">
                <span @dblclick="clearPid()">
                  <Input
                    v-model="procPostDis"
                    icon="search"
                    :readonly="true"
                    placeholder="请选择操作岗"
                    @on-click="pickData()"
                  />
                </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem label="备注" prop="note">
            <Input v-model="formValidate.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>
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
      <searchOrgframe
        v-show="openPick"
        :searchPostClo="searchCloumns"
        :params="params"
        @inputPost="inputPost"
        @closePost="close"
        @changeinput="changeinput"
        ref="searchOrgframe"
      ></searchOrgframe>
    </transition>
  </div>
</template>
<script>
  import E from "wangeditor";
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchOrgframe from '../../../components/searchTable/searchPost'
  import valid from '../../../lib/pub_valid'

  export default {
    data() {
      return {
        formValidate: {
          _mt: 'baseProcus.addOrUpd',
          funId: '1',
          procType: '',
          procTypeDis:'',
          procAppr: '',
          procApprDis: '',
          procStep: '',
          procStepDis: '',
          procOper: '',
          procOperDis: '',
          procUser: '',
          procUserDis: '',
          procPost: '',
          procPostDis: '',
          note: '',
        },
        ruleValidate: {
          procAppr: [
            {
              required: true,
              message: "请选择审批类型",
              trigger: "change"
            }
          ],
        },
        procApprDis: '',
        openPick: false,
        searchCloumns: [
          {
            title: "岗位编码",
            key: "postCode",
            sortable: "custom",
            sortable: 'custom',
          },
          {
            title: "岗位名称",
            key: "postFname",
            sortable: 'custom',
          }
        ],
        params: {
          _mt: 'orgPost.getPage',
          rows: '10',
          page: '1',
          sort: 'id',
          order: 'desc',
          logType: '岗位',
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    components: {
      searchOrgframe
    },
    updated() {

    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseProcus.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.procType =res.data.content[0].procType;
            t.procTypeDis =res.data.content[0].procTypeDis;
            t.formValidate.procAppr =res.data.content[0].procAppr;
            t.procApprDis =res.data.content[0].procApprDis;
            t.formValidate.procStep =res.data.content[0].procStep;
            t.procStepDis =res.data.content[0].procStepDis;
            t.formValidate.procOper =res.data.content[0].procOper;
            t.procOperDis =res.data.content[0].procOperDis;
            t.formValidate.procUser =res.data.content[0].procUser;
            t.procUserDis =res.data.content[0].procUserDis;
            t.formValidate.procPost =res.data.content[0].procPost;
            t.procPostDis =res.data.content[0].procPostDis;
            t.formValidate.note = res.data.content[0].note
          }
        }).catch(() => {
          this.$Message.error(this.$t('reminder.errormessage'))
        })
      },
      clearPid() {
        const t = this;
        t.depPostDis= "";
        t.formValidate.depPost = "";
      },//清除数据
      close() {
        const t = this;
        t.openPick =false;
      },//关闭弹窗
      pickData() {
        const t = this;
        t.$refs.searchOrgframe.getData(this.params);
        t.openPick = true;

      },//打开弹窗
      changeinput(name, id) {
        const t = this;
        t.depPostDis = name;
        t.formValidate.depPost = id;
        t.openPick =false;
      },//选择岗位事件
      inputPost (name, id, postName, postId) {
        const t = this
        t.formValidate.depPost = id
        t.depPostDis = name
        t.openPick =false;
      },
      handleSubmit() {
        const t = this
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            if (t.logType === this.$t('button.upd')) {
              data.id = t.id
            }

            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                if (t.logType === this.$t('button.add')) {
                  t.$Message.success(this.$t('reminder.addsuccess'))
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Message.success(this.$t('reminder.updsuccess'))
                  t.$emit('update', res.data.content[0])
                }
                t.handleReset();
              }
            }).catch(() => {
              this.$Message.error(this.$t('reminder.errormessage'))
            })
          }
        })
      },
      handleReset() {
        const t = this;
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
        t.depPostDis = '';
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
