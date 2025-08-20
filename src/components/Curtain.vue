<template>
  <div class="curtain center">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.curtain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999; /* 确保幕布在最上层 */
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
