<template>
  <view class="title">
    {{ title }}
    <span v-if="showMore" @click="showMoreFunction"
      >查看更多<uni-icons type="right" size="14" color="#3988f7"></uni-icons
    ></span>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      default: '标题',
      type: String
    },
    showMore: {
      default: true,
      type: Boolean
    }
  },
  methods: {
    showMoreFunction() {
      this.$emit('showMoreFunction', this.title)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  position: relative;
  padding-left: 45px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  font-style: normal;
  margin: 5px 0;
  box-sizing: border-box;
  &::before {
    content: '●';
    font-size: 14px;
    color: #1677ff;
    position: absolute;
    left: 14px;
  }
  &::after {
    content: '●';
    font-size: 14px;
    color: #84b1f2;
    position: absolute;
    left: 22px;
  }
  > span {
    position: absolute;
    right: 10px;
    color: #3988f7;
    font-size: 14px;
  }
}
</style>