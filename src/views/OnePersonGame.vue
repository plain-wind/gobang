<template>
  <div class="two-person-game">
    <div class="back">
      <ChessButton class="back-btn" @click="back">返回</ChessButton>
    </div>
    <!-- 状态信息 -->
    <div class="msg">
    </div>
    <ChessBoard />
    <div class="btns">
      <ChessButton @click="click(ShowType.RESET)">重新开始</ChessButton>
      <ChessButton @click="click(ShowType.BACK_PIECE)" :disabled="!canBackPiece(backCount)">悔棋</ChessButton>
    </div>
    <!-- 胜利信息 -->
    <WinnerMsg v-if="winner">{{ winnerMsg }}</WinnerMsg>
    <!-- 确认框 -->
    <Curtain v-if="isShowCurtain">
      <Alert v-if="showContent === ShowType.RESET" @confirm="confirm(reset)" @cancel="cancel">
        <p>确定重新开始游戏吗？</p>
      </Alert>
      <Alert v-else-if="showContent === ShowType.BACK_PIECE" @confirm="confirm(backPiece, backCount)" @cancel="cancel">
        <p>确定悔棋吗？</p>
      </Alert>
    </Curtain>
    <!-- 选择先手还是后手 -->
    <Curtain v-if="!player">
      <div class="select">
        <p>请选择</p>
        <ChessButton class="btn" @click="player = Player.BLACK">先手</ChessButton>
        <ChessButton class="btn" @click="player = Player.WHITE">后手</ChessButton>
      </div>
    </Curtain>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import ChessBoard from '@/components/ChessBoard.vue';
import ChessButton from '@/components/ChessButton.vue';
import WinnerMsg from '@/components/WinnerMsg.vue';
import Curtain from '@/components/Curtain.vue';
import Alert from '@/components/Alert.vue';
import { useChess } from '@/hooks/useChess';
import { useShow } from '@/hooks/useShow';
import { useRouteChange } from '@/hooks/useRouteChange';
import { AIPlacePiece } from '@/utils/AI';
import { Player, ShowType } from '@/types/chess';

// 棋盘数据
const { size, cells, winner, curPlayer, player, canBackPiece, placeChessPiece, backPiece, reset } = useChess();
// 显示状态
const { showContent, isShowCurtain, click, confirm, cancel } = useShow();
// 路由变化处理
const { back } = useRouteChange();
// 悔棋的数量
const backCount = 2;


// 根据获胜玩家返回相应的消息
const winnerMsg = computed(() => {
  if (!winner) {
    return '';
  }
  if (winner.value === player.value) {
    return '你过关!';
  }
  return '再接再厉!';
});

// 监听当前玩家变化，如果是AI下棋，则调用AI下棋逻辑
watch(
  [curPlayer, player],
  () => {
    if (player.value && curPlayer.value !== player.value) {
      const now = Date.now();
      setTimeout(() => {
        AIPlacePiece(cells.value, placeChessPiece, size.value, curPlayer.value, player.value!);
        console.log('AI下棋耗时：', Date.now() - now, 'ms');
      }, 100);
    }
  },
);
</script>

<style scoped lang="scss">
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
  align-items: center;
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

.select {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.25rem;
  background-color: #fff;
  border-radius: 0.1rem;
  padding: 0.2rem;
  box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.5);

  & p {
    color: #a07705;
  }

  & .btn {
    width: 2.0rem;
    font-size: 0.2rem;
  }
}
</style>
