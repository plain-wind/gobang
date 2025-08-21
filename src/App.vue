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
</style>
