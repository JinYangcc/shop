//对axios 二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";
//start 代表进度条开始
//done  代表进度条结束

const mockrequsets = axios.create({
  //基础路径，发请求的时候，路径当中会出现
  baseURL: "/mock",
  //代表请求超时的时间5s
  timeout: 3000,
});
//请求拦截器：在发请求之前，请求可以检测到，可以在请求发出去之前做一些事情
mockrequsets.interceptors.request.use((config) => {
  nprogress.start();
  return config;
});
//响应拦截器
mockrequsets.interceptors.response.use(
  (response) => {
    //成功的回调函数，服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    nprogress.done();
    return response.data;
  },
  (error) => {
    //响应失败的回调
    console.log(error);
    // return Promise.reject(new Error("failed"));
  }
);
export default mockrequsets;
