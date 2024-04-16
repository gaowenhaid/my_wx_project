<template>
  <view class="container">
    <u-overlay :show="showLoading" opacity="0.7">
      <view class="warpLoading">
        <u-loading-icon></u-loading-icon>
      </view>
    </u-overlay>
    <uni-notice-bar
      show-icon
      :text="`${timeFrame}好：${user.nickName} --- 当前时间：${nowDate}`"
    />
    <div class="list">
      <uni-list v-if="historyList.length" :border="true">
        <div
          class="listItem"
          v-for="(item, index) in historyList"
          :key="index"
          @click="toDetail(item.url)"
        >
          <span class="index">{{ item.year }}:</span>
          <span style="color: #1677ff">{{ item.title }}</span>
        </div>
      </uni-list>
    </div>
  </view>
</template>

<script>
import { getNowDate, getTimeFrame } from '@/utils/common.js'
import request from '@/utils/request'
export default {
  data() {
    return {
      user: uni.getStorageSync('userInfo'),
      nowDate: getNowDate(),
      timeFrame: getTimeFrame(),
      historyList: [],
      showLoading: false
    }
  },
  onShow() {
    this.getHistoryList()
  },
  methods: {
    getHistoryList() {
      this.showLoading = true
      request
        .get('https://qqlykm.cn/api/history/get', {
          key: 'jFWs0C6XIty0AHOgh3opeJHCvG'
        })
        .then(response => {
          if (response.data) {
            this.historyList = response.data
          }
        })
        .finally(() => {
          this.showLoading = false
        })
    },
    toDetail(url) {
      // 在某个方法中调用
      uni.navigateTo({
        url: '/pageA/functionItem/webView?url=' + url
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .u-transition {
  display: flex;
  align-items: center;
  justify-content: center;
}
.list {
  width: 98%;
  margin: 0 auto;
  height: calc(100vh - 60px);
  overflow: scroll;
  .listItem {
    min-height: 45px;
    width: 98%;
    box-sizing: border-box;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    margin: 0 auto;
    .index {
      margin-right: 10px;
      font-size: 16px;
    }
  }
}
</style>