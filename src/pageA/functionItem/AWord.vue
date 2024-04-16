<template>
  <view class="container">
    <u-overlay :show="showLoading" opacity="0.7">
      <view class="warpLoading">
        <u-loading-icon></u-loading-icon>
      </view>
    </u-overlay>
    <div class="content">
      <span>{{ msg }}</span>
    </div>
  </view>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      msg: '',
      showLoading: false
    }
  },
  onShow() {
    this.getAWord()
  },
  methods: {
    getAWord() {
      this.showLoading = true
      request
        .get('https://qqlykm.cn/api/randtext/get', {
          key: 'jFWs0C6XIty0AHOgh3opeJHCvG'
        })
        .then(res => {
          if (res.code == 200) {
            this.msg = res.data
          }
        })
        .finally(() => {
          this.showLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .content {
    width: 95%;
    height: 90%;
    position: absolute;
    inset: 0;
    margin: auto;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-size: 20px;
    text-align: center;
    background-image: linear-gradient(to top, #5ee7df 0%, #b490ca 100%);
    border-radius: 10px;
    span {
      background: #fff;
      color: #fff;
      border-radius: 50px;
      font-weight: 700;
      background: #5ee7df;
      box-shadow: 20px 60px 60px #50c4be, -20px -20px 60px #6cffff;
      padding: 20px;
    }
  }
  ::v-deep .u-transition {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>