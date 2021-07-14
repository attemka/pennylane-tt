import React from 'react';
import { Item } from './item';
import { TodoContext } from './todoContext';

export function List() {
  const { todos } = React.useContext(TodoContext);

  return (
    <section className="main">
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <Item key={todo.id} index={index} todo={todo} />
        ))}
      </ul>
    </section>
  );
}
