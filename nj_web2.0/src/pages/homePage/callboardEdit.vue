<template>
    <div class="cover noticeDetail">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 11px;"></Icon>
                    &nbsp;查看
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <div class="option-main">
                <div class="titles">
                    {{noticeTitle}}
                </div>
                <p class="wrapList"
                   ref="scrollBox"
                   v-html="noticeContent">
                </p>
                <div class="info_item"
                     v-show="file!=''">
                    <a class="file"
                       @click="downloadFile">附件：{{file.name}}</a>
                </div>
                <div class="creatTime">
                    <div>{{unitPidDis}}</div>
                    <div>{{noticePublish}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'

export default {
    data () {
        return {
            comInfo: [],
            noticeTitle: '',
            noticeContent: '',
            unitPidDis: '',
            noticePublish: '',
            file: "",
            filekey: ""
        }
    },
    methods: {
        getData (id) {
            const t = this
            const data = {
                _mt: 'orgNotice.getWxById',
                id: id,
                logType: "查看"
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.comInfo = res.data.content[0];
                    t.noticeTitle = t.comInfo.noticeTitle;
                    t.noticeContent = t.comInfo.noticeContent;
                    t.unitPidDis = t.comInfo.unitPidDis
                    t.noticePublish = t.comInfo.noticePublish
                    if (t.comInfo.noticeAttach) {
                        t.fileName = t.comInfo.noticeAttach.split(':')[0];
                        t.file = { name: t.comInfo.noticeAttach.split(':')[0] }
                        t.filekey = t.comInfo.noticeAttach.split(':')[1];
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        handleReset () {
            const t = this;
            t.$refs.scrollBox.scrollTop = "0";
            t.$emit("closeUp");
        },
        //下载
        downloadFile () {
            const t = this;
            let data = {
                _mt: "userMgmt.getfiletoken",
                isprivate: true,
                logType: "导出",
                filekey: t.filekey,
                expiresecs: 180
            };
            getDataLevelUserLogin(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        localStorage.pageOpenedListAll = JSON.stringify(
                            JSON.parse(localStorage.pageOpenedList)
                        );
                        console.log(
                            pubsource.pub_prvf_downlink +
                            res.data.content[0].value +
                            "&fname=" +
                            encodeURI(t.filekey),
                            "213"
                        );
                        if (this.isIE()) {
                            window.location.href =
                                pubsource.pub_prvf_downlink +
                                res.data.content[0].value +
                                "&fname=" +
                                encodeURI(t.fileName);
                        } else {
                            let doclink =
                                pubsource.pub_prvf_downlink +
                                res.data.content[0].value +
                                "&fname=" +
                                encodeURI(t.fileName);
                            let link = document.createElement("a");
                            link.href = doclink;
                            link.download = "downloadfiletemp";
                            link.setAttribute("download", "downloadfiletemp");
                            document.body.appendChild(link);
                            link.click();
                        }
                        this.$store.state.app.pageOpenedList = JSON.parse(
                            localStorage.pageOpenedListAll
                        );
                        localStorage.pageOpenedList = JSON.stringify(
                            JSON.parse(localStorage.pageOpenedListAll)
                        );
                    }
                })
                .catch(() => {
                    t.$Message.error(this.$t("reminder.errormessage"));
                });
        },
    }
};
</script>
<style lang="scss" scoped>
.noticeDetail {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box {
        position: relative;
        width: 900px;
        background-color: #fff;
        padding: 60px 20px 30px 40px;
        border-radius: 11px;
        .form {
            max-height: 800px;
            overflow-y: auto;
        }
        .title {
            display: flex;
            position: absolute;
            height: 40px;
            width: 100%;
            line-height: 40px;
            justify-content: space-between;
            align-items: center;
            padding-left: 20px;
            top: 0;
            border-bottom: 1px solid #efefef;
            left: 0;
            .title-text {
                font-weight: bold;
                font-size: 14px;
            }
        }
    }
}
.option-main {
    position: relative;
    height: auto;
    .titles {
        text-align: center;
        font-size: 26px;
    }
    .wrapList {
        text-indent: 40px;
        font-size: 18px;
        width: 100%;
        margin-top: 20px;
        line-height: 1.4;
        max-height: 300px;
        overflow: auto;
        padding-right: 20px;
    }
    .info_item {
        color: blue;
        font-size: 18px;
        margin-top: 10px;
        text-indent: 40px;
    }
    .creatTime {
        text-align: right;
        margin-top: 20px;
        font-size: 20px;
    }
}
.btn {
    position: absolute;
    bottom: 20px;
    right: 50px;
}
.btn1 {
    position: absolute;
    bottom: 20px;
    right: 120px;
}
</style>
