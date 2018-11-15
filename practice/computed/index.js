import Vue from "vue";

const app = new Vue({
  data: {
    firstName: 'zhiyong',
    lastName: 'wang',
    number: 0,
    obj: {
      a: 123
    }
  },
  template: `<div>
     <p>Name: {{name}}</p>
     <p>Name: {{getName()}}</p>
     <p>Name: {{number}}</p>
     <p>FullName: {{fullName}}</p>
     <p>Obj.a: <input type="text" v-model="obj.a"></p>
     <p><input type="text" v-model="number"></p>
     <p>First Name:<input type="text" v-model="firstName"></p>
     <p>Last Name:<input type="text" v-model="lastName"></p>
     <p>Name:<input type="text" v-model="name"></p>
  </div>`,
  computed: {
    name: {
      get () {
        return `${this.firstName}  ${this.lastName}`
      },
      set (name) {
        const names = name.split(' ');
        this.firstName = names[0];
        this.lastName = names[1];
      }
    }
    // 几个数据拼接处理

  },
  watch: {
    firstName: {
      handler (newName, oldName) {
        this.fullName = newName + ' ' + this.lastName
      },
      immediate: true,
      deep: true
    },
    'obj.a': {
      handler () {
        console.log('obj.a changed');
        this.obj.a += 1;
      },
      immediate: true
    //  deep: true
    }
  },
  methods: {
    getName () {
      return `${this.firstName}  ${this.lastName}` 
    }   
  },
  mounted () {
    this.obj = {
      a: '345'
    }
  }
});

app.$mount('#root');