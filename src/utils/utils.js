export const moveDown = (currentIndex, todosLength) => {
  const nextIdx = currentIndex + 1;
  if (nextIdx < todosLength) {
    return nextIdx;
  }
  return currentIndex;
};

export const moveUp = currentIndex => {
  const nextIdx = currentIndex - 1;
  if (nextIdx >= -1) {
    return nextIdx;
  }
  return currentIndex;
};

export const calculateAnchorPoint = (element, id) => {
  const offset = element.getBoundingClientRect();
  const isTodo = id.includes('todo');
  return {
    x: offset.left + offset.width / 4,
    y: offset.top + (isTodo ? -offset.height / 2 : offset.height / 2)
  };
};
