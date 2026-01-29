import type { Todo, NewToDo } from "../types/Todo";


const API_URL = "http://localhost:5001/api/todos";

// GET all todos
export const getTodos = async (): Promise<Todo[]> => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }

    return response.json();
};

// GET a specific todo
export const getTodoById = async (id: string): Promise<Todo> => {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch todo');
    }

    return response.json();
}

// POST a todo
export const createTodo = async (todo: NewToDo): Promise<Todo> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });

    if(!response.ok) {
        throw new Error('Failed to create todo');
    }

    return response.json();
};

// PUT/PATCH a todo
export const updateTodo = async (todo: Todo): Promise<Todo> => {
    const response = await fetch(`${API_URL}/${todo._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });

    if(!response.ok) {
        throw new Error('Failed to update todo')
    };

    return response.json();
}

// DELETE a todo
export const deleteTodo = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if(!response.ok) {
        throw new Error('Failed to delete todo');
    }
};