<template>
    <div class="attenShiftDetail">
        <div class="attenShiftDetailWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 员工姓名 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="empnhName"
                          v-verify="form.empId"
                          @click.native="popupClick('empShow','empId')">
                        <div slot="title">员工姓名<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.empId==''"
                          v-remind="form.empId"></icon>
                    <x-input title="员工姓名<span>*</span>"
                             v-model="empnhName"
                             v-if="disabled"
                             v-verify="form.empId"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'"
                             :disabled="true">
                    </x-input>
                </div>
                <!-- 部门名称 -->
                <div class="item_box">
                    <x-input title="部门名称"
                             v-model="unitFname"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 岗位名称 -->
                <div class="item_box">
                    <x-input title="岗位名称"
                             v-model="postFname"
                             :disabled="true"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>

                <!-- 调班天数 -->
                <div class="item_box">
                    <x-input title="调班天数<span>*</span>"
                             v-model="form.shiftDays"
                             v-verify="form.shiftDays"
                             :disabled="disabled"
                             :show-clear="false"
                             @on-blur="shiftEddate"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.shiftDays==''"
                          v-remind="form.shiftDays"></icon>
                </div>
                <!-- 调班开始日期 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.shiftBgdate"
                          v-verify="form.shiftBgdate"
                          @click.native="popupClick('shiftBgdateShow','shiftBgdate')">
                        <div slot="title">调班开始日期<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.shiftBgdate=='请选择'"
                          v-remind="form.shiftBgdate"></icon>
                    <x-input title="调班开始日期<span>*</span>"
                             v-if="disabled"
                             v-model="form.shiftBgdate"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 调班结束日期 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.shiftEddate"
                          v-verify="form.shiftEddate"
                          @click.native="popupClick('shiftEddateShow','shiftEddate')">
                        <div slot="title">调班结束日期<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.shiftEddate=='请选择'"
                          v-remind="form.shiftEddate"></icon>
                    <x-input title="调班结束日期<span>*</span>"
                             v-if="disabled"
                             v-model="form.shiftEddate"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 调班原因 -->
                <div class="item_box">
                    <x-textarea :max="300"
                                title="调班原因<span>*</span>"
                                :height="95"
                                v-model="form.shiftReason"
                                :disabled="disabled"
                                v-verify="form.shiftReason"
                                :placeholder="disabled?'未填写':'请填写'"
                                :show-counter="true"></x-textarea>
                    <icon type="warn"
                          class="error"
                          v-show="form.shiftReason==''"
                          v-remind="form.shiftReason"></icon>
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
        <!-- 请假开始日期 -->
        <van-popup v-model="shiftBgdateShow"
                   position="bottom">
            <van-datetime-picker v-model="shiftBgdateDate"
                                 type="date"
                                 :min-date="minShiftBgdate"
                                 :max-date="maxShiftBgdate"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 请假结束日期 -->
        <van-popup v-model="shiftEddateShow"
                   position="bottom">
            <van-datetime-picker v-model="shiftEddateDate"
                                 type="date"
                                 :min-date="minShiftEddate"
                                 :max-date="maxShiftEddate"
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
import searchEmp from '@/components/search/searchEmp'
export default {
    data () {
        return {
            id: 0,
            curStep: "1441",
            curDom: "",
            curDomShow: "",
            currentId: localStorage.getItem('empId') ? localStorage.getItem('empId') : "",
            shiftBgdateDate: new Date(),
            minShiftBgdate: new Date(1900, 10, 1),
            maxShiftBgdate: new Date(2099, 12, 31),
            shiftEddateDate: new Date(),
            minShiftEddate: new Date(1900, 10, 1),
            maxShiftEddate: new Date(2099, 12, 31),
            file: '',
            filekey: '',
            fileName: '',
            form: {
                empId: localStorage.getItem('empId') ? localStorage.getItem('empId') : "",                         //员工id
                deptId: JSON.parse(localStorage.getItem('empData')).deptId ? JSON.parse(localStorage.getItem('empData')).deptId : "",                        //部门
                postId: JSON.parse(localStorage.getItem('empData')).postId ? JSON.parse(localStorage.getItem('empData')).postId : "",                        //岗位
                shiftReason: "",                   //调班原因
                shiftDays: "",                     //调班天数
                shiftBgdate: "请选择",             //调班开始日期
                shiftEddate: "请选择",             //调班结束日期
                shiftProof: "",                    //相关证明
                note: "",                          //备注
            },
            empnhName: JSON.parse(localStorage.getItem('empData')).empnhName ? JSON.parse(localStorage.getItem('empData')).empnhName : "",
            unitFname: JSON.parse(localStorage.getItem('empData')).unitFname ? JSON.parse(localStorage.getItem('empData')).unitFname : "",
            postFname: JSON.parse(localStorage.getItem('empData')).postFname ? JSON.parse(localStorage.getItem('empData')).postFname : "",
            shiftBgdateShow: false,
            shiftEddateShow: false,
            empShow: false,
            saveStatus: false,
            curStepDis: '',
            curStepstate: 'p_flowst_1',
            disabled: false,
        }
    },
    verify: {
        form: {
            empId: "required",
            shiftReason: "required",
            shiftDays: ["required", "number"],
            shiftBgdate: "required",
            shiftEddate: "required",
        }
    },
    components: {
        Group,
        Cell,
        XInput,
        Icon,
        XTextarea,
        searchEmp
    },
    mounted () {
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
                data.tbName = 'atten_shift';
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
                        t.$router.push({
                            name: 'attenShift'
                        })
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
                    tbName: 'atten_shift',
                }
                getDataLevelUserLogin(data).then((res) => {
                    if (isSuccess(res, t)) {
                        t.$notify({
                            message: '提交成功',
                            duration: 1500,
                            background: '#1989fa'
                        });
                        this.$router.push({
                            name: 'attenShift'
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
                if (this.curDom === 'shiftBgdate') {
                    if (this.form.shiftDays !== '' && valid.val_number103(this.form.shiftDays)) {
                        let shiftDays = parseInt(this.form.shiftDays);
                        if (Number(this.form.shiftDays) > parseInt(this.form.shiftDays)) {
                            shiftDays = parseInt(this.form.shiftDays) + 1
                        }
                        let day = new Date(value).setDate(new Date(value).getDate() + shiftDays - 1);
                        day = new Date(day);
                        this.shiftEddateDate = day;
                        this.form.shiftEddate = day.format('yyyy-MM-dd');
                        this.minShiftEddate = day;
                    } else {
                        this.minShiftEddate = new Date(value);
                    }
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
                tbName: 'atten_shift',
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    console.log(data, "t.content ");
                    if (data.curStepCode !== 'flow_attenshift_1000') {
                        t.disabled = true;
                    } else if (data.curStepstate === "p_flowst_3") {
                        t.disabled = true;
                    }
                    t.form.dimApplicant = data.dimApplicant;
                    t.form.empId = data.empId;
                    t.form.deptId = data.deptId;
                    t.form.postId = data.postId;
                    t.form.shiftReason = data.shiftReason ? data.shiftReason : '';
                    t.form.shiftDays = data.shiftDays ? data.shiftDays : '';
                    t.form.shiftBgdate = data.shiftBgdate ? data.shiftBgdate : '请选择';
                    t.form.shiftEddate = data.shiftEddate ? data.shiftEddate : '请选择';
                    t.form.shiftProof = data.shiftProof ? data.shiftProof : '';
                    t.form.note = data.note;
                    t.empnhName = data.empnhName ? data.empnhName : '请选择';
                    t.unitFname = data.unitFname;
                    t.postFname = data.postFname;
                    if (data.fileKey) {
                        t.fileName = data.fileKey.split(':')[0];
                        t.file = { name: data.fileKey.split(':')[0] }
                        t.filekey = data.fileKey.split(':')[1]
                    } else if (t.disabled) {
                        t.file = { name: '未上传' }
                    }
                    t.shiftBgdateDate = !data.shiftBgdate ? new Date() : new Date(data.shiftBgdate.replace(/-/g, '/'));
                    t.shiftEddateDate = !data.shiftEddate ? new Date() : new Date(data.shiftEddate.replace(/-/g, '/'));
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
        //上传文件
        upLoadFile (event) {
            const t = this
            var file = event.target.files;
            const formData = new FormData()
            formData.append('upfile', file[0])
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
        //员工弹出框事件
        inputEmp (res) {
            console.log(res, "res")
            this.empShow = false;
            this.currentId = res.id;
            this.form.empId = res.id;
            this.empnhName = res.empnhName;
            this.form.postId = res.postId;
            this.form.deptId = res.deptId;
            this.unitFname = res.unitFname;
            this.postFname = res.postFname;
        },
        //设置调班结束日期
        shiftEddate () {
            if (this.form.shiftDays !== '' && valid.val_number103(this.form.shiftDays)) {
                if (this.form.shiftBgdate !== '请选择') {
                    let value = this.form.shiftBgdate;
                    let shiftDays = parseInt(this.form.shiftDays);
                    if (Number(this.form.shiftDays) > parseInt(this.form.shiftDays)) {
                        shiftDays = parseInt(this.form.shiftDays) + 1
                    }
                    let day = new Date(value).setDate(new Date(value).getDate() + shiftDays - 1);
                    day = new Date(day);
                    this.shiftEddateDate = day;
                    this.form.shiftEddate = day.format('yyyy-MM-dd');
                    this.minShiftEddate = day;
                }
            }
        }
    },
}
</script>
<style lang="less">
.attenShiftDetail {
    height: calc(~"100% - 100px");
    background: #f6f6f6;

    .attenShiftDetailWrap {
        height: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        background: #f6f6f6;
        flex-direction: column;
        // margin-bottom: 100px;
        .item_box .weui-icon-warn {
            position: absolute;
            right: 0;
            top: 50%;
            margin-top: -0.133333rem;
        }
        .save_button {
            padding: 125px 54px 50px;
            display: flex;
            margin-bottom: 100px;
            .x_button {
                color: #fff;
                font-size: 34px;
                width: 300px;
                flex: 1;
                height: 80px;
            }

            .button_left {
                color: #339afe;
                background: #fff;
                border: 2px solid #339afe !important;
                margin-right: 5%;
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
