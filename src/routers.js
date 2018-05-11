import VueRouter from 'vue-router'
import Vue from 'vue'

// import Main from './layout/Main.vue'

import Home from './components/Home.vue'
import Login from './components/Login.vue'
import ClassList from './components/ClassList.vue'
// import Question from './components/Question.vue'
// import GiveQ from './components/GiveQ.vue'
// import Answer from './components/Answer.vue'
// import Adetail from './components/Adetail.vue'
// import Profile from './components/Profile.vue'

Vue.use(VueRouter)


const routes = [
  { path: '/login', component: Login },
  {
    path: '/home', component: Home,},
  {
    path: '/classList',
    component: ClassList,
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

export default router