<template>
    <div class="transactionDetails">
        <div class="transactionDetailsWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 员工姓名 -->
                <div class="item_box">
                    <x-input title="员工姓名<span>*</span>"
                             v-model="empName"
                             :show-clear="false"
                             disabled="disabled"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 证件号码 -->
                <div class="item_box">
                    <x-input title="证件号码"
                             v-model="empIdno"
                             placeholder="暂无数据"
                             disabled="disabled">
                    </x-input>
                </div>
                <!-- 原部门 -->
                <div class="item_box">
                    <x-input title="原部门名称"
                             v-model="deptIdpastDis"
                             disabled="disabled"
                             placeholder="暂无数据">
                    </x-input>
                </div>
                <!-- 原岗位 -->
                <div class="item_box">
                    <x-input title="原岗位名称"
                             v-model="postIdpastDis"
                             disabled="disabled"
                             placeholder="暂无数据">
                    </x-input>
                </div>
                <!-- 原直接领导 -->
                <div class="item_box">
                    <x-input title="原直接领导"
                             v-model="transPastleaderDis"
                             disabled="disabled"
                             placeholder="暂无数据">
                    </x-input>
                </div>
                <!-- 异动日期 -->
                <div class="item_box">
                    <x-input title="异动日期<span>*</span>"
                             v-model="transDate"
                             disabled="disabled"
                             placeholder="暂无数据">
                    </x-input>
                </div>
                <!-- 是否跨公司 -->
                <div class="item_box">
                    <x-input title="是否跨公司<span>*</span>"
                             v-model="transCroscompDis"
                             disabled="disabled"
                             placeholder="暂无数据">
                    </x-input>
                </div>
                <!-- 是否跨部门 -->
                <div class="item_box">
                    <x-input title="是否跨部门<span>*</span>"
                             v-model="transCrospartDis"
                             disabled="disabled"
                             placeholder="暂无数据">
                    </x-input>
                </div>
                <!-- 是否签订补充协议 -->
                <div class="item_box">
                    <x-input title="是否签订补充协议<span>*</span>"
                             v-model="transSignproDis"
                             disabled="disabled"
                             placeholder="暂无数据">
                    </x-input>
                </div>
                <!-- 异动类型 -->
                <div class="item_box">
                    <x-input title="异动类型<span>*</span>"
                             v-model="transTypeDis"
                             disabled="disabled"
                             placeholder="暂无数据">
                    </x-input>
                </div>
                <!-- 现部门 -->
                <div class="item_box">
                    <x-input title="现部门名称<span>*</span>"
                             v-model="deptIdnewDis"
                             disabled="disabled"
                             placeholder="暂无数据">
                    </x-input>
                </div>
                <!-- 现岗位 -->
                <div class="item_box">
                    <x-input title="现岗位名称<span>*</span>"
                             v-model="postIdnewDis"
                             disabled="disabled"
                             placeholder="暂无数据">
                    </x-input>
                </div>
                <!-- 现直接领导 -->
                <div class="item_box">
                    <x-input title="现直接领导<span>*</span>"
                             v-model="transNewleaderDis"
                             disabled="disabled"
                             placeholder="暂无数据">
                    </x-input>
                </div>
                <!-- 岗位资料是否移交 -->
                <div class="item_box">
                    <x-input title="岗位资料是否移交<span>*</span>"
                             v-model="transPostinfoDis"
                             disabled="disabled"
                             placeholder="暂无数据">
                    </x-input>
                </div>
            </group>
        </div>
    </div>
</template>
<script>
import {
    getDataLevelUserLogin,
    getDataLevelUserLoginEmpId
} from '@/axios/axios'
import {
    isSuccess,
    deepCopy
} from '@/lib/util'
import {
    Group,
    Cell,
    XInput,
    XTextarea,
    Icon
} from 'vux'
export default {
    data () {
        return {
            empName: "",
            empIdno: "",
            deptIdpastDis: "",
            postIdpastDis: "",
            transPastleaderDis: "",
            transDate: "",
            transCroscompDis: "",
            transCrospartDis: "",
            transSignproDis: "",
            transTypeDis: "",
            deptIdnewDis: "",
            postIdnewDis: "",
            transNewleaderDis: "",
            transPostinfoDis: "",
        }
    },
    components: {
        Group,
        Cell,
        XInput,
        Icon,
        XTextarea,
    },
    mounted () {
        this.getData();
    },
    methods: {
        //获取详情
        getData () {
            const t = this;
            if (this.$route.query.id === undefined) {
                return;
            }
            const data = {
                _mt: 'wxPublicProcess.getById',
                companyId: pubsource.companyId,
                id: this.$route.query.id,
                tbName: 'emp_transtion',
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    console.log(data, "t.content ");
                    t.empName = data.empName ? data.empName : "";
                    t.empIdno = data.empIdno ? data.empIdno : "";
                    t.deptIdpastDis = data.deptIdpastDis ? data.deptIdpastDis : "";
                    t.postIdpastDis = data.postIdpastDis ? data.postIdpastDis : "";
                    t.transPastleaderDis = data.transPastleaderDis ? data.transPastleaderDis : "";
                    t.transDate = data.transDate ? data.transDate : "";
                    t.transCroscompDis = data.transCroscompDis ? data.transCroscompDis : "";
                    t.transCrospartDis = data.transCrospartDis ? data.transCrospartDis : "";
                    t.transSignproDis = data.transSignproDis ? data.transSignproDis : "";
                    t.transTypeDis = data.transTypeDis ? data.transTypeDis : "";
                    t.deptIdnewDis = data.deptIdnewDis ? data.deptIdnewDis : "";
                    t.postIdnewDis = data.postIdnewDis ? data.postIdnewDis : "";
                    t.transNewleaderDis = data.transNewleaderDis ? data.transNewleaderDis : "";
                    t.transPostinfoDis = data.transPostinfoDis ? data.transPostinfoDis : "";


                }
            }).catch((err) => {
                t.$notify({
                    message: '网络错误',
                    duration: 1500,
                    background: '#f44'
                });
            }).finally(() => {
                t.$store.commit('hideLoading');
            });
        },
    },
}
</script>
<style lang="less">
.transactionDetails {
    height: calc(~"100% - 100px");
    background: #f6f6f6;

    .transactionDetailsWrap {
        height: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        background: #f6f6f6;
        flex-direction: column;
        // margin-bottom: 100px;
        .save_button {
            padding: 125px 54px 50px;
            display: flex;
            margin-bottom: 100px;
            .x_button {
                color: #fff;
                font-size: 34px;
                width: 300px;
                flex: 1;
                height: 80px;
            }

            .button_left {
                color: #339afe;
                background: #fff;
                border: 2px solid #339afe !important;
                margin-right: 5%;
            }

            .weui-btn + .weui-btn {
                margin-top: 0;
            }
        }
        .file {
            display: flex;
            padding: 0px 36px 0px 30px;
            align-items: center;
            > label {
                width: 220px !important;
                font-size: 28px;
                padding-right: 15px;
                color: #333333;
                span {
                    color: red;
                    display: inline-block;
                }
            }
            .file_box {
                flex: 1;
                text-align: left;
                padding: 30px 0;
                font-size: 28px;
                color: #333333;
                line-height: 1.3;
                justify-content: flex-end;
                display: flex;
                > p[disabled] {
                    color: #888;
                }
                .upload {
                    width: 250px;
                    height: 170px;
                    border: 1px dashed #d9d9d9;
                    font-size: 60px;
                    color: #ccc;
                    text-align: center;
                    line-height: 170px;
                    position: relative;
                    > input {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 250px;
                        height: 170px;
                        opacity: 0;
                    }
                }
                .fileName {
                    word-break: break-all;
                }
            }
            .justify {
                justify-content: flex-start;
            }
        }
    }
}

.van-popup--right {
    top: 50% !important;
}

.right_popup {
    width: 85%;
    height: 100%;
}
</style>
