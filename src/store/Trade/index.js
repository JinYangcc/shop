import { reqAddressInfo, reqOrderInfo } from "@/api";

const state = {
  address: [],
  OrderInfo: {},
};
const actions = {
  //*获取地址信息
  async getUserAddress({ commit }) {
    const result = await reqAddressInfo();
    commit("GETUSERINFO", result.data);
  },
  //*获取交易商品信息
  async getOrderInfo({ commit }) {
    const result = await reqOrderInfo();
    commit("GETORDERINFO", result.data);
    console.log(result);
  },
};
const mutations = {
  //*获取地址信息
  GETUSERINFO(state, address) {
    state.address = address;
  },
  //*获取交易商品信息
  GETORDERINFO(state, OrderInfo) {
    state.OrderInfo = OrderInfo;
  },
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
