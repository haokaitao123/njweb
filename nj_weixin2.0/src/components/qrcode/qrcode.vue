<template>
    <!-- 生成二维码开放接口:
         二维码内容[通常为url]
         二维码大小[限制为正方形]
         二维码中间显示：文字或LOGO[默认不显示]-->
    <div id="meQrcode">
        <div class="qrcode_box">
            <img class="qrcode_canvas"
                 id="qrcode_canvas"
                 ref="qrcode_canvas"
                 style="width:8.55rem;height:8.55rem;"
                 alt="二维码图片">

            <img class="qrcode_logo"
                 ref="qrcode_logo"
                 src="../../../static/main/qrcode.jpg"
                 alt="二维码logo">
            <canvas :width="qrSize"
                    :height="qrSize"
                    class="canvas"
                    ref="canvas">
            </canvas>
        </div>
    </div>
</template>
<script>
const QRCode = require("qrcode");
let Base64 = require('js-base64').Base64;
export default {
    data () {
        return {
            goLink: "",
        };
    },
    /**传入时间戳显示倒计时函数【后台时间戳一般都是10位的】
     * @argument qrUrl        二维码内容
     * @argument qrSize       二维码大小
     * @argument qrText       二维码中间显示文字
     * @argument qrTextSize   二维码中间显示文字大小(默认16px)
     * @argument qrLogo       二维码中间显示图片
     * @argument qrLogoSize   二维码中间显示图片大小(默认为80)
     * 注：qrText与qrLogo只能显示一个，如果想要显示两个需要自行设计
     */
    props: ["qrUrl", "qrSize", "qrLogoSize", "qrTextSize",],
    created () { },
    mounted () {
        this.goLink = this.qrUrl.split("?")[0] + "?" + encodeURIComponent(this.qrUrl.split("?")[1]);
        console.log(Base64.encode(this.qrUrl.split("?")[1]), "qrUrl");
        // 画二维码里的logo[注意添加logo图片的时候需要使用服务器]
        let qrcode_canvas = this.$refs.qrcode_canvas;
        let qrcode_logo = this.$refs.qrcode_logo;
        let canvas = this.$refs.canvas;
        QRCode.toDataURL(this.qrUrl, { errorCorrectionLevel: "H" }, (err, url) => {
            qrcode_canvas.src = url;
            // 画二维码里的logo// 在canvas里进行拼接
            let ctx = canvas.getContext("2d");
            setTimeout(() => {
                //获取图片
                ctx.drawImage(qrcode_canvas, 0, 0, this.qrSize, this.qrSize);
                //设置logo大小
                //设置获取的logo将其变为圆角以及添加白色背景
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                let logoPosition = (this.qrSize - this.qrLogoSize) / 2; //logo相对于canvas居中定位
                let h = this.qrLogoSize + 10; //圆角高 10为基数(logo四周白色背景为10/2)
                let w = this.qrLogoSize + 10; //圆角宽
                let x = logoPosition - 5;
                let y = logoPosition - 5;
                let r = 5; //圆角半径
                ctx.moveTo(x + r, y);
                ctx.arcTo(x + w, y, x + w, y + h, r);
                ctx.arcTo(x + w, y + h, x, y + h, r);
                ctx.arcTo(x, y + h, x, y, r);
                ctx.arcTo(x, y, x + w, y, r);
                ctx.closePath();
                ctx.fill();
                ctx.drawImage(
                    qrcode_logo,
                    logoPosition,
                    logoPosition,
                    this.qrLogoSize,
                    this.qrLogoSize
                );

                canvas.style.display = "none";
                qrcode_canvas.src = canvas.toDataURL();
                qrcode_canvas.style.display = "inline-block";
            }, 50);
        });
    },
    methods: {
        doCopy () {
            const t = this;
            this.$copyText(this.goLink).then(function (e) {
                t.$vux.toast.text('链接复制成功', 'middle');
            }, function (e) {
                t.$vux.toast.text('链接复制失败', 'middle');
            })
        }
    }
};
</script>
<style scoped>
.qrcode_box,
#meQrcode {
    /* display: inline-block; */
    display: flex;
    flex-direction: column;
    align-items: center;
}
.qrcode_box img {
    display: none;
}
</style>