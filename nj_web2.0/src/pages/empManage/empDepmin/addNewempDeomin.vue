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
          <!-- <Col span="10" offset="1">
          <FormItem label="岗位" prop="depPost">
                <span @dblclick="clearPid()">
                  <Input
                    v-model="depPostDis"
                    icon="search"
                    :readonly="true"
                    placeholder="请选择岗位"
                    @on-click="pickData()"
                  />
                </span>
          </FormItem>
          </Col> -->
          <Col span="11" offset="1">
                                <FormItem label="部门名称"
                                    prop="deptId">
                                    <span @dblclick="disabled?'':clearDeptId()">
                                        <Input v-model="unitFname"
                                        	  style="width: 100%"
                                            icon="search"
                                            :disabled="disabled"
                                            :readonly=true
                                            placeholder="请选择部门"
                                            @on-click="disabled?'':pickData2()" />
                                    </span>
                                </FormItem>
                            </Col>
          <Col span="10" offset="1">
          <FormItem label="最低押金" prop="depMoney">
            <Input v-model="formValidate.depMoney"
                         size="default"
                         style="width: 100%"
                         placeholder="请输入最低押金"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" offset="1">
            <FormItem
              label="押金补充时间"
              prop="depSdate"
            >
              <DatePicker
                type="date"
                placeholder="请选择押金补充时间"
                :editable="false"
                v-model="formValidate.depSdate"
                style="width: 100%;"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem
              label="补充结束时间"
              prop="depEdate"
            >
              <DatePicker
                type="date"
                placeholder="请选择补充结束时间"
                :editable="false"
                v-model="formValidate.depEdate"
                style="width: 100%;"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" offset="1">
          <FormItem label="低于最低扣款" prop="depPenalty">
            <Input v-model="formValidate.depPenalty"
                         size="default"
                         style="width: 100%"
                         placeholder="请输入低于最低扣款"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="22" offset="1">
          <FormItem label="备注" prop="note">
            <Input v-model="formValidate.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="22" offset="1">
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
        <searchOrgframe v-show="openPick2"
            :searchCloumns="searchCloumns2"
            :params="params2"
            @closeUp="close2"
            @changeinput="changeinput2"
            ref="searchOrgframe"></searchOrgframe>
    </transition>
    <!-- <transition name="fade">
      <searchOrgframe
        v-show="openPick"
        :searchPostClo="searchCloumns"
        :params="params"
        @inputPost="inputPost"
        @closePost="close"
        @changeinput="changeinput"
        ref="searchOrgframe"
      ></searchOrgframe>
    </transition> -->
  </div>
</template>
<script>
  import E from "wangeditor";
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  //import searchOrgframe from '../../../components/searchTable/searchPost'
  import valid from '../../../lib/pub_valid'
  import searchOrgframe from '../../../components/searchTable/searchOrgframe'

  export default {
    data() {
      const numberCheck = (rule, value, numberValCheck) => {
        if (value !== '' && value !== undefined) {
          if (valid.val_number103(value)) {
            return numberValCheck()
          }
          return numberValCheck(new Error(''))
        }
        numberValCheck()
      }
      const compareTime = (rule, value, callback) => {
        if (value === "" || !value) {
          callback(new Error("请选择押金补充时间"));
        } else {
          let startTimeNum = (new Date(this.formValidate.depSdate)).getTime();
          let endTimeNum = (new Date(this.formValidate.depEdate)).getTime();
          if (startTimeNum > endTimeNum) {
            callback(new Error('补充时间不能大于结束时间'))
          }
          callback()
        }
      }
      return {
           openPick2: false,
           unitFname:'',
           disabled: false,
        formValidate: {
          _mt: 'empDeposmin.addOrUpd',
          funId: '1',
          deptId:'',
          depPost: '',
          depPostDis:'',
          depMoney: '',
          depSdate: '',
          depEdate: '',
          depPenalty: '',
          note: '',
        },
        ruleValidate: {
            deptId: [
                 { required: true, message: '请选择部门', trigger: 'change' }
             ],
          depPost: [

            {
              required: true,
              message: "请选择岗位",
              trigger: "change"
            }
          ],
          depMoney: [
            { required: true,  validator:numberCheck, trigger: 'change', message: "请输入最低押金"}
          ],
          depSdate: [
            {
              required: true,
              type: "date",
              validator: compareTime,
              trigger: "change"
            }
          ],
          depEdate: [
            {
              required: true,
              type: "date",
              message: "请选择补充结束时间",
              trigger: "change"
            }
          ],
          depPenalty: [
            { required: true,  validator:numberCheck, trigger: 'change', message: "请输入低于最低扣款"}
          ],
        },
        depPostDis: '',
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
          rows: 20,
          page: '1',
          sort: 'id',
          order: 'desc',
          logType: '岗位',
        },
        params2: {
                _mt: 'orgUnits.getByOrgFramePageList',
                sort: 'id',
                order: 'desc',
                rows: 20,
                page: 1,
                logType: '组织架构查询',
                state:'02valid',
                unitType:'02dept',
        },
        searchCloumns2:[
                {
                    title: "组织编码",
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: "组织名称",
                    key: 'unitFname',
                },
                {
                    title: "组织类型",
                    key: 'unitTypeName',
                },
            ],
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
          _mt: 'empDeposmin.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
             t.formValidate.deptId = res.data.content[0].deptId
                t.unitFname = res.data.content[0].unitFname
            t.formValidate.depPost =res.data.content[0].depPost;
            t.depPostDis =res.data.content[0].depPostDis;
            t.formValidate.depMoney = res.data.content[0].depMoney
            t.formValidate.depSdate = res.data.content[0].depSdate
            t.formValidate.depEdate = res.data.content[0].depEdate
            t.formValidate.depPenalty = res.data.content[0].depPenalty
            t.formValidate.note = res.data.content[0].note
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      close2 () {
            const t = this
            t.openPick2 = false
        },
      pickData2 () {
                const t = this
                t.$refs.searchOrgframe.getData(t.params2)
                t.openPick2 = true
        },
         clearDeptId() {
                const t = this
                t.unitFname = ''
                t.formValidate.deptId = ''
        },
      changeinput2 (name, id, type) {
            const t = this
            t.unitFname = name
            t.formValidate.deptId = id
            t.type = type
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
            t.formValidate.depSdate = t.formValidate.depSdate.format(
              "yyyy-MM-dd"
            );
            t.formValidate.depEdate = t.formValidate.depEdate.format(
              "yyyy-MM-dd"
            );
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            if (t.logType === this.$t('button.upd')) {
              data.id = t.id
            }

            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                if (t.logType === this.$t('button.add')) {
                  t.$Message.success('新增成功')
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Message.success('修改成功')
                  t.$emit('update', res.data.content[0])
                }
                t.handleReset();
              }
            }).catch(() => {
              this.$Message.error('操作失败')
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
