<template>
    <div class="main">
        <div class="header">
            <div class="logo">
                <img src="../../static/img/HROCloud_Logo_nj.png"
                     width="130">
            </div>
            <div class="navicon-con">
                纳杰智能数字化管理平台
            </div>
            <div class="header-avator-con">
                <div class="user-dropdown-menu-con">
                    <Row type="flex"
                         justify="end"
                         align="middle">
                        <Poptip class="mainPop"
                                placement="bottom"
                                width="300"
                                style="display: none">
                            <div class="button-item">
                                <!--<Badge dot count="1">-->
                                <!--<Icon type="ios-telephone" size="16"></Icon>-->
                                <!--</Badge>-->
                            </div>
                            <!-- <contact slot="content" ref="contact" v-if="isFinish">
              </contact> -->
                        </Poptip>
                        <!-- <div class="button-item"
                             @click="upLayIM"
                             v-show="cur_roleType === '3user' || cur_roleType === '3user-hrbp'">
                            <Icon type="social-twitch-outline"
                                  style="margin-right: 5px;"></Icon>{{$t('lang_homePage.menuItem.iquestion')}}
                        </div> -->
                        <!--<Poptip trigger="hover" class="mainPop" placement="bottom" width="300" >-->
                        <!--<div class="button-item">-->
                        <!--<Badge dot count="1">-->
                        <!--<Icon type="android-mail" size="16"></Icon>-->
                        <!--</Badge>-->
                        <!--</div>-->
                        <!--<message slot="content" v-if="isFinish">-->
                        <!--</message>-->
                        <!--</Poptip>-->
                        <div class="button-item"
                             v-show="roleTypes.length>1">
                            <Dropdown transfer
                                      trigger="hover"
                                      @on-click="changeRole">
                                <a href="javascript:void(0)"
                                   style="display: block;width: 100%;height: 47px;line-height: 47px;">
                                    <Icon type="android-desktop"
                                          style="color: white;"></Icon>
                                    <span class="main-user-name">{{ cur_roleTypeName }}</span>
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
                        <!-- <div class="button-item">
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
                        </div> -->
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
                                    <!-- <DropdownItem name="setBusiness" >{{$t('lang_homePage.menuItem.businessupport')}}</DropdownItem> -->
                                    <DropdownItem name="setApproval"
                                                  v-show="cur_roleType === '3user' || cur_roleType === '3user-hrbp'">{{$t('lang_homePage.menuItem.platsetting')}}</DropdownItem>
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
        <div class="section"
             v-show="!showUserInfo">
            <hrmenu class="left"
                    @toggleClick="toggleClick"
                    ref="menu"></hrmenu>
            <div class="right"
                 :style="{left: shrink?'64px':'200px'}">
                <pagetab class="pagetab"
                         :pageTagsList="pageTagsList"></pagetab>
                <div class="single-page">
                    <!--<keep-alive>-->
                    <router-view></router-view>
                    <!--</keep-alive>-->
                </div>
            </div>
        </div>
        <userinfo v-show="showUserInfo"
                  :isEmpty="isEmpty"
                  ref="userinfo"
                  @close="close"></userinfo>
        <transition name="fade">
            <loginim v-show="showIM"
                     ref="loginim"
                     @closeIM="closeIM"></loginim>
        </transition>
        <el-dialog :title="$t('lang_homePage.platSetting.title')"
                   style="margin: 0 auto !important;"
                   width='1000px'
                   :visible.sync="openUpdate"
                   @close="closeAppro">
            <Form ref="form"
                  :model="form"
                  :rules="ruleValidate"
                  :label-width="135"
                  style="border-radius: 10px !important;">
                <Row style="display: flex;align-items: flex-start">
                    <i-col span="11">
                        <FormItem :label="$t('lang_homePage.platSetting.platApvset')"
                                  prop="platApvset">
                            <Select v-model="form.platApvset"
                                    style="width:300px;">
                                <Option v-for="(item,index) in Repeattype"
                                        :key="index"
                                        :value="item.paramCode">{{item.paramInfoCn}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           style="padding-top: 5px">
                        <span style="font-size: 12px">{{$t('lang_homePage.platSetting.apMethod')}}</span>
                    </i-col>
                </Row>
                <Row style="text-align: right">
                    <Button type="ghost"
                            @click="closeAppro">{{$t('button.cal')}}</Button>
                    <Button type="primary"
                            @click="savePlatApvset">{{$t('button.sav')}}</Button>
                </Row>
            </Form>
        </el-dialog>
    </div>
</template>
<script>
import userinfo from './useinfo/useinfo'
import hrmenu from '../components/menu/menu'
import pagetab from '../components/pagetab/pagetab'
import message from '../pages/homePage/messageList'
// import contact from '../pages/homePage/contentList'
import loginim from '../pages/homePage/loginIM'
import { getDataLevelUserLogin2, getDataLevelUserLogin, getDataLevelUserLoginNew } from '../axios/axios'
import { setCookie, isSuccess, deepCopy, getCookie } from '../lib/util'
import Bus from '../lib/bus'
export default {
    data () {
        return {
            showIM: false,
            isFinish: false,
            isEmpty: false,
            showUserInfo: false,
            openUpdate: false,
            shrink: false,
            userName: this.$store.state.user.name,
            userImg: '',
            cur_company: '',
            cur_roleType: '',
            cur_language: '',
            cur_companyName: '',
            cur_roleTypeName: '',
            cur_languageName: '',
            form: {},
            roleTypes: [],
            companyies: [],
            languages: [
                {
                    lanCode: 'CN',
                    lanName: '中文',
                },
                {
                    lanCode: 'EN',
                    lanName: 'English',
                },
            ],
            userFuns: [],
            Repeattype: [],
            ruleValidate: {
                platApvset: [
                    { required: true, message: this.$t('lang_homePage.platSetting.apMethodDis'), trigger: 'blur' },
                ],
            }
        }
    },
    components: {
        hrmenu,
        pagetab,
        userinfo,
        message,
        // contact,
        loginim,
    },
    created () {

    },
    mounted () {
        const t = this
        window.onbeforeunload = function () {
            t.$store.commit('clearAllTags')
        }
        this.checkFirstLogin();

    },
    methods: {
        clearIM () {
            closeSocket();
            layer.closeAll(); // 关闭即时通讯
        },
        async checkFirstLogin () {
            const t = this;
            await getDataLevelUserLogin({
                _mt: 'userMgmt.forceUpdPassword',
                funId: '1',
                logType: '强制修改密码',
                loginCode: getCookie('useName'),
            }).then((res) => {
                if (isSuccess(res, t)) {
                    console.log(res, "res");
                    if (res.data.content[0].value === "1" || res.data.content[0].value === "2") {
                        t.$store.commit('changePwd/setChangePwd', true);
                        t.showUserInfo = true;
                        t.$refs.userinfo.showPassWord = true;
                        t.$refs.userinfo.getInfo()
                        t.$refs.userinfo.getSelect()
                    } else {
                        t.$store.commit('changePwd/setChangePwd', false);
                        t.getUser();
                    }
                    if (res.data.content[0].value === "1") {
                        this.$Message.warning('第一次登陆，请修改初始密码');
                    }
                    if (res.data.content[0].value === "2") {
                        this.$Message.warning('密码已失效，请重新设置密码');
                    }
                }
            }).catch(() => {
                this.$Message.error('网络错误');
            })
        },
        async getUser () {
            const t = this
            await getDataLevelUserLogin2({
                _mt: 'authUserPerm.getSysUserPerm',
                language: 'CN',
                companyId: '0',
                roleType: '0root',
                style: '0',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (Object.keys(res.data.content[0]).length !== 0) {
                        setCookie('wtk', res.data.content[0].webToken)
                        t.cur_roleType = res.data.content[0].cur_roleType.roleTypeCode
                        t.cur_company = res.data.content[0].cur_company.companyId
                        t.cur_language = res.data.content[0].cur_language.lanCode
                        t.cur_roleTypeName = res.data.content[0].cur_roleType.roleTypeName
                        t.cur_companyName = res.data.content[0].cur_company.companyName
                        t.cur_languageName = res.data.content[0].cur_language.lanName
                        t.roleTypes = res.data.content[0].roleTypes
                        //              t.languages = res.data.content[0].cur_roleType.languages
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
                        Bus.$emit('setCommonFlag', true)
                        setTimeout(() => {
                            t.$router.push('/home')
                        }, 1000)
                        t.isFinish = true
                    } else {
                        t.isEmpty = true
                        t.showUserInfo = true
                        t.$refs.userinfo.getInfo()
                        t.$refs.userinfo.getSelect()
                    }
                }
            }).catch(() => {
                this.$Message.error('网络错误');
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
                        setCookie('wtk', res.data.content[0].webToken)
                        t.cur_roleType = res.data.content[0].cur_roleType.roleTypeCode
                        t.cur_company = res.data.content[0].cur_company.companyId
                        //              t.cur_language = res.data.content[0].cur_language.lanCode
                        t.cur_roleTypeName = res.data.content[0].cur_roleType.roleTypeName
                        t.cur_companyName = res.data.content[0].cur_company.companyName
                        //              t.cur_languageName = res.data.content[0].cur_language.lanName
                        t.roleTypes = res.data.content[0].roleTypes
                        //              t.languages = res.data.content[0].cur_roleType.languages
                        t.companyies = res.data.content[0].cur_roleType.companyies
                        t.userFuns = res.data.content[0].userFuns
                        t.$refs.menu.subdata(res.data.content[0].userFuns)
                        t.$store.commit('setId', res.data.content[0].userId)
                        t.$store.commit('setCompanyId', res.data.content[0].cur_company.companyId)
                        t.$store.commit('setRoleType', res.data.content[0].cur_roleType.roleTypeCode)
                        t.$store.commit('clearAllTags')
                        Bus.$emit('setCommonFlag', true)
                        Bus.$emit('getAllDataMain')
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
        closeAppro () {
            this.openUpdate = false
        },
        /*
        * 改变角色
        * */
        changeRole (name) {
            const arr = name.split(',')
            if (arr[1] != '3user') {
                layer.closeAll()
                //          this.clearIM();
            }
            this.cur_roleTypeName = arr[1]
            this.cur_roleType = arr[0]
            for (let i = 0; i < this.roleTypes.length; i++) {
                if (this.roleTypes[i].roleTypeCode === arr[0]) {
                    this.cur_company = this.roleTypes[i].companyies[0].companyId
                }
            }
            Bus.$emit('stopRequest', false)
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
            //      setTimeout(function(){
            //      	window.location.reload()
            //      },2000)
            // window.location.reload()
            this.getUser2()
        },
        toggleClick (t) {
            this.shrink = t
        },
        handleClickUserDropdown (name) {
            if (name === 'userinfo') {
                this.showUserInfo = true
                this.$refs.userinfo.getInfo()
                this.$refs.userinfo.getSelect()
            } else if (name === 'setApproval') {
                this.getSelect()
                this.getPlatApvset()
            } else if (name === 'setBusiness') {
                //          console.log(this.$refs.contact)
                this.$refs.contact.modal2 = true
                this.$refs.contact.getListData()
            } else if (name === 'loginout') {
                const t = this
                Bus.$emit('stopRequest', false)
                getDataLevelUserLogin2({ _mt: 'userMgmt.logout' }).then((res) => {
                    this.clearIM();
                    localStorage.removeItem('soket_state')
                    this.$store.commit('setStatus', false)
                    window.location.reload()
                    this.$router.push('loginmain/login')
                }).catch(() => {
                    this.clearIM();
                    t.$router.push('loginmain/login')
                })
            }
        },
        /**
         * 获取审批设置
         * */
        getPlatApvset () {
            const t = this
            const data = {
                _mt: 'platPersonalset.getByUserEmp',
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].platEmpid) {
                        this.form = res.data.content[0]
                        if (!this.form.platApvset) {
                            this.form.platApvset = '01stepbystep'
                        }
                        this.openUpdate = true
                    } else {
                        t.$Modal.warning({
                            title: this.$t('reminder.remind'),
                            content: this.$t('lang_homePage.platSetting.noEmpleeRemind'),
                        })
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        savePlatApvset () {
            const t = this
            const data = deepCopy(t.form)
            data._mt = 'platPersonalset.addOrUpd'
            data.funId = '1'
            data.logType = '保存审批设置数据'
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginNew(data).then((res) => {
                        if (isSuccess(res, t)) {
                            this.closeAppro()
                            t.$Modal.success({
                                title: this.$t('reminder.suc'),
                                content: this.$t('lang_homePage.setSuccess.setSuccess'),
                            })
                        }
                    }).catch(() => {
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
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
        upLayIM () { //打开IM登录
            const t = this
            //改为直接打开面板
            t.$refs.loginim.loginIM()
            //				this.showIM = true
        },
        closeIM () { //关闭IM登录
            this.showIM = false
        },
        /**
         * 下拉参数 personalapvset
         */
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt: 'baseParmInfo.getSelectValue',
                typeCode: 'personalapvset',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.Repeattype = res.data.content[0].value[0].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
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

.header {
    width: 100%;
    height: 60px;
    position: relative;
    background-color: #0089dd;
    .logo {
        padding: 5px 0;
        font-size: 32px;
        width: 200px;
        height: 60px;
        text-align: center;
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
        line-height: 60px;
        height: 60px;
        padding-left: 200px;
        font-weight: 900;
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
    height: 100%;
    display: flex;
    .left {
        background-color: #495060;
        height: 100%;
        font-size: 12px;
        transition: width 0.3s;
    }
    .right {
        position: absolute;
        top: 60px;
        right: 0;
        bottom: 0;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #f0f0f0;
        // z-index: 1;
        transition: left 0.3s;
        .pagetab {
            height: 40px;
            border-bottom: #ddd 1px solid;
        }
        .single-page {
            margin: 10px;
        }
    }
}
.button-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
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
