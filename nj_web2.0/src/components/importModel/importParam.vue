<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>&nbsp;{{$t('button.imp')}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <Row type="flex"
                 justify="space-between">
                <i-col span="24"
                       style="line-height: 32px;height: 40px;">
                    <span style="font-weight: bold;"></span>
                    <Button type="ghost"
                            icon="link"
                            @click="dowFile">{{$t('lang_fileOperation.import.downTemplate')}}</Button>
                </i-col>
                <i-col span="24"
                       style="line-height: 32px;height: 40px;">
                    <span style="font-weight: bold;">{{$t('lang_fileOperation.import.selectImpType')}} </span>
                    <RadioGroup v-model="imptype">
                        <Radio label="1">{{$t('button.add')}}</Radio>
                        <Radio label="2">{{$t('lang_fileOperation.import.upd')}}</Radio>
                    </RadioGroup>
                </i-col>
                <i-col span="24"
                       style="margin-bottom: 10px;">
                    <div v-if="imptype == '1'"
                         style="background: cornsilk;border-radius: 5px;padding: 12px;overflow: hidden;border: solid #FEEDD3 2px;opacity: 0.8;">
                        {{$t('lang_fileOperation.import.addReminder')}}
                    </div>
                    <div v-if="imptype == '2'"
                         style="background: cornsilk;border-radius: 5px;padding: 12px;overflow: hidden;border: solid #FEEDD3 2px;opacity: 0.8;">
                        {{$t('lang_fileOperation.import.updReminder')}}
                    </div>
                </i-col>

                <i-col span="24"
                       style="height: 60px;">
                    <Row>
                        <p style="font-weight: bold;margin-bottom: 10px;">{{$t('lang_fileOperation.import.selectFile')}}</p>
                    </Row>
                    <Row :gutter="40">
                        <i-col span="17"
                               v-if="file !== ''">
                            <!--<span style="line-height: 35px;"><Icon type="folder" size="12" style="margin-right: 10px;"></Icon>{{ file.name }}</span>-->
                            <Input v-model="file.name"
                                   readonly="readonly">
                            <span slot="prepend">
                                <Icon type="folder"
                                      size="16"></Icon>
                            </span>
                            </Input>
                        </i-col>
                        <i-col span="3">
                            <Upload :before-upload="handleUpload"
                                    :format="['xls','xlsx']"
                                    action="">
                                <Button type="ghost"
                                        icon="ios-cloud-upload-outline">{{$t('lang_fileOperation.import.browsing')}}</Button>
                            </Upload>
                        </i-col>
                        <i-col span="4"
                               v-if="file !== ''">
                            <Button type="primary"
                                    :loading="loadingStatus"
                                    @click="uploadFile1">
                                {{ loadingStatus ? $t('lang_fileOperation.import.importing') : $t('lang_fileOperation.import.confirmImp') }}
                            </Button>
                        </i-col>
                    </Row>
                </i-col>
                <i-col span="24"
                       style="height: 80px;margin-top:12px;">
                    <div style="height: 42px;background: cornsilk;border-radius: 5px;padding: 12px;overflow: hidden;border: solid #FEEDD3 2px;opacity: 0.8;">
                        {{$t('lang_fileOperation.import.importReminder')}}
                    </div>
                </i-col>

                <!--<i-col span="24" style="line-height: 32px;height: 40px;" v-if="file !== ''">
          <div style="display: flex;justify-content: space-between">
            <span><Icon type="folder" size="12" style="margin-right: 10px;"></Icon>{{ file.name }}</span>
            <Button type="primary" size="small" @click="uploadFile1" :loading="loadingStatus">{{ loadingStatus ? '正在导入' : '确认导入' }}</Button>
          </div>
        </i-col>-->

                <i-col span="24"
                       style="line-height: 32px;height: 40px;"
                       v-if="imp_status !== 0">
                    <Progress :stroke-width="5"
                              :percent='imp_status'
                              :status="activeState"
                              :hide-info="true"></Progress>
                </i-col>
            </Row>
        </div>
        <transition name="fade">
            <importFail v-show="openImportFail"
                        @closeImportFail="closeImportFail"
                        ref="importFail"></importFail>
        </transition>
    </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../axios/axios'
//  import pubsources from '../../lib/pub_source'
import importFail from './importFail'


import { isSuccess, deepCopy } from '../../lib/util'

export default {
    data () {
        return {
            headers: { 'Content-Type': 'multipart/form-data' },
            data: { groupId: 1 },
            loadingStatus: false,
            openImportFail: false,
            logType: '',
            filekey: '',
            filename: '',
            jobQueueId: '',
            redisKey: '',
            file: '',
            priToken: '',
            imp: '',
            imp_status: 0,
            imptype: '1',
            activeState: '',
            loading: false
        }
    },
    props: {
        impid: Number,
        imp_mt: String,
    },
    components: {
        importFail,
    },
    updated () {

    },
    methods: {
        handleReset () {
            this.file = ''
            this.imp_status = 0
            this.$emit('closeImport')
        },
        closeImportFail () {
            this.openImportFail = false
        },
        handleUpload (file) {
            let fileName = file.name
            let fileType = fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'xls' || fileType === 'xlsx') {
                this.file = file
            } else {
                this.$Message.error({
                    content: this.$t('lang_fileOperation.import.importErr'),
                    duration: '2',
                })
            }
            return false
        },
        uploadFile1 () {
            const t = this
            t.loadingStatus = true
            const formData = new FormData()
            formData.append('upfile', t.file)
            uploadFile(formData).then(res => {
                for (const key in res.data) {
                    t.filekey = res.data[key]
                    t.filename = key
                    t.importData(res.data[key])
                }
            }).catch(() => {
                t.loadingStatus = false
                t.$Message.error(this.$t("reminder.errormessage"));
            })
        },
        importData (filekey) {
            const t = this
            getDataLevelUserLogin({
                _mt: t.imp_mt,
                logType: this.$t('button.imp'),
                imptype: t.imptype,
                importfile: filekey,
                importParams: '',
            }).then((res) => {
                if (isSuccess(res, t)) {

                    t.redisKey = res.data.content[0].redisKey
                    t.jobQueueId = res.data.content[0].jobQueueId
                    t.imp = window.setInterval(t.getImportState, 1000)
                }
            }).catch(() => {
                t.$Message.error(this.$t("reminder.errormessage"));
            })
        },
        getImportState () {
            const t = this
            getDataLevelUserLogin({
                _mt: 'userJobQueue.impStatusQuery',
                redisKey: t.redisKey,
                jobueueId: t.jobQueueId,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].imp_status !== 100) {
                        t.imp_status = res.data.content[0].imp_status
                        t.activeState = 'active'
                        console.log(res.data.content[0].imp_status, "2")
                    } else {
                        clearInterval(t.imp)
                        t.activeState = ''
                        if (res.data.content[0].imp_errfile !== '') {
                            t.openImportFail = true
                            t.$refs.importFail.importFailDowFile(res.data.content[0].imp_errfile)
                        }
                        if (res.data.content[0].imp_rows_nomatch !== '') {
                            t.openImportFail = true
                            t.$refs.importFail.setFailMessage(res.data.content[0].imp_rows_nomatch)
                        }
                        if (!t.openImportFail) {
                            t.$emit('getData');
                            console.log(res.data.content[0].imp_status, "3")
                            t.imp_status = res.data.content[0].imp_status
                            // t.$Modal.success({
                            //     title: this.$t('reminder.suc'),
                            //     content: this.$t('lang_fileOperation.import.uploadSuc'),
                            // })
                            t.$Message.success(this.$t("lang_fileOperation.import.uploadSuc"));
                        } else {
                            t.imp_status = 99
                            t.activeState = 'wrong'
                        }
                        t.loadingStatus = false
                    }
                } else {
                    clearInterval(t.imp)
                }
            }).catch(() => {
                clearInterval(t.imp)
                t.$Message.error(this.$t("reminder.errormessage"));
            })
        },
        getDowModelFile () {
            const t = this
            getDataLevelUserLogin({
                _mt: 'platFileexcel.getByFuncode',
                funcode: t.$store.state.user.funCode,
                logType: this.$t('lang_fileOperation.import.exportTemplate'),
            }).then((res) => {
                if (isSuccess(res, t)) {
                    this.filekey = res.data.content[0].fileKey
                    this.filename = res.data.content[0].fileName
                    this.getPriToken(res.data.content[0].fileKey)
                }
            }).catch(() => {
                t.$Message.error(this.$t("reminder.errormessage"));
            })
        },
        dowFile () {
            localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
            if (this.isIE()) {
                window.location.href = pubsource.pub_prvf_downlink + this.priToken + '&fname=' + encodeURI(this.filekey)
            } else {
                let doclink = pubsource.pub_prvf_downlink + this.priToken + '&fname=' + encodeURI(this.filekey)
                let link = document.createElement('a')
                link.href = doclink
                link.download = 'downloadfiletemp'
                link.setAttribute('download', 'downloadfiletemp');
                document.body.appendChild(link);
                link.click()
            }
            this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
            localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
        },
        getPriToken (filekey) {
            const t = this
            let data = {
                _mt: 'userMgmt.getfiletoken',
                isprivate: true,
                logType: this.$t('button.exp'),
                filekey: filekey,
                expiresecs: 180,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.priToken = res.data.content[0].value
                }
            }).catch(() => {
                t.$Message.error(this.$t("reminder.errormessage"));
            })
        },
    },
    watch: {
    },
}
</script>
<style lang="scss" scoped>
@import "../../sass/updateAndAdd";
.cover {
    .box {
        width: 900px;
    }
}
</style>
