<template>
    <div class="cover">
        <div class="box"
             style="padding-bottom:20px;">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>&nbsp;{{$t('button.exp')}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                <Checkbox :indeterminate="indeterminate"
                          :value="checkAll"
                          @click.prevent.native="handleCheckAll">{{$t('lang_fileOperation.export.selectAll')}}</Checkbox>
            </div>
            <CheckboxGroup v-model="expDisFields"
                           @on-change="checkAllGroupChange"
                           style="margin:10px 0 20px;">
                <Checkbox v-for="(item, index) in expDataTital"
                          :key="index"
                          :label="item.code+','+item.name"
                          style="margin:10px;">{{item.name}}</Checkbox>
            </CheckboxGroup>
            <Button type="primary"
                    @click="handleSubmit"
                    :loading="loadingStatus"
                    style="float: right;">{{loadingStatus ? '正在导出' : $t('button.exp') }}</Button>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../axios/axios'
import { isSuccess, deepCopy } from '../../lib/util'

export default {
    data () {
        return {
            expDisFields: [],
            filekey: '',
            filename: '',
            tedata: [],
            checkAll: false,
            indeterminate: false,
            ruleValidate: {
            },
            expDataTital: [],
            methods: '',
            loadingStatus: false,
        }
    },
    props: {
        id: Array,
        logType: String,
        index: Number,
    },
    updated () {

    },
    methods: {
        getData (data, methods, tedata) {
            this.expDataTital = data
            this.methods = methods
            this.tedata = tedata
        },
        handleSubmit1 (expDisFields, methods, tedata) {
            this.expDisFields = expDisFields
            this.methods = methods
            this.tedata = tedata
            this.handleSubmit()
        },
        handleSubmit () {
            const t = this
            t.loadingStatus = true
            const tedata = this.tedata
            for (const dat in tedata) {
                if (tedata[dat] === '') {
                    delete tedata[dat]
                }
            }
            const fields = t.expDisFields.join(';')
            let data = {
                _mt: this.methods,
                ids: this.id.join(),
                logType: this.$t('button.exp'),
                expDisFields: t.expDisFields.join(';'),
                data: JSON.stringify(tedata),
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            if (data.expDisFields) {
                getDataLevelUserLogin(data).then((res) => {
                    if (isSuccess(res, t)) {
                        t.filekey = res.data.content[0].filekey
                        t.filename = res.data.content[0].filename
                        t.$emit('setFileKey', t.filekey, t.filename, true)
                        t.handleReset();
                    }
                }).catch(() => {
                    t.$Message.error('网络错误');
                }).finally(() => {
                    t.loadingStatus = false
                })
            } else {
                t.loadingStatus = false
                t.$Message.warning('导出字段不能为空');
            }
        },
        handleCheckAll () {
            if (this.indeterminate) {
                this.checkAll = false
            } else {
                this.checkAll = !this.checkAll
            }
            this.indeterminate = false

            if (this.checkAll) {
                this.expDisFields = this.expDataTital.map(item => {
                    return item.code + ',' + item.name
                })
            } else {
                this.expDisFields = []
            }
        },
        checkAllGroupChange (data) {
            if (data.length === 8) {
                this.indeterminate = false
                this.checkAll = true
            } else if (data.length > 0) {
                this.indeterminate = true
                this.checkAll = false
            } else {
                this.indeterminate = false
                this.checkAll = false
            }
        },
        handleReset () {
            this.$emit('closeExp');
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../sass/spin_loading";
@import "../../sass/updateAndAdd";
</style>
