// Blueprint of a Todo in the database
export interface Todo {
    _id: string;
    title: string;
    description?: string;
    status: 'Ej påbörjad' | 'Pågående' | 'Avslutad';
    createdAt: string;
    updatedAt: string;
}

// Blueprint of a new todo
export interface NewToDo {
    title: string;
    description?: string;
    status?: 'Ej påbörjad' | 'Pågående' | 'Avslutad';
}