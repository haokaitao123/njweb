<template>
  <div style="width: 100%" v-if="show">
    <i-col span="10" offset="1">
      <FormItem :label="itemLabel" :prop="ruleText" :required="required">
        <Input v-model="thisValue" @input="change" readonly icon="search" :disabled="disabled"></Input>
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
      }
    },
    props: {
      value: String,
      itemLabel: String,
      message: String,
      ruleText: String,
      required: Boolean,
      modiaContent: String,
      disabled: Boolean,  // 是否可编辑
      show: Boolean,  // 是否显示
    },
    methods: {
      change() {
        this.$emit('on-change', this.thisValue)
      },
    },
    watch: {
      value: (val) => {
        this.thisValue = val
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
