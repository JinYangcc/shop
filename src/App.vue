<template>
  <div>
    <MyHeader />
    <router-view></router-view>
    <!-- 在home、search 显示  在登录注册隐藏 -->
    <MyFooter v-show="$route.meta.show" />
  </div>
</template>

<script>
import MyHeader from "./components/Header/index";
import MyFooter from "./components/Footer/index";
export default {
  name: "app",
  components: {
    MyHeader,
    MyFooter,
  },
  mounted() {
    // 通过vuex发请求，获取数据，存储于仓库中
    this.$store.dispatch("categoryList");
    //!!!!!!
    // this.$store.dispatch("getUserInfo");
  },
};
</script>


<style scoped>
</style>
