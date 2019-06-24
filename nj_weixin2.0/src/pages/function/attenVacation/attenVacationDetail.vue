<template>
    <div class="attenVacationDetail">
        <div class="attenVacationDetailWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 申请人-->
                <!-- <div class="item_box">
                    <x-input title="申请人"
                             v-model="dimApplicant"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div> -->
                <!-- 申请时间 -->
                <!-- <div class="item_box">
                    <x-input title="申请时间"
                             v-model="form.dimApplydate"
                             :show-clear="false"
                             :disabled="true"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div> -->
                <!-- 姓名 -->
                <div class="item_box">
                    <icon type="warn"
                          class="error"
                          v-show="empnhName==''"
                          v-remind="form.empId"></icon>
                    <x-input title="姓名<span>*</span>"
                             v-model="empnhName"
                             v-verify="form.empId"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'"
                             :disabled="true">
                    </x-input>
                </div>
                <!-- 部门 -->
                <div class="item_box">
                    <x-input title="部门"
                             v-model="unitFname"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 岗位 -->
                <div class="item_box">
                    <x-input title="岗位"
                             v-model="postFname"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 是否假后补办-->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="vacIsreapplyDis"
                          @click.native="popupClick('vacIsreapplyShow','vacIsreapply')">
                        <div slot="title">是否假后补办</div>
                    </cell>
                    <x-input title="是否假后补办"
                             v-if="disabled"
                             v-model="vacIsreapplyDis"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 请假类型 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="vacTypeDis"
                          v-verify="form.vacType"
                          @click.native="popupClick('vacTypeShow','vacType')">
                        <div slot="title">请假类型<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.vacType==''"
                          v-remind="form.vacType"></icon>
                    <x-input title="请假类型<span>*</span>"
                             v-model="vacTypeDis"
                             v-if="disabled"
                             v-verify="form.vacType"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'"
                             :disabled="true">
                    </x-input>
                </div>
                <!-- 请假天数 -->
                <div class="item_box">
                    <x-input title="请假天数<span>*</span>"
                             v-model="form.vacDay"
                             :disabled="disabled"
                             :show-clear="false"
                             v-verify="form.vacDay"
                             @on-blur="setDate"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.vacDay==''"
                          v-remind="form.vacDay"></icon>
                </div>
                <!-- 请假开始日期 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.vacSdate"
                          v-verify="form.vacSdate"
                          @click.native="popupClick('vacSdateShow','vacSdate')">
                        <div slot="title">请假开始日期<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.vacSdate=='请选择'"
                          v-remind="form.vacSdate"></icon>
                    <x-input title="请假开始日期<span>*</span>"
                             v-if="disabled"
                             v-model="form.vacSdate"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 请假结束日期 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.vacEdate"
                          v-verify="form.vacEdate"
                          @click.native="popupClick('vacEdateShow','vacEdate')">
                        <div slot="title">请假结束日期<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.vacEdate=='请选择'"
                          v-remind="form.vacEdate"></icon>
                    <x-input title="请假结束日期<span>*</span>"
                             v-if="disabled"
                             v-model="form.vacEdate"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 相关证明 -->
                <div class="item_box file">
                    <label>相关证明</label>
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
                 v-if="curStepstate!=='p_flowst_3'&&curStep==='1436'">
                <x-button type="default"
                          class="x_button button_left"
                          action-type="button"
                          @click.native="save">保存</x-button>
                <x-button type="primary"
                          class="x_button"
                          @click.native="comfirmSubmit">提交</x-button>
            </div>

        </div>
        <!-- 是否假后补办 -->
        <van-popup v-model="vacIsreapplyShow"
                   position="bottom">
            <van-picker ref="vacIsreapplyPicker"
                        :defaultIndex="vacIsreapplyIndex"
                        :columns="selectVacIsreapply"
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 离职类型 -->
        <van-popup v-model="vacTypeShow"
                   position="bottom">
            <van-picker ref="vacTypePicker"
                        :defaultIndex="vacTypeIndex"
                        :columns="selectVacType"
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 请假开始日期 -->
        <van-popup v-model="vacSdateShow"
                   position="bottom">
            <van-datetime-picker v-model="vacSdateDate"
                                 type="date"
                                 :min-date="minVacSdate"
                                 :max-date="maxVacSdate"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 请假结束日期 -->
        <van-popup v-model="vacEdateShow"
                   position="bottom">
            <van-datetime-picker v-model="vacEdateDate"
                                 type="date"
                                 :min-date="minVacEdate"
                                 :max-date="maxVacEdate"
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
            curStep: "1436",
            curDom: "",
            curDomShow: "",
            vacSdateDate: new Date(),
            minVacSdate: new Date(),
            maxVacSdate: new Date(2099, 12, 31),
            vacEdateDate: new Date(),
            minVacEdate: new Date(),
            maxVacEdate: new Date(2099, 12, 31),
            file: '',
            filekey: '',
            fileName: '',
            form: {
                empId: localStorage.getItem('empId') ? localStorage.getItem('empId') : "", //员工id
                deptId: JSON.parse(localStorage.getItem('empData')).deptId ? JSON.parse(localStorage.getItem('empData')).deptId : '', //部门
                postId: JSON.parse(localStorage.getItem('empData')).postId ? JSON.parse(localStorage.getItem('empData')).postId : "", //岗位
                vacIsreapply: "0",                  //是否假后补办
                vacType: "",                       //请假类型
                vacDay: "",                        //请假天数
                vacSdate: "请选择",                //请假开始日期
                vacEdate: "请选择",                //请假结束日期
                fileKey: "",                       //附件
                note: "",                          //备注
            },
            empnhName: JSON.parse(localStorage.getItem('empData')).empnhName ? JSON.parse(localStorage.getItem('empData')).empnhName : "",
            unitFname: JSON.parse(localStorage.getItem('empData')).unitFname ? JSON.parse(localStorage.getItem('empData')).unitFname : "",
            postFname: JSON.parse(localStorage.getItem('empData')).postFname ? JSON.parse(localStorage.getItem('empData')).postFname : "",
            vacIsreapplyDis: "否",
            vacTypeDis: "请选择",
            vacIsreapplyShow: false,
            vacTypeShow: false,
            vacIsreapplyIndex: 1,
            vacTypeIndex: 0,
            selectVacIsreapply: [],
            selectVacType: [],
            vacSdateShow: false,
            vacEdateShow: false,
            saveStatus: false,
            curStepDis: '',
            curStepstate: 'p_flowst_1',
            disabled: false,
        }
    },
    verify: {
        form: {
            vacType: "required",
            vacDay: ["required", "number"],
            vacSdate: "required",
            vacEdate: "required",
        }
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
                data.tbName = 'atten_vacation';
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
                    tbName: 'atten_vacation'
                }
                getDataLevelUserLogin(data).then((res) => {
                    if (isSuccess(res, t)) {
                        t.$notify({
                            message: '提交成功',
                            duration: 1500,
                            background: '#1989fa'
                        });
                        this.$router.push({
                            name: 'attenVacation'
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
            if (this.curDomShow.indexOf("dateShow") != -1) {
                value = new Date(value).format('yyyy-MM-dd');
                this.currentDate = new Date();
                this.form[this.curDom] = value;
                if (this.curDom === 'vacSdate') {
                    if (this.form.vacDay !== '' && !isNaN(Number(this.form.vacDay))) {
                        let day = new Date(value).setDate(new Date(value).getDate() + Number(this.form.vacDay));
                        day = new Date(day);
                        this.vacEdateDate = day;
                        this.form.vacEdate = day.format('yyyy-MM-dd');
                    }
                }
            } else {
                if (this.curDom === 'vacIsreapply') {
                    if (value.text === '是') {
                        if (this.form.vacDay !== '' && !isNaN(Number(this.form.vacDay))) {
                            let day = new Date().setDate(new Date().getDate() + Number(this.form.vacDay));
                            day = new Date(day);
                            if (this.form.vacSdate !== '请选择') {
                                let date = new Date(this.form.vacSdate).getTime();//开始日期
                                let minVacSdate = day.getTime();
                                if (date < minVacSdate) {
                                    this.form.vacSdate = day.format('yyyy-MM-dd');
                                    let vacEdateDate = new Date(this.form.vacSdate).setDate(new Date(this.form.vacSdate).getDate() + Number(this.form.vacDay));
                                    vacEdateDate = new Date(vacEdateDate);
                                    this.vacEdateDate = vacEdateDate;
                                    this.form.vacEdate = vacEdateDate.format('yyyy-MM-dd');
                                }
                            }
                            this.minVacSdate = day
                        }
                    } else {
                        this.minVacSdate = new Date();
                    }
                }
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
        //设置日期
        setDate () {
            if (this.form.vacDay !== '' && !isNaN(Number(this.form.vacDay))) {
                if (this.form.vacIsreapply === '1') {
                    let day = new Date().setDate(new Date().getDate() + Number(this.form.vacDay));
                    day = new Date(day)
                    this.minVacSdate = day
                } else {
                    this.minVacSdate = new Date();
                }
                if (this.form.vacSdate !== '请选择') {
                    let value = this.form.vacSdate;
                    let day = new Date(value).setDate(new Date(value).getDate() + Number(this.form.vacDay));
                    day = new Date(day);
                    this.vacEdateDate = day;
                    this.form.vacEdate = day.format('yyyy-MM-dd');
                }
            }

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
                tbName: 'atten_vacation'
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    console.log(data, "t.content ");
                    if (t.curStep !== '1436') {
                        t.disabled = true;
                    } else if (t.curStepstate === "p_flowst_3") {
                        t.disabled = true;
                    }
                    t.curStepDis = data.curStepDis ? data.curStepDis : '';
                    t.curStepstate = data.curStepstate ? data.curStepstate : '';
                    t.form.createBy = data.createBy;
                    t.form.createTime = data.createTime;
                    t.form.empId = data.empId;
                    t.form.deptId = data.deptId;
                    t.form.postId = data.postId;
                    t.form.vacIsreapply = data.vacIsreapply ? data.vacIsreapply : '';
                    t.form.vacType = data.vacType ? data.vacType : '';
                    t.form.vacDay = data.vacDay ? data.vacDay : '';
                    t.form.vacSdate = data.vacSdate ? data.vacSdate : '请选择';
                    t.form.vacEdate = data.vacEdate ? data.vacEdate : '请选择';
                    t.form.note = data.note;
                    t.curStep = data.curStep;
                    t.empnhName = data.empnhName;
                    t.unitFname = data.unitFname;
                    t.postFname = data.postFname;
                    t.vacIsreapplyDis = data.vacIsreapplyDis ? data.vacIsreapplyDis : '请选择';
                    t.vacTypeDis = data.vacTypeDis ? data.vacTypeDis : '请选择';
                    if (data.fileKey) {
                        t.fileName = data.fileKey.split(':')[0];
                        t.file = { name: data.fileKey.split(':')[0] }
                        t.filekey = data.fileKey.split(':')[1]
                    } else {
                        t.file = {
                            name: '未上传'
                        }
                    }
                    t.vacSdateDate = !data.vacSdate ? new Date() : new Date(data.vacSdate.replace(/-/g, '/'));
                    t.vacEdateDate = !data.vacEdate ? new Date() : new Date(data.vacEdate.replace(/-/g, '/'));
                    t.setSelectValue(data.vacIsreapplyDis, 'selectVacIsreapply', 'vacIsreapplyIndex');
                    t.setSelectValue(data.vacTypeDis, 'selectVacType', 'vacTypeIndex');
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
                typeCode: 'leaveType,yesno'
            }).then(res => {
                if (isSuccess(res, t)) {
                    t.selectData(res.data.content[0].value[0].paramList, "selectVacType");
                    t.selectData(res.data.content[0].value[1].paramList, "selectVacIsreapply");
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
