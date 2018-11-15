import Vue from "vue";

const app = new Vue({
  template: `<div>
    <div>text: {{text}}</div>
    <div v-if="text === 0">Else Text:</div>
    <div v-else="">else content</div>
    <div v-html="html"></div>
    <div>
      <input text="text" v-model.lazy="text" />
    </div>
    <div><input type="checkbox" v-model="active"></div>
    <div>
      <input type="checkbox" :value="1" v-model="arr">
      <input type="checkbox" :value="2" v-model="arr">
      <input type="checkbox" :value="3" v-model="arr">
    </div>
    <div>
      <div>
      <input type="radio" value="one" v-model="picked">
      <input type="radio" value="two" v-model="picked">
      </div>
    </div>
    <ul>
      <li :key="item" v-for="(item, index) in arr">{{item}}: {{index}}</li>
      </li>
    </ul>
    <ul>
      <li v-for="(val, key, index) in obj">
        {{val}} : {{key}} : {{index}}
      </li>
    </ul>
  </div>`,
  data: {
    picked: '',
    arr: [2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    text: 0,
    active: true,
    html: '<span>this is html</span>'
  }
});

app.$mount('#root');
