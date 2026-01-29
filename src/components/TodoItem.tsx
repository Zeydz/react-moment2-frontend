import type { Todo, NewToDo } from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, data: Partial<NewToDo>) => Promise<void>;
}

const statusColor: Record<Todo["status"], string> = {
  "Ej påbörjad": "bg-gray-200 text-gray-800",
  "Pågående": "bg-yellow-200 text-yellow-800",
  "Avslutad": "bg-green-200 text-green-800",
};

export const TodoItem = ({ todo, onUpdate }: TodoItemProps) => {
  
  // Function to handle status change on click
  const handleStatusChange = () => {
    const statusOrder: Todo["status"][] = ["Ej påbörjad", "Pågående", "Avslutad"];
    console.log(statusOrder);
    // Determine the next status in the cycle. Found it here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    const currentIndex = statusOrder.indexOf(todo.status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    const nextStatus = statusOrder[nextIndex];
    
    onUpdate(todo._id, { status: nextStatus });
  };

  return (
    <li className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-white">
      <div className="flex-1">
        <h3 className="font-semibold">{todo.title}</h3>
        {todo.description && (
          <p className="text-sm text-gray-500">{todo.description}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Status badge, click to change status */}
        <button
          onClick={handleStatusChange}
          className={`px-3 py-1 text-sm rounded-full ${statusColor[todo.status]} hover:opacity-80 transition`}
        >
          {todo.status}
        </button>
      </div>
    </li>
  );
};
