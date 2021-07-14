import './fakeCursor.css';
import React from 'react';
// import PropTypes from 'prop-types';
import { KeyboardNavigationContext } from '../KeyboardNavigationContext';

export const FakeCursor = () => {
  const { fakeCursorPosition } = React.useContext(KeyboardNavigationContext);
  const { x, y } = fakeCursorPosition;
  return <img alt="1" src="/cursor.svg" className="fakeCursor" style={{ top: y, left: x }} />;
};

// FakeCursor.propTypes = {
//   position: PropTypes.array.isRequired
// };
