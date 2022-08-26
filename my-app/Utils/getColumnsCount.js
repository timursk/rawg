export function getColumnsCount(width) {
  let count = 1;

  switch (true) {
    case width < 600: {
      count = 1;
      break;
    }
    case width < 900: {
      count = 2;
      break;
    }
    case width >= 900: {
      count = 3;
      break;
    }
  }

  return count;
}
