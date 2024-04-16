<template>
  <view class="container">
    <u-overlay :show="showLoading" opacity="0.7">
      <view class="warpLoading">
        <u-loading-icon></u-loading-icon>
      </view>
    </u-overlay>
    <div class="textContent">
      <u--textarea
        :count="true"
        class="textarea"
        maxlength="300"
        height="200px"
        v-model="form.text"
        placeholder="请输入需要转化的内容"
      ></u--textarea>
    </div>
    <Title title="语音试听" :showMore="false" />
    <div class="audioList">
      <u-radio-group v-model="form.voice" placement="column">
        <u-radio
          shape="square"
          :customStyle="{ marginBottom: '8px' }"
          v-for="(item, index) in hobbys"
          :key="index"
          :name="item.voice"
        >
          <div class="audioItem">
            <image
              class="audioImage"
              src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png"
            ></image>
            <p class="name">{{ item.voice }}</p>
            <div class="btns">
              <button class="play" @click="play(item.url)">播放</button>
              <button class="stop" @click="stop">停止</button>
            </div>
          </div>
        </u-radio>
      </u-radio-group>
    </div>
    <div class="sendText" @click="send">转 换</div>
    <u-toast ref="uToast"></u-toast>
    <u-popup
      :show="show"
      mode="center"
      :safeAreaInsetBottom="false"
      :closeOnClickOverlay="false"
      round="20"
    >
      <view class="diaContent" style="width: 400px">
        <div class="title">提示</div>
        <div class="content">
          <div class="audioItem">
            <image
              class="audioImage"
              src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png"
            ></image>
            <p class="name">{{ result.voice }}</p>
            <div class="btns">
              <button class="play" @click="play(result.audio)">播放</button>
              <button class="stop" @click="stop">停止</button>
            </div>
          </div>
        </div>
        <div class="footer">
          <p class="btnItem confirm" @click="confirm">保 存</p>
          <p class="btnItem cancel" @click="show = false">重新转换</p>
        </div>
      </view>
    </u-popup>
  </view>
</template>

<script>
import request from '@/utils/request.js'
import Title from '@/components/title'
export default {
  components: { Title },
  data() {
    return {
      form: {
        text: '',
        key: 'jFWs0C6XIty0AHOgh3opeJHCvG',
        voice: '艾琪',
        type: 'json'
      },
      audioAction: {
        method: 'pause'
      },
      hobbys: [
        {
          voice: '艾琪',
          url: 'https://pan.lengyanwl.com/audio/tts/free_aiqi.mp3',
          author: '',
          poster: ''
        },
        {
          voice: '艾楠',
          url: 'https://pan.lengyanwl.com/audio/tts/free_ainan.mp3',
          author: '',
          poster: ''
        },
        {
          voice: '艾薇',
          url: 'https://pan.lengyanwl.com/audio/tts/free_aiwei.mp3',
          author: '',
          poster: ''
        },
        {
          voice: '艾颖',
          url: 'https://pan.lengyanwl.com/audio/tts/free_aiying.mp3',
          author: '',
          poster: ''
        },
        {
          voice: '艾秋',
          url: 'https://pan.lengyanwl.com/audio/tts/free_aiqiu.mp3',
          author: '',
          poster: ''
        },
        {
          voice: '艾柯',
          url: 'https://pan.lengyanwl.com/audio/tts/free_aike.mp3',
          author: '',
          poster: ''
        }
      ],
      show: false,
      result: '',
      innerAudioContext: null,
      showLoading: false
    }
  },
  methods: {
    send() {
      if (!this.form.text) this.showToast()
      this.showLoading = true
      request
        .get('https://qqlykm.cn/api/tts/free/index', this.form)
        .then(res => {
          console.log(res)
          if (res.success) {
            this.show = true
            this.result = res
          } else {
            this.showToast('服务错误,稍后再试')
          }
        })
        .finally(() => {
          this.showLoading = false
        })
    },
    showToast(msg) {
      this.$refs.uToast.show({
        type: 'error',
        icon: false,
        title: '错误',
        message: msg,
        iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
      })
    },
    play(src) {
      if (this.innerAudioContext) {
        this.innerAudioContext.destroy()
      }
      this.innerAudioContext = uni.createInnerAudioContext()
      this.innerAudioContext.src = src
      let playPromise = this.innerAudioContext.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.innerAudioContext.play()
          })
          .catch(() => {
            this.innerAudioContext.stop()
          })
      }
    },
    stop() {
      if (this.innerAudioContext) {
        this.innerAudioContext.stop()
        this.innerAudioContext.destroy()
      }
    },
    confirm() {}
  },
  destroyed() {
    if (this.innerAudioContext) {
      this.innerAudioContext.destroy()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .textContent {
    width: 100%;
    height: 230px;
    padding: 10px;
    box-sizing: border-box;
  }
  .audioList {
    width: 100%;
    padding: 10px 10px 0px 10px;
    box-sizing: border-box;
    background-color: #fff;
    .audioItem {
      width: 100%;
      display: flex;
      box-sizing: border-box;
      padding: 10px;
      border-bottom: 1px solid #eee;
      align-items: center;
      justify-content: space-evenly;
      .audioImage {
        width: 50px;
        height: 50px;
      }
      .name {
        width: 80px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        font-weight: 500;
      }
      .btns {
        width: calc(100% - 200px);
        display: flex;
        button {
          height: 30px;
          font-size: 14px;
          line-height: 30px;
        }
      }
    }
  }
  .sendText {
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
  }
  .diaContent {
    .audioItem {
      width: 100%;
      display: flex;
      box-sizing: border-box;
      padding: 10px;
      align-items: center;
      justify-content: space-evenly;
      .audioImage {
        width: 50px;
        height: 50px;
      }
      .name {
        width: 80px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        font-weight: 500;
      }
      .btns {
        width: calc(100% - 200px);
        display: flex;
        button {
          height: 30px;
          font-size: 14px;
          line-height: 30px;
        }
      }
    }
  }
  ::v-deep .u-transition {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>