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
                             placeholder="">
                    </x-input>
                </div>
                <!-- 申请时间 -->
                <div class="item_box">
                    <x-input title="申请时间"
                             v-model="form.dimApplydate"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="">
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
                          v-show="empIdName=='请选择'?true:false"
                          v-remind="form.empId"></icon>
					<x-input title="员工姓名"
						     v-if="disabled"
					         v-model="empIdName"
					         :show-clear="false"
					         :disabled="disabled"
					         placeholder="">
					</x-input>
                </div>
                <!-- 证件号码 -->
                <div class="item_box">
                    <x-input title="证件号码"
                             v-model="form.empIdno"
                             :disabled="true"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 部门名称 -->
                <div class="item_box">
                    <x-input title="部门名称"
                             v-model="deptIdDis"
                             :disabled="true"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 岗位名称 -->
                <div class="item_box">
                    <x-input title="岗位名称"
                             v-model="postIdDis"
                             :disabled="true"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 上级经理 -->
                <div class="item_box">
                    <x-input title="上级经理"
                             v-model="dimBuspmpDis"
                             :disabled="true"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 手机号码 -->
                <div class="item_box">
                    <x-input title="手机号码"
                             v-model="form.empnhMobile"
                             :disabled="true"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 银行账号-->
                <div class="item_box">
                    <x-input title="银行账号<span>*</span>"
                             v-model="form.empnhSalaccount"
                             v-verify="form.empnhSalaccount"
							 :disabled="disabled"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.empnhSalaccount==''?true:false"
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
                             placeholder="请填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.dimPersmail==''?true:false"
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
                          v-show="dimTypeDis=='请选择'?true:false"
                          v-remind="form.dimType"></icon>
					<x-input title="离职类型"
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
                          v-show="dimReasonDis=='请选择'?true:false"
                          v-remind="form.dimReason"></icon>
					<x-input title="离职原因"
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
                          v-show="form.dimLevsqday=='请选择'?true:false"
                          v-remind="form.dimLevsqday"></icon>
					<x-input title="申请离职日期"
						     v-if="disabled"
					         v-model="form.dimLevsqday"
					         :show-clear="false"
					         :disabled="disabled"
					         placeholder="">
					</x-input>
                </div>
                <!-- 约定离职日期 -->
                <div class="item_box">
                    <cell title=""
                          is-link
						  v-if="!disabled"
                          value-align="left"
                          v-model="form.dimLevday"
                          v-verify="form.dimLevday"
                          @click.native="popupClick('dimLevdayShow','dimLevday')">
                        <div slot="title">约定离职日期<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.dimLevday=='请选择'?true:false"
                          v-remind="form.dimLevday"></icon>
					<x-input title="约定离职日期"
						     v-if="disabled"
					         v-model="form.dimLevday"
					         :show-clear="false"
					         :disabled="disabled"
					         placeholder="">
					</x-input>
                </div>
                <!-- 最后工作日期 -->
                <div class="item_box">
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
                          v-show="form.dimLaswkday=='请选择'?true:false"
                          v-remind="form.dimLaswkday"></icon>
					<x-input title="最后工作日期"
						     v-if="disabled"
					         v-model="form.dimLaswkday"
					         :show-clear="false"
					         :disabled="disabled"
					         placeholder="">
					</x-input>
                </div>
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
					         placeholder="">
					</x-input>
                </div>
                <!-- 备注 -->
                <x-textarea :max="300"
                            title="备注"
                            :height="95"
                            v-model="form.note"
							:readonly="disabled"
                            :placeholder="disabled?'未填写':'请填写'"
                            :show-counter="true"></x-textarea>

            </group>
			<!-- 	 -->
            <div class="save_button"
		
                v-if="curStepstate!=='p_flowst_3'&&curStep==='1344'">
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
import survey from './survey'
export default {
    data () {
        return {
            curStep: "",	
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
                dimApplicant: window.localStorage.getItem('empId'), //申请人
                dimApplydate: new Date().format("yyyy-MM-dd"), //申请日期
                empId: "", //员工id
                empIdno: "", //证件号码
                deptId: "", //部门
                postId: "", //岗位
                dimBuspmp: "", //上级经理
                empnhMobile: "", //手机号码
                empnhSalaccount: "", //银行卡号
                dimCertifi: "", //是否需要离职证明
                dimPersmail: "", //个人邮箱
                dimType: "", //离职类型
                dimReason: "", //离职原因
                dimLevsqday: "请选择", //申请离职日期
                dimLevday: "请选择", //约定离职日期
                dimLaswkday: "请选择", //最后工作日期
                dimIsreceive: "", //是否工作交接
                note: "" //备注
            },
            dimApplicantDis: JSON.parse(window.localStorage.getItem('empData')).empnhName,
            surveyName: '请选择',
            empIdName: "请选择",
            deptIdDis: "",
            postIdDis: "",
            dimBuspmpDis: "",
            dimCertifiDis: "请选择",
            dimTypeDis: "请选择",
            dimReasonDis: "请选择",
            dimIsreceiveDis: "请选择",
            empShow: false,
            dimCertifiShow: false,
            dimTypeShow: false,
            dimReasonShow: false,
            dimIsreceiveShow: false,
            dimCertifiIndex: 0,
            dimTypeIndex: 0,
            dimReasonIndex: 0,
            dimIsreceiveIndex: 0,
            selectDimCertifi: [],
            selectDimType: [],
            selectDimReason: [],
            selectDimIsreceive: [],
            dimLevsqdayShow: false,
            dimLevdayShow: false,
            dimLaswkdayShow: false,
            surveyShow: false,
            saveStatus: false,
			curStepDis:'',
			curStepstate:'',
			disabled:false
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
    mounted () {
        this.getSelect();
        this.getData();
    },
    methods: {
        //保存
        async save (type) {
            const t = this;
            if (this.$verify.check()) {
                const data = deepCopy(t.form);
                data._mt = "wxEmpEmpdim.addEmpEmpDim";
                data.companyId = pubsource.companyId;
                data.userId = window.localStorage.getItem('uid');
                let listId = this.$route.query.id;
                if (listId !== undefined) {
                    data.pkValue = listId
                } else {
                    data.pkValue = 0
                }
                for (const dat in data) {
                    if (data[dat] === "") {
                        delete data[dat];
                    }
                }
                await getDataLevelUserLoginEmpId(data).then(res => {
                    if (isSuccess(res, t)) {
                        console.log(res, "res");
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
        comfirmSubmit () {
            this.$dialog.confirm({
                title: '',
                message: '是否确认提交？'
            }).then(() => {
                this.submit();
            }).catch(() => {
                // on cancel
            });
        },
        //提交
        async submit () {
            await this.save('submit');
            const t = this;
            if (this.saveStatus) {
                const data = {
                    _mt: 'wxEmpEmpdim.submitEmpEmpDim',
                    companyId: pubsource.companyId,
                    userId: localStorage.getItem('uid'),
                    pkValue: t.$route.query.id
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
                this.form[this.curDom] = value
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
            console.log(res, "res")
            this.empShow = false;
            this.currentId = res.id;
            this.form.empId = res.id;
            this.form.empIdno = res.empnhIdno;
            this.form.deptId = res.deptId;
            this.form.postId = res.postId;
            this.form.dimBuspmp = res.empnhPmp;
            this.form.empnhMobile = res.empnhMobile;
            this.form.empnhSalaccount = res.empnhSalaccount;
            this.empIdName = res.empnhName;
            this.deptIdDis = res.unitFname;
            this.postIdDis = res.postFname;
            this.dimBuspmpDis = res.empnhPmpDis
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
                _mt: 'wxEmpEmpdim.getById',
                companyId: pubsource.companyId,
                id: this.$route.query.id,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    console.log(data, "t.content ");
					t.curStepDis = data.curStepDis?data.curStepDis:'';
					t.curStepstate = data.curStepstate?data.curStepstate:'';
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
                    t.form.dimLaswkday = data.dimLaswkday;
                    t.form.dimIsreceive = data.dimIsreceive;
                    t.form.note = data.note;
                    t.curStep = data.curStep;
					if(t.curStep!=='1344'){
						t.disabled =true;
					}else{
						if(t.curStepstate ===''){
							
						}
					}
                    t.empIdName = data.empIdName;
                    t.deptIdDis = data.deptIdDis;
                    t.postIdDis = data.postIdDis;
                    t.dimBuspmpDis = !data.dimBuspmpDis ? '' : data.dimBuspmpDis;
                    t.dimCertifiDis = data.dimCertifiDis ? data.dimCertifiDis : '请选择';
                    t.dimTypeDis = data.dimTypeDis;
                    t.dimReasonDis = data.dimReasonDis;
                    t.dimIsreceiveDis = data.dimIsreceiveDis ? data.dimIsreceiveDis : '请选择';
                    t.dimLevsqdayDate = new Date(data.dimLevsqday);
                    t.dimLevdayDate = new Date(data.dimLevday);
                    t.dimLaswkdayDate = new Date(data.dimLaswkday);
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
