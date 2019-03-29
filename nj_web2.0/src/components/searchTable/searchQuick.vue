
<template>
    <div class="search-container" v-hoveroutside="handleClose">
        <div class="input-box">
            <Input
                class="search-text"
                v-model="searchvalue"
                @keyup.native="search($event)"
                :placeholder="placeholder"
                @keydown.down.native="keyDown"
                @keydown.up.native="keyUp"
            />
        </div>
        <ul :class="{selectHover:searchvalue.length!=0}">
            <li
                class="text-center"
                v-for="(item,index) in datalist"
                :class="{active:selectIndex==index}"
                @click="itemClick"
            >{{item.name}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            datalist: [],
            searchvalue: "",
            selectIndex: -1
        };
    },
    props: {
        itemlist: Array,
        placeholder: "",
        noDataText: String
    },
    methods: {
        itemClick(data) {
            this.searchvalue = "";
            this.$emit("item-click", data);
        },
        search(e) {
            if (event.keyCode == 38 || event.keyCode == 40) return;
            if (event.keyCode == 13 && this.searchvalue.length != 0)
                this.itemClick();
            let _self = this;
            const result = this.itemlist.some(function(value, index, array) {
                return value.name.indexOf(_self.searchvalue) != -1;
            });
            this.datalist = [];
            if (result && this.searchvalue.length != 0) {
                this.datalist = this.itemlist.filter(function(
                    item,
                    index,
                    arr
                ) {
                    return item.name.indexOf(_self.searchvalue) != -1;
                });
            } else {
                var obj = {
                    name: this.noDataText,
                    key: -1
                };
                this.datalist.push(obj);
            }
        },

        keyDown() {
            if (this.searchvalue.length === 0) return;
            this.selectIndex++;
            if (this.selectIndex == this.datalist.length) this.selectIndex = 0;
            this.searchvalue = this.datalist[this.selectIndex].name;
        },
        keyUp() {
            if (this.searchvalue.length === 0) return;
            this.selectIndex--;
            if (this.selectIndex == -2 || this.selectIndex == -1)
                this.selectIndex = this.datalist.length - 1;
            this.searchvalue = this.datalist[this.selectIndex].name;
        },
        handleClose() {
            this.searchvalue = "";
        }
    },
    directives: {
        hoveroutside: {
            bind: function(el, binding, vnode) {
                function documentHandler(e) {
                    if (el.contains(e.target)) {
                        return false;
                    }
                    if (binding.expression) {
                        binding.value(e);
                    }
                }
                el._vueHoverOutside_ = documentHandler;
                document.addEventListener("mouseover", documentHandler);
            },
            unbind: function(el, binding) {
                document.removeEventListener("mouseover", el._vueHoverOutside_);
                delete el._vueHoverOutside_;
            }
        }
    },
    computed: {
        searchvalue(val) {
            if (val.length == 0) this.selectIndex = -1;
        }
    }
};
</script>
<style lang="scss" scoped>
.search-container {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    line-height: normal;
    .input-box {
        padding-bottom: 2px;
    }
    ul {
        z-index: 99;
        background: #fff;
        width: 100%;
        border: 1px solid #dddee1;
        border-top: none;
        overflow: auto;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
        transform-origin: center top;
        position: absolute;
        top: 34px;
        left: 0px;
        opacity: 0;
        max-height: 0;
        transition: 0.4s ease-in-out;
        &.selectHover {
            opacity: 1;
            max-height: 241px;
        }
        li {
            padding: 6px 0;
            text-indent: 10px;
            font-size: 13px;
            white-space: nowrap;
            transition: 0.3s ease-in-out;
            &:hover {
                background: #f1f1f1;
            }
            &.active {
                background: #f1f1f1;
            }
        }
    }
    .no-data {
        z-index: 99;
        background: #fff;
        width: 100%;
        border: 1px solid #dddee1;
        border-top: none;
        text-align: center;
        font-size: 13px;
        padding: 6px 0;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
        transform-origin: center top;
        position: absolute;
        top: 34px;
        left: 0px;
        max-height: 0;
        opacity: 0;
        transition: 0.3s;
        &.selectHover {
            opacity: 1;
            background: #fff;
            max-height: 30px;
            border: 1px solid #dddee1;
        }
    }
}
</style>
