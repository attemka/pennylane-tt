import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useHotkeys } from 'react-hotkeys-hook';
import { TodoContext } from './todoContext';
import { useFocusList } from '../hooks/useFocusList';
import { KeyboardNavigationContext } from './KeyboardNavigationContext';

export function Item({ todo, index }) {
  const { updateTodo, deleteTodo } = React.useContext(TodoContext);
  const { availableElements, activeElementIndex } = React.useContext(KeyboardNavigationContext);
  const { id, completed } = todo;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(todo.name);
  const inputEl = useRef(null);

  useHotkeys(
    'shift+enter',
    () => {
      if (editing) {
        updateTodo({ ...todo, completed: !completed });
      }
    },
    { enableOnTags: ['INPUT'] }
  );
  useEffect(() => {
    if (activeElementIndex === availableElements.indexOf(`todo-${index}`)) {
      setEditing(true);
    }
  }, [activeElementIndex]);

  useLayoutEffect(() => {
    if (activeElementIndex === availableElements.indexOf(`todo-${index}`)) {
      inputEl.current.focus();
    }
  }, [editing]);

  const handleEdit = () => {
    setEditing(true);
  };
  const handleChange = event => setName(event.target.value);
  const handleBlur = () => {
    updateTodo({ ...todo, name });
    inputEl.current.blur();
    setEditing(false);
  };
  useFocusList(inputEl, `todo-${index}`);

  return (
    <li className={classNames({ completed, editing })} data-testid="todo-item">
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => updateTodo({ ...todo, completed: !completed })}
        />
        <label onDoubleClick={handleEdit} data-testid="todo-name">
          {todo.name}
        </label>
        <button className="destroy" onClick={() => deleteTodo(id)} data-testid="todo-remove" />
      </div>
      <input
        style={{ display: editing ? 'block' : 'none' }}
        ref={inputEl}
        className="edit"
        value={name}
        onInput={handleChange}
        onBlur={handleBlur}
        onChange={() => {}}
      />
    </li>
  );
}

Item.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};
