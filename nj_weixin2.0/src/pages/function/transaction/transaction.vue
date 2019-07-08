<template>
    <div class="transaction">
        <van-pull-refresh v-model="isLoading"
                          @refresh="onRefresh"
                          v-show="!noTransaction"
                          class="transactionWrap">
            <van-list v-model="loading"
                      :finished="finished"
                      :finished-text="finishedText"
                      @load="onLoad"
                      :offset="10">
                <div class="transactionItem"
                     @click="goTo(item.id)"
                     v-for="(item,index) in list">
                    <div class="item_left">
                        <span>异动员工：{{item.empName}}</span>
                        <span>异动类型：{{item.transTypeDis}}</span>
                        <span>异动日期：{{item.createTime}}</span>
                    </div>
                    <div class="item_right">
                        <span v-if="item.curStepDis">{{item.curStepDis}}</span>
                        <span v-else>已结束</span>
                        <span :class="item.curStepstate"
                              v-show="item.curStepDis">{{curStepstate[item.curStepstate]}}</span>

                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
        <noTransaction v-show="noTransaction"></noTransaction>
    </div>
</template>
<script>
import noTransaction from '@/components/public/noData'
import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '@/axios/axios'
import { isSuccess } from '@/lib/util'
export default {
    data () {
        return {
            list: [],
            loading: false,   //是否处于加载状态
            finished: false,  //是否已加载完所有数据
            isLoading: false,   //是否处于下拉刷新状态
            noTransaction: false,
            rows: 10,
            page: 1,
            sort: "id",
            order: 'desc',
            totalPage: 0,
            companyName: pubsource.companyName,
            finishedText: '',
            curStepstate: {
                'p_flowst_1': '待处理',
                'p_flowst_2': '处理中',
                'p_flowst_3': '已完成'
            }
        }
    },
    components: {
        noTransaction
    },
    mounted () {
    },
    methods: {
        goTo (id) {
            this.$router.push({ name: 'transactionDetails', query: { id: id } })
        },
        //上拉加载
        onLoad () {
            if (this.list.length > 0) {
                this.page++;
            }
            this.loading = true
            this.getData();
        },
        //下拉刷新
        onRefresh () {
            this.page = 1;
            this.isLoading = true
            this.getData();
        },
        async getData () {
            const t = this;
            const data = {
                _mt: 'wxPublicProcess.getPage',
                companyId: pubsource.companyId,
                rows: this.rows,
                page: this.page,
                sort: this.sort,
                order: this.order,
                userId: window.localStorage.getItem('uid'),
                tbName: 'emp_transtion',
            }
            await getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {//请求成功
                    let data = JSON.parse(res.data.content[0].value);
                    console.log(data, "t.contnet")
                    if (this.list.length > 0) {//当请求前有数据时 第n次请求
                        if (this.loading) {// 上拉加载
                            this.list = this.list.concat(data.rows) //上拉加载新数据添加到数组中
                            this.$nextTick(() => { //在下次 DOM 更新循环结束之后执行延迟回调
                                this.loading = false  //关闭上拉加载中
                            })
                            if (data.rows.length < this.rows) {//没有更多数据
                                this.finished = true   //上拉加载完毕
                                this.finishedText = '没有更多了';
                            }
                        }
                        if (this.isLoading) {//关闭下拉刷新
                            this.isLoading = false //关闭下拉刷新中
                            this.list = data.rows  //重新给数据赋值
                            if (this.finished) { //如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
                                this.finished = false
                            }
                        }
                    } else {//当请求没有数据时 第一次请求
                        this.list = data.rows
                        this.loading = false  //关闭上拉加载中
                    }
                }
                if (this.list.length === 0) {
                    this.noTransaction = true;
                    return;
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
<style lang="less" scoped>
.transaction {
    height: 100%;
    background: #f6f6f6;
    .transactionWrap {
        height: calc(~"100% - 110px");
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        background: #f6f6f6;
        flex-direction: column;
        .transactionItem {
            background: #fff;
            padding: 44px 30px;
            display: flex;
            margin-bottom: 17px;
            justify-content: space-between;
            .item_left {
                height: 100%;
                font-size: 30px;
                color: #333333;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                span {
                    margin-bottom: 20px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    b {
                        opacity: 0;
                    }
                }
            }
            .item_right {
                font-size: 30px;
                color: #cf2f32;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                .p_flowst_1 {
                    color: #339afe;
                }
                .p_flowst_2 {
                    color: green;
                }
                .p_flowst_3 {
                    color: red;
                }
                > span {
                    margin-bottom: 20px;
                }
                .close {
                    height: 36px;
                    width: 36px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
}
.addNew {
    position: fixed;
    bottom: 10%;
    right: 10%;
    .add {
        font-size: 76px;
        background-color: #339afe;
        width: 86px;
        height: 86px;
        border-radius: 50%;
        line-height: 86px;
        text-align: center;
        color: #fff;
    }
}
</style>
