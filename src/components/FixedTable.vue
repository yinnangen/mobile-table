<template>
  <div>
    <div class="topNav_all">
      <ul id="topNav" class="swiper-container">
        <li class="swiper-wrapper">
          <template v-for="(title, i) in titles" :key="i">
            <div
              class="swiper-title"
              :style="{ flex: quotaArr[i] }"
              v-show="title != 'id'"
            >
              <span>{{ title }}</span>
            </div>
          </template>
        </li>
        <li
          class="swiper-wrapper"
          v-for="(item, index) in list"
          :key="index"
          @click="notice(item)"
        >
          <template v-for="(value, key, i) in item" :key="i">
            <div
              class="swiper-content"
              :style="{ flex: quotaArr[i] }"
              v-show="key != 'id'"
            >
              <span v-if="key != 'opt'" @touchstart="start" @touchend="isShowTips = false">{{
                value ? value : "&nbsp;"
              }}</span>
              <span v-else style="color: blue" @click="operate(item.Id)">{{
                value
              }}</span>
            </div>
          </template>
        </li>
      </ul>
      <div class="title" v-show="isShowTips" :style="{ left, top }">{{ title }}</div>
    </div>
  </div>
</template>

<script  lang="ts">
import { defineComponent } from "vue";
import { offsetLeft, offsetTop } from "@/common/common";
export default defineComponent({
  props: {
    isShowId: {
      default: false,
      type: Boolean,
    },
    titles: {
      require: true,
      type: Array,
    },
    list: {
      require: true,
      type: Array,
    },
    isTitlesSort: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      loop: 0,
      title: "",
      left: "",
      top: "",
      isShowTips: false,
      quotaArr: [] as number[],
    };
  },
  watch: {
    list: {
      handler(a) {
        if (this.isTitlesSort) {
          this.titlesSort(this.titles);
        } else {
          this.listSort(a);
        }
      },
      deep: true,
    },
  },
  methods: {
    // 点击整行自定义事件
    notice(item: any) {
      this.$emit("notice", item);
    },
    // 操作项自定义事件
    operate(id: any) {
      this.$emit("operate", id);
    },
    // 按标题划分行数据
    titlesSort(titles: any) {
      let titlesSum = 0;
      for (const key in titles) {
        if (titles[key] == "id") {
          continue;
        }
        titlesSum += titles[key].length;
      }
      for (const key in titles) {
        if (titles[key] == "id") {
          this.quotaArr.push(0);
        } else {
          this.quotaArr.push(titles[key].length / titlesSum);
        }
      }
    },
    // 按list划分行数据
    listSort(list: any) {
      let listSum = 0;
      let index = 0;
      for (const i in list) {
        let tempSum = 0;
        for (const key in list[i]) {
          if (key == "id") {
            continue;
          }
          if (
            Object.prototype.toString.call(list[i][key]) === "[object Number]"
          ) {
            tempSum += list[i][key].toString().length + 2;
          } else {
            tempSum += list[i][key].length;
          }
        }
        if (tempSum > listSum) {
          listSum = tempSum;
          index = parseInt(i);
        }
      }

      for (const key in list[index]) {
        if (key == "id") {
          this.quotaArr.push(0);
        } else {
          if (
            Object.prototype.toString.call(list[index][key]) ===
            "[object Number]"
          ) {
            this.quotaArr.push(
              (list[index][key].toString().length + 2) / listSum
            );
          } else {
            this.quotaArr.push(list[index][key].length / listSum);
          }
        }
      }
    },
    // 长按显示自定义内容
    start(e: any) {
      clearTimeout(this.loop); //再次清空定时器，防止重复注册定时器
      this.loop = setTimeout(() => {
        console.log(e.target.innerText);
        this.title = e.target.innerText;
        this.left = offsetLeft(e.target) + 10 + "px";
        this.top = offsetTop(e.target) - 15 + "px";
        this.isShowTips = true;
      }, 1000);
    }
  },
});
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.topNav_all {
  .flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  font-size: 12px;
  color: black;
  #topNav {
    width: 100%;
    .swiper-wrapper {
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      height: 35px;
      line-height: 35px;
      .swiper-title {
        flex: 1;
        text-align: center;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        background: #f5f9ff;
        span {
          transition: width 0.3s ease;
          display: block;
          border-right: 1px solid #ccc;
          font-weight: bold;
          font-size: 14px;
        }
      }
      .swiper-content {
        flex: 1;
        text-align: center;
        border-bottom: 1px solid #ccc;
        background-color: #fff;
        /* 1.先强制一行内显示文本 */
        white-space: nowrap;
        /* 2.超出的部分隐藏 */
        overflow: hidden;
        /* 文字用省略号提代超出的部分 */
        text-overflow: ellipsis;
        span {
          transition: width 0.3s ease;
          display: block;
          border-right: 1px solid #ccc;
        }
      }

      .swiper-content:last-child span,
      .swiper-title:last-child span {
        border-right: 0px;
      }
    }
    .swiper-wrapper:last-child .swiper-content {
      border-bottom: 0px;
    }
  }
}

.title {
  position: absolute;
  font-size: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  padding: 2px 5px;
}
</style>