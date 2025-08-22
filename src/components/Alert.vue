<template>
  <div class="alert">
    <div class="alert-content">
      <slot></slot>
    </div>
    <div class="alert-footer">
      <ChessButton @click="$emit('confirm')">确定</ChessButton>
      <ChessButton @click="$emit('cancel')">取消</ChessButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChessButton from '@/components/ChessButton.vue';
</script>

<style scoped lang="scss">
.alert {
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  background-color: white;
  border-radius: 0.1rem;
  box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
  // z-index: 10000; /* 确保在最上层 */
}

.alert-content {
  flex: 1;
  padding: 0.2rem;
  font-size: 0.25rem;
  color: #333;
}

.alert-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.2rem;
  gap: 0.1rem;
}
</style>
