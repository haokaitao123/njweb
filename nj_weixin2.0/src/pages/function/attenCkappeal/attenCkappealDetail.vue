<template>
    <div class="attenVacationDetail">
        <div class="attenVacationDetailWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 考勤日期 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.checkWktm"
                          v-verify="form.checkWktm"
                          @click.native="popupClick('checkWktmDateShow','checkWktm')">
                        <div slot="title">考勤日期<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.checkWktm=='请选择'"
                          v-remind="form.checkWktm"></icon>
                    <x-input title="考勤日期<span>*</span>"
                             v-if="disabled"
                             v-model="form.checkWktm"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 员工姓名 -->
                <div class="item_box">
                    <!-- <icon type="warn"
                          class="error"
                          v-show="empnhName==''"
                          v-remind="form.empId"></icon> -->
                    <x-input title="员工姓名"
                             v-model="empnhName"
                             v-verify="form.empId"
                             :show-clear="false"
                             :placeholder="disabled?'暂无数据':'选择考勤日期自动带出'"
                             :disabled="true">
                    </x-input>
                </div>
                <!-- 部门 -->
                <div class="item_box">
                    <x-input title="部门名称"
                             v-model="unitFname"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'暂无数据':'选择考勤日期自动带出'">
                    </x-input>
                </div>
                <!-- 岗位 -->
                <div class="item_box">
                    <x-input title="岗位名称"
                             v-model="postFname"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'暂无数据':'选择考勤日期自动带出'">
                    </x-input>
                </div>
                <!-- 原上班打卡时间 -->
                <div class="item_box">
                    <x-input title="原上班打卡时间"
                             v-model="form.chkIndtod"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'暂无数据':'选择考勤日期自动带出'">
                    </x-input>
                </div>
                <!-- 原上班考勤结果 -->
                <div class="item_box">
                    <x-input title="原上班考勤结果"
                             v-model="chkUpresodDis"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'暂无数据':'选择考勤日期自动带出'">
                    </x-input>
                </div>
                <!-- 原下班打卡时间 -->
                <div class="item_box">
                    <x-input title="原下班打卡时间"
                             v-model="form.chkOutod"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'暂无数据':'选择考勤日期自动带出'">
                    </x-input>
                </div>
                <!-- 原下班考勤结果 -->
                <div class="item_box">
                    <x-input title="原下班考勤结果"
                             v-model="chkDresodDis"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'暂无数据':'选择考勤日期自动带出'">
                    </x-input>
                </div>
                <!-- 原请假类型 -->
                <div class="item_box">
                    <x-input title="原请假类型"
                             v-show="form.chkUpresod==='请假'||form.chkDresod==='请假'"
                             v-model="chkLevpodDis"
                             :disabled="true"
                             :show-clear="false"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 现上班打卡时间 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.chkIndtnw"
                          v-verify="form.chkIndtnw"
                          @click.native="popupClick('chkIndtnwDateShow','chkIndtnw')">
                        <div slot="title">现上班打卡时间<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.chkIndtnw=='请选择'"
                          v-remind="form.chkIndtnw"></icon>
                    <x-input title="现上班打卡时间<span>*</span>"
                             v-if="disabled"
                             v-model="form.chkIndtnw"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 现上班考勤结果 -->
                <div class="item_box">
                    <!-- <x-input title="现上班考勤结果<span>*</span>"
                             v-model.trim="form.chkUpresnw"
                             :disabled="disabled"
                             v-verify="form.chkUpresnw"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.chkUpresnw==''"
                          v-remind="form.chkUpresnw"></icon> -->
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="chkUpresnwDis"
                          v-verify="form.chkUpresnw"
                          @click.native="popupClick('chkUpresnwShow','chkUpresnw')">
                        <div slot="title">现上班考勤结果<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.chkUpresnw==''"
                          v-remind="form.chkUpresnw"></icon>
                    <x-input title="现上班考勤结果<span>*</span>"
                             v-model="chkUpresnwDis"
                             v-if="disabled"
                             v-verify="form.chkUpresnw"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'"
                             :disabled="true">
                    </x-input>
                </div>
                <!-- 现下班打卡时间 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.chkOutnw"
                          v-verify="form.chkOutnw"
                          @click.native="popupClick('chkOutnwDateShow','chkOutnw')">
                        <div slot="title">现下班打卡时间</div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.chkOutnw=='请选择'"
                          v-remind="form.chkOutnw"></icon>
                    <x-input title="现下班打卡时间"
                             v-if="disabled"
                             v-model="form.chkOutnw"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 现下班考勤结果 -->
                <div class="item_box">
                    <!-- <x-input title="现下班考勤结果"
                             v-model.trim="form.chkDresnw"
                             :disabled="disabled"
                             v-verify="form.chkDresnw"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.chkDresnw==''"
                          v-remind="form.chkDresnw"></icon> -->
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="chkDresnwDis"
                          v-verify="form.chkDresnw"
                          @click.native="popupClick('chkDresnwShow','chkDresnw')">
                        <div slot="title">现下班考勤结果</div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="chkDresnwDis==''"
                          v-remind="form.chkDresnw"></icon>
                    <x-input title="现下班考勤结果<span>*</span>"
                             v-model="chkDresnwDis"
                             v-if="disabled"
                             v-verify="form.chkDresnw"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'"
                             :disabled="true">
                    </x-input>
                </div>
                <!-- 现请假类型 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="chkLevpnwDis"
                          v-verify="form.chkLevpnw"
                          v-show="chkUpresnwDis==='请假'||chkDresnwDis==='请假'"
                          @click.native="popupClick('chkLevpnwShow','chkLevpnw')">
                        <div slot="title">现请假类型</div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="chkLevpnwDis==''"
                          v-remind="form.chkLevpnw"></icon>
                    <x-input title="请假类型<span>*</span>"
                             v-model="chkLevpnwDis"
                             v-if="disabled"
                             v-verify="form.chkLevpnw"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'"
                             :disabled="true">
                    </x-input>
                </div>
                <!-- 申诉原因 -->
                <div class="item_box">
                    <x-textarea :max="300"
                                title="申诉原因<span>*</span>"
                                :height="95"
                                v-model="form.chkReason"
                                v-verify="form.chkReason"
                                :disabled="disabled"
                                :placeholder="disabled?'未填写':'请填写'"
                                :show-counter="true"></x-textarea>
                    <icon type="warn"
                          class="error"
                          v-show="form.chkReason==''"
                          v-remind="form.chkReason"></icon>
                </div>
                <!-- 申诉材料 -->
                <div class="item_box file">
                    <label>申诉材料<span>*</span></label>
                    <div class="file_box "
                         v-if="!disabled"
                         :class="file==''?'':'justify'">
                        <p class="fileName"
                           v-if="file!=''"
                           :disabled="disabled"
                           @click="downLoadFile">
                            {{file.name}}
                        </p>
                        <div class="upload"
                             v-else>
                            <input type="file"
                                   v-verify="filekey"
                                   @change="upLoadFile($event)">
                            +
                        </div>
                    </div>
                    <div class="file_box justify"
                         v-if="disabled">
                        <p class="fileName"
                           :disabled="disabled"
                           @click="file.name==='未上传'?'':downLoadFile()">
                            {{file.name}}
                        </p>
                    </div>
                    <icon type="warn"
                          class="error"
                          v-show="filekey==''"
                          v-remind="filekey"></icon>
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
            <div class="save_button"
                 v-if="curStepstate!=='p_flowst_3'&&curStep==='1426'">
                <x-button type="default"
                          class="x_button button_left"
                          action-type="button"
                          @click.native="save">保存</x-button>
                <x-button type="primary"
                          class="x_button"
                          @click.native="comfirmSubmit">提交</x-button>
            </div>
        </div>
        <!-- 考勤日期-->
        <van-popup v-model="checkWktmDateShow"
                   position="bottom">
            <van-datetime-picker v-model="checkWktmDate"
                                 type="date"
                                 :min-date="minCheckWktm"
                                 :max-date="maxCheckWktm"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 现上班打卡时间 -->
        <van-popup v-model="chkIndtnwDateShow"
                   position="bottom">
            <van-datetime-picker v-model="chkIndtnwDate"
                                 type="datetime"
                                 :min-date="minChkIndtnw"
                                 :max-date="maxChkIndtnw"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 现上班考勤结果 -->
        <van-popup v-model="chkUpresnwShow"
                   position="bottom">
            <van-picker ref="vacIsreapplyPicker"
                        :defaultIndex="chkUpresnwIndex"
                        :columns=selectChkUpresnw
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 现下班打卡时间 -->
        <van-popup v-model="chkOutnwDateShow"
                   position="bottom">
            <van-datetime-picker v-model="chkOutnwDate"
                                 type="datetime"
                                 :min-date="minChkOutnw"
                                 :max-date="maxChkOutnw"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 现下班考勤结果 -->
        <van-popup v-model="chkDresnwShow"
                   position="bottom">
            <van-picker ref="vacIsreapplyPicker"
                        :defaultIndex="chkDresnwIndex"
                        :columns=selectChkDresnw
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 现请假类型 -->
        <van-popup v-model="chkLevpnwShow"
                   position="bottom">
            <van-picker ref="vacTypePicker"
                        :defaultIndex="chkLevpnwIndex"
                        :columns=selectChkLevpnw
                        show-toolbar
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
import valid from '@/lib/pub_valid'
export default {
    data () {
        return {
            id: 0,
            curStep: "1426",
            curDom: "",
            curDomShow: "",
            checkWktmDate: new Date(),
            minCheckWktm: new Date(new Date().setDate(new Date().getDate() - 1)),
            maxCheckWktm: new Date(),
            chkIndtnwDate: new Date(),
            minChkIndtnw: new Date(1900, 10, 1),
            maxChkIndtnw: new Date(2099, 12, 31),
            chkOutnwDate: new Date(),
            minChkOutnw: new Date(1900, 10, 1),
            maxChkOutnw: new Date(2099, 12, 31),
            file: '',
            filekey: '',
            fileName: '',
            form: {
                checkWktm: "请选择",                                                              //考勤日期
                empId: "",                                                                       //员工id
                deptId: "",                                                                      //部门
                postId: "",                                                                      //岗位
                chkIndtod: "选择考勤日期自动带出",                                                 //原上班打卡时间
                chkUpresod: "",                                                                  //原上班考勤结果
                chkOutod: "选择考勤日期自动带出",                                                  //原下班打卡时间
                chkDresod: "",                                                                   //原下班考勤结果
                chkLevpod: "",                                                                   //原请假类型
                chkIndtnw: "请选择",                                                              //现上班打卡时间
                chkUpresnw: "",                                                                  //现上班考勤结果
                chkOutnw: "请选择",                                                               //现下班打卡时间
                chkDresnw: "",                                                                   //现下班考勤结果
                chkLevpnw: "",                                                                   //现请假类型
                chkReason: "",                                                                   //申诉原因
                fileKey: "",                                                                     //申诉材料
                note: "",                                                                        //备注
            },
            empnhName: "",
            unitFname: "",
            postFname: "",
            chkUpresodDis: "选择考勤日期自动带出",
            chkDresodDis: "选择考勤日期自动带出",
            chkLevpodDis: "请选择",
            chkUpresnwDis: "请选择",
            chkDresnwDis: "请选择",
            chkLevpnwDis: "请选择",
            chkUpresodShow: false,
            chkDresodShow: false,
            chkLevpodShow: false,
            chkUpresnwShow: false,
            chkDresnwShow: false,
            chkLevpnwShow: false,
            chkUpresodIndex: 0,
            chkDresodIndex: 0,
            chkLevpodIndex: 0,
            chkUpresnwIndex: 0,
            chkDresnwIndex: 0,
            chkLevpnwIndex: 0,
            selectChkUpresod: [],
            selectChkDresod: [],
            selectChkLevpod: [],
            selectChkUpresnw: [],
            selectChkDresnw: [],
            selectChkLevpnw: [],
            checkWktmDateShow: false,
            chkIndtnwDateShow: false,
            chkOutnwDateShow: false,
            saveStatus: false,
            curStepDis: '',
            curStepstate: 'p_flowst_1',
            disabled: false,
        }
    },
    verify: {
        form: {
            checkWktm: "required",
            chkIndtnw: "required",
            chkUpresnw: "required",
            chkReason: "required",
            vacEdate: "required",
        },
        filekey: "required",
    },
    components: {
        Group,
        Cell,
        XInput,
        Icon,
        XTextarea,
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
                data._mt = "wxPublicProcess.addProcess";
                data.companyId = pubsource.companyId;
                data.userId = window.localStorage.getItem('uid');
                data.tbName = 'atten_ckappeal';
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
        comfirmSubmit () {
            if (this.$verify.check()) {
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
                    tbName: 'atten_ckappeal',
                }
                getDataLevelUserLogin(data).then((res) => {
                    if (isSuccess(res, t)) {
                        t.$notify({
                            message: '提交成功',
                            duration: 1500,
                            background: '#1989fa'
                        });
                        this.$router.push({
                            name: 'attenCkappeal'
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
            const t = this;
            if (this.curDomShow.indexOf("DateShow") != -1) {
                if (this.curDom == 'chkIndtnw') {
                    this.minChkOutnw = new Date(value)
                }
                if (this.curDom == 'chkOutnw') {
                    this.maxChkIndtnw = new Date(value)
                }
                if (this.curDomShow === 'checkWktmDateShow') {
                    value = new Date(value).format('yyyy-MM-dd');
                } else {
                    value = new Date(value).format('yyyy-MM-dd hh:mm:ss');
                }
                this.currentDate = new Date();
                this.form[this.curDom] = value;
                if (this.curDomShow === 'checkWktmDateShow') {
                    const data = {
                        _mt: 'wxAttenCheckupdday.getAttenCheckupddayByEmpId',
                        companyId: pubsource.companyId,
                        date: value,
                        empId: localStorage.getItem('empId'),
                    }
                    getDataLevelUserLogin(data).then((res) => {
                        if (isSuccess(res, t)) {

                            let data = JSON.parse(res.data.content[0].value);
                            if (data === null) {
                                data = {}
                            }
                            console.log(data, "t.content ");
                            t.form.empId = data.empId ? data.empId : "";
                            t.form.deptId = data.deptId ? data.deptId : "";
                            t.form.postId = data.postId ? data.postId : "";
                            t.form.chkIndtod = data.checkUpckin ? data.checkUpckin : "";
                            t.form.chkIndtnw = data.checkUpckin ? data.checkUpckin : "请选择";
                            t.form.chkUpresod = data.checkUpresult ? data.checkUpresult : "";
                            t.form.chkUpresnw = data.checkUpresult ? data.checkUpresult : "";
                            t.form.chkOutod = data.checkDckout ? data.checkDckout : "";
                            t.form.chkOutnw = data.checkDckout ? data.checkDckout : "请选择";
                            t.form.chkDresod = data.checkDresult ? data.checkDresult : "";
                            t.form.chkDresnw = data.checkDresult ? data.checkDresult : "";
                            t.form.chkLevpod = data.checkType ? data.checkType : "";
                            t.empnhName = data.empnhName ? data.empnhName : "";
                            t.unitFname = data.unitFname ? data.unitFname : "";
                            t.postFname = data.postFname ? data.postFname : "";
                            t.chkUpresodDis = data.checkUpresultDis ? data.checkUpresultDis : "";
                            t.chkDresodDis = data.checkDresultDis ? data.checkDresultDis : "";
                            t.chkUpresnwDis = data.checkUpresultDis ? data.checkUpresultDis : "请选择";
                            t.chkDresnwDis = data.checkDresultDis ? data.checkDresultDis : "请选择";
                            t.chkLevpodDis = data.checkTypeDis ? data.checkTypeDis : "";
                            t.chkIndtnwDate = !data.checkUpckin ? new Date() : new Date(data.checkUpckin.replace(/-/g, '/'));
                            t.chkOutnwDate = !data.checkDckout ? new Date() : new Date(data.checkDckout.replace(/-/g, '/'));
                            t.setSelectValue(data.checkUpresultDis, 'selectChkUpresnw', 'chkUpresnwIndex');
                            t.setSelectValue(data.checkDresultDis, 'selectChkDresnw', 'chkDresnwIndex');
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
                tbName: 'atten_ckappeal',
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    console.log(data, "t.content ");
                    if (t.curStep !== '1426') {
                        t.disabled = true;
                    } else if (t.curStepstate === "p_flowst_3") {
                        t.disabled = true;
                    }
                    t.curStepDis = data.curStepDis ? data.curStepDis : '';
                    t.curStepstate = data.curStepstate ? data.curStepstate : '';
                    t.form.dimApplicant = data.dimApplicant;
                    t.form.dimApplydate = data.dimApplydate;
                    t.form.checkWktm = data.checkWktm ? data.checkWktm : "请选择";
                    t.form.chkIndtod = data.chkIndtod ? data.chkIndtod : "请选择";
                    t.form.chkUpresod = data.chkUpresod;
                    t.form.chkOutod = data.chkOutod ? data.chkIndtod : "请选择";
                    t.form.chkDresod = data.chkDresod;
                    t.form.chkLevpod = data.chkLevpod;
                    t.form.chkIndtnw = data.chkIndtnw ? data.chkIndtnw : "请选择";
                    t.form.chkUpresnw = data.chkUpresnw;
                    t.form.chkOutnw = data.chkOutnw ? data.chkOutnw : "请选择";
                    t.form.chkDresnw = data.chkDresnw;
                    t.form.chkLevpnw = data.chkLevpnw;
                    t.form.chkReason = data.chkReason;
                    t.form.note = data.note;
                    t.form.vacIsreapply = data.vacIsreapply ? data.vacIsreapply : '';
                    t.form.vacType = data.vacType ? data.vacType : '';
                    t.form.vacDay = data.vacDay ? data.vacDay : '';
                    t.form.vacSdate = data.vacSdate ? data.vacSdate : '请选择';
                    t.form.vacEdate = data.vacEdate ? data.vacEdate : '请选择';
                    t.curStep = data.curStep;
                    t.empnhName = data.empnhName;
                    t.unitFname = data.unitFname;
                    t.postFname = data.postFname;
                    t.chkUpresodDis = data.chkUpresodDis ? data.chkUpresodDis : '请选择';
                    t.chkDresodDis = data.chkDresodDis ? data.chkDresodDis : '请选择';
                    t.chkLevpodDis = data.chkLevpodDis ? data.chkLevpodDis : '请选择';
                    t.chkUpresnwDis = data.chkUpresnwDis ? data.chkUpresnwDis : '请选择';
                    t.chkDresnwDis = data.chkDresnwDis ? data.chkDresnwDis : '请选择';
                    t.chkLevpnwDis = data.chkLevpnwDis ? data.chkLevpnwDis : '请选择';
                    if (data.fileKey) {
                        t.fileName = data.fileKey.split(':')[0];
                        t.file = { name: data.fileKey.split(':')[0] }
                        t.filekey = data.fileKey.split(':')[1]
                    } else {
                        t.file = {
                            name: '未上传'
                        }
                    }
                    t.chkIndtnwDate = !data.chkIndtnw ? new Date() : new Date(data.chkIndtnw.replace(/-/g, '/'));
                    t.chkOutnwDate = !data.chkOutnw ? new Date() : new Date(data.chkOutnw.replace(/-/g, '/'));
                    t.setSelectValue(data.chkUpresnwDis, 'selectChkUpresnw', 'chkUpresnwIndex');
                    t.setSelectValue(data.chkDresnwDis, 'selectChkDresnw', 'chkDresnwIndex');
                    t.setSelectValue(data.chkLevpnwDis, 'selectChkLevpnw', 'chkLevpnwIndex');
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
                typeCode: 'leaveType,attendtype'
            }).then(res => {
                if (isSuccess(res, t)) {
                    t.selectData(res.data.content[0].value[0].paramList, "selectChkLevpnw");
                    t.selectData(res.data.content[0].value[1].paramList, "selectChkUpresnw");
                    t.selectData(res.data.content[0].value[1].paramList, "selectChkDresnw");
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
        //上传文件
        upLoadFile (event) {
            const t = this
            var file = event.target.files;
            const formData = new FormData()
            formData.append('upfile', file[0])
            console.log(formData)
            uploadFile(formData).then(res => {
                console.log(res, "res")
                if (res.status == '200') {
                    let fileKey = ''
                    let fileName = ''
                    for (const key in res.data) {
                        t.file = { name: key }
                        t.filekey = res.data[key]
                        t.form.fileKey = key + ':' + res.data[key]
                    }
                    // 用于展示，下载
                    t.$notify({
                        message: '上传成功',
                        duration: 1500,
                        background: '#1989fa'
                    });
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
        //下载文件
        downLoadFile () {
            const t = this
            let data = {
                _mt: 'userMgmt.getfiletoken',
                isprivate: true,
                logType: '下载',
                filekey: t.filekey,
                expiresecs: 180,
                companyId: pubsource.companyId,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let storage = window.localStorage;
                    console.log(storage.token, "token")
                    let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.fileName) + "&_tk=" + encodeURIComponent(storage.token)
                    let link = document.createElement('a');
                    link.href = doclink;
                    link.download = "downloadfiletemp";
                    link.click();
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
    },
}
</script>
<style lang="less">
.attenVacationDetail {
    height: 100%;
    background: #f6f6f6;

    .attenVacationDetailWrap {
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
        .file {
            display: flex;
            padding: 0px 36px 0px 30px;
            align-items: center;
            > label {
                width: 220px !important;
                font-size: 28px;
                padding-right: 15px;
                color: #333333;
                span {
                    color: red;
                    display: inline-block;
                }
            }
            .file_box {
                flex: 1;
                text-align: left;
                padding: 30px 0;
                font-size: 28px;
                color: #333333;
                line-height: 1.3;
                justify-content: flex-end;
                display: flex;
                > p[disabled] {
                    color: #888;
                }
                .upload {
                    width: 250px;
                    height: 170px;
                    border: 1px dashed #d9d9d9;
                    font-size: 60px;
                    color: #ccc;
                    text-align: center;
                    line-height: 170px;
                    position: relative;
                    > input {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 250px;
                        height: 170px;
                        opacity: 0;
                    }
                }
                .fileName {
                    word-break: break-all;
                }
            }
            .justify {
                justify-content: flex-start;
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
