<template>
    <div class="sucTip">
        <div class="content">
            <van-icon name="success" />
            <div class="tip">提交成功</div>
        </div>
    </div>
</template>

<script>
import icons from '@vant/icons';
export default {
    // i18n: {
    // 	'zh-CN': {
    // 		title: '图标列表',
    // 		info: '显示徽标',
    // 		basic: '基础图标'
    // 	},
    // 	'en-US': {
    // 		title: 'Icon List',
    // 		info: 'Show Info',
    // 		basic: 'Basic Icon'
    // 	}
    // },
    data () {
        this.icons = icons;
        return {

        }
    }
}
</script>

<style lang="less">
.sucTip {
    width: 100%;
    height: 100%;
    background: white;
    .content {
        margin: 0 auto;
        width: 500px;
        text-align: center;
        .van-icon {
            text-align: center;
            font-size: 200px;
            font-weight: lighter;
            width: 250px;
            margin-top: 200px;
            color: white;
            border: 1px solid green;
            border-radius: 50%;
            height: 250px;
            background: green;
            line-height: 250px;
        }
        .tip {
            margin-top: 100px;
            font-size: 40px;
        }
    }
}
</style>