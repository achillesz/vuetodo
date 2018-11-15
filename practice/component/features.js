import Vue from "vue";

const ChildComponent = {
  template: '<div>child component {{data.value}}</div>',
  inject: ['yeye', 'data'],
  mounted () {
  //  console.log(this.$parent.$options.name);
    console.log(this.yeye, this.value)
  }
};

const component = {
  name: 'comp',
  components: {
    ChildComponent
  },
  template: `
  <div :style="style">
    <div class="header">
      <slot :value="value" name="header"></slot>
    </div>
    <div class="body">
      <slot  name="body"></slot>
    </div>
    <child-component />
  </div>
  `,
  data () {
    return {
      value: '456',
      style: {
        width: '200px',
        height: '200px',
        border: "1px solid #ccc"
      }
    }
  }
};

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  provide () {
    const data = {};

    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    });

    return {
      yeye: this,
      data
    };
  },
  data () {
    return {
      value: '123'
    }
  },
  mounted () {
    console.log(this.$refs.comp.value, this.$refs.span);
  },
  template: `
  <div>
    <comp-one ref="comp">
      <span ref="span" slot-scope="props" slot="header">{{props.value}}</span>
      <span slot="body">it's body</span>
    </comp-one>
    <input type="text" v-model="value">
  </div>
  `
})
