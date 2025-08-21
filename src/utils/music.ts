// 播放音效的工具函数
export const playSound = (sound: HTMLAudioElement) => {
  // 重置播放位置，支持连续播放
  sound.currentTime = 0.5;
  sound.play().catch(err => {
    console.warn('音效播放失败:', err);
  });
};
