<template>
    <div class="btnAuth"
         <span
         style="margin: 0;">
        <Button type="primary"
                icon="search"
                :loading="searchLoading"
                @click="search()">
            查询
        </Button>
        </span>
    </div>
</template>
<script>

export default {
    data () {
        return {
        }
    },
    props: {
    },
    computed: {
        searchLoading () {
            return this.$store.state.btnOperate.searchLoading;
        }
    },
    mounted () {

    },
    methods: {
        search () {
            this.$emit("Search")
        }
    },
}
</script>
<style lang="scss" scoped>
.btnAuth {
    display: inline-block;
    padding: 2px;
}
</style>