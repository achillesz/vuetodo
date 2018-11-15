<template>
    <section class="real-app">
      <div class="tab-container">
        <tabs :value="filter" @change="handleChangeTab">
          <tab :index="tab" :label="tab" v-for="tab in stats" :key="tab" />
        </tabs>
      </div>
        <input 
        type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="接下去要做什么？"
        @keyup.enter="handleAdd"
        >
        <item 
        :todo="todo"
        v-for="todo in filteredTodos"
        :key="todo.id"
        @del="deleteTodo"
        @toggle="toggleTodoState"
         />
        <helper
        :todos="todos" 
        :filter="filter"
        @clearAllCompleted="clearAllCompleted"
        ></helper>
        <router-view />
    </section>
</template>



<script>
import {
  mapState, mapActions
} from  'vuex'
import Item from './item.vue'
import Helper from './helper.vue'
import { setTimeout } from 'timers';

export default {
  metaInfo: {
    title: "The Todo App"
  },
  props: ['id'],
  mounted () {
    console.log('mounted')
   if (this.todos && this.todos.length < 1) {
      this.fetchTodos()
    }
  },
  asyncData ({store, router}) {
    if (store.state.user) {
      return store.dispatch('fetchTodos');
    } else {
      router.replace('/login');
      return Promise.resolve();
    }
  },
  data () {
    return {
      filter: 'all',
      stats: ['all', 'active', 'completed']
    }
  },
  computed: {
    ...mapState(['todos']),
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }

      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'deleteTodo',
      'updateTodo',
      'deleteAllCompleted'
    ]),
    toggleTodoState (todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      });
    },
    clearAllCompleted () {
    //  this.todos = this.todos.filter(todo => !todo.completed)
      this.deleteAllCompleted()
    },
    // toggleFilter (state) {
    //   this.filter = state
    //   console.log(this.filter, 'enne')
    // },
    handleAdd (e) {
      const content = e.target.value.trim();
      if(!content) {
        this.$notify({
          content: '必须输入要做的内容'
        });
        return;
      }

      const todo = {
        content,
        completed: false
      }

      this.addTodo(todo);
      e.target.value = ''
    },
    // deleteToDoId (id) {
    //   this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    // },
    handleChangeTab (value) {
      this.filter = value;
    }
  },
  components: {
    Item,
    Helper
  }
}
</script>


  <style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}

.tab-container
  background-color #fff
  padding 0 15px
</style>