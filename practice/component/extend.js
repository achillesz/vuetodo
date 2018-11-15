import Vue from "vue";

const component = {
  props: {
    active: Boolean,
    propOne: {
      required: true
    },
    onChange: Function
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  mounted () {
    console.log('class instance')
    // this.propOne = 'inner content';
  },
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

const parent = new Vue({
  name: 'parent'
});

const component2 = {
  parent: parent,
  extends: component,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    this.$parent.text = 12345; 
    console.log(this.$parent.$options.name); 
  }
};

new Vue({
  parent: parent,
  name: 'Root',
  el: '#root',
  data: {
    text: '99'
  },
  components: {
    Comp: component2
  },
  mounted () {
    console.log(this.$parent.$options.name); 
  },
  template: `
  <div>
  <span>{{text}}</span>
  <comp prop-one="dfdf"></comp>
  </div>
  `
});

// const CompVue = Vue.extend(component);

// new CompVue({
//   el: '#root',
//   propsData: {
//     propOne: 'xxx'
//   },
//   data: {
//     text: 123
//   },
//   mounted () {
//     console.log('instance mounted') 
//   }
// });
