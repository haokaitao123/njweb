<template>
  <i-col span="21" offset="1" v-if="show">
    <div class="main">{{thisValue}}</div>
  </i-col>
</template>
<script>
  export default {
    data() {
      return {
        thisValue: this.value,
      }
    },
    props: {
      value: '',
      show: Boolean,
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
  .main{
    width: 100%;
    border: 2px solid #FEF1DC;
    background-color: #FFF9E3;
    margin-bottom: 24px;
  }
</style>
