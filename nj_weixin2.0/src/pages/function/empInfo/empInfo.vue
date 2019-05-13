<template>
    <div class="resumeInfo">
        <div class="resumeInfoWrap">
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
                <!-- 雇员姓名 -->
                <div class="item_box">
                    <x-input title="姓名<span>*</span>"
                             v-model.trim="form.empnhName"
                             v-verify="form.empnhName"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.empnhName==''"
                          v-remind="form.empnhName"></icon>
                </div>
                <!-- 曾用名 -->
                <div class="item_box">
                    <x-input title="曾用名"
                             v-model.trim="form.empnhPtname"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 民族 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          value-align="left"
                          v-model="empnhNationDis"
                          v-verify="empnhNationDis"
                          @click.native="popupClick('empnhNationShow','empnhNation')">
                        <div slot="title">民族<span>*</span></div>
                    </cell>

                    <icon type="warn"
                          class="error"
                          v-show="empnhNationDis==''"
                          v-remind="empnhNationDis"></icon>
                </div>
                <!-- 证件类型 -->
                <div class="item_box">
                    <cell title="证件类型"
                          is-link
                          value-align="left"
                          v-model="empnhIdtypeDis"
                          v-verify="empnhIdtypeDis"
                          @click.native="popupClick('empnhIdtypeShow','empnhIdtype')">
                        <div slot="title">证件类型<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="empnhIdtypeDis=='请选择'"
                          v-remind="empnhIdtypeDis"></icon>
                </div>
                <!-- 证件号码 -->
                <div class="item_box">
                    <x-input title="证件号码<span>*</span>"
                             v-model.trim="form.empnhIdno"
                             v-verify="form.empnhIdno"
                             :show-clear="false"
                             @on-blur="idNumber"
                             placeholder="未填写">

                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.empnhIdno==''"
                          v-remind="form.empnhIdno"></icon>
                </div>
                <!-- 生效日期 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          value-align="left"
                          v-model="form.empnhSday"
                          v-verify="form.empnhSday"
                          @click.native="popupClick('empnhSdaydateShow','empnhSday')">
                        <div slot="title">生效日期<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.empnhSday=='请选择'"
                          v-remind="form.empnhSday"></icon>
                </div>
                <!-- 证件到期日 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          value-align="left"
                          v-model="form.empnhEday"
                          v-verify="form.empnhEday"
                          @click.native="popupClick('empnhEdaydateShow','empnhEday')">
                        <div slot="title">证件到期日<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.empnhEday=='请选择'"
                          v-remind="form.empnhEday"></icon>
                </div>
                <!-- 性别 -->
                <div class="item_box">
                    <cell title="性别"
                          is-link
                          value-align="left"
                          v-model="empnhGenderDis"
                          v-verify="empnhGenderDis"
                          @click.native="popupClick('empnhGenderShow','empnhGender')">
                        <div slot="title">性别<span>*</span></div>
                    </cell>

                    <icon type="warn"
                          class="error"
                          v-show="empnhGenderDis=='请选择'"
                          v-remind="empnhGenderDis"></icon>
                </div>
                <!-- 出生日期-->
                <div class="item_box">
                    <cell title=""
                          is-link
                          value-align="left"
                          v-model="form.empnhBirthdate"
                          v-verify="form.empnhBirthdate"
                          @click.native="popupClick('empnhBirthdateShow','empnhBirthdate')">
                        <div slot="title">出生日期<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.empnhBirthdate=='请选择'"
                          v-remind="form.empnhBirthdate"></icon>
                </div>
                <!-- 手机号码 -->
                <div class="item_box">
                    <x-input title="手机号码<span>*</span>"
                             v-model.trim="form.empnhMobile"
                             v-verify="form.empnhMobile"
                             :show-clear="false"
                             placeholder="未填写">
                        <!-- @on-blur="phone" -->
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.empnhMobile==''"
                          v-remind="form.empnhMobile"></icon>
                </div>
                <!-- 居住地址 -->
                <div class="item_box">
                    <x-input title="居住地址<span>*</span>"
                             v-model.trim="form.empnhResiaddr"
                             v-verify="form.empnhResiaddr"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.empnhResiaddr==''"
                          v-remind="form.empnhResiaddr"></icon>
                </div>
                <!-- 户籍地址 -->
                <div class="item_box">
                    <x-input title="户籍地址<span>*</span>"
                             v-model.trim="form.empnhRegaddr"
                             v-verify="form.empnhRegaddr"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.empnhRegaddr==''"
                          v-remind="form.empnhRegaddr"></icon>
                </div>
                <!-- 户籍性质 -->
                <div class="item_box">
                    <cell title="户籍性质"
                          is-link
                          value-align="left"
                          v-model="empnhRegtypeDis"
                          v-verify="empnhRegtypeDis"
                          @click.native="popupClick('empnhRegtypeShow','empnhRegtype')">
                        <div slot="title">户籍性质<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="empnhRegtypeDis=='请选择'"
                          v-remind="empnhRegtypeDis"></icon>
                </div>
                <!-- 个人邮箱 -->
                <div class="item_box">
                    <x-input title="个人邮箱"
                             v-model.trim="form.empnhPersmail"
                             v-verify="form.empnhPersmail"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-remind="form.empnhPersmail"></icon>
                </div>
                <!-- QQ号码 -->
                <div class="item_box">
                    <x-input title="QQ号码"
                             v-model.trim="form.empnhQq"
                             v-verify="form.empnhQq"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-remind="form.empnhQq"></icon>
                </div>
                <!-- 微信号 -->
                <div class="item_box">
                    <x-input title="微信号"
                             v-model.trim="form.empnhWechat"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 银行账号 -->
                <div class="item_box">
                    <x-input title="银行账号<span>*</span>"
                             v-model.trim="form.empnhSalaccount"
                             v-verify="form.empnhSalaccount"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.empnhSalaccount==''"
                          v-remind="form.empnhSalaccount"></icon>
                </div>
                <!-- 户名 -->
                <div class="item_box">
                    <x-input title="户名<span>*</span>"
                             v-model.trim="form.empnhSalaccname"
                             v-verify="form.empnhSalaccname"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.empnhSalaccname==''"
                          v-remind="form.empnhSalaccname"></icon>
                </div>
                <!-- 婚姻状况 -->
                <div class="item_box">
                    <cell title="婚姻状况"
                          is-link
                          value-align="left"
                          v-model="empnhMarriageDis"
                          @click.native="popupClick('empnhMarriageShow','empnhMarriage')">
                        <div slot="title">婚姻状况</div>
                    </cell>
                </div>
                <!-- 政治面貌 -->
                <div class="item_box">
                    <cell title="政治面貌"
                          is-link
                          value-align="left"
                          v-model="empnhPoliticalDis"
                          @click.native="popupClick('empnhPoliticalShow','empnhPolitical')">
                        <div slot="title">政治面貌</div>
                    </cell>
                </div>
                <!-- 参加工作时间 -->
                <div class="item_box">
                    <cell title="参加工作时间"
                          is-link
                          value-align="left"
                          v-model="form.empnhFirstwkdate"
                          v-verify="form.empnhFirstwkdate"
                          @click.native="popupClick('empnhFirstwkdateShow','empnhFirstwkdate')">
                        <div slot="title">参加工作时间<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.empnhFirstwkdate=='请选择'?true:false"
                          v-remind="form.empnhFirstwkdate"></icon>
                </div>
                <!-- 职称 -->
                <div class="item_box">
                    <cell title="职称"
                          is-link
                          value-align="left"
                          v-model="empnhTechtilDis"
                          @click.native="popupClick('empnhTechtilShow','empnhTechtil')">
                        <div slot="title">职称</div>
                    </cell>
                </div>
                <!-- 职称专业 -->
                <div class="item_box">
                    <x-input title="职称专业"
                             v-model.trim="form.empnhTechspec"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 职称取得时间 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          value-align="left"
                          v-model="form.empnhTechdate"
                          @click.native="popupClick('empnhTechdateShow','empnhTechdate')">
                        <div slot="title">职称取得时间</div>
                    </cell>
                </div>
                <!-- 备注 -->
                <x-textarea :max="300"
                            title="备注"
                            :height="95"
                            v-model="form.note"
                            placeholder="未填写"
                            :show-counter="false"></x-textarea>
            </group>
            <div class="title">
                <div class="title_left">
                    <img src="../../../../static/function/educatInfo.png"
                         alt="">
                    <h3>学历信息管理</h3>
                </div>

                <span @click="goTo('empEducationShow')">添加</span>
            </div>
            <group label-align="left"
                   gutter="0"
                   class="form childForm">
                <div class="item_box"
                     v-for="item in educationList"
                     v-if="educationList.length!==0">
                    <cell :value=item.edSchool
                          is-link
                          @click.native="goTo('empEducationShow',item.id)"></cell>
                </div>
                <div class="item_box"
                     v-if="educationList.length<1">
                    <cell value='学历信息1'
                          is-link
                          @click.native="goTo('empEducationShow')"></cell>
                </div>
                <div class="item_box"
                     v-if="educationList.length<2">
                    <cell value='学历信息2'
                          is-link
                          @click.native="goTo('empEducationShow')"></cell>
                </div>
            </group>
            <div class="title">
                <div class="title_left">
                    <img src="../../../../static/function/work.png"
                         alt="">
                    <h3>工作经历管理</h3>
                </div>

                <span @click="goTo('empWorkExpShow')">添加</span>
            </div>
            <group label-align="left"
                   gutter="0"
                   class="form childForm">
                <div class="item_box"
                     v-for="item in workExpList"
                     v-if="workExpList.length!==0">
                    <cell :value=item.weComp
                          @click.native="goTo('empWorkExpShow',item.id)"
                          is-link></cell>
                </div>
                <div class="item_box"
                     v-if="workExpList.length<1">
                    <cell value='工作经历1'
                          @click.native="goTo('empWorkExpShow')"
                          is-link></cell>
                </div>
                <div class="item_box"
                     v-if="workExpList.length<2">
                    <cell value='工作经历2'
                          @click.native="goTo('empWorkExpShow')"
                          is-link></cell>
                </div>
                <div class="item_box"
                     v-if="workExpList.length<3">
                    <cell value='工作经历3'
                          @click.native="goTo('empWorkExpShow')"
                          is-link></cell>
                </div>
            </group>
            <div class="title">
                <div class="title_left">
                    <img src="../../../../static/function/work.png"
                         alt="">
                    <h3>家庭成员管理</h3>
                </div>

                <span @click="goTo('empFamilyShow')">添加</span>
            </div>
            <group label-align="left"
                   gutter="0"
                   class="form childForm">
                <div class="item_box"
                     v-for="item in familyList">
                    <cell :value=item.fmCname
                          @click.native="goTo('empFamilyShow',item.id)"
                          is-link></cell>
                </div>
            </group>
            <div class="save_button">
                <x-button type="primary"
                          class="x_button"
                          @click.native="save"
                          action-type="button">保存</x-button>
            </div>
        </div>
        <!-- 民族 -->
        <van-popup v-model="empnhNationShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="empnhNationIndex"
                        :columns=selectNation
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 证件类型 -->
        <van-popup v-model="empnhIdtypeShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="empnhIdtypeIndex"
                        :columns=selectIdtype
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 性别 -->
        <van-popup v-model="empnhGenderShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="empnhGenderIndex"
                        :columns=selectGender
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 户籍性质 -->
        <van-popup v-model="empnhRegtypeShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="empnhRegtypeIndex"
                        :columns=selectRegtype
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 婚姻状况 -->
        <van-popup v-model="empnhMarriageShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="empnhMarriageIndex"
                        :columns=selectMarriage
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 政治面貌 -->
        <van-popup v-model="empnhPoliticalShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="empnhPoliticalIndex"
                        :columns=selectPolitical
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 职称 -->
        <van-popup v-model="empnhTechtilShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="empnhTechtilIndex"
                        :columns=selectTechnicaltitle
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 生效日期 -->
        <van-popup v-model="empnhSdaydateShow"
                   position="bottom">
            <van-datetime-picker v-model="empnhSdayDate"
                                 type="date"
                                 :min-date="minEmpnhSday"
                                 :max-date="maxEmpnhSday"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 证件到期日-->
        <van-popup v-model="empnhEdaydateShow"
                   position="bottom">
            <van-datetime-picker v-model="empnhEdayDate"
                                 type="date"
                                 :min-date="minEmpnhEday"
                                 :max-date="maxEmpnhEday"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 出生日期 -->
        <van-popup v-model="empnhBirthdateShow"
                   position="bottom">
            <van-datetime-picker v-model="empnhBirthdateDate"
                                 type="date"
                                 :min-date="minEmpnhBirthdate"
                                 :max-date="maxEmpnhBirthdate"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 参加工作时间-->
        <van-popup v-model="empnhFirstwkdateShow"
                   position="bottom">
            <van-datetime-picker v-model="empnhFirstwkdateDate"
                                 type="date"
                                 :min-date="minEmpnhFirstwkdate"
                                 :max-date="maxEmpnhFirstwkdate"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <!-- 职称取得时间-->
        <van-popup v-model="empnhTechdateShow"
                   position="bottom">
            <van-datetime-picker v-model="empnhTechdateDate"
                                 type="date"
                                 :min-date="minEmpnhTechdate"
                                 :max-date="maxEmpnhTechdate"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <van-popup v-model="empEducationShow"
                   position="right"
                   :close-on-click-overlay=false
                   class="right_popup">
            <empEducation :id=currentId
                          @cancel="closeRight('empEducationShow')"
                          v-if='empEducationShow'></empEducation>
        </van-popup>
        <!-- <div :class="slideClass" class="slideRight">
		    <empEducation :id=currentId @cancel="closeRight('empEducationShow')" v-show="empEducationShow"></empEducation>
			<empFamily :id=currentId @cancel="closeRight('empFamilyShow')" v-show="empFamilyShow"></empFamily>
			<empWorkExp :id=currentId @cancel="closeRight('empWorkExpShow')" v-show="empWorkExpShow"></empWorkExp>
		</div> -->
        <van-popup v-model="empFamilyShow"
                   position="right"
                   :close-on-click-overlay=false
                   class="right_popup">
            <empFamily :id=currentId
                       @cancel="closeRight('empFamilyShow')"
                       v-if='empFamilyShow'></empFamily>
        </van-popup>
        <van-popup v-model="empWorkExpShow"
                   position="right"
                   :close-on-click-overlay=false
                   class="right_popup">
            <empWorkExp :id=currentId
                        @cancel="closeRight('empWorkExpShow')"
                        v-if='empWorkExpShow'></empWorkExp>
        </van-popup>
    </div>
</template>
<script>
import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
import { Group, Cell, XInput, XTextarea, Icon } from 'vux'
import valid from '@/lib/pub_valid'
import city from '@/lib/cityData'
import empEducation from '@/pages/function/empInfo/empEducation'
import empFamily from '@/pages/function/empInfo/empFamily'
import empWorkExp from '@/pages/function/empInfo/empWorkExp'
export default {
    data () {
        return {
            slideClass: '',
            currentId: '',
            empEducationShow: false,
            empFamilyShow: false,
            empWorkExpShow: false,
            curDom: "",
            curDomShow: "",
            empnhSdayDate: new Date(),
            empnhEdayDate: new Date(),
            empnhBirthdateDate: new Date(),
            empnhFirstwkdateDate: new Date(),
            empnhTechdateDate: new Date(),
            minEmpnhSday: new Date(1900, 10, 1),
            maxEmpnhSday: new Date(2099, 12, 31),
            minEmpnhEday: new Date(1900, 10, 1),
            maxEmpnhEday: new Date(2099, 12, 31),
            minEmpnhBirthdate: new Date(1900, 10, 1),
            maxEmpnhBirthdate: new Date(2099, 12, 31),
            minEmpnhFirstwkdate: new Date(1900, 10, 1),
            maxEmpnhFirstwkdate: new Date(2099, 12, 31),
            minEmpnhTechdate: new Date(1900, 10, 1),
            maxEmpnhTechdate: new Date(2099, 12, 31),
            form: {
                empnhName: "",                  //姓名
                empnhPtname: "",                //曾用名
                empnhNation: "",                //民族
                empnhIdtype: "",                //证件类型
                empnhIdno: "",                  //证件号码
                empnhSday: "请选择",             //生效日期
                empnhEday: "请选择",             //证件到期日
                empnhGender: "",                //性别
                empnhBirthdate: "请选择",        //出生日期
                empnhMobile: "",                //手机号码
                empnhResiaddr: "",              //居住地址
                empnhRegaddr: "",               //户籍地址
                empnhRegtype: "",               //户籍性质
                empnhPersmail: "",             //个人邮箱
                empnhQq: "",                    //QQ号码
                empnhWechat: "",                //微信号
                empnhSalaccount: "",            //银行账号
                empnhSalaccname: "",            //户名
                empnhMarriage: "",              //婚姻状况
                empnhPolitical: "请选择",        //政治面貌
                empnhFirstwkdate: "请选择",      //参加工作时间
                empnhTechtil: "请选择",          //职称
                empnhTechspec: "",              //职称专业
                empnhTechdate: "请选择",         //职称取得时间
                note: "",                       //备注
            },
            empnhNationDis: "请选择",
            empnhIdtypeDis: "请选择",
            empnhGenderDis: "请选择",
            empnhRegtypeDis: "请选择",
            empnhMarriageDis: "请选择",
            empnhPoliticalDis: "请选择",
            empnhTechtilDis: "请选择",
            selectGender: [],
            selectTechnicaltitle: [],
            selectMarriage: [],
            selectPolitical: [],
            selectNation: [],
            selectIdtype: [],
            selectRegtype: [],
            selectSalbank: [],
            dateShow: false,
            popupShow: false,
            empnhNationShow: false,
            empnhIdtypeShow: false,
            empnhGenderShow: false,
            empnhRegtypeShow: false,
            empnhMarriageShow: false,
            empnhPoliticalShow: false,
            empnhTechtilShow: false,
            empnhSdaydateShow: false,
            empnhEdaydateShow: false,
            empnhBirthdateShow: false,
            empnhFirstwkdateShow: false,
            empnhTechdateShow: false,
            empnhNationIndex: 0,
            empnhIdtypeIndex: 0,
            empnhGenderIndex: 0,
            empnhRegtypeIndex: 0,
            empnhMarriageIndex: 0,
            empnhPoliticalIndex: 0,
            empnhTechtilIndex: 0,
            workExpList: [],
            educationList: [],
            familyList: [],
            idNumberVaild: false,
            phoneVaild: false,
        }
    },
    verify: {
        form: {
            empnhName: "required",
            empnhIdno: ["required", "idNumber"],
            empnhSday: "required",
            empnhEday: "required",
            empnhBirthdate: "required",
            empnhMobile: ["required", "mobile"],
            empnhResiaddr: "required",
            empnhRegaddr: "required",
            empnhQq: "number",
            empnhPersmail: "email",
            empnhSalbank: "required",
            empnhSalaccount: ["required", "number"],
            empnhSalaccname: "required",
            empnhFirstwkdate: "required"
        },
        empnhNationDis: "required",
        empnhIdtypeDis: "required",
        empnhGenderDis: "required",
        empnhRegtypeDis: "required",
    },
    components: {
        Group,
        Cell,
        XInput,
        Icon,
        XTextarea,
        empEducation,
        empFamily,
        empWorkExp
    },
    mounted () {
        this.getData();
        this.getSelect();
    },
    methods: {
        //跳转
        goTo (name, id) {            ;


            this[name] = true;
            this.currentId = id;
            // this.slideClass = 'slideMove';
            // document.querySelector('.resumeInfoWrap').addEventListener('touchmove',function(e){
            // document.getElementsByClassName('resumeInfoWrap')[0].style.overflow = 'hidden';
            // },false);
            // this.$router.push({ name: name, query: { id: id } })
        },
        //证件号码验证
        idNumber () {
            if (this.form.empnhIdno !== '') {
                if (valid.val_identity(this.form.empnhIdno)) {
                    //判断性别
                    if (parseInt(this.form.empnhIdno.substr(16, 1)) % 2 == 1) {
                        //男
                        this.setSelectValue('男', 'selectGender', 'empnhGenderIndex');
                    } else {
                        //女
                        this.setSelectValue('女', 'selectGender', 'empnhGenderIndex');
                    }
                    //判断出生日期                    
                    if (this.form.empnhIdno.length == 18) {
                        let birthdate = this.form.empnhIdno.substring(6, 10) + "-" + this.form.empnhIdno.substring(10, 12) + "-" +
                            this.form.empnhIdno.substring(12, 14);
                        this.form.empnhBirthdate = birthdate;
                        this.empnhBirthdateDate = new Date(birthdate);
                    }
                    //判断籍贯
                    for (let v of city.cityData) {
                        if (this.form.empnhIdno.substring(0, 6) == v.code) {
                            this.form.empnhRegaddr = v.title
                        }
                    }
                } else {
                    this.$vux.toast.text('证件号码有误', 'middle');
                }
            }
        },
        //手机号验证
        phone () {
            if (this.form.empnhMobile == '') {
                this.phoneVaild = true;
            } else {
                if (valid.val_mobile(this.form.empnhMobile)) {
                    this.phoneVaild = false;
                    return;
                } else {
                    this.phoneVaild = true;
                    this.$vux.toast.text('手机号输入错误', 'middle');
                }
            }
        },
        //保存
        save () {
            console.log(this.$verify.check());
            const t = this;
            if (this.$verify.check()) {
                const data = deepCopy(t.form);
                data._mt = "wxEmpEmpnh.addOrUpd";
                data.companyId = pubsource.companyId;
                data.id = window.localStorage.getItem('empId');
                for (const dat in data) {
                    if (data[dat] === "" || data[dat] === "请选择") {
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
                        this.$router.push({
                            name: 'function'
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
                this.$vux.toast.text('请检查填写信息');
            }
        },
        //点击弹出框
        popupClick (domShow, dom) {
            this.curDom = dom;
            this.curDomShow = domShow;
            this[domShow] = true;
        },
        //底部弹出窗确认事件
        confirm (value) {
            if (this.curDomShow.indexOf("dateShow") != -1) {
                if (this.curDom == 'empnhSday') {
                    this.minEmpnhEday = new Date(value);
                } else if (this.curDom == 'empnhEday') {
                    this.maxEmpnhSday = new Date(value)
                }
                value = new Date(value).format('yyyy-MM-dd');
                this.form[this.curDom] = value
            } else {
                this.form[this.curDom] = value.key;
                let str = this.curDom
                str += "Dis";
                this[str] = value.text;
            }
            this[this.curDomShow] = false;

        },
        //底部弹出窗取消事件
        cancel (value) {
            this[this.curDomShow] = false;
        },
        //查询下拉列表
        getSelect () {
            const t = this;
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: 'nationtype,idtype,registerproperty,marrystatus,political,techlevel,gender'
            }).then(res => {
                if (isSuccess(res, t)) {
                    t.selectData(res.data.content[0].value[0].paramList, "selectNation");
                    t.selectData(res.data.content[0].value[1].paramList, "selectIdtype");
                    t.selectData(res.data.content[0].value[2].paramList, "selectRegtype");
                    t.selectData(res.data.content[0].value[3].paramList, "selectMarriage");
                    t.selectData(res.data.content[0].value[4].paramList, "selectPolitical");
                    t.selectData(res.data.content[0].value[5].paramList, "selectTechnicaltitle");
                    t.selectData(res.data.content[0].value[6].paramList, "selectGender");
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
        //获取员工信息
        getData () {
            const t = this;
            const data = {
                _mt: 'wxEmpEmpnh.getById',
                companyId: pubsource.companyId,
                id: window.localStorage.getItem('empId'),
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    t.form.empnhName = !data.empnhName ? "" : data.empnhName;
                    t.form.empnhPtname = !data.empnhPtname ? "" : data.empnhPtname;
                    t.form.empnhNation = data.empnhNation;
                    t.form.empnhIdtype = data.empnhIdtype;
                    t.form.empnhIdno = !data.empnhIdno ? "" : data.empnhIdno;
                    t.form.empnhSday = data.empnhSday ? data.empnhSday : '请选择';
                    t.form.empnhEday = data.empnhEday ? data.empnhEday : '请选择';
                    t.form.empnhGender = data.empnhGender;
                    t.form.empnhBirthdate = data.empnhBirthdate ? data.empnhBirthdate : '请选择';
                    t.form.empnhMobile = data.empnhMobile;
                    t.form.empnhResiaddr = !data.empnhResiaddr ? "" : data.empnhResiaddr;
                    t.form.empnhRegaddr = !data.empnhRegaddr ? "" : data.empnhRegaddr;
                    t.form.empnhRegtype = data.empnhRegtype;
                    t.form.empnhPersmail = !data.empnhPersmail ? "" : data.empnhPersmail;
                    t.form.empnhQq = !data.empnhQq ? "" : data.empnhQq;
                    t.form.empnhWechat = !data.empnhWechat ? "" : data.empnhWechat;
                    t.form.empnhSalaccount = !data.empnhSalaccount ? "" : data.empnhSalaccount;
                    t.form.empnhSalaccname = !data.empnhSalaccname ? "" : data.empnhSalaccname;
                    t.form.empnhMarriage = data.empnhMarriage;
                    t.form.empnhPolitical = data.empnhPolitical;
                    t.form.empnhFirstwkdate = data.empnhFirstwkdate ? data.empnhFirstwkdate : '请选择';
                    t.form.empnhTechtil = data.empnhTechtil;
                    t.form.empnhTechspec = !data.empnhTechspec ? "" : data.empnhTechspec;
                    t.form.empnhTechdate = data.empnhTechdate ? data.empnhTechdate : '请选择';
                    t.form.note = data.note;
                    t.empnhNationDis = data.empnhNationDis ? data.empnhNationDis : '请选择';
                    t.empnhIdtypeDis = data.empnhIdtypeDis ? data.empnhIdtypeDis : '请选择';
                    t.empnhGenderDis = data.empnhGenderDis ? data.empnhGenderDis : '请选择';
                    t.empnhRegtypeDis = data.empnhRegtypeDis ? data.empnhRegtypeDis : '请选择';
                    t.empnhMarriageDis = data.empnhMarriageDis ? data.empnhMarriageDis : '请选择';
                    t.empnhPoliticalDis = data.empnhPoliticalDis ? data.empnhPoliticalDis : '请选择';
                    t.empnhTechtilDis = data.empnhTechtilDis ? data.empnhTechtilDis : '请选择';
                    console.log(data, "data");
                    t.empnhSdayDate = !data.empnhSday ? new Date() : new Date(data.empnhSday);
                    t.empnhEdayDate = !data.empnhEday ? new Date() : new Date(data.empnhEday);
                    t.empnhBirthdateDate = !data.empnhBirthdate ? new Date() : new Date(data.empnhBirthdate);
                    t.empnhFirstwkdateDate = !data.empnhFirstwkdate ? new Date() : new Date(data.empnhFirstwkdate);
                    t.empnhTechdateDate = !data.empnhTechdate ? new Date() : new Date(data.empnhTechdate);
                    t.setSelectValue(data.empnhNationDis, 'selectNation', 'empnhNationIndex');
                    t.setSelectValue(data.empnhIdtypeDis, 'selectIdtype', 'empnhIdtypeIndex');
                    t.setSelectValue(data.empnhGenderDis, 'selectGender', 'empnhGenderIndex');
                    t.setSelectValue(data.empnhRegtypeDis, 'selectRegtype', 'empnhRegtypeIndex');
                    t.setSelectValue(data.empnhMarriageDis, 'selectMarriage', 'empnhMarriageIndex');
                    t.setSelectValue(data.empnhPoliticalDis, 'selectPolitical', 'empnhPoliticalIndex');
                    t.setSelectValue(data.empnhTechtilDis, 'selectTechnicaltitle', 'empnhTechtilIndex');
                    t.getWorkExp();
                    t.getFamily();
                    t.getEducation();
                }
            }).catch((err) => {
                t.$notify({
                    message: '网络错误',
                    duration: 1500,
                    background: '#f44'
                });
            })
                .finally(() => {
                    t.$store.commit('hideLoading');
                });
        },
        //获取工作经历
        getWorkExp () {
            const t = this;
            const data = {
                _mt: 'wxEmpWorkExp.getByEmpId',
                companyId: pubsource.companyId,
                empId: window.localStorage.getItem('empId'),
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    t.workExpList = JSON.parse(res.data.content[0].value);
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
                _mt: 'wxEmpFamily.getByEmpId',
                companyId: pubsource.companyId,
                empId: window.localStorage.getItem('empId'),
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    t.familyList = JSON.parse(res.data.content[0].value);
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
                _mt: 'wxEmpEducation.getByEmpId',
                companyId: pubsource.companyId,
                empId: window.localStorage.getItem('empId'),
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.educationList = JSON.parse(res.data.content[0].value);
                    console.log(data, "getEducation")
                }
            }).catch((err) => {
                this.$vux.tot.$notify({
                    message: '网络错误',
                    duration: 1500,
                    background: '#f44'
                });            }).finally(() => {
                t.$store.commit('hideLoading');
            });
        },
        //取消添加
        closeRight (dom) {

            if (dom === 'empEducationShow') {
                this.getEducation();
            } else if (dom === 'empFamilyShow') {
                this.getFamily();
            } else if (dom === 'empWorkExpShow') {
                this.getWorkExp();
            }
            this[dom] = false;
            // this.slideClass = '';
            // document.getElementsByClassName('resumeInfoWrap')[0].style.overflow = 'scroll';
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
    }
}
.slideRight {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    overflow: auto;
    right: -100%;
    z-index: 1001;
    background: #fff;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slideMove {
    right: 0;
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
