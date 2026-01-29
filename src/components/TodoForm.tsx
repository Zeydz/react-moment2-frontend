import { useState, type FormEvent } from "react";
import type { NewToDo } from "../types/Todo";

interface TodoFormProps {
  onCreate: (todo: NewToDo) => Promise<void>;
}

export const TodoForm = ({ onCreate }: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<NewToDo["status"]>("Ej påbörjad");

  // Validation errors for the form fields. For frontend validation
  const [validationErrors, setValidationErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  // Submit-error state, e.g. if API call fails
  const [submitError, setSubmitError] = useState("");

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Validate function to check form inputs
  const validate = (): boolean => {
    const newErrors: { title?: string; description?: string } = {};

    if (title.trim().length < 3) {
      newErrors.title = "Titeln måste vara minst 3 tecken lång.";
    }

    if (description.length > 200) {
      newErrors.description = "Beskrivningen får inte överstiga 200 tecken.";
    }

    // Save error in state. Check if there are any errors (keys) and return false if so
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Reset previous errors when submitting
    setValidationErrors({});
    setSubmitError("");

    // Validate form inputs
    if (!validate()) {
      return;
    }

    // Create new todo object to send to parent component
    const newTodo: NewToDo = {
      title: title.trim(),
      description: description.trim() || undefined,
      status,
    };

    try {
      // Set loading state
      setIsLoading(true);
      await onCreate(newTodo);

      // Clear form fields on success
      setTitle("");
      setDescription("");
      setStatus("Ej påbörjad");
    } catch (error) {
      // Set submit error message
      setSubmitError("Misslyckades med att skapa todo. Försök igen.");
      console.error(error);
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >

      {/* Submit button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Skapar todo..." : "Skapa todo"}
      </button>
    </form>
  );
};
