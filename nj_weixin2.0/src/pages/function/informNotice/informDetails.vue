<!--通知公告-->
<template>
    <div class="informDetails">
        <div class="informDetailsWrap">
            <div class="informDetailsContent">
				<div class="noticeTitle">
					<h3>{{list.noticeTitle}}{{list.noticeTypeDis}}</h3>
				</div>
                <div class="info_item"
                     v-html="content">
                    <!-- {{list.noticeContent}} -->
                </div>
                <div class="info_item"
                     v-show="file!=''">
                    <b class="file"
                       @click="downLoadFile">附件：{{file.name}}</b>
                </div>
				<div class="publishMes">
					<span>{{list.unitPidDis}}</span>
					<span>{{list.noticePublish}}</span>
				</div>
            </div>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLogin, getDataLevelNone } from '@/axios/axios'
import { isSuccess } from '@/lib/util'
export default {
    name: 'informDetails',
    data () {
        return {
            state: true,
            list: "",
            content: "",
            file: "",
            filekey: "",
			fileName:"",
        }
    },
    mounted () {
        this.getData();
    },
    methods: {
        getData () {
            const t = this;
            const data = {
                _mt: 'wxOrgNotice.getById',
                companyId: pubsource.companyId,
                id: this.$route.query.id,
				userId:localStorage.getItem('uid')
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.list = JSON.parse(res.data.content[0].value);
                    t.content = t.list.noticeContent;
                    console.log(t.content, "t.content ");
                    if (t.list.noticeAttach) {
						t.fileName = t.list.noticeAttach.split(':')[0];
                        t.file = { name: t.list.noticeAttach.split(':')[0] }
                        t.filekey = t.list.noticeAttach.split(':')[1];
                        console.log(t.filekey, "t.filekey1")
                    }
                    console.log(t.list, "t.list ");
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
        downLoadFile () {
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
                    // console.log(res, "res");
                    // console.log(pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.fileName)+'&_tk='+window.localStorage.getItem('token'), "t.filekey")
                    // window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)+'&_tk='+window.localStorage.getItem('token');
					let storage = window.localStorage;
					console.log(storage.token, "token")
					let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.fileName) + "&_tk=" + encodeURIComponent(storage.token)
					let link = document.createElement('a');
					link.href = doclink;
					link.download = "downloadfiletemp";
					link.click();
					 //  let doclink =pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.fileName)+'&_tk='+window.localStorage.getItem('token')
						// pubsource.pub_prvf_downlink +
						// res.data.content[0].value +
						// "&fname=" +
						// encodeURI(t.filekey);
						// let link = document.createElement("a");
						// link.href = doclink;
						// link.download = "downloadfiletemp";
						// link.setAttribute("download", "downloadfiletemp");
						// document.body.appendChild(link);
						// link.click();
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
}
</script>
<style lang="less" type="text/less" scoped>
.informDetails {
    width: 100%;
    height: 100%;
	background: #fff;
    .informDetailsWrap {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding: 45px 35px 0;
        .informDetailsContent {
			.noticeTitle{
				h3{
					font-size: 40px;
					color: #333333;
					text-align: center;
					margin-bottom: 20px;
					line-height:1.3;
				}
			}
			.publishMes{
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				span{
					font-size:30px;
					margin-bottom: 10px;
				}
			}
            .info_item {
				font-size: 28px;
				line-height: 1.2;
				word-break: break-all;
                h3 {
                    font-size: 34px;
                    color: #333333;
                    margin-bottom: 26px;
                }
                p {
                    font-size: 28px;
                    color: #666666;
                    line-height: 1.2;
                }
                ol {
                    li {
                        font-size: 28px;
                        line-height: 1.2;
                        margin-bottom: 32px;
                        color: #666666;
                    }
                }
                .file {
                    font-size: 30px;
                    color: #339afe;
                }
                margin-bottom: 30px;
            }
        }
    }
}
</style>
