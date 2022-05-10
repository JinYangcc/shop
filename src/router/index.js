//配置路由
//引入vue  vuerouter
import Vue from "vue";
import VueRouter from "vue-router";
//使用路由插件
Vue.use(VueRouter);

//引入路由组件
// import MyHome from "@/pages/Home";
// import MyLogin from "@/pages/Login";
// import MySearch from "@/pages/Search";
// import MyRegister from "@/pages/Register";
// import Detail from "@/pages/Detail";
// import AddCartSuccess from "@/pages/AddCartSuccess";
// import ShopCart from "@/pages/ShopCart";
// import Trade from "@/pages/Trade";
// import Pay from "@/pages/Pay";
// import PaySuccess from "@/pages/PaySuccess";
// import Center from "@/pages/Center";
// import myOrder from "@/pages/Center/myOrder";
// import groupOrder from "@/pages/Center/groupOrder";

/*重写push||replace
第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
第二个参数：成功的回调
第三个参数：失败的回调
call||apply区别
相同点：都可以调用函数一次，都可以篡改函数的上下文一次
不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
*/

//先把VueRouter原型对象的push，先保存一份
//push
let orignPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, reslove, reject) {
  if (reslove && reject) {
    orignPush.call(this, location, reslove, reject);
  } else {
    orignPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//replace
let orignReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, reslove, reject) {
  if (reslove && reject) {
    orignReplace.call(this, location, reslove, reject);
  } else {
    orignReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//*引入store
import store from "@/store";

const router = new VueRouter({
  routes: [
    //!路由的重定向，在项目跑起来的时候，访问/ ，立马让他重定向到首页
    {
      path: "/",
      redirect: "/home",
    },
    /*111111111111111111111111111111*/
    {
      path: "/home",
      //*路由懒加载 不用在上面直接引入
      component: () => import("@/pages/Home"),
      meta: { show: true },
    },
    {
      path: "/login",
      component: () => import("@/pages/Login"),
      meta: { show: false },
    },
    {
      name: "search",
      path: "/search/:keyword?",
      component: () => import("@/pages/Search"),
      meta: { show: true },
      // props:true,//第一种布尔值写法 params
      // props:{a:1,b:2},//第二种对象写法 额外的给路由组件传递一些props
      // props: ($route) => {
      //   return ({ keyword: $route.params.keyword, k: $route.query.k });
      // },//函数写法：可以params参数、query参数，通过props传递给路由组件
    },
    {
      path: "/register",
      component: () => import("@/pages/Register"),
      meta: { show: false },
    },
    {
      path: "/detail/:skuid",
      component: () => import("@/pages/Detail"),
      meta: { show: true },
    },
    {
      path: "/addcartsuccess",
      name: "addcartsuccess",
      component: () => import("@/pages/AddCartSuccess"),
      meta: { show: true },
    },
    {
      path: "/shopcart",
      name: "shopcart",
      component: () => import("@/pages/ShopCart"),
      meta: { show: true },
    },
    {
      path: "/trade",
      name: "trade",
      component: () => import("@/pages/Trade"),
      meta: { show: true },
      //*路由独享守卫
      beforeEnter: (to, from, next) => {
        if (from.path == "/shopcart") {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path: "/pay",
      component: () => import("@/pages/Pay"),
      meta: { show: true },
      //*路由独享守卫
      beforeEnter: (to, from, next) => {
        if (from.path == "/trade") {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path: "/paysuccess",
      component: () => import("@/pages/PaySuccess"),
      meta: { show: true },
    },
    {
      path: "/center",
      component: () => import("@/pages/Center"),
      meta: { show: true },
      //*路由子组件
      children: [
        {
          path: "/center",
          redirect: "/center/myorder",
        },
        {
          path: "myorder",
          component: () => import("@/pages/Center/myOrder"),
        },
        {
          path: "grouporder",
          component: () => import("@/pages/Center/groupOrder"),
        },
      ],
    },
  ],
  //*滚动行为
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});
//*全局守卫：前置守卫（在路由跳转之前进行判断）
//*to:获取跳转到的那个路由信息  from:获取从哪来的路由信息
//*next:放行函数   next() next(path) next(false)
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;
  let name = store.state.user.UserInfo.name; //!!!千万别拼错 我真傻了
  if (token) {
    //*已登录
    if (to.path == "/login" || to.path == "/register") {
      next("/");
    } else {
      //*跳转过后有UserInfo.name
      if (name) {
        next();
      } else {
        //*如果没有name 就发请求获取数据
        try {
          //*获取用户信息
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          //*获取不到token 退出重新登录  token失效
          await store.dispatch("Logout");
          next("/login");
        }
      }
    }
  } else {
    //*未登录
    //*把要去的路由存在query的redirect里面
    const topath = to.path;
    if (
      topath.indexOf("/trade") != -1 ||
      topath.indexOf("/pay") != -1 ||
      topath.indexOf("/center") != -1
    ) {
      next("/login?redirect=" + topath);
    } else {
      next();
    }
  }
});

export default router;
