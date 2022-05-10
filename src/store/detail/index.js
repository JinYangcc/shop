import { reqgoodInfo, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from "@/utils/uuid._token";
const state = {
  goodinfo: {},
  //?游客临时身份
  uuid_token: getUUID(),
};
const actions = {
  async getgoodInfo({ commit }, skuId) {
    const result = await reqgoodInfo(skuId);
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },
  async addUpdateShopCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
};
const mutations = {
  GETGOODINFO(state, goodinfo) {
    return (state.goodinfo = goodinfo);
  },
};
const getters = {
  categoryView(state) {
    return state.goodinfo.categoryView || {}; //!没加载完成为空 不会undefined报错
  },
  skuInfo(state) {
    return state.goodinfo.skuInfo || {};
  },
  skuSaleAttrValueList(state) {
    return state.goodinfo.skuInfo.skuSaleAttrValueList || []; //!一级一级找，别跳
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
