<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/trade">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "MyHeader",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    goSearch() {
      // this.$router.push("/search");
      //?空对象也为真
      if (this.$route.query) {
        //!如果有query参数一起带过去
        // params 传参 需要在route中占位 要使用name 不能使用path
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },
    //*退出登录
    async logout() {
      try {
        await this.$store.dispatch("Logout");
        this.$router.push({ path: "/home" });
      } catch (error) {
        alert(error.message);
      }
    },
  },
  mounted() {
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
  computed: {
    //*计算用户名
    userName() {
      return this.$store.state.user.UserInfo.name;
    },
  },
};
/*/面试题1： 路由传递参数（对象写法）path是否可以结合params参数一起使用？
// 答：路由跳转传参的时候，对象的写法可以是name、path形式，但是需要注意的是，
// path这种写法不能与params参数一起使用
//this.$router.push({
path:'/serach', params: {
          keyword: this.keyword,
        },
        query: {
          keyword: this.keyword,
        },
})

2.如何指定params参数可传可不传？
如果路由要求传递params参数，但是你就不传递params参数：发现一件事情，url会有问题
如何指定params参数可以传递，或者不传递，在配置路由的时候，直接在占位符的后面加上一个问号
params就可以实现传递或者不传递
this.$router.push({
        name: "search",
        //params 传参 需要在route中占位 要使用name 不能使用path
        params: {
          keyword: this.keyword,
        },
        //query 传参
        query: {
          keyword: this.keyword,
        },
      });


面试题3：如果params参数可以传递也可以不传，但是如果传递的是空串，如何解决？
答：在空串后面加  || undefined 解决
this.$router.push({
        name: "search",
        //params 传参 需要在route中占位 要使用name 不能使用path
        params: {
          keyword: "" || undefined,
        },
        //query 传参
        query: {
          keyword: this.keyword,
        },
      });

面试题4：路由组件能不能传递props数据？
答：可以
有3种写法      
// props:true,//第一种布尔值写法 params
// props:{a:1,b:2},//第二种对象写法 额外的给路由组件传递一些props
// props: ($route) => {
//   return ({ keyword: $route.params.keyword, k: $route.query.k });
// },//函数写法：可以params参数、query参数，通过props传递给路由组件
*/
</script>



<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>