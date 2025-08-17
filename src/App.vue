<template>
  <div class="app">
    <TestBoard />
  </div>
</template>

<script setup lang="ts">
import TestBoard from '@/components/TestBoard.vue';
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app {
  display: flex;
  justify-content: center;
  padding: 100px;
}
</style>
