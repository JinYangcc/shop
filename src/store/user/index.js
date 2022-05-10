import {
  reqGetCode,
  reqUserRegister,
  reqLogin,
  reqUserInfo,
  reqLogout,
} from "@/api";
import { getToken, setToken, removeToken } from "@/utils/token";
const state = {
  code: "",
  token: getToken(), //*没有为空，有从本地存储获取
  UserInfo: {},
};
const actions = {
  //*获取验证码
  async getCode({ commit }, phone) {
    const result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  //*注册
  async userRegister({ commit }, user) {
    const result = await reqUserRegister(user);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  //*登录
  async userLogin({ commit }, user) {
    const result = await reqLogin(user);
    if (result.code == 200) {
      //*登陆成功 把token存储在本地存储中
      // localStorage.setItem("TOKEN", result.data.token);
      setToken(result.data.token); //*存储token
      commit("USERLOGIN", result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  //*获取用户信息 token
  async getUserInfo({ commit }) {
    const result = await reqUserInfo();
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  //*退出登录
  async Logout({ commit }) {
    const result = await reqLogout();
    if (result.code == 200) {
      commit("CLEAR");
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
};
const mutations = {
  //*将code存储在state中
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, UserInfo) {
    state.UserInfo = UserInfo;
  },
  //*退出登录清除用户信息
  CLEAR(state) {
    state.UserInfo = {};
    state.token = "";
    removeToken();
  },
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters,
};
