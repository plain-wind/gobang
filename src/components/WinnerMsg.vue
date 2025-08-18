<template>
  <div class="msg">{{ msg }}</div>
</template>

<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<style scoped lang="scss">
.msg {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  color: #333;
  text-align: center;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  animation: fadeIn 0.5s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    transform: translate(-50%, -20px);
    opacity: 0;
  }

  to {
    transform: translate(-50%, 20px);
    opacity: 1;
  }
}
</style>
