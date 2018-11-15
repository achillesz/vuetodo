import Router from 'vue-router';

import routes from './routes';

export default () => {
  return new Router({
    routes,
    mode: 'history',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link'
    // scrollBehavior (to, from, savedPosition) {
    //   if (savedPosition) {
    //     return savedPosition
    //   } else {
    //     return { x: 0, y: 0 }
    //   }
    // },
    // parseQuery (query) {
    //   console.log(query)
    //   return {
    //     b: 1
    //   };
    // }// 定制方法
    // stringifyQuery (obj) {

    // },
    // fallback: true // 单页面，不支持的浏览器
  //  base: '/base/' // 所有路径的基路径
  })
}
