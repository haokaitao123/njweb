<template>
    <div class="contractRenewalDetail">
        <div class="contractRenewalDetailWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 合同编号 -->
                <div class="item_box">
                    <x-input title="合同编号"
                             v-model="contractRenewal.numberCode"
                             :show-clear="false"
                             :readonly="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 员工姓名 -->
                <div class="item_box">
                    <x-input title="员工姓名"
                             v-model="contractRenewal.empnhName"
                             :show-clear="false"
                             :readonly="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 部门名称 -->
                <div class="item_box">
                    <x-input title="部门名称"
                             v-model="contractRenewal.unitFname"
                             :show-clear="false"
                             :readonly="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 岗位名称 -->
                <div class="item_box">
                    <x-input title="岗位名称"
                             v-model="contractRenewal.postFname"
                             :show-clear="false"
                             :readonly="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 身份证号 -->
                <div class="item_box">
                    <x-input title="身份证号"
                             v-model="contractRenewal.empnhIdno"
                             :show-clear="false"
                             :readonly="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 原合同开始日 -->
                <div class="item_box">
                    <x-input title="原合同开始日"
                             v-model="contractRenewal.contrStrdate"
                             :show-clear="false"
                             :readonly="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 原合同到期日 -->
                <div class="item_box">
                    <x-input title="原合同到期日"
                             v-model="contractRenewal.contrEndtdate"
                             :show-clear="false"
                             :readonly="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 原签订时间 -->
                <div class="item_box">
                    <x-input title="原签订时间"
                             v-model="contractRenewal.contrPastdate"
                             :show-clear="false"
                             :readonly="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 合同期限 -->
                <div class="item_box">
                    <x-input title="合同期限"
                             v-model="contractRenewal.contPeriodDis"
                             :show-clear="false"
                             :readonly="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 合同开始日 -->
                <div class="item_box">
                    <x-input title="合同开始日"
                             v-model="contractRenewal.contrSdate"
                             :show-clear="false"
                             :readonly="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 合同到期日 -->
                <div class="item_box">
                    <x-input title="合同到期日"
                             v-model="contractRenewal.contrEdate"
                             :show-clear="false"
                             :readonly="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 签订时间 -->
                <div class="item_box">
                    <x-input title="签订时间"
                             v-model="contractRenewal.contrSigndate"
                             :show-clear="false"
                             :readonly="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 生效日期-->
                <div class="item_box">
                    <x-input title="生效日期"
                             v-model="contractRenewal.contValiddate"
                             :show-clear="false"
                             :readonly="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 失效日期-->
                <div class="item_box">
                    <x-input title="失效日期"
                             v-model="contractRenewal.contInvdate"
                             :show-clear="false"
                             :readonly="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 备注 -->
                <x-textarea :max="300"
                            title="备注"
                            :height="95"
                            v-model="contractRenewal.note"
                            placeholder="未填写"
                            :readonly="true"
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
            'contractRenewal',
        ]),
    },
    methods: {
		comfirmSave(){
			this.$dialog.confirm({
			  title: '',
			  message: '是否确认？'
			}).then(() => {
				this.save();
			}).catch(() => {
			  // on cancel
			});
		},
        save () {
            const t = this
            const data = {
                _mt: 'wxEmpConrenewal.setStateById',
                state: '02valid',
                companyId: pubsource.companyId,
                id: t.contractRenewal.id,
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
                        name: 'empContractRenewal'
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
.contractRenewalDetail {
    height: 100%;
    background: #f6f6f6;
    .contractRenewalDetailWrap {
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
