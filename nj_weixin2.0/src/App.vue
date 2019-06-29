<template>
    <div id="app">
        <loading v-show="loading"></loading>
        <router-view />
        <tab-bar @tabTo="onTabTo"
                 :pIndexKey="selected"
                 ref='tabBar'
                 v-if="path"></tab-bar>
    </div>
</template>

<script>
import Loading from '@/components/public/loading.vue'
import { mapState } from 'vuex'
import tabBar from '@/components/public/tabBar.vue';
export default {
    name: 'App',
    data () {
        return {
        }
    },
    computed: {
        ...mapState([
            'loading',
        ]),
        path () {
            let path = this.$route.meta.showTar;
            return path;
        },
        selected () {
            let selected = this.$route.name;
            this.$store.commit('setPIndexKey', selected)
            return selected;
        }
    },
    components: {
        Loading,
        'tab-bar': tabBar,
    },
    created () {
        localStorage.getItem("data") && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem("data"))));
        window.addEventListener("beforeunload", () => {
            this.$store.commit('hideLoading');
            localStorage.setItem("data", JSON.stringify(this.$store.state))
        })
    },
    methods: {
        onTabTo (_result) {
            let _key = _result.data.key || '';
            this.$router && this.$router.push(_key)
        }
    },
}
</script>

<style lang="less">
* {
    margin: 0;
    padding: 0;
}
#app {
    position: relative;
    height: 100%;
    width: 100%;
    background: #f6f6f6;
}
html,
body {
    height: 100%;
    line-height: 1;
}
h1 {
    margin: 0;
}
ul li {
    list-style: none;
}
span {
    display: block;
}

.van-picker__toolbar {
    height: 70px !important;

    line-height: 70px !important;
}
.van-picker__cancel,
.van-picker__confirm {
    font-size: 32px !important;
}
.van-picker-column {
    font-size: 32px !important;
}

.form {
    width: 100%;
    background: #fff;
    .item_box {
        position: relative;
        .weui-icon-warn {
            position: absolute;
            right: 0;
            top: 50%;
            margin-top: -10px;
        }
        &:before {
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

    .weui-label {
        width: 220px !important;
        font-size: 28px;
        color: #333333;
        padding-right: 15px;
        span {
            display: inline;
            color: red;
            line-height: 28px;
            margin-left: 5px;
        }
    }
    .vux-label {
        width: 220px !important;
        font-size: 28px;
        padding-right: 15px;
        color: #333333;
        span {
            display: inline;
            color: red;
            line-height: 28px;
            margin-left: 5px;
        }
    }
    .weui-cell__ft {
        padding: 30px 20px 30px 0;
        font-size: 28px;
        color: #333333;
        line-height: 1.3;
    }
    .weui-cell {
        padding: 0px 36px 0px 30px !important;
    }
    .vux-x-textarea {
        padding-top: 30px !important;
        padding-bottom: 30px !important;
        .weui-textarea {
            font-size: 28px;
            color: #333333;
        }
    }
    .weui-input {
        height: 90px;
        font-size: 28px;
        color: #333333;
    }
    .weui-cell_access .weui-cell__ft:after {
        height: 24px;
        width: 24px;
        margin-top: -12px;
    }
}
.weui-toast__content {
    font-size: 30px !important;
}
.weui-textarea-counter {
    display: flex;
    justify-content: flex-end;
}
.van-list__error-text,
.van-list__finished-text,
.van-list__loading-text {
    color: #969799;
    font-size: 30px;
    line-height: 1.2;
    text-align: center;
    padding: 20px 0;
}
::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #333333;
}
:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #333333;
}
::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #333333;
}
:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #333333;
}
.van-search .van-cell {
    line-height: 50px;
}
.van-field__left-icon .van-icon,
.van-field__right-icon .van-icon {
    font-size: 38px;
}
.van-field__control {
    font-size: 28px;
}
.van-search__action {
    font-size: 28px;
}
.van-notify {
    font-size: 30px;
    padding: 10px;
    line-height: 50px;
}
.van-dialog__message {
    font-size: 30px;
    padding: 60px 15px;
}
.van-button--large {
    height: 100px;
    line-height: 100px;
    font-size: 30px;
}
.weui-btn_disabled.weui-btn_primary {
    background-color: #ccc !important;
}
.van-checkbox__icon .van-icon {
    width: 32px !important;
    height: 32px !important;
    font-size: 32px;
    // border: 1px solid #f5f5f5;
    border: 0.013333rem solid #e8e8e8;
}
.van-checkbox__icon {
    height: 36px;
    line-height: 36px;
}
.van-checkbox {
    margin-bottom: 15px;
}
.van-checkbox__label {
    font-size: 28px;
}
::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #333333;
}
:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #333333;
}
::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #333333;
}
:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #333333;
}
textarea[disabled] {
    -webkit-text-fill-color: #888;
    opacity: 1;
    background-color: #fff !important;
}
input[readonly] {
    -webkit-text-fill-color: #888;
    opacity: 1;
}
.van-pull-refresh__head {
    font-size: 32px;
    line-height: 40px;
}
.form .vux-x-textarea .weui-textarea {
    color: #333333;
}
</style>