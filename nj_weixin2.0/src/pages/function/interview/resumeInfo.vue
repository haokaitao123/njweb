<template>
    <div class="resumeInfo">
        <div class="resumeInfoWrap"
             id="searchBar"
             :style="activeClass">
            <div class="title title_f">
                <div class="title_left">
                    <img src="../../../../static/function/resumeTitle.png"
                         alt="">
                    <h3>基本信息</h3>
                </div>
            </div>
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 应聘岗位 -->
                <div class="item_box">
                    <!-- <cell title=""
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibApplypostDis"
                          v-verify="form.relibApplypost"
                          @click.native="popupClick('relibApplypostShow')">
                        <div slot="title">应聘岗位<span>*</span></div>
                    </cell> -->
                    <icon type="warn"
                          class="error"
                          v-show="relibApplypostDis==='请选择'"
                          v-remind="form.relibApplypost"></icon>
                    <x-input title="应聘岗位<span>*</span>"
                             v-if="state"
                             v-model="relibApplypostDis"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 身份 -->
                <div class="item_box">
                    <cell title="请选择"
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibIdentityDis"
                          @click.native="popupClick('relibIdentityShow','relibIdentity')">
                        <div slot="title">身份</div>
                    </cell>
                    <x-input title="身份"
                             v-if="state"
                             v-model="relibIdentityDis"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 姓名 -->
                <div class="item_box">
                    <x-input title="姓名<span>*</span>"
                             v-model.trim="form.relibName"
                             :disabled="true"
                             v-verify="form.relibName"
                             :show-clear="false"
                             :placeholder="state?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibName==''"
                          v-remind="form.relibName"></icon>
                </div>
                <!-- 证件号码 -->
                <div class="item_box">
                    <x-input title="证件号码<span>*</span>"
                             v-model="form.relibIdno"
                             :disabled="state"
                             :show-clear="false"
                             v-verify="form.relibIdno"
                             ref="relibIdno"
                             @on-blur="idNumber"
                             @on-focus="enter($event)"
                             :placeholder="state?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibIdno==''"
                          v-remind="form.relibIdno"></icon>
                </div>
                <!-- 手机号 -->
                <div class="item_box">
                    <x-input title="手机号<span>*</span>"
                             :disabled="true"
                             v-model="form.relibMobile"
                             v-verify="form.relibMobile"
                             :show-clear="false"
                             :placeholder="state?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibMobile==''"
                          v-remind="form.relibMobile"></icon>
                </div>
                <!-- 性别 -->
                <div class="item_box">
                    <!-- <cell title=""
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibGenderDis"
                          v-verify="form.relibGender"
                          @click.native="popupClick('relibGenderShow','relibGender')">
                        <div slot="title">性别<span>*</span></div>
                    </cell> -->
                    <icon type="warn"
                          class="error"
                          v-show="relibGenderDis=='请选择'"
                          v-remind="form.relibGender"></icon>
                    <x-input title="性别<span>*</span>"
                             v-model="relibGenderDis"
                             v-verify="form.relibGender"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 出生日期 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="form.relibBirtday"
                          v-verify="form.relibBirtday"
                          @click.native="popupClick('relibBirtdaydateShow','relibBirtday')">
                        <div slot="title">出生日期<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibBirtday=='请选择'"
                          v-remind="form.relibBirtday"></icon>
                    <x-input title="出生日期<span>*</span>"
                             v-if="state"
                             v-model="form.relibBirtday"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 籍贯 -->
                <div class="item_box">
                    <x-input title="籍贯"
                             v-model="form.relibBirtplace"
                             :disabled="state"
                             :show-clear="false"
                             :placeholder="state?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 民族 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibNatalityDis"
                          @click.native="popupClick('relibNatalityShow','relibNatality')">
                        <div slot="title">民族</div>
                    </cell>
                    <x-input title="民族"
                             v-if="state"
                             v-model="relibNatalityDis"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 政治面貌 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibPoliticalDis"
                          @click.native="popupClick('relibPoliticaShow','relibPolitical')">
                        <div slot="title">政治面貌</div>
                    </cell>
                    <x-input title="政治面貌"
                             v-if="state"
                             v-model="relibPoliticalDis"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 邀约时间 -->
                <div class="item_box">
                    <!-- <cell title=""
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-verify="form.relibFilldate"
                          v-model="form.relibFilldate"
                          @click.native="popupClick('relibFilldateShow','relibFilldate')">
                        <div slot="title">邀约时间<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibFilldate==='请选择'"
                          v-remind="form.relibFilldate"></icon> -->
                    <x-input title="邀约时间<span>*</span>"
                             v-model="form.relibFilldate"
                             :show-clear="false"
                             :disabled="true"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 健康状况 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibHealthstaDis"
                          @click.native="popupClick('relibHealthstaShow','relibHealthsta')">
                        <div slot="title">健康状况</div>
                    </cell>
                    <x-input title="健康状况"
                             v-if="state"
                             v-model="relibHealthstaDis"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 婚姻状况 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibMaritlstaDis"
                          @click.native="popupClick('relibMaritlstaShow','relibMaritlsta')">
                        <div slot="title">婚姻状况</div>
                    </cell>
                    <x-input title="婚姻状况"
                             v-if="state"
                             v-model="relibMaritlstaDis"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 身高 -->
                <div class="item_box">
                    <x-input title="身高(cm)<span>*</span>"
                             v-model="form.relibHeight"
                             v-verify="form.relibHeight"
                             :show-clear="false"
                             :disabled="state"
                             :placeholder="state?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibHeight==''"
                          v-remind="form.relibHeight"></icon>
                </div>
                <!-- 体重 -->
                <div class="item_box">
                    <x-input title="体重(kg)<span>*</span>"
                             v-model="form.relibWeight"
                             v-verify="form.relibWeight"
                             :disabled="state"
                             :show-clear="false"
                             :placeholder="state?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibWeight==''"
                          v-remind="form.relibWeight"></icon>
                </div>
                <!-- 招生范围 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibEnrorageDis"
                          v-verify="form.relibEnrorage"
                          @click.native="popupClick('relibEnrorageShow','relibEnrorage')">
                        <div slot="title">招生范围<span>*</span></div>
                    </cell>
                    <x-input title="招生范围<span>*</span>"
                             v-if="state"
                             v-model="relibEnrorageDis"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibEnrorage===''"
                          v-remind="form.relibEnrorage"></icon>
                </div>
                <!-- 是否毕业-->
                <div class="item_box">
                    <cell title="是否毕业"
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibIsgraduDis"
                          v-verify="form.relibIsgradu"
                          @click.native="popupClick('relibIsgraduShow','relibIsgradu')">
                        <div slot="title">是否毕业<span>*</span></div>
                    </cell>
                    <x-input title="是否毕业<span>*</span>"
                             v-if="state"
                             v-model="relibIsgraduDis"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibIsgradu===''"
                          v-remind="form.relibIsgradu"></icon>
                </div>
                <!-- 学历 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibEducatDis"
                          v-verify="form.relibEducat"
                          @click.native="popupClick('relibEducatShow','relibEducat')">
                        <div slot="title">学历<span>*</span></div>
                    </cell>
                    <x-input title="学历<span>*</span>"
                             v-if="state"
                             v-model="relibEducatDis"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="relibEducatDis==='请选择'"
                          v-remind="form.relibEducat"></icon>
                </div>
                <!-- 毕业院校 -->
                <div class="item_box">
                    <x-input title="毕业院校<span>*</span>"
                             v-model="form.relibSchool"
                             v-verify="form.relibSchool"
                             :disabled="state"
                             :show-clear="false"
                             :placeholder="state?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibSchool===''"
                          v-remind="form.relibSchool"></icon>
                </div>
                <!-- 专业 -->
                <div class="item_box">
                    <x-input title="专业"
                             v-model="form.relibProfes"
                             :disabled="state"
                             :show-clear="false"
                             :placeholder="state?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 现居住地 -->
                <div class="item_box">
                    <x-input title="现居住地<span>*</span>"
                             v-model="form.relibLiving"
                             v-verify="form.relibLiving"
                             :readonly="state"
                             :show-clear="false"
                             :placeholder="state?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibLiving===''"
                          v-remind="form.relibLiving"></icon>
                </div>
                <!-- 家庭地址 -->
                <div class="item_box">
                    <x-input title="家庭地址"
                             v-model="form.relibFamadds"
                             :readonly="state"
                             :show-clear="false"
                             :placeholder="state?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 紧急联系人姓名 -->
                <div class="item_box">
                    <x-input title="紧急联系人姓名<span>*</span>"
                             v-model="form.relibEmernm"
                             v-verify="form.relibEmernm"
                             :disabled="state"
                             :show-clear="false"
                             :placeholder="state?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibEmernm==''"
                          v-remind="form.relibEmernm"></icon>
                </div>
                <!-- 紧急联系人电话 -->
                <div class="item_box">
                    <x-input title="紧急联系人电话<span>*</span>"
                             v-model="form.relibEmphone"
                             @on-focus="enter($event)"
                             v-verify="form.relibEmphone"
                             :disabled="state"
                             :show-clear="false"
                             :placeholder="state?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibEmphone==''"
                          v-remind="form.relibEmphone"></icon>
                </div>
                <!-- 与本人关系 -->
                <div class="item_box">
                    <cell title="与本人关系"
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibWithmeDis"
                          @click.native="popupClick('relibWithmeShow','relibWithme')">
                    </cell>
                    <x-input title="与本人关系"
                             v-if="state"
                             v-model="relibWithmeDis"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 期望薪资 -->
                <div class="item_box">
                    <x-input title="期望薪资"
                             v-model="form.relibSalary"
                             v-verify="form.relibSalary"
                             :disabled="state"
                             :show-clear="false"
                             :placeholder="state?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-remind="form.relibSalary"></icon>
                </div>
                <!-- 职业状态 -->
                <div class="item_box">
                    <cell title="职业状态"
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibProstatusDis"
                          @click.native="popupClick('relibProstatusShow','relibProstatus')">
                    </cell>
                    <x-input title="职业状态"
                             v-if="state"
                             v-model="relibProstatusDis"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 可到岗时间 -->
                <div class="item_box">
                    <cell title="可到岗时间"
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="form.relibAvaitime"
                          @click.native="popupClick('relibAvaitimedateShow','relibAvaitime')">
                    </cell>
                    <x-input title="可到岗时间"
                             v-if="state"
                             v-model="form.relibAvaitime"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 是否有亲戚或朋友在本公司任职 -->
                <div class="item_box">
                    <cell title="是否有亲戚或朋友在本公司任职"
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibIsrelativesDis"
                          @click.native="popupClick('relibIsrelativesShow','relibIsrelatives')">
                    </cell>
                    <x-input title="是否有亲戚或朋友在本公司任职"
                             v-if="state"
                             v-model="relibIsrelativesDis"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 本公司任职亲戚或朋友姓名 -->
                <div class="item_box">
                    <x-input title="本公司任职亲戚或朋友姓名"
                             v-model="form.relibRelatname"
                             :show-clear="false"
                             :disabled="state"
                             :placeholder="state?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 本公司任职亲戚或朋友部门 -->
                <div class="item_box">
                    <x-input title="本公司任职亲戚或朋友部门"
                             v-model="form.relibRelatdept"
                             :show-clear="false"
                             :disabled="state"
                             :placeholder="state?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 有无犯罪记录 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibIscriminalDis"
                          v-verify="form.relibIscriminal"
                          @click.native="popupClick('relibIscriminalShow','relibIscriminal')">
                        <div slot="title">是否有犯罪记录<span>*</span></div>
                    </cell>
                    <x-input title="是否有犯罪记录<span>*</span>"
                             v-if="state"
                             v-model="relibIscriminalDis"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.relibIscriminal===''"
                          v-remind="form.relibIscriminal"></icon>
                </div>
                <!-- 有无纹身 -->
                <div class="item_box">
                    <cell title="是否有纹身"
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibIstattooDis"
                          @click.native="popupClick('relibIstattooShow','relibIstattoo')">
                    </cell>
                    <x-input title="是否有纹身"
                             v-if="state"
                             v-model="relibIstattooDis"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 通过何种方式应聘 -->
                <div class="item_box">
                    <cell title="通过何种方式应聘"
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibApplytypeDis"
                          @click.native="popupClick('relibApplytypeShow','relibApplytype')">
                    </cell>
                    <x-input title="通过何种方式应聘"
                             v-if="state"
                             v-model="relibApplytypeDis"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 介绍人姓名 -->
                <div class="item_box">
                    <x-input title="介绍人姓名"
                             v-model="form.relibIntrname"
                             :show-clear="false"
                             :disabled="state"
                             :placeholder="state?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 是否服从分配 -->
                <div class="item_box">
                    <cell title="是否服从调配"
                          is-link
                          v-if="!state"
                          value-align="left"
                          v-model="relibIscomDis"
                          @click.native="popupClick('relibIscomShow','relibIscom')">
                    </cell>
                    <x-input title="是否服从调配"
                             v-if="state"
                             v-model="relibIscomDis"
                             :show-clear="false"
                             :disabled="state"
                             placeholder="未填写">
                    </x-input>
                </div>

                <!-- 自我评价 -->
                <x-textarea :max="300"
                            title="自我评价"
                            :height="95"
                            v-model="form.relibSelfeval"
                            :disabled="state"
                            :placeholder="state?'未填写':'请填写'"
                            :show-counter="false"></x-textarea>
            </group>
            <div class="title">
                <div class="title_left">
                    <img src="../../../../static/function/educatInfo.png"
                         alt="">
                    <h3>教育信息<span>*</span></h3>
                    <icon type="warn"
                          class="error"
                          v-show="educationState"></icon>
                </div>
                <span @click="goTo('educationShow')"
                      v-if="!state">添加</span>
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
                <div class="item_box"
                     v-if="educationList.length<1&&!state">
                    <cell value='学历信息1'
                          is-link
                          @click.native="goTo('educationShow')"></cell>
                </div>
                <div class="item_box"
                     v-if="educationList.length<2&&!state">
                    <cell value='学历信息2'
                          is-link
                          @click.native="goTo('educationShow')"></cell>
                </div>
            </group>
            <div class="title">
                <div class="title_left">
                    <img src="../../../../static/function/work.png"
                         alt="">
                    <h3>工作经历</h3>
                    <!-- <icon type="warn"
                          class="error"
                          v-show="workExpState"></icon> -->
                </div>
                <span @click="goTo('workExpShow')"
                      v-if="!state">添加</span>
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
                <div class="item_box"
                     v-if="workExpList.length<1&&!state">
                    <cell value='工作经历1'
                          @click.native="goTo('workExpShow')"
                          is-link></cell>
                </div>
                <div class="item_box"
                     v-if="workExpList.length<2&&!state">
                    <cell value='工作经历2'
                          @click.native="goTo('workExpShow')"
                          is-link></cell>
                </div>
                <div class="item_box"
                     v-if="workExpList.length<3&&!state">
                    <cell value='工作经历3'
                          @click.native="goTo('workExpShow')"
                          is-link></cell>
                </div>
            </group>
            <div class="title">
                <div class="title_left">
                    <img src="../../../../static/function/work.png"
                         alt="">
                    <h3>家庭成员</h3>
                </div>

                <span @click="goTo('familyShow')"
                      v-if="!state">添加</span>
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
            <div class="save_button">
                <x-button type="primary"
                          class="x_button"
                          :disabled="state"
                          @click.native="save"
                          action-type="button">保存</x-button>
            </div>
        </div>
        <!-- 身份 -->
        <van-popup v-model="relibIdentityShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibIdentityIndex"
                        :columns=selectRelibIdentity
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 性别 -->
        <van-popup v-model="relibGenderShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibGenderIndex"
                        :columns=selectRelibGender
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />

        </van-popup>
        <!-- 民族 -->
        <van-popup v-model="relibNatalityShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibNatalityIndex"
                        :columns=selectRelibNatality
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />

        </van-popup>
        <!-- 政治面貌 -->
        <van-popup v-model="relibPoliticaShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibPoliticaIndex"
                        :columns=selectRelibPolitica
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />

        </van-popup>
        <!-- 健康状况 -->
        <van-popup v-model="relibHealthstaShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibHealthstaIndex"
                        :columns=selectRelibHealthsta
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />

        </van-popup>
        <!-- 婚育状况 -->
        <van-popup v-model="relibMaritlstaShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibMaritlstaIndex"
                        :columns=selectRelibMaritlsta
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />

        </van-popup>
        <!-- 学历 -->
        <van-popup v-model="relibEducatShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibEducatIndex"
                        :columns=selectRelibEducat
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />

        </van-popup>
        <!-- 与本人关系 -->
        <van-popup v-model="relibWithmeShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibWithmeIndex"
                        :columns=selectRelibWithme
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />

        </van-popup>
        <!-- 职业状态 -->
        <van-popup v-model="relibProstatusShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibProstatusIndex"
                        :columns=selectRelibProstatus
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />

        </van-popup>
        <!-- 是否有亲朋在本公司任职 -->
        <van-popup v-model="relibIsrelativesShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibIsrelativesIndex"
                        :columns=selectRelibIsrelatives
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />

        </van-popup>
        <!-- 是否有犯罪记录 -->
        <van-popup v-model="relibIscriminalShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibIscriminalIndex"
                        :columns=selectRelibIscriminal
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />

        </van-popup>
        <!-- 是否有纹身 -->
        <van-popup v-model="relibIstattooShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibIstattooIndex"
                        :columns=selectRelibIstattoo
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />

        </van-popup>
        <!-- 是否服从调配 -->
        <van-popup v-model="relibIscomShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibIscomIndex"
                        :columns=selectRelibIscom
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />

        </van-popup>
        <!-- 通过何种方式应聘 -->
        <van-popup v-model="relibApplytypeShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibApplytypeIndex"
                        :columns=selectRelibApplytype
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />

        </van-popup>
        <!-- 招生范围 -->
        <van-popup v-model="relibEnrorageShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibEnrorageIndex"
                        :columns=selectRelibEnrorage
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />

        </van-popup>
        <!-- 是否毕业 -->
        <van-popup v-model="relibIsgraduShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="relibIsgraduIndex"
                        :columns=selectRelibIsgradu
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />

        </van-popup>
        <!-- 出生日期-->
        <van-popup v-model="relibBirtdaydateShow"
                   position="bottom">
            <van-datetime-picker v-model="relibBirtdayDate"
                                 type="date"
                                 :min-date="minRelibBirtday"
                                 :max-date="maxRelibBirtday"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 可到岗时间 -->
        <van-popup v-model="relibAvaitimedateShow"
                   position="bottom">
            <van-datetime-picker v-model="relibAvaitimeDate"
                                 type="date"
                                 :min-date="minRelibAvaitime"
                                 :max-date="maxRelibAvaitime"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 邀约时间 -->
        <van-popup v-model="relibFilldateShow"
                   position="bottom">
            <van-datetime-picker v-model="relibFilldateDate"
                                 type="datetime"
                                 :min-date="minRelibFilldate"
                                 :max-date="maxRelibFilldate"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 教育信息 -->
        <van-popup v-model="educationShow"
                   position="right"
                   :close-on-click-overlay=false
                   class="right_popup">
            <education :id=currentId
                       :disabled=state
                       @cancel="closeRight('educationShow')"
                       v-if='educationShow'></education>
        </van-popup>
        <!-- 家庭状况 -->
        <van-popup v-model="familyShow"
                   position="right"
                   :close-on-click-overlay=false
                   class="right_popup">
            <family :id=currentId
                    :disabled=state
                    @cancel="closeRight('familyShow')"
                    v-if='familyShow'></family>
        </van-popup>
        <!-- 工作经历 -->
        <van-popup v-model="workExpShow"
                   position="right"
                   :close-on-click-overlay=false
                   class="right_popup">
            <workExp :id=currentId
                     :disabled=state
                     @cancel="closeRight('workExpShow')"
                     v-if='workExpShow'></workExp>
        </van-popup>
        <!-- 岗位 -->
        <van-popup v-model="relibApplypostShow"
                   position="right"
                   class="popup_width">
            <searchPost @inputPost="inputPost"
                        :currentId="currentPostId"
                        v-if="relibApplypostShow"
                        ref="searchPost"></searchPost>
        </van-popup>
    </div>
</template>
<script>
import { getDataLevelNone, getDataLevelNoneNew, getDataLevelUserLoginNew } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
import { Group, Cell, XInput, XTextarea, Icon } from 'vux'
import valid from '@/lib/pub_valid'
import city from '@/lib/cityData'
import education from '@/pages/function/interview/educationMes'
import family from '@/pages/function/interview/family'
import workExp from '@/pages/function/interview/workExp.vue'
import searchPost from '@/components/search/searchPost'
// import wx from 'weixin-js-sdk'
export default {
    data () {
        return {
            curStep: "",
            curStepstate: "",
            state: false,
            currentId: '',
            currentPostId: "",
            educationShow: false,
            familyShow: false,
            workExpShow: false,
            curDom: "",
            curDomShow: "",
            relibBirtdayDate: new Date(),
            minRelibBirtday: new Date(1900, 10, 1),
            maxRelibBirtday: new Date(2099, 12, 31),
            relibAvaitimeDate: new Date(),
            minRelibAvaitime: new Date(1900, 10, 1),
            maxRelibAvaitime: new Date(2099, 12, 31),
            relibFilldateDate: new Date(),
            minRelibFilldate: new Date(1900, 10, 1),
            maxRelibFilldate: new Date(2099, 12, 31),
            form: {
                relibApplypost: "",                 //应聘岗位
                relibIdentity: "",                  //身份
                relibName: "",                      //姓名
                relibIdno: "",                      //证件号码
                relibMobile: "",                   //手机号
                relibGender: "",                    //性别
                relibBirtday: "请选择",              //出生日期
                relibBirtplace: "",                 //籍贯
                relibNatality: "10",                  //民族
                relibPolitical: "",                 //政治面貌
                relibFilldate: "请选择",             //邀约时间
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
                relibAvaitime: "请选择",            //可到岗时间
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
            },
            relibApplypostDis: '请选择',					//岗位
            relibIdentityDis: '请选择',                     //身份
            relibGenderDis: '请选择',                       //性别
            relibNatalityDis: '汉',                         //民族
            relibPoliticalDis: '请选择',                    //政治面貌
            relibHealthstaDis: '请选择',                    //健康状况
            relibMaritlstaDis: '请选择',                    //婚育状况
            relibEducatDis: '请选择',                       //学历
            relibWithmeDis: '请选择',                       //与本人关系
            relibProstatusDis: '请选择',                    //职业状态
            relibIsrelativesDis: '请选择',                  //是否有亲朋在本公司任职
            relibIscriminalDis: '请选择',                   //是否有犯罪记录
            relibIstattooDis: '请选择',                     //是否有纹身
            relibApplytypeDis: '请选择',                    //通过何种方式应聘
            relibIscomDis: '请选择',                        //是否服从调配
            relibEnrorageDis: '请选择',                     //招生范围
            relibIsgraduDis: '请选择',                      //是否毕业 
            relibApplypostShow: false,
            relibIdentityShow: false,
            relibGenderShow: false,
            relibNatalityShow: false,
            relibPoliticaShow: false,
            relibHealthstaShow: false,
            relibMaritlstaShow: false,
            relibEducatShow: false,
            relibWithmeShow: false,
            relibProstatusShow: false,
            relibIsrelativesShow: false,
            relibIscriminalShow: false,
            relibIstattooShow: false,
            relibApplytypeShow: false,
            relibIscomShow: false,
            relibEnrorageShow: false,
            relibIsgraduShow: false,
            relibBirtdaydateShow: false,
            relibAvaitimedateShow: false,
            relibFilldateShow: false,
            relibIdentityIndex: 0,
            relibGenderIndex: 0,
            relibNatalityIndex: 0,
            relibPoliticaIndex: 0,
            relibHealthstaIndex: 0,
            relibMaritlstaIndex: 0,
            relibEducatIndex: 0,
            relibWithmeIndex: 0,
            relibProstatusIndex: 0,
            relibIsrelativesIndex: 0,
            relibIscriminalIndex: 0,
            relibIstattooIndex: 0,
            relibApplytypeIndex: 0,
            relibIscomIndex: 0,
            relibEnrorageIndex: 0,
            relibIsgraduIndex: 0,
            selectRelibIdentity: [],
            selectRelibGender: [],
            selectRelibNatality: [],
            selectRelibPolitica: [],
            selectRelibHealthsta: [],
            selectRelibMaritlsta: [],
            selectRelibEducat: [],
            selectRelibWithme: [],
            selectRelibProstatus: [],
            selectRelibIsrelatives: [],
            selectRelibIscriminal: [],
            selectRelibIstattoo: [],
            selectRelibApplytype: [],
            selectRelibIscom: [],
            selectRelibEnrorage: [],
            selectRelibIsgradu: [],
            workExpList: [],
            educationList: [],
            familyList: [],
            dateShow: false,
            popupShow: false,
            educationState: false,
            workExpState: false,
            childCheck: false,
            activeClass: "",
            Top: ""
        }
    },
    verify: {
        form: {
            relibApplypost: "required",
            relibName: "required",
            relibMobile: ["required", "mobile"],
            relibGender: "required",
            relibFilldate: "required",
            relibIdno: ["required", "idNumber"],
            relibEmphone: ["required", "mobile"],
            relibSalary: "number",
            relibHeight: ["required", "number"],
            relibWeight: ["required", "number"],
            relibBirtday: "required",
            relibEducat: "required",
            relibEmernm: "required",
            relibEnrorage: "required",
            relibIscriminal: "required",
            relibIsgradu: "required",
            relibSchool: "required",
            relibLiving: "required",
        }
    },
    components: {
        Group,
        Cell,
        XInput,
        Icon,
        XTextarea,
        education,
        family,
        workExp,
        searchPost
    },
    created () {
        this.getSelect();
        this.getData();
        this.getWorkExp();
        this.getFamily();
        this.getEducation();
        window.localStorage.setItem('reeduPid', this.$route.query.id);

    },
    mounted () {
        var originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
        const t = this;
        // window.addEventListener('scroll', this.handleScroll);

        // window.onresize = function () {
        //     //键盘弹起与隐藏都会引起窗口的高度发生变化
        //     var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //     console.log(t.Top, "Top");
        //     // debugger;
        //     if (resizeHeight - 0 <= originalHeight - 0) {
        //         t.activeClass = {
        //             position: "fixed",
        //             top: t.Top
        //         };
        //         //当软键盘弹起，在此处操作
        //     } else {
        //         //当软键盘收起，在此处操作
        //         setTimeout(() => {
        //             t.activeClass = "";
        //         }, 200);

        //     }
        // }

    },
    methods: {
        goTo (name, id) {
            this[name] = true;
            this.currentId = id;
        },
        checkChild () {
            const t = this;
            // if (t.workExpList.length < 1) {
            //     t.childCheck = true
            //     t.workExpState = true;
            //     if (t.educationList.length < 1) {
            //         t.educationState = true;
            //     } else {
            //         t.educationState = false;
            //     }
            //     return false;
            // } else {
            //     t.workExpState = false;
            //     t.childCheck = false
            //     if (t.educationList.length < 1) {
            //         t.educationState = true;
            //         t.childCheck = true;
            //         return false;
            //     } else {
            //         t.educationState = false;
            //         t.childCheck = false;
            //     }
            // }
            if (t.educationList.length < 1) {
                t.educationState = true;
                t.childCheck = true;
                return false;
            } else {
                t.educationState = false;
                t.childCheck = false;
            }
            return true;
        },
        //保存
        save () {
            const t = this;
            let state = t.checkChild()
            if (t.$verify.check() && state) {
                const data = deepCopy(t.form);
                data._mt = "wxRecruitProcess.addOrUpdNoLogin";
                data.companyId = pubsource.companyId;
                data.userId = '1';
                data.id = t.$route.query.id;
                for (const dat in data) {
                    if (data[dat] === "" || data[dat] === "请选择") {
                        delete data[dat];
                    }
                }
                getDataLevelNoneNew(data).then(res => {
                    if (isSuccess(res, t)) {
                        localStorage.removeItem('resumeInfoForm')
                        this.$router.push({
                            name: 'interviewSuccess'
                        })
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
            } else {
                t.$vux.toast.text('请检查填写信息');
            }
        },
        //底部弹出框
        popupClick (domShow, dom) {
            this.curDom = dom;
            this.curDomShow = domShow;
            this[domShow] = true;
        },
        confirm (value) {
            if (this.curDomShow.indexOf("dateShow") != -1) {
                if (this.curDomShow === 'relibBirtdaydateShow' || this.curDomShow === 'relibAvaitimedateShow') {
                    value = new Date(value).format('yyyy-MM-dd');
                } else {
                    value = new Date(value).format('yyyy-MM-dd hh:mm:ss');
                }
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
            if (this.curDomShow == "dateShow") {
                this.currentDate = new Date();
            } else if (this.curDomShow == "popupShow") {
                this.currentIndex = 2
            }
            this[this.curDomShow] = false;
        },
        //查询下拉列表
        getSelect () {
            const t = this;
            getDataLevelNone({
                _mt: "wxBaseParmInfo.getSelectValue",
                typeCode: 'Identitytype,gender,nationtype,political,healthcondition,marrystatus,education,relationship,empstatus,applysource,enrollrange,graduation,yesno'
            }).then(res => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    t.selectData(data[0].paramList, "selectRelibIdentity");
                    t.selectData(data[1].paramList, "selectRelibGender");
                    t.selectData(data[2].paramList, "selectRelibNatality");
                    t.selectData(data[3].paramList, "selectRelibPolitica");
                    t.selectData(data[4].paramList, "selectRelibHealthsta");
                    t.selectData(data[5].paramList, "selectRelibMaritlsta");
                    t.selectData(data[6].paramList, "selectRelibEducat");
                    t.selectData(data[7].paramList, "selectRelibWithme");
                    t.selectData(data[8].paramList, "selectRelibProstatus");
                    t.selectData(data[9].paramList, "selectRelibApplytype");
                    t.selectData(data[10].paramList, "selectRelibEnrorage");
                    t.selectData(data[11].paramList, "selectRelibIsgradu");
                    t.selectData(data[12].paramList, "selectRelibIsrelatives");
                    t.selectData(data[12].paramList, "selectRelibIscom");
                    t.selectData(data[12].paramList, "selectRelibIscriminal");
                    t.selectData(data[12].paramList, "selectRelibIstattoo");
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
                    let resumeInfoForm = JSON.parse(window.localStorage.getItem('resumeInfoForm'));
                    if (!resumeInfoForm) {
                        let data = JSON.parse(res.data.content[0].value);
                        t.curStep = !data.curStepDis ? "" : data.curStepDis;
                        t.curStepstate = !data.curStepstate ? "" : data.curStepstate;
                        if (t.curStep === '初试' && t.curStepstate !== 'p_flowst_3') {
                            t.state = false;
                        }
                        t.form.relibApplypost = !data.relibApplypost ? "" : data.relibApplypost;
                        t.form.relibIdentity = data.relibIdentity;
                        t.form.relibName = !data.relibName ? "" : data.relibName;
                        t.form.relibIdno = !data.relibIdno ? "" : data.relibIdno;
                        t.form.relibMobile = !data.relibMobile ? "" : data.relibMobile;
                        t.form.relibGender = data.relibGender;
                        t.form.relibBirtday = data.relibBirtday ? new Date(data.relibBirtday.replace(/-/g, '/')).format('yyyy-MM-dd') : '请选择';
                        t.form.relibBirtplace = !data.relibBirtplace ? "" : data.relibBirtplace;
                        t.form.relibNatality = data.relibNatality ? data.relibNatality : '10';
                        t.form.relibPolitical = data.relibPolitical;
                        t.form.relibFilldate = data.relibFilldate ? data.relibFilldate : '请选择';
                        t.form.relibHealthsta = data.relibHealthsta;
                        t.form.relibMaritlsta = data.relibMaritlsta;
                        t.form.relibHeight = !data.relibHeight ? "" : data.relibHeight;
                        t.form.relibWeight = !data.relibWeight ? "" : data.relibWeight;
                        t.form.relibEducat = data.relibEducat ? data.relibEducat : '';;
                        t.form.relibSchool = !data.relibSchool ? "" : data.relibSchool;
                        t.form.relibProfes = !data.relibProfes ? "" : data.relibProfes;
                        t.form.relibLiving = !data.relibLiving ? "" : data.relibLiving;
                        t.form.relibFamadds = !data.relibFamadds ? "" : data.relibFamadds;
                        t.form.relibEmernm = !data.relibEmernm ? "" : data.relibEmernm;
                        t.form.relibEmphone = !data.relibEmphone ? "" : data.relibEmphone;
                        t.form.relibWithme = data.relibWithme;
                        t.form.relibSalary = !data.relibSalary ? "" : data.relibSalary;
                        t.form.relibProstatus = data.relibProstatus;
                        t.form.relibAvaitime = data.relibAvaitime ? new Date(data.relibAvaitime.replace(/-/g, '/')).format('yyyy-MM-dd') : '请选择';
                        t.form.relibIsrelatives = data.relibIsrelatives;
                        t.form.relibRelatname = !data.relibRelatname ? "" : data.relibRelatname;
                        t.form.relibRelatdept = !data.relibRelatdept ? "" : data.relibRelatdept;
                        t.form.relibIscriminal = data.relibIscriminal ? data.relibIscriminal : '';
                        t.form.relibIstattoo = data.relibIstattoo;
                        t.form.relibApplytype = data.relibApplytype;
                        t.form.relibIntrname = !data.relibIntrname ? "" : data.relibIntrname;
                        t.form.relibIscom = data.relibIscom;
                        t.form.relibSelfeval = data.relibSelfeval;
                        t.form.relibEnrorage = data.relibEnrorage ? data.relibEnrorage : '';
                        t.form.relibIsgradu = data.relibIsgradu ? data.relibIsgradu : '';
                        t.relibApplypostDis = data.relibApplypostDis ? data.relibApplypostDis : '请选择';
                        t.relibIdentityDis = data.relibIdentityDis ? data.relibIdentityDis : '请选择';
                        t.relibGenderDis = data.relibGenderDis ? data.relibGenderDis : '请选择';
                        t.relibNatalityDis = data.relibNatalityDis ? data.relibNatalityDis : '汉族';
                        t.relibPoliticalDis = data.relibPoliticalDis ? data.relibPoliticalDis : '请选择';
                        t.relibHealthstaDis = data.relibHealthstaDis ? data.relibHealthstaDis : '请选择';
                        t.relibMaritlstaDis = data.relibMaritlstaDis ? data.relibMaritlstaDis : '请选择';
                        t.relibEducatDis = data.relibEducatDis ? data.relibEducatDis : '请选择';
                        t.relibWithmeDis = data.relibWithmeDis ? data.relibWithmeDis : '请选择';
                        t.relibProstatusDis = data.relibProstatusDis ? data.relibProstatusDis : '请选择';
                        t.relibIsrelativesDis = data.relibIsrelativesDis ? data.relibIsrelativesDis : '请选择';
                        t.relibIscriminalDis = data.relibIscriminalDis ? data.relibIscriminalDis : '请选择';
                        t.relibIstattooDis = data.relibIstattooDis ? data.relibIstattooDis : '请选择';
                        t.relibApplytypeDis = data.relibApplytypeDis ? data.relibApplytypeDis : '请选择';
                        t.relibIscomDis = data.relibIscomDis ? data.relibIscomDis : '请选择';
                        t.relibEnrorageDis = data.relibEnrorageDis ? data.relibEnrorageDis : '请选择';
                        t.relibIsgraduDis = data.relibIsgraduDis ? data.relibIsgraduDis : '请选择';

                        if (t.state) {
                            t.relibApplypostDis = data.relibApplypostDis ? data.relibApplypostDis : '未选择';
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
                            t.form.relibBirtday = data.relibBirtday ? new Date(data.relibBirtday.replace(/-/g, '/')).format('yyyy-MM-dd') : '未选择';
                            t.form.relibFilldate = data.relibFilldate ? data.relibFilldate : '未选择';
                            t.form.relibAvaitime = data.relibAvaitime ? new Date(data.relibAvaitime.replace(/-/g, '/')).format('yyyy-MM-dd') : '未选择';
                        }
                        t.relibBirtdayDate = !data.relibBirtday ? new Date() : new Date(data.relibBirtday.replace(/-/g, '/'));
                        t.relibAvaitimeDate = !data.relibAvaitime ? new Date() : new Date(data.relibAvaitime.replace(/-/g, '/'));
                        t.relibFilldateDate = !data.relibFilldate ? new Date() : new Date(data.relibFilldate.replace(/-/g, '/'));
                        if (!data.relibNatalityDis) {
                            t.setSelectValue('汉族', 'selectRelibNatality', 'relibNatalityIndex');
                        } else {
                            t.setSelectValue(data.relibNatalityDis, 'selectRelibNatality', 'relibNatalityIndex');
                        }
                        t.setSelectValue(data.relibIdentityDis, 'selectRelibIdentity', 'relibIdentityIndex');
                        t.setSelectValue(data.relibGenderDis, 'selectRelibGender', 'relibGenderIndex');
                        t.setSelectValue(data.relibPoliticalDis, 'selectRelibPolitica', 'relibPoliticaIndex');
                        t.setSelectValue(data.relibHealthstaDis, 'selectRelibHealthsta', 'relibHealthstaIndex');
                        t.setSelectValue(data.relibMaritlstaDis, 'selectRelibMaritlsta', 'relibMaritlstaIndex');
                        t.setSelectValue(data.relibEducatDis, 'selectRelibEducat', 'relibEducatIndex');
                        t.setSelectValue(data.relibWithmeDis, 'selectRelibWithme', 'relibWithmeIndex');
                        t.setSelectValue(data.relibProstatusDis, 'selectRelibProstatus', 'relibProstatusIndex');
                        t.setSelectValue(data.relibIsrelativesDis, 'selectRelibIsrelatives', 'relibIsrelativesIndex');
                        t.setSelectValue(data.relibIscriminalDis, 'selectRelibIscriminal', 'relibIscriminalIndex');
                        t.setSelectValue(data.relibIstattooDis, 'selectRelibIstattoo', 'relibIstattooIndex');
                        t.setSelectValue(data.relibApplytypeDis, 'selectRelibApplytype', 'relibApplytypeIndex');
                        t.setSelectValue(data.relibIscomDis, 'selectRelibIscom', 'relibIscomIndex');
                        t.setSelectValue(data.relibEnrorageDis, 'selectRelibEnrorage', 'relibEnrorageIndex');
                        t.setSelectValue(data.relibIsgraduDis, 'selectRelibIsgradu', 'relibIsgraduIndex');
                    } else {
                        let createTime = new Date(resumeInfoForm.createTime).getTime();
                        let nowTime = new Date().getTime();
                        if (nowTime - createTime < 5 * 60 * 1000) {
                            t.form = deepCopy(resumeInfoForm.form);
                            t.relibApplypostDis = resumeInfoForm.relibApplypostDis;
                            t.relibIdentityDis = resumeInfoForm.relibIdentityDis;
                            t.relibGenderDis = resumeInfoForm.relibGenderDis;
                            t.relibNatalityDis = resumeInfoForm.relibNatalityDis;
                            t.relibPoliticalDis = resumeInfoForm.relibPoliticalDis;
                            t.relibHealthstaDis = resumeInfoForm.relibHealthstaDis;
                            t.relibMaritlstaDis = resumeInfoForm.relibMaritlstaDis;
                            t.relibEducatDis = resumeInfoForm.relibEducatDis;
                            t.relibWithmeDis = resumeInfoForm.relibWithmeDis;
                            t.relibProstatusDis = resumeInfoForm.relibProstatusDis;
                            t.relibIsrelativesDis = resumeInfoForm.relibIsrelativesDis;
                            t.relibIscriminalDis = resumeInfoForm.relibIscriminalDis;
                            t.relibIstattooDis = resumeInfoForm.relibIstattooDis;
                            t.relibApplytypeDis = resumeInfoForm.relibApplytypeDis;
                            t.relibIscomDis = resumeInfoForm.relibIscomDis;
                            t.relibEnrorageDis = resumeInfoForm.relibEnrorageDis;
                            t.relibIsgraduDis = resumeInfoForm.relibIsgraduDis;
                            t.relibBirtdayDate = resumeInfoForm.form.relibBirtday === "请选择" ? new Date() : new Date(resumeInfoForm.form.relibBirtday.replace(/-/g, '/'));
                            t.relibAvaitimeDate = resumeInfoForm.form.relibAvaitime === "请选择" ? new Date() : new Date(resumeInfoForm.form.relibAvaitime.replace(/-/g, '/'));
                            t.relibFilldateDate = resumeInfoForm.form.relibFilldate === "请选择" ? new Date() : new Date(resumeInfoForm.form.relibFilldate.replace(/-/g, '/'));
                            t.setSelectValue(resumeInfoForm.relibNatalityDis, 'selectRelibNatality', 'relibNatalityIndex');
                            t.setSelectValue(resumeInfoForm.relibIdentityDis, 'selectRelibIdentity', 'relibIdentityIndex');
                            t.setSelectValue(resumeInfoForm.relibGenderDis, 'selectRelibGender', 'relibGenderIndex');
                            t.setSelectValue(resumeInfoForm.relibPoliticalDis, 'selectRelibPolitica', 'relibPoliticaIndex');
                            t.setSelectValue(resumeInfoForm.relibHealthstaDis, 'selectRelibHealthsta', 'relibHealthstaIndex');
                            t.setSelectValue(resumeInfoForm.relibMaritlstaDis, 'selectRelibMaritlsta', 'relibMaritlstaIndex');
                            t.setSelectValue(resumeInfoForm.relibEducatDis, 'selectRelibEducat', 'relibEducatIndex');
                            t.setSelectValue(resumeInfoForm.relibWithmeDis, 'selectRelibWithme', 'relibWithmeIndex');
                            t.setSelectValue(resumeInfoForm.relibProstatusDis, 'selectRelibProstatus', 'relibProstatusIndex');
                            t.setSelectValue(resumeInfoForm.relibIsrelativesDis, 'selectRelibIsrelatives', 'relibIsrelativesIndex');
                            t.setSelectValue(resumeInfoForm.relibIscriminalDis, 'selectRelibIscriminal', 'relibIscriminalIndex');
                            t.setSelectValue(resumeInfoForm.relibIstattooDis, 'selectRelibIstattoo', 'relibIstattooIndex');
                            t.setSelectValue(resumeInfoForm.relibApplytypeDis, 'selectRelibApplytype', 'relibApplytypeIndex');
                            t.setSelectValue(resumeInfoForm.relibIscomDis, 'selectRelibIscom', 'relibIscomIndex');
                            t.setSelectValue(resumeInfoForm.relibEnrorageDis, 'selectRelibEnrorage', 'relibEnrorageIndex');
                            t.setSelectValue(resumeInfoForm.relibIsgraduDis, 'selectRelibIsgradu', 'relibIsgraduIndex');
                        } else {
                            localStorage.removeItem('resumeInfoForm')
                        }
                    }
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
        async getWorkExp () {
            const t = this;
            const data = {
                _mt: 'wxRecruitWorkexp.getByRefaPidNoLogin',
                companyId: pubsource.companyId,
                refaPid: this.$route.query.id,
            }
            await getDataLevelNone(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    t.workExpList = data
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
        async getEducation () {
            const t = this;
            const data = {
                _mt: 'wxRecruitEduca.getByRefaPidNoLogin',
                companyId: pubsource.companyId,
                refaPid: this.$route.query.id,
            }
            await getDataLevelNone(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    t.educationList = data
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
        //证件号码验证
        idNumber () {
            if (this.form.relibIdno !== '') {
                if (valid.val_identity(this.form.relibIdno)) {
                    //判断性别
                    if (parseInt(this.form.relibIdno.substr(16, 1)) % 2 == 1) {
                        //男
                        this.form.relibGender = '01male';
                        this.relibGenderDis = "男";
                        this.setSelectValue('男', 'selectRelibGender', 'relibGenderIndex');
                    } else {
                        //女
                        this.form.relibGender = '02female';
                        this.relibGenderDis = "女";
                        this.setSelectValue('女', 'selectRelibGender', 'relibGenderIndex');
                    }
                    //判断出生日期                    
                    if (this.form.relibIdno.length == 18) {
                        let birthdate = this.form.relibIdno.substring(6, 10) + "-" + this.form.relibIdno.substring(10, 12) + "-" +
                            this.form.relibIdno.substring(12, 14);
                        this.form.relibBirtday = birthdate;
                        this.relibBirtdayDate = new Date(birthdate);
                    }
                    //判断籍贯
                    for (let v of city.cityData) {
                        if (this.form.relibIdno.substring(0, 6) == v.code) {
                            this.form.relibBirtplace = v.title
                        }
                    }
                } else {
                    this.$vux.toast.text('证件号码有误', 'middle');
                }
            }
        },
        //取消添加
        async closeRight (dom) {
            if (dom === 'educationShow') {
                await this.getEducation();
            } else if (dom === 'familyShow') {
                this.getFamily();
            } else if (dom === 'workExpShow') {
                await this.getWorkExp();
            }
            this[dom] = false;
            this.checkChild();
        },
        //岗位弹出框选中事件
        inputPost (res) {
            this.relibApplypostShow = false;
            this.form.relibApplypost = res.id;
            this.currentPostId = res.id;
            this.relibApplypostDis = res.postFname;
        },
        //点击确认
        enter (e) {
            // alert(event.currentTarget.scrollTop)
        },
        handleScroll () { //改变元素#searchBar的top值
            const t = this
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var offsetTop = document.querySelector('#searchBar').offsetTop;
            console.log(scrollTop, "scrollTop")
            document.querySelector('#searchBar').style.top = Number(scrollTop) + 'px';
            t.Top = scrollTop;
            // if (scrollTop <= 200) {
            //     // offsetTop = 300 - Number(scrollTop);

            // } else {
            //     document.querySelector('#searchBar').style.top = '100px';
            // }
        },
    },
    watch: {
        form: {
            handler (val, oldvVal) {
                let tt = {};
                tt.form = val;
                tt.relibApplypostDis = this.relibApplypostDis;
                tt.relibIdentityDis = this.relibIdentityDis;
                tt.relibGenderDis = this.relibGenderDis;
                tt.relibNatalityDis = this.relibNatalityDis;
                tt.relibPoliticalDis = this.relibPoliticalDis;
                tt.relibHealthstaDis = this.relibHealthstaDis;
                tt.relibMaritlstaDis = this.relibMaritlstaDis;
                tt.relibEducatDis = this.relibEducatDis;
                tt.relibWithmeDis = this.relibWithmeDis;
                tt.relibProstatusDis = this.relibProstatusDis;
                tt.relibIsrelativesDis = this.relibIsrelativesDis;
                tt.relibIscriminalDis = this.relibIscriminalDis;
                tt.relibIstattooDis = this.relibIstattooDis;
                tt.relibApplytypeDis = this.relibApplytypeDis;
                tt.relibIscomDis = this.relibIscomDis;
                tt.relibEnrorageDis = this.relibEnrorageDis;
                tt.relibIsgraduDis = this.relibIsgraduDis;
                tt.createTime = new Date();
                tt.id = this.$route.query.id
                tt = JSON.stringify(tt);
                window.localStorage.setItem('resumeInfoForm', tt)
            },
            deep: true
        }
    },
}
</script>
<style lang="less">
.resumeInfo {
    height: 100%;
    background: #f6f6f6;
    .resumeInfoWrap {
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .title {
            background: #fff;
            padding: 30px 0 25px 40px;
            display: flex;
            position: relative;
            justify-content: space-between;
            .title_left {
                display: flex;
                i {
                    margin-left: 20px;
                }
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
                > span {
                    display: inline;
                    color: red;
                }
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
    }
    .fixed {
        position: fixed;
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
.popup_width {
    width: 80%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}
</style>
