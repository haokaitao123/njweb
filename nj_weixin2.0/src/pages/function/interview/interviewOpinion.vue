<template>
    <div class="interviewOpinion">
        <div class="interviewOpinionWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
				<!-- 应聘岗位 -->
				    <div class="item_box">
					    <x-input title="应聘岗位<span>*</span>"
							   v-model="relibApplypostDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
					    </x-input>
				    </div>
				    <!-- 身份 -->
				    <div class="item_box">
<!-- 				        <cell title="请选择"
				              is-link
				              value-align="left"
				              v-model="relibIdentityDis"
				             >
				            <div slot="title">身份</div>
				        </cell> -->
						<x-input title="身份<span>*</span>"
							   v-model="relibIdentityDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 姓名 -->
				    <div class="item_box">
<!-- 				        <x-input title="姓名<span>*</span>"
				                 v-model="form.relibName"
				                 :show-clear="false"
				                 placeholder="请填写">
				        </x-input> -->
						<x-input title="姓名<span>*</span>"
							   v-model="relibName"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 证件号码 -->
				    <div class="item_box">
<!-- 				        <x-input title="证件号码<span>*</span>"
				                 v-model="form.relibIdno"
				                 :show-clear="false"
				                 v-verify="form.relibIdno"
				                 @on-blur="idNumber"
				                 placeholder="请填写">
				        </x-input> -->
						<x-input title="证件号码<span>*</span>"
							   v-model="relibIdno"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 手机号 -->
				    <div class="item_box">
<!-- 				        <x-input title="手机号<span>*</span>"
				                 v-model="form.relibMobile"
				                 v-verify="form.relibMobile"
				                 :show-clear="false"
				                 placeholder="未填写">
				        </x-input> -->
						<x-input title="手机号<span>*</span>"
							   v-model="relibMobile"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 性别 -->
				    <div class="item_box">
<!-- 				        <cell title=""
				              is-link
				              value-align="left"
				              v-model="relibGenderDis"
				             >
				            <div slot="title">性别<span>*</span></div>
				        </cell> -->
						<x-input title="性别<span>*</span>"
							   v-model="relibGenderDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 出生日期 -->
				    <div class="item_box">
<!-- 				        <cell title=""
				              is-link
				              value-align="left"
				              v-verify="form.relibBirtday"
				              v-model="form.relibBirtday"
				              >
				            <div slot="title">出生日期</div>
				        </cell> -->
						<x-input title="出生日期<span>*</span>"
							   v-model="relibBirtday"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 籍贯 -->
				    <div class="item_box">
<!-- 				        <x-input title="籍贯"
				                 v-model="form.relibBirtplace"
				                 :show-clear="false"
				                 placeholder="请填写">
				        </x-input> -->
						<x-input title="籍贯<span>*</span>"
							   v-model="relibBirtplace"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 民族 -->
				    <div class="item_box">
<!-- 				        <cell title=""
				              is-link
				              value-align="left"
				              v-model="relibNatalityDis"
				             >
				            <div slot="title">民族</div>
				        </cell> -->
						<x-input title="民族<span>*</span>"
							   v-model="relibNatalityDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 政治面貌 -->
				    <div class="item_box">
<!-- 				        <cell title=""
				              is-link
				              value-align="left"
				              v-model="relibPoliticalDis"
				              >
				            <div slot="title">政治面貌</div>
				        </cell> -->
						<x-input title="政治面貌<span>*</span>"
							   v-model="relibPoliticalDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 邀约时间 -->
				    <div class="item_box">
<!-- 				        <cell title=""
				              is-link
				              value-align="left"
				              v-model="form.relibFilldate"
				             >
				            <div slot="title">邀约时间<span>*</span></div>
				        </cell> -->
						<x-input title="邀约时间<span>*</span>"
							   v-model="relibFilldate"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 健康状况 -->
				    <div class="item_box">
<!-- 				        <cell title=""
				              is-link
				              value-align="left"
				              v-model="relibHealthstaDis"
				              >
				            <div slot="title">健康状况</div>
				        </cell> -->
						<x-input title="健康状况<span>*</span>"
							   v-model="relibHealthstaDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 婚姻状况 -->
				    <div class="item_box">
<!-- 				        <cell title=""
				              is-link
				              value-align="left"
				              v-model="relibMaritlstaDis"
				              >
				            <div slot="title">婚姻状况</div>
				        </cell> -->
						<x-input title="婚姻状况<span>*</span>"
							   v-model="relibMaritlstaDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 身高 -->
				    <div class="item_box">
<!-- 				        <x-input title="身高(cm)<span>*</span>"
				                 v-model="form.relibHeight"
				                 :show-clear="false"
				                 placeholder="请填写">
				        </x-input> -->
						<x-input title="身高<span>*</span>"
							   v-model="relibHeight"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 体重 -->
				    <div class="item_box">
<!-- 				        <x-input title="体重(kg)<span>*</span>"
				                 v-model="form.relibWeight"
				                 :show-clear="false"
				                 placeholder="请填写">
				        </x-input> -->
						<x-input title="体重<span>*</span>"
							   v-model="relibWeight"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 学历 -->
				    <div class="item_box">
<!-- 				        <cell title=""
				              is-link
				              value-align="left"
				              v-model="relibEducatDis"
				              >
				            <div slot="title">学历</div>
				        </cell> -->
						<x-input title="学历<span>*</span>"
							   v-model="relibEducatDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 毕业院校 -->
				    <div class="item_box">
<!-- 				        <x-input title="毕业院校"
				                 v-model="form.relibSchool"
				                 :show-clear="false"
				                 placeholder="请填写">
				        </x-input> -->
						<x-input title="毕业院校<span>*</span>"
							   v-model="relibSchool"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 专业 -->
				    <div class="item_box">
<!-- 				        <x-input title="专业"
				                 v-model="form.relibProfes"
				                 :show-clear="false"
				                 placeholder="请填写">
				        </x-input> -->
						<x-input title="专业<span>*</span>"
							   v-model="relibProfes"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 现居住地 -->
				    <div class="item_box">
<!-- 				        <x-input title="现居住地"
				                 v-model="form.relibLiving"
				                 :show-clear="false"
				                 placeholder="请填写">
				        </x-input> -->
						<x-input title="现居住地<span>*</span>"
							   v-model="relibLiving"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 家庭地址 -->
				    <div class="item_box">
	<!-- 			        <x-input title="家庭地址"
				                 v-model="form.relibFamadds"
				                 :show-clear="false"
				                 placeholder="请填写">
				        </x-input> -->
						<x-input title="家庭地址<span>*</span>"
							   v-model="relibFamadds"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 紧急联系人姓名 -->
				    <div class="item_box">
<!-- 				        <x-input title="紧急联系人姓名"
				                 v-model="form.relibEmernm"
				                 :show-clear="false"
				                 placeholder="请填写">
				        </x-input> -->
						<x-input title="紧急联系人姓名<span>*</span>"
							   v-model="relibEmernm"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 紧急联系人电话 -->
				    <div class="item_box">
<!-- 				        <x-input title="紧急联系人电话"
				                 v-model="form.relibEmphone"
				                 :show-clear="false"
				                 placeholder="请填写">
				        </x-input> -->
						<x-input title="紧急联系人姓名<span>*</span>"
							   v-model="relibEmphone"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 与本人关系 -->
				    <div class="item_box">
	<!-- 			        <cell title="与本人关系"
				              is-link
				              value-align="left"
				              v-model="relibWithmeDis"
				              >
				        </cell> -->
						<x-input title="与本人关系<span>*</span>"
							   v-model="relibWithmeDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 期望薪资 -->
				    <div class="item_box">
<!-- 				        <x-input title="期望薪资"
				                 v-model="form.relibSalary"
				                 :show-clear="false"
				                 placeholder="请填写">
				        </x-input> -->
						<x-input title="期望薪资<span>*</span>"
							   v-model="relibSalary"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 职业状态 -->
				    <div class="item_box">
<!-- 				        <cell title="职业状态"
				              is-link
				              value-align="left"
				              v-model="relibProstatusDis"
				              >
				        </cell> -->
						<x-input title="职业状态<span>*</span>"
							   v-model="relibProstatusDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 可到岗时间 -->
				    <div class="item_box">
<!-- 				        <cell title="可到岗时间"
				              is-link
				              value-align="left"
				              v-model="form.relibAvaitime"
				              >
				        </cell> -->
						<x-input title="可到岗时间<span>*</span>"
							   v-model="relibAvaitime"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 是否有亲戚或朋友在本公司任职 -->
				    <div class="item_box">
				        <!-- <cell title="是否有亲戚或朋友在本公司任职"
				              is-link
				              value-align="left"
				              v-model="relibIsrelativesDis"
				              >
				        </cell> -->
						<x-input title="是否有亲戚或朋友在本公司任职<span>*</span>"
							   v-model="relibIsrelativesDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 本公司任职亲戚或朋友姓名 -->
				    <div class="item_box">
	<!-- 			        <x-input title="本公司任职亲戚或朋友姓名"
				                 v-model="form.relibRelatname"
				                 :show-clear="false"
				                 placeholder="请填写">
				        </x-input> -->
						<x-input title="本公司任职亲戚或朋友姓名<span>*</span>"
							   v-model="relibRelatname"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 本公司任职亲戚或朋友部门 -->
				    <div class="item_box">
<!-- 				        <x-input title="本公司任职亲戚或朋友部门"
				                 v-model="form.relibRelatdept"
				                 :show-clear="false"
				                 placeholder="请填写">
				        </x-input> -->
						<x-input title="本公司任职亲戚或朋友姓名<span>*</span>"
							   v-model="relibRelatdept"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 有无犯罪记录 -->
				    <div class="item_box">
				        <!-- <cell title="是否有犯罪记录"
				              is-link
				              value-align="left"
				              v-model="relibIscriminalDis"
				              >
				        </cell> -->
						<x-input title="是否有犯罪记录<span>*</span>"
							   v-model="relibIscriminalDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 有无纹身 -->
				    <div class="item_box">
<!-- 				        <cell title="是否有纹身"
				              is-link
				              value-align="left"
				              v-model="relibIstattooDis"
				              >
				        </cell> -->
						<x-input title="是否有纹身<span>*</span>"
							   v-model="relibIstattooDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 通过何种方式应聘 -->
				    <div class="item_box">
	<!-- 			        <cell title="通过何种方式应聘"
				              is-link
				              value-align="left"
				              v-model="relibApplytypeDis"
				              >
				        </cell> -->
						<x-input title="通过何种方式应聘<span>*</span>"
							   v-model="relibApplytypeDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 介绍人姓名 -->
				    <div class="item_box">
<!-- 				        <x-input title="介绍人姓名"
				                 v-model="form.relibIntrname"
				                 :show-clear="false"
				                 placeholder="请填写">
				        </x-input> -->
						<x-input title="介绍人姓名<span>*</span>"
							   v-model="relibIntrname"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 是否服从分配 -->
				    <div class="item_box">
	<!-- 			        <cell title="是否服从调配"
				              is-link
				              value-align="left"
				              v-model="relibIscomDis"
				              >
				        </cell> -->
						<x-input title="是否服从调配<span>*</span>"
							   v-model="relibIscomDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				
				    <!-- 招生范围 -->
				    <div class="item_box">
<!-- 				        <cell title="招生范围"
				              is-link
				              value-align="left"
				              v-model="relibEnrorageDis"
				              >
				        </cell> -->
						<x-input title="招生范围<span>*</span>"
							   v-model="relibEnrorageDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 是否毕业-->
				    <div class="item_box">
<!-- 				        <cell title="是否毕业"
				              is-link
				              value-align="left"
				              v-model="relibIsgraduDis"
				              >
				        </cell> -->
						<x-input title="是否毕业<span>*</span>"
							   v-model="relibIsgraduDis"
							   :disabled="disabled"
							   :show-clear="false"
							   placeholder="未填写">
						</x-input>
				    </div>
				    <!-- 自我评价 -->
				    <x-textarea :max="300"
				                title="自我评价"
				                :height="95"
				                v-model="relibSelfeval"
								:readonly="disabled"
				                placeholder="请填写"
				                :show-counter="false"></x-textarea>
				</group>
				<div class="title">
				    <div class="title_left">
				        <img src="../../../../static/function/educatInfo.png"
				             alt="">
				        <h3>教育信息</h3>
				    </div>
				
				    
				</div>
				<group label-align="left"
				       gutter="0"
				       class="form childForm">
				    <div class="item_box"
				         v-for="item in educationList"
				         v-if="educationList.length!==0">
				        <cell :value=item.reeduSchool
				              is-link
				              @click.native="goTo('educationShow',item.id)"></cell>
				    </div>
				    
				</group>
				<div class="title">
				    <div class="title_left">
				        <img src="../../../../static/function/work.png"
				             alt="">
				        <h3>工作经历</h3>
				    </div>
				    
				</div>
				<group label-align="left"
				       gutter="0"
				       class="form childForm">
				    <div class="item_box"
				         v-for="item in workExpList"
				         v-if="workExpList.length!==0">
				        <cell :value=item.reweCompnm
				              @click.native="goTo('workExpShow',item.id)"
				              is-link></cell>
				    </div>
				</group>
				<div class="title">
				    <div class="title_left">
				        <img src="../../../../static/function/work.png"
				             alt="">
				        <h3>家庭成员</h3>
				    </div>
				
				  
				</div>
				<group label-align="left"
				       gutter="0"
				       class="form childForm">
				    <div class="item_box"
				         v-for="item in familyList">
				        <cell :value=item.refaMembersDis
				              @click.native="goTo('familyShow',item.id)"
				              is-link></cell>
				    </div>
				
				</group>
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
                          :disabled="pass"
                          value-align="left"
                          v-model="relibFirpassDis"
                          v-verify="form.relibFirpass"
                          @click.native="pass?'':popupClick('relibFirpassShow','relibFirpass')">
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
		<!-- 教育信息 -->
		<van-popup v-model="educationShow"
		           position="right"
		           :close-on-click-overlay=false
		           class="right_popup">
		    <education :id="currentId"
					   :disabled="disabled"
		               @cancel="closeRight('educationShow')"
		               v-if='educationShow'></education>
		</van-popup>
		<!-- 家庭状况 -->
		<van-popup v-model="familyShow"
		           position="right"
		           :close-on-click-overlay=false
		           class="right_popup">
		    <family :id="currentId"
					:disabled="disabled"
		            @cancel="closeRight('familyShow')"
		            v-if='familyShow'></family>
		</van-popup>
		<!-- 工作经历 -->
		<van-popup v-model="workExpShow"
		           position="right"
		           :close-on-click-overlay=false
		           class="right_popup">
		    <workExp :id="currentId"
					 :disabled="disabled"
		             @cancel="closeRight('workExpShow')"
		             v-if='workExpShow'></workExp>
		</van-popup>
    </div>
</template>
<script>
import { getDataLevelUserLogin, getDataLevelUserLoginNew,getDataLevelNone } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
import { Group, Cell, XInput, XTextarea, Icon, Popup } from 'vux'
import education from '@/pages/function/interview/educationMes'
import family from '@/pages/function/interview/family'
import workExp from '@/pages/function/interview/workExp.vue'
export default {
    data () {
        return {
			disabled:true,
			pass:false,
            curDom: "",
            curDomShow: "",
            relibFirsttmDate: new Date(),
            minRelibFirsttm: new Date(1900, 1, 1),
            maxRelibFirsttm: new Date(2099, 12, 31),
			relibApplypost: "",                 //应聘岗位
			relibIdentity: "",                  //身份
			relibName: "",                      //姓名
			relibIdno: "",                      //证件号码
			relibMobile: "",                   //手机号
			relibGender: "",                    //性别
			relibBirtday: "",              //出生日期
			relibBirtplace: "",                 //籍贯
			relibNatality: "",                  //民族
			relibPolitical: "",                 //政治面貌
			relibFilldate: "",             //邀约时间
			relibHealthsta: "",                 //健康状况
			relibMaritlsta: "",                 //婚姻状况
			relibHeight: "",                    //身高
			relibWeight: "",                    //体重
			relibEducat: "",                    //学历
			relibSchool: "",                    //毕业院校
			relibProfes: "",                    //专业
			relibLiving: "",                   //现居住地
			relibFamadds: "",                  //家庭地址
			relibEmernm: "",                   //紧急联系人姓名
			relibEmphone: "",                  //紧急联系人电话
			relibWithme: "",                   //与本人关系
			relibSalary: "",                   //期望薪资
			relibProstatus: "",                 //职业状态
			relibAvaitime: "",            //可到岗时间
			relibIsrelatives: "",               //是否有亲戚或朋友在本公司任职
			relibRelatname: "",                 //本公司任职亲戚或朋友姓名
			relibRelatdept: "",                 //本公司任职亲戚或朋友部门
			relibIscriminal: "",                //有无犯罪记录
			relibIstattoo: "",                  //有无纹身
			relibApplytype: "",                 //通过何种方式应聘
			relibIntrname: "",                  //介绍人姓名 
			relibIscom: "",                     //是否服从调配
			relibSelfeval: "",                  //自我评价
			relibEnrorage: "",                  //招生范围
			relibIsgradu: "",                   //是否毕业
			relibApplypostDis:'',						//岗位
			relibIdentityDis: '',                     //身份
			relibGenderDis: '',                       //性别
			relibNatalityDis: '',                     //民族
			relibPoliticalDis: '',                    //政治面貌
			relibHealthstaDis: '',                    //健康状况
			relibMaritlstaDis: '',                    //婚育状况
			relibEducatDis: '',                       //学历
			relibWithmeDis: '',                       //与本人关系
			relibProstatusDis: '',                    //职业状态
			relibIsrelativesDis: '',                  //是否有亲朋在本公司任职
			relibIscriminalDis: '',                   //是否有犯罪记录
			relibIstattooDis: '',                     //是否有纹身
			relibApplytypeDis: '',                    //通过何种方式应聘
			relibIscomDis: '',                        //是否服从调配
			relibEnrorageDis: '',                     //招生范围
			relibIsgraduDis: '',
			workExpList: [],
			educationList: [],
			familyList: [],
			educationShow: false,
			familyShow: false,
			workExpShow: false,
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
            isRelibFirpass: false,
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
        Popup,
		education,
		family,
		workExp,
    },
    created () {
        this.getCondition();
    },
    mounted () {
        this.getSelect();
		this.getData();
		this.getWorkExp();
		this.getFamily();
		this.getEducation();
    },
    methods: {
        //提交
        async submit () {
            await this.save();
            console.log(this.saveStatus, 'this.saveStatus')
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
        comfirmSubmit () {
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
                    console.log(t.isRelibFirpass, '是否通过')
                    if (t.isRelibFirpass) {
                        t.relibFirpassDis = '否';
                        t.form.relibFirpass = '0';
                        t.pass = true;
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
		//获取面试员工数据
		getData () {
		    const t = this;
		    const data = {
		        _mt: 'wxRecruitProcess.getByIdNoLogin',
		        companyId: pubsource.companyId,
		        id: this.$route.query.id,
		    }
		    getDataLevelNone(data).then((res) => {
		        if (isSuccess(res, t)) {
		            let data = JSON.parse(res.data.content[0].value);
		            console.log(data, "data");
		   //          t.curStep = !data.curStepDis ? "" : data.curStepDis;
					// t.curStepstate = !data.curStepstate ? "" : data.curStepstate;
		            t.relibApplypostDis = !data.relibApplypostDis ? "" : data.relibApplypostDis;
		            t.relibName = !data.relibName ? "" : data.relibName;
		            t.relibIdno = !data.relibIdno ? "" : data.relibIdno;
		            t.relibMobile = !data.relibMobile ? "" : data.relibMobile;
		            t.relibBirtday = data.relibBirtday ? data.relibBirtday : '未选择';
		            t.relibBirtplace = !data.relibBirtplace ? "" : data.relibBirtplace;
		            t.relibFilldate = data.relibFilldate ? data.relibFilldate : '未选择';
		            t.relibHeight = !data.relibHeight ? "" : data.relibHeight;
		            t.relibWeight = !data.relibWeight ? "" : data.relibWeight;
		            t.relibSchool = !data.relibSchool ? "" : data.relibSchool;
		            t.relibProfes = !data.relibProfes ? "" : data.relibProfes;
		            t.relibLiving = !data.relibLiving ? "" : data.relibLiving;
		            t.relibFamadds = !data.relibFamadds ? "" : data.relibFamadds;
		            t.relibEmernm = !data.relibEmernm ? "" : data.relibEmernm;
		            t.relibEmphone = !data.relibEmphone ? "" : data.relibEmphone;
		            t.relibSalary = !data.relibSalary ? "" : data.relibSalary;
		            t.relibAvaitime = data.relibAvaitime ? data.relibAvaitime : '请选择';
		            t.relibRelatname = !data.relibRelatname ? "" : data.relibRelatname;
		            t.relibRelatdept = !data.relibRelatdept ? "" : data.relibRelatdept;
		            t.relibIntrname = !data.relibIntrname ? "" : data.relibIntrname;
		            t.relibIscom = data.relibIscom;
		            t.relibSelfeval = data.relibSelfeval;
		            t.relibEnrorage = data.relibEnrorage;
		            t.relibIsgradu = data.relibIsgradu;
					t.relibIsgraduDis = data.relibIsgraduDis ? data.relibIsgraduDis : '未选择';
		            t.relibIdentityDis = data.relibIdentityDis ? data.relibIdentityDis : '未选择';
		            t.relibGenderDis = data.relibGenderDis ? data.relibGenderDis : '未选择';
		            t.relibNatalityDis = data.relibNatalityDis ? data.relibNatalityDis : '未选择';
		            t.relibPoliticalDis = data.relibPoliticalDis ? data.relibPoliticalDis : '未选择';
		            t.relibHealthstaDis = data.relibHealthstaDis ? data.relibHealthstaDis : '未选择';
		            t.relibMaritlstaDis = data.relibMaritlstaDis ? data.relibMaritlstaDis : '未选择';
		            t.relibEducatDis = data.relibEducatDis ? data.relibEducatDis : '未选择';
		            t.relibWithmeDis = data.relibWithmeDis ? data.relibWithmeDis : '未选择';
		            t.relibProstatusDis = data.relibProstatusDis ? data.relibProstatusDis : '未选择';
		            t.relibIsrelativesDis = data.relibIsrelativesDis ? data.relibIsrelativesDis : '未选择';
		            t.relibIscriminalDis = data.relibIscriminalDis ? data.relibIscriminalDis : '未选择';
		            t.relibIstattooDis = data.relibIstattooDis ? data.relibIstattooDis : '未选择';
		            t.relibApplytypeDis = data.relibApplytypeDis ? data.relibApplytypeDis : '未选择';
		            t.relibIscomDis = data.relibIscomDis ? data.relibIscomDis : '未选择';
		            t.relibEnrorageDis = data.relibEnrorageDis ? data.relibEnrorageDis : '未选择';
		            t.relibIsgraduDis = data.relibIsgraduDis ? data.relibIsgraduDis : '未选择';
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
		//获取工作经历
		getWorkExp () {
		    const t = this;
		    const data = {
		        _mt: 'wxRecruitWorkexp.getByRefaPidNoLogin',
		        companyId: pubsource.companyId,
		        refaPid: this.$route.query.id,
		    }
		    getDataLevelNone(data).then((res) => {
		        if (isSuccess(res, t)) {
		            let data = JSON.parse(res.data.content[0].value);
		            t.workExpList = data
		            console.log(data, "getWorkExp")
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
		//获取家庭成员
		getFamily () {
		    const t = this;
		    const data = {
		        _mt: 'wxRecruitFamily.getByRefaPidNoLogin',
		        companyId: pubsource.companyId,
		        refaPid: this.$route.query.id,
		    }
		    getDataLevelNone(data).then((res) => {
		        if (isSuccess(res, t)) {
		            let data = JSON.parse(res.data.content[0].value);
		            t.familyList = data
		            console.log(data, "getFamily")
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
		//获取教育信息
		getEducation () {
		    const t = this;
		    const data = {
		        _mt: 'wxRecruitEduca.getByRefaPidNoLogin',
		        companyId: pubsource.companyId,
		        refaPid: this.$route.query.id,
		    }
		    getDataLevelNone(data).then((res) => {
		        if (isSuccess(res, t)) {
		            let data = JSON.parse(res.data.content[0].value);
		            t.educationList = data
		            console.log(data, "getEducation")
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
		goTo (name, id) {
		    this[name] = true;
		    this.currentId = id;
		    
		},
		//取消添加
		closeRight (dom) {
		    this[dom] = false;
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
		.title {
		    background: #fff;
		    padding: 30px 0 25px 40px;
		    display: flex;
		    position: relative;
		    justify-content: space-between;
		    .title_left {
		        display: flex;
		    }
		    > span {
		        font-size: 30px;
		        padding-right: 36px;
		        color: #339afe;
		    }
		    img {
		        width: 30px;
		        height: 30px;
		        margin-right: 20px;
		    }
		    h3 {
		        font-size: 30px;
		        font-weight: normal;
		        color: #999999;
		    }
		    &:after {
		        content: " ";
		        position: absolute;
		        left: 0;
		        top: 0;
		        right: 0;
		        height: 0.013333rem;
		        border-top: 0.013333rem solid #d9d9d9;
		        color: #d9d9d9;
		        -webkit-transform-origin: 0 0;
		        transform-origin: 0 0;
		        -webkit-transform: scaleY(0.5);
		        transform: scaleY(0.5);
		        left: 0.2rem;
		    }
		}
		
		.childForm {
		    .weui-cell__ft {
		        text-align: left;
		        width: 100% !important;
		    }
		}
		.save_button {
		    padding: 46px 70px;
		    background: #f6f6f6;
		    .x_button {
		        color: #fff;
		        font-size: 34px;
		    }
		}
        .save_button {
            padding: 46px 70px;
            .x_button {
                color: #fff;
                font-size: 34px;
            }
        }
    }
}
.van-popup--right {
    top: 50% !important;
}
.right_popup {
    width: 100%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}
</style>
