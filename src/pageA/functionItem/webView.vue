<template>
  <web-view :src="webviewUrl"></web-view>
</template>
 
<script>
export default {
  data() {
    return {
      webviewUrl: ''
    };
  },
  onLoad(options) {
    this.webviewUrl = options.url;
  }
};
</script>