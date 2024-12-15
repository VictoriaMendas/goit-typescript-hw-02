import { FormEvent } from "react";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}
export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputRef = e.currentTarget.elements.namedItem(
      "search"
    ) as HTMLInputElement;
    const query = inputRef.value.trim().toLowerCase();
    if (query === "") {
      toast.error("Empty query");
      return;
    }
    onSubmit(query);
    e.currentTarget.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
