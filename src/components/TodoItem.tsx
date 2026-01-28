import type { Todo } from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
}

// Show correct color depending on state. Uses Record to assign a key to status
const statusColor: Record<Todo["status"], string> = {
  "Ej påbörjad": "bg-gray-200 text-gray-800",
  "Pågående": "bg-yellow-200 text-yellow-800",
  "Avslutad": "bg-green-200 text-green-800",
};

// Renders a single todo item with title, optional description, and status badge.
export const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <li className="flex justify-between items-center p-4 border rounded-lg shadow-sm">
      <div>
        <h3 className="font-semibold">{todo.title}</h3>
        {todo.description && (
          <p className="text-sm text-gray-500">{todo.description}</p>
        )}
      </div>

      <span
        className={`px-3 py-1 text-sm rounded-full ${statusColor[todo.status]}`}
      >
        {todo.status}
      </span>
    </li>
  );
};
