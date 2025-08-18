/**
 * 节流函数：控制函数在指定时间间隔内只执行一次
 * @param func 要节流的函数
 * @param wait 时间间隔（毫秒）
 * @returns 节流后的函数
 */
export const throttle = <This, Args extends unknown[]>(
  func: (this: This, ...args: Args) => void,
  wait: number,
): ((this: This, ...args: Args) => void) => {
  let lastTime = 0; // 上次执行时间

  return function (this: This, ...args: Args) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      func.apply(this, args);
      lastTime = now;
    }
  };
};

