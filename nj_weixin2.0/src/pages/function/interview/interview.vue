<template>
    <div class="interview">
        <van-pull-refresh v-model="isLoading"
                          @refresh="onRefresh"
                          class="interviewWrap"
                          v-show="!addNewInterview">
            <van-list v-model="loading"
                      :finished="finished"
                      :finished-text="finishedText"
                      @load="onLoad"
                      :offset="10">
                <div class="interviewItem"
                     v-for="(item,index) in list"
                     @click="goTo(item.id,item.curStepCode,item.curStepstate)">
                    <div class="interview_item item_first">
                        <h3>{{item.relibName}}</h3>
                        <span>{{item.curStepDis}}</span>
                    </div>
                    <div class="interview_item item_second">
                        <div class="item_left">
                            <img src="../../../../static/function/telephone.png"
                                 alt="">
                            <span>{{item.relibMobile}}</span>
                        </div>
                        <div class="item_right">
                            <span>{{new Date(item.relibFilldate.replace(/\-/g, '/')).format('MM月dd日')}}</span>
                            <span>{{new Date(item.relibFilldate.replace(/\-/g, '/')).format('hh:mm:ss')}}</span>
                        </div>
                    </div>

                    <div class="interview_item">
                        <span class="curStepstate"
                              :class="item.curStepstate">{{curStepstate[item.curStepstate]}}</span>
                    </div>
                    <div class="interview_item"
                         v-if="item.curStepCode==='flow_recruitprocess_1000'&&item.curStepstate==='p_flowst_3'">
                        <label for="">初试结果：</label>
                        <span class="option">{{item.relibFirstopin}}</span>
                    </div>
                    <div class="interview_item"
                         v-if="item.curStepCode!=='flow_recruitprocess_1000'&&item.curStepCode!=='flow_recruitprocess_1010'">
                        <label for="">复试结果：</label>
                        <span class="option">{{item.relibCheckopin&&item.relibCheckopin!==''?item.relibCheckopin:'无'}}</span>
                    </div>
                    <div class="button_box">
                        <button type="button"
                                @click="getQrCode($event,item.id)"
                                v-if="item.curStepCode==='flow_recruitprocess_1000'&&item.curStepstate!=='p_flowst_3'">预约二维码</button>
                        <button type="button"
                                v-if="item.curStepstate!=='p_flowst_3'&&item.curStepCode==='flow_recruitprocess_1000'"
                                @click="submit($event,item.id)">查看</button>
                        <button type="button"
                                v-else-if="item.curStepCode==='flow_recruitprocess_1010'&&item.curStepstate!=='p_flowst_3'"
                                @click="interviewMes($event,item.id)">预约信息</button>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
        <div class="qrCodeContent"
             v-show="show">
            <canvas id="canvas"
                    style="height:600px;width:300px"></canvas>
        </div>
        <div id="mask"
             @click="closeQrCode"
             v-show="maskShow"> </div>
        <div class="addNew"
             v-show="!addNewInterview">
            <span class="add"
                  @click="goTo()">
                +
            </span>
        </div>
        <div class="interviewMes"
             v-show="interviewMesShow">
            <div class="interviewMesItem">
                <div class="item_code">
                    编号：{{interviewMesList.relibQueue}}
                </div>
                <div class="item_peoples">
                    <label>等待面试人数：</label>
                    <span>{{interviewMesList.relibNum}}人</span>
                </div>
                <div class="item_times">
                    <label>等待时间：</label>
                    <span>{{waitTime}}</span>
                </div>
            </div>
        </div>
        <addNewInterview v-show="addNewInterview"
                         :btnName='btnName'
                         @addNew="goTo()"></addNewInterview>
    </div>
</template>
<script>
import QRCode from 'qrcode'
import {
    getDataLevelUserLogin
} from '@/axios/axios'
import {
    isSuccess
} from '@/lib/util'
import addNewInterview from '@/components/public/addNew'
export default {
    data () {
        return {
            list: [],
            loading: false, //是否处于加载状态
            finished: false, //是否已加载完所有数据
            isLoading: false, //是否处于下拉刷新状态
            rows: 10,
            page: 1,
            sort: "id",
            order: 'desc',
            totalPage: 0,
            finishedText: '',
            show: false,
            addNewInterview: false,
            btnName: '添加预约',
            waitTime: '',
            interviewMesShow: false,
            maskShow: false,
            interviewMesList: [],
            curStepstate: {
                'p_flowst_3': '已完成',
                'p_flowst_2': '处理中',
                'p_flowst_1': '待处理',
            },
        }
    },
    components: {
        QRCode: QRCode,
        addNewInterview
    },
    methods: {
        goTo (id, curStepCode, curStepstate) {
            let curStep = false;
            if (curStepCode && curStepstate) {
                if (curStepCode === 'flow_recruitprocess_1000' && curStepstate !== 'p_flowst_3') {
                    curStep = false;
                } else {
                    curStep = true;
                }
            }
            this.$router.push({
                name: 'addInterview',
                query: {
                    id: id,
                    curStep: curStep,
                    curStepCode: curStepCode,
                    curStepstate: curStepstate
                }
            })
        },
        //提交
        submit (e, id) {
            e.stopPropagation();
            this.$router.push({
                name: 'interviewOpinion',
                query: {
                    id: id
                }
            })
        },
        //预约信息
        interviewMes (e, id) {
            e.stopPropagation();
            // this.$router.push({
            // 	name: 'interviewMes',
            // 	query: {
            // 		id: id
            // 	}
            // })
            const t = this;
            const data = {
                _mt: 'wxRecruitProcess.getLineup',
                companyId: pubsource.companyId,
                userId: window.localStorage.getItem('uid'),
                id: id
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {//请求成功
                    this.isLoading = false;
                    let data = JSON.parse(res.data.content[0].value);
                    this.interviewMesList = data;
                    if (parseInt(data.relibMin) - 60 < 0) {
                        this.waitTime = data.relibMin + "分"
                    } else {
                        let hour = parseInt(data.relibMin / 60 % 24);
                        let minute = parseInt(data.relibMin) - hour * 60;
                        this.waitTime = hour + " 小时 " + minute + " 分"
                    }
                    this.maskShow = true;
                    this.interviewMesShow = true;
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
                _mt: 'wxRecruitProcess.getPage',
                companyId: pubsource.companyId,
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                userId: window.localStorage.getItem('uid'),
            }
            await getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) { //请求成功
                    let data = JSON.parse(res.data.content[0].value);
                    console.log(data, "data");
                    if (t.list.length > 0) { //当请求前有数据时 第n次请求
                        if (t.loading) { // 上拉加载
                            t.list = t.list.concat(data.rows) //上拉加载新数据添加到数组中
                            t.$nextTick(() => { //在下次 DOM 更新循环结束之后执行延迟回调
                                t.loading = false //关闭上拉加载中
                            })
                            if (data.rows.length < t.rows) { //没有更多数据
                                t.finished = true //上拉加载完毕
                                t.finishedText = '没有更多了';
                            }
                        }
                        if (t.isLoading) { //关闭下拉刷新
                            t.isLoading = false //关闭下拉刷新中
                            t.list = data.rows //重新给数据赋值
                            if (t.finished) { //如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
                                t.finished = false
                            }
                        }
                    } else { //当请求没有数据时 第一次请求
                        t.list = data.rows
                        t.loading = false //关闭上拉加载中
                    }
                }
                if (this.list.length === 0) {
                    this.addNewInterview = true;
                    return;
                }
            }).catch((err) => {
                t.loading = false //关闭上拉加载中
                t.finished = true //上拉加载完毕
                t.finishedText = '加载失败';
                t.$notify({
                    message: '网络错误',
                    duration: 1500,
                    background: '#f44'
                });
            }).finally(() => {
                t.$store.commit('hideLoading');
            });;
        },
        //获取二维码
        getQrCode (e, id) {
            e.stopPropagation();
            this.show = true;
            this.maskShow = true;
            var canvas = document.getElementById('canvas');
            const url = pubsource.pub_url + '#/resumeInfo?id=' + id
            QRCode.toCanvas(canvas, url, function (error) {
                if (error) console.error(error)
                console.log('url', url);
            })
        },
        //关闭二维码
        closeQrCode () {
            this.show = false;
            this.maskShow = false;
            this.interviewMesShow = false;
        }
    },
}
</script>
<style lang="less" scoped>
.interview {
    height: 100%;
    background: #f6f6f6;

    .interviewWrap {
        height: calc(~"100% - 110px");
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .interviewItem {
            background: #fff;
            padding: 44px 34px;
            display: flex;
            flex-direction: column;
            margin-bottom: 17px;
            .interview_item {
                display: flex;
                margin-bottom: 30px;
                font-size: 28px;
                .curStepstate {
                    font-size: 28px;
                    color: #339afe;
                }
                .p_flowst_1 {
                    color: #339afe;
                }
                .p_flowst_2 {
                    color: green;
                }
                .p_flowst_3 {
                    color: red;
                }
                .option {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    flex: 1;
                }
            }
            .item_first {
                justify-content: space-between;

                h3 {
                    font-size: 30px;
                    color: #333333;
                    font-weight: normal;
                }

                span {
                    font-size: 30px;
                    color: #ff6b00;
                }
            }
            .item_second {
                justify-content: space-between;

                .item_left {
                    font-size: 24px;
                    color: #666666;
                    display: flex;

                    span:first-child {
                        margin-right: 30px;
                    }

                    img {
                        width: 24px;
                        height: 24px;
                        margin-right: 14px;
                    }
                }
                .item_right {
                    display: flex;
                    font-size: 24px;
                    color: #999999;

                    span:first-child {
                        margin-right: 20px;
                    }
                }
            }
            .button_box {
                display: flex;
                justify-content: flex-end;
                button {
                    outline: none;
                    background: #fff;
                    border: 2px solid #339afe;
                    padding: 14px 42px;
                    font-size: 28px;
                    color: #339afe;
                    border-radius: 6px;

                    &:first-child {
                        margin-right: 16px;
                    }
                }
            }
        }
    }
    .qrCodeContent {
        position: fixed;
        width: 100%;
        height: 600px;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        background: #fff;
        z-index: 100;
        transition: all 0.5s;
        #canvas {
            width: 80% !important;
            height: 90% !important;
            margin-left: 10%;
            margin-top: 5%;
        }
    }
    .interviewMes {
        position: fixed;
        width: 80%;
        height: 250px;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        background: #fff;
        z-index: 100;
        transition: all 0.5s;
        border-radius: 20px;
        .interviewMesItem {
            background: #fff;
            padding: 30px 30px;
            display: flex;
            flex-direction: column;
            margin-bottom: 17px;
            border-radius: 20px;
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
    #mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.4;
        z-index: 99;
        transition: all 0.2s;
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
