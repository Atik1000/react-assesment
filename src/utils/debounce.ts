export function debounce<T extends (...args: string[]) => void>(
  callback: T,
  delay = 400
) {
  let timeoutId: NodeJS.Timeout;

  return (...args: string[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}
