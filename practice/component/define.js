import Vue from "vue";

const component = {
  props: {
    active: Boolean,
    propOne: String,
    onChange: Function
  },
  template: `
    <div>
      <input type="text" v-model.number="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  // mounted () {
  //   this.propOne = 'inner content';
  // },
  methods: {
    handleChange () {
    //  this.onChange();
      this.$emit('change');
    }
  },
  data () {
    return {
      text: 0
    };
  }
};

new Vue({
  components: {
    CompOne: component
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  },
  mounted () {
    console.log(this.$refs.comp1);
  },
  data: {
    prop1: 'text1'
  },
  el: '#root',
  template: `
    <div>
      <comp-one ref="comp1" :active="true" @change="handleChange" :prop-one="prop1"></comp-one>
      <comp-one :active="false" propOne="text2"></comp-one>
    </div>
  `
});