<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { setRemUnit } from '@/utils/rem';

// 初始化rem
setRemUnit();
// 监听窗口大小变化
window.addEventListener('resize', setRemUnit);

</script>

<style lang="scss" scoped>
.app {
  background-color: #e7e3d9;
}
</style>

<style lang="scss">
@use "@/assets/sass/reset.scss";
</style>
