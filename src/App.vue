<script>
export default {
  //不配置的话有默认值-参考文档地址2
  onLaunch: function () {
    // 监听小程序启动事件
    uni.onAppRoute(res => {
      console.log('路由变化:', res)
      // 在这里执行你的逻辑操作
      uni.showShareMenu({
        withShareTicket: true,
        // 数组0为分享给朋友、数组1为分享到朋友圈
        menus: ['shareAppMessage', 'shareTimeline']
      })
    })
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
@import './uni_modules/uview-ui/index.scss';
page {
  width: 100%;
  height: 100%;
  background-color: #eee;
}
</style>
