<template>
    <div class="attenGooutprocDetail">
        <div class="attenGooutprocDetailWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 员工姓名 -->
                <div class="item_box">
                    <icon type="warn"
                          class="error"
                          v-show="empnhName==''"
                          v-remind="form.empId"></icon>
                    <x-input title="员工姓名"
                             v-model="empnhName"
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
                <!-- 外出日期 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.goutDate"
                          v-verify="form.goutDate"
                          @click.native="popupClick('goutDateShow','goutDate')">
                        <div slot="title">外出日期<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.goutDate=='请选择'"
                          v-remind="form.goutDate"></icon>
                    <x-input title="外出日期<span>*</span>"
                             v-if="disabled"
                             v-model="form.goutDate"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 外出原因 -->
                <div class="item_box">
                    <x-textarea :max="300"
                                title="外出原因<span>*</span>"
                                :height="95"
                                v-model="form.goutReason"
                                :disabled="disabled"
                                v-verify="form.goutReason"
                                :placeholder="disabled?'未填写':'请填写'"
                                :show-counter="true"></x-textarea>
                    <icon type="warn"
                          class="error"
                          v-show="form.goutReason==''"
                          v-remind="form.goutReason"></icon>
                </div>
                <!-- 外出开始时间 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.goutBgdate"
                          v-verify="form.goutBgdate"
                          @click.native="popupClick('goutBgdateShow','goutBgdate')">
                        <div slot="title">外出开始时间<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.goutBgdate=='请选择'"
                          v-remind="form.goutBgdate"></icon>
                    <x-input title="外出开始时间<span>*</span>"
                             v-if="disabled"
                             v-model="form.goutBgdate"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="">
                    </x-input>
                </div>
                <!-- 预计外出结束时间 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.goutEddate"
                          v-verify="form.goutEddate"
                          @click.native="popupClick('goutEddateShow','goutEddate')">
                        <div slot="title">预计外出结束时间<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.goutEddate=='请选择'"
                          v-remind="form.goutEddate"></icon>
                    <x-input title="预计外出结束时间<span>*</span>"
                             v-if="disabled"
                             v-model="form.goutEddate"
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
                            :disabled="disabled"
                            :placeholder="disabled?'未填写':'请填写'"
                            :show-counter="true"></x-textarea>

            </group>
            <div class="title title_f"
                 v-if="approveList.length>0">
                <div class="title_left">
                    <img src="../../../../static/function/resumeTitle.png"
                         alt="">
                    <h3>审批信息</h3>
                </div>
            </div>
            <div class="course"
                 v-if="approveList.length>0">
                <div v-for="(item,index) in approveList">
                    <div class="start">
                        <div class="first">
                            {{item.name}}
                        </div>
                        <div class="firsts">
                            {{item.state}}
                        </div>
                        <div class="data">
                            {{item.date}}
                        </div>
                    </div>
                </div>
            </div>
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
        <!-- 外出日期 -->
        <van-popup v-model="goutDateShow"
                   position="bottom">
            <van-datetime-picker v-model="goutDateDate"
                                 type="date"
                                 :min-date="minGoutDate"
                                 :max-date="maxGoutDate"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 外出开始日期 -->
        <van-popup v-model="goutBgdateShow"
                   position="bottom">
            <van-datetime-picker v-model="goutBgdateDate"
                                 type="datetime"
                                 :min-date="minGoutBgdate"
                                 :max-date="maxGoutBgdate"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 外出结束日期 -->
        <van-popup v-model="goutEddateShow"
                   position="bottom">
            <van-datetime-picker v-model="goutEddateDate"
                                 type="datetime"
                                 :min-date="minGoutEddate"
                                 :max-date="maxGoutEddate"
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
            curDom: "",
            curDomShow: "",
            goutDateDate: new Date(),
            minGoutDate: new Date(1900, 10, 1),
            maxGoutDate: new Date(2099, 12, 31),
            goutBgdateDate: new Date(),
            minGoutBgdate: new Date(1900, 10, 1),
            maxGoutBgdate: new Date(2099, 12, 31),
            goutEddateDate: new Date(),
            minGoutEddate: new Date(1900, 10, 1),
            maxGoutEddate: new Date(2099, 12, 31),
            form: {
                empId: localStorage.getItem('empId') ? localStorage.getItem('empId') : "", //员工id
                deptId: JSON.parse(localStorage.getItem('empData')).deptId ? JSON.parse(localStorage.getItem('empData')).deptId : '', //部门
                postId: JSON.parse(localStorage.getItem('empData')).postId ? JSON.parse(localStorage.getItem('empData')).postId : "", //岗位
                goutDate: "请选择",                    //外出日期
                goutReason: "",                        //外出原因
                goutBgdate: "请选择",                  //外出开始日期
                goutEddate: "请选择",                  //外出结束日期
                note: "",                             //备注
            },
            empnhName: JSON.parse(localStorage.getItem('empData')).empnhName ? JSON.parse(localStorage.getItem('empData')).empnhName : "",
            unitFname: JSON.parse(localStorage.getItem('empData')).unitFname ? JSON.parse(localStorage.getItem('empData')).unitFname : "",
            postFname: JSON.parse(localStorage.getItem('empData')).postFname ? JSON.parse(localStorage.getItem('empData')).postFname : "",
            goutDateShow: false,
            goutBgdateShow: false,
            goutEddateShow: false,
            saveStatus: false,
            disabled: false,
            approveList: []
        }
    },
    verify: {
        form: {
            goutDate: "required",
            goutReason: "required",
            goutBgdate: "required",
            goutEddate: "required",
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
        this.getData();
        this.getApprove();
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
                data.tbName = 'atten_gooutproc';
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
                            name: 'attenGooutproc'
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
                    tbName: 'atten_gooutproc',
                }
                getDataLevelUserLogin(data).then((res) => {
                    if (isSuccess(res, t)) {
                        t.$notify({
                            message: '提交成功',
                            duration: 1500,
                            background: '#1989fa'
                        });
                        this.$router.push({
                            name: 'attenGooutproc'
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
            if (this.curDom === 'goutDate') {
                value = new Date(value).format('yyyy-MM-dd');
            } else {
                value = new Date(value).format('yyyy-MM-dd hh:mm:ss');
            }
            this.currentDate = new Date();
            this.form[this.curDom] = value;
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
                tbName: 'atten_gooutproc',
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    console.log(data, "t.content ");
                    if (data.curStepCode !== 'flow_gooutproc _1000') {
                        t.disabled = true;
                    } else if (data.curStepstate === "p_flowst_3") {
                        t.disabled = true;
                    }
                    t.form.empId = data.empId;
                    t.form.deptId = data.deptId;
                    t.form.postId = data.postId;
                    t.form.goutDate = data.goutDate ? data.goutDate : '请选择';
                    t.form.goutReason = data.goutReason ? data.goutReason : '';
                    t.form.goutBgdate = data.goutBgdate ? data.goutBgdate : '请选择';
                    t.form.goutEddate = data.goutEddate ? data.goutEddate : '请选择';
                    t.form.note = data.note;
                    t.empnhName = data.empnhName;
                    t.unitFname = data.unitFname;
                    t.postFname = data.postFname;
                    t.goutDateDate = !data.goutDate ? new Date() : new Date(data.goutDate.replace(/-/g, '/'));
                    t.goutBgdateDate = !data.goutBgdate ? new Date() : new Date(data.goutBgdate.replace(/-/g, '/'));
                    t.goutEddateDate = !data.goutEddate ? new Date() : new Date(data.goutEddate.replace(/-/g, '/'));
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
        //获取审批记录
        getApprove () {
            const t = this;
            if (this.$route.query.id === undefined) {
                return;
            }
            const data = {
                _mt: 'wxansrpttodo.getAnsrptRecord',
                companyId: pubsource.companyId,
                dataId: this.$route.query.id,
                tbname: 'atten_gooutproc'
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    t.approveList = data.ansList;
                    console.log(data, "t.data")
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
    },
}
</script>
<style lang="less">
.attenGooutprocDetail {
    height: calc(~"100% - 100px");
    background: #f6f6f6;

    .attenGooutprocDetailWrap {
        height: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        background: #f6f6f6;
        flex-direction: column;
        // margin-bottom: 100px;
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
        .title {
            background: #fff;
            padding: 30px 0 0 40px;
            padding-bottom: 60px;
            display: flex;
            position: relative;
            justify-content: space-between;
            .title_left {
                display: flex;
            }
            > span {
                font-size: 30px;
                padding-right: 36px;
                color: #339afe;
            }
            img {
                width: 30px;
                height: 30px;
                margin-right: 20px;
            }
            h3 {
                font-size: 30px;
                font-weight: normal;
                color: #999999;
            }
            &:after {
                content: " ";
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                height: 2px;
                border-bottom: 2px solid #d9d9d9;
                color: #d9d9d9;
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
                left: 0.2rem;
            }
        }
        .course {
            font-size: 30px;
            padding: 20px 20px;
            margin-bottom: 10px;
            // width: 100%;
            border-top: 1px solid #d9d9d9;
            display: flex;
            background: #fff;
            flex-direction: column;
            .start {
                width: 90%;
                margin-top: 20px;
                .first {
                    display: inline-block;
                    width: 100px;
                    height: 20px;
                    border: 1px solid white;
                }
                .data {
                    float: right;
                }
                .firsts {
                    width: 150px;
                    height: 20px;
                    border: 1px solid white;
                    text-align: left;
                    display: inline-block;
                    margin-left: 70px;
                    color: green;
                }
            }
            .point {
                margin-top: 30px;
                margin-left: 100px;
                width: 1px;
                height: 50px;
                border: 1px solid black;
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
