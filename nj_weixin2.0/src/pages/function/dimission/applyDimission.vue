<template>
    <div class="noDimission">
        <div class="dimissionImg">
            <img src="../../../../static/function/dimission.png"
                 alt="">
        </div>
        <x-button type="primary"
                  class="x_button"
                  @click.native="dimission"
                  action-type="button">我要离职</x-button>
    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    methods: {
        dimission () {
            this.$emit('applyDimission')
        }
    },
}
</script>
<style lang="less" scoped>
.noDimission {
    height: 100%;
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .dimissionImg {
        width: 406px;
        height: 406px;
        margin-top: 90px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .x_button {
        margin-top: 60px;
        width: 300px;
        font-size: 34px;
        height: 84px;
    }
}
</style>
