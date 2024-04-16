<template>
  <div class="container">
    <u-overlay :show="showLoading" opacity="0.7">
      <view class="warpLoading">
        <u-loading-icon></u-loading-icon>
      </view>
    </u-overlay>
    <uni-notice-bar
      v-if="user.nickName"
      show-icon
      scrollable
      :text="`欢迎您-${user.nickName}`"
    />
    <div ref="backgroundUrl" class="avatar_content">
      <view class="avatarHeader">
        <view class="avaImg" @click="login">
          <image
            class="avatar"
            :src="user.avatarUrl ? user.avatarUrl : avatar"
            alt=""
            @click="onPreview(user.avatarUrl)"
          />
        </view>
        <view class="name" v-if="user.nickName"> {{ user.nickName }} </view>
        <view class="name" @click="login" v-if="!user.nickName">
          点击登录
        </view>
        <view class="right" v-if="user.nickName">普通会员</view>
      </view>
    </div>
    <view class="personalList" :class="{ noHeader: user.nickName }">
      <div
        class="itemPersonal"
        v-for="item in menuList"
        :key="item.iconKey"
        @click="clickItem(item.id)"
      >
        <button open-type="share" v-if="item.id == 7">
          <span><uni-icons :type="item.iconKey" size="30"></uni-icons></span>
          <span>{{ item.name }}</span>
        </button>
        <span
          ><uni-icons
            :type="item.iconKey"
            v-if="item.id != 7"
            size="30"
          ></uni-icons
        ></span>
        <span v-if="item.id != 7">{{ item.name }}</span>
      </div>
    </view>
    <u-toast ref="uToast"></u-toast>
    <u-modal
      :show="show"
      title="提示"
      :showCancelButton="true"
      content="确定退出登录吗?"
      @confirm="confirm"
      @cancel="cancel"
    ></u-modal>
    <u-modal :show="showImage" @confirm="showImage = false" title="联系作者">
      <view class="slot-content">
        <image
          style="object-fit: cover"
          src="@/static/image/wechat.jpg"
        ></image>
      </view>
    </u-modal>
  </div>
</template>

<script>
export default {
  onShareAppMessage() {
    return {
      title: '文海的工具箱',
      path: res.path,
      imageUrl:
        'https://img1.baidu.com/it/u=2917817973,2682084331&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800',
      desc: ''
    }
  },
  data() {
    return {
      user: {},
      avatar: require('../../static/image/avatar.png'),
      show: false,
      errorShow: true,
      showLoading: false,
      menuList: [
        { name: '个人中心', iconKey: 'person-filled', id: '1' },
        { name: '我的收藏', iconKey: 'heart-filled', id: '2' },
        { name: '通知中心', iconKey: 'notification-filled', id: '3' },
        // { name: '关于我们', iconKey: 'info-filled', id: '4' },
        { name: '联系作者', iconKey: 'weixin', id: '5' },
        { name: '赞赏我们', iconKey: 'hand-up-filled', id: '6' },
        { name: '分享转发', iconKey: 'redo-filled', id: '7' },
        { name: '退出登录', iconKey: 'gear-filled', id: '8' }
      ],
      noAuth: ['4', '5', '6', '7'],
      showImage: false
    }
  },
  onShow() {
    try {
      this.user = uni.getStorageSync('userInfo') || {}
    } catch (e) {}
  },
  methods: {
    login() {
      if (this.user.nickName) {
        this.perfectInformation()
      } else {
        this.showLoading = true
        const that = this
        uni.getUserProfile({
          desc: '声明获取用户个人信息后的用途',
          success: function (infoRes) {
            console.log(infoRes)
            that.user = infoRes.userInfo
            try {
              uni.setStorageSync('userInfo', infoRes.userInfo)
              that.showLoading = false
            } catch (e) {
              // error
            }
          }
        })
      }
    },
    onPreview(url) {
      uni.previewImage({
        current: 0,
        urls: [url],
        indicator: 'number'
      })
    },
    perfectInformation() {
      console.log('去完善个人信息')
    },
    logout() {
      this.show = true
    },
    confirm() {
      this.user = {}
      try {
        uni.removeStorageSync('userInfo')
      } catch (e) {
        // error
      }
      this.show = false
    },
    cancel() {
      this.show = false
    },
    isLogin() {
      try {
        const user = uni.getStorageSync('userInfo') || {}
        return user.nickName ? true : false
      } catch (e) {
        return user.nickName ? true : false
      }
    },
    showToast() {
      this.$refs.uToast.show({
        type: 'default',
        icon: false,
        title: '错误',
        message: '请先登录',
        iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/default.png'
      })
    },
    clickItem(id) {
      if (this.noAuth.includes(id)) {
        if (id == 5) {
          this.showWXImage()
        }
      } else if (id != 8) {
        if (this.isLogin()) {
          if (id == 1) {
            uni.navigateTo({
              url: '/pageA/editPersonal/editPersonal'
            })
          }
        } else {
          this.showToast()
        }
      } else {
        if (this.isLogin()) {
          this.logout()
        } else {
          this.showToast()
        }
      }
    },
    showWXImage() {
      this.showImage = true
    }
  }
}
</script>
<style scoped lang="scss">
.container {
  ::v-deep .u-transition {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  position: relative;
  .avatar_content {
    width: 100%;
    height: 200px;
    border-bottom-right-radius: 100px;
    border-bottom-left-radius: 100px;
    overflow: hidden;
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    .avatarHeader {
      width: 90%;
      height: 100px;
      margin: 0 auto;
      padding-top: 20px;
      box-sizing: border-box;
      display: flex;
      position: relative;
      .avaImg {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        .avatar {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        box-sizing: border-box;
        margin-left: 15px;
        padding-top: 20px;
      }
      .right {
        box-sizing: border-box;
        background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);
        border-radius: 29rpx 0rpx 0rpx 29rpx;
        font-size: 28rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 58rpx;
        text-align: center;
        position: absolute;
        top: 20px;
        right: -20px;
        padding: 0 10px;
      }
    }
  }
  .personalList {
    width: 90%;
    height: calc(100vh - 130px);
    background-color: #fff;
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    &.noHeader {
      top: 170px;
      height: calc(100vh - 180px);
    }
    .itemPersonal {
      height: 50px;
      width: 95%;
      box-sizing: border-box;
      margin: 0 auto;
      padding: 0 10px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      button {
        width: 100%;
        height: 100%;
        background-color: #fff;
        text-align: left;
        display: flex;
        align-items: center;
        padding: 0;
        &::after {
          border: none;
        }
      }
      span:first-child {
        margin-right: 10px;
      }
      span:last-child {
        font-size: 18px;
      }
    }
  }
}
</style>