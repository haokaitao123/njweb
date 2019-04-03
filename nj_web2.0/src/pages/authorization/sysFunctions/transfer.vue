<template>
    <div class="cover">
        <div class="box"
             style="width: 460px">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>
                    &nbsp;{{$t('button.sav')}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <Transfer :data="data"
                      :target-keys="targetKeys"
                      :render-format="render1"
                      @on-change="handleChange"
                      @on-selected-change="selectedChange"
                      :list-style="{height:'300px'}">
                <div :style="{float: 'right', margin: '5px'}">
                    <Button type="ghost"
                            size="small"
                            @click="upMove">{{$t('lang_role.adminfun.upMove')}}</Button>
                    <Button type="ghost"
                            size="small"
                            @click="downMove">{{$t('lang_role.adminfun.downMove')}}</Button>
                </div>
            </Transfer>
            <div :style="{float: 'right', marginTop: '10px', marginRight: '5px'}">
                <Button type="primary"
                        @click="save">{{$t('button.sav')}}</Button>
            </div>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

export default {
    data () {
        return {
            data: [],
            targetKeys: [],
        }
    },
    props: {
        id: String,
    },
    mounted () {
        this.getData();
    },
    methods: {
        getData () {
            const t = this
            getDataLevelUserLogin({
                _mt: 'sysFunbutton.getSysFunbuttonBybtnFunid',
                btnFunid: t.id,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let content = res.data.content[0].value;
                    let newArr = [];
                    this.targetKeys = [];
                    for (let v of content) {
                        if (v.btnLanSign == "1") {
                            newArr.push(v)
                        } else {
                            this.targetKeys.push(v)
                        }
                    }
                    this.targetKeys = t.getMockData(this.targetKeys).map(item => item.key);
                    t.data = t.getMockData(content);
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getMockData (data) {
            const mockData = []
            for (let i = 0; i < data.length; i++) {
                mockData.push({
                    key: data[i].btnLancode,
                    label: data[i].btnLanCn,
                })
            }
            return mockData
        },
        render1 (item) {
            return item.label
        },
        selectedChange (sourceSelectedKeys, targetSelectedKeys) {
            this.selected = targetSelectedKeys
        },
        handleChange (newTargetKeys) {
            this.targetKeys = newTargetKeys
        },
        upMove () {
            const t = this
            const keys = []
            for (let i = 0; i < t.targetKeys.length; i++) {
                keys.push(t.targetKeys[i])
            }
            for (let i = 0; i < keys.length; i++) {
                if (t.selected.contains(keys[i]) && !t.selected.contains(keys[i - 1]) && i > 0) {
                    keys.splice(i, 1, ...keys.splice(i - 1, 1, keys[i]))
                }
            }
            t.targetKeys = keys
        },
        downMove () {
            const t = this
            const keys = []
            for (let i = 0; i < t.targetKeys.length; i++) {
                keys.push(t.targetKeys[i])
            }
            for (let i = keys.length - 2; i > -1; i--) {
                if (t.selected.contains(keys[i]) && !t.selected.contains(keys[i + 1]) && i > -1) {
                    keys.splice(i, 1, ...keys.splice(i + 1, 1, keys[i]))
                }
            }
            t.targetKeys = keys
        },
        save () {
            const t = this
            const data = {
                _mt: 'sysFunbutton.addOrUpdSysFunbutton',
                logType: '按钮新增',
                btnFunid: t.id,
                companyId: '1',
                funId: '1',
                btnLancode: t.targetKeys.toString(),
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    this.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: this.$t('reminder.savsuccess'),
                    })
                    t.close()
                    t.$emit('getBtnData')
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        close () {
            this.targetKeys = [];
            this.$emit('closeTransfer')
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
</style>
