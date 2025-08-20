import { createRouter, createWebHistory } from 'vue-router';
import { show, hide } from '@/utils/loading';

const router = createRouter({
  history: createWebHistory(),
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
  show(); // 显示
  next();
});

router.afterEach(() => {
  hide(); // 隐藏
});

export default router;
