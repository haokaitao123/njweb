<template>
    <div class="employInfoChange">
        <div class="employInfoChangeWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 员工姓名 -->
                <div class="item_box">
                    <x-input title="员工姓名"
                             v-model="form.name"
                             v-verify="form.name"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-remind="form.name"></icon>
                </div>
                <!-- 证件号码 -->
                <div class="item_box">
                    <x-input title="证件号码"
                             v-model="form.idNumber"
                             v-verify="form.idNumber"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-remind="form.idNumber"></icon>
                </div>
                <!-- 部门名称 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          value-align="left"
                          v-model="form.deptName"
                          v-verify="form.deptName"
                          @click.native="popupClick('dateShow','deptName')">
                        <div slot="title">部门名称</div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-remind="form.deptName"></icon>
                </div>
                <!-- 岗位名称 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          value-align="left"
                          v-model="form.postName"
                          v-verify="form.postName"
                          @click.native="popupClick('dateShow','postName')">
                        <div slot="title">岗位名称</div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-remind="form.postName"></icon>
                </div>
                <!-- 工作单位 -->
                <div class="item_box">
                    <x-input title="工作单位"
                             v-model="form.workUnit"
                             v-verify="form.workUnit"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                </div>
                <!-- 职务 -->
                <div class="item_box">
                    <x-input title="职务"
                             v-model="form.duty"
                             v-verify="form.duty"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                </div>
                <!-- 联系方式 -->
                <div class="item_box">
                    <x-input title="联系方式"
                             v-model="form.contactWay "
                             v-verify="form.contactWay"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                </div>
                <!-- 备注 -->
                <x-textarea :max="300"
                            title="备注"
                            :height="95"
                            v-model="form.note"
                            placeholder="请填写"
                            :show-counter="true"></x-textarea>

            </group>
            <div class="save_button">
                <x-button type="primary"
                          class="x_button"
                          @click.native="save"
                          action-type="button">保存</x-button>
            </div>

        </div>
        <van-popup v-model="popupShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="currentIndex"
                        :columns=columns
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <van-popup v-model="dateShow"
                   position="bottom">
            <van-datetime-picker v-model="currentDate"
                                 type="date"
                                 :min-date="minDate"
                                 :max-date="maxDate"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
    </div>
</template>
<script>

import { Group, Cell, XInput, XTextarea, Icon } from 'vux'
export default {
    data () {
        return {
            columns: ['狼人', '预言家', '平民', '女巫', '猎人'],
            curDom: "",
            curDomShow: "",
            currentDate: new Date(),
            currentIndex: 2,
            minDate: new Date(1900, 10, 1),
            maxDate: new Date(),
            form: {
                name: "",                           //员工姓名
                idNumber: "",                       //证件号码
                deptName: "请选择",                      //部门名称
                postName: "请选择",                      //岗位名称
                contactWay: "",                    //联系方式
                note: "",                          //备注
            },
            dateShow: false,
            popupShow: false,
        }
    },
    verify: {
        form: {
            // familyTies: "required",
            // name: "required",
            // workUnit: "required",
            // duty: "required",
            // contactWay: "required",
            // note: "required",
        }
    },
    components: {
        Group,
        Cell,
        XInput,
        Icon,
        XTextarea
    },
    methods: {
        save () {
            console.log(this.$verify.check());
            this.$router.push({
                name: 'resumeInfo'
            })
        },
        popupClick (domShow, dom) {
            this[domShow] = true;
            this.curDom = dom;
            this.curDomShow = domShow;
            if (domShow == "dateShow") {
                console.log(this.form[dom], "dom")
                this.currentDate = this.form[dom].indexOf('请选择') != -1 ? new Date() : new Date(this.form[dom]);
            } else if (domShow == "popupShow") {
                this.currentIndex = 1
            }

        },
        confirm (value) {
            if (this.curDomShow == "dateShow") {
                value = new Date(value).format('yyyy-MM-dd');
                this.currentDate = new Date();
            } else if (this.curDomShow == "popupShow") {
                this.currentIndex = 2
            }

            this[this.curDomShow] = false;
            this.form[this.curDom] = value;
        },
        cancel (value) {
            if (this.curDomShow == "dateShow") {
                this.currentDate = new Date();
            } else if (this.curDomShow == "popupShow") {
                this.currentIndex = 2
            }
            this[this.curDomShow] = false;
        }
    },
}
</script>
<style lang="less">
.employInfoChange {
    height: 100%;
    background: #f6f6f6;
    .employInfoChangeWrap {
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .save_button {
            padding: 46px 70px;
            .x_button {
                color: #fff;
                font-size: 34px;
            }
        }
    }
}
</style>


