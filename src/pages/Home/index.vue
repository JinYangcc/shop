<template>
  <div>
    <TypeNav />
    <ListContainer />
    <ReCommend />
    <MyRank />
    <MyLike />
    <MyFloor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <MyBrand />
  </div>
</template>

<script>
//三级联动已经全局注册，所以这里不需要再次引入

import ListContainer from "./ListContainer/index";
import ReCommend from "./ReCommend/index";
import MyRank from "./Rank/index";
import MyLike from "./Like/index";
import MyFloor from "./Floor/index";
import MyBrand from "./Brand/index";

import { mapState } from "vuex";
export default {
  name: "MyHome",
  components: { ListContainer, ReCommend, MyRank, MyLike, MyFloor, MyBrand },
  mounted() {
    //*获取floor组件的数据
    this.$store.dispatch("getfloorList");
    //*获取登录用户信息
    // this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      floorList: (state) => {
        return state.home.floorList;
      },
    }),
  },
};
</script>

<style>
</style>