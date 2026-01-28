import { TodoList } from "./components/TodoList";
import './App.css';
import type { Todo } from "./types/Todo";


const mockTodos: Todo[] = [
    {
        _id: "1",
        title: "Lära mig MongoDB",
        description: "Förstå schemas och models",
        status: "Pågående",
        createdAt: "",
        updatedAt: "",
    },
    {
        _id: "2",
        title: "Bygga UI",
        status: "Ej påbörjad",
        createdAt: "",
        updatedAt: "",
    },
];

function App() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Todos</h1>
      <TodoList todos={mockTodos}/>
    </main>
  )
}

export default App
