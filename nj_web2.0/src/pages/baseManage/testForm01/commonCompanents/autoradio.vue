<template>
  <div style="width: 100%" v-if="show">
    <i-col span="10" offset="1">
      <FormItem :label="itemLabel" :prop="ruleText" :required="required">
        <RadioGroup v-model="thisValue" @on-change="change">
          <Radio v-for="(item, index) in data" :key="index" :label="item.key" :disabled="disabled">{{item.value}}</Radio>
        </RadioGroup>
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
      data: Array,
      itemLabel: String,
      message: String,
      ruleText: String,
      required: Boolean,
      disabled: Boolean,  // 是否可编辑
      show: Boolean,  // 是否显示
    },
    methods: {
      change(value) {
        this.$emit('on-change', value)
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
