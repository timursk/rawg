export function debounce(func, ms) {
  let handle = null;

  return function () {
    if (handle) {
      handle = clearTimeout(handle);
    }

    handle = setTimeout(() => {
      func(...arguments);
    }, ms);
  };
}
