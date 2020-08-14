import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [//I don't know why this files keeps jumping out merge fails, there is no conflicts at all.
  {//lately views, will have router guard, haven't login jump to Home Page
    path: "/",
    name: "history",
    component: () => import('../views/history'),
    meta:{
      auth: true
    }
  },
  {//collection
    path: "/collection",
    name: "collection",
    component: () => import('../views/collection'),
    meta:{
      auth: true
    }
  },
  {//docs I built
    path: "/myBuild",
    name: "myBuild",
    component: () => import('../views/myBuild'),
    meta:{
      auth: true
    }
  },
  {//teams I'm in
    path: "/myTeam",
    name: "myTeam",
    component: () => import('../views/Team'),
    meta:{
      auth: true
    }
  },
  {
    path: '/team/:teamId',
    name: 'team',
    component: () => import('../views/oneTeam'),
    meta:{
      auth: true
    }
  },
  {//Dustbin
    path: "/dustbin",
    name: "dustbin",
    component: () => import('../views/Dustbin'),
    meta:{
      auth: true
    }
  },
  {
    path: '/Welcome',
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
    component: ()=> import("../views/PersonInfo.vue"),
    meta:{
      auth: true
    }
  },
  {
    path:'/editorPage',
    name:'editorPage',
    component: () => import("../views/EditorPage"),
    meta:{
      auth: true
    }
  },
  {
    path:'/Inbox',
    name: 'Inbox',
    component: () => import("../views/Inbox.vue"),
    meta:{
      auth: true
    }
  },
  {
    path:'/templates',
    name:'templates',
    component: () => import("../views/templateHub"),
    meta:{
      auth: true
    }
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
let that = this
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    let token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      that.$message({message:'您暂无权限查看此页面。', type: 'error'})
      next({
        name: 'Home',
        params: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router