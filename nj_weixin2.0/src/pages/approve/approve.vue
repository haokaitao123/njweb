<template>
    <div class="approve">
        <noData v-show="list.length <= 0"
                class="noData_height"></noData>
        <van-pull-refresh v-model="isLoading"
                          @refresh="onRefresh">
            <van-row>
                <van-col span="24">
                    <div class="appItem"
                         v-for="(item,index) in list"
                         @click="goTo(item)">
                        <div class="title">{{item.title}}</div>
                        <div class="actionTimers"
                             v-if="item.dimReasonDis">
                            <span class="one">
                                离职原因：
                            </span>
                            <span class="tow">
                                {{item.dimReasonDis}}
                            </span>
                        </div>

                        <div class="tranDate"
                             v-if="item.deptIdpastDis">
                            <span class="timeTow">
                                {{item.createTime}}
                            </span>
                        </div>
                        <div class="tranDates"
                             v-if="item.dimReasonDis">
                            <span class="timeTow">
                                {{item.createTime}}
                            </span>
                        </div>
                        <div class="actionTimer"
                             v-if="item.deptIdpastDis">
                            <span class="one">
                                原部门:
                            </span>
                            <span class="tow">
                                {{item.deptIdpastDis}}
                            </span>
                        </div>
                        <div class="actionTimer"
                             v-if="item.deptIdnewDis">
                            <span class="one">
                                现部门:
                            </span>
                            <span class="tow">
                                {{item.deptIdnewDis}}
                            </span>
                        </div>
                        <div class="actionTimer"
                             v-if="item.postIdpastDis">
                            <span class="one">
                                原岗位:
                            </span>
                            <span class="tow">
                                {{item.postIdpastDis}}
                            </span>
                        </div>

                        <div class="actionTimer"
                             v-if="item.deptIdnewDis">
                            <span class="one">
                                现岗位:
                            </span>
                            <span class="tow">
                                {{item.postIdnewDis}}
                            </span>
                        </div>
                        <div class="endTimer">
                            <span class="one">
                                待审批
                            </span>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </van-pull-refresh>
    </div>

</template>

<script>
import {
    getDataLevelUserLogin
} from '@/axios/axios'
import { isSuccess } from '@/lib/util'
import noData from '@/components/public/noData'
export default {
    data () {
        return {
            list: [],
            isLoading: false,
        }
    },
    components: {
        noData
    },
    created () {
        this.getInfor()
    },
    methods: {
        goTo (item) {
            this.$router.push({
                name: 'apprInfo',
                query: {
                    item: item
                }
            })
        },
        getInfor () {
            console.log(window.localStorage.getItem('empId'))
            const t = this
            const data = {
                _mt: 'wxansrpttodo.getAllTodo',
                companyId: pubsource.companyId,
                empId: window.localStorage.getItem('empId')
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    console.log(res)
                    if (res.data.content[0].value) {
                        const listRes = JSON.parse(res.data.content[0].value, "123")
                        t.list = listRes
                    }
                    t.isLoading = false
                }
            }).catch(() => {
                t.$notify({
                    message: '网络错误',
                    duration: 1500,
                    background: '#f44'
                });
            }).finally(() => {
                t.$store.commit('hideLoading');
                console.log('123', this.list)
            })
        },
        //下拉刷新
        onRefresh () {
            this.page = 1;
            this.isLoading = true;
            this.getInfor()
        },
    },

}
</script>

<style lang="less" scoped>
.approve {
    background: #f6f6f6;
    height: 100%;
    box-sizing: border-box;
    overflow: -Scroll;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .noData_height {
        height: calc(~"100% - 110px");
    }
    .van-row {
        margin-top: 5px;
        height: 200px;

        .appItem {
            background: white;
            padding: 40px 30px;
            height: 100%;
            margin-bottom: 20px;
            overflow: hidden;
            .title {
                font-size: 33px;
            }
            .actionTimer {
                width: 49%;
                display: inline-block;
                margin-top: 30px;
                font-size: 30px;
                .one {
                    display: inline-block;
                }
                .tow {
                    display: inline-block;
                }
            }
            .actionTimers {
                margin-top: 30px;
                font-size: 30px;
                width: 100%;
                .one {
                    display: inline-block;
                }
                .tow {
                    display: inline-block;
                }
            }
            .tranDate {
                margin-top: -35px;
                float: right;
                font-size: 30px;
                display: inline-block;
                .timeOne {
                    font-weight: bold;
                    display: inline-block;
                }
                .timeTow {
                    display: inline-block;
                }
            }
            .tranDates {
                margin-top: -90px;
                float: right;
                font-size: 30px;
                color: gainsboro;
                display: inline-block;
                .timeTow {
                    display: inline-block;
                }
            }
            .endTimer {
                font-size: 20px;
                margin-top: 30px;
                .one {
                    font-size: 30px;
                    display: inline-block;
                    color: green;
                }
                .tow {
                    display: inline-block;
                }
            }
        }
    }
}
</style>