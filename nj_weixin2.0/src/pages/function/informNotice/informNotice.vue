<!--通知公告-->
<template>
    <div class="informNotice">
        <div class="informNoticeWrap">
            <div class="header_tab">
                <div class="unread tabNav"
                     @click="tabNav">
                    <span :class="state?'activeColor':''">未读</span>
                    <img src="../../../../static/function/read.png"
                         v-if="state"
                         alt="">
                    <img src="../../../../static/function/unRead.png"
                         v-else="!state"
                         alt="">
                </div>
                <div class="read tabNav"
                     @click="tabNav">
                    <span :class="state?'':'activeColor'">已读</span>
                    <img src="../../../../static/function/unRead.png"
                         v-if="state"
                         alt="">
                    <img src="../../../../static/function/read.png"
                         v-if="!state"
                         alt="">
                </div>
            </div>
            <van-pull-refresh v-model="isLoading"
                              @refresh="onRefresh"
                              class="listWrap"
                              v-if="this.list.length!=0">
                <van-list v-model="loading"
                          :finished="finished"
                          finished-text="没有更多了"
                          @load="onLoad"
                          :offset="10">
                    <div class="informNoticeContent"
                         v-for="item in list">
                        <div class="info_item"
                             @click="goInformDetail(item.id)">
                            <div class="item_header">
                                <div class="item_title">{{item.noticeTitle}}</div>
                                <div class="item_date">{{item.noticePublish}}</div>
                            </div>
                            <div class="item_detail">
                                <span>详情</span>
                                <img src="../../../../static/function/left_arrow.png"
                                     alt="">
                            </div>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>
            <div class="noData_box"
                 v-else>
                <noData></noData>
            </div>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew } from '@/axios/axios'
import { isSuccess } from '@/lib/util'
import noData from '../../../components/public/noData'
export default {
    name: 'informNotice',
    data () {
        return {
            list: [],
            state: true,
            rows: 5,
            page: 1,
            sort: "id",
            order: 'desc',
            wxState: "01read",
            isLoading: false,   //是否处于下拉刷新状态
            loading: false,   //是否处于加载状态
            finished: false,  //是否已加载完所有数据
            totalPage: 0,
            recFlag: '',
        }
    },
    components: {
        noData
    },
    mounted () {
        this.getData();
    },
    methods: {
        tabNav () {
            if (this.state) {
                this.state = false;
                this.recFlag = 'read'
            } else {
                this.state = true;
                this.recFlag = ''
            }
            this.page = 1;
            this.isLoading = false;
            this.loading = false;
            this.finished = false;
            this.totalPage = 0;
            this.getData()
            // this.onRefresh();
        },
        goInformDetail (id) {
            this.$router.push({
                name: 'informDetails',
                query: {
                    id: id
                },
            })
        },
        async getData () {
            const t = this;
            const data = {
                _mt: 'wxOrgNotice.getPage',
                companyId: pubsource.companyId,
                userId: window.localStorage.getItem('uid'),
                rows: this.rows,
                page: this.page,
                sort: this.sort,
                order: this.order,
                recFlag: this.recFlag,
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value)
                    t.list = data.rows;
                    t.totalPage = data.total;
                    t.isLoading = false;
                    if (t.list.length >= data.records) {
                        t.finished = true;
                    }
                }
            }).catch((err) => {
                t.$notify({
                    message: '网络错误',
                    duration: 1500,
                    background: '#f44'
                });;
            }).finally(() => {
                t.$store.commit('hideLoading');
            });
        },
        //下拉刷新
        onRefresh () {
            const t = this
            setTimeout(() => {
                this.page = 1;
                this.isLoading = false;
                this.loading = false;
                this.finished = false;
                this.totalPage = 0;
                t.getData();
            }, 500);
        },
        //上拉加载
        onLoad () {
            const t = this;
            setTimeout(() => {
                const data = {
                    _mt: 'wxOrgNotice.getPage',
                    companyId: pubsource.companyId,
                    userId: window.localStorage.getItem('uid'),
                    rows: this.rows,
                    page: this.page + 1,
                    sort: this.sort,
                    order: this.order,
                    recFlag: this.recFlag,
                }
                getDataLevelUserLoginNew(data).then((res) => {
                    if (isSuccess(res, t)) {
                        let data = JSON.parse(res.data.content[0].value);
                        let list = data.rows;
                        t.totalPage = data.total;
                        t.list = t.list.concat(list);
                        t.loading = false;
                        t.page++;
                        if (t.page >= t.totalPage) {
                            t.finished = true;
                        }
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
            }, 500);
        }
    },
}
</script>
<style lang="less" type="text/less" scoped>
.informNotice {
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    .informNoticeWrap {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        background: #f6f6f6;
        flex-direction: column;
        .header_tab {
            width: 100%;
            background-color: #ffffff;
            display: flex;
            font-size: 34px;
            line-height: 90px;
            align-items: center;
            .tabNav {
                display: flex;
                align-items: center;
                flex: 1;
                justify-content: center;
                > span {
                    margin-right: 20px;
                }
                img {
                    width: 14px;
                    height: 10px;
                }
                .activeColor {
                    color: #ff9833;
                }
            }
        }
        .listWrap {
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 30px;
            .informNoticeContent {
                padding: 15px 30px 15px;
                .info_item {
                    background: #fff;
                    display: flex;
                    flex-direction: column;
                    .item_header {
                        padding: 45px 30px 35px;
                        position: relative;
                        .item_title {
                            font-size: 36px;
                            color: #333333;
                            line-height: 1.3;
                            margin-bottom: 35px;
                        }
                        .item_date {
                            font-size: 28px;
                            color: #999999;
                        }
                        &:after {
                            content: " ";
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            right: 0;
                            height: 0.013333rem;
                            border-top: 0.013333rem solid #d9d9d9;
                            color: #d9d9d9;
                            -webkit-transform-origin: 0 0;
                            transform-origin: 0 0;
                            -webkit-transform: scaleY(0.5);
                            transform: scaleY(0.5);
                        }
                    }
                    .item_detail {
                        padding: 25px;
                        display: flex;
                        justify-content: space-between;
                        > span {
                            font-size: 34px;
                            color: #333333;
                        }
                        img {
                            width: 20px;
                            height: 30px;
                        }
                    }
                }
            }
        }
        .noData_box {
            position: relative;
            margin-top: 15px;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
        }
    }
}
</style>
