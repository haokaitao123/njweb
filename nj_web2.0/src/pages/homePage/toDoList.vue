<template>
    <i-col class="col"
           span="8">
        <Card :bordered="false">
            <p slot="title"
               class="title">
                <Icon type="ios-compose"></Icon>
                <span style="margin-left: 5px;">{{$t('lang_homePage.toDoList.title')}}</span>
            </p>
            <a href="#"
               slot="extra"
               @click="lookAllToDoList">
                <Icon type="more"></Icon>
            </a>
            <div class="block">
                <Spin fix
                      v-if="isSpin"></Spin>
                <div class="block_row"
                     v-for="(item, index) in toDoData"
                     @click="doAnsrpt(item)">
                    <Icon class="icon"
                          type="document-text"
                          color="#f33155"></Icon>
                    <div class="div">
                        {{item.todo_title}}
                    </div>
                </div>
                <div class="block_row"
                     v-for="(item, index) in approval"
                     @click="doAnsrpt(item)">
                    <Icon class="icon"
                          type="document-text"
                          color="#f33155"></Icon>
                    <div class="div">
                        {{item.apblTitlecn}}
                    </div>
                </div>
            </div>
        </Card>
        <transition name="fade">
            <commonFlowUpdate v-if="openTestUpd"
                              @close="closeTest"
                              @getAllDataMain="getAllDataMain"
                              ref="commonFlowUpdate"
                              :pkValue="pkValue"
                              :aprvrelaStepidAll="flowId"
                              :aprvrelaRecordidAll="aprvrelaRecordidAll"
                              :aprdApprover="aprdApprover"
                              :aprvrelTitle="aprvrelTitle"
                              :aprvrelaApproverid="aprvrelaApproverid"
                              :aprdBillid="aprdBillid"
                              :aprvCode="aprvCode">
            </commonFlowUpdate>
        </transition>
    </i-col>
</template>

<script>
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin,
    getDataLevelUserLoginSenior,
} from '../../axios/axios'
import {
    isSuccess, getCookie,
} from '../../lib/util'
import commonFlowUpdate from '../ansrptManage/toDoListManage/commonFlowUpdate'
import Bus from '../../lib/bus'

export default {
    data () {
        return {
            userTodoKey: '',
            fID: '',
            toDoData: [],
            approval: [],
            isSpin: true,
            id: '',
            aprvrelTitle: '',
            openTestUpd: false,
            flowId: '',
            pkValue: '',
            aprdBillid: '',
            aprdApprover: '',
            aprvrelaApproverid: '',
            aprvrelaRecordidAll: '',
            aprvrelaStepidAll: '',
            aprvCode: '',
            stop: true,
        }
    },
    computed: {
        roleType () {
            return this.$store.state.user.roleType
        },
    },
    components: {
        commonFlowUpdate,
    },
    mounted () {
        this.toDoData = []
        this.approval = []
        Bus.$on('stopRequest', (res) => {
            clearInterval(this.fID)
        })
        Bus.$on('getAllDataMain', (res) => {
            this.getMainData()
        })
        if (this.stop) {
            this.getMainData()
        }
    },
    methods: {
        getAllDataMain () {
            this.getMainData()
        },
        getMainData () {
            const t = this
            const data = {
                _mt: 'ansrptTodoList.getMainTodo',
                logType: '查询主页待办',
                roleType: localStorage.roleType,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.userTodoKey = res.data.content[0].value
                    if (res.data.content[0].value) {
                        t.setInterData()
                        Bus.$emit('setCommonFlag', true)
                    } else {
                        t.isSpin = false
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
                t.isSpin = false
            })
        },
        setInterFunc () {
            const t = this
            t.fID = setInterval(function () {
                t.setInterData()
            }, 1000)
        },
        setInterData () {
            const t = this
            clearInterval(t.fID)
            t.toDoData = []
            t.approval = []
            const data = {
                _mt: 'ansrptTodoList.queryGetMainTodo',
                logType: '查询主页待办',
                roleType: localStorage.roleType,
                todoKey: t.userTodoKey,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].todoList) {
                        //	            t.toDoData = res.data.content[0].todoList
                        for (let i = 0; i < res.data.content[0].todoList.length; i++) {
                            if (res.data.content[0].todoList[i].todo_title !== undefined) {
                                t.toDoData.push(res.data.content[0].todoList[i])
                            }
                        }
                        this.approval = []
                        for (let j = 0; j < t.toDoData.length; j++) {
                            if (t.toDoData[j].todo_title === '') {
                                if (this.approval.length === 4) {
                                    return
                                } else {
                                    this.approval.push(t.toDoData[j])
                                }
                                t.toDoData.splice(j, 1)
                            }
                        }
                        console.log(t.toDoData)
                        for (let k = 0; k < this.approval.length; k++) {
                            this.approval = JSON.parse(this.approval[k].todo_data)
                        }
                        console.log(this.approval)
                    }
                    //            t.toDoData = t.uniq(t.toDoData)
                    //100停止调用
                    if (res.data.content[0].todoStatus === 100) {
                        clearInterval(t.fID)
                        t.isSpin = false
                    } else {
                        //              t.fID = setInterval(function () {
                        t.setInterData()
                        //              }, 1000)
                    }

                    var result = []
                    var obj = {}
                    for (let i = 0; i < t.toDoData.length; i++) {
                        if (!obj[t.toDoData[i].todo_title]) {
                            result.push(t.toDoData[i])
                            obj[t.toDoData[i].todo_title] = true
                        }
                    }
                    t.toDoData = result
                }
            }).catch(() => {
                t.isSpin = false
                //          t.$Modal.error({
                //            title: this.$t('reminder.err'),
                //            content: this.$t('reminder.errormessage'),
                //          })
            })
        },
        uniq (array) {
            var temp = [] //一个新的临时数组
            for (var i = 0; i < array.length; i++) {
                if (temp.indexOf(array[i]) === -1) {
                    temp.push(array[i])
                }
            }
            return temp
        },
        lookAllToDoList () {
            const tag = {
                title: '待办事项',
                path: '/ansrptToDoList',
                name: 'ansrptToDoList',
            }
            this.$store.commit('increateTag', tag)
            this.$router.push('/ansrptToDoList')
        },
        doAnsrpt (item) {
            const t = this;
            if (item.todo_title) {
                const itemData = JSON.parse(item.todo_data)
                const data = {
                    _mt: 'sysFunctions.getFunByCode',
                    funCode: itemData.funCode,
                }
                getDataLevelUserLogin(data).then((res) => {
                    if (isSuccess(res, t)) {
                        t.id = res.data.content[0].id
                        const tag = {
                            title: itemData.title,
                            path: '/' + itemData.funAction,
                            name: itemData.funAction,
                            query: { id: t.id, code: itemData.funCode },
                        }
                        this.$store.commit('increateTag', tag)
                        this.$router.push({
                            path: itemData.funAction, query: {
                                id: t.id,
                                code: itemData.funCode,
                            }
                        })
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            } else {
                t.flowId = item.aprvrelaStepid
                t.pkValue = item.apblDataid
                t.aprdBillid = item.aprdBillid
                t.aprvrelaRecordidAll = item.aprvrelaRecordid
                t.aprdApprover = item.aprvrelaApproveridDis
                t.aprvrelaApproverid = item.aprvrelaApproverid
                t.aprvrelTitle = item.apblTitlecn
                t.aprvCode = item.aprvCode
                t.openTestUpd = true
            }
        },
        closeTest () {
            const t = this
            t.openTestUpd = false
        },
    },
    watch: {
        roleType (value) {
            const t = this
            t.toDoData = []
            t.getMainData()
        },
        $lang (value) {
            this.isSpin = true
            setTimeout(() => {
                this.getMainData()
            }, 1000)
        },
    },
}

</script>

<style lang="scss" scoped>
.block {
    font-size: 12px;
    height: 280px;
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
        .div {
            padding-left: 20px;
            padding-right: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .block_row:hover {
        color: #2d8cf0;
    }
}
</style>
