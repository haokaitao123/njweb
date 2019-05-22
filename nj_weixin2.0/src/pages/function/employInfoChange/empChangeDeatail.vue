<template>
    <div class="empChangeDeatail">
        <div class="empChangeDeatailWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 员工姓名 -->
                <div class="item_box">
                    <cell title=""
						  v-if="!disabled"
                          is-link
                          value-align="left"
						  :disabled="disabled"
                          v-model="empnhName"
                          v-verify="form.empId"
                          @click.native="popupClick('empShow')">
                        <div slot="title">员工姓名<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="empnhName=='请选择'"
                          v-remind="form.empId"></icon>
					<x-input title="员工姓名"
							 v-if="disabled"
					         v-model="empnhName"
					         :show-clear="false"
					         placeholder="未填写"
					         :disabled="true">
					</x-input>
                </div>
                <!-- 证件号码 -->
                <div class="item_box">
                    <x-input title="证件号码"
                             v-model="form.empnhIdno"
                             :show-clear="false"
                             placeholder="未填写"
                             :disabled="true">
                    </x-input>
                </div>
                <!-- 部门名称 -->
                <div class="item_box">
                    <x-input title="部门名称"
                             v-model="unitFname"
                             :show-clear="false"
                             placeholder="未填写"
                             :disabled="true">
                    </x-input>
                </div>
                <!-- 岗位名称 -->
                <div class="item_box">
                    <x-input title="岗位名称"
                             v-model="postFname"
                             :show-clear="false"
                             placeholder="未填写"
                             :disabled="true">
                    </x-input>
                </div>
                <!-- 居住详细地址 -->
                <div class="item_box">
                    <x-input title="居住详细地址<span>*</span>"
                             v-model="form.empupdResaddr"
                             v-verify="form.empupdResaddr"
                             :show-clear="false"
							 :disabled="disabled"
                             placeholder="请填写">
                    </x-input>
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
                        <div slot="title">开户银行<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="empnhSalbankDis=='请选择'"
                          v-remind="form.empupdSalbank"></icon>
					<x-input title="开户银行"
							 v-if="disabled"
					         v-model="empnhSalbankDis"
					         :show-clear="false"
					         placeholder="未填写"
					         :disabled="true">
					</x-input>
                </div>
                <!-- 银行账号 -->
                <div class="item_box">
                    <x-input title="银行账号<span>*</span>"
                             v-model="form.empupdSalcount "
                             v-verify="form.empupdSalcount"
							 :disabled="disabled"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.empupdSalcount==''"
                          v-remind="form.empupdSalcount"></icon>
                </div>
                <!-- 户名 -->
                <div class="item_box">
                    <x-input title="户名<span>*</span>"
                             v-model="form.empupdSalcname "
                             v-verify="form.empupdSalcname"
							 :disabled="disabled"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.empupdSalcname==''"
                          v-remind="form.empupdSalcname"></icon>
                </div>
                <!-- 未通过原因 -->
                <!-- <div class="item_box">
					<x-input title="未通过原因" v-model="form.empupdReason " v-verify="form.empupdReason" :show-clear="false" placeholder="请填写">
					</x-input>
				</div> -->
                <!-- 备注 -->
                <x-textarea :max="300"
                            title="备注"
                            :height="95"
                            v-model="form.note"
							:readonly="disabled"
                            placeholder="请填写"
                            :show-counter="true"></x-textarea>

            </group>
            <div class="save_button" v-if="state==='01draft'||state==='02draft'">
                <x-button type="primary"
                          class="x_button"
                          @click.native="comfirmSave"
                          action-type="button">保存</x-button>
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
            curDom: "",
            curDomShow: "",
			state:"",
            form: {
                empId: "", 						//员工姓名
                empnhIdno: "", 					//证件号码
                deptId: "", 					//部门名称
                postId: "", 					//岗位名称
                empupdResaddr: "", 				//居住详细地址
                empupdSalbank: "", 				//开户银行
                empupdSalcount: "",				//银行账号
                empupdSalcname: "",				//户名
                empupdReason: "",				//未通过原因
                note: "",						//备注
            },
            empnhName: "请选择",
            unitFname: "",
            postFname: "",
            empnhSalbankDis: "请选择",
            empShow: false,
            bankShow: false,
            currentEmpId: '',
            currentBankId: '',
			disabled:false
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
        comfirmSave () {
            this.$dialog.confirm({
                title: '',
                message: '是否确认保存？'
            }).then(() => {
                this.save();
            }).catch(() => {
                // on cancel
            });
        },
        save () {
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
                    text = '修改成功'
                } else {
                    text = '新增成功'
                }
                for (const dat in data) {
                    if (data[dat] === "") {
                        delete data[dat];
                    }
                }
                getDataLevelUserLoginEmpId(data).then(res => {
                    if (isSuccess(res, t)) {
                        let data = JSON.parse(res.data.content[0].value);
                        console.log(data, "t.content ");
                        this.$router.push({
                            name: 'employInfoChange'
                        })
                        t.$notify({
                            message: text,
                            duration: 1500,
                            background: '#1989fa'
                        });
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
        popupClick (domShow) {
            this[domShow] = true;
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
                    t.empnhName = data.empnhName;
                    t.unitFname = data.unitFname;
                    t.postFname = data.postFname;
					t.state = data.state;
					if(t.state!=='01draft'&&t.state!=='02draft'){
						t.disabled =true;
					}
					console.log(t.state,"state")
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
            this.currentId = res.id;
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

        .save_button {
            padding: 46px 70px;

            .x_button {
                color: #fff;
                font-size: 34px;
            }
        }
    }
    .van-popup--right {
        top: 50% !important;
    }

    .right_popup {
        width: 80% !important;
        height: 100% !important;
    }
}
</style>
