import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [//I don't know why this files keeps jumping out merge fails, there is no conflicts at all.
  {//lately views, will have router guard, haven't login jump to Home Page
    path: "/history",
    name: "history",
    component: () => import('../views/history')
  },
  {//collection
    path: "/collection",
    name: "collection",
    component: () => import('../views/collection')
  },
  {//docs I built
    path: "/myBuild",
    name: "myBuild",
    component: () => import('../views/myBuild')
  },
  {//teams I'm in
    path: "/myTeam",
    name: "myTeam",
    component: () => import('../views/Team')
  },
  {
    path: '/team/:teamId',
    name: 'team',
    component: () => import('../views/oneTeam')
  },
  {//Dustbin
    path: "/dustbin",
    name: "dustbin",
    component: () => import('../views/Dustbin')
  },
  {
    path: '/',
    name: "Home",
    component: ()=> import("../views/Welcome.vue")
  },
  {
    path: "/Login",
    name: "Login",
    component: ()=> import("../views/Login.vue")
  },
  {
    path: "/Register",
    name: "Register",
    component: ()=> import("../views/Register.vue")
  },
  {
    path: "/PersonInfo/:personId",
    name: "PersonInfo",
    component: ()=> import("../views/PersonInfo.vue")
  },
  {
    path:'/editorPage',
    name:'editorPage',
    component: () => import("../views/EditorPage")
  },
  {
    path:'/Inbox',
    name: 'Inbox',
    component: () => import("../views/Inbox.vue")
  },
  {
    path:'/templates',
    name:'templates',
    component: () => import("../views/templateHub")
  },
  // {
  //   path:'/ViewPage',
  //   name:'ViewPage',
  //   component: () => import("../views/ViewPage")
  // }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

//判断用户是否登录
/*router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    let token = localStorage.getItem('Authorization')
    if (token) {
      next()
    } else {
      next({
        name: 'Login',
        params: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})*/

export default router