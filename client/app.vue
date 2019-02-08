<template>
    <div id="app">
        <div id="cover"></div>
        <div id="loading" v-show="loading">
          <loading></loading>
        </div>
        <Header></Header>
        <!-- <p>{{fullName}} {{counter}}</p> -->
        <!-- <p>texta: {{textA}}</p> -->
        <!-- <Todo></todo> -->
           <!-- <router-link to="/app/123"> app123 </router-link>
       <router-link :to="{name: 'app'}"> app </router-link>
       <router-link to="/login"> login </router-link>
       <router-link to="/login/exact"> login exact </router-link> -->
     <transition name="fade" mode="out-in"> 
       <!-- 影响所有的路由 out-in 先出后进 -->
           <router-view />
      </transition>
      <!-- <notification content="text notify" /> -->
    <button @click="notify">click me</button>
     <Footer></Footer>
     <!-- <router-view name="a" /> -->
    </div>
</template>


<script>
 import {
     mapState
//   mapGetters,
//   mapMutations,
//   mapActions
 } from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Loading from './components/loading/loading.vue'
// import Todo from './views/todo/todo.vue'

console.log(Header.__docs)
export default {
  metaInfo: {
    title: "Achilles's Todo App"
  },
  components: {
    Header,
    Footer,
    Loading
    // Todo
  },
  methods: {
    // ...mapActions(['updateCountAsync']),
    // ...mapMutations(['updateCount', 'a/updateText']),
    notify () {
      this.$notify({
        content: 'text $notifi',
        btn: 'close'
      });
    }
  },
  computed: {
    ...mapState(['loading'])
    // textA () {
    //   return this.$store.state.b.text
    // },
    // ...mapState({
    //   counter: (state) => state.count,
    //   textA: (state) => state.a.text
    // }),
    // ...mapGetters(['fullName']),
    // fullName () {
    //   return this.$store.getters.fullName
    // },
    // count () {
    //   return this.$store.state.count
    // }
  },
  mounted () {
 
    // console.log(this.$route, 99)
    // let i = 1;
    // this['a/updateText']('123');
    // this.$store.dispatch('updateCountAsync', {
    //   num: 5,
    //   time: 2000
    // });

    // this.updateCountAsync({
    //   num: 5,
    //   time: 2000
    // })

   // this.$store.state.count = 3
    // setInterval(() => {
    //   // this.$store.commit('updateCount', {
    //   //   num: i++,
    //   //   num2: 2
    //   // });
    //   this.updateCount({
    //     num: i++,
    //     num2: 2
    //   });
    // }, 1000);

  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
#loading{
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(255,255,255,.3)
  z-index 99
  display flex
  align-items center
  justify-content center
}
</style>
  