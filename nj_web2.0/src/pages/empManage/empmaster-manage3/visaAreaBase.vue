<template>
    <div class="cover">
        <div class="box">
            <row>
                <i-col class="meau-left"
                       span="5">
                    <Menu :active-name="active"
                          width="auto"
                          @on-select="pageTo">
                        <!--主子表左侧页面布局-->
                        <MenuItem name="option">员工基础信息</MenuItem>
                        <MenuItem name="content"
                                  v-show="id">学历信息管理</MenuItem>
                        <MenuItem name="content1"
                                  v-show="id">合同信息管理</MenuItem>
                        <MenuItem name="content2"
                                  v-show="id">工作经历管理</MenuItem>
                        <MenuItem name="content3"
                                  v-show="id">家庭成员管理</MenuItem>
                    </Menu>
                </i-col>
                <i-col class="meau-right"
                       span="19">
                    <div class="title">
                        <div class="title-text">
                            <Icon type="mouse"
                                  size="16"
                                  style="margin-right: 10px;"></Icon>
                            {{logType}}
                        </div>
                        <Button type="text"
                                @click="handleReset">
                            <Icon type="close-round"
                                  size="16"></Icon>
                        </Button>
                    </div>
                    <div style="margin-top: 40px;padding: 10px;">
                        <!--主表详细信息页面 visaare为特殊参数一般不传 其余无需变更-->
                        <mOption v-show="option"
                                 :logType="logType"
                                 ref="option"
                                 :id="id"
                                 :index="index"
                                 :modity="modity"></mOption>
                        <!--子表分页页面 mainid为主表id-->
                        <!-- <mContent v-show="content" :logType="logType" ref="content" :mainId="id"></mContent>
            <mContent1 v-show="content1" :logType="logType" ref="content1" :mainId="id"></mContent1>
            <mContent2 v-show="content2" :logType="logType" ref="content2" :mainId="id"></mContent2>
            <mContent3 v-show="content3" :logType="logType" ref="content3" :mainId="id"></mContent3> -->
                    </div>
                </i-col>
            </row>
        </div>
    </div>
</template>
<script>
import empBaseInfo from "./empBaseInfo/empBaseInfo";
import empEducation from "./empEducation/empEducation";
import empContractInfo from "./empContractInfo/empContractInfo";
import empWorkExp from "./empWorkExp/empWorkExp";
import empFamily from "./empFamily/empFamily";

export default {
    data () {
        return {
            //        默认参数 无需变更
            active: "option",
            option: true,
            content: false,
            content1: false,
            content2: false,
            content3: false,
            //        主表查询单条数据的mt
            data: {
                _mt: "empEmpnh.getById"
            },
            id: this.Id
        };
    },
    components: {
        mOption,
        mContent,
        mContent1,
        mContent2,
        mContent3
    },
    props: {
        //      父页面传递参数  visaare一般不传
        Id: Number,
        logType: String,
        index: Number,
        modity: String
    },
    mounted () {
        console.log(this.modity, "modity")
    },
    methods: {
        //      关闭方法 分别调用本页面 父页面 主表详细信息页面 子表分页的清除方法  无需变更
        handleReset () {
            this.clear();
            this.$refs.option.clear();
            // this.$refs.content.clear();
            this.$emit("closeUp");
        },
        //      默认方法
        changeMenu () {
            this.active = "content";
        },
        // 主表信息查询方法 无需变更
        getOption (id, logType) {
            this.id = parseInt(id, 10);
            this.data.id = id;
            this.data.logType = logType;
            this.$refs.option.getdata(this.data);
        },
        //       根据name分别调用 主表或子表的查询方法 无需变更
        pageTo (name) {
            this.option = false;
            this.content = false;
            this.content1 = false;
            this.content2 = false;
            this.content3 = false;
            this.active = name;
            switch (name) {
                case "option":
                    this.title = "修改";
                    this.$refs.content.clear();
                    break;
                case "content":
                    this.title = "修改";
                    break;
                case "content1":
                    this.title = "修改";
                    this.$refs.content.clear();
                    break;
                case "content2":
                    this.title = "修改";
                    this.$refs.content.clear();
                    break;
                case "content3":
                    this.title = "修改";
                    this.$refs.content.clear();
                    break;
            }
            this[name] = true;
            if (name !== "option") {
                this.$refs[name].search();
            } else {
                this.getOption(this.id, this.$t("button.upd"));
            }
        },
        //      清空方法 初始化本页面参数 无需变更
        clear () {
            this.option = true;
            // this.content = false;
            // this.content1 = false;
            // this.content2 = false;
            // this.content3 = false;
            // this.id = NaN;
            // this.active = "option";
        },
        closeUp () {
            const t = this;
            t.option = false;
            t.$refs.option.form.numberCode = "XXXXXX";
            t.$refs.option.form.empnhName = "";
            t.$refs.option.form.empnhPtname = "";
            t.$refs.option.form.empnhNation = "";
            t.$refs.update.form.deptId = "";
            t.$refs.update.form.postId = "";
            t.$refs.update.form.empnhPmp = "";
            t.$refs.update.deptIdDis = "";
            t.$refs.update.postIdDis = "";
            t.$refs.update.empnhPmpDis = "";
            t.$refs.update.form.empnhIdtype = "";
            t.$refs.update.form.empnhIdno = "";
            t.$refs.update.form.empnhSday = "";
            t.$refs.update.form.empnhEday = "";
            t.$refs.update.form.empnhGender = "";
            t.$refs.update.form.empnhBirthdate = "";
            t.$refs.update.form.empnhMobile = "";
            t.$refs.update.form.empnhResiaddr = "";
            t.$refs.update.form.empnhRegtype = "";
            t.$refs.update.form.empnhRegaddr = "";
            t.$refs.update.form.empnhPersmail = "";
            t.$refs.update.form.empnhCompmail = "";
            t.$refs.update.form.empnhQq = "";
            t.$refs.update.form.empnhWechat = "";
            t.$refs.update.form.empnhWklocat = "";
            t.$refs.update.empnhWklocatDis = "";
            t.$refs.update.form.empnhEntrydate = "";
            t.$refs.update.form.empnhIrmentdate = "";
            t.$refs.update.form.empnhSalbank = "";
            t.$refs.update.empnhSalbankDis = "";
            t.$refs.update.form.empnhSalaccount = "";
            t.$refs.update.form.empnhSalaccname = "";
            t.$refs.update.form.empnhMarriage = "";
            t.$refs.update.form.empnhPolitical = "";
            t.$refs.update.form.empnhFirstwkdate = "";
            t.$refs.update.form.empnhTechtil = "";
            t.$refs.update.form.empnhTechspec = "";
            t.$refs.update.form.empnhTechdate = "";
            t.$refs.update.form.empnhAttendyn = "";
            t.$refs.update.form.note = "";
        }, //关闭窗口

    }
};
</script>
<style>
.ivu-menu-vertical.ivu-menu-light:after {
    background-color: transparent;
}
</style>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
.header-box {
    display: flex;
    position: relative;
    justify-content: flex-end;
}
.cover .box {
    padding: 0;
}
.cover .box .form {
    margin-top: 60px;
}
.meau-left {
    margin-top: 30px;
}
.meau-right {
    position: relative;
    border-left: 2px solid #efefef;
}
.header-cover {
    display: none;
    top: 0;
    right: 0;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 150px;
    height: 150px;
    background-color: rgba(0, 0, 0, 0.3);
}
.header-box:hover .header-cover {
    display: flex;
    justify-content: center;
    align-items: center;
}
.header-box:hover {
    cursor: pointer;
}
.header {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

