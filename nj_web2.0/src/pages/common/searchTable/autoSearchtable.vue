<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>
                    &nbsp;{{title}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <Row class="table-form">
                <Input :placeholder="searchText"
                       style="width: 200px"
                       v-model="pmtypeCode" />
                <span style="margin: 0;"><Button type="primary"
                            icon="search"
                            @click="getData(param, 1)">{{$t('button.ser')}}</Button></span>
            </Row>
            <row class="table-form"
                 ref="table-form">
                <Table height="320"
                       size="small"
                       border
                       ref="selection"
                       :columns="searchCloumns"
                       @on-sort-change="sortable"
                       :data="data"
                       @on-row-dblclick="dbCkick"></Table>
            </row>
            <Row style="display: flex">
                <Page :total="total"
                      size="small"
                      show-elevator
                      show-sizer
                      :current="param.page"
                      placement="top"
                      @on-page-size-change="sizeChange"
                      @on-change="pageChange"
                      :page-size-opts="[10, 20, 50, 100]"></Page><Button type="ghost"
                        size="small"
                        shape="circle"
                        icon="refresh"
                        style="margin-left: 20px;display: inline-block;"
                        @click="getData(1)"></Button>
            </Row>
        </div>
    </div>
</template>
<script>
import searchTable from './searchTable'
import { getDataLevelUserLoginNew } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import Bus from '../bus'

export default {
    data () {
        return {
            data: [],
            total: NaN,
            pmtypeCode: '',
            title: searchTable[this.modiaContent].title,
            param: searchTable[this.modiaContent].param,
            valueText: searchTable[this.modiaContent].valueText,
            searchText: searchTable[this.modiaContent].searchText,
            searchCloumns: searchTable[this.modiaContent].searchCloumns,
            thisSffFilter: this.sffFilter,
            thisSffCascadeget: this.sffCascadeget,
            thisForm: this.form,
        }
    },
    props: {
        modiaContent: String,
        sffFilter: String, // 过滤条件
        sffCascadeget: String, // 级联条件
        form: Object, // 表单数据
    },
    mounted () {
        if (this.modiaContent === 'empnh-base-std') {
            searchTable[this.modiaContent].param.roleType = localStorage.roleType;
        }
        this.getData(searchTable[this.modiaContent].param, 1)
    },
    methods: {
        // data's form is like this: 'key1=$value1;$value2=key2', the data has '$' is value
        formData (data) {
            let arr = []
            if (data === undefined) {
                return false
            } else {
                let a = data.split(';')
                for (let i = 0; i < a.length; i++) {
                    let b = a[i].split('=')
                    let obj = {}
                    for (let j = 0; j < b.length; j++) {
                        if (b[j].substring(0, 1) !== '$') {
                            obj['key'] = b[j]
                        } else {
                            obj['value'] = b[j].substring(1)
                        }
                    }
                    arr.push(obj)
                }
            }
            return arr
        },
        getData (param, page) {
            const t = this
            if (page) {
                t.param.page = page
            }
            const data = deepCopy(param)
            let rule = t.formData(t.thisSffFilter)
            if (rule) {
                for (let i = 0; i < rule.length; i++) {
                    if (this.$store.state.flowClmkMap.popForm[rule[i].value]) {
                        data[rule[i].key] = this.$store.state.flowClmkMap.popForm[rule[i].value]
                    } else {
                        for (let j = 0; j < Bus.arr.length; j++) {
                            if (Bus.arr[j][rule[i].value]) {
                                data[rule[i].key] = Bus.arr[j][rule[i].value]
                                break
                            }
                        }
                    }
                }
            }
            if (t.pmtypeCode !== '') {
                data[t.valueText] = t.pmtypeCode
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        close () {
            this.$store.commit('autoSearch/setRow', '')
            this.$emit('closeUp')
        },
        dbCkick (row) {
            const t = this;
            let aa = t.formData(t.thisSffCascadeget);
            let jldata = {};
            for (let i = 0; i < aa.length; i++) {
                jldata[aa[i].key] = row[aa[i].value]
            };
            t.$emit('setJLData', jldata);
            t.$store.commit('autoSearch/setRow', row);
            if (searchTable[this.modiaContent].code) {
                this.$emit('changeinput', row[t.valueText], row[searchTable[this.modiaContent].code])
            } else {
                if (this.modiaContent === 'attenupdday-base-std') {
                    this.$emit('changeinput', row[t.valueText], row.empId)
                } else {
                    this.$emit('changeinput', row[t.valueText], row.id)
                }
            }
            this.$emit('closeUp')
        },
        sizeChange (size) {
            const t = this
            t.param.rows = size
            t.getData(t.param)
        },
        pageChange (page) {
            const t = this
            t.param.page = page
            t.getData(t.param)
        },
        sortable (column) {
            this.param.sort = column.key
            this.param.order = column.order
            if (column.order !== 'normal') {
                this.getData(this.param)
            } else {
                this.param.order = 'desc'
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.table-form {
    margin-bottom: 10px;
    /*overflow-y: scroll;*/
}
.ivu-table-overflowY {
    overflow-y: visible;
}
.background {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10003;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .backbox {
        position: relative;
        width: 800px;
        background-color: #fff;
        padding: 60px 20px 30px 20px;
        border-radius: 10px;
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
</style>
