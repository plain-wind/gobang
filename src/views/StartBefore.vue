<template>
  <Curtain class="start-before" @click="$router.push('/start')">
    <p>请点击屏幕开始游戏</p>
  </Curtain>
</template>

<script setup lang="ts">
import Curtain from '@/components/Curtain.vue';
</script>

<style scoped lang="scss">
.start-before {
  background-color: #e7e3d9;
  cursor: pointer;
}

p {
  font-size: 0.4rem;
  text-align: center;
  color: #a07705;
  animation: fadeIn 1s linear infinite alternate;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
