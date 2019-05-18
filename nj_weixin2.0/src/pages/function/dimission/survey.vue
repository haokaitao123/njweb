<template>
    <div class="cover">
        <div class="box">
            <!-- <header type="text">
                <img src="../../../../static/function/close.png"
                     alt=""
                     @click="reset">
            </header> -->
            <div class="viewbg">
                <div class="viewbox">
                    <!--<Button type="primary" @click="openUp">新增</Button>-->
                    <div class="headTitle">Service Satisfaction Survey</div>
                    <div class="view">
                        <div id="editorCon"
                             class="txtarea"
                             v-show="false"></div>
                        <div v-html="dataTitle"
                             class="dataTitle"
                             style="width: 100%;"></div>
                        <!-- 1、逐个显示不分类  https://dwz.cn/vpYiQDlH-->
                        <div class="typeOne">
                            <h2>{{ques1.platSuvTitle}}</h2>
                            <div class="mar_bot20"
                                 v-for="(item, index) in ques1.listQuestion"
                                 :key="index">
                                <p class="tit">{{item.platQusDisorder}}{{item.platQusDescen}}</p>
                                <div v-if="item.listQuesasw.length>0&&item.platQusValid ==='1'">
                                   <div class="mar_bot20One"  v-for="item2 in item.listQuesasw">
																				<div class="input_type" v-if="item.platQusAstype==='suvastype_01'&&item2.platQasValid ==='1'">
																							<input type="radio"
																							       :name="item.id"
																							       :value="item2.platQasAswercn"
																							       @change="submit(item2.id,item.id,item.platQusAstype)" />
																							<span class="radioText">{{item2.platQasAswercn}}</span>
																				 </div>
																					<div class="input_type" v-if="item.platQusAstype==='suvastype_02'&&item2.platQasValid ==='1'">
																						<input type="checkbox"
																									 :name="item.id"
																									 :value="item2.platQasAswercn"
																									 @change="submit(item2.id,item.id,item.platQusAstype,$event)" />
																						<span class="radioText">{{item2.platQasAswercn}}</span>
																					</div>
																				
                                   </div>
																</div>
																<div  v-else-if="item.platQusValid ==='1'">
																		<div class="mar_bot20One">
																			<div class="input_type input_text" v-if="item.platQusAstype==='suvastype_03'">
																				<span class="radioText">{{item2.platQasAswercn}}：</span>
																				 <input type="text"  v-model="radioSelect[item.id]" />
																			 </div>
																			 <div class="input_type textarea_text input_text" v-if="item.platQusAstype==='suvastype_04'">
																				<textarea name=""
																									v-model="radioSelect[item.id]"
																									style="width: 100%;height: 100%;outline: none"
																									cols="55"
																									rows="5"></textarea>
																				</div>
																		</div>
																</div>
                            </div>
                        </div>
                        <h4 class="mar_bot20 tit">意见及建议</h4>
                        <p class="mar_bot20 tit mar_top20">您的意见及建议对我们极具价值，它将有利于提高我们的服务。如果您对 SIS 有其他的意见和建议，请填写在下面对话框内。非常感谢您的配合。</p>
                        <div style="width: 100%;height: 20%;">
                            <textarea name=""
                                      v-model="title"
                                      style="width: 100%;height: 100%;outline: none"
                                      cols="55"
                                      rows="5"></textarea>
                        </div>
                        <div class="submit_btn">
                            <button class="btn"
                                    v-show="BtnShow"
                                    @click="submitQuestion">提交</button>
                        </div>
                        <!--<Button type="primary" class="mar_bot20">【提交】</Button>-->
                    </div>
                </div>
            </div>
            <div class="Image"
                 v-show="MaskIng">
                <div class="ImageChird"
                     @click="ImageChird">
                    <div class="ImageGrand"><img src="../../../../static/main/survey_close.png"
                             alt=""></div>
                </div>
            </div>
            <div class="Image1"
                 v-show="MaskIng1">
                <div class="ImageChird1">
                    <!--<div class="ImageGrand1">-->
                    <!--您已提交成功！-->
                    <!--</div>-->
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelNone, getDataLevelNoneNew } from '@/axios/axios'
import { isSuccess, getUrlKey } from '@/lib/util'
export default {
    data () {
        return {
            ConRate: '1',       //  支持热线的接通率
            serAtt: '1',        //  服务态度
            quality: '1',       //  工程师服务质量
            option: '',         //  建议
            ques1: [],          //  逐个显示不分类
            ques2: [],          //  逐个显示分类
            ques3: [],          //  矩阵显示不分类
            ques4: [],          //  矩阵显示表格内分类
            ques5: [],          //  矩阵显示分类显示表格
            platStyle: 'p_suvstyle_01',
            dataTitle: '',
            MaskIng: false,
            BtnShow: true,
            MaskIng1: false,
            title: '',
            radioSelect: [],
            questionTotal: null,
            tempArrTotal: null,
            data: [],
            ques1Length: 0,
						result:[],
						input:[]
        }
    },
    mounted () {
        this.showType()
    },
    methods: {
        reset () {
            this.$emit('closeView')
        },
        showType () {
            const t = this
            // 显示题目
            t.getData()
        },
        openUp () {
            const t = this
            let data = {
                _mt: 'platRecord.getLink',
                logType: '查询',
                companyId: 1000
            }
            getDataLevelNone(data).then((res) => {
                if (isSuccess(res, t)) {
                    console.log(res)
                }
            }).catch(() => {
                t.$notify({
                    message: '网络错误',
                    duration: 1500,
                    background: '#f44'
                });
            })
        },
        getData () {
            let surId = getUrlKey('surId');
            let empNo = getUrlKey('empNo');
            const t = this
            let data = {
                _mt: 'platRecord.getById',
                qustid: '1304',
                logType: '查询',
                companyId: 1000,
                workno: localStorage.getItem('empId')
            }
            getDataLevelNone(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (JSON.stringify(res.data.content[0]) === '{}') {
                        this.getQue()
                    } else {
                        this.MaskIng1 = true
                        //              this.MaskIng = true
                        this.BtnShow = false
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
        getQue () {
            let surId = getUrlKey('surId');
            let empNo = getUrlKey('empNo');
            const t = this
            let data = {
                _mt: 'platSurvery.getSurveryViewNone',
                id: '1304',
                logType: '查询',
                platSuvStyle: 'p_suvstyle_01',
                companyId: 1000,
                empkiWorkno: localStorage.getItem('empId')
            }
            getDataLevelNone(data).then((res) => {
                if (isSuccess(res, t)) {
                    this.dataTitle = res.data.content[0].platSuvContent;

                    if (t.platStyle === 'p_suvstyle_01') {
                        t.ques1 = res.data.content[0];
                        t.ques1Length = res.data.content[0].listQuestion.length
                        console.log(t.ques1, "platSuvStyle")
                        //              this.MaskIng = true
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
        submit (e,id, name, type) {
					if(type==='suvastype_04'){
						 this.radioSelect[name] = id;
					}else if(type==='suvastype_02'){
						 let checked = e.target.checked;
						 if(checked){
								if(this.radioSelect[name]===undefined){
									this.radioSelect[name] = id;
								}else{
									this.radioSelect[name] = this.radioSelect[name]+','+id
								}
						 }else{
								let data = this.radioSelect[name].split(",")
								let len = data.length
								if(len>1){
									data.remove(id);
									this.radioSelect[name] = data.join(",")
								}else{
									this.radioSelect[name] =""
								}
						 }
						 console.log(this.radioSelect,"this.radioSelect")
					}else if(type==='suvastype_03'){
						this.radioSelect[name] = id;
					}else if(type==='suvastype_04'){
						this.radioSelect[name] = id;
					}
        },
        submitQuestion () {
					console.log(this.radioSelect,"this.radioSelect")
            this.data = []
            this.radioSelect.forEach((item, index) => {
                let obj = {}
                obj['name'] = String(index)
                obj['id'] = item

                this.data.push(obj)
            })
            console.log(this.data, "this.data")
            // debugger;

            if (this.data.length < this.ques1Length) {
                alert('請填寫')
            }
            console.log(this.radioSelect, "this.radioSelect")
            console.log(JSON.stringify(this.data))
            let data = {
                _mt: 'platRecord.addOrUpd',
                platRcdSuggestion: this.title,
                platRcdWorkno: localStorage.getItem('empId'),
                platRcdSuvid: '1304',
                platRcdQustid: JSON.stringify(this.data),
            }

            getDataLevelNone(data)
                .then(res => {
                    console.log(res)
                    if (isSuccess(res, this)) {
                        this.MaskIng = true;
                        this.BtnShow = false;
                        this.$emit('inputSurvey', '已填写');
                        this.radioSelect = [];
                    }
                }).catch(err => {
                    t.$notify({
                        message: '网络错误',
                        duration: 1500,
                        background: '#f44'
                    });
                }).finally(() => {
                    t.$store.commit('hideLoading');
                });
        },
        ImageChird () {
            this.MaskIng = false
        },
    },
}
</script>
<style lang="less" scoped>
.cover {
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    -webkit-overflow-scrolling: touch;
    outline: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .box {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #fff;

        border-radius: 10px;
        .form {
            max-height: 800px;
            overflow-y: auto;
        }
        .title {
            display: flex;
            position: absolute;
            height: 40px;
            width: 100%;
            line-height: 40px;
            justify-content: space-between;
            align-items: center;
            padding-left: 20px;
            top: 0;
            border-bottom: 1px solid #efefef;
            left: 0;
            .title-text {
                font-weight: bold;
                font-size: 14px;
            }
        }
    }
}
.btn {
    width: 100%;
    background: #3399ff;
    color: white;
    font-size: 40px;
    height: 90px;
    line-height: 90px;
    outline: none;
    border: 0;
    margin-top: 25px;
}
.dataTitle {
    font-size: 30px;
}
/*.box{width: 700px; height:600px;}*/
.closebtn {
    position: absolute;
    right: -40px;
    top: -10px;
}
.viewbg {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
}
.Image {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    .ImageChird {
        width: 450px;
        height: 500px;
        background: url("../../../../static/main/tjcg.png") no-repeat;
        top: 20%;
        left: 20%;
        z-index: 1000;
        position: absolute;
        .ImageGrand {
            position: absolute;
            right: 80px;
            top: 20px;
            width: 50px;
            height: 50px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
.Image1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("../../../../static/action/survey_bg.png") no-repeat;
    z-index: 2000;
    background: rgba(0, 0, 0, 0.7);
    .ImageChird1 {
        width: 400px;
        height: 500px;
        background: url("../../../../static/main/mask.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        top: 20%;
        left: 25%;
        z-index: 1000;
        position: absolute;
        .ImageGrand1 {
            position: absolute;
            left: 20%;
            bottom: 30px;
            color: black;
            font-size: 36px;
        }
    }
}
.viewbox {
    width: 100%;
    height: 100%;
    background: url("../../../../static/action/survey_bg.png") no-repeat;
    padding: 20px 30px 30px;
    position: relative;
    box-sizing: border-box;
		display: flex;
		flex-direction: column;
    .headTitle {
				padding: 30px 0;
				text-align: center;
        font-size: 40px;
        color: white;
    }
}

.view {
    background: rgba(255, 255, 255, 0.5);
    width: 100%;
    overflow-y: scroll;
    padding: 30px 30px;
    box-sizing: border-box;
		flex:1;
}
.typeOne {
    margin-top: 40px;
    .mar_bot20 {
        margin-top: 20px;
        font-size: 36px;
        .mar_bot20One {
           
            margin-top: 20px;
						.input_type{
							 display: flex;
							padding-left: 20px;
							> span {
							    margin-left: 20px;
							}
						}
            .input_text{
								align-items: center;
								>span{
									width: 176px;
								}
								>input{
									flex:1;
								}
            }
						.textarea_text{
							align-items: baseline;
							
						}
        }
    }
}
.mar_top20 {
    margin-bottom: 20px;
}
header {
    height: 80px;
    width: 100%;
    background: #3399ff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 20px;
    img {
        height: 44px;
        width: 28px;
    }
}
.tit {
    font-size: 30px;
    line-height: 1.6;
    margin-top: 40px;
}
.radioText {
    font-size: 28px;
}
.tit2 {
    font-size: 16px;
    color: #ff8e42;
    line-height: 40px;
}
.optpadd {
    padding-left: 30px;
}
.opt {
    padding-right: 15px;
    line-height: 25px;
}
.clearfix:after {
    content: "";
    display: table;
    line-height: 0;
    clear: both;
}
.titindu {
    background-color: #cfe8f3;
    padding: 20px 15px;
}
.indusbox {
    background-color: #f7f7f7;
    padding: 20px 15px;
}
.indus {
    float: left;
    font-size: 14px;
    font-weight: bold;
    width: 15%;
}
.indus1 {
    width: 25%;
}
.indus2 {
    font-size: 12px;
    line-height: 25px;
}
.paddl_15 {
    padding-left: 15px;
}
textarea {
    font-size: 28px;
    border: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
    line-height: 1.2;
}
.submit_btn {
    width: 100%;
    display: flex;
    justify-content: center;
}
.van-checkbox__icon .van-icon{
	width: 38px!important;
  height: 38px!important;
	border: 0.013333rem solid #f1f1f1;
}
.van-checkbox__icon{
	height: 40px;
	line-height: 40px;
}
.van-checkbox{
	margin-bottom: 15px;
}
.van-checkbox__label{
	font-size: 16px;
}
</style>
