<template>
    <div class="cover">
        <div class="box">
            <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
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
                      ref="form"
                      :label-width="110">
                    <i-col span="11">
                        <FormItem label="合同类别"
                                  prop="contType">
                            <Input v-model="contTypeDis"
                                   disabled="disabled"></Input>
                        </FormItem>

                    </i-col>
                    <i-col span="11"
                           offset="1">
                        <FormItem label="合同期限"
                                  prop="contPeriod">
                            <Input v-model="contPeriodDis"
                                   disabled="disabled"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem label="合同开始时间"
                                  prop="conSdate">
                            <DatePicker type="date"
                                        placeholder="请选择开始日期"
                                        style="width: 100%"
                                        :editable="false"
                                        disabled="disabled"
                                        readonly="readonly"
                                        v-model="form.conSdate"></DatePicker>
                        </FormItem>
                    </i-col>
                    <i-col span="11"
                           offset="1">
                        <FormItem label="合同结束时间"
                                  prop="conEdate">
                            <DatePicker type="date"
                                        placeholder="请选择结束日期"
                                        style="width: 100%"
                                        :editable="false"
                                        disabled="disabled"
                                        readonly="readonly"
                                        v-model="form.conEdate"></DatePicker>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem label="保密协议"
                                  prop="contBmxy">
                            <Input v-model="contBmxyDis"
                                   disabled="disabled"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="11"
                           offset="1">
                        <FormItem label="竞业限制协议"
                                  prop="contJzxy">
                            <Input v-model="contJzxyDis"
                                   disabled="disabled"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem label="合同工作时间"
                                  prop="contWorktime">
                            <Input v-model="contWorktimeDis"
                                   disabled="disabled"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="11"
                           offset="1">
                        <FormItem label="签署日期"
                                  prop="contSigndate">
                            <DatePicker type="date"
                                        placeholder="请选择签署日期"
                                        style="width: 100%"
                                        :editable="false"
                                        disabled="disabled"
                                        readonly="readonly"
                                        v-model="form.contSigndate"></DatePicker>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem label="试用期限"
                                  prop="contProbat"
                                  disabled="disabled">
                            <Input v-model="contProbatDis"
                                   disabled="disabled"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="11"
                           offset="1">
                        <FormItem label="试用到期时间"
                                  prop="contProbatdt">
                            <DatePicker type="date"
                                        placeholder="请选择试用到期时间"
                                        style="width: 100%"
                                        :editable="false"
                                        disabled="disabled"
                                        readonly="readonly"
                                        v-model="form.contProbatdt"></DatePicker>
                        </FormItem>
                    </i-col>
                    <i-col span="23">
                        <FormItem label="附件上传"
                                  prop="fileKey">
                            <Row>
                                <i-col span="24">
                                    <span v-if="file !== ''">
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
                                                    @click="downloadFile">
                                                下载
                                            </Button>
                                        </i-col>
                                    </span>
                                </i-col>
                            </Row>
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
                                <!-- <Button type="primary"
                                        @click="save">保存</Button> -->
                            </FormItem>
                        </row>
                    </i-col>
                    </i-col>
                </Form>
            </Row>
        </div>
    </div>
</template>
<script>
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin,
    uploadFile
} from "../../../../axios/axios";
import { isSuccess, deepCopy } from "../../../../lib/util";

export default {
    data () {
        return {
            file: "",
            filekey: "",
            loadingStatus: false,
            disabled: true,
            selectConWorkTime: [],
            selectEdConType: [],
            selectConPeriod: [],
            selectConProbat: [],
            yesOrNo: [],
            form: {
                _mt: "empContractInfo.addOrUpd",
                contType: "",
                contPeriod: "",
                contSdate: "",
                contEdate: "",
                contBmxy: "",
                contJzxy: "",
                contWorktime: "",
                contSigndate: "",
                contProbat: "",
                contProbatdt: "",
                fileKey: ""
            },
            contTypeDis: "",
            contPeriodDis: "",
            contBmxyDis: "",
            contJzxyDis: "",
            contWorktimeDis: "",
            contProbatDis: "",
            rowId: "",
            spinShow: ''
        };
    },
    //    主表id
    props: {
        mainId: Number,
        logType: String
    },
    components: {},
    mounted () {
        // this.getSelect();
    },
    methods: {
        // 新增页面
        setRowId (id) {
            const t = this;
            t.rowId = id;
            t.getData();
        },
        // 查询
        getData () {
            const t = this;
            t.spinShow = true
            const params = {
                _mt: "empContractinfo.getById",
                id: t.rowId,
                funId: "1",
                logType: "根据id查询信息"
            };
            getDataLevelUserLogin(params)
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.contTypeDis = res.data.content[0].contTypeDis;
                        t.contPeriodDis = res.data.content[0].contPeriodDis;
                        t.form.conSdate = res.data.content[0].contSdate;
                        t.form.conEdate = res.data.content[0].contEdate;
                        t.contBmxyDis = res.data.content[0].contBmxyDis;
                        t.contJzxyDis = res.data.content[0].contJzxyDis;
                        t.contWorktimeDis = res.data.content[0].contWorktimeDis;
                        t.form.contSigndate = res.data.content[0].contSigndate;
                        t.contProbatDis = res.data.content[0].contProbatDis;
                        t.form.contProbatdt = res.data.content[0].contProbatdt;
                        if (res.data.content[0].fileKey) {
                            t.file = { name: res.data.content[0].fileKey.split(':')[0] }
                            t.filekey = res.data.content[0].fileKey.split(':')[1]
                        }
                    }
                })
                .catch(() => {
                    this.$Message.error('网络错误');
                })
                .finally(() => {
                    t.spinShow = false
                });
        },
        getSelect () {
            const t = this;
            // 合同类别：contrpertype
            // 合同期限：contperiod
            // 合同工作时间（工作制度）：worktimetype
            // 试用期限：probperiod
            //
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                typeCode: "contrpertype,contperiod,worktimetype,probperiod,haveyn"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        t.selectEdConType = res.data.content[0].value[0].paramList;
                        t.selectConPeriod = res.data.content[0].value[1].paramList;
                        t.selectConProbat = res.data.content[0].value[2].paramList;
                        t.selectConWorkTime = res.data.content[0].value[3].paramList;
                        t.yesOrNo = res.data.content[0].value[4].paramList;
                    }
                })
                .catch(() => {
                    this.$Message.error('网络错误');
                });
        },
        close () {
            this.rowId = "";
            this.$emit("hideMsg");
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
                this.$Message.error('网络错误');
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
