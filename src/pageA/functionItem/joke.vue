<!-- 笑话 -->
<template>
  <div class="container">
    <u-overlay :show="showLoading" opacity="0.7">
      <view class="warpLoading">
        <u-loading-icon></u-loading-icon>
      </view>
    </u-overlay>
    <div class="listContainer">
      <u-list height="100%" @scrolltolower="scrolltolower">
        <u-list-item v-for="(item, index) in contentList" :key="index">
          <p class="title">{{ index + 1 }}</p>
          <p class="content">
            {{ item }}
          </p>
        </u-list-item>
      </u-list>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      showLoading: false,
      data: {
        key: 'jFWs0C6XIty0AHOgh3opeJHCvG'
      },
      contentList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    scrolltolower() {
      this.getList()
    },
    getList() {
      this.showLoading = true
      Promise.all([
        request.get('https://qqlykm.cn/api/joke/index', this.data),
        request.get('https://qqlykm.cn/api/joke/index', this.data),
        request.get('https://qqlykm.cn/api/joke/index', this.data),
        request.get('https://qqlykm.cn/api/joke/index', this.data),
        request.get('https://qqlykm.cn/api/joke/index', this.data)
      ])
        .then(res => {
          if (res.length) {
            this.contentList = [
              ...this.contentList,
              ...res.map(item => item.data.joke)
            ]
          }
        })
        .finally(() => {
          this.showLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ::v-deep .u-transition {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .listContainer {
    width: 95%;
    height: 98%;
    ::v-deep .u-list-item {
      width: 100%;
      min-height: 200px;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 10px;
      .title {
        width: 40px;
        height: 30px;
        border-bottom-right-radius: 10px;
        background: rgba(22, 119, 255, 0.1);
        text-align: center;
        box-sizing: border-box;
        line-height: 30px;
        color: #1677ff;
        font-size: 14px;
        font-weight: 600;
      }
      .content {
        width: 95%;
        word-break: break-all;
        margin: 10px auto;
        font-size: 16px;
        text-indent: 2rem;
        box-sizing: border-box;
        padding: 0 10px;
      }
    }
  }
}
</style>