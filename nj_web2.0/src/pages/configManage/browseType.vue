<template>
  <div class="cover">
    <div class="box" style="min-width: 900px;">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
        </div>
        <Button type="text" @click="reset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="bigImg">
        <img :src="showImg[num].img">
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        showImg: [
          {img: '../../static/img/type1b.jpg'},
          {img: '../../static/img/type2b.jpg'},
          {img: '../../static/img/type3b.jpg'},
          {img: '../../static/img/type4b.jpg'},
          {img: '../../static/img/type5b.jpg'},
        ],
      }
    },
    props: {
      num: Number,
    },
    mounted() {
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/updateAndAdd";

  .bigImg {
    width: 100%;
    height: 100%;
  }
</style>
