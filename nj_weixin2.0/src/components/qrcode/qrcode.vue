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
                 alt="二维码图片">
            <img v-if="qrLogo"
                 class="qrcode_logo"
                 ref="qrcode_logo"
                 :src="qrLogo"
                 alt="二维码logo">
            <canvas :width="qrSize"
                    :height="qrSize"
                    class="canvas"
                    ref="canvas"></canvas>
        </div>
    </div>
</template>
<script>
const QRCode = require("qrcode");
export default {
    data () {
        return {};
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
    props: ["qrUrl", "qrSize", "qrText", "qrLogo", "qrLogoSize", "qrTextSize",],
    created () { },
    mounted () {
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
                if (this.qrLogo) {
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
                } else if (this.qrText) {
                    //设置字体
                    let fpadd = 10; //规定内间距
                    ctx.font = "bold " + this.qrTextSize + "px Arial";
                    let tw = ctx.measureText(this.qrText).width; //文字真实宽度
                    let ftop = (this.qrSize - this.qrTextSize) / 2; //根据字体大小计算文字top
                    let fleft = (this.qrSize - tw) / 2; //根据字体大小计算文字left
                    let tp = this.qrTextSize / 2; //字体边距为字体大小的一半可以自己设置
                    ctx.fillStyle = "#fff";
                    ctx.fillRect(
                        fleft - tp / 2,
                        ftop - tp / 2,
                        tw + tp,
                        this.qrTextSize + tp
                    );
                    ctx.textBaseline = "top"; //设置绘制文本时的文本基线。
                    ctx.fillStyle = "#f40";
                    ctx.fillText(this.qrText, fleft, ftop);
                }
                canvas.style.display = "none";
                qrcode_canvas.src = canvas.toDataURL();
                qrcode_canvas.style.display = "inline-block";
            }, 50);
        });
    }
};
</script>
<style scoped>
.qrcode_box,
#meQrcode {
    display: inline-block;
}
.qrcode_box img {
    display: none;
}
</style>