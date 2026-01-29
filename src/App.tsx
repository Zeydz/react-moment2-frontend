import { TodoList } from "./components/TodoList";
import './App.css';
import { TodoForm } from "./components/TodoForm";
import type { Todo, NewToDo } from "./types/Todo";
import { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo } from "./services/todoService";


function App() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error("Kunde inte hämta todos:", error);
        setError("Kunde inte hämta todos. Kontrollera att backend körs.")
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // Display loading state
  if (isLoading) {
    return (
      <main className="max-w-xl mx-auto p-6">
        <p className="text-gray-500 text-center">Laddar todos...</p>
      </main>
    );
  }

  // Display error message if any
  if (error) {
    return(
      <main className="max-w-xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error} 
        </div>
      </main>
    );
  }
  
  const handleUpdate = async (id: string, updatedData: Partial<NewToDo>) => {
    try {
      const updatedTodo = await updateTodo(id, updatedData);

      // Update state with the updated todo
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Kunde inte uppdatera todo:", error);
    }
  }

  // Handle creation of a new todo
  const handleCreate = async (newTodo: NewToDo) => {
    try {
      const createdTodo = await createTodo(newTodo);
      // Update state with the newly created todo, adding it to the existing list
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
    } catch (error) {
      console.error("Kunde inte skapa todo:", error);
      throw error;
    }
  }
  // Render the main application UI.
  return (
    <main className="max-w-xl mx-auto p-6">
      <TodoForm onCreate={handleCreate} />
      <h1 className="text-2xl font-bold mb-6">Todos</h1>
      <TodoList todos={todos} onUpdate={handleUpdate} />
    </main>
  )
}

export default App
