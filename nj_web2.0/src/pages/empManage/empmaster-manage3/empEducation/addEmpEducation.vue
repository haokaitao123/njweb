<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>
                    &nbsp;{{logType}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="close-round"
                          size="16"></Icon>
                </Button>
            </div>
            <Row>
                <Form :model="form"
                      label-position="right"
                      :rules="ruleValidate"
                      ref="form"
                      :label-width="110">
                    <i-col span="11">
                        <FormItem label="学校"
                                  prop="edSchool">
                            <Input v-model="form.edSchool"
                                   :disabled="disabled"
                                   placeholder="请输入学校"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="11"
                           offset="1">
                        <FormItem label="专业"
                                  prop="edSpecialty">
                            <Input v-model="form.edSpecialty"
                                   :disabled="disabled"
                                   placeholder="请输入专业"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem label="学位"
                                  prop="edDegree">
                            <Input v-model="form.edDegree"
                                   :disabled="disabled"
                                   placeholder="请输入学位"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="11"
                           offset="1">
                        <FormItem label="国家"
                                  prop="edCuntry">
                            <span @dblclick="disabled?'':dbCountry()">
                                <Input v-model="edCuntryDis"
                                       icon="search"
                                       :readonly="true"
                                       :disabled="disabled"
                                       placeholder="请输入国家"
                                       @on-click="disabled?'':selectCountry()" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem label="教育程度"
                                  prop="edEducationlevel">
                            <Select v-model="form.edEducationlevel"
                                    :disabled="disabled">
                                <Option :value="item.paramCode"
                                        v-for="(item,index) in selectEducationlevel"
                                        :key="index">{{item.paramInfoCn}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>

                    <i-col span="11"
                           offset="1">
                        <FormItem label="开始时间"
                                  prop="edSdate">
                            <DatePicker type="date"
                                        placeholder="请选择开始日期"
                                        style="width: 100%"
                                        :editable="false"
                                        :disabled="disabled"
                                        :readonly="disabled"
                                        v-model="form.edSdate"></DatePicker>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem label="结束时间"
                                  prop="edEdate">
                            <DatePicker type="date"
                                        placeholder="请选择结束日期"
                                        style="width: 100%"
                                        :editable="false"
                                        :disabled="disabled"
                                        :readonly="disabled"
                                        v-model="form.edEdate"></DatePicker>
                        </FormItem>
                    </i-col>
                    <i-col span="11"
                           offset="1">
                        <FormItem label="是否最高学位"
                                  prop="edIshighest">
                            <RadioGroup v-model="form.edIshighest">
                                <Radio :label="item.paramCode"
                                       v-for="(item,index) in yesOrNo"
                                       :disabled="disabled"
                                       :key="index">{{item.paramInfoCn}}</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="23">
                        <FormItem label="附件上传"
                                  prop="fileKey">
                            <Row>
                                <i-col span="4"
                                       v-show="!disabled">
                                    <Upload :before-upload="handleUpload"
                                            action=" ">
                                        <Button type="ghost"
                                                icon="ios-cloud-upload-outline"
                                                :disabled="disabled">浏览</Button>
                                    </Upload>
                                </i-col>
                                <i-col span="19">
                                    <span v-if="file !== ''"
                                          @dblclick="disabled?'':clearFile()">
                                        <i-col span="22">
                                            <Input v-model="file.name"
                                                   readonly="readonly">
                                            <span slot="prepend">
                                                <Icon type="folder"
                                                      size="16"></Icon>
                                            </span>
                                            </Input>
                                        </i-col>
                                        <i-col span="2">
                                            <Button type="text"
                                                    @click="uploadLocalFile"
                                                    v-if="loadingStatus">
                                                上传
                                            </Button>
                                            <Button type="text"
                                                    @click="downloadFile"
                                                    v-if="!loadingStatus">
                                                下载
                                            </Button>
                                        </i-col>
                                    </span>
                                </i-col>
                            </Row>
                        </FormItem>
                    </i-col>
                    <i-col span="23">
                        <FormItem label="备注"
                                  prop="note">
                            <Input v-model="form.note"
                                   type="textarea"
                                   :disabled="disabled"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="请输入备注"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="23">
                        <row type="flex"
                             justify="end">
                            <FormItem label
                                      prop="comment">
                                <Button type="ghost"
                                        @click="close"
                                        style="margin-left: 8px">取消</Button>
                                <Button type="primary"
                                        v-show="!disabled"
                                        @click="save">保存</Button>
                            </FormItem>
                        </row>
                    </i-col>
                </Form>
            </Row>
        </div>
        <transition name="fade">
            <searchCountry v-show="openCountry"
                           @closeCountry="closeCountry"
                           @inputCountry="inputCountry"
                           ref="searchCountry"></searchCountry>
        </transition>
    </div>
</template>
<script>
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin,
    uploadFile
} from "../../../../axios/axios";
import { isSuccess, deepCopy } from "../../../../lib/util";
import searchCountry from '../../../../components/searchTable/searchCountry'
export default {
    data () {
        const date = (rule, value, callback) => {
            if (value === "" || !value) {
                callback(new Error("请选择开始日期"));
            } else {
                //开始时间不能大于结束时间
                let startTimeNum = (new Date(this.form.edSdate)).getTime();
                let endTimeNum = (new Date(this.form.edEdate)).getTime();
                if (startTimeNum > endTimeNum) {
                    callback(new Error('开始日期不能大于结束日期'))
                }
                callback()

            }
        };
        return {
            disabled: false,
            openCountry: false,
            file: "",
            filekey: "",
            loadingStatus: false,
            selectEducationlevel: [],
            selectEdCuntry: [],
            yesOrNo: [
                {
                    paramCode: "1",
                    paramInfoCn: "是"
                },
                {
                    paramCode: "0",
                    paramInfoCn: "否"
                }
            ],
            form: {
                _mt: "empEducation.addOrUpd",
                edEducationlevel: "", // 教育程度
                edIshighest: "1", // 是否最高学位
                edCuntry: "", // 国家
                edSchool: "", // 学校
                edDegree: "", // 学位
                edSpecialty: "", // 专业
                edSdate: "", // 开始时间
                edEdate: "",// 结束时间
                fileKey: "",
                note: ""
            },
            edCuntryDis: "",
            ruleValidate: {
                edEducationlevel: [
                    { required: true, message: "请选择教育程度", trigger: "blur" }
                ],
                edIshighest: [
                    { required: true, message: "请选择是否是高学历", trigger: "change" }
                ],
                edSdate: [
                    {
                        required: true,
                        type: "date",
                        validator: date,
                        trigger: "change"
                    }
                ],
                edEdate: [
                    {
                        required: true,
                        message: "请选择结束日期",
                        type: "date",
                        trigger: "change"
                    }
                ],
            },
            rowId: ''
        };
    },
    //    主表id
    props: {
        mainId: Number,
        logType: String,
    },
    components: {
        searchCountry
    },
    mounted () {
        this.getSelect();
    },
    methods: {
        // 新增页面
        setRowId (id, logType) {
            const t = this;
            t.rowId = id;
            if (logType !== "新增") {
                t.getData();
            }
            if (logType == "查看") {
                t.ruleValidate = {}
            }
        },
        // 查询
        getData () {
            const t = this;
            const params = {
                _mt: "empEducation.getById",
                id: t.rowId,
                funId: "1",
                logType: "根据id查询信息"
            };
            getDataLevelUserLogin(params)
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.form.edEducationlevel = res.data.content[0].edEducationlevel;
                        t.form.edIshighest = res.data.content[0].edIshighest ? res.data.content[0].edIshighest : 1;
                        t.form.edCuntry = res.data.content[0].edCuntry;
                        t.edCuntryDis = res.data.content[0].edCuntryDis;
                        t.form.edSchool = res.data.content[0].edSchool;
                        t.form.edDegree = res.data.content[0].edDegree;
                        t.form.edSpecialty = res.data.content[0].edSpecialty;
                        t.form.edSdate = res.data.content[0].edSdate;
                        t.form.edEdate = res.data.content[0].edEdate;
                        t.form.note = res.data.content[0].note;
                        if (res.data.content[0].fileKey) {
                            t.file = { name: res.data.content[0].fileKey.split(':')[0] }
                            t.filekey = res.data.content[0].fileKey.split(':')[1]
                        }
                    }
                })
                .catch(() => {
                    t.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage")
                    });
                });
        },
        save () {
            const t = this;
            console.log(t.rowId, "t.rowId")
            const data = deepCopy(t.form);
            data._mt = "empEducation.addOrUpd";
            data.logType = t.logType;
            data.id = t.rowId;
            data.funId = "1";
            if (this.logType == "新增") {
                data.pkId = t.mainId; // 放入主表id
            }
            if (data.edSdate !== undefined) {
                data.edSdate =
                    data.edSdate === ""
                        ? ""
                        : new Date(data.edSdate).format("yyyy-MM-dd");
            }
            if (data.edEdate !== undefined) {
                data.edEdate =
                    data.edEdate === ""
                        ? ""
                        : new Date(data.edEdate).format("yyyy-MM-dd");
            }
            console.log(data, "data")
            this.$refs.form.validate(valid => {
                if (valid) {
                    getDataLevelUserLoginNew(data)
                        .then(res => {
                            if (isSuccess(res, t)) {
                                if (t.rowId) {
                                    t.$Modal.success({
                                        title: this.$t("reminder.suc"),
                                        content: this.$t("reminder.updsuccess")
                                    });
                                    t.$emit("update", res.data.content[0]);
                                } else {
                                    t.$Modal.success({
                                        title: this.$t("reminder.suc"),
                                        content: this.$t("reminder.addsuccess")
                                    });
                                    t.$emit("newdata", res.data.content[0]);
                                }
                                t.close();
                            }
                        })
                        .catch(() => {
                            t.$Modal.error({
                                title: this.$t("reminder.err"),
                                content: this.$t("reminder.errormessage")
                            });
                        });
                }
            });
        },
        getSelect () {
            const t = this;
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: "education"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.selectEducationlevel = res.data.content[0].value[0].paramList;
                    }
                })
                .catch(() => {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage")
                    });
                });
        },
        clear () {
            const t = this;
            t.form = {};
            t.edCuntryDis = "";
            t.file = "";
            t.edIshighest = "1";
            t.$refs.form.resetFields();
        },
        close () {
            this.rowId = "";
            this.$emit("hideMsg");
            this.clear();
        },
        //选择国家
        selectCountry () {
            const t = this
            t.$refs.searchCountry.getData()
            t.openCountry = true
        },
        closeCountry () {
            const t = this
            t.$refs.searchCountry.countryCname = ''
            t.openCountry = false
        },
        inputCountry (name, id) {
            const t = this
            t.edCuntryDis = name
            t.form.edCuntry = id
        },
        dbCountry () {
            const t = this
            t.edCuntryDis = ''
            t.form.edCuntry = ''
        },
        //附件上传
        handleUpload (file) {
            this.file = file
            this.loadingStatus = true
            return false
        },
        //上传
        uploadLocalFile () {
            const t = this
            const formData = new FormData()
            formData.append('upfile', t.file)
            console.log(formData)
            uploadFile(formData).then(res => {
                for (const key in res.data) {
                    t.file = { name: key }
                    t.filekey = res.data[key]
                    t.form.fileKey = key + ':' + res.data[key]
                }
                t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: '上传成功',
                    onOk: () => {
                        t.loadingStatus = false
                    },
                })
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        //下载
        downloadFile () {
            const t = this
            let data = {
                _mt: 'userMgmt.getfiletoken',
                isprivate: true,
                logType: '导出',
                filekey: t.filekey,
                expiresecs: 180,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
                    if (this.isIE()) {
                        window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
                    } else {
                        let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
                        let link = document.createElement('a')
                        link.href = doclink
                        link.download = 'downloadfiletemp'
                        link.setAttribute('download', 'downloadfiletemp');
                        document.body.appendChild(link);
                        link.click();
                    }
                    this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
                    localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        //清除附件
        clearFile (ckdis) {
            this.$Modal.confirm({
                title: this.$t("reminder.remind"),
                content: "是否清除已上传的附件",
                onOk: () => {
                    this.file = ""
                    this.filekey = ""
                    this.form.fileKey = ""
                    this.loadingStatus = false;
                },
                onCancel: () => { }
            })
        },
    }
};
</script>
<style lang="scss" scoped>
@import "../../../../sass/updateAndAdd";
.btn {
    position: absolute;
    bottom: 20px;
    right: 36px;
}
</style>
