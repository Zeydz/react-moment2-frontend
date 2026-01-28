import { useState } from 'react';
import type { NewToDo } from '../types/Todo';   

interface TodoFormProps {
    onCreate: (todo: NewToDo) => Promise<void>;
};

export const TodoForm = ({ onCreate }: TodoFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<NewToDo['status']>('Ej påbörjad');

    // Validation errors for the form fields
    const [validationErrors, setValidationErrors] = useState<{
        title?: string;
        description?: string;
    }>({});

    // Submit-error state
    const [submitError, setSubmitError] = useState('');

    // Loading state
    const [isLoading, setIsLoading] = useState(false);

}


