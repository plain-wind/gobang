import { createRouter, createWebHashHistory } from 'vue-router';
import { useLoadingStore } from '@/stores/loading';

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: () => import('@/views/Start.vue'),
    },
    {
      path: '/game/2',
      name: 'TwoPersonGame',
      component: () => import('@/views/TwoPersonGame.vue'),
    }
  ],
});

// 路由守卫 显示和隐藏加载动画
router.beforeEach((to, from, next) => {
  const { show } = useLoadingStore();
  show(); // 显示
  next();
});

router.afterEach(() => {
  const { hide } = useLoadingStore();
  hide();
});

export default router;
