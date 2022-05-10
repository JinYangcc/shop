//search模块的小仓库

import { reqgetsearchInfo } from "@/api";

const state = {
  searchList: {},
};
const actions = {
  async getsearchList({ commit }, params = {}) {
    const result = await reqgetsearchInfo(params); //!带参数 人傻了
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
};
export default {
  // namespaced:true,
  state,
  mutations,
  actions,
  getters,
};
