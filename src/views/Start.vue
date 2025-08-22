<template>
  <div class="start">
    <div class="btns">
      <ChessButton class="btn" @click="$router.push('/game/1')">人机对战</ChessButton>
      <ChessButton class="btn" @click="$router.push('/game/2')">双人游戏</ChessButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChessButton from '@/components/ChessButton.vue';
</script>

<style scoped lang="scss">
.start {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100vh;
  background: url('/imgs/gobang.png') no-repeat center/contain;
  box-sizing: border-box;

  .btns {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1rem;

    .btn {
      width: 2rem;
      height: 0.6rem;
      font-size: 0.25rem;
      box-shadow: 0.05rem 0.1rem 0.1rem rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
