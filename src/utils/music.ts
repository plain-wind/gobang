import { ref } from 'vue';

// 落子音效
export const placeSound = ref<HTMLAudioElement | null>(null);
placeSound.value = new Audio('/sounds/placePiece.m4a');

// 播放音效的工具函数
export const playSound = (sound: HTMLAudioElement | null) => {
  if (sound) {
    // 重置播放位置，支持连续播放
    sound.currentTime = 0.5;
    sound.play().catch(err => {
      console.warn('音效播放失败:', err);
    });
  }
};
