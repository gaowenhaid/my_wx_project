<template>
  <div class="container">
    <u-grid :border="true">
      <u-grid-item
        :customStyle="{ width: '33%', height: 220 + 'rpx' }"
        v-for="(item, index) in functionList"
        :index="index"
        :key="index"
        @click="redirectUrl(item.path)"
      >
        <uni-icons :type="item.icon" size="40" color="#000"></uni-icons>
        <text class="grid-text">{{ item.title }}</text>
      </u-grid-item>
    </u-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      functionList: [
        {
          title: '60秒读懂世界',
          path: 'readWorld',
          icon: 'chatbubble-filled'
        },
        {
          title: '今日黄历',
          path: 'almanac',
          icon: 'calendar-filled'
        },
        {
          title: '文字转语音',
          path: 'textToVoice',
          icon: 'sound-filled'
        },
        {
          title: '一言',
          path: 'AWord',
          icon: 'chat-filled'
        },
        {
          title: '舔狗日记',
          path: 'dog',
          icon: 'map-filled'
        },
        {
          title: '历史上的今天',
          path: 'hostory',
          icon: 'eye-filled'
        },
        {
          title: '笑话大全',
          path: 'joke',
          icon: 'chatboxes-filled'
        },
        {
          title: '随机藏头诗',
          path: 'acrosticPoetry',
          icon: 'flag-filled'
        },
        {
          title: '随机唱鸭',
          path: 'singDuck',
          icon: 'sound-filled'
        },
        {
          title: '在线翻译',
          path: 'translate',
          icon: 'font'
        },
        {
          title: '姓名测试',
          path: 'nameTest',
          icon: 'person-filled'
        },
        {
          title: '周公解梦',
          path: 'oneiromancy',
          icon: 'notification-filled'
        },
        {
          title: '最新地震查询',
          path: 'earthquakeQuery',
          icon: 'search'
        },
        {
          title: '垃圾分类查询',
          path: 'garbageSorting',
          icon: 'help-filled'
        },
        {
          title: '骚扰电话查询',
          path: 'harassIpone',
          icon: 'clear'
        },
        {
          title: '随机一张风景图',
          path: 'randomPic',
          icon: 'image-filled'
        },
        {
          title: '今日事今日毕',
          path: 'todoList',
          icon: 'checkbox-filled'
        },
        {
          title: '经纬度转换',
          path: 'changeLocal',
          icon: 'loop'
        }
      ]
    }
  },
  methods: {
    redirectUrl(url) {
      uni.navigateTo({
        url: '/pageA/functionItem/' + url
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>