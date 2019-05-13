<template>
    <div class="search">
        <div class="searchWrap">
            <van-search v-model="empnhName"
                        placeholder="请输入搜索关键词"
                        show-action
                        shape="round"
                        @search="onSearch">
                <div slot="action"
                     @click="onSearch">搜索</div>
            </van-search>
            <van-pull-refresh v-model="isLoading"
                              @refresh="onRefresh"
                              class="listWrap">

                <van-list v-model="loading"
                          :finished="finished"
                          finished-text=""
                          @load="onLoad"
                          :offset="10">
                    <group label-align="left"
                           gutter="0"
                           class="form childForm">
                        <div class="item_box"
                             v-for="item in list">
                            <cell :value=item.empnhName
                                  :class="currentId ===item.empnhId?'active':'' "
                                  @click.native="changeCountry(item)"
                                  is-link>
                            </cell>
                        </div>
                    </group>
                </van-list>
            </van-pull-refresh>
            <!-- <div class="noData_box"
                 v-else>
                <noData></noData>
            </div> -->
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
import { Group, Cell, XInput, Popup, Search } from 'vux'
import noData from '../public/noData'
export default {
    data () {
        return {
            list: [],
            sort: 'id',
            order: 'asc',
            rows: 20,
            page: 1,
            isLoading: false,   //是否处于下拉刷新状态
            loading: false,   //是否处于加载状态
            finished: false,  //是否已加载完所有数据
            totalPage: 0,
            results: [],
            empnhName: ''
        }
    },
    components: {
        Group,
        Cell,
        XInput,
        noData,
        Search
    },
    props: {
        currentId: {
            type: String
        }
    },
    methods: {
        async getData () {
			const t = this;
            const data = {
				_mt: 'empEmpnh.getPage',
				sort: t.sort,
				order: t.order,
				rows: t.rows,
				page: t.page,
				state: '02empstate',
				companyId: pubsource.companyId,
				logType: '员工弹出框',
			}
			data.empnhName = t.empnhName
			for (const dat in data) {
				if (data[dat] === '') {
					delete data[dat]
				}
			}
            await getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {//请求成功
                    let data = res.data.content[0];
					console.log(data,"data")
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
            }).catch((err) => {
				this.isLoading = false;
				this.loading = false;
                t.$notify({
                	message: '网络错误',
                	duration: 1500,
                	background: '#f44'
                });
            }).finally(() => {
                t.$store.commit('hideLoading');
            });
        },
        //下拉刷新
        onRefresh () {
			this.page = 1;
			this.isLoading = true
			this.getData();
        },
        //上拉加载
        onLoad () {
			if (this.list.length > 0) {
			    this.page++;
			}
			this.loading = true
			this.getData();
        },
        //选中
        changeCountry (item) {
            this.$emit('inputEmp', item);
        },
        onSearch () {
			this.onRefresh()
        }
    },
}
</script>
<style lang="less">
.search {
    height: 100%;
    background: #f6f6f6;
    .searchWrap {
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        height: 100%;
        flex-direction: column;
        background: #f6f6f6;
        .save_button {
            padding: 46px 70px;
            .x_button {
                color: #fff;
                font-size: 34px;
            }
        }
        .listWrap {
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 30px;
            .childForm {
                .weui-cell__ft {
                    text-align: left;
                    width: 100% !important;
                }
                .active {
                    .weui-cell__ft {
                        color: #339afe;
                        &::after {
                            border-color: #339afe;
                        }
                    }
                }
            }
        }
    }
}
.van-search .van-cell {
    line-height: 50px;
}
.van-field__left-icon .van-icon,
.van-field__right-icon .van-icon {
    font-size: 38px;
}
.van-field__control {
    font-size: 28px;
}
.van-search__action {
    font-size: 28px;
}
</style>
