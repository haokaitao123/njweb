
<template>
    <Spin fix>
        <Icon type="load-c"
              size=18
              class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
    </Spin>
</template>
 
<script>
import { getDataLevelUserLogin } from '@/axios/axios'
import { isSuccess } from '@/lib/util'
export default {
    name: 'loading',
    data () {
        return {
            imp: '',
            state: "",
            redisKey: "",
            accouValue: ""
        }
    },
    created () {
    },
    methods: {
        getState () {
            if (this.state) {
                clearInterval(this.imp);
                this.$emit('closeLoading')
            }
            const t = this;
            getDataLevelUserLogin({
                _mt: 'platFlowState.queryAccouStatus',
                redisKey: t.redisKey,
                accouValue: t.accouValue
            }).then((res) => {
                if (isSuccess(res, t)) {
                    console.log(res.data.content[0].value, "res");
                    t.state = res.data.content[0].value;
                }
            }).catch(() => {
                clearInterval(this.imp);
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        intervalState (redisKey, accouValue) {
            this.accouValue = accouValue;
            this.redisKey = redisKey;
            this.imp = window.setInterval(this.getState, 100)
        }
    },
}
</script>
<style scoped lang="less">
.demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.demo-spin-col {
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
.ivu-spin-fix {
    width: 100px;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 999;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
}
</style>