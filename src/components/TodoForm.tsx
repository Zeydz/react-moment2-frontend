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
      <h2 className="text-xl font-semibold mb-4">Lägg till ny todo</h2>

      {/* Submit error handling. If falsy it won't show anything */}
      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {submitError}
        </div>
      )}

      {/* Title input */}
      <div className="mb-4">
        <label htmlFor="title" className="text-sm font-medium mb-1">
          Titel *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded"
          placeholder="Skriv en titel..."
          disabled={isLoading}
        />
        {validationErrors.title && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
        )}
      </div>
      {/* Description input */}
      <div className="mb-4">
        <label htmlFor="description" className="text-sm font-medium mb-1">
          Beskrivning
        </label>
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded"
          placeholder="Skriv en beskrivning..."
          disabled={isLoading}
        ></textarea>
        {validationErrors.description && (
          <p className="text-red-500 text-sm mt-1">
            {validationErrors.description}
          </p>
        )}
      </div>
      {/* Status selection */}
      <div className="mb-4">
        <label htmlFor="status" className="text-sm font-medium mb-1">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as NewToDo["status"])}
          className="w-full rounded"
          disabled={isLoading}
        >
          <option value="Ej påbörjad">Ej påbörjad</option>
          <option value="Pågående">Pågående</option>
          <option value="Avslutad">Avslutad</option>
        </select>
      </div>
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
