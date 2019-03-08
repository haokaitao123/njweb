import Vue from 'vue'

// event bus用来处理兄弟组件间的数据传递
export default new Vue({
  data() {
    return {
      arr: [],
      map: {},
      father: {},
    }
  },
  methods: {
    setData(value) {
      this.arr.push(value)
    },
  },
})