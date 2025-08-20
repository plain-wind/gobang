<template>
  <div class="two-person-game">
    <div class="back">
      <ChessButton class="back-btn" @click="back">返回</ChessButton>
    </div>
    <!-- 状态信息 -->
    <div class="msg">
      <p>当前玩家: {{ curPlayer === Player.BLACK ? '黑方' : '白方' }}</p>
      <p>棋盘大小: {{ size }} x {{ size }}</p>
    </div>
    <ChessBoard />
    <div class="btns">
      <ChessButton @click="resetClick">重新开始</ChessButton>
      <ChessButton @click="backPieceClick" :disabled="chessPieces.length === 0">悔棋</ChessButton>
    </div>
    <!-- 胜利信息 -->
    <WinnerMsg v-if="winner">{{ winnerMsg }}</WinnerMsg>
    <!-- 确认框 -->
    <Curtain v-if="isShowCurtain">
      <Alert v-if="showContent === ShowType.RESET" @confirm="resetConfirm" @cancel="isShowCurtain = false">
        <p>确定重新开始游戏吗？</p>
      </Alert>
      <Alert v-else-if="showContent === ShowType.BACK_PIECE" @confirm="backPieceConfirm"
        @cancel="isShowCurtain = false">
        <p>确定悔棋吗？</p>
      </Alert>
    </Curtain>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useChessStore } from '@/stores/chess';
import ChessBoard from '@/components/ChessBoard.vue';
import ChessButton from '@/components/ChessButton.vue';
import WinnerMsg from '@/components/WinnerMsg.vue';
import Curtain from '@/components/Curtain.vue';
import Alert from '@/components/Alert.vue';
import { Player } from '@/types/player';

enum ShowType {
  RESET = 'reset',
  BACK_PIECE = 'backPiece',
}

// 是否展示幕布
const isShowCurtain = ref(false);
// 展示内容
const showContent = ref<ShowType>();
// 棋盘数据
const chessStore = useChessStore();
const { size, curPlayer, winner, chessPieces } = storeToRefs(chessStore);
// 路由实例
const router = useRouter();

// 根据获胜玩家返回相应的消息
const winnerMsg = computed(() => {
  if (!winner) {
    return '';
  }
  if (winner.value === Player.BLACK) {
    return '黑方获胜!';
  } else {
    return '白方获胜!';
  }
});
// 重新开始的点击事件
const resetClick = () => {
  isShowCurtain.value = true;
  showContent.value = ShowType.RESET;
};
// 重新开始的确认事件
const resetConfirm = () => {
  isShowCurtain.value = false;
  chessStore.reset();
};
// 悔棋的点击事件
const backPieceClick = () => {
  isShowCurtain.value = true;
  showContent.value = ShowType.BACK_PIECE;
};
// 悔棋的确认事件
const backPieceConfirm = () => {
  isShowCurtain.value = false;
  chessStore.backPiece();
};
// 返回上一页
const back = () => {
  chessStore.reset();
  // window.history.back();
  router.replace('/');
};

</script>

<style scoped lang="scss">
// h1 {
//   color: #825409;
//   font-size: 0.4rem;
//   margin: 0.3rem;
// }



.two-person-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 6rem;
}

.back {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.back-btn {
  width: 1.0rem;
  height: 0.5rem;
  font-size: 0.2rem;
}

.msg {
  margin-bottom: 0.2rem;
  font-size: 0.18rem;
  color: #333;
}

.btns {
  display: flex;
  justify-content: space-between;
  margin-top: 0.2rem;
  width: 2rem;
}
</style>
