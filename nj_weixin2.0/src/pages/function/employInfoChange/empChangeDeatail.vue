<template>
    <div class="empChangeDeatail">
        <div class="empChangeDeatailWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 员工姓名 -->
                <div class="item_box">
                    <!-- <cell title=""
                          v-if="!disabled"
                          is-link
                          value-align="left"
                          :disabled="disabled"
                          v-model="empnhName"
                          v-verify="form.empId"
                          @click.native="popupClick('empShow')">
                        <div slot="title">员工姓名<span>*</span></div>
                    </cell> -->
                    <icon type="warn"
                          class="error"
                          v-show="empnhName=='请选择'"
                          v-remind="form.empId"></icon>
                    <x-input title="员工姓名<span>*</span>"
                             v-model="empnhName"
                             v-verify="form.empId"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'"
                             :disabled="true">
                    </x-input>
                </div>
                <!-- 证件号码 -->
                <div class="item_box">
                    <x-input title="证件号码"
                             v-model="form.empnhIdno"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'"
                             :disabled="true">
                    </x-input>
                </div>
                <!-- 部门名称 -->
                <div class="item_box">
                    <x-input title="部门名称"
                             v-model="unitFname"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'"
                             :disabled="true">
                    </x-input>
                </div>
                <!-- 岗位名称 -->
                <div class="item_box">
                    <x-input title="岗位名称"
                             v-model="postFname"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'"
                             :disabled="true">
                    </x-input>
                </div>
                <!-- 居住详细地址 -->
                <div class="item_box">
                    <x-input title="居住详细地址"
                             v-model="form.empupdResaddr"
                             v-verify="form.empupdResaddr"
                             :show-clear="false"
                             :disabled="disabled"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                    <!-- <icon type="warn"
                          class="error"
                          v-show="form.empupdResaddr==''"
                          v-remind="form.empupdResaddr"></icon> -->
                </div>
                <!-- 开户银行 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="empnhSalbankDis"
                          v-verify="form.empupdSalbank"
                          @click.native="popupClick('bankShow')">
                        <div slot="title">开户银行</div>
                    </cell>
                    <!-- <icon type="warn"
                          class="error"
                          v-show="empnhSalbankDis=='请选择'"
                          v-remind="form.empupdSalbank"></icon> -->
                    <x-input title="开户银行"
                             v-if="disabled"
                             v-model="empnhSalbankDis"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'"
                             :disabled="true">
                    </x-input>
                </div>
                <!-- 银行账号 -->
                <div class="item_box">
                    <x-input title="银行账号"
                             v-model="form.empupdSalcount "
                             v-verify="form.empupdSalcount"
                             :disabled="disabled"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.empupdSalcount==''"
                          v-remind="form.empupdSalcount"></icon>
                </div>
                <!-- 户名 -->
                <div class="item_box">
                    <x-input title="户名"
                             v-model="form.empupdSalcname "
                             v-verify="form.empupdSalcname"
                             :disabled="disabled"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.empupdSalcname==''"
                          v-remind="form.empupdSalcname"></icon>
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
                 v-if="state==='01draft'||state===''">
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
                       :currentId="currentEmpId"></searchEmp>
        </van-popup>
        <!-- 银行 -->
        <van-popup v-model="bankShow"
                   position="right"
                   class="right_popup">
            <searchBank @inputBank="inputBank"
                        v-if="bankShow"
                        :currentId="currentBankId"></searchBank>
        </van-popup>
    </div>
</template>
<script>
import {
    getDataLevelUserLogin,
    getDataLevelUserLoginEmpId
} from '@/axios/axios'
import {
    isSuccess,
    deepCopy
} from '@/lib/util'
import searchEmp from '@/components/search/searchEmp'
import searchBank from '@/components/search/searchBank'
import valid from '@/lib/pub_valid'
import {
    Group,
    Cell,
    XInput,
    XTextarea,
    Icon
} from 'vux'
export default {
    data () {
        return {
            id: "",
            curDom: "",
            curDomShow: "",
            state: this.$route.query.state ? this.$route.query.state : '',
            userData: JSON.parse(window.localStorage.getItem('empData')),
            form: {
                empId: window.localStorage.getItem('empId') ? window.localStorage.getItem('empId') : '', 						                //员工姓名
                empnhIdno: JSON.parse(window.localStorage.getItem('empData')).empnhIdno, 			//证件号码
                deptId: JSON.parse(window.localStorage.getItem('empData')).deptId, 					//部门名称
                postId: JSON.parse(window.localStorage.getItem('empData')).postId, 					//岗位名称
                empupdResaddr: JSON.parse(window.localStorage.getItem('empData')).empnhResiaddr ? JSON.parse(window.localStorage.getItem('empData')).empnhResiaddr : "", 				                                                    //居住详细地址
                empupdSalbank: JSON.parse(window.localStorage.getItem('empData')).empnhSalbank ? JSON.parse(window.localStorage.getItem('empData')).empnhSalbank : "", 				                                                    //开户银行
                empupdSalcount: JSON.parse(window.localStorage.getItem('empData')).empnhSalaccount ? JSON.parse(window.localStorage.getItem('empData')).empnhSalaccount : "",				                                                    //银行账号
                empupdSalcname: JSON.parse(window.localStorage.getItem('empData')).empnhName ? JSON.parse(window.localStorage.getItem('empData')).empnhName : '',		//户名
                empupdReason: "",				                                                    //未通过原因
                note: "",						                                                    //备注
            },
            empnhName: JSON.parse(window.localStorage.getItem('empData')).empnhName ? JSON.parse(window.localStorage.getItem('empData')).empnhName : '',
            unitFname: JSON.parse(window.localStorage.getItem('empData')).unitFname,
            postFname: JSON.parse(window.localStorage.getItem('empData')).postFname,
            empnhSalbankDis: JSON.parse(window.localStorage.getItem('empData')).empnhSalbankDis ? JSON.parse(window.localStorage.getItem('empData')).empnhSalbankDis : "请填写",
            empShow: false,
            bankShow: false,
            currentEmpId: '',
            currentBankId: JSON.parse(window.localStorage.getItem('empData')).empnhSalbank ? JSON.parse(window.localStorage.getItem('empData')).empnhSalbank : "",
            disabled: false,
            saveStatus: false,
            bankVaild: true,
        }
    },
    verify: {
        form: {
            empId: "required",
            empupdResaddr: "required",
            empupdSalbank: "required",
            empupdSalcount: ["required", "number"],
            empupdSalcname: "required"
        }
    },
    components: {
        Group,
        Cell,
        XInput,
        Icon,
        XTextarea,
        searchEmp,
        searchBank
    },
    mounted () {
        this.getData()
    },
    methods: {
        // comfirmSave () {
        //     if (this.$verify.check()) {
        //         this.$dialog.confirm({
        //             title: '',
        //             message: '是否确认保存？'
        //         }).then(() => {
        //             this.save();
        //         }).catch(() => {
        //             // on cancel
        //         });
        //     } else {
        //         this.$vux.toast.text('请检查填写信息', 'middle');
        //     }
        // },
        //银行卡号校验
        //银行卡验证
        bankCheck () {
            console.log(123)
            if (this.form.empupdSalcount == '') {
                this.bankVaild = true;
            }
            if (valid.val_backNumber(this.form.empupdSalcount) == 1) {
                this.bankVaild = false;
                this.$vux.toast.text('银行卡号长度必须在16到19之间！', 'number');

            } else if (valid.val_backNumber(this.form.empupdSalcount) == 2) {
                this.bankVaild = false;
                this.$vux.toast.text('银行卡号码必须全为数字', 'number');

            } else if (valid.val_backNumber(this.form.empupdSalcount) == 3) {
                this.bankVaild = false;
                this.$vux.toast.text('银行卡号开头6位不符合规范', 'number');

            }


        },
        async save () {
            const t = this;
            if (this.$verify.check()) {
                const data = deepCopy(t.form);
                data._mt = "wxEmpEmpupd.addAndUpd";
                data.companyId = pubsource.companyId;
                data.userId = window.localStorage.getItem('uid');
                let listId = this.$route.query.id;
                let text = "";
                if (listId !== undefined) {
                    data.id = listId;
                } else {
                    data.id = t.id;
                }
                for (const dat in data) {
                    if (data[dat] === "") {
                        delete data[dat];
                    }
                }
                await getDataLevelUserLoginEmpId(data).then(res => {
                    if (isSuccess(res, t)) {
                        let data = JSON.parse(res.data.content[0].value);
                        console.log(data, "t.content ");
                        t.id = data.id;
                        t.saveStatus = true;
                        t.$notify({
                            message: '保存成功',
                            duration: 1500,
                            background: '#1989fa'
                        });
                        t.$router.push({
                            name: 'employInfoChange'
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
                this.$vux.toast.text('请检查填写信息', 'middle');
            }
        },
        popupClick (domShow) {
            this[domShow] = true;
        },
        comfirmSubmit () {
            if (this.$verify.check() && this.bankVaild) {
                this.$dialog.confirm({
                    title: '',
                    message: '是否确认提交？'
                }).then(() => {
                    this.submitMes();
                }).catch(() => {
                    // on cancel
                });
            }
        },
        //提交
        async submitMes () {
            const t = this;
            await this.save();
            if (this.saveStatus) {
                const data = {
                    _mt: 'wxEmpEmpupd.setStateByIds',
                    companyId: pubsource.companyId,
                    userId: localStorage.getItem('uid'),
                    ids: this.$route.query.id ? this.$route.query.id : t.id,
                    state: '02draft'
                }
                getDataLevelUserLogin(data).then((res) => {
                    if (isSuccess(res, t)) {
                        let data = JSON.parse(res.data.content[0].value);
                        if (data === 1) {
                            t.$notify({
                                message: '提交成功',
                                duration: 1500,
                                background: '#1989fa'
                            });
                            t.$router.push({
                                name: 'employInfoChange'
                            })
                        } else {
                            t.$notify({
                                message: '提交失败',
                                duration: 1500,
                                background: '#f44'
                            });
                        }
                    }
                }).catch((err) => {
                    t.$notify({
                        message: '网络错误',
                        duration: 1500,
                        background: '#f44'
                    });
                    t.saveStatus = false
                }).finally(() => {
                    t.$store.commit('hideLoading');
                });
            }
        },
        //获取详情
        getData () {
            const t = this;
            if (this.$route.query.id === undefined) {
                return;
            }
            const data = {
                _mt: 'wxEmpEmpupd.getById',
                companyId: pubsource.companyId,
                id: this.$route.query.id,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    console.log(data, "t.content ");
                    t.form.empId = data.empId;
                    t.form.empnhIdno = data.empnhIdno;
                    t.form.deptId = data.deptId;
                    t.form.postId = data.postId;
                    t.form.empupdResaddr = !data.empupdResaddr ? '' : data.empupdResaddr;
                    t.form.empupdSalbank = data.empupdSalbank;
                    t.form.empupdSalcount = data.empupdSalcount;
                    t.form.empupdSalcname = data.empupdSalcname;
                    t.form.empupdReason = data.empupdReason;
                    t.form.note = data.note;
                    t.empnhName = data.empnhName ? data.empnhName : '';
                    t.unitFname = data.unitFname;
                    t.postFname = data.postFname;
                    if (t.state !== '01draft') {
                        t.disabled = true;
                    }
                    t.empnhSalbankDis = data.empnhSalbankDis;
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
        //员工弹出框事件
        inputEmp (res) {
            console.log(res, "res")
            this.empShow = false;
            this.currentEmpId = res.id;
            this.form.empId = res.id;
            this.form.empnhIdno = res.empnhIdno;
            this.form.deptId = res.deptId;
            this.form.postId = res.postId;
            this.empnhName = res.empnhName;
            this.unitFname = res.unitFname;
            this.postFname = res.postFname;
        },
        //银行弹出框选中事件
        inputBank (res) {
            console.log(res, "res")
            this.bankShow = false;
            this.currentBankId = res.id;
            this.form.empupdSalbank = res.id;
            this.empnhSalbankDis = res.bankCname;
        },
    },
}
</script>
<style lang="less" >
.empChangeDeatail {
    height: 100%;
    background: #f6f6f6;
    .empChangeDeatailWrap {
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        background: #f6f6f6;
        margin-bottom: 110px;
    }
    .van-popup--right {
        top: 50% !important;
    }

    .right_popup {
        width: 80% !important;
        height: 100% !important;
    }
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
</style>
