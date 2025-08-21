import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', () => {
  const visible = ref(false);
  const end = ref(false);

  // 显示加载状态
  const show = () => {
    end.value = false;
    visible.value = true;
  };
  // 隐藏加载状态
  const hide = () => {
    end.value = true;
    // 延时隐藏，确保动画完成
    setTimeout(() => {
      visible.value = false;
    }, 500);
  };

  return {
    visible,
    end,
    show,
    hide,
  }
});



