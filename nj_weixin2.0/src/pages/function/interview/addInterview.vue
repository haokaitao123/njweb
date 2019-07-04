<template>
    <div class="addInterview">
        <div class="addInterviewWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!--申请人-->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!curStep"
                          value-align="left"
                          v-model="applyMan"
                          v-verify="form.relibFirstus"
                          @click.native="popupClick('disShow','relibFirstus')">
                        <div slot="title">申请人</div>
                    </cell>
                    <!--<icon type="warn"
                          class="error"
                          v-show="empIdName=='请选择'?true:false"
                          v-remind="form.empId"></icon>-->
                    <x-input title="申请人姓名"
                             v-model="applyMan"
                             v-if="curStep"
                             v-verify="form.relibFirstus"
                             :show-clear="false"
                             :disabled="curStep"
                             :placeholder="curStep?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 应聘岗位 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!curStep"
                          value-align="left"
                          v-model="relibApplypostDis"
                          v-verify="form.relibApplypost"
                          @click.native="popupClick('relibApplypostShow')">
                        <div slot="title">应聘岗位<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="relibApplypostDis==='请选择'"
                          v-remind="form.relibApplypost"></icon>
                    <x-input title="应聘岗位<span>*</span>"
                             v-if="curStep"
                             v-model="relibApplypostDis"
                             :show-clear="false"
                             :disabled="curStep"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 姓名 -->
                <div class="item_box">
                    <x-input title="姓名<span>*</span>"
                             v-model="form.relibName"
                             v-verify="form.relibName"
                             :show-clear="false"
                             :disabled="curStep"
                             :placeholder="curStep?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibName==''?true:false"
                          v-remind="form.relibName"></icon>
                </div>
                <!-- 性别 -->
                <div class="item_box">
                    <cell title="性别"
                          v-if='!curStep'
                          is-link
                          value-align="left"
                          v-model="relibGenderDis"
                          v-verify="form.relibGender"
                          @click.native="popupClick('relibGenderShow','relibGender')">
                        <div slot="title">性别<span>*</span></div>
                    </cell>

                    <icon type="warn"
                          class="error"
                          v-show="relibGenderDis=='请选择'"
                          v-remind="form.relibGender"></icon>
                    <x-input title="性别<span>*</span>"
                             v-if='curStep'
                             v-model="relibGenderDis"
                             :show-clear="false"
                             :disabled="curStep"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 手机号码 -->
                <div class="item_box">
                    <x-input title="手机号码<span>*</span>"
                             v-model.trim="form.relibMobile"
                             :disabled="curStep"
                             v-verify="form.relibMobile"
                             :show-clear="false"
                             :placeholder="curStep?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibMobile==''"
                          v-remind="form.relibMobile"></icon>
                </div>
                <!-- 面到时间 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          value-align="left"
                          v-model="form.relibFilldate"
                          v-if='(!curStep||!reexamine)'
                          v-verify="form.relibFilldate"
                          @click.native="popupClick('relibFilldateShow','relibFilldate')">
                        <div slot="title">面到时间<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibFilldate=='请选择'?true:false"
                          v-remind="form.relibFilldate"></icon>
                    <x-input title="面到时间<span>*</span>"
                             v-if='curStep&&reexamine'
                             v-model="form.relibFilldate"
                             :show-clear="false"
                             :disabled="curStep"
                             placeholder="未填写">
                    </x-input>
                </div>

                <!--招聘人-->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!curStep"
                          value-align="left"
                          v-model="empIdName"
                          v-verify="form.relibInviteman"
                          @click.native="popupClick('empShow','relibInviteman')">
                        <div slot="title">招聘人</div>
                    </cell>
                    <!--<icon type="warn"
                          class="error"
                          v-show="empIdName=='请选择'?true:false"
                          v-remind="form.empId"></icon>-->
                    <x-input title="招聘人"
                             v-model="empIdName"
                             v-if="curStep"
                             v-verify="form.relibInviteman"
                             :show-clear="false"
                             :disabled="curStep"
                             :placeholder="curStep?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 初试意见 -->
                <x-textarea :max="300"
                            title="初试意见"
                            :height="95"
                            v-model="relibFirstopin"
                            :disabled='curStep'
                            placeholder="未填写"
                            :show-counter="true"
                            v-if="curStepCode==='flow_recruitprocess_1000'&&curStepstate==='p_flowst_3'"></x-textarea>
                <!-- 复试意见 -->
                <x-textarea :max="300"
                            title="复试意见"
                            :height="95"
                            v-model="relibCheckopin"
                            :disabled='curStep'
                            placeholder="未填写"
                            :show-counter="true"
                            v-if="curStepCode!=='flow_recruitprocess_1010'&&curStepCode!=='flow_recruitprocess_1000'&&curStepCode!==''"></x-textarea>
                <!-- 备注 -->
                <x-textarea :max="300"
                            title="备注"
                            :height="95"
                            v-model="form.note"
                            :disabled='curStep'
                            :placeholder="curStep?'未填写':'请填写'"
                            :show-counter="true"></x-textarea>

            </group>
            <div class="save_button">
                <x-button type="primary"
                          class="x_button"
                          @click.native="save"
                          :disabled="curStep?reexamine:curStep"
                          action-type="button">保存</x-button>
            </div>

        </div>
        <!-- 性别 -->
        <van-popup v-model="relibGenderShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibGenderIndex"
                        :columns=selectGender
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 岗位 -->
        <van-popup v-model="relibApplypostShow"
                   position="right"
                   class="popup_width">
            <searchPost @inputPost="inputPost"
                        :currentId="currentPostId"
                        v-if="relibApplypostShow"
                        ref="searchPost"></searchPost>
        </van-popup>
        <!--申请人-->
        <van-popup v-model="disShow"
                   position="right"
                   class="popup_width">
            <searchEmp @inputEmp="applyEmp"
                       :currentId="form.relibFirstus"
                       v-if="disShow"
                       ref="searchEmp"></searchEmp>
        </van-popup>
        <!--招聘人-->
        <van-popup v-model="empShow"
                   position="right"
                   class="popup_width">
            <searchEmp @inputEmp="inputEmp"
                       :currentId="form.relibInviteman"
                       v-if="empShow"
                       ref="searchEmp"></searchEmp>
        </van-popup>
        <van-popup v-model="relibFilldateShow"
                   position="bottom">
            <van-datetime-picker v-model="relibFilldateDate"
                                 type="datetime"
                                 :min-date="minRelibFilldate"
                                 :max-date="maxRelibFilldate"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
    </div>
</template>
<script>
import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
import { Group, Cell, XInput, XTextarea, Icon, Popup } from 'vux'
import searchPost from '@/components/search/searchPost'
import searchEmp from '@/components/search/searchAllEmp'
export default {
    data () {
        return {
            curStepCode: this.$route.query.curStepCode ? this.$route.query.curStepCode : '',
            curStepstate: this.$route.query.curStepstate ? this.$route.query.curStepstate : '',
            curDom: "",
            curDomShow: "",
            disShow: false,
            empShow: false,
            currentPostId: "",
            currentId: "",
            applyMan: JSON.parse(window.localStorage.getItem('empData')).empnhName,
            empIdName: "请选择",
            relibFilldateDate: new Date(),
            minRelibFilldate: new Date(),
            maxRelibFilldate: new Date(2099, 12, 31),
            form: {
                relibApplypost: "",          //应聘岗位
                relibName: "",              // 姓名
                relibGender: "",            // 性别
                relibMobile: "",            // 手机号码
                relibFilldate: "请选择",     // 面到时间 
                relibInviteman: "",       // 招聘者id
                relibFirstus: window.localStorage.getItem('empId'),  //申请人id				
                note: ""                    // 备注
            },
            recruiterDis: '请选择',
            relibApplypostDis: '请选择',
            relibGenderDis: '请选择',
            selectGender: [],
            relibGenderIndex: 0,
            relibGenderShow: false,
            relibFilldateShow: false,
            relibApplypostShow: false,
            curStep: this.$route.query.curStep ? true : false,
            saveState: false,
            blackState: false,
            relibFirstopin: "",
            relibCheckopin: "",
            idRecord: "",
            disabled: false,
            reexamine: this.$route.query.reexamine
        }
    },
    verify: {
        form: {
            relibApplypost: "required",
            relibName: "required",
            relibGender: "required",
            relibMobile: ["required", "mobile"],
            relibFilldate: "required",
        }
    },
    components: {
        Group,
        Cell,
        XInput,
        Icon,
        XTextarea,
        Popup,
        searchPost,
        searchEmp
    },
    mounted () {
        this.getData();
        this.getSelect();
    },
    methods: {
        //保存
        async save () {
            const t = this;
            if (t.$verify.check()) {
                const data = deepCopy(t.form);
                data._mt = "wxRecruitProcess.addRecruit";
                data.companyId = pubsource.companyId;
                data.userId = window.localStorage.getItem('uid');
                let listId = t.$route.query.id;
                if (listId !== undefined) {
                    data.pkValue = listId;
                    data.curStep = this.$route.query.curStepId
                    t.saveState = true;
                } else {
                    if (t.oldName != t.form.relibName || t.oldTele != t.form.relibMobile) {
                        t.saveState = false
                    }
                    if (!t.saveState) {
                        await t.haveRecruit();
                    }
                    data.idRecord = t.idRecord;
                    data.pkValue = 0
                }
                for (const dat in data) {
                    if (data[dat] === "") {
                        delete data[dat];
                    }
                }
                console.log(t.saveState, "t.saveState")
                if (t.saveState) {
                    getDataLevelUserLoginNew(data).then(res => {
                        if (isSuccess(res, t)) {
                            console.log(res, "res");
                            t.$notify({
                                message: '保存成功',
                                duration: 1500,
                                background: '#1989fa'
                            });
                            this.$router.push({
                                name: 'interview'
                            })
                        }
                    }).catch(() => {
                        t.$notify({
                            message: '网络错误',
                            duration: 1500,
                            background: '#f44'
                        });
                    }).finally(() => {
                        t.saveState = false;
                        t.$store.commit('hideLoading');
                    });
                }
            }
        },
        //是否面试过
        async haveRecruit () {
            const t = this;
            const data = deepCopy(t.form);
            data._mt = "wxRecruitProcess.getPersonInfo";
            data.companyId = pubsource.companyId;
            data.userId = window.localStorage.getItem('uid');
            await getDataLevelUserLoginNew(data).then(res => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    console.log(data, "data");
                    if (JSON.stringify(data) !== "{}") {
                        t.oldName = t.form.relibName;
                        t.oldTele = t.form.relibMobile;
                        if (data.times === '-100') {
                            t.$dialog.alert({
                                message: '注意此面试人员为黑名单用户！'
                            }).then(() => {
                                t.saveState = true;
                            });
                        } else {
                            let name = t.form.relibName;
                            let reason = t.relibApplypostDis;
                            let num = data.times;
                            t.idRecord = data.id;
                            t.saveState = true;
                            t.$dialog.alert({
                                message: `<div style="line-height:1.2;text-align:left">
                                                    <p style="margin-bottom:10px"><b >面试人:</b>${name}</span>
                                                    <p style="line-height:1.5"><b >面试岗位：</b>${reason}</p>
                                                    <p style="line-height:1.5"><b >面试次数：</b>${num}</p>
                                            </div>`
                            }).then(() => {
                                t.saveState = true;
                            });
                        }
                    } else {
                        t.saveState = true;
                    }
                }
            }).catch(() => {
                t.$notify({
                    message: '网络错误',
                    duration: 1500,
                    background: '#f44'
                });
            }).finally(() => {
                t.$store.commit('hideLoading');
            });
        },
        // //黑名单用户
        // async blacklist () {
        //     const t = this;
        //     // const data = {
        //     //     _mt : "",
        //     //     companyId : pubsource.companyId,
        //     //     userId : window.localStorage.getItem('uid'),
        //     // }
        //     //  await getDataLevelUserLoginNew(data).then(res => {
        //     //     if (isSuccess(res, t)) {
        //     //         let data = JSON.parse(res.data.content[0].value);
        //     //         console.log(data, "data");

        //     //     }
        //     // }).catch(() => {
        //     //     t.$notify({
        //     //         message: '网络错误',
        //     //         duration: 1500,
        //     //         background: '#f44'
        //     //     });
        //     // }).finally(() => {
        //     //     t.$store.commit('hideLoading');
        //     // });
        //     await t.$dialog.alert({
        //         message: '面试人员为黑名单人员'
        //     }).then(() => {
        //         // on close
        //         t.saveState = true;
        //     });
        // },
        //申请人弹出框事件
        applyEmp (res) {
            this.disShow = false;
            this.form.relibFirstus = res.id;
            this.applyMan = res.empnhName;
        },
        //员工弹出框事件
        inputEmp (res) {
            this.empShow = false;
            this.form.relibInviteman = res.id;
            this.empIdName = res.empnhName;
        },
        //底部弹出
        popupClick (domShow, dom) {
            this.curDom = dom;
            this.curDomShow = domShow;
            this[domShow] = true;
        },
        //底部弹出确定事件
        confirm (value) {
            if (this.curDomShow.indexOf("dateShow") != -1) {
                value = new Date(value).format('yyyy-MM-dd hh:mm:ss');
                this.currentDate = new Date();
                this.form[this.curDom] = value
            } else {
                this.form[this.curDom] = value.key;
                let str = this.curDom
                str += "Dis";
                this[str] = value.text;
            }
            this[this.curDomShow] = false;
        },
        //底部弹出取消事件
        cancel (value) {
            this[this.curDomShow] = false;
        },
        //获取详情数据
        getData () {
            const t = this;
            if (t.$route.query.id === undefined) {
                return;
            }
            const data = {
                _mt: 'wxRecruitProcess.getById',
                companyId: pubsource.companyId,
                id: t.$route.query.id,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    t.relibFirstopin = data.relibFirstopin ? data.relibFirstopin : '';
                    t.relibCheckopin = data.relibCheckopin ? data.relibCheckopin : '';
                    t.form.relibFirstus = data.relibFirstus ? data.relibFirstus : '';
                    t.form.relibName = data.relibName;
                    t.form.relibGender = data.relibGender;
                    t.form.relibMobile = data.relibMobile;
                    t.form.relibFilldate = data.relibFilldate;
                    t.form.relibApplypost = data.relibApplypost;
                    t.form.relibInviteman = data.relibInviteman;
                    t.form.note = data.note;
                    if (t.curStep) {
                        t.empIdName = data.relibInvitemanDis ? data.relibInvitemanDis : "未选择";
                    } else {
                        t.empIdName = data.relibInvitemanDis ? data.relibInvitemanDis : "请选择";
                    }
                    t.applyMan = data.relibFirstusDis ? data.relibFirstusDis : '';
                    t.relibApplypostDis = data.relibApplypostDis;
                    t.relibGenderDis = data.relibGenderDis;
                    t.relibFilldateDate = new Date(data.relibFilldate.replace(/-/g, '/'));
                    let nowdate = new Date(data.relibFilldate.replace(/-/g, '/'));
                    nowdate.setMonth(nowdate.getMonth() - 1);
                    t.minRelibFilldate = new Date(nowdate);
                    t.setSelectValue(data.relibGenderDis, 'selectGender', 'relibGenderIndex');
                }
            }).catch((err) => {
                t.$notify({
                    message: '网络错误',
                    duration: 1500,
                    background: '#f44'
                });
            }).finally(() => {
                t.$store.commit('hideLoading');
            });;
        },
        //查询下拉列表
        getSelect () {
            const t = this;
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: 'gender'
            }).then(res => {
                if (isSuccess(res, t)) {
                    t.selectData(res.data.content[0].value[0].paramList, "selectGender");
                }
            }).catch(() => {
                t.$notify({
                    message: '网络错误',
                    duration: 1500,
                    background: '#f44'
                });
            }).finally(() => {
                t.$store.commit('hideLoading');
            });
        },
        //下拉列表数据处理
        selectData (res, dom) {
            let newData = [];
            res.forEach((item, i) => {
                let obj = {};
                obj.text = item.paramInfoCn;
                obj.key = item.paramCode;
                obj.index = i
                newData.push(obj);
            })
            this[dom] = newData;
        },
        //下拉选中默认值
        setSelectValue (value, data, index) {
            for (let k of this[data]) {
                if (k.text === value) {
                    this[index] = k.index;
                    return k.index;
                }
            }
        },
        //岗位弹出框选中事件
        inputPost (res) {
            console.log(res, "res")
            this.relibApplypostShow = false;
            this.form.relibApplypost = res.id;
            this.currentPostId = res.id;
            this.relibApplypostDis = res.postFname;
        },
    },
}
</script>
<style lang="less">
.addInterview {
    height: 100%;
    background: #f6f6f6;
    .addInterviewWrap {
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        background: #f6f6f6;
        margin-bottom: 100px;
        .save_button {
            padding: 46px 70px;
            .x_button {
                color: #fff;
                font-size: 34px;
            }
        }
    }
}
.van-popup--right {
    top: 50% !important;
}
.right_popup {
    width: 100%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}
.popup_width {
    width: 80%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}
</style>
