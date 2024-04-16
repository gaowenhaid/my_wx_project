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
      <uni-list v-if="readWordList.length" :border="true">
        <div
          class="listItem"
          v-for="(item, index) in readWordList"
          :key="index"
        >
          <span
            class="index"
            :class="{
              first: index === 0,
              second: index === 1,
              third: index === 2
            }"
            >{{ index + 1 }}.</span
          >
          <span>{{ item }}</span>
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
      readWordList: [],
      showLoading: false
    }
  },
  onShow() {
    this.getReadList()
  },
  methods: {
    getReadList() {
      this.showLoading = true
      request
        .get('https://qqlykm.cn/api/60s/index', {
          key: 'jFWs0C6XIty0AHOgh3opeJHCvG'
        })
        .then(response => {
          if (response.data) {
            this.readWordList = response.data.news.map(item => {
              let word = item.split('、')
              let str = ''
              if (word.length <= 2) {
                str = word[1]
              }
              if (word.length > 2) {
                str = word.slice(1).join('')
              }
              return str
            })
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
      margin-right: 20px;
      font-size: 16px;
      &.first {
        color: rgb(190, 33, 33);
        font-weight: 600;
        font-size: 20px;
        font-style: italic;
      }
      &.second {
        color: rgb(190, 98, 33);
        font-weight: 600;
        font-size: 20px;
        font-style: italic;
      }
      &.third {
        color: rgb(38, 33, 190);
        font-weight: 600;
        font-size: 20px;
        font-style: italic;
      }
    }
  }
}
</style>