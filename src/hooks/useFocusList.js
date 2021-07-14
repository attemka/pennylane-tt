import React, { useEffect, useState } from 'react';
import { KeyboardNavigationContext } from '../components/KeyboardNavigationContext';
import { calculateAnchorPoint } from '../utils/utils';

export const useFocusList = (ref, id) => {
  const navigationContext = React.useContext(KeyboardNavigationContext);
  const {
    availableElements,
    addElement,
    activeElementIndex,
    setActiveElementIndex,
    removeElement,
    updateCursorPosition
  } = navigationContext;
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setActiveElementIndex(availableElements.indexOf(id));
  };

  useEffect(() => {
    addElement(id);

    ref.current.addEventListener('focus', handleFocus);

    return () => {
      removeElement(id);
    };
  }, []);

  useEffect(() => {
    ref.current.addEventListener('focus', handleFocus);
  }, [availableElements]);

  useEffect(() => {
    if (activeElementIndex === availableElements.indexOf(id)) {
      if (ref.current) {
        ref.current.focus();
        if (ref.current.style.display === 'none') {
          // eslint-disable-next-line no-param-reassign
          ref.current.style.display = 'block';
        }

        updateCursorPosition(calculateAnchorPoint(ref.current, id));
      }
      setIsActive(true);
    } else {
      if (ref.current) {
        ref.current.blur();
      }
      if (isActive) {
        setIsActive(false);
      }
    }
  }, [activeElementIndex, availableElements]);
};
