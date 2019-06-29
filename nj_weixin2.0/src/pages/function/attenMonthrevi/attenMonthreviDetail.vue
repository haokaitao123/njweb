<template>
    <div class="attenMonthreviDetail">
        <div class="attenMonthreviDetailWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 考勤期间 -->
                <div class="item_box">
                    <x-input title="考勤期间"
                             v-model="attenMonthrevi.atmorPeriod"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 开始日期 -->
                <div class="item_box">
                    <x-input title="开始日期"
                             v-model="attenMonthrevi.atmorSdate"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 结束日期 -->
                <div class="item_box">
                    <x-input title="结束日期"
                             v-model="attenMonthrevi.atmorEdate"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 员工姓名 -->
                <div class="item_box">
                    <x-input title="员工姓名"
                             v-model="attenMonthrevi.empnhName"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 身份证 -->
                <div class="item_box">
                    <x-input title="身份证"
                             v-model="attenMonthrevi.empnhIdno"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 部门名称 -->
                <div class="item_box">
                    <x-input title="部门名称"
                             v-model="attenMonthrevi.unitFname"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 岗位名称 -->
                <div class="item_box">
                    <x-input title="岗位名称"
                             v-model="attenMonthrevi.postFname"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 出勤天数 -->
                <div class="item_box">
                    <x-input title="出勤天数"
                             v-model="attenMonthrevi.atmorAttdays"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 休息天数 -->
                <div class="item_box">
                    <x-input title="休息天数"
                             v-model="attenMonthrevi.atmorOffdays"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 迟到次数 -->
                <div class="item_box">
                    <x-input title="迟到次数"
                             v-model="attenMonthrevi.atmorLatenums"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 早退次数 -->
                <div class="item_box">
                    <x-input title="早退次数"
                             v-model="attenMonthrevi.atmorEarlynums"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 缺卡次数 -->
                <div class="item_box">
                    <x-input title="缺卡次数"
                             v-model="attenMonthrevi.atmorMissnums"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 旷工次数-->
                <div class="item_box">
                    <x-input title="旷工次数"
                             v-model="attenMonthrevi.atmorComnums"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 外勤次数-->
                <div class="item_box">
                    <x-input title="外勤次数"
                             v-model="attenMonthrevi.atmorFieldnums"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 加班天数-->
                <div class="item_box">
                    <x-input title="加班天数"
                             v-model="attenMonthrevi.atmorOverdays"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 考勤确认-->
                <div class="item_box">
                    <x-input title="考勤确认"
                             v-model="attenMonthrevi.atmorConfirm"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 备注 -->
                <x-textarea :max="300"
                            title="备注"
                            :height="95"
                            v-model="attenMonthrevi.note"
                            placeholder="未填写"
                            :disabled="true"
                            :show-counter="false"></x-textarea>

            </group>
            <div class="save_button">
                <x-button type="primary"
                          class="x_button"
                          @click.native="comfirmSave"
                          action-type="button">确认</x-button>
            </div>

        </div>
    </div>
</template>
<script>
import { getDataLevelUserLogin } from '@/axios/axios'
import { isSuccess } from '@/lib/util'
import { Group, Cell, XInput, XTextarea } from 'vux'
import { mapState } from 'vuex'
export default {
    data () {
        return {
        }
    },
    components: {
        Group,
        Cell,
        XInput,
        XTextarea
    },
    computed: {
        ...mapState([
            'attenMonthrevi',
        ]),
    },
    methods: {

        comfirmSave () {
            const t = this
            this.$dialog.confirm({
                title: '',
                message: '是否确认？'
            }).then(() => {
                t.save();
            }).catch(() => {
                // on cancel
            });
        },
        save () {
            const t = this
            const data = {
                _mt: 'wxAttenMonthrevi.setStateById',
                state: '02State',
                companyId: pubsource.companyId,
                id: t.attenMonthrevi.id,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    console.log(res, "res");
                    t.$notify({
                        message: '确认成功',
                        duration: 1500,
                        background: '#1989fa'
                    });
                    this.$router.push({
                        name: 'attenMonthrevi'
                    })
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
    },
}
</script>
<style lang="less">
.attenMonthreviDetail {
    height: 100%;
    background: #f6f6f6;
    .attenMonthreviDetailWrap {
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        background: #f6f6f6;
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
