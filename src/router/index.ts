import { createRouter, createWebHistory } from 'vue-router';
import { end, show, hide } from '@/utils/loading';

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
  end.value = true; // 设置加载结束状态
  // console.log(end.value);
  setTimeout(() => {
    hide(); // 隐藏
  }, 500);
});

export default router;
