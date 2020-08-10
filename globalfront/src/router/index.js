import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {//最近浏览
    path: "/",
    name: "history",
    component: () => import('../views/history')
  },
  {//收藏夹
    path: "/collection",
    name: "collection",
    component: () => import('../views/collection')
  },
  {//我创建的
    path: "/myBuild",
    name: "myBuild",
    component: () => import('../views/myBuild')
  },
  {//我的团队
    path: "/myTeam",
    name: "myTeam",
    component: () => import('../views/Team')
  },
  {
    path: '/team/:teamId',
    name: 'oneTeam',
    component: () => import('../views/oneTeam')
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
