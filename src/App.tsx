import { TodoList } from "./components/TodoList";
import './App.css';
import { TodoForm } from "./components/TodoForm";
import type { Todo, NewToDo } from "./types/Todo";
import { useEffect, useState } from "react";
import { getTodos, createTodo } from "./services/todoService";


function App() {

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error("Kunde inte hämta todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleCreate = async (newTodo: NewToDo) => {
    try {
      const createdTodo = await createTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
    } catch (error) {
      console.error("Kunde inte skapa todo:", error);
      throw error;
    }
  }


  return (
    <main className="max-w-xl mx-auto p-6">
      <TodoForm onCreate={handleCreate} />
      <h1 className="text-2xl font-bold mb-6">Todos</h1>
      <TodoList todos={todos} />
    </main>
  )
}

export default App
