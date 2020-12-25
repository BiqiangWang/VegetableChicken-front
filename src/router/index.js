import Vue from 'vue'

import Router from 'vue-router'
import MyExpress from '../components/MyExpress.vue'
import Register from '../components/Register.vue'
import MyInfo from '../components/MyInfo'
import infoManage from '../components/infoManage'
import myPackage from '../components/myPackage'
Vue.use(Router)

const routes = [{
  path: '/',
  name: 'Register',
  component: Register
},
{
  path: '/Register',
  name: 'Register',
  component: Register
},
{
  path: '/MyExpress',
  name: 'MyExpress',
  component: MyExpress
},
{
  path: '/MyInfo',
  name: 'MyInfo',
  component: MyInfo,
  children: [
    {
      path:'/infoManage',
      name:'infoManage',
      component:infoManage
    },
    {
      path:'/myPackage',
      name:'myPackage',
      component:myPackage
    }
  ]
}
]

export default new Router({
  routes
})
