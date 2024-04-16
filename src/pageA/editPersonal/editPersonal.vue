<template>
  <div class="container">
    <div style="height: 1px"></div>
    <div class="avatar">
      <button
        style="background: transparent"
        class="avatarBox"
        open-type="chooseAvatar"
        @chooseavatar="onChooseAvatar"
      >
        <image
          mode="aspectFill"
          class="avatarImg"
          :src="user.avatarUrl"
        ></image>
      </button>
    </div>
    <div class="userInfo">
      <div class="userName_warp">
        <span class="userName_title">昵称：</span>
        <input
          type="nickname"
          class="weui-input"
          placeholder="请输入用户昵称"
          v-model="user.nickName"
        />
      </div>
      <div class="saveBtn" @click="save">保 存</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    }
  },
  onShow() {
    this.user = uni.getStorageSync('userInfo') || {}
  },
  methods: {
    async onChooseAvatar(e) {
      const { avatarUrl, nickName } = e.detail
      this.user.avatarUrl = avatarUrl
      this.user.nickName = nickName
    },
    save() {
      try {
        uni.setStorageSync('userInfo', this.user)
        this.user = uni.getStorageSync('userInfo') || {}
        uni.switchTab({
          url:'/pages/personal/index'
        })
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #fff;
  .avatar {
    width: 95%;
    height: 100px;
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 20px;
    button {
      width: 100px;
      height: 100px;
      padding: 0;
      border-radius: 20px;
      &::after {
        border: none;
      }
      border: 2px solid #eee;
      .avatarImg {
        width: 100%;
        height: 100%;
      }
    }
  }
  .userInfo {
    width: 95%;
    height: calc(100% - 170px);
    margin: 0 auto;
    margin-top: 10px;
    padding: 10px 20px 0 20px;
    box-sizing: border-box;
    .userName_warp {
      width: 100%;
      height: 40px;
      line-height: 40px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      padding: 10px 0;
      .userName_title {
        width: 80px;
        height: 100%;
        line-height: 40px;
        text-align: center;
      }
    }
  }
  .saveBtn {
    width: 50%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #167fff;
    margin-left: 50%;
    transform: translateX(-50%);
    font-weight: 500;
    font-style: normal;
    font-family: PingFangSC, PingFang SC;
    color: #fff;
    font-size: 18px;
    border-radius: 20px;
    margin-top: 20px;
  }
}
</style>