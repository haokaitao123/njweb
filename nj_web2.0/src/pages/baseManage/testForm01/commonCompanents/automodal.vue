<template>
  <div style="width: 100%" v-if="show">
    <i-col span="10" offset="1">
      <FormItem :label="itemLabel" :prop="ruleText" :required="required">
        <Input v-model="thisValue" icon="search" @on-click="openModal" :disabled="disabled"></Input>
      </FormItem>
    </i-col>
    <i-col span="10" offset="1" v-if="message">
      <div class="message">{{message}}</div>
    </i-col>
    <autoSearchtable v-if="showModal" @closeUp="closeModal" :modiaContent="modiaContent" @changeinput="changeinput"></autoSearchtable>
  </div>
</template>
<script>
  import autoSearchtable from '../searchTable/autoSearchtable'

  export default {
    data() {
      return {
        showModal: false,
        thisValue: this.value,
        thisId: this.id,
      }
    },
    props: {
      value: String,
      itemLabel: String,
      message: String,
      required: Boolean,
      ruleText: String,
      id: String,
      modiaContent: String,
      disabled: Boolean,  // 是否可编辑
      show: Boolean,  // 是否显示
    },
    components: {
      autoSearchtable,
    },
    methods: {
      change() {
        this.$emit('on-change', this.thisId)
      },
      openModal() {
        if (this.modiaContent === '' || this.modiaContent === undefined || this.disabled === true) {
          return
        }
        this.showModal = true
      },
      closeModal() {
        this.showModal = false
      },
      changeinput(value, id) {
        this.thisValue = value
        this.thisId = id
      },
    },
    watch: {
      thisId(val) {
        this.change()
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
