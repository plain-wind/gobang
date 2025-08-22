// 定义临界点（屏幕宽度 >= 1024px 视为PC端，否则为移动端）
const DEVICE_BREAKPOINT = 1024;
// 移动端设计稿宽度（如750px）
const MOBILE_DESIGN_WIDTH = 750;
// PC端设计稿宽度（如1920px）
const PC_DESIGN_WIDTH = 1920;

// 根据屏幕宽度获取当前设计稿宽度
const getDesignWidth = () => {
  const clientWidth = document.documentElement.clientWidth || window.innerWidth;
  return clientWidth >= DEVICE_BREAKPOINT ? PC_DESIGN_WIDTH : MOBILE_DESIGN_WIDTH;
}

// 计算并设置根元素font-size
export const setRemUnit = () => {
  // 当前页面宽度（兼容各种设备）
  const clientWidth = document.documentElement.clientWidth || window.innerWidth;
  const designWidth = getDesignWidth();

  // 核心公式：font-size = 100 * (当前宽度 / 设计稿宽度)
  const fontSize = 100 * (clientWidth / designWidth);

  // 设置html的font-size
  document.documentElement.style.fontSize = `${fontSize}px`;
}
