<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartlist in cartInfoList"
          :key="cartlist.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartlist.isChecked == 1"
              @change="updateChecked(cartlist, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartlist.imgUrl" />
            <div class="item-msg">
              {{ cartlist.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cartlist.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cartlist)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cartlist.skuNum"
              @change="handler('change', $event.target.value * 1, cartlist)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cartlist)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartlist.skuNum * cartlist.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartListById(cartlist)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllchecked && cartInfoList.length > 0"
          @change="updateCheckedCartlist"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCartlist">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalprice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="goTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getDate();
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    //*总价
    totalprice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          sum += item.skuNum * item.skuPrice;
        }
      });
      return sum;
    },
    //*全选
    isAllchecked() {
      //*遍历数组元素，如果元素的ischecked=1 返回true
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
  methods: {
    //*获取服务器数据
    getDate() {
      this.$store.dispatch("getshopinfo");
    },
    //*购物车改变数量   type 为了区分这三个元素  disNum 变化量  cartlist 哪一个产品
    handler: throttle(async function (type, disNum, cartlist) {
      //!使用节流防止用户点击过快bug
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          disNum = cartlist.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - cartlist.skuNum;
          }
      }
      try {
        await this.$store.dispatch("addUpdateShopCart", {
          skuId: cartlist.skuId,
          skuNum: disNum,
        });
        this.getDate();
      } catch (error) {
        console.log(error);
      }
    }, 3000),
    //*删除某产品的操作
    async deleteCartListById(cartlist) {
      try {
        await this.$store.dispatch("deleteCartListById", cartlist.skuId);
        this.getDate(); //*删除完成获取新的购物车数据进行展示
      } catch (error) {
        console.log(error);
      }
    },
    //*修改某个产品的勾选状态
    async updateChecked(cartlist, event) {
      try {
        // console.log(event.target.checked); //*true,false 变为 0，1
        //*如果数据修改成功 再次获取服务器数据
        const isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("UpdateCheckedById", {
          skuId: cartlist.skuId,
          isChecked: isChecked,
        });
        this.getDate();
      } catch (error) {
        console.log(error);
      }
    },
    //*删除选中所有产品
    async deleteAllCheckedCartlist() {
      try {
        await this.$store.dispatch("deleteAllCheckedCartlist");
        this.getDate();
      } catch (error) {
        console.log(error);
      }
    },
    //*修改全部产品的勾选状态
    async updateCheckedCartlist(event) {
      try {
        const isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateCheckedCartlist", isChecked);
        this.getDate();
      } catch (error) {
        alert(error.message);
      }
    },
    //*结算
    goTrade() {
      this.$router.push({
        path: "/trade",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>