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
  props: ['props1'],
  components: {
    ChildComponent
  },
  render (createElement) {
    return createElement('div', {
      style: this.style
      // on: {
      //   click: () => {
      //     this.$emit('click');
      //   }
      // }
    }, [this.$slots.header, this.props1]);
  },
  // template: `
  // <div :style="style">
  //   <div class="header">
  //     <slot :value="value" name="header"></slot>
  //   </div>
  //   <div class="body">
  //     <slot  name="body"></slot>
  //   </div>
  //   <child-component />
  // </div>
  // `,
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
      value: '1234'
    }
  },
  methods: {
    handleClick () {
      console.log('clicked');
    }
  },
  mounted () {
    console.log(this.$refs.comp.value, this.$refs.span);
  },
  render (createElement) {
    return createElement(
      'comp-one',
      {
        ref: 'comp',
        props: {
          props1: this.value
        },
        nativeOn: {
          click: this.handleClick
        }
        // on: {
        //   click: this.handleClick
        // }
      }, [
        createElement('span', {
          ref: 'span',
          slot: 'header',
          domProps: {
            innerHTML: '<span>345</span>'
          },
          attrs: {
            id: 'test-id'
          }
        }, this.value)
      ]
    );
  }
})
