<template>
    <div class="attenMonthrevi">
        <van-pull-refresh v-model="isLoading"
                          @refresh="onRefresh"
                          class="attenMonthreviWrap"
                          v-if="list.length!=0">
            <!-- <van-list v-model="loading"
                      :finished="finished"
                      @load="onLoad"
                      :offset="10"> -->
            <div class="attenMonthreviItem"
                 @click="goTo('')">
                <div class="item_left">
                    <span>公&nbsp;&nbsp;&nbsp;&nbsp;司：湖北纳杰总公司</span>
                    <span>部&nbsp;&nbsp;&nbsp;&nbsp;门：{{list.unitFname}}</span>
                    <span>岗&nbsp;&nbsp;&nbsp;&nbsp;位：{{list.postFname}}</span>
                </div>
                <div class="item_right">
                    <span>待确认</span>
                </div>
            </div>
            <!-- </van-list> -->
        </van-pull-refresh>
        <noData v-else></noData>
    </div>
</template>
<script>
import { getDataLevelUserLogin } from '@/axios/axios'
import { isSuccess } from '@/lib/util'
import { mapState } from 'vuex'
import noData from '../../../components/public/noData'
export default {
    data () {
        return {
            list: [],
            loading: false,   //是否处于加载状态
            finished: false,  //是否已加载完所有数据
            isLoading: false,   //是否处于下拉刷新状态
        }
    },
    components: {
        noData
    },
    mounted () {
        this.getData();
    },
    methods: {
        goTo () {
            this.$router.push({
                name: 'attenMonthreviDetail'
            })
        },
        getData () {
            const t = this
            const data = {
                _mt: 'wxAttenMonthrevi.getAttenMonthreviByEmpId',
                companyId: pubsource.companyId,
                empId: localStorage.getItem('empId'),
                state: "01State"
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.list = JSON.parse(res.data.content[0].value);
                    console.log(t.list, "t.list ");
                    t.$store.commit('setAttenMonthrevi', t.list);
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
        //下拉刷新
        onRefresh () {
            const t = this
            setTimeout(() => {
                t.getData();
                t.isLoading = false;
            }, 500);
        },

    },
}
</script>
<style lang="less" scoped>
.attenMonthrevi {
    height: 100%;
    background: #f6f6f6;
    .attenMonthreviWrap {
        min-height: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        background: #f6f6f6;
        flex-direction: column;
        .attenMonthreviItem {
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
                }
            }
            .item_right {
                font-size: 30px;
                color: #ff6b00;
            }
        }
    }
}
</style>
