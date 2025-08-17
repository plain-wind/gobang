<template>
  <div class="app">
    <h1>{{ title }}</h1>
    <!-- 状态信息 -->
    <div class="msg">
      <p>当前玩家: {{ curPlayer === Player.BLACK ? '黑方' : '白方' }}</p>
      <p>棋盘大小: {{ size }} x {{ size }}</p>
    </div>
    <ChessBoard />
    <ChessButton class="back-piece" @click="chessStore.backPiece">悔棋</ChessButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useChessStore } from '@/stores/chess';
import ChessBoard from '@/components/ChessBoard.vue';
import ChessButton from '@/components/ChessButton.vue';
import { Player } from '@/types/player';

const title = ref('五子棋游戏');
const chessStore = useChessStore();
const { size, curPlayer } = chessStore;

</script>

<style scoped lang="scss">
@use "@/assets/sass/reset.scss";

h1 {
  color: #825409;
  margin: 20px;
}

.msg {
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
