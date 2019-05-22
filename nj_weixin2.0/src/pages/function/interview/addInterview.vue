<template>
    <div class="addInterview">
        <div class="addInterviewWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 姓名 -->
                <div class="item_box">
                    <x-input title="姓名<span>*</span>"
                             v-model="form.relibName"
                             v-verify="form.relibName"
                             :show-clear="false"
							 :disabled="curStep"
                             placeholder="请填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibName==''?true:false"
                          v-remind="form.relibName"></icon>
                </div>
                <!-- 性别 -->
                <div class="item_box">
                    <cell title="性别"
						  v-if='!curStep'
                          is-link
                          value-align="left"
                          v-model="relibGenderDis"
                          v-verify="form.relibGender"
                          @click.native="popupClick('relibGenderShow','relibGender')">
                        <div slot="title">性别<span>*</span></div>
                    </cell>

                    <icon type="warn"
                          class="error"
                          v-show="relibGenderDis=='请选择'"
                          v-remind="form.relibGender"></icon>
					<x-input title="性别<span>*</span>"
							 v-if='curStep'
					         v-model="relibGenderDis"
					         :show-clear="false"
							 :disabled="curStep"
					         placeholder="未填写">
					</x-input>
                </div>
                <!-- 手机号码 -->
                <div class="item_box">
                    <x-input title="手机号码<span>*</span>"
                             v-model.trim="form.relibMobile"
							 :disabled="curStep"
                             v-verify="form.relibMobile"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibMobile==''"
                          v-remind="form.relibMobile"></icon>
                </div>
                <!-- 面到时间 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          value-align="left"
                          v-model="form.relibFilldate"
						  v-if='!curStep'
                          v-verify="form.relibFilldate"
                          @click.native="popupClick('relibFilldateShow','relibFilldate')">
                        <div slot="title">面到时间<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibFilldate=='请选择'?true:false"
                          v-remind="form.relibFilldate"></icon>
					<x-input title="面到时间<span>*</span>"
							 v-if='curStep'
					         v-model="form.relibFilldate"
					         :show-clear="false"
							 :disabled="curStep"
					         placeholder="未填写">
					</x-input>
                </div>
				 <!-- 初试意见 -->
				<x-textarea :max="300"
				            title="初试意见"
				            :height="95"
				            v-model="relibFirstopin"
							:readonly='curStep'
				            placeholder="未填写"
				            :show-counter="true"
							v-if="curStepDis==='初试'&&curStepstate==='p_flowst_3'"></x-textarea>
				<!-- 复试意见 -->
				<x-textarea :max="300"
							title="复试意见"
							:height="95"
							v-model="relibCheckopin"
							:readonly='curStep'
							placeholder="未填写"
							:show-counter="true"
							v-if="curStepDis!=='复试'&&curStepDis!=='初试'"></x-textarea>
                <!-- 备注 -->
                <x-textarea :max="300"
                            title="备注"
                            :height="95"
                            v-model="form.note"
							:readonly='curStep'
                            :placeholder="curStep?'未填写':'请填写'"
                            :show-counter="true"></x-textarea>

            </group>
            <div class="save_button" > 
                <x-button type="primary"
                          class="x_button"
                          @click.native="save"
                          :disabled="curStep"
                          action-type="button">保存</x-button>
            </div>

        </div>
        <!-- 性别 -->
        <van-popup v-model="relibGenderShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibGenderIndex"
                        :columns=selectGender
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <van-popup v-model="relibFilldateShow"
                   position="bottom">
            <van-datetime-picker v-model="relibFilldateDate"
                                 type="datetime"
                                 :min-date="minRelibFilldate"
                                 :max-date="maxRelibFilldate"
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
			curStepDis:this.$route.query.curStepDis?this.$route.query.curStepDis:'',
			curStepstate:this.$route.query.curStepstate?this.$route.query.curStepstate:'',
            curDom: "",
            curDomShow: "",
            relibFilldateDate: new Date(),
            minRelibFilldate: new Date(),
            maxRelibFilldate: new Date(2099, 12, 31),
            form: {
                relibName: "",              // 姓名
                relibGender: "",            // 性别
                relibMobile: "",            // 手机号码
                relibFilldate: "请选择",     // 面到时间
                note: ""                    // 备注
            },
            relibGenderDis: '请选择',
            selectGender: [],
            relibGenderIndex: 0,
            relibGenderShow: false,
            relibFilldateShow: false,
            curStep: this.$route.query.curStep?true:false,
			saveState:false,
			relibFirstopin:"",
			relibCheckopin:"",
			idRecord:""
        }
    },
    verify: {
        form: {
            relibName: "required",
            relibGender: "required",
            relibMobile: ["required", "mobile"],
            relibFilldate: "required",
        }
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
		this.getSelect()
    },
    methods: {
        //保存
        async save () {
            const t = this;
            if (t.$verify.check()) {
                const data = deepCopy(t.form);
                data._mt = "wxRecruitProcess.addRecruit";
                data.companyId = pubsource.companyId;
                data.userId = window.localStorage.getItem('uid');
                let listId = t.$route.query.id;
                if (listId !== undefined) {
                    data.pkValue = listId
					t.saveState = true;
                } else {
					if(!t.saveState){
						await t.haveRecruit();
					}
					data.idRecord = t.idRecord;
                    data.pkValue = 0
                }
                for (const dat in data) {
                    if (data[dat] === "") {
                        delete data[dat];
                    }
                }
				console.log(t.saveState,"t.saveState")
				if(t.saveState){
					console.log("1212312312")
					getDataLevelUserLoginNew(data).then(res => {
					    if (isSuccess(res, t)) {
					        console.log(res, "res");
					        t.$notify({
					            message: '保存成功',
					            duration: 1500,
					            background: '#1989fa'
					        });
					        this.$router.push({
					            name: 'interview'
					        })
					    }
					}).catch(() => {
					    t.$notify({
					        message: '网络错误',
					        duration: 1500,
					        background: '#f44'
					    });
					}).finally(() => {
						t.saveState = false;
					    t.$store.commit('hideLoading');
					});
				}
            }
        },
		//是否面试过
		async haveRecruit(){
			const t = this;
			const data = deepCopy(t.form);
			data._mt = "wxRecruitProcess.getPersonInfo";
			data.companyId = pubsource.companyId;
			data.userId = window.localStorage.getItem('uid');
			await getDataLevelUserLoginNew(data).then(res => {
				if (isSuccess(res, t)) {
					let data = JSON.parse(res.data.content[0].value);
					console.log(data,"data");
					if(JSON.stringify(data) !== "{}"){
						let num = data.times;
						let reason = data.relibCheckopin?data.relibCheckopin:'无';
						t.idRecord = data.id;
						t.$dialog.alert({
							message:    `<div style="line-height:1.2;text-align:left">
												<p style="margin-bottom:10px"><b >面试次数：</b>${num}次</span>
												<p style="line-height:1.5"><b >未通过原因：</b>${reason}</p>
										</div>`
						}).then(() => {			
							t.saveState = true;
						});
					}else{
						t.saveState = true;
					}
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
        //底部弹出
        popupClick (domShow, dom) {
            this.curDom = dom;
            this.curDomShow = domShow;
            this[domShow] = true;
        },
        //底部弹出确定事件
        confirm (value) {
            if (this.curDomShow.indexOf("dateShow") != -1) {
                value = new Date(value).format('yyyy-MM-dd hh:mm:ss');
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
        //底部弹出取消事件
        cancel (value) {
            this[this.curDomShow] = false;
        },
        //获取详情数据
        getData () {
            const t = this;
            if (t.$route.query.id === undefined) {
                return;
            }
            const data = {
                _mt: 'wxRecruitProcess.getById',
                companyId: pubsource.companyId,
                id: t.$route.query.id,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    console.log(data, "data");
                    // if (data.curStepDis === '初试' && data.curStepstate !== 'p_flowst_3') {
                    //     t.curStep = false;
                    // } else {
                    //     t.curStep = true;
                    // }
					// t.curStepDis = data.curStepDis;
					// t.curStepstate = data.curStepstate;
					t.relibFirstopin = data.relibFirstopin?data.relibFirstopin:'';
					t.relibCheckopin = data.relibCheckopin?data.relibCheckopin:'';
                    t.form.relibName = data.relibName;
                    t.form.relibGender = data.relibGender;
                    t.form.relibMobile = data.relibMobile;
                    t.form.relibFilldate = data.relibFilldate;
                    t.form.note = data.note;
                    t.relibGenderDis = data.relibGenderDis;
                    t.relibFilldateDate = new Date(data.relibFilldate);
                    t.minRelibFilldate = new Date(new Date(data.relibFilldate));
                    t.setSelectValue(data.relibGenderDis, 'selectGender', 'relibGenderIndex');

                }
            }).catch((err) => {
                t.$notify({
                    message: '网络错误',
                    duration: 1500,
                    background: '#f44'
                });
            }).finally(() => {
                t.$store.commit('hideLoading');
            });;
        },
        //查询下拉列表
        getSelect () {
            const t = this;
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: 'gender'
            }).then(res => {
                if (isSuccess(res, t)) {
                    t.selectData(res.data.content[0].value[0].paramList, "selectGender");
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
                if (k.text === value) {
                    this[index] = k.index;
                    return k.index;
                }
            }
        },
    },
}
</script>
<style lang="less">
.addInterview {
    height: 100%;
    background: #f6f6f6;
    .addInterviewWrap {
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
