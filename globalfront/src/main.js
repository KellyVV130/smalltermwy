import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../style/theme/index.css";
import ElementUI from "element-ui";
import VueWechatTitle from 'vue-wechat-title'//动态修改title

import NavBar from "./components/NavBar";
import brain from "./components/header";
import docList from "./components/docList";
import docImg from "./components/docImg";
import folderDialog from "./components/folderDialog";
import shareDialog from "./components/shareDialog";
import setDialog from "./components/setDialog";
import tempCard from "./components/tempCard";

Vue.use(VueWechatTitle)
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

Vue.directive('web-title',{
  inserted: function (el, binding) {
    const { value } = binding
    if (el.dataset.title) { // 方式1，可以给标签的data-title的属性赋值
      document.title = el.dataset.title
    } else if (value && value.title) { // 方式2，指令传参
      document.title = value.title
    }
  },
  update (el, binding) {
    const {value} = binding
    if (el.dataset.title) {
      document.title = el.dataset.title
    } else if (value && value.title) {
      document.title = value.title
    }
  }
})

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
export const GetTime = (time, sp = '.')=>{
  if(!time) return '—';
  if(sp === '.')
    time = time.split('T')[0]+' '+time.split('T')[1]
  if(time.indexOf(sp)>-1){
    return time.split(sp)[0]
  } else return time;
}

Vue.prototype.$addStorageEvent = function (key, data) {
 
      // 创建一个StorageEvent事件
      var newStorageEvent = document.createEvent('StorageEvent');
      const storage = {
          setItem: function (k, val) {
              localStorage.setItem(k, val);
              // 初始化创建的事件
              newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
              // 派发对象
              window.dispatchEvent(newStorageEvent);
          }
      }
      return storage.setItem(key, data);
  
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
