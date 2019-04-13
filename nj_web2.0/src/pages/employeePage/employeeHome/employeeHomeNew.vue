<!--  -->
<template>
    <div class="main"
         ref="Main">
        <div class="head">
            <div class="title">
                <div class="top">
                    <div class="tel">
                        服务热线：400-815-2266
                    </div>
                </div>
                <div class="content">
                    <div class="logo">
                        <img src="../../../../static/img/HROCloud_Logo_.png"></img>
                        <span>员工/经理人事共享服务大厅</span>
                    </div>
                    <div class="user">
                        <Dropdown transfer
                                  trigger="hover"
                                  @on-click="handleClickUserDropdown">
                            <a href="javascript:void(0)"
                               style="display: block;width: 100%;height: 47px;line-height: 47px;">
                                <span class="main-user-name">{{ name }}</span>
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="loginout">{{$t('user.quit')}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <img :src="cropedImg"
                             style="margin-left: 10px"></img>
                    </div>
                </div>

            </div>
            <div class="btn">
                <Dropdown class="dropdown"
                          v-for="(item, index) in funs"
                          :key="index"
                          @on-click="toPage">
                    <Button href="javascript:void(0)"
                            type="warning"
                            size="large">
                        {{item.funName}}
                    </Button>
                    <DropdownMenu slot="list"
                                  v-if="item.children">
                        <DropdownItem v-for="(item2, index2) in item.children"
                                      :name="item2.funAction+';'+item2.id+';'+item2.funCode"
                                      :key="index2">{{item2.funName}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div class="man">
                <div class="font">
                    有任何不明白的地方，
                    请点击进入 <a>办事指南</a>
                </div>
            </div>
        </div>
        <div class="center">
            <div class="left con">
                <div class="title">
                    <img src="../../../../static/employee/tz.png">
                    <div class="titlefont">
                        通知公告
                        <a>>>更多</a>
                    </div>
                </div>
                <div class="content">
                    <div class="item"
                         v-for="(item,index) in todoList"
                         :key="index">
                        <img src="../../../../static/employee/gg1.png">
                        <div class="itemfont">
                            <a>{{item.cmutNoticeTitle}}</a>
                        </div>
                        <div class="time">
                            {{item.cmutNoticePublish}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="right con">
                <div class="title">
                    <img src="../../../../static/employee/gg.png">
                    <div class="titlefont">
                        政策制度
                        <a>>>更多</a>
                    </div>
                </div>
                <div class="content">
                    <div class="item">
                        <img src="../../../../static/employee/tz1.png">
                        <div class="itemfont">
                            <a>员工资助服务平台2.1.0版本更新</a>
                        </div>
                        <div class="time">
                            2012-12-01
                        </div>
                    </div>
                    <div class="item">
                        <img src="../../../../static/employee/tz1.png">
                        <div class="itemfont">
                            <a>员工资助服务平台2.1.0版本更新</a>
                        </div>
                        <div class="time">
                            2012-12-01
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="zhanwei"></div>
        <div class="footer">
            Copyright © 2013-2018 上海仁云信息科技有限公司
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLogin3, getDataLevelUserLogin2, getDataLevelUserLogin1, getDataLevelUserLoginNew, getDataLevelNone, getDataLevelUserLogin } from '../../../axios/axios'
import { setCookie, isSuccess, getCookie } from '../../../lib/util'

export default {
    data () {
        return {
            funs: [],
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            todoList: [],
            cropedImg: '',
            name: '',
            httpImg: '',
        }
    },
    mounted () {
        this.getNode()
        this.getTodo()
        this.getData()
    },
    components: {
    },
    created () {
        this.httpImg = pubsource.pub_pubf_downlink
    },
    methods: {
        handleClickUserDropdown () {
            getDataLevelUserLogin2({ _mt: 'userMgmt.logout' }).then((res) => {
                this.$router.push('employeeHome')
            }).catch(() => {
                t.$router.push('employeeHome')
            })
        },
        getData () {
            const t = this
            getDataLevelUserLogin({
                _mt: 'userMgmt.getuserbyid',
                id: t.$store.state.user.userId,
                purpose: '0',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.name = res.data.content[0].name
                    if (res.data.content[0].picture) {
                        const a = res.data.content[0].pictureShrink.split(',')
                        t.cropedImg = t.httpImg + a[1]
                    }
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getTodo () {
            let t = this
            let data = {
                _mt: 'cmutNotic.getLoginList',
                logType: '通知公告',
                funId: '1',
            }
            getDataLevelUserLogin(data).then((res) => {
                console.log(res)
                this.todoList = res.data.content[0].value
                console.log(this.todoList)
            }).catch((res) => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: res,
                })
            })
        },
        getNode () {
            const t = this
            getDataLevelUserLogin3({
                _mt: 'authUserPerm.getEssUserPerm',
                companyId: '1000',
                roleType: '6essmss',
                language: 'CN',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    // setCookie('wtk', res.data.content[0].webToken)
                    t.funs = t.subdata(res.data.content[0].userFuns)
                    //console.log(t.funs)
                    // setCookie('wtk', res.data.content[0].webToken)
                    //                 setCookie('useId', res.data.content[0].uid)
                    //                 setCookie('useName', t.form.userName)
                    t.$store.commit('setName', res.data.content[0].usreName)
                    t.$store.commit('setUserId', res.data.content[0].userId)
                    t.$store.commit('setEmpIdd', res.data.content[0].sysUsempid)
                    t.$store.commit('setCompanyId', res.data.content[0].cur_company.companyId)
                    // t.$router.push('/employeeHomeNew')
                }
                // t.getNoteCode()
            }).catch((res) => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: res,
                })
            })
        },
        /* 把后台数据转化为tree的格式 */
        toTree (data) {
            data.forEach((item) => {
                delete item.children
            })
            const map = {}
            data.forEach((item) => {
                map[item.id] = item
            })
            const val = []
            data.forEach((item) => {
                const parent = map[item.funPid]
                if (parent) {
                    (parent.children || (parent.children = [])).push(item)
                } else {
                    val.push(item)
                }
            })
            return val
        },
        subdata (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].funCode === '500') {
                    data.splice(i, 1)
                    break
                }
            }
            // this.data = data
            return this.toTree(data)
        },
        toPage (name) {
            let t = this
            let st = name.split(';')
            // 信息查询
            if (st[1] === '1201') {
                const data = {
                    _mt: 'viewEmpMaster.getSubordinatesPage',
                    rows: t.rows,
                    page: t.page,
                    sort: t.sort,
                    order: t.order,
                    logType: this.$t('button.ser'),
                    empId: this.$store.state.user.sysUsempid,
                    empcompDept: t.empcompDept,
                    empcompPost: t.empcompPost,
                }
                for (const dat in data) {
                    if (data[dat] === '') {
                        delete data[dat]
                    }
                }
                getDataLevelUserLoginNew(data).then((res) => {
                    if (isSuccess(res, t)) {
                        if (res.data.content[0].rows === '[]') {
                            alert('暂时没有数据需要处理')
                            return
                        } else {
                            let { href } = this.$router.resolve({
                                path: '/main/' + st[0],
                                query: { id: st[1], code: st[2] },
                            })
                            window.open(href, '_blank')
                        }
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
            // 下属离职发起
            if (st[1] === '1189') {
                let getCri = ''
                if ('530200' === st[2]) {
                    const data = { "queryCriteria": [{ "empdimApplicant": t.$store.state.user.userId }] }
                    getCri = JSON.stringify(data)
                } else if ('510600' === t.$store.state.user.funCode) {
                    const data = { "queryCriteria": [{ "empdimApplicant": t.$store.state.user.userId }] }
                    getCri = JSON.stringify(data)
                } else if ('530300' === t.$store.state.user.funCode) {
                    const data = { "queryCriteria": [{ "empId": t.$store.state.user.sysUsempid }] }
                    getCri = JSON.stringify(data)
                } else if ('530400' === t.$store.state.user.funCode) {
                    const data = { "queryCriteria": [{ "empId": t.$store.state.user.sysUsempid }] }
                    getCri = JSON.stringify(data)
                } else {
                    getCri = ''
                }
                getDataLevelUserLogin1({
                    _mt: 'platAutoLayoutGetFlowList.getPage',
                    sort: t.sort,
                    order: t.order,
                    rows: t.rows,
                    page: t.page,
                    roleType: t.$store.state.user.roleType,
                    logType: 'getPage',
                    data: getCri,
                    funId: 1189,
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        if (res.data.content[0].rows === '[]') {
                            alert('暂时没有数据需要处理')
                            return
                        }
                        let { href } = t.$router.resolve({
                            path: '/main/' + st[0],
                            query: { id: st[1], code: st[2] },
                        })
                        //              console.log(href)
                        window.open(href, '_blank')
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
            //  试用期评估
            if (st[1] === '1190') {
                let getCri = ''
                if ('530200' === t.$store.state.user.funCode) {
                    const data = { "queryCriteria": [{ "empdimApplicant": t.$store.state.user.userId }] }
                    getCri = JSON.stringify(data)
                } else if ('510600' === t.$store.state.user.funCode) {
                    const data = { "queryCriteria": [{ "empdimApplicant": t.$store.state.user.userId }] }
                    getCri = JSON.stringify(data)
                } else if ('530300' === st[2]) {
                    const data = { "queryCriteria": [{ "empId": t.$store.state.user.sysUsempid }] }
                    getCri = JSON.stringify(data)
                } else if ('530400' === t.$store.state.user.funCode) {
                    const data = { "queryCriteria": [{ "empId": t.$store.state.user.sysUsempid }] }
                    getCri = JSON.stringify(data)
                } else {
                    getCri = ''
                }
                getDataLevelUserLogin1({
                    _mt: 'platAutoLayoutGetFlowList.getPage',
                    sort: t.sort,
                    order: t.order,
                    rows: t.rows,
                    page: t.page,
                    roleType: t.$store.state.user.roleType,
                    logType: 'getPage',
                    data: getCri,
                    funId: 1190,
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        //            console.log(res.data.content[0].rows)
                        if (res.data.content[0].rows === '[]') {
                            alert('暂时没有数据需要处理')
                            return
                        } else {
                            let { href } = this.$router.resolve({
                                path: '/main/' + st[0],
                                query: { id: st[1], code: st[2] },
                            })
                            window.open(href, '_blank')
                        }
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
            // 合同续签评估
            if (st[1] === '1191') {
                let getCri = ''
                if ('530200' === t.$store.state.user.funCode) {
                    const data = { "queryCriteria": [{ "empdimApplicant": t.$store.state.user.userId }] }
                    getCri = JSON.stringify(data)
                } else if ('510600' === t.$store.state.user.funCode) {
                    const data = { "queryCriteria": [{ "empdimApplicant": t.$store.state.user.userId }] }
                    getCri = JSON.stringify(data)
                } else if ('530300' === t.$store.state.user.funCode) {
                    const data = { "queryCriteria": [{ "empId": t.$store.state.user.sysUsempid }] }
                    getCri = JSON.stringify(data)
                } else if ('530400' === st[2]) {
                    const data = { "queryCriteria": [{ "empId": t.$store.state.user.sysUsempid }] }
                    getCri = JSON.stringify(data)
                } else {
                    getCri = ''
                }
                getDataLevelUserLogin1({
                    _mt: 'platAutoLayoutGetFlowList.getPage',
                    sort: t.sort,
                    order: t.order,
                    rows: t.rows,
                    page: t.page,
                    roleType: t.$store.state.user.roleType,
                    logType: 'getPage',
                    data: getCri,
                    funId: 1191,
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        if (res.data.content[0].rows === '[]') {
                            alert('暂时没有数据需要处理')
                            return
                        } else {
                            let { href } = this.$router.resolve({
                                path: '/main/' + st[0],
                                query: { id: st[1], code: st[2] },
                            })
                            //              console.log(name)
                            window.open(href, '_blank')
                        }
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
            if (st[1] !== '1201' && st[1] !== '1189' && st[1] !== '1190' && st[1] !== '1191') {
                let { href } = this.$router.resolve({
                    path: '/main/' + st[0],
                    query: { id: st[1], code: st[2] },
                })
                window.open(href, '_blank')
            }
        },
    },
}
</script>
<style lang='scss' scoped>
.main {
    width: 100%;
    min-height: 100%;
    position: relative;
    .head {
        width: 100%;
        height: 0;
        padding-top: 588px;
        background: url("../../../../static/employee/bg-02.png") center
            no-repeat;
        background-size: cover;
        position: relative;
        .title {
            position: absolute;
            top: 40px;
            width: 100%;
            height: 0;
            padding-top: 120px;
            background: url("../../../../static/employee/bg-01.png") center
                no-repeat;
            background-size: cover;
            .top {
                position: absolute;
                top: -40px;
                width: 100%;
                height: 40px;
                background-color: #1956a7;
                .tel {
                    position: absolute;
                    right: 20px;
                    color: #ffffff;
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                }
            }
            .content {
                position: absolute;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 55px;
                line-height: 55px;
                padding: 0 20px;
                top: 10px;
                .logo {
                    display: flex;
                    align-items: center;
                    font-size: 18px;
                    color: #ffffff;
                }
                .user {
                    display: flex;
                    align-items: center;
                    height: 55px;
                    font-size: 16px;
                    color: white;
                    a {
                        margin-left: 10px;
                        color: #ffffff;
                    }
                    img {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        margin-right: 10px;
                    }
                }
            }
        }
        .btn {
            width: 1200px;
            position: absolute;
            left: 50%;
            margin-left: -600px;
            top: 200px;
            display: flex;
            padding: 0 40px;
            justify-content: flex-end;
            .dropdown {
                margin-left: 20px;
            }
        }
        .man {
            position: absolute;
            bottom: 0;
            left: 100px;
            width: 500px;
            height: 362px;
            background: url("../../../../static/employee/bg-03.png") center
                no-repeat;
            background-size: cover;
            .font {
                position: absolute;
                top: 110px;
                right: 15px;
                width: 180px;
                height: 80px;
                font-size: 16px;
                color: #222222;
                a {
                    font-size: 18px;
                    font-weight: bold;
                    color: #f7941e;
                }
            }
        }
    }
    .center {
        position: relative;
        width: 1200px;
        padding: 0 30px 30px 30px;
        left: 50%;
        margin-left: -600px;
        display: flex;
        .con {
            width: 50%;
            padding: 20px 50px;
            .title {
                width: 100%;
                height: 50px;
                line-height: 50px;
                position: relative;
                img {
                    margin-top: 10px;
                    position: absolute;
                }
                .titlefont {
                    position: relative;
                    width: 100%;
                    margin-left: 40px;
                    font-size: 16px;
                    a {
                        position: absolute;
                        right: 80px;
                        font-size: 14px;
                    }
                }
            }
            .content {
                .item {
                    position: relative;
                    height: 40px;
                    line-height: 40px;
                    img {
                        position: absolute;
                        top: 9px;
                    }
                    .itemfont {
                        margin-left: 30px;
                        margin-right: 120px;
                        font-size: 14px;
                        overflow: hidden;
                    }
                    .time {
                        position: absolute;
                        top: 0;
                        width: 100px;
                        right: 0;
                    }
                }
            }
        }
    }
    .zhanwei {
        width: 100%;
        position: relative;
        height: 50px;
    }
    .footer {
        background: #d5ecfa;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
}
</style>
