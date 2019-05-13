
<template>
    <div class="mask">
        <van-loading size='50px' />
    </div>
</template>
 
<script>
export default {
    name: 'loading',
    data () {
        return {}
    },
}
</script>
<style scoped lang="less">
.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .loading {
        width: 50px;
        height: 50px;
        color: #000;
    }
}
</style>