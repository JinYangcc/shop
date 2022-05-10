//*引入mockjs模块
import Mock from "mockjs";
//*引入json数据格式
import banner from "./banner.json";
import floor from "./floor.json";
//?webpack默认对外暴露:图片、json数据格式
//*mock数据  是一个方法  第一个参数是参数请求的地址 第二个参数是请求的数据
Mock.mock("/mock/banner", { code: 200, data: banner }); //模拟首页大轮播图的数据
Mock.mock("/mock/floor", { code: 200, data: floor });
