<template>
    <div class="interviewMes">
        <van-pull-refresh v-model="isLoading"
                          @refresh="onRefresh"
                          class="interviewMesWrap">
            <div class="interviewMesItem">
                <div class="item_code">
                    编号：{{list.relibQueue}}
                </div>
                <div class="item_peoples">
                    <label>等待面试人数：</label>
                    <span>{{list.relibNum}}人</span>
                </div>
                <div class="item_times">
                    <label>等待时间：</label>
                    <span>{{waitTime}}</span>
                </div>
            </div>
        </van-pull-refresh>
    </div>
</template>
<script>
import { getDataLevelUserLogin } from '@/axios/axios'
import { isSuccess } from '@/lib/util'
export default {
    data () {
        return {
            isLoading: false,   //是否处于下拉刷新状态
			list:'',
			waitTime:''
        }
    },
    mounted () {
        this.getData();
    },
    methods: {
        //下拉刷新
        onRefresh () {
            this.isLoading = true
            this.getData();
        },
        getData () {
            const t = this;
            const data = {
                _mt: 'wxRecruitProcess.getLineup',
                companyId: pubsource.companyId,
                userId: window.localStorage.getItem('uid'),
                id: this.$route.query.id
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {//请求成功
                    this.isLoading = false;
                    let data = JSON.parse(res.data.content[0].value);
					this.list = data;
					if(parseFloat(data.relibMin)-60<0){
						this.waitTime = data.relibMin+"分"
					}else{
						let hour = parseInt(data.relibMin / 60 % 24);
						let minute = parseInt(data.relibMin) -  hour*60;
						this.waitTime = hour+" 小时 "+ minute+" 分"
					}
                    console.log(data, "data");
                }
            }).catch((err) => {
                t.$notify({
					message: '网络错误',
					duration: 1500,
					background: '#f44'
				});
            }).finally(() => {
				this.isLoading = false;
                t.$store.commit('hideLoading');
            });
        },
    },
}
</script>
<style lang="less" scoped>
.interviewMes {
    height: 100%;
    background: #f6f6f6;
    .interviewMesWrap {
        height: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .interviewMesItem {
            background: #fff;
            padding: 30px 25px;
            display: flex;
            flex-direction: column;
            margin-bottom: 17px;
            .item_code {
                font-size: 32px;
                color: #333333;
                margin-bottom: 20px;
            }
            .item_peoples {
                font-size: 28px;
                color: #666666;
                display: flex;
                margin-bottom: 20px;
                span {
                    color: #ff6b00;
                }
            }
            .item_times {
                font-size: 28px;
                color: #666666;
                display: flex;
                span {
                    color: #ff6b00;
                }
            }
        }
    }
}
</style>
