<template>
    <div class="interviewOpinion">
        <div class="interviewOpinionWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 初试人员 -->
                <div class="item_box">
                    <x-input title="初试人员<span>*</span>"
                             v-model="relibFirstusDis"
                             v-verify="form.relibFirstus"
                             :disabled="true"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="relibFirstusDis==''"
                          v-remind="form.relibFirstus"></icon>
                </div>
                <!-- 初试时间 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          value-align="left"
                          v-model="form.relibFirsttm"
                          v-verify="form.relibFirsttm"
                          @click.native="popupClick('relibFirsttmShow','relibFirsttm')">
                        <div slot="title">初试时间<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibFirsttm=='请选择'"
                          v-remind="form.relibFirsttm"></icon>
                </div>
                <!-- 初试是否通过 -->
                <div class="item_box">
                    <cell title="初试是否通过"
                          is-link
						  :disabled="disabled"
                          value-align="left"
                          v-model="relibFirpassDis"
                          v-verify="form.relibFirpass"
                          @click.native="disabled?'':popupClick('relibFirpassShow','relibFirpass')">
                        <div slot="title">初试是否通过<span>*</span></div>
                    </cell>

                    <icon type="warn"
                          class="error"
                          v-show="relibFirpassDis=='请选择'"
                          v-remind="form.relibFirpass"></icon>
                </div>
                <!-- 初试意见 -->
                <x-textarea :max="300"
                            title="初试意见"
                            :height="95"
                            v-model="form.relibFirstopin"
                            placeholder="请填写"
                            :show-counter="true"></x-textarea>

            </group>
            <div class="save_button">
                <x-button type="primary"
                          class="x_button"
                          @click.native="comfirmSubmit"
                          action-type="button">提交</x-button>
            </div>

        </div>
        <!-- 初试是否通过 -->
        <van-popup v-model="relibFirpassShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibFirpassIndex"
                        :columns=selectRelibFirpass
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <van-popup v-model="relibFirsttmShow"
                   position="bottom">
            <van-datetime-picker v-model="relibFirsttmDate"
                                 type="datetime"
                                 :min-date="minRelibFirsttm"
                                 :max-date="maxRelibFirsttm"
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
            relibFirsttmDate: new Date(),
            minRelibFirsttm: new Date(1900, 1, 1),
            maxRelibFirsttm: new Date(2099, 12, 31),
            form: {
                relibFirstus: window.localStorage.getItem('empId'),   // 初试人员
                relibFirsttm: new Date().format('yyyy-MM-dd hh:mm:ss'),      // 初试时间
                relibFirpass: "",              // 初试是否通过
                relibFirstopin: "",            // 初试意见
            },
            relibFirstusDis: JSON.parse(window.localStorage.getItem('empData')).empnhName,
            relibFirpassDis: '请选择',
            selectRelibFirpass: [],
            relibFirpassIndex: 0,
            relibFirpassShow: false,
            relibFirsttmShow: false,
            saveStatus: true,
			isRelibFirpass:false,
			disabled:false,
        }
    },
    verify: {
        form: {
            relibFirstus: "required",
            relibFirsttm: "required",
            relibFirpass: "required",
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
    created () {
        this.getCondition();
    },
    mounted () {
        this.getSelect();
    },
    methods: {
        //提交
        async submit () {
            await this.save();
			console.log(this.saveStatus,'this.saveStatus')
            const t = this;
            if (this.saveStatus) {
                const data = {
                    _mt: 'wxRecruitProcess.submitRecruit',
                    companyId: pubsource.companyId,
                    userId: localStorage.getItem('uid'),
                    pkValue: t.$route.query.id
                }
                getDataLevelUserLogin(data).then((res) => {
                    if (isSuccess(res, t)) {
						t.$notify({
							message: '提交成功',
							duration: 1500,
							background: '#1989fa'
						});
                        this.$router.push({ name: 'interview' })
                    }
                }).catch((err) => {
                    t.$notify({
						message: '网络错误',
						duration: 1500,
						background: '#f44'
					});
                }).finally(() => {
					this.saveStatus = false;
                    t.$store.commit('hideLoading');
                });
            } 
        },
		comfirmSubmit(){
			this.$dialog.confirm({
			  title: '',
			  message: '是否确认提交？'
			}).then(() => {
				this.submit();
			}).catch(() => {
			  // on cancel
			});
		},
        //保存
        async save () {
            const t = this;
            if (this.$verify.check()) {
                const data = deepCopy(t.form);
                data._mt = "wxRecruitProcess.addRecruit";
                data.companyId = pubsource.companyId;
                data.userId = localStorage.getItem('uid');
                data.pkValue = this.$route.query.id;
                for (const dat in data) {
                    if (data[dat] === "") {
                        delete data[dat];
                    }
                }
                await getDataLevelUserLoginNew(data).then(res => {
                    if (isSuccess(res, t)) {
                        console.log(res, "res");
                        t.saveStatus = true;
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
                t.saveStatus = false
                t.$vux.toast.text('请检查填写信息');
            }
        },
        //判断硬性条件是否符合
        getCondition () {
            const t = this;
            const data = {
                _mt: 'wxRecruitProcess.getById',
                companyId: pubsource.companyId,
                id: this.$route.query.id,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    console.log(data, "data");
                    if (!data.relibGenderDis) {
                        t.form.relibFirstopin += "性别信息为空、"
						t.isRelibFirpass = true;
                    } else if (!data.relibHeight) {
                        t.form.relibFirstopin += "身高不详、"
						t.isRelibFirpass = true;
                    } else {
                        if (data.relibGenderDis === '男') {
                            if (Number(data.relibHeight) < 165) {
                                t.form.relibFirstopin += "身高不符合、"
								t.isRelibFirpass = true;
                            }
                        } else if (data.relibGenderDis === '女') {
                            if (Number(data.relibHeight) < 155) {
                                t.form.relibFirstopin += "身高不符合、"
								t.isRelibFirpass = true;
                            }
                        }
                    }
                    if (!data.relibIdno) {
                        t.form.relibFirstopin += "年龄不详、"
						t.isRelibFirpass = true;
                    } else {
                        let birthYear = Number(data.relibIdno.substring(6, 10));
                        let nowYear = new Date().getFullYear();
                        if (nowYear - birthYear > 25 || nowYear - birthYear < 19) {
                            t.form.relibFirstopin += "年龄不符、"
							t.isRelibFirpass = true;
                        }
                    }
					console.log(t.isRelibFirpass,'是否通过')
					if(t.isRelibFirpass){
						t.relibFirpassDis = '否';
						t.disabled = true;
						t.setSelectValue('否', 'selectRelibFirpass', 'relibFirpassIndex');
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
            if (this.curDomShow.indexOf("tmShow") != -1) {
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
        //查询下拉列表
        getSelect () {
            const t = this;
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: 'yesno'
            }).then(res => {
                if (isSuccess(res, t)) {
                    t.selectData(res.data.content[0].value[0].paramList, "selectRelibFirpass");
                }
            }).catch(() => {
                 t.$notify({
                	message: '网络错误',
                	duration: 1500,
                	background: '#f44'
                });
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
.interviewOpinion {
    height: 100%;
    background: #f6f6f6;
    .interviewOpinionWrap {
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
