<template>
  <div class="app">
    <h1>{{ title }}</h1>
    <!-- 状态信息 -->
    <div class="msg">
      <p>当前玩家: {{ curPlayer === Player.BLACK ? '黑方' : '白方' }}</p>
      <p>棋盘大小: {{ size }} x {{ size }}</p>
    </div>
    <ChessBoard />
    <div class="btns">
      <ChessButton @click="chessStore.reset">重新开始</ChessButton>
      <ChessButton @click="chessStore.backPiece">悔棋</ChessButton>
    </div>
    <WinnerMsg v-if="winner" :msg="winnerMsg" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useChessStore } from '@/stores/chess';
import ChessBoard from '@/components/ChessBoard.vue';
import ChessButton from '@/components/ChessButton.vue';
import WinnerMsg from '@/components/WinnerMsg.vue';
import { Player } from '@/types/player';

const title = ref('五子棋游戏');
const chessStore = useChessStore();
const { size, curPlayer, winner } = storeToRefs(chessStore);
const winnerMsg = computed(() => {
  if (!winner) {
    return '';
  }
  // 根据获胜玩家返回相应的消息
  if (winner.value === Player.BLACK) {
    return '黑方获胜!';
  } else {
    return '白方获胜!';
  }
});

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
  margin: 0 auto;
  width: 500px;
}

.btns {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 200px;
}
</style>
