<template>
  <Curtain class="curtain" :class="{ end: end }">
    <div class="loader" ></div>
  </Curtain>
</template>

<script setup lang="ts">
import Curtain from "@/components/Curtain.vue";
import { end } from "@/utils/loading";

</script>

<style scoped lang="scss">
.curtain {
  background-color: #f6f2e8;
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

.end {
  animation: fadeOut 0.5s forwards;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}
</style>
