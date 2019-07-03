<template>
    <div class="dimissionDetail">
        <div class="dimissionDetailWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 申请人-->
                <div class="item_box">
                    <x-input title="申请人"
                             v-model="dimApplicantDis"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 申请时间 -->
                <div class="item_box">
                    <x-input title="申请时间"
                             v-model="form.dimApplydate"
                             :show-clear="false"
                             :disabled="true"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>

                <!-- 员工姓名 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="empIdName"
                          v-verify="form.empId"
                          @click.native="popupClick('empShow','empId')">
                        <div slot="title">员工姓名<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="empIdName==''"
                          v-remind="form.empId"></icon>
                    <x-input title="员工姓名<span>*</span>"
                             v-model="empIdName"
                             v-if="disabled"
                             v-verify="form.empId"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'"
                             :disabled="true">
                    </x-input>
                </div>
                <!-- 证件号码 -->
                <div class="item_box">
                    <x-input title="证件号码"
                             v-model="form.empIdno"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 部门名称 -->
                <div class="item_box">
                    <x-input title="部门名称"
                             v-model="deptIdDis"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 岗位名称 -->
                <div class="item_box">
                    <x-input title="岗位名称"
                             v-model="postIdDis"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 上级经理 -->
                <div class="item_box">
                    <x-input title="上级经理"
                             v-model="dimBuspmpDis"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 手机号码 -->
                <div class="item_box">
                    <x-input title="手机号码"
                             v-model="form.empnhMobile"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 银行账号-->
                <div class="item_box">
                    <x-input title="银行账号<span>*</span>"
                             v-model="form.empnhSalaccount"
                             v-verify="form.empnhSalaccount"
                             :disabled="disabled"
							  @on-blur="bankCheck"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="!bankVaild"
                          v-remind="form.empnhSalaccount"></icon>
                </div>
                <!-- 是否需要离职证明 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="dimCertifiDis"
                          @click.native="popupClick('dimCertifiShow','dimCertifi')">
                        <div slot="title">是否需要离职证明</div>
                    </cell>
                    <x-input title="是否需要离职证明"
                             v-if="disabled"
                             v-model="dimCertifiDis"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 个人邮箱 -->
                <div class="item_box">
                    <x-input title="个人邮箱<span>*</span>"
                             v-model="form.dimPersmail"
                             v-verify="form.dimPersmail"
                             :disabled="disabled"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.dimPersmail==''"
                          v-remind="form.dimPersmail"></icon>
                </div>
                <!-- 离职类型 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="dimTypeDis"
                          v-verify="form.dimType"
                          @click.native="popupClick('dimTypeShow','dimType')">
                        <div slot="title">离职类型<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="dimTypeDis=='请选择'"
                          v-remind="form.dimType"></icon>
                    <x-input title="离职类型<span>*</span>"
                             v-if="disabled"
                             v-model="dimTypeDis"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 离职原因 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="dimReasonDis"
                          v-verify="form.dimReason"
                          @click.native="popupClick('dimReasonShow','dimReason')">
                        <div slot="title">离职原因<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="dimReasonDis=='请选择'"
                          v-remind="form.dimReason"></icon>
                    <x-input title="离职原因<span>*</span>"
                             v-if="disabled"
                             v-model="dimReasonDis"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 问卷调查 -->
                <!-- <div class="item_box">
                    <cell title=""
                          is-link
                          value-align="left"
                          v-model="surveyName"
                          v-verify="surveyName"
                          @click.native="popupClick('surveyShow','surveyName')">
                        <div slot="title">问卷调查<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="surveyName=='请选择'?true:false"
                          v-remind="surveyName"></icon>
                </div> -->
                <!-- 申请离职日期 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.dimLevsqday"
                          v-verify="form.dimLevsqday"
                          @click.native="popupClick('dimLevsqdayShow','dimLevsqday')">
                        <div slot="title">申请离职日期<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.dimLevsqday=='请选择'"
                          v-remind="form.dimLevsqday"></icon>
                    <x-input title="申请离职日期<span>*</span>"
                             v-if="disabled"
                             v-model="form.dimLevsqday"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 交接日期 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.dimLevday"
                          v-verify="form.dimLevday"
                          @click.native="popupClick('dimLevdayShow','dimLevday')">
                        <div slot="title">交接日期<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.dimLevday=='请选择'"
                          v-remind="form.dimLevday"></icon>
                    <x-input title="交接日期<span>*</span>"
                             v-if="disabled"
                             v-model="form.dimLevday"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 最后工作日期 -->
                <!-- <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.dimLaswkday"
                          v-verify="form.dimLaswkday"
                          @click.native="popupClick('dimLaswkdayShow','dimLaswkday')">
                        <div slot="title">最后工作日期<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.dimLaswkday=='请选择'"
                          v-remind="form.dimLaswkday"></icon>
                    <x-input title="最后工作日期<span>*</span>"
                             v-if="disabled"
                             v-model="form.dimLaswkday"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="未填写">
                    </x-input>
                </div> -->
                <!-- 是否工作交接 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="dimIsreceiveDis"
                          @click.native="popupClick('dimIsreceiveShow','dimIsreceive')">
                        <div slot="title">是否工作交接</div>
                    </cell>
                    <x-input title="是否工作交接"
                             v-if="disabled"
                             v-model="dimIsreceiveDis"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 交接人 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-show="!disabled&&form.dimIsreceive==='1'"
                          value-align="left"
                          v-model="dimReceiveDis"
                          @click.native="popupClick('empShow','dimReceive')">
                        <div slot="title">交接人姓名<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="dimReceiveError&&form.dimIsreceive==='1'"></icon>
                    <x-input title="交接人姓名<span>*</span>"
                             v-show="disabled"
                             v-model="dimReceiveDis"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'"
                             :disabled="disabled">
                    </x-input>
                </div>
                <!-- 备注 -->
                <x-textarea :max="300"
                            title="备注"
                            :height="95"
                            v-model="form.note"
                            :disabled="disabled"
                            :placeholder="disabled?'未填写':'请填写'"
                            :show-counter="true"></x-textarea>

            </group>
            <!-- 	 -->
            <div class="save_button"
                 v-if="!disabled">
                <x-button type="default"
                          class="x_button button_left"
                          action-type="button"
                          @click.native="save">保存</x-button>
                <x-button type="primary"
                          class="x_button"
                          @click.native="comfirmSubmit">提交</x-button>
            </div>

        </div>
        <!-- 员工 -->
        <van-popup v-model="empShow"
                   position="right"
                   class="right_popup">
            <searchEmp @inputEmp="inputEmp"
                       v-if="empShow"
                       :currentId="currentId"></searchEmp>
        </van-popup>
        <!-- 问卷调查 -->
        <van-popup v-model="surveyShow"
                   position="right"
                   class="right_popup">
            <survey @inputSurvey="inputSurvey"
                    @closeView="closeView"></survey>
        </van-popup>
        <!-- 是否需要离职证明 -->
        <van-popup v-model="dimCertifiShow"
                   position="bottom">
            <van-picker ref="dimCertifiPicker"
                        :defaultIndex="dimCertifiIndex"
                        :columns=selectDimCertifi
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 离职类型 -->
        <van-popup v-model="dimTypeShow"
                   position="bottom">
            <van-picker ref="dimTypePicker"
                        :defaultIndex="dimTypeIndex"
                        :columns=selectDimType
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 离职原因 -->
        <van-popup v-model="dimReasonShow"
                   position="bottom">
            <van-picker ref="dimReasonPicker"
                        :defaultIndex="dimReasonIndex"
                        :columns=selectDimReason
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 是否工作交接 -->
        <van-popup v-model="dimIsreceiveShow"
                   position="bottom">
            <van-picker ref="dimIsreceivePicker"
                        :defaultIndex="dimIsreceiveIndex"
                        :columns=selectDimIsreceive
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 申请离职日期 -->
        <van-popup v-model="dimLevsqdayShow"
                   position="bottom">
            <van-datetime-picker v-model="dimLevsqdayDate"
                                 type="date"
                                 :min-date="minDimLevsqday"
                                 :max-date="maxDimLevsqday"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 约定离职日期 -->
        <van-popup v-model="dimLevdayShow"
                   position="bottom">
            <van-datetime-picker v-model="dimLevdayDate"
                                 type="date"
                                 :min-date="minDimLevday"
                                 :max-date="maxDimLevday"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 最后工作日期 -->
        <van-popup v-model="dimLaswkdayShow"
                   position="bottom">
            <van-datetime-picker v-model="dimLaswkdayDate"
                                 type="date"
                                 :min-date="minDimLaswkday"
                                 :max-date="maxDimLaswkday"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
    </div>
</template>
<script>
import {
    getDataLevelUserLogin,
    uploadFile,
    getDataLevelUserLoginEmpId
} from '@/axios/axios'
import {
    isSuccess,
    deepCopy
} from '@/lib/util'
import {
    Group,
    Cell,
    XInput,
    XTextarea,
    Icon
} from 'vux'
import searchEmp from '@/components/search/searchEmp'
import valid from '@/lib/pub_valid'
import survey from './survey'
export default {
    data () {
        return {
            id: 0,
            curDom: "",
            curDomShow: "",
            currentId: '',
            dimLevsqdayDate: new Date(),
            minDimLevsqday: new Date(1900, 10, 1),
            maxDimLevsqday: new Date(2099, 12, 31),
            dimLevdayDate: new Date(),
            minDimLevday: new Date(1900, 10, 1),
            maxDimLevday: new Date(2099, 12, 31),
            dimLaswkdayDate: new Date(),
            minDimLaswkday: new Date(1900, 10, 1),
            maxDimLaswkday: new Date(2099, 12, 31),
            form: {
                dimApplicant: localStorage.getItem('uid') ? localStorage.getItem('uid') : '', //申请人
                dimApplydate: new Date().format("yyyy-MM-dd"), //申请日期
                empId: localStorage.getItem('empId') ? localStorage.getItem('empId') : "", //员工id
                empIdno: JSON.parse(localStorage.getItem('empData')).empnhIdno ? JSON.parse(localStorage.getItem('empData')).empnhIdno : '', //证件号码
                deptId: JSON.parse(localStorage.getItem('empData')).deptId ? JSON.parse(localStorage.getItem('empData')).deptId : '', //部门
                postId: JSON.parse(localStorage.getItem('empData')).postId ? JSON.parse(localStorage.getItem('empData')).postId : "", //岗位
                dimBuspmp: JSON.parse(localStorage.getItem('empData')).empnhPmp ? JSON.parse(localStorage.getItem('empData')).empnhPmp : '', //上级经理
                empnhMobile: JSON.parse(localStorage.getItem('empData')).empnhMobile ? JSON.parse(localStorage.getItem('empData')).empnhMobile : "", //手机号码
                empnhSalaccount: JSON.parse(localStorage.getItem('empData')).empnhSalaccount ? JSON.parse(localStorage.getItem('empData')).empnhSalaccount : '', //银行卡号
                dimCertifi: "", //是否需要离职证明
                dimPersmail: "", //个人邮箱
                dimType: "02involuntary", //离职类型
                dimReason: "", //离职原因
                dimLevsqday: new Date().format("yyyy-MM-dd"), //申请离职日期
                dimLevday: "请选择", //约定离职日期
                dimIsreceive: "0", //是否工作交接
                dimReceive: "",//交接人
                note: "" //备注
            },
            dimApplicantDis: JSON.parse(localStorage.getItem('empData')).empnhName ? JSON.parse(localStorage.getItem('empData')).empnhName : "",
            surveyName: '请选择',
            empIdName: JSON.parse(localStorage.getItem('empData')).empnhName ? JSON.parse(localStorage.getItem('empData')).empnhName : "",
            deptIdDis: JSON.parse(localStorage.getItem('empData')).unitFname ? JSON.parse(localStorage.getItem('empData')).unitFname : "",
            postIdDis: JSON.parse(localStorage.getItem('empData')).postFname ? JSON.parse(localStorage.getItem('empData')).postFname : "",
            dimBuspmpDis: JSON.parse(localStorage.getItem('empData')).empnhPmpDis ? JSON.parse(localStorage.getItem('empData')).empnhPmpDis : "",
            dimCertifiDis: "请选择",
            dimTypeDis: "正常离职",
            dimReasonDis: "请选择",
            dimIsreceiveDis: "否",
            dimReceiveDis: '请选择',
            empShow: false,
            dimCertifiShow: false,
            dimTypeShow: false,
            dimReasonShow: false,
            dimIsreceiveShow: false,
            dimCertifiIndex: 0,
            dimTypeIndex: 0,
            dimReasonIndex: 0,
            dimIsreceiveIndex: 1,
            selectDimCertifi: [],
            selectDimType: [],
            selectDimReason: [],
            selectDimIsreceive: [],
            dimLevsqdayShow: false,
            dimLevdayShow: false,
            dimLaswkdayShow: false,
            surveyShow: false,
            saveStatus: false,
            disabled: false,
            dimReceiveError: false,
            bankVaild: true,
        }
    },
    verify: {
        form: {
            empId: "required",
            empnhSalaccount: ["required", "number"],
            dimPersmail: ["required", "email"],
            dimType: "required",
            dimReason: "required",
            dimLevsqday: "required",
            dimLevday: "required",
            dimLaswkday: "required",
            surveyName: "required",
            dimReceive: "required",
        }
    },
    components: {
        Group,
        Cell,
        XInput,
        Icon,
        XTextarea,
        searchEmp,
        survey
    },
    created () {
        let entryDate = new Date(JSON.parse(localStorage.getItem('empData')).empnhEntrydate);
        let now = new Date();
        this.completeDate(entryDate, now, 3)
    },
    mounted () {

        this.getSelect();
        this.getData();
    },
    methods: {
        //判断两个时间段是否相差 m 个月
        completeDate (time1, time2, m) {
            let diffyear = time2.getFullYear() - time1.getFullYear();
            let diffmonth = diffyear * 12 + time2.getMonth() - time1.getMonth();
            if (diffmonth < 0) {
                this.getSevenDayAfter(time2)
                return
            }
            let diffDay = time2.getDate() - time1.getDate();

            if (diffmonth < m || (diffmonth == m && diffDay <= 0)) {

                if (diffmonth == m && diffDay == 0) {
                    let timeA = time1.getHours() * 3600 + 60 * time1.getMinutes() + time1.getSeconds();
                    let timeB = time2.getHours() * 3600 + 60 * time2.getMinutes() + time2.getSeconds();
                    if (timeB - timeA < 0) {
                        this.getSevenDayAfter(time2)
                        return
                    }
                }
                this.getSevenDayAfter(time2)
                return
            }
            this.getOneMonthAfter(time2)
            return
        },
        //获取7天后的日期
        getSevenDayAfter (date) {
            let day = date.setDate(date.getDate() + 7);
            day = new Date(day).format("yyyy-MM-dd")
            this.form.dimLevday = day
        },
        //获取一个月后的日期
        getOneMonthAfter (date) {
            let Month = date.setMonth(date.getMonth() + 1);
            Month = new Date(Month).format("yyyy-MM-dd")
            this.form.dimLevday = Month
        },
        //银行账号
        bankCheck () {
            if (this.form.empnhSalaccount == '') {
                this.bankVaild = false;
                return
            }
            if (valid.val_backNumber(this.form.empnhSalaccount) == 1) {
                this.bankVaild = false;
                this.$vux.toast.text('银行卡号长度必须在16到19之间！', 'number');
                return;
            } else if (valid.val_backNumber(this.form.empnhSalaccount) == 2) {
                this.bankVaild = false;
                this.$vux.toast.text('银行卡号码必须全为数字', 'number');
                return
            } else if (valid.val_backNumber(this.form.empnhSalaccount) == 3) {
                this.bankVaild = false;
                this.$vux.toast.text('银行卡号开头6位不符合规范', 'number');
                return
            }
            this.bankVaild = true;
        },
        //保存
        async save (type) {
            const t = this;
            this.dimReceiveCheck();
            if (this.$verify.check() && this.dimReceiveCheck()) {
                const data = deepCopy(t.form);
                data._mt = "wxPublicProcess.addProcess";
                data.companyId = pubsource.companyId;
                data.userId = window.localStorage.getItem('uid');
                data.flowId = '1024';
                data.tbName = 'emp_empdim';
                let listId = this.$route.query.id;
                if (listId !== undefined) {
                    data.pkValue = listId
                } else {
                    data.pkValue = t.id
                }
                for (const dat in data) {
                    if (data[dat] === "" || data[dat] === "请选择") {
                        delete data[dat];
                    }
                }
                await getDataLevelUserLoginEmpId(data).then(res => {
                    if (isSuccess(res, t)) {
                        console.log(res, "res");
                        let data = JSON.parse(res.data.content[0].value);
                        t.id = data.id
                        t.saveStatus = true;
                        if (type !== 'submit') {
                            t.$notify({
                                message: '保存成功',
                                duration: 1500,
                                background: '#1989fa'
                            });
                        }
                    }
                }).catch(() => {
                    t.saveStatus = false
                    t.$notify({
                        message: '网络错误',
                        duration: 1500,
                        background: '#f44'
                    });
                }).finally(() => {
                    t.$store.commit('hideLoading');
                });

            } else {
                t.saveStatus = false
                t.$vux.toast.text('请检查填写信息');
            }
        },
        dimReceiveCheck () {
            if (this.form.dimReceive === "" && this.form.dimIsreceive === "1") {
                this.dimReceiveError = true;
                return false
            } else {
                this.dimReceiveError = false;
                return true
            }
        },
        comfirmSubmit () {
            if (this.$verify.check() && this.bankVaild) {
                this.$dialog.confirm({
                    title: '',
                    message: '是否确认提交？'
                }).then(() => {
                    this.submit();
                }).catch(() => {
                    // on cancel
                });
            }
        },
        //提交
        async submit () {
            await this.save('submit');
            const t = this;
            if (this.saveStatus) {
                const data = {
                    _mt: 'wxPublicProcess.submitProcess',
                    companyId: pubsource.companyId,
                    userId: localStorage.getItem('uid'),
                    pkValue: this.$route.query.id ? this.$route.query.id : t.id,
                    tbName: 'emp_empdim'
                }
                getDataLevelUserLogin(data).then((res) => {
                    if (isSuccess(res, t)) {
                        t.$notify({
                            message: '提交成功',
                            duration: 1500,
                            background: '#1989fa'
                        });
                        this.$router.push({
                            name: 'dimission'
                        })
                    }
                }).catch((err) => {
                    t.saveStatus = false
                    t.$notify({
                        message: '网络错误',
                        duration: 1500,
                        background: '#f44'
                    });
                }).finally(() => {
                    t.$store.commit('hideLoading');
                });
            }
        },
        //底部弹窗
        popupClick (domShow, dom) {
            this[domShow] = true;
            this.curDom = dom;
            this.curDomShow = domShow;
        },
        //底部弹窗确定
        confirm (value) {
            if (this.curDomShow.indexOf("dayShow") != -1) {
                value = new Date(value).format('yyyy-MM-dd');
                this.currentDate = new Date();
                this.form[this.curDom] = value;
                if (this.curDom === 'dimLevsqday') {
                    let entryDate = new Date(JSON.parse(localStorage.getItem('empData')).empnhEntrydate);
                    let now = new Date(value);
                    this.completeDate(entryDate, now, 3)
                }
            } else {
                this.form[this.curDom] = value.key;
                let str = this.curDom
                str += "Dis";
                this[str] = value.text;
            }
            this[this.curDomShow] = false;
        },
        //底部弹窗取消
        cancel (value) {
            this[this.curDomShow] = false;
        },
        //员工弹出框事件
        inputEmp (res) {
            this.empShow = false;
            this.currentId = res.id;
            this.form.empId = res.id;
            this.empIdName = res.empnhName;
            this.dimReceiveCheck();
        },
        //问卷调查事件
        inputSurvey (res) {
            this.surveyName = res.name;
            this.surveyShow = false;
        },
        closeView () {
            this.surveyShow = false;
        },
        //获取详情
        getData () {
            const t = this;
            if (this.$route.query.id === undefined) {
                return;
            }
            const data = {
                _mt: 'wxPublicProcess.getById',
                companyId: pubsource.companyId,
                id: this.$route.query.id,
                tbName: 'emp_empdim'
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    console.log(data, "t.content ");
                    if (data.curStepCode !== 'flow_empdim_1000') {
                        t.disabled = true;
                    } else if (data.curStepstate === "p_flowst_3") {
                        t.disabled = true;
                    }
                    // t.curStepDis = data.curStepDis ? data.curStepDis : '';
                    // t.curStepstate = data.curStepstate ? data.curStepstate : '';
                    t.form.dimApplicant = data.dimApplicant;
                    t.form.empId = data.empId;
                    t.form.empIdno = data.empIdno;
                    t.form.deptId = data.deptId;
                    t.form.postId = data.postId;
                    t.form.dimBuspmp = !data.dimBuspmp ? '' : data.dimBuspmp;
                    t.form.empnhMobile = data.empnhMobile;
                    t.form.empnhSalaccount = data.empnhSalaccount;
                    t.form.dimCertifi = data.dimCertifi;
                    t.form.dimPersmail = data.dimPersmail;
                    t.form.dimType = data.dimType;
                    t.form.dimReason = data.dimReason;
                    t.form.dimLevsqday = data.dimLevsqday;
                    t.form.dimLevday = data.dimLevday;
                    t.form.dimIsreceive = data.dimIsreceive;
                    t.form.dimReceive = data.dimReceive ? data.dimReceive : '';
                    t.form.note = data.note;
                    // t.curStep = data.curStep;
                    t.empIdName = data.empIdName;
                    t.deptIdDis = data.deptIdDis;
                    t.postIdDis = data.postIdDis;
                    t.dimApplicantDis = data.dimApplicantDis;
                    t.dimBuspmpDis = !data.dimBuspmpDis ? '' : data.dimBuspmpDis;
                    t.dimCertifiDis = data.dimCertifiDis ? data.dimCertifiDis : '请选择';
                    t.dimTypeDis = data.dimTypeDis;
                    t.dimReasonDis = data.dimReasonDis;
                    t.dimIsreceiveDis = data.dimIsreceiveDis ? data.dimIsreceiveDis : '请选择';
                    t.dimReceiveDis = data.dimReceiveDis ? data.dimReceiveDis : '请选择';
                    t.currentId = data.dimReceive;
                    if (t.disabled) {
                        t.dimCertifiDis = data.dimCertifiDis ? data.dimCertifiDis : '未选择';
                        t.dimIsreceiveDis = data.dimIsreceiveDis ? data.dimIsreceiveDis : '未选择';
                        t.dimReceiveDis = data.dimReceiveDis ? data.dimReceiveDis : '未选择';
                    } else {
                        t.dimCertifiDis = data.dimCertifiDis ? data.dimCertifiDis : '请选择';
                        t.dimIsreceiveDis = data.dimIsreceiveDis ? data.dimIsreceiveDis : '请选择';
                        t.dimReceiveDis = data.dimReceiveDis ? data.dimReceiveDis : '请选择';
                    }
                    t.dimLevsqdayDate = new Date(data.dimLevsqday.replace(/-/g, '/'));
                    t.dimLevdayDate = new Date(data.dimLevday.replace(/-/g, '/'));
                    t.setSelectValue(data.dimCertifiDis, 'selectDimCertifi', 'dimCertifiIndex');
                    t.setSelectValue(data.dimTypeDis, 'selectDimType', 'dimTypeIndex');
                    t.setSelectValue(data.dimReasonDis, 'selectDimReason', 'dimReasonIndex');
                    t.setSelectValue(data.dimIsreceiveDis, 'selectDimIsreceive', 'dimIsreceiveIndex');
                }
            }).catch((err) => {
                t.$notify({
                    message: '网络错误',
                    duration: 1500,
                    background: '#f44'
                });
            }).finally(() => {
                t.$store.commit('hideLoading');
            });
        },
        //查询下拉列表
        getSelect () {
            const t = this;
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: 'separatereason,terminatereason,yesno'
            }).then(res => {
                if (isSuccess(res, t)) {
                    t.selectData(res.data.content[0].value[0].paramList, "selectDimType");
                    t.selectData(res.data.content[0].value[1].paramList, "selectDimReason");
                    t.selectData(res.data.content[0].value[2].paramList, "selectDimCertifi");
                    t.selectData(res.data.content[0].value[2].paramList, "selectDimIsreceive");
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
    },
}
</script>
<style lang="less">
.dimissionDetail {
    height: 100%;
    background: #f6f6f6;

    .dimissionDetailWrap {
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        background: #f6f6f6;
        flex-direction: column;
        margin-bottom: 100px;

        .save_button {
            padding: 125px 54px 50px;
            display: flex;

            .x_button {
                color: #fff;
                font-size: 34px;
                width: 300px;
            }

            .button_left {
                color: #339afe;
                background: #fff;
                border: 2px solid #339afe !important;
            }

            .weui-btn + .weui-btn {
                margin-top: 0;
            }
        }
    }
}

.van-popup--right {
    top: 50% !important;
}

.right_popup {
    width: 85%;
    height: 100%;
}
</style>
