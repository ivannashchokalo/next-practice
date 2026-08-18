interface SearchFormProps {
  onSearch: (value: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = (formData.get("search") as string).trim();
    onSearch(searchValue);
  };
  return (
    <form onSubmit={handleSearch}>
      <input type="text" name="search" />
      <button>search</button>
      <button
        onClick={(e) => {
          onSearch("");
          e.currentTarget.form?.reset();
        }}
        type="button"
      >
        X
      </button>
    </form>
  );
}
