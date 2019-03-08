<template>
  <i-col span="21" offset="1" v-if="isshow">
    <div class="main">{{thisValue}}</div>
  </i-col>
</template>
<script>
  export default {
    data() {
      return {
        thisValue: this.value,
        isshow: this.ruleText in this.show,
      }
    },
    props: {
      value: '',
      show: Object,
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
  .main{
    width: 100%;
    border: 2px solid #FEF1DC;
    background-color: #FFF9E3;
    margin-bottom: 24px;
  }
</style>
