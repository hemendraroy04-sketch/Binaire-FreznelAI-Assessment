export function throttle<T extends (...args: any[]) => void>( callback: T, interval: number) {
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const current = Date.now();

    if (current - lastCall >= interval) {
      lastCall = current;
      callback(...args);
    }
  };
}