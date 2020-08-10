import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
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
    path: "/PersonInfo",
    name: "PersonInfo",
    component: ()=> import("../views/PersonInfo.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
