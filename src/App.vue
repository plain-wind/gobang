<template>
  <div class="app">
    <ChessPiece color="white" />
    <ChessPiece color="black" />
  </div>
</template>

<script setup lang="ts">
import ChessPiece from './components/ChessPiece.vue';
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
