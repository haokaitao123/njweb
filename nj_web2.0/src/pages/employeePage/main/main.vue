<template>
    <div class="main">
        <div class="header">
            <div class="logo">
                <img src="../../../../static/img/logo_02.png"
                     width="130">
            </div>
            <div class="navicon-con">
                {{ $t('title') }}
            </div>
            <div class="header-avator-con">
                <div class="user-dropdown-menu-con">
                    <Row type="flex"
                         justify="end"
                         align="middle">
                        <Poptip trigger="hover"
                                class="mainPop"
                                placement="bottom"
                                width="300">
                            <div class="button-item">
                                <!--<Badge dot count="1">-->
                                <Icon type="ios-telephone"
                                      size="16"></Icon>
                                <!--</Badge>-->
                            </div>
                            <contact slot="content"
                                     v-if="isFinish">
                            </contact>
                        </Poptip>
                        <Poptip trigger="hover"
                                class="mainPop"
                                placement="bottom"
                                width="300">
                            <div class="button-item">
                                <Badge dot
                                       count="1">
                                    <Icon type="android-mail"
                                          size="16"></Icon>
                                </Badge>
                            </div>
                            <message slot="content"
                                     v-if="isFinish">
                            </message>
                        </Poptip>
                        <div class="button-item"
                             v-show="roleTypes.length>1">
                            <Dropdown transfer
                                      trigger="hover"
                                      @on-click="changeRole">
                                <a href="javascript:void(0)"
                                   style="display: block;width: 100%;height: 47px;line-height: 47px;">
                                    <span class="main-user-name">{{ cur_roleTypeName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem :name="item.roleTypeCode + ',' + item.roleTypeName"
                                                  v-for="(item,index) in roleTypes"
                                                  :key="index">{{item.roleTypeName}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div class="button-item"
                             v-show="companyies.length>1">
                            <Dropdown transfer
                                      trigger="hover"
                                      @on-click="changeCompany">
                                <a href="javascript:void(0)"
                                   style="display: block;width: 100%;height: 47px;line-height: 47px;">
                                    <span class="main-user-name">{{ cur_companyName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem :name="item.companyId+','+item.companyName"
                                                  v-for="(item,index) in companyies"
                                                  :key="index">{{item.companyName}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div class="button-item"
                             v-show="languages.length>1">
                            <Dropdown transfer
                                      trigger="hover"
                                      @on-click="changeLanguage">
                                <a href="javascript:void(0)"
                                   style="display: block;width: 100%;height: 47px;line-height: 47px;">
                                    <span class="main-user-name">{{ cur_languageName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem :name="item.lanCode+','+item.lanName"
                                                  v-for="(item,index) in languages"
                                                  style="padding-left: 35px;position: relative;"
                                                  :key="index">
                                        <img :src="'../../static/homeImg/' + item.lanCode + '.png'"
                                             style="position: absolute;left: 8px;top: 8px;" />
                                        {{item.lanName}}
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div class="button-item">
                            <Dropdown transfer
                                      trigger="hover"
                                      @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)"
                                   style="display: block;width: 100%;height: 47px;line-height: 47px;">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="userinfo">{{$t('user.userCenter')}}</DropdownItem>
                                    <DropdownItem name="loginout">{{$t('user.quit')}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <Avatar icon="person"
                                :src="userImg"
                                style="background: #619fe7;margin-left:10px;margin-right: 10px;"></Avatar>
                    </Row>
                </div>
            </div>
        </div>
        <div class="section">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
//  import pubsource from '../lib/pub_source'
import message from '../../../pages/homePage/messageList'
import contact from '../../../pages/homePage/contentList'
import { getDataLevelUserLogin2 } from '../../../axios/axios'
import { setCookie, isSuccess } from '../../../lib/util'

export default {
    data () {
        return {
            isFinish: false,
            isEmpty: false,
            showUserInfo: false,
            shrink: false,
            userName: this.$store.state.user.name,
            userImg: '',
            cur_company: '',
            cur_roleType: '',
            cur_language: '',
            cur_companyName: '',
            cur_roleTypeName: '',
            cur_languageName: '',
            roleTypes: [],
            companyies: [],
            languages: [],
            userFuns: [],
        }
    },
    components: {
        message,
        contact,
    },
    mounted () {
        const t = this
        //      window.onbeforeunload = function () {
        //        t.$route.push('home')
        //        t.$store.commit('clearAllTags')
        //      }
        //      this.getUser()
    },
    methods: {
        getUser () {
            const t = this
            getDataLevelUserLogin2({
                _mt: 'authUserPerm.getSysUserPerm',
                language: 'CN',
                companyId: '0',
                roleType: '0root',
                style: '0',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (Object.keys(res.data.content[0]).length !== 0) {
                        //   setCookie('wtk', res.data.content[0].webToken)
                        t.cur_roleType = res.data.content[0].cur_roleType.roleTypeCode
                        t.cur_company = res.data.content[0].cur_company.companyId
                        t.cur_language = res.data.content[0].cur_language.lanCode
                        t.cur_roleTypeName = res.data.content[0].cur_roleType.roleTypeName
                        t.cur_companyName = res.data.content[0].cur_company.companyName
                        t.cur_languageName = res.data.content[0].cur_language.lanName
                        t.roleTypes = res.data.content[0].roleTypes
                        t.languages = res.data.content[0].cur_roleType.languages
                        t.companyies = res.data.content[0].cur_roleType.companyies
                        t.userFuns = res.data.content[0].userFuns
                        t.userName = res.data.content[0].usreName
                        t.userImg = pubsource.pub_pubf_downlink + res.data.content[0].userImgMin
                        t.$refs.menu.subdata(res.data.content[0].userFuns)
                        t.$store.commit('setLang', t.cur_language === 'CN' ? 'zh-CN' : 'en-US')
                        t.$store.commit('setId', res.data.content[0].userId)
                        t.$store.commit('setCompanyId', res.data.content[0].cur_company.companyId)
                        t.$store.commit('setRoleType', res.data.content[0].cur_roleType.roleTypeCode)
                        t.$store.commit('clearAllTags')
                        t.$router.push('/home')
                        t.isFinish = true
                    } else {
                        t.isEmpty = true
                        t.showUserInfo = true
                        t.$refs.userinfo.getInfo()
                        t.$refs.userinfo.getSelect()
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getUser2 () {
            const t = this
            getDataLevelUserLogin2({
                _mt: 'authUserPerm.getSysUserPerm',
                language: t.cur_language,
                companyId: t.cur_company,
                roleType: t.cur_roleType,
                style: '1',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (Object.keys(res.data.content[0]).length !== 0) {
                        //   setCookie('wtk', res.data.content[0].webToken)
                        t.cur_roleType = res.data.content[0].cur_roleType.roleTypeCode
                        t.cur_company = res.data.content[0].cur_company.companyId
                        t.cur_language = res.data.content[0].cur_language.lanCode
                        t.cur_roleTypeName = res.data.content[0].cur_roleType.roleTypeName
                        t.cur_companyName = res.data.content[0].cur_company.companyName
                        t.cur_languageName = res.data.content[0].cur_language.lanName
                        t.roleTypes = res.data.content[0].roleTypes
                        t.languages = res.data.content[0].cur_roleType.languages
                        t.companyies = res.data.content[0].cur_roleType.companyies
                        t.userFuns = res.data.content[0].userFuns
                        t.$refs.menu.subdata(res.data.content[0].userFuns)
                        t.$store.commit('setId', res.data.content[0].userId)
                        t.$store.commit('setCompanyId', res.data.content[0].cur_company.companyId)
                        t.$store.commit('setRoleType', res.data.content[0].cur_roleType.roleTypeCode)
                        t.$store.commit('clearAllTags')
                        t.$router.push('/home')
                        t.isFinish = true
                    } else {
                        t.isEmpty = true
                        t.showUserInfo = true
                        t.$refs.userinfo.getInfo()
                        t.$refs.userinfo.getSelect()
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        /*
        * 改变角色
        * */
        changeRole (name) {
            const arr = name.split(',')
            this.cur_roleTypeName = arr[1]
            this.cur_roleType = arr[0]
            for (let i = 0; i < this.roleTypes.length; i++) {
                if (this.roleTypes[i].roleTypeCode === arr[0]) {
                    this.cur_company = this.roleTypes[i].companyies[0].companyId
                }
            }
            this.getUser2()
            //        this.cur_roleType = name
        },
        /*
         * 改变公司
         * */
        changeCompany (name) {
            const arr = name.split(',')
            this.cur_companyName = arr[1]
            this.cur_company = arr[0]
            this.getUser2()
        },
        /*
         * 改变语言
         * */
        changeLanguage (name) {
            const arr = name.split(',')
            this.cur_languageName = arr[1]
            this.cur_language = arr[0]
            if (arr[0] === 'CN') {
                this.lang = 'zh-CN'
                this.$store.commit('setLang', 'zh-CN')
            } else {
                this.lang = 'en-US'
                this.$store.commit('setLang', 'en-US')
            }
            //        window.location.reload()
            this.getUser2()
        },
        toggleClick (t) {
            this.shrink = t
        },
        loginout () {
            this.$router.push('/loginmain/login')
        },
        handleClickUserDropdown (name) {
            if (name === 'userinfo') {
                this.showUserInfo = true
                this.$refs.userinfo.getInfo()
                this.$refs.userinfo.getSelect()
            } else {
                const t = this
                getDataLevelUserLogin2({ _mt: 'userMgmt.logout' }).then((res) => {
                    //            if (isSuccess(res, t)) {
                    t.$router.push('/employeeHome')
                    layer.closeAll()//关闭即时通讯
                    //            }
                }).catch(() => {
                    t.$router.push('/employeeHome')
                    layer.closeAll()//关闭即时通讯
                    //            this.$Modal.error({
                    //              title: this.$t('reminder.err'),
                    //              content: this.$t('reminder.errormessage'),
                    //            })
                })
            }
        },
        close () {
            this.showUserInfo = false
        },
        checkTag (name) {
            const openpageHasTag = this.pageTagsList.some((item) => {
                if (item.name === name) {
                    return true
                }
                return false
            })
            if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                //          util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {})
            }
        },
    },
    computed: {
        pageTagsList () {
            return this.$store.state.app.pageOpenedList
        },
    },
    created () {
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList')
    },
    watch: {
        '$route' () {
            //        console.log(to,from)
        },
    },
}
</script>
<style>
.mainPop .ivu-poptip-inner .ivu-poptip-body {
    padding: 0;
}
</style>
<style lang="scss" scoped>
.main {
    height: 100%;
}
.main::before {
    content: "";
    display: table;
}
.header {
    width: 100%;
    height: 47px;
    position: fixed;
    background-color: #0089dd;
    z-index: 999;
    .logo {
        padding: 5px 0;
        font-size: 32px;
        width: 200px;
        height: 47px;

        line-height: 47px;
        color: #fff;
        font-weight: bold;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .logo:hover {
        cursor: pointer;
        transition: all 0.3s;
        background-color: rgba(255, 255, 255, 0.1);
    }
    .navicon-con {
        font-size: 14px;
        color: #fff;
        line-height: 47px;
        height: 47px;
        padding-left: 200px;
    }
    .header-avator-con {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        line-height: 100%;
        .user-dropdown-menu-con {
            height: 100%;
        }
    }
    .main-user-name {
        color: #fff;
    }
}
.section {
    /*height: calc(100% - 47px);*/
    height: 100%;
    width: 100%;
    /*display: flex;*/
    .left {
        background-color: #495060;
        height: 100%;
        font-size: 12px;
        transition: width 0.3s;
    }
    .right {
        position: absolute;
        top: 47px;
        right: 0;
        bottom: 0;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #f0f0f0;
        z-index: 1;
        transition: left 0.3s;
        .pagetab {
            height: 40px;
            border-bottom: #ddd 1px solid;
        }
        .single-page {
            margin: 0 10px;
        }
    }
}
.button-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 47px;
    padding: 0 10px;
    min-width: 50px;
    color: #fff;
}
.button-item:hover {
    cursor: pointer;
    transition: all 0.3s;
    background-color: rgba(255, 255, 255, 0.1);
}
.ivu-poptip-body {
    padding: 0;
}
</style>
