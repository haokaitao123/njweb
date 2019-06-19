<template>
    <div class="family">
        <div class="familyWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 家庭成员关系 -->
                <div class="item_box">
                    <cell title=""
                          v-if="!disabled"
                          is-link
                          value-align="left"
                          v-model="refaMembersDis"
                          v-verify="form.refaMembers"
                          :disabled="disabled"
                          @click.native="popupClick('refaMembersShow','refaMembers')">
                        <div slot="title">家庭成员关系<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="refaMembersDis==''"
                          v-remind="form.refaMembers"></icon>
                    <x-input title="家庭成员关系<span>*</span>"
                             v-if="disabled"
                             v-model="refaMembersDis"
                             :disabled="disabled"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 姓名 -->
                <div class="item_box">
                    <x-input title="姓名<span>*</span>"
                             v-model="form.refaName"
                             v-verify="form.refaName"
                             :disabled="disabled"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.refaName==''"
                          v-remind="form.refaName"></icon>
                </div>
                <!-- 工作单位 -->
                <div class="item_box">
                    <x-input title="工作单位"
                             v-model="form.refaCompnm"
                             v-verify="form.refaCompnm"
                             :disabled="disabled"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 职务 -->
                <div class="item_box">
                    <x-input title="职务"
                             v-model="form.refaPost"
                             :disabled="disabled"
                             v-verify="form.refaPost"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 联系方式 -->
                <div class="item_box">
                    <x-input title="联系方式<span>*</span>"
                             v-model="form.refaContact "
                             :disabled="disabled"
                             v-verify="form.refaContact"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.refaContact==''"
                          v-remind="form.refaContact"></icon>
                </div>
                <!-- 备注 -->
                <x-textarea :max="300"
                            title="备注"
                            :height="95"
                            :disabled="disabled"
                            v-model="form.note"
                            :placeholder="disabled?'未填写':'请填写'"
                            :show-counter="true"></x-textarea>

            </group>
            <!-- <div class="save_button">
                <x-button type="primary"
                          class="x_button"
                          @click.native="save"
                          action-type="button">保存</x-button>
            </div> -->
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
        <van-popup v-model="refaMembersShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="refaMembersIndex"
                        :columns=selectRefaMembers
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
    </div>
</template>
<script>
import { getDataLevelNone, getDataLevelNoneNew } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
import { Group, Cell, XInput, XTextarea, Icon } from 'vux'
export default {
    data () {
        return {
            curDom: "",
            curDomShow: "",
            form: {
                refaMembers: "",                    //家庭成员关系
                refaName: "",                       //姓名
                refaCompnm: "",                     //工作单位
                refaPost: "",                       //职务
                refaContact: "",                    //联系方式
                note: "",                          //备注
            },
            refaMembersDis: '请选择',
            refaMembersShow: false,
            refaMembersIndex: 0,
            selectRefaMembers: [],
            reeduPid: this.$route.query.id,
        }
    },
    verify: {
        form: {
            refaMembers: "required",
            refaName: "required",
            refaContact: ["required", "mobile"],
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
        XTextarea
    },
    mounted () {
        this.getSelect();
        this.getData();
    },
    methods: {
        //保存
        save () {
            const t = this;
            if (this.$verify.check()) {
                const data = deepCopy(t.form);
                data._mt = "wxRecruitFamily.addOrUpdNoLogin";
                data.companyId = pubsource.companyId;
                let id = this.id;
                if (id !== '') {
                    data.id = id
                } else {
                    data.refaPid = t.reeduPid;
                }
                for (const dat in data) {
                    if (data[dat] === "") {
                        delete data[dat];
                    }
                }
                getDataLevelNoneNew(data).then(res => {
                    if (isSuccess(res, t)) {
                        localStorage.removeItem('familyForm' + t.id)
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
        //底部弹出框
        popupClick (domShow, dom) {
            this.curDom = dom;
            this.curDomShow = domShow;
            this[domShow] = true;
        },
        confirm (value) {
            this.form[this.curDom] = value.key;
            let str = this.curDom
            str += "Dis";
            this[str] = value.text;
            this[this.curDomShow] = false;
        },
        cancel (value) {
            this[this.curDomShow] = false;
        },
        //获取当前id信息
        getData () {
            const t = this;
            if (t.id === '') {
                let familyForm = JSON.parse(window.localStorage.getItem('familyForm' + t.id.toString()));
                if (familyForm) {
                    if (familyForm.id === t.$route.query.id) {
                        let createTime = new Date(familyForm.createTime).getTime();
                        let nowTime = new Date().getTime();
                        if (nowTime - createTime < 5 * 60 * 1000) {
                            t.form = deepCopy(familyForm.form);
                            t.refaMembersDis = familyForm.refaMembersDis;
                            setTimeout(() => {
                                t.setSelectValue(familyForm.form.refaMembers, 'selectRefaMembers', 'refaMembersIndex');
                            }, 100);
                        } else {
                            localStorage.removeItem('familyForm' + t.id)
                        }
                    } else {
                        localStorage.removeItem('familyForm' + t.id)
                    }
                }
                return;
            }
            const data = {
                _mt: 'wxRecruitFamily.getByIdNoLogin',
                companyId: pubsource.companyId,
                id: t.id,
            }
            getDataLevelNone(data).then((res) => {
                if (isSuccess(res, t)) {
                    let familyForm = JSON.parse(window.localStorage.getItem('familyForm' + t.id));
                    if (familyForm !== null && familyForm.id !== t.$route.query.id) {
                        localStorage.removeItem('familyForm');
                        familyForm = JSON.parse(window.localStorage.getItem('familyForm'));
                    }
                    if (!familyForm) {
                        let data = JSON.parse(res.data.content[0].value);
                        t.form.refaMembers = data.refaMembers;
                        t.form.refaName = !data.refaName ? '' : data.refaName;
                        t.form.refaCompnm = !data.refaCompnm ? '' : data.refaCompnm;
                        t.form.refaPost = !data.refaPost ? '' : data.refaPost;
                        t.form.refaContact = !data.refaContact ? '' : data.refaContact;
                        t.form.note = data.note;
                        t.refaMembersDis = data.refaMembersDis;
                        t.setSelectValue(data.refaMembers, 'selectRefaMembers', 'refaMembersIndex');
                    } else {
                        let createTime = new Date(familyForm.createTime).getTime();
                        let nowTime = new Date().getTime();
                        if (nowTime - createTime < 5 * 60 * 1000) {
                            t.form = deepCopy(familyForm.form);
                            t.refaMembersDis = familyForm.refaMembersDis;
                            t.setSelectValue(familyForm.form.refaMembers, 'selectRefaMembers', 'refaMembersIndex');
                        } else {
                            localStorage.removeItem('familyForm' + t.id)
                        }
                    }
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
            getDataLevelNone({
                _mt: "wxBaseParmInfo.getSelectValue",
                typeCode: 'relationship'
            }).then(res => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    t.selectData(data[0].paramList, "selectRefaMembers");

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
                if (k.key === value) {
                    this[index] = k.index;
                    return k.index;
                }
            }
        },
        //取消
        back () {
            this.$emit('cancel');
        }
    },
    watch: {
        form: {
            handler (val, oldvVal) {
                let tt = {};
                tt.form = val;
                tt.refaMembersDis = this.refaMembersDis;
                tt.createTime = new Date();
                tt.id = this.$route.query.id;
                tt = JSON.stringify(tt);
                window.localStorage.setItem('familyForm' + this.id, tt)
            },
            deep: true
        }
    },
}
</script>
<style lang="less">
.family {
    background: #f6f6f6;
    height: 100%;
    .familyWrap {
        overflow: scroll;
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
        display: flex;
        flex-direction: column;
        .save_button {
            padding: 125px 54px 50px;
            display: flex;

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


