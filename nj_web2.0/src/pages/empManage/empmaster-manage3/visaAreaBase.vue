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
                        <MenuItem name="empBaseInfo">员工基础信息</MenuItem>
                        <MenuItem name="empEducation"
                                  v-show="id">学历信息管理</MenuItem>
                        <MenuItem name="empContractInfo"
                                  v-show="id">合同信息管理</MenuItem>
                        <MenuItem name="empWorkExp"
                                  v-show="id">工作经历管理</MenuItem>
                        <MenuItem name="empFamily"
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
                        <empBaseInfo v-show="empBaseInfo"
                                     :logType="logType"
                                     ref="empBaseInfo"
                                     :id="id"
                                     :index="index"
                                     :modity="modity"
                                     @update="update"
                                     @newdata="newdata"></empBaseInfo>
                        <!--子表分页页面 mainid为主表id-->
                        <empEducation v-show="empEducation"
                                      :logType="logType"
                                      ref="empEducation"
                                      :mainId="id"></empEducation>
                        <empContractInfo v-show="empContractInfo"
                                         :logType="logType"
                                         ref="empContractInfo"
                                         :mainId="id"></empContractInfo>
                        <empWorkExp v-show="empWorkExp"
                                    :logType="logType"
                                    ref="empWorkExp"
                                    :mainId="id"></empWorkExp>
                        <empFamily v-show="empFamily"
                                   :logType="logType"
                                   ref="empFamily"
                                   :mainId="id"></empFamily>
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
            active: "empBaseInfo",
            empBaseInfo: true,
            empEducation: false,
            empContractInfo: false,
            empWorkExp: false,
            empFamily: false,
            //        主表查询单条数据的mt
            data: {
                _mt: "empEmpnh.getById"
            },
            id: this.Id
        };
    },
    components: {
        empBaseInfo,
        empEducation,
        empContractInfo,
        empWorkExp,
        empFamily
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
            this.$refs.empBaseInfo.getdata(this.data);
            if (logType == "修改") {
                this.$refs.empBaseInfo.getSelect("nationtype");
                this.$refs.empBaseInfo.getSelect("idtype");
                this.$refs.empBaseInfo.getSelect("registerproperty");
                this.$refs.empBaseInfo.getSelect("marrystatus");
                this.$refs.empBaseInfo.getSelect("political");
                this.$refs.empBaseInfo.getSelect("techlevel");
                this.$refs.empBaseInfo.getSelect("gender");
                this.$refs.empBaseInfo.disabled = false
            } else {
                this.$refs.empBaseInfo.disabled = true
            }
        },
        //       根据name分别调用 主表或子表的查询方法 无需变更
        pageTo (name) {
            this.empBaseInfo = false;
            this.empEducation = false;
            this.empContractInfo = false;
            this.empWorkExp = false;
            this.empFamily = false;
            this.active = name;
            this.title = this.logType;
            this[name] = true;
            if (name !== "empBaseInfo") {
                this.$refs[name].search();
            } else {
                this.getOption(this.id, this.logType);
            }
        },
        //      清空方法 初始化本页面参数 无需变更
        clear () {
            this.empBaseInfo = true;
            this.empEducation = false;
            this.empContractInfo = false;
            this.empWorkExp = false;
            this.empFamily = false;
            this.id = NaN;
            this.active = "empBaseInfo";
            this.$refs.empBaseInfo.clear()
        },
        update (data) {
            this.$emit('getData')
        },
        newdata (data) {
            this.$emit('getData')
        },
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

