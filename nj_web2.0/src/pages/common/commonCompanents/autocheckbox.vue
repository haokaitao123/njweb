<template>
    <div style="width: 100%"
         v-if="isshow">
        <i-col span="10"
               offset="1">
            <FormItem :label="itemLabel"
                      :prop="ruleText"
                      :required="required">
                <Checkbox v-model="thisValue"
                          @on-change="change"
                          :disabled="thisDis"></Checkbox>
            </FormItem>
        </i-col>
        <i-col span="10"
               offset="1"
               v-if="message">
            <div class="message">{{message}}</div>
        </i-col>
    </div>
</template>
<script>
export default {
    data () {
        return {
            thisValue: this.value === "1" ? true : false,
            isshow: this.ruleText in this.show,
            thisDis: this.disabled ? this.disabled : !this.dis[this.ruleText],
        }
    },
    props: {
        value: String,  // 父级传来的值
        itemLabel: String,  // 用来显示的值
        message: String,  // 提示信息
        ruleText: String,  // 校验字段
        required: Boolean,  // 是否显示必填校验的红*
        disabled: Boolean,  // 是否可编辑
        show: Object,  // 是否显示
        dis: Object, // 是否可编辑plus
    },
    computed: {
        // 回显
        // thisValue() {
        //   if (this.value === '1') {
        //     // this.thisDis = true;
        //     return true
        //   }
        // },
        // thisValue: {
        //     get: function () {
        //         // if (this.value === '1') {
        //         //     this.thisDis = true;
        //         //     return true
        //         // }
        //     },
        //     set: function () {
        //     }
        // }
    },
    created () {
        console.log(this.value, "value")
    },
    methods: {
        change (value) {
            this.$emit('on-change', value);
        },
        change111 () {
            let t = this
            t.$emit('change', t)
        },
    },
    watch: {
        value: function (val) {
            this.thisValue = val === "1" ? true : false
        },
        thisValue (val) {
            this.change111()
        },
        show: {
            handler: function (val) {
                this.isshow = this.ruleText in this.show
            },
            deep: true,
        },
        dis: {
            handler: function (val) {
                this.thisDis = this.disabled ? this.disabled : !this.dis[this.ruleText];
            },
            deep: true,
        },
    },
}
</script>
<style lang="scss" scoped>
.message {
    width: 100%;
    border: 2px solid #fef1dc;
    min-height: 33px;
    padding: 4px 10px;
    line-height: 24px;
    margin-bottom: 24px;
    background-color: #fff9e3;
}
</style>
