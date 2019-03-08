<template>
  <div style="width: 100%" v-if="isshow">
    <i-col span="10" offset="1">
      <FormItem :label="itemLabel" :prop="ruleText" :required="required">
        <Input v-model="thisValue" @input="change" :disabled="thisDis"></Input>
      </FormItem>
    </i-col>
    <i-col span="10" offset="1" v-if="message">
      <div class="message">{{message}}</div>
    </i-col>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        thisValue: this.value,
        isshow: this.ruleText in this.show,
        thisDis: this.disabled ? this.disabled : !this.dis[this.ruleText],
      }
    },
    props: {
      value: String,
      itemLabel: String,
      message: String,
      ruleText: String,
      required: Boolean,
      disabled: Boolean,  // 是否可编辑
      show: Object,  // 是否显示
      dis: Object, // 是否可编辑plus
    },
//    computed:{
//      thisValue() {
//        return Number(this.value)
//      }
//    },
    methods: {
      change() {
        this.$emit('on-change', this.thisValue)
      },
      change111() {
        let t = this
        t.$emit('change', t)
      },
    },
    watch: {
      value(val) {
        this.thisValue = val
      },
      thisValue(val) {
        this.change111()
      },
      show: {
        handler: function(val) {
          this.isshow = this.ruleText in this.show
        },
        deep:true,
      },
      dis: {
        handler: function(val) {
          this.thisDis = this.disabled ? this.disabled : !this.dis[this.ruleText]
        },
        deep:true,
      },
    },
  }
</script>
<style lang="scss" scoped>
  .message{
    width: 100%;
    border: 2px solid #FEF1DC;
    min-height: 33px;
    padding: 4px 10px;
    line-height: 24px;
    margin-bottom: 24px;
    background-color: #FFF9E3;
  }
</style>
