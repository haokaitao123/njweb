<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;自定义选项内容
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row>
        <Form :model="form" label-position="right" :label-width="100">
          <i-col span="11">
            <FormItem label="序号">
              <Input v-model="form.input1" placeholder="请输入序号"></Input>
            </FormItem>
          </i-col>
          <i-col span="11" offset="1">
            <FormItem label="选项内容中文">
              <Input v-model="form.input2" placeholder="请输入选项内容中文"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="选项内容英文">
              <Input v-model="form.input3" placeholder="请输入选项内容英文"></Input>
            </FormItem>
          </i-col>
          <Button class="btn" type="primary">{{$t('button.sav')}}</Button>
        </Form>
      </Row>

    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          input1: '',
          input2: '',
          input3: '',
        },
      }
    },
    methods: {
      close() {
        this.$emit('hideMsg')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
