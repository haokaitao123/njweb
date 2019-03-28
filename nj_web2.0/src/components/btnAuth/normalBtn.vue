<template>
    <div class="btnAuth"
         v-show="btnShow==modity">
        <Button :type="btnType"
                @click="normalClick()">{{btnText}}</Button>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew } from '../../axios/axios'
import { isSuccess, deepCopy } from '../../lib/util'

export default {
    data () {
        return {
            data: [],
        }
    },
    props: {
        btnText: String,
        btnType: String,
        btnShow: String,
    },
    computed: {
        modity () {
            return this.$store.state.btnOperate.modity
        }
    },
    mounted () {
        console.log(this.$store.state.btnOperate.modity, "modity")
    },
    methods: {
        normalClick () {
            this.$emit("cc", this.btnText)
        }
    },
}
</script>
<style lang="scss" scoped>
.btnAuth {
    display: inline-block;
    padding: 0 2px;
}
</style>
