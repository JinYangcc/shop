import Vue from "vue";
import App from "./App.vue";
//*引入router组件
import router from "./router";
Vue.config.productionTip = false;
//*三级联动组件 --全局组件
import TypeNav from "./components/TypeNav";
//*注册全局组件
Vue.component(TypeNav.name, TypeNav);
//*引入与注册轮播图组件
import carousel from "./components/carousel";
Vue.component(carousel.name, carousel);
//*引入与分页器组件
import Pagination from "./components/pagination";
Vue.component(Pagination.name, Pagination);
//*引入mock  server.js
import "@/Mock/server";
// //*引入swiper插件
// import Swiper from 'swiper'
//引入swiper的css
import "swiper/css/swiper.css";
//*引入store仓库
import store from "./store";
//*统一接口api文件夹里面的全部请求函数
import * as API from "@/api"; //统一引入
//*按需引入element-ui
import { Button, MessageBox } from "element-ui";
Vue.component(Button.name, Button);
//*注册组件的时候，还有一种写法：挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//*引入图片
import lazy from "@/assets/1.gif";
//*图片懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  loading: lazy,
});
//*引入表单验证
import "@/plugins/validate";
new Vue({
  render: (h) => h(App),
  //*注册全局总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //*注册路由：底下的写法kv一致省略v【router小写】
  //*注册路由信息：当这里书写router的时候，组件身上都拥有$router,$route属性
  router,
  //*注册仓库 ：组件实例的身上会多一个$store属性
  store,
}).$mount("#app");
