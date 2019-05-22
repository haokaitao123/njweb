<template>
    <div class="workExp">
        <div class="workExpWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 工作开始时间 -->
                <div class="item_box">
                    <cell title=""
                          is-link
						  v-if="!disabled"
                          value-align="left"
                          v-model="form.reweSdate"
                          v-verify="form.reweSdate"
                          @click.native="popupClick('reweSdateShow','reweSdate')">
                        <div slot="title">工作开始时间<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.reweSdate=='请选择'"
                          v-remind="form.reweSdate"></icon>
				    <x-input title="工作开始时间<span>*</span>"
						v-if="disabled"
						v-model="form.reweSdate"
						:disabled="disabled"
						:show-clear="false"
						placeholder="未填写">
					</x-input>
                </div>
                <!-- 工作结束时间 -->
                <div class="item_box">
                    <cell title=""
                          is-link
						  v-if="!disabled"
                          value-align="left"
                          v-model="form.reweEdate"
                          v-verify="form.reweEdate"
                          @click.native="popupClick('reweEdateShow','reweEdate')">
                        <div slot="title">工作结束时间<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.reweEdate=='请选择'"
                          v-remind="form.reweEdate"></icon>
					<x-input title="工作结束时间<span>*</span>"
						v-if="disabled"
						v-model="form.reweSdate"
						:disabled="disabled"
						:show-clear="false"
						placeholder="未填写">
					</x-input>
                </div>
                <!-- 单位名称 -->
                <div class="item_box">
                    <x-input title="单位名称<span>*</span>"
                             v-model="form.reweCompnm"
                             v-verify="form.reweCompnm"
							 :disabled="disabled"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.reweCompnm==''"
                          v-remind="form.reweCompnm"></icon>
                </div>
                <!-- 职务 -->
                <div class="item_box">
                    <x-input title="职务"
                             v-model="form.rewePost"
							 :disabled="disabled"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                </div>
                <!-- 证明人 -->
                <div class="item_box">
                    <x-input title="证明人"
                             v-model="form.reweCertifier"
							 :disabled="disabled"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                </div>
                <!-- 联系方式 -->
                <div class="item_box">
                    <x-input title="联系方式"
                             v-model="form.reweCertnub"
                             v-verify="form.reweCertnub"
							 :disabled="disabled"
                             :show-clear="false"
                             placeholder="请填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-remind="form.reweCertnub"></icon>
                </div>
                <!-- 离职原因 -->
                <div class="item_box">
                    <x-textarea :max="500"
                                title="离职原因<span>*</span>"
                                :height="95"
                                v-model="form.reweLevres"
								:readonly="disabled"
                                v-verify="form.reweLevres"
                                placeholder="请填写"
                                :show-counter="false"></x-textarea>
                    <icon type="warn"
                          class="error"
                          v-show="form.reweLevres==''"
                          v-remind="form.reweLevres"></icon>
                </div>

                <!-- 备注 -->
                <x-textarea :max="300"
                            title="备注"
                            :height="95"
                            v-model="form.note"
							:readonly="disabled"
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
				<x-button type="default" class="x_button button_left" action-type="button" @click.native="back">返回</x-button>
				<x-button type="primary" class="x_button" @click.native="save" v-if="!disabled">保存</x-button>
			</div>
        </div>
        <!-- 工作开始时间 -->
        <van-popup v-model="reweSdateShow"
                   position="bottom">
            <van-datetime-picker v-model="reweSdateDate"
                                 type="date"
                                 :min-date="minReweSdate"
                                 :max-date="maxReweSdate"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 工作结束时间 -->
        <van-popup v-model="reweEdateShow"
                   position="bottom">
            <van-datetime-picker v-model="reweEdateDate"
                                 type="date"
                                 :min-date="minReweEdate"
                                 :max-date="maxReweEdate"
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
            reweSdateDate: new Date(),
            minReweSdate: new Date(1900, 10, 1),
            maxReweSdate: new Date(2099, 12, 31),
            reweEdateDate: new Date(),
            minReweEdate: new Date(1900, 10, 1),
            maxReweEdate: new Date(2099, 12, 31),
            form: {
                reweSdate: "请选择",              //工作开始时间
                reweEdate: "请选择",              //工作结束时间
                reweCompnm: "",                  //单位名称
                rewePost: "",                    //职务
                reweCertifier: "",               //证明人
                reweCertnub: "",                 //联系方式
                reweLevres: '',                   //离职原因
                note: "",                        //备注
            },
            reweSdateShow: false,
            reweEdateShow: false,
            rewePid: this.$route.query.id,
        }
    },
    verify: {
        form: {
            reweSdate: "required",
            reweEdate: "required",
            reweCompnm: "required",
            reweLevres: "required",
            reweCertnub: "mobile",
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
        this.getData();
    },
    methods: {
        //保存
        save () {
            console.log(this.$verify.check());
            const t = this;
            if (this.$verify.check()) {
                const data = deepCopy(t.form);
                data._mt = "wxRecruitWorkexp.addOrUpdNoLogin";
                data.companyId = pubsource.companyId;
                let id = this.id;
                if (id !== '') {
                    data.id = id
                } else {
                    data.rewePid = t.rewePid;
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
                        // this.$router.push({ name: 'resumeInfo', query: { id: t.rewePid } })
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
        //根据id获取数据
        getData () {
            const t = this;
            if (t.id === '') {
                return;
            }
            const data = {
                _mt: 'wxRecruitWorkexp.getByIdNoLogin',
                companyId: pubsource.companyId,
                id: t.id,
            }
            getDataLevelNone(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    t.form.reweSdate = data.reweSdate ? data.reweSdate : '请选择';
                    t.form.reweEdate = data.reweEdate ? data.reweEdate : '请选择';
                    t.form.reweCompnm = !data.reweCompnm ? '' : data.reweCompnm;
                    t.form.rewePost = !data.rewePost ? '' : data.rewePost;
                    t.form.reweCertifier = !data.reweCertifier ? '' : data.reweCertifier;
                    t.form.reweCertnub = !data.reweCertnub ? '' : data.reweCertnub;
                    t.form.reweLevres = data.reweLevres;
                    t.form.note = data.note;
                    t.reweSdateDate = !data.reweSdate ? new Date() : new Date(data.reweSdate);
                    t.reweEdateDate = !data.reweEdate ? new Date() : new Date(data.reweEdate);
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
        //底部弹窗
        popupClick (domShow, dom) {
            this.curDom = dom;
            this.curDomShow = domShow;
            this[domShow] = true;
        },
        confirm (value) {
            if (this.curDom == 'reweSdate') {
                this.minReweEdate = new Date(value);
            } else if (this.curDom == 'reweEdateDate') {
                this.maxReweSdate = new Date(value)
            }
            value = new Date(value).format('yyyy-MM-dd');
            this.form[this.curDom] = value
            this[this.curDomShow] = false;
        },
        cancel (value) {
            this[this.curDomShow] = false;
        },
		//取消
		back(){
			this.$emit('cancel');
			document.getElementsByClassName('workExpWrap')[0].scrollTop = '0';
		}
    },
}
</script>
<style lang="less">
.workExp {
    height: 100%;
    background: #f6f6f6;
    .workExpWrap {
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
		height: 100%;
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
        
        	.weui-btn+.weui-btn {
        		margin-top: 0;
        	}
        }
    }
}
</style>
