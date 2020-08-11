import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../style/theme/index.css";
import ElementUI from "element-ui";

import NavBar from "./components/NavBar";
import brain from "./components/header";
import docList from "./components/docList";
import docImg from "./components/docImg";
import folderDialog from "./components/folderDialog";

Vue.use(ElementUI)
Vue.component('workSpace', NavBar)
Vue.component('Navbar', brain)
Vue.component('doc-list', docList)
Vue.component('doc-img', docImg)
Vue.component('folder-dialog', folderDialog)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
