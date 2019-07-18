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
            <!-- 选项卡 开始-->
            <Tabs value="name1">
                <TabPane label="分配部门"
                         name="name1">
                    <Row>
                        <Col class="col border_2"
                             span="19">
                        <Tree :data="distribution_data"
                              show-checkbox
                              multiple
                              ref="orangize_tree"></Tree>
                        </Col>
                        <Col span="4"
                             offset="1">
                        <div class="btn-group">
                            <Button type="primary"
                                    @click="expand">{{$t('lang_user.rootrole.expand')}}</Button>
                            <Button type="primary"
                                    @click="disExpand">{{$t('lang_user.rootrole.disExpand')}}</Button>
                            <Button type="primary"
                                    @click="allPick">{{$t('lang_user.rootrole.allPick')}}</Button>
                            <Button type="primary"
                                    @click="resetTree">{{$t('lang_user.rootrole.resetTree')}}</Button>
                            <Button type="primary"
                                    @click="save">{{$t('button.sav')}}</Button>
                        </div>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
            <!-- 选项卡 结束-->
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    data () {
        return {
            id: "",
            tableselected: [],
            total: NaN,
            // 分配组织架构
            orangize_params: {
                _mt: 'orgUnits.getTree',
            },
            distribution_data: [],
            // 分配组织架构 ----------
        }
    },
    props: {
        title: String,
    },
    mounted () {
        this.orangize_getData();
    },
    methods: {
        //  分配组织架构获取树
        orangize_getData (id) {
            const t = this
            const data = deepCopy(t.orangize_params)
            data.id = "999" + id
            data.logType = '查询'
            this.id = id
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0]) {
                        t.distribution_data = t.toTree(res.data.content[0].value)
                        console.log(t.toTree(res.data.content[0].value))
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        /* 把后台数据转化为tree的格式 */
        toTree (data) {
            data.forEach((item) => {
                item.expand = false
                item.checked = item.isCheck === '1'
                item.title = item.unitCode + ' ' + item.unitFname
                delete item.children
            })
            const map = {}
            data.forEach((item) => {
                map[item.id] = item
            })
            const val = []
            data.forEach((item) => {
                const parent = map[item.unitPid]
                if (parent) {
                    (parent.children || (parent.children = [])).push(item)
                } else {
                    val.push(item)
                }
            })
            return val
        },
        expand () {  //  展开
            this.treeData(this.distribution_data, 'expand', true)
        },
        disExpand () { //  收缩
            this.treeData(this.distribution_data, 'expand', false)
        },
        allPick () { //  全选
            this.treeData2(this.distribution_data, 'checked', true)
        },
        resetTree () { //  重置
            this.treeData2(this.distribution_data, 'checked', false)
            this.treeData(this.distribution_data, 'checked', false)
        },
        //  保存（分配组织架构）
        save () {
            const t = this
            const checkedId = []
            const checked = t.$refs.orangize_tree.getCheckedNodes()
            console.log(checked.length)
            for (let i = 0; i < checked.length; i++) {
                checkedId.push(checked[i].id)
            }
            const data = {
                _mt: 'orgNotice.addOrUpd',
                logType: '日志类型',
                id: t.id,
                noticeVisdept: checkedId.join(),
            }
            console.log(data, "data")
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: this.$t('reminder.savsuccess'),
                    })
                    t.close()
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        //  保存 END
        /* 遍历树形数组对象 */
        treeData (data, item, value) {
            const t = this
            for (let i = 0; i < data.length; i++) {
                if (data[i].children !== undefined) {
                    data[i][item] = value
                    t.treeData(data[i].children, item, value)
                }
            }
        },
        treeData2 (data, item, value) {
            const t = this
            for (let i = 0; i < data.length; i++) {
                if (data[i].children !== undefined) {
                    t.treeData2(data[i].children, item, value)
                } else {
                    data[i][item] = value
                }
            }
        },
        close () {
            this.treeData(this.distribution_data, 'expand', false)
            this.$emit('close')
        }
    },
}
</script>
<style lang="scss">
@import "../../../sass/table";
</style>
<style lang="scss" scoped>
.border_l {
    overflow-y: auto;
    border: 1px #efefef solid;
    padding: 20px 10px;
}
.border_2 {
    max-height: 400px;
    overflow-y: auto;
    border: 1px #efefef solid;
    padding: 20px 10px;
}
.table-form {
    margin-bottom: 10px;
}
.btn-group {
    width: 80%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.background {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .backbox {
        position: relative;
        width: 900px;
        max-height: 540px;
        background-color: #fff;
        padding: 60px 20px 15px 20px;
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
