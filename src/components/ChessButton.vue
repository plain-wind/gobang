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
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #6f4500;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}
</style>
