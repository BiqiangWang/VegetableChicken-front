import Vue from 'vue'

import Router from 'vue-router'
import MyExpress from '../components/MyExpress.vue'
import Register from '../components/Register.vue'

Vue.use(Router)

const routes = [{
  path: '/',
  name: 'Register',
  component: Register
},
{
  path: '/Register',
  name: 'Register',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () =>
  // import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  component: Register
},
{
  path: '/MyExpress',
  name: 'MyExpress',
  component: MyExpress
},
]

export default new Router({
  routes
})
