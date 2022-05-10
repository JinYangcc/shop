import { reqcartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
const state = {
  cartList: [],
};
const actions = {
  //*获取购物车列表数据
  async getshopinfo({ commit }) {
    const result = await reqcartList();
    if (result.code == 200) {
      commit("GETSHOPINFO", result.data);
    }
  },
  //*删除购物车某一产品
  async deleteCartListById({ commit }, skuId) {
    const result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  //*修改商品选中与未选
  async UpdateCheckedById({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateCheckedById(skuId, isChecked);
  },
  //*删除选中的所有产品
  deleteAllCheckedCartlist({ dispatch, getters }) {
    let promiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch("deleteCartListById", item.skuId) : "";
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
  //*修改全部产品的勾选状态
  updateCheckedCartlist({ dispatch, state }, isChecked) {
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("UpdateCheckedById", {
        skuId: item.skuId,
        isChecked: isChecked,
      });
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
};
const mutations = {
  GETSHOPINFO(state, cartList) {
    state.cartList = cartList;
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
