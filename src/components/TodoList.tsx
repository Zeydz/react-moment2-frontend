import type { Todo } from "../types/Todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
}
// Renders a list of todos or a message if there are none. Uses the TodoItem component to render each todo.
export const TodoList = ({ todos }: TodoListProps) => {
  if (todos.length === 0) {
    return <p className="text-gray-500">Inga todos ännu.</p>;
  }

  return (
    <ul className="space-y-3">
      {/* Render each todo item with map-loop. Apply a key to each item */}
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </ul>
  );
};
