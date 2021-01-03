import Vue from 'vue'

import Router from 'vue-router'
import MyExpress from '../components/MyExpress.vue'
import Register from '../components/Register.vue'
import SearchExpress from '../components/SearchExpress.vue'
import Login from '../components/Login.vue'
import ExpressInfo from '../components/ExpressInfo.vue'
import MySpace from '../components/MySpace.vue'
import TbExpress from '../components/TbExpress.vue'
// import MyInfo from '../components/MyInfo'
// import infoManage from '../components/infoManage'
// import myPackage from '../components/myPackage'

Vue.use(Router)

const routes = [{
  path: '/',
  name: 'Login',
  component: Login
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
{
  path: '/SearchExpress',
  name: 'SearchExpress',
  component: SearchExpress
},
{
  path: '/Login',
  name: 'Login',
  component: Login
},
    {
        path: '/ExpressInfo',
        name: 'ExpressInfo',
        component: ExpressInfo
    },
	{
	  path: '/MySpace',
	  name: 'MySpace',
	  component: MySpace
	},
	{
	  path: '/TbExpress',
	  name: 'TbExpress',
	  component: TbExpress
	},
// {
//   path: '/MyInfo',
//   name: 'MyInfo',
//   component: MyInfo,
//   children: [
//     {
//       path:'/infoManage',
//       name:'infoManage',
//       component:infoManage
//     },
//     {
//       path:'/myPackage',
//       name:'myPackage',
//       component:myPackage
//     }
//   ]
// },
]

export default new Router({
  routes
})
