<template>
    <div class="empEducation">
        <div class="empEducationWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 家庭成员关系 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          value-align="left"
                          v-model="fmRelationDis"
                          v-verify="form.fmRelation"
                          @click.native="popupClick('fmRelationShow','fmRelation')">
                        <div slot="title">家庭成员关系<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="fmRelationDis=='请选择'?true:false"
                          v-remind="form.fmRelation"></icon>
                </div>
                <!--  是否紧急联系人 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          value-align="left"
                          v-model="fmIsurgentDis"
                          v-verify="form.fmIsurgent"
                          @click.native="popupClick('fmIsurgentShow','fmIsurgent')">
                        <div slot="title">是否紧急联系人<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="fmIsurgentDis=='请选择'?true:false"
                          v-remind="form.fmIsurgent"></icon>
                </div>
                <!-- 姓名 -->
                <div class="item_box">
                    <x-input title="姓名<span>*</span>"
                             v-model="form.fmCname"
                             v-verify="form.fmCname"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.fmCname==''?true:false"
                          v-remind="form.fmCname"></icon>
                </div>
                <!-- 工作单位 -->
                <div class="item_box">
                    <x-input title="工作单位<span>*</span>"
                             v-model="form.fmCompany"
                             v-verify="form.fmCompany"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.fmCompany==''?true:false"
                          v-remind="form.fmCompany"></icon>
                </div>
                <!-- 职务 -->
                <div class="item_box">
                    <x-input title="职务"
                             v-model="form.fmPost"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                </div>
                <!-- 联系方式 -->
                <div class="item_box">
                    <x-input title="联系方式<span>*</span>"
                             v-model="form.fmPhone"
                             v-verify="form.fmPhone"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.fmPhone==''?true:false"
                          v-remind="form.fmPhone"></icon>
                </div>
                <!-- 备注 -->
                <x-textarea :max="300"
                            title="备注"
                            :height="95"
                            v-model="form.note"
                            placeholder="请填写"
                            :show-counter="true"></x-textarea>

            </group>
           <!-- <div class="save_button">
                <x-button type="primary"
                          class="x_button"
                          @click.native="save"
                          action-type="button">保存</x-button>
            </div> -->
			<div class="save_button">
				<x-button type="default" class="x_button button_left" action-type="button" @click.native="back">取消</x-button>
				<x-button type="primary" class="x_button" @click.native="save">保存</x-button>
			</div>
        </div>
        <van-popup v-model="fmRelationShow"
                   position="bottom">
            <van-picker ref="fmRelationPicker"
                        :defaultIndex="fmRelationIndex"
                        :columns=selectFmRelation
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <van-popup v-model="fmIsurgentShow"
                   position="bottom">
            <van-picker ref="fmIsurgentPicker"
                        :defaultIndex="fmIsurgentIndex"
                        :columns=selectFmIsurgent
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
    </div>
</template>
<script>
import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
import { Group, Cell, XInput, XTextarea, Icon, Popup } from 'vux'
export default {
    data () {
        return {
            curDom: "",
            curDomShow: "",
            fmRelationIndex: 0,
            fmIsurgentIndex: 0,
            form: {
                fmRelation: "",             // 成员关系
                fmIsurgent: "",             // 是否紧急联系人
                fmCname: "",                // 姓名
                fmCompany: "",              // 工作单位
                fmPost: "",                 // 职务
                fmPhone: "",                // 联系方式
                note: "",                   // 备注
            },
            fmRelationDis: "请选择",
            fmIsurgentDis: "请选择",
            fmRelationShow: false,
            fmIsurgentShow: false,
            selectFmRelation: [],
            selectFmIsurgent: [],
        }
    },
    verify: {
        form: {
            fmRelation: "required",
            fmCname: "required",
            fmCompany: "required",
            fmPhone: "required",
            fmIsurgent: "required",
        }
    },
	props: {
		id: {
			type: String,
			default: ''
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
        this.getSelect();
    },
    methods: {
        //保存
        save () {
            const t = this;
            if (this.$verify.check()) {
                const data = deepCopy(t.form);
                data._mt = "wxEmpFamily.addOrUpd";
                data.companyId = pubsource.companyId;
                let listId = this.id;
                if (listId !== '') {
                    data.id = listId
                } else {
                    data.pkId = window.localStorage.getItem('empId');
                }
                for (const dat in data) {
                    if (data[dat] === "") {
                        delete data[dat];
                    }
                }
                getDataLevelUserLoginNew(data).then(res => {
                    if (isSuccess(res, t)) {
						t.$notify({
							message: '保存成功',
							duration: 1500,
							background: '#1989fa'
						});
                        // this.$router.push({
                        //     name: 'empInfo'
                        // })
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
            this.form[this.curDom] = value.key;
            let str = this.curDom
            str += "Dis";
            this[str] = value.text;
            this[this.curDomShow] = false;
        },
        //底部弹出取消事件
        cancel (value) {
            this[this.curDomShow] = false;
        },
        //查询下拉列表
        getSelect () {
            const t = this;
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: 'relationship,yesno'
            }).then(res => {
                if (isSuccess(res, t)) {
                    t.selectData(res.data.content[0].value[0].paramList, "selectFmRelation");
                    t.selectData(res.data.content[0].value[1].paramList, "selectFmIsurgent");
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
        getData () {
            const t = this;
			if (t.id === '') {
			    return;
			}
            const data = {
                _mt: 'wxEmpFamily.getById',
                companyId: pubsource.companyId,
                id: t.id,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    t.form.fmRelation = data.fmRelation;
                    t.form.fmIsurgent = data.fmIsurgent;
                    t.form.fmCname = data.fmCname !== undefined ? data.fmCname : '1127';
                    t.form.fmCompany = data.fmCompany !== undefined ? data.fmCompany : '';
                    t.form.fmPost = data.fmPost !== undefined ? data.fmPost : '';
                    t.form.fmPhone = data.fmPhone !== undefined ? data.fmPhone : '';
                    t.form.note = data.note;
                    t.fmRelationDis = data.fmRelationDis;
                    t.fmIsurgentDis = data.fmIsurgentDis;
                    t.setSelectValue(data.fmIsurgent, 'selectFmIsurgent', 'fmIsurgentIndex');
                    t.setSelectValue(data.fmRelation, 'selectFmRelation', 'fmRelationIndex');
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
		back(){
			this.$emit('cancel')
		}
    }
}
</script>
<style lang="less">
.empEducation {
    height: 100%;
    background: #f6f6f6;
    .empEducationWrap {
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
        
        	.weui-btn+.weui-btn {
        		margin-top: 0;
        	}
        }
    }
}
</style>
