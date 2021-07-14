import React, { useRef, useState } from 'react';
import { TodoContext } from './todoContext';
import { useFocusList } from '../hooks/useFocusList';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';

const ENTER_KEY = 'Enter';

export function Header() {
  const [name, setName] = useState('');
  const inputEl = useRef(null);
  const { addTodo } = React.useContext(TodoContext);
  useFocusList(inputEl, 'header-1');
  useKeyboardShortcuts();

  const handleChange = event => setName(event.target.value);

  const handleSubmit = event => {
    if (event.key !== ENTER_KEY) {
      return;
    }

    addTodo(name);
    setName('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        ref={inputEl}
        className="new-todo"
        placeholder="What needs to be done?"
        value={name}
        onInput={handleChange}
        onKeyUp={handleSubmit}
        onChange={() => {}}
        data-testid="todo-create"
      />
    </header>
  );
}
