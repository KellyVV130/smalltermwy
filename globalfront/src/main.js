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
import shareDialog from "./components/shareDialog";
import setDialog from "./components/setDialog";
import tempCard from "./components/tempCard";

Vue.use(ElementUI)
Vue.component('workSpace', NavBar)
Vue.component('Navbar', brain)
Vue.component('doc-list', docList)
Vue.component('doc-img', docImg)
Vue.component('folder-dialog', folderDialog)
Vue.component('share-dialog', shareDialog)
Vue.component('set-dialog', setDialog)
Vue.component('temp-card', tempCard)

Vue.config.productionTip = false;

Array.prototype.indexOf = function(val) {
for (let i = 0; i < this.length; i++) {
if (this[i] == val) return i;
}
return -1;
};
Array.prototype.remove = function(val) {
let index = this.indexOf(val);
if (index > -1) {
this.splice(index, 1);
}
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
