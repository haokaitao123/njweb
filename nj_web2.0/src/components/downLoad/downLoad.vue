<template>
    <!-- 附件下载 -->
    <Col span="23">
    <FormItem label="附件上传"
              prop="noticeAttach">
        <Row>
            <Col span="4"
                 v-show="!disabled">
            <Upload :before-upload="handleUpload"
                    action=" ">
                <Button type="ghost"
                        icon="ios-cloud-upload-outline"
                        :disabled="disabled">浏览</Button>
            </Upload>
            </Col>
            <Col span="18">
            <span v-if="file !==''">
                <Col span="21"
                     @dblclick.native="disabled?'':clearFile()">
                <Input v-model="file.name"
                       readonly="readonly">
                <span slot="prepend">
                    <Icon type="folder"
                          size="16"></Icon>
                </span>
                </Input>
                </Col>
                <Col span="2">
                <Button type="text"
                        @click="uploadLocalFile"
                        v-if="loadingStatus">上传</Button>
                <Button type="text"
                        @click="downloadFile"
                        v-if="!loadingStatus">下载</Button>
                </Col>
            </span>
            </Col>
        </Row>
    </FormItem>
    </Col>
</template>
<script>
import { getDataLevelUserLogin, uploadFile } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
export default {
    data () {
        return {
            //文件
            file: this.fileInit,
            //文件key
            filekey: this.filekeyInit,
            //上传文件显示
            loadingStatus: false,
        }
    },
    props: {
        disabled: Boolean,
        filekeyInit: String,
        fileInit: String
    },
    methods: {
        //文件
        handleUpload (file) {
            this.file = file;
            this.loadingStatus = true;
            return false;
        },
        //文件上传
        uploadLocalFile () {
            const t = this
            const formData = new FormData()
            formData.append('upfile', t.file)
            console.log(formData)
            uploadFile(formData).then(res => {
                for (const key in res.data) {
                    t.file = {
                        name: key
                    }
                    t.filekey = res.data[key];
                    t.$emit('uploadLocalFile', key + ':' + res.data[key])
                }
                this.$Message.success('上传成功');
                this.loadingStatus = false;
            }).catch(() => {
                this.$Message.error('网络错误');
            })
        },
        //文件下载
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
                        window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.file.name)
                    } else {
                        let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.file.name)
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
        //清除文件
        clearFile () {
            const t = this;
            this.$Modal.confirm({
                title: this.$t("reminder.remind"),
                content: "是否清除已上传的附件",
                onOk: () => {
                    t.file = "";
                    t.filekey = "";
                    t.loadingStatus = false;
                    t.$emit('clearFile')
                },
                onCancel: () => { }
            })
        },
    },
    watch: {
        filekeyInit (val) {
            this.filekey = val
        },
        fileInit (val) {
            console.log(val, "val")
            this.file = val;
            console.log(this.file, "this.file")
        }
    },
}
</script>