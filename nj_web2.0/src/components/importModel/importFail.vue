<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_fileOperation.import.impResult')}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <Row type="flex"
                 justify="space-between">
                <i-col span="12"
                       style="line-height: 32px;height: 40px;">
                    <Button type="ghost"
                            icon="link"
                            @click="dowFile">{{$t('lang_fileOperation.import.downloadFail')}}</Button>
                </i-col>
                <i-col span="12"
                       style="line-height: 32px;height: 40px;">
                </i-col>
                <i-col span="24"
                       style="line-height: 32px;min-height: 40px;max-height: 160px;overflow-y: auto"
                       v-if="file">
                    {{ improwsnomatch }} {{$t('lang_fileOperation.import.fieldsNoImport')}}
                </i-col>
            </Row>
        </div>
    </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../axios/axios'
//  import pubsources from '../../lib/pub_source'


import { isSuccess, deepCopy } from '../../lib/util'

export default {
    data () {
        return {
            headers: { 'Content-Type': 'multipart/form-data' },
            data: { groupId: 1 },
            loadingStatus: false,
            logType: '',
            file: false,
            filekey: '',
            priToken: '',
            improwsnomatch: '',
        }
    },
    props: {
    },
    updated () {

    },
    methods: {
        handleReset () {
            this.$emit('closeImportFail')
            this.improwsnomatch = ''
            this.priToken = ''
            this.filekey = ''
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
                link.click()
            }
            this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
            localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
        },
        setFailMessage (improwsnomatch) {
            this.file = true
            this.improwsnomatch = improwsnomatch
        },
        importFailDowFile (filekey) {
            const t = this
            t.filekey = filekey
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
        width: 500px;
    }
}
</style>
