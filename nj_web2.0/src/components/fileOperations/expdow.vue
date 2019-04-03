<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>&nbsp;{{$t('button.dwl')}}
                </div>
                <Button type="text"
                        @click="closeExpDow">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <Button type="text"
                    v-if="status"
                    @click="dowFile">{{filename}}</Button>
            <strong style="color: red"
                    v-if="!status">{{$t('reminder.noRightData')}}</strong>
            <br />
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../axios/axios'
import { isSuccess, deepCopy } from '../../lib/util'
import expdow from './expdow'
//  import pubsources from '../../lib/pub_source'

export default {
    data () {
        return {
            expDisFields: [],
            logType: '',
            priToken: '',
            checkAll: false,
            openExpDow: false,
            indeterminate: true,
            status: false,
            ruleValidate: {
            },
        }
    },
    props: {
        filekey: String,
        filename: String,
    },
    updated () {

    },
    methods: {
        getPriToken (filekey) {
            const t = this
            if (filekey === 'no record' || filekey === undefined || filekey === '') {
                return
            }
            t.status = true
            let data = {
                _mt: 'userMgmt.getfiletoken',
                isprivate: true,
                logType: this.$t('button.exp'),
                filekey: filekey,
                expiresecs: 180,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.openExpDow = true
                    t.priToken = res.data.content[0].value
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        dowFile () {
            localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
            if (this.isIE()) {
                window.location.href = pubsource.pub_prvf_downlink + this.priToken + '&fname=' + encodeURI(this.filename)
            } else {
                let doclink = pubsource.pub_prvf_downlink + this.priToken + '&fname=' + encodeURI(this.filename)
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
        closeExpDow () {
            const t = this
            t.status = false
            this.$emit('closeExpDowMain')
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../sass/updateAndAdd";
</style>
