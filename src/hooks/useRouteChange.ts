import { useRouter } from 'vue-router';
import { useChessStore } from '@/stores/chess';

export const useRouteChange = () => {
  // 路由实例
  const router = useRouter();
  // 棋盘数据
  const chessStore = useChessStore();

  // 返回首页
  const back = () => {
    chessStore.reset();
    // window.history.back();
    router.replace('/');
  };

  return { back };
}

