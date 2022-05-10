//home模块的小仓库
//引入req
import { reqCategoryList, reqgetfloorList, reqgetbannerList } from "@/api";

const state = {
  //起始值是一个空数组，默认初始值别瞎写（根据接口返回值）
  categoryList: [],
  bannerList: [],
  floorList: [],
};

const actions = {
  async categoryList({ commit }) {
    const result = await reqCategoryList();
    if (result.code == 200) {
      commit("CATEGORYLIST", result.data);
    }
  },
  //*获取首页轮播图的数据
  async getbannerList({ commit }) {
    const result = await reqgetbannerList();
    if (result.code == 200) {
      commit("GETBANNERLIST", result.data);
    }
  },
  //*获取floor的数据
  async getfloorList({ commit }) {
    const result = await reqgetfloorList();
    if (result.code == 200) {
      commit("GETFLOORLIST", result.data);
    }
  },
};

const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
    categoryList.length = 16;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};

const getters = {};
export default {
  // namespaced:true,
  state,
  mutations,
  actions,
  getters,
};
