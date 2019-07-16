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
                <div @click="test">
                    测试
                </div>
                <a @click="aclick"
                   download=""
                   id="download"
                   style="margin-top:100px;display:block">
                    下载123
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLogin, getDataLevelNone } from '@/axios/axios'
import { isSuccess } from '@/lib/util'
import $ from 'jquery'
export default {
    name: 'informDetails',
    data () {
        return {
            state: true,
            list: "",
            content: "",
            file: "",
            filekey: "",
            fileName: "",
            doclink: "http://hr.333job.com:19101/file?_tk=bec4aBEi7srtdAed%2BJcobBHXEiX1BM1u%2FKgOM5ZyUEhKbbY8q6lxNC1H4i31X%2FZMxPYciljRRObmOjG4j7dxDBdUVBmxwcwAuwMsMV0Rd8g%3D&token=I6TuChEbsRHZMD6fQbtmN06h3ZFwPh%2BjIbyT0D3WhCnCq37oeAYtL3EusgrVDes%2Fpv1cXerd2aTIwHQcpEtCL5XKJRwl4Sy4J8QmXfOC2oM%3D&fname=4.%E5%BE%AE%E4%BF%A1%E7%AB%AF_%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.docx"
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
                userId: localStorage.getItem('uid')
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
        aclick () {
            var url = "http://hr.333job.com:19101/file?token=I6TuChEbsRHZMD6fQbtmN06h3ZFwPh%2BjIbyT0D3WhCnCq37oeAYtL3EusgrVDes%2F9shg4pApcBxyxPCm4%2BMVoLSL740B0wAlwjDMN48oMko%3D&fname=4.%E5%BE%AE%E4%BF%A1%E7%AB%AF_%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.docx&_tk=bec4aBEi7srtdAed%2BJcobBHXEiX1BM1u%2FKgOM5ZyUEhKbbY8q6lxNC1H4i31X%2FZMxPYciljRRObmOjG4j7dxDBdUVBmxwcwAuwMsMV0Rd8g%3D"
            var aaab = document.getElementById("download");
            aaab.href = url;
        },
        test () {
            // debugger;
            // window.open('http://hr.333job.com:19101/file?token=I6TuChEbsRHZMD6fQbtmN463Psk%2B2QOkrqtCb6pj95afLiVy78aH%2BFqrKHxIrEoBeINt7MUksudxQng6a1s%2F%2FZRfwKQAXmvT0M93TFyTN8Q%3D&fname=5.%E9%A1%B9%E7%9B%AE%E7%BB%8F%E7%90%86_%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.docx&_tk=bec4aBEi7srtdAed%2BJcobM1zTcLsRA9ZwbTrlrVDAnJ69tjke3N94p3%2F8BvYV8dzW8ZElEYr7wLbpQW0qvf5Iq%2FCSPqZeI0A7vpthru01%2B4%3D')
            // window.location.href = "https://www.lilnong.top/static/pdf/2018-ebook-engineer.pdf";
            // let doclink = "http://hr.333job.com:19101/file?_tk=bec4aBEi7srtdAed%2BJcobBHXEiX1BM1u%2FKgOM5ZyUEhKbbY8q6lxNC1H4i31X%2FZMxPYciljRRObmOjG4j7dxDBdUVBmxwcwAuwMsMV0Rd8g%3D&token=I6TuChEbsRHZMD6fQbtmN06h3ZFwPh%2BjIbyT0D3WhCnCq37oeAYtL3EusgrVDes%2Fpv1cXerd2aTIwHQcpEtCL5XKJRwl4Sy4J8QmXfOC2oM%3D&fname=4.%E5%BE%AE%E4%BF%A1%E7%AB%AF_%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.docx"
            // let link = document.createElement("a");
            // link.href = doclink;
            // link.download = "downloadfiletemp";
            // link.setAttribute("download", "downloadfiletemp");
            // document.body.appendChild(link);
            // link.click();

            var aTag = document.createElement('a')
            aTag.download = 'tt'
            aTag.href = 'http://hr.333job.com:19101/file?token=I6TuChEbsRHZMD6fQbtmN463Psk%2B2QOkrqtCb6pj95afLiVy78aH%2BFqrKHxIrEoBde2ODJAaBzl7G2bMklE7iV2XSNiMMDEgEK15%2BBqNbdE%3D&fname=5.%E9%A1%B9%E7%9B%AE%E7%BB%8F%E7%90%86_%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.docx&_tk=bec4aBEi7srtdAed%2BJcobAwT1%2BrbGpWS%2FKk9NoeN001ss%2Fk%2BQ5sY2%2FbM5pXTuMbSonMV0EelEOy4o3j7D7WV3gjx5x7ZHKwHd8U4wIpC0Fg%3D'
            aTag.click() // 执行一次a标签的点击事件
            // var myFrame = document.createElement("iframe");
            // myFrame.src = doclink;
            // myFrame.style.display = " none";
            // document.body.appendChild(myFrame);
            // alert(1)
            // var eleLink = document.createElement('a');
            // eleLink.download = "downloadfiletemp";
            // eleLink.style.display = 'none';
            // // 字符内容转变成blob地址
            // var blob = new Blob([doclink]);
            // eleLink.href = URL.createObjectURL(blob);
            // // 触发点击
            // document.body.appendChild(eleLink);
            // eleLink.click();
            // // 然后移除
            // document.body.removeChild(eleLink);

            //asd
            // var blob = new Blob([doclink]);
            // var downloadElement = document.createElement('a');
            // var href = window.URL.createObjectURL(blob); // 创建下载的链接
            // downloadElement.href = href;
            // downloadElement.download = 'downloadfiletemp123123'; // 下载后文件名
            // document.body.appendChild(downloadElement);
            // downloadElement.click(); // 点击下载
            // document.body.removeChild(downloadElement); // 下载完成移除元素
            // window.URL.revokeObjectURL(href); // 释放掉blob对象
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
                    // let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.fileName) + "&_tk=" + encodeURIComponent(storage.token)
                    // let link = document.createElement('a');
                    // link.href = doclink;
                    // link.download = "downloadfiletemp";
                    // link.click();
                    // var $form = $('<form method="GET"></form>');
                    // $form.attr('action', doclink);
                    // $form.appendTo($('body'));
                    // $form.submit();
                    let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&_tk=' + encodeURIComponent(storage.token) + '&fname=' + encodeURI(t.filekey)
                    // pubsource.pub_prvf_downlink +
                    //     res.data.content[0].value +
                    //     "&fname=" +
                    //     encodeURI(t.filekey);
                    console.log(doclink, "doclink")
                    let link = document.createElement("a");
                    link.href = doclink;
                    link.download = "downloadfiletemp";
                    link.setAttribute("download", "downloadfiletemp");
                    document.body.appendChild(link);
                    link.click();
                    // var myFrame = document.createElement("iframe");
                    // myFrame.src = doclink;
                    // myFrame.style.display = " none";
                    // document.body.appendChild(myFrame);
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
        height: calc(~"100% - 100px");
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding: 45px 35px 0;
        .informDetailsContent {
            .noticeTitle {
                h3 {
                    font-size: 40px;
                    color: #333333;
                    text-align: center;
                    margin-bottom: 20px;
                    line-height: 1.3;
                }
            }
            .publishMes {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                span {
                    font-size: 30px;
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
