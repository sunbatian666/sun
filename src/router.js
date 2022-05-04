import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import user from './components/user/user.vue'
import Welcome from './components/Welcome.vue'
  



Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home,
         redirect:'/welcome',
         children:[{path:'/welcome',component:Welcome},
             {path:'/users',component:user}
        ]
  }
  ]

})
router.beforeEach((to, from, next) => {
  //to将要访问的路径
  //from从哪个路径跳转过来
  //next是一个函数
  //next()放行  next('/login')强制跳转
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router