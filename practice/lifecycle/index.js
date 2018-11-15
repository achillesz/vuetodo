import Vue from "vue";

const app = new Vue({
  // el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  beforeCreate () {
    console.log(this.$el, 'beforeCreate');
  },
  created () {
    console.log(this.$el, 'created');
  },
  beforeMount () {
    console.log(this.$el, 'beforeMount');
  },
  mounted () {
    console.log(this.$el, 'mounted')
  },
  updated () {
    console.log(this.$el, 'updated');
  },
  beforeUpdate () {
    console.log(this.$el, 'beforeupdate')
  },
  activated () {
    console.log(this.$el, 'activated');
  },
  deactivated () {
    console.log(this.$el, 'deactivated');
  },
  beforeDestroy () {
    console.log(this.$el, 'beforeDestory');
  },
  destroyed () {
    console.log(this.$el, 'destroyed');
  },
  render (h) {
    throw new TypeError('render error');
  },
  renderError (h, err) {
    return h('div', {}, err.stack)
  },
  errorCaptured () {
    // 会向上冒泡 并正式环境可用
  }
})

app.$mount('#root')

// setInterval(() => {
//   app.text++;
// }, 1000);

// setTimeout(() => {
//   app.$destroy();
// }, 2000)
