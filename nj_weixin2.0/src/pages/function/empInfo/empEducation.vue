<template>
    <div class="empEducation">
        <div class="empEducationWrap">
            <group label-align="left"
                   gutter="0"
                   class="form">
                <!-- 教育程度 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="edEducationlevelDis"
                          v-verify="form.edEducationlevel"
                          @click.native="popupClick('edEducationlevelShow','edEducationlevel')">
                        <div slot="title">教育程度<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="edEducationlevelDis=='请选择'?true:false"
                          v-remind="form.edEducationlevel"></icon>
                    <x-input title="教育程度<span>*</span>"
                             v-if="disabled"
                             v-model="edEducationlevelDis"
                             :disabled="disabled"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 是否最高学历 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="edIshighestDis"
                          v-verify="form.edIshighest"
                          @click.native="popupClick('edIshighestShow','edIshighest')">
                        <div slot="title">是否最高学历<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="edIshighestDis=='请选择'?true:false"
                          v-remind="form.edIshighest"></icon>
                    <x-input title="是否最高学历<span>*</span>"
                             v-if="disabled"
                             v-model="edIshighestDis"
                             :disabled="disabled"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 国家 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="edCuntryDis"
                          v-verify="form.edCuntry"
                          @click.native="popupClick('edCountryShow','edCuntry')">
                        <div slot="title">国家<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="edCuntryDis=='请选择'?true:false"
                          v-remind="form.edCuntry"></icon>
                    <x-input title="国家<span>*</span>"
                             v-if="disabled"
                             v-model="edCuntryDis"
                             :disabled="disabled"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 学校 -->
                <div class="item_box">
                    <x-input title="学校<span>*</span>"
                             v-model="form.edSchool"
                             v-verify="form.edSchool"
                             :disabled="disabled"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.edSchool==''?true:false"
                          v-remind="form.edSchool"></icon>
                </div>
                <!-- 学位 -->
                <div class="item_box">
                    <x-input title="学位"
                             v-model="form.edDegree"
                             v-verify="form.edDegree"
                             :disabled="disabled"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 专业 -->
                <div class="item_box">
                    <x-input title="专业"
                             v-model="form.edSpecialty"
                             v-verify="form.edSpecialty"
                             :disabled="disabled"
                             :show-clear="false"
                             :placeholder="disabled?'未填写':'请填写'">
                    </x-input>
                </div>
                <!-- 录取方式 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="recruitTypeDis"
                          v-verify="form.recruitType"
                          @click.native="popupClick('recruitTypeShow','recruitType')">
                        <div slot="title">录取方式</div>
                    </cell>
                    <x-input title="录取方式"
                             v-if="disabled"
                             v-model="recruitTypeDis"
                             :show-clear="false"
                             :disabled="disabled"
                             placeholder="未填写">
                    </x-input>
                    <icon type="warn"
                          class="error"
                          v-show="form.recruitType===''"
                          v-remind="form.recruitType"></icon>
                </div>
                <!-- 开始时间 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.edSdate"
                          v-verify="form.edSdate"
                          @click.native="popupClick('edSdateShow','edSdate')">
                        <div slot="title">开始时间<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.edSdate=='请选择'?true:false"
                          v-remind="form.edSdate"></icon>
                    <x-input title="开始时间<span>*</span>"
                             v-if="disabled"
                             v-model="form.edSdate"
                             :disabled="disabled"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 结束时间 -->
                <div class="item_box">
                    <cell title=""
                          is-link
                          v-if="!disabled"
                          value-align="left"
                          v-model="form.edEdate"
                          v-verify="form.edEdate"
                          @click.native="popupClick('edEdateShow','edEdate')">
                        <div slot="title">毕业时间<span>*</span></div>
                    </cell>
                    <icon type="warn"
                          class="error"
                          v-show="form.edEdate=='请选择'?true:false"
                          v-remind="form.edEdate"></icon>
                    <x-input title="毕业时间<span>*</span>"
                             v-if="disabled"
                             v-model="form.edEdate"
                             :disabled="disabled"
                             :show-clear="false"
                             placeholder="未填写">
                    </x-input>
                </div>
                <!-- 附件 -->
                <div class="item_box file">
                    <label>附件</label>
                    <div class="file_box "
                         v-if="!disabled"
                         :class="file==''?'':'justify'">
                        <p class="fileName"
                           v-if="file!=''"
                           :disabled="disabled"
                           @click="downLoadFile">
                            {{file.name}}
                        </p>
                        <div class="upload"
                             v-else>
                            <input type="file"
                                   @change="upLoadFile($event)">
                            +
                        </div>
                    </div>
                    <div class="file_box justify"
                         v-if="disabled">
                        <p class="fileName"
                           :disabled="disabled"
                           @click="file.name==='未上传'?'':downLoadFile()">
                            {{file.name}}
                        </p>
                    </div>
                </div>
                <!-- 备注 -->
                <x-textarea :max="300"
                            title="备注"
                            :height="95"
                            v-model="form.note"
                            :disabled="disabled"
                            :placeholder="disabled?'未填写':'请填写'"
                            :show-counter="true"></x-textarea>

            </group>
            <!--            <div class="save_button">
                <x-button type="primary"
                          class="x_button"
                          @click.native="save"
                          action-type="button">保存</x-button>
            </div> -->
            <div class="save_button">
                <x-button type="default"
                          class="x_button button_left"
                          action-type="button"
                          @click.native="back">返回</x-button>
                <x-button type="primary"
                          class="x_button"
                          @click.native="save"
                          v-if="!disabled">保存</x-button>
            </div>
        </div>
        <van-popup v-model="edEducationlevelShow"
                   position="bottom">
            <van-picker ref="edEducationlevelPicker"
                        :defaultIndex="edEducationlevelIndex"
                        :columns=selectEdEducationlevel
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <!-- 招生范围 -->
        <van-popup v-model="recruitTypeShow"
                   position="bottom">
            <van-picker ref="vanPicker"
                        :defaultIndex="recruitTypeIndex"
                        :columns=selectRecruitType
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />

        </van-popup>
        <van-popup v-model="edIshighestShow"
                   position="bottom">
            <van-picker ref="picker"
                        :defaultIndex="edIshighestIndex"
                        :columns=selectEdIshighest
                        show-toolbar
                        @confirm="confirm"
                        @cancel="cancel" />
        </van-popup>
        <van-popup v-model="edSdateShow"
                   position="bottom">
            <van-datetime-picker v-model="edSdateDate"
                                 type="date"
                                 :min-date="minEdSdate"
                                 :max-date="maxEdSdate"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <van-popup v-model="edEdateShow"
                   position="bottom">
            <van-datetime-picker v-model="edEdateDate"
                                 type="date"
                                 :min-date="minEdEdate"
                                 :max-date="maxEdEdate"
                                 @confirm="confirm"
                                 @cancel="cancel" />
        </van-popup>
        <van-popup v-model="edCountryShow"
                   position="right"
                   :lock-scroll='true'
                   class="right_popup">
            <searchCountry @inputCountry="inputCountry"
                           v-if="edCountryShow"
                           :currentId="currentId"></searchCountry>
        </van-popup>
        <!-- <van-popup v-model="edCountryShow">内容</van-popup> -->
    </div>
</template>
<script>
import { getDataLevelUserLogin, uploadFile, getDataLevelUserLoginNew } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
import { Group, Cell, XInput, XTextarea, Icon, Popup } from 'vux'
import searchCountry from '../../../components/search/searchCountry'
export default {
    data () {
        return {
            list: [],
            file: '',
            filekey: '',
            fileName: '',
            curDom: "",
            curDomShow: "",
            edEdateDate: new Date(),
            edSdateDate: new Date(),
            edEducationlevelIndex: 0,
            recruitTypeIndex: 0,
            edIshighestIndex: 0,
            currentId: '1127',
            minEdSdate: new Date(1900, 1, 1),
            maxEdSdate: new Date(2099, 12, 31),
            minEdEdate: new Date(1900, 1, 1),
            maxEdEdate: new Date(2099, 12, 31),
            form: {
                edEducationlevel: "",       // 教育程度
                edIshighest: "",           // 是否最高学位
                edCuntry: "1127",               // 国家
                edSchool: "",               // 学校
                edDegree: "",               // 学位
                edSpecialty: "",            // 专业
                recruitType: "",
                edSdate: "请选择",          // 开始时间
                edEdate: "请选择",          // 结束时间
                note: "",                   // 备注
                fileKey: ""                  //
            },
            edEducationlevelDis: "请选择",
            edIshighestDis: "请选择",
            recruitTypeDis: "请选择",
            edCuntryDis: "中国",
            edEducationlevelShow: false,
            edIshighestShow: false,
            recruitTypeShow: false,
            edCountryShow: false,
            edSdateShow: false,
            edEdateShow: false,
            selectEdEducationlevel: [],
            selectEdIshighest: [],
            selectEdCountry: [],
            selectRecruitType: [],
        }
    },
    verify: {
        form: {
            edEducationlevel: "required",
            edIshighest: "required",
            edCuntry: "required",
            edSchool: "required",
            edSdate: "required",
            edEdate: "required",
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
        XTextarea,
        searchCountry,
        Popup
    },
    mounted () {
        this.getData();
        this.getSelect();

    },
    methods: {
        //保存
        save () {
            console.log(this.$verify.check());
            const t = this;
            if (this.$verify.check()) {
                const data = deepCopy(t.form);
                data._mt = "wxEmpEducation.addOrUpd";
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
            // document.getElementsByClassName('empEducationWrap')[0].style.overflow = 'hidden';
        },
        //底部弹出确定事件
        confirm (value) {
            if (this.curDomShow.indexOf("dateShow") != -1) {
                if (this.curDom == 'edSdate') {
                    this.minEdEdate = new Date(value);
                } else if (this.curDom == 'edEdate') {
                    this.maxEdSdate = new Date(value)
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
        //底部弹出取消事件
        cancel (value) {
            this[this.curDomShow] = false;
        },
        //查询下拉列表
        getSelect () {
            const t = this;
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: 'education,yesno,recruitType'
            }).then(res => {
                if (isSuccess(res, t)) {
                    t.selectData(res.data.content[0].value[0].paramList, "selectEdEducationlevel");
                    t.selectData(res.data.content[0].value[1].paramList, "selectEdIshighest");
                    t.selectData(res.data.content[0].value[2].paramList, "selectRecruitType");
                    console.log(t.selectEdEducationlevel, "selectEdEducationlevel");
                    console.log(t.selectEdIshighest, "selectEdIshighest")
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
                _mt: 'wxEmpEducation.getById',
                companyId: pubsource.companyId,
                id: t.id,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = JSON.parse(res.data.content[0].value);
                    t.form.edEducationlevel = data.edEducationlevel;
                    t.form.edIshighest = data.edIshighest;
                    t.form.edCuntry = data.edCuntry ? data.edCuntry : '1127';
                    t.currentId = t.form.edCuntry;
                    t.form.edSchool = data.edSchool ? data.edSchool : '';
                    t.form.edDegree = data.edDegree ? data.edDegree : '';
                    t.form.edSpecialty = data.edSpecialty ? data.edDegree : '';
                    t.form.edSdate = data.edSdate;
                    t.form.edEdate = data.edEdate;
                    t.form.note = data.note;
                    t.edEducationlevelDis = data.edEducationlevelDis;
                    t.edIshighestDis = data.edIshighestDis;
                    t.edCuntryDis = data.edCuntryDis ? data.edCuntryDis : '中国';;
                    if (data.fileKey) {
                        t.fileName = data.fileKey.split(':')[0];
                        t.file = { name: data.fileKey.split(':')[0] }
                        t.filekey = data.fileKey.split(':')[1]
                    } else {
                        t.file = {
                            name: '未上传'
                        }
                    }
                    t.setSelectValue(data.edEducationlevel, 'selectEdEducationlevel', 'edEducationlevelIndex');
                    t.setSelectValue(data.edIshighest, 'selectEdIshighest', 'edIshighestIndex');
                    t.setSelectValue(data.recruitType, 'selectRecruitType', 'recruitTypeIndex');
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
        //上传文件
        upLoadFile (event) {
            const t = this
            var file = event.target.files;
            const formData = new FormData()
            formData.append('upfile', file[0])
            console.log(formData)
            uploadFile(formData).then(res => {
                console.log(res, "res")
                if (res.status == '200') {
                    let fileKey = ''
                    let fileName = ''
                    for (const key in res.data) {
                        t.file = { name: key }
                        t.filekey = res.data[key]
                        t.form.fileKey = key + ':' + res.data[key]
                    }
                    // 用于展示，下载
                    t.$notify({
                        message: '上传成功',
                        duration: 1500,
                        background: '#1989fa'
                    });
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
        //下载文件
        downLoadFile () {
            const t = this
            let data = {
                _mt: 'userMgmt.getfiletoken',
                isprivate: true,
                logType: '下载',
                filekey: t.filekey,
                expiresecs: 180,
                companyId: pubsource.companyId,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let storage = window.localStorage;
                    console.log(storage.token, "token")
                    let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.fileName) + "&_tk=" + encodeURIComponent(storage.token)
                    let link = document.createElement('a');
                    link.href = doclink;
                    link.download = "downloadfiletemp";
                    link.click();
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
        //获取国家
        inputCountry (res) {
            document.getElementsByClassName('empEducationWrap')[0].style.overflow = 'scroll';
            this.edCountryShow = false;
            this.form.edCuntry = res.id;
            this.currentId = res.id;
            this.edCuntryDis = res.name;

        },
        //取消
        back () {
            this.$emit('cancel');
            document.getElementsByClassName('empEducationWrap')[0].scrollTop = '0'
        }
    },
}
</script>
<style lang="less">
.empEducation {
    background: #f6f6f6;
    height: 100%;
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
            margin-bottom: 100px;
            .x_button {
                color: #fff;
                font-size: 34px;
                width: 300px;
                height: 80px;
                flex: 1;
            }

            .button_left {
                color: #339afe;
                background: #fff;
                border: 2px solid #339afe !important;
                margin-right: 5%;
            }

            .weui-btn + .weui-btn {
                margin-top: 0;
            }
        }
        .file {
            display: flex;
            padding: 0px 36px 0px 30px;
            align-items: center;
            > label {
                width: 220px !important;
                font-size: 28px;
                padding-right: 15px;
                color: #333333;
            }
            .file_box {
                flex: 1;
                text-align: left;
                padding: 30px 0;
                font-size: 28px;
                color: #333333;
                line-height: 1.3;
                justify-content: flex-end;
                display: flex;
                > p[disabled] {
                    color: #888;
                }
                .upload {
                    width: 250px;
                    height: 170px;
                    border: 1px dashed #d9d9d9;
                    font-size: 60px;
                    color: #ccc;
                    text-align: center;
                    line-height: 170px;
                    position: relative;
                    > input {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 250px;
                        height: 170px;
                        opacity: 0;
                    }
                }
                .fileName {
                    word-break: break-all;
                }
            }
            .justify {
                justify-content: flex-start;
            }
        }
    }
    .van-popup--right {
        top: 50% !important;
    }
    .right_popup {
        width: 80%;
        height: 100%;
    }
}
</style>
