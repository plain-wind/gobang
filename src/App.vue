<template>
  <div class="app">
    <RouterView />
  </div>
  <!-- 加载动画 -->
  <Loading v-if="visible"/>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { setRemUnit } from '@/utils/rem';
import Loading from '@/components/Loading.vue';
import { useLoading } from '@/hooks/useLoading';

// 引入加载状态
const { visible } = useLoading();
// 初始化rem
setRemUnit();
// 监听窗口大小变化
window.addEventListener('resize', setRemUnit);

</script>

<style lang="scss" scoped>
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #e7e3d9;
}
</style>

<style lang="scss">
@use "@/assets/sass/reset.scss";
@import url("@/assets/iconfont/css/font.css");
@import url("//at.alicdn.com/t/c/font_5004583_lblkp01kol.css");

* {
  // 字体
  font-family: "东方大楷", sans-serif;
}
</style>
