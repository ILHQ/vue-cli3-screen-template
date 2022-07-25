<template>
  <div id="app">
    <div
      class="screenshot-container"
      id="screenshotContainer"
      :style="{ width: screenshot.w + 'px', height: screenshot.h + 'px' }"
    >
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      scale: 1,
      screenshot: {
        w: 1920,
        h: 1080,
      },
    };
  },
  mounted() {
    // 初始化
    this.resize();
    // 改变窗口大小时重新设置 rem
    window.onresize = () => {
      this.resize();
    };
  },
  methods: {
    ...mapMutations({
      setScale: 'index/SET_SCALE',
    }),
    resize() {
      // 当前页面宽度相对于 1920宽和1080高的缩放比例，可根据自己需要修改。
      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;
      const scaleW = clientWidth / 1920;
      const scaleH = clientHeight / 1080;
      if (scaleW < scaleH) {
        this.scale = scaleW;
      } else {
        this.scale = scaleH;
      }
      this.scale = Math.max(0.9, this.scale);
      this.setScale(this.scale);
      this.screenshot = {
        w: 1920 * this.scale,
        h: 1080 * this.scale,
      };
      // 设置页面根节点字体大小 指最高放大比例为2，可根据实际业务需求调整
      document.documentElement.style.fontSize = process.env.VUE_APP_BASE_SIZE * this.scale + 'px';
    },
  },
};
</script>
<style scoped lang="scss">
#app {
  position: relative;
  margin: 0;
}

.screenshot-container {
  position: relative;
  margin: 0 auto;
}
</style>
