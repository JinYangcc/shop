<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- <h1>{{categoryList}}</h1> -->
    <div class="container">
      <!-- 事件委托 -->
      <div @mouseleave="restartIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <!-- .slice(0,16) -->
              <div
                class="item bo"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    href="javascript:;"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >
                    {{ c1.categoryName }}
                  </a>
                </h3>
                <!-- 二级、三级分类 v-show='currentIndex == index' -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          href="javascript:;"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:;"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
//引入全部的lodash
// import _ from "lodash";
//应该按需引入
import throttle from "lodash/throttle";
//
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1, //*控制三级联动菜单鼠标进入事件
      show: true, //*控制三级联动菜单显示与隐藏
    };
  },
  //当组件挂载完毕:可以向服务器发请求
  mounted() {
    // 通过vuex发请求，获取数据，存储于仓库中
    // this.$store.dispatch("categoryList");
    //*如果path不等于home 菜单就隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //对象写法右侧需要一个函数，当需要属性的时候会立即执行一次
      //注入一个参数state，即为大仓库的数据
      categoryList: (state) => {
        // console.log(state);
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    //changeIndex(index) {
    //   this.currentIndex = index;
    // },
    //throttle回调函数别用箭头函数，可能出现上下文this问题 节流
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 20),
    //*鼠标离开事件
    restartIndex() {
      this.currentIndex = -1;
      if (this.$route.path == "/search") {
        this.show = false;
      }
    },
    goSearch(event) {
      //*最好的解决方案是：编程式导航+事件委派
      //*存在一些问题：事件委派是把全部节点【h3、dt、dl、em】的事件委派给父节点
      //*点击a标签的时候，才会进行路由的跳转【怎么确定点击的一定是a标签】
      //*存在一个问题：即使你能确定点击的是a标签，如何区分是一级、二级、三级分类的标签

      //*第一个问题：把子节点当中的a标签，加上自定义属性data-categoryName、其余的子节点是没有的
      //?event.target.dataset 获取节点的自定义属性和属性值
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset; //解构赋值
      let location = { name: "search" };
      let query = { categoryName: categoryname };
      if (categoryname) {
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //?整理参数 合并参数
        //!如果有params参数也一起带过去
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        }
      }
    },
    enterShow() {
      this.show = true;
    },
  },
};
</script>

<style lang="less" scope>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: #ccc;
        }
      }
    }
    .sort-enter,
    .sort-leave-to {
      height: 0;
    }
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.2s linear;
    }
  }
}
</style>