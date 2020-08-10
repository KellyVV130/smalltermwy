import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../style/theme/index.css";
import ElementUI from 'element-ui'

import NavBar from "./components/NavBar";
import head from "./components/header";
import docList from "./components/docList";

Vue.use(ElementUI)
Vue.component('workSpace', NavBar)
Vue.component('Navbar', head)
Vue.component('doc-list', docList)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
