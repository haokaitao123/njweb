<template>
    <div class="wrap">

        <router-view></router-view>
        <tab-bar @tabTo="onTabTo"
                 :pIndexKey="selected"
                 ref='tabBar'
                 v-if="path"></tab-bar>
    </div>
</template>

<script>
import tabBar from '@/components/public/tabBar.vue';
export default {
    name: 'main',
    data () {
        return {
        }
    },
    computed: {
        path () {
            let path = this.$route.meta.showTar;
            console.log(this.$refs.tabBar, "path");
            if (path == true) {
                //tabTo(this.$route.meta.name)
                this.$refs.tabBar
            }
            return path;
        },
        selected () {
            let selected = this.$route.name;
            return selected;
        }
    },
    components: {
        'tab-bar': tabBar,
    },
    methods: {
        onTabTo (_result) {
            let _key = _result.data.key || '';
            this.$router && this.$router.push(_key)
        }
    },
    watch: {
        path (value) {
            let path = this.$route.meta.showTar;
            console.log(path, "path");
            if (path == true) {
                this.$refs.tabbar.tabTo(this.$route.meta.name)
            }
        }
    },
}
</script>
<style scoped lang="less" type="text/less">
.wrap {
    width: 100%;
    height: 100%;
    background: #f6f6f6;
}
</style>
