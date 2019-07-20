<template>
    <div class="empWorkExp">
        <div class="empWorkExpWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 开始时间 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.weSdate"
                          v-verify="form.weSdate"
                          @click.native="popupClick('weSdateShow','weSdate')">
                        <div slot="title">开始时间<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.weSdate=='请选择'"
                          v-remind="form.weSdate"></icon>
                    <x-input title="开始时间<span>*</span>"
                             v-if="disabled"
                             v-model="form.weSdate"
                             :disabled="disabled"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 结束时间 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.weEdate"
                          v-verify="form.weEdate"
                          @click.native="popupClick('weEdateShow','weEdate')">
                        <div slot="title">结束时间<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.weEdate=='请选择'"
                          v-remind="form.weEdate"></icon>
                    <x-input title="结束时间<span>*</span>"
                             v-if="disabled"
                             v-model="form.weEdate"
                             :disabled="disabled"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 工作单位 -->
                <div class="item_box">
                    <x-input title="工作单位<span>*</span>"
                             v-model="form.weComp"
                             :disabled="disabled"
                             v-verify="form.weComp"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.weComp==''"
                          v-remind="form.weComp"></icon>
                </div>
                <!-- 工作部门 -->
                <div class="item_box">
                    <x-input title="工作部门"
                             v-model="form.weDept"
                             :disabled="disabled"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 工作岗位 -->
                <div class="item_box">
                    <x-input title="工作岗位"
                             v-model="form.wePost"
                             :disabled="disabled"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 主要业绩 -->
                <x-textarea :max="300"
                            title="主要业绩"
                            :height="95"
                            v-model="form.wePerforman"
                            :disabled="disabled"
                            :show-counter="false"
                            :placeholder="disabled?'未填写':'请填写'"></x-textarea>
                <!-- 证明人 -->
                <div class="item_box">
                    <x-input title="证明人"
                             v-model="form.weContact"
                             :disabled="disabled"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 联系电话 -->
                <div class="item_box">
                    <x-input title="联系电话"
                             v-model="form.wePhone"
                             v-verify="form.wePhone"
                             :disabled="disabled"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-remind="form.wePhone"></icon>
                </div>
                <!-- 薪资 -->
                <div class="item_box">
                    <x-input title="薪资<span>*</span>"
                             v-model="form.weSalary"
                             :disabled="disabled"
                             v-verify="form.weSalary"
                             type="tel"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.weSalary==''"
                          v-remind="form.weSalary"></icon>
                </div>
                <!-- 离职原因 -->
                <x-textarea :max="300"
                            title="离职原因"
                            :height="95"
                            :disabled="disabled"
                            v-model="form.weLevrason"
                            :placeholder="disabled?'未填写':'请填写'"
                            :show-counter="true"></x-textarea>
                <!-- 备注 -->
                <x-textarea :max="300"
                            title="备注"
                            :height="95"
                            :disabled="disabled"
                            v-model="form.note"
                            :placeholder="disabled?'未填写':'请填写'"
                            :show-counter="true"></x-textarea>

            </group>
            <div class="save_button">
                <x-button type="default"
                          class="x_button button_left"
                          action-type="button"
                          @click.native="back">返回</x-button>
                <x-button type="primary"
                          class="x_button"
                          @click.native="save"
                          v-if="!disabled">保存</x-button>
            </div>
        </div>
        <van-popup v-model="weSdateShow"
                   position="bottom">
            <van-datetime-picker v-model="weSdateDate"
                                 type="date"
                                 :min-date="minWeSdate"
                                 :max-date="maxWeSdate"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <van-popup v-model="weEdateShow"
                   position="bottom">
            <van-datetime-picker v-model="weEdateDate"
                                 type="date"
                                 :min-date="minWeEdate"
                                 :max-date="maxWeEdate"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
    </div>
</template>
<script>
import {
    getDataLevelUserLogin,
    getDataLevelUserLoginNew
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
    Icon,
    Popup
} from 'vux'
export default {
    data () {
        return {
            curDom: "",
            curDomShow: "",
            weSdateDate: new Date(),
            weEdateDate: new Date(),
            minWeSdate: new Date(1900, 1, 1),
            maxWeSdate: new Date(2099, 12, 31),
            minWeEdate: new Date(1900, 1, 1),
            maxWeEdate: new Date(2099, 12, 31),
            form: {
                weSdate: "请选择", // 开始时间
                weEdate: "请选择", // 结束时间
                weComp: "", // 工作单位
                weDept: "", // 工作部门
                wePost: "", // 工作职务
                wePerforman: "", // 主要业绩
                weContact: "", // 证明人
                wePhone: "", // 联系电话
                weSalary: "", // 薪资
                weLevrason: "", // 离职原因
                note: "" // 备注
            },
            weSdateShow: false,
            weEdateShow: false,
        }
    },
    verify: {
        form: {
            weSdate: "required",
            weEdate: "required",
            weComp: "required",
            weSalary: ["required", "number"],
            wePhone: "mobile",
            weLevrason: "required",
        }
    },
    props: {
        id: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    components: {
        Group,
        Cell,
        XInput,
        Icon,
        XTextarea,
        Popup
    },
    mounted () {
        this.getData();
    },
    methods: {
        //保存
        save () {
            const t = this;
            if (this.$verify.check()) {
                const data = deepCopy(t.form);
                data._mt = "wxEmpWorkExp.addOrUpd";
                data.companyId = pubsource.companyId;
                let listId = this.id;
                if (listId !== '') {
                    data.id = listId
                } else {
                    data.pkId = window.localStorage.getItem('empId');
                }
                getDataLevelUserLoginNew(data).then(res => {
                    if (isSuccess(res, t)) {
                        t.$notify({
                            message: '保存成功',
                            duration: 1500,
                            background: '#1989fa'
                        });
                        this.$emit('cancel');
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
            }
        },
        //底部弹出
        popupClick (domShow, dom) {
            this.curDom = dom;
            this.curDomShow = domShow;
            this[domShow] = true;
        },
        //底部弹出确定事件
        confirm (value) {
            if (this.curDom == 'weSdate') {
                this.minWeEdate = new Date(value)
            }
            if (this.curDom == 'weEdate') {
                this.maxWeSdate = new Date(value)
            }
            value = new Date(value).format('yyyy-MM-dd');
            this.currentDate = new Date();
            this.form[this.curDom] = value
            this[this.curDomShow] = false;
        },
        //底部弹出取消事件
        cancel (value) {
            this.currentDate = new Date();
            this[this.curDomShow] = false;
        },
        getData () {
            const t = this;
            if (t.id === '') {
                return;
            }
            const data = {
                _mt: 'wxEmpWorkExp.getById',
                companyId: pubsource.companyId,
                id: t.id,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    t.form.weSdate = data.weSdate;
                    t.form.weEdate = data.weEdate;
                    t.form.weComp = data.weComp ? data.weComp : '';
                    t.form.weDept = data.weDept ? data.weDept : '';
                    t.form.wePost = data.wePost ? data.wePost : '';
                    t.form.weContact = data.weContact ? data.weContact : '';
                    t.form.wePhone = data.wePhone ? data.wePhone : '';
                    t.form.weSalary = data.weSalary ? data.weSalary : '';
                    t.form.wePerforman = data.wePerforman;
                    t.form.weLevrason = data.weLevrason;
                    t.form.note = data.note;
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
        //取消
        back () {
            this.$emit('cancel');
            document.getElementsByClassName('empWorkExpWrap')[0].scrollTop = '0'
        }
    },
}
</script>
<style lang="less">
.empWorkExp {
    height: 100%;
    background: #f6f6f6;
    .empWorkExpWrap {
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        background: #f6f6f6;
        height: 100%;
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
    }
}
</style>
