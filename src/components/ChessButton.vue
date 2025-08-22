<template>
  <button ref="btn" class="btn">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { playSound } from '@/utils/music';

const btn = ref<HTMLButtonElement | null>(null);
// 点击音效
const clickSound = ref<HTMLAudioElement>(new Audio('/sounds/click.mp3'));
// 移入音效
const hoverSound = ref<HTMLAudioElement>(new Audio('/sounds/hover.wav'));
// 是否是移动设备
const isMobile = ref(false);
onMounted(() => {
  isMobile.value = 'ontouchstart' in window;
  // 预加载音效
  clickSound.value.preload = 'auto';
  hoverSound.value.preload = 'auto';

  if (btn.value) {
    btn.value.addEventListener('click', () => {
      playSound(clickSound.value);
    });
    btn.value.addEventListener('mouseenter', () => {
      // 移动设备不播放hover音效
      if (isMobile.value) return;
      playSound(hoverSound.value);
    });
  }
});

onBeforeUnmount(() => {
  if (btn.value) {
    btn.value.removeEventListener('click', () => {
      playSound(clickSound.value);
    });
    btn.value.removeEventListener('mouseenter', () => {
      playSound(hoverSound.value);
    });
  }
});
</script>

<style scoped lang="scss">
.btn {
  padding: 0.1rem 0.2rem;
  background-color: #825409;
  font-size: 0.16rem;
  color: white;
  border: none;
  border-radius: 0.05rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #553502;
    transform: scale(1.05);
  }
  &:disabled {
    background-color: #ccc;
    transform: none;
    cursor: not-allowed;
  }
}
</style>
