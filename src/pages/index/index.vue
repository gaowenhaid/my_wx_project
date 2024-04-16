<template>
  <view class="container">
    <u-overlay :show="showLoading" opacity="0.7">
      <view class="warpLoading">
        <u-loading-icon></u-loading-icon>
      </view>
    </u-overlay>
    <!-- 图片轮播 -->
    <view class="img-wrap">
      <swiper
        class="swiper"
        circular
        :indicator-dots="true"
        :autoplay="true"
        :interval="2000"
        :duration="500"
      >
        <swiper-item v-for="(item,index) in imageList" :key="item.tag">
          <view class="item" @click="onPreview(index)">
            <image class="imageItem" :src="item.cover"></image>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!-- <Button>按钮</Button> -->
    <Title title="常用功能" @showMoreFunction="showMoreFunction" />
    <!-- 功能列表 -->
    <view class="functionList">
      <view class="left warpItem">
        <div class="top" @click="redirectUrl('textToVoice')">
          文字转语音<uni-icons
            type="sound-filled"
            size="30"
            color="#fff"
          ></uni-icons>
        </div>
        <div class="bottom" @click="redirectUrl('readWorld')">
          60秒读懂世界<uni-icons
            type="chatbubble-filled"
            size="30"
            color="#fff"
          ></uni-icons>
        </div>
      </view>
      <view class="right warpItem">
        <div class="top" @click="redirectUrl('almanac')">
          <span>今日黄历查询</span
          ><uni-icons type="calendar-filled" size="30" color="#000"></uni-icons>
        </div>
        <div class="center" @click="redirectUrl('hostory')">
          历史上的今天<uni-icons
            type="eye-filled"
            size="30"
            color="#000"
          ></uni-icons>
        </div>
        <div class="bottom" @click="redirectUrl('AWord')">
          一言<uni-icons type="chat-filled" size="30" color="#000"></uni-icons>
        </div>
      </view>
    </view>
    <!-- 近期上映电影 -->
    <Title title="近期上映电影" :showMore="movieList.length" />
    <view class="movieList">
      <uni-list v-if="movieList.length" :border="true">
        <!-- 显示圆形头像 -->
        <uni-list-chat
          v-for="item in movieList"
          :key="item.picUrl"
          :avatar-circle="true"
          :title="item.title"
          :avatar="item.picUrl"
          :note="'演员信息：' + (item.actors || '暂无演员信息')"
          :time="item.releaseDateStr"
          @click="showMovieItemDetail(item)"
        ></uni-list-chat>
      </uni-list>
      <view class="empty" v-else>
        <image class="noData" src="../../static/image/no-list.png" alt="" />
        <span>暂无数据</span>
      </view>
    </view>
    <u-modal
      :show="show"
      title="提示"
      :showCancelButton="true"
      content="当前用户未登录,请登录后,使用完整功能!"
      @confirm="confirm"
      @cancel="cancel"
    ></u-modal>
  </view>
</template>
<script>
import request from '@/utils/request.js'
import Title from '@/components/title'
export default {
  components: { Title },
  data() {
    return {
      requestData: {
        key: 'jFWs0C6XIty0AHOgh3opeJHCvG'
      },
      imageList: [],
      movieList: [],
      show: false,
      urlList:[],
      showLoading:false
    }
  },
  onLoad() {
    this.getImageList()
    this.getMovieList()
  },
  methods: {
    getImageList() {
      const data = { ...this.requestData, type: 'json' }
      const requestList = [
        request.get('https://qqlykm.cn/api/fengjing/index', data),
        request.get('https://qqlykm.cn/api/fengjing/index', data),
        request.get('https://qqlykm.cn/api/fengjing/index', data),
        request.get('https://qqlykm.cn/api/fengjing/index', data),
        request.get('https://qqlykm.cn/api/fengjing/index', data)
      ]
      Promise.all(requestList).then(res => {
        this.imageList = res.map(item => item.data)
        this.urlList = res.map(item => item.data.cover)
      })
    },
    onPreview(index) {
      uni.previewImage({
        current: index,
        urls: this.urlList,
        indicator: 'number'
      })
    },
    getMovieList() {
      this.showLoading = true
      request
        .get('https://qqlykm.cn/api/jijiangshangying/get', this.requestData)
        .then(res => {
          if (res.data) {
            this.movieList = res.data
          }
        }).finally(()=> {
          this.showLoading = false
        })
    },
    showMovieItemDetail(item) {
      console.log(item)
    },
    showMoreFunction(v) {
      if (this.isLogin()) {
        if (v === '常用功能') {
          uni.switchTab({
            url: '/pages/functionList/index'
          })
        }
      } else {
        this.show = true
      }
    },
    isLogin() {
      try {
        const user = uni.getStorageSync('userInfo') || {}
        return user.nickName ? true : false
      } catch (e) {
        return user.nickName ? true : false
      }
    },
    redirectUrl(url) {
      if (this.isLogin()) {
        uni.redirectTo({
          url: '/pageA/functionItem/' + url
        })
      } else {
        this.show = true
      }
    },
    confirm() {
      this.show = false
      uni.switchTab({
        url: '/pages/personal/index'
      })
    },
    cancel() {
      this.show = false
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  ::v-deep .u-transition {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .img-wrap {
    width: 100%;
    .swiper {
      height: 200px;
      .item {
        width: 100%;
        height: 100%;
        .imageItem {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  .functionList {
    height: 170px;
    display: flex;
    justify-content: space-evenly;
    .warpItem {
      width: 49%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      div {
        width: 98%;
        margin: 0 auto;
        border-radius: 10px;
        display: flex;
        align-items: center;
        font-weight: 500;
        font-style: normal;
        font-family: PingFangSC, PingFang SC;
      }
      &.left {
        div {
          height: 48%;
          background-color: #1677ff;
          font-size: 20px;
          color: #ffffff;
          justify-content: space-between;
          padding: 0 10px;
          box-sizing: border-box;
        }
      }
      &.right {
        div {
          height: 32%;
          background-color: #f0f5fe;
          font-size: 16px;
          font-weight: 400;
          color: #65677a;
          justify-content: space-between;
          padding: 0 20px;
          box-sizing: border-box;
        }
      }
    }
  }
  .movieList {
    width: 96%;
    min-height: 200px;
    margin: 0 auto;
    .empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .noData {
        width: 200px;
        height: 200px;
      }
      span {
        color: #888888;
      }
    }
  }
}
</style>
