import VueRouter from 'vue-router'
import Vue from 'vue'

// import Main from './layout/Main.vue'
import Cookie from 'js-cookie'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import ClassList from './components/ClassList.vue'
import SessionList from './components/SessionList.vue'
// import Question from './components/Question.vue'
// import GiveQ from './components/GiveQ.vue'
// import Answer from './components/Answer.vue'
// import Adetail from './components/Adetail.vue'
// import Profile from './components/Profile.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '',
    redirect: '/classList'
  },
  { path: '/login', component: Login },
  {
    path: '/home', component: Home, meta:{
      requiresAuth: true
    }},
  {
    path: '/classList',
    component: ClassList, meta: {
      requiresAuth: true
    }
  },
  {
    path: '/sessionList',
    component: SessionList,
    meta: {
      requiresAuth: true
    }
  }
    // children: [
    //   { path: 'home', component: Home },]}
  //     { path: 'q', component: GiveQ },
  //     { path: 'a', component: Answer },
  //     { path: 'a/detail', component: Adetail },
  //     { path: 'profile', component: Profile },
  //     // { path: 'logout', component: Home },
  //   ]
  // },
  // {
  //   path: '/question/:id', component: Main,
  //   children: [
  //     { path: '', component: Question },
  //     // { path: 'q', component: Home },
  //     // { path: 'logout', component: Home },
  //   ]
  // }
]


// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  linkActiveClass: 'active',
  routes // （缩写）相当于 routes: routes
})
router.beforeEach((to, from, next) => {

      //to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子

      if (to.path === '/login') {
        next()
      } // 如果即将进入登录路由，则直接放行
      else { //进入的不是登录路由

        if (to.meta.requiresAuth && !Cookie.get('studentid')) {
          next({
            path: '/login'
          })
        }

        //下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由
        else {
          next()
        }
      } //如果不需要登录验证，或者已经登录成功，则直接放行

    })
  
export default router