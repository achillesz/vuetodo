import Vue from "vue";

var globalVal = "111";

new Vue({
  el: "#root",
  data: {
    abc: "main",
    arr: [1, 2, 3],
    isActive: true,
    html: "<span>123</span>"
  },
  methods: {
    handleClick () {
      alert("clicked");
    }
  },
  template: `
    <div :class="{active: isActive}" v-bind:id="abc" v-on:click="handleClick">
      <p v-html="html"></p>
    </div>
  `
});
