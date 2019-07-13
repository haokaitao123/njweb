<template>
    <i-col class="col"
           span="8">
        <card :bordered="false">
            <p slot="title"
               class="title">
                <Icon type="volume-medium"></Icon>
                </Icon> <span style="margin-left: 5px;">{{$t('公司公告')}}</span>
            </p>
            <a href="#"
               slot="extra"
               @click="openMore()">
                <Icon type="more"></Icon>
            </a>
            <div class="block short">
                <div class="block_row"
                     v-for="(item , index) in comInfo"
                     :key="index">
                    <div class="divs"
                         @click="openUp(item.id)">
                        <Icon class="mr"
                              type="speakerphone"></Icon> {{item.noticeTitle}}
                    </div>
                </div>
            </div>
        </card>
        <transition name="fade">
            <noticeDetail v-show="openNoticeDetail"
                          ref="noticeDetail"
                          @closeUp="closeUp"></noticeDetail>
        </transition>
    </i-col>
</template>

<script>
import { isSuccess, deepCopy } from '@/lib/util'
import { getDataLevelUserLoginNew } from '@/axios/axios'
import noticeDetail from './callboardEdit'
export default {
    data () {
        return {
            data: [],
            comInfo: [],
            total: 0,
            index: 0,
            sort: 'id',
            order: "asc",
            rows: '10',
            page: '1',
            openNoticeDetail: false,
        }
    },
    components: {
        noticeDetail,
    },
    created () {
        this.getData()
    },
    methods: {
        getData () {
            const t = this
            const data = {
                _mt: 'orgNotice.getPage',
                rows: 6,
                page: 1,
                state: 103,
                sort: 'noticePublish',
                order: 'desc',
                logType: '公司公告',
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    this.comInfo = res.data.content[0].rows;
                    console.log(this.comInfo)
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        openUp (id) {
            const t = this
            id = parseInt(id, 10);
            t.openNoticeDetail = true;
            console.log(t.$refs.noticeDetail, "t.$refs.noticeDetail")
            t.$refs.noticeDetail.getData(id)
        },
        closeUp () {
            const t = this
            t.openNoticeDetail = false
        },
        openMore () {
            const tag = {
                title: '公司公告',
                path: '/noticeList',
                name: 'noticeList',
            }
            this.$store.commit('increateTag', tag)
            this.$router.push('/noticeList')
        },
    },
}
</script>
<style lang="scss" scoped>
.block {
    font-size: 12px;
    height: 220px;
    overflow-y: auto;
    overflow-x: hidden;
    .block_row {
        height: 36px;
        position: relative;
        cursor: pointer;
        transition: all 0.3s;
        line-height: 36px;
        .icon {
            line-height: 36px;
            position: absolute;
        }
        .divs {
            padding-left: 20px;
            padding-right: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .mr {
            margin-right: 2%;
            color: red;
        }
    }
    .block_row:hover {
        color: #2d8cf0;
    }
}
</style>

