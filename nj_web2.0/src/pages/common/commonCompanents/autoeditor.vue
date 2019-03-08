<template>
  <div style="width: 100%" v-if="isshow">
    <i-col span="21" offset="1">
      <FormItem :label="itemLabel" :prop="ruleText" :required="required">
        <div id="editor"></div>
      </FormItem>
    </i-col>
    <i-col span="21" offset="1" v-if="message">
      <div class="message">{{message}}</div>
    </i-col>
  </div>
</template>
<script>
  import E from 'wangeditor'

  let editor = new E('#editor')
  export default {
    data() {
      return {
        thisValue: this.value,
        isshow: this.ruleText in this.show,
      }
    },
    props: {
      value: String,
      itemLabel: String,
      message: String,
      required: Boolean,
      ruleText: String,
      show: Object,
    },
    mounted() {
      editor.create()
    },
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
      value: function(val) {
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
