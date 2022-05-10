//当前这个模块 api统一管理
//三级联动接口
// http://39.98.123.211/api/product/getBaseCategoryList
// get 请求 无参数

//!api
import requsets from "./request";
export const reqCategoryList = () => {
  return requsets({
    method: "get",
    url: "/product/getBaseCategoryList",
  });
};
//?参数至少是一个空对象，才能拿到数据
//?当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqgetsearchInfo = (params) => {
  return requsets({
    method: "post",
    url: "/list",
    data: params,
  });
};
export const reqgoodInfo = (skuId) => {
  return requsets({
    method: "get",
    url: `/item/${skuId}`,
  });
};
//*添加购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requsets({
    method: "post",
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  });
};
//*获取购物车数据
export const reqcartList = () => {
  return requsets({
    method: "get",
    url: "/cart/cartList",
  });
};
//*删除购物车商品
export const reqDeleteCartById = (skuId) => {
  return requsets({
    method: "delete",
    url: `/cart/deleteCart/${skuId}`,
  });
};
//*修改商品选中与未选
export const reqUpdateCheckedById = (skuId, isChecked) => {
  return requsets({
    method: "get",
    url: `/cart/checkCart/${skuId}/${isChecked}`,
  });
};
//*获取验证码  记得带参数  输入手机号才能返回数据
export const reqGetCode = (phone) => {
  return requsets({
    method: "get",
    url: `/user/passport/sendCode/${phone}`,
  });
};
//*注册
export const reqUserRegister = (data) => {
  return requsets({
    method: "post",
    url: `/user/passport/register`,
    data: data,
  });
};
//*登录
export const reqLogin = (data) => {
  return requsets({
    method: "post",
    url: `/user/passport/login`,
    data: data,
  });
};
//*token
export const reqUserInfo = () => {
  return requsets({
    method: "get",
    url: "/user/passport/auth/getUserInfo",
  });
};
//*退出登录
export const reqLogout = () => {
  return requsets({
    method: "get",
    url: "/user/passport/logout",
  });
};
//*结算获取用户地址信息
export const reqAddressInfo = () => {
  return requsets({
    method: "get",
    url: "/user/userAddress/auth/findUserAddressList",
  });
};
//*获取交易商品信息
export const reqOrderInfo = () => {
  return requsets({
    method: "get",
    url: "/order/auth/trade",
  });
};
//*提交订单
export const reqSubmitOrder = (tradeNo, data) => {
  return requsets({
    method: "post",
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data: data,
  });
};
//*支付信息
export const reqPayInfo = (orderId) => {
  return requsets({
    method: "get",
    url: `/payment/weixin/createNative/${orderId}`,
  });
};
//*获取支付订单状态
export const reqPayStatus = (orderId) => {
  return requsets({
    method: "get",
    url: `/payment/weixin/queryPayStatus/${orderId}`,
  });
};
//*获取我的订单列表
export const reqMyOrderList = (page,limit) => {
  return requsets({
    method: "get",
    url: `/order/auth/${page}/${limit}`,
  });
};
//!mock
import mockrequsets from "./mockrequsets";
export const reqgetbannerList = () => {
  return mockrequsets({
    // methodL: "get",
    method: "get",
    url: "/banner",
  });
};
export const reqgetfloorList = () => {
  return mockrequsets({
    method: "get",
    url: "/floor",
  });
};
