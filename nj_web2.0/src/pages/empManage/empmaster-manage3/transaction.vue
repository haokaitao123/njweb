<template>
    <div class="cover">
        <div class="box"
             style="padding-bottom:20px;">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>&nbsp;异动
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;height: 150px;">
                <Form ref="formValidate"
                      :model="formValidate"
                      :rules="ruleValidate"
                      :label-width="120">
                    <Col span="11">
                    <FormItem label="异动后部门"
                              prop="deptId">
                        <span @dblclick="cleardeptId">
                            <Input v-model="unitFname"
                                   icon="search"
                                   :readonly="true"
                                   placeholder="请输入异动后部门"
                                   @on-click="pickDeptData" />
                        </span>
                    </FormItem>
                    </Col>
                    <Col span="11"
                         offset="1">
                    <FormItem label="异动后岗位"
                              prop="postId">
                        <span @dblclick="dbPost">
                            <Input placeholder="请选择异动后岗位"
                                   icon="search"
                                   :readonly="true"
                                   v-model="postFname"
                                   @on-click="pickPostData" />
                        </span>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem label="异动后直接上级"
                              prop="pmpId">
                        <span @dblclick="dbclean">
                            <Input v-model="pmpDis"
                                   icon="search"
                                   :readonly="true"
                                   placeholder="请选择异动后直接上级"
                                   @on-click="pickEmpData" />
                        </span>
                    </FormItem>
                    </Col>
                </Form>
            </div>
            <Button type="primary"
                    @click="handleSubmit"
                    style="float: right;">确定</Button>
        </div>
        <!--部门-->
        <transition name="fade">
            <searchDept v-show="openDeptPick"
                        :searchDeptClo="searchDeptCloumns"
                        :params="deptParams"
                        @closeDept="closeDept"
                        @inputDept="changeDeptInput"
                        ref="searchDept"></searchDept>
        </transition>
        <!--岗位-->
        <transition name="fade">
            <searchPost v-show="openPost"
                        @closePost="closePost"
                        :searchPostClo="searchPostClo"
                        @inputPost="inputPost"
                        :params="paramsPost"
                        ref="searchPost"></searchPost>
        </transition>
        <!--直接上級-->
        <transition name="fade">
            <searchEmpMaster v-show="openEmpMaster"
                             @closeEmp="closeEmp"
                             @inputEmp="inputEmp"
                             ref="searchEmpMaster"></searchEmpMaster>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '@/axios/axios';
import { isSuccess, deepCopy } from '@/lib/util';
import searchDept from '@/components/searchTable/searchDept';
import searchPost from '@/components/searchTable/searchPost';
import searchEmpMaster from '@/components/searchTable/searchEmpnhMaster'
export default {
    data () {
        return {
            formValidate: {
                _mt: "empEmpnh.batchTrans",
                deptId: "",
                postId: "",
                pmpId: "",
                funId: "1",
            },
            unitFname: "",
            postFname: "",
            pmpDis: "",
            loadingStatus: false,
            openDeptPick: false,
            openPost: false,
            openEmpMaster: false,
            //部门
            searchDeptCloumns: [
                {
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
            searchPostClo: [
                {
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
                    {
                        required: true,
                        message: "请选择部门",
                        trigger: "change"
                    }
                ],
                postId: [
                    {
                        required: true,
                        message: "请选择岗位",
                        trigger: "change"
                    }
                ],
                pmpId: [
                    {
                        required: true,
                        message: "请选择上级",
                        trigger: "change"
                    }
                ],
            }
        }
    },
    props: {
        id: Array,
        logType: String,
    },
    components: {
        searchDept,
        searchPost,
        searchEmpMaster,
    },
    methods: {
        handleSubmit () {
            const t = this;
            t.$refs.formValidate.validate((valid) => {
                if (valid) {
                    t.$Modal.confirm({
                        title: t.$t("reminder.remind"),
                        content: '是否确定异动',
                        onOk: () => {
                            const data = deepCopy(t.formValidate);
                            data.logType = t.logType;
                            data.ids = t.id.join();
                            getDataLevelUserLogin(data).then(res => {
                                if (isSuccess(res, t)) {
                                    t.$Message.success('异动成功');
                                    t.handleReset();
                                }
                            }).catch(() => {
                                t.$Message.error(t.$t("reminder.errormessage"));
                            });
                        },
                        onCancel: () => {

                        },
                    })
                }
            })
        },
        handleReset () {
            this.$emit('closeTransaction');
            this.$refs.formValidate.resetFields();
            this.pmpDis = '';
            this.formValidate.pmpId = '';
            this.postFname = '';
            this.formValidate.postId = '';
            this.unitFname = "";
            this.formValidate.deptId = "";
        },
        //部门
        cleardeptId () {
            this.unitFname = ''
            this.formValidate.deptId = ''
        },
        pickDeptData () {
            const paramsDept = deepCopy(this.deptParams)
            this.$refs.searchDept.getData(paramsDept)
            this.openDeptPick = true
        },
        closeDept () {
            this.$refs.searchDept.unitCode = ''
            this.openDeptPick = false
        },
        changeDeptInput (name, id) {
            this.unitFname = name
            this.formValidate.deptId = id
        },
        //岗位
        dbPost () {
            this.formValidate.postId = "";
            this.postFname = "";
        },
        pickPostData () {
            const paramsPost = deepCopy(this.paramsPost);
            this.$refs.searchPost.getData(paramsPost);
            this.openPost = true;
        },
        closePost () {
            this.$refs.searchPost.postCode = "";
            this.openPost = false;
        },
        inputPost (name, id) {
            this.postFname = name;
            this.formValidate.postId = id;
        },
        //选择上级
        pickEmpData () {
            this.$refs.searchEmpMaster.getData();
            this.openEmpMaster = true;
        },
        closeEmp () {
            this.openEmpMaster = false
        },
        inputEmp (row) {
            this.pmpDis = row.empnhName;
            this.formValidate.pmpId = row.id;
        },
        dbclean () {
            this.pmpDis = '';
            this.formValidate.pmpId = '';
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
</style>
