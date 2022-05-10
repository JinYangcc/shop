<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getpageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumandendNum.start > 1"
      @click="$emit('getpageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumandendNum.start > 2">···</button>
    <button
      v-for="(page, index) in startNumandendNum.end"
      :key="index"
      v-if="page >= startNumandendNum.start"
      @click="$emit('getpageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>
    <button v-if="startNumandendNum.end < pages - 1">···</button>
    <button
      v-if="startNumandendNum.end < pages"
      @click="$emit('getpageNo', pages)"
      :class="{ active: pageNo == pages }"
    >
      {{ pages }}
    </button>
    <button :disabled="pageNo == pages" @click="$emit('getpageNo', pageNo + 1)">
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
    
  </div>
</template>

<script>
export default {
  name: "Pagination",
  //?pageNo:当前页  pageSize:每一页的数据  total:总数据  continues:连续页数
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //*总页数 向上取整
    pages() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumandendNum() {
      const { pageNo, pages, continues } = this;
      let start = 0;
      let end = 0;
      //!如果连续页码数大于总页数 start=1 end=总页数
      if (continues > pages) {
        start = 1;
        end = pages;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
      }
      //!如果第一项小于1 则为1 最后一项为连续页码数
      if (start < 1) {
        start = 1;
        end = continues;
      }
      //!如果最后一项大于总页数 则最后一项为总页数 第一项为总页数-连续页码数+1
      if (end > pages) {
        start = pages - continues + 1;
        end = pages;
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>