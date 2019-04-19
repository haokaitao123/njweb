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
                <span @dblclick="clearPida()">
                  <Input
                    v-model="procTypeDis"
                    icon="search"
                    :readonly="true"
                    placeholder="请选择流程类型"
                    @on-click="pickDataa()"
                  />
                </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem label="审批类型" prop="procAppr">
                <span @dblclick="clearPidb()">
                  <Input
                    v-model="procApprDis"
                    icon="search"
                    :readonly="true"
                    placeholder="请选择审批类型"
                    @on-click="pickDatab()"
                  />
                </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem label="审批步骤" prop="procStep">
                <span @dblclick="clearPidc()">
                  <Input
                    v-model="procStepDis"
                    icon="search"
                    :readonly="true"
                    placeholder="请选择审批步骤"
                    @on-click="pickDatac()"
                  />
                </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem label="操作类型" prop="procOper">
            <Select v-model="formValidate.procOper"
                    :disabled="editdisabled" class="width200"
                    placeholder="操作类型"
                    clearable>
              <Option :value="item.paramCode"
                      v-for="(item,index) in selprocOper"
                      :key="index"
                      @click="getPageByType(item.paramCode)">{{item.paramInfoName}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem label="操作人" prop="procUser">
                <span @dblclick="clearPidd()">
                  <Input
                    v-model="procUserDis"
                    icon="search"
                    :readonly="true"
                    placeholder="请选择操作人"
                    @on-click="pickDatad()"
                  />
                </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem label="操作岗" prop="procPost">
                <span @dblclick="clearPide()">
                  <Input
                    v-model="procPostDis"
                    icon="search"
                    :readonly="true"
                    placeholder="请选择操作岗"
                    @on-click="pickDatae()"
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
    <searchproAua
      v-show="openproaua"
      :searchObjname="searchObjnameaua"
      :params="paramsaua"
      @inputproType="inputproaua"
      @closeproType="closeaua"
      @changeinput="changeproaua"
      ref="searchproAua"
    ></searchproAua>
    </transition>
    <transition name="fade">
    <searchproAub
      v-show="openproaub"
      :searchObjname="searchObjnameaub"
      :params="paramsaub"
      @inputproType="inputproaub"
      @closeproType="closeaub"
      @changeinput="changeproaub"
      ref="searchproAub"
    ></searchproAub>
    </transition>
    <transition name="fade">
    <searchproAuc
      v-show="openproauc"
      :searchObjname="searchObjnameauc"
      :params="paramsauc"
      @inputproType="inputproauc"
      @closeproType="closeauc"
      @changeinput="changeproauc"
      ref="searchproAuc"
    ></searchproAuc>
    </transition>
    <transition name="fade">
    <searchproAud
      v-show="openproaud"
      :searchObjname="searchObjnameaud"
      :params="paramsaud"
      @inputproType="inputproaud"
      @closeproType="closeaud"
      @changeinput="changeproaud"
      ref="searchproAud"
    ></searchproAud>
    </transition>
    <transition name="fade">
    <searchproAue
      v-show="openproaue"
      :searchObjname="searchObjnameaue"
      :params="paramsaue"
      @inputproType="inputproaue"
      @closeproType="closeaue"
      @changeinput="changeproaue"
      ref="searchproAue"
    ></searchproAue>
    </transition>
  </div>
</template>
<script>
  import E from "wangeditor";
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchproAua from '../../../components/searchTable/searchProtype'
  import searchproAub from '../../../components/searchTable/searchProappr'
  import searchproAuc from '../../../components/searchTable/searchProstep'
  import searchproAud from '../../../components/searchTable/searchProuser'
  import searchproAue from '../../../components/searchTable/searchPropost'
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
          procType: [
            {
              required: true,
              message: "请选择流程类型",
              trigger: "change"
            }
          ],
          procAppr: [
            {
              required: true,
              message: "请选择审批类型",
              trigger: "change"
            }
          ],
          procStep: [
            {
              required: true,
              message: "请选择审批步骤",
              trigger: "change"
            }
          ],
          procOper: [
            {
              required: true,
              message: "请选择操作类型",
              trigger: "change"
            }
          ],
        },
        procTypeDis:'',
        procApprDis: '',
        procStepDis: '',
        procOperDis: '',
        procUserDis: '',
        procPostDis: '',
        openproaua: false,
        openproaub: false,
        openproauc: false,
        openproaud: false,
        openproaue: false,
        searchObjnameaua: [
          {
            title: "流程名称",
            key: "flowName",
            sortable: "custom",
          }
        ],
        searchObjnameaub: [
          {
            title: "审批类型",
            key: "aprvName",
            sortable: "custom",
          }
        ],
        searchObjnameauc: [
          {
            title: "审批步骤",
            key: "apstName",
            sortable: "custom",
          }
        ],
        searchObjnameaud: [
          {
            title: "操作人",
            key: "empnhName",
            sortable: "custom",
          },
          {
            title: "部门",
            key: "deptIdDis",
            sortable: "custom",
          },
          {
            title: "岗位",
            key: "postIdDis",
            sortable: "custom",
          }
        ],
        searchObjnameaue: [
          {
            title: "岗位编码",
            key: "postCode",
            sortable: "custom",
          },
          {
            title: "岗位名称",
            key: "postFname",
            sortable: "custom",
          }
        ],
        paramsaua: {
          _mt: 'platFlow.getPage',
          rows: '10',
          page: '1',
          sort: 'id',
          order: 'desc',
          logType: '流程',
        },
        paramsaub: {
          _mt: 'platApproval.getPage',
          rows: '10',
          page: '1',
          sort: 'id',
          order: 'desc',
          logType: '审批',
        },
        paramsauc: {
          _mt: 'platAprvstep.getByFlowId',
          rows: '10',
          page: '1',
          sort: 'id',
          order: 'desc',
          logType: '步骤',
        },
        paramsaud: {
          _mt: 'empEmpnh.getPage',
          rows: '10',
          page: '1',
          sort: 'id',
          order: 'desc',
          logType: '操作人',
        },
        paramsaue: {
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
      selprocOper: Array,
    },
    components: {
      searchproAua,
      searchproAub,
      searchproAuc,
      searchproAud,
      searchproAue
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
      inputproaua (name, id,) {
        const t = this
        t.formValidate.procType = id
        t.procTypeDis = name
        t.openproaua =false;
      },
      inputproaub (name, id,) {
        const t = this
        t.formValidate.procAppr = id
        t.procApprDis = name
        t.openproaub =false;
        t.procStepDis= "";
        t.formValidate.procStep = "";
      },
      inputproauc (name, id,) {
        const t = this
        t.formValidate.procStep = id
        t.procStepDis = name
        t.openproauc =false;
      },
      inputproaud (name, id,) {
        const t = this
        t.formValidate.procUser = id
        t.procUserDis = name
        t.openproaud =false;
      },
      inputproaue (name, id,) {
        const t = this
        t.formValidate.procPost = id
        t.procPostDis = name
        t.openproaue =false;
      },
      closeaua() {
        const t = this;
        t.openproaua =false;
      },
      closeaub() {
        const t = this;
        t.openproaub =false;
      },
      closeauc() {
        const t = this;
        t.openproauc =false;
      },
      closeaud() {
        const t = this;
        t.openproaud =false;
      },
      closeaue() {
        const t = this;
        t.openproaue =false;
      },
      changeproaua(name, id) {
        const t = this;
        t.procTypeDis = name;
        t.formValidate.procType = id;
        t.openproaua =false;
      },
      changeproaub(name, id) {
        const t = this;
        t.procApprDis = name;
        t.formValidate.procAppr = id;
        t.openproaub =false;
        t.procStepDis= "";
        t.formValidate.procStep = "";
      },
      changeproauc(name, id) {
        const t = this;
        t.procStepDis = name;
        t.formValidate.procStep = id;
        t.openproauc =false;
      },
      changeproaud(name, id) {
        const t = this;
        t.procUserDis = name;
        t.formValidate.procUser = id;
        t.openproaud =false;
      },
      changeproaue(name, id) {
        const t = this;
        t.procPostDis = name;
        t.formValidate.procPost = id;
        t.openproaue =false;
      },
      clearPida() {
        const t = this;
        t.procTypeDis= "";
        t.formValidate.procType = "";
      },
      clearPidb() {
        const t = this;
        t.procApprDis= "";
        t.formValidate.procAppr = "";
        t.procStepDis= "";
        t.formValidate.procStep = "";
      },
      clearPidc() {
        const t = this;
        t.procStepDis= "";
        t.formValidate.procStep = "";
      },
      clearPidd() {
        const t = this;
        t.procUserDis= "";
        t.formValidate.procUser = "";
      },
      clearPide() {
        const t = this;
        t.procPostDis= "";
        t.formValidate.procPost = "";
      },
      pickDataa() {
        const t = this;
        t.$refs.searchproAua.getData(this.paramsaua);
        t.openproaua = true;
      },
      pickDatab() {
        const t = this;
        t.$refs.searchproAub.getData(this.paramsaub);
        t.openproaub = true;
      },
      pickDatac() {
        const t = this;
        if(t.formValidate.procAppr===""){
          this.$Message.warning('请先选择审批类型')
          return;
        }
        t.$refs.searchproAuc.getData(this.paramsauc,t.formValidate.procAppr);
        t.openproauc = true;
      },
      pickDatad() {
        const t = this;
        t.$refs.searchproAud.getData(this.paramsaud);
        t.openproaud = true;
      },
      pickDatae() {
        const t = this;
        t.$refs.searchproAue.getData(this.paramsaue);
        t.openproaue = true;
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
        t.procTypeDis = '';
        t.procApprDis = '';
        t.procStepDis = '';
        t.procUserDis = '';
        t.procPostDis = '';
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
