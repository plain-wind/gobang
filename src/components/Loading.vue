<template>
  <Curtain class="curtain">
    <div class="loader"></div>
  </Curtain>
</template>

<script setup lang="ts">
import Curtain from "@/components/Curtain.vue";
</script>

<style scoped lang="scss">
.curtain {
  background-color: #fff;
}

.loader {
  $size: 1rem;
  width: $size;
  height: $size;
  border: 0.1rem solid rgba(0, 0, 0, 0.1);
  border-top: 0.1rem solid #825409;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
