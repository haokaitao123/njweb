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
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
          <Col span="11">
          <FormItem label="部门名称" prop="deptId">
						<span @dblclick="disabled?'':cleardeptId()">
                            <Input v-model="unitFname"
                                   icon="search"
                                   :disabled="disabled"
                                   :readonly="true"
                                   placeholder="选择部门"
                                   @on-click="disabled?'':pickDeptData()" />
                        </span>
          </FormItem>
          </Col>
          <Col span="11" offset="1">
          <FormItem label="岗位名称" prop="postId">
						<span @dblclick="disabled?'':dbPost()">
                            <Input placeholder="请选择岗位"
                                   icon="search"
                                   :readonly="true"
                                   :disabled='disabled'
                                   v-model="postFname"
                                   @on-click="disabled?'':selectPost()" />
                        </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem :label="$t('lang_organization.orgDeptpost.note')" prop="note">
            <Input v-model="formValidate.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_organization.orgcostcenter.commentDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <Row type="flex" justify="end">
            <FormItem>
              <Button type="ghost" @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
              <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
      <!--部门-->
      <transition name="fade">
        <searchDept v-show="openDeptPick" :searchDeptClo="searchDeptCloumns" :params="deptParams" @closeDept="closeDept" @inputDept="changeDeptInput" ref="searchDept"></searchDept>
      </transition>
      <!--岗位-->
      <transition name="fade">
        <searchPost v-show="openPost" @closePost="closePost" :searchPostClo="searchPostClo" @inputPost="inputPost" :params="paramsPost" ref="searchPost"></searchPost>
      </transition>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchDept from '@/components/searchTable/searchDept'
  import searchPost from '@/components/searchTable/searchPost';

  export default {
    data() {
      return {
        formValidate: {
          _mt: 'orgDeptpost.addOrUpd',
          funId: '1',
          deptId: '',
          postId: '',
          note: '',
        },
        openPick: false,
        unitFname: "", // 部门名称显示字段 弹框
        postFname: "", // 岗位名称显示字段  弹框
        openDeptPick: false,
        openPost: false,
        searchDeptCloumns: [{
          title: '部门编码',
          key: 'unitCode',
          sortable: 'custom',
        },
          {
            title: '部门名称',
            key: 'unitFname',
          },
        ],
        deptParams: {
          _mt: 'orgUnits.getByOrgFramePageList',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'desc',
          logType: '部门',
          state: '02valid'
        },
        //岗位
        searchPostClo: [{
          title: '岗位编码',
          key: "postCode",
          sortable: "custom"
        },
          {
            title: '岗位名称',
            key: "postFname"
          },
        ],
        paramsPost: {
          _mt: "orgPost.getPage",
          rows: 10,
          page: 1,
          sort: "id",
          order: "desc",
          funId: "1107",
          logType: "岗位",
          state: '02valid'
        },
        ruleValidate: {
          deptId: [
            { required: true, message:"请选择部门", trigger: 'change' },
          ],
          postId: [
            { required: true, message:"请选择岗位", trigger: 'change' },
          ],
        },
        disabled:false,
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    components: {
      searchDept,
      searchPost,
    },
    updated() {

    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt: 'orgDeptpost.getById',
          funId: 1,
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.deptId = res.data.content[0].deptId
            t.formValidate.postId = res.data.content[0].postId
            t.unitFname = res.data.content[0].unitFname
            t.postFname = res.data.content[0].postFname
            t.formValidate.note = res.data.content[0].note
          }
        }).catch(() => {
          t.$Message.error(this.$t('reminder.errormessage'))
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
                  t.$Message.success(this.$t('reminder.addsuccess'))
                  t.$refs.formValidate.resetFields()
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Message.success(this.$t('reminder.updsuccess'))
                  t.$emit('update', res.data.content[0])
                }
              }
            }).catch(() => {
              t.$Message.error(this.$t('reminder.errormessage'))
            })
          }
        })
      },
      handleReset() {
       this.clear()
      },
      clear() {
        const t = this;
        this.$refs.formValidate.resetFields();
        t.formValidate.deptId = '';
        t.formValidate.postId = '';
        t.formValidate.note = '';
        t.unitFname = '';
        t.postFname = '';
        t.disabled = false;
        t.$emit('closeUp')
      },
      //部门
      cleardeptId() {
        const t = this
        t.unitFname = ''
        t.formValidate.deptId = ''
      },
      pickDeptData() {
        const t = this
        const paramsDept = deepCopy(t.deptParams)
        t.$refs.searchDept.getData(paramsDept)
        t.openDeptPick = true
      },
      closeDept() {
        const t = this
        t.$refs.searchDept.unitCode = ''
        t.openDeptPick = false
      },
      changeDeptInput(name, id) {
        const t = this
        console.log(name, "name")
        t.unitFname = name
        t.formValidate.deptId = id
      },
      //岗位
      dbPost() {
        const t = this;
        t.formValidate.postId = "";
        t.postFname = "";
      },
      selectPost() {
        const t = this;
        const paramsPost = deepCopy(t.paramsPost);
        t.$refs.searchPost.getData(paramsPost);
        t.openPost = true;
      },
      closePost() {
        const t = this;
        t.$refs.searchPost.postCode = "";
        t.openPost = false;
      },
      inputPost(name, id, postName, postId) {
        const t = this;
        t.postFname = name;
        t.formValidate.postId = id;
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
