<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

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
