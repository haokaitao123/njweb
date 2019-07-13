<template>
    <div>
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="mouse"></Icon>
                    &nbsp;公司公告
                    <Button :type="read?'ghost':'primary'"
                            style="margin-left: 20px;display: inline-block;"
                            class="button_operate_left"
                            @click="buttonOperate('')">未读</Button>
                    <Button :type="read?'primary':'ghost'"
                            style="margin-left: 20px;display: inline-block;"
                            class="button_operate_right"
                            @click="buttonOperate('read')">已读</Button>
                </p>
                <Row :style="{height: rowHeight + 'px'}"
                     class="divContent">
                    <div>
                        <Spin fix
                              size="large"
                              v-if="isSpin">
                            <!--<div>数据加载中...</div>-->
                        </Spin>
                        <div class="selects">
                        </div>
                        <div v-for="(item, index) in noticeData"
                             :key="index"
                             class="dataClass"
                             :class="item.noticeStateDis==='read'?'read':''"
                             @click="viewNotice(item.id)">
                            <span v-if="item.noticeType">
                                {{item.noticeType==='announce'?'公告  ':'通知  '}}
                            </span>
                            <Icon class="mr"
                                  type="speakerphone"></Icon>
                            <span v-if="item.noticeTitle">
                                {{item.noticeTitle}}
                            </span>
                            <span>
                                (
                                发布人：{{item.noticePeopleDis}} ,
                                发布时间：{{item.noticePublish}}
                                )
                            </span>
                        </div>
                        <!-- <div class="dataClass">
                            <span> 公告 </span>
                            <Icon class="mr" type="speakerphone"></Icon>
                            <span> 123</span>
                            <span> (发布人：李延延 ,发布时间：2019-08-05)
                            </span>
                        </div> -->
                    </div>
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <noticeDetail v-show="openNoticeDetail"
                          @closeUp="closeNoticeDetail"
                          ref="noticeDetail"></noticeDetail>
        </transition>
    </div>

</template>

<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '@/axios/axios'
import { isSuccess } from '@/lib/util'
import noticeDetail from './callboardEdit'
export default {
    data () {
        return {
            rowHeight: document.body.offsetHeight - 200,
            noticeData: [],
            isSpin: true,
            openNoticeDetail: false,
            read: false,
            type: ''
        }
    },
    mounted () {
        this.getAllData('')
    },
    components: {
        noticeDetail,
    },
    methods: {
        buttonOperate (type) {
            if (type === '') {
                this.read = false;
            } else {
                this.read = true;
            }
            this.type = type
            this.getAllData(type)
        },
        //announce 公告  notice 通知
        getAllData (type) {
            const t = this
            const data = {
                _mt: 'orgNotice.getWxPage',
                rows: 100,
                page: 1,
                sort: 'noticePublish',
                order: 'desc',
                logType: '公司公告',
                recFlag: type
                // selType: ''
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.noticeData = res.data.content[0].rows;
                    t.isSpin = false;
                    console.log(this.noticeData)
                }
            }).catch(() => {
                t.isSpin = false;
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        viewNotice (id) {
            const t = this
            id = parseInt(id, 10);
            t.openNoticeDetail = true
            this.$refs.noticeDetail.getData(id)
        },
        closeNoticeDetail () {
            this.openNoticeDetail = false;
            console.log(this.type, "this.type");
            this.getAllData(this.type);
        }
    }
}
</script>

<style lang="scss" scoped>
.divContent {
    overflow: auto;
}
.dataClass {
    border: solid 1px #cccccc;
    height: 40px;
    line-height: 40px;
    margin-bottom: -1px;
    padding-left: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.dataClass:hover {
    background: #f7f7f7;
    cursor: pointer;
    color: #2d8cf0;
}
.mr {
    margin-right: 2%;
    color: red;
}
.read {
    color: #c1c1c1;
    // background: #f1f1f1;
}
.button_operate_left {
    position: absolute;
    right: 20px;
}
.button_operate_right {
    position: absolute;
    right: 90px;
}
</style>
