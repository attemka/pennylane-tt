import React, { useState } from 'react';
import { Header } from './header';
import { List } from './list';
import { TodoContext } from './todoContext';
import { FakeCursor } from './FakeCursor/FakeCursor';
import { KeyboardNavigationContext } from './KeyboardNavigationContext';

const INITIAL_TODOS = [
  {
    name: 'Work at Playbook',
    completed: false,
    id: 0
  },
  {
    name: 'Start TODO challenge',
    completed: true,
    id: 1
  }
];

export function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS);

  const updateTodo = todo => {
    const copy = Array.from(todos);
    const old = copy.find(t => t.id === todo.id);
    old.name = todo.name;
    old.completed = todo.completed;
    setTodos(copy);
  };
  const addTodo = name => setTodos([...todos, { name, id: Date.now() }]);
  const deleteTodo = id => setTodos(Array.from(todos).filter(t => t.id !== id));

  const [fakeCursorPosition, setFakeCursorPosition] = useState({ x: 1, y: 1 });
  const [availableElements, setAvailableElements] = useState([]);
  const [activeElementIndex, setActiveElementIndex] = useState(0);
  const addElement = id => {
    setAvailableElements(current => [...current, id]);
  };
  const removeElement = id => {
    setAvailableElements(current => current.filter(elemId => elemId !== id));
  };
  const updateCursorPosition = position => setFakeCursorPosition(position);
  return (
    <div id="app">
      <section className="todoapp">
        <TodoContext.Provider value={{ todos, updateTodo, deleteTodo, addTodo }}>
          <KeyboardNavigationContext.Provider
            value={{
              fakeCursorPosition,
              setFakeCursorPosition,
              updateCursorPosition,
              availableElements,
              addElement,
              removeElement,
              activeElementIndex,
              setActiveElementIndex
            }}
          >
            <FakeCursor />
            <Header />
            {!!todos.length && <List />}
          </KeyboardNavigationContext.Provider>
        </TodoContext.Provider>
      </section>
    </div>
  );
}
