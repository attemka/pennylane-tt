import React, { useEffect } from 'react';
import { KeyboardNavigationContext } from '../components/KeyboardNavigationContext';

const useKeyboardShortcuts = () => {
  const keyboardContext = React.useContext(KeyboardNavigationContext);
  const { activeElementIndex, setActiveElementIndex, availableElements } = keyboardContext;

  const keyPressHandler = (pressed, e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (activeElementIndex > 0) {
          setActiveElementIndex(activeElementIndex - 1);
        }
        break;
      case 'ArrowDown':
        if (activeElementIndex < availableElements.length) {
          setActiveElementIndex(activeElementIndex + 1);
        }
        break;
      case 'Enter':
        // setShiftEnter(pressed && e.shiftKey);
        break;
      default:
        break;
    }
  };

  const downHandler = e => {
    keyPressHandler(true, e);
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    // window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      // window.removeEventListener('keyup', upHandler);
    };
  });

  return [];
};

export default useKeyboardShortcuts;
