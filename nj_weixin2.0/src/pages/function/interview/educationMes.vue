<template>
    <div class="educationMes">
        <div class="educationMesWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!--教育程度-->
                <div class="item_box">
                    <cell title=""
                          is-link
                          value-align="left"
                          v-model="reeduLevelDis"
                          v-verify="form.reeduLevel"
                          @click.native="popupClick('reeduLevelShow','reeduLevel')">
                        <div slot="title">教育程度<span>*</span></div>
                    </cell>

                    <icon type="warn"
                          class="error"
                          v-show="reeduLevelDis==''"
                          v-remind="form.reeduLevel"></icon>
                </div>
                <!-- 学位 -->
                <div class="item_box">
                    <x-input title="学位"
                             v-model="form.reeduDegree"
                             v-verify="form.reeduDegree"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                </div>
                <!-- 教育开始时间 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          value-align="left"
                          v-model="form.reeduSdate"
                          v-verify="form.reeduSdate"
                          @click.native="popupClick('reeduSdateShow','reeduSdate')">
                        <div slot="title">教育开始时间<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-remind="form.reeduSdate"></icon>
                </div>
                <!-- 教育结束时间 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          value-align="left"
                          v-model="form.reeduEdate"
                          v-verify="form.reeduEdate"
                          @click.native="popupClick('reeduEdateShow','reeduEdate')">
                        <div slot="title">教育结束时间<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-remind="form.reeduEdate"></icon>
                </div>
                <!-- 学校名称 -->
                <div class="item_box">
                    <x-input title="学校名称<span>*</span>"
                             v-model="form.reeduSchool"
                             v-verify="form.reeduSchool"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
					<icon type="warn"
					      class="error"
					      v-remind="form.reeduSchool"></icon>
                </div>
                <!-- 专业 -->
                <div class="item_box">
                    <x-input title="专业"
                             v-model="form.reeduProfession"
                             v-verify="form.reeduProfession"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                </div>
                <x-textarea :max="300"
                            title="所获奖励证书"
                            :height="95"
                            v-model="form.reeduAwardcert"
                            placeholder="请填写"
                            :show-counter="false"></x-textarea>
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
        <!-- 教育程度 -->
        <van-popup v-model="reeduLevelShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="reeduLevelIndex"
                        :columns=selectReeduLevel
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 教育开始时间 -->
        <van-popup v-model="reeduSdateShow"
                   position="bottom">
            <van-datetime-picker v-model="reeduSdateDate"
                                 type="date"
                                 :min-date="minReeduSdate"
                                 :max-date="maxReeduSdate"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 教育结束时间 -->
        <van-popup v-model="reeduEdateShow"
                   position="bottom">
            <van-datetime-picker v-model="reeduEdateDate"
                                 type="date"
                                 :min-date="minReeduEdate"
                                 :max-date="maxReeduEdate"
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
            reeduSdateDate: new Date(),
            minReeduSdate: new Date(1900, 10, 1),
            maxReeduSdate: new Date(2099, 12, 31),
            reeduEdateDate: new Date(),
            minReeduEdate: new Date(1900, 10, 1),
            maxReeduEdate: new Date(2099, 12, 31),
            form: {
                reeduLevel: "",                         //教育程度
                reeduDegree: "",                        //学位
                reeduSdate: "请选择",                    //教育开始时间
                reeduEdate: "请选择",                    //教育结束时间
                reeduSchool: "",                        //学校名称
                reeduProfession: "",                    //专业
                reeduAwardcert: "",                     //所获奖励证书
                note: "",                               //备注
            },
            reeduLevelDis: "请选择",
            reeduLevelShow: false,
            reeduSdateShow: false,
            reeduEdateShow: false,
            reeduLevelIndex: 0,
            selectReeduLevel: [],
            reeduPid: this.$route.query.id,
        }
    },
    verify: {
        form: {
            reeduLevel: "required",
            reeduSdate: "required",
            reeduEdate: "required",
            reeduSchool: "required",
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
        XTextarea
    },
    mounted () {
        this.getSelect();
        this.getData();
    },
    methods: {
        //保存
        save () {
            console.log(this.$verify.check());
            const t = this;
            if (this.$verify.check()) {
                const data = deepCopy(t.form);
                data._mt = "wxRecruitEduca.addOrUpdNoLogin";
                data.companyId = pubsource.companyId;
                let id = this.id;
				console.log(this.id,'this.id');
				console.log(t.reeduPid,'t.reeduPid');
                if (id !== '') {
                    data.id = id
                } else {
                    data.reeduPid = t.reeduPid;
                }
                for (const dat in data) {
                    if (data[dat] === "") {
                        delete data[dat];
                    }
                }
                console.log(data, "data")
                getDataLevelNoneNew(data).then(res => {
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
        popupClick (domShow, dom) {
            this.curDom = dom;
            this.curDomShow = domShow;
            this[domShow] = true;
        },
        confirm (value) {
            if (this.curDomShow.indexOf("dateShow") != -1) {
                if (this.curDom == 'reeduSdate') {
                    this.minReeduEdate = new Date(value);
                } else if (this.curDom == 'reeduEdate') {
                    this.maxReeduSdate = new Date(value)
                }
                value = new Date(value).format('yyyy-MM-dd');
                this.currentDate = new Date();
                this.form[this.curDom] = value
            } else {
                this.form[this.curDom] = value.key;
                let str = this.curDom
                str += "Dis";
                this[str] = value.text;
            }
            this[this.curDomShow] = false;
        },
        cancel (value) {
            this[this.curDomShow] = false;
        },
        getData () {
            const t = this;
            if (t.id === '') {
                return;
            }
            const data = {
                _mt: 'wxRecruitEduca.getByIdNoLogin',
                companyId: pubsource.companyId,
                id: t.id,
            }
            getDataLevelNone(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    t.form.reeduLevel = data.reeduLevel;
                    t.form.reeduDegree = !data.reeduDegree ? '' : data.reeduDegree;
                    t.form.reeduSdate = data.reeduSdate ? data.reeduSdate : '请选择';
                    t.form.reeduEdate = data.reeduEdate ? data.reeduEdate : '请选择';
                    t.form.reeduSchool = !data.reeduSchool ? '' : data.reeduSchool;
                    t.form.reeduProfession = !data.reeduProfession ? '' : data.reeduProfession;
                    t.form.reeduAwardcert = data.reeduAwardcert;
                    t.form.note = data.note;
                    t.reeduLevelDis = data.reeduLevelDis;
                    t.reeduSdateDate = !data.reeduSdate ? new Date() : new Date(data.reeduSdate);
                    t.reeduEdateDate = !data.reeduEdate ? new Date() : new Date(data.reeduEdate);
                    t.setSelectValue(data.reeduLevel, 'selectReeduLevel', 'reeduLevelIndex');
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
                typeCode: 'education'
            }).then(res => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    t.selectData(data[0].paramList, "selectReeduLevel");
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
		back(){
			this.$emit('cancel');
			document.getElementsByClassName('educationMesWrap')[0].scrollTop = '0';
		}
    },
}
</script>
<style lang="less">
.educationMes {
    height: 100%;
    background: #f6f6f6;
    .educationMesWrap {
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
		height: 100%;
        // .save_button {
        //     padding: 46px 70px;
        //     .x_button {
        //         color: #fff;
        //         font-size: 34px;
        //     }
        // }
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
